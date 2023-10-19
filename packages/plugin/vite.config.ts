import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    build: {
        minify: false,
        lib: {
            entry: 'src/index.ts',
            fileName: '[name]',
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: ['cheerio'],
        },
    },
    plugins: [
        dts({
            entryRoot: resolve(__dirname, 'src'),
            cleanVueFileName: true,
            copyDtsFiles: false,
            outDir: resolve(__dirname, 'dist'),
        }),
    ],
});
