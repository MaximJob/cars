<template>
  <aside class="filters">
    <h4>Фильтры</h4>
    <form @submit.prevent="filter()">
      <v-text-field
        label="Модель"
        v-model.trim="filters.model.value"
      ></v-text-field>

      <v-text-field
        label="Бренд"
        v-model.trim="filters.brand.value"
      ></v-text-field>

      <v-select
        v-model="filters.volume"
        :items="volumes"
        :item-text="volumes.text"
        :item-value="volumes.value"
        filled
        label="Объем двигателя"
        persistent-hint
        return-object
        single-line
      ></v-select>

      <v-select
        v-model="filters.transmission"
        :items="transmissions"
        :item-text="transmissions.text"
        :item-value="transmissions.value"
        filled
        label="Трансмиссия"
        persistent-hint
        return-object
        single-line
      ></v-select>

      <v-select
        v-model="filters.engine"
        :items="engines"
        :item-text="engines.text"
        :item-value="engines.value"
        filled
        label="Двигатель"
        persistent-hint
        return-object
        single-line
      ></v-select>

      <v-select
        v-model="filters.body"
        :items="bodys"
        :item-text="bodys.text"
        :item-value="bodys.value"
        filled
        label="Корпус"
        persistent-hint
        return-object
        single-line
      ></v-select>

      <v-btn elevation="1" @click="filter()">Искать</v-btn>
      <v-btn
        v-if="!isFilteresEmpty"
        elevation="2"
        @click="reset()"
        class="mr-4"
      >
        Сбросить
      </v-btn>
    </form>
  </aside>
</template>

<script>
export default {
  props: {
    brands: {
      type: Array,
      required: true,
    },
    cars: {
      type: Array,
      required: true,
    },
    brandName: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      filters: {
        model: {
          text: "",
          value: "",
        },
        brand: {
          text: "",
          value: "",
        },
        volume: {
          text: "",
          value: "",
        },
        transmission: {
          text: "",
          value: "",
        },
        engine: {
          text: "",
          value: "",
        },
        body: {
          text: "",
          value: "",
        },
      },

      volumes: [
        {
          text: "1",
          value: "1.0",
        },
        {
          text: "2",
          value: "2.0",
        },
        {
          text: "3",
          value: "3.0",
        },
        {
          text: "4",
          value: "4.0",
        },
        {
          text: "5",
          value: "5.0",
        },
      ],
      transmissions: [
        {
          text: "Механика",
          value: "механика",
        },
        {
          text: "Автомат",
          value: "автомат",
        },
        {
          text: "Робот",
          value: "робот",
        },
        {
          text: "Вариатор",
          value: "вариатор",
        },
      ],
      engines: [
        {
          text: "Бензин",
          value: "бензин",
        },
        {
          text: "Гибрид",
          value: "гибрид",
        },
        {
          text: "Дизель",
          value: "дизель",
        },
        {
          text: "СУГ",
          value: "бензин",
        },
        {
          text: "Электро",
          value: "электро",
        },
      ],
      bodys: [
        {
          text: "Купе",
          value: "Купе",
        },
        {
          text: "Родстер",
          value: "Родстер",
        },
        {
          text: "Седан",
          value: "Седан",
        },
        {
          text: "Хэтчбек",
          value: "Хэтчбек",
        },
        {
          text: "Внедорожник",
          value: "Внедорожник",
        },
        {
          text: "Универсал",
          value: "Универсал",
        },
        {
          text: "вариатоТарга",
          value: "вариатоТарга",
        },
        {
          text: "Кабриолет",
          value: "Кабриолет",
        },
        {
          text: "Купе - хардтоп",
          value: "Купе - хардтоп",
        },
        {
          text: "Минивэн",
          value: "Минивэн",
        },
        {
          text: "Лифтбек",
          value: "Лифтбек",
        },
        {
          text: "Лимузин",
          value: "Лимузин",
        },
        {
          text: "Пикап",
          value: "Пикап",
        },
        {
          text: "Компактвэн",
          value: "Компактвэн",
        },
        {
          text: "Спидстер",
          value: "Спидстер",
        },
        {
          text: "Фастбек",
          value: "Фастбек",
        },
        {
          text: "Седан - хардтоп",
          value: "Седан - хардтоп",
        },
        {
          text: "Фаэтон",
          value: "Фаэтон",
        },
        {
          text: "Микровэн",
          value: "Микровэн",
        },
        {
          text: "Фургон",
          value: "Фургон",
        },
      ],
    };
  },
  computed: {
    isFilteresEmpty() {
      let result = true;
      const keys = Object.keys(this.filters);
      keys.forEach((el) => (result &= this.filters[el].value === ""));
      return result;
    },
    isFilteresEmptyExceptBrand() {
      let result = true;
      const keys = Object.keys(this.filters).filter((el) => el !== "brand");
      keys.forEach((el) => (result &= this.filters[el].value === ""));
      result &= this.filters.brand.value !== "";
      return result;
    },
  },
  methods: {
    filter() {
      if (this.isFilteresEmptyExceptBrand) {
        this.$store.commit("cars/setFilters", { ...this.filters });
        this.$store.dispatch("cars/loadBrands");
      } else if (!this.isFilteresEmpty) {
        this.$store.commit("cars/setFilters", { ...this.filters });
        this.$store.dispatch("cars/filterCars");
      }
    },
    reset() {
      if (
        this.$route.query.brandName !== "" &&
        this.$route.query.brandId !== ""
      ) {
        this.$router.push("/");
      }
      this.$store.commit("cars/resetFilters");
      this.filters = this.$store.getters["cars/filters"];
      this.$store.dispatch("cars/loadBrands");
    },
  },
  watch: {
    brandName() {
      this.filters.brand = this.$props.brandName;
    },
  },
};
</script>

<style lang="scss" scoped>
.filters {
  width: 100%;
  height: 100%;
  background-color: white;

  h4 {
    height: 40px;
  }

  form {
    width: 100%;
    padding: 10px;

    button {
      margin: 0 10px 20px 10px;
    }
  }
}
</style>
