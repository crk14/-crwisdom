<template>
  <div class="intertranfor">
    <div class="tophader">
      <van-icon name="arrow-left"  onclick="window.history.go(-1)"/>
      <p>互转中心</p>
      <img src="../assets/cbui_asset_img_tibi_dingdanxiangqi@2x.png" alt @click="$router.push('contirecord?type=10')"/>
    </div>
    <p class="hr"></p>
    <ul>
      <li>
        <p>互转类型</p>
        <!-- <input type="password" v-model="oldpass" placeholder="请输入旧的交易密码" /> -->
        <select v-model="valss">
          <option v-for="(item,i) in optionval" :value="item.a" :key="i" selected>{{item.a}}</option>
        </select>
        <p class="hr"></p>
      </li>
     <li>
        <p>收款账户</p>
        <input type="text" v-model="accout" placeholder="请输入收款人的账户" />
        <p class="hr"></p>
      </li>
      <li>
        <p>收款人UID</p>
        <input type="number" v-model="id" placeholder="请输入收款人的UID" />
        <p class="hr"></p>
      </li>
      <li>
        <p>转出数量</p>
        <input type="number" v-model="num" placeholder="请输入您想要转出的数量" />
        <span class="all" @click="valss=='点卡值'?num=info.number:num=info.safe_num">全部</span>
        <p class="hr"></p>
        <div>{{valss}}余额：{{valss=='点卡值'?info.number:info.safe_num}}</div>
      </li>
      <li>
        <p>交易密码</p>
        <input type="password" v-model="trad_password" placeholder="请输入您的交易密码" />
        <p class="hr"></p>
      </li>
      <li>
        <p>验证码</p>
        <input type="text" v-model="code" placeholder="请输入验证码" />
        <span class="getcode" @click="setcode">获取验证码</span>
        <p class="hr"></p>
      </li>
    </ul>
    <button type="button" class="changebton" @click="send">确定互转</button>
    <!-- <p class="note">注意：</p>
    <p class="note">只能转USDT和转V1-V6产出的TCC+返还本金</p> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isclick: true,
      id: "",
      num: "",
      trad_password: "",
      code: "",
      optionval: [{ a: "点卡值" },],
      accout:'',
      info:{},
      valss:'点卡值'
    };
  },
  created(){
    this.$axios
      .get("/index/mywallet/mywalletInfo", { page: 1, limit: 1 })
      .then(res => {
        if(res.data.info){
          this.info = res.data.info;
        }
         if (res.data.real==-1&&res.data.code==0) {
          layer.open({content: res.data.msg,skin: 'msg',time: 2});
          setTimeout(()=>{
              this.$router.push("certification")
            },1200)
        }
      });
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
		console.log(this.id,this.num,this.trad_password,this.code)
      if (!this.id || !this.num || !this.trad_password||!this.code) {
        this.$toast.fail({ message: "请填写完整", duration: 1200 });
        return;
      }

      this.$axios.post("/index/member/userToUser", {
          id: this.id,
          num: this.num,
          trad_password: this.trad_password,
          code: this.code,
          mobile:this.accout,
          types: 1
        }).then(res => {
          if (res.data.code == 0) {
            this.$toast.success({ message: res.data.msg, duration: 1200 });
            setTimeout(() => {
              this.$router.back();
            }, 1600);
          } else {
            this.$toast.fail({ message: res.data.msg, duration: 1200 });
          }
        });
    },
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
    select {
      width: 100%;
      color: #bababa;
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
    .all {
      color: #0f54f9;
      top: 0.66rem;
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
      // border: 1px solid #3c8cff;
      color: #3c8cff;
      padding: 0.04rem 0.08rem;
      border-radius: 3px;
    }
  }
}

.changebton {
  width: 92%;
}
.note {
  text-align: center;
  color: #999999;
  font-size: 0.18rem;
  line-height: 0.4rem;
}
</style>
