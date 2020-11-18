import Vue from 'vue';
import BaseText from '@/components/base/Text.vue';
import BaseSmallText from '@/components/base/SmallText.vue';
import BaseHeading from '@/components/base/Heading.vue';
import BaseSubHeading from '@/components/base/SubHeading.vue';
import BaseBtn from '@/components/base/Btn.vue';
import BaseSmallBtn from '@/components/base/SmallBtn.vue';
import BaseDialog from '@/components/base/ActionDialog.vue';

Vue.component(BaseText.name, BaseText);
Vue.component(BaseSmallText.name, BaseSmallText);
Vue.component(BaseHeading.name, BaseHeading);
Vue.component(BaseSubHeading.name, BaseSubHeading);
Vue.component(BaseBtn.name, BaseBtn);
Vue.component(BaseSmallBtn.name, BaseSmallBtn);
Vue.component(BaseDialog.name, BaseDialog);
