export interface QiankunProps {
    container?: HTMLElement;
    [key: string]: any;
}

export type QiankunLifeCycle = {
    bootstrap: () => void | Promise<void>;
    mount: (props: QiankunProps) => void | Promise<void>;
    unmount: (props: QiankunProps) => void | Promise<void>;
    update: (props: QiankunProps) => void | Promise<void>;
};

export interface QiankunWindow {
    __POWERED_BY_QIANKUN__?: boolean;
    [x: string]: any;
}

export const qiankunWindow: QiankunWindow =
    typeof window !== 'undefined' ? window.proxy || window : {};

export const renderWithQiankun = (qiankunLifeCycle: QiankunLifeCycle) => {
    if (qiankunWindow?.__POWERED_BY_QIANKUN__) {
        if (!window.moudleQiankunAppLifeCycles) {
            window.moudleQiankunAppLifeCycles = {};
        }
        if (qiankunWindow.qiankunName) {
            window.moudleQiankunAppLifeCycles[qiankunWindow.qiankunName] =
                qiankunLifeCycle;
        }
    }
};

export default renderWithQiankun;
