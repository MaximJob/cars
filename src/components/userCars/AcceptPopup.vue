<template>
  <div class="acceptPopup">
    <button class="remove" @click="$emit('remove')">Подтвердить</button>
    <button @click="$emit('cancel')">Отменить</button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.acceptPopup {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(153, 153, 153, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  backdrop-filter: blur(10px);

  .remove {
    background-color: #ff7878;
  }

  button {
    background-color: white;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
  }

  button:hover {
    transform: scale(1.1);
    box-shadow: 0 1px 3px 1px #999;
  }
}
</style>