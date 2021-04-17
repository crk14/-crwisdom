<template>
	<div>
		<div class="body">
			<div :class="{'active':isshow =='1分钟'}" @click="isshow = '1分钟'">1分钟</div>
			<div :class="{'active':isshow =='5分钟'}" @click="isshow = '5分钟'">5分钟</div>
			<div :class="{'active':isshow =='15分钟'}" @click="isshow = '15分钟'">15分钟</div>
			<div :class="{'active':isshow =='1小时'}" @click="isshow = '1小时'">1小时</div>
			<div :class="{'active':isshow =='4小时'}" @click="isshow = '4小时'">4小时</div>
			<div :class="{'active':isshow =='一天'}" @click="isshow = '一天'">一天</div>
		</div>
		<!-- <h1>Echarts绘制k线图</h1> -->
		<!-- <div class="body-1" style="padding-left: 0.2rem;">
			<span style="color: rgb(215,80,198);">MA5 {{ma5V}}</span>
			<span style="color: rgb(81,145,231);">MA10 {{ma10V}}</span>
			<span style="color: rgb(79,216,131);">MA30 {{ma30V}}</span>
			<span style="color: rgb(105,120,164);">MA60 {{ma60V}}</span>
		</div> -->
		<div id="echartContainer" ref="echartContainer" style="width:100%; height:280px"></div>
	</div>
</template>

