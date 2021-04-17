<template>
	<div style="font-size: 14px;min-height: 100%;padding-bottom: 20px;">
		<div class="tophader">
			<van-icon name="arrow-left" onclick="window.history.go(-1)" />
			<p>{{$t('index.my')+$t('store.robot')}}</p>
		</div>
		<p class="hr" style="height: 2px;"></p>
		<van-pull-refresh v-model="isLoading" :success-text="$t('spot.success')" @refresh="onRefresh">
			<div class="itme1">
				<img style="width: 100%;height: 125px;" src="../assets/mejq.png" />
				<div class="item" v-if="setid == 1">
					<p>
						<img v-show="!isshow1" class="img" src="../assets/sc004.png" />
						<img v-show="isshow1" class="img img1" src="../assets/crliang.gif" />
						<img src="../assets/crwindow.png" />
					</p>
					<div>
						<div class="div">
							<p class="p2" :class="{'active1':value1}">{{$t('store.spot')}}<span style="color: rgb(255,147,31)">{{$t('store.intelligent')}}</span>{{ $t('index.quantization')+$t('store.robot')}}</p>
							<p class="p1">{{$t('community.remaining')}}: <span style="color: rgb(255,147,31);margin-left: 16px; font-size: 23px;font-weight: bold;">{{list4?list4.remain_day:'0'}}</span><span
								 style="color: rgb(103,103,103);font-size: 14px;">{{$t('store.day')}}</span> <span v-show="list4 && list4.probation"></span> </p>
							<p class="p1">{{$t('callcenter.activation')}}: {{list4 &&list4.active_time?list4.active_time:$t('callcenter.inactive')}}</p>
						</div>

						<div class="button">
							<button @click="fn(4,list4,false,true)" v-if="list4 && list4.active">{{$t('community.Renew')}}</button>
							<button @click="fn(4,list4)" v-else>{{$t('community.activate')}}</button>
							<button @click="list4? list4.active || list4.probation?tosmart(list4.remain_day):fn2(true):fn2(true)">{{$t('store.logon')}}</button>
					  </div>
					</div>
					<div v-show="list4 && list4.active " class="i-t">{{$t('callcenter.activated')}}</div>
					<div v-show="list4 && list4.active == 0 && list4.remain_day &&!list4.probation" class="i-t active">{{$t('store.beactivated')}}</div>
					<div v-show="!list4 " class="i-t active2">{{$t('store.unpurchased')}}</div>
				</div>
			
				<div class="item" v-if="setid == 1">
					<p>
						<img v-show="!isshow4" class="img" src="../assets/sc004.png" />
						<img v-show="isshow4" class="img img1" src="../assets/crliang.gif" />
						<img src="../assets/crwindow.png" />
					</p>
					<div>
						<div class="div">
							<p class="p2" :class="{'active1':value1}">{{$t('store.spot')}}<span style="color: rgb(255,147,31)">{{$t('store.profession')}}</span>{{$t('index.quantization')+$t('store.robot')}}</p>
							<p class="p1">{{$t('community.remaining')}}: <span style="color: rgb(255,147,31);margin-left: 16px; font-size: 23px;font-weight: bold;">{{list4?list4.remain_day:'0'}}</span><span
								 style="color: rgb(103,103,103);font-size: 14px;">{{$t('store.day')}}</span> <span v-show="list4 && list4.probation"></span> </p>
							<p class="p1">{{$t('callcenter.activation')}}: {{list4 &&list4.active_time?list4.active_time:$t('callcenter.inactive')}}</p>
						</div>
				
						<div class="button">
							<button @click="fn(4,list4,false,true)" v-if="list4 && list4.active">{{$t('community.Renew')}}</button>
							<button @click="fn(4,list4)" v-else>{{$t('community.activate')}}</button>
							<button @click="list4?list4.active || list4.probation?$router.push(`/intetrading2?time=${list4.remain_day}&bool=true`):fn2(true):fn2(true)">{{$t('store.logon')}}</button>
						</div>
					</div>
					<div v-show="list4 && list4.active " class="i-t">{{$t('callcenter.activated')}}</div>
					<div v-show="list4 && list4.active == 0 && list4.remain_day &&!list4.probation" class="i-t active">{{$t('store.beactivated')}}</div>
					<div v-show="!list4  || !list4.remain_day " class="i-t active2">{{$t('store.unpurchased')}}</div>
				</div>

				<div class="item" v-if="setid == 1">
					<p>
						<img v-show="!isshow" class="img" src="../assets/sc002.png" />
						<img v-show="isshow" class="img img1" src="../assets/crliang.gif" />
						<img src="../assets/crwindow.png" />
					</p>
					<div>
						<div class="div">
							<p class="p2" :class="{'active1':value1}">{{$t('store.spot')+$t('store.profession') +$t('index.quantization')+$t('store.robot')}}({{$t('store.Term')}})</p>
							<p class="p1">{{$t('community.remaining')}}: <span style="color: rgb(255,147,31);margin-left: 16px; font-size: 23px;font-weight: bold;">{{list1?list1.remain_day:'0'}}</span><span
								 style="color: rgb(103,103,103);font-size: 14px;">{{$t('store.day')}}</span> <span v-show="list1 && list1.probation"></span> </p>
							<p class="p1">{{$t('callcenter.activation')}}: {{list1 &&list1.active_time?list1.active_time:$t('callcenter.inactive')}}</p>
						</div>

						<div class="button">
							<button @click="fn(1,list1,false,true)" v-if="list1 && list1.active">{{$t('community.Renew')}}</button>
							<button @click="fn(1,list1)" v-else>{{$t('community.activate')}}</button>
							<button @click="list1?list1.active || list1.probation?$router.push(`/intetrading2?time=${list1.remain_day}`):fn2(true):fn2(true)">{{$t('store.logon')}}</button>
							<!-- <button @click="toast()">进入系统</button> -->

						</div>
					</div>
					<div v-show="list1 && list1.active " class="i-t">{{$t('callcenter.activated')}}</div>
					<div v-show="list1 && list1.active == 0 && list1.remain_day &&!list1.probation" class="i-t active">{{$t('store.beactivated')}}</div>
					<div v-show="!list1  || !list1.remain_day " class="i-t active2">{{$t('store.unpurchased')}}</div>
				</div>
				
				<div class="item" v-if="setid == 2">
					<p>
						<img class="img" src="../assets/sc002.png" />
						<!-- <img v-show="isshow1" class="img img1" src="../assets/crliang.gif" /> -->
						<img src="../assets/crwindow.png" />
					</p>
					<div>
						<div class="div">
							<p class="p2" :class="{'active1':value1}">{{$t('store.swap')}}<span style="color: rgb(255,147,31)">{{$t('store.intelligent')}}</span>{{$t('index.quantization')+$t('store.robot')}}</p>
							<p class="p1" :class="{'active1':value1}">{{$t('community.remaining')}}: <span style="color: rgb(255,147,31);margin-left: 16px; font-size: 23px;font-weight: bold;">{{list4?list4.remain_day:'0'}}</span><span
								 style="color: rgb(103,103,103);font-size: 14px;">{{$t('store.day')}}</span> <span v-show="list4 &&list4.probation"></span></p>
							<p class="p1">{{$t('callcenter.activation')}}: {{list4 &&list4.active_time?list4.active_time:$t('callcenter.inactive')}}</p>
						</div>
				
						<div class="button">
							<button @click="fn(4,list4,false,true)" v-if="list4 && list4.active">{{$t('community.Renew')}}</button>
							<button @click="fn(4,list4)" v-else>{{$t('community.activate')}}</button>
							<!-- <button @click="list4?list4.active|| list4.probation?$router.push(`/heyue2?type=2&time=${list4.remain_day}&bool=true`):fn2(true):fn2(true)">{{$t('store.logon')}}</button> -->
						<button @click="$toast.fail({message:'暂未开放'})">进入系统</button>
						</div>
					</div>
					<div v-show="list4 && list4.active " class="i-t">{{$t('callcenter.activated')}}</div>
					<div v-show="list4 && list4.active == 0 && list4.remain_day &&!list4.probation" class="i-t active">{{$t('store.beactivated')}}</div>
					<div v-show=" !list4 || !list4.remain_day " class="i-t active2">{{$t('store.unpurchased')}}</div>
				</div>
				<div class="item" v-if="setid == 2">
					<p>
						<img  class="img" src="../assets/sc003.png" />
						<!-- <img v-show="isshow2" class="img img1" src="../assets/crliang.gif" /> -->
						<img src="../assets/crwindow.png" />
					</p>
					<div>
						<div class="div">
							<p class="p2" :class="{'active1':value1}">{{$t('store.swap')}}<span style="color: rgb(255,147,31)">{{$t('store.profession')}}</span>{{$t('index.quantization')+$t('store.robot')}}</p>
							<p class="p1" >{{$t('community.remaining')}}: <span style="color: rgb(255,147,31);margin-left: 16px; font-size: 23px;font-weight: bold;">{{list4?list4.remain_day:'0'}}</span><span
								 style="color: rgb(103,103,103);font-size: 14px;">{{$t('store.day')}}</span> <span v-show="list4 &&list4.probation"></span></p>
							<p class="p1">{{$t('callcenter.activation')}}: {{list4 &&list4.active_time?list4.active_time:$t('callcenter.inactive')}}</p>
						</div>
				
						<div class="button">
							<button @click="fn(4,list4,false,true)" v-if="list4 && list4.active">{{$t('community.Renew')}}</button>
							<button @click="fn(4,list4)" v-else>{{$t('community.activate')}}</button>
							<!-- <button @click="list4&& list4.active|| list4.probation?$router.push(`/heyue2?type=2&time=${list4.remain_day}&bool=true`):fn2(true)">{{$t('store.logon')}}</button> -->
						<button @click="$toast.fail({message:'暂未开放'})">进入系统</button>
						</div>
					</div>
					<div v-show="list4 && list4.active " class="i-t">{{$t('callcenter.activated')}}</div>
					<div v-show="list4 && list4.active == 0 && list2.remain_day &&!list2.probation" class="i-t active">{{$t('store.beactivated')}}</div>
					<div v-show=" !list4 || !list4.remain_day " class="i-t active2">{{$t('store.unpurchased')}}</div>
				
				</div>
				<div class="item" v-if="setid == 2">
					<p>
						<img v-show="!isshow2" class="img" src="../assets/sc003.png" />
						<img v-show="isshow2" class="img img1" src="../assets/crliang.gif" />
						<img src="../assets/crwindow.png" />
					</p>
					<div>
						<div class="div">
							<p class="p2" :class="{'active1':value1}">{{$t('store.swap')+$t('store.profession') +$t('index.quantization')+$t('store.robot')}}({{$t('store.Term')}})</p>
							<p class="p1" >{{$t('community.remaining')}}: <span style="color: rgb(255,147,31);margin-left: 16px; font-size: 23px;font-weight: bold;">{{list2?list2.remain_day:'0'}}</span><span
								 style="color: rgb(103,103,103);font-size: 14px;">{{$t('store.day')}}</span> <span v-show="list2 &&list2.probation"></span></p>
							<p class="p1">{{$t('callcenter.activation')}}: {{list2 &&list2.active_time?list2.active_time:$t('callcenter.inactive')}}</p>
						</div>

						<div class="button">
							<button @click="fn(2,list2,false,true)" v-if="list2 && list2.active">{{$t('community.Renew')}}</button>
							<button @click="fn(2,list2)" v-else>{{$t('community.activate')}}</button>
							<button @click="list2&& list2.active|| list2.probation?$router.push(`/heyue2?type=2&time=${list2.remain_day}`):fn2(true)">{{$t('store.logon')}}</button>
						<!-- <button @click="toast()">进入系统</button> -->
						</div>
					</div>
					<div v-show="list2 && list2.active " class="i-t">{{$t('callcenter.activated')}}</div>
					<div v-show="list2 && list2.active == 0 && list2.remain_day &&!list2.probation" class="i-t active">{{$t('store.beactivated')}}</div>
					<div v-show=" !list2 || !list2.remain_day " class="i-t active2">{{$t('store.unpurchased')}}</div>

				</div>
				
				<div class="item" v-if="setid == 1">
					<p>
						<img class="img" src="../assets/sc003.png" />
						<img src="../assets/crwindow.png" />
					</p>
					<div>
						<div class="div">
							<p class="p2" :class="{'active1':value1}">{{$t('store.spot')+$t('store.profession') +$t('index.quantization')+$t('store.robot')}}({{$t('store.Sungha')}})</p>
							<p class="p1" style="margin-bottom: .359rem;">{{$t('store.Remaining')+$t('store.pointcard')}}:
								<span style="color: rgb(255,147,31);margin-left: 16px; font-size: 23px;font-weight: bold;">{{point_num?point_num:'0'}}</span>
								{{$t('store.dot')}}
							</p>
						</div>
						<div class="button">
							<button class="active1">{{$t('community.Renew')}}</button>
							<button @click="$router.push('/intetrading3')">{{$t('store.logon')}}</button>
						<!-- <button @click="toast()">进入系统</button> -->
						</div>
					</div>
					<div class="i-t active2">1.0{{$t('store.version')}}</div>
				</div>
				
				<div class="item" v-if="setid == 2">
					<p>
						<img class="img" src="../assets/sc004.png" />
						<img src="../assets/crwindow.png" />
					</p>
					<div>
						<div class="div">
							<p class="p2" :class="{'active1':value1}">{{$t('store.swap')+$t('store.profession') +$t('index.quantization')+$t('store.robot')}}({{$t('store.Sungha')}})</p>
							<p class="p1" style="margin-bottom: .359rem;">{{$t('store.Remaining')+$t('store.pointcard')}}:
								<span style="color: rgb(255,147,31);margin-left: 16px; font-size: 23px;font-weight: bold;">{{point_num?point_num:'0'}}</span>
								{{$t('store.dot')}}
							</p>
						</div>
						<div class="button">
							<button class="active1">{{$t('community.Renew')}}</button>
							<button @click="$router.push('heyue3')">{{$t('store.logon')}}</button>
						<!-- <button @click="toast()">进入系统</button> -->
						</div>
					</div>
					<div class="i-t active2">1.0{{$t('store.version')}}</div>
				</div>
			</div>
		</van-pull-refresh>



	</div>
