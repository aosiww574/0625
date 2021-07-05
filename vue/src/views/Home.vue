<template>
  <div class="all">
    <Signin />
    <Thai id="l1" />
    <Asial id="l3" />
    <Thaisl id="l4" />
    <YEEKEE id="l2" />
    <div class="rb" @click="fixed = true" v-show="visible">
      <i class="fa fa-search fa-2x fsearch"></i>
      <ul v-show="fixed">
        <div class="rb-all" @click.stop="fixed = false"></div>
        <a href="#l1"><li>Thai</li></a>
        <a href="#l3"><li>Asial</li></a>
        <a href="#l4"><li>Thaisl</li></a>
        <a href="#l2"><li>YEEKEE</li></a>
      </ul>
    </div>
    <Rule />
    <Right />
    <!-- <Previouspage /> -->
    <!-- <Register /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Signin from "@/components/Signin.vue";
import Thai from "@/components/Thai.vue";
import Asial from "@/components/Asial.vue";
import Thaisl from "@/components/Thaisl.vue";
import YEEKEE from "@/components/YEEKEE.vue";
import Right from "@/components/Right.vue";
import Rule from "@/components/Rule.vue";
// import Previouspage from "@/components/Previouspage.vue";
// import Register from "@/components/Register.vue";

export default {
  name: "Home",
  data() {
    return {
      fixed: false,
      showtype: "5",
      visible: false,
    };
  },
  components: {
    Signin,
    Thai,
    YEEKEE,
    Asial,
    Thaisl,
    Right,
    Rule,
    // Previouspage,
    // Register,
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
    this.offsetTop = 10; //某个位置距离顶部的距离
  },
  updated() {},
  methods: {
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      //当滚动条的长度大于指定的位置到顶部的距离时
      if (scrollTop > this.offsetTop) {
        this.visible = true; //显示底部按钮
      } else {
        this.visible = false; //隐藏底部按钮
      }
    },
  },
};
</script>

<style lang="scss">
* {
  scroll-behavior: smooth;
  color: #fff;
}
body {
  background-color: #223766;
}
.rb {
  width: 50px;
  height: 50px;
  position: fixed;
  right: 0;
  bottom: 0;
  background-color: #333;

  ul {
    position: fixed;
    bottom: 50px;
    right: 0;
    list-style: none;

    a {
      text-decoration: none;
    }
    li {
      background-color: #333;
      height: 40px;
      width: 150px;
      line-height: 40px;
      &:active {
        background-color: #ffa;
      }
    }
  }
  .rb-all {
    z-index: -1;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
}
.fsearch {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
}
.all {
  width: 90%;
  max-width: 400px;
  margin: 20px auto;
}
</style>
