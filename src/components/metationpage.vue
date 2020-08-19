<template>
  <div class="metationpage">
    <div class="tophader">
      <van-icon name="arrow-left" onclick="window.history.go(-1)" />
      <p>充币(USDT)</p>
      <img
        src="../assets/cbui_asset_img_tibi_dingdanxiangqi@2x.png"
        alt
        @click="$router.push('contirecord?type=1')"
      />
    </div>
    <p class="hr"></p>
    <div class="waite">
      <div class="ercode">
        <div id="qrcode1"></div>
      </div>
      <button type="button" class="savebton" @click="savecode">保存二维码至相册</button>
      <ul class="adrul">
        <li>
          <p class="tbiadr" style="margin: .2rem 0;">充币地址</p>
          <input
            type="text"
            autocomplete="off"
            name="userName"
            style="pointer-events: none;color:#333333"
            v-model="address"
            placeholder="钱包地址"
          />
        </li>
        <li>
          <button type="button" class="copyq1" @click="copy">复制</button>
        </li>
      </ul>
    </div>
    <div class="notesli" style="background:none;">
      <p style="margin-bottom:.2rem;text-align:left">
        <img src="../assets/iconb.png" alt />注意事项
      </p>
      <p>请勿向上述地址充值任何非USDT-ERC20资产，否则资产将不可找回。您充值至上述地址后，需要整个网络节点的确认，12次网络确认后到账。您的充值地址不会经常改变，可以重复充值;如有更改，我们会尽量通过网站公告或邮件通知您。请务必确认电脑及浏览器安全，防止信息被篡改或泄路。</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // type: this.$route.query.type,
      navs: 0,
      info: {},
      address: "",
      num: "",
      reality: 0,
      trad_password: "",
      feevalue: 0,
      fee: 0,
      reg_ratio: 0,
      remark: "",
      address1: "",
      info: {}
    };
  },
  created() {
    if (this.type == 0) {
      this.navs = 0;
    } else {
      this.navs = 1;
    }

    this.$axios.post("/index/mywallet/mywalletInfo").then(res => {
        this.start1();
        this.$axios.get("/index/mywallet/recharge").then(res => {
        if (res.data.code == 0) {
          this.address = res.data.info.money_address;
          // this.address=555;
          if (!this.address) {
            return this.$toast.fail({
              message: "请设置钱包地址",
              duration: 1600
            });
          } else {
            new this.$QRCode("qrcode1", {
              width: 150,
              height: 150,
              text: this.address
            });
          }
        }
      });
      
    });



  },
  methods: {
    start1() {
      this.$axios.get("/index/mywallet/addWithdrawList").then(res => {
        if (res.data.code != 0) return;
        this.info = res.data.info;
        this.feevalue = Number(res.data.info.reg_ratio);
      });
    },
    copy() {
     
      var clipboard = new this.$Clipboard(".copyq1", {
        text: () => {
          return (
           this.address
          );
        }
      });
      clipboard.on("success", () => {
        this.$toast.success({ message: "复制成功", duration: 1200 });
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", () => {
        // 不支持复制
        this.$toast.fail({ message: "该浏览器不支持自动复制", duration: 1200 });
        // 释放内存
        clipboard.destroy();
      });
    },
    savecode() {
      jsBridge.saveImageToAlbum(
        this.$refs.imgsave.childNodes[1].toDataURL("image/png"),
        function(succ) {
          succ
            ? this.$toast.success({ message: "保存成功", duration: 1200 })
            : this.$toast.fail({
                message: "保存失败：转码失败或没有相册使用权限",
                duration: 1200
              });
        }
      );
    }
  },
  watch: {
    num(s) {
      s = Number(s);
      if (s > 0) {
        var feen = parseInt(s * (this.feevalue / 100) * 100) / 100;
        this.reg_ratio = s - feen;
      }
    }
  }
};
</script>

<style lang="less" scoped>
#qrcode1 {
  margin: 0.4rem auto;
}
.savebton {
  background: #cbd4dd;
  height: 0.8rem;
  color: #3f70cc;
  margin-right: 0.2rem;
  border-radius: 4px;
  font-size: 0.3rem;
  margin-top: 0.25rem;
  width: 40%;
  display: block;
  margin: 0.3rem auto;
}
.copyq1 {
  padding: 0.1rem 0.5rem;
  color: #999999;
  font-size: 0.24rem;
}
.navtop {
  display: flex;
  justify-content: space-between;
  background: #fff;
  margin-top: 0.1rem;
  p {
    text-align: center;
    color: #bdc0c3;
    font-size: 0.28rem;
    width: 50%;
    padding: 0.3rem 0;
    img {
      width: 0.3rem;
      position: relative;
      top: 0.05rem;
      margin-right: 0.15rem;
    }
  }
  .addnav {
    color: #3e9ef6;
  }
}
.curryz {
  display: flex;
  justify-content: space-between;
  padding: 0.1rem 0.3rem 0.2rem;
  background: #fff;
  p {
    font-size: 0.28rem;
    span {
      margin-left: 0.2rem;
    }
    i {
      color: #999999;
    }
  }
}
.adrul li:nth-of-type(1),
.adrul li:nth-of-type(2),
.adrul li:nth-of-type(3),
.adrul li:nth-of-type(5) {
  background: #fff;
}
.adrul li:nth-of-type(5) {
  input {
    width: auto;
    padding-left: 0.1rem;
  }
}
li {
  font-size: 0.3rem;
  text-align: left;
  position: relative;
  padding: 0.1rem 0.3rem;
  text-align: center;
  p {
    margin: 0.2rem 0;
    font-size: 0.28rem;
    color: #333333;
  }
  p:nth-of-type(3) {
    font-size: 0.24rem;
    color: #1d93eb;
    width: 92%;
  }
  input {
    background: none;
    color: #f9f3a9;
    width: 96%;
    font-size: 0.24rem;
    text-align: center;
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
    color: #333333 !important;
    font-size: 0.2rem;
  }
}
.adrul {
  // padding-left: 0.3rem;
  .tbiadr {
    margin: 0.2rem 0 0.5rem;
    color: #999999;
    img {
      width: 0.28rem;
      position: relative;
      top: 0.02rem;
      left: 0.2rem;
    }
  }
  .daonum {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
    padding: 0rem 0.3rem;
    p {
      font-size: 0.3rem;
    }
  }
  .daonum p:nth-of-type(2) {
    color: #3e9ef6;
  }
}
  .notesli {
    margin-top: 0.3rem;
    padding: 0 .3rem;
    p {
      font-size: 0.2rem !important;
      color: #333333;
      width: 100%;
      margin: 0;
      line-height: 0.4rem;
    }
    img {
      width: 0.14rem;
      margin-right: 0.1rem;
      position: relative;
      top: 0.02rem;
    }
  }
  .notesli p:nth-of-type(2){
    color: #999999;
  }
.waite {
  background: #fff;
}
.changebton {
  width: 92%;
  margin: 0rem auto;
}
.changebton {
  font-size: 0.36rem;
}
li input {
  color: #999;
}
.tbinum {
  margin: 0.1rem 0 0.2rem;
  input {
    width: 50%;
    padding-left: 0.2rem;
    font-size: 0.24rem;
  }
  span {
    color: #3e9ef6;
    font-size: 0.24rem;
  }
}
.ercode {
  text-align: center;
  background: #fff;
  padding: 0.1rem 0;
  img {
    width: 1.8rem;
    height: 1.8rem;
  }
}
</style>
