<template>
	<div>
		<div class="tophader">
			<van-icon name="arrow-left" onclick="window.history.go(-1)" />
			<p>跟随详情</p>
		</div>
		<div class="body">
			<div class="left">
				200
				<p>总跟随人数</p>
			</div>


			<div class="left">
				135
				<p>交易笔数</p>
			</div>

			<div class="center">
				23100.00
				<p>跟随者总收益(USDT)</p>
			</div>


		</div>
		<div class="item">
			<div class="one">
				跟随者
			</div>
		
		<div class="item1" v-for="(item,index) in list" :key="index">
			<div class="one1">
				<img :src="item.avatar" class="img1" />
				<div class="center">
					{{item.nick_name}}
					<p >
						UID: {{item.trader_id}}
						</p>
				</div>
				<div class="center">
					<p style="margin-top: 12px;margin-left: 15px;">
						币对: <span style="color: #000;">{{item.symbol_deal}}/{{item.symbol}}</span>
					</p>
				</div>
			</div>
			<div class="two">
				<div class="left">
					{{item.up_size}}
					<p>持仓张数(多)</p>
					
				</div>
				<div class="center">
					
					{{item.up_avg_price}}USDT
					<p>持仓均价(多)</p>
				</div>
				<div class="right active" >
					4500USDT
					<p>累计收益</p>
				</div>
			</div>
			<div class="two">
				<div class="left">
					{{item.down_size}}
					<p>持仓张数(空)</p>
				</div>
		
				<div class="center">
					
					{{item.down_avg_price}}USDT
					<p>持仓均价(空)</p>
				</div>
		
				<div class="right active1" :class="{'active':item.state}" >
					{{item.state?'运行':'停止'}}
					<p>状态</p>
				</div>
			</div>
		</div>
		
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				bool: true,
				list: []
			};
		},
		created() {
			this.$axios
				.post(`/index/follow/follow_preview`, {
					symbol_deal: 'ETH',
					symbol: 'USDT',
				})
				.then((res) => {
					console.log(res)
					this.list = res.data.list.data
				});
		}

	};
</script>

<style lang="less" scoped>
	.body {
		background: url(../assets/11022.png) no-repeat;
		height: 2.3rem;
		display: flex;
		color: #FFFFFF;
		flex-wrap: wrap;
		div {
			width: 33%;
			text-align: center;
			margin-top: 28px;
			font-size: 17px;
			p {
				margin-top: 10px;
				font-size: 13px;
			}
		}
	}

	.item {
		background-color: #FFFFFF;
		border-radius: 15px 15px 0 0;
		min-height: 5rem;
		margin-top: -18px;

		.one {
			border-bottom: 1px solid #EEEEEE;
			padding-top: 10px;
			height: 30px;
			line-height: 30px;
			font-weight: 550;
			text-align: center;
			color: #000000;
		}

	
			
		}
		.item1 {
			padding: .1rem .14rem;
			min-height: 3rem;
			background-color: #FFFFFF;
			border-bottom: 2px solid #EEEEEE;
			.one1 {
				display: flex;
				background-color: rgb(247, 251, 254);
				padding: .12rem 0 .1rem .1rem;
				justify-content: space-between;
				border-radius: 8px;
		
				.img1 {
					width: 40px;
					height: 40px;
					border-radius: 50%;
					margin-right: 11px;
				}
		
				.img2 {
					width: 47px;
					height: 36px;
					margin-top: -.2rem;
				}
		
				.center {
					font-size: 15px;
					font-weight: 550;
					flex: 1;
		
					p {
						margin-top: 5px;
						font-size: 12px;
						font-weight: 500;
						color: rgb(169, 173, 182);
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						// width: 193px;
						width: 100%;
					}
				}
		
				.right {
					background-color: rgb(30, 105, 250);
					color: #FFFFFF;
					line-height: 22px;
					// width: 55px;
					border-radius: 9px;
					margin-top: 3%;
					margin-right: 3%;
					font-size: 13px;
					height: 22px;
				}
			}
		
			.two {
				display: flex;
				justify-content: space-between;
				margin-top: 7px;
		
				div {
					color: #000000;
					font-size: 15px;
					// flex: 1;
					text-align: center;
				}
		
				p {
					margin-top: 1px;
					color: rgb(169, 173, 182);
					font-size: 13px;
				}
		
				.left {
					width: 25%;
					text-align: left;
				}
		
				.right {
					width: 32%;
					text-align: right;
				}
		
				.center {
					flex: 1;
				}
				.active1{
					color: #d74e5a;
				}
				.active{
					color: rgb(53,183,135)
				}
			}
		}
</style>
