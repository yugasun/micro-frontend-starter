import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import MicroVitePlugin from '@micro-fe/vite-plugin';

const VITE_APP_NAME = 'subapp2';
const DEV_HOST = 'localhost';
const DEV_PORT = 8002;
// TODO: change to real deploy domain
const DEPLOY_URL = 'http://localhost:8002';
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
    build: {
        minify: true,
    },
    plugins: [
        ...(isProd ? react() : []),
        MicroVitePlugin(VITE_APP_NAME, {
            useDevMode: !isProd,
        }),
    ],
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
