<template>
    <div>
      <BaseDialog @save="checkAnswer" />
    <v-card
        class="mx-auto"
        color="transparent"
        flat
        style="width: 50rem;"
    >

    <v-container>
      <v-row dense>
          <v-col cols="12">
              <v-row>
                    <v-col cols="4">
                        <div class="text-center">
                            <BaseText>{{ tests.subject }}</BaseText>
                            <v-icon large color="accent">mdi-book-account</v-icon>
                        </div>
                    </v-col>
                    <v-col cols="4">
                        <div class="text-center">
                        <BaseText>Progress</BaseText>
                        <small class="accent--text">{{ subjectProgress }}</small>
                        <Progress :progress="progressBar" />
                        </div>
                    </v-col>
                    <v-col cols="4">
                        <Timer :start="start" @stop="timeUp" :pause="pause" />
                    </v-col>
              </v-row>
          </v-col>
        <v-col cols="12" class="">
          <v-card
            color="transparent"
            dark
            flat
            class=""
          >
            <v-card-title class="headline pt-0 pb-0 accent--text">
              Question {{ showQuestionsCount }}
            </v-card-title>
            <v-card-text
              class="font-italics caption accent--text pt-0 pb-0"
              v-html="showSection"
              >
              *{{ showSection }}*
              </v-card-text>
            <v-card-subtitle v-html="showQuestions">
                {{ showQuestions }}
            </v-card-subtitle>
          </v-card>
        </v-col>

        <v-col
          v-for="(item, i) in showAnswers"
          :key="i"
          cols="12"
          sm="6"
          md="6"
          lg="6"
        >
            <Choices :questions="item" :letters="i"  />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <ResultDialog  @done="clearGame" :score="totalScore" />
</div>
</template>
<script>
import { mapState } from 'vuex';
import instance from '../services/alocApi';
// import confirm from '../utils/confirmToken';

