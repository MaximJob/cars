<template>
  <div class="car">
    <v-card class="mx-auto" min-width="300px" width="100%">
      <v-img
        :src="
          data.image !== '-' ? data.image : require('../../assets/image.png')
        "
        :lazy-src="require('../../assets/image.png')"
        contain
        height="200px"
        max-width="300"
        :style="{ margin: '0 auto' }"
      ></v-img>

      <v-card-title> {{ data.model }} </v-card-title>
      <v-card-subtitle> {{ data.generation }} </v-card-subtitle>

      <v-card-actions>
        <v-btn @click="loadCar()" color="orange lighten-2" text class="open">
          Подробнее
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text> Поколение: {{ data.generation }} </v-card-text>
          <v-card-text v-if="data.volume">
            Объем двигателя: {{ data.volume }}
          </v-card-text>
          <v-card-text v-if="data.transmission">
            Тип трансмиссии: {{ data.transmission }}
          </v-card-text>
          <v-card-text v-if="data.engine">
            Тип двигателя: {{ data.engine }}
          </v-card-text>
          <v-card-text v-if="data.body"> Корпус: {{ data.body }} </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    show: false,
  }),
  methods: {
    loadCar() {
      this.$router.push({ path: "/car", query: { id: this.$props.data.id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.car {
  width: 100%;
  height: 100%;
}
</style>
