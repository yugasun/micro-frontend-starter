import React from 'react';
import ReactDOM, { Root } from 'react-dom/client';

import {
    renderWithQiankun,
    qiankunWindow,
    QiankunProps,
} from '@ygkit/vite-plugin-qiankun';

import Router from './router';
import './index.css';

interface MountProps {
    name?: string;
    container?: any;
    onGlobalStateChange?: any;
    setGlobalState?: any;
}

let app: Root | null = null;
function render(props: MountProps = {}) {
    const { container } = props;

    const target: HTMLElement = container
        ? container.querySelector('#subapp2')
        : document.querySelector('#subapp2');
    app = ReactDOM.createRoot(target);

    app.render(<Router />);
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

// some code
renderWithQiankun({
    bootstrap() {
        console.log('[subapp2] react app bootstraped');
    },
    mount(props: MountProps) {
        console.log('[subapp2] props from main framework', props);
        render(props);
        storeTest(props);
    },
    update: function (props: QiankunProps): void | Promise<void> {
        throw new Error('Function not implemented.');
    },
    unmount() {
        if (app) {
            app.unmount();
            app = null;
        }
    },
});

// render when run alone
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    render();
}
