<template>
  <div class="all">
    <div class="form-wrapper">
      <!-- <h2>สมัครสมาชิก</h2> -->
      <div class="register">
        <img src="@/assets/res.png" alt="สมัครสมาชิก" />
      </div>
      <form @submit.prevent="checkAll">
        <div class="form-group">
          <!-- <p>affiliateid(推薦人)</p> -->
          <div class="input-wrapper">
            <input
              type="mobile"
              class="form-control form-control-lg"
              placeholder="รหัสผู้แนะนำ"
              v-model="user.affiliateid"
            />
            <p class="inputexplanation">
              หากมีรหัสรหัสผู้แนะนำไม่จำเป็นต้องใส่
            </p>
          </div>
        </div>

        <div class="form-group">
          <div class="input-wrapper">
            <!-- <p>playId</p> -->
            <input
              type="text"
              class="form-control form-control-lg"
              placeholder="ยูสเซอร์เนม"
              maxlength="9"
              v-model.trim="user.playid"
              @keyup="checkName"
            />
            <p class="inputexplanation">Please enter player Id</p>
            <p :class="{ red: red.color1 }">{{ error.name }}</p>
          </div>
        </div>

        <div class="form-group">
          <div class="input-wrapper">
            <input
              type="password"
              class="form-control form-control-lg"
              placeholder="รหัสผ่านสมาชิก"
              v-model="password"
              @keyup="checkPassword"
            />
            <p class="inputexplanation">
              รหัสผ่านจำเป็นต้องมีจำเป็นต้องมีตัวอักษรและตัวเลข 8~20
              ตัวและต้องมีตัวอักษรตัวใหญ่อย่างน้อย 1 ตัว
            </p>
            <p :class="{ red: red.color2 }">{{ error.password }}</p>
          </div>
        </div>

        <div class="form-group">
          <div class="input-wrapper">
            <input
              type="password"
              class="form-control form-control-lg"
              placeholder="ยืนยันรหัสผ่าน"
              v-model="repassword"
              @keyup="checkRepassword"
            />
            <p class="inputexplanation">โปรดใส่รหัสผ่านอีกครั้ง</p>
            <p :class="{ red: red.color2re }">{{ error.repassword }}</p>
          </div>
        </div>

        <div class="form-group">
          <div class="input-wrapper">
            <input
              type="text"
              class="form-control form-control-lg"
              placeholder="ชื่อจริง-นามสกุล"
              v-model="user.firstname"
            />
            <p class="inputexplanation">
              ชื่อของคุณจะต้องตรงกับชื่อของบัญชีธนาคารคุณ
              ไม่ฉะนั้นจะไม่สามารถทำการถอนเงินได้
            </p>
          </div>
        </div>

        <div class="form-group">
          <div class="input-wrapper">
            <!-- placeholder="Contact Number" -->
            <input
              type="tel"
              maxlength="9"
              placeholder="หมายเลขโทรศัพท์มือถือ"
              class="form-control form-control-lg"
              v-model.trim="user.mobile"
              @keyup="checkPhone"
            />
            <p :class="{ red: red.color3 }">{{ error.mobile }}</p>
          </div>
        </div>

        <div class="form-group w63">
          <div class="input-wrapper re">
            <div @click="sendAPI" class="api">ส่ง sms</div>
            <!-- placeholder="手機驗證碼" -->
            <input
              type="text"
              class="form-input"
              maxlength="6"
              placeholder="รหัสยืนยัน SMS"
              v-model="pin"
            />
            <p :class="{ red: red.color4 }">{{ error.vc }}</p>
          </div>
        </div>

        <div class="form-group ra w63">
          <div class="input-wrapper re">
            <input
              type="text"
              maxlength="4"
              v-model="user.captcha"
              class="ab"
            />
            <img :src="src" alt="img" class="img" @click="base64" />
            <!-- <div @click="base64" class="btn">重新傳送captcha</div> -->
          </div>
        </div>
        <p>{{ error.register }}</p>

        <button type="submit" class="registerword">สมัครสมาชิก</button>
        <!-- <button type="submit" class="register">
        </button> -->
        <!-- <div class="register" @click="checkAll">
          <img src="@/assets/res.png" alt="สมัครสมาชิก" />
        </div> -->

        <div class="bottom"><img src="@/assets/lottery1.png" alt="img" /></div>
      </form>
    </div>
    <Previouspage />
  </div>
