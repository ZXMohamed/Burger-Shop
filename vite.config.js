import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  optimizeDeps: {
    include: ['react-helmet-async'],
  },
  build: {
    ssr: 'src/serverEntry.jsx',
    outDir: 'dist',
    rollupOptions: {
      input: '/index.html',
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setupTests.js',
    include: ['**/*.test.jsx', '**/*.test.js']
  },
  ssr: {
    noExternal: ['react-helmet-async'],
  }
})
