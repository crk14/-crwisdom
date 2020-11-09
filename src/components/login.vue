<template>
	<div style="position: relative;width: 100%;height: 100%;overflow:initial;background-color: #f6f6f6;">
		<div class="login-t">
			<div class="tophader">
				<van-icon name="arrow-left" onclick="window.history.go(-1)" color="#ffffff" />
				<p>登录</p>

			</div>
		</div>
		<div class="login-b">
			<img src="../assets/logo7.png" />
			<p class="p">JUW量化</p>
			<div class="p1">
				<div></div>
				专业<span style="margin: 0 5px;">专注</span>高效
				<div></div>
			</div>
			<div class="login-body">
				<div class="one">
					<span class="left">
						<span class="img"></span>
						登录
					</span>
					<span @click="$router.push('sign')">注册</span>
				</div>
				<div class="togleulbox" style="margin: 0 .32rem;">
					<div class="loginul">
						<div style="margin-top: 0rem;background: #f6f6f6;border-radius: 7px;display: flex;line-height: 46px;margin-bottom: 13px;">
							<p style="margin: 0 29px 0 10px;color: #000;">账号</p>
							<input style="margin: 0;flex: 1;" type="text" autocomplete="off" name="userName" v-model="logmobile" placeholder="请输入手机号或邮箱" />
						</div>
						<div style="margin-top: 0.2rem;background: #f6f6f6;border-radius: 7px;display: flex;line-height: 46px;">
							<p style="margin: 0 29px 0 10px;color: #000;">密码</p>
							<input style="margin: 0;flex: 1;" type="password" autocomplete="new-password" name="password" v-model="logpassword" placeholder="请输入密码" />
						</div>
						<div class="pass" >
							
						<label style="height: 0px;">
							<input type="checkbox" v-model="ispass" style="margin: 0;height: 10px;">
							<span class="box">
								<van-icon :style="{opacity:ispass?1:0}" name="success" color="#306ce8" /></span> <span class="text">记住密码</span>
						</label>
								<p class="passback" @click="$router.push('/forgetpass')" style="color: #000000;font-size: .27rem;margin-top: -4px;">忘记密码?</p>
						</div>

						<button type="button" class="changebton" @click="login" style="margin: 0.8rem auto .35rem;background: #2e83f7;border-radius: 5px;width: 100%;">登录</button>
						<a href="https://sapp.dierna.com/NFzu" style="margin: 18px 0 10px 0px;color: #2e83f7;font-size: 14px;display: block;">下载APP</a>
						<p style="height: 1px;"></p>
					</div>
				</div>
			</div>
		</div>


	</div>
</template>

<script>
	import Vue from 'vue';
	import {
		Button
	} from 'vant';

	Vue.use(Button);
	export default {
		components: {
			Button
		},
		data() {
			return {
				logmobile: "",
				logpassword: "",
				ispass: 0,
				ispass2: '',
				bool: false,
				bool2: false
			};
		},
		created() {
			if (this.$route.query.id) {
				this.invite_code = this.$route.query.id;
				this.istogle = 1;
			}
			if (this.getCookie("logmobile")) {
				this.logmobile = this.getCookie("logmobile");
				this.logpassword = this.getCookie("logpassword");
				this.ispass = true;
			}
			this.ispass2 = this.ispass
		},
		methods: {
			ismobile(s) {
				var regPhone = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
				var patternPhone = new RegExp(regPhone);
				if (patternPhone.test(s)) {
					return true;
				} else {
					return false;
				}
			},
			login() {
				if (!this.logmobile || !this.logpassword)
					return this.$toast.fail({
						message: "请填写完整",
						duration: 1200
					});
				// if (this.ispass2 == 0) {
				// 	return this.$toast.fail({
				// 		message: "请阅读协议",
				// 		duration: 1200
				// 	});
				// }
				let email = this.logmobile;
				let type;
				let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
				if (reg.test(email)) {
					// alert("邮箱格式正确");
					type = 2
				} else {
					type = 1
				}
				this.$toast.loading({
					message: "正在登录",
					duration: 0,
					loadingType: "spinner "
				});
				this.$axios
					.post("/index/Publics/login", {
						mobile: this.logmobile,
						password: this.logpassword,
						type,
					})
					.then(res => {
						if (res.data.code == 0) {
							
								if (this.ispass) {
									this.setCookie("logmobile", this.logmobile);
									this.setCookie("logpassword", this.logpassword);
								} else {
									this.setCookie("logmobile", "");
									this.setCookie("logpassword", "");
								}
							
							this.$toast.success({
								message: res.data.msg,
								duration: 1200
							});
							setTimeout(() => {
								this.$router.push("/");
							}, 1200);
						} else {
							this.$toast.fail({
								message: res.data.msg,
								duration: 1200
							});
						}
					})
					.catch(err => {
						this.$toast.fail({
							message: "登录失败",
							duration: 1200
						});
					});
			},

			setCookie(name, value) {
				var exp = new Date();
				exp.setTime(exp.getTime() + 7 * 24 * 60 * 60 * 1000);
				document.cookie =
					name + "=" + escape(value) + ";expires=" + exp.toGMTString();
			},
			getCookie(name) {
				var arr,
					reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
				if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
				else return null;
			}
		}
	};
