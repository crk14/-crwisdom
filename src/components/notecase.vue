<template>
	<div class="note" style="font-size: 14px;">
		<div class="tophader">
			<van-icon name="arrow-left" onclick="window.history.go(-1)" />
			<p>JUW量化系统</p>
		</div>
		<van-tabs v-model="active" color="rgb(34,137,242)">
			<van-tab title="API管理" :title-style="active==0?'color:rgb(34,137,242)':'color:#000'">
				<p class="open">已开通自动交易</p>
				<div class="tolead" @click="$router.push({path:'global',query:{id:1}})">
					<p>
						<img src="../assets/src_resource_image_page_huobi_logo@2x.png" alt />火币全球站
					</p>
					<p>
						<img src="../assets/gou.png" alt />导入API
					</p>
				</div>
				<div class="tolead" @click="$router.push({path:'global',query:{id:4}})">
					<p>
						<img src="../assets/src_resource_icon_user_exchange_okex@2x.png" alt />OKEX
					</p>
					<p>
						<img src="../assets/gou.png" alt />导入API
					</p>
				</div>
			</van-tab>
			<van-tab title="现货量化" :title-style="active==1?'color:rgb(34,137,242)':'color:#000'">
				
				<p style="line-height: 110px;text-align: center;">敬请期待</p>
			</van-tab>
			<van-tab title="合约量化" :title-style="active==2?'color:rgb(34,137,242)':'color:#000'">
				<div style="margin-bottom: 50px;">
					<p class="hr"></p>
					<div class="note-t">
						<div class="div">
							<div></div> 选择交易所
						</div>
						<div class="div2">
							<div :class="{'avtive':bourse==0}" @click="bourse=0">Huobi</div>
							<div :class="{'avtive':bourse==1}" @click="bourse=1">OKEX</div>
							<div :class="{'avtive':bourse==2}" @click="bourse=2">Coinbene</div>
						</div>
					</div>
					<p class="hr"></p>
					<div class="note-t">
						<div class="div">
							<div></div> 选择交易对
						</div>
						<div class="div2">
							<div :class="{'avtive':symbol=='BTC'}" @click="symbol='BTC'">BTC/USDT</div>
							<div :class="{'avtive':symbol=='ETH'}" @click="symbol='ETH'">ETH/USDT</div>
						</div>
					</div>
					<p class="hr"></p>
					<div class="note-t">
						<div class="div" style="width: 25%;">
							<div></div> 选择仓位
						</div>
						<div class="div2">
							<div style="margin: 0 2%;font-size: 14px;" :class="{'avtive':monery==5000}" @click="monery=5000">5000USDT</div>
							<div style="margin: 0 2%;font-size: 14px;" :class="{'avtive':monery==10000}" @click="monery=10000">10000USDT</div>
							<div style="margin: 0 2%;font-size: 14px;" :class="{'avtive':monery==20000}" @click="monery=20000">20000USDT</div>
						</div>
					</div>
					<p class="hr"></p>
					<div class="p1">
						<button @click="confim()">生成策略</button>
					</div>
					<p class="hr"></p>
					<div class="note-i" v-for="(item,index) in strategy_list" :key="index">
						<div style="display: flex;">
							<img v-show="item.symbol_deal == 'BTC'" src="../assets/btc.png" />
							<img v-show="item.symbol_deal == 'ETH'" src="../assets/eth.png" />
							<div class="one">
								<div style="color: rgb(77,77,77);">
									<span style="color: rgb(41,61,83)">{{item.symbol_deal}}</span><span style="color: #CCCCCC;">/</span>{{item.symbol}}
								</div>
								<div style="font-size: 14px; color: rgb(19,168,24);margin: 0 21px;" :style="item.up_down==1?'color: rgb(19,168,24)':'color: rgb(234,93,73)'">{{item.up_down==1?'开多':'开空'}}<span
									 style="margin-left: 2px;">{{item.leverage}}X</span></div>
								<div style="font-size: 14px;">账户权益: 10000USDT</div>
							</div>
						</div>
						<div class="one one1">
							<div @click="toshowdetail(true)" style="margin: 0 44px 0 30px;display: flex;">持仓 <img src="../assets/1008.png" /> </div>
							<div  @click="toshowdetail()" style="display: flex;">交易记录 <img src="../assets/1008.png" /></div>
							<div style="flex: 1;text-align: center;">状态: <span style="color: #4389eb;">{{item.status == 1?'运行中':'待开启'}}</span></div>
						</div>
						<div class="two">
							<div>
								<p class="p">账户权益</p>
								<p>10000.00<span style="margin-left: 2px;">USDT</span></p>
								<P class="p">持仓均价</P>
								<p>{{item.buy_count_average}}<span style="margin-left: 2px;">USDT</span></p>
							</div>
							<div>
								<p class="p">可开张数</p>
								<p>1000张</p>
								<P class="p">交易笔数</P>
								<p>{{item.sell_count}}</p>
							</div>
							<div>
								<p class="p">持仓数量</p>
								<p>{{item.buy_count_amount}}张</p>
								<P class="p">实现收益</P>
								<p>{{(item.profit_cash*1).toFixed(2)}}<span style="margin-left: 2px;">USDT</span></p>
							</div>
						</div>
						<div class="button">
							<button @click="fn5(item.id,item.stop_type)">删除策略</button>
							<button @click="close_now(item.id,item.status)">一键平仓</button>
							<button @click="close_now2(item.id)">临时停止</button>
							<button @click="open_strategy(item.id,'1',item.up_down)" style="background-color: #4389eb;color: #FFFFFF;border: 0;margin-right: 15px;">启动交易</button>
						</div>
						<p class="hr"></p>
					</div>
				</div>
			
			</van-tab>
		</van-tabs>
		<van-dialog v-model="show2" title="选择多空" show-cancel-button :before-close="beforeClose">
			<div class="body-i">
				<van-checkbox v-model="checked2" style="font-size: 14px;">开多</van-checkbox>
				<van-checkbox v-model="checked3" style="font-size: 14px;">开空</van-checkbox>
			</div>

		</van-dialog>
	</div>
