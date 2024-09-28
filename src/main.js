import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import moment from "moment";
import App from "./App.vue";
import router from "./router";
import VueRouter from "vue-router";
import axios from "axios";
import verify from "vue-verify-plugin";
import dataV from "@jiaminghi/data-view";
import Vuex from "vuex";
import store from "@/store/index";
import "./scss/fonts.css";

Vue.use(verify, {
  blur: true,
});
Vue.prototype.$moment = moment;

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(dataV);
Vue.use(Vuex);
Vue.config.productionTip = false;

new Vue({
  router,
  axios,
  store,
  render: (h) => h(App),
}).$mount("#app");
