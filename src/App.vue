<template>
  <v-app>
    <the-header></the-header>
    <v-main
      :class="{ 'pa-0': $route.name === 'Page404' || $route.name === 'Users' }"
    >
      <loading v-show="loading"></loading>
      <router-view v-show="!loading" />
    </v-main>
    <the-footer></the-footer>
  </v-app>
</template>

<script>
import TheHeader from "@/components/TheHeader";
import TheFooter from "@/components/TheFooter.vue";
import Loading from "@/components/Loading.vue";

export default {
  components: { TheHeader, TheFooter, Loading },
  computed: {
    loading() {
      return this.$store.getters["loading"];
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  box-sizing: border-box;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
}

* {
  scrollbar-width: thin;
  scrollbar-color: #788bff #bfd7ff;
}

*::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}

*::-webkit-scrollbar-track {
  background: #bfd7ff;
}

*::-webkit-scrollbar-thumb {
  background-color: #788bff;
}

html {
  overflow-y: auto;
  overflow-x: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333333;
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template: 60px auto 120px / 1fr;
}

button {
  background-color: transparent;
  transition: all 0.2s;
}

a,
button {
  cursor: pointer;
}

.v-carousel__controls {
  min-height: 40px;
  height: auto !important;
  border-radius: 10px 10px 0 0;
  padding: 10px;
}

.v-carousel__controls__item {
  margin: 0 !important;
}
</style>
