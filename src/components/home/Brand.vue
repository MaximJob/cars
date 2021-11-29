<template>
  <div class="brand">
    <v-card
      class="mx-auto"
      min-width="240px"
      width="100%"
      :style="{ paddingTop: '40px' }"
    >
      <v-img
        :src="
          data.image !== '-' ? data.image : require('../../assets/image.png')
        "
        :lazy-src="require('../../assets/image.png')"
        contain
        height="64px"
        :style="{
          marginBottom: '20px',
        }"
      ></v-img>

      <v-card-title> {{ data.name }} </v-card-title>

      <v-card-actions>
        <v-btn color="orange lighten-2" text class="open" @click="open()">
          МОДЕЛИ
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            {{
              data.description !== "-"
                ? data.description
                : "Описание отсутствует"
            }}
          </v-card-text>
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
    open() {
      this.$router.push({
        path: "/",
        query: {
          brandName: this.$props.data.name,
          brandId: this.$props.data.id,
        },
      });
      this.$store.dispatch("cars/loadCars", {
        name: this.$props.data.name,
        id: this.$props.data.id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.brand {
  width: 100%;
  height: 100%;

  .open {
    cursor: pointer;
  }
}
</style>
