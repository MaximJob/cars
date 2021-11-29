import Vue from "vue";
import Vuex from "vuex";
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

    brands: [],
    cars: [],
    filters: {
      model: {
        text: "",
        value: "",
      },
      brand: {
        text: "",
        value: "",
      },
      volume: {
        text: "",
        value: "",
      },
      transmission: {
        text: "",
        value: "",
      },
      engine: {
        text: "",
        value: "",
      },
      body: {
        text: "",
        value: "",
      },
    },
    myCars: [],
    favorite: [],
    detailedCar: {},
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

    setBrands(state, brands) {
      state.brands = brands;
    },
    setCars(state, cars) {
      state.cars = cars;
    },
    resetCars(state) {
      state.cars = [];
    },
    setFavorite(state, favorite) {
      state.favorite = favorite;
    },
    setMyCars(state, myCars) {
      state.myCars = myCars;
    },
    setFilters(state, options) {
      state.filters = options;
    },
    setDetailedCar(state, detailedCar) {
      state.detailedCar = detailedCar;
    },
    resetFilters(state) {
      state.filters = {
        model: {
          text: "",
          value: "",
        },
        brand: {
          text: "",
          value: "",
        },
        volume: {
          text: "",
          value: "",
        },
        transmission: {
          text: "",
          value: "",
        },
        engine: {
          text: "",
          value: "",
        },
        body: {
          text: "",
          value: "",
        },
      };
    },

    reset(state) {
      state.users = [];

      state.access_token = "";
      state.refresh_token = "";
      state.logged = false;
      state.id = 0;

      state.brands = [];
      state.cars = [];
      state.filters = {
        model: {
          text: "",
          value: "",
        },
        brand: {
          text: "",
          value: "",
        },
        volume: {
          text: "",
          value: "",
        },
        transmission: {
          text: "",
          value: "",
        },
        engine: {
          text: "",
          value: "",
        },
        body: {
          text: "",
          value: "",
        },
      };
      state.myCars = [];
      state.favorite = [];
      state.detailedCar = {};
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

    brands(state) {
      return state.brands;
    },
    cars(state) {
      return state.cars;
    },
    myCars(state) {
      return state.myCars;
    },
    favorite(state) {
      return state.favorite;
    },
    filters(state) {
      return state.filters;
    },
    detailedCar(state) {
      return state.detailedCar;
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

    async loadBrands(context) {
      let url = "car/brand-list";
      const brand = context.state.filters.brand.value;
      if (brand) {
        url += "?char=" + brand[0].toLowerCase();
      }
      await getData(url).then(({ brands }) => {
        context.commit("setBrands", brands);
        context.commit("resetCars");
      });
    },
    async loadDetailedCar(context, { id }) {
      await context.dispatch("loadMyCars");
      await context.dispatch("loadFavorite");
      await getData(`car/about-model?model=${id}`).then((info) => {
        context.commit("setDetailedCar", info);
      });
    },
    async loadCars(context, { name, id }) {
      await getData(`car/model-list?brand=${id}`).then(({ models }) => {
        context.commit("setCars", models);
        context.state.filters.brand = {
          text: name,
          value: name,
        };
      });
    },
    async loadMyCars(context) {
      await getData("manager/get-list-ownership-car", {
        user_id: localStorage.id,
      }).then(({ cars }) => {
        context.commit("setMyCars", cars);
      });
    },
    async loadFavorite(context) {
      await getData("manager/get-list-favorite-car", {
        user_id: localStorage.id,
      }).then(({ cars }) => {
        context.commit("setFavorite", cars);
      });
    },
    async filterCars(context) {
      let url = "car/model-list-filter?";
      const filters = context.state.filters;
      const keys = Object.keys(filters);
      keys.forEach((key) =>
        filters[key].value !== ""
          ? (url += key + "=" + filters[key].value + "&")
          : ""
      );
      url = url.slice(0, -1);
      await getData(url).then(({ models }) => {
        context.commit("setCars", models);
      });
    },

    async addCar(context, generation_id) {
      await postData("manager/add-ownership", {
        user_id: localStorage.id,
        generation_id,
      });
      await context.dispatch("loadMyCars");
    },
    async removeCar(context, generation_id) {
      await postData("manager/remove-ownership", {
        user_id: localStorage.id,
        generation_id,
      });
      await context.dispatch("loadMyCars");
    },
    async addFavorite(context, generation_id) {
      await postData("manager/add-favorite", {
        user_id: localStorage.id,
        generation_id,
      });
      await context.dispatch("loadFavorite");
    },
    async removeFavorite(context, generation_id) {
      await postData("manager/remove-favorite", {
        user_id: localStorage.id,
        generation_id,
      });
      await context.dispatch("loadFavorite");
    },
  },
  modules: {},
});

async function postData(url, body = {}) {
  let response = {};
  await Vue.http
    .post(url, body, {
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
    id: content.user.id,
  };
}
