<template>
	<div class="inpareport" style="min-height: 500px;">
		<div class="tophader yancolor" style="display: flex;z-index: 100;">
			<van-icon name="arrow-left" @click="$router.back()" />
			<p  style="text-align: left;margin-left: .7rem;">交易记录</p>
			<p  style="font-size: 0.3rem;position: relative;"><img src="../assets/src_resource_icon_user_exchange_okex@2x.png"
				 alt style="right: 0;left: 0.5rem;" />OKEX</p>
		</div>
		<p class="hr"></p>
		<van-pull-refresh
		  v-model="isLoading"
		  success-text="刷新成功"
		  @refresh="onRefresh"
		>
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
		<button @click="settime()" v-show="bool2" style="position: absolute;right: .15rem;top:0.99rem;background: rgb(34, 132, 253);color: #FFFFFF;height: .5rem;line-height: .5rem;width: 1rem;font-size: 12px;">确认</button>
		<div class="datebox" v-show="show">
			<van-datetime-picker v-model="currentDate" @confirm="confirm(0)" @cancel="cancel(0)" type="date" />
		</div>
		<div class="datebox" v-show="showfor">
			<van-datetime-picker v-model="currentDate" @confirm="confirm(1)" @cancel="cancel(1)" type="date" />
		</div>
		<p class="hr"></p>
		<div v-if="type == 'fol'" class="show-fol">
			<div :class="{'active':folshow}" @click="folshow=true">交易明细</div>
			<div :class="{'active':!folshow}" @click="folshow=false">划转明细</div>
		</div>
		<div>
			<div v-show="!type" style="display: flex;width: 90%;margin: 2% 5%;color: #99A1A7;border: 1px solid #f6f7f9;font-size: 0.28rem;">
				<div :class="{'active':bool1==0}" @click="bool1=0" style="flex:1;text-align: center;padding: 0.05rem 0;">成交明细</div>
				<div :class="{'active':bool1==1}" @click="bool1=1" style="flex:1;text-align: center;padding: 0.05rem 0;">点卡明细</div>
			</div>
			<div style="display: flex; padding-left:.2rem;font-size: 12px;margin-top: .4rem;margin-bottom: .2rem">{{starttime}}至 {{endtime}}
				<span style="font-size: 0.26rem;margin-left: 0.26rem;width: 55%;display: block;display: flex;">累计单数:{{count+'单'}}
				<span style="text-align: center;display: block;flex: 1;">
				总收益: {{ profit==0?profit:Number(profit).toFixed(2)}}
				</span>
				</span> </div>
			<ul class="page-ui" v-show="bool1==0 && folshow">
				<li v-for="(item,i) in list" :key="i">
					<div class="title">
						<div class="left">
							<span class="act" style="background-color: rgb(83,181,112);font-size: 12px;" v-if="item.okex_type==3">卖出平多</span>
							<span class="act" style="background-color:rgb(239,101,98) ;font-size: 12px;" v-if="item.okex_type==4">买入平空</span><span
							 style="font-weight: bold;"> {{item.symbol_deal}}/{{symbol.toUpperCase()}}永续</span>
						</div>
						<div class="right" style="color: rgb(201,201,202);">{{item.time}} 完全成交</div>
					</div>
					<div class="body">
						<div>委托数量{{'('+item.symbol_deal.toUpperCase()+')'}}:
							<span>{{item.cjsl.toFixed(4)}}</span>
						</div>
						<div>持仓均价({{symbol.toUpperCase()}}): <span>{{item.avg_price?item.avg_price:item.cjjj}}</span></div>
					</div>
					<div class="body" style="margin-top: .15rem;">
						<div>平仓均价({{symbol.toUpperCase()}}): <span style="right: 0;">{{item.price_avg}}</span></div>
						<div>成交利润({{symbol.toUpperCase()}}): <span>{{Number(item.cjsy).toFixed(4) }}</span></div>
					</div>
				</li>
			</ul>
			<ul class="page-ui" v-show="bool1==1 && folshow">
				<li v-for="(item,i) in list1" :key="i">
					<!-- <span class="one">{{item.money_type.toUpperCase()}}</span> -->
					<div class="title">
						<div class="left">
							<!-- <span class="act" style="background-color: rgb(239,101,98);font-size: 12px;" v-if="item.status==2">卖出</span> -->
							<span class="act" style="background-color: rgb(83,181,112);font-size: 12px;" >平仓结算</span>
							<span style="font-weight: bold;"> {{item.money_type}}永续</span>
						</div>
						<div class="right" style="color: rgb(201,201,202);">{{item.create_time}} 完全成交</div>
					</div>
					<div class="body">
						<div>结算收益(USDT): <span>{{(item.num*1).toFixed(3)}}</span></div>
						<div style="text-align: right;">点卡扣费: <span>{{(item.point*1).toFixed(3)}}</span></div>
					</div>
				</li>
				<li class="plunow">{{plunow}}</li>
			
			</ul>
			<!-- <ul class="page-ui" v-show="!folshow">
				<li v-for="(item,i) in list" :key="i">
					<div class="title">
						<div class="left">
							<span class="act" style="background-color: rgb(83,181,112);font-size: 12px;" >平仓结算</span>
							<span style="font-weight: bold;"> {{item.money_type}}永续</span>
						</div>
						<div class="right" style="color: rgb(201,201,202);">{{item.create_time}} 完全成交</div>
					</div>
					<div class="body">
						<div>结算收益(USDT): <span>{{(item.num*1).toFixed(3)}}</span></div>
						<div style="text-align: right;">点卡扣费: <span>{{(item.point*1).toFixed(3)}}</span>CRW扣费: <span>{{(item.point*1).toFixed(3)}}</span></div>
					</div>
				</li>
				<li class="plunow">{{plunow}}</li>
			
			</ul> -->
		</div>
		</van-pull-refresh>
	</div>
