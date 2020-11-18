<template>
    <div class="text-center">
        <v-icon large color="accent">mdi-clock-outline</v-icon>
        <BaseSubHeading>{{ minuteAndSec }}</BaseSubHeading>
    </div>
</template>
<script>
export default {
  props: ['start', 'pause'],
  data: () => ({
    seconds: 60,
    minute: 1,
    pauseTime: null,
  }),

  methods: {
    timer() {
      this.pauseTime = setInterval(() => {
        this.seconds -= 1;
        if (this.seconds === 0) {
          if (this.minute > 0) {
            this.minute -= 1;
            this.seconds = 60;
          } else {
            this.stopClock();
            this.refreshStart();
          }
        }
      }, 1500);
    },

    stopClock() {
      clearInterval(this.pauseTime);
    },
    refreshStart() {
      this.$emit('stop');
      this.seconds = 60;
      this.minute = 1;
    },
  },

  computed: {
    minuteAndSec() {
      if (this.minute < 10 && this.seconds < 10) {
        return `0${this.minute} : 0${this.seconds}`;
      }
      if (this.seconds < 10) {
        return `${this.minute} : 0${this.seconds}`;
      }
      if (this.minute < 10) {
        return `0${this.minute} : ${this.seconds}`;
      }
      return `${this.minute} : ${this.seconds}`;
    },
  },

  watch: {
    start(val) {
      if (val) {
        this.timer();
      }
    },

    pause(val) {
      if (val) {
        this.stopClock();
      }
    },
  },
};
</script>
