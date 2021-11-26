<template>
  <aside class="filters">
    <h4>Фильтры</h4>
    <form @submit.prevent="filter()">
      <v-text-field label="Модель" v-model.trim="filters.model"></v-text-field>

      <v-text-field label="Бренд" v-model.trim="filters.brand"></v-text-field>

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
      <v-btn v-if="!isFilteresEmpty()" elevation="2" @click="clear()"
        >Сбросить</v-btn
      >
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
      type: String,
      required: true,
    },
  },
  data() {
    return {
      filters: {
        model: "",
        brand: "",
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
        body: "",
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
        "Купе",
        "Родстер",
        "Седан",
        "Хэтчбек",
        "Внедорожник",
        "Универсал",
        "вариатоТарга",
        "Кабриолет",
        "Купе - хардтоп",
        "Минивэн",
        "Лифтбек",
        "Лимузин",
        "Пикап",
        "Компактвэн",
        "Спидстер",
        "Фастбек",
        "Седан - хардтоп",
        "Фаэтон",
        "Микровэн",
        "Фургон",
      ],
    };
  },
  methods: {
    filter() {
      if (this.isFilteresEmptyExceptBrand()) {
        this.$store.commit("cars/setFilters", { ...this.filters });
        this.$store.dispatch("cars/loadBrands");
      } else if (!this.isFilteresEmpty()) {
        this.$store.commit("cars/setFilters", { ...this.filters });
        this.$store.dispatch("cars/filterCars");
      }
    },
    clear() {
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
      this.$store.commit("cars/resetFilters");
      this.filters = this.$store.getters["cars/filters"];
      this.$store.dispatch("cars/loadBrands");
    },
    isFilteresEmpty() {
      return Boolean(
        this.filters.model === "" &&
          this.filters.brand === "" &&
          this.filters.volume.value === "" &&
          this.filters.transmission.value === "" &&
          this.filters.engine.value === "" &&
          this.filters.body === ""
      );
    },
    isFilteresEmptyExceptBrand() {
      return Boolean(
        this.filters.model === "" &&
          this.filters.brand !== "" &&
          this.filters.volume.value === "" &&
          this.filters.transmission.value === "" &&
          this.filters.engine.value === "" &&
          this.filters.body === ""
      );
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
