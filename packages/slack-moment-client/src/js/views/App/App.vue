<template>
  <v-app>
    <app-header
      :user="user"
      :needShowSignIn="needShowSignIn"
      :signOut="signOut"
    ></app-header>
    <router-view :key='$route.fullPath'></router-view>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions
} from 'vuex'
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'

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
    AppHeader,
    AppFooter
  }
}
</script>

<style scoped>
.SM-App {
  min-height: 100vh;
}
</style>
