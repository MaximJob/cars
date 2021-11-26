<template>
  <div class="generationInfo">
    <v-card class="mx-auto" max-width="344">
      <v-img
        :src="
          data.image !== '-' ? data.image : require('../../assets/image.png')
        "
        :lazy-src="require('../../assets/image.png')"
        height="200px"
      ></v-img>

      <v-card-title> {{ data.model }} </v-card-title>
      <v-card-subtitle> {{ data.generation }} </v-card-subtitle>
      <v-card-text> Высота: {{ data.height }} </v-card-text>
      <v-card-text> Длина: {{ data.width }} </v-card-text>
      <v-card-text>
        Объем двигателя: {{ data.modification[0].volume }}
      </v-card-text>
      <v-card-text>
        Тип трансмиссии: {{ data.modification[0].transmission }}
      </v-card-text>
      <v-card-text>
        Тип двигателя: {{ data.modification[0].engine }}
      </v-card-text>
      <v-card-text> Корпус: {{ data.modification[0].body }} </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      requiered: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.generationInfo {
  img {
    width: 200px;
    height: 150px;
  }
  > div {
    margin-bottom: 10px;
  }
}
</style>