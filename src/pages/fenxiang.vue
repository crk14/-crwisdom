
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
			
		<div class="page-fuli">
						  <div class="title1">
							  <span>我的邀请 : {{invite.invite_num}}</span>
							  <span>社区用户 : {{invite.team_num}}</span>
						  </div>
						  <div class="item" v-for="(item,index) in huiyuanlish" :key="index" style="justify-content: space-around;">
							  <div class="two" style="margin-left:2px;flex: inherit;width: 56%;padding: 0;height: 0;margin-top: 0">{{item.nick_name}}-{{item.mobile}}
							  <p style="margin-top: .1rem;">注册时间：{{item.register_time}}</p>
							  </div>
							  <div class="three" >
								  <img v-if="item.is_need ==2" src="../assets/111.png"/>
								  <img v-if="item.is_need ==1" src="../assets/301.png"/>
								  <span style="margin-left: 22px;">{{item.is_need == 1?'注册会员':'普通会员'}}</span>
							  <p style="font-size: 13px;">业绩: {{item.achieve}}点</p>
							  </div>
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
	ishow:false,
	huiyuanlish:[],
	invite:{},
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
	this.$axios.get("/index/welfarecenter/member").then(res => {
	  if (res.data.code == 0) {
		  this.huiyuanlish = res.data.info
	  }
	});
	this.$axios.get("/index/welfarecenter/invite_team").then(res => {
	  if (res.data.code == 0) {
		  this.invite = res.data
		  // this.daililist = res.data.info
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
	.page-fuli{
		background-color: #e8ecef;
		width: 92%;
		min-height: 10rem;
		.title1{
			display: flex;
			justify-content: space-between;
			margin-bottom: .2rem;
		}
		.item{
			padding: 0.2rem .17rem 0.2rem;
			display: flex;
			background-color: #FFFFFF;
			border-bottom: 8px solid #e8ecef;
			.two{
				margin-left: .2rem;
				color:rgb(40,60,103) ;
				font-size: 15px;
				flex: 1;
				p{
					margin-top: .14rem;
					color: rgb(143,145,148);
					font-size: 12px;
				}
			}
			.three{
				position: relative;
				font-size: 15px;
				color: rgb(83,93,95);
				p{
					margin-top: .1rem;
					color: rgb(40,60,103);
					font-size: 14px;
				}
				img{
					position: absolute;
					left:0px;
					top: 0px;
					height: 24px;
					width: 20px;
				}
			}
		}
	}
</style>
