import { defineConfig } from 'vite';
import { resolve } from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { default as MicroVitePlugin } from '@ygkit/vite-plugin-qiankun';

const VITE_APP_NAME = 'subapp3';
const DEV_HOST = 'localhost';
const DEV_PORT = 8003;
// TODO: change to real deploy domain
const DEPLOY_URL = 'http://localhost:8003';
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
        // ...(isProd ? svelte() : []),
        svelte({}),
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
