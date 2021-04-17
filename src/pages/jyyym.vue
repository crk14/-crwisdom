<template>
	<div class="contirecord">
		<div class="tophader" @click="$router.back()">
			<van-icon name="arrow-left" />
			<p>永续合约</p>
		</div>
		<div class="item-one" >
			<div class="item-one">
				<div class="title">
					<div class="left">
						<span>{{shuju}}</span>
			
					</div>
					<div class="right">
						<div>{{pirse}}</div>
			
					</div>
				</div>
			</div>
			</div>
			<test></test>
			<div class="item-one" >
			<div class="title-c">
				<div></div>
				当前持仓
			</div>
			<div class="body">
				<div class="right ">
					<div class="left2">
						<div style="display: flex;"><span style="color: #2ead65;">ETHUSDT永续</span>
							<div class="ri"><span style="color: #2ead65;">多</span><input v-model="beishu" type="number" />X</div>
						</div>
					</div>
					<div class="left2">
						<div>
							<div>持仓(张)</div> <span>50</span>
						</div>
						<div>
							<div>收益</div> <span>-24.85</span>
						</div>
					</div>
					
					<div class="left2">
						<div>开仓均价<span>1665.24</span></div>
						<div>预估强平价 <span>3071.68</span></div>
					</div>
				</div>
				<div class="right">
					<div class="left2">
						<div style="display: flex;"><span style="color:#e35e5e;">ETHUSDT永续</span>
							<div class="ri"><span style="color:#e35e5e;">空</span><input v-model="beishu1" type="number" />X</div>
						</div>
					</div>
					<div class="left2">
						<div>
							<div>持仓(张)</div>
							<span>50</span>
						</div>
						<div>
							<div>收益</div> <span>-24.85</span>
						</div>
					</div>
					
					<div class="left2">
						<div>开仓均价<span>1665.24</span></div>
						<div>预估强平价<span>3071.68</span></div>
					</div>
				</div>
			</div>
			<div class="title-c" style="margin-top: 5px;">
				<div></div>
				闪电交易(市价)
			</div>
			<div class="body">

				<div class="right">
					<div class="one">
						<div class="left" :class="{'left1':bool4}" @click="bool4=true">多</div>
						<div class="right" :class="{'right1':!bool4}" @click="bool4=false">空</div>
					</div>
					<div class="about"></div>
					<div class="two">
						<div class="ri">杠杆<input v-model="beishu" type="number" />倍</div>
						<div class="three" >
							<div>数量</div>
							<div><input/>
								张 <span >≈ ₮0.00</span> </div>
						</div>
					</div>

					<div class="button" :class="{'active-b':!bool4}">{{bool4?'买入开多':'卖出开空'}}</div>
					<div class="button" :class="{'active-b':!bool4}">{{bool4?'卖出平多':'买入平空'}}</div>
				</div>

			</div>
			<p class="hr" style="margin-top: 4px"></p>
			
		</div>
		

	</div>
</template>

