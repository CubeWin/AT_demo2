import { defineConfig } from 'vite'
import { resolve } from 'path';
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/AT_demo2/',
  publicDir: './public',
  build: {
      outDir: resolve(__dirname, 'build'),
      assetsDir: './static',
      publicDir: './public',
  }
})
