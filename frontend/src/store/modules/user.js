import { setCookie, removeCookie, getCookie } from '@/utils/cookie';
import {
  Login as ApiLogin,
  Logout as ApiLogout
} from '@/api';
import router from '@/router';

const state = {
  user: JSON.parse(getCookie('userInfo')) || null
};

const getters = {
  user: state => state.user
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setToken(state, token) {
    state.token = token;
  }
};

const actions = {
  handleLogin({ commit }, { email, password }) {
    return new Promise((resolve, reject) => {
      ApiLogin({ email, password })
        .then(res => {
          const { token, ...remains } = res.data;
          commit('setUser', remains);
          setCookie('userInfo', remains);
          setCookie('token', token);
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  handleLogout({ commit }, email) {
    return new Promise((resolve, reject) => {
      ApiLogout({ email })
        .then(() => {
          commit('setUser', null);
          removeCookie('userInfo');
          removeCookie('token');
          resolve();
          router.push({ name: 'Login' });
        })
        .catch(() => {
          reject();
        });
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
