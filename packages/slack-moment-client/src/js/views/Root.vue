<template>
  <main class="main">

    <div class="container">
      <div class="card">
        <div class="card-block p-5">
          <p class="card-title">
            Slack Momentは、Slackのログをまとめて書き出すサービスです。
          </p>
          <p class="card-text">
            まとめたログはMarkdownとして出てくるので、適当な場所に貼って残すといいと思います。
          </p>

          <template v-if="needShowSignIn">
            <hr class="my-4">
            <p>
              Slackアカウントでログインしてください。
            </p>
            <a href="/auth/slack" class="btn btn-info">
              <i class="fa fa-lg fa-slack" aria-hidden="true"></i>
              Slackアカウントでログイン
            </a>
          </template>

        </div>
      </div>
    </div>

    <div class="container">
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
    </div>
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
