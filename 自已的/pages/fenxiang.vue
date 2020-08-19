
<template>
	<div>
		<van-icon onclick="window.history.go(-1)" name="arrow-left" style="position: absolute;left: 5px;top: 5px;" size="25px" color="#ffffff"/>
		<img class="img" src="../assets/banan3.png" />
		<div class="title">
			<div class="one" v-if="ishow">
				<div class="right">
					<button type="button" @click="savecode" class="button">保存二维码</button>
					<button type="button" @click="savecode1" class="button" style="margin-left: .3rem;">生成邀请海报</button>
				    <p>
				      我的邀请码:
				      <span @click="fn1(info,true)" class="codes">{{info}} <span>复制</span> </span>
				    </p>
					<p style="display: flex;">
					  我的邀请链接:
					  <span class="codes" style="display: flex;"><span style="overflow:hidden;
	text-overflow:ellipsis;
	white-space:nowrap;width: 80px;">{{infourl}}</span><span  @click="fn1(infourl,false)">复制</span> </span>
					</p>
				   <!-- <p style="margin-bottom: .2rem;">
				      <button type="button" class="copy" @click="copy(info)">复制邀请码</button>
				    </p>
				    <p class="bton_p">
				      <button type="button" class="copy" @click="copy(infourl)">复制邀请链接</button>
				    </p> -->
				  </div>
				<div class="myinvicode" >
				      <div id="qrcode" ref="imgsave">
				        <img v-show="myimg" :src="img" alt />
				      </div>
				
			</div>
			</div>
			
			<div class="two">
				<p>分享好友奖励</p>
				<div>
					<span>分享好友: {{number}}</span>
					<span>邀请奖励: {{memberaccount>0?memberaccount.toFixed(2):0}} CRW</span>
				</div>
			</div>
			<div class="two" style="min-height: 8rem;">
				<p>排行榜</p>
				<div v-for="(item,index) in list" :key="index">
					<img v-if="index == 0" src="../assets/1301.png"/>
					<img  v-if="index == 1" src="../assets/1302.png"/>
					<img v-if="index == 2" src="../assets/1303.png"/>
					<span style="position: absolute;width: 20px;text-align: center;padding: 0;left: 12px;">{{index>2?index+1:''}}</span> 
					<span class="left">
						{{item.mobile}}</span>
					<span>{{(item.profit*2).toFixed(2)}} <span>CRW</span> </span>
				</div>
				
			</div>
		</div>
		 <textarea cols="20" rows="10" id="biao1" style="opacity: 0;height: 1px;">{{info}}</textarea>
		 <textarea cols="20" rows="10" id="biao2" style="opacity: 0;height: 1px;">{{infourl}}</textarea>
	</div>
</template>

<script>
export default {
  data() {
    return {
    img: "",
    myimg: false,
    info: "",
	infourl:'',
	imgpng:'',
	number:0,
	memberaccount:0,
	list:[],
	ishow:false
    };
  },
  created() {
	  console.log(navigator.userAgent)
	  this.$axios.post("/index/member/getUserInfo").then(res => {
	    if (res.data.code == 0) {
	      if(res.data.info.is_need ==2){
			  this.ishow = true
		  }
	    }
	  });
  	this.$axios.post("/index/member/getInviteImg").then(res => {
  	  if(res){
  	  if (res.data.code == 0) {
  	    this.imgpng = location.origin+res.data.info;
  	  }
  	  }
  	});
	this.$axios.get("/index/welfarecenter/member_account").then(res => {
	  if (res.data.code == 0) {
		  this.memberaccount = res.data.member_account
	  }
	});
	this.$axios.get("/index/rank/get_share_rank").then(res => {
	  if (res.data.code == 0) {
		  this.list = res.data.data
		  // this.memberaccount = res.data.member_account
	  }
	});
  },
  mounted() {
  	  this.$axios.post("/index/member/spread").then(res => {
  	  		if (res.data.code == 0) {
  	  		  // this.name = res.data.info.nick_name;
			  this.number = res.data.data.invite_num
  	  		  this.info = res.data.info;
  	  			  new this.$QRCode("qrcode", {
  	  			    width: 85,
  	  			    height: 85,
  	  			    text: `http://${res.data.share_url}` + "/dist/#/sign?id=" + res.data.info
  	  			  });
  	  		 
  	  		  this.infourl = `http://${res.data.share_url}` + "/dist/#/sign?id=" + res.data.info;
  	  		  // this.img = this.$refs.imgsave.childNodes[1].toDataURL("image/png");
  	  		  // this.myimg = false;
  	  	}
  	  
  	  });
  },
  methods:{
	  copyUrl2(){
	   var Url2=document.getElementById("biao1");
	    Url2.select(); // 选择对象
	    document.execCommand("Copy"); // 执行浏览器复制命令
	    this.$toast.success({ message: "复制成功", duration: 1200 });
	    },
		copyUrl3(){
		 var Url2=document.getElementById("biao2");
		  Url2.select(); // 选择对象
		  document.execCommand("Copy"); // 执行浏览器复制命令
		  this.$toast.success({ message: "复制成功", duration: 1200 });
		  },
		fn1(s,bool){
			if(bool){
				if(!!navigator.userAgent.match(/citicbankmobile/i)){
					this.fn2(s)
				}else{
					this.copyUrl2()
				}
			}else{
				if(!!navigator.userAgent.match(/citicbankmobile/i)){
					this.fn2(s)
				}else{
					this.copyUrl3()
				}
			}
			
		},
	  fn2(s){
		 console.log(s)
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
	  },  copy(s) {
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
  },
 
};
</script>

<style lang="less" scoped>
	.img{
		width: 100%;
		height: 7.2rem;
	}
	.title{
		background-color: rgb(233,236,243);
		width: 100%;
		margin-top: -5px;
		padding: 0.07rem .3rem;
		min-height: 7.3rem;
		.one{
			background-color: #FFFFFF;
			height: 2.2rem;
			padding: .3rem .3rem 0 .3rem;
			display: flex;
			justify-content: space-between;
			width: 84%;
			.right{
				.button{
					background-color: rgb(226,231,253);
					width: 2rem;
					text-align: center;
					height: 30px;
					line-height: 30px;
					border-radius: 8px;
					font-size: 14px;
				}
				p{
					// margin: 10px 0;
					margin-top: 10px;
					font-size: 14px;
					display: flex;
					justify-content: space-between;
				}
				.codes{
					background-color: rgb(230,243,251);
					// margin-left: 0.9rem;
					padding: .09rem;
					border-radius: 8px;
					font-size: 12px;
					span{
						font-size: 12px;
						margin-left: 0px;
					}
				}
			}
			
		}
		.two{
			background-color: #FFFFFF;
			height: 1.6rem;
			padding: .15rem .3rem 0 .3rem;
			font-size: 14px;
			width: 84%;
			margin-top: 8px;
			p{
				font-size: 14px;
				font-weight: 550;
				margin-bottom: 6px;
			}
			div{
				position: relative;
				height: 33px;
				line-height: 33px;
				border-top: 1px solid rgb(235,241,255);
				border-bottom: 1px solid rgb(235,241,255);
				display: flex;
				justify-content: space-between;
				padding: 0 10px;
				span{
					span{
						color: rgb(133,134,134);
					}
				}
				img{
					position: absolute;
					top: 6.8px;
					left: 9px;
					width: 34px;
					height: 16px;
				}
				.left{
					margin-left: 32px;
				}
			}
		}
	}
	.abcd{
		position: fixed;
		top: 0px;
		left:0px
	}
</style>