</template>

<script>
	import Vue from 'vue'
	// import { PullRefresh } from 'vant'
	// Vue.use(PullRefresh)
	export default {
		// components: {
		// 	PullRefresh
		// },
		data() {
			return {
				folshow:true,
				isLoading: false,
				info: {},
				list: [],
				list1: [],
				plunow: "",
				starttime: '',
				endtime: '',
				symbol: 'usdt',
				profit: 0,
				count: 0,
				symbold: '',
				page: 1,
				state: true,
				active: 1,
				bool1: 0,
				isshow: 0,
				value: "",
				showfor: false,
				valuefor: "",
				show: false,
				currentDate: new Date(),
				bool2: false,
				type:''
			}
		},
		created() {
			this.type = this.$route.query.type
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
			bool1(newValue, oldValue){
				this.page=1
				if(newValue == 0){
					this.jiesuan()
				}else{
					// this.start()
				}
			},
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
			onRefresh(){
				this.list = []
				this.jiesuan()
				  setTimeout(() => {
				        this.isLoading = false;
				      }, 1000);
				},
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
					if ((new Date(parseInt(this.value))) <= (new Date(parseInt(this.valuefor)) )) {
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
				if ((new Date(parseInt(this.value))) <= (new Date(parseInt(this.valuefor)))) {
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
			jiesuan() {
				this.state = false;
				let trant=''
				let img = 'swapstrategy'
				if(this.type==2){
				trant = ''
				}else{
					trant ='trend_'
				}
				if(this.type=='fol'){
					trant =''
					img= 'follow'
					}
				this.$axios.post(`/index/${img}/${trant}transaction_list`, {
					symbol: this.symbol,
					bourse: 4,
					starttime: this.starttime,
					endtime: this.endtime,
					page: this.page,
					limit: 20
				}).then(res => {
					this.state = true;
					if (res.data.code == 0) {
						if (res.data.list.length > 0) {
							for (var i = 0; i < res.data.list.length; i++) {
								this.list.push(res.data.list[i]);
							}
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
						if (this.bool1 == 1) {
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
				height: 0.41rem;

				span {
					font-size: 0.27rem;
					color: rgb(36, 51, 69);
				}
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
	.show-fol{
		display: flex;
		margin: 3px 15%;
		div{
			line-height: 25px;
			border: 1px solid #eee;
			flex: 1;
			text-align: center;
		}
		.active{
			color: #2284fd;
			border:1px solid #2284fd !important;
		}
		}
</style>
