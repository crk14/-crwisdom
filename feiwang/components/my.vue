<template>
  <div class="my" style="background-color: #FFFFFF !important;height: 100%;">
    <p class="toptitle">我的</p>
	<div class="my-header" >
		<img  src="../assets/911.png" style="width: 100%;height: 3.4rem;"/>
		<img   @click="$router.push('personmsg')" v-if="infouser.avatar"  :src="infouser.avatar" alt style="width: 59px;height: 59px;border-radius: 50%;
		position: absolute;left: 16px;top: 58px;border: 4px solid #FFFFFF;"/>
		<div style="position: absolute;left: 100px;top: 75px;color: #FFFFFF;font-size: 20px;">{{infouser.nick_name}}</div>
		<div style="position: absolute;left: 100px;top: 105px;color: #FFFFFF;font-size: 16px;">UID:{{infouser.id}}</div>
	<div style="position: absolute;right: 30px;top: 91px;color: #FFFFFF;font-size: 16px;">{{infouser.is_need == 2?infouser.level_name:'注册会员'}}</div>
	</div>
	<!-- <div class="my-monery"> -->
	<!-- 	<div>
			资产 <img v-show="isshow" @click="isshow=false" src="../assets/kaiyan.png" style="width: 19px;height: 19px;position: absolute;top: 22px;left: 51px;"/> 
			 <img v-show="!isshow" @click="isshow=true" src="../assets/biyan.png" style="width: 19px;height: 19px;position: absolute;top: 22px;left: 51px;"/>
			<span style="margin-left: 20px;"></span>(点卡值)
			<p>{{isshow?infoamout.number:'****'}}</p>
		</div> -->
		<!-- <div >
			昨日收益
			<p style="position: relative;padding-left: 13px;">{{isshow?parseInt(Number(dayachieve)*100)/100:'****'}}
			<span v-show="isshow" style="position: absolute;left: 0;top: -1;">+</span></p>
		</div> -->
		<!-- <div @click="$router.push('carrymoney')" style="font-size: 19px;margin-top: 10px;margin-right: 20px;">提现<img src="../assets/youyou.png" style="width: 17px;height: 19px;position: absolute;top: 35px;right: 20px;"/>
		</div> -->
	<!-- </div> -->
	<img src="../assets/fuxingpng.png" style="position: absolute;top: 161px;width: 100.2%;"/>
    <div class="labwarp" style="margin-top: -88px;background-color: #fff;position: relative;">
      <div class="tablecon" style="margin-top: 56px;">
        <!-- <router-link to="/intertranfor"> @click="stayopen"-->
		<router-link to="/certification">
		  <div :style="string">
		    <p>
		      <img src="../assets/1201.png" alt style="width: .35rem;top: .02rem;" />
		      <span>实名认证</span>
		    </p>
		    <van-icon name="arrow" class="jtou" />
		  </div>
		</router-link>
        <router-link to="/intertranfor">
        <div >
          <p>
            <img src="../assets/1202.png" alt style="top:0.05rem;" />
            <span>互转中心</span>
          </p>
          <van-icon name="arrow" class="jtou" />
        </div>
        </router-link>
        <!-- </router-link> -->
        <!-- <router-link to="/datapage">
          <div>
            <p>
              <img src="../assets/组26@2x.png" alt style="top: .04rem;" />
              <span>我的社区</span>
            </p>
            <van-icon name="arrow" class="jtou" />
          </div>
        </router-link> -->
        <!-- <router-link to="/mypromote">  @click="stayopen"-->
       <!-- <router-link to="/mypromote">
        <div>
          <p>
            <img src="../assets/组27@2x.png" alt style="top: .05rem;" />
            <span>我的业绩</span>
          </p>
          <van-icon name="arrow" class="jtou" />
        </div>
        </router-link> -->
        <!-- </router-link> -->
        <!-- <router-link to="/subrecored"> @click="stayopen"-->
       <!-- <router-link to="/metationadr">
        <div >
          <p>
            <img src="../assets/1203.png" alt style="top:.058rem" />
            <span>绑定钱包</span>
          </p>
          <van-icon name="arrow" class="jtou" />
        </div>
        </router-link> -->
        <router-link to="/chagepass">
          <div>
            <p>
              <img src="../assets/1204.png" alt style="width: .35rem;top: .06rem;" />
              <span>安全中心</span>
            </p>
            <van-icon name="arrow" class="jtou" />
          </div>
        </router-link>
        <!-- <router-link to="/callcenter">  @click="stayopen"-->
        <router-link to="/callcenter">
        <div>
          <p>
            <img src="../assets/1205.png" alt style="width: .35rem;top: .046rem;" />
            <span>联系客服</span>
          </p>
          <van-icon name="arrow" class="jtou" />
        </div>
        </router-link>
		
        <!-- </router-link> -->
      </div>
	  <button type="button" class="changebton"  style="background: #EBEDF0;" @click="send">退出登录</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      img: "",
      myimg: false,
      info: "",
      infouser: {},
      infoamout: {},
      infourl: "",
      imgpng: "",
	  isshow:true,	
	dayachieve:0,
	string:'padding: 0.02rem .3rem .32rem .3rem;'
    };
  },
  created() {
    this.$axios.post("/index/member/getUserInfo").then(res => {
      if (res.data.code == 0) {
        this.infouser = res.data.info;
      }
    });
    this.$axios.post("/index/mywallet/mywalletInfo").then(res => {
      if (res.data.code == 0) {
		  if(res.data.day_achieve){
			  this.dayachieve = res.data.day_achieve
		  }
        this.infoamout = res.data.info;
      }
    });
   //  this.$axios.post("/index/member/getInviteImg").then(res => {
	  // if(res){
   //    if (res.data.code == 0) {
   //      this.imgpng = location.origin+res.data.info;
   //    }
	  // }
   //  });
    var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    console.log(windowHeight)
    if(windowHeight && windowHeight<600){
    	this.string= 'padding: 0.32rem 0.3rem;'
    }
  },
  // mounted() {
	 //  this.$axios.post("/index/member/spread").then(res => {
	 //  		if (res.data.code == 0) {
	 //  		  // this.name = res.data.info.nick_name;
	 //  		  this.info = res.data.info;
	 //  		  if(this.infouser.is_need == 2){
	 //  			  new this.$QRCode("qrcode", {
	 //  			    width: 85,
	 //  			    height: 85,
	 //  			    text: `http://${res.data.share_url}` + "/dist/#/sign?id=" + res.data.info
	 //  			  });
	 //  		  }
	  		 
	 //  		  this.infourl = `http://${res.data.share_url}` + "/dist/#/sign?id=" + res.data.info;
	 //  		  // this.img = this.$refs.imgsave.childNodes[1].toDataURL("image/png");
	 //  		  // this.myimg = false;
	 //  	}
	  
	 //  });
  // },
  methods: {
    stayopen() {
      this.$toast.fail({ message: "等待开放", duration: 1200 });
    },
    copy(s) {
      var clipboard = new this.$Clipboard(".copy", {
        text: () => {
          return s;
        }
      });
      clipboard.on("success", () => {
        this.$toast.success({ message: "复制成功", duration: 1200 });
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", () => {
        // 不支持复制
        this.$toast.fail({
          message: "该浏览器不支持自动复制",
          duration: 1200
        });
        // 释放内存
        clipboard.destroy();
      });
    },
    savecode() {
      var ts=this;
	  jsBridge.ready(function () {    
	         jsBridge.saveImageToAlbum(
	           ts.$refs.imgsave.childNodes[1].toDataURL("image/png"),
	           function(succ) {
	             succ? ts.$toast.success({ message: "保存成功", duration: 1200 }): ts.$toast.fail({
	                   message: "保存失败：转码失败或没有相册使用权限",
	                   duration: 1200
	                 });
	           }
	         );
	      });
		  
     
    },
    savecode1(){
      var ts=this;
	   jsBridge.ready(function () {    
	         jsBridge.saveImageToAlbum(ts.imgpng, function(succ) {
	           succ? ts.$toast.success({ message: "保存成功", duration: 1200 }): ts.$toast.fail({
	                   message: "保存失败：转码失败或没有相册使用权限",
	                   duration: 1200
	                 });
	         });
	      });
      
    },
	send() {
	  this.$toast.loading({
	    message: "正在退出",
	    duration: 0,
	    loadingType: "spinner "
	  });
	  this.$axios
	    .post("/index/member/logout")
	    .then(res => {
	      this.$toast.clear();
	      this.$toast.success({ message: res.data.msg, duration: 1200 });
	      setTimeout(() => {
	        localStorage.clear();
	        this.$router.push("login");
	      }, 1200);
	    })
	    .catch(res => {
	      this.$toast.loading({
	        message: "正在强制退出",
	        duration: 0,
	        loadingType: "spinner "
	      });
	      setTimeout(() => {
	        localStorage.clear();
	        this.$router.push("login");
	      }, 1000);
	    });
	},
  },
  watch: {},
  beforeDestroy() {}
};
</script>

