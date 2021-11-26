<template>
  <div class="contextField">
    <Brands v-if="!cars.length"></Brands>
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
};
</script>

<style lang="scss" scoped>
.contextField {
  width: 100%;
  height: 100%;
}
</style>
