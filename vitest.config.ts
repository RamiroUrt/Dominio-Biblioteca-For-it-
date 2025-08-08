import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    include: ['**/__tests__/**/*.test.ts'],
    globals: true,
    environment: 'node',
    reporters: ['default', 'verbose']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './domain/src')
    }
  }
})