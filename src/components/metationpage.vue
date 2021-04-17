<template>
  <div class="metationpage">
    <div class="tophader">
      <van-icon name="arrow-left" onclick="window.history.go(-1)" />
      <p>{{$t('index.Recharge')}}(USDT)</p>
      <img
        src="../assets/cbui_asset_img_tibi_dingdanxiangqi@2x.png"
        alt
        @click="$router.push('contirecord?type=1')"
      />
    </div>
    <p class="hr"></p>
	<p style="text-align: center;">{{$t('store.channel')}}</p>
    <div class="waite">
      <div class="ercode">
        <div id="qrcode1"></div>
      </div>
      <button type="button" class="savebton" :class="{'active':value1==2}" @click="savecode">{{$t('spot.album')}}</button>
      <ul class="adrul">
        <li>
          <p class="tbiadr" style="margin: .2rem 0;">{{$t('spot.site')}}</p>
          <input
            type="text"
            autocomplete="off"
            name="userName"
            style="pointer-events: none;color:#333333"
            v-model="address"
            :placeholder="$t('spot.wallet')"
          />
        </li>
        <li>
          <button type="button" style="color: #3f70cc;margin-bottom: 10px;" class="copyq1" @click="copy">{{$t('spot.copy')}}</button>
        </li>
      </ul>
    </div>
	<div style="font-size: 14px;color: #999999;margin: 2px 12px;">{{$t('spot.account')}}</div>
    <div style="font-size: 14px;margin: 0 12px;display: flex;justify-content: space-between">
		<span :class="{'active1':value1==1}">{{$t('spot.hash')}}</span>
		<input type="text" style="margin: 0 12px;flex: 1; border: 1px solid #eee;line-height: 23px;" v-model="value" />
		<button @click="fn1()" style="color: #3f70cc;">{{$t('user.Confirm')}}</button>
	</div>
	<div class="notesli" style="background:none;">
      <p style="margin-bottom:.2rem;text-align:left;margin-top: .6rem;">
        <img src="../assets/iconb.png" alt />{{$t('spot.Cautions')}}
      </p>
      <p>{{$t('spot.please')}}。</p>
    </div>
	<textarea cols="20" rows="10" id="biao1" style="opacity: 0;height: 1px;">{{address}}</textarea>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // type: this.$route.query.type,
      navs: 0,
      address: "",
      num: "",
      reality: 0,
      trad_password: "",
      feevalue: 0,
      fee: 0,
      reg_ratio: 0,
      remark: "",
      address1: "",
      info: {},
	  value:'',
	  value1:0
    };
  },
  created() {
	  let value = localStorage.getItem('languageSet')
	  if (value) {
	  	if (value == 'en') {
	  		this.value1 = 1
	  	} else if (value == 'hy') {
	  		this.value1 = 2
	  	}
	  }
    if (this.type == 0) {
      this.navs = 0;
    } else {
      this.navs = 1;
    }
	this.$axios.get("/index/mywallet/recharge").then(res => {
	if (res.data.code == 0) {
	  this.address = res.data.info;
	  // this.address=555;
	  // if (!this.address) {
	  //   return this.$toast.fail({
	  //     message: "请设置钱包地址",
	  //     duration: 1600
	  //   });
	  // } else {
	    new this.$QRCode("qrcode1", {
	      width: 150,
	      height: 150,
	      text: this.address
	    });
	  // }
	}
	})

    // this.$axios.post("/index/mywallet/mywalletInfo").then(res => {
    //   if (res.data.real==-1&&res.data.code==0) {
    //     layer.open({content: res.data.msg,skin: 'msg',time: 2});
    //      setTimeout(()=>{
    //         this.$router.push("certification")
    //       },1200)
    //   }else{
    //     this.start1();
    //     this.$axios.get("/index/mywallet/recharge").then(res => {
    //     if (res.data.code == 0) {
    //       this.address = res.data.info.money_address;
    //       // this.address=555;
    //       if (!this.address) {
    //         return this.$toast.fail({
    //           message: "请设置钱包地址",
    //           duration: 1600
    //         });
    //       } else {
    //         new this.$QRCode("qrcode1", {
    //           width: 150,
    //           height: 150,
    //           text: this.address
    //         });
    //       }
    //     }
    //   });
    //   }
    // });



  },
  methods: {
	  fn1(){
		  if(!this.value){
			  this.$toast.fail({
				  message:this.$t('spot.hash')
			  })
			  return
		  }
		  let obj = {
			  tr_hash:this.value
		  }
		  
		  this.$axios.post(`/index/mywallet/confirm_recharge`,obj).then(res => {
		    if (res.data.code == 0){
				this.$toast.success({
					message:res.data.msg
				})
				setTimeout(()=>{
					this.$router.push('my')
				},1000)
			}else{
				this.$toast.fail({
					message:res.data.msg
				})
				
			}
		  })
		 
	  },
    start1() {
      this.$axios.get("/index/mywallet/addWithdrawList").then(res => {
        if (res.data.code != 0) return;
        this.info = res.data.info;
        this.feevalue = Number(res.data.info.reg_ratio);
      });
    },
	copyUrl2() {
		var Url2 = document.getElementById("biao1");
		Url2.select(); // 选择对象
		document.execCommand("Copy"); // 执行浏览器复制命令
		this.$toast.success({
			message: this.$t('spot.successtwo'),
			duration: 1200
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
        this.$toast.success({ message: this.$t('spot.successtwo'), duration: 1200 });
        // 释放内存
        clipboard.destroy();
      });
	  this.copyUrl2()
      clipboard.on("error", () => {
        // 不支持复制
        this.$toast.fail({ message:  this.$t('spot.replication'), duration: 1200 });
        // 释放内存
        clipboard.destroy();
      });
    },
    savecode() {
      jsBridge.saveImageToAlbum(
        this.$refs.imgsave.childNodes[1].toDataURL("image/png"),
        function(succ) {
          succ
            ? this.$toast.success({ message: this.$t('spot.successfully'), duration: 1200 })
            : this.$toast.fail({
                message: this.$t('spot.jurisdiction'),
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
  margin: 0.2rem auto;
}
.savebton {
  background: #cbd4dd;
  height: 0.8rem;
  color: #3f70cc;
  margin-right: 0.2rem;
  border-radius: 4px;
  font-size: 0.3rem;
  margin-top: 0.25rem;
  width: 45%;
  display: block;
  margin: 0 auto;
}
.active{
	width: 60%;
}
.active1{
	font-size: 12px;
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
