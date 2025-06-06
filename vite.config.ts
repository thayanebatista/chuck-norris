import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/chuck-norris/' : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/scss/variables";
          @import "@/assets/scss/mixins";
        `
      }
    }
  },
  server: {
    port: 8080,
    open: true,
    cors: true,
    host: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'pinia'],
          'ui-vendor': ['@mdi/js'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['vue', 'pinia', '@mdi/js'],
  },
});
