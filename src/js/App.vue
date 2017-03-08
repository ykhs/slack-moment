<template>
  <div class="app">
    <my-header
      :user="user"
      :needShowSignIn="needShowSignIn"
      :signOut="signOut"
    ></my-header>
    <router-view :key='$route.fullPath'></router-view>
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions
} from 'vuex'
import MyHeader from './components/MyHeader.vue'

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
    MyHeader
  }
}
</script>

<style scoped>
.app {
  min-height: 100vh;
}
</style>
