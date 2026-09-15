import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5183,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      output: {
        /* libraries change rarely, so they cache apart from the system's own code */
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
          icons: ['lucide-react'],
          pageflip: ['react-pageflip'],
        },
      },
    },
  },
});
