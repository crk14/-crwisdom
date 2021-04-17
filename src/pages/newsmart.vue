<template>
	<div class="intetrading">
		<div class="tophader">
			<van-icon name="arrow-left" style="    width: 1rem;
    height: 0.8rem;
    z-index: 1;
    line-height: .8rem;
    margin-top: -.4rem;"
			 onclick="window.history.go(-1)" />
			<p :class="{'active':value1==1}">CR{{$t('notecase.spotquantify')+$t('store.intelligent')+$t('store.robot')}}({{$t('store.XLMT')}})
			</p>
		</div>
		<van-pull-refresh v-model="isLoading" :success-text="$t('spot.success')" @refresh="onRefresh">
			<img v-show="!statusbool" class="statusimg" src="../assets/auto.png" />
			<img v-show="statusbool" class="statusimg" src="../assets/crliang.gif" />
			<div class="topsel" style="position: relative;">
				<p class="left" @click="bounce(1)">
					<img v-if="bourse==1" src="../assets/src_resource_image_page_huobi_logo@2x.png" alt />
					<img v-else-if="bourse==4" src="../assets/src_resource_icon_user_exchange_okex@2x.png" alt />
					<img v-else src="../assets/selt.png" alt />
					<span>{{bourse==1?$t('community.Huobi')+$t('spot.Station'):bourse==4?'OKEX':'选择交易所'}}</span>
				</p>
				<div class="right" style="position: absolute;right: .4rem;top: .73rem;display: flex;">
					<img src="../assets/问好@2x.png" alt @click="bounce(3)" style="margin-top: .02rem;" />
					<div style="font-size: .26rem;" @click="tocaozuo">{{$t('spot.instructions')}}</div>
				</div>
			</div>
			<p class="hr"></p>
			<div class="headtitle title-two" >
				<div>
					<span>|</span>{{$t('spot.configure')}}
				</div>
				<div class="usdt">USDT{{$t('user.remaining')}}:{{USDTnum}}</div>
				<div class="usdt">{{$t('community.remaining')}}:{{time}}{{$t('store.day')}}</div>
			</div>
			<div class="strategy" style="display: flex;justify-content: space-between;">
				<div class="one_p" style="display: flex;">
					<span class="dfirst" style="color: #999999;font-size: .24rem;">{{$t('community.remaining')}}</span>
					<div style="font-size: .28rem;width: 2rem;text-align: center;color: rgb(34, 132, 253);">USDT</div>
				</div>
				<div class="one_p" style="display: flex;">
					<span class="dfirst" style="color: #999999;font-size: .24rem;">{{$t('spot.monitoring')}}</span>
					<div style="font-size: .28rem;width: 2rem;text-align: center;">{{parseInt(Number(principals)*1000)/1000||0}}{{symbol}}</div>
				</div>
			</div>
			<div class="newdiv">
				<span :class="{'active':info}" style="flex:1;text-align: center;" @click="!info?fn2():''">{{$t('spot.setup')}}</span>
				
			</div>
		<p class="headtitle">
			<span>|</span>{{$t('spot.monitoringtwo')}}
		</p>
		<div class="tranumber">
			<div class="cent">
				<div class="box">
					<p style="color: #bababa;">{{$t('spot.deals')}}</p>
		
					<p class="box1">{{count+$t('spot.odd')}}</p>
				</div>
		
			</div>
			<div class="cent">
				<div class="box">
					<p style="color: #bababa;">{{$t('spot.andloss')}}</p>
					<p class="box1">{{(profit*1).toFixed(2)}} USDT</p>
				</div>
			</div>
			<div class="cent" :class="{'active':value1==1}">
				<div class="box">
					<p style="color: #bababa;">{{$t('spot.proceeds')}}</p>
					<p class="box1"> {{settle.toFixed(2)+symbol}}</p>
				</div>
			</div>
		</div>
			<div v-show="info" class="newdiv" style="padding: .1rem 0;">
							<button @click="fn5(info,info.stop_type)">{{$t('spot.Delete')}}</button>
								<button :class="{'activeW':value1==1}" @click="fn6(info.capital)">{{$t('spot.budget')}}</button>
								<button  v-if="info&&info.status==0" @click="open_strategy(info.id,)">{{$t('spot.start')}}</button>
							<button v-else class="active1" :class="{'activeW2':value1}" @click="bounce(0,info.id,info.stop_type);firmcolse(2);close_now()"  >{{$t('spot.cease')}}</button>
						</div>
			<div class="runy">
				<p class="headtitle">
					<span>|</span>{{$t('spot.result')}}
				</p>
				<p class="headtitle" @click="toshowdetail()"><span>|</span>{{$t('spot.Record')}}</p>
				<p></p>
			
			</div>
			
			<div class="comereult">
				<ul>
					<li v-if="info" v-for="(item,i) in strategy_list" :key="i" style="position: relative;">
						<p class="cometop">
							<span style="font-size: .26rem;line-height: 20px;">
								{{item.bidui}}
							</span>
							<span style="font-size: .22rem;margin-left: 17px;"><span class="item-span" :class="{'item-span1':item.zhangfu>0}"
								 style="font-size: .24rem;"> {{item.close1?item.close1:''}}</span> </span>
							<span  style="position: absolute;right: 25px;">
								<button style="background:rgb(97,161,240);margin-left: 0;" @click="clear(info.id,item.symbol_deal,0)">{{$t('spot.reset')}}</button>
								<button style="background:rgb(97,161,240);margin-left: .2rem;" @click="clear(info.id,item.symbol_deal,1)">{{$t('spot.close')}}</button>
							</span>
						</p>
						<div class="pressbox gundong" v-if="item.stop_type == 0&&info.status==1">

							<p v-if="item.stop_type == 0"><span>{{$t('spot.status')}}: </span> {{$t('spot.Under')}}</p>
						</div>
						<div class="pressbox" style="background:#BFBFBF;" v-else>
							<p ><span>{{$t('spot.status')}}: </span> {{item.stop_type==0?$t('spot.noopen'):$t('spot.stoppage')}}</p>
							<p v-if="item.stop_type==5" class="item1">API KEY {{$t('spot.error')}}</p>
							<p v-if="item.stop_type==7" class="item1">{{$t('spot.Positioning')+$t('spot.error')}}</p>
							<p v-if="item.stop_type==11" class="item1">{{$t('spot.Positioning')+$t('spot.error')}}</p>
							<p v-if="item.stop_type==8" class="item1">USDT手续费不足</p>
							<p v-if="item.stop_type==9" class="item1">{{$t('spot.Positioning')+$t('spot.error')}}</p>
							<p v-if="item.stop_type==6" class="item1">{{$t('spot.capital')}}</p>
						</div>
						<tables :item="item"></tables>
						</li>

				</ul>
			</div>
		</van-pull-refresh>
		<!-- 左侧弹框 -->
		<van-popup v-model="show" position="left" @click="changleft" class="poup" :style="{ height: '100%' ,width:'50%'}">
			<p class="jiay">选择交易所</p>
			<p class="yopen">已开通智能交易</p>
			<p class="hmoney" @click="clileft('火币全球站',1)">
				<img src="../assets/src_resource_image_page_huobi_logo@2x.png" alt />火币全球站
			</p>

			<p class="yopen">待开通智能交易</p>
			<ul>

				<p class="hmoney">
					<img style="width:0.34rem" src="../assets/src_resource_icon_user_exchange_okex@2x.png" alt />OKEX
				</p>
				<li>
					<img src="../assets/src_resource_icon_user_exchange_zb@2x.png" alt />ZB
				</li>
				<li>
					<img src="../assets/src_resource_icon_user_exchange_binance@2x.png" alt />币安
				</li>

			</ul>
			<p class="proxys" style="    display: none;">
				<!-- 县级 -->
				<img src="../assets/xiand.png" alt />

			</p>
		</van-popup>




		<!-- 交易币对弹窗 -->


		<!-- 问题弹框 -->
		<van-popup v-model="matterplay" style="width: 80%;">
			<matter></matter>
		</van-popup>


		<van-popup v-model="closedeal" class="closedeal">
			<p class="title">关闭交易</p>
			<p class="plesway">请选择关闭交易方式</p>
			<ul>
				<!-- <li @click="firmcolse(0)">
					临时停止
					<img v-if="check==0" src="../assets/landian.png" alt />
					<img v-else src="../assets/nocomr.png" alt />
				</li> -->

				<li @click="firmcolse(2)">
					清仓停止
					<img v-if="check==2" src="../assets/landian.png" alt />
					<img v-else src="../assets/nocomr.png" alt />
				</li>
			</ul>
			<button class="changebton" @click="close_now()" style="background-color: rgb(34, 132, 253);">确定</button>
		</van-popup>

		<div class="gifclas" :style="{display:istxt==-1?'none':'block'}">
			<img src="../assets/ddd.gif" />
			<p>
				{{istxt==5?'API KEY错误':istxt==8?'点卡不够'
        :istxt==6?'本金不足':istxt==7?'仓位错误':istxt==0?'系统正在获取数据定制策略':istxt==-10?'获取成功':''}}
			</p>
		</div>

		<van-dialog v-model="show3" :title="$t('spot.install')" show-cancel-button :before-close="beforeClose">
			<p style="height: 15px;"></p>
			<div class="heyue-body" :class="{'actwid':value1==1}">
				<span>{{$t('spot.amounts')}}:</span>
				<input v-model="backinfo.capital" type="number" />
				<span>$</span>
			</div>



			<p style="height: 15px;"></p>
		</van-dialog>

	</div>
