<template>
  <div class="app">
    <app-header
      :user="user"
      :needShowSignIn="needShowSignIn"
      :signOut="signOut"
    ></app-header>
    <router-view :key='$route.fullPath'></router-view>
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions
} from 'vuex'
import AppHeader from './AppHeader.vue'

export default {
  name: 'App',
  async created () {
    await this.tokenSignInIfNeeded()
    this.watchAuth()
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['needShowSignIn'])
  },
  methods: {
    ...mapActions('firebase', [
      'watchAuth',
      'tokenSignInIfNeeded',
      'signOut'
    ])
  },
  components: {
    AppHeader
  }
}
</script>

<style scoped>
.app {
  min-height: 100vh;
}
</style>
