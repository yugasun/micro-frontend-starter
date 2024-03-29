import { renderWithQiankun, qiankunWindow } from '@ygkit/vite-plugin-qiankun';
import type { QiankunProps } from '@ygkit/vite-plugin-qiankun';
import type { SvelteComponent } from 'svelte';

import './app.css';
import App from './app.svelte';

interface MountProps {
    name?: string;
    container?: any;
    onGlobalStateChange?: any;
    setGlobalState?: any;
}

let app: SvelteComponent | null = null;
function render(props: MountProps = {}) {
    const { container } = props;

    const target: HTMLElement = container
        ? container.querySelector('#subapp3')
        : document.querySelector('#subapp3');

    app = new App({
        target,
    });
}

export default app;

function storeTest(props: MountProps) {
    props.onGlobalStateChange &&
        props.onGlobalStateChange(
            (value: any, prev: any) =>
                console.log(
                    `[onGlobalStateChange - ${props.name}]:`,
                    value,
                    prev,
                ),
            true,
        );
    props.setGlobalState &&
        props.setGlobalState({
            ignore: props.name,
            user: {
                name: props.name,
            },
        });
}

// some code
renderWithQiankun({
    bootstrap() {
        console.log('[subapp3] react app bootstraped');
    },
    mount(props: MountProps) {
        console.log('[subapp3] props from main framework', props);
        render(props);
        storeTest(props);
    },
    update: function (props: QiankunProps): void | Promise<void> {
        console.log('props', props);
        throw new Error('Function not implemented.');
    },
    unmount() {
        if (app) {
            app.$destroy();
            app = null;
        }
    },
});

// render when run alone
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    render();
}
