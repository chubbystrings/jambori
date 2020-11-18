<template>
<transition
  enter-active-class="animated fadeInRightBig"
  leave-active-class="animated fadeOut"
>
  <div
   style=" z-index: 5000; position: fixed; bottom: 5rem; right: 0.5rem">
    <v-alert
      :value="notification.notify"
      color="error"
      border="left"
      elevation="10"
      colored-border
      icon="mdi-alert"
      style="z-index: 5000"
      width="330"
      class="ma-0 pa-2 error--text"
    >
        {{ notification.type }}!!!.
       <p
         class=""
         >
         {{notification.message}}
       </p>
       <v-icon
            style="position: absolute; right: 0.1rem; bottom: 1.5rem;"
            color="error"
            @click="closeNotification">mdi-delete
        </v-icon>
    </v-alert>
  </div>
</transition>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      alert: true,
    };
  },
  computed: {
    ...mapState(['notification']),
  },

  methods: {
    closeNotification() {
      this.$store.commit('REMOVE_NOTIFICATION');
    },
  },
};
</script>
<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css";
</style>
