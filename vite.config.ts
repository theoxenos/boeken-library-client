import {defineConfig} from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './testSetup.ts'
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_PROXY_URL || 'http://localhost:3000/',
        changeOrigin: true,
      }
    }
  }
})
