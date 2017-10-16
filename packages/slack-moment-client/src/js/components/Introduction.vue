<template>
  <v-card class="pa-4">
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
    </v-card-text>

    <v-card-actions>
      <v-btn color="cyan darken-1" class="white--text" href="/auth/slack">
        <v-icon left>fa-slack</v-icon>
        Slackアカウントでログイン
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Introduction'
}
</script>
