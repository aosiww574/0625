<template>
  <button @click="$router.go(-1)">
    <!-- <img src="@/assets/outline_arrow_back_black_18dp.png" alt="" /> -->
    <img src="@/assets/back.png" alt="" />
  </button>
</template>

<style scoped lang="scss">
button {
  position: fixed;
  top: 0px;
  //   bottom: 0;
  left: 0;
  width: 60px;
  height: 60px;
  border: none;
  background-color: #43547e;
  border-radius: 0 0 5px 0;
}
img {
  width: 80%;
  height: 80%;
}
</style>
