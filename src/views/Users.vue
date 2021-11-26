<template>
  <div class="users">
    <v-data-table
      :headers="headers"
      :items="users"
      item-key="id"
      class="elevation-1"
    >
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "Id", value: "id" },
        { text: "Имя", value: "name" },
        { text: "Email", value: "email" },
        { text: "Дата регистрации", value: "date" },
      ],
    };
  },
  async beforeMount() {
    this.$store.commit("startLoading");
    await this.$store.dispatch("users/loadUsers");
    this.$store.commit("endLoading");
  },
  computed: {
    users() {
      return this.$store.getters["users/users"];
    },
  },
};
</script>

<style lang="scss" scoped>
.users {
  width: 100%;
  height: 100%;
  padding: 20px;

  .avatar {
    cursor: pointer;
    margin: 0 10px;
  }
}
</style>