</template>

<script>
	import Vue from "vue";
	import {
		Dialog,
		Radio,
		RadioGroup,
		Checkbox
	} from "vant";
	Vue.use(Dialog);
	Vue.use(Radio);
	Vue.use(RadioGroup);
	Vue.use(Checkbox);
	export default {
		components: {
			Radio,
			RadioGroup,
			Dialog,
			Checkbox
		},
		data() {
			return {
				isLoading: false,
				id: 1,
				bool: false,
				list1: [],
				list2: [],
				list4: [],
				isshow: false,
				isshow1: false,
				isshow2: false,
				isshow4: false,
				radio1: '2',
				bool3: false,
				setid: 1,
				point_num: 0,
				usdNumber:0,
				idbool:false,
				value1:0
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
			this.setid = this.$route.query.id
			this.getlist()
			this.getthreelist()

		},

		methods: {
			tosmart(day){
			
				setTimeout(()=>{
					if(this.idbool){
						this.$router.push(`/intetrading5?time=${day}`)
					}else{
						this.$router.push(`/newsmart?time=${day}`)
					}
				},500)
				
			},
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
			onRefresh() {
				this.getlist()
				this.getthreelist()
				setTimeout(() => {
					this.isLoading = false;
				}, 1000);
			},
			togensui() {
				// this.bool3 = true
				this.$router.push('/gensui')
			},
			fn3(id) {
				console.log(this.id)
				this.id = id
				this.bool = true
			},
			getthreelist() {
				if (this.setid == 1) {
					this.$axios
						.post("/index/spotstrategy/get_strategy_list", {
							symbol: "USDT",
							bourse: '1',
							types: 4
						})
						.then(res => {
							res.data.list.forEach(item => {
								if (item.status == 1) {
									this.isshow1 = true
								}
							})
						});

					this.$axios
						.post("/index/spotstrategy/get_strategy_list", {
							symbol: "USDT",
							bourse: '1',
							types: 6
						})
						.then(res => {
							res.data.list.forEach(item => {
								if (item.status == 1) {
									this.isshow4 = true
								}
							})
						});
						this.$axios
							.post("/index/spotstrategy/get_strategy_list", {
								symbol: "USDT",
								bourse: '1',
								types: 1
							})
							.then(res => {
								res.data.list.forEach(item => {
									if (item.status == 1) {
										this.isshow = true
									}
								})
							});
							
						}
				if (this.setid == 2) {
					this.$axios
						.post("/index/swapstrategy/get_strategy_list", {
							symbol: "USDT",
							bourse: '4',
							type: 3
						})
						.then(res => {
							res.data.list.forEach(item => {
								if (item.status == 1) {
									this.isshow2 = true
								}
							})
						});
				}

				
			},
			getlist() {
				this.$axios
					.get("/index/mywallet/mywalletInfo", {
						page: 1,
						limit: 1
					})
					.then((res) => {
						let info = res.data.info;
						this.point_num = (info.point_num*1).toFixed(2);
						this.usdNumber = (info.number*1).toFixed(2);
						if(info.uid==202001011){
							this.idbool = true
						}
					});
				this.$axios
					.post("/index/robot/robot_list", )
					.then((res) => {
						if (res.data.code == 0) {
							this.list4 = res.data.data. [4]
							this.list1 = res.data.data. [1]
							this.list2 = res.data.data. [2]
						} else {
							this.$toast.fail({
								message: res.data.msg,
								duration: 1200
							});
						}
					});
			},
			fn2(bool) {
				let str = ''

				this.$toast.fail({
					message: `请先激活机器人`,
					duration: 1200
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
				let str='提示';
				let str1='';
				if (bool2) {
						str1 = '是否确认续费？'
				} else {
						str1 = '是否确认激活'
				}
				obj = {
					robot_type: id,
				}
				
				Dialog.confirm({
						title: str,
						message: `是否${str}`+str1,
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
		},
	}
</script>

<style lang="less" scoped>
	.p {
		margin: 6px 0px 6px 15px;
		color: #323233;
	}

	.item {
		margin: 0 .1rem 0.28rem .25rem;
		padding: .3rem 0 .2rem 0rem;
		display: flex;
		border-radius: 4px;
		border: 1px solid #EEE;
		position: relative;
		overflow: hidden;

		.i-t {
			position: absolute;
			font-size: 0.2rem;
			width: 80px;
			height: 20px;
			line-height: 20px;
			color: #fff;
			text-align: center;
			right: -23px;
			-webkit-transform: rotate(50deg);
			transform: rotate(50deg);
			background-color: #fe931e;
		}

		.active {
			background-color: rgb(254, 51, 30);
		}

		.active2 {
			background-color: rgb(14, 138, 254);
		}

		.active3 {
			background-color: green;
		}
		.active1{
			width: 86%;
			word-break: break-all;
		}
		.img {
			width: 70px;
			height: 70px;
			border-radius: 50%;
			display: block;
			margin-left: 12px;
			margin-bottom: 11px;
		}

		.img1 {
			width: 52px;
			margin-left: 23px;
		}

		img {
			width: 98px;
			height: 15px;

		}

		.div {
			border-left: 1px solid #EEEEEE;
			padding-left: 10px;
			padding-bottom: 7px;
		}

		div {
			flex: 1;
		}

		.p2 {
			font-weight: bold;
			font-size: 15px;
			margin-bottom: 12px;
			margin-left: 4px;
		}

		.p1 {
			font-size: 13px;
			color: rgb(153, 153, 153);
		}

		.button {
			margin-top: 13px;
			margin-left: .9rem;
			position: relative;

			button {
				padding: 0;
				width: 34.4%;
				border-radius: 12px;
				border: 1.2px solid rgb(14, 138, 254);
				margin-right: 20px;
				color: rgb(14, 138, 254);
				background-color: #FFFFFF;
				height: 22px;
				line-height: 20px;
				font-size: 0.22rem;
			}

			.active1 {
				color: #ccc;
				border: 1.2px solid #ccc;
			}
		}
	}

	.van-radio-group {
		display: flex;
		margin: 20px;

		div {
			flex: 1;
		}
	}

	.bel-dia {
		padding: 6px 16px;
		font-size: 14px;

	}
</style>
