<template>
	<div>
		<van-icon onclick="window.history.go(-1)" name="arrow-left" style="position: absolute;left: 5px;top: 5px;z-index: 100;" size="25px"
		 color="#ffffff" />
		<img style="width: 100%;height: 100%;position: relative;" src="../assets/baana6.png"/>
		<div class="body">
			<p>我的邀请码</p>
			<div>{{info}}</div>
			<button @click="fn1(info,true)">复制</button>
			<img src="../assets/banyuan.png" style="width: 100.5%;"/>
			<div id="qrcode" ref="imgsave">
				<img v-show="myimg" :src="img" alt />
			</div>
		</div>
		<div class="button">
			<div  @click="fn1(infourl,false)" >复制邀请链接</div>
			<div type="button" @click="savecode1" >生成邀请海报</div>
		</div>
		<!-- <img class="img" src="../assets/10099.png" />
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

		</div> -->
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
				ishow: false
			};
		},
		created() {
			console.log(navigator.userAgent)
			this.$axios.post("/index/member/getUserInfo").then(res => {
				if (res.data.code == 0) {
					if (res.data.info.is_need == 2) {
						this.ishow = true
					}
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
					if (!!navigator.userAgent.match(/citicbankmobile/i)) {
						this.fn2(s)
					} else {
						this.copyUrl2()
					}
				} else {
					if (!!navigator.userAgent.match(/citicbankmobile/i)) {
						this.fn2(s)
					} else {
						this.copyUrl3()
					}
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
							message: "保存成功",
							duration: 1200
						}) : ts.$toast.fail({
							message: "保存失败：转码失败或没有相册使用权限",
							duration: 1200
						});
					});
				});

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
	.button{
		position: absolute;
		width: 70%;
		bottom: 8%;
		display: flex;
		justify-content: space-between;
		left: 15%;
		div{
			width: 45%;
			border: 1px solid #FFFFFF;
			line-height: 30px;
			color: #FFFFFF;
			text-align: center;
			border-radius: 3px;
		}
	}
	.body{
		width: 70%;
		margin: 0 auto;
		position: absolute;
		height: 47%;
		background-color: #FFFFFF;
		top: 35%;
		left: 15%;
		border-radius: 6px;
		text-align: center;
		p{
			font-size: 13px;
			color: rgb(164,164,164);
			margin-top: 12px;
		}
		div{
			font-weight: 550;
			height: 40px;
			font-size: 26px;
			// color: rgb(78,90,237);
			margin-top: 12px;
			background: linear-gradient(to top, rgb(80,112,225), rgb(80,112,225));
			-webkit-background-clip: text;
			color: transparent;
			-webkit-text-fill-color: transparent;
			text-fill-color: transparent;
		}
		button{
			width: 70px;
			line-height: 26px;
			border-radius: 15px;
			font-size: 13px;
			color: #ffffff;
			margin: 14px 0;
			background-color: rgb(249,56,113);
		}
		#qrcode{
			width: 100px;
			height: 100px;
			margin: 0 auto;
			margin-top: 13px;
		}
	}
</style>
