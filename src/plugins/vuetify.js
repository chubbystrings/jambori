import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#004D40',
        secondary: '#FCE4EC',
        error: '#dc3545',
        accent: '#f3a022',
        background: '#4CAF50',
        'primary-light': '#26A69A',
      },
    },
    options: {
      customProperties: true,
    },
  },
});
