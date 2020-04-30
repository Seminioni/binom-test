import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css';
import { api } from '@/modules/api.js';

Vue.config.productionTip = false;

(async () => {
  const configuration = (await api('/configuration')).data;
  const { genres } = (await api('/genre/movie/list')).data;

  return new Vue({
    router,
    render: h => h(App, { props: { configuration, genres: [...genres] } }),
  }).$mount('#app');
})();
