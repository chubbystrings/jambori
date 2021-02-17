import Vue from 'vue';
import VueRouter from 'vue-router';
import confirm from '../utils/confirmToken';
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/selection',
    name: 'Selection',
    component: () => import('../views/Selection.vue'),
  },

  {
    path: '/game/:id',
    name: 'Game',
    beforeEnter(to, from, next) {
      if (to.params.id && (confirm(to.params.id))) {
        next();
      } else {
        next({ name: 'Home' });
      }
    },
    component: () => import('../views/Game.vue'),
  },

  {
    path: '/:notFound(.*)',
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
