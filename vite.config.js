import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Generar hash en nombres de archivos para cache busting
    rollupOptions: {
      output: {
        // Hash en nombres de chunks
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['./src/hooks/useLanguage.js', './src/hooks/useTranslation.js']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    
    // Optimizaciones para evitar caché
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Mantener console.logs para debug
      }
    }
  },
  
  // Configuración para desarrollo
  server: {
    // Deshabilitar caché en desarrollo
    headers: {
      'Cache-Control': 'no-store',
    }
  }
})