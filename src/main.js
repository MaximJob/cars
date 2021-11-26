import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { Vuelidate } from "vuelidate";
import VueResource from "vue-resource";
import vuetify from "./plugins/vuetify";

Vue.use(Vuelidate);
Vue.use(VueResource);

Vue.http.options.root = "https://catalogauto.we-demonstrate2.ru/api/";

// Vue.http.interceptors.push((request, next) => {
//   request.headers.set("Access-Control-Allow-Origin", "*");
//   request.headers.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//   request.headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   next();
// });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
