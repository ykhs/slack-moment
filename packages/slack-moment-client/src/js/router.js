import Vue from 'vue';
import Router from 'vue-router';
import Index from './views/Index.vue';
import Channels from './views/Channels.vue';
import Channel from './views/Channel.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/channels',
      component: Channels
    },
    {
      path: '/channels/:id',
      component: Channel
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});
