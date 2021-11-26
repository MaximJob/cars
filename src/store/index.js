import Vue from "vue";
import Vuex from "vuex";
import cars from "@/store/cars";
import login from "@/store/login";
import users from "@/store/users";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { loading: false },
  mutations: {
    startLoading(state) {
      state.loading = true;
    },
    endLoading(state) {
      state.loading = false;
    },
  },
  getters: {
    loading(state) {
      return state.loading;
    },
  },
  actions: {},
  modules: {
    login,
    cars,
    users,
  },
});
