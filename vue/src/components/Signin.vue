<template>
  <div class="signin-wrapper">
    <div class="logo-wrapper">
      <img src="../assets/logo3.png" alt="logo" class="logo" />
    </div>
    <div class="bgg">
      <!-- <h2>登入</h2> -->
      <h2>ล็อกอิน</h2>
      <!-- <input type="text" v-model="user.loginname" placeholder="playid" /> -->
      <input type="text" v-model="user.loginname" placeholder="ยูสเซอร์เนม" />
      <!-- <input type="password" v-model="password" placeholder="password" /> -->
      <input type="password" v-model="password" placeholder="รหัสผ่าน" />
      <div class="captcha-wrapper">
        <input
          type="text"
          maxlength="4"
          v-model="user.captcha"
          placeholder="รหัสยืนยัน"
        />
        <img :src="src" alt="img" class="captcha" @click="base64" />
      </div>
      <!-- <button class="signin" @click="signin">登入</button> -->
      <button class="signin" @click="signin">ล็อกอิน</button>
      <div class="registered-wrapper">
        <router-link to="/register">
          <button class="registered">สมัครสมาชิก</button>
        </router-link>
      </div>
      <p>{{ msg }}</p>
      <a href="https://lin.ee/5vGTwA4">
        <div class="line">
          <img src="../assets/line.png" alt="line" />
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CryptoJS from "crypto-js";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
export default {
  name: "Signin",
  data() {
    return {
      user: {
        loginname: "",
        loginpassword: "",
        captcha: "",
        captchauuid: "",
        fingerprint: "",
        portalid: "EC_MOBILE",
      },
      password: "",
      src: "",
      msg: "",
    };
  },
  mounted() {
    this.fp();
    this.base64();
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
    fp() {
      const fpPromise = FingerprintJS.load();
      (async () => {
        const fp = await fpPromise;
        const result = await fp.get();
        const visitorId = result.visitorId;
        // console.log(visitorId);
        this.user.fingerprint = visitorId;
      })();
    },
    passSha1() {
      this.user.loginpassword = CryptoJS.HmacSHA1(
        this.password,
        this.user.loginname
      ).toString();
    },
    signin() {
      this.passSha1();
      const fd = {
        loginname: this.user.loginname,
        loginpassword: this.user.loginpassword,
        captcha: this.user.captcha,
        captchauuid: this.user.captchauuid,
        fingerprint: this.user.fingerprint,
        portalid: this.user.portalid,
      };
      axios
        .post("https://api.slot566.com/sexyline-ecp/api/v1/login", fd)
        .then((res) => {
          // console.log(res.data.token);
          window.location.assign(
            "https://www.slot566.com/?token=" + res.data.token
          );
        })
        .catch((error) => {
          console.log(error.response.data.code);
          console.log(error.response.data.msg);
          this.msg = error.response.data.msg;
        });
    },
  },
};
</script>

<style scoped lang="scss">
$color1: #43547e;
.signin-wrapper {
  position: relative;
  width: 95%;
  margin: 10px auto;
  border-radius: 5px;
  padding-bottom: 10px;
  background-color: $color1;
  .logo-wrapper {
    border-radius: 5px;
    background-color: #6769fe;
    margin-bottom: 20px;
    .logo {
      width: 100%;
    }
  }
  input {
    width: 75%;
    height: 40px;
    margin-bottom: 20px;
    background-color: #eee;
    color: #000;
    padding-left: 30px;
    font-size: 20px;
    border: none;
    border-radius: 30px;
    box-sizing: border-box;
    opacity: 0.9;
  }
  button {
    border: 1px solid #ddd;
    width: 70%;
    height: 35px;
    margin-bottom: 20px;
    background-color: $color1;
    border-radius: 10px;
    cursor: pointer;
  }
  .registered-wrapper {
    // width: 70%;
    margin: 0 auto;
    .registered {
      // background-color: $color1;
      background-image: linear-gradient(#1ea9d1, #127eb0);
      border: 1px solid #ddd;
    }
  }
}
a {
  text-decoration: none;
  width: 40%;
  height: 35px;
}
.captcha-wrapper {
  position: relative;
  width: 75%;
  margin: 0 auto;
  height: 60px;
  input {
    position: absolute;
    left: 0%;
    padding-left: 30px;
    width: 65%;
    height: 40px;
  }
  .captcha {
    position: absolute;
    right: 0;
    vertical-align: bottom;
    height: 40px;
  }
  button {
    height: 40px;
    right: 35%;
    right: 90.5px;
    width: 15%;
    border: none;
    border: 1px solid #f00;
  }
  .redo {
    position: absolute;
    width: 30px;
    height: 30px;
    right: -35px;
    top: 5px;
  }
}
p {
  padding-bottom: 15px;
}
.line {
  position: absolute;
  bottom: 5px;
  right: 5px;
  img {
    width: 40px;
    height: 40px;
  }
}
.bgg {
  margin: 10px;
  border-radius: 10px;
  background-color: #687797;
  &::before {
    filter: blur(10px);
  }
}
.signin {
  background-image: linear-gradient(#bca770, #8b7342);
}
h2 {
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>
