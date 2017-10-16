<template>
  <div>

    <v-text-field
      prepend-icon="search"
      hide-details
      single-line
      autofocus
      v-model="search"
      placeholder="Search..."
      class="my-2"
    ></v-text-field>

    <v-list two-line>
      <template v-for="(channel, index) in filteredChannels">
        <v-list-tile
          ripple
          :to="'/channels/' + channel.id"
          :key="channel.id"
        >
          <v-list-tile-content>
            <v-list-tile-title>
              {{ channel.name }}
            </v-list-tile-title>
            <v-list-tile-sub-title class="grey--text">
              {{ channel.topic.value }}
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-if="index + 1 < filteredChannels.length" :key="channel.id"></v-divider>
      </template>
    </v-list>

  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions
} from 'vuex'

export default {
  name: 'Channels',
  data () {
    return {
      search: ''
    }
  },
  computed: {
    ...mapState('slack', ['accessToken']),
    ...mapGetters('slack', [
      'memberChannels',
      'findMemberById'
    ]),
    filteredChannels () {
      const r = new RegExp(this.search)
      return this.memberChannels.filter(channel => r.test(channel.name))
    }
  },
  methods: {
    ...mapActions('slack', [
      'getChannels',
      'getMembers'
    ]),
    async getResourceIfPossible (token) {
      if (token) {
        await Promise.all([
          this.getChannels(),
          this.getMembers()
        ])
      } else {
        return false
      }
    }
  },
  async created () {
    if (!await this.getResourceIfPossible(this.accessToken)) {
      this.$watch('accessToken', token => {
        this.getResourceIfPossible(token)
      })
    }
  }
}
</script>
