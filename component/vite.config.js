import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

export default defineConfig({
  assetsInclude: ['**/*.doc', '**/*.docx'],
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './packages/components/src'),
    },
  },
  server: {
    port: 5173,
  },
})