</template>

<script>
	import Vue from 'vue'
	import {
		Dialog,
		Checkbox
	} from 'vant';
	Vue.use(Dialog);
	Vue.use(Checkbox)
	export default {
		data() {
			return {
				active: 2,
				bourse: 1,
				symbol: 'BTC',
				monery: 5000,
				strategy_list: '',
				show2: false,
				checked2: true,
				checked3: true
			};
		},
		created() {
			this.start()
		},
		watch:{
			bourse(newvalue,oldvalue){
				this.start()
			}
		},
		methods: {
			confim() {
				this.show2 = true
				return

			},
			start() {
				let str;
				if (this.bourse == 1) {
					str = 4
				}
				if (this.bourse == 0) {
					str = 1
				}
				this.$axios
					.post(`/index/swapstrategy/get_strategy_list`, {
						symbol: 'USDT',
						bourse: str,
						type: 1,
					})
					.then((res) => {
						if(res.data.code == 0){
							this.strategy_list = res.data.list;
						}
					});
			},
			fn5(id, type) {
				console.log(id, type);
				if (type == 2) {
					this.$toast.fail({
						message: "止盈停止后才可删除",
						duration: 2000
					});
					return;
				}
				Dialog.confirm({
					title: "提醒",
					message: "是否删除策略？",
				}).then(() => {
					this.$axios
						.post("/index/swap/delete_strategy", {
							strategy_id: id
						})
						.then((res) => {
							if (res.data.code == 0) {
								this.$toast.fail({
									message: "删除成功",
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
				});
			},
			close_now(id, str) {
				if (str == 0) {
					this.$toast.fail({
						message: "请先开启策略",
						duration: 2000
					})
					return
				}
				this.$axios
					.post("/index/swap/clearance", {
						id
					})
					.then((res) => {
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
			},
			close_now2(id) {
				this.$axios
					.post("/index/swap/pause_strategy", {
						id
					})
					.then((res) => {
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
			open_strategy(s, i, b) {
				this.$axios
					.post("/index/swap/start_strategy", {
						id: s,
						up_down: b
					})
					.then((res) => {
						if (res.data.code == 0) {
							this.$toast.success({
								message: res.data.msg,
								duration: 2000
							});
							this.start();
							// this.strategy_list[i].status = 1
						} else {
							this.$toast.fail({
								message: res.data.msg,
								duration: 2000
							});
						}
					});
			},
			toshowdetail(bool = false) {
				let str;
				if (this.bourse == 1) {
					str = 4
				}
				if (this.bourse == 0) {
					str = 1
				}
			  if (!this.bourse) {
			    this.$toast.fail({ message: "请选择交易所", duration: 2000 });
			    return;
			  }
			  if (bool) {
			   let abc = []
			   this.strategy_list.forEach(item=>{
			   	abc.push(item.symbol_deal)
			   })
			   abc = [...new Set(abc)].join(',')
			     this.$router.push({
			          name:'持仓',
			          params:{
			            bourse:str,
			   		 symbol:'USDT',
			   		 stage:abc
			            }
			           })
			  } else {
			    this.$router.push(
			      "showdetail?bourse=" + str + "&type=1" + "&heyeu=1"
			    );
			  }
			},
			beforeClose: function(action, done) {
				if (action === "confirm") {
					let obj = {};
					if (this.bourse == 1) {
						obj.bourse = 4
					}
					obj.symbol = 'USDT'
					obj.symbol_deal = this.symbol
					obj.amount = this.monery
					obj.type = 1
					let arr = [1, 0];
					if (this.checked2) {
						obj.up_down = '1'
					}
					if (this.checked3) {
						obj.up_down = '0'
					}
					if (this.checked3 && this.checked2) {
						obj.up_down = arr.join(",");
					}
					this.$axios.post(`/index/swapstrategy/set_strategy_all`, obj).then((res) => {
						if (res.data.code == 0) {
							this.$toast.success({
								message: res.data.msg,
								duration: 1200
							})
							setTimeout(() => {
								this.start();
							}, 1200)
						} else {
							this.$toast.fail({
								message: res.data.msg,
								duration: 1200
							});
						}
					})
					done(); // 关闭提示框
				} else if (action === "cancel") {
					done(); // 关闭提示框
				}
			}
		}
	};
</script>

<style lang="less" scoped>
	.body-i {
		display: flex;
		padding: 10px 20px;
		justify-content: space-around;
	}

	.note {
		min-height: 760px;
	}

	.note-t {
		display: flex;
		padding: 0 0.28rem;

		.div2 {
			display: flex;
			flex: 1;
			line-height: 26px;
			margin-top: 5px;
			margin-bottom: 5px;

			div {
				flex: 1;
				margin: 0 6%;
			}

			.avtive {
				color: rgb(34, 137, 242);
				border-bottom: 1px solid rgb(34, 137, 242);
			}
		}

		.div {
			line-height: 36px;
			width: 30%;
			display: flex;

			div {
				width: 2.5px;
				height: 16px;
				background-color: #000;
				margin-top: 10px;
				margin-right: 5px;
			}
		}
	}

	.p1 {
		width: 100%;
		text-align: center;

		button {
			width: 60%;
			background-color: rgb(67, 137, 235);
			color: rgb(235, 241, 245);
			border-radius: 4px;
			line-height: 26px;
		}
	}

	.open {
		padding: 0.3rem;
		font-size: 0.3rem;
	}

	.note-i {
		padding-left: .2rem;

		img {
			width: 23px;
			height: 23px;
			margin: 8px 11px 0 0;
		}

		.one {
			display: flex;
			line-height: 40px;
			// font-size: 14px;
			border-bottom: 1px solid #eee;
		}

		.one1 {
			div {
				text-align: center;
				line-height: 32px;
				// font-size: 14px;
			}

			img {
				width: 11px;
				height: 11px;
				display: block;
				margin-top: 11px;
				margin-left: 2px;
			}

		}

		.two {
			display: flex;

			div {
				flex: 1;
				text-align: center;
				line-height: 26px;
				color: rgb(94, 94, 94);

				.p {
					margin-top: 5px;
					color: rgb(133, 135, 151);
				}
			}
		}

		.button {
			width: 100%;
			text-align: right;
			margin-bottom: 8px;

			button {
				width: 70px;
				line-height: 20px;
				color: rgb(199, 199, 199);
				border: 1px solid rgb(188, 187, 193);
				border-radius: 4px;
				background-color: #FFFFFF;
				margin-right: 5px;
			}
		}
	}

	.tolead {
		display: flex;
		justify-content: space-between;
		height: 1rem;
		line-height: 1rem;
		padding: 0 0.3rem;
		background: #fff;

		p {
			font-weight: bold;
		}

		img {
			width: 0.24rem;
			margin-right: 0.2rem;
		}
	}
</style>