export default {
  data: () => ({
    items: [
      'A',
      'B',
      'C',
      'D',
    ],
    start: false,
    pause: false,
    tests: {
      questions: [],
    },
    questionsPerSubject: 7,
    numberOfSubjects: 4,
    results: [],
    correctAnswers: 0,
    totalLength: 0,
    doneSubjects: [],
    allQuestions: [],
    currentProgress: 0,
    eachSubScore: [],
    cumilativeResult: [],
    countQuestions: 0,
    countSubJects: 0,
    totalScore: 0,
    examType: '',
    missingScripts: [],
    subjectProgressCount: [],
  }),

  components: {
    Choices: () => import('./core/Choice.vue'),
    Progress: () => import('./core/Progress.vue'),
    Timer: () => import('./core/Timer.vue'),
    ResultDialog: () => import('./core/ResultDialog'),
  },

  methods: {
    // method to fetch details from Api and render
    async loadQuestions(subject, type) {
      const sub = subject.toLowerCase();
      this.subjectProgressCount.push(subject);
      const examYear = `${this.jamboriData.year}`;
      this.$store.commit('LOADER_ON', `setting ${sub} questions`);
      const url = `/api/q/${this.questionsPerSubject}?subject=${sub}&year=${examYear}&type=${type}`;
      instance.get(url)
        .then((res) => {
          this.tests.subject = res.data.subject;
          this.tests.questions = res.data.data;
          this.start = true;
          this.randomize();
          this.totalLength = Number(this.jamboriSubjects.length * this.tests.questions.length);
          this.$store.commit('LOADER_OFF');
        }).catch((error) => {
          console.log(error);
          const data = {
            type: 'error',
            message: 'An error Occurred, Please restart',
          };
          if (!error.status) {
            data.message = 'Oops please check your internet';
          }
          this.$store.commit('SHOW_NOTIFICATION', data);
          this.$store.commit('CLEAR_DATA');
          this.clearGame();
          this.$router.push({ name: 'Selection' });
        });
    },
    openDialog(type, message) {
      this.$store.commit('OPEN_ACTION_DIALOG', {
        type,
        message,
      });
    },

    closeDialog() {
      this.$store.commit('CLOSE_ACTION_DIALOG');
    },

    timeUp() {
      this.endOfGame();
    },

    // calculate progress or attempts by student
    calculateProgress() {
      this.currentProgress = Math.floor((100 / this.totalQuestions) * this.allQuestions.length);
    },

    // Method to compare answer selected by student if correct
    checkAnswer(value, question) {
      this.tests.questions[0].answerSelected = value;
      const answer = this.tests.questions[0].option[this.tests.questions[0].answer];
      this.countQuestions += 1;
      if (answer === question) {
        this.tests.questions[0].accuracy = 'correct';
        this.correctAnswers += 1;
      } else {
        this.tests.questions[0].accuracy = 'wrong';
      }
      this.saveAnswer();
      this.nextQuestion();
    },

    // Method to end game and complie results
    endOfGame() {
      this.closeDialog();
      this.$store.commit('LOADER_ON', 'compiling results');
      this.pause = true;
      setTimeout(() => {
        this.displayResult();
      }, 3000);
    },

    // Method to check if compeleted all subjects
    endOfSubject() {
      this.correctAnswers = 0;
      if (this.countSubJects === this.numberOfSubjects) {
        this.endOfGame();
      } else {
        this.doneSubjects.push(this.jamboriSubjects.shift());
        this.loadQuestions(this.jamboriSubjects[0], this.examType);
      }
    },

    // Method to move to next question and check if student has compeleted subjec's questions
    nextQuestion() {
      if (this.countQuestions === this.questionsPerSubject) {
        this.allQuestions.push(this.tests.questions[0]);
        this.calculateProgress();
        const sub = this.jamboriSubjects[0];
        this.eachSubScore.push({
          subject: sub,
          score: Math.floor((100 / this.questionsPerSubject) * this.correctAnswers),
        });
        this.countSubJects += 1;
        this.countQuestions = 0;
        this.endOfSubject();
      } else {
        this.allQuestions.push(this.tests.questions.shift());
        this.calculateProgress();
      }
    },

    // Method to collate answers/question answered by student
    saveAnswer() {
      this.results.push({
        id: this.tests.questions[0].id,
        question: this.tests.questions[0].question,
        answer: this.tests.questions[0].answer,
        answerSelected: this.tests.questions[0].answerSelected,
        accuracy: this.tests.questions[0].accuracy,

      });
    },

    // Method to display student Result as collated
    displayResult() {
      this.$store.commit('LOADER_OFF');
      this.pause = true;
      const data = {
        missing: false,
      };
      if (this.checkMissingScript()) {
        data.missing = true;
        this.getMisingSubjects();
        this.$store.commit('RESULT_DIALOG', data);
      } else {
        this.totalScore = this.eachSubScore.reduce((a, b) => a + b.score, 0);
        data.results = this.eachSubScore;
        data.score = this.totalScore;
        data.missing = false;
        this.$store.commit('RESULT_DIALOG', data);
      }
    },

    // check if game subjects were completed
    checkMissingScript() {
      return this.eachSubScore.length !== this.numberOfSubjects;
    },

    // Method to fetch missing or uncompleted subjects
    getMisingSubjects() {
      const subjectedAttempted = this.eachSubScore.map((sub) => sub.subject);
      this.jamboriData.subjects.forEach((sub) => {
        if (!subjectedAttempted[sub]) {
          this.missingScripts.push(sub);
        }
      });
      const data = {
        attempted: subjectedAttempted,
        missing: this.missingScripts,
      };
      this.$store.commit('MISSING_SUBJECTS', data);
    },

    // Method to Clear Game data
    clearGame() {
      this.tests.questions = [];
      this.results = [];
      this.start = false;
      this.pause = false;
      this.correctAnswers = 0;
      this.totalLength = 0;
      this.doneSubjects = [];
      this.allQuestions = [];
      this.currentProgress = 0;
      this.eachSubScore = [];
      this.cumilativeResult = [];
      this.countQuestions = 0;
      this.countSubJects = 0;
      this.totalScore = 0;
      this.examType = '';
      this.missingScripts = [];
      this.subjectProgressCount = [];
    },

    // Method to reshuffle question options to avoid same pattern
    randomize() {
      const letters = ['a', 'b', 'c', 'd'];
      const newObj = {
        ...this.tests.questions[0].option,
      };
      const rand = {};
      const valueIndexes = Object.values(newObj);
      const shuffle = (arr) => {
        const newArr = arr;
        const A = Math.floor(Math.random() * (Object.keys(newObj).length));
        const B = Math.floor(Math.random() * (Object.keys(newObj).length));
        const firstPop = newArr.pop();
        newArr.splice(A, 0, firstPop);
        const secondPop = newArr.shift();
        newArr.splice(B, 0, secondPop);
        return newArr;
      };
      const reshuffled = shuffle(valueIndexes);
      for (let i = 0; i < letters.length; i += 1) {
        rand[letters[i]] = reshuffled[i];
      }

      return rand;
    },
  },

  computed: {
    ...mapState(['jamboriData']),
    // display questions
    showQuestions() {
      return this.tests.questions.length > 0 ? this.tests.questions[0].question : 'awaiting..';
    },
    // display answers options
    showAnswers() {
      return this.tests.questions.length > 0 ? this.randomize() : this.items;
    },
    // displya hint section
    showSection() {
      return this.tests.questions.length > 0 ? this.tests.questions[0].section : '';
    },

    // get the value of the current progress
    progressBar() {
      return this.currentProgress;
    },

    subjectProgress() {
      if (Object.keys(this.jamboriData).length === 0) {
        return '';
      }
      return `${this.subjectProgressCount.length} of ${this.jamboriData.subjects.length}`;
    },

    totalQuestions() {
      return this.questionsPerSubject * this.numberOfSubjects;
    },

    showQuestionsCount() {
      const number = this.questionsPerSubject + 1;
      if (Object.keys(this.jamboriData).length > 0) {
        return `${number - this.tests.questions.length}/${this.questionsPerSubject} `;
      }
      return '';
    },
  },
  async created() {
    // get first subject selected by user
    try {
      const subject = this.jamboriData.subjects[0];
      this.examType = this.jamboriData.type;
      this.jamboriSubjects = [...this.jamboriData.subjects];
      // load subject as selected by user
      this.loadQuestions(subject, this.examType);
    } catch (error) {
      console.log(error.message);
    }
  },
};
</script>
<style scoped>
.progressDiv {
    position: absolute;
    right:1rem;
}
</style>
