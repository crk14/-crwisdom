<template>
	<div style="font-size: 14px;background-color: rgb(245,245,250);min-height: 100%;padding-bottom: 20px;">
		<div class="tophader">
		  <van-icon name="arrow-left" onclick="window.history.go(-1)"  color="#ffffff"/>
		  <p style="color: #ffffff;">我的业绩</p>
		</div>
		<div class="title">
			<span>我的总业绩: {{total_money}} CRW</span>
			<span>我的业绩收益: {{total_num.toFixed(0)}} CRW</span>
		</div>
	<p class="hr" style="padding: 0;background-color: rgb(230,231,235);"></p>
		<div class="item" v-for="(item,index) in list" :key="index">
		  <img class="img" :src="item.avatar" />
		  <div class="two" style="margin-left:8px;overflow: hidden;flex: 1;text-overflow: ellipsis;white-space: nowrap">
		    {{item.nick_name}} - {{item.robot_type==1?'现货量化机器人(专业设置版)':item.robot_type==2?'合约量化机器人(专业设置版)':item.robot_type==3?'策略跟随机器人(现货/合约)':item.robot_type==0?'量化机器人(配额库存)':''}}
		 <p >数量:{{item.robot_num}}套 			
		 <span style="margin-left: 9px">金额:{{item.pay_money}} {{item.money_types==1?'USDT':'CRW'}}</span>
		 <span style="margin-left: 9px;">{{item.remark}}:{{(item.num*1).toFixed(0)}} CRW</span>
		 </p>
		  <p >购买时间：{{item.create_time}} 		    <span style="margin-left: 5%;">{{item.level_name}}</span></p>
		  </div>
		 
		</div>
	</div>
</template>

<script>
	export default {
	  data() {
	    return {
			list:[],
			total_num:'',
			total_money:''
	    };
	  },
	  created() {
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
	  
	};
</script>

<style lang="less" scoped>
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
