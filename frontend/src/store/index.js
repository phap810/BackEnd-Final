import Vue from 'vue';
import Vuex from 'vuex';
import menu from '@/config/menu.config';
import user from '@/store/modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menu: menu
  },
  getters: {
    menu: state => state.menu
  },
  modules: {
    user
  }
});
