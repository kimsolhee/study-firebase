import Vue from 'vue';
import Router from 'vue-router';
import WritePage from '@/views/WritePage.vue'; 
import ListPage from '@/views/ListPage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'ListPage',
      component: ListPage
    },
    {
      path: '/write',
      name: 'WritePage',
      component: WritePage
    }
  ]
});