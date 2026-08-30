import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('node_modules/react') ||
            id.includes('node_modules/react-dom')
          ) {
            return 'react-vendor'
          }

          if (id.includes('node_modules/react-router-dom')) {
            return 'router'
          }

          if (id.includes('node_modules/swiper')) {
            return 'swiper'
          }
        },
      },
    },

    chunkSizeWarningLimit: 1000,

    minify: 'terser',

    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-icons',
    ],
  },
})