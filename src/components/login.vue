<template>
	<div style="position: relative;width: 100%;height: 100%;overflow:initial;">
		<img src="../assets/1311.png" style="width: 100%;height: 4rem;" />
		<img src="../assets/1313.png" style="position: absolute;left: 0.3rem;top: 0.15rem;width: .9rem;height: .9rem;" />
	<!-- 	<van-dropdown-menu>
		  <van-dropdown-item v-model="value1" :options="option1" @change="changeLanguage"/>
		</van-dropdown-menu> -->
		<div class="login-body">
			<div class="one">
				<span @click="$router.push('sign')">{{$t('user.register')}}</span>
				<span class="left">
					<span class="img"></span>
					{{$t('user.login')}}</span>
			</div>
			<div class="togleulbox" style="margin: 0 .2rem;">
				<div class="loginul">
					<div style="margin-top: 0rem;">
						<input type="text" autocomplete="off" name="userName" v-model="logmobile" :placeholder="$t('user.loginUsername')" />
						<p class="hr"></p>
					</div>
					<div style="margin-top: 0.2rem;">
						<input type="password" autocomplete="new-password" name="password" v-model="logpassword" :placeholder="$t('user.enterPassword')" />
						<p class="hr"></p>
					</div>
					<div class="pass">
						<label >
							<input type="checkbox" v-model="ispass" style="margin: 0;height: .3rem;">
							<span class="box">
								<van-icon :style="{opacity:ispass?1:0}" name="success" color="#306ce8" /></span> <span class="text" :class="{'sizeactive':value1}">{{$t('user.remenberP')}}</span>
						</label>
						<router-link to="/forgetpass" style="    width: auto;">
							<p class="passback" style="color: #8a8a8a;" :class="{'sizeactive':value1}">{{$t('user.forgetP')}}?</p>
						</router-link>
					</div>
					<div class="pass" style="margin-top: .1rem;;position: absolute;">
						<label style="width: 0;">
							<input type="checkbox" v-model="ispass2" style="width: .6rem;height: .6rem;">
						</label>
						<span class="box">
							<van-icon :style="{opacity:ispass2?1:0}" name="success" color="#306ce8" /></span> <span style="font-size: 12px;color: #000000;margin-top: -3px;margin-left: 3px;">{{$t('user.readAgree')}}<span
							 @click="bool = true" style="color:rgb(64,115,231)">《{{$t('user.userAgreement')}}》</span><span @click="bool2 = true" style="color:rgb(64,115,231)">《{{$t('user.riskwarning')}}》</span></span>
					</div>
					<button type="button" class="changebton" @click="login" style="margin: 1.45rem auto .35rem;background: rgb(48,108,232);border-radius: .7rem;width: 100%;">{{$t('user.login')}}</button>
					<a class="linka" href="https://tap.dierna.com/eYvM" style="padding-top: .36rem;">
						<div></div>
						<p style="color: rgb(48,108,232);font-size: .3rem;">APP {{$t('user.download')}}</p>
						<div></div>
					</a>
				</div>
			</div>
		</div>
		<usera :bool="bool" @func="fn4"></usera>
		<warning :bool="bool2" @func="fn5"></warning>
	</div>
</template>

<script>
	import Vue from 'vue';
	import {
		Button
	} from 'vant';
	import usera from '../modu/usera.vue'
	import warning from '../modu/warning.vue'
	Vue.use(Button);
	export default {
		components: {
			Button,
			usera,
			warning
		},
		data() {
			return {
				logmobile: "",
				logpassword: "",
				ispass: 0,
				ispass2: '',
				bool: false,
				bool2: false,
				  value1: 0,
				      option1: [
				        { text: '中文', value: 0,icon:'https://d.lanrentuku.com/down/png/1004/flags/China.png'},
				        { text: 'English', value: 1,icon:'https://d.lanrentuku.com/down/png/1004/flags/Groritannien.png' },
				        { text: '한글', value: 2,icon:'https://d.lanrentuku.com/down/png/1004/flags/korea.png' },
				      ],
			};
		},
		created() {
			let value = localStorage.getItem('languageSet')
			if(value){
				if(value== 'en'){
					this.value1 = 1
				}else if(value== 'hy'){
					this.value1 =2
					}
			}
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
			fn4(data){
				this.bool = false
			},
			fn5(data){
				this.bool2 = false
			},
			
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
						message: this.$t('user.Pleasecomplete'),
						duration: 1200
					});
				// if (!this.ismobile(this.logmobile))
				//   return this.$toast.fail({
				//     message: "手机号码格式不正确",
				//     duration: 1200
				//   });

				if (this.ispass2 == 0) {
					return this.$toast.fail({
						message: this.$t('user.readAgreement'),
						duration: 1200
					});
				}
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
					message: this.$t('user.Islanding'),
					duration: 0,
					loadingType: "spinner"
				});
				this.$axios
					.post("/index/publics/login", {
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
							message:this.$t('user.loginfailure'),
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
			},
			changeLanguage(){
				let str 
				if(this.value1 == 1){
					str = 'en'
				}else if(this.value1 == 2){
					str = 'hy'
				}else{
					str = 'zh'
				}
				this.$i18n.locale=str
				localStorage.setItem('languageSet',str) 
			           
			        },
		},
		
	};
</script>

<style lang="less" scoped>
	@import url("../less/login.less");

	.login-img {
		// background:url(../assets/logo1.png);
		// background-size:cover;
		// border-radius: 0px 0px 68px 68px;
		width: 100%;
		text-align: center;

		img {
			height: 3rem;
			width: 3rem;
			margin-top: 0px;
		}

	}

	.headtop {
		text-align: left;
	}
	.loginul .pass {
		display: flex;
		justify-content: space-between;
		margin-top: 0.3rem;

		a {
			position: relative;
			// top: -0.29rem;
			p{
				margin: 0;
			}
		}

		label {
			// width: 40%;
			position: relative;
			color: rgb(48, 108, 232);
		}

		.text {
			position: relative;
			// font-size: 0.29rem;
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

	.linka {
		margin: auto;
		line-height: .7rem;
		text-align: center;
		border-radius: 53%;
		// width: 2rem;
		height: .7rem;
		display: flex;
		justify-content: center;

		div {
			width: 52px;
			background-color: #3693fe;
			height: 2px;
			margin-top: 15px;

		}

		p {
			margin: 0 10px;
		}
	}

	.login-body {
		width: 90%;
		// height: 74%;
		// border: 1px solid #EEEEEE;
		margin: 0 auto;
		z-index: 1000;
		background-color: #FFFFFF;

		// border-radius: 10px;
		// box-shadow: 10px 10px 20px 10px #e5e5e7, 4px 20px 10px 10px rgba(255,255,255,0.5) 
		.one {
			color: rgb(148, 148, 148);
			margin-left: 17px;
			margin-bottom: 37px;

			.left {
				margin-left: 25px;
				font-weight: 550;
				color: #000000;
				// border-bottom: 2px solid rgb(78,108,247);
				position: relative;

				.img {
					position: absolute;
					left: 9px;
					top: 24px;
					width: 20px;
					height: 4px;
					border-radius: 6px;
					background-color: rgb(78, 108, 247);
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

	
	/deep/.van-dropdown-menu{
		    width: 50%;
		    margin-left: 50%;
			.van-dropdown-menu__bar{
				height: 36px;
				}
				.van-dropdown-item{
					width: 50%;
					margin-left: 50%;
				}
		}
		
</style>
