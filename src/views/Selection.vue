<template>
  <div class="home">
    <Selection />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  components: {
    Selection: () => import('../components/SelectionComponent.vue'),
  },
};
</script>
