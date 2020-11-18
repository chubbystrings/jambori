<template>
  <v-app>
    <Loader />
    <v-main class="primary">
      <transition mode="out-in"
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut">
        <router-view />
      </transition>
    </v-main>
    <Alert />
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    //
  }),
  components: {
    Loader: () => import('./components/core/Loader.vue'),
    Alert: () => import('./components/core/Alert.vue'),
  },
};
</script>
<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css";
</style>
