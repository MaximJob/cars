<template>
  <div class="loading">
    <div class="circle"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0 80px 0;

  .circle {
    width: 60px;
    height: 60px;
    background-color: #9bb1ff;
    animation: loading 1s linear infinite;
    position: relative;
  }

  .circle::after {
    content: "";
    position: absolute;
    left: 4px;
    top: 4px;
    width: 52px;
    height: 52px;
    background-color: white;
  }

  .circle::before {
    content: "";
    position: absolute;
    left: -10px;
    top: -10px;
    width: 40px;
    height: 40px;
    background-color: white;
  }

  .circle,
  .circle::after {
    border-radius: 50%;
  }

  @keyframes loading {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>