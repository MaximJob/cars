<template>
  <div class="page404">
    <h2>404</h2>
    <button @click="$router.push('/')">На главную</button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.page404 {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #ff4040;

  h2,
  button {
    color: white;
  }

  h2 {
    font-size: 120px;
    font-weight: 700;
  }

  button {
    font-size: 20px;
    padding: 10px;
    border: 2px solid white;
  }
}
</style>
