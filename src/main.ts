import '@/registerServiceWorker';
import 'reflect-metadata';
import { AuthService } from '@/services/AuthService';
import AppComponent from '@/App.vue';
import ErrorComponent from '@/views/Error.vue';
import CustomVuex from '@/store';
import router from '@/router';
import Vue, { Component } from 'vue';
import vuetify from '@/plugins/vuetify';
import { Logger } from '@/tools/Logger';

Vue.config.productionTip = false;

const logger = new Logger({ context: 'ApplicationBoostrap' });
const authService = AuthService.getInstance();

async function start() {
  let entryComponent: Component = AppComponent;
  let store;

  try {
    Vue.use(CustomVuex);

    store = await CustomVuex.init();

    Vue.prototype.$ability = authService.defineAbility();
  } catch (error) {
    logger.error(error);

    entryComponent = ErrorComponent;
  }

  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(entryComponent),
  }).$mount('#app');
}

start();
