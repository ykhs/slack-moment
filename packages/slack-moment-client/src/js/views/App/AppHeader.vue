<template>
  <v-card flat class="SM-AppHeader teal lighten-1">
    <v-container>
      <v-layout row wrap>

        <v-toolbar-title class="SM-AppHeader__brand headline">
          <router-link to="/">
            Slack Moment
          </router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <div class="SM-AppHeader__menu">

          <template v-if="user.name">
            <v-menu offset-y>
              <v-avatar slot="activator">
                <img :src="user.image_48">
              </v-avatar>
              <v-list>
                <v-subheader>
                  Signed in as {{ user.name }}
                </v-subheader>
                <v-list-tile>
                  <v-list-tile-title>
                    <a class="" href="#" @click.prevent="signOut">
                      Sign out
                    </a>
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </template>

          <template v-if="needShowSignIn">
            <v-tooltip bottom>
              <v-btn icon large href="/auth/slack" slot="activator">
                <v-icon medium color="white">fa-sign-in</v-icon>
              </v-btn>
              <span>Sign In</span>
            </v-tooltip>
          </template>

        </div>

      </v-layout>
    </v-container>
  </v-card>
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
.SM-AppHeader__brand a {
  font-weight: 700;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
}
</style>
