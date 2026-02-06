import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // S'assure que la variable est bien injectée au build (notamment sur Vercel)
  define: {
    'import.meta.env.VITE_MISTRAL_API_KEY': JSON.stringify(process.env.VITE_MISTRAL_API_KEY ?? ''),
  },
})
