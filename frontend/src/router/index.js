import Vue from 'vue';
import VueRouter from 'vue-router';
import { routers } from '@/config/router.config';
import { isLogin } from '@/utils/cookie';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: '/katalyst',
  routes: routers
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isLogin()) {
    return next({ name: 'Login' });
  }
  return next();
});

router.afterEach((to, from, next) => {
  document.querySelector('title').innerText = `${to.meta.title} | Katalyst`;
});

export default router;
