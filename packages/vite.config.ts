import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      include: ['components'],
      outDir: 'dist',
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'components/index.ts'),
      name: 'MyComponents',
      formats: ['es', 'umd'],
      fileName: (format) => format === 'es' ? 'index.es.js' : 'index.umd.js',
    },
    rollupOptions: {
      external: ['vue', 'element-plus'],
      output: {
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus'
        },
      },
    },
  },
})