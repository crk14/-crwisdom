<template>
	<div class="note">
		<div class="tophader">
			<p>CR量化系统</p>
		</div>
		<van-swipe :show-indicators="false" indicator-color="white">
			<van-swipe-item>
				<div class="boxall">
					<div class="box">
						<div class="boxl" style="display: flex;">
							<p class="active3" style="padding-top: 26px;padding-left: 34px;">我的量化收益</p>
					</div>
					<div class="boxl" style="display: flex;">
							<p style="padding-top: 6px;padding-left: 34px;;">
								<span class="one">{{lhsy}}</span>
							</p>
					</div>
				</div>
				</div>
			</van-swipe-item>
		</van-swipe>
		<ul class="navul">
			<router-link to="/ranklist">
				<li class="curylass">
					<img src="../assets/src_assets_image_follow_trading_btn_api@2x.png" alt />
					<p>API管理</p>
				</li>
			</router-link>
			<router-link to="/mejq">
				<li class="curylass">
					<img src="../assets/路径@2x.png" alt />
					<p>量化机器人</p>
				</li>
			</router-link>
			<li @click="tointetrad()" style="position: relative;">
				<img src="../assets/tuoguan.png" alt style="margin-top: 2.4px;"/>
				<p>量化交易</p>
				<div style="position: absolute;top: 10px;left: 20px;opacity: .4; width: 8px;height: 8px;background-color: rgb(237,206,180);border-radius: 50%;"></div>
				<div style="position: absolute;top: 23px;left: 16px;opacity: .4; width: 12px;height: 7px;background-color: rgb(237,206,180);border-radius: 50%;"></div>
			</li>
			<router-link to="/gensui">
				<li >
					<img src="../assets/src_assets_image_exchange_trading_btn_zdjy@2x.png" alt />
					<p>跟随交易</p>
				</li>
			</router-link>
			<!-- <router-link to="/custody"> -->
			<!-- <li style="position: relative;">
				<img src="../assets/tuoguan.png" alt style="margin-top: 2.4px;" />
				<p>基金托管</p>
				<div style="position: absolute;top: 10px;left: 20px;opacity: .4; width: 8px;height: 8px;background-color: rgb(237,206,180);border-radius: 50%;"></div>
				<div style="position: absolute;top: 23px;left: 16px;opacity: .4; width: 12px;height: 7px;background-color: rgb(237,206,180);border-radius: 50%;"></div>
			</li> -->
			<!-- </router-link> -->
		</ul>
		<p style="width: 100%;height: 6px;background-color: rgb(227,227,227);"></p>
		<van-swipe :show-indicators="true" class="lotswipe" :autoplay="3000" indicator-color="#fff">
			<van-swipe-item v-for="(item,i) in arr" :key="i">
				<img :src="item.img" style="height:100%" alt @click="$router.push({path:'noticedateil',query:{id:item.article_id}})" />
			</van-swipe-item>
		</van-swipe>
		<p style="width: 100%;height: 6px;background-color: rgb(227,227,227);"></p>
		<div class="bottom">
			<span class="shu"></span>
			<p>量化收益排行榜</p>
			<div class="body">
				<div :class="{'active':active == 'a'}" @click="active = 'a'">今日</div>
				<div :class="{'active':active == 'b'}" @click="active = 'b'">本周</div>
				<div :class="{'active':active == 'c'}" @click="active = 'c'">本月</div>
			</div>
			<div class="bottom2">
				<div v-show="active == 'a'" v-for="(item,index) in todayrank" style="font-size: 13px;" :key="index">
					<img v-if="index == 0" src="../assets/1411.png" style="left: 13px;width: 21px;height: 23px;border-radius: 0;top: 12px;" />
					<img v-if="index == 1" src="../assets/1412.png" style="left: 13px;width: 21px;height: 23px;border-radius: 0;top: 12px;" />
					<img v-if="index == 2" src="../assets/1413.png" style="left: 13px;width: 21px;height: 23px;border-radius: 0;top: 12px;" />
					<span v-if="index > 2" style="position: absolute;left: 12px;top: 0px;width: 20px;text-align: center;">{{index + 1}}</span>
					<img :src="item.avatar" />
					<span style="overflow: hidden;flex: 1;text-overflow: ellipsis;white-space: nowrap">{{item.nick_name}}</span>
					<span>今日收益: <span style="color: rgb(221,113,110);"> {{item.profit.toFixed(2)}} </span> <span style="color: rgb(172,170,171);">USDT</span>
					</span>
				</div>
				<div v-show="active == 'b'" v-for="(item,index) in weekrank" style="font-size: 13px;" :key="item.index">
					<img v-if="index == 0" src="../assets/1411.png" style="left: 13px;width: 21px;height: 23px;border-radius: 0;top: 12px;" />
					<img v-if="index == 1" src="../assets/1412.png" style="left: 13px;width: 21px;height: 23px;border-radius: 0;top: 12px;" />
					<img v-if="index == 2" src="../assets/1413.png" style="left: 13px;width: 21px;height: 23px;border-radius: 0;top: 12px;" />
					<span v-if="index > 2" style="position: absolute;left: 12px;top: 0px;width: 20px;text-align: center;">{{index + 1}}</span>
					<img :src="item.avatar" />
					<span style="overflow: hidden;flex: 1;text-overflow: ellipsis;white-space: nowrap">{{item.nick_name}}</span>
					<span>本周收益: <span style="color: rgb(221,113,110);"> {{item.profit.toFixed(2)}} </span> <span style="color: rgb(172,170,171);">USDT</span>
					</span>
				</div>
				<div v-show="active == 'c'" v-for="(item,index) in monthrank" style="font-size: 13px;" :key="item.index">
					<img v-if="index == 0" src="../assets/1411.png" style="left: 13px;width: 21px;height: 23px;border-radius: 0;top: 12px;" />
					<img v-if="index == 1" src="../assets/1412.png" style="left: 13px;width: 21px;height: 23px;border-radius: 0;top: 12px;" />
					<img v-if="index == 2" src="../assets/1413.png" style="left: 13px;width: 21px;height: 23px;border-radius: 0;top: 12px;" />
					<span v-if="index > 2" style="position: absolute;left: 12px;top: 0px;width: 20px;text-align: center;">{{index + 1}}</span>
					<img :src="item.avatar" />
					<span style="overflow: hidden;flex: 1;text-overflow: ellipsis;white-space: nowrap">{{item.nick_name}}</span>
					<span>本月收益: <span style="color: rgb(221,113,110);"> {{item.profit.toFixed(2)}} </span> <span style="color: rgb(172,170,171);">USDT</span>
					</span>
				</div>

			</div>
		</div>
		<van-dialog v-model="bool3" title="进入量化" show-cancel-button :before-close="beforeClose">
			
			<van-radio-group v-model="radio">
			  <van-radio name="1">现货量化</van-radio>
			  <van-radio name="2">合约量化</van-radio>
			</van-radio-group>
		</van-dialog>
	</div>
