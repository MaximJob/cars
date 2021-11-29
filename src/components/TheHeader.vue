<template>
  <div class="header">
    <v-navigation-drawer app temporary v-model="drawer" color="#9bb1ff">
      <v-list>
        <v-list-item v-for="link of links" :key="link.title">
          <router-link :to="link.url" exact-path
            ><img v-if="link.img" :src="link.img" alt="Картинка" />
            {{ link.title }}
          </router-link>
        </v-list-item>
        <v-list-item v-if="logged">
          <button @click="logout()">ВЫЙТИ</button>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark color="#9bb1ff">
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="hidden-md-and-up">
        {{ routeName }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <router-link
          v-for="link in links"
          :key="link.title + link.url"
          :to="link.url"
          exact-path
        >
          <img v-if="link.img" :src="link.img" alt="Картинка" />
          {{ link.title }}
        </router-link>
        <button v-if="logged" @click="logout()">ВЫЙТИ</button>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      drawer: false,
      group: null,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
  computed: {
    logged() {
      return this.$store.getters["logged"];
    },
    routeName() {
      return this.$route.meta.title;
    },
    links() {
      return this.logged ? this.linksLogged : this.linksUnlogged;
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 60px;
  background-color: #9bb1ff;

  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  .router-link-active {
    color: white;
  }

  a,
  button {
    font-size: 16px;
    margin: 0 10px;
    color: #333333;
    transition: none;
  }

  a:hover,
  button:hover {
    color: #ffffff;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 32px;
      height: 32px;
      margin-right: 10px;
    }
  }
}
</style>
