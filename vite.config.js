import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/valentines-day6/', // Replace 'yourrepository' with the name of your repository
  build: {
    outDir: 'dist', // Default output directory for Vite builds
  },
  plugins: [react()],
})
