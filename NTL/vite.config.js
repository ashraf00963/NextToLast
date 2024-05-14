import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/NextToLast/', // This should match your repository name
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
});