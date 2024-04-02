import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import vuetify from 'vite-plugin-vuetify';

export default defineConfig({
    plugins: [vue(), vuetify()],
    resolve: {
        alias: [{ find: '@', replacement: '/src' }],
    },
    test: {
        globals: true,
        environment: 'jsdom',
        deps: {
            inline: ['vuetify'],
        },
    },
    base: '/vue-checkdeli/',
});
