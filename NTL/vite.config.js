import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // Use root base for custom domain
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
});
