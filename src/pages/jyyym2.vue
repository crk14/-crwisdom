<template>
	<div class="contirecord">
		<div class="tophader" @click="$router.back()">
			<van-icon name="arrow-left" />
			<p>现货交易</p>
		</div>
		<div class="strategy">
			<div class="one_p" style="display: flex;">
				<span class="dfirst" style="color: #999999;font-size: .24rem;">仓位监测</span>
				<div style="font-size: .28rem;width: 2.9rem;text-align: center;">{{parseInt(Number(principals)*1000)/1000||0}}
					{{symbol}}</div>
			</div>

		</div>
		<!-- <div class="item-one">
			<div class="title">
				<div class="left">
					<span>{{shuju}}</span>

				</div>
				<div class="right">
					<div>{{pirse}}</div>

				</div>
			</div>
		</div> -->
		<test :data='datas'></test>
		<div class="item-one">
			<div class="title-c">
				<div></div>
				当前持仓
			</div>
			<div class="body">
				<div class="right ">
					<div class="left2">
						<div style="display: flex;"><span style="color: #2ead65;">{{shuju}}</span>
						</div>
					</div>
					<div class="left2">
						<div style="display: flex;">
							<div>数量 <span>{{position.amount?position.amount.toFixed(4):0}}</span></div>
							<div>持仓均价 <span>{{position.average}} USDT</span></div>
						</div>
					</div>
				</div>
			</div>
			<div class="title-c" style="margin-top: 5px;">
				<div></div>
				闪电交易(市价)
			</div>
			<div class="body">
				<div class="right">
					<div class="two">
						<div class="three">
							<div>金额</div>
							<div><input v-model="number" type="number" />
								{{shuju.split('/')[1]}} </div>
						</div>
						<div class="three">
							<div>数量 </div>
							{{position.amount?position.amount.toFixed(4):0}}
							<!-- <div><input v-model="number2" type="number" />
								{{shuju.split('/')[0]}}  </div> -->
						</div>
					</div>
					<div style="width: 100%;text-align: right;font-size: 0.26rem;">市价全平</div>
					<div style="display: flex;justify-content: space-between;">
						<div class="button" @click="getbuy()">买入</div>
						<div class="button active-b" @click="getbuy(true)">卖出</div>
					</div>
				</div>
			</div>
			<p class="hr" style="margin-top: 4px"></p>

		</div>
		<!-- 交易币对弹窗 -->
<!-- 		<van-popup v-model="bidui" position="right" class="poup" :style="{ height: '100%' ,width:'100%'}">
			<div class="tophader">
				<van-icon name="arrow-left" @click="bidui= false" />
				<p>切换货币</p>
				<span @click="bidui= false" style="position: fixed;right: 18px;top: 0px;color: rgb(34, 132, 253);font-size: 17px;">完成</span>
			</div>
			<div class="poup-title">
				<div>搜索</div>
				<input v-model="sym_val" placeholder="输入币" style="width: 50px;padding: 1px 0; font-size: 14px; border: 1px solid #eee;margin-left: 6px;" />
				<div class="item" @click="getxingqing()" :class="{'xiahuaxian':huobi}">官方推荐</div>
				<div class="item" @click="getzhuliu()" :class="{'xiahuaxian':!huobi}">所有货币对</div>
				<div class="about"></div>
			</div>
			<div class="poup-body">
				<span>货币对</span>
				<span style="margin-left: 20%;">操作</span>
			</div>
			<ul>
				<li class="li-item" v-for="(item,i) in list3" :key="i">
					<div style="padding-left: .7rem;font-size: 14px;width: 86px;">{{item.symbol1.toUpperCase()}}/<span style="color: #CCCCCC;">{{item.symbol.toUpperCase()}}</span>
					</div>
					<div style="padding-left: 1rem;color: #2284fd;text-align: center" v-show="!item.bool" @click="shuju = item.symbol1.toUpperCase()+ '/' + item.symbol.toUpperCase();bidui=false">切换</div>
					<div style="padding-left: 1.62rem;color: #C0C5CB;text-align: center" v-show="item.bool">已添加</div>
				</li>
			</ul>
		</van-popup> -->

	</div>
</template>

