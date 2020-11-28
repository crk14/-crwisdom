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
			// this.$axios.get("/index/rank/get_share_rank").then(res => {
			// 	if (res.data.code == 0) {
			// 		this.list = res.data.data
			// 		// this.memberaccount = res.data.member_account
			// 	}
			// });
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
				if (!!navigator.userAgent.match(/citicbankmobile/i)) {
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
				} else {
					if(ts.imgpng){
						window.open(ts.imgpng)
					}
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

	.title {
		background-color: rgb(233, 236, 243);
		width: 90%;
		margin-top: -5px;
		padding: 0.07rem 5%;
		min-height: 8.3rem;

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
</style>