</template>

<script>
import axios from "axios";
import CryptoJS from "crypto-js";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

import Previouspage from "@/components/Previouspage.vue";
export default {
  name: "Register",
  data() {
    return {
      user: {
        // 推薦人id
        // affiliateid: "aetest7",
        affiliateid: "",
        // playid: "aeae789",
        playid: "",
        // firstname: "wu",
        firstname: "",
        password: "",
        // mobile: "888456339",
        mobile: "",
        captcha: "",
        pin: "",
        // 以下為自動生成
        ulagentaccount: "hunz01",
        currency: "THB",
        captchauuid: "",
        regfingerprint: "",
        portalid: "EC_MOBILE",
        language: "5",
      },
      pin: "",
      password: "",
      repassword: "",
      // password: "asdasdasd2",
      // repassword: "asdasdasd2",
      src: "",
      um: "",
      jum: "",
      error: {
        name: "",
        password: "",
        repassword: "",
        mobile: "",
        register: "",
      },
      red: {
        color1: false,
        color2: false,
        color2re: false,
        color3: false,
        color4: false,
        colorR: false,

        // color1: true,
        // color2: true,
        // color2re: true,
        // color3: true,
        // color4: true,
      },
    };
  },
  components: {
    Previouspage,
  },
  mounted() {
    this.passSha1();
    this.base64();
    this.fp();
    this.checkPhone();
  },
  methods: {
    base64() {
      axios
        .get("https://api.slot566.com/sexyline-ecp/api/v1/captchas/random")
        .then((res) => {
          // console.log(res.data);
          this.user.captchauuid = res.data.uuid;
          this.src = res.data.image;
        });
    },
    passSha1() {
      this.user.password = CryptoJS.HmacSHA1(
        this.password,
        this.user.playid
      ).toString();
    },
    fp() {
      const fpPromise = FingerprintJS.load();
      (async () => {
        const fp = await fpPromise;
        const result = await fp.get();
        const visitorId = result.visitorId;
        // console.log(visitorId);
        this.user.regfingerprint = visitorId;
      })();
    },
    checkName() {
      // const regexNameCheck = /^[a-zA-Z0-9]{5,9}$/;
      const regexNameCheck = /^(?=.*\d)(?=.*[A-Za-z])[A-Za-z0-9]{5,9}$/;
      if (!regexNameCheck.test(this.user.playid)) {
        this.error.name = "Please must be 5~9 alphanumeric";
        this.red.color1 = true;
      } else {
        // this.error.name = "true";
        this.error.name = "";
        this.red.color1 = false;
      }
    },
    checkPassword() {
      const regexPasswordCheck = /^(?=.*\d)(?=.*[A-Za-z])[A-Za-z0-9]{8,20}$/;
      if (!regexPasswordCheck.test(this.password)) {
        this.error.password =
          "รหัสผ่านจำเป็นต้องมีตัวอักษรและตัวเลข 8~20 ตัวและต้องมีตัวอักษรตัวใหญ่อย่างน้อย 1 ตัว";
        this.red.color2 = true;
      } else {
        // this.error.password = "true";
        this.error.password = "";
        this.red.color2 = false;
      }
    },
    checkRepassword() {
      if (this.password !== this.repassword || this.repassword === "") {
        // 錯誤
        this.error.repassword = "รหัสผ่านจำเป็นต้องเหมือนกัน";
        this.red.color2re = true;
      } else {
        // this.error.repassword = "รหัสผ่านถูกต้อง";
        this.error.repassword = "";
        this.red.color2re = false;
      }
    },
    checkPhone() {
      // console.log(typeof this.user.playid);
      const regexPhone = /\d{9}/;
      if (regexPhone.test(this.user.mobile)) {
        // console.log(this.user.mobile);
        this.um = "66 " + this.user.mobile;
        this.jum = JSON.stringify({ mobile: this.um });
        axios
          .post(
            "https://api.slot566.com/sexyline-ecp/api/v1/sms/mobileStatus/register",
            this.jum,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            // console.log(err.response.data.code);
            if (err.response.data.code === 1) {
              // 1
              // เบอร์นี้กำลังลงทะเบียนอยู่
              // mobile verifying by another player
              this.error.mobile = "เบอร์นี้กำลังลงทะเบียนอยู่";
              // phoneNumberCanNotUse();
              this.red.color3 = true;
            } else if (err.response.data.code === 2) {
              // 2
              // เบอร์นี้ได้ลงทะเบียนแล้ว
              // mobile has been verified by another player
              this.error.mobile = "เบอร์นี้ได้ลงทะเบียนแล้ว";
              // phoneNumberCanNotUse();
              this.red.color3 = true;
            } else if (err.response.data.code === 0) {
              this.error.mobile = "frontend issue";
              // phoneNumberCanNotUse();
              this.red.color3 = true;
            } else if (err.response.data.code === 3) {
              this.error.mobile = "Invalid phone number format";
              // phoneNumberCanNotUse();
              this.red.color3 = true;
            } else {
              // tip[3].innerText = 'this phone number can be use'
              // this.error.mobile = "เบอร์โทรศัพท์นี้สามารถใช้งานได้";
              this.error.mobile = "";
              this.red.color3 = false;
              // phoneNumberCanBeUse();
            }
          });
      }
    },
    sendAPI() {
      // console.log("sendAPI");
      // clearInterval(interval);
      // let intervalX = 180;
      // let interval = window.setInterval("time180()", 1000);
      axios
        .post(
          "https://api.slot566.com/sexyline-ecp/api/v1/sms/sendVerificationCode/register",
          this.jum,
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          if (err.response.data.code === 1) {
            this.error.vc = "เบอร์นี้กำลังลงทะเบียนอยู่";
            this.red.color4 = true;
          } else if (err.response.data.code === 2) {
            this.error.vc = "เบอร์ " + this.user.mobile + " ได้ยืนยันตัวแล้ว";
            this.red.color4 = true;
          } else if (err.response.data.code === 4) {
            this.error.vc = "PlayerOtpNotExpiredException";
            this.red.color4 = true;
          } else if (err.response.data.code === 5) {
            this.error.vc = "ไม่สามารถส่งข้อความได้";
            this.red.color4 = true;
          } else if (err.response.data.code === 6) {
            this.error.vc = "ไม่ได้อยู่ในพื้นที่บริการ";
            this.red.color4 = true;
          } else if (err.response.data.code === 7) {
            this.error.vc = "เบอร์โทรศัพท์นี้ได้ลงทะเบียนแล้ว";
            this.red.color4 = true;
          } else if (err.response.data.code === 0) {
            this.error.vc = "frontend issue";
            this.red.color4 = true;
          } else {
            // this.error.vc = "ส่งข้อความยืนยันเรียบร้อยแล้ว";
            this.error.vc = "";
            this.red.color4 = false;
          }
        });
    },
    checkPin() {
      this.user.pin = CryptoJS.HmacSHA1(this.pin, this.user.playid).toString();
    },
    checkAll() {
      this.checkName();
      this.checkPassword();
      this.checkRepassword();
      this.checkPin();
      if (
        this.red.color1 ||
        this.red.color2 ||
        this.red.color2re ||
        this.red.color3 ||
        this.red.color4
      ) {
        console.log("123");
        return false;
      } else {
        console.log("456");
        const fd = new FormData();
        if (this.user.firstname === "") {
          return false;
        }
        console.log("3333");
        fd.append("playerid", this.user.playid);
        if (this.user.affiliateid !== "") {
          fd.append("affiliateid", this.user.affiliateid);
        }
        fd.append("firstname", this.user.firstname);
        fd.append("password", this.user.password);
        fd.append("mobile", "66 " + this.user.mobile);
        fd.append("captcha", this.user.captcha);
        fd.append("pin", this.user.pin);
        fd.append("ulagentaccount", this.user.ulagentaccount);
        fd.append("currency", this.user.currency);
        fd.append("captchauuid", this.user.captchauuid);
        fd.append("regfingerprint", this.user.regfingerprint);
        fd.append("portalid", this.user.portalid);
        fd.append("language", this.user.language);
        axios
          .post("https://api.slot566.com/sexyline-ecp/api/v1/register", fd)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            if (err.response.data.code === 1) {
              this.error.register = "Captcha is invalid";
              this.red.colorR = true;
            } else if (err.response.data.code === 2) {
              this.error.register =
                "The specified playerid has been registered";
              this.red.colorR = true;
            } else if (err.response.data.code === 3) {
              this.error.register = "The specified email has been registered";
              this.red.colorR = true;
            } else if (err.response.data.code === 4) {
              this.error.register = "The specified mobile has been registered";
              this.red.colorR = true;
            } else if (err.response.data.code === 5) {
              this.error.register =
                "the specified affiliate id is not associated with any registered player";
              this.red.colorR = true;
            } else if (err.response.data.code === 6) {
              this.error.register = "Otp sent failed";
              this.red.colorR = true;
            } else if (err.response.data.code === 7) {
              this.error.register =
                "The specified last name and first name have been registered";
              this.red.colorR = true;
            } else if (err.response.data.code === 8) {
              this.error.register =
                "The pictures of identification or bank card are not correct";
              this.red.colorR = true;
            } else if (err.response.data.code === 9) {
              this.error.register = "The specified regip has been registered";
              this.red.colorR = true;
            } else if (err.response.data.code === 10) {
              this.error.register = "the affiliate status is not active";
              this.red.colorR = true;
            } else if (err.response.data.code === 11) {
              this.error.register =
                "the affiliate currency is not equal with player currency";
              this.red.colorR = true;
            } else if (err.response.data.code === 12) {
              this.error.register = "The mobile need to verify";
              this.red.colorR = true;
            } else if (err.response.data.code === 13) {
              this.error.register = "InvalidVerificationCodeException";
              this.red.colorR = true;
            } else if (err.response.data.code === 14) {
              this.error.register = "mobile MOBILE_NUM has been verified";
              this.red.colorR = true;
            } else if (err.response.data.code === 15) {
              this.error.register = "ProcessingSmsReqNotFoundException";
              this.red.colorR = true;
            }
          });

        return false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