</template>

<script>
	import Vue from 'vue';
	import tables from '../modu/table.vue';
	import matter from '../modu/matter.vue'
	import {
		Dialog,
		Popup,
	} from 'vant';
	Vue.use(Dialog);
	Vue.use(Popup);
	// Vue.use(Overlay);
	import {
		wss
	} from '../api/ws.js'
	export default {
		components: {
			Dialog,
			Popup,
			tables,
			matter
		},
		data() {
			return {
				clearshow:false,
				statusbool: false,
				isLoading: false,
				USDTnum: '',
				show: false,
				matterplay: false,
				bidui: false,
				closedeal: false,
				width: 0,
				seletext: "",
				selt: "",
				index: 0,
				check: 2,
				count: 0,
				profit: 0,
				bourse: "",
				strategy_list: [],
				types: 5,
				selsym: [],
				symbol: "USDT",
				jysymbol: 0,
				istxt: -1,
				principal: "",
				clilefttxt: "选择交易所",
				doing: 0,
				principals: "",
				checked: true,
				time1: '',
				index1: '',
				time: '',
				pointnum: '',
				ljsyl: '',
				show3: false,
				backinfo: {},
				bool2: false,
				info: null,
				websct:{},
				value1:0,
				buy_count:0,
				settle:0,
			};
		},
		created() {
			this.time = this.$route.query.time
			let value = localStorage.getItem('languageSet')
			if (value) {
				if (value == 'en') {
					this.value1 = 1
				} else if (value == 'hy') {
					this.value1 = 2
				}
			}
			this.$axios
				.post("/index/robot/robot_systerm", {
					robot_type: 4,
				})
				.then((res) => {
					if (res.data.code == 0) {
						if (res.data.state != 1) {
							console.log(66)
							this.$router.push('/store')
						}
					}
				});
			if (localStorage.getItem("bourse") == 1) {
				this.bourse = localStorage.getItem("bourse");
			}
			this.start();
			this.mywalletInfo()
		},
		beforeDestroy() {
			if (this.websct.onclose) {
				this.websct.onclose()
			}
		},
		methods: {
			onRefresh() {
				this.start()
				this.mywalletInfo()
				setTimeout(() => {
					this.isLoading = false;
				}, 1000);
			},
			mywalletInfo() {
				this.$axios
					.get("/index/mywallet/mywalletInfo", )
					.then(res => {
						let info = res.data.info;
						this.pointnum = (info.follow_point * 1).toFixed(1)
						this.USDTnum = (info.number * 1).toFixed(1)
					})
			},
			beforeClose: function(action, done) {
				if (action === "confirm") {
					this.fn4(true)
					done()
				} else if (action === "cancel") {
					// 取消
					done(); // 关闭提示框
				}
			},
			fn2() {
				this.bool2=false
				this.show3 = true

			},
			fn4(bool = false) {
				if (!this.backinfo.capital) {
					return this.$toast.fail({
						message: "请填写完整",
						duration: 1200
					});
				}
				if (bool) {
					let str;
					this.istxt = 100;
					this.backinfo.symbol = this.symbol
					this.backinfo.bourse = this.bourse
					this.backinfo.types = this.types
					this.backinfo.symbol_deal = 'all_symbol'
					if (this.bool2) {
						this.backinfo.id = this.info.id
						str = 'set_strategy'
					} else {
						str = 'set_strategy_all'
						this.jysymbol = 0
					}
					this.$axios
						.post(`/index/spotstrategy/${str}`, this.backinfo)
						.then(res => {
							if (res.data.code == 1) {
								this.istxt = -1;
								this.$toast.fail({
									message: res.data.msg,
									duration: 2000
								})
							} else {
								if (this.istxt == 0) {
									setTimeout(() => {
										this.istxt = -10;
									}, 3000);
								}
								setTimeout(() => {
									this.istxt = -1;
									this.$toast.success({
										message: res.data.msg,
										duration: 2000
									})
									this.start();
								}, 4000);
							}
						})

				}
				this.show3 = false
				this.bool2 = false
			},
			fn5(id, type) {
				let str;
				if(this.buy_count){
					str = '当前系统还有持仓,删除策略将扣除持仓金额2%的手续费,是否删除策略?'
				}else{
					str = '是否删除策略?'
				}
				Dialog.confirm({
					title: '提醒',
					message: str,
				}).then(() => {
					this.$axios
						.post("/index/spot/delete_strategy", {
							'strategy_id': id
						})
						.then(res => {
							if (res.data.code == 0) {
								this.$toast.fail({
									message: "删除成功",
									duration: 2000
								})
								this.start();
							} else {
								this.$toast.fail({
									message: res.data.msg,
									duration: 2000
								})
							}
						})
				})

			},
			fn6(item) {
				
				console.log(item)
				this.backinfo.capital = item
				this.bool2 = true
				this.show3 = true
			},
			tocaozuo() {
				this.$axios
					.get("/index/article/newsArt", {
						page: 1,
						limit: 1
					})
					.then(res => {
						this.$router.push({
							path: 'noticedateil',
							query: {
								id: res.data.info[0].article_id
							}
						})
					});
			},
			toshowdetail() {
				if (!this.bourse) {
					this.$toast.fail({
						message: "请选择交易所",
						duration: 2000
					})
					return
				}
				this.$router.push('showdetail?bourse=' + this.bourse + '&type=1&poni=1&id=5')
			},
			clileft(s, num) {
				this.bourse = num;
				localStorage.setItem("bourse", num);
				this.start();
			},
			start1(is = false) {
				// if (localStorage.getItem("symbol")) {
				// 	this.symbol = localStorage.getItem("symbol");
				// }
				//取利润
				this.$axios
					.post("/index/spotstrategy/get_monitoring_total", {
						symbol: this.symbol,
						bourse: this.bourse,
						types: this.types
					})
					.then(res => {
						this.count = res.data.count;
						this.profit = res.data.profit;
						this.doing = res.data.doing;
						this.ljsyl = res.data.ljsyl
						this.settle = res.data.settle
						if (res.data.principal) {
							this.principal = res.data.principal;
						}
					});
				if (this.bourse) {
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
				}


			},
			start(bool) {
				if (!bool) {
					this.start1();
				}
				if (this.websct.onclose) {
					this.websct.onclose()
				}
				this.buy_count = 0
				this.$axios
					.post("/index/spotstrategy/get_strategy_list", {
						symbol: this.symbol,
						bourse: this.bourse,
						types: this.types
					})
					.then(res => {
					
						this.strategy_list = res.data.list;
						this.info = res.data.info
						if (this.info && this.info.status) {
							this.statusbool = true
						}
						let arr = []
						res.data.list.forEach((item, index) => {
							this.buy_count+=item.buy_count
							arr.push(item.symbol_deal)
						})
						wss(arr, this.huobiwsurl, (data, wes) => {
							arr.forEach((item, index) => {
								if (data.ch.indexOf(item) != -1) {
									let obj = this.strategy_list[index]
									obj.close1 = data.tick.close
									this.$set(this.strategy_list, index, obj)
								}
							})
							this.websct = wes
						})
						console.log(this.buy_count)
					});
			},

			changleft() {
				this.show = false;
			},
			changright() {
				this.bidui = false;
			},
			clear(id,dear,type){
				let str;
				let string;
				if(type){
					str = '提醒'
					string = '是否一键平仓?'
				}else{
					str = '是否重置策略'
					string = '请确认当前是否有持仓,如系统还有持仓时,重置策略将扣除持仓金额2%的手续费,是否重置策略?'
				}
				Dialog.confirm({
					title: str,
					message: string,
				}).then(() => {
					this.$axios
						.post("/index/spotstrategy/smart_clear", {
							clear_type: type,
							id,
							symbol:this.selsym,
							symbol_deal:dear,
						})
						.then(res => {
							if (res.data.code == 0) {
								this.$toast.fail({
									message: res.data.msg,
									duration: 2000
								})
								this.start();
							} else {
								this.$toast.fail({
									message: res.data.msg,
									duration: 2000
								})
							}
						})
				})
			},
			
			bounce(s, i, type) {
				if (s == 0) {
					// if (type == 2) {
					// 	this.$axios
					// 		.post("/index/spot/profit_restart", {
					// 			id: i
					// 		})
					// 		.then(res => {
					// 			this.start();
					// 		});
					// } else {
					// 	this.closedeal = true;
					// }
					this.closeid = i;
				} else if (s == 1) {
					this.show = true;
				} else if (s == 3) {
					this.matterplay = true;
				} else if (s == 4) {
					if (!this.bourse)
						return this.$toast.fail({
							message: "请选择交易所",
							duration: 2000
						});
					this.bidui = true;
				} else if (s == 5) {}
			},

			firmcolse(s) {
				this.check = s;
			},
			open_strategy(s, i) {
				this.$axios.post("/index/spot/start_strategy", {
					id: s
				}).then(res => {
					if (res.data.code == 0) {
						this.$toast.success({
							message: res.data.msg,
							duration: 2000
						});
						this.start();
					} else {
						this.$toast.fail({
							message: res.data.msg,
							duration: 2000
						});
					}
				});
			},
			close_now() {
				if (this.check == 0) {
					clearInterval(this.time1)
					this.time1 = null;
					// var id = s;
					this.$axios
						.post("/index/spot/pause_strategy", {
							id: this.closeid
						})
						.then(res => {
							if (res.data.code == 0) {
								this.$toast.success({
									message: res.data.msg,
									duration: 2000
								});

								this.start()

								this.closedeal = false;
							} else {
								this.$toast.fail({
									message: res.data.msg,
									duration: 2000
								});
								this.closedeal = false;
							}
						});
				} else if (this.check == 1) {
					this.$axios
						.post("/index/spot/profit_stop", {
							id: this.closeid
						})
						.then(res => {
							if (res.data.code == 0) {
								this.$toast.success({
									message: res.data.msg,
									duration: 2000
								});
								this.start();
								this.closedeal = false;
							} else {
								this.$toast.fail({
									message: res.data.msg,
									duration: 2000
								});
								this.closedeal = false;
							}
						});

				} else if (this.check == 2) {
					this.$axios
						.post("/index/spot/clearance", {
							id: this.closeid
						})
						.then(res => {
							if (res.data.code == 0) {
								this.$toast.success({
									message: res.data.msg,
									duration: 2000
								});
								this.start();
								this.closedeal = false;
							} else {
								this.$toast.fail({
									message: res.data.msg,
									duration: 2000
								});
								this.closedeal = false;
							}
						});

				} else {
					// var id = s;
					this.$axios
						.post("/index/spot/pause_forced", {
							id: this.closeid
						})
						.then(res => {
							if (res.data.code == 0) {
								this.$toast.success({
									message: res.data.msg,
									duration: 2000
								});
								this.start();
								this.closedeal = false;
							} else {
								this.$toast.fail({
									message: res.data.msg,
									duration: 2000
								});
								this.closedeal = false;
							}
						});
				}
			}
		}
	};
