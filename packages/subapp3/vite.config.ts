import { defineConfig } from 'vite';
import { resolve } from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { default as MicroVitePlugin } from '@micro-fe/vite-plugin';

const VITE_APP_NAME = 'subapp3';
const DEV_HOST = 'localhost';
const DEV_PORT = 8003;
// TODO: change to real deploy domain
const DEPLOY_URL = 'http://localhost:8003';
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
