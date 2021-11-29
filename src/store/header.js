export default {
  namespaced: true,
  state: {
    linksLogged: [
      {
        title: "ГЛАВНАЯ",
        url: "/",
        img: require("../assets/logo.svg"),
      },
      {
        title: "МОИ АВТОМОБИЛИ",
        url: "/userCars",
      },
      {
        title: "ИЗБРАННОЕ",
        url: "/favorite",
      },
      {
        title: "ВСЕ ПОЛЬЗОВАТЕЛИ",
        url: "/users",
      },
    ],
    linksUnlogged: [
      {
        title: "ВОЙТИ",
        url: "/login",
      },
    ],
  },
  getters: {
    linksLogged(state) {
      return state.linksLogged
    },
    linksUnlogged(state) {
      return state.linksUnlogged
    }
  }
}