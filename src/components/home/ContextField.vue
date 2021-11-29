<template>
  <div class="contextField">
    <Brands
      v-if="!cars.length && (isFiltersEmpty || isFiltersEmptyExceptBrand)"
    ></Brands>
    <Cars v-else></Cars>
  </div>
</template>

<script>
import Cars from "./Cars.vue";
import Brands from "./Brands.vue";
export default {
  components: { Brands, Cars },
  props: {
    brands: {
      type: Array,
      required: true,
    },
    cars: {
      type: Array,
      required: true,
    },
  },
  computed: {
    isFiltersEmpty() {
      const filters = this.$store.getters["filters"];
      let result = true;
      const keys = Object.keys(filters);
      keys.forEach((el) => (result &= filters[el].value === ""));
      return result;
    },

    isFiltersEmptyExceptBrand() {
      const filters = this.$store.getters["filters"];
      let result = true;
      let keys = Object.keys(filters);
      keys = keys.filter((el) => el !== "brand");
      keys.forEach((el) => (result &= filters[el].value === ""));
      result &= filters.brand.value !== "";
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
.contextField {
  width: 100%;
  height: 100%;
}
</style>
