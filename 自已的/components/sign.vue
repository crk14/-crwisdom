<template>
  <div class="sign">
    <div class="tophader"  style="margin-top: .3rem;">
		<div onclick="window.history.go(-1)" style="color: #666666;position: absolute;top: 50%;margin-top: -0.3rem;left: 0.28rem;background: rgb(78,108,247);width: .6rem;height: .6rem;border-radius: 50%;">
			<img src="../assets/zuo.png" style="width: .4rem;height: .4rem;position: absolute;top: 50%;margin-top: -0.2rem;left: 0.1rem;"/>
		</div>
			<!-- <van-icon name="arrow-left" /> -->
		<div style="margin-left: 1.16rem;font-size: .4rem;font-weight: 550;">注册CR Wisdom</div>
      <!-- <p>找回密码</p> -->
    </div>
   <!-- <div class="headtop">
      <p class="headtext">你好，</p>
      <p class="headtext">欢迎注册CR Wisdom</p>
    </div> -->
    <div class="togleulbox">
      <div class="loginul">
        <div >
          <!-- <p>昵称</p> -->
          <input type="text" v-model="nick_name" placeholder="请输入您的用户名" />
          <p class="hr"></p>
        </div>
        <div>
          <!-- <p>手机号</p> -->
          <input type="number" v-model="mobile" placeholder="请输入您的手机号" />
          <p class="hr"></p>
        </div>
        <div>
          <!-- <p>登录密码</p> -->
          <input type="password" v-model="password" placeholder="请输入您的登录密码" />
          <p class="hr"></p>
        </div>
        <div>
          <!-- <p>重复密码</p> -->
          <input type="password" v-model="passwordc" placeholder="请再次输入您的登录密码" />
          <p class="hr"></p>
        </div>
        <div>
          <!-- <p>交易密码</p> -->
          <input type="password" v-model="trad_password" placeholder="请输入您的交易密码" />
          <p class="hr"></p>
        </div>
        <div>
          <!-- <p>交易密码</p> -->
          <input type="password" v-model="trad_passwordc" placeholder="请再次输入您的交易密码" />
          <p class="hr"></p>
        </div>
        <div>
          <!-- <p>邀请码</p> -->
          <input type="text" v-model="invite_code" placeholder="请输入您的邀请码" />
          <!-- <span class="opotional">（选填）</span> -->
          <p class="hr"></p>
        </div>
        <div>
          <!-- <p>验证码</p> -->
          <input type="text" v-model="code" placeholder="请输入验证码" />
          <button class="sendcode" @click="setcode" style="background: #FFFFFF">获取验证码</button>
          <p class="hr"></p>
        </div>
		<div class="pass" style="position: absolute;">
			<label style="width: 0px;">
			  <input type="checkbox" v-model="ispass" style="margin: 0;width: 20px;height: 20px;">
			</label>
			<span class="box"><van-icon :style="{opacity:ispass?1:0}" name="success" color="#306ce8"/></span> <span style="font-size: 12px;color: #000000;margin-top: -3px;margin-left: 3px;">我已阅读并完全同意接受<span style="color:rgb(64,115,231)">《用户协议》</span><span style="color:rgb(64,115,231)">《风险提示书》</span></span>
		</div>
        <button type="button" class="changebton" @click="send" style="background:rgb(48,108,232);border-radius: 25px;">注册</button>
        <!-- <p class="nobank" @click="$router.push('login')">已有账号</p> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isclick: true,
      mobile: "",
      password: "",
      trad_password: "",
      trad_passwordc: "",
      code: "",
      invite_code: "",
      nick_name: "",
      passwordc: "",
	  ispass:0
    };
  },
  created() {
    if (this.$route.query.id) {
      this.invite_code = this.$route.query.id;
      this.istogle = 1;
    }
    // if (this.getCookie("logmobile")) {
    //   this.logmobile = this.getCookie("logmobile");
    //   this.logpassword = this.getCookie("logpassword");
    //   this.ispass = true;
    // }
  },
  methods: {
    // 获取验证码
    setcode(e) {
      var ts = this;
      // if (!this.ismobile(this.mobile))
      //   return this.$toast.fail({
      //     message: "手机号码格式不正确",
      //     duration: 1200
      //   });
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
    ismobile(s) {
      var regPhone = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
      var patternPhone = new RegExp(regPhone);
      if (patternPhone.test(s)) {
        return true;
      } else {
        return false;
      }
    },
    send() {
		
      if (
        !this.mobile ||
        !this.password ||
        !this.trad_password ||
        !this.trad_passwordc ||
        !this.code ||
        !this.nick_name ||
        !this.passwordc ||
        !this.invite_code
      ) {
        this.$toast.fail({ message: "请填写完整", duration: 1200 });
        return;
      }
      // if (!this.ismobile(this.mobile))
      //   return this.$toast.fail({
      //     message: "手机号码格式不正确",
      //     duration: 1200
      //   });
      if (this.password != this.passwordc)
        return this.$toast.fail({ message: "两次密码不一致", duration: 1200 });

      if (this.trad_password != this.trad_passwordc)
        return this.$toast.fail({
          message: "两次交易密码不一致",
          duration: 1200
        });
		if(this.ispass == 0){
			this.$toast.fail({
			  message: "请阅读用户协议",
			  duration: 1200
			});
			return
		}
      this.$axios
        .post("/index/Publics/doRegister", {
          mobile: this.mobile,
          password: this.password,
          trad_password: this.trad_password,
          code: this.code,
          invite_code: this.invite_code,
          nick_name: this.nick_name
        })
        .then(res => {
          if (res.data.code == 0) {
            this.$toast.success({ message: res.data.msg, duration: 1200 });
            setTimeout(() => {
               this.$router.push("/login");
            }, 1200);
          } else {
            this.$toast.fail({ message: res.data.msg, duration: 1200 });
          }
        });
    }
    // setCookie(name, value) {
    //   var exp = new Date();
    //   exp.setTime(exp.getTime() + 7 * 24 * 60 * 60 * 1000);
    //   document.cookie =
    //     name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    // },
    // getCookie(name) {
    //   var arr,
    //     reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    //   if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
    //   else return null;
    // }
  },
  watch: {
    // ispass(s) {
    //   console.log(s);
    // }
  }
};
</script>

