<template>
	<div class="addmetationadr">
		<div class="tophader" onclick="window.history.go(-1)">
			<van-icon name="arrow-left" />
			<p>{{$t('notecase.add')+$t('notecase.address')}}</p>
		</div>
		<p class="hr"></p>
		<ul>
			<li>
				<p>{{$t('notecase.currency')}}</p>
				<input type="text" class="metain" id="" value="USDT" disabled="disabled"/>
				<p class="hr"></p>
			</li>
			<li>
				<p>{{$t('notecase.name')}}</p>
				<input type="text" v-model="real_name" :placeholder="$t('user.pleaseInput')+$t('notecase.your')+$t('notecase.name')" />
				<p class="hr"></p>
			</li>
			<li>
				<p>{{$t('notecase.wallet')}}</p>
				<input type="text" v-model="address" :placeholder="$t('user.pleaseInput')+$t('notecase.your')+$t('notecase.wallet')" />
				<p class="hr"></p>
			</li>
		</ul>
		<div class="front">
			<input type="file" @change="upImg" accept="image/*">
			<img v-if="img" class="fleimg" :src="img" alt="">
			<img v-if="!img" src="../assets/icon_zhengjian@2x.png" alt="">
			<p v-if="!img">{{$t('notecase.withdrawal')}}</p>
		</div>
		<p @click="djxz" class="morenp">
			<img v-if="status==0" src="../assets/icon_weixuanze@2x.png" alt class="togle" />
			<img v-else src="../assets/icon_xuanze@2x.png" alt class="togle" />
			{{$t('notecase.defaults')}}
		</p>
		<button type="button" class="changebton" v-if="id" @click="send">{{$t('user.alter')}}</button>
		<button type="button" class="changebton" v-else @click="send">{{$t('user.Confirm')}}</button>
	</div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
	data(){
		return{
			img:'',
			real_name:'',
			address:'',
			status:1,
			id:''
		}
	},
	created(){
		this.id=this.$route.query.id
		if(this.id){
			this.$axios.get("/index/member/editWalletAddress?id="+this.id)
			.then(res=>{
				if(res.data.code==0){
					this.img=res.data.info.img;
					this.real_name=res.data.info.real_name;
					this.address=res.data.info.address;
					this.status=res.data.info.status;
				}
			})
		}
	},
	methods:{
		djxz() {
			this.status == 0 ? (this.status = 1) : (this.status = 0);
		},
		upImg(e){
			var ts = this;
			var file = e.target.files[0];
			if(!file) return;
			this.$toast.loading({message:this.$t('notecase.uploading'),duration:0,loadingType: 'spinner '});
			let fd = new FormData();
			fd.append("file", file);
			this.$axios.post("/index/Upload/uploadImg",fd)
			.then(res=>{
				if(res.data.code==0){
					this.img=res.data.data;
				}
				this.$toast.success({message:this.$t('notecase.uploadings'),duration:800});
			})
			.catch(err=>{
				this.$toast.fail({message:this.$t('notecase.uploadingload'),duration:1200});
			})
		},
		send(){
			if(!this.img||!this.real_name||!this.address) return this.$toast.fail({message:this.$t('user.Pleasecomplete'),duration:1200});
			var url="/index/member/addWalletAddress";
			if(this.id){
				url="/index/member/editWalletAddress";
			}
			this.$axios.post(url,{
				img:this.img,
				real_name:this.real_name,
				address:this.address,
				status:this.status,
				id:this.id
			})
			.then(res=>{
				if(res.data.code==0){
					this.$toast.success({message:res.data.msg,duration:1200});
					setTimeout(()=>{
						this.$router.back()
					},1400)
				}else{
					this.$toast.fail({message:res.data.msg,duration:1200});
				}
			})
		}
	},
	watch:{
		address(s){
			if(s){
				if(/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g.test(s)){
					this.$toast.fail({message:this.$t('notecase.Chinese'),duration:1200});
				}
				this.address=s.replace(/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g,'');
			}
		}
	},
	beforeDestroy(){
		this.$toast.clear();
	}
}


</script>

<style lang="less" scoped>
	@import url("../less/certification.less");
	.addmetationadr{
		.front{
			margin: .6rem auto 1rem;
		}
		li{
			.metain{
				color: #333333;
			}
		}
	}
	.front .fleimg{
		position: absolute;
		width: 100%;
		height: 100%;
		margin: 0;
	}
	.morenp {
		margin-top: 0.2rem;
	    padding-left: 0.3rem;
		.togle {
			margin-right: 0rem;
			width: 0.24rem !important;
			top: 0.01rem;
		}
	}
</style>
