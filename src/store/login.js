import router from "@/router";
import Vue from "vue";

export default {
  namespaced: true,
  state: {
    logged: !!localStorage.access_token,
  },
  mutations: {},
  getters: {
    logged(state) {
      return state.logged;
    },
  },
  actions: {
    async register(context, info) {
      await Vue.http
        .post("user/sing-up", {
          ...info,
        })
        .then((response) => response.json())
        .then(async () => {
          await context.dispatch("login", info);
        });
    },
    async login(context, info) {
      await Vue.http
        .post("user/sing-in", {
          ...info,
        })
        .then((response) => response.json())
        .then(async (json) => {
          localStorage.access_token =
            "Bearer " + json.content.tokens.access_token;
          sessionStorage.refresh_token = json.content.tokens.refresh_token;
          context.state.logged = true;
          await router.push("/");
        });
    },
    async refreshTokens() {
      await Vue.http
        .post("user/update-tokens", {
          rtoken: sessionStorage.refresh_token,
        })
        .then((response) => response.json())
        .then(async (json) => {
          localStorage.access_token = json.content.access_token;
          sessionStorage.refresh_token = json.content.refresh_token;
        });
    },
    async logout(context) {
      context.state.logged = false;
      localStorage.clear();
      await router.push("/login");
    },
  },
};
