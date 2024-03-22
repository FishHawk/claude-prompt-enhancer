import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import monkey, { util } from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      dts: true,
      imports: [
        'vue',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar',
          ],
        },
        util.unimportPreset,
      ],
    }),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: {
          '': 'Claude Prompt Enhancer',
          en: 'Claude Prompt Enhancer',
          'zh-CN': 'Claude 提示词增强',
          'zh-TW': 'Claude 提示詞增強',
        },
        author: 'FishHawk',
        description: {
          '': 'Use predefined prompts by custom command',
          en: 'Use predefined prompts by custom command',
          'zh-CN': '通过自定义命令使用预定义的提示',
          'zh-TW': '通過自定義命令使用預定義的提示',
        },
        namespace: 'https://github.com/FishHawk',
        version: '2024.03.23',
        match: ['https://claude.ai/chat*'],
        license: 'GPL-3.0',
        supportURL:
          'https://github.com/FishHawk/claude-predefined-prompt/issues',
        homepageURL: 'https://github.com/FishHawk/claude-predefined-prompt',
        icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHNoYXBlLXJlbmRlcmluZz0iZ2VvbWV0cmljUHJlY2lzaW9uIiB0ZXh0LXJlbmRlcmluZz0iZ2VvbWV0cmljUHJlY2lzaW9uIiBpbWFnZS1yZW5kZXJpbmc9Im9wdGltaXplUXVhbGl0eSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cmVjdCBmaWxsPSIjQ0M5QjdBIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgcng9IjEwNC4xODciIHJ5PSIxMDUuMDQyIi8+PHBhdGggZmlsbD0iIzFGMUYxRSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMzE4LjY2MyAxNDkuNzg3aC00My4zNjhsNzguOTUyIDIxMi40MjMgNDMuMzY4LjAwNC03OC45NTItMjEyLjQyN3ptLTEyNS4zMjYgMGwtNzguOTUyIDIxMi40MjdoNDQuMjU1bDE1LjkzMi00NC42MDggODIuODQ2LS4wMDQgMTYuMTA3IDQ0LjYxMmg0NC4yNTVsLTc5LjEyNi0yMTIuNDI3aC00NS4zMTd6bS00LjI1MSAxMjguMzQxbDI2LjkxLTc0LjcwMSAyNy4wODMgNzQuNzAxaC01My45OTN6Ii8+PC9zdmc+',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
