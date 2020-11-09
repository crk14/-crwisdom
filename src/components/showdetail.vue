<template>
	<div class="inpareport">
		<div class="tophader yancolor" style="display: flex;">
			<van-icon name="arrow-left" @click="$router.back()" />
			<p v-if="type==0">点卡明细</p>
			<p v-if="type==1" style="text-align: left;margin-left: .7rem;">交易记录</p>
			<p v-if="bourse==1" style="font-size: 0.3rem;position: relative;"><img src="../assets/hot.png" alt style="right: 0;left: 0.5rem;" />火币全球站</p>
			<p v-if="bourse==4" style="font-size: 0.3rem;position: relative;"><img src="../assets/src_resource_icon_user_exchange_okex@2x.png"
				 alt style="right: 0;left: 0.5rem;" />OKEX</p>
		</div>
		<p class="hr"></p>
		<div class="page-item">
			<div :class="{'active1':isshow==0}" @click="isshow=0">当日</div>
			<div :class="{'active1':isshow==1}" @click="isshow=1">7天</div>
			<div :class="{'active1':isshow==2}" @click="isshow=2">30天</div>
			<div :class="{'active1':isshow==3}" @click="isshow=3">自定义时间</div>
		</div>
		<p class="hr" v-show="bool2" style="background-color: #FFFFFF;"></p>
		<div class="daybox" v-show="bool2">
			<div>
				<p @click="selectate(0)">
					<input type="text" placeholder="请选择时间周期" v-model="value" disabled />
				</p>
				<span style="margin-right:.1rem">至</span>
				<p @click="selectate(1)">
					<input type="text" placeholder="请选择时间周期" v-model="valuefor" disabled />
				</p>
			</div>
			<van-icon name="play" />
		</div>
		<button @click="settime()" v-show="bool2" style="position: absolute;right: .15rem;top:3.72rem;background: rgb(34, 132, 253);color: #FFFFFF;height: .5rem;line-height: .5rem;">确认</button>
		<div class="datebox" v-show="show">
			<van-datetime-picker v-model="currentDate" @confirm="confirm(0)" @cancel="cancel(0)" type="date" />
		</div>
		<div class="datebox" v-show="showfor">
			<van-datetime-picker v-model="currentDate" @confirm="confirm(1)" @cancel="cancel(1)" type="date" />
		</div>
		<p class="hr"></p>
		<div v-show="bool1==0">
			<div style="padding-left:.2rem;font-size: .26rem;margin-top: .4rem;margin-bottom: .2rem">{{starttime}}至 {{endtime}}
				<span style="font-size: 0.26rem;margin-left: 0.26rem;">累计单数:{{count+'单'}}
				<span style="margin-left: 18px;">
				总收益: {{ profit==0?profit:Number(profit).toFixed(4)}}
				</span>
				</span> </div>
			<ul class="tabul" v-show="type==0">
				<li class="one">货币兑</li>
				<li class="two" v-show="type==0">交易时间</li>
				<li class="two" v-show="type==1">成交时间</li>
				<li class="san" v-show="type==0">数量</li>
				<li class="san" v-show="type==1" style="width: 16%;">成交数量</li>
				<li class="four" v-show="type==0">类型</li>
				<li class="four" v-show="type==1">成交收益</li>
				<li class="six" v-show="type==0" style="">点卡扣费</li>
				<li class="six" v-show="type==1">收益率%</li>
			</ul>

			<ul class="contentul" v-show="type==0">
				<li v-for="(item,i) in list1" :key="i">
					<span class="two">{{item.create_time}}</span>
					<span class="san">{{item.num}}</span>
					<span class="four" :style="{color:item.status==1?'#B1333F':'#38B133'}">{{item.status==1?'买入':'卖出'}}</span>
					<span class="six">{{item.point}}</span>
				</li>
				<li class="plunow">{{plunow}}</li>

			</ul>


			<ul class="page-ui" v-if="!heyue">
				<li v-for="(item,i) in list" :key="i">
					<div class="title">
						<div class="left">
							已完成<span> {{item.symbol1.toUpperCase()}}/{{symbol.toUpperCase()}}</span>
						</div>
						<div class="right" style="color: rgb(201,201,202);">{{item.time}}</div>
					</div>
					<div class="body">
						<div>数量{{'('+item.symbol1.toUpperCase()+')'}}
							<span>{{item.cjsl}}</span>
						</div>
						<div>成交均价({{symbol.toUpperCase()}}) <span>{{(item.field_cash_amount /item.cjsl).toFixed(4)}}</span></div>
						<div style="text-align: right;">成交总额({{symbol.toUpperCase()}})<span style="right: 0;">{{item.field_cash_amount}}</span></div>
					</div>
					<div class="body" style="margin-top: .15rem;">
						<div>手续费(点卡) <span>{{ item.cjsy>0?(item.cjsy * 0.3*7).toFixed(4):0}}</span></div>
						<div>利润({{symbol.toUpperCase()}}) <span>{{Number(item.cjsy).toFixed(4) }}</span></div>
						<div style="text-align: right;">利润率(%)<span style="right: 0;">{{item.syl}}</span></div>
					</div>
				</li>
			</ul>
			<ul class="page-ui" v-if="heyue">
				<li v-for="(item,i) in list" :key="i">
					<div class="title">
						<div class="left">
							<span class="act" style="background-color: rgb(239,101,98);font-size: 12px;" v-if="item.okex_type==3">卖出平多</span>
							<span class="act" style="background-color: rgb(83,181,112);font-size: 12px;" v-if="item.okex_type==4">买入平空</span><span
							 style="font-weight: bold;"> {{item.symbol_deal}}/{{symbol.toUpperCase()}}永续</span>
						</div>
						<div class="right" style="color: rgb(201,201,202);">{{item.time}} 完全成交</div>
					</div>
					<div class="body">
						<div>委托数量{{'('+item.symbol_deal.toUpperCase()+')'}}
							<span>{{item.cjsl.toFixed(4)}}</span>
						</div>
						<div>持仓均价({{symbol.toUpperCase()}}) <span>{{item.avg_price?item.avg_price:item.cjjj}}</span></div>
						<div style="text-align: right;">平仓均价({{symbol.toUpperCase()}})<span style="right: 0;">{{item.price_avg}}</span></div>
					</div>
					<div class="body" style="margin-top: .15rem;">
						<div>手续费(点卡) <span>{{item.point_num?item.point_num:item.point_num==0?0:item.point>0&&item.cjsy>0?(item.point * 0.3*7).toFixed(4):item.point<0?0:item.cjsy>0?(item.cjsy * 0.3*7).toFixed(4):0}}</span></div>
						<div>成交利润({{symbol.toUpperCase()}}) <span>{{Number(item.cjsy).toFixed(4) }}</span></div>
						<div style="text-align: right;">利润率(%)<span style="right: 0;">{{item.syl}}</span></div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		
		data() {
			return {
				type: this.$route.query.type,
				info: {},
				list: [],
				list1: [],
				plunow: "",
				starttime: '',
				endtime: '',
				bourse: this.$route.query.bourse,
				heyue: false,
				symbol: 'usdt',
				profit: 0,
				count: 0,
				symbold: '',
				page: 1,
				state: true,
				bool: [true, false, false, false, true, false],
				active: 1,
				bool1: 0,
				isshow: 0,
				value: "",
				showfor: false,
				valuefor: "",
				show: false,
				currentDate: new Date(),
				bool2: false,
				chartData: {},
				chartData1: {},
				chartData2: {},
				ljsyv: '',
				maxcost: 0,
			}
		},
		created() {
			
			if (this.$route.query.heyeu == 1) {
				this.heyue = true
			}
			if (this.isshow == 0) {
				let date = new Date()
				let Y = date.getFullYear() + '-';
				let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				let D = date.getDate() + ' ';
				let time = Y + M + D
				this.endtime = time
				this.starttime = time
				this.jiesuan();
			}


		},
		watch: {
			isshow(newValue, oldValue) {
				if (this.isshow == 1) {
					this.bool2 = false
					this.gettime(7)
				}
				if (this.isshow == 2) {
					this.bool2 = false
					this.gettime(30)
				}
				if (this.isshow == 0) {
					this.bool2 = false
					let date = new Date()
					let Y = date.getFullYear() + '-';
					let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
					let D = date.getDate() + ' ';
					let time = Y + M + D
					this.endtime = time
					this.starttime = time
					this.list = []
					this.page = 1
					this.jiesuan();

				}
				if (this.isshow == 3) {
					this.bool2 = true
					// this.bool1 = -1
				}
			},
			symbol(newValue, oldValue) {
				this.list = []
				this.jiesuan()
			}
		},
		mounted() {


			window.addEventListener("scroll", this.handleScroll, true);
		},
		methods: {
			settime() {
				if (this.valuefor && this.value) {
					this.starttime = this.value
					this.endtime = this.valuefor
					this.list = []
					this.page = 1
					this.jiesuan()
				} else {
					this.$toast.fail({
						message: "请选择起止时间跟结束时间",
						duration: 1600
					});
				}
			},
			gettime(num) {
				this.list = []
				let date = new Date()
				let Y = date.getFullYear() + '-';
				let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				let D = date.getDate() + ' ';
				let time = Y + M + D
				let date2 = new Date(date.getTime() - (1000 * 60 * 60 * 24 * num))

				let Y1 = date2.getFullYear() + '-';
				let M2 = (date2.getMonth() + 1 < 10 ? '0' + (date2.getMonth() + 1) : date2.getMonth() + 1) + '-';
				let D3 = date2.getDate() + ' ';
				let time1 = Y1 + M2 + D3
				this.endtime = time
				this.starttime = time1
				this.starttime = time1
				this.page = 1
				this.jiesuan();
			},
			choose(item, index) {
				this.bool.forEach(i => {
					this.bool = [false, false, false, false]
				})
				this.bool[index] = !this.bool[index]
				this.symbol = item
			},
			start() {
				this.state = false;
				this.$axios.post("/index/mywallet/pointLog", {
					page: this.page,
					limit: 20
				}).then(res => {
					if (res.data.code == 0) {

						if (res.data.info.length > 0) {
							for (var i = 0; i < res.data.info.length; i++) {
								this.list1.push(res.data.info[i]);
								// this.plunow = "已加载完所有数据";
							}
							// console.log(this.list)
							this.state = true;
						} else {
							this.plunow = "暂无数据";
						}

						if (res.data.info.length < 20) {
							this.state = false;
							this.plunow = "已加载完所有数据";
						} else {
							this.state = true;
							this.plunow = "下拉更新";
						}
					}
				});
			},
			selectate(s) {
				if (s == 0) {
					this.show = true;
				} else {
					this.showfor = true;
				}
			},
			cancel(s) {
				if (s == 0) {
					this.show = false;
				} else {
					this.showfor = false;
				}
			},
			confirm(s) {
				if (s == 0) {
					this.value =
						this.currentDate.getFullYear() +
						"-" +
						(this.currentDate.getMonth() + 1) +
						"-" +
						this.currentDate.getDate();
					this.show = false;

					if (this.valuefor != "") {
						if ((new Date(this.value)) <= (new Date(this.valuefor))) {
							this.show = false;
						} else {
							this.$toast.fail({
								message: "请选择合理的时间范围",
								duration: 1600
							});
							this.value = "";
							this.show = true;
						}
					}
				} else {
					this.valuefor =
						this.currentDate.getFullYear() +
						"-" +
						(this.currentDate.getMonth() + 1) +
						"-" +
						this.currentDate.getDate();

					if ((new Date(this.value)) <= (new Date(this.valuefor))) {
						this.showfor = false;
					} else {
						this.$toast.fail({
							message: "请选择合理的时间范围",
							duration: 1600
						});
						this.valuefor = "";
						this.showfor = true;
					}
				}



			},
			jiesuan() {
				this.state = false;
				let str = ''
				if (this.heyue) {
					str = 'swapstrategy'
				} else {
					str = 'spotstrategy'
				}
				this.$axios.post(`/index/${str}/transaction_list`, {
					symbol: this.symbol,
					bourse: this.bourse,
					starttime: this.starttime,
					endtime: this.endtime,
					page: this.page,
					limit: 20
				}).then(res => {
					this.state = true;
					if (res.data.code == 0) {
						this.maxcost = res.data.max_cost
						if (res.data.list.length > 0) {
							for (var i = 0; i < res.data.list.length; i++) {
								this.list.push(res.data.list[i]);

								// this.plunow = "已加载完所有数据";
							}
							if (res.data.info.__proto__.constructor==Array) {
								let char1 = []
								let char = []
								// let num = 0
								let char2 = []
								this.ljsyv = res.data.ljsyl
							}else{
								let char1 = []
								let char = []
								// let num = 0
								let char2 = []
								 this.ljsyv = res.data.ljsyl
								
							}
							// console.log(this.list)

						} else {
							this.plunow = "暂无数据";
							this.chartData = {}
							this.chartData1 = {}
							this.chartDat2 = {}
							this.ljsyv = '0.00'
						}
						
						if (this.list.length ==res.data.count) {
							this.state = false;
							this.plunow = "已加载完所有数据";
						} else {
							this.plunow = "下拉更新";
							if(this.page == 1 && res.data.list.length <= 5){
								this.page++;
								this.jiesuan();
							}
						}
						this.profit = res.data.profit;
						this.count = res.data.count;
					}
				});

			},

			//下拉更新  vue下拉更新 下拉加载

			handleScroll() {

				var scrollTop =
					document.documentElement.scrollTop || document.body.scrollTop; //变量windowHeight是可视区的高度
				var windowHeight =
					document.documentElement.clientHeight || document.body.clientHeight; //变量scrollHeight是滚动条的总高度
				var scrollHeight =
					document.documentElement.scrollHeight || document.body.scrollHeight;
				if (scrollTop + windowHeight >= scrollHeight - 10) {
					//请求数据接口
					if (this.state) {
						this.page++;
						if (this.type == 0) {
							this.start()
						} else {
							this.jiesuan();
						}
					}
				}
			},
		},
		beforeDestroy() {
			window.removeEventListener("scroll", this.handleScroll, true);
		},


	};
