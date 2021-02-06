<template>
	<div class="contirecord">
		<div class="tophader" @click="$router.back()">
			<van-icon name="arrow-left" />
			<p>永续合约</p>
		</div>
	<!-- 	<van-tabs v-model="active" color="rgb(78,183,114)" title-active-color="rgb(78,183,114)" line-width="32px">
			<van-tab title="开仓"> -->
				<div class="item-one" @click="bool1 = false;bool = false;bool2=false">
					<div class="title">
						<div class="left">
							<span @click.stop="bool1=!bool1">{{shuju}}</span>
							<div class="kuang" v-show="bool1" style="height: 74px;">
								<div @click.stop="fn1('BTCUSDT永续')">BTCUSDT永续</div>
								<div @click.stop="fn1('ETHUSDT永续')">ETHUSDT永续</div>
							</div>
						</div>
						<van-icon @click.stop="bool1=!bool1" v-show="!bool1" name="arrow-down" color="rgb(211,211,211)" size="15" />
						<van-icon @click.stop="bool1=!bool1" v-show="bool1" name="arrow-up" color="rgb(211,211,211)" size="15" />
						<div class="right">
							<div>₮11330.7</div>
							<!-- <div class="one" @click="$router.push('test')">
								<img src="../assets/quxian.png"  />
							</div> -->
						</div>
					</div>
					<test></test>
					<div class="title-c">
						<div></div>
						当前持仓</div>
					<div class="body">
					<div class="right ">
						<div class="left2">
							<div style="display: flex;"><span style="color: #2ead65;">ETHUSDT永续</span>
							<div class="ri"><span style="color: #2ead65;">多</span><input  v-model="beishu" type="number" />X</div></div>
						</div>
						<div class="left2">
							<div><div>持仓(张)</div> <span>50</span></div>
							<div>
							 <div>收益</div> <span>-24.85</span></div>
						</div>
						<!-- <div class="left2 left3">
						<div>保证金<span>110.68</span></div>
						<div>收益率<span>-24.85%</span></div>
						</div> -->
						<div class="left2">
						<div>开仓均价<span>1665.24</span></div>
						<div>预估强平价 <span>3071.68</span></div>
						</div>
					</div>
					<div class="right">
						<div class="left2">
							<div style="display: flex;" ><span style="color:#e35e5e;">ETHUSDT永续</span>
							<div class="ri"><span style="color:#e35e5e;">空</span><input  v-model="beishu" type="number" />X</div>
							</div>
						</div>
						<div class="left2">
							<div>
							<div>持仓(张)</div>
							<span>50</span></div>
							<div>
								<div>收益</div> <span>-24.85</span></div>
						</div>
						<!-- <div class="left2">
						<div>保证金<span>110.68</span></div>
						<div>收益率<span>-24.85%</span></div>
						</div> -->
						<div class="left2">
						<div>开仓均价<span>1665.24</span></div>
						<div>预估强平价<span>3071.68</span></div>
						</div>
					</div>
					</div>
					<div class="title-c" style="margin-top: 5px;">
						<div></div>
						闪电交易(市价)</div>
					<div class="body" >
						
						<div class="right">
							<div class="one">
								<div class="left" :class="{'left1':bool4}" @click="bool4=true">多</div>
								<div class="right" :class="{'right1':!bool4}" @click="bool4=false">空</div>
							</div>
							<div class="about"></div>
							<div class="two">
							<!-- 	<div class="le">
									<div class="kuang" v-show="bool2" style="height: 53px">
										<div @click="fn2('限价委托',true)">限价委托</div>
										<div @click="fn2('市价委托',true)">市价委托</div>
									</div>
									<span @click.stop="bool2=!bool2">{{weituo2}}</span>
									<van-icon v-show="!bool2" @click.stop="bool2=!bool2" name="arrow-down" color="rgb(211,211,211)" size="15" />
									<van-icon v-show="bool2" @click.stop="bool2=!bool2" name="arrow-up" color="rgb(211,211,211)" size="15" />
								</div> -->
								<div class="ri">杠杆<input v-model="beishu" type="number" />倍</div>
								<div  class="three" :class="{'backgs':bool3==true}" @click="bool3=true;number2=''">
									<div>{{number2?number2:'数量'}}</div>
									<div><input v-show="!number2" v-model="number" type="number" @focus="bool3=true;number2=''" @blur="bool3=false" />
										张 <span v-show="!number2">≈ ₮0.00</span> </div>
								</div>
							</div>
							<!-- <div style="margin-bottom: 6px;" class="three" v-show="weituo2 =='限价委托'" :class="{'backgs':parces=='价格 '}">
								<div :class="{'colors':parces!='价格'}">{{parces}}</div>
								<div><input v-model="parse" type="number" @focus="parces='价格 '" @blur="parces='价格'" /> ₮</div>
							</div> -->
							<!-- <div class="four" v-show="weituo2 =='市价委托'">
								<div>以当前市场最优价格下单</div>
							</div> -->
							<!-- <div class="four" v-show="weituo2 =='限价委托'">
								<div :class="{'backgs2':parces=='对手价'}" @click="parces='对手价'">对手价</div>
								<div :class="{'backgs2':parces=='买一价'}" @click="parces='买一价'" style="margin: 0 4px;">买一价</div>
								<div :class="{'backgs2':parces=='卖一价'}" @click="parces='卖一价'">卖一价</div>
							</div> -->
							
							<!-- <div class="four">
								<div :class="{'backgs2':number2=='10%'}" @click="bool3 = true;number2='10%'">10%</div>
								<div :class="{'backgs2':number2=='20%'}" @click="bool3 = true;number2='20%'" style="margin: 0 4px;">20%</div>
								<div :class="{'backgs2':number2=='50%'}" @click="bool3 = true;number2='50%'" style="margin-right: 4px;">50%</div>
								<div :class="{'backgs2':number2=='100%'}" @click="bool3 = true;number2='100%'">100%</div>
							</div> -->
						<!-- 	<div class="six">
								<div>可用(USDT) <span>0.00</span></div>
								<div class="flex">
									<div>可开{{bool4?'多':'空'}}(张) <span>0.00</span> </div>
									<div>
										<div class="div" :class="{'backgs2':parces1=='市价'}" @click="parces1='市价'">市价</div>
										<div class="div" :class="{'backgs2':parces1=='限价'}" @click="parces1='限价'" style="margin-left: 7px;">限价</div>
									</div>
								</div>
							</div> -->
						<!-- 	<div class="seven">
								<van-checkbox v-model="checked" icon-size="14px">设置止盈</van-checkbox>
								<van-checkbox v-model="checked1" icon-size="14px">设置止损</van-checkbox>

							</div> -->
						<!-- 	<div class="three" v-show="checked" :class="{'backgs':parces3}" style="font-size: 13px;margin-bottom: 7px;">
								<div>止盈触发价格</div>
								<div><input v-model="parse2" type="number" @focus="parces3=true" @blur="parces3=false" /> ₮</div>
							</div>
							<div class="three" v-show="checked1" :class="{'backgs':parces4}" style="font-size: 13px;margin-bottom: 7px;">
								<div>止损触发价格</div>
								<div><input v-model="parse3" type="number" @focus="parces4=true" @blur="parces4=false" /> ₮</div>
							</div>
							<div class="three" v-show="checked&&parces1=='限价'" :class="{'backgs':parces4}" style="font-size: 13px;margin-bottom: 7px;">
								<div>止盈委托价格</div>
								<div><input v-model="parse4" type="number" @focus="parces4=true" @blur="parces4=false" /> ₮</div>
							</div>
							<div class="three" v-show="checked1&&parces1=='限价'" :class="{'backgs':parces4}" style="font-size: 13px;margin-bottom: 7px;">
								<div>止损触发价格</div>
								<div><input v-model="parse5" type="number" @focus="parces4=true" @blur="parces4=false" /> ₮</div>
							</div>
							<div class="three" :class="{'backgs':isshow2==true}" v-show="checked || checked1" style="font-size: 13px;">
								<div>数量</div>
								<div><input v-model="number3" type="number" @focus="isshow2=true" @blur="isshow2=false" /> 张</div>
							</div> -->

							<div class="button" :class="{'active-b':!bool4}">{{bool4?'买入开多':'卖出开空'}}</div>
						  <div class="button" :class="{'active-b':!bool4}">{{bool4?'卖出平多':'买入平空'}}</div>
					</div>

					</div>
					<p class="hr" style="margin-top: 4px"></p>
					<!-- <div class="buttom">
						<div class="one">
							<div @click="active2 =1" :class="{'backgs3':active2 ==1 }">限价委托</div>
							<div @click="active2 =2" :class="{'backgs3':active2 ==2}">止盈止损</div>
						</div>
						<p class="p">本合约暂无委托</p>
					</div> -->
				</div>
			<!-- </van-tab> -->
			<!-- <van-tab title="平仓">
				<div class="item-one" @click="bool1 = false;bool = false;bool2=false">
					<div class="title">
						<div class="left">
							<span @click.stop="bool1=!bool1">{{shuju}}</span>
							<div class="kuang" v-show="bool1" style="height: 74px;">
								<div @click="fn1('BTCUSDT永续')">BTCUSDT永续</div>
								<div @click="fn1('ETHUSDT永续')">ETHUSDT永续</div>
							</div>
						</div>
						<van-icon @click.stop="bool1=!bool1" v-show="!bool1" name="arrow-down" color="rgb(211,211,211)" size="15" />
						<van-icon @click.stop="bool1=!bool1" v-show="bool1" name="arrow-up" color="rgb(211,211,211)" size="15" />
						<div class="right">
							<div>₮11330.7</div>
							<div class="one" @click="$router.push('test')">
								<img src="../assets/quxian.png" />
							</div>
						</div>
					</div>
					<test></test>
					<div class="body">
						<div class="left" style="margin-right: 10px;">
							<div class="one">
								<span @click.stop="bool=!bool">{{jindu}}</span>
								<div class="kuang" v-show="bool">
									<div @click="fn('0.1')">0.1</div>
									<div @click="fn('1')">1</div>
									<div @click="fn('10')">10</div>
								</div>
								<van-icon @click.stop="bool=!bool" v-show="!bool" name="arrow-down" color="rgb(211,211,211)" size="15" />
								<van-icon @click.stop="bool=!bool" v-show="bool" name="arrow-up" color="rgb(211,211,211)" size="15" />
							</div>
							<div class="two">
								<div class="left">
									<div style="margin-bottom: 3px;color: rgb(149,149,149);">价格(₮)</div>
									<div>11332.7</div>
									<div>11332.7</div>
									<div>11332.7</div>
									<div>11332.7</div>
									<div>11332.7</div>
								</div>
								<div class="right">
									<div style="margin-bottom: 3px;color: rgb(149,149,149);">数量(张)</div>
									<div>50</div>
									<div>50</div>
									<div>50</div>
									<div>50</div>
									<div>50</div>
								</div>
							</div>
							<p></p>
							<div class="two">
								<div class="left left-1">
									<div>11332.7</div>
									<div>11332.7</div>
									<div>11332.7</div>
									<div>11332.7</div>
									<div>11332.7</div>
								</div>
								<div class="right">
									<div>50</div>
									<div>50</div>
									<div>50</div>
									<div>50</div>
									<div>50</div>
								</div>
							</div>
							<p></p>
							<div class="three">
								<div class="left">
									<div>标记价格</div>
									<div>最新指数</div>
									<div>资金费率</div>
									<div v-show="bool5">距费用结算</div>
									<div v-show="bool5">当期资金费率</div>
									<div v-show="bool5">预测资金费率</div>
								</div>
								<div class="right1">
									<div>₮11330.7</div>
									<div>₮11330.7</div>
									<div style="color: #5784c6;" @click="bool5=!bool5">{{bool5?'收起':'详情'}}</div>
									<div v-show="bool5">00:56:50</div>
									<div v-show="bool5">0.005%</div>
									<div v-show="bool5">-0.024%</div>
								</div>
							</div>
						</div>
						<div class="right">
							<div class="one">
								<div class="left" :class="{'right1':bool6}" @click="bool6=true">平多</div>
								<div class="right" :class="{'left1':!bool6}" @click="bool6=false">平空</div>
							</div>
							<div class="about"></div>
							<div class="two">
								<div class="le">
									<div class="kuang" v-show="bool2" style="height: 53px">
										<div @click="fn2('限价委托')">限价委托</div>
										<div @click="fn2('市价委托')">市价委托</div>
									</div>
									<span @click.stop="bool2=!bool2">{{weituo}}</span>
									<van-icon @click.stop="bool2=!bool2" v-show="!bool2" name="arrow-down" color="rgb(211,211,211)" size="15" />
									<van-icon @click.stop="bool2=!bool2" v-show="bool2" name="arrow-up" color="rgb(211,211,211)" size="15" />
								</div>
								<div class="ri"><input v-model="beishu" type="number" />X</div>

							</div>
							<div class="three" :class="{'backgs':parces=='价格 '}" v-show="weituo =='限价委托'">
								<div :class="{'colors':parces!='价格'}">{{parces}}</div>
								<div><input v-model="parse6" type="number" @focus="parces='价格 '" @blur="parces='价格'" /> ₮</div>
							</div>
							<div class="four" v-show="weituo =='市价委托'">
								<div>以当前市场最优价格下单</div>
							</div>
							<div class="four" v-show="weituo =='限价委托'">
								<div :class="{'backgs2':parces=='对手价'}" @click="parces='对手价'">对手价</div>
								<div :class="{'backgs2':parces=='买一价'}" @click="parces='买一价'" style="margin: 0 4px;">买一价</div>
								<div :class="{'backgs2':parces=='卖一价'}" @click="parces='卖一价'">卖一价</div>
							</div>
							<div class="three" :class="{'backgs':bool3==true}" @click="bool3=true;number7=''">
								<div>{{number7?number7:'数量'}}</div>
								<div><input v-show="!number7" v-model="number4" type="number" @focus="bool3=true;number7=''" @blur="bool3=false" />
									张 <span v-show="!number7">≈ ₮0.00</span> </div>
							</div>
							<div class="four">
								<div :class="{'backgs2':number7=='10%'}" @click="bool3 = true;number7='10%'">10%</div>
								<div :class="{'backgs2':number7=='20%'}" @click="bool3 = true;number7='20%'" style="margin: 0 4px;">20%</div>
								<div :class="{'backgs2':number7=='50%'}" @click="bool3 = true;number7='50%'" style="margin-right: 4px;">50%</div>
								<div :class="{'backgs2':number7=='100%'}" @click="bool3 = true;number7='100%'">100%</div>
							</div>
							<div class="six">
								<div>可用(USDT) <span>0.00</span></div>
								<div>可开{{bool6?'多':'空'}}(张) <span>0.00</span></div>
							</div>

							<div class="button">{{bool6?'卖出平多':'买入平空'}}</div>
						</div>

					</div>
					<p class="hr" style="margin-top: 4px"></p>
				</div>
			</van-tab> -->
			<!-- <van-tab title="持仓">
				<div class="body">
					<div v-for="(item1,index1) in list" :key="index1">
						<p v-if="item1.account>0 && index1 %2 ==0" style="padding: .2rem;font-size: 18px;border-top: 5px solid rgb(247,248,250);">{{item1.symbol_deal}}{{symbol}}
							账户权益:{{item1.account}}</p>
						<p v-if="item1.account>0 && index1 %2 !=0" style="padding: .2rem;font-size: 18px;border-top: 5px solid rgb(247,248,250);">{{item1.symbol_deal}}{{symbol}}
							账户权益:{{item1.account}}</p>
						<div class="item" v-for="(item,index) in item1" :key="index" v-show="item.avg_cost">
							<div class="title">{{item1.symbol_deal}}{{symbol}}永续
								<div v-show="!shuju1" :class="{'active2':item.side != 'long'}">{{item.side == 'long'?'多头':'空头'}}{{item.leverage}}x</div>
							</div>
							<div class="one">
								<div>开仓均价</div>
								<div>未实现盈亏</div>
							</div>
							<div class="two">
								<div>${{item.avg_cost}}</div>
								<div>{{item.unrealized_pnl}} USDT</div>
							</div>
							<div class="one">
								<div>预估强平价</div>
								<div>浮动收益率</div>
							</div>
							<div class="two">
								<div>${{item.liquidation_price}}</div>
								<div>{{item.profit_rate}}%</div>
							</div>
							<p class="p"></p>
							<div class="three">
								<div>剩余可开<span>{{item.open_max}} 张</span> </div>
								<div>保证金 <span>{{item.margin}} USDT</span></div>
							</div>
							<div class="three">
								<div>持仓量<span>{{item.position}} 张</span> </div>
								<div>保证金率 <span>{{(item1.margin_ratio*100).toFixed(2)}}%</span></div>
							</div>
							<div class="three" style="padding-bottom: 5px;">
								<div>可平量<span>{{item.avail_position}} 张</span> </div>
								<div>维持保证金率 <span>{{(item.maint_margin_ratio*100).toFixed(2)}}%</span></div>
							</div>
							<p class="p"></p>
						</div>
					</div>
				</div>
			</van-tab> -->
		<!-- </van-tabs> -->
		
	</div>
