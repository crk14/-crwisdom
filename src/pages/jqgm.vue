<template>
	<div style="font-size: 14px;background-color: rgb(245,245,250);min-height: 100%;padding-bottom: 20px;">
		<div class="tophader">
		  <van-icon name="arrow-left" onclick="window.history.go(-1)"  color="#ffffff"/>
		  <p style="color: #ffffff;">{{$t('store.buy')+$t('index.record')}}</p>
		</div>
		<van-pull-refresh
		  v-model="isLoading"
		  success-text="刷新成功"
		  @refresh="onRefresh"
		>
		<div class="item" v-for="(item,index) in list" :key="index">
			<img src="../assets/sc002.png" />
			<div >
				<p :class="{'active1':value1}" style="margin-bottom: 7px;">{{item.robot_type==1?type1:item.robot_type==2?type4:item.robot_type==3?type2:item.robot_type==4?type3:type5}}</p>
				<p class="p1">{{$t('callcenter.amount')}}: 1{{$t('callcenter.Entries')}}</p>
				<p class="p1" v-if="item.robot_type!=3">{{$t('callcenter.duration')}}: {{item.enable_time*30}} {{$t('store.day')}}</p>
				<p class="p1">{{$t('callcenter.buying')}}: {{item.create_time}}</p>
				<p class="p1" v-show="item.active_time">{{$t('callcenter.activation')}}: {{item.active_time}}</p>
				<p class="p1">{{$t('callcenter.payment')}}: {{item.pay_money}} {{item.money_types==1?'USDT':item.money_types==2?'CRW':$t('store.Shopping')}}</p>
				<p class="p2">{{$t('callcenter.completion')}}</p>
			</div>
			<div v-show="!item.probation" :class="{'active':item.active == 1}" class="i-t">{{item.active==0?$t('callcenter.inactive'):$t('callcenter.activated')}}</div>
		</div>
		<p v-show="!list.length" style="color: #999;text-align: center;line-height: 40px;">{{$t('community.available')}}</p>
		</van-pull-refresh>
	</div>
</template>

<script>
	export default {
	  data() {
	    return {
			list:[],
			value:0,
			isLoading:false,
		type1:this.$t('store.spot')+this.$t('store.profession') +this.$t('index.quantization')+this.$t('store.robot')+'('+this.$t('store.Term')+')',
		type2:this.$t('store.Strategy')+ this.$t('store.following')+this.$t('store.robot')+'('+this.$t('store.spot')+'/'+this.$t('store.swap')+')',
		type3:'现货合约量化机器人(套餐)',
		type4:this.$t('store.swap')+this.$t('store.profession') +this.$t('index.quantization')+this.$t('store.robot')+'('+this.$t('store.Term')+')',
		type5:this.$t('store.swap')+this.$t('store.intelligent') +this.$t('index.quantization')+this.$t('store.robot')+'('+this.$t('store.XLMT')+')',
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
	  	this.start()
	  },
	  methods:{
		  onRefresh(){
		  		  this.start()
		  	  setTimeout(() => {
		  	        this.isLoading = false;
		  	      }, 1000);
		  	},
			start(){
				this.$axios
					.post("/index/robot/robot_record")
					.then(res => {
						if(res.data.code == 0){
							this.list = res.data.data
						}else{
							this.$toast.fail({
								message: res.data.data,
								duration: 3200
							});
						}
					})
			}
	  }
	  
	};
</script>

<style lang="less" scoped>
	.tophader{
		background-color: rgb(14,138,254);
	}
	.item{
		margin: .22rem .28rem 0 .28rem;
		padding: .2rem 0 .2rem .22rem;
		display: flex;
		background-color: #FFFFFF;
		position: relative;
		overflow: hidden;
		.i-t{
			position: absolute;
			    font-size: 0.2rem;
			    width: 63px;
			    height: 20px;
			    line-height: 20px;
			    color: #fff;
			    background-color: rgb(254,147,30);
			    text-align: center;
			    right: -16px;
			    -webkit-transform: rotate(50deg);
			    transform: rotate(50deg);
			
		}
		.active{
			background-color: rgb(254,51,30);
		}
		img{
			width: 100px;
			height: 105px;
			border-radius: 12px;
		}
		div{
			margin-left: 12px;
			flex: 1;
			.active1{
				width: 86%;
				word-break: break-all;
			}
			p{
				font-size: 14px;
				line-height: 16px;
			}
			.p1{
				font-size: 12px;
				color: rgb(144,144,144);
			}
			.p2{
				text-align: right;
				color: rgb(65,182,111);
				margin-right: 12px;
			}
			.p3{
				font-size: 12px;
				line-height: 12px;
				margin-bottom: 5px;
				// transform: scale(0.9);
			}
		}
	}
</style>
