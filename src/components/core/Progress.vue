<template>
  <div >
    <v-progress-circular
      :rotate="360"
      :size="100"
      :width="15"
      :value="progress"
      color="accent"
    >
      {{ `${progress}%` }}
    </v-progress-circular>
  </div>
</template>
<script>
export default {
  props: ['progress'],
  data() {
    return {
      interval: {},
      value: 0,
    };
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  mounted() {
    // this.interval = setInterval(() => {
    //   if (this.value === 100) {
    //     this.value = 0;
    //   }
    //   this.value += 10;
    // }, 1000);
  },
};
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
