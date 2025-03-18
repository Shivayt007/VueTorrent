import vue from '@vitejs/plugin-vue';
import { defineConfig, loadEnv } from 'vite';
import vuetify from 'vite-plugin-vuetify';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const qBittorrentTarget = env.VITE_QBITTORRENT_TARGET ?? 'http://localhost:8080';

  return {
    base: './',
    build: {
      target: 'esnext',
      outDir: mode === 'demo' ? './vuetorrent-demo' : './vuetorrent/public',
    },
    plugins: [
      vue(),
      vuetify({ autoImport: true }),
    ],
    server: {
      host: true,
      allowedHosts: ['lovetoride-vue.2gom57.easypanel.host'],
      proxy: {
        '/api': {
          target: qBittorrentTarget,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
