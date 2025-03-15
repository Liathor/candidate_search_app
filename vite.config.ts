import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: 'environment',
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/components',  // Add this alias for components
      '@pages': '/src/pages',
      '@api': '/src/api',
      '@interfaces': '/src/interfaces',
    },
  },
});
