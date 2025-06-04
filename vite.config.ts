import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/scss/variables.scss" as *;
          @use "@/styles/scss/mixins.scss" as *;
        `
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'pinia'],
          icons: ['@mdi/js']
        }
      }
    }
  }
})
