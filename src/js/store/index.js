import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

import firebase from './modules/firebase'
import slack from './modules/slack'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    firebase,
    slack
  }
})
