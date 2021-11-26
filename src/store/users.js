import Vue from "vue";

export default {
  namespaced: true,
  state: {
    users: []
  },
  mutations: {
    setUsers(state, users) {
      state.users = users
    },
    reset(state) {
      state.users = []
    }
  },
  getters: {
    users(state) {
      return state.users
    },
  },
  actions: {
    async loadUsers(context) {
      await Vue.http
        .get("user", {
          headers: {
            Authorization: localStorage.access_token,
          },
        })
        .then((response) => response.json())
        .then((data) => {
          context.commit("setUsers", data.content);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
}
