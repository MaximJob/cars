<template>
  <div class="car">
    <v-card
      v-if="
        detailedCar &&
        detailedCar.generations &&
        detailedCar.generations[0] &&
        car
      "
      class="mx-auto"
      width="100%"
      height="100%"
    >
      <v-img
        class="white--text align-end"
        height="400px"
        :src="car.image ? car.image : require('../assets/image.png')"
        :lazy-src="require('../assets/image.png')"
      >
        <v-card-title>{{ detailedCar.model }}</v-card-title>
      </v-img>

      <v-card-actions>
        <v-btn v-if="!isItMyCar" icon @click="addCar()">
          <v-icon size="24px">mdi-plus</v-icon>
        </v-btn>
        <v-btn v-else icon @click="removeCar()">
          <v-icon size="24px">mdi-minus</v-icon>
        </v-btn>
        <v-btn v-if="!isItMyFavorite" icon @click="addFavorite()">
          <v-icon size="24px">mdi-bookmark</v-icon>
        </v-btn>
        <v-btn v-else icon @click="removeFavorite()">
          <v-icon size="24px">mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>

      <v-card-subtitle class="pb-0"> </v-card-subtitle>

      <v-card-text class="text--primary">
        <v-img
          class="white--text align-end"
          width="64px"
          height="64px"
          :src="
            detailedCar.brand.image !== '-'
              ? detailedCar.brand.image
              : require('../assets/image.png')
          "
        >
        </v-img>
        <div>Производитель: {{ detailedCar.brand.name }}</div>

        <div>Страна: {{ detailedCar.brand.country }}</div>
      </v-card-text>

      <div class="generationsWrap">
        <generation-info
          v-for="car in detailedCar.generations"
          :key="car.id"
          :data="car"
        ></generation-info>
      </div>

      <v-carousel
        v-if="detailedCar.others.length"
        :height="400"
        :hide-delimiters="true"
        v-model="model"
      >
        <v-carousel-item v-for="car in detailedCar.others" :key="car.id">
          <v-sheet width="80%" height="100%" tile :style="{ margin: '0 10%' }">
            <car-card :data="car"></car-card>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-card>

    <span v-else>Пусто</span>
  </div>
</template>

<script>
import CarCard from "../components/home/CarCard.vue";
import GenerationInfo from "../components/userCars/GenerationInfo.vue";
export default {
  components: { CarCard, GenerationInfo },
  data() {
    return {
      model: 0,
      colors: ["primary", "secondary", "yellow darken-2"],
    };
  },
  methods: {
    addCar() {
      this.$store.dispatch("addCar", this.car.id);
    },
    removeCar() {
      this.$store.dispatch("removeCar", this.car.id);
    },
    addFavorite() {
      this.$store.dispatch("addFavorite", this.car.id);
    },
    removeFavorite() {
      this.$store.dispatch("removeFavorite", this.car.id);
    },
  },
  computed: {
    detailedCar() {
      return this.$store.getters["detailedCar"];
    },
    isItMyCar() {
      const myCars = this.$store.getters["myCars"];
      return myCars.find((el) => el.id === this.car.id);
    },
    isItMyFavorite() {
      const favorite = this.$store.getters["favorite"];
      return favorite.find((el) => el.id === this.car.id);
    },
    currentRouteQueryId() {
      return this.$route.query.id;
    },
    car() {
      return this.detailedCar.generations.find(
        (el) => el.id === this.currentRouteQueryId
      );
    },
  },
  watch: {
    currentRouteQueryId() {
      this.$store.dispatch("loadDetailedCar", {
        id: this.currentRouteQueryId,
      });
    },
  },
  async beforeMount() {
    await this.$store.dispatch("loadDetailedCar", {
      id: this.currentRouteQueryId,
    });
  },
};
</script>

<style lang="scss" scoped>
.car {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .generationsWrap {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    align-items: center;
    justify-items: center;
    padding: 0 10%;
  }

  @media screen and (max-width: 1024px) {
    .generationsWrap {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media screen and (max-width: 768px) {
    .generationsWrap {
      grid-template-columns: 1fr;
    }
  }
}
</style>
