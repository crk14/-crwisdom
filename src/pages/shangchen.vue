<template>
	<div style="font-size: 14px;">
		<div class="tophader">
		  <van-icon name="arrow-left" onclick="window.history.go(-1)" />
		  <p>量化商城</p>
		</div>
		<div class="sc-img">
			<img src="../assets/sc001.png" />
		</div>
		<div class="sc-title">
			<div class="div1" @click="$router.push('jqgm')">
				<div  >我的购买 </div>
				<p>{{record_num}}</p>
				<div class="div" >记录</div>
			</div>
			<div class="div1" >
				<div>我的库存</div>
				<p>{{robot_reserve}}</p>
			</div>
			<div class="div1" style="margin-right: 15px;">
				<div @click="$router.push('mymoner')">我的业绩</div>
				<p>{{sell_num}}</p>
				<div class="div">记录</div>
			</div>
		</div>
		<p class="hr"></p>
		<div class="sc-body">
			<div class="item" @click="$router.push('xqbabel?id=1')">
				<img src="../assets/sc002.png" />
				<div>
					<p>现货量化机器人(专业版)</p>
					<p style="margin: 8px 0 6px 0;color: rgb(126,127,129);font-size: 13px;">有效时长: 365天</p>
					<p>价格(￥): <span>16800</span> CRW</p>
					<p style="font-size: 12px;color: rgb(126,127,129);">16800CRW等价于2600USDT</p>
				</div>
				<button >进入详情</button>
			</div>
			<div class="item" @click="$router.push('xqbabel?id=2')">
				<img src="../assets/sc003.png" />
				<div>
					<p>合约量化机器人(专业版)</p>
					<p style="margin: 8px 0 6px 0;color: rgb(126,127,129);font-size: 13px;">有效时长: 365天</p>
					<p>价格(￥): <span> 16800</span> CRW</p>
					<p style="font-size: 12px;color: rgb(126,127,129);">16800CRW等价于2600USDT</p>
				</div>
				<button >进入详情</button>
			</div>
			<div class="item" @click="$router.push('xqbabel?id=3')">
				<img src="../assets/sc004.png" />
				<div>
					<p>合约量化机器人(智能版)</p>
					<p style="margin: 8px 0 6px 0;color: rgb(126,127,129);font-size: 13px;">点卡: 16800点</p>
					<p>价格(￥): <span>16800</span> CRW</p>
					<p style="font-size: 12px;color: rgb(126,127,129);">16800CRW等价于2600USDT</p>
				</div>
				<button >进入详情</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
	  data() {
	    return {
			record_num:0,
			robot_reserve:0,
			sell_num:0
	    };
	  },
	  created() {
		  let time = localStorage.getItem('time')
		  clearInterval(time)
	  	this.$axios
	  		.post("/index/robot/reserve")
	  		.then(res => {
	  			if(res.data.code == 0){
	  				this.record_num = res.data.record_num
					this.sell_num =res.data.sell_num
					this.robot_reserve = res.data.robot_reserve
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
	
	.sc-img{
		padding: 0 .28rem;
		img{
			width: 100%;
			height: 133px;
		}
	}
	.sc-title{
		display: flex;
		padding-top: 2px;
		.div1{
			position: relative;
			flex: 1;
			text-align: center;
			p{
				line-height: 25px;
			}
		}
		.div{
			position: absolute;
			top: 0;
			right: -5px;
			font-size: 12px;
			
			background-color: rgb(114,173,251);
			padding: 1px 6px;
			border-radius: 12px;
			color: #FFFFFF;
			transform: scale(0.8);
		}
	}
	.sc-body{
		padding: .2rem .2rem;
		margin-bottom: 52px;
		.item{
			display: flex;
			padding: .26rem .22rem .26rem .16rem;
			border-radius: 5px;
			border: 2px solid rgb(255,249,245);
			box-shadow: 3px 3px 2px rgb(255,249,245);
			margin-bottom: 16px;
			position: relative;
			img{
				width: 82px;
				height: 82px;
			}
			div{
				margin-left: 15px;
				span{
					color: rgb(236,106,69);
				}
			}
			button{
				// width: 75px;
				padding: 0 8px;
				border-radius: 24px;
				height: 25px;
				background-color: rgb(118,173,249);
				color: #FFFFFF;
				top: 40%;
				position: absolute;
				right: 6px;
				font-size: 0.22rem;
			}
		}
	}
</style>