</script>
<style lang="less" scoped>
	.tophader {
		.playicon {
			position: unset;
			font-size: 0.3rem;
			transform: rotate(90deg);
		}
		.active{
			font-size: .26rem;
		}
	}

	.topsel {
		padding: 0.2rem 0.3rem;
		display: flex;
		justify-content: space-between;

		.left {
			font-size: 0.3rem;

			img {
				width: 0.32rem;
				margin-right: 0.2rem;
				position: relative;
				top: 0.05rem;
			}
		}

		.right {
			margin-top: -0.3rem;

			img {
				width: 0.28rem;
				height: 0.28rem;
				margin-right: 0.24rem;
			}

			span {
				font-size: 0.6rem;
				position: relative;
				top: -0.1rem;
			}
		}
	}

	.poup {
		p {
			border-bottom: 1px solid #e5e5e5;
		}

		.jiay {
			font-size: 0.3rem;
			font-weight: bold;
			padding: 0.5rem 0.3rem 0.1rem;
		}

		.yopen {
			color: #666666;
			font-size: 0.2rem;
			padding: 0.1rem 0.3rem;
		}

		.hmoney {
			padding: 0.3rem;
			font-size: 0.24rem;
			font-weight: bold;

			img {
				width: 0.24rem;
				position: relative;
				top: 0.06rem;
				margin-right: 0.2rem;
			}
		}

		li {
			padding: 0.3rem;
			border-bottom: 1px solid #e5e5e5;
			font-size: 0.24rem;
			font-weight: bold;

			img {
				width: 0.32rem;
				height: 0.32rem;
				position: relative;
				top: 0.06rem;
				margin-right: 0.2rem;
			}
		}

		.proxys {
			position: absolute;
			bottom: 4%;
			border: none;
			left: 32%;

			img {
				width: 1.42rem;
			}
		}
	}

	.runy {
		display: flex;
		justify-content: space-between;
		padding: 0.1rem 0.3rem;
		border-bottom: 2px solid #f5f6fa;
		font-size: 0.3rem;

		p {
			text-align: center;
		}

		p:nth-of-type(3) {
			text-align: right;
		}

		.headtitle {
			text-align: left;
			padding: 0;
			border: none;
			display: flex;
			// line-height: 28px;

			span {
				display: block;
				margin-top: 1px;
				color: #2185ff;
				margin-right: 0.1rem;
				// line-height: 19px;
				// margin-top: -0.2rem;
			}
		}
	}
	.title-two{
		justify-content: space-between;
		.usdt{
			font-size: .25rem;font-weight: 550;;margin-top: .05rem;
		}
	}
	.headtitle {
		padding: 0.1rem 0.3rem;
		border-bottom: 2px solid #f5f6fa;
		display: flex;

		div {
			display: flex;
		}

		span {
			color: #2185ff;
			display: block;
			margin-top: 0px;
			margin-right: 0.1rem;
		}
	}

	.strategy {
		padding: 0.2rem 0.2rem 0.2rem 0.3rem;
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

	.changebton {
		background: #3243a4;
		margin: 0.3rem auto 0.2rem;
		height: 0.76rem;
		line-height: 0.76rem;
	}

	.tranumber {
		padding: 0.2rem 0.3rem;
		border-bottom: 4px solid #f5f6fa;
		display: flex;
		justify-content: space-between;

		.cent {
			width: 30%;

			color: #000000;
			border: 1px solid rgb(34, 132, 253);
			box-sizing: border-box;
			padding: 5px 0;
			border-radius: 5px;
			font-size: 0.24rem;
			text-align: center;

			.box {
				width: 100%;
				height: 100%;
				border-radius: 5px;
				background-color: #FFFFFF;

				.box1 {
					margin-top: .1rem;
					color: #000000;
				}
			}

			p {
				line-height: 0.4rem;
			}
		}
		.active{
			width: 35%;
			}
	
	}

	.comereult {
		margin: 0rem auto 0.5rem;

		li {
			border-bottom: 2px solid #e5e5e5;
			padding: 0.3rem 0.3rem 0;
		}

		.cometop {
			display: flex;
			height: 20px;

			img {
				width: 0.17rem;
				height: 0.25rem;
				margin-right: 0.3rem;
			}

			button {
				color: #fff;
				font-size: 0.2rem;
				border-radius: 10px;
				margin-left: 0.2rem;
				transform: scale(0.9);
				height: .32rem;
				line-height: .3rem;
			}
		}



		
	}

	.closedeal {
		padding: 0.5rem 0.3rem 0.3rem;
		background: url("../assets/closeback.png") no-repeat;
		background-size: 100%;
		border-radius: 5px;
		width: 65%;

		.title {
			font-size: 0.36rem;
			color: #000000;
		}

		.title,
		.plesway {
			text-align: center;
		}

		.plesway {
			color: #808080;
			font-size: 0.24rem;
			margin: 0.2rem 0 0.4rem;
		}

		li {
			font-size: 0.28rem;
			color: #000000;
			border-bottom: 1px solid #80808029;
			padding: 0.3rem 0 0.1rem;
			display: flex;
			justify-content: space-between;

			img {
				width: 0.32rem;
				height: 0.32rem;
			}
		}

		.changebton {
			width: 100%;
		}
	}

	.pressbox {
		height: 0.1rem;
		color: rgb(15, 171, 244);
		font-size: 0.2rem;
		position: relative;
		margin: 0.25rem .15rem 0 0;
		border-radius: 3px;
		display: flex;
		margin-left: 2.3rem;

		p {
			justify-content: space-between;
			flex: 1;
			text-align: center;
			position: absolute;
			left: -113px;
			top: -7px;

			span {
				color: #000000;
			}
		}

		.item1 {
			left: 20px;
		}

		.press {
			position: absolute;
			height: 100%;
			border-radius: 3px;
		}
	}

	.gifclas {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 122;

		// display:none;
		img {
			width: 100%;
			position: absolute;
			top: 50%;
			margin-top: -50%;
		}

		p {
			font-size: 0.3rem;
			text-align: center;
			position: absolute;
			top: 50%;
			margin-top: -25%;
			width: 1.8rem;
			color: #fff;
			left: 50%;
			margin-left: -0.9rem;
		}
	}

	.heyue-body {
		width: 50%;
		display: flex;
		overflow: hidden;
		color: #646566;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
		border-bottom: 1px solid #ebedf0;
		line-height: 35px;
		margin: 0 auto;

		input {
			width: 40%;
			text-align: center;
		}
	}
	.actwid{
		width: 70%;
	}


	.statusimg {
		position: absolute;
		top: 3px;
		left: 47%;
		width: 30px;
		height: 40px;
	}

	/deep/.van-overlay {
		background-color: rgba(0, 0, 0, .6)
	}

	.newdiv {
		display: flex;
		line-height: 35px;
		justify-content: space-between;
		border-bottom: 4px solid #f5f6fa;
		font-size: .26rem;
		color: #2284fd;
			button {
				width: 25%;
				background-color: #fff;
				border-radius: 10px;
				border: 1px solid #2284fd;
				// height: 70%;
				line-height: 15px;
				margin: 0 4%;
			}
		.active{
			color: #ccc;
		}
		.active1{
			color: #BD1616;
		}
		.activeW{
			width: 29%;
			margin: 0;
		}
		.activeW2{
			width: 29%;
		}
	}

	.gundong {
		width: 64.5%;
		background: url(../assets/gundong7.gif) no-repeat;
		background-size: 100% 100%;
	}

	.button1 {
		background: rgb(97, 161, 240);
	}

	.button3 {
		background: #BD1616;
	}
	 
	
	
	  .item-span {
	  	display: flex;
	  
	  	.van-icon {
	  		display: block;
	  		margin-top: .05rem;
	  	}
	  }
	  
	  .item-span {
	  	color: #d74e5a;
	  	margin-top: 0.06rem;
	  }
	  
	  .item-span1 {
	  	color: rgb(48, 167, 64);
	  }
</style>
