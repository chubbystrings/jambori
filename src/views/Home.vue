<template>
  <div class="home text-center">
    <img @load="onload" alt="Jambori logo" src="../assets/logo2.png">
    <Home v-if="loadNow" />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  components: {
    Home: () => import('../components/HomeComponent.vue'),
  },
  data: () => ({
    loadNow: false,
  }),
  methods: {
    onload() {
      this.loadNow = true;
    },
  },
};
</script>
