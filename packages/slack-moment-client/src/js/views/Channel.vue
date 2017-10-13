<template>
  <main class="main" ref="main">
    <div class="container">

      <p class="h5 mt-5">
        まとめたいログを選んで下さい。
      </p>
      <p class="text-muted">
        気になるログを選んでみましょう。<br />
        下の方にたぶんMarkdownになって出てくると思うので、適当な場所に貼って残すといいと思います。
      </p>

      <div class="messages mt-5">
        <div class="message-inner">

          <template v-for="message in messages"">
            <Message
              :selectMessages="selectMessages"
              :message="message"
              :toggleSelectMessage="toggleSelectMessage"
              :findMemberById="findMemberById"
              :formatTs="formatTs"
            ></Message>
          </template>
          <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading"></infinite-loading>
        </div>
      </div>

      <div class="results mt-5">
        <form>
          <div class="form-group">
            <textarea class="form-control" rows="20" readonly="true">{{ now }} に {{ channelNameLink }} で作成したまとめ。

- - -

<template v-for="message in formatMarkdownMessages">{{ message }}</template></textarea>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions
} from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'
import fecha from 'fecha'
import Message from '../components/Message.vue'

export default {
  name: 'Channel',
  computed: {
    ...mapState('slack', [
      'accessToken',
      'selectMessages',
      'hasMoreHistory',
      'channels',
      'team'
    ]),
    ...mapGetters('slack', [
      'messageHistory',
      'findMemberById',
      'latestHistory',
      'formatMarkdownMessage'
    ]),
    id () {
      return this.$route.params.id
    },
    messages () {
      return this.messageHistory(this.id)
    },
    channel () {
      return this.channels.find(c => c.id === this.id) || null
    },
    formatTs: () => ts => {
      [ts] = ts.split('.')
      return fecha.format(+ts * 1000, 'YYYY-MM-DD ddd HH:mm:ss')
    },
    hasMore () {
      return this.hasMoreHistory.includes(this.id)
    },
    now () {
      return fecha.format(Date.now(), 'YYYY-MM-DD ddd HH:mm')
    },
    formatMarkdownMessages () {
      const { id, selectMessages } = this
      return selectMessages
        .map(ts => this.formatMarkdownMessage({ id, ts }))
        .sort((a, b) => {
          const { ts: ats } = a
          const { ts: bts } = b
          const [atime] = ats.split('.')
          const [btime] = bts.split('.')
          return (+atime) - (+btime)
        })
        .map(message => message.markdown)
    },
    channelNameLink () {
      const { channel, team } = this

      if (!channel || !team) return

      const { name: channelName } = channel
      const { domain } = team

      return `[#${channelName}](https://${domain}.slack.com/archives/${channel.name}/)`
    }
  },
  methods: {
    ...mapActions('slack', [
      'getChannelsHistory',
      'getMembers',
      'getTeamInfo',
      'getChannels',
      'toggleSelectMessage'
    ]),
    async getResourceIfPossible (token) {
      if (token) {
        await Promise.all([
          this.getChannelsHistory({ id: this.id }),
          this.getMembers(),
          this.getTeamInfo(),
          this.getChannels()
        ])
      } else {
        return false
      }
    },
    async onInfinite () {
      const latest = this.latestHistory(this.id)

      if (!latest) {
        setTimeout(() => {
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        }, 1000)

        return
      }

      if (!this.hasMore) {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
        return
      }

      await this.getChannelsHistory({
        id: this.id,
        latest: latest.ts
      })
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
    }
  },
  async created () {
    if (!await this.getResourceIfPossible(this.accessToken)) {
      this.$watch('accessToken', async token => {
        await this.getResourceIfPossible(token)
      })
    }
  },
  components: {
    Message,
    InfiniteLoading
  }
}
</script>

<style scoped>
.main {
  min-height: 100vh;
  overflow: hidden;
}

.messages {
  height: 60vh;
  overflow-y: scroll;
  color: #292b2c;
}

textarea {
  resize: none;
}
</style>
