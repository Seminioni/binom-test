import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/tailwind.css';
import { api } from '@/modules/api.js';

Vue.config.productionTip = false;

(async () => {
  const configuration = (await api('/configuration')).data;

  return new Vue({
    router,
    store,
    render: h => h(App, { props: { configuration }}),
  }).$mount('#app');
})();
