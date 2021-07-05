<template>
  <div class="xx-lottery">
    <div class="title">
      <div class="ll"></div>
      YEEKEE
    </div>
    <div class="lottery-group fdr">
      <div
        class="lottery"
        :class="{ 'l-active': lnumber == 1 }"
        @click="YEEKEE()"
      >
        YEEKEE
      </div>
    </div>

    <div v-show="open">
      <p>
        {{ list[day].drawIdString.substr(6, 2) }} /
        {{ list[day].drawIdString.substr(4, 2) }} /
        {{ list[day].drawIdString.substr(0, 4) }}
      </p>
      <p>งวด {{ list[day].drawIdString.substr(8) }}</p>
    </div>

    <div class="fdr w90" v-show="open">
      <div class="award">
        <div class="award-top">สามตัวบน</div>
        <div class="award-bottom">
          {{ list[day].result.substr(0, 5).split("|").join("") }}
        </div>
      </div>
      <div class="award">
        <div class="award-top">สองตัวล่าง</div>
        <div class="award-bottom">
          {{ list[day].result.substr(6).split("|").join("") }}
        </div>
      </div>
    </div>

    <!-- 昨天結果 -->
    <!-- <div id="v-model-select" class="demo">
      <select v-model="chooseDay">
        <option disabled value="">Please select one</option>
        <option @click="YEEKEEyesterday()">(yesterday)</option>
        <option @click="YEEKEE()">{{ today }} (today)</option>
      </select>
      <span>Selected: {{ chooseDay }} </span>
    </div> -->
    <div class="wrapper" v-show="open">
      <button @click="YEEKEEyesterday(3)" :class="{ 'b-active': x === 3 }">
        {{ today4 }}
      </button>
      <button @click="YEEKEEyesterday(2)" :class="{ 'b-active': x === 2 }">
        {{ today3 }}
      </button>
      <button @click="YEEKEEyesterday(1)" :class="{ 'b-active': x === 1 }">
        {{ today2 }}
      </button>
      <button @click="YEEKEE()" :class="{ 'b-active': x === 0 }">
        {{ today }} (today)
      </button>

      <!-- 今天已經開了幾期 -->
      <div class="cube-group fdr" v-if="x === 0">
        <!-- item從1開始，index從0開始 -->
        <div
          class="cube"
          v-for="(item, index) in shownumber"
          :key="index"
          :class="{ 'c-active': isActive == index }"
          @click="(day = index), (isActive = index)"
        >
          {{ list[index].drawIdString.substr(8) }}
        </div>
      </div>
      <div class="cube-group fdr" v-else>
        <!-- item從1開始，index從0開始 -->
        <div
          class="cube"
          v-for="(item, index) in 88"
          :key="index"
          :class="{ 'c-active': isActive == index }"
          @click="(day = index), (isActive = index)"
        >
          {{ list[index].drawIdString.substr(8) }}
        </div>
      </div>

      <!-- <div>
        <p>
          {{ list[day].drawIdString.substr(6, 2) }} /
          {{ list[day].drawIdString.substr(4, 2) }} /
          {{ list[day].drawIdString.substr(0, 4) }}
        </p>
        <p>{{ list[day].drawIdString.substr(8) }}งวด</p>
      </div> -->

      <!-- <div class="fdr w90">
        <div class="award">
          <div class="award-top">สามตัวบน</div>
          <div class="award-bottom">
            {{ list[day].result.substr(0, 5).split("|").join("") }}
          </div>
        </div>
        <div class="award">
          <div class="award-top">สองตัวล่าง</div>
          <div class="award-bottom">
            {{ list[day].result.substr(6).split("|").join("") }}
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "YEEKEE",
  props: {
    msg: String,
  },
  data() {
    return {
      // zh-CN , en-US , th-TH , vi-VN
      lang: "vi-VN",
      list: [{ drawIdString: "0", result: "000" }],
      yesterdaylist: [],
      lnumber: 1,
      shownumber: 0,
      day: 0,
      open: false,
      data: "",
      data1: "",
      today: "",
      today2: "",
      today3: "",
      today4: "",
      x: 0,
      isActive: null,
    };
  },
  mounted() {
    // YEEKEE 每月88期
    // this.YEEKEE();

    // 今天
    this.data = new Date();
    this.today =
      this.data.getDate() + "/" + (this.data.getMonth() + 1).toString();
    // 昨天
    this.data.setTime(this.data.getTime() - 24 * 60 * 60 * 1000);
    this.today2 =
      this.data.getDate() + "/" + (this.data.getMonth() + 1).toString();
    // 前天
    this.data.setTime(this.data.getTime() - 24 * 60 * 60 * 1000);
    this.today3 =
      this.data.getDate() + "/" + (this.data.getMonth() + 1).toString();
    // 大前天
    this.data.setTime(this.data.getTime() - 24 * 60 * 60 * 1000);
    this.today4 =
      this.data.getDate() + "/" + (this.data.getMonth() + 1).toString();
  },
  methods: {
    // YEEKEE 每月88期
    YEEKEE() {
      this.x = 0;
      axios
        .get(
          // `https://sle-api.uatdevops.site/sle-portal/vendorApis/draw/historyresults/NYTHAI10FC?lang=${this.lang}&offset=0&limit=20`,
          // `https://sle-api.uatdevops.site/sle-portal/vendorApis/draw/historyresults/YEEKEE?lang=en-US&offset=0&limit=88`,
          // 新的
          // `https://sle-api.1356668.com/sle-portal/vendorApis/draw/historyresults/YEEKEE?lang=en-US&offset=0&limit=88`,
          // UTA
          `https://sle-api.uatdevops.site/sle-portal/vendorApis/draw/historyresults/YEEKEE?lang=th-TH&offset=0&limit=100`,
          { "x-vendor-id": "T08YABO" }
          // { "x-vendor-id": "T08YABO", cycleEnd: "16243505520000" }
        )
        .then((res) => {
          console.log("111");
          console.log(res.data.data);
          this.isActive = 0;
          this.open = true;
          this.list = res.data.data;
          this.shownumber = parseInt(this.list[0].drawIdString.substr(8));
        });
    },
    YEEKEEyesterday(y) {
      this.x = y;
      axios
        .get(
          `https://sle-api.uatdevops.site/sle-portal/vendorApis/draw/historyresults/YEEKEE?lang=th-TH&offset=${
            this.shownumber + (this.x - 1) * 88
          }&limit=88`,
          { "x-vendor-id": "T08YABO" }
        )
        .then((res) => {
          this.isActive = 0;
          console.log(res.data.data);
          this.list = res.data.data;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$color1: #685eef;
$color2: #7970f1;
button {
  height: 30px;
  margin: 0 5px 10px;
  padding: 3px;
  background-color: #687797;
  cursor: pointer;
}
.title {
  background-image: linear-gradient($color2, $color1);
}
.lottery-group .l-active {
  background-image: linear-gradient($color2, $color1);
}
.b-active,
.c-active {
  background-image: linear-gradient($color2, $color1);
}
</style>
