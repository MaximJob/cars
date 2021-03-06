<template>
  <aside class="filters">
    <h4>Фильтры</h4>
    <form @submit.prevent="filter()">
      <v-autocomplete
        v-model.trim="model"
        :items="carNamesList"
        :item-text="carNamesList.text"
        :item-value="carNamesList.value"
        label="Модель"
        @keyup="loadCarNamesList($event.target.value)"
        :clearable="true"
        @click:clear="loadCarNamesList('')"
      ></v-autocomplete>

      <v-text-field
        label="Бренд"
        v-model.trim="filters.brand.value"
      ></v-text-field>

      <div class="filter">
        <v-select
          v-model="filters.volume"
          :items="volumes"
          :item-text="volumes.text"
          :item-value="volumes.value"
          label="Объем двигателя"
          persistent-hint
          return-object
          single-line
        ></v-select>

        <v-btn
          v-if="filters.volume.value !== ''"
          text
          icon
          @click="resetFilter('volume')"
        >
          <v-icon>mdi-delete</v-icon></v-btn
        >
      </div>

      <div class="filter">
        <v-select
          v-model="filters.transmission"
          :items="transmissions"
          :item-text="transmissions.text"
          :item-value="transmissions.value"
          label="Трансмиссия"
          persistent-hint
          return-object
          single-line
        ></v-select>

        <v-btn
          v-if="filters.transmission.value !== ''"
          text
          icon
          @click="resetFilter('transmission')"
        >
          <v-icon>mdi-delete</v-icon></v-btn
        >
      </div>

      <div class="filter">
        <v-select
          v-model="filters.engine"
          :items="engines"
          :item-text="engines.text"
          :item-value="engines.value"
          label="Двигатель"
          persistent-hint
          return-object
          single-line
        ></v-select>

        <v-btn
          v-if="filters.engine.value !== ''"
          text
          icon
          @click="resetFilter('engine')"
        >
          <v-icon>mdi-delete</v-icon></v-btn
        >
      </div>

      <div class="filter">
        <v-select
          v-model="filters.body"
          :items="bodys"
          :item-text="bodys.text"
          :item-value="bodys.value"
          label="Корпус"
          persistent-hint
          return-object
          single-line
        ></v-select>

        <v-btn
          v-if="filters.body.value !== ''"
          text
          icon
          @click="resetFilter('body')"
        >
          <v-icon>mdi-delete</v-icon></v-btn
        >
      </div>

      <v-btn type="action" elevation="1" :disabled="isFiltersEmpty">
        Искать
      </v-btn>
      <v-btn v-if="!isFiltersEmpty" elevation="2" @click="reset()" class="mr-4">
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
      model: 0,
      filters: {
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

      sendOpportunity: true,

      volumes: this.$store.getters["filtersState/volumes"],
      transmissions: this.$store.getters["filtersState/transmissions"],
      engines: this.$store.getters["filtersState/engines"],
      bodys: this.$store.getters["filtersState/bodys"],
    };
  },

  computed: {
    carNamesList() {
      let list = this.$store.getters["carNamesList"];
      list = list.map((el) => ({
        text: el.model,
        value: el.id,
      }));
      return list;
    },

    isFiltersEmpty() {
      let result = true;
      const filters = this.filters;
      const keys = Object.keys(filters);

      keys.forEach((el) => (result &= this.isFilterEmpty(filters[el])));

      return !!result;
    },

    isFiltersEmptyExceptBrand() {
      let result = true;
      const filters = this.filters;
      let keys = Object.keys(filters);
      keys = keys.filter((el) => el !== "brand");

      keys.forEach((el) => (result &= this.isFilterEmpty(filters[el])));
      result &= filters.brand.value !== "";

      return !!result;
    },
  },

  methods: {
    filter() {
      if (this.sendOpportunity) {
        this.startSendTimer();
        if (this.isFiltersEmpty) {
          this.$store.commit("resetCars");
          this.$store.commit("resetFilters");
        } else {
          this.$store.commit("setFilters", { ...this.filters });
          if (this.isFiltersEmptyExceptBrand) {
            this.$store.dispatch("loadBrands");
          } else if (!this.isFiltersEmpty) {
            this.$store.dispatch("filterCars");
          }
        }
      }
    },

    loadCarNamesList(value) {
      if (this.sendOpportunity) {
        this.startSendTimer();
        const name = value;
        this.$store.dispatch("loadCarNamesList", { name });
      }
    },

    loadCar() {
      if (this.model !== null && this.model !== undefined && this.model > 0) {
        this.$router.push({ path: "/car", query: { id: this.model } });
      }
    },

    startSendTimer() {
      this.sendOpportunity = false;
      setTimeout(() => {
        this.sendOpportunity = true;
      }, 500);
    },

    isFilterEmpty(_filter) {
      const filter = _filter.value;
      return filter === "" || filter === null || filter === undefined;
    },

    resetFilter(filter) {
      this.filters[filter] = {
        text: "",
        value: "",
      };
      this.filter();
    },

    reset() {
      if (
        this.$route.query.brandName !== "" &&
        this.$route.query.brandId !== "" &&
        this.$route.path !== "/"
      ) {
        this.$router.push("/");
      }
      this.$store.commit("resetFilters");
      this.filters = this.$store.getters["filters"];
      this.$store.dispatch("loadBrands");
    },
  },

  watch: {
    brandName() {
      this.filters.brand = this.$props.brandName;
    },
    model() {
      this.loadCar();
    },
  },
};
</script>

<style lang="scss" scoped>
.filters {
  width: 100%;
  height: 100%;
  background-color: white;

  .filter {
    display: flex;
    align-items: center;
    justify-content: center;
  }

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
