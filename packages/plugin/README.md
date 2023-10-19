# @ygkit/vite-plugin-qiankun

Inspired by [vite-plugin-qiankun](https://github.com/tengmaoqing/vite-plugin-qiankun).

## Usage

1. Install plugin for vite config file `vite.config.ts`:

```typescript
import MicroVitePlugin from '@ygkit/vite-plugin-qiankun';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        MicroVitePlugin('subapp1', {
            useDevMode: true,
        }),
    ],
});
```

2. Use lifecycle in entry file `src/main.ts`:

```typescript
import {
    renderWithQiankun,
    qiankunWindow,
    QiankunProps,
} from '@ygkit/vite-plugin-qiankun';

renderWithQiankun({
    bootstrap() {
        console.log('[vue] vue app bootstraped');
    },
    mount(props: MountProps) {
        console.log('[vue] props from main framework', props);
        render(props);
        // storeTest(props);
    },
    update: function (props: QiankunProps): void | Promise<void> {
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
```

## License

MIT
