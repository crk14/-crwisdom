<template>
	<div style="overflow-y: auto;">

		<div v-show="isshow">
			<van-icon onclick="window.history.go(-1)" name="arrow-left" style="position: absolute;left: 5px;top: 5px;" size="25px"
			 color="#ffffff" />
			<span @click="isshow=false" class="fx-s">{{$t('index.community')}}
			</span>
			<van-icon @click="isshow=false" name="arrow" style="position: absolute;right: 5px;top: 12px;" color="#ffffff" />
			<img class="img" src="../assets/10099.png" />
			<div class="title">
				<img style="width: 100%;" src="../assets/10010.png" />
				<div class="one">
					<div id="qrcode" ref="imgsave">
						<img v-show="myimg" :src="img" alt />
					</div>
					<p style="margin:15px 0">
						{{$t('spot.Invitation')}}:
						<span @click="fn1(info,true)" class="codes">{{info}} <span class="bun">{{$t('spot.copy')}}</span> </span>
					</p>
					<p class="p" :class="{'active':value1==2}">
						{{$t('spot.link')}}:
						<span class="codes" style="display: flex;"><span style="overflow:hidden;
					  text-overflow:ellipsis;
					  white-space:nowrap;width: 110px;">{{infourl}}</span><span
							 class="bun" @click="fn1(infourl,false)">{{$t('spot.copy')}}</span> </span>
					</p>
					<button type="button" @click="savecode1" class="changebton">{{$t('spot.poster')}}</button>
				</div>
			</div>
			<img v-show="bool" style="width: 100%;" src="https://crzhapp.com//uploads/qrcode/qrcode_202002706.jpg" width="90%" id="testImg">
			<textarea cols="20" rows="10" id="biao1" style="opacity: 0;height: 1px;">{{info}}</textarea>
			<textarea cols="20" rows="10" id="biao2" style="opacity: 0;height: 1px;">{{infourl}}</textarea>
		</div>
		<div v-show="!isshow">
			<van-icon name="arrow-left" style="    width: 1rem;
		 position: absolute;left: 5px;top: 5px;" size="25px" color="#fff"
			 @click="$route.query.type?$router.push('my'):isshow=true" />
			<img class="fx-img" src="../assets/3-16.png" />
			<span @click="$router.push('refund')" class="fx-s">{{$t('spot.details')}}</span>
			<van-icon @click="$router.push('refund')" name="arrow" 
			style="position: absolute;right: 5px;top: 12px;" color="#ffffff" />
			<div class="fx-div">
				<button :class="{'active':value1==1,'active1':value1==2}" >
					<div style="margin-right: 10px;"></div>
					{{$t('spot.Straight')}}
					<div style="margin-left: 10px;"></div>
				</button>
				<div class="one">
					<div class="left left1">
						<p>{{invite.active?invite.active:0}}</p>
						<div>{{$t('callcenter.activated')}}({{$t('spot.position')}})</div>
						<p class="p">{{invite.no_active?invite.no_active:0}}</p>
						<div>{{$t('callcenter.inactive')}}({{$t('spot.position')}})</div>
					</div>
					<div class="left left1">
						<p>{{invite.today_profit?invite.today_profit.toFixed(2):0}}</p>
						<div>{{$t('spot.earnings')}}</div>
						<p class="p">{{invite.all_profit?invite.all_profit.toFixed(2):0}}</p>
						<div>{{$t('spot.Earnings')}}</div>
					</div>
					<div class="left">
						<p>{{invite.today_reward?invite.today_reward.toFixed(2):0}}</p>
						<div >{{$t('spot.Bonus')}}</div>
						<p class="p">{{invite.all_reward?invite.all_reward.toFixed(2):0}}</p>
						<div>{{$t('spot.returns')}}</div>
					</div>
				</div>
			</div>
			<div class="fx-div" style="top: 35%;">
				<button :class="{'active3':value1==1,'active2':value1==2}">
					<div style="margin-right: 10px;"></div>
					{{$t('spot.Username')}}
					<div style="margin-left: 10px;"></div>
				</button>
				<div class="one">
					<div class="left left1">
						<p>{{community.active?community.active:0}}</p>
						<div>{{$t('callcenter.activated')}}({{$t('spot.position')}})</div>
						<p class="p">{{community.no_active?community.no_active:0}}</p>
						<div>{{$t('callcenter.inactive')}}({{$t('spot.position')}})</div>
					</div>
					<div class="left left1">
						<p>{{community.today_profit?community.today_profit.toFixed(2):0}}</p>
						<div>{{$t('spot.earnings')}}</div>
						<p class="p">{{community.all_profit?community.all_profit.toFixed(2):0}}</p>
						<div>{{$t('spot.Earnings')}}</div>
					</div>
					<div class="left">
						<p>{{community.today_reward?community.today_reward.toFixed(2):0}}</p>
						<div>{{$t('spot.Bonus')}}</div>
						<p class="p">{{community.all_reward?community.all_reward.toFixed(2):0}}</p>
						<div>{{$t('spot.returns')}}</div>
					</div>
				</div>
			</div>
			<div class="fx-div" style="top: 53%;border: 15px solid rgb(81,143,255);left: 0;border-radius: 20px 20px 0 0;">
				<button class="button" :class="{'active':value1==1,'active2':value1==2}">
					<div style="margin-right: 10px;"></div>
					{{$t('spot.invitation')}}
					<div style="margin-left: 10px;"></div>
				</button>
				<p style="margin-top: 20px;height: 1.4px;background: rgb(235,235,235);"></p>
				<div class="item" v-for="(item,index) in huiyuanlish" :key="index">
					<img class="img" :src="item.avatar" />
					<div class="two" style="margin-left:2px;overflow: hidden;flex: 1;text-overflow: ellipsis;white-space: nowrap">
						{{item.nick_name}}-{{item.mobile?item.mobile:item.email}}
						<p style="margin-top: .1rem;">{{$t('spot.Rtime')}}：{{item.register_time}}</p>
					</div>
					<div class="three">
						<img v-if="item.is_need ==2" src="../assets/111.png" />
						<img v-if="item.is_need ==1" src="../assets/301.png" />
						<span>{{item.is_need == 2?item.level_name:$t('index.Registered')}}</span>
					</div>
				</div>
			</div>
		</div>
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
				isshow: true,
				community: {},
				bool:false,
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
			if (this.$route.query.type) {
				this.isshow = false
				this.$axios.get("/index/welfarecenter/member").then((res) => {
					if (res.data.code == 0) {
						this.huiyuanlish = res.data.info.reverse();
					}
				});
			} else {
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
				this.$axios.get("/index/welfarecenter/member").then((res) => {
					if (res.data.code == 0) {
						this.huiyuanlish = res.data.info;
					}
				});

			}


			this.$axios.get("/index/welfarecenter/invite_team").then((res) => {
				if (res.data.code == 0) {
					this.invite = res.data.info.direct;
					this.community = res.data.info.community
				}
			});


		},
		mounted() {

		},
		methods: {
			save(){
				  var img = document.getElementById("testImg");
				
				    var alink = document.createElement("a");
				
				    alink.href = img.src;
				
				    alink.click();
			},
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
					this.copyUrl2()
				} else {
					
					this.fn2(s)
					this.copyUrl3()
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
				jsBridge.ready(function() {
					jsBridge.saveImageToAlbum(ts.imgpng, function(succ) {
						succ ? ts.$toast.success({
							message: "已生成海报保存至相册",
							duration: 1200
						}) : ts.$toast.fail({
							message: "保存失败：转码失败或没有相册使用权限",
							duration: 1200
						});
					});
				});
				    var u = navigator.userAgent;
					// let app = navigator.appVersion;
				
				    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
				    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				    if (isAndroid) {
				       //这个是安卓操作系统
					   console.log(99,u)
				    }
				    if (isIOS) {
						this.bool = true
						setTimeout(()=>{
							document.documentElement.scrollTop = document.documentElement.scrollHeight
						},500)
								// window.open(ts.imgpng)
				　　　　//这个是ios操作系统
				    }
				
				

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

	.fx-s {
		position: absolute;
		right: 20px;
		top: 8px;
		color: #fff;
		font-size: 17px;
	}

	.fx-img {
		width: 100%;
	}

	.fx-div {
		position: absolute;
		right: 20px;
		width: 88%;
		left: 4%;
		top: 17%;
		text-align: left;
		background: #fff;
		padding: 3% 2%;
		border-radius: 5px;
		min-height: 2.5rem;
		.button{
			top: -14px;left: 28%;
		}
		button {
			display: flex;
			position: absolute;
			top: -9%;
			left: 32%;

			border-radius: 2px;
			padding: 0 13px;
			background: rgb(253, 116, 94);
			color: #fff;
			line-height: 27px;

			div {
				width: 6px;
				height: 6px;
				border-radius: 50%;
				background: rgb(252, 201, 63);
				margin: 10px 0;
			}
		}
		.active{
			left: 20%;
		}
		.active1{
			left: 19%;
		}
		.active2{
			left: 25%;
		}
		.active3{
			left: 24%;
		}
		
		.one {
			display: flex;
			background: #fff;
			border-radius: 4px;
			margin: 15px 0px 0;
			text-align: center;
			
			.left {
				flex: 1;

				p {
					color: rgb(253, 116, 94);
					font-size: 19px;
				}

				div {
					color: #949494;
					font-size: 13px;
				}

				.p {
					margin-top: 15px;
				}
			}

			.left1 {
				border-right: 1.2px dotted rgb(198, 198, 198);
			}


		}
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
			.p{
				display: flex;margin-left: 10%;margin-top: 3px;
			}
			.active{
				margin-left: 0;
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
		border-bottom: 1.4px solid rgb(235, 235, 235);

		.img {
			width: 41px;
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

	.title1 {
		display: flex;
		justify-content: space-between;
		border-bottom: 2px solid #e8ecef;
		color: #000;
		padding: 0 3% 5px;
		width: 94%;

	}
</style>
