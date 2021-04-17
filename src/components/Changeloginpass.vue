<template>
	<div class="changeloginpass">
		<div class="tophader" onclick="window.history.go(-1)">
			<van-icon name="arrow-left" />
			<p>{{$t('user.alter')+$t('user.loginP')}}</p>
		</div>
		<p class="hr"></p>
		<ul>
			<li>
				<p>{{$t('user.oldP')}}</p>
				<input type="password" v-model="oldpass" :placeholder="$t('user.pleaseInput')+$t('user.oldP')" />
				<p class="hr"></p>
			</li>
			<li>
				<p>{{$t('user.news')+$t('user.loginP')}}</p>
				<input type="password" v-model="newpass" :placeholder="$t('user.pleaseInput')+$t('user.news')+$t('user.loginP')" />
				<p class="hr"></p>
			</li>
			<li>
				<p>{{$t('user.confirmP')}}</p>
				<input type="password" v-model="re_newpass" :placeholder="$t('user.pleaseInputTwo')+$t('user.news')+$t('user.loginP')" />
				<p class="hr"></p>
			</li>
			<li>
				<p>{{$t('user.authcode')}}</p>
				<input type="text" v-model="code" :placeholder="$t('user.verification')" />
				<span class="getcode" @click="setcode">{{$t('user.getcode')}}</span>
				<p class="hr"></p>
			</li>
		</ul>
		<button type="button" class="changebton" @click="send">{{$t('user.Confirm')+ ''+$t('user.alter')}}</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isclick:true,
				oldpass:'',
				newpass:'',
				re_newpass:'',
				code:'',
			}
		},
		methods:{
		    // 获取验证码
			setcode(e) {
				var ts = this;
				if (ts.isclick) {
					ts.isclick = false;

				this.$axios.post("/index/member/sendChange")
				.then(res=>{
						if(res.data.code==0){
							this.$toast.success({message:res.data.msg,duration:1200});
							var tiem = 60;
							e.target.innerText = tiem + "s";
							var timeover = setInterval(function() {
								tiem -= 1;
								e.target.innerText = tiem + "s";
								if (tiem <= 0) {
								e.target.innerText = "获取验证码";
								clearInterval(timeover);
								ts.isclick = true;
								}
							}, 1000);
						}else{
							this.$toast.fail({message:res.data.msg,duration:1200});
						}
					})
				}
			},
			send() {
				if(!this.oldpass||!this.newpass||!this.re_newpass||!this.code){
					this.$toast.fail({message:this.$t('user.Pleasecomplete'),duration:1200});
					return;
				}
				if(this.newpass!=this.re_newpass) return this.$toast.fail({message:this.$t('user.donmatch'),duration:1200});
				this.$axios
				.post("/index/member/ChangePassword", {
					oldpass:this.oldpass,
					newpass:this.newpass,
					re_newpass:this.re_newpass,
					code:this.code,
				})
				.then(res => {
					if(res.data.code==0){
						this.$toast.success({message:res.data.msg,duration:1200});
						setTimeout(()=>{
							this.$router.push("login");
						},1600)
					}else{
						this.$toast.fail({message:res.data.msg,duration:1200});
					}
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url("../less/changedealpass.less");
</style>