<style lang="less" scoped>
@import url("../less/login.less");
.headtop {
  text-align: left;
}
.loginul .pass {
  display: flex;
  justify-content: space-between;
  margin-top: 0.3rem;
  a {
    position: relative;
    top: -0.2rem;
  }
  label {
    width: 40%;
    position: relative;
    color: #3c8cff;
  }
  .text {
    position: relative;
    font-size: 0.26rem;
    top: -0.1rem;
    left: 0.1rem;
  }
  .box {
    border: 1px solid #3c8cff;
    font-size: 0.3rem;
    height: 0.26rem;
    text-align: center;
    line-height: 0.3rem;
    width: 0.26rem;
    display: inline-block;
    border-radius: 50%;
    position: relative;
    top: -0.06rem;
  }
  input {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0;
  }
}
.headtop {
  margin: 0.3rem 0 0.6rem 0.3rem;
}
.pass {
  display: flex;
  justify-content: space-between;
  margin-top: 0.3rem;
  a {
    position: relative;
    top: -0.29rem;
  }
  label {
    width: 40%;
    position: relative;
    color: rgb(48,108,232);
  }
  .text {
    position: relative;
    font-size: 0.29rem;
    top: -0.1rem;
    left: 0.1rem;
  }
  .box {
    border: 2px solid rgb(48,108,232);
    font-size: 0.3rem;
    height: 10px;
    text-align: center;
    line-height: 10px;
    width: 10px;
    display: inline-block;
    border-radius: 50%;
    position: relative;
    top: -2px;
  }
  input {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0;
  }
}
</style>
