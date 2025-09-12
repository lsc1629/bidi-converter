import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['./src/hooks/useLanguage.js', './src/hooks/useTranslation.js']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})