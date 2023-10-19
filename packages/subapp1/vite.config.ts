import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import MicroVitePlugin from '@ygkit/vite-plugin-qiankun';

// TODO: change to real deploy domain
const DEPLOY_URL = 'http://localhost:8001';
const DEV_HOST = 'localhost';
const DEV_PORT = 8001;
const VITE_APP_NAME = 'subapp1';
const isProd = process.env.NODE_ENV === 'production';
const isUseCdn = process.env.VITE_USE_CDN === 'true';

let base = '/';
if (isProd && isUseCdn) {
    base = DEPLOY_URL;
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
