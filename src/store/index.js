import Vue from "vue";
import Vuex from "vuex";
import cars from "@/store/cars";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,

    users: [],

    access_token: localStorage.access_token ? localStorage.access_token : "",
    refresh_token: sessionStorage.refresh_token
      ? sessionStorage.refresh_token
      : "",
    logged: !!localStorage.access_token,
    id: 0,
  },
  mutations: {
    startLoading(state) {
      state.loading = true;
    },
    endLoading(state) {
      state.loading = false;
    },

    setUsers(state, users) {
      state.users = users;
    },

    setLogged(state, condition) {
      state.logged = condition;
    },
    setTokens(state, content) {
      localStorage.id = content.id;
      state.id = content.id;
      localStorage.access_token = content.access_token;
      state.access_token = content.access_token;
      sessionStorage.refresh_token = content.refresh_token;
      state.refreshToken = content.refresh_token;
    },

    reset(state) {
      state.users = [];
      state.access_token = "";
      state.refresh_token = "";
      state.logged = false;
      state.id = 0;
    },
  },
  getters: {
    loading(state) {
      return state.loading;
    },

    users(state) {
      return state.users;
    },

    access_token(state) {
      return state.access_token;
    },
    refresh_token(state) {
      return state.refreshToken;
    },
    logged(state) {
      return state.logged;
    },
  },
  actions: {
    async loadUsers(context) {
      const headers = {
        headers: {
          Authorization: context.state.access_token,
        },
      };
      getData("user", {}, headers).then((users) => {
        context.commit("setUsers", users);
      });
    },

    async register(context, info) {
      await postData("user/sing-up", info).then(async (response) => {
        if (response !== {}) {
          await context.dispatch("login", info);
        }
      });
    },
    async login(context, info) {
      await postData("user/sing-in", info).then(async (tokens) => {
        if (tokens !== {}) {
          context.commit("setTokens", refactorTokens(tokens));
          context.commit("setLogged", true);
          await router.push("/");
        }
      });
    },
    async refreshTokens(context) {
      await postData(
        "user/update-tokens",
        {},
        { rtoken: context.state.refresh_token }
      ).then(async (response) => {
        if (response !== {}) {
          context.commit("setTokens", response.content);
        }
      });
    },
    async logout(context) {
      context.commit("reset");
      localStorage.clear();
      await router.push("/login");
    },
  },
  modules: {
    cars,
  },
});

async function postData(url, body = {}, headers = {}) {
  let response = {};
  await Vue.http
    .post(url, body, { headers })
    .then((response) => response.json())
    .then((data) => {
      response = data.content;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
}

async function getData(url, params = {}) {
  let response = { models: [], brands: [], cars: [] };
  await Vue.http
    .get(url, {
      params,
      headers: {
        Authorization: localStorage.access_token,
      },
    })
    .then((response) => response.json())
    .then((data) => {
      response = data.content;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
}

function refactorTokens(content) {
  return {
    access_token: "Bearer " + content.tokens.access_token,
    refresh_token: content.tokens.refresh_token,
    id: "Bearer " + content.user.id,
  };
}
