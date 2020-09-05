<template>
  <div style="position: relative;width: 100%;height: 100%;overflow:initial;">
    <!-- <p class="nobank" @click="$router.push('sign')">注册</p> -->
	<!-- <img class="login-img" src="../assets/login2.png"/> -->
	<img src="../assets/1311.png" style="width: 100%;height: 4rem;" />
	<img src="../assets/1313.png" style="position: absolute;left: 10px;top: 7px;width: 30px;height: 30px;"/>
	<!-- <img src="../assets/911.png" style="width: 100%;height: 6rem;"/> -->
	<!-- <div class="login-img"> -->
		<!-- <img src="../assets/logo1.png" style="position: absolute;left: 0px;top: 0px;width: 120px;height: 100px;"/> -->
	<!-- </div> -->
	<div class="login-body">
		<!-- <div class="headtop" style="margin: 0.7rem 0 .94rem 0.3rem;">
		  <p class="headtext">Hi~</p>
		  <p class="headtext" >欢迎登录CR Wisdom</p>
		</div> -->
		<div class="one">
			<span @click="$router.push('sign')">注册</span>
			<span class="left">
				<span class="img"></span>
				登录</span>
		</div>
		<div class="togleulbox" style="margin: 0 .2rem;">
		  <div class="loginul">
		    <div style="margin-top: 0rem;">
				<!-- <img src="../assets/shouji1.png"/> -->
		      <!-- <p>手机号</p> -->
		      <input
		        type="text"
		        autocomplete="off"
		        name="userName"
		        v-model="logmobile"
		        placeholder="请输入手机号"
		      />
		      <p class="hr"></p>
		    </div>
		    <div style="margin-top: 0.2rem;">
		      <!-- <p>登录密码</p> -->
			  <!-- <img src="../assets/mima1.png"/> -->
		      <input
		        type="password"
		        autocomplete="new-password"
		        name="password"
		        v-model="logpassword"
		        placeholder="请输入密码"
		      />
		      <p class="hr"></p>
		    </div>
		    <div class="pass">
		      <label style="height: 0px;">
		        <input type="checkbox" v-model="ispass" style="margin: 0;height: 10px;">
		        <span class="box"><van-icon :style="{opacity:ispass?1:0}" name="success" color="#306ce8"/></span> <span class="text">记住密码</span>
		      </label>
		      <router-link to="/forgetpass" style="    width: auto;">
		        <p class="passback" style="color: #8a8a8a;font-size: .27rem;margin-top: .2rem;">忘记密码?</p>
		      </router-link>
		    </div>
			<div class="pass" style="margin: 0;position: absolute;">
				<label style="width: 0px;">
				  <input type="checkbox" v-model="ispass2" style="margin: 0;width: 20px;height: 20px;">
				</label>
				<span class="box"><van-icon :style="{opacity:ispass2?1:0}" name="success" color="#306ce8"/></span> <span style="font-size: 12px;color: #000000;margin-top: -3px;margin-left: 3px;">我已阅读并完全同意接受<span style="color:rgb(64,115,231)">《用户协议》</span><span style="color:rgb(64,115,231)">《风险提示书》</span></span>
			</div>
		    <button type="button" class="changebton" @click="login" style="margin: 1.45rem auto .35rem;background: rgb(48,108,232);border-radius: 25px;width: 100%;">登录</button>
			<!-- <button type="button" class="changebton"  @click="$router.push('sign')" style="margin: .35rem auto .65rem;border: 1px solid #009afd;background: #FFFFFF;color:rgb(13,125,254) ;border-radius: 2px;width: 100%;">注册</button> -->
		    <a class="linka" href="https://app.dierna.com/EVfu" style="padding-top: .36rem;"><div></div><p style="color: rgb(48,108,232);font-size: .3rem;">APP下载</p><div></div></a>
		  </div>
		</div>
	</div>
   
  </div>
</template>

<script>
	import Vue from 'vue';
	import { Button } from 'vant';
	
	Vue.use(Button);
