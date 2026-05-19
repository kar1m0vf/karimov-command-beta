import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/karimov-command-beta/',
  build: {
    target: 'es2020',
    cssMinify: true,
    sourcemap: false
  }
});
