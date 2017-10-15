<template>
  <header class="SM-AppHeader">
    <div class="SM-AppHeader__container d-flex px-3 justify-content-between container">

      <router-link class="SM-AppHeader__logo navbar-brand" to="/">
        Slack Moment
      </router-link>

      <div class="SM-AppHeader__menu">
        <template v-if="user.name">
          <span class="navbar-text mr-3">
            Signed in as {{ user.name }}
          </span>
          <a class="btn btn-sm align-middle btn-outline-secondary" href="#" @click.prevent="signOut">
            Sign out
          </a>
        </template>

        <template v-if="needShowSignIn">
          <a class="SM-AppHeader__signIn" href="/auth/slack">
            <i class="fa fa-sign-in" aria-hidden="true"></i>
          </a>
        </template>
      </div>

    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  props: [
    'needShowSignIn',
    'user',
    'signOut'
  ]
}
</script>

<style scoped>
.SM-AppHeader {
  margin-bottom: 20px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: rgba(255, 255, 255, 0.8);
  background-color: #00C9B7;
}
.SM-AppHeader__logo {
  line-height: 1;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 700;
}
.SM-AppHeader__signIn {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.5em;
}
</style>
