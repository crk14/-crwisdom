<template>
	<div class="body">
		<div class="title">

			<van-icon name="arrow-left" onclick="window.history.go(-1)" />
			<div>{{$t('store.Strategy')+$t('store.following')+$t('community.community')}}</div>
		</div>
		<div class="img">
			<img src="../assets/1701.png" @click="tointerading()" />
			<!-- <img src="../assets/1701.png" @click="toast()" /> -->
			<img v-show="bool" @click="$router.push(`heyue4?time=${list3.remain_day}`)" src="../assets/1702.png" />
			<!-- <img v-show="bool" @click="toast()" src="../assets/1702.png" /> -->
		</div>
		<div style="display: flex;font-size: 13px;justify-content: space-between;padding: .2rem 0 0 .3rem;">
			<p class="p1">{{$t('callcenter.activation')}}: {{list3 &&list3.active_time?list3.active_time:'未激活'}}</p>
		<p class="p1">{{$t('community.remaining')}}: <span style="color: rgb(255,147,31); font-weight: bold;">{{list3?list3.remain_day:'0'}}</span><span
				 style="color: rgb(103,103,103);"></span>{{$t('store.day')}} <span v-show="list3 &&list3.probation"></span></p>
		
		<div class="button">
			<button @click="fn(4,list3,false,true)" v-if="list3 && list3.active">{{$t('community.Renew')}}</button>
			<button @click="fn(4,list3)" v-else>{{$t('community.activate')}}</button>
		</div>
		</div>
		<div class="title2">
			<div class="one">{{$t('store.Strategy')+$t('community.List')}}</div>
			<div style="display: flex;">
				<div class="two">
					<input v-model="value" :placeholder="$t('community.search')" @keyup.enter="onSearch()" />
					<van-icon name="search" @click="onSearch()" />
				</div>
				<div class="two three" :class="{'active':value1==1}" style="margin-left: 8px;padding: 6px 0 6px 3px;">
					<select name="public-choice" v-model="value2" @change="getvalue2" style="color: rgb(169, 173, 182)">
						<option value="state">{{$t('community.ranking')}}</option>
						<option value="follow_num">{{$t('store.following')+$t('community.population')}}</option>
						<option value="all_profit">{{$t('community.accumulative')+$t('notecase.income')}}</option>
						<option value="trans_numy">{{$t('community.win')}}</option>
						<option value="trans_num">{{$t('community.transactions')}}</option>
						<option value="profit">{{$t('store.following')+$t('community.revenue')}}</option>
						<option value="profit_rate">{{$t('notecase.income')+$t('community.rate')}}</option>
					</select>
				</div>
			</div>

		</div>
		<p class="p">{{$t('community.Feed')}}</p>
		<div class="banan">

			<div class="item" v-for="(item,index) in list" :key="index">
				<div class="one">
					<img :src="item.avatar" class="img1" />
					<div class="center">
						<div>
							<strong>{{item.nick_name}}</strong>
							<span>{{$t('store.Strategy')+$t('community.running')}}: {{item.state!=0?item.update_time:0}}{{$t('store.day')}}</span>
						</div>

						<p><span style="margin-right: 20px;">{{$t('community.type')}}: {{item.hourse?'HUOBI '+$t('community.Huobi')+$t('store.spot'):'OKEX/'+$t('community.sustainability')+$t('store.swap')}}</span > 
						<!-- <span v-if="!item.hourse">币对: {{item.symbol_deal.toUpperCase()}}/{{item.symbol.toUpperCase()}}</span> -->
						 </p>
					</div>
					<div class="i-t1" :class="{'active':item.state==1,'active1':item.state==2}"></div>
					<div class="i-t" :class="{'active':item.state==1,'active1':item.state==2}">{{item.state==1?$t('community.trading'):item.state==0?$t('community.Stopped'):'已满员'}}</div>
				</div>
				<div class="two">
					<div class="left">
						{{item.follow_num}}
						<p>{{$t('community.population')}}</p>
					</div>
					<div class="center">
						{{(item.all_profit*1).toFixed(2)}}
						<p>{{$t('community.accumulative')+$t('notecase.income')}}(USDT)</p>
					</div>
					<div class="right">
						{{item.trans_num?(item.win_num/item.trans_num*100).toFixed(2):0}}%
						<p>{{$t('community.win')}}</p>
					</div>
				</div>
				<div class="two">
					<div class="left">
						{{item.trans_num}}
						<p>{{$t('community.transactions')}}</p>
					</div>

					<div class="center">
						{{(item.profit*1).toFixed(2)}}
						<p>{{$t('store.following')+$t('community.revenue')}}(USDT)</p>
					</div>

					<div class="right" style="color: rgb(53,183,135);">
						{{item.profit_rate?(item.profit_rate*100).toFixed(2):0}}%
						<p>{{$t('notecase.income')+$t('community.rate')}}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from "vue";
	import {
		Dialog,
	} from "vant";
	Vue.use(Dialog);
	export default {
		components: {
			Dialog,
		},
		data() {
			return {
				value: '',
				value2: 'state',
				bool: true,
				list: [],
				list3:[],
				list2:[],
				value1:0,
			};
		},
		created() {
			let value = localStorage.getItem('languageSet')
			if (value) {
				if (value == 'en') {
					this.value1 = 1
				} else if (value == 'hy') {
					this.value1 = 2
				}
			}
			this.start()
		},
		watch:{
			value(oldvalue,newvalue){
				if(oldvalue){
					this.list = []
					 this.list2.forEach(item =>{
						 if (item.nick_name.indexOf(oldvalue) != -1) {
						 	this.list.push(item)
						 }
					 })
					
				}else{
					this.list = this.list2
				}
			}
		},
		methods: {
			toast() {
				Dialog.confirm({
						title: '更新维护',
						message: `CR量化系统计划于2021年4月15号15点30至16点30进行更新维护,维护完成后正常进入。`,
					})
					.then(() => {
						// on confirm
			
					})
					.catch(() => {
						// on cancel
					});
			},
			fn(id, bool, show, bool2) {
				if (show) {
					this.$toast.fail({
						message: `暂未开放`,
						duration: 1200
					});
					return
				}
				let obj;
				let str;
				if (bool2) {
					str = "确认续费"
				} else {
					str = "确认激活"
				}
				obj = {
					robot_type: id,
				}
				Dialog.confirm({
						title: str,
						message: `是否${str}`,
					})
					.then(() => {
						// on confirm
						this.$axios
							.post("/index/robot/robot_active", obj)
							.then((res) => {
								if (res.data.code == 0) {
									this.$toast.success({
										message: res.data.msg,
										duration: 1600
									});
									this.getlist()
								} else {
									this.$toast.fail({
										message: res.data.msg,
										duration: 1200
									});
								}
							});
					})
					.catch(() => {
						// on cancel
					});
			},
			start() {
				this.$axios
					.post(`/index/spotfollow/trader_info`, )
					.then((res) => {
						res.data.trader_info.forEach(item => {
							if (item.update_time) {
								let timestamp = new Date().getTime()
								let str = item.update_time.replace(/\-/g, '/')
								let timestamp1 = new Date(str).getTime()
								let num = (timestamp - timestamp1) / 1000 / 3600 / 24
								item.update_time = num.toFixed(0)
							} else {
								item.update_time = 0
							}
							item.hourse = 1
						})
						this.list = res.data.trader_info
						this.$axios
							.post(`/index/follow/trader_info`, )
							.then((res) => {
								res.data.trader_info.forEach(item => {
									if (item.update_time) {
										let timestamp = new Date().getTime()
										let timestamp1 = new Date(item.update_time).getTime()
										let num = (timestamp - timestamp1) / 1000 / 3600 / 24
										item.update_time = num.toFixed(0)
									} else {
										item.update_time = 0
									}
								})
								let arr = [...this.list,...res.data.trader_info] 
								arr.sort((a, b)=>{
									return  b.state -a.state 
								})
								this.list = arr
								this.list2 = arr
							});
					});
				
				
					this.getlist()
			},
			getlist(){
				this.$axios
					.post("/index/robot/robot_list", )
					.then((res) => {
						if (res.data.code == 0) {
							this.list3 = res.data.data. [4]
						} else {
							this.$toast.fail({
								message: res.data.msg,
								duration: 1200
							});
						}
					});
			},
			tointerading() {
				// this.$toast.fail({
				// 	message:'暂未开放'
				// })
				let num = 0
				if(this.list3){
					num = this.list3.remain_day
				}
				this.$router.push(`/intetrading4?time=${num}`)
				
			},
			onSearch() {
				
			},
			getvalue2() {
				let str = this.value2
				let arr = this.list
				if(str=='trans_numy'){
					arr.sort((a, b)=>{
						let anum = a.trans_num?(a.win_num/a.trans_num*100).toFixed(2):0
						let bnum = b.trans_num?(b.win_num/b.trans_num*100).toFixed(2):0
							return  bnum -anum 
						})
				}else{
					arr.sort((a, b)=>{
						return  b.[str]-a.[str]
					})
				}
				this.list = arr
			},
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
			.three{
				width: 103px;
			}
			.active{
				width: 140px;
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

						div {
							display: flex;
							justify-content: space-between;
							width: 82%;

							strong {
								font-size: 15px;
								font-weight: 550;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
								width: 130px;
							}
						}

						span {
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
	.button {
		// margin-top: 13px;
		// margin-left: .9rem;
		position: relative;
	
		button {
			// padding: 0;
			// width: 34.4%;
			border-radius: 11px;
			border: 1.2px solid rgb(14, 138, 254);
			margin-right: 20px;
			color: rgb(14, 138, 254);
			background-color: #FFFFFF;
			// height: 22px;
			line-height: 14px;
			// font-size: 0.22rem;
		}
	
		// .active1 {
		// 	color: #ccc;
		// 	border: 1.2px solid #ccc;
		// }
	}
</style>
