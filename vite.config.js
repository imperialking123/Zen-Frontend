import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    historyApiFallback: true, // 👈 ensures dev server behaves like Vercel
  },
  build: {
    outDir: 'dist', // 👈 make sure this matches what Vercel expects
  },
})
