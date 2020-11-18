<template>
    <v-hover
    v-slot="{ hover }"
    >
    <v-btn
        color="accent"
        rounded
        v-bind="$attrs"
        v-on="$listeners"
        class="white--text mt-1"
        :outlined=" hover ? !outlined : outlined"
    >
        <slot />
    </v-btn>
    </v-hover>
</template>

<script>
export default {
  name: 'BaseSmallBtn',
  data: () => ({
    outlined: true,
  }),
};
</script>
<style scoped>
</style>
