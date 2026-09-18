import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        explore: resolve(__dirname, 'explore.html'),
        about: resolve(__dirname, 'about.html'),
        learn: resolve(__dirname, 'learn.html'),
      },
    },
  },
});
