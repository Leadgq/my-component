import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import ElementPlus from 'unplugin-element-plus/vite'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    ElementPlus({
      useSource: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'MyComponents',
      formats: ['es', 'umd'],
      fileName: (format) => format === 'es' ? 'index.es.js' : 'index.umd.js',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus'
        },
      },
    },
  },
})