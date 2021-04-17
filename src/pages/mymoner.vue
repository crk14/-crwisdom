<template>
	<div style="font-size: 14px;background-color: rgb(245,245,250);min-height: 100%;padding-bottom: 20px;">
		<div class="tophader">
		  <van-icon name="arrow-left" onclick="window.history.go(-1)"  color="#ffffff"/>
		  <p style="color: #ffffff;">{{$t('index.my')+$t('store.Performance')}}</p>
		</div>
		<van-pull-refresh
		  v-model="isLoading"
		  success-text="刷新成功"
		  @refresh="onRefresh"
		>
		<div :class="{'active':value1}" class="title">
			<span>{{$t('index.my')+$t('community.total')+$t('store.Performance')}}: {{total_money}} USDT</span>
			<span>{{$t('index.my')+$t('store.Performance')+$t('notecase.income')}}: {{total_num?total_num.toFixed(0):0}} USDT</span>
		</div>
	<p class="hr" style="padding: 0;background-color: rgb(230,231,235);"></p>
		<div class="item" v-for="(item,index) in list" :key="index">
		  <img class="img" :src="item.avatar" />
		  <div class="two" style="margin-left:8px;overflow: hidden;flex: 1;text-overflow: ellipsis;white-space: nowrap">
		    {{item.nick_name}} - {{item.robot_type==1?type1:item.robot_type==2?type4:item.robot_type==3?type2:item.robot_type==4?type3:type5}}
		 <p >{{$t('callcenter.amount')}}:{{item.robot_num}}{{$t('community.set')}}			
		 <span style="margin-left: 9px">{{$t('community.money')}}:{{item.pay_money}} {{item.money_types==1?'USDT':'CRW'}}</span>
		 <span style="margin-left: 9px;">{{item.remark}}:{{(item.num*1).toFixed(0)}} {{item.money_types==1?'USDT':'CRW'}}</span>
		 </p>
		  <p >{{$t('callcenter.buying')}}：{{item.create_time}} 		    <span style="margin-left: 5%;">{{item.level_name}}</span></p>
		  </div>
		 
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
			total_num:'',
			total_money:'',
			value1:0,
			isLoading:false,
			type1:this.$t('store.spot')+this.$t('store.profession') +this.$t('index.quantization')+this.$t('store.robot')+'('+this.$t('store.Term')+')',
			type2:this.$t('store.Strategy')+ this.$t('store.following')+this.$t('store.robot')+'('+this.$t('store.spot')+'/'+this.$t('store.swap')+')',
			type3:this.$t('store.spot')+this.$t('store.intelligent') +this.$t('index.quantization')+this.$t('store.robot')+'('+this.$t('store.XLMT')+')',
			type4:this.$t('store.swap')+this.$t('store.profession') +this.$t('index.quantization')+this.$t('store.robot')+'('+this.$t('store.Term')+')',
			type5:this.$t('store.swap')+this.$t('store.intelligent') +this.$t('index.quantization')+this.$t('store.robot')+'('+this.$t('store.XLMT')+')',
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
			  let str;
			  str = 'contribute'
			  this.$axios
			  	.post(`/index/robot/${str}`)
			  	.then(res => {
			  		if(res.data.code == 0){
			  			this.list = res.data.data
			  			this.total_num = res.data.total_num
			  			this.total_money = res.data.total_money
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
	.title{
		    display: flex;
		    justify-content: space-between;
		    margin: 0.2rem 0 0.2rem 0.2rem;
			font-size:14px;
	}
	.active{
		font-size:12px;
		margin: 0.2rem 0 0.2rem 0;
	}
	.tophader{
		background-color: rgb(14,138,254);
	}
	.item {
	  padding: 0.2rem 0.17rem;
	  display: flex;
	  background-color: #ffffff;
	  border-bottom: 8px solid #e8ecef;
	  .img {
	    width: 45px;
	    height: 40px;
	    border-radius: 50% 50%;
	    // margin-right: .16rem;
	    display: block;
	  }
	  .two {
	    margin-left: 0.2rem;
	    color: rgb(40, 60, 103);
	    font-size: 15px;
	    flex: 1;
	    p {
	      margin-top: 5px;
	      color: rgb(143, 145, 148);
	      font-size: 13px;
	    }
	  }
	 
	}
</style>
