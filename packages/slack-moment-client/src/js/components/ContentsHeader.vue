<template>
  <div class="SM-ContentsHeader">
    <div class="SM-ContentsHeader__title">
      <slot></slot>
    </div>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  name: 'ContentsHeader'
}
</script>

<style>
.SM-ContentsHeader__title {
  font-size: 1.3em;
}
</style>
