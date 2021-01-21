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
				<div>代理购物券</div>
				<p>{{robot_ticket}}</p>
			</div>
			<div @click="$router.push('mymoner')" class="div1" style="margin-right: 15px;">
				<div >我的业绩</div>
				<!-- <p>{{sell_num}}</p> -->
				<div class="div">记录</div>
			</div>
			
		</div>
		<p class="hr"></p>
		<div class="sc-body">
			<!-- <div class="item" @click="$router.push('xqbabel?id=4')">
				<img src="../assets/sc002.png" />
				<div>
					<p>现货量化机器人(智能趋势版)</p>
					<p style="margin: 8px 0 6px 0;color: rgb(126,127,129);font-size: 13px;">点卡: 16800点</p>
					<p>价格(￥): <span>16800</span> CRW</p>
					<p style="font-size: 12px;color: rgb(126,127,129);">16800CRW等价于2600USDT</p>
				</div>
				<button >进入详情</button>
			</div> -->
			<div class="item" @click="$router.push('xqbabel?id=1')">
				<img src="../assets/sc002.png" />
				<div class="div">
					<p>现货量化机器人(专业设置版)</p>
					<div class="item-body active" >
						<div class="act">时长:</div>
						<div>90天</div>
						<div>180天</div>
						<div>360天</div>
					</div>
					<div class="item-body">
						<div style="text-align: left;width: 30%;width: 16%;">价格:</div>
						<div>5600CRW</div>
						<div>9600CRW</div>
						<div>16800CRW</div>
					</div>
					<p style="font-size: 12px;color: rgb(126,127,129);">1USDT约等于6.5CRW</p>
				</div>
				<button >进入详情</button>
			</div>
		<!-- 	<div class="item" @click="$router.push('xqbabel?id=3')">
				<img src="../assets/sc004.png" />
				<div>
					<p>合约量化机器人(智能趋势版)</p>
					<p style="margin: 8px 0 6px 0;color: rgb(126,127,129);font-size: 13px;">点卡: 16800点</p>
					<p>价格(￥): <span>16800</span> CRW</p>
					<p style="font-size: 12px;color: rgb(126,127,129);">16800CRW等价于2600USDT</p>
				</div>
				<button >进入详情</button>
			</div> -->
			<div class="item" @click="$router.push('xqbabel?id=2')">
				<img src="../assets/sc003.png" />
				<div class="div">
					<p>合约量化机器人(专业设置版)</p>
				<div class="item-body active" >
				<div class="act">时长:</div>
					<div>90天</div>
					<div>180天</div>
					<div>360天</div>
				</div>
				<div class="item-body">
					<div style="text-align: left;width: 16%;">价格:</div>
					<div>5600CRW</div>
					<div>9600CRW</div>
					<div>16800CRW</div>
				</div>
					<p style="font-size: 12px;color: rgb(126,127,129);">1USDT约等于6.5CRW</p>
				</div>
				<button >进入详情</button>
			</div>
			<div class="item" @click="$router.push('xqbabel?id=5')">
				<img src="../assets/sc003.png" />
				<div class="div">
					<p>策略跟随机器人(现货/合约)</p>
					<div class="item-body active" >
					<div class="act">点卡:</div>
					<div>3500点</div>
					</div>
					<div class="item-body">
						<div class="act">价格:</div>
						<div>3500CRW</div>
					</div>
					<p style="font-size: 12px;color: rgb(126,127,129);">1USDT约等于6.5CRW</p>
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
			robot_ticket:0,
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
					this.robot_ticket = res.data.robot_ticket
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
			.div{
				margin-left: 15px;
				width: 71%;
				span{
					color: rgb(236,106,69);
				}
			}
			.item-body{
				display: flex;
				// justify-content: space-between;
				div{
					// flex: 1;
					width: 28%;
					text-align: center;
					font-size: 12px;
					color: #e35e5e;
				}
				.act{
					text-align: left;width: 16%;
				}
				
			}
			.active{
				div{
					color: #00bf89;
				}
			}
			button{
				// width: 75px;
				position: absolute;
				padding: 0 8px;
				border-radius: 24px;
				line-height: 25px;
				background-color: rgb(118,173,249);
				color: #FFFFFF;
				top: 68%;
				position: absolute;
				right: 6px;
				font-size: 0.22rem;
			}
		}
	}
</style>