<script>
	import Vue from "vue";
	import {
		Checkbox
	} from "vant";
	Vue.use(Checkbox);
	import test from "./test2.vue"
	export default {
		components: {
			Checkbox,
			test
		},
		data() {
			return {
				bool4:true,
				shuju: 'BTCUSDT永续',
				active: 0,
				number: '',
				number2: '',
				symbol: 'USDT',
				pirse:'',
				beishu:'',
				beishu1:''
			};
		},

		created() {
		this.shuju = (this.$route.query.symboldeal + '/' + this.$route.query.symbol).toUpperCase() + '永续'
		this.symbol = this.$route.query.symbol.toUpperCase()
		this.id = this.$route.query.id
		// this.closecli()
		this.time1 = setInterval(() => {
			let num = localStorage.getItem('pirse')
			if (num !== this.pirse) {
				this.pirse = num
			}
		}, 2000)
		},
		watch: {
			active(newvalue, oldvalue) {
				if (newvalue == 2) {
					this.fn3()
				}
			},
			beishu(newvalue, oldvalue) {
				localStorage.setItem('beishu', newvalue)
			}
		},
		methods: {
			fn(value) {
				this.bool = false
				this.jindu = value
			},
			fn1(value) {
				this.bool1 = false
				this.shuju = value
			},
			fn2(value, isshow) {
				this.bool12 = false
				if (isshow) {
					this.weituo2 = value
				} else {
					this.weituo = value
				}
			},
			fn3() {
				this.$axios
					.post("/index/local/get_position", {
						symbol: this.symbol,
						bourse: this.bourse,
						symbol_deal: this.stage
					})
					.then(res => {
						this.list = res.data.data
						setTimeout(() => {
							this.fn1()
						}, 50000)
					})
			},
			fn4() {
				this.time = setInterval(() => {
					this.$axios
						.post("/index/local/get_position", {
							symbol: this.symbol,
							bourse: this.bourse,
							symbol_deal: this.stage
						})
						.then(res => {
							this.list = res.data.data
						})
				}, 10000)
			}
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

		.kuang {
			position: absolute;
			top: 30px;
			border: 1px solid #E5E5E5;
			height: 93px;
			background-color: #ffffff;
			padding: 0 5px;
			z-index: 1000;

			div {
				border-bottom: 1px solid #E5E5E5;
			}
		}

		.title {
			display: flex;
			justify-content: space-between;
			line-height: 36px;
			height: 36px;
			border-bottom: 1px solid #f2f2f2;
			position: relative;

			.left {
				width: 160px;
				overflow: hidden;
			}

			select {}

			.van-icon-arrow-down {
				position: absolute;
				top: 10px;
				left: 110px;
			}

			.van-icon-arrow-up {
				position: absolute;
				top: 10px;
				left: 110px;
			}

			.right {
				display: flex;
				color: #de6e6d;

				.one {
					border: 1px solid #5784c6;
					height: 19px;
					margin-top: 7px;
					margin-left: 8px;
					border-radius: 3px;

					img {
						width: 19px;
						height: 13px;
						margin-bottom: 6px;
					}
				}
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
					margin: 7px 0 7px 0;
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
					width: 100%;
					line-height: 32px;
					margin-top: 8px;
					font-size: 14px;
				}

				.active-b {
					background-color: #de6e6d;
				}

			}

		}

		.buttom {

			.one {
				line-height: 36px;
				height: 36px;
				display: flex;
				border-bottom: 1px solid #f2f2f2;

				div {
					margin-right: 13px;
				}

			}

			.p {
				margin-top: 20px;
				width: 100%;
				text-align: center;
				font-size: 14px;
				color: #ababab;
			}

			.backgs3 {
				color: #5784c6;
				border-bottom: 2px solid #5784c6;
			}
		}
	}

	.body {
		.seven {
			display: flex;
			font-size: 12px;
			justify-content: space-between;

			.backgs2 {
				color: #5784c6 !important;
			}


		}

		.item {
			padding: .25rem;
			border-top: 6px solid rgb(247, 248, 250);

			.title {
				font-size: 17px;
				display: flex;
				border-bottom: 1px solid rgb(247, 248, 250);
				padding-bottom: .18rem;
				margin-bottom: 2px;

				div {
					padding: 2px;
					font-size: 13px;
					color: rgb(112, 191, 146);
					background-color: rgb(249, 251, 248);
					height: 22px;
					line-height: 22px;
					margin-left: 6px;
				}

				.active {
					color: rgb(236, 118, 132);
					background-color: rgb(254, 248, 248);
				}
			}

			.one {
				display: flex;

				div {
					flex: 1;
					color: rgb(172, 172, 172);
					font-size: 15px;
					margin: .12rem 0;
				}
			}

			.two {
				display: flex;

				div {
					flex: 1;
					font-size: 20px;
					margin-bottom: .1rem;
				}
			}

			.p {
				height: 1px;
				width: 100%;
				background-color: #EAEFFB;
				margin: 5px 0 9px 0;
			}

			.three {
				font-size: 14px;
				display: flex;
				color: rgb(172, 172, 172);

				div {
					flex: 1;
					display: flex;

					span {
						flex: 1;
						display: block;
						text-align: center;
					}
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

	}

	.title-c {
		margin-top: -16px;
		border-top: 3px solid #eee;
		display: flex;

		div {
			width: 2px;
			height: 15px;
			margin: 4px 5px 0 2px;
			background: #0b78f1;
		}
	}
</style>
