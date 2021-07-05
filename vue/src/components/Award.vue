<template>
  <div class="award">
    <div class="award-top">一等獎</div>
    <div class="award-bottom">
      {{ list[0].result.substr(0, 5).split("|").join("") }}
      {{ list[0].result.substr(6).split("|").join("") }}
    </div>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  name: "Award",
  props: {
    // alist,
  },
  data() {
    return {
      // zh-CN , en-US , th-TH , vi-VN
      lang: "vi-VN",
      //   list: [{ drawIdString: "0", result: "000" }],
      lnumber: 1,
      shownumber: "",
    };
  },
  mounted() {},
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.th-lottery {
  background-color: #121212;
  width: 95%;
  margin: 0 auto;
  border-radius: 10px;
}
.title {
  text-align: left;
}
.lottery-group {
  flex-wrap: wrap;

  .l-active {
    background-color: #ffa;
    // width: 100%;
    // order: -1;
  }
}
.lottery {
  background-color: #faa;
  box-sizing: border-box;
  width: 48%;
  margin: 1%;
  padding: 15px;
}

.cube-group {
  width: 95%;
  margin: 0 auto;
  flex-wrap: wrap;

  .cube {
    background-color: #faf;
    width: 50px;
    height: 50px;
    line-height: 50px;
    margin: 3px;
  }
}
.award {
  width: 100%;
  .award-top {
    background-color: #888;
    height: 30px;
    line-height: 30px;
  }
  .award-bottom {
    background-color: #121212;
    height: 30px;
    line-height: 30px;
  }
}
</style>
