<template>
  <main class="main">
    <v-content>
      <v-container>
        <introduction v-if="needShowSignIn"></introduction>

        <template v-if="user.name">
          <v-breadcrumbs divider=">">
            <v-breadcrumbs-item disabled>ホーム</v-breadcrumbs-item>
            <v-breadcrumbs-item disabled>チャンネル一覧</v-breadcrumbs-item>
          </v-breadcrumbs>

          <v-card class="pa-4">
            <v-card-title primary-title>
              <div class="title">
                Slack Momentは、Slackのログをまとめて書き出すサービスです。
              </div>
            </v-card-title>
          </v-card>
        </template>

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

export default {
  name: 'Root',
  computed: {
    ...mapState(['user']),
    ...mapGetters(['needShowSignIn'])
  },
  components: {
    Introduction
  },
  data () {
    return {
      items: [
        {
          text: 'Dashboard',
          disabled: false
        },
        {
          text: 'Link 1',
          disabled: false
        },
        {
          text: 'Link 2',
          disabled: true
        }
      ]
    }
  }
}
</script>