</template>

<script>
	import Vue from 'vue'
	import {
		Dialog,RadioGroup, Radio
	} from 'vant';
	Vue.use(Dialog);
	Vue.use(Radio);
	Vue.use(RadioGroup);
	export default {
		components: {
			Dialog,RadioGroup, Radio
		},
		data() {
			return {
				bool3:false,
				mygao: {},
				title: [],
				info: {},
				arr: [],
				time: '',
				active: 'a',
				weekrank: [],
				monthrank: [],
				todayrank: [],
				matterplay: true,
				isshow: false,
				bool: false,
				bool2: true,
				radio:'2',
				lhsy:0
			};
		},
		created() {
			let time = localStorage.getItem('time')
			clearInterval(time)
			this.$axios
				.post("/index/member/my_profit")
				.then(res => {
					this.lhsy = res.data.data
				})
			this.$axios
				.get("/index/article/newsBannerArt")
				.then(res => {
					this.arr = res.data.info;
				});

			this.$axios
				.get("/index/rank/get_rank")
				.then(res => {
					this.weekrank = res.data.data.week_rank
					this.monthrank = res.data.data.month_rank
					this.todayrank = res.data.data.today_rank
				});


			this.$axios
				.get("/index/mywallet/mywalletInfo", {
					page: 1,
					limit: 1
				})
				.then(res => {
					if (res.data.info) {
						this.info = res.data.info;
						var timestamp = Date.parse(new Date()) / 1000;
						if (this.info.start_time) {
							let time = parseInt((timestamp - this.info.start_time) / 60 / 60 / 24)
							this.time = 150 - time
						} else {
							console.log(this.info.start_time, this.info.point_num)
							if (this.info.point_num > 0) {
								let time = parseInt((timestamp - this.info.start_time) / 60 / 60 / 24)
								this.time = 150 - time
							} else {
								this.time = 0
							}
						}
					}

				});
			// this.$axios
			// .get("/index/spotstrategy/decide")
			// .then(res => {
			// 		 if(res.data.code == 0){
			// 	 this.isshow = true
			//  }
			// });
		},

		methods: {
			tolink() {
				if (this.bool2) {
					this.$router.push('/heyue2')
				} else {
					this.$router.push('/intetrading2')
				}
			},
			stayopen() {
				this.$toast.fail({
					message: "等待开放",
					duration: 1200
				});
			},
			beforeClose: function(action, done) {
					  	if (action === "confirm") {
							if(this.radio == 2){
								this.$router.push('/heyue3')
							}else{
								this.$router.push('/intetrading3')
							}
							done()
						} else if (action === "cancel") {
								// 取消
								done(); // 关闭提示框
							}
			},
			tointetrad() {
				this.bool3 = true
			}
		}
	};
