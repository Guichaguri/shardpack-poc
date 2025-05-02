import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import preserveDirectives from 'rollup-preserve-directives';

import * as packageJson from './package.json';

export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    preserveDirectives(),
  ],
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
      output: {
        preserveModules: true,
        // Necessário adicionar o hash para que o CSS compilado não termine com ".module.css"
        assetFileNames: '[name].[hash][extname]',
      },
      // Exclude peer dependencies from the bundle to reduce bundle size
      external: ['react/jsx-runtime', ...Object.keys(packageJson['peerDependencies'] ?? {})],
    },
  },
})
