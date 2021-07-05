<template>
  <!-- <a href="#">
    <div class="rule">Rule and Regulation</div>
  </a> -->
  <router-link to="/contact">
    <div class="rule">ข้อกำหนดและเงื่อนไขการใช้</div>
  </router-link>
</template>

<script>
export default {
  name: "Right",
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
.rule {
  height: 50px;
  line-height: 50px;
  width: 95%;
  margin: 0 auto;
  background-color: #43547e;
  border-radius: 10px;
}
</style>
