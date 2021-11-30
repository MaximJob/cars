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

Vue.http.interceptors.before = function (request) {
  if (this.previousRequest) {
    this.previousRequest.abort();
  }
  this.previousRequest = request;
};

Vue.http.interceptors.push((request, next) => {
  const access_token = localStorage.access_token || "";
  //const refresh_token = sessionStorage.refresh_token || "";
  const exception = request.url === "user/update-tokens";

  // if (refresh_token !== "" && access_token === "" && exception) {
  //   store.dispatch("refreshTokens", refresh_token);
  // }

  if (access_token !== "" && !exception) {
    request.headers.set("Authorization", access_token);
  }

  next((response) => {
    const status = Math.floor(response.status / 100);
    if (status === 4 && access_token === "") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      router.push("/login");
    }
  });
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