</script>

<style lang="less" scoped>
	@import url("../less/login.less");

	.login-t {
		background-color: #2e83f7;

		height: 140px;

		.tophader {
			background-color: #2e83f7;

			p {
				color: #FFFFFF;
				font-weight: normal;
			}
		}
	}

	.login-b {
		background-color: rgb(246, 246, 246);
		text-align: center;

		img {
			margin-top: -50px;
			border-radius: 50%;
			height: 100px;
			width: 100px;
		}



		.p {
			color: rgb(34, 34, 34);
			font-weight: bold;
			font-size: 18px;
			margin: 9px 0 0 0;
		}

		.p1 {
			display: flex;
			color: rgb(34, 34, 34);
			justify-content: center;
			font-size: 14px;
			margin: 21px 0;
			font-weight: bold;

			div {
				width: 35px;
				background-color: rgb(34, 34, 34);
				height: 1.3px;
				margin: 0 11px;
				margin-top: 9px;
			}
		}
	}
	.loginul .pass {
		display: flex;
		justify-content: space-between;
		margin-top: 0.3rem;
		width: 100%;
		text-align: right;
		a {
			position: relative;
			top: -0.29rem;
		}

		label {
			// width: 40%;
			position: relative;
			color: rgb(48, 108, 232);
		}

		.text {
			position: relative;
			font-size: 0.29rem;
			top: -0.08rem;
			left: 0.1rem;
		}

		.box {
			border: 2px solid rgb(48, 108, 232);
			font-size: 0.3rem;
			height: 10px;
			text-align: center;
			line-height: 10px;
			width: 10px;
			display: inline-block;
			border-radius: 50%;
			position: relative;
			top: -2px;
		}

		input {
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: 1;
			opacity: 0;
		}
	}

	.login-body {
		width: 90%;
		margin: 0 auto;
		z-index: 1000;
		background-color: #FFFFFF;
		border-radius: 23px;

		.one {
			color: rgb(148, 148, 148);
			margin-left: 17px;
			margin-bottom: 17px;
			padding-top: 17px;

			.left {
				margin-right: 42%;
				color: rgb(51,134,234);
				position: relative;

				.img {
					position: absolute;
					left: -3px;
					top: 24px;
					width: 39px;
					height: 2px;
					border-radius: 6px;
					background-color: rgb(51,134,234);
				}
			}
		}

		input {
			margin: 0.2rem 0 0.4rem .1rem;
		}

		input::-webkit-input-placeholder,
		textarea::-webkit-input-placeholder {
			color: rgb(148, 148, 148);
		}
	}

	.loginul .pass .van-icon {
		position: absolute;
		left: 0;
		top: -1px;

	}
</style>
