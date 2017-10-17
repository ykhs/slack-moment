<template>
  <main>
    <v-content>
      <v-container fluid grid-list-md>
        <v-layout row>

          <v-flex xs-6 class="SM-Messages">
            <v-card class="pa-2" :style="cardHeight">
              <div class="SM-Messages__scroller">
                <v-container>
                  <v-layout column>
                    <template v-for="(message, index) in messages">
                      <Message
                        :selectMessages="selectMessages"
                        :message="message"
                        :toggleSelectMessage="toggleSelectMessage"
                        :findMemberById="findMemberById"
                        :formatTs="formatTs"
                      ></Message>
                    </template>
                    <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading"></infinite-loading>
                  </v-layout>
                </v-container>
              </div>
            </v-card>
          </v-flex>

          <v-flex xs-6 class="SM-Preview">
            <v-card class="pa-4" :style="cardHeight">
              <textarea
                class="SM-Preview__textArea"
                readonly
                v-model="formattedMessages"
              ></textarea>
            </v-card>
          </v-flex>

        </v-layout>
      </v-container>
    </v-content>
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
    ...mapState(['windowSize']),
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
    formattedMessages () {
      let result = `${this.now} に ${this.channelNameLink}で作成したまとめ。\n\n- - -\n\n`;
      for (const m of this.formatMarkdownMessages) {
        result += m;
      }
      return result;
    },
    channelNameLink () {
      const { channel, team } = this

      if (!channel || !team) return

      const { name: channelName } = channel
      const { domain } = team

      return `[#${channelName}](https://${domain}.slack.com/archives/${channel.name}/)`
    },
    cardHeight () {
      const windowHeight = this.windowSize.y;
      return {
        height: `${windowHeight - 200}px`
      };
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
.SM-Messages {
  width: 100%;
}
.SM-Preview {
  width: 100%;
}
.SM-Messages__scroller {
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: scroll;
  flex: 1;
  height: 100%;
}
.SM-Preview__textArea {
  width: 100%;
  height: 100%;
  padding: 8px;
  background: #ececed;
}
</style>