<style lang="less" scoped>
.toptitle {
  color: #333333;
  font-weight: 550;
  text-align: center;
  // padding: 0.3rem;
  height: 42px;
  line-height: 42px;
  font-size: 17px;
  background: #fff;
}
.header {
  display: flex;
  justify-content: space-between;
  padding: 5% 8%;
  // background: url("../assets/mytops.png") no-repeat;
  // background-size: 100%;
  background: #fff;
  // height: 2.7rem;
  .left,
  .right,
  .topr {
    text-align: center;
font-size: 0.3rem;
    color: #333333;
  }
  .left,
  .right {
    padding-top: 0.8rem;
  }
  .numtext {
    color: #3f70cc;
    font-size: 0.3rem;
    margin: 0.1rem 0;
  }
  button {
    border: 1px solid #999999;
    border-radius: 30px;
    padding: 0 0.2rem;
    background: none;
    font-size: 0.2rem;
  }
  .topl {
    // margin-left: 0.2rem;
    p:nth-of-type(1) {
      font-size: 0.48rem;
      color: #333333;
    }
    .santext {
      height: 0.3rem;
      // background: url("../assets/jsucard.png") no-repeat;
      // background-size: 100% 100%;
      text-align: center;
      font-size: 0.24rem;
      color: #fff;
      position: relative;
      line-height: 0.3rem;
      margin-top: 0.15rem;
      min-width: 1.42rem;
      display: inline-block;
      img {
        width: 70%;
      }
    }
    p {
      font-size: 0.3rem;
      color: #999999;
      margin-top: 0.08rem;
    }
  }
  .topr {
    position: relative;
    // padding: 0.6rem 0.3rem;
    i {
      position: absolute;
      right: 0;
      top: 0.5rem;
      color: #333333;
    }
    input {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
    }
  }
  span {
    display: block;
    width: 1.35rem;
    height: 1.35rem;
    border-radius: 50%;
    line-height: 1.6rem;
    border: 1px solid #ccc;
    padding: 0.05rem;
    position: relative;
    left: 0.04rem;
    display: inline-block;
    .userphoto {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}

.myinvicode {
  // width:88%;
  // height: 2.5rem;
  background: linear-gradient(
    90deg,
    rgba(33, 63, 145, 1) 0%,
    rgba(44, 76, 163, 1) 100%
  );
  border-radius: 6px;
  margin: 0.4rem 0.3rem;
  display: flex;
  // box-shadow: 0 0 10px #78aef9;
  padding: 0.3rem 0 0.3rem 0.2rem;
  #qrcode {
    width: 1.72rem;
    height: 1.72rem;
    border-radius: 3px;
    padding: 0.05rem;
    background: white;
    // margin: 0.34rem 0.28rem;
    margin-right: 0.2rem;
        position: relative;
    top: .1rem;
    img {
      height: 100% !important;
    }
  }
  .right {
    // margin-top: 0.15rem;
    color: white;
    p:nth-of-type(1) {
      font-size: 0.3rem;
      margin-top: -0.15rem;
      .codes {
        font-size: 0.46rem;
        position: relative;
        top: 0.05rem;
      }
    }
  }
  button {
    background: white;
    height: 0.48rem;
    color: #3f70cc;
    margin-right: 0.2rem;
    border-radius: 30px;
    font-size: 0.24rem;
    margin-top: 0.25rem;
    min-width: 1.96rem;
  }
  .bton_p {
    margin-top: -0.15rem;
  }
}

.tablecon {
  // background: #fff;
  // width: 92%;
  margin: 0.3rem auto 0;
  border-radius: 3px;
  div {
    justify-content: space-between;
    display: flex;
    padding: 0.32rem 0.3rem;
    border-bottom: 7px solid rgb(244,244,244);
  }
  span {
    font-size: 0.32rem;
    color: rgb(51,51,51);
    margin-left: 0.3rem;
    font-family: PingFang SC;
  }
  .jtou {
    font-size: 0.44rem;
    // margin-top: 0.05rem;
    color: rgb(153,153,153);
  }
  img {
    position: relative;
    width: 0.35rem;
  }
}

.child-view {
  padding-bottom: 0;
}
.header span {
  line-height: 1.67rem;
}
#qrcode canvas {
  height: 100% !important;
}
.topl {
  p {
    margin-left: 0.08rem;
  }
}
.tablecon {
  margin-top: 0.3rem;
}
.changebton {
  margin: 0.2rem auto;
  width: 92%;
}

.header .cenlevel{
  display: block;
  height: .4rem;
  line-height: .4rem;
  border-radius: 13px;
  border-color: #fff;
  background: #e70000;
  width: 2rem;
  color: #fff;
  top: .1rem;
}
.my-monery{
	// height: 2rem;
	background-image: linear-gradient(rgb(96,141,249), rgb(48,101,239),rgb(49,87,246));
	position: absolute;
	width: 91%;
	top: 157px;
	background-color:wheat;
	border-radius:20px 20px 0 0;
	padding: 6% 5%;
	display: flex;
	justify-content: space-between;
	div{
		color: #FFFFFF;
		font-size: 14px;
		p{
			margin-top: 8px;
			font-size: 20px;
		}
	}
	}
</style>
