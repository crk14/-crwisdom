<template>
	<div style="font-size: 14px;background-color: rgb(245,245,250);min-height: 100%;padding-bottom: 20px;">
		<div class="tophader">
		  <van-icon name="arrow-left" onclick="window.history.go(-1)"  color="#ffffff"/>
		  <p style="color: #ffffff;">历史记录</p>
		</div>
		<van-pull-refresh
		  v-model="isLoading"
		  success-text="刷新成功"
		  @refresh="onRefresh"
		>
		
	<p class="hr" style="padding: 0;background-color: rgb(230,231,235);"></p>
	<div class="two" >
		<select name="public-choice" v-model="value"  style="color: rgb(169, 173, 182)">
			<option value="time">时间顺序</option>
			<option value="deal">交易明细</option>
			<option value="transfer">充值/转账</option>
			<option value="reward">返佣记录</option>
			<!-- <option value="num">数量大小</option> -->
		</select>
	</div>
		<!-- <div class="item" v-for="(item,index) in list" :key="index">
		 
		</div> -->
		<!-- <div  class="show-fol">
			<div :class="{'active':folshow}" @click="folshow=true">扣费明细</div>
			<div :class="{'active':!folshow}" @click="folshow=false">佣金明细</div>
		</div> -->
		<div class="item" v-for="(item,index) in list" :key="index">
			<div>
				<p>时间</p>
				<span>{{item.create_time}}</span>
			</div>
			
			<div style="text-align: center;">
				
				<p>类型</p>
				<span>{{item.remark}}</span>
			</div>
			<div>
				<p>数量(USDT)</p>
				<span>{{item.status==2?'-':'+'}}{{(item.number*1).toFixed(3)}}</span>
			</div>
		</div>
		<p @click="num++;start()" style="color: #2167ff;text-align: center;line-height: 28px;">加载更多</p>
		<p v-show="!list.length" style="color: #999;text-align: center;line-height: 40px;">{{$t('community.available')}}</p>
		</van-pull-refresh>
	</div>
</template>

<script>
	export default {
	  data() {
	    return {
			list:[],
			list2:[],
			total_num:'',
			total_money:'',
			isLoading:false,
			folshow:false,
			value:'time',
			num:1,
			bool:true,
			type:'all'
	    };
	  },
	  created() {
	  	this.start()
	  },
	  watch:{
		  value(oldvalue,newvalue){
		  	if(oldvalue){
				// if(oldvalue == 'num'){
				// 	this.list.sort((a, b)=>{
				// 		return  b.number -a.number
				// 	})
				// }else{
					this.num = 1
					if(oldvalue == 'deal'){
						this.type =5
					}
					if(oldvalue == 'transfer'){
						this.type ='2,10'
					}
					if(oldvalue == 'reward'){
						this.type ='6,7,8'
					}
					if(oldvalue == 'time'){
						this.type ='all'
					}
					this.list = []
					this.bool = true
					this.start()
				// }
		  	}else{
				this.list = this.list2
			}
		  }
	  },
	  
	  methods:{
		  onRefresh(){
			  this.num=1
		  		  this.start()
		  	  setTimeout(() => {
		  	        this.isLoading = false;
		  	      }, 1000);
		  	},
		  start(){
			  if(!this.bool){
				  return
			  }
			  this.$axios
			  	.post(`/index/mywallet/usdt_record`,{page:this.num,type:this.type})
			  	.then(res => {
			  		if(res.data.code == 0){
			  			this.list = [...this.list,...res.data.info.data]
						this.list2 = this.list
						if(this.num!=1 && this.num> res.data.info.last_page){
							this.$toast.fail({
								message: '暂无更多数据',
								duration: 3200
							});
							this.bool=false
						}
			  		}else{
			  			this.$toast.fail({
			  				message: res.data.msg,
			  				duration: 3200
			  			});
			  		}
			  	})
		  }
	  }
	  
	};
</script>

<style lang="less" scoped>
	.show-fol {
		display: flex;
		margin: 3px 15%;
		background: #fff;
		div {
			line-height: 25px;
			border: 1px solid #eee;
			flex: 1;
			text-align: center;
		}
	
		.active {
			color: #2284fd;
			border: 1px solid #2284fd !important;
		}
	}
	.title{
		    display: flex;
		    justify-content: space-between;
		    margin: 0.2rem 0 0.2rem 0.2rem;
			font-size:14px;
	}
	.tophader{
		background-color: rgb(14,138,254);
	}
	.item {
	  padding: 0.3rem 0.3rem;
	  background-color: #ffffff;
	  border-bottom: 8px solid #e8ecef;
	  display: flex;
	  		 justify-content: space-between;
	 div{
		 text-align: left;
		 p{
			 text-align: 13px;
			 color: rgb(186,186,186);
			 margin-bottom: 0.1rem;
		 }
		 span{
			 text-align: 15px;
		 }
		
	 }
	 
	}
	.two{
		padding: 6px 0 6px 3px;
		width: 25%;
		background-color: #fff;
		    border-radius: 5px;
			margin: .09rem 3% .1rem 72%;
	}
</style>
