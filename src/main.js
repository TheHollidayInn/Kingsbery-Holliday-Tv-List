// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import VueAnalytics from 'vue-analytics';
import Meta from 'vue-meta';

import App from './App';
import router from './router';
import { getStore } from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(Vuex);
Vue.use(Meta);
Vue.use(BootstrapVue);
Vue.use(VueAnalytics, {
  id: 'UA-27991830-15',
  router,
});
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: getStore(),
  components: { App },
  template: '<App/>',
});
