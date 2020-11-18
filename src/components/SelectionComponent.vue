<template>
  <v-container
    fluid
  >
  <BaseDialog @yes="ready" :data="formData" />
    <v-row
    class="mt-15"
    >
      <v-col
      cols="12"
      >
       <BaseSubHeading class="text-center">Choose Your Subjects</BaseSubHeading>
       <v-card
            flat
            color="transparent"
            class="pa-auto mx-auto"
            style="width: 20rem;"  height="">
            <v-card-text>
                <v-form>
                <v-select
                dense
                color="accent"
                flat
                outlined
                v-model="studentSelect"
                :error-messages="studentSelectErrors"
                label="Student type"
                required
                :items="studentType"
                @change="loadElectives"
                @blur="$v.studentSelect.$touch()"
                ></v-select>
                <v-text-field
                color="accent"
                dense
                flat
                label="Compulsory"
                readonly
                value="Mathematics"
                outlined
                ></v-text-field>
                <v-text-field
                color="accent"
                outlined
                dense
                flat
                label="Compulsory"
                readonly
                value="English"
                ></v-text-field>
                <v-select
                color="accent"
                dense
                flat
                outlined
                v-model="firstElective"
                :error-messages="firstElectiveErrors"
                label="Eelective A"
                :items="electives"
                required
                @change="loadSecondElectives"
                @blur="$v.firstElective.$touch()"
                ></v-select>
                <v-select
                dense
                flat
                color="accent"
                outlined
                v-model="secondElective"
                :error-messages="secondElectiveErrors"
                label="Elective B"
                :items="secondElectives"
                required
                @change="$v.secondElective.$touch()"
                @blur="$v.secondElective.$touch()"
                ></v-select>
                <BaseSmallBtn
                    class="submitBtn"
                    :disabled="$v.$anyError || !checkForm"
                    color="primary"
                    @click.enter="confirm"
                    >submit
                </BaseSmallBtn>
                <BaseSmallBtn
                    class="resetBtn"
                    right
                    color="primary"
                    @click.enter="clear"
                    >reset
                </BaseSmallBtn>
            </v-form>
            </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable no-unused-expressions */
import { validationMixin } from 'vuelidate';
import {
  required,
} from 'vuelidate/lib/validators';
import { uuid } from 'vue-uuid';
import valid from '../utils/jwtoken';

export default {
  mixins: [validationMixin],

  validations: {
    siteRoleSelect: { required },
    studentSelect: { required },
    firstElective: { required },
    secondElective: { required },
  },

  data: () => ({
    gameId: '',
    token: '',
    formData: {},
    studentSelect: '',
    firstElective: '',
    secondElective: '',
    yearSelect: '',
    examTypeSelect: '',
    studentType: [
      'Science',
      'Art',
      'Commercial',
    ],
    electives: [],
    secondElectives: [],
    year: [],
    address: '',
    science: [
      'Biology',
      'Physics',
      'Chemistry',
      'Geography',
    ],
    commerce: [
      'Commerce',
      'Accounting',
      'Economics',
      'Insurance',
    ],
    art: [
      'Government',
      'History',
      'CRK',
      'IRK',
    ],
    examTypes: [
      'utme',
      'wassce',
      'post-utme',
    ],
  }),

  computed: {
    studentSelectErrors() {
      const errors = [];
      if (!this.$v.studentSelect.$dirty) return errors;
      if (!this.$v.studentSelect.required) errors.push('Student Type is required.');
      return errors;
    },
    firstElectiveErrors() {
      const errors = [];
      if (!this.$v.firstElective.$dirty) return errors;
      if (!this.$v.firstElective.required) errors.push('Please select an elective subject');
      return errors;
    },
    secondElectiveErrors() {
      const errors = [];
      if (!this.$v.secondElective.$dirty) return errors;
      if (!this.$v.secondElective.required) errors.push('Please select an elective subject');
      return errors;
    },
    checkForm() {
      // eslint-disable-next-line max-len
      if (!this.studentSelect || !this.firstElective || !this.secondElective || !this.yearSelect) return false;
      return true;
    },
  },

  methods: {
    openDialog(type, message) {
      this.$store.commit('OPEN_ACTION_DIALOG', {
        type,
        message,
      });
    },

    loadSubjectsToDialog() {
      const subjects = [
        'Mathematics',
        'English',
        this.firstElective,
        this.secondElective,
      ];
      this.gameId = uuid.v1();
      this.token = valid.createToken(this.gameId);
      console.log(this.token);
      this.formData.year = this.yearSelect;
      this.formData.subjects = [...subjects];
      this.formData.type = this.examTypeSelect;
      this.$store.commit('LOAD_SELECTIONS', this.formData);
    },

    closeDialog() {
      this.$store.commit('CLOSE_ACTION_DIALOG');
    },
    confirm() {
      this.loadSubjectsToDialog();
      const message = 'Drag and drop subjects to re-arrange';
      this.openDialog('Re-arrange', message);
    },
    ready() {
      this.closeDialog();
      this.submit();
    },
    submit() {
      this.$store.commit('LOADER_ON', 'Setting');
      const data = {
        gameId: this.gameId,
        token: this.token,
      };
      console.log(data);
      this.$store.dispatch('startGame', data);
      this.$router.push({ name: 'Game', params: { id: this.gameId } });
    },
    clear() {
      this.$v.$reset();
      this.studentSelect = '';
      this.firstEelective = '';
      this.secondElective = '';
      this.yearSelect = '';
      this.genderSelect = null;
      this.formData = {};
    },

    // use recursion to get year range
    generateYear(startNum, endNum) {
      if (endNum - startNum === 0) {
        return [startNum];
      }
      const numbers = this.generateYear(startNum, endNum - 1);
      this.year.push(endNum);
      return numbers;
    },

    randomNumGenerator(length) {
      const arrLength = length;
      const randomNum = Math.floor(Math.random() * arrLength);
      return randomNum;
    },

    // programatically select exam year
    autoSelectYear() {
      const randomNum = this.randomNumGenerator(this.year.length);
      this.yearSelect = this.year[randomNum];
    },

    autoSelectExamType() {
      const randomNum = this.randomNumGenerator(this.examTypes.length);
      this.examTypeSelect = this.examTypes[randomNum];
    },

    loadElectives() {
      console.log(this.studentSelect);
      switch (this.studentSelect) {
        case 'Science':
          this.electives = this.science;
          break;
        case 'Commercial':
          this.electives = this.commerce;
          break;
        case 'Art':
          this.electives = this.art;
          break;
        default:
          this.electives = [];
      }
    },
    loadSecondElectives() {
      this.secondElectives = this.electives.filter((elective) => elective !== this.firstElective);
    },
  },
  components: {
  },
  created() {
    this.generateYear(2001, 2015);
    this.autoSelectYear();
    this.autoSelectExamType();
    console.log(this.yearSelect);
    console.log(this.examTypeSelect);
  },
};
</script>
<style scoped>
.submitBtn {
    position: relative;
    bottom: 1rem;
}
.resetBtn {
    position: relative;
    left: 6rem;
    bottom: 1rem;
}
</style>
