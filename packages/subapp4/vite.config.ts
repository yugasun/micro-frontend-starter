import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import MicroVitePlugin from '@micro-fe/vite-plugin';

// TODO: change to real deploy domain
const DEPLOY_URL = 'http://localhost:8004';
const VITE_APP_NAME = 'subapp4';
const DEV_HOST = 'localhost';
const DEV_PORT = 8004;
const isProd = process.env.NODE_ENV === 'production';
const isMicro = process.env.VITE_MICRO_MODE === 'true';

let base = '/';
if (isProd) {
    base = DEPLOY_URL;
} else if (isMicro) {
    base = `/${VITE_APP_NAME}/`;
}

// https://vitejs.dev/config/
export default defineConfig({
    base,
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    plugins: [
        vue(),
        MicroVitePlugin(VITE_APP_NAME, {
            useDevMode: !isProd,
        }),
    ],
    build: {
        minify: false,
    },
    server: {
        cors: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        port: DEV_PORT,
        hmr: {
            host: DEV_HOST,
            port: DEV_PORT,
        },
    },
});
