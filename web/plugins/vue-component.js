import Vue from "vue";

import Lottie from "vue-lottie/src/lottie.vue";
import Vloading from "@/components/Loading/index";
Vue.prototype.$pageInit = false;
Vue.component("lottie", Lottie);
Vue.component("v-loading", Vloading);
