import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import Vuetify from 'vuetify';
import App from './views/App';
import router from './router';
import store from './store';
import './config/firebase';
import './styles';

Vue.use(Vuetify);

store.dispatch('startLoading');

sync(store, router);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
