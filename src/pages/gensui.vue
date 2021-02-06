<template>
	<div class="body">
		<div class="title">

			<van-icon name="arrow-left" onclick="window.history.go(-1)" />
			<div>策略跟随社区</div>
		</div>
		<div class="img">
			<!-- <img src="../assets/1701.png" @click="$router.push('/intetrading4')" /> -->
			<img src="../assets/1701.png" @click="$toast.fail({message: '暂未开放',duration: 2000})" />
			<img v-show="bool" @click="$router.push('heyue4')" src="../assets/1702.png" />
			<!-- <div v-show="!bool" @click="$router.push('heyue1')" style="margin-top: 12px;
    width: 48%;
    height: 1.6rem;background-color: #4a79f5;border-radius: 5px;text-align: center;line-height: 1.6rem;color: #fff;">交易员入口</div> -->
		</div>
		<div class="title2">
			<div class="one">策略列表</div>
			<div style="display: flex;">
				<div class="two">
					<input v-model="value" placeholder="搜索" @keyup.enter="onSearch()" />
					<van-icon name="search" @click="onSearch()" />
				</div>
				<div class="two" style="margin-left: 8px;padding: 6px 0 6px 3px;width: 103px;">
					<select name="public-choice" v-model="value2" @change="getvalue2" style="color: rgb(169, 173, 182)">
						<option value="1">综合排名</option>
						<option value="2">累计总收益</option>
						<option value="3">跟随者总收益</option>
						<option value="4">累计收益率</option>
						<option value="5">近30日收益率</option>
						<option value="6">胜率</option>
					</select>
				</div>
			</div>

		</div>
		<p class="p">数据实时更新</p>
		<div class="banan">

			<div class="item" v-for="(item,index) in list" :key="index">
				<div class="one">
					<img :src="item.avatar" class="img1" />
					<div class="center">
						<div>
							<strong>{{item.nick_name}}</strong>
							<span >策略运行: {{item.update_time| time}}天</span>
						</div>

						<p><span style="margin-right: 20px;">类型: OKEX/永续合约</span> 币对: {{item.symbol_deal}}/{{item.symbol}}</p>
					</div>
					<div class="i-t1" :class="{'active':item.state==1,'active1':item.state==2}"></div>
					<div class="i-t" :class="{'active':item.state==1,'active1':item.state==2}">{{item.state==1?'交易中':item.state==0?'已停止':'已满员'}}</div>
				</div>
				<div class="two">
					<div class="left">
						{{item.follow_num}}
						<p>跟随人数</p>
					</div>
					<div class="center">
						{{(item.all_profit*1).toFixed(2)}}
						<p>累计总收益(USDT)</p>
					</div>
					<div class="right">
						{{item.trans_num?(item.win_num/item.trans_num*100).toFixed(2):0}}%
						<p>胜率</p>
					</div>
				</div>
				<div class="two">
					<div class="left">
						{{item.trans_num}}
						<p>交易笔数</p>
					</div>

					<div class="center">
						{{(item.profit*1).toFixed(2)}}
						<p>跟随总收益(USDT)</p>
					</div>

					<div class="right" style="color: rgb(53,183,135);">
						{{item.profit_rate?(item.profit_rate*100).toFixed(2):0}}%
						<p>收益率</p>
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
				value: '',
				value2: 1,
				bool: true,
				list: []
			};
		},
		created() {
			this.$axios
				.post(`/index/follow/trader_info`, )
				.then((res) => {
					this.list = res.data.trader_info
					console.log(this.list)
				});
		},
		filters:{
			time(value){
				if(value){
					let timestamp = new Date().getTime()
					let timestamp1 = new Date(value).getTime()
					let num = (timestamp -timestamp1)/1000/3600/24
					
					return Math.ceil(num)
				}else{
					return 0
				}
				
			}
		},
		methods: {
			onSearch() {
				console.log(this.value, 66, )
			},
			getvalue2() {},
			fn2() {
				console.log(6)
			}
		}

	};
</script>

<style lang="less" scoped>
	.body {
		min-height: 18rem;
		// width: 100%;
		background-color: rgb(245, 249, 252);

		.title {
			padding: 0 .28rem;
			margin: .3rem 0;
			font-size: .4rem;
			font-weight: 550;
			display: flex;
			position: relative;

			i {
				position: absolute;
				left: 9px;
				top: 4px;
			}

			div {
				flex: 1;
				text-align: center;
			}

		}

		.img {
			padding: 0 .28rem;
			display: flex;
			justify-content: space-between;

			img {
				margin-top: 12px;
				width: 48%;
				height: 1.6rem;
			}
		}

		.title2 {
			display: flex;
			padding: 0 .28rem;
			justify-content: space-between;
			margin-top: .3rem;

			.one {
				font-size: .35rem;
				font-weight: 550;
			}

			.two {
				background-color: #fff;
				width: 60px;
				padding: 6px 5px 6px 10px;
				display: flex;
				border-radius: 5px;

				input {
					width: 70%;
					font-size: 14px;
				}
			}
		}

		.p {
			padding: 0 .28rem;
			color: rgb(169, 173, 182);
			font-size: 12px;
		}

		.banan {
			padding: 0 .28rem;

			.item {
				margin-top: .2rem;
				padding: .14rem;
				min-height: 3rem;
				background-color: #FFFFFF;

				.i-t {
					position: absolute;
					font-size: 0.2rem;
					width: 100px;
					height: 22px;
					line-height: 22px;
					color: #fff;
					text-align: center;
					right: -33px;
					-webkit-transform: rotate(50deg);
					transform: rotate(50deg);
					background-color: rgb(169, 173, 182);
				}

				.i-t1 {
					position: absolute;
					width: 20px;
					height: 24px;
					right: 0;
					top: 0;
					background-color: rgb(169, 173, 182);
				}

				.one {
					position: relative;
					display: flex;
					background-color: rgb(247, 251, 254);
					padding: .2rem 0 .15rem .15rem;
					justify-content: space-between;
					border-radius: 8px;
					overflow: hidden;

					.active {
						background: #2ead65;
					}

					.active1 {
						background: #e35e5e;
					}

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
						
						flex: 1;
						div{
							display: flex;justify-content: space-between;width: 82%;
							strong{
								font-size: 15px;
								font-weight: 550;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
								width: 130px;
							}
						}
						span{
							font-size: 12px;
							font-weight: 500;
							white-space: nowrap;
							color: rgb(169, 173, 182);
						}
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
						// margin-right: 3%;
						font-size: 13px;
						height: 22px;
					}
				}

				.two {
					display: flex;
					justify-content: space-between;
					margin-top: 20px;

					div {
						color: #000000;
						font-size: 18px;
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

				}
			}
		}

	}
</style>
