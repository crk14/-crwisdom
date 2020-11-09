<template>
  <div class="changedealpass">
    <div class="tophader" onclick="window.history.go(-1)">
      <van-icon name="arrow-left" />
      <p>修改交易密码</p>
    </div>
    <p class="hr"></p>
    <ul>
      <li>
				<p>旧密码</p>
				<input type="password" v-model="oldpass" placeholder="请输入旧的交易密码" />
				<p class="hr"></p>
      </li>
      <li>
        <p>新交易密码</p>
        <input type="password" v-model="newpass" placeholder="请输入新的交易密码" />
        <p class="hr"></p>
      </li>
      <li>
        <p>确认密码</p>
        <input type="password" v-model="re_newpass" placeholder="请再次输入新的交易密码" />
        <p class="hr"></p>
      </li>
      <li>
        <p>验证码</p>
        <input type="text" v-model="code" placeholder="请输入您收到的短信验证码" />
        <span class="getcode" @click="setcode">获取验证码</span>
        <p class="hr"></p>
      </li>
    </ul>
	<div class="resgg" @click="$router.push('respass')">忘记密码</div>
    <button type="button" class="changebton" @click="send" style="margin: .5rem auto;">确定修改</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isclick: true,
      oldpass: "",
      newpass: "",
      re_newpass: "",
      code: "",
    };
  },
  methods: {
    // 获取验证码
    setcode(e) {
      var ts = this;
      if (ts.isclick) {
        ts.isclick = false;

        this.$axios.post("/index/member/sendChange").then(res => {
          if (res.data.code == 0) {
            this.$toast.success({ message: res.data.msg, duration: 1200 });
            var tiem = 60;
            e.target.innerText = tiem + "s";
            var timeover = setInterval(function() {
              tiem -= 1;
              e.target.innerText = tiem + "s";
              if (tiem <= 0) {
                e.target.innerText = "获取验证码";
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
      if (!this.newpass || !this.re_newpass || !this.code|| !this.oldpass) {
        this.$toast.fail({ message: "请填写完整", duration: 1200 });
        return;
      }
      if (this.newpass != this.re_newpass)
        return this.$toast.fail({ message: "两次密码不一致", duration: 1200 });
      this.$axios
        .post("/index/member/ChangeTradPassword", {
          oldpass:this.oldpass,
          newpass: this.newpass,
          re_newpass: this.re_newpass,
          code: this.code
        })
        .then(res => {
          if (res.data.code == 0) {
            this.$toast.success({ message: res.data.msg, duration: 1200 });
            setTimeout(() => {
              this.$router.back();
            }, 1600);
          } else {
            this.$toast.fail({ message: res.data.msg, duration: 1200 });
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
ul {
  padding-left: 0.3rem;
  li {
    font-size: 0.3rem;
    text-align: left;
    position: relative;
    p {
      margin: 0.5rem 0 0.3rem;
      font-size: 0.3rem;
      color: #333333;
    }
    input {
      background: none;
      color: #4a4a4a;
      width: 80%;
    }
    input::-webkit-input-placeholder {
      color: #999999;
    }
    input::-ms-input-placeholder {
      color: #999999;
    }
    input::-moz-input-placeholder {
      color: #999999;
    }
    span {
      position: absolute;
      right: 0.3rem;
    }
    .hr {
      height: 0.02rem;
      background: #eaeffb;
      margin-top: 0.12rem;
    }
    span {
      position: absolute;
      right: 0.3rem;
      bottom: 0.1rem;
    }
    .getcode {
      font-size: 0.24rem;
    //   border: 1px solid #3c8cff;
      color: #3c8cff;
      padding: 0.04rem 0.08rem;
      border-radius: 3px;
    }
  }
}

.changebton {
  width: 92%;

}
.resgg{
	color: rgb(138, 138, 138);
	font-size: 0.27rem;
	width: 94%;
	text-align: right;
	margin-right: 20px;
}
</style>
