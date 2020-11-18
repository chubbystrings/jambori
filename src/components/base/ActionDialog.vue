<template>
  <v-row justify="center">
     <v-dialog :value="actionDialog.dialog"
      persistent max-width="290"
       v-if="actionDialog.type === 'Re-arrange'">
        <div class="text-center white">
        <v-avatar class="text--center" size="100">
         <v-img src="../../assets/logo2.png"></v-img>
       </v-avatar>
        </div>
      <v-card color="white">
        <v-card-text class="subtitle primary--text font-weight-bold">
          {{actionDialog.message}}
        </v-card-text>
        <div>
        <div class='drop-zone'
        @drop='onDrop($event)'
        @dragover.prevent
        @dragenter.prevent
        >
          <div v-for='(item, i) in selectedSubjects.subjects'
           :key='item'
            class='drag-el primary--text'
            draggable
            @dragstart='startDrag($event, i)'
          >
            {{ item }}
          </div>
        </div>
      </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div>
            <v-btn color="primary" text @click="cancel">Cancel</v-btn>
            <v-btn color="primary" text @click="yes">Ok, Start</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog :value="actionDialog.dialog" persistent max-width="290" v-else>
      <v-card color="white">
        <v-card-title class="headline primary--text">{{actionDialog.type}}</v-card-title>
        <v-card-text class="primary--text font-weight-bold">{{actionDialog.message}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div v-if="actionDialog.type === 'Start Game'">
          <v-btn color="primary" text @click="cancel">Cancel</v-btn>
          <v-btn color="primary" text @click="yes">Yes</v-btn>
          </div>
          <div v-if="actionDialog.type === 'Save Answer'">
            <v-btn color="primary" text @click="cancelSelected">Cancel</v-btn>
            <v-btn color="primary" text @click="save">Yes, Next</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';

export default {

  name: 'BaseDialog',
  props: ['data'],
  data: () => ({
    selections: [],
  }),

  computed: {
    ...mapState(['actionDialog', 'selectedOptionData', 'selectedSubjects']),
  },

  methods: {

    startDrag(evt, index) {
      const { dataTransfer } = evt;
      dataTransfer.dropEffect = 'move';
      dataTransfer.effectAllowed = 'move';
      dataTransfer.setData('subIndex', index);
    },

    onDrop(evt) {
      const subIndex = Number(evt.dataTransfer.getData('subIndex'));
      const subject = this.selectedSubjects.subjects[subIndex];
      const sub = this.selectedSubjects.subjects.find((item) => item === subject);
      const dropIndex = this.selectedSubjects.subjects.indexOf(evt.target.innerText);
      const data = {
        sub,
        dropIndex,
      };
      this.$store.commit('REARRANGE_SELECTIONS', data);
    },

    yes() {
      this.$emit('yes');
    },
    save() {
      this.cancel();
      const { letter, option } = this.selectedOptionData;
      this.$emit('save', letter, option);
    },
    cancel() {
      this.$store.commit('CLOSE_ACTION_DIALOG');
    },
    cancelSelected() {
      this.cancel();
      this.$store.commit('CLEAR_OPTION_SELECTED');
    },
  },
  watch: {
    //
  },
};
</script>
<style scoped>
.drop-zone {
    background-color: #eee;
    margin-bottom: 10px;
    padding: 10px;
  }

  .drag-el {
    background-color: #f3a022;
    margin-bottom: 10px;
    padding: 5px;
  }
</style>
