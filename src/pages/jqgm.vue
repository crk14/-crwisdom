<template>
	<div style="font-size: 14px;background-color: rgb(245,245,250);min-height: 100%;padding-bottom: 20px;">
		<div class="tophader">
		  <van-icon name="arrow-left" onclick="window.history.go(-1)"  color="#ffffff"/>
		  <p style="color: #ffffff;">购买记录</p>
		</div>
		<div class="item" v-for="(item,index) in list" :key="index">
			<img src="../assets/sc002.png" />
			<div >
				<p style="margin-bottom: 7px;">{{item.robot_type==1?'现货量化机器人(专业设置版)':item.robot_type==2?'合约量化机器人(专业设置版)':item.robot_type==3?'合约量化机器人(智能趋势版)':'合约跟随机器人(合约版)'}}</p>
				<p class="p1">数量: 1个</p>
				<p class="p1">有效时长: {{item.enable_time*30}} 天</p>
				<p class="p1">购买时间: {{item.create_time}}</p>
				<p class="p1" v-show="item.active_time">{{item.probation==1?'试用':'激活'}}时间: {{item.active_time}}</p>
				<p class="p1">支付金额: {{item.pay_money}} {{item.money_types==2?'CRW':'购物券'}}</p>
				<p class="p2">支付完成</p>
			</div>
			<div v-show="!item.probation" :class="{'active':item.active == 1}" class="i-t">{{item.active==0?'未激活':'已激活'}}</div>
		</div>
	</div>
</template>

<script>
	export default {
	  data() {
	    return {
			list:[]
	    };
	  },
	  created() {
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