<script>
	import Vue from "vue";
	import {
		Checkbox
	} from "vant";
	Vue.use(Checkbox);
	// import test from "../components/test.vue"
	import test from "./test2.vue"
	export default {
		components: {
			Checkbox,
			test
		},
		data() {
			return {
				sym_val: '',
				huobi: true,
				principals: '',
				// bidui: false,
				shuju: '',
				jindu: '0.1',
				active6: 'USDT',
				number: '',
				// number2: '',
				bourse: '1',
				symbol: '',
				strategy_list: [],
				list3: [],
				list4: [],
				id: '',
				position: {},
				datas: [],
				pirse: '',
				time1: null
			};
		},
		created() {
			this.shuju = (this.$route.query.symboldeal + '/' + this.$route.query.symbol).toUpperCase()
			this.symbol = this.$route.query.symbol.toUpperCase()
			this.id = this.$route.query.id
			this.closecli()
			this.time1 = setInterval(() => {
				let num = localStorage.getItem('pirse')
				if (num !== this.pirse) {
					this.pirse = num
				}
			}, 2000)
		},
		watch: {
			sym_val(newValue, oldValue) {
				if (newValue) {
					let str = this.sym_val.toLowerCase()
					this.list3 = []
					this.list4.forEach(item => {
						if (item.symbol1.indexOf(str) != -1) {
							this.list3.push(item)
						}
					})
				} else {
					this.list3 = this.list4
				}
			},
			// symbol(newValue, oldValue) {
			// 	this.strategy_list = []
			// 	this.closecli()
			// },
			shuju(newValue, oldValue) {
				localStorage.setItem('jysymbol', newValue)
			},
			// https://api.huobi.be/market/history/kline?period=1day&size=200&symbol=btcusdt

		},
		methods: {

			getbuy(bool) {
				let str = 'buy-market';
				let num = this.number
				if (bool) {
					str = 'sell-market'
					num = 0
				}
				if (!this.number && !bool) {
					this.$toast.fail({
						message: '请填写数量',
						duration: 2000
					})
				}
				this.$axios
					.post("/index/spotfollow/create_market_order", {
						symbol: this.symbol.toLowerCase(),
						bourse: this.bourse,
						symbol_deal: this.shuju.split('/')[0].toLowerCase(),
						size: num,
						order_type: str,
						id: this.id

					})
					.then(res => {
						if (res.data.code == 0) {
							this.$toast.success({
								message: res.data.msg,
								duration: 2000
							})
							this.closecli()
						} else {
							this.$toast.fail({
								message: res.data.msg,
								duration: 2000
							})
						}
					});


			},
			getxingqing() {
				this.list3 = []
				this.huobi = true
				this.jysymbol = 0
				this.$axios
					.post("/index/spotstrategy/get_sug_symbol", {
						symbol: this.symbol,
						bourse: this.bourse
					})
					.then(res => {
						console.log(this.strategy_list)
						if (this.strategy_list) {
							let arr = []
							this.strategy_list.forEach(item => {
								res.data.sug_list.forEach(item1 => {
									let str = item1.symbol1.toUpperCase() + '/' + item1.symbol.toUpperCase()
									// console.log(str,item.bidui)
									if (item.bidui == str) {
										console.log(str)
										item1.bool = true
									}
									arr.push(item1)
								})
							})
							this.list3 = res.data.sug_list

						} else {
							this.list3 = res.data.sug_list
						};
						this.list4 = this.list3
					})
			},
			getzhuliu() {
				this.list3 = []
				this.huobi = false
				this.$axios
					.post("/index/strategy/get_symbol", {
						symbol: this.symbol,
						bourse: this.bourse
					})
					.then(res => {
						console.log(this.strategy_list)
						if (this.strategy_list) {
							let arr = []
							this.strategy_list.forEach(item => {
								res.data.symbol.forEach(item1 => {
									let str = item1.symbol1.toUpperCase() + '/' + item1.symbol.toUpperCase()
									// console.log(str,item.bidui)
									if (item.bidui == str) {
										console.log(str)
										item1.bool = true
									}
									arr.push(item1)
								})
							})
							this.list3 = res.data.symbol

						} else {
							this.list3 = res.data.symbol
						};
						this.list4 = this.list3
					})
			},
			closecli() {
				this.$axios
					.post("/index/spotstrategy/get_balance", {
						symbol: this.symbol,
						bourse: this.bourse
					})
					.then(res => {
						if (res.data.code == 0 && res.data.principal) {
							this.principal = res.data.principal;
							this.principals = res.data.principal;
						} else {
							layer.open({
								content: res.data.msg,
								skin: "msg",
								time: 2
							});
						}
					});
				this.$axios
					.post("/index/spotfollow/get_position", {
						symbol: this.symbol.toLowerCase(),
						bourse: this.bourse,
						symbol_deal: this.shuju.split('/')[0].toLowerCase(),
						id: this.id
					})
					.then(res => {
						if (res.data.code == 0) {
							this.position = res.data.data
						} else {
							this.$toast.fail({
								message: res.data.msg,
								duration: 2000
							})
						}
					});
			},
		},
		beforeDestroy() {
			clearInterval(this.time1)
			this.time1 = null
			localStorage.setItem('pirse', '')
		},

	};
