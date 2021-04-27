import Vue from 'vue';
import VueI18n from 'vue-i18n';
import enMess from './lang/en.json';
import zhMess from './lang/zh.json';

Vue.use(VueI18n);

const messages = {
  en: enMess,
  zh: zhMess
};

export default new VueI18n({
  locale: 'en',
  fallbackLocale: 'zh',
  messages
});