export default {
	components:{Button},
  data() {
    return {
      logmobile: "",
      logpassword: "",
      ispass:0,
	  ispass2:''
    };
  },
  created() {
    if (this.$route.query.id) {
      this.invite_code = this.$route.query.id;
      this.istogle = 1;
    }
    if (this.getCookie("logmobile")) {
      this.logmobile = this.getCookie("logmobile");
      this.logpassword = this.getCookie("logpassword");
      this.ispass = true;
    }
	this.ispass2 = this.ispass
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
    login() {
      if (!this.logmobile || !this.logpassword)
        return this.$toast.fail({ message: "请填写完整", duration: 1200 });
      // if (!this.ismobile(this.logmobile))
      //   return this.$toast.fail({
      //     message: "手机号码格式不正确",
      //     duration: 1200
      //   });
	 
	  if(this.ispass2 == 0){
		  return this.$toast.fail({ message: "请阅读协议", duration: 1200 });
	  }
      this.$toast.loading({
        message: "正在登录",
        duration: 0,
        loadingType: "spinner "
      });
      this.$axios
        .post("/index/Publics/login", {
          mobile: this.logmobile,
          password: this.logpassword
        })
        .then(res => {
          if (res.data.code == 0) {
            if (this.ispass) {
              this.setCookie("logmobile", this.logmobile);
              this.setCookie("logpassword", this.logpassword);
            } else {
              this.setCookie("logmobile", "");
              this.setCookie("logpassword", "");
            }
            this.$toast.success({ message: res.data.msg, duration: 1200 });
            setTimeout(() => {
              this.$router.push("/");
            }, 1200);
          } else {
            this.$toast.fail({ message: res.data.msg, duration: 1200 });
          }
        })
        .catch(err => {
          this.$toast.fail({ message: "登录失败", duration: 1200 });
        });
    },

    setCookie(name, value) {
      var exp = new Date();
      exp.setTime(exp.getTime() + 7 * 24 * 60 * 60 * 1000);
      document.cookie =
        name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    }
  },
  watch: {
    ispass(s) {
	  if(s){
		  this.ispass2 = 1
	  }
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../less/login.less");

.login-img{
	// background:url(../assets/logo1.png);
	// background-size:cover;
	    // border-radius: 0px 0px 68px 68px;
		width: 100%;
		text-align: center;
		img{
			height: 3rem;
			width: 3rem;
			margin-top: 0px;
		}
		
}
.headtop {
  text-align: left;
}
.loginul .pass {
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
    top: -0.08rem;
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

.linka{
    margin: auto;
	line-height: .7rem;
	text-align: center;
	border-radius: 53%;
    // width: 2rem;
	height: .7rem;
	display: flex;
	justify-content: center;
	div{
		width: 52px;
		background-color: #3693fe;
		height: 2px;
		margin-top: 15px;
		
	}
	p{
		margin: 0 10px;
	}
}
.login-body{
	width: 90%;
	// height: 74%;
	// border: 1px solid #EEEEEE;
	margin: 0 auto;
	z-index: 1000;
	background-color: #FFFFFF;
	// border-radius: 10px;
	 // box-shadow: 10px 10px 20px 10px #e5e5e7, 4px 20px 10px 10px rgba(255,255,255,0.5) 
	 .one{
		 color: rgb(148,148,148);
		 margin-left: 17px;
		 margin-bottom: 37px;
		 .left{
			 margin-left: 25px;
			 font-weight: 550;
			 color: #000000;
			 // border-bottom: 2px solid rgb(78,108,247);
			 position: relative;
			 .img{
				 position: absolute;
				 left: 9px;
				 top: 24px;
				 width: 20px;
				 height: 4px;
				 border-radius: 6px;
				 background-color:  rgb(78,108,247);
			 }
		 }
	 }
	 input{
		     margin: 0.2rem 0 0.4rem .1rem;
	 }
	input::-webkit-input-placeholder,
	textarea::-webkit-input-placeholder {
	color: rgb(148,148,148);
	}
}
.loginul .pass .van-icon {
	    position: absolute;
	    left: 0;
	    top: -1px;
	
}
</style>
