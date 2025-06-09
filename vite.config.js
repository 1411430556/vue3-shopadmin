import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { CodeInspectorPlugin } from 'code-inspector-plugin'
import { qrcode } from 'vite-plugin-qrcode'
// windicss插件配置
import WindiCSS from 'vite-plugin-windicss'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // 设置 src 别名
      // 这里配置了路径别名，将 '~' 符号映射到项目的 src 目录
      // 这样在导入文件时，可以使用 '~/components/xxx' 代替 '../../../components/xxx'
      // 使得导入路径更加简洁清晰，避免了复杂的相对路径，例如：
      // 在 src/components/Button.vue 中，可以使用 '~/components/Button.vue' 代替 '../../../components/Button.vue'
      '~': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://ceshi13.dishait.cn',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [
    vue(),
    WindiCSS(),
    qrcode(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    CodeInspectorPlugin({
      bundler: 'vite',
      editor: 'cursor',
    }),
  ],
})
