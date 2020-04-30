import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/movie-:id',
    name: 'movie',
    props: true,
    component: () => import('../components/Movie.vue'),
  },
  {
    path: '*',
    props: true,
    name: 'page-not-found',
    component: () => import('../components/NotFound.vue'),
  },
  {
    path: '/movie-not-found',
    props: true,
    name: 'movie-not-found',
    component: () => import('../components/NotFound.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
