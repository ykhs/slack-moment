<template>
  <header class="header">
    <nav class="navbar navbar-light bg-faded">
      <div class="container">
        <div class="d-flex justify-content-end">
          <div class="mr-auto">
            <router-link class="navbar-brand" to="/">
              Slack Moment
            </router-link>
          </div>
          <div>
            <template v-if="user.name">
              <span class="navbar-text mr-3">
                Signed in as {{ user.name }}
              </span>
              <a class="btn btn-sm align-middle btn-outline-secondary" href="#" @click.prevent="signOut">
                Sign out
              </a>
            </template>

            <template v-if="needShowSignIn">
              <span class="navbar-text">
                <a class="btn btn-sm align-middle btn-outline-success" href="/auth/slack">
                  Sign in
                </a>
              </span>
            </template>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'MyHeader',
  props: [
    'needShowSignIn',
    'user',
    'signOut'
  ]
}
</script>
