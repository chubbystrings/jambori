<template>
  <div class="home">
    <Game />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  components: {
    Game: () => import('../components/GameComponent.vue'),
  },
};
</script>
