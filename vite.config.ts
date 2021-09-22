import type { UserConfig, ConfigEnv } from 'vite';

import { loadEnv } from 'vite';
import pluginVue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import html from 'vite-plugin-html';
import { resolve } from 'path';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

export default (ConfigEnv: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const viteEnv = loadEnv(ConfigEnv.mode, root);
  return {
    resolve: {
      alias: [
        {
          find: /@\//,
          replacement: pathResolve('src') + '/',
        },
        {
          find: /@api\//,
          replacement: pathResolve('src') + '/common/api/modules',
        },
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    server: {
      port: viteEnv.VITE_PORT as unknown as number,
      host: true,
      // Load proxy configuration from .env
      // proxy: createProxy(VITE_PROXY),
    },
    build: {
      target: 'es2015',
      // outDir: '',
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          // drop_console: VITE_DROP_CONSOLE,
        },
      },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
    plugins: [
      pluginVue(),
      vueJsx(),
      html({
        minify: true,
        inject: {
          // Inject data into ejs template
          injectData: {
            title: viteEnv.VITE_GLOB_APP_TITLE,
          },
        },
      }),
    ],
    define: {},
    css: {
      preprocessorOptions: {},
    },
  };
};
