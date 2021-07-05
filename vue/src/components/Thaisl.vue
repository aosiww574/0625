<template>
  <div class="xx-lottery">
    <div class="title">
      <div class="ll ll2"></div>
      หวยหุ้นต่างประเทศ
      <!-- Thaisl -->
    </div>
    <div class="lottery-group fdr">
      <div
        class="lottery"
        :class="{ 'l-active-m': lnumber == 1 }"
        @click="thaisetl()"
      >
        <div class="nf nf2"></div>
        หุ้นไทยบ่าย
        <!-- 泰國SET綜合指數-午盤 -->
      </div>
      <div
        class="lottery"
        :class="{ 'l-active-m': lnumber == 2 }"
        @click="thaisetn()"
      >
        <div class="nf nf2"></div>
        หุ้นไทยเย็น
        <!-- 泰國SET綜合指數-晚盤 -->
      </div>
      <div
        class="lottery"
        :class="{ 'l-active-m': lnumber == 3 }"
        @click="jpnikl()"
      >
        <div class="nf nf3"></div>
        นิเคอิรอบเช้า
        <!-- 日經225指數-早盤 -->
      </div>
      <div
        class="lottery"
        :class="{ 'l-active-m': lnumber == 4 }"
        @click="jpnikn()"
      >
        <div class="nf nf3"></div>
        นิเคอิรอบบ่าย
        <!-- 日經225指數-午盤 -->
      </div>
      <div
        class="lottery"
        :class="{ 'l-active-m': lnumber == 5 }"
        @click="hkhsil()"
      >
        <div class="nf nf4"></div>
        ฮั่งเส็งรอบเช้า
        <!-- 香港恆生指數-早盤 -->
      </div>
      <div
        class="lottery"
        :class="{ 'l-active-m': lnumber == 6 }"
        @click="hkhsin()"
      >
        <div class="nf nf4"></div>
        ฮั่งเส็งรอบบ่าย
        <!-- 香港恆生指數-午盤 -->
      </div>
      <div
        class="lottery"
        :class="{ 'l-active-m': lnumber == 7 }"
        @click="szsecil()"
      >
        <div class="nf"></div>
        จีนรอบเช้า
        <!-- 深证成指-早盤 -->
      </div>
      <div
        class="lottery"
        :class="{ 'l-active-m': lnumber == 8 }"
        @click="szsecin()"
      >
        <div class="nf"></div>
        จีนรอบบ่าย
        <!-- 深证成指-午盤 -->
      </div>
    </div>

    <div class="wrapper" v-show="open">
      <!-- 今天已經開了幾期 -->
      <div class="cube-group fdr">
        <!-- item從1開始，index從0開始 -->
        <div
          class="cube"
          v-for="(item, index) in list"
          :key="index"
          :class="{ 'c-active': isActive == index }"
          @click="(day = index), (isActive = index)"
        >
          <!-- {{ shownumber - index }} -->
          {{ list[index].drawIdString.substr(4) }}
        </div>
      </div>

      <div>
        <p>
          {{ list[day].drawIdString.substr(6, 2) }} /
          {{ list[day].drawIdString.substr(4, 2) }} /
          {{ list[day].drawIdString.substr(0, 4) }}
        </p>
        <!-- <p>งวด {{ list[0].drawIdString.substr(8) }}</p> -->
      </div>

      <!-- <Award :alist="list" /> -->
      <div class="fdr w90">
        <div class="award">
          <div class="award-top">รางวัลที่ 1</div>
          <div class="award-bottom">
            {{ list[day].result.substr(0, 5).split("|").join("") }}
          </div>
        </div>
        <div class="award">
          <div class="award-top">รางวัลที่ 1</div>
          <div class="award-bottom">
            {{ list[day].result.substr(6).split("|").join("") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Award from "@/components/Award.vue";
import axios from "axios";
export default {
  name: "Thaisl",
  props: {},
  components: {
    // Award,
  },
  data() {
    return {
      // zh-CN , en-US , th-TH , vi-VN
      lang: "th-TH",
      list: [{ drawIdString: "0", result: "000" }],
      lnumber: 1,
      shownumber: "",
      day: 0,
      open: false,
      isActive: null,
    };
  },
  mounted() {
    // 泰國SET綜合指數-午盤 每天1期
    // this.thaisetl();
    // 泰國SET綜合指數-晚盤 每天1期
    // this.thaisetn();
    // 日經225指數-早盤 每天1期
    // this.jpnikl();
    // 日經225指數-午盤 每天1期
    // this.jpnikn();
    // 香港恆生指數-早盤 每天1期
    // this.hkhsil();
    // 香港恆生指數-午盤 每天1期
    // this.hkhsin();
    // 深证成指-早盤 每天1期
    // this.szsecil();
    // 深证成指-午盤 每天1期
    // this.szsecin();
  },
  methods: {
    // 泰國SET綜合指數-午盤 每天1期
    thaisetl() {
      axios
        .get(
          // "https://sle-api.uatdevops.site/sle-portal/vendorApis/draw/historyresults/nythaiffc?lang=zh-CN&offset=0&limit=2",
          // `https://sle-api.uatdevops.site/sle-portal/vendorApis/draw/historyresults/THAI?lang=${this.lang}&offset=0&limit=2`,
          `https://sle-api.uatdevops.site/sle-portal/vendorApis/draw/historyresults/thaisetl?lang=${this.lang}&offset=0&limit=20`,
          { "x-vendor-id": "T41SEXYLINE" }
        )
        .then((res) => {
          console.log(res.data.data);
          this.lnumber = 1;
          this.open = true;
          this.day = 0;
          this.isActive = 0;
          this.list = res.data.data;
          this.shownumber = parseInt(this.list[0].drawIdString.substr(8));
        });
    },
    // 泰國SET綜合指數-晚盤 每天1期
    thaisetn() {
      axios
        .get(
          `https://sle-api.uatdevops.site/sle-portal/vendorApis/draw/historyresults/thaisetn?lang=${this.lang}&offset=0&limit=20`,
          { "x-vendor-id": "T08YABO" }
        )
        .then((res) => {
          console.log(res.data.data);
          this.lnumber = 2;
          this.open = true;
          this.day = 0;
          this.isActive = 0;
          this.list = res.data.data;
          this.shownumber = parseInt(this.list[0].drawIdString.substr(8));
        });
    },
    // 日經225指數-早盤 每天1期
    jpnikl() {
      axios
        .get(
          `https://sle-api.uatdevops.site/sle-portal/vendorApis/draw/historyresults/jpnikl?lang=${this.lang}&offset=0&limit=20`,
          { "x-vendor-id": "T08YABO" }
        )
        .then((res) => {
          console.log(res.data.data);
          this.lnumber = 3;
          this.open = true;
          this.day = 0;
          this.isActive = 0;
          this.list = res.data.data;
          this.shownumber = parseInt(this.list[0].drawIdString.substr(8));
        });
    },
    // 日經225指數-午盤 每天1期
    jpnikn() {
      axios
        .get(
          `https://sle-api.uatdevops.site/sle-portal/vendorApis/draw/historyresults/jpnikn?lang=${this.lang}&offset=0&limit=20`,
          { "x-vendor-id": "T08YABO" }
        )
        .then((res) => {
          console.log(res.data.data);
          this.lnumber = 4;
          this.open = true;
          this.day = 0;
          this.isActive = 0;
          this.list = res.data.data;
          this.shownumber = parseInt(this.list[0].drawIdString.substr(8));
        });
    },

    // 香港恆生指數-早盤 每天1期
    hkhsil() {
      axios
        .get(
          `https://sle-api.uatdevops.site/sle-portal/vendorApis/draw/historyresults/hkhsil?lang=${this.lang}&offset=0&limit=20`,
          { "x-vendor-id": "T08YABO" }
        )
        .then((res) => {
          console.log(res.data.data);
          this.lnumber = 5;
          this.open = true;
          this.day = 0;
          this.isActive = 0;
          this.list = res.data.data;
          this.shownumber = parseInt(this.list[0].drawIdString.substr(8));
        });
    },
    // 香港恆生指數-午盤 每天1期
    hkhsin() {
      axios
        .get(
          `https://sle-api.uatdevops.site/sle-portal/vendorApis/draw/historyresults/hkhsin?lang=${this.lang}&offset=0&limit=20`,
          { "x-vendor-id": "T08YABO" }
        )
        .then((res) => {
          console.log(res.data.data);
          this.lnumber = 6;
          this.open = true;
          this.day = 0;
          this.isActive = 0;
          this.list = res.data.data;
          this.shownumber = parseInt(this.list[0].drawIdString.substr(8));
        });
    },
    // 深证成指-早盤 每天1期
    szsecil() {
      axios
        .get(
          `https://sle-api.uatdevops.site/sle-portal/vendorApis/draw/historyresults/szsecil?lang=${this.lang}&offset=0&limit=20`,
          { "x-vendor-id": "T08YABO" }
        )
        .then((res) => {
          console.log(res.data.data);
          this.lnumber = 7;
          this.open = true;
          this.day = 0;
          this.isActive = 0;
          this.list = res.data.data;
          this.shownumber = parseInt(this.list[0].drawIdString.substr(8));
        });
    },
    // 深证成指-午盤 每天1期
    szsecin() {
      axios
        .get(
          `https://sle-api.uatdevops.site/sle-portal/vendorApis/draw/historyresults/szsecin?lang=${this.lang}&offset=0&limit=20`,
          { "x-vendor-id": "T08YABO" }
        )
        .then((res) => {
          console.log(res.data.data);
          this.lnumber = 8;
          this.open = true;
          this.day = 0;
          this.isActive = 0;
          this.list = res.data.data;
          this.shownumber = parseInt(this.list[0].drawIdString.substr(4));
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.lottery-group .l-active-m {
  background-image: linear-gradient(#1ea9d1, #127eb0);
}
// .cube-group .cube {
//   background-image: linear-gradient(#1ea9d1, #127eb0);
// }
.c-active {
  background-image: linear-gradient(#1ea9d1, #127eb0);
}
.title {
  background-image: linear-gradient(#1ea9d1, #127eb0);
}
</style>
