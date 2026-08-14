import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(rootDir, './src'),
      // Shared is built as CJS; Vite needs the ESM TypeScript source for named exports.
      '@controle-financeiro/shared': path.resolve(
        rootDir,
        '../packages/shared/src/index.ts',
      ),
    },
  },
  optimizeDeps: {
    exclude: ['@controle-financeiro/shared'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
})