</script>
<style lang="less" scoped>
	.item-one {
		padding: 0 .2rem;



		.title {
			display: flex;
			justify-content: space-between;
			line-height: 36px;
			height: 36px;
			border-bottom: 1px solid #f2f2f2;
			position: relative;

			.left {
				width: 110px;
				overflow: hidden;
			}

			.van-icon-arrow-down {
				position: absolute;
				top: 10px;
				left: 110px;
			}



			.right {
				display: flex;
				color: #de6e6d;


			}
		}

		.body {
			display: flex;

			.left {
				width: 39%;

				.one {
					width: 100%;
					line-height: 30px;
					display: flex;
					border-bottom: 1px solid #f2f2f2;
					position: relative;
					font-size: 13px;

					div {
						width: 24px;
						overflow: hidden;
					}

					.van-icon-arrow-down {
						line-height: 30px;
						margin-left: 4px;
					}

					.van-icon-arrow-up {
						line-height: 30px;
						margin-left: 4px;
					}
				}

				.two {
					line-height: 25px;
					font-size: 14px;
					display: flex;
					justify-content: space-between;

					.left {
						color: #de6e6d;
					}

					.left-1 {
						color: rgb(78, 183, 114);
					}

					.right {
						color: #686868;
						text-align: right;
					}

				}

				p {
					height: 1px;
					background-color: #f2f2f2;
					width: 100%;
					margin: 3px 0;
				}

				.three {
					line-height: 20px;
					font-size: 12px;
					display: flex;
					justify-content: space-between;

					.left {
						color: #C0C5CB;
						flex: 1;
					}

					.right1 {
						color: #686868;
						text-align: right;
					}

				}
			}

			.left2 {
				display: flex;
				justify-content: space-between;
				font-size: 13px;
				color: #ccc;
				flex: 1;

				div {
					flex: 1;
					justify-content: space-between;

					span {
						color: #686868;
					}
				}

				.ri {
					color: rgb(195, 135, 45);

					input {
						width: 41%;
					}
				}
			}

			.right {
				flex: 1;
				position: relative;

				.one {
					display: flex;
					margin: 5px 0;
					line-height: 32px;
					text-align: center;

					div {
						flex: 1;
						border-radius: 4px;
						background-color: #C0C5CB;
					}

					.right1 {
						background-color: #de6e6d;
						color: #ffffff;
					}

					.left1 {
						background-color: rgb(78, 183, 114);
						color: #ffffff;
					}

					// .left{
					// 	color:#ffffff;
					// }
				}

				.about {
					position: absolute;
					width: 11px;
					height: 38px;
					top: 1px;
					left: 48%;
					background-color: #ffffff;
					transform: rotate(13deg);
				}

				.two {
					display: flex;
					justify-content: space-between;
					margin: 7px 0 2px 0;
					line-height: 26px;
					font-size: 14px;
					position: relative;

					.le {
						display: flex;
						justify-content: space-between;
						border: 1px solid #C0C5CB;
						flex: 1;
						color: #686868;
						border-radius: 3px;
						padding: 0 4px;

						.van-icon-arrow-down {
							margin-right: 1px;
							margin-top: 4px;
						}

						.van-icon-arrow-up {
							margin-right: 1px;
							margin-top: 4px;
						}
					}

					.ri {
						border-radius: 3px;
						padding: 0 4px;
						margin-left: 5px;
						color: #686868;
						border: 1px solid #C0C5CB;
						display: flex;

						input {
							height: 25px;
							width: 75px;
							color: #C0C5CB;
						}
					}
				}

				.three {
					.colors {
						color: #000;
					}

					display: flex;
					justify-content: space-between;
					border: 1px solid #C0C5CB;
					color: #686868;
					border-radius: 3px;
					padding: 0 4px;
					line-height: 29px;
					font-size: 15px;
					width: 44%;

					span {
						color: #686868;
					}

					div {
						display: flex;

						input {
							height: 28px;
							width: 56px;
							text-align: right;
							margin-right: 2px;
						}
					}
				}

				.backgs {
					border: 1px solid #5784c6;
				}

				.backgs2 {
					color: #5784c6 !important;
				}

				.four {
					display: flex;
					margin: 6px 0;
					line-height: 25px;

					div {
						flex: 1;
						background-color: rgb(245, 249, 252);
						border: #C0C5CB;
						color: #ababab;
						text-align: center;
						font-size: 14px;
					}
				}

				.six {
					font-size: 12px;
					color: #ababab;

					span {
						color: #000000;
					}

					.flex {
						display: flex;
						line-height: 19px;
						justify-content: space-between;

						div {
							display: flex;
						}

						.div {
							// flex: 1;
							background-color: rgb(245, 249, 252);
							border: #C0C5CB;
							color: #ababab;
							text-align: center;
							font-size: 14px;
							padding: 0 5px;
						}
					}

				}

				.button {
					background-color: #4eb772;
					color: #ffffff;
					border-radius: 3px;
					text-align: center;
					width: 47%;
					line-height: 32px;
					margin-top: 3px;
					font-size: 14px;
				}

				.active-b {
					background-color: #de6e6d;
				}

			}

		}

	}



	.title-c {
		// margin-top: -16px;
		border-top: 3px solid #eee;
		display: flex;

		div {
			width: 2px;
			height: 15px;
			margin: 4px 5px 0 2px;
			background: #0b78f1;
		}
	}

	.strategy {
		padding: 0.1rem 0.1rem 0.1rem 0.2rem;
		border-bottom: 2.5px solid #f5f6fa;
		position: relative;

		p {
			display: flex;
			justify-content: space-between;
			font-size: 0.24rem;
			padding: 0.1rem 0;

			i {
				color: #333333;
			}
		}

		p span:nth-of-type(1) {
			color: #999999;
		}

		.seting {
			position: absolute;
			right: 0.5rem;
			top: 0.5rem;
			color: #2185ff;

			i {
				color: #2185ff;
				position: relative;
				top: 0.04rem;
				margin-left: 0.1rem;
			}
		}
	}

	.poup-title {
		display: flex;
		position: relative;
		padding: 0.2rem;
		border-bottom: 4px solid #e5e5e5;

		div {
			margin-left: 0.4rem;
		}

		.item {
			color: #000000;
			margin-left: 0.7rem;
			font-size: 15px;
		}

		.about {
			background-color: rgb(34, 132, 253);
			width: 3px;
			height: 17px;
			position: absolute;
			left: 0px;
			top: 12px;
		}
	}

	.poup-body {
		display: flex;
		padding: 0.2rem;
		border-bottom: 1px solid #e5e5e5;

		span {
			flex: 1;
			font-size: 16px;
			text-align: center;
		}
	}

	.poup .li-item {
		display: flex;
		padding: 0.3rem;
		border-bottom: 1px solid #e5e5e5;
		font-weight: bold;

		div {
			flex: 1;
			font-weight: 500;
			text-align: left;
		}

		.active {
			color: rgb(244, 17, 10);
		}

		.active1 {
			color: rgb(69, 196, 58);
		}
	}

	.active6 {
		border-bottom: 1px solid rgb(34, 132, 253);
		color: rgb(34, 132, 253);
	}

	.poup-title {
		.xiahuaxian {
			border-bottom: 1px solid #2284fd;
			color: #2284fd;
		}
	}
</style>
