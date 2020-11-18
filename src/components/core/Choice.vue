<template>
    <div class="choice-container" @click="confirm(letters, questions)">
        <p class="choice-prefix">{{`${letters}` | upperCase}}</p>
        <p class="choice-text">{{questions}}</p>
    </div>
</template>
<script>
export default {
  props: ['letters', 'questions'],
  data: () => ({
    selectedOption: '',
    selectedLetter: '',
  }),
  filters: {
    trimLength(val) {
      if (val.length < 200) { return val; }
      return `${val.substring(0, 200)}...`;
    },

    lowerCase(val) {
      return val.toLowerCase();
    },

    upperCase(val) {
      if (val) {
        return val.toUpperCase();
      }
      return '';
    },
  },

  methods: {
    chose(letter, question) {
      this.$emit('chosen', `${letter}`, `${question}`);
    },

    confirm(letter, option) {
      const optionsSelected = {
        letter,
        option,
      };
      this.$store.commit('LOAD_OPTION_SELECTED', optionsSelected);
      const data = {
        type: 'Save Answer',
        message: `You selected ${letter.toUpperCase()}?`,
      };
      this.$store.commit('OPEN_ACTION_DIALOG', data);
    },

  },

  computed: {
    //
  },

};
</script>
<style scoped>
.choice-container {
    display: flex;
    width: 100%;
    border: 0.1rem solid #f3a022;
    background-color: transparent;
    text-align: center;
    color: white;
    box-sizing: border-box;
    padding: 0.5rem;
    height: 5rem;
    overflow: auto;
}
.choice-container:hover {
    cursor: pointer;
    box-shadow: 0 0.4rem 1.4rem 0 rgba(86, 185, 234, 0.5);
    transform: translateY(-0.1rem);
    transition: transform 150ms;
    color: #f3a022;
}
.choice-prefix {
    padding: 0.5rem;
    background-color:#f3a022;
    color: white;
    margin: 0;
}

.choice-text {
    width: 100%;
}
</style>
