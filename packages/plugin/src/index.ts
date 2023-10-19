import { load, CheerioAPI, Element } from 'cheerio';
import type { PluginOption } from 'vite';

export * from './helper';

export const createMainAppInjectStr = () => `
;(global => {
    global.getMicroApp = (name) => {
        if (!name) {
            name = global.proxy.qiankunName;
        }
        const apps = global.__MICRO_APPS__ || [];
        return apps.find(app => app.name === name);
    };
    global.__MICRO_PUBLIC_PATH__ = (path, name) => {
        const app = getMicroApp(name);
        console.log('[@micro-fe]', app)
        const prefix = app.entry[app.entry.length - 1] !== '/' ? app.entry + '/' : app.entry;
        const publicPath = app ? prefix + path : path;
        return publicPath;
    };
})(window);
`;

const createQiankunHelper = (qiankunName: string) => `
  const createDeffer = (hookName) => {
    const d = new Promise((resolve, reject) => {
      window.proxy && (window.proxy[\`vite\${hookName}\`] = resolve)
    })
    return props => d.then(fn => fn(props));
  }
  const bootstrap = createDeffer('bootstrap');
  const mount = createDeffer('mount');
  const unmount = createDeffer('unmount');
  const update = createDeffer('update');

  ;(global => {
    global.qiankunName = '${qiankunName}';
    global['${qiankunName}'] = {
      bootstrap,
      mount,
      unmount,
      update
    };
  })(window);
`;

const createImportFinallyResolve = (qiankunName: string) => {
    return `
    const qiankunLifeCycle = window.moudleQiankunAppLifeCycles && window.moudleQiankunAppLifeCycles['${qiankunName}'];
    if (qiankunLifeCycle) {
      window.proxy.vitemount((props) => qiankunLifeCycle.mount(props));
      window.proxy.viteunmount((props) => qiankunLifeCycle.unmount(props));
      window.proxy.vitebootstrap(() => qiankunLifeCycle.bootstrap());
      window.proxy.viteupdate((props) => qiankunLifeCycle.update(props));
    }
  `;
};

export type MicroOption = {
    useDevMode?: boolean;
    isMain?: boolean;
};
type PluginFn = (
    qiankunName: string,
    microOption?: MicroOption,
) => PluginOption;

const plugin: PluginFn = (qiankunName, microOption = {}) => {
    let isProduction: boolean;
    let base = '';

    if (microOption.isMain) {
        return {
            name: '@ygkit/vite-plugin-qiankun',
            configResolved(config) {
                isProduction =
                    config.command === 'build' || config.isProduction;
                base = config.base;
            },
            transformIndexHtml(html: string) {
                const $ = load(html);
                $('body').append(
                    `<script>${createMainAppInjectStr()}</script>`,
                );
                const output = $.html();
                return output;
            },
        };
    }

    // dynamic import module
    const module2DynamicImport = ($: CheerioAPI, scriptTag?: Element) => {
        if (!scriptTag) {
            return;
        }
        const script$ = $(scriptTag);
        const moduleSrc = script$.attr('src');
        let appendBase = '';
        if (microOption.useDevMode && !isProduction) {
            appendBase =
                "(window.proxy ? (window.proxy.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ + '..') : '') + ";
        }
        script$.removeAttr('src');
        script$.removeAttr('type');
        if (isProduction) {
            script$.html(
                `import(window.__MICRO_PUBLIC_PATH__('${moduleSrc}', '${qiankunName}'))`,
            );
        } else {
            script$.html(`import(${appendBase}'${moduleSrc}')`);
        }
        return script$;
    };

    return {
        name: '@ygkit/vite-plugin-qiankun',
        // add runtime public path
        config(config) {
            if (microOption.useDevMode && !isProduction) {
                config.base = `/${qiankunName}/${base.replace(/^\//, '')}`;
            }
            config.experimental = {
                renderBuiltUrl(
                    filename: string,
                    {
                        hostType,
                    }: {
                        hostType: 'js' | 'css' | 'html';
                    },
                ) {
                    if (hostType === 'js') {
                        return {
                            runtime: `window.__MICRO_PUBLIC_PATH__(${JSON.stringify(
                                filename,
                            )}, "${qiankunName}")`,
                        };
                    }

                    return filename;
                },
            };

            return config;
        },

        configResolved(config) {
            isProduction = config.command === 'build' || config.isProduction;
            base = config.base;
        },

        configureServer(server) {
            return () => {
                server.middlewares.use((req, res, next) => {
                    if (isProduction || !microOption.useDevMode) {
                        next();
                        return;
                    }
                    const end = res.end.bind(res);
                    // eslint-disable-next-line
                    // @ts-ignore
                    res.end = (...args: any[]) => {
                        // eslint-disable-next-line
                        let [htmlStr, ...rest] = args;
                        if (typeof htmlStr === 'string') {
                            const $ = load(htmlStr);
                            module2DynamicImport(
                                $,
                                $(`script[src=${base}@vite/client]`).get(0),
                            );
                            htmlStr = $.html();
                        }
                        end(htmlStr, ...rest);
                    };
                    next();
                });
            };
        },
        transformIndexHtml(html: string) {
            const $ = load(html);
            const moduleTags = $(
                'body script[type=module], head script[crossorigin=""]',
            );

            if (!moduleTags || !moduleTags.length) {
                return;
            }
            const len = moduleTags.length;
            moduleTags.each((i, moduleTag) => {
                const script$ = module2DynamicImport($, moduleTag);
                if (len - 1 === i) {
                    script$?.html(`${script$.html()}.finally(() => {
                                    ${createImportFinallyResolve(qiankunName)}
                                    })
                                    `);
                }
            });

            $('body').append(
                `<script>${createQiankunHelper(qiankunName)}</script>`,
            );
            const output = $.html();
            return output;
        },
    };
};

export default plugin;