</script>

<style lang="less" scoped>
	.note {
		overflow: hidden;

		.van-swipe {
			margin: auto;
			margin-top: 0.2rem;

			.boxall {
				padding: 0 4%;
				height: 100%;
			}

			.box {
				// border-radius: 6px;
				color: white;
				height: 100%;
				// background: #78aef9;
				// box-shadow: 0 0 10px #78aef9;
			}

			.van-swipe-item {
				p {
					padding-left: 0.9rem;
					margin-top: 10px;
				}

				p:nth-of-type(1) {
					font-size: 0.29rem;
					padding-top: 0.5rem;
				}

				p:nth-of-type(2) {
					// margin-top: 0.1rem;
					margin-bottom: 0.1rem;
					display: flex;
					justify-content: space-between;
					padding-right: 0.3rem;
				}

				.one {
					font-size: 0.38rem;
				}

				.two {
					font-size: 0.29rem;
					margin-top: 0.12rem;
					margin-right: 0.3rem;

					i {
						position: relative;
						top: 0.03rem;
					}
				}

				p:nth-of-type(3) {
					font-size: 0.78rem;
				}
			}
		}
	}

	.navul {
		font-size: 0.24rem;
		display: flex;
		justify-content: space-between;
		padding: 1% 8%;
		margin: 0.3rem 0;
		background: #fff;

		li {
			color: #333333;
			text-align: center;
		}

		img {
			width: 0.5rem;
			position: relative;
			top: 0.15rem;
			// margin-right: 0.2rem;
			margin-bottom: 0.1rem;
		}
	}

	.sanl {
		margin-top: -0.1rem;
	}

	.note .van-swipe {
		margin-top: 0;
		// height: 4.2rem;
	}

	.note .van-swipe .box {
		background: url("../assets/13131.png") no-repeat;
		border-radius: 10px;
		background-size: 100%;
		height: 140px;
		// display: flex;
		// justify-content: space-between;
	}

	.note .van-swipe .boxall {
		// background: #3c8cff;
		padding: 0 0.3rem 0.1rem;
	}

	.navul {
		margin: 0rem 0 0.3rem;
	}

	.boxr {
		display: flex;
		position: relative;
		top: .1rem;

		p {
			width: 2.4rem;
			font-size: 0.3rem;
		}
	}

	.note .boxr img {
		width: 0.39rem;
		margin-top: 0.15rem;
		position: absolute;
		height: 0.27rem;
		right: 0.3rem;
	}

	.lotswipe {
		height: 1.16rem;
		margin: 0.1rem auto !important;

		.van-swipe__indicators {
			bottom: 0.2rem;
		}
	}

	.lastnews {
		display: flex;
		padding: 0.3rem;
		justify-content: space-between;
		font-weight: bold;
		margin-top: .2rem;

		.onew {
			color: #020202;
			font-size: 0.36rem;
		}

		.more {
			color: #bababa;
			font-size: 0.24rem;
			font-weight: normal;

			i {
				color: #bababa;
				position: relative;
				top: 0.02rem;
				left: 0.05rem;
			}
		}
	}

	.nestli {
		margin-bottom: .2rem;
	}

	.nestli:last-child {
		padding-bottom: 1rem;
	}

	.newtest {
		display: flex;
		justify-content: space-between;
		width: 94%;
		margin: auto;
		// border-bottom: 1px solid #f6f7f9;
		border-bottom: 1px solid #f7f7f7;
		padding-bottom: 0.2rem;
		margin-bottom: 0.2rem;

		p {
			font-size: 0.28rem;
		}

		div {
			padding: 0.1rem;
		}

		.left {
			width: 55%;
			position: relative;
		}

		.right {
			width: 34%;
			background: url("../assets/news.png") no-repeat;
			background-size: 100% 100%;
			color: #fff;
			display: flex;
			height: 1.32rem;

			p {
				font-size: 0.24rem;
				line-height: 0.35rem;
			}
		}

		.spanr {
			width: 0.06rem;
			height: 0.65rem;
			background: #fff;
			position: relative;
			top: 50%;
			margin: -0.325rem 0.2rem 0;
		}

		.gao {
			font-size: 0.24rem;
			color: #bababa;
			margin-top: 0.1rem;

			span {
				border: 1px solid #7484e2;
				color: #7484e2;
				font-size: 0.14rem;
				padding: 0 0.1rem;
				margin-right: 0.1rem;
			}
		}
	}

	// .active3{
	// 	color: #90A4CD;
	// }
	.bottom {
		background: rgb(247, 246, 247);
		min-height: 5rem;
		position: relative;

		.shu {
			position: absolute;
			left: 12px;
			top: 9px;
			width: 3px;
			height: 17px;
			background-color: #2167ff;
		}

		p {
			font-weight: 550;
			padding: 6px 0 0px 20px;
		}

		.body {
			display: flex;
			margin-top: 8px;

			div {
				font-size: 15px;
				flex: 1;
				margin: 0 10%;
				margin-bottom: 10px;
				text-align: center;
			}

			.active {
				color: #2167ff;
				border-bottom: 1px solid #2167ff;
				font-weight: 550;
			}
		}

		.bottom2 {
			background-color: rgb(227, 227, 227);
			padding: .1rem;
			min-height: 4rem;
			margin-bottom: 50px;

			div {
				background: rgb(247, 246, 247);
				display: flex;
				justify-content: space-between;
				padding: 0 .14rem 0 1.6rem;
				height: 45px;
				line-height: 45px;
				border-radius: 4px;
				position: relative;
				font-size: 15px;
				margin-bottom: 6px;

				img {
					position: absolute;
					left: 42px;
					top: 9px;
					height: 28px;
					width: 28px;
					border-radius: 50%;
				}
			}
		}
	}

	.poup {
		h2 {
			text-align: center;
			margin: 4px 0 16px 0;
			font-size: 16px;
			color: rgb(0, 27, 49);
			font-weight: 550
		}

		.p {
			padding: 0 .28rem;
			text-indent: 18px;
			color: rgb(138, 144, 151);
			font-size: 14px;
		}
	}
	.van-radio-group{
		display: flex;
		margin: 20px;
		div{
			flex: 1;
		}
	}
</style>
