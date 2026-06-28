// @ts-check
import {defineConfig} from 'astro/config';

import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
    site: 'https://botsync.ru',
    server: {
        host: true
    },
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
    },
});