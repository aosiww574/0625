<template>
  <div class="xx-lottery">
    <div class="title">
      <div class="ll ll3"></div>
      หวยเอเชีย
      <!-- Asial -->
    </div>
    <div class="lottery-group fdr">
      <div
        class="lottery"
        :class="{ 'l-active-m': lnumber == 1 }"
        @click="laodl()"
      >
        <div class="nf nf7"></div>
        หวยลาว
        <!-- 老過採 -->
      </div>
      <div
        class="lottery"
        :class="{ 'l-active-m': lnumber == 2 }"
        @click="magnum4d()"
      >
        <div class="nf nf6"></div>
        หวยมาเลเซีย
        <!-- 馬來萬能4D -->
      </div>
      <div
        class="lottery"
        :class="{ 'l-active-m': lnumber == 3 }"
        @click="dama4d()"
      >
        <div class="nf nf6"></div>
        หวยมาเลย
        <!-- 大馬採4D -->
      </div>
      <div
        class="lottery"
        :class="{ 'l-active-m': lnumber == 4 }"
        @click="sig4d()"
      >
        <div class="nf nf8"></div>
        หวยสิงคโปร์4D
        <!-- 新加玻4D -->
      </div>
    </div>

    <div class="wrapper" v-show="open">
      <!-- 今天已經開了幾期 -->
      <!-- <div class="cube-group fdr"> -->
      <div>
        <!-- item從1開始，index從0開始 -->
        <!-- <div class="cube" v-for="(item, index) in 1" :key="index"> -->
        <div v-if="lnumber === 1" class="cube-group fdr">
          <div
            class="cube"
            v-for="(item, index) in list"
            :key="index"
            :class="{ 'c-active': isActive == index }"
            @click="(day = index), (isActive = index)"
          >
            <!-- {{ shownumber - index }} -->
            {{ list[index].drawIdString.substr(4, 4) }}
          </div>
        </div>

        <div v-else-if="lnumber === 4" class="cube-group fdr">
          <div
            class="cube"
            v-for="(item, index) in list"
            :key="index"
            :class="{ 'c-active': isActive == index }"
            @click="(day = index), (isActive = index)"
          >
            {{ list[index].drawIdString.substr() }}
          </div>
        </div>
        <div v-else class="cube-group fdr">
          <div class="wrong w90">X</div>
        </div>
      </div>

      <div>
        <p v-if="lnumber === 1">
          {{ list[day].drawIdString.substr(6, 2) }} /
          {{ list[day].drawIdString.substr(4, 2) }} /
          {{ list[day].drawIdString.substr(0, 4) }}
        </p>
        <!-- <p v-if="lnumber === 1">期號 {{ list[0].drawIdString.substr(8) }}</p> -->
        <p v-if="lnumber === 4">{{ list[day].drawIdString.substr() }} งวด</p>
      </div>

      <div class="fdr w90" v-if="lnumber === 1 || lnumber === 4">
        <div class="award">
          <div class="award-top">3 ตัวบน</div>
          <div class="award-bottom">
            {{ list[day].result.substr(0, 5).split("|").join("") }}
          </div>
        </div>
        <div class="award">
          <div class="award-top">2 ตัวล่าง</div>
          <div class="award-bottom">
            {{ list[day].result.substr(6).split("|").join("") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Asial",
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
      day: 0,
      open: false,
      isActive: null,
      year: 0,
      month: 0,
      days: 0,
    };
  },
  mounted() {
    // 老撾彩 每週2期
    // this.laodl();
    // 馬來萬能4D 每週3期
    // this.magnum4d();
    // 泰国金币彩 每週3期
    // this.dama4d();
    // 新加坡4D 每週3期
    // this.sig4d();
  },
  methods: {
    // 老撾彩 每週2期
    laodl() {
      axios
        .get(
          // "https://sle-api.uatdevops.site/sle-portal/vendorApis/draw/historyresults/nythaiffc?lang=zh-CN&offset=0&limit=2",
          // `https://sle-api.uatdevops.site/sle-portal/vendorApis/draw/historyresults/THAI?lang=${this.lang}&offset=0&limit=2`,
          `https://sle-api.uatdevops.site/sle-portal/vendorApis/draw/historyresults/laodl?lang=${this.lang}&offset=0&limit=13`,
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
    // cycleEnd: 1624280400000
    // cycleStart: 1624024800000
    // drawIdString: "20210621"
    // gameId: "LAODL"
    // gameName: "老撾彩"
    // lastAvailable: 1624278600000
    // result: "3|4|1|8|3"

    // 馬來萬能4D 每週3期
    magnum4d() {
      this.open = true;
      this.lnumber = 2;
      //   axios
      //     .get(
      //       `https://sle-api.uatdevops.site/sle-portal/vendorApis/draw/historyresults/magnum4d?lang=${this.lang}&offset=0&limit=20`,
      //       { "x-vendor-id": "T08YABO" }
      //     )
      //     .then((res) => {
      //       console.log(res.data.data);
      //       this.lnumber = 2;
      //       this.day = 0;
      //       this.list = res.data.data;
      //       this.shownumber = parseInt(this.list[0].drawIdString.substr(8));
      //     });
    },
    // 大馬彩4D 每週3期
    dama4d() {
      this.open = true;
      this.lnumber = 3;
      // axios
      //   .get(
      //     `https://sle-api.uatdevops.site/sle-portal/vendorApis/draw/historyresults/dama4d?lang=${this.lang}&offset=0&limit=20`,
      //     { "x-vendor-id": "T08YABO" }
      //   )
      //   .then((res) => {
      //     console.log(res.data.data);
      //     this.lnumber = 3;
      //     this.day = 0;
      //     this.list = res.data.data;
      //     this.shownumber = parseInt(this.list[0].drawIdString.substr(8));
      //   });
    },
    // 新加坡4D 每週3期
    sig4d() {
      axios
        .get(
          `https://sle-api.uatdevops.site/sle-portal/vendorApis/draw/historyresults/sig4d?lang=${this.lang}&offset=0&limit=20`,
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
      // cycleEnd: 1624185000000
      // cycleStart: 1624102200000
      // drawIdString: "4716"
      // gameId: "SIG4D"
      // gameName: "新加坡4D"
      // lastAvailable: 1624183200000
      // result: "6|6|9|4|4"
    },
    getYear() {
      // this.day = index;
      // this.isActive = index;
      console.log("123");
      var y = new Date(this.list[0].cycleEnd);
      this.year = y.getFullYear();
      this.days = y.getDate();
      console.log(this.days);
      this.month = y.getMonth() + 1;
      console.log(this.month);
    },
  },
};
</script>

<style scoped lang="scss">
.wrong {
  height: 45px;
  line-height: 45px;
  background-color: #687797;
  margin-top: 15px;
  margin-bottom: 15px;
}
.lottery-group .l-active-m {
  background-image: linear-gradient(#1ea9d1, #127eb0);
}
.c-active {
  background-image: linear-gradient(#1ea9d1, #127eb0);
}
.title {
  background-image: linear-gradient(#1ea9d1, #127eb0);
}
</style>
