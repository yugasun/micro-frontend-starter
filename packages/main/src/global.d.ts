interface IMicroApp {
    name: string;
    type: string;
    devEntry: string;
    entry: string;
    container: string;
    activeRule: string;
}
interface IMicroConfig {
    apps: IMicroApp[];
}

interface Window {
    __POWERED_BY_QIANKUN__: boolean;
    __INJECTED_PUBLIC_PATH_BY_QIANKUN__: string;
    __MICRO_APP__NAME__: string;
    __MICRO_APPS__: IMicroApp[];
}
