import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
import filtersState from "./filters.js";
import { postData, getData, refactorTokens } from "../api";
import header from "./header.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,

    users: [],

    logged: !!localStorage.access_token,
    id: localStorage.id ? localStorage.id : 0,

    brands: [],
    cars: [],
    carNamesList: [],
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
      sessionStorage.refresh_token = content.refresh_token;
    },

    setBrands(state, brands) {
      state.brands = brands;
    },
    setCars(state, cars) {
      state.cars = cars;
    },
    setCarNamesList(state, list) {
      state.carNamesList = list;
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

    logged(state) {
      return state.logged;
    },

    brands(state) {
      return state.brands;
    },
    cars(state) {
      return state.cars;
    },
    carNamesList(state) {
      return state.carNamesList;
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
      context.commit("startLoading");
      await getData("user").then((users) => {
        context.commit("setUsers", users);
      });
      context.commit("endLoading");
    },

    async register(context, info) {
      await postData("user/sing-up", info).then(async (response) => {
        if (response !== {}) {
          await context.dispatch("login", info);
        }
      });
    },
    async login(context, info) {
      await postData("user/sing-in", info).then(async (content) => {
        if (content.tokens) {
          context.commit("setTokens", refactorTokens(content));
          context.commit("setLogged", true);
          await router.push("/");
        }
      });
    },
    async refreshTokens(context, rtoken) {
      console.log(rtoken);
      await postData("user/update-tokens", {}, { rtoken }).then(
        async (response) => {
          if (response !== {}) {
            context.commit("setTokens", response.content);
          }
        }
      );
    },
    async logout(context) {
      context.commit("reset");
      localStorage.clear();
      await router.push("/login");
    },

    async loadBrands(context) {
      context.commit("startLoading");

      const brand = context.state.filters.brand.value;

      let url = "car/brand-list";
      if (brand) {
        url += "?char=" + brand[0].toLowerCase();
      }
      await getData(url).then(({ brands }) => {
        context.commit("setBrands", brands);
        context.commit("resetCars");
      });
      context.commit("endLoading");
    },
    async loadDetailedCar(context, { id }) {
      context.commit("startLoading");
      await context.dispatch("loadMyCars");
      await context.dispatch("loadFavorite");
      await getData(`car/about-model?model=${id}`).then((info) => {
        context.commit("setDetailedCar", info);
      });
      context.commit("endLoading");
    },
    async loadCars(context, { name, id }) {
      context.commit("startLoading");
      await getData(`car/model-list?brand=${id}`).then(({ models }) => {
        context.commit("setCars", models);
        context.state.filters.brand = {
          text: name,
          value: name,
        };
      });
      context.commit("endLoading");
    },
    async loadCarNamesList(context, { name }) {
      if (name !== "") {
        await getData(`car/get-model-id?name=${name}`).then(({ ids: list }) => {
          list = list || [];
          context.commit("setCarNamesList", list);
        });
      } else {
        context.commit("setCarNamesList", []);
      }
    },
    async loadMyCars(context) {
      context.commit("startLoading");

      const url = "manager/get-list-ownership-car";
      const body = { user_id: context.state.id };

      await getData(url, body).then(({ cars }) => {
        context.commit("setMyCars", cars);
      });
      context.commit("endLoading");
    },
    async loadFavorite(context) {
      context.commit("startLoading");

      const url = "manager/get-list-favorite-car";
      const body = { user_id: context.state.id };

      await getData(url, body).then(({ cars }) => {
        context.commit("setFavorite", cars);
      });
      context.commit("endLoading");
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
      const url = "manager/add-ownership";
      const body = {
        user_id: context.state.id,
        generation_id,
      };
      await postData(url, body);
      await context.dispatch("loadMyCars");
    },
    async removeCar(context, generation_id) {
      const url = "manager/remove-ownership";
      const body = {
        user_id: context.state.id,
        generation_id,
      };

      await postData(url, body);
      await context.dispatch("loadMyCars");
    },
    async addFavorite(context, generation_id) {
      const url = "manager/add-favorite";
      const body = {
        user_id: context.state.id,
        generation_id,
      };

      await postData(url, body);
      await context.dispatch("loadFavorite");
    },
    async removeFavorite(context, generation_id) {
      const url = "manager/remove-favorite";
      const body = {
        user_id: context.state.id,
        generation_id,
      };

      await postData(url, body);
      await context.dispatch("loadFavorite");
    },
  },
  modules: { filtersState, header },
});
