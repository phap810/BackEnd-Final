import Vue from 'vue';
import App from '@/App.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.min.css';
import { sync } from 'vuex-router-sync';
import VueI18n from 'vue-i18n';

import i18n from '@/i18n';
import router from '@/router';
import store from '@/store';

Vue.use(Antd);
Vue.use(VueI18n);
Vue.config.productionTip = false;

sync(store, router);

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
