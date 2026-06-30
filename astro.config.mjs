// @ts-check
import {defineConfig} from 'astro/config';

import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
    server: {
        host: true
    },
    site: 'https://botsync.ru',
    adapter: node({
        mode: 'standalone',
    }),
    integrations: [sitemap(), react()],
    vite: {
        resolve: {
            dedupe: ['react', 'react-dom'],
        },
        optimizeDeps: {
            include: ['react', 'react-dom', 'react/jsx-runtime', 'react-markdown'],
        },
        server: {
            proxy: {
                '/api': {
                    target: 'https://api.botsync.ru',
                    changeOrigin: true,
                    secure: false,
                },
                '/share-chat': {
                    target: 'https://api.botsync.ru',
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
    },
});