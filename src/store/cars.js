import Vue from "vue";

export default {
  namespaced: true,
  state: {
    brands: [],
    cars: [],
    filters: {
      model: "",
      brand: "",
      volume: "",
      transmission: "",
      engine: "",
      body: "",
    },
    myCars: [],
    favorite: [],
    detailedCar: {},
  },
  mutations: {
    setBrands(state, brands) {
      state.brands = brands;
    },
    setCars(state, cars) {
      state.cars = cars;
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
        model: "",
        brand: "",
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
        body: "",
      };
    },
    reset(state) {
      state.brands = [];
      state.cars = [];
      (state.filters = {
        model: "",
        brand: "",
        volume: "",
        transmission: "",
        engine: "",
        body: "",
      }),
        (state.myCars = []);
      state.favorite = [];
      state.detailedCar = {};
    },
  },
  getters: {
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
    async loadBrands(context) {
      let url = "car/brand-list";
      const filters = context.state.filters;
      if (filters.brand) {
        url += "?char=" + filters.brand[0].toLowerCase();
      }
      await getData(url).then(({ brands }) => {
        context.commit("setBrands", brands);
        context.commit("setCars", []);
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
        context.state.filters.brand = name;
      });
    },
    async loadMyCars(context) {
      await getData("manager/get-list-ownership-car", { user_id: 129 }).then(
        ({ cars }) => {
          context.commit("setMyCars", cars);
        }
      );
    },
    async loadFavorite(context) {
      await getData("manager/get-list-favorite-car", { user_id: 129 }).then(
        ({ cars }) => {
          context.commit("setFavorite", cars);
        }
      );
    },
    async filterCars(context) {
      let url = "car/model-list-filter?";
      const filters = context.state.filters;
      const keys = Object.keys(filters);
      keys.map((key) =>
        filters[key].value !== null && filters[key].value !== undefined
          ? (filters[key] = filters[key].value)
          : ""
      );
      keys.forEach((key) =>
        filters[key] !== "" ? (url += key + "=" + filters[key] + "&") : ""
      );
      url = url.slice(0, -1);
      await getData(url).then(({ models }) => {
        context.commit("setCars", models);
      });
    },

    async addCar(context, generation_id) {
      await postData("manager/add-ownership", {
        user_id: "129",
        generation_id,
      });
      await context.dispatch("loadMyCars");
    },
    async removeCar(context, generation_id) {
      await postData("manager/remove-ownership", {
        user_id: "129",
        generation_id,
      });
      await context.dispatch("loadMyCars");
    },
    async addFavorite(context, generation_id) {
      await postData("manager/add-favorite", {
        user_id: "129",
        generation_id,
      });
      await context.dispatch("loadFavorite");
    },
    async removeFavorite(context, generation_id) {
      await postData("manager/remove-favorite", {
        user_id: "129",
        generation_id,
      });
      await context.dispatch("loadFavorite");
    },
  },
};

async function postData(url, body = {}) {
  await Vue.http
    .post(url, body, {
      headers: {
        Authorization: localStorage.access_token,
      },
    })
    .catch((error) => {
      console.log(error);
    });
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
