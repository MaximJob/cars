<template>
  <div class="userCars">
    <span v-if="!cars.length">Пусто</span>
    <div class="wrap" v-else>
      <v-card
        v-for="(car, i) in cars"
        :key="car.id + i"
        class="mx-auto"
        min-width="240"
        width="100%"
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
          <v-btn text icon @click="showPopup(car)">
            <v-icon size="24px">mdi-minus</v-icon>
          </v-btn>
          <v-btn
            v-if="!isItMyFavorite(car)"
            text
            icon
            @click="addFavorite(car)"
          >
            <v-icon size="24px">mdi-bookmark</v-icon>
          </v-btn>
          <v-btn v-else text icon @click="removeFavorite(car)">
            <v-icon size="24px">mdi-delete</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>

    <v-overlay :absolute="absolute" :value="overlay">
      <v-btn class="button" color="error" @click="removeCar()">Удалить</v-btn>
      <v-btn class="button" color="success" @click="hidePopup()">
        Отменить
      </v-btn>
    </v-overlay>
  </div>
</template>

<script>
export default {
  data() {
    return {
      absolute: true,
      overlay: false,
      carId: "",
    };
  },
  computed: {
    cars() {
      return this.$store.getters["myCars"];
    },
  },
  methods: {
    isItMyFavorite(car) {
      const favorite = this.$store.getters["favorite"];
      return favorite.find((el) => el.id === car.id);
    },
    removeCar() {
      this.$store.dispatch("removeCar", this.carId);
      this.hidePopup();
    },
    addFavorite(car) {
      this.$store.dispatch("addFavorite", car.id);
    },
    removeFavorite(car) {
      this.$store.dispatch("removeFavorite", car.id);
    },
    showPopup(car) {
      this.overlay = true;
      this.carId = car.id;
    },
    hidePopup() {
      this.overlay = false;
    },
  },
  async beforeMount() {
    await this.$store.dispatch("loadMyCars");
  },
};
</script>

<style lang="scss" scoped>
.userCars {
  padding: 20px;

  .wrap {
    margin: 0 0 10px 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    grid-gap: 20px;
  }

  .button {
    display: block;
    margin: 20px auto;
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
