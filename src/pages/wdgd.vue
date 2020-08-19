
<template>
	<div>
		<div class="title">
			
			<van-icon name="arrow-left"  onclick="window.history.go(-1)"/>
			<div>我的跟单账号:</div>
		</div>
		<div class="body">
				<div class="left">
					0000.00
					<p>累计跟单本金(USDT)</p>
				</div>
				
				<div class="center">
					0000.00
					<p>跟单总收益(USDT)</p>
				</div>
				
				<div class="right">
					+0%
					<p>收益率</p>
				</div>
		</div>
		<div class="item">
			<div class="one">
				<div :class="{'active':bool}" style="text-align: right;margin-right: 20px;margin-left: 32%;" @click="bool=true">我的跟单<p v-show="bool"></p></div>
				<div @click="bool=false" :class="{'active':!bool}">我的交易员<p v-show="!bool" style="margin-left: 37%;"></p></div>
			</div>
			<div class="two" v-show="bool">
				<button :class="{'active':bool2}" @click="bool2=!bool2">当前跟单</button>
				<button :class="{'active':!bool2}" @click="bool2=!bool2">历史跟单</button>
			</div>
			<p class="p" v-show="bool && bool3">仅显示跟单持仓,不包含自主下单的仓位 <span @click="bool3=false">X</span></p>
			<div  style="text-align: center;">
				<img class="img" src="../assets/19066.png"/>
				<button class="button" @click="$router.push('/gensui')">去跟单</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
		bool:true,
		bool2:true,
		bool3:true
    };
  },
  created() {
  	
  }
  
};
</script>

<style lang="less" scoped>
	.title{
		padding: 0 .28rem;
		margin: .22rem 0;
		font-size: .34rem;
		display: flex;
		position: relative;
		font-weight: 550;
		i{
			position: absolute;
			left: 9px;
			top: 4px;
		}
		div{
				flex: 1;
				text-align: left;
				margin-left: 30px;
		}
	}
	.body{
		// background-color: rgb(67,103,253);
		background: url(../assets/10001.png) no-repeat;
		height: 2.4rem;
		display: flex;
		color: #FFFFFF;
		div{
			flex: 1;
			text-align: center;
			margin-top: 28px;
			p{
				margin-top: 10px;
				font-size: 12px;
			}
		}
	}
	.item{
		background-color: #FFFFFF;
		border-radius: 15px 15px 0 0;
		min-height: 5rem;
		margin-top: -18px;
		.one{
			padding-top: 10px;
			height: 30px;
			line-height: 30px;
			font-weight: 550;
			color: rgb(163,169,179);
			display: flex;
			div{
				text-align: left;
				p{
					height: 2px;
					width: 20px;
					background-color: rgb(84,114,210);
					margin-left: 30%;
				}
			}
			.active{
				color: #000000;
			}
		}
		.two{
			margin-top: 20px;
			padding: 0 .28rem;
			button{
				margin-right: 6px;
				border: 1px solid rgb(233,233,233);
				background-color: #FFFFFF;
				height: 30px;
				line-height: 28px;
				color: rgb(142,146,157);
				font-size: 14px;
			}
			.active{
				color: rgb(84,114,210);
				border: 1px solid rgb(84,114,210);
				background-color: rgb(238,239,250);
			}
		}
		.p{
			display: flex;
			color: rgb(142,146,157);
			padding: 0 .28rem;
			justify-content: space-between;
			font-size: 13px;
			margin-top: 10px;
			span{
				display: block;
				width: 16px;
				height: 16px;
				background-color: rgb(233,233,233);
				border-radius: 50%;
				text-align: center;
				line-height: 16px;
			}
		}
	}
	.img{
		width: 125px;
		height: 163px;
		margin-top: 60px;
	}
	.button{
		color: rgb(84,114,210);
		background-color: rgb(238,239,250);
		height: 32px;
		line-height: 32px;
		padding: 0 15px;
		font-size: 14px;
		display: block;
		text-align: center;
		margin-left: 41%;
	}
</style>

