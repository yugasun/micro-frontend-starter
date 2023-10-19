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

    // if you want to load with other sub applications, you can make selector id different
    const target: HTMLElement = container
        ? container.querySelector('#subapp4')
        : document.querySelector('#subapp4');

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
        console.log('[subapp4] vue app bootstraped');
    },
    mount(props: MountProps) {
        console.log('[subapp4] props from main framework', props);
        requestIdleCallback(() => {
            render(props);
        });
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
