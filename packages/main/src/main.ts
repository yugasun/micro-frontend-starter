import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import {
    initGlobalState,
    registerMicroApps,
    runAfterFirstMounted,
    start,
} from 'qiankun';

import { apps } from './config';

import App from './App.vue';
import store from './store';
import router from './router';
import { updateTheme } from './utils/theme';

import '@/assets/styles/index.scss';
// If you want to use ElMessage, import it.
import 'element-plus/theme-chalk/src/message.scss';

const isDev = import.meta.env.NODE_ENV === 'development';

window.__MICRO_APP__NAME__ = 'main';
window.__MICRO_APPS__ = apps;

async function main() {
    const app = createApp(App);

    // 挂载插件
    app.use(store);
    app.use(router);
    app.use(ElementPlus);

    app.mount('#root');

    updateTheme();
}

function initMicroApps() {
    const appList = apps.map((item) => {
        item.entry = isDev ? item.devEntry : item.entry;
        return item;
    });

    // registry micro apps
    registerMicroApps(appList, {
        beforeLoad: [
            async (app) => {
                console.log(
                    '[LifeCycle] before load %c%s',
                    'color: green;',
                    app.name,
                );
            },
        ],
        beforeMount: [
            async (app) => {
                console.log(
                    '[LifeCycle] before mount %c%s',
                    'color: green;',
                    app.name,
                );
            },
        ],
        afterUnmount: [
            async (app) => {
                console.log(
                    '[LifeCycle] after unmount %c%s',
                    'color: green;',
                    app.name,
                );
            },
        ],
    });

    // init global state for micro frontends
    const { onGlobalStateChange, setGlobalState } = initGlobalState({
        user: 'qiankun',
    });

    onGlobalStateChange((value, prev) =>
        console.log('[onGlobalStateChange - main]:', value, prev),
    );

    setGlobalState({
        ignore: 'main',
        user: {
            name: 'main',
        },
    });

    start({ sandbox: { experimentalStyleIsolation: true }, singular: true });

    runAfterFirstMounted(() => {
        console.log('[MainApp] first app mounted');
    });
}
// init main application first
main().then(() => {
    initMicroApps();
});
