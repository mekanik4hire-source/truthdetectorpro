// vite.config.ts (ROOT)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react()],
  // Tell Vite the real app lives in /client
  root: path.resolve(__dirname, 'client'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client/src'),
      '@shared': path.resolve(__dirname, 'shared'),
      '@assets': path.resolve(__dirname, 'attached_assets'),
    },
  },
  build: {
    // Emit the production build where Express serves static files
    outDir: path.resolve(__dirname, 'server/public'),
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    // Dev only: proxy API to your Express server
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
