<template>
  <div>
    <v-text-field
      prepend-icon="search"
      hide-details
      single-line
      autofocus
      v-model="search"
      placeholder="Search..."
    ></v-text-field>

    <template v-for="channel in filteredChannels">
      <div class="card mt-3" :key="channel.id">
        <div class="card-block">
          <h4 class="card-title">
            {{ channel.name }}
          </h4>
          <h6 class="card-subtitle mb-3 text-muted">
            {{ channel.topic.value }}
          </h6>

          <dl class="d-flex flex-row text-muted">
            <dt class="mr-2">member: </dt>
            <dd>
              <template v-for="(id, index) in channel.members">
                <span :key="id">
                  {{ findMemberById(id).name }}
                </span>
              </template>
            </dd>
          </dl>

          <router-link :to="channel.id" append class="btn btn-secondary btn-block">
            このチャンネルをまとめる
          </router-link>
        </div>
      </div>
    </template>
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
