<template>
  <div class="xx-lottery">
    <div class="title">
      <div class="ll ll4"></div>
      หวยรัฐบาล
      <!-- 泰國彩 -->
    </div>
    <div class="lottery-group fdr">
      <div
        class="lottery"
        :class="{ 'l-active': lnumber == 1 }"
        @click="THAI()"
      >
        <div class="nf nf2"></div>
        หวยรัฐบาล
        <!-- 泰國官彩 -->
      </div>
      <!-- <div
        class="lottery"
        :class="{ 'l-active': lnumber == 2 }"
        @click="lnumber = 2"
      >
        泰国快乐彩
      </div>
      <div
        class="lottery"
        :class="{ 'l-active': lnumber == 3 }"
        @click="lnumber = 3"
      >
        泰国金币彩
      </div>
      <div
        class="lottery"
        :class="{ 'l-active': lnumber == 4 }"
        @click="lnumber = 4"
      >
        泰国幸運彩
      </div>
      <div
        class="lottery"
        :class="{ 'l-active': lnumber == 5 }"
        @click="lnumber = 5"
      >
        泰国闪耀彩
      </div> -->
    </div>

    <div class="wrapper" v-show="open">
      <!-- 今天已經開了幾期 -->
      <div class="cube-group fdr">
        <!-- item從1開始，index從0開始 -->
        <!-- <div
          class="cube"
          v-for="(item, index) in 1"
          :key="index"
          :class="{ 'c-active': isActive == index }"
          @click="(day = index), (isActive = index)"
        >
          {{ list[0].drawIdString.substr(0, 4) }}
        </div> -->
      </div>

      <div>
        <p>
          {{ list[0].drawIdString.substr(6, 2) }} /
          {{ list[0].drawIdString.substr(4, 2) }} / {{ this.year }}
        </p>
        <!-- <p>{{ list[0].drawIdString.substr(0, 4) }}งวด</p>   -->
      </div>

      <div class="award">
        <div class="award-top">รางวัลที่ 1</div>
        <div class="award-bottom">
          {{ list[0].result.substr(0, 6) }}
        </div>
      </div>

      <div class="w90 fdr">
        <div class="award">
          <div class="award-top">เลขหน้า 3 ตัว</div>
          <div class="award-bottom">
            {{ list[0].result.substr(7, 3) }} {{ list[0].result.substr(11, 3) }}
          </div>
        </div>
        <div class="award">
          <div class="award-top">เลขท้าย 3 ตัว</div>
          <div class="award-bottom">
            {{ list[0].result.substr(15, 3) }}
            {{ list[0].result.substr(19, 3) }}
          </div>
        </div>
        <div class="award">
          <div class="award-top">เลขท้าย 2 ตัว</div>
          <div class="award-bottom">{{ list[0].result.substr(23) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Thai",
  props: {
    msg: String,
  },
  data() {
    return {
      // zh-CN , en-US , th-TH , vi-VN
      lang: "vi-VN",
      list: [{ drawIdString: "0", result: "000" }],
      lnumber: 1,
      shownumber: "",
      open: false,
      isActive: null,
      year: "",
    };
  },
  mounted() {
    // 泰國官彩 每月2期
    this.THAI();
    // 泰国快乐彩 每月1440期
    // this.magnum4d();
    // 泰国金币彩 每月480期
    // this.dama4d();
    // 泰国幸運彩 每月288期
    // this.sig4d();
    // 泰国闪耀彩 每月288期
    // this.NYTHAI10FC();
  },
  methods: {
    // 泰國官彩 每月2期
    THAI() {
      // https://sle-api.1356668.com/sle-portal/vendorApis/draw/historyresults/THAI?lang=en-US&offset=0&limit=10
      axios
        .get(
          // "https://sle-api.uatdevops.site/sle-portal/vendorApis/draw/historyresults/nythaiffc?lang=zh-CN&offset=0&limit=2",
          // `https://sle-api.uatdevops.site/sle-portal/vendorApis/draw/historyresults/THAI?lang=${this.lang}&offset=0&limit=2`,
          // `https://sle-api.uatdevops.site/sle-portal/vendorApis/draw/historyresults/thai?lang=${this.lang}&offset=0&limit=2`,
          `https://sle-api.uatdevops.site/sle-portal/vendorApis/draw/historyresults/THAI?lang=th-TH&offset=0&limit=20`,
          { "x-vendor-id": "T41SEXYLINE" }
        )
        .then((res) => {
          this.open = true;
          this.lnumber = 1;
          this.isActive = 0;
          this.list = res.data.data;
          this.shownumber = parseInt(this.list[0].drawIdString.substr(8));
          this.getYear();
        });
    },
    getYear() {
      var y = new Date(this.list[0].cycleEnd);
      this.year = y.getFullYear();
    },
    // 泰国快樂彩 每月1440期
    // magnum4d() {
    //   axios
    //     .get(
    //       `https://sle-api.uatdevops.site/sle-portal/vendorApis/draw/historyresults/NYTHAIFFC?lang=${this.lang}&offset=0&limit=20`,
    //       { "x-vendor-id": "T08YABO" }
    //     )
    //     .then((res) => {
    //       console.log("111");
    //       console.log(res.data.data);
    //       this.list = res.data.data;
    //       this.shownumber = parseInt(this.list[0].drawIdString.substr(8));
    //     });
    // },
    // 泰国金币彩 每月480期
    // dama4d() {
    //   axios
    //     .get(
    //       `https://sle-api.uatdevops.site/sle-portal/vendorApis/draw/historyresults/NYTHAI3FC?lang=${this.lang}&offset=0&limit=20`,
    //       { "x-vendor-id": "T08YABO" }
    //     )
    //     .then((res) => {
    //       console.log("111");
    //       console.log(res.data.data);
    //       this.list = res.data.data;
    //       this.shownumber = parseInt(this.list[0].drawIdString.substr(8));
    //     });
    // },
    // 泰国幸運彩 每月288期
    // sig4d() {
    //   axios
    //     .get(
    //       `https://sle-api.uatdevops.site/sle-portal/vendorApis/draw/historyresults/NYTHAI5FC?lang=${this.lang}&offset=0&limit=20`,
    //       { "x-vendor-id": "T08YABO" }
    //     )
    //     .then((res) => {
    //       console.log("111");
    //       console.log(res.data.data);
    //       this.list = res.data.data;
    //       this.shownumber = parseInt(this.list[0].drawIdString.substr(8));
    //     });
    // },
    // 泰国闪耀彩 每月144期
    // NYTHAI10FC() {
    //   axios
    //     .get(
    //       // `https://sle-api.uatdevops.site/sle-portal/vendorApis/draw/historyresults/NYTHAI10FC?lang=${this.lang}&offset=0&limit=20`,
    //       `https://sle-api.uatdevops.site/sle-portal/vendorApis/draw/historyresults/NYTHAI10FC?lang=en-US&offset=0&limit=20`,
    //       { "x-vendor-id": "T08YABO" }
    //     )
    //     .then((res) => {
    //       console.log("111");
    //       console.log(res.data.data);
    //       this.list = res.data.data;
    //       this.shownumber = parseInt(this.list[0].drawIdString.substr(8));
    //     });
    // },
  },
};
</script>

<style lang="scss">
.xx-lottery {
  background-color: #43547e;
  width: 95%;
  margin: 15px auto;
  border-radius: 10px;
  padding-bottom: 10px;
}
.title {
  border-radius: 10px 10px 0 0;
  // background-image: linear-gradient(-90deg, #bca770, #8b7342);
  // background-image: linear-gradient(-90deg, #bca770, #af0001);
  background-image: linear-gradient(#da6b5d, #c5413a);
  // background-color: #af0001;
  box-sizing: border-box;
  padding: 10px;
  margin: 0 auto;
  text-align: left;
}
.lottery-group {
  // margin-top: 5px;
  margin: 5px;
  // margin-bottom: 5px;
  flex-wrap: wrap;

  .l-active {
    background-image: linear-gradient(#da6b5d, #c5413a);
    width: 90%;
    order: -1;
  }
}
.lottery {
  background-color: #687797;
  box-sizing: border-box;
  width: 46%;
  padding: 15px;
  cursor: pointer;
  &:nth-of-type(2n) {
    margin: 3px 3px 3px 2px;
  }
  &:nth-of-type(2n + 1) {
    margin: 3px 2px 3px 3px;
  }
}

.cube-group {
  width: 95%;
  margin: 0 auto;
  flex-wrap: wrap;
  background-color: #43547e;

  .cube {
    background-color: #687797;
    width: 50px;
    height: 50px;
    line-height: 50px;
    margin: 3px;
    cursor: pointer;
  }
}
.award {
  width: 90%;
  margin: 10px auto;
  border: 1px solid #687797;
  .award-top {
    background-color: #687797;
    height: 30px;
    line-height: 30px;
  }
  .award-bottom {
    background-color: #43547e;
    height: 30px;
    line-height: 30px;
  }
}
.w90 {
  width: 90%;
  margin: 0 auto 5px;
}
.b-active,
.c-active {
  background-image: linear-gradient(#da6b5d, #c5413a);
}
p {
  line-height: 1.2;
  margin: 5px;
}
.nf {
  background-image: url(../assets/NationalFlag.png);
  height: 14px;
  width: 20px;
  transform: scale(1.5);
  float: left;
  margin: 3px;
}
.nf2 {
  background-position: -20px;
}
.nf3 {
  background-position: -40px;
}
.nf4 {
  background-position: -60px;
}
.nf5 {
  background-position: -80px;
}
.nf6 {
  background-position: -100px;
}
.nf7 {
  background-position: -120px;
}
.nf8 {
  background-position: -140px;
}
.ll {
  background-image: url(../assets/lottery_icon.png);
  height: 25px;
  width: 25px;
  float: left;
  margin-top: -5px;
  margin-right: 5px;
}
.ll2 {
  background-position: -25px;
}
.ll3 {
  background-position: -50px;
}
.ll4 {
  background-position: -75px;
}
</style>
