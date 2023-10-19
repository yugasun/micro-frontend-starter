import { createApp } from 'vue';
import type { App } from 'vue';
import {
    renderWithQiankun,
    qiankunWindow,
    QiankunProps,
} from '@ygkit/vite-plugin-qiankun';

import './style.css';
import Root from './App.vue';
import { router, history } from './router';

interface MountProps {
    name?: string;
    container?: any;
    onGlobalStateChange?: any;
    setGlobalState?: any;
}

let app: App | null = null;
function render(props: MountProps = {}) {
    const { container } = props;

    app = createApp(Root);

    app.use(router);

    const target: HTMLElement = container
        ? container.querySelector('#subapp1')
        : document.querySelector('#subapp1');
    app.mount(target);
}

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

renderWithQiankun({
    bootstrap() {
        console.log('[subapp1] vue app bootstraped');
    },
    mount(props: MountProps) {
        console.log('[subapp1] props from main framework', props);
        render(props);
        storeTest(props);
    },
    update: function (props: QiankunProps): void | Promise<void> {
        console.log('props', props);
        throw new Error('Function not implemented.');
    },
    unmount() {
        if (app) {
            app.unmount();
            app = null;
            history.destroy();
        }
    },
});

// render when run alone
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    render();
}
