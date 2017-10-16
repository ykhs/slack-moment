<template>
  <main class="main">
    <v-content>
      <v-container>

        <template v-if="needShowSignIn">
          <v-card>
            <v-card-title primary-title>
              <div class="title">
                Slack Momentは、Slackのログをまとめて書き出すサービスです。
              </div>
            </v-card-title>

            <v-card-text>
              <div>
                まとめたログはMarkdownとして出てくるので、適当な場所に貼って残すといいと思います。
              </div>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-text>
              <div>
                Slackアカウントでログインしてください。
              </div>
              <v-btn color="cyan" href="/auth/slack">
                <v-icon left>fa-slack</v-icon>
                Slackアカウントでログイン
              </v-btn>
            </v-card-text>
          </v-card>
        </template>

        <template v-if="user.name">
          <div class="d-flex align-items-end">
            <div class="mr-2">
              <img class="rounded" :src="user.image_72">
            </div>
            <div>
              <span>
                {{ user.name }} としてログイン中です。
              </span>
            </div>
          </div>

          <div class="mt-2">
            <p>
              まとめたいログがあるチャンネルを探しましょう。<br />
              次のボタンを押すと、あなたが参加しているチャンネル一覧が表示されます。
            </p>
            <router-link to="channels" class="btn btn-secondary btn-lg btn-block">
              チャンネル一覧を見る
            </router-link>
          </div>
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

export default {
  name: 'Root',
  computed: {
    ...mapState(['user']),
    ...mapGetters(['needShowSignIn'])
  }
}
</script>
