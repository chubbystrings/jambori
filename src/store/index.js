import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loader: {
      overlay: false,
      message: 'wait',
    },
    gameToken: '',
    results: null,
    totalScore: 0,
    resultDialog: false,
    jamboriData: {},
    actionDialog: {
      dialog: false,
      action: false,
    },
    selectedOptionData: {},
    selectedSubjects: {},
    notification: {
      notify: false,
    },
    missingScript: false,
    missingSubjects: [],
    attemptedScripts: [],
  },
  mutations: {
    SHOW_NOTIFICATION(state, data) {
      state.notification.notify = true;
      state.notification.type = data.type;
      state.notification.message = data.message;
    },
    REMOVE_NOTIFICATION(state) {
      state.notification.notify = false;
      state.notification.type = '';
      state.notification.message = '';
    },

    LOADER_ON(state, message) {
      state.loader.overlay = true;
      state.loader.message = message;
    },

    LOADER_OFF(state) {
      state.loader.overlay = false;
      state.loader.message = '';
    },

    LOAD_SELECTIONS(state, data) {
      state.selectedSubjects = {
        ...data,
      };
    },

    REARRANGE_SELECTIONS(state, data) {
      const { sub, dropIndex } = data;
      const index = state.selectedSubjects.subjects.indexOf(sub);
      state.selectedSubjects.subjects.splice(index, 1);
      state.selectedSubjects.subjects.splice(dropIndex, 0, sub);
    },

    RESULT_DIALOG(state, data) {
      state.resultDialog = true;
      state.results = data.results;
      state.totalScore = data.score;
      state.missingScript = data.missing;
    },
    CLOSE_RESULT_DIALOG(state) {
      state.resultDialog = false;
      state.results = null;
      state.score = 0;
    },
    SET_GAME_TOKEN(state, token) {
      state.gameToken = token;
    },

    START_GAME(state) {
      state.jamboriData = {
        ...state.selectedSubjects,
      };
    },
    OPEN_ACTION_DIALOG(state, data) {
      state.actionDialog.dialog = true;
      state.actionDialog.type = data.type;
      state.actionDialog.message = data.message;
    },

    CLOSE_ACTION_DIALOG(state) {
      state.actionDialog = {
        dialog: false,
        action: false,
        message: '',
      };
    },
    LOAD_OPTION_SELECTED(state, data) {
      state.selectedOptionData.letter = data.letter;
      state.selectedOptionData.option = data.option;
    },

    CLEAR_OPTION_SELECTED(state) {
      state.selectedOptionData = {};
    },

    MISSING_SUBJECTS(state, data) {
      const { attempted, missing } = data;
      state.attemptedScripts = attempted;
      state.missingSubjects = [...missing];
    },

    CLEAR_DATA(state) {
      state.loader = {
        overlay: false,
        message: 'wait',
      };
      state.results = null;
      state.totalScore = 0;
      state.resultDialog = false;
      state.jamboriData = {};
      state.actionDialog = {
        dialog: false,
        action: false,
      };
      state.selectedOptionData = {};
      state.attemptedScripts = [];
      state.missingScripts = [];
      state.selectedSubjects = {};
      state.gameToken = '';
    },
  },
  actions: {
    startGame({ commit }, data) {
      const { token } = data;
      commit('START_GAME');
      commit('SET_GAME_TOKEN', token);
    },
    closeResultDialog({ commit }) {
      commit('CLOSE_RESULT_DIALOG');
    },
  },
  getters: {
    getToken(state) {
      return state.gameToken;
    },
  },
  modules: {
  },
});
