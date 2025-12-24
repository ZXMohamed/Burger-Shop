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
    assetsInlineLimit: 0,
    sourcemap: 'hidden', //*more secure even if light house show Best Practices error
    ssr: 'src/serverEntry.jsx', //*use when build ssr
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
    noExternal: ['react-helmet-async', 'react-icons']
  }
})
