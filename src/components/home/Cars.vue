<template>
  <div class="cars">
    <h4>Машины</h4>
    <v-carousel
      v-if="pages.length"
      height="100%"
      v-model="model"
      :show-arrows="false"
      :style="{ padding: pages.length / 9 > 1 ? '0 0 60px 0' : null }"
      :hide-delimiters="pages.length / 9 < 1 ? true : false"
    >
      <v-carousel-item height="100%" v-for="page in pages" :key="page[0].id">
        <v-sheet height="100%" tile>
          <v-row class="fill-height" align="center" justify="center">
            <div class="wrap">
              <CarCard
                v-for="(car, i) in page"
                :key="car.id + i"
                :data="car"
              ></CarCard>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <span v-else>Пусто</span>
  </div>
</template>

<script>
import CarCard from "@/components/home/CarCard";

export default {
  components: { CarCard },
  data() {
    return {
      model: 0,
    };
  },
  computed: {
    pages() {
      const pages = [];
      let page = [];
      const cars = this.$store.getters["cars/cars"];
      cars.forEach((el) => {
        if (page.length < 9) page.push(el);
        else {
          pages.push(page);
          page = [];
        }
      });
      if (cars.length < 9 && !pages.length && page.length) {
        pages.push(page);
        page = [];
      }
      return pages;
    },
  },
};
</script>

<style lang="scss" scoped>
.cars {
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 0 20px 20px 20px;

  h4 {
    height: 40px;
  }

  .wrap {
    width: 100%;
    height: calc(100% - 40px);
    display: grid;
    grid-template: repeat(3, auto) / repeat(3, 1fr);
    grid-gap: 10px;
    padding: 0 20px;
  }

  @media screen and(max-width:1200px) {
    .wrap {
      grid-template: repeat(5, auto) / repeat(2, 1fr);
    }
  }
  @media screen and(max-width:880px) {
    .wrap {
      grid-template: repeat(9, auto) / 1fr;
    }
  }
}
</style>
