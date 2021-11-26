<template>
  <div class="favourite">
    <span v-if="!cars.length">Пусто</span>
    <div class="wrap" v-else>
      <v-card
        v-for="(car, i) in cars"
        :key="car.id + i"
        class="mx-auto"
        max-width="400"
        :style="{ marginBottom: '20px' }"
      >
        <v-img class="white--text align-end" height="200px" :src="car.image">
          <v-card-title>{{ car.model }}</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0">
          {{ car.generation }}
        </v-card-subtitle>

        <v-card-text class="text--primary">
          <div>Описание</div>

          <div>Страна</div>

          <div>Логотип</div>

          <div>Информация</div>
        </v-card-text>

        <v-card-actions>
          <v-btn v-if="!isItMyCar(car)" text icon @click="addCar(car)">
            <v-icon size="24px">mdi-plus</v-icon>
          </v-btn>
          <v-btn v-else text icon @click="removeCar(car)">
            <v-icon size="24px">mdi-minus</v-icon>
          </v-btn>
          <v-btn text icon @click="removeFavorite(car)">
            <v-icon size="24px">mdi-delete</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    cars() {
      return this.$store.getters["cars/favorite"];
    },
  },
  methods: {
    isItMyCar(car) {
      const myCars = this.$store.getters["cars/myCars"];
      return myCars.find((el) => el.id === car.id);
    },
    addCar(car) {
      this.$store.dispatch("cars/addCar", car.id);
    },
    removeCar(car) {
      this.$store.dispatch("cars/removeCar", car.id);
    },
    removeFavorite(car) {
      this.$store.dispatch("cars/removeFavorite", car.id);
    },
  },
  async beforeMount() {
    this.$store.commit("startLoading");
    await this.$store.dispatch("cars/loadFavorite");
    this.$store.commit("endLoading");
  },
};
</script>

<style lang="scss" scoped>
.favourite {
  padding: 20px;

  .wrap {
    margin: 0 0 10px 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    grid-gap: 20px;
  }

  @media screen and(max-width: 1320px) {
    .wrap {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: auto;
    }
  }

  @media screen and(max-width: 1024px) {
    .wrap {
      grid-template-columns: 1fr;
      grid-template-rows: auto;
    }
  }
}
</style>