$refcolor1: #687797;
* {
  color: black;
}

.red {
  color: red;
}

.form-group {
  width: 90%;
  margin: 0 auto;

  .input-wrapper {
    padding-top: 15px;
    margin-bottom: 5px;

    input {
      width: 70%;
      height: 40px;
      border-radius: 10px;
      box-sizing: border-box;
      text-align: center;
      margin: 0 auto;
      border: none;
      font-size: 22px;
      opacity: 0.8;
    }
  }

  button {
    box-sizing: border-box;
    height: 40px;
    width: 100px;
  }
}
.ra {
  .re {
    position: relative;
    height: 40px;
  }
  // .ab {
  // position: absolute;
  // top: 25px;
  // left: 15%;
  // }
  .img {
    position: absolute;
    top: 15px;
    right: 0;
    height: 40px;
  }
  // .btn {
  //   margin: 60px auto;
  //   height: 40px;
  //   line-height: 40px;
  //   width: 140px;
  //   border: none;
  //   border-radius: 10px;
  //   background-color: #f33;
  //   cursor: pointer;
  // }
}
.api {
  margin: 0 auto;
  height: 40px;
  position: absolute;
  right: 0;
  line-height: 40px;
  width: 70px;
  border: none;
  border-radius: 10px;
  background-image: linear-gradient(#1ea9d1, #127eb0);
  cursor: pointer;
  z-index: 2;
  color: #fff;
}
.register {
  margin: 0 auto;
  width: 63%;
  height: 80px;
  color: transparent;
  background-color: #687797;
  border: none;
  margin-bottom: 20px;

  img {
    width: 100%;
  }
}
.registerword {
  margin: 15px auto 30px;
  width: 63%;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-image: linear-gradient(#1ea9d1, #127eb0);
  cursor: pointer;
  font-size: 20px;
  color: #fff;
}
.form-wrapper {
  padding-bottom: 30px;
  border-radius: 5px;
  background-color: $refcolor1;
}
.re {
  position: relative;
}
.form-group .input-wrapper .form-input {
  text-align: left;
  padding-left: 30px;
}
.bottom img {
  width: 100%;
}
h2 {
  padding: 10px 0 0;
  color: #fff;
  font-size: 30px;
}
.w63 {
  width: 63%;
  .input-wrapper {
    input {
      width: 100%;
    }
  }
}
.inputexplanation {
  text-align: left;
  width: 70%;
  margin: 10px auto;
  font-size: 12px;
  color: #fff;
}
</style>
