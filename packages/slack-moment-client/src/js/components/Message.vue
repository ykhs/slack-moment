<template>
    <a
      href="#"
      class="message-wrapper p-1 hvr-underline-reveal"
      @click.prevent="toggleSelectMessage(message.ts)"
      :class="{ selected: isSelected }"
    >
      <div class="mt-2" :key="message.ts">
        <div class="d-flex">
          <div class="mr-2">
            <img :src="(findMemberById(message.user).profile || {}).image_32" />
          </div>
          <div>
            <p class="font-weight-bold small mb-1">
              <span class="message-text mr-2">
                {{ findMemberById(message.user).name }}
              </span>
              <span class="font-weight-normal text-muted">
                {{ formatTs(message.ts) }}
              </span>
            </p>
            <p class="message-text mb-1">
              {{ message.text }}
            </p>
          </div>
        </div>
      </div>
    </a>
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
.message-wrapper {
  display: block;
}

.message-wrapper:hover {
  text-decoration: none;
}

.message-text {
  color: #292b2c;
}

.selected {
  background: #ececec;
}
</style>
