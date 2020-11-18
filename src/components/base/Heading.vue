<template>
  <component
    :is="tag"
    class="display-2 v-heading mb-1 font-weight-light accent--text"
    style=""
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'BaseHeading',

  props: {
    tag: {
      type: String,
      default: 'h1',
    },
  },
};
</script>

<style lang="sass">
  .v-heading
    letter-spacing: 3px !important
</style>
