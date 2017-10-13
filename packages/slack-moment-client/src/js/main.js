import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import store from './store'
import './config/firebase'

store.dispatch('startLoading')

sync(store, router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
