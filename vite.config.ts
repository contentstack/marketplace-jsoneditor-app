import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import packageJson from './package.json';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['src/setupTests.ts'],
    include: ['src/**/*.spec.{ts,tsx}'],
    css: false,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.spec.{ts,tsx}', 'src/**/*.d.ts', 'src/setupTests.ts', 'src/test-utils/**', 'src/common/types/**'],
      thresholds: { lines: 90, branches: 90, functions: 90, statements: 90 },
    },
  },
  build: {
    outDir: 'build',
  },
  define: {
    '__APP_VERSION__': JSON.stringify(packageJson.version),
  }
});