<template>
    <v-dialog :value="resultDialog" persistent max-width="600px" style="z-index: 1000">
      <div class="text-center white">
        <v-avatar class="text--center" size="100">
         <v-img src="../../assets/logo2.png"></v-img>
       </v-avatar>
      </div>
         <v-simple-table>
            <template v-slot:default>
            <thead>
                <tr>
                <th class="text-left primary--text">
                    Subject
                </th>
                <th class="text-left primary--text">
                     Result
                </th>
                </tr>
            </thead>
            <tbody>
                <tr
                v-for="item in results"
                :key="item.subject"
                >
                  <td class="primary--text">{{ item.subject }}</td>
                  <td class="primary--text">{{ item.score }}</td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
        <v-card>
          <v-card-text v-if="missingScript">
            <BaseSubHeading class="font-weight-bold">
             Oops we noticed a missing script, your result has been canceled
            </BaseSubHeading>
            <BaseText>You attempted:</BaseText>
            <ul v-for="(item, i) in attemptedScripts" :key="i">
              <li class="primary--text">{{ item }}</li>
            </ul>
            <BaseText>Missing Subjects:</BaseText>
            <ul v-for="sub in missingSubjects" :key="sub">
              <li class="primary--text">{{ sub }}</li>
            </ul>
          </v-card-text>
          <v-card-text v-else>
            <BaseSubHeading class="font-weight-bold">
             Your Jambori Score is {{ totalScore }}
            </BaseSubHeading>
            <BaseText class="font-weight-bold">{{ admissionStatus }}</BaseText>
          </v-card-text>
             <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="closeResultDialog">Ok</v-btn>
                </v-card-actions>
        </v-card>
      </v-dialog>
</template>
<script>
import { mapState } from 'vuex';

export default {
  props: ['score'],
  data: () => ({
    //
  }),

  computed: {
    ...mapState([
      'resultDialog',
      'results',
      'totalScore',
      'missingScript',
      'attemptedScripts',
      'missingSubjects',
    ]),
    admissionStatus() {
      if (this.score >= 180 && this.score < 240) {
        return 'Congratulations you are been considered for an admission into our University hall of fame';
      }
      if (this.score >= 240) {
        return 'Congratulations!! you have been admitted into our University hall of fame';
      }
      return "Oops sorry you didn't make the cut off please re-seat Jambori";
    },
  },

  methods: {
    closeResultDialog() {
      this.$store.commit('CLEAR_DATA');
      this.$emit('done');
      this.$store.dispatch('closeResultDialog');
      this.$router.push({ name: 'Selection' });
    },
  },
};
</script>
