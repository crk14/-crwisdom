<template>
	<div class="changeloginpass">
		<div class="tophader" onclick="window.history.go(-1)">
			<van-icon name="arrow-left" />
			<p>修改登录密码</p>
		</div>
		<p class="hr"></p>
		<ul>
			<li>
				<p>旧密码</p>
				<input type="password" v-model="oldpass" placeholder="请输入旧的密码" />
				<p class="hr"></p>
			</li>
			<li>
				<p>新登录密码</p>
				<input type="password" v-model="newpass" placeholder="请输入新的登录密码" />
				<p class="hr"></p>
			</li>
			<li>
				<p>确认密码</p>
				<input type="password" v-model="re_newpass" placeholder="请再次输入新的登录密码" />
				<p class="hr"></p>
			</li>
			<li>
				<p>验证码</p>
				<input type="text" v-model="code" placeholder="请输入您收到的短信验证码" />
				<span class="getcode" @click="setcode">发送验证码</span>
				<p class="hr"></p>
			</li>
		</ul>
		<button type="button" class="changebton" @click="send">确定修改</button>
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
					this.$toast.fail({message:'请填写完整',duration:1200});
					return;
				}
				if(this.newpass!=this.re_newpass) return this.$toast.fail({message:'两次密码不一致',duration:1200});
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
							this.$router.push("signlogin");
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