</script>
<style lang="less" scoped>
	hr {
		height: 0.2rem;
		background: #edf0f3;
		border: none;
	}

	.tabul {
		font-size: 0.24rem;
		color: #999999;
		position: relative;
		height: 0.8rem;
		line-height: 0.8rem;
		border-bottom: 1px solid #edf0f3;
		display: flex;
		padding: 0 0.3rem;

		li {
			text-align: center;
			width: 16.66%;
		}

		.two {
			width: 28%;
		}

		.one {
			width: 16%;
			text-align: left;
		}

		.san,
		.four {
			width: 18%;
		}

		.san {
			width: 14%;
			margin-right: 3%;
		}

		.four {
			width: 24%;
		}

		.six {
			text-align: right;
			width: 17%;
		}
	}

	.contentul {
		font-size: 0.2rem;
		color: #999999;

		li {
			// height: 0.8rem;
			line-height: 0.4rem;
			position: relative;
			padding: 0.2rem 0.3rem;
			display: flex;

			span {
				text-align: center;
			}

			.two {
				width: 28%;
			}

			.one {
				width: 16%;
				text-align: left;
			}

			.san,
			.four {
				width: 18%;
			}

			.san {
				width: 14%;
				margin-right: 3%;
			}

			.four {
				width: 24%;
			}

			.six {
				width: 14%;
				text-align: right;
				color: #38b133;
			}
		}
	}

	.contentul .plunow {
		font-size: 0.3rem;
		text-align: center;
		display: block;
	}

	.page-ui {
		li {
			margin: 0 0.2rem;
			padding: 0.2rem 0;
			border-bottom: 1px solid #EEEEEE;
		}

		.title {
			display: flex;
			justify-content: space-between;
			margin-bottom: 0.2rem;

			.left {
				font-weight: 550;
				font-size: 0.3rem;
				color: #0057D9;

				.act {
					color: #FFFBE8;
					font-weight: 400;
					border-radius: 4px;
					padding: 1px 1.6px 0px;
					font-size: 14px;
					margin-right: 4px;
				}

				span {
					color: #000;
				}
			}

			.right {
				font-size: 0.26rem;
				margin-top: 0.05rem;
			}
		}

		.body {
			display: flex;

			div {
				flex: 1;
				text-align: left;
				color: rgb(201, 201, 202);
				font-size: 0.26rem;
				position: relative;
				height: 0.71rem;

				span {
					position: absolute;
					top: 0.45rem;
					left: 0;
					font-size: 0.27rem;
					color: rgb(36, 51, 69);
				}
			}
		}
	}

	.test {
		padding-left: 0.3rem;
		// color: #999999;
		font-size: 0.28rem;
	}

	.seltbox {
		display: flex;
		padding: 0 0.3rem;

		p {
			font-size: 0.24rem;
			margin-right: 0.3rem;

			input[type="checkbox"] {
				-webkit-appearance: none;
				background: #fff;
				width: 0.3rem;
				height: 0.3rem;
				border: 1px solid rgba(210, 210, 210, 1);
				margin-right: 0.1rem;
				position: relative;
				top: 0.03rem;
			}

			input[type="checkbox"]:checked {
				background: url("../assets/gou.png") left top no-repeat;
				background-size: 100%;
			}
		}
	}

	.page-item {
		display: flex;
		// padding: 0rem 0.2rem;
		font-size: 0.28rem;
		color: rgb(153, 161, 167);

		div {
			flex: 1;
			// margin: .1rem 0rem;
			height: .7rem;
			line-height: .7rem;
			text-align: center;
		}
	}

	.active {
		// background: #CCCCCC;
		color: rgb(34, 132, 253);
		border: 1px solid #CEE0F3;
	}

	.active1 {
		color: rgb(34, 132, 253);
		// border: 1px solid #CEE0F3;
		border-bottom: 2px solid rgb(34, 132, 253);
	}

	.daybox {
		border: 1px solid #dcdcdc;
		width: 75%;
		// margin: 0rem auto;
		margin-left: .3rem;
		display: flex;
		justify-content: space-between;
		height: .7rem;
		line-height: .7rem;
		padding: 0 0.3rem 0 0;

		p {
			text-align: center;
		}

		div {
			display: flex;
			font-size: 0.3rem;
		}

		i {
			color: #ccc;
			transform: rotate(90deg);
			margin-right: 0.2rem;
		}

		input {
			font-size: 0.28rem;
			text-align: center;
			width: 85%;
		}
	}

	.datebox {
		box-shadow: 0px 1px 8px 3px #88888836;
		background: #999999;
		z-index: 1;
		width: 92%;
		margin: -0.3rem auto 0;
		position: fixed;
		left: 4%;
	}
</style>
