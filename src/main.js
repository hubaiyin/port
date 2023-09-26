import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from 'moment';
import App from './App.vue'
import router from './router';
import VueRouter from 'vue-router';
import axios from 'axios'
import verify from "vue-verify-plugin";

Vue.use(verify, {
  blur: true
});
Vue.prototype.$moment = moment;

Vue.use(ElementUI)
Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  router,
  axios,
  render: h => h(App),
}).$mount('#app')
