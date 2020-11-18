<template>
    <v-hover
    v-slot="{ hover }"
    >
    <v-btn
        color="accent"
        rounded
        v-bind="$attrs"
        v-on="$listeners"
        class="white--text btnClass"
        :outlined=" hover ? !outlined : outlined"
        x-large
    >
        <slot />
    </v-btn>
    </v-hover>
</template>

<script>
export default {
  name: 'BaseBtn',
  data: () => ({
    outlined: true,
  }),
};
</script>
<style scoped>
.btnClass {
    position: relative;
    top: 10rem;
}
</style>
