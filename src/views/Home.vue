<template>
  <div class="home">
    <Filters :brands="brands" :cars="cars" :brandName="filtersBrand"></Filters>
    <ContextField :brands="brands" :cars="cars"></ContextField>
  </div>
</template>

<script>
import Filters from "@/components/home/Filters";
import ContextField from "@/components/home/ContextField.vue";

export default {
  components: { ContextField, Filters },
  computed: {
    brands() {
      return this.$store.getters["brands"];
    },
    cars() {
      return this.$store.getters["cars"];
    },
    filtersBrand() {
      return this.$store.getters["filters"].brand;
    },
  },
  async beforeMount() {
    if (this.$route.query.brandName && this.$route.query.brandId) {
      await this.$store.dispatch("loadCars", {
        name: this.$route.query.brandName,
        id: this.$route.query.brandId,
      });
    } else {
      this.$store.commit("setCars", []);
      await this.$store.dispatch("loadBrands");
    }
  },
  destroyed() {
    this.$store.commit("resetFilters");
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: grid;
  grid-template: auto / 200px 1fr;
  padding: 20px 0;

  @media screen and (max-width: 768px) {
    grid-template: auto auto / 1fr;
  }
}
</style>
