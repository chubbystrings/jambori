<template>
   <div class="text-center">
    <v-overlay :value="loader.overlay">
    <v-container style="height: 400px;">
      <v-row
        class="fill-height"
        align-content="center"
        justify="center"
      >
        <v-col
          class="subtitle-1 text-center accent--text"
          cols="12"
        >
         {{ loader.message}}
        </v-col>
        <v-col cols="12">
            <div style="width: 20vw; margin: 0 auto">
                <v-progress-linear
                    color="accent"
                    indeterminate
                    rounded
                    height="6"
                ></v-progress-linear>
            </div>
        </v-col>
      </v-row>
    </v-container>
    </v-overlay>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'AppLoader',
  data: () => ({
    overlay: false,
  }),
  computed: {
    ...mapState(['loader']),
  },
};
</script>
