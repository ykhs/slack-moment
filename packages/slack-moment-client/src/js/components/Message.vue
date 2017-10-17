<template>
  <v-layout
    row
    spacer
    class="SM-Message py-2"
    :key="message.ts"
    :class="{ selected: isSelected }"
    @click.prevent="toggleSelectMessage(message.ts)"
  >
    <v-flex class="SM-Message__flexAvatar">
      <v-avatar class="SM-Message__avatar mr-2">
        <img :src="(findMemberById(message.user).profile || {}).image_32" />
      </v-avatar>
    </v-flex>
    <v-flex class="SM-Message__flexContent">
      <div class="SM-Message__title">
        {{ message.text }}
      </div>
      <div class="SM-Message__subTitle">
        {{ findMemberById(message.user).name }} - {{ formatTs(message.ts) }}
      </div>
    </v-flex>
  </v-layout>
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
.SM-Message {
  cursor: pointer;
}
.SM-Message:hover {
  background-color: rgba(0, 0, 0, .12);
}
.SM-Message__flexAvatar {
  flex-grow: 0;
}
.SM-Message__title {
  word-break: break-all;
  word-wrap: break-word;
  white-space: normal;
  overflow: visible;

}
.SM-Message__subTitle {
  font-size: 14px;
  color: rgba(0,0,0,.54);
}
.SM-Message.selected {
  background: #ececec;
}
</style>
