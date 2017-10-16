<template>
  <v-footer class="pa-3">
    <v-spacer></v-spacer>
    <div>
      &copy;2017 Slack Moment by ykhs
    </div>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.SM-AppFooter {
  position: absolute;
  bottom: 0;
  width: 100%;
  /* Set the fixed height of the footer here */
  height: 60px;
  line-height: 60px; /* Vertically center the text there */
}
.SM-AppFooter__container {
  text-align: center;
  color: rgba(0, 0, 0, 0.3);
}
</style>
