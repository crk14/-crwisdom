<template>
  <div class="sign">
    <div class="tophader"  style="margin-top: .3rem;">
		<div onclick="window.history.go(-1)" style="color: #666666;position: absolute;top: 50%;margin-top: -0.3rem;left: 0.28rem;background: rgb(78,108,247);width: .6rem;height: .6rem;border-radius: 50%;">
			<img src="../assets/zuo.png" style="width: .4rem;height: .4rem;position: absolute;top: 50%;margin-top: -0.2rem;left: 0.1rem;"/>
		</div>
			<!-- <van-icon name="arrow-left" /> -->
		<div style="margin-left: 1.16rem;font-size: .4rem;font-weight: 550;">{{$t('user.register')}}CR Wisdom</div>
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
          <input type="text" v-model="nick_name" :placeholder="$t('user.yourname')" />
          <p class="hr"></p>
        </div>
        <div>
          <!-- <p>手机号</p> -->
          <input type="text" v-model="mobile" :placeholder="$t('user.loginUsername')" />
          <p class="hr"></p>
        </div>
        <div>
          <!-- <p>登录密码</p> -->
          <input type="password" v-model="password" :placeholder="$t('user.yourpassword')" />
          <p class="hr"></p>
        </div>
        <div>
          <!-- <p>重复密码</p> -->
          <input type="password" v-model="passwordc" :placeholder="$t('user.yourpasswordtwo')" />
          <p class="hr"></p>
        </div>
        <div>
          <!-- <p>交易密码</p> -->
          <input type="password" v-model="trad_password" :placeholder="$t('user.transactionpassword')" />
          <p class="hr"></p>
        </div>
        <div>
          <!-- <p>交易密码</p> -->
          <input type="password" v-model="trad_passwordc" :placeholder="$t('user.transactionpasswordtwo')" />
          <p class="hr"></p>
        </div>
       <div>
          <input type="text" v-model="invite_code" :placeholder="$t('user.Invitationcode')"/>
          <p class="hr"></p>
        </div>
       <div>
          <input type="text" v-model="code" :placeholder="$t('user.verification')" />
          <button class="sendcode" @click="setcode" style="background: #FFFFFF">{{$t('user.getcode')}}</button>
          <p class="hr"></p>
        </div>
		<div class="pass" style="position: absolute;">
			<label style="width: 0px;">
			  <input type="checkbox" v-model="ispass" style="margin: 0;width: 20px;height: 20px;">
			</label>
			<span class="box">
				<van-icon :style="{opacity:ispass?1:0}" name="success" color="#306ce8" /></span> <span style="font-size: 12px;color: #000000;margin-top: -3px;margin-left: 3px;">{{$t('user.readAgree')}}<span
				 @click="bool = true" style="color:rgb(64,115,231)">《{{$t('user.userAgreement')}}》</span><span @click="bool2 = true" style="color:rgb(64,115,231)">《{{$t('user.riskwarning')}}》</span></span>
		</div>
        <button type="button" class="changebton" @click="send" style="background:rgb(48,108,232);border-radius: 25px;">{{$t('user.register')}}</button>
      </div>
    </div>
	<usera :bool="bool" @func="fn4"></usera>
	<warning :bool="bool2" @func="fn5"></warning>
  </div>
</template>

<script>
	import usera from '../modu/usera.vue'
	import warning from '../modu/warning.vue'
export default {
	components: {
		usera,
		warning
	},
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
	  ispass:0,
	  type:'',
	  bool:false,
	  bool2:false,
	  // value1:0
    };
  },
  created() {
	  // let value = localStorage.getItem('languageSet')
	  // if(value){
	  // 	if(value== 'en'){
	  // 		this.value1 = 1
	  // 	}else if(value== 'hy'){
	  // 		this.value1 =2
	  // 		}
	  // }
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
	  fn4(data){
	  	this.bool = false
	  },
	  fn5(data){
	  	this.bool2 = false
	  },
    // 获取验证码
    setcode(e) {
      var ts = this;
      // if (!this.ismobile(this.mobile))
      //   return this.$toast.fail({
      //     message: "手机号码格式不正确",
      //     duration: 1200
      //   });
      let email = this.mobile;
		let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
		if(reg.test(email)){
			// alert("邮箱格式正确");
			ts.type = 2
		}else{
			ts.type = 1
		}
      if (ts.isclick) {
        ts.isclick = false;

        this.$axios
          .post('/index/Publics/send', {
            mobile: this.mobile,
			type:ts.type
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
        this.$toast.fail({ message: this.$t('user.Pleasecomplete'), duration: 1200 });
        return;
      }
      // if (!this.ismobile(this.mobile))
      //   return this.$toast.fail({
      //     message: "手机号码格式不正确",
      //     duration: 1200
      //   });
      if (this.password != this.passwordc)
        return this.$toast.fail({ message: this.$t('user.donmatch'), duration: 1200 });

      if (this.trad_password != this.trad_passwordc)
        return this.$toast.fail({
          message: this.$t('user.transactionmatch'),
          duration: 1200
        });
		if(this.ispass == 0){
			this.$toast.fail({
			  message: this.$t('user.readAgreement'),
			  duration: 1200
			});
			return
		}
		let email = this.mobile;
				let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
				if(reg.test(email)){
					// alert("邮箱格式正确");
					this.type = 2
				}else{
					this.type = 1
				}
      this.$axios
        .post("/index/Publics/doRegister", {
          mobile: this.mobile,
          password: this.password,
          trad_password: this.trad_password,
          code: this.code,
          invite_code: this.invite_code,
          nick_name: this.nick_name,
		  type:this.type,
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
.poup {
		h2 {
			text-align: center;
			margin: 10px 0;
			color: rgb(0, 27, 49);
			font-size: 18px;
			font-weight: 550;
		}

		h4 {
			margin: 0px 0 5px 0;
			color: rgb(0, 27, 49);
			text-align: center;
			font-size: 16px;
		}

		.p {
			padding: 0 .28rem;
			text-indent: 24px;
			color: rgb(138, 144, 151);
			font-size: 14px;
		}

		.p1 {
			text-indent: 0px;
		}

		h3 {
			margin: 4px 0;
			padding: 0 .28rem;
			font-weight: 550;
			font-size: 16px;
			color: rgb(0, 27, 49);
		}

		h5 {
			color: rgb(138, 144, 151);
			padding: 0 .28rem;
			font-size: 16px;
			margin: 0px 0 2px 0;
		}
		
	}
</style>
