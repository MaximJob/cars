<template>
  <div class="brands">
    <h4>Бренды</h4>
    <v-carousel
      v-if="pages.length"
      height="100%"
      v-model="model"
      :show-arrows="false"
      :style="{ padding: pages.length > 1 ? '0 0 110px 0' : null }"
      :hide-delimiters="pages.length < 2"
    >
      <v-carousel-item height="100%" v-for="page in pages" :key="page[0].id">
        <v-sheet height="100%" tile>
          <v-row class="fill-height" align="center" justify="center">
            <div class="wrap">
              <Brand
                v-for="brand in page"
                :key="brand.id"
                :data="brand"
              ></Brand>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <span v-else>Пусто</span>
  </div>
</template>

<script>
import Brand from "@/components/home/Brand";

export default {
  components: { Brand },
  data() {
    return {
      model: 0,
    };
  },
  computed: {
    pages() {
      const pages = [];
      let page = [];
      const brands = this.$store.getters["brands"];
      brands.forEach((el) => {
        if (page.length < 9) page.push(el);
        else {
          pages.push(page);
          page = [];
        }
      });
      if (brands.length < 9 && !pages.length && page.length) {
        pages.push(page);
        page = [];
      }
      return pages;
    },
  },
};
</script>

<style lang="scss" scoped>
.brands {
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 0 20px 20px 20px;

  h4 {
    height: 40px;
  }

  > div {
    width: 100%;
    height: 100%;
  }

  .wrap {
    width: 100%;
    height: calc(100% - 40px);
    display: grid;
    grid-template: repeat(3, auto) / repeat(3, 1fr);
    grid-gap: 10px;
    padding: 0 20px;
  }

  @media screen and(max-width:1024px) {
    .wrap {
      grid-template: repeat(5, auto) / repeat(2, 1fr);
    }
  }
  @media screen and(max-width:768px) {
    .wrap {
      grid-template: repeat(9, auto) / 1fr;
    }
  }
}
</style>
