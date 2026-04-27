import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/HgsReact-2026/',
  server: {
    port: 3000,
    open: true
  }
})
