/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module 'micro.config' {
    interface AppConfig {
        name: string;
        type: string;
        devEntry: string;
        entry: string;
        container: string;
        activeRule: string;
    }
    const configs: {
        apps: AppConfig[];
    };

    export default configs;
}
