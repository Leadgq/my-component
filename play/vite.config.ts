import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      dirs: ['../packages/components/src'],  // 扫描您的组件目录
      dts: 'src/components.d.ts',            // 生成类型文件
      extensions: ['vue'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../packages/components/src'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
})