import vitePluginsAutoI18n, { YoudaoTranslator } from 'vite-auto-i18n-plugin'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { CodeInspectorPlugin } from 'code-inspector-plugin'
// windicss插件配置
import WindiCSS from 'vite-plugin-windicss'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // 设置 src 别名
      '~': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    // host: '0.0.0.0',
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
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    CodeInspectorPlugin({
      bundler: 'vite',
      // editor: 'trae',
    }),
    vitePluginsAutoI18n({
      targetLangList: ['en', 'ko', 'ja', 'ru', 'fr', 'de', 'es', 'pt', 'it', 'th'],
      translator: new YoudaoTranslator({
        appId: '6612167413defbe1',
        appKey: 'sxe5oBv5ovnE7xiFkNNRNfADjFEZLKie',
      }),
    }),
  ],
})
