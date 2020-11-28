<template>
  <div class="metationpage">
    <div class="tophader">
      <van-icon name="arrow-left" onclick="window.history.go(-1)" />
      <p>提币</p>
      <img
        src="../assets/cbui_asset_img_tibi_dingdanxiangqi@2x.png"
        alt
        @click="$router.push('contirecord?type=2')"
      />
    </div>
    <p class="hr"></p>
    <ul class="adrul">
      <li>
        <p>钱包地址</p>
        <input
          type="text"
          autocomplete="off"
          name="userName"
          v-model="address"
          placeholder="请输入您的钱包地址"
        />
        <p class="hr"></p>
        <p>可用USDT余额：{{info.number}}</p>
      </li>
      <li>
        <p>提币数量</p>
        <div>
          <input
            type="text"
            autocomplete="off"
            name="userName"
            v-model="num"
            placeholder="请输入提币数量"
          />
        </div>
        <p class="hr"></p>
        <p>实际提币到账USDT：{{reality}}</p>
      </li>
      <!-- <li>
        <p>备注</p>
        <input type="text" autocomplete="off" name="userName" v-model="remark" placeholder="请输入备注" />
        <p class="hr"></p>
      </li> -->
      <!-- <li>
        <p>手续费</p>
        <input
          type="text"
          autocomplete="off"
          name="userName"
          style="pointer-events: none;"
          v-model="feevalue"
          placeholder="手续费"
        />
        <p class="hr"></p>
      </li> -->
      <li>
        <p>交易密码</p>
        <input
          type="password"
          autocomplete="new-password"
          name="password"
          v-model="trad_password"
          placeholder="请输入您的交易密码"
        />
        <p class="hr"></p>
        <p class="spsamout">绑定的地址为钱包地址，须真实有效，否则将无法进行提币业务；提币矿工费为{{reg_ratio}}%。</p>
      </li>
    </ul>
    <button type="button" class="changebton" @click="confirm">确定提币</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: this.$route.query.type,
      info: {},
      address: "",
      num: "",
      reality: 0,
      trad_password: "",
      feevalue: 0,
      cr_to_usdt:0,
      fee: 0,
      reg_ratio: 0
    };
  },
  created() {
    this.$axios.post("/index/mywallet/mywalletInfo").then(res => {
      if(res.data.code==0){
        if (res.data.real==-1) {
          layer.open({content: res.data.msg,skin: 'msg',time: 2});
           setTimeout(()=>{
              this.$router.push("certification")
            },1200)
        }else{
          this.$axios.get("/index/mywallet/addWithdrawList").then(res => {
            if (res.data.code == 0) {
              this.info=res.data.info;
              this.fee = Number(res.data.info.reg_ratio);
              // this.reg_ratio=this.fee*100;
              this.reg_ratio = this.fee;
              this.cr_to_usdt=res.data.info.cr_to_usdt
              this.feevalue = this.reg_ratio;

              this.address = res.data.address;
              if (!this.address){
                  setTimeout(()=>{
                    this.$router.push("metationadr")
                  },1700)
                  this.$toast.fail({
                    message: "请设置钱包地址",
                    duration: 1600
                  });
              }
            }
          });
        }
      }else{
        this.$toast.fail({message:"请求失败",duration:1200});
      }
    });


  },
  methods: {
    confirm() {
      if (!this.address)
        return this.$toast.fail({ message: "请输入地址", duration: 1200 });
      if (!this.num)
        return this.$toast.fail({ message: "请输入数量", duration: 1200 });
      if (!this.trad_password)
        return this.$toast.fail({ message: "请输入交易密码", duration: 1200 });
      this.$axios
        .post("/index/mywallet/addWithdrawList", {
          num: this.num,
          trad_password: this.trad_password,
          address: this.address
        })
        .then(res => {
          if (res.data.code == 0) {
            this.$toast.success({ message: res.data.msg, duration: 1600 });
            setTimeout(() => {
              this.$router.back();
            }, 1600);
          } else {
            this.$toast.fail({ message: res.data.msg, duration: 1200 });
          }
        });
    }
  },
  watch: {
    num(s) {
      s = Number(s);
      if (s > 0) {
        // this.reality=s-(s*this.reg_ratio);
        // var ord=s/100;
        // this.feevalue=ord*this.reg_ratio;
        var b=Number(s)
        this.reality = parseInt(Number(b - Number((this.feevalue/100)*b))*100000)/100000
      }else{
        this.reality=0
      }
    },
    address(s) {
      if (s) {
        if (/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g.test(s)) {
          this.$toast.fail({ message: "不能输入中文", duration: 1200 });
        }
        this.address = s.replace(/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g, "");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.adrul {
  padding-left: 0.3rem;
}
li {
  font-size: 0.3rem;
  text-align: left;
  position: relative;
  padding: 0.1rem 0;
  p {
    margin: 0.2rem 0;
    font-size: 0.3rem;
    color: #333333;
  }
  p:nth-of-type(3) {
    font-size: 0.24rem;
    color: #3a5163;
    width: 92%;
  }
  input {
    background: none;
    // color: #f9f3a9;
    width: 80%;
  }
  input::-webkit-input-placeholder {
    color: #999999;
  }
  input::-mox-input-placeholder {
    color: #999999;
  }
  input::-ms-input-placeholder {
    color: #999999;
  }
  div {
    display: flex;
    justify-content: space-between;
  }
  .hr {
    height: 0.02rem;
    background: #eaeffb;
    margin: auto;
    color: #434343;
    margin-top: 0.1rem;
  }
  span {
    position: absolute;
    right: 0.3rem;
  }
  .allsps {
    bottom: 0.99rem;
  }
  .sxu {
    bottom: 0.6rem;
  }
  .spsamout {
    color: #e73a40 !important;
  }
}
.changebton {
  margin: 1.2rem auto 0;
}
</style>
