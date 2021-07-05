<template>
  <!-- <div id="v-model-select" class="demo">
    <select v-model="lang">
      <option disabled value="">Please select one</option>
      <option>zh-CN</option>
      <option>en-US</option>
      <option>th-TH</option>
      <option>vi-VN</option>
    </select>
    <span>Selected: {{ lang }}</span>
  </div> -->
  <!-- <br /> -->
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <router-view />
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.fdr {
  display: flex;
  justify-content: center;
  align-items: center;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      // zh-CN , en-US , th-TH , vi-VN
      lang: "vi-VN",
      // list: [{ drawIdString: "0", result: "000" }],
      // lnumber: 1,
      // shownumber: "",
    };
  },
};
</script>
