import { defineConfig } from 'vite';
import { join, resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

import * as packageJson from './package.json';

export default defineConfig({
  plugins: [react(), libInjectCss()],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: true,
    lib: {
      entry: {
        'Header': resolve(__dirname, './src/components/Header/index.tsx'),
        'Footer': resolve(__dirname, './src/components/Footer/index.tsx'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      // Exclude peer dependencies from the bundle to reduce bundle size
      external: ['react/jsx-runtime', ...Object.keys(packageJson['peerDependencies'] ?? {})],
    },
  },
})
