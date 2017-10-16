<template>
  <v-list-tile
    class="SM-Message"
    avatar
    :key="message.ts"
    :class="{ selected: isSelected }"
    @click.prevent="toggleSelectMessage(message.ts)"
  >
    <v-list-tile-avatar class="SM-Message__avatar">
      <img :src="(findMemberById(message.user).profile || {}).image_32" />
    </v-list-tile-avatar>
    <v-list-tile-content class="SM-Message__content">
      <v-list-tile-title class="SM-Message__title">
        {{ message.text }}
      </v-list-tile-title>
      <v-list-tile-sub-title class="SM-Message__subTitle">
        {{ findMemberById(message.user).name }} - {{ formatTs(message.ts) }}
      </v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>

</template>

<script>
export default {
  name: 'Message',
  props: [
    'selectMessages',
    'message',
    'toggleSelectMessage',
    'findMemberById',
    'formatTs'
  ],
  computed: {
    isSelected () {
      return this.selectMessages.includes(this.message.ts)
    }
  }
}
</script>

<style scoped>
.SM-Message a.list__tile {
  height: auto;
}
.SM-Message__title {
  height: auto;
  word-break: break-all;
  word-wrap: break-word;
  white-space: normal;
  overflow: visible;
}
.SM-Message.selected {
  background: #ececec;
}
</style>
