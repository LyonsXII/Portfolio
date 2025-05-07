import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      // Create an alias for the 'src' directory to simplify imports
      '@src': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components')
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
})
