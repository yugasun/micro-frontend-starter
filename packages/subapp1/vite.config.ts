import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import MicroVitePlugin from '@micro-fe/vite-plugin';

const VITE_APP_NAME = 'subapp1';
const DEV_HOST = 'localhost';
const DEV_PORT = 8001;
const isProd = process.env.NODE_ENV === 'production';
const isMicro = process.env.VITE_MICRO_MODE === 'true';
console.log('isMicro', isMicro);

// https://vitejs.dev/config/
export default defineConfig({
    base: isMicro ? `/${VITE_APP_NAME}/` : '/',
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
    build: {},
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