<script>
	// var echarts = require("echarts");
	// var pako = require("pako")
	import pako from 'pako'
	import {wss} from '../api/ws.js'
	export default {
		data() {
			return {
				isshow: '1分钟',
				data: [

					// ["2019-7-23", 15.01, 14.83, 14.72, 15.01, 24.0, 0, -0.09, -0.45, -0.4]
				],
				symbol: '',
				time: null,
				ma5V: '',
				ma10V: '',
				ma30V: '',
				ma60V: '',
				socket:''
				// pirse:''
			};
		},
		created() {
			wss()
			// this.symbol = (this.$route.query.symboldeal + this.$route.query.symbol).toLowerCase()
			// this.getdata('1min')
			// this.initWebSocket()
			// console.log(pako)
			// let str = 'asdad'
			// console.log(pako.inflate(str,{
					// to: 'string'
				// }))

			

		},
		watch: {
			isshow(newvalue, oldvalue) {
				if (newvalue == '1分钟') {
					this.getdata('1min')
				} else if (newvalue == '5分钟') {
					this.getdata('5min')
				} else if (newvalue == '15分钟') {
					this.getdata('15min')
				} else if (newvalue == '1小时') {
					this.getdata('1hour')
				} else if (newvalue == '4小时') {
					this.getdata('4hour')
				} else if (newvalue == '一天') {
					this.getdata('1day')
				}
				clearInterval(this.time)
				this.time = null
			}
		},
		methods: {
			initWebSocket() { //初始化weosocket
				// K 线相关
				let hburl = 'wss://api.huobipro.com/ws';  // 实时币种价格
				let haurl = 'wss://api.huobi.be/ws';
				
				
				let requestK = { // 请求对应信息的数据
				    sub: "market.bchusdt.kline.1min",
				    id: "bchusdt",
				};
				
				let subK = { // 订阅数据
				    sub: "market.btcusdt.kline.1min",
				    id: "btcusdt"
				};
				
				let socketK = new WebSocket(haurl);
				this.socket =socketK
				socketK.onopen = function () {
				    console.log("connection establish");
				    socketK.send(JSON.stringify(subK));
					// console.log(6)
				    socketK.send(JSON.stringify(requestK));
					console.log(6)
				};
				
				socketK.onmessage = function (event) {
				    let blob = event.data;
				    let reader = new FileReader();
				    reader.onload = function (e) {
				        let ploydata = new Uint8Array(e.target.result);
				        let msg = pako.inflate(ploydata, {to: 'string'});
				        handleData(msg);
				    };
				    reader.readAsArrayBuffer(blob, "utf-8");
				};
				socketK.onclose = function () {
				    console.log('connection closed');
				};
				
				// 处理接收到的信息
				function handleData(msg) {
				    let data = JSON.parse(msg);
				    if (data.ping) {
				        // 如果是 ping 消息
				        sendHeartMessage(data.ping);
				    } else if (data.status === 'ok') {
				        // 响应数据
				        handleReponseData(data);
				    } else {
				        // 数据体
				        console.log(data)
				    }
				}
				
				// 发送响应信息
				function sendHeartMessage(ping) {
				    socketK.send(JSON.stringify({"pong": ping}));
				}
				
				function handleReponseData(data) {
				}
			},
			getdata(time) {
				let str = `https://api.huobi.be/market/history/kline?period=${time}&size=150&symbol=${this.symbol}`
				// if (this.$route.query.type) {
				// 	str =
				// 		'https://www.okex.com/api/swap/v3/instruments/BTC-USD-SWAP/candles?start=2021-03-01T02:31:00.000Z&end=2021-03-02T02:55:00.000Z&granularity=180'
				// }
				this.$axios.get(str)
					.then(res => {
						let data = res.data.data.reverse()
						let newarr = []
						data.forEach((item, index) => {
							let time = new Date(item.id * 1000)
							let newtime = this.shijiantime(time)
							let arr = []
							//数据模型 time0 open1 close2 min3 max4 vol5 tag6 macd7 dif8 dea9
							// {open:3.89,close:3.89,low:3.86,high:3.93},
							arr.push(newtime)
							arr.push(item.open)
							arr.push(item.close)
							arr.push(item.low)
							arr.push(item.high)
							let num = (item.amount / 1000).toFixed(2) + 'k'
							arr.push(num)
							let obj = {
								open: item.open,
								close: item.close,
								low: item.low,
								high: item.high,
							}
							newarr.push(obj)
							let macd = this.fn1(newarr)
							arr.push(0)
							arr.push(macd.macd[index].toFixed(4))
							arr.push(macd.dif[index].toFixed(4))
							arr.push(macd.dea[index].toFixed(4))
							this.$set(this.data, index, arr)
							if (index == 149) {
								localStorage.setItem('pirse', item.close)
							}
						})
						this.getkxian()
						this.gettime(time)
					})
			},
			gettime(time1) {
				this.time = setInterval(() => {
					let str = `https://api.huobi.be/market/history/kline?period=${time1}&size=150&symbol=${this.symbol}`
					this.$axios.get(str)
						.then(res => {
							let data = res.data.data.reverse()
							let newarr = []
							data.forEach((item, index) => {
								let time = new Date(item.id * 1000)
								let newtime = this.shijiantime(time)
								let arr = []
								arr.push(newtime)
								arr.push(item.open)
								arr.push(item.close)
								arr.push(item.low)
								arr.push(item.high)
								let num = (item.amount / 1000).toFixed(2) + 'k'
								arr.push(num)
								let obj = {
									open: item.open,
									close: item.close,
									low: item.low,
									high: item.high,
								}
								newarr.push(obj)
								let macd = this.fn1(newarr)
								arr.push(0)
								arr.push(macd.macd[index].toFixed(4))
								arr.push(macd.dif[index].toFixed(4))
								arr.push(macd.dea[index].toFixed(4))
								this.$set(this.data, index, arr)
								if (index == 149) {
									localStorage.setItem('pirse', item.close)
								}
							})
							this.getkxian()
						})
				}, 4000)

			},
			shijiantime(myDate) {
				let tiem = myDate.getMonth() + 1 + '-' + myDate.getDate() + ' ' + myDate.getHours() +
					':' + myDate.getMinutes()
				return tiem;
			},
			getkxian() {
				var data0 = splitData(this.data);
				// macd计算
				function splitData(rawData) {
					var categoryData = [];
					var values = [];
					var macds = [];
					var difs = [];
					var deas = [];
					for (var i = 0; i < rawData.length; i++) {
						categoryData.push(rawData[i].splice(0, 1)[0]);
						values.push(rawData[i]);
						macds.push(rawData[i][6]);
						difs.push(rawData[i][7]);
						deas.push(rawData[i][8]);

					}
					return {
						categoryData: categoryData,
						values: values,
						macds: macds,
						difs: difs,
						deas: deas
					};
				}
				// ma均线函数
				let that = this

				function calculateMA(dayCount) {
					var result = [];
					for (var i = 0, len = data0.values.length; i < len; i++) {
						if (i < dayCount) {
							result.push("-");
							continue;
						}
						var sum = 0;
						for (var j = 0; j < dayCount; j++) {
							sum += data0.values[i - j][1];
						}
						result.push(sum / dayCount);
					}
					if (result[149]) {
						if (dayCount == 5) {
							that.ma5V = result[199].toFixed(1)
						}
						if (dayCount == 10) {
							that.ma10V = result[199].toFixed(1)
						}
						if (dayCount == 30) {
							that.ma30V = result[199].toFixed(1)
						}
						if (dayCount == 60) {
							that.ma60V = result[199].toFixed(1)
						}
					}

					return result;
				}
				// k线配置项
				var option = {
					tooltip: {
						trigger: 'axis', // 触发类型，默认数据触发，见下图，可选为：'item' ¦ 'axis'
						axisPointer: {
							type: 'cross',
						},
						confine: true,
						textStyle: {
							fontSize: 12
						},
						formatter(params) {
							const item = params[0];
							// console.log(item)
							if (item.seriesType == 'candlestick') {
								return `
							 <p>时间：${item.axisValue}</p>
							  <p>开盘：${item.data[1]}</p>
							<p>最高：${item.data[4]}</p>
							<p>最低：${item.data[3]}</p>
							<p>收盘：${item.data[2]}</p>
							<p>成交量：${item.data[5]}</p>
							 `;
							} else {
								return `
					<p>${item.seriesName}：${item.value}</p>
					`
							}

						}
					},
					//高度
					grid: [{
							left: "0%",
							top: "0",
							height: "75%"
						},
						{
							left: "0%",
							right: "10%",
							top: "82%",
							height: "15%",
						}
					],
					xAxis: [{
							type: "category",
							data: data0.categoryData,
							scale: true,
							boundaryGap: false,
							axisLine: {
								onZero: false,
								lineStyle: {
									color: "#adadad"
								}
							},
							splitLine: {
								show: false
							},
							splitNumber: 20
						},
						{
							type: "category",
							gridIndex: 1,
							data: data0.categoryData,
							axisLine: {
								// onZero: false,
								lineStyle: {
									color: "#adadad"
								}
							},
							axisLabel: {
								show: false
							}
						}
					],
					yAxis: [{
							scale: true,
							splitArea: {
								show: false
							},
							axisLine: {
								lineStyle: {
									color: "#adadad"
								}
							},
							position: "right"
						},
						{
							gridIndex: 1,
							splitNumber: 3,
							axisLine: {
								onZero: false
							},
							axisTick: {
								show: false
							},
							splitLine: {
								show: false
							},
							axisLabel: {
								show: true
							},
							axisLine: {
								lineStyle: {
									color: "#adadad"
								}
							},
							position: "right"
						}
					],
					dataZoom: [{
							type: "inside",
							start: 80,
							end: 60
						},
						// {
						//   show: true,
						//   type: "slider",
						//   y: "90%",
						//   start: 50,
						//   end: 100
						// },
						{
							show: false,
							xAxisIndex: [0, 1],
							type: "slider",
							start: 20,
							end: 100
						},

					],
					series: [{
							// name: "555",
							type: "candlestick",
							data: data0.values,
							itemStyle: {
								color: '#00aa11', // 阳线填充颜色
								color0: '#ff3200', // 阴线填充颜色
								borderColor: '#00aa11',
								borderColor0: '#ff3200',
								borderWidth: 1,
								// lineStyle: {
								// 	width: 1,
								// 	color: '#ff3200', // 阳线填充颜色
								// 	color0: '#00aa11', // 阴线边框颜色
								// },
							},
							markPoint: {
								data: [{
									name: "XX标点"
								}]
							},
							markLine: {
								silent: true,
								data: [{
									yAxis: 2222
								}]
							}
						},
						// {
						// 	name: "MA5",
						// 	type: "line",
						// 	color: 'rgb(215,80,198)',
						// 	data: calculateMA(5),
						// 	smooth: true,
						// 	lineStyle: {
						// 		normal: {
						// 			opacity: 0.5,
						// 			width: 1.5
						// 		}
						// 	},
						// 	symbolSize: 0,
						// },
						// {
						// 	name: "MA10",
						// 	type: "line",
						// 	color: 'rgb(81,145,231)',
						// 	data: calculateMA(10),
						// 	smooth: true,
						// 	lineStyle: {
						// 		normal: {
						// 			opacity: 0.5,
						// 			width: 1.5
						// 		}
						// 	},
						// 	symbolSize: 0,
						// },
						// {
						// 	name: "MA30",
						// 	type: "line",
						// 	color: 'rgb(79,216,131)',
						// 	data: calculateMA(30),
						// 	smooth: true,
						// 	lineStyle: {
						// 		normal: {
						// 			opacity: 0.5,
						// 			width: 1.5
						// 		}
						// 	},
						// 	symbolSize: 0,
						// },
						// {
						// 	name: "MA60",
						// 	type: "line",
						// 	color: 'rgb(105, 120, 164)',
						// 	data: calculateMA(60),
						// 	smooth: true,
						// 	lineStyle: {
						// 		normal: {
						// 			opacity: 0.5,
						// 			width: 1.5
						// 		}
						// 	},
						// 	symbolSize: 0,
						// },
						{
							name: "MACD",
							type: "bar",
							xAxisIndex: 1,
							yAxisIndex: 1,
							data: data0.macds,
							itemStyle: {
								normal: {
									color: function(params) {
										var colorList;
										if (params.data >= 0) {
											colorList = "#ff3200";
										} else {
											colorList = "#ff3200";
										}
										return colorList;
									}
								}
							}
						},
						{
							name: "DIF",
							type: "line",
							color: 'rgb(105, 120, 164)',
							xAxisIndex: 1,
							yAxisIndex: 1,
							symbolSize: 0,
							lineStyle: {
								normal: {
									opacity: 0.5,
									width: 1
								}
							},
							data: data0.difs
						},
						{
							name: "DEA",
							type: "line",
							color: 'rgb(0,192,131)',
							xAxisIndex: 1,
							yAxisIndex: 1,
							symbolSize: 0,
							lineStyle: {
								normal: {
									opacity: 0.5,
									width: 1
								}
							},
							data: data0.deas
						}
					]
				};
				// 进行初始化
				var charts = this.echarts.init(this.$refs.echartContainer);
				charts.setOption(option);
			},
			fn1(input) {
				var macd;
				var calcEMA, calcDIF, calcDEA, calcMACD;
				/*
				 * 计算EMA指数平滑移动平均线，用于MACD
				 * @param {number} n 时间窗口
				 * @param {array} data 输入数据
				 * @param {string} field 计算字段配置
				 */
				calcEMA = function(n, data, field) {
					var i, l, ema, a;
					a = 2 / (n + 1);
					if (field) {
						//二维数组
						ema = [data[0][field]];
						for (i = 1, l = data.length; i < l; i++) {
							ema.push(a * data[i][field] + (1 - a) * ema[i - 1]);
						}
					} else {
						//普通一维数组
						ema = [data[0]];
						for (i = 1, l = data.length; i < l; i++) {
							ema.push(a * data[i] + (1 - a) * ema[i - 1]);
						}
					}
					return ema;
				};

				/*
				 * 计算DIF快线，用于MACD
				 * @param {number} short 快速EMA时间窗口
				 * @param {number} long 慢速EMA时间窗口
				 * @param {array} data 输入数据
				 * @param {string} field 计算字段配置
				 */
				calcDIF = function(short, long, data, field) {
					var i, l, dif, emaShort, emaLong;
					dif = [];
					emaShort = calcEMA(short, data, field);
					emaLong = calcEMA(long, data, field);
					for (i = 0, l = data.length; i < l; i++) {
						dif.push(emaShort[i] - emaLong[i]);
					}
					return dif;
				};

				/*
				 * 计算DEA慢线，用于MACD
				 * @param {number} mid 对dif的时间窗口
				 * @param {array} dif 输入数据
				 */
				calcDEA = function(mid, dif) {
					return calcEMA(mid, dif);
				};

				/*
				 * 计算MACD
				 * @param {number} short 快速EMA时间窗口
				 * @param {number} long 慢速EMA时间窗口
				 * @param {number} mid dea时间窗口
				 * @param {array} data 输入数据
				 * @param {string} field 计算字段配置
				 */
				calcMACD = function(short, long, mid, data, field) {
					var i, l, dif, dea, macd, result;
					result = {};
					macd = [];
					dif = calcDIF(short, long, data, field);
					dea = calcDEA(mid, dif);
					for (i = 0, l = data.length; i < l; i++) {
						macd.push((dif[i] - dea[i]) * 2);
					}
					result.dif = dif;
					result.dea = dea;
					result.macd = macd;
					return result;
				};

				macd = calcMACD(12, 26, 9, input, "close");
				return macd
				// console.log("DIF:",macd.dif);
				// console.log("DEA:",macd.dea);
				// console.log("MACD:",macd.macd);
			}
		},
		mounted() {
			// this.getkxian()
		},
		beforeDestroy() {
			// this.socket.close()
			clearInterval(this.time)
			this.time = null
			localStorage.setItem('pirse', '')
		},
	};
