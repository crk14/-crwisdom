<template>
  <div class="forgetpass">
    <div class="tophader" onclick="window.history.go(-1)">
      <van-icon name="arrow-left" />
      <p class="toptext">登录</p>
    </div>
    <!-- <p class="hr"></p> -->
    <div class="headtop">
      <p class="headtext">重置密码</p>
      <!-- <p class="headtext"> 欢迎来到TVE </p> -->
    </div>
    <div class="loginul">
      <div>
        <!-- <p>手机号码</p> -->
        <input type="text" v-model="mobile" placeholder="请输入您的手机号" />
        <!-- <button class="sendcode" @click="setcode">获取</button> -->
        <p class="hr"></p>
      </div>
      <div>
        <!-- <p>新密码</p> -->
        <input type="password" v-model="password" placeholder="请输入您的登录密码" />
        <p class="hr"></p>
      </div>
      <div>
        <!-- <p>重复密码</p> -->
        <input type="password" v-model="re_password" placeholder="请再次输入您的登录密码" />
        <p class="hr"></p>
      </div>
      <!-- <div>
        <p>手机号码</p>
        <input type="text" v-model="mobile" placeholder="请输入您的手机号" />
        <button class="sendcode" @click="setcode">获取</button>
        <p class="hr"></p>
      </div>-->
      <div>
        <!-- <p>验证码</p> -->
        <input type="text" v-model="code" placeholder="输入验证码" />
        <button class="sendcode" @click="setcode" style="">获取验证码</button>
        <p class="hr"></p>
      </div>
      <button type="button" class="changebton" @click="send" style="background: linear-gradient(0deg, #2167ff, #2167ff;">确定</button>
    </div>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  data() {
    return {
      isclick: true,
      password: "",
      re_password: "",
      mobile: "",
      code: ""
    };
  },
  methods: {
    ismobile(s) {
      var regPhone = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
      var patternPhone = new RegExp(regPhone);
      if (patternPhone.test(s)) {
        return true;
      } else {
        return false;
      }
    },
    // 获取验证码
    setcode(e) {
      var ts = this;
      if (!this.ismobile(this.mobile))
        return this.$toast.fail({
          message: "手机号码格式不正确",
          duration: 1200
        });
      if (ts.isclick) {
        ts.isclick = false;

        this.$axios
          .post("/index/Publics/send", {
            mobile: this.mobile
          })
          .then(res => {
            if (res.data.code == 0) {
              this.$toast.success({ message: res.data.msg, duration: 1200 });
              var tiem = 60;
              e.target.innerText = tiem + "s";
              var timeover = setInterval(function() {
                tiem -= 1;
                e.target.innerText = tiem + "s";
                if (tiem <= 0) {
                  e.target.innerText = "获取";
                  clearInterval(timeover);
                  ts.isclick = true;
                }
              }, 1000);
            } else {
              this.$toast.fail({ message: res.data.msg, duration: 1200 });
            }
          });
      }
    },

    send() {
      if (!this.password || !this.re_password || !this.mobile || !this.code)
        return this.$toast.fail({ message: "请填写完整", duration: 1200 });
      if (!this.ismobile(this.mobile))
        return this.$toast.fail({
          message: "手机号码格式不正确",
          duration: 1200
        });
      if (this.password!=this.re_password)
        return this.$toast.fail({ message: "两次密码不一致", duration: 1200 });
      this.$axios
        .post("/index/Publics/forget", {
          password: this.password,
          re_password: this.re_password,
          mobile: this.mobile,
          code: this.code
        })
        .then(res => {
          if (res.data.code == 0) {
            this.$toast.success({ message: res.data.msg, duration: 1200 });
            setTimeout(() => {
              this.$router.push("login");
            }, 1200);
          } else {
            this.$toast.fail({ message: res.data.msg, duration: 1200 });
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../less/login.less");
.loginul {
  margin: 0 0.3rem;
}
.findpass {
  .changebton {
    margin: 1.1rem auto;
  }
}
.headtop {
  margin: 0.3rem 0 0.6rem 0.3rem;
}
.toptext {
  text-align: right;
  width: 96.5%;
  padding: 0;
  font-weight: normal;
  color: #1A52AE;
  font-size: 0.3rem;
}
</style>
