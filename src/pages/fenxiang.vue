<template>
	<div>
		<van-icon onclick="window.history.go(-1)" name="arrow-left" style="position: absolute;left: 5px;top: 5px;" size="25px"
		 color="#ffffff" />
		<img class="img" src="../assets/10099.png" />
		<div class="title">
			<img style="width: 100%;" src="../assets/10010.png" />
			<div class="one">
				<div id="qrcode" ref="imgsave">
					<img v-show="myimg" :src="img" alt />
				</div>
				<p style="margin-top: 15px;">
					我的邀请码:
					<span @click="fn1(info,true)" class="codes">{{info}} <span class="bun">复制</span> </span>
				</p>
				<p style="display: flex;margin-left: 10%;margin-top: 3px;">
					我的邀请链接:
					<span class="codes" style="display: flex;"><span style="overflow:hidden;
					  text-overflow:ellipsis;
					  white-space:nowrap;width: 110px;">{{infourl}}</span><span
						 class="bun" @click="fn1(infourl,false)">复制</span> </span>
				</p>
				<button type="button" @click="savecode1" class="changebton">生成邀请海报</button>
			</div>
		</div>
		<div class="title">
			<div class="one">
				<div class="title1">
				  <span>我的邀请: {{invite.invite_num}}</span>
				  <span>正式用户: {{invite.team_num}}</span>
				</div>
				<div class="item" v-for="(item,index) in huiyuanlish" :key="index">
				  <img class="img" :src="item.avatar" />
				  <div class="two" style="margin-left:2px;overflow: hidden;flex: 1;text-overflow: ellipsis;white-space: nowrap">
				    {{item.nick_name}}-{{item.mobile?item.mobile:item.email}}
				    <p style="margin-top: .1rem;">注册时间：{{item.register_time}}</p>
				  </div>
				  <div class="three">
				    <img v-if="item.is_need ==2" src="../assets/111.png" />
				    <img v-if="item.is_need ==1" src="../assets/301.png" />
				    <span>{{item.is_need == 2?item.level_name:'注册会员'}}</span>
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
				infourl: '',
				imgpng: '',
				number: 0,
				memberaccount: 0,
				list: [],
				huiyuanlish: [],
				invite: {},
			};
		},
		created() {
			this.$axios.post("/index/member/getInviteImg").then(res => {
				if (res) {
					if (res.data.code == 0) {
						this.imgpng = location.origin + res.data.info;
					}
				}
			});
			this.$axios.get("/index/welfarecenter/member_account").then(res => {
				if (res.data.code == 0) {
					this.memberaccount = res.data.member_account
				}
			});
			this.$axios.get("/index/welfarecenter/invite_team").then((res) => {
			  if (res.data.code == 0) {
			    this.invite = res.data;
			  }
			});
			this.$axios.get("/index/welfarecenter/member").then((res) => {
			  if (res.data.code == 0) {
			    this.huiyuanlish = res.data.info;
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
		methods: {
			copyUrl2() {
				var Url2 = document.getElementById("biao1");
				Url2.select(); // 选择对象
				document.execCommand("Copy"); // 执行浏览器复制命令
				this.$toast.success({
					message: "复制成功",
					duration: 1200
				});
			},
			copyUrl3() {
				var Url2 = document.getElementById("biao2");
				Url2.select(); // 选择对象
				document.execCommand("Copy"); // 执行浏览器复制命令
				this.$toast.success({
					message: "复制成功",
					duration: 1200
				});
			},
			fn1(s, bool) {
				if (bool) {
						this.fn2(s)
					// if (jsBridge.ready()) {
					// 	this.fn2(s)
					// } else {
						// this.copyUrl2()
					// }
				} else {
					this.fn2(s)
					// if (jsBridge.ready()) {
					// 	this.fn2(s)
					// } else {
						// this.copyUrl3()
					// }
				}

			},
			fn2(s) {
				console.log(s)
				var clipboard = new this.$Clipboard(".copy", {
					text: () => {
						return s;
					}
				});
				clipboard.on("success", () => {
					this.$toast.success({
						message: "复制成功",
						duration: 1200
					});
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
			copy(s) {
				var clipboard = new this.$Clipboard(".copy", {
					text: () => {
						return s;
					}
				});
				clipboard.on("success", () => {
					this.$toast.success({
						message: "复制成功",
						duration: 1200
					});
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
			savecode1() {
				var ts = this;
			// if(jsBridge.ready()){
				jsBridge.ready(function() {
					jsBridge.saveImageToAlbum(ts.imgpng, function(succ) {
						succ ? ts.$toast.success({
							message: "保存成功",
							duration: 1200
						}) : ts.$toast.fail({
							message: "保存失败：转码失败或没有相册使用权限",
							duration: 1200
						});
					});
				});
			// }else{
				// if(ts.imgpng){
				// 		window.open(ts.imgpng)
					// }
			// }

			},
			savecode() {
				var ts = this;
				jsBridge.ready(function() {
					jsBridge.saveImageToAlbum(
						ts.$refs.imgsave.childNodes[1].toDataURL("image/png"),
						function(succ) {
							succ ? ts.$toast.success({
								message: "保存成功",
								duration: 1200
							}) : ts.$toast.fail({
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
	.img {
		width: 100%;
		height: 7.2rem;
	}

	.title {
		background-color: rgb(233, 236, 243);
		width: 90%;
		margin-top: -5px;
		padding: 0.07rem 5%;
		min-height: 6.5rem;

		.one {
			margin-top: -5px;
			background-color: #FFFFFF;
			min-height: 2.2rem;
			padding: .3rem .3rem 20px .3rem;

			text-align: center;

			#qrcode {
				// margin-left: 40%;
				margin: 0 auto;
				width: 100px;
				height: 100px;
			}

			p {
				font-size: 14px;

				.bun {
					font-size: 12px;
					padding: 1.5px 8px;
					background-color: rgb(213, 227, 255);
					border-radius: 9px;
				}
			}

			button {
				border-radius: 5px;
				height: 40px;
				line-height: 40px;
				margin: 30px auto 0;
			}
		}

	}

	.abcd {
		position: fixed;
		top: 0px;
		left: 0px
	}
	.item {
	  padding: 0.2rem 0 0.2rem 0.17rem;
	  display: flex;
	  background-color: #ffffff;
	  border-bottom: 2px solid #e8ecef;
	  .img {
	    width: 45px;
	    height: 40px;
	    border-radius: 50% 50%;
	    // margin-right: .16rem;
	    display: block;
	  }
	  .two {
		  text-align: left;
	    margin-left: 0.2rem;
	    color: rgb(40, 60, 103);
	    font-size: 13px;
	    flex: 1;
	    p {
	      margin-top: 0.14rem;
	      color: rgb(143, 145, 148);
	      font-size: 12px;
	    }
	  }
	  .three {
	    position: relative;
	    font-size: 13px;
	    color: rgb(83, 93, 95);
		  width: 65px;
		  text-align: right;
	    img {
	      position: absolute;
	      left: 28px;
	      top: 19px;
	      height: 24px;
	      width: 20px;
	    }
	  }
	}
	.title1{
		display: flex;
		justify-content: space-between;
		border-bottom: 2px solid #e8ecef;
		color: #000;
		padding: 0 3% 5px;
		width: 94%;
		
	}
</style>
