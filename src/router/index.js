import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Queue from '@/components/Queue';
import Watched from '@/components/Watched';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/queue',
      name: 'Queue',
      component: Queue,
    },
    {
      path: '/watched',
      name: 'Watched',
      component: Watched,
    },
  ],
});
