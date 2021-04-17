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
			<img v-show="!type_status" class="statusimg" src="../assets/auto.png" />
			<img v-show="type_status" class="statusimg" src="../assets/crliang.gif" />
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
			<p style="display: flex;height: 35px;line-height: 35px;border-bottom: 4px solid #f5f6fa;font-size: .26rem;color: rgb(34, 132, 253);">
				<span @click="bounce(4)" style="flex:1;text-align: center;">{{$t('spot.pair')}}{{jysymbol>0?'('+jysymbol+')':''}}</span>
				<span style="color: #D0D0D0;">|</span>
				<span style="flex:1;text-align: center;" @click="bool2=false;fn2()">{{$t('spot.setup')}}</span>
			</p>
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
				<div class="cent">
					<div class="box">
						<p style="color: #bababa;">{{$t('spot.proceeds')}}</p>
						<p class="box1">0 {{symbol}}</p>
					</div>
				</div>
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
					<li v-for="(item,i) in strategy_list" :key="i" style="position: relative;">
						<p class="cometop">
							<span style="font-size: .26rem;line-height: 20px;">
								{{item.bidui}}
							</span>
							<span class="item-span" >
								 {{item.close1?item.close1:''}}</span> 
							<span style="position: absolute;right: 25px;">
								<button style="background:rgb(97,161,240);margin-left: 0;" @click="fn5(item.id,item.stop_type)">{{$t('spot.Delete')}}</button>
								<button style="background:rgb(97,161,240);" @click="fn6(item)">{{$t('spot.set')}}</button>
								<button class="button1" :class="{'button3':item.stop_type != 0}" v-if="item.status==0" @click="open_strategy(item.id,)">{{item.stop_type== 0?$t('spot.open'):$t('spot.renew')}}</button>
								<button style="background:#BD1616" @click="bounce(0,item.id,item.stop_type)" v-else>{{item.stop_type!== 2?$t('spot.stop'):$t('spot.renew')}}</button>
							</span>
						</p>
						<div class="pressbox gundong" v-if="item.status==1">

							<p v-if="item.status==1 && item.stop_type == 0"><span>{{$t('spot.status')}}: </span> {{$t('spot.Under')}}</p>
							<p v-if="item.status==1 && item.stop_type == 2"><span>{{$t('spot.status')}}: </span> {{$t('spot.Check')}}</p>
						</div>
						<div class="pressbox" style="background:#BFBFBF;" v-else>
							<p v-if="item.status==0"><span>{{$t('spot.status')}}: </span> {{item.stop_type== 0?$t('spot.noopen'):item.stop_type== 3?'清仓停止':item.stop_type== 2?'止盈停止':$t('spot.stoppage')}}</p>
							<p v-if="item.stop_type==5" class="item1">API KEY {{$t('spot.error')}}</p>
							<p v-if="item.stop_type==7" class="item1">{{$t('spot.Positioning')+$t('spot.error')}}</p>
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
			<!-- @click="selecli(index)" -->
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
		<van-popup v-model="bidui" position="right" class="poup" :style="{ height: '100%' ,width:'100%'}">
			<div class="tophader">
				<van-icon name="arrow-left" @click="changright" />
				<p>添加货币</p>
				<span @click="changright" style="position: fixed;right: 18px;top: 0px;color: rgb(34, 132, 253);font-size: 17px;">完成</span>
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
					<!-- <div style="padding-left: 1rem;color: #2284fd;text-align: center" v-show="!item.bool" @click="selecli_symbolcli(item.symbol1.toUpperCase()+ '/' + item.symbol.toUpperCase(),i)">添加</div> -->
					<div style="padding-left: 1.62rem;color: #C0C5CB;text-align: center" v-show="item.bool">已添加</div>
					<div style="padding-left: 1rem;color: #2284fd;text-align: center" v-show="!item.bool" @click="selecli_symbolcli(item.symbol1.toUpperCase()+ '/' + item.symbol.toUpperCase(),i)">添加</div>
					<!-- <div style="padding-left: 1.62rem;color: #C0C5CB;text-align: center" v-show="item.symbol1 !='btc'">未开放</div> -->
				</li>

			</ul>
		</van-popup>

		<!-- 问题弹框 -->
		<van-popup v-model="matterplay" style="width: 80%;">
			<matter></matter>
		</van-popup>


		<van-popup v-model="closedeal" class="closedeal">
			<p class="title">关闭交易</p>
			<p class="plesway">请选择关闭交易方式</p>
			<ul>
				<li @click="firmcolse(0)">
					临时停止
					<img v-if="check==0" src="../assets/landian.png" alt />
					<img v-else src="../assets/nocomr.png" alt />
				</li>

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
		<van-dialog v-model="show2" title="预算设置" show-cancel-button :before-close="beforeClose">
			<p style="height: 15px;"></p>
			<div class="heyue-body" style="width: 67%;">
					<span>最大做单金额:</span>
					<input v-model="backinfo.first_amount" type="number" />
					<span>$</span>
				</div>
				<p style="height: 15px;"></p>
			</van-dialog>
			<van-dialog v-model="show3" title="预算设置" show-cancel-button :before-close="beforeClose">
				<p style="height: 15px;"></p>
				<div style="display: flex;flex-flow:row wrap">
					<div class="heyue-body" >
						<span>交易总金额:</span>
						<input v-model="backinfo.capital" type="number" :disabled="bool2" />
						<span>$</span>
					</div>
					<div class="heyue-body" >
						<span>首仓金额:</span>
						<input v-model="backinfo.first_amount" type="number" />
						<span>$</span>
					</div>
					
					<div class="heyue-body">
						<span>做单数量:</span>
						<input v-model="backinfo.order_num" type="number" />
						<span>次</span>
					</div>
					<div class="heyue-body">
						<span>补仓倍率:</span>
						<input v-model="backinfo.repair_scale" type="number" />
						<span>倍</span>
					</div>
					<div class="heyue-body">
						<span>止盈比例:</span>
						<input v-model="backinfo.profit_stop" type="number" />
						<span>%</span>
					</div>
				</div>
				<p class="imgge1">止损设置
					<span style="font-weight: 500; font-size: 12px;margin-right: 0.2rem;display: flex;">
						<div style="margin-right: 4px;line-height: 34px;height: 34px;">关</div>
						<van-switch v-model="show5" size=".26rem" />
						<div :class="{'active2':show5}" style="margin-left: 4px;line-height: 34px;height: 34px;">开</div>
					</span>
				</p>
				<p class="imgge1" style="background-color: #FFFFFF;font-weight: 500;" v-show="show5">止损类型
					<span class="item" :class="{'active':show6}">
						<span @click="show6 = true"><span v-show="show6"></span></span>
						逐单止损
					</span>
					<span class="item" :class="{'active':!show6}" style="margin-right: 10%">
						<span @click="show6 = false"> <span v-show="!show6"></span></span>
						整体止损
					</span>
				</p>
				<div class="divli" v-show="show5">
					<p>
						<span class="onespan">止损比例</span>
					</p>
					<p class="right">
						<span>
							<input type="text" v-model="backinfo.loss_stop" class="inputclass" placeholder="请输入" /> %
						</span>
					</p>
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
		wss
	} from '../api/ws.js'
	import {
		Dialog,
		Popup
	} from 'vant';
	Vue.use(Dialog);
	Vue.use(Popup);
	export default {
		components: {
			Dialog,
			Popup,
			tables,
			matter
		},
		data() {
			return {
				isLoading: false,
				USDTnum: '',
				sym_val: '',
				show2: false,
				show: false,
				matterplay: false,
				bidui: false,
				closedeal: false,
				width: 0,
				seletext: "",
				selt: "",
				index: 0,
				check: 0,
				count: 0,
				profit: 0,
				bourse: "",
				strategy_list: [],
				symbol_list: [],
				types: 4,
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
				list3: [],
				show3: false,
				show5: false,
				show6: true,
				backinfo: {
				},
				bool2: false,
				bool3: false,
				huobi: true,
				type_status: false,
				list4: [],
				websct: {},
				value1:0
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
		watch: {
			symbol(newValue, oldValue) {
				this.strategy_list = []
				if (this.websct.onclose) {
					this.websct.onclose()
				}
				this.start(newValue)
				this.start1(true)
			},
			bool3(newValue, oldValue) {
				if (newValue) {
					this.selsym = []
				}
			},
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
			show6(newValue, oldValue) {
				if (newValue) {
					this.backinfo.loss_stop_case = 0
				} else {
					this.backinfo.loss_stop_case = 1
				}
			},
			show5(newValue, oldValue) {
				if (newValue) {
					this.backinfo.loss_stop_switch = 1
				} else {
					this.backinfo.loss_stop_switch = 0
				}
			},
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
				if (this.selsym.length == 0) {
					Dialog.confirm({
						title: '提醒',
						message: '请选择交易对',
					})
					return
				}
				this.show3 = true
				if (!this.bool2) {
					this.show5 = false
					this.show6 = true
					this.backinfo = {}
					this.backinfo = {
						loss_stop_case: 1,
						loss_stop_switch: 0}
				}
			},
			fn4(bool = false) {
				if (bool) {
					if (
						!this.backinfo.first_amount
					) {
						return this.$toast.fail({
							message: "请填写完整",
							duration: 1200
						});
					}
					let str;
					this.istxt = 100;
					console.log(this.bool2)
					console.log(this.backinfo)
					if (this.bool2) {
						if (this.show5 && this.backinfo.loss_stop == 0) {
							return this.$toast.fail({
								message: "止损比例不能设置为零",
								duration: 3200
							});
						}
						let obj = {
							first_amount: this.backinfo.first_amount,
							order_num: this.backinfo.order_num,
							repair_scale: this.backinfo.repair_scale,
							profit_stop: this.backinfo.profit_stop,
							loss_stop: this.backinfo.loss_stop,
							loss_stop_case: this.backinfo.loss_stop_case,
							loss_stop_switch: this.backinfo.loss_stop_switch,
							symbol: this.backinfo.symbol,
							bourse: this.backinfo.bourse,
							types: 4,
							symbol_deal: this.backinfo.symbol_deal,
							id: this.backinfo.id,
							
						}
						this.backinfo = obj
						str = 'set_strategy'
					} else {
						this.backinfo.symbol = this.symbol
						this.backinfo.bourse = this.bourse
						this.backinfo.types = 4
						this.backinfo.symbol_deal = this.selsym.join(",")
						console.log(this.backinfo)
						str = 'set_strategy_all'
						this.jysymbol = 0
					}
					this.bool3 = true
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
				console.log(id, type)
				if (type == 2) {
					this.$toast.fail({
						message: "止盈停止后才可删除",
						duration: 2000
					})
					return
				}
				Dialog.confirm({
					title: '提醒',
					message: `请确认当前是否有持仓,如系统还有持仓时,删除策略将扣除持仓金额2%的手续费,是否删除策略?`,
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
				if (item.stop_type == 2) {
					this.$toast.fail({
						message: "停止后才可设置",
						duration: 2000
					})
					return
				}
				this.bool2 = true
				this.backinfo = item
				console.log(this.backinfo)
				if (this.backinfo.loss_stop_case == 0) {
					this.show6 = true
				} else {
					this.show6 = false
				}

				if (this.backinfo.loss_stop_switch == 1) {
					this.show5 = true
				} else {
					this.show5 = false
				}
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
			onInput(i, id) {
				this.index1 = i
				if (this.strategy_list[i].status == 1) {
					this.closedeal = true
					this.closeid = id
				} else {
					this.open_strategy(id, i)
				}

			},
			toshowdetail() {
				if (!this.bourse) {
					this.$toast.fail({
						message: "请选择交易所",
						duration: 2000
					})
					return
				}
				clearInterval(this.time1)
				this.time1 = null;
				this.$router.push('showdetail?bourse=' + this.bourse + '&type=1&poni=1&id=4')
			},
			clileft(s, num) {
				this.bourse = num;
				localStorage.setItem("bourse", num);
				this.start();
			},
			closecli() {
				this.$axios.post("/index/strategy/delete_strategy").then(res => {
					if (res.data.code == 0) {
						localStorage.clear();
						this.principals = "";
						this.principal = "";
						this.$toast.success({
							message: res.data.msg,
							duration: 1200
						});
						this.start();
					} else {
						this.$toast.fail({
							message: res.data.msg,
							duration: 1200
						});
					}
				});
			},
			send() {

				if (!this.bourse)
					return this.$toast.fail({
						message: "请选择交易所",
						duration: 1200
					});

				if (this.jysymbol == 0)
					return this.$toast.fail({
						message: "请选择交易币对",
						duration: 1200
					});
				var obj = {};
				obj.types = this.types;

				obj.bourse = this.bourse;
				obj.symbol = this.symbol;
				obj.symbol1 = this.selsym.join(",");


				this.istxt = 100;
				this.$axios.post("/index/strategy/set_strategy_all", obj).then(res => {
					this.principal = res.data.principal;
					// localStorage.setItem("principal",this.principal);
					if (res.data.code == 0) {
						localStorage.setItem("bourse", this.bourse);
						this.$toast.fail({
							message: res.data.msg,
							duration: 2000
						})
						if (this.istxt == 0) {
							setTimeout(() => {
								this.istxt = -10;
							}, 8000);
						}
						setTimeout(() => {
							this.istxt = -1;
							this.start();
						}, 10000);
					} else {
						if (res.data.err_code) {
							setTimeout(() => {
								this.istxt = res.data.err_code;
							}, 1000);
							setTimeout(() => {
								this.istxt = -1;
							}, 10000);
						}
					}
				});
			},
			start1(is = false) {
				if (localStorage.getItem("symbol")) {
					this.symbol = localStorage.getItem("symbol");
				}
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
				this.$axios
					.post("/index/spotstrategy/get_strategy_list", {
						symbol: this.symbol,
						bourse: this.bourse,
						types: this.types
					})
					.then(res => {
						this.strategy_list = res.data.list;
						let that = this
						let arr = []
						res.data.list.forEach((item, index) => {
							if (item.status == 1) {
								this.type_status = true
							}
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


					});
			},
			selecli(i) {
				this.index = i;
				this.types = Number(i) + 1;
				localStorage.setItem("index", i);
				var str = "this.$refs.selt" + i;
				var dom = eval(str);
				var strf = dom[0].innerHTML;

				this.seletext = strf.substring(0, 2) + strf.substring(4, 6);
				this.start();

				this.seletext = strf;
			},



			selecli_symbolcli(i, index) {
				let obj = this.list3[index]
				if (obj.bool) {
					obj.bool = !obj.bool
				} else {
					obj.bool = true
				}
				this.$set(this.list3, index, obj)
				// this.selsym = [];
				this.selsym.push(this.list3[index].symbol1)
				this.selsym = [...new Set(this.selsym)]
				console.log(this.selsym)
				if (this.selsym.length > 10) {
					return this.$toast.fail({
						message: "最多只能选则10个币对",
						duration: 1200
					});
				}
				this.jysymbol = this.selsym.length;

			},
			changleft() {
				this.show = false;
			},
			changright() {
				this.bidui = false;
			},
			bounce(s, i, type) {
				if (s == 0) {
					console.log(type)
					if (type == 2) {
						this.$axios
							.post("/index/spot/profit_restart", {
								id: i
							})
							.then(res => {
								this.start();
							});
					} else {
						this.closedeal = true;
					}
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
					this.getxingqing()
				} else if (s == 5) {}
			},
			getxingqing() {
				this.huobi = true
				this.list3 = []
				this.jysymbol = 0
				// let arr = ['btc', 'eth', 'ltc', 'bch', 'eos', 'link', 'dot', 'fil', 'ada', 'uni']
				// let list3 = []
				// arr.forEach((item1, index) => {
				// 	let obj = {}
				// 	obj.symbol1 = item1
				// 	obj.symbol = 'usdt'
				// 	list3.push(obj)
				// })
				// this.strategy_list.forEach(item => {
				// 	let numarr = []
				// 	list3.forEach((item1, index) => {
				// 		let str = item1.symbol1.toUpperCase() + '/' + 'USDT'
				// 		if (item.bidui == str) {
				// 			item1.bool = true
				// 		}
				// 	})
				// })
				// this.list3 = list3
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
				this.huobi = false
				this.list3 = []
				console.log(this.symbol)

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

								this.$axios
									.post("/index/spotstrategy/get_strategy_list", {
										symbol: this.symbol,
										bourse: this.bourse,
										types: this.types
									})
									.then(res => {
										this.strategy_list = res.data.list;
										res.data.list.forEach((item, index) => {

											// this.$set(this.strategy_list, index, item)
											if (item.status == 1) {
												this.type_status = true
											}
										})
									});

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
	.title-two{
		justify-content: space-between;
		.usdt{
			font-size: .25rem;font-weight: 550;;margin-top: .05rem;
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
	}

	.comereult {
		margin: 0rem auto 0.5rem;

		li {
			border-bottom: 2px solid #e5e5e5;
			padding: 0.4rem 0.3rem 0;
		}

		.cometop {
			display: flex;

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

	.gundong {
		width: 64.5%;
		background: url(../assets/gundong7.gif) no-repeat;
		background-size: 100% 100%;
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

	.item-span {
		color: #d74e5a;
		font-size: .22rem;margin-left: 17px;
	}
	.poup-title {
		display: flex;
		position: relative;
		padding: .2rem;
		border-bottom: 4px solid #E5E5E5;

		div {
			margin-left: .4rem;
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

	

	.divli {
		font-size: 14px;
		display: flex;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		position: relative;
		padding: .1rem .2rem .1rem .2rem;
		font-size: .3rem;
		background: #fff;
		border-bottom: 1px solid #eee;
		color: #646566;

		.right {
			color: #000;

			.inputclass {
				text-align: right;
			}
		}
	}

	.imgge1 {
		height: 34px;
		margin-top: 10px;
		line-height: 34px;
		// font-weight: 550;
		font-size: 15px;
		background-color: rgb(240, 240, 240);
		padding-left: .2rem;
		display: flex;
		justify-content: space-between;
		color: #646566;

		.item {
			// margin-left: 4%;
			display: flex;
			font-size: 14px;

			span {
				width: 10px;
				height: 10px;
				border-radius: 50%;
				margin-top: 10px;
				border: 1px solid rgb(157, 153, 153);
				display: block;
				margin-right: 3.5px;
			}
		}

		.active {
			color: #000000;

			span {
				border: 1px solid rgb(33, 103, 255);
				padding: 1px;
				width: 8px;
				height: 8px;
				background-color: #FFFFFF;
				position: relative;

				span {
					width: 4px;
					height: 4px;
					background-color: rgb(33, 103, 255);
					position: absolute;
					top: -9px;
				}
			}
		}

		.active2 {
			color: #2167ff;
		}

		.van-switch {
			background: #999;
			height: 1em;
			width: 27px;
			position: relative;
			display: inline-block;
			box-sizing: content-box;
			font-size: 30px;
			border: 1px solid rgba(0, 0, 0, .1);
			border-radius: 1em;
			margin-left: 0px;
			margin-top: 10px;
		}

		.van-switch--on {
			background-color: #1989fa;
		}
	}
	.button1 {
		background: rgb(97, 161, 240);
	}

	.button3 {
		background: #BD1616;
	}

	.poup-title {
		.xiahuaxian {
			border-bottom: 1px solid #2284fd;
			color: #2284fd;
		}
	}

	.heyue-body {
		width: 42%;
		display: flex;
		margin-left: 16px;
		overflow: hidden;
		color: #646566;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
		border-bottom: 1px solid #ebedf0;
		line-height: 35px;

		input {
			width: 37%;
			text-align: center;
		}
	}

	.heyue-body1 {
		border-bottom: 1.5px solid #ebedf0;
	}
	.poup .li-item {
		display: flex;
		font-size: 16px;
	
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
.poup-body {
		// width: 100%;
		display: flex;
		padding: 0.2rem;
		border-bottom: 1px solid #e5e5e5;

		span {
			flex: 1;
			font-size: 16px;
			text-align: center;
		}
	}
	.statusimg {
		position: absolute;
		top: 3px;
		left: 47%;
		width: 30px;
		height: 40px;
	}
	/deep/.van-overlay{
		background-color: rgba(0,0,0,.6)
	}
</style>
