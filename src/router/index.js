import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      auth: true,
      title: "Главная",
    },
    query: {
      brandName: "",
      brandId: "",
    },
  },
  {
    path: "/car",
    name: "Car",
    component: () => import("../views/Car.vue"),
    meta: {
      auth: true,
      title: "Машина",
    },
    query: {
      id: "",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      auth: false,
      title: "Логин",
    },
  },
  {
    path: "/registration",
    name: "Registration",
    component: () => import("../views/Registration.vue"),
    meta: {
      auth: false,
      title: "Регистрация",
    },
  },
  {
    path: "/userCars",
    name: "UserCars",
    component: () => import("../views/UserCars.vue"),
    meta: {
      auth: true,
      title: "Мои Машины",
    },
  },
  {
    path: "/favorite",
    name: "Favorite",
    component: () => import("../views/Favorite.vue"),
    meta: {
      auth: true,
      title: "Избранное",
    },
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("../views/Users.vue"),
    meta: {
      auth: true,
      title: "Пользователи",
    },
  },
  {
    path: "*",
    name: "Page404",
    component: () => import("../views/Page404.vue"),
    meta: {
      auth: false,
      title: "404",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const logged = !!localStorage.access_token;
  if (to.meta.auth && !logged) next({ name: "Login" });
  else if (logged && (to.name === "Login" || to.name === "Registration"))
    next("/");
  else if (to.name === "Car" && !to.query.id) next("/");
  else next();
});

export default router;