</template>

<script>
	import Vue from "vue";
	// import StompJs from 'stompjs'
	import {
		Checkbox
	} from "vant";
	Vue.use(Checkbox);
	import test from "../components/test.vue"
	export default {
		components: {
			Checkbox,
			test
		},
		data() {
			return {
				isshow2: '',
				isshow2: false,
				shuju: 'BTCUSDT永续',
				jindu: '0.1',
				bool: false,
				bool1: false,
				bool2: false,
				active: 0,
				weituo: '限价委托',
				weituo2: '限价委托',
				beishu: '10.00',
				parse: '',
				parse2: '',
				parse3: '',
				parse4: '',
				parse5: '',
				parse6: '',
				number: '',
				number3: '',
				number4:'',
				parces: '价格',
				parces1: '市价',
				parces3: false,
				parces4: false,
				bool3: false,
				number2: '',
				number7: '',
				bool4: true,
				bool5: false,
				bool6: true,
				active2: 1,
				shuju1: false,
				list: [],
				symbol: 'USDT',
				bourse: '4',
				time: null,
				stage: 'ETH',
				checked: '',
				checked1: '',
				time1: '',
				websocket1: '',
				lockReconnect:false
			};
		},

		created() {
			let path = 'ws://192.168.0.102:8010/ws/12'
			let jspCode = 'a'
			var websocket;
			let th = this
			let beishu = localStorage.getItem('beishu')
			if(beishu){
				this.beishu = beishu
				}
			// createWebSocket();
			// 初始化 ws 对象
			
			
			// 定义连接成功回调函数
			let onConnect = () => {
			    console.log('connected')
			}
			let onError = () => {
			    console.log('error')
			}
			// 定义客户端信息
			let clientInfo = {
			    userName: 'xxx',
			    password: 'xxxx'
			}
			/**
			 * websocket启动
			 */
			function createWebSocket() {
				try {
					if ('WebSocket' in window) {
						websocket = new WebSocket(path);
						th.websocket1 = websocket
					}
					init();
				} catch (e) {
					console.log('catch' + e);
					reconnect();
				}

			}

			function init() {
				//连接成功建立的回调方法
				websocket.onopen = function(event) {
					console.log("WebSocket:已连接");
					//心跳检测重置
					// heartCheck.reset().start();
				};

				//接收到消息的回调方法
				websocket.onmessage = function(event) {
					// showNotify(event.data);
					console.log("WebSocket:收到一条消息", event.data);
					// heartCheck.reset().start();
				};

				//连接发生错误的回调方法
				websocket.onerror = function(event) {
					console.log("WebSocket:发生错误");
					// reconnect();
				};

				//连接关闭的回调方法
				websocket.onclose = function(event) {
					console.log("WebSocket:已关闭");
					// websocket.close();
					// console.log(event)
					// heartCheck.reset(); //心跳检测
					// reconnect();
				};

				// //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
				// window.onbeforeunload = function() {
				// 	websocket.close();
				// };

				//关闭连接
				function closeWebSocket() {
					websocket.close();
				}

				//发送消息
				function send(message) {
					websocket.send(message);
				}
			}

			//避免重复连接
			var tt;

			/**
			 * websocket重连
			 */
			let ts = this
			function reconnect() {
				if (ts.lockReconnect) {
					return;
				}
				ts.lockReconnect = true;
				tt && clearTimeout(tt);
				tt = setTimeout(function() {
					console.log('重连中...');
					ts.lockReconnect = false;
					createWebSocket();
					ts.websocket1 = websocket
				}, 4000);
			}
		// this.time1 = setInterval(() => {
		// 		console.log(25000)
		// 		websocket.send("ping");
		// 		if(ts.websocket1.readyState==3){
		// 			reconnect()
		// 		}
		// 	}, 20000)
			/**
			 * websocket心跳检测
			 */
			
			// var heartCheck = {
			// 	timeout: 50000,
			// 	timeoutObj: null,
			// 	serverTimeoutObj: null,
			// 	reset: function() {
			// 		clearTimeout(this.timeoutObj);
			// 		clearTimeout(this.serverTimeoutObj);
			// 		return this;
			// 	},
			// 	start: function() {
			// 		var self = this;
			// 		this.timeoutObj && clearTimeout(this.timeoutObj);
			// 		this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
			// 		this.timeoutObj = setTimeout(function() {
			// 			//这里发送一个心跳，后端收到后，返回一个心跳消息，
			// 			//onmessage拿到返回的心跳就说明连接正常
			// 			console.log('ping');
			// 			websocket.send("ping");
			// 			self.serverTimeoutObj = setTimeout(function() { // 如果超过一定时间还没重置，说明后端主动断开了
			// 				console.log('关闭服务');
			// 				websocket.close(); //如果onclose会执行reconnect，我们执行 websocket.close()就行了.如果直接执行 reconnect 会触发onclose导致重连两次
			// 			}, self.timeout)
			// 		}, this.timeout)
			// 	}
			// };

		},
		watch: {
			active(newvalue, oldvalue) {
				if (newvalue == 2) {
					this.fn3()
				}
			},
			beishu(newvalue, oldvalue) {
				localStorage.setItem('beishu',newvalue)
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
			clearInterval(this.time)
			clearInterval(this.time1)
			this.time = null
			this.time1 = null
			// console.log(this.websocket1)
			// this.websocket1.onclose();
			this.lockReconnect = true
			this.websocket1.close()
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
				width: 110px;
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
				.active-b{
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
		.left2{
			display: flex;
			justify-content: space-between;
			font-size: 13px;
			color: #ccc;
			flex: 1;
			div{
				flex: 1;
				justify-content: space-between;
				span{
					color: #686868;
				}
			}
			.ri{
				color: rgb(195,135,45);
				input{
					width: 41%;
				}
			}
		}
		
	}
	.title-c{
		margin-top: -16px;border-top: 3px solid #eee;
		display: flex;
		div{
			width: 2px;
			height: 15px;
			    margin: 4px 5px 0 2px;
			background: #0b78f1;
		}
	}
</style>
