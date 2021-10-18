import { createApp } from 'vue';
import App from '@/App.vue';
import router, { setupRouter } from '@/router';
import { setupStore } from '@/store';
import utils from '@/common/index';

async function setup() {
  const app = createApp(App);
  setupStore(app);
  setupRouter(app);
  await router.isReady();
  app.config.globalProperties.$utils = utils;
  app.mount('#app', true);
}

setup();
