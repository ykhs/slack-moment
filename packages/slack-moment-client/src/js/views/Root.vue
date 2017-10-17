<template>
  <main class="main">
    <v-content>
      <v-container>
        <v-layout column>
          <introduction v-if="needShowSignIn"></introduction>

          <template v-if="user.name">
            <v-card class="pa-4">
              <contents-header>
                Channels
              </contents-header>
              <channels></channels>
            </v-card>
          </template>
        </v-layout>
      </v-container>
    </v-content>
  </main>
</template>

<script>
import {
  mapState,
  mapGetters
} from 'vuex'
import Introduction from '../components/Introduction.vue';
import Channels from '../components/Channels.vue';
import ContentsHeader from '../components/ContentsHeader.vue';

export default {
  name: 'Root',
  computed: {
    ...mapState(['user']),
    ...mapGetters(['needShowSignIn'])
  },
  components: {
    Introduction,
    Channels,
    ContentsHeader
  }
}
</script>