</script>

<style scoped lang="less">
	.titme {
		display: flex;
		padding: 0 .28rem;

		.left {
			flex: 1;
			color: rgb(76, 180, 113);

			.top {
				font-size: 20px;
				line-height: 22px;
				font-weight: 550;
				margin-top: 9px;
			}

			.buttom {
				font-size: 12px;
				line-height: 20px;

				div {
					padding: 1px 1px;
					background-color: rgb(76, 180, 113);
					margin-right: 5px;
					color: #FFFFFF;
				}
			}

			div {
				display: flex;
			}
		}

		.right {
			display: flex;
			flex: 1;
			font-size: 14px;
			line-height: 18px;

			.one {
				font-size: 13px;
				color: #adadad;
			}

			.two {
				flex: 1;
				text-align: right;

			}
		}
	}

	.body {
		display: flex;
		// background-color: #23253a;
		width: 100%;
		padding-left: 15px;

		// margin-bottom: 4px;
		div {
			margin-right: 15px;
			// color: #ffffff;
			color: #adadad;
			line-height: 29px;
			font-size: 14px;
		}

		.active {
			color: #d6a036;

		}
	}

	.body-1 {
		display: flex;
		width: 100%;
		margin-bottom: 4px;
		font-size: 12px;
		padding-left: 3px;

		span {
			margin-right: 6px;
		}
	}

	.button {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		display: flex;
		color: #FFFFFF;
		line-height: 36px;

		button {
			flex: 1;
		}

		.but-1 {
			background-color: rgb(78, 183, 114);
		}

		.but-2 {
			background-color: rgb(238, 103, 97);

		}
	}
</style>
