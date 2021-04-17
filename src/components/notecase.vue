<template>
	<div class="note">
		<div class="tophader">
			<p >
				<span style="font-size: .39rem;">CR</span>{{$t('notecase.system')}}</p>
		</div>
		<van-pull-refresh
		  v-model="isLoading"
		  success-text="刷新成功"
		  @refresh="onRefresh"
		>
		<van-swipe :show-indicators="false" indicator-color="white">
			<van-swipe-item>
				<div class="boxall">
					<div class="box">
						<div class="boxl" style="display: flex;">
							<p class="active3" style="padding-top: 26px;padding-left: 34px;">{{$t('index.my')+$t('index.quantization')+$t('notecase.income')}}</p>
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
					<img src="../assets/api.png" alt />
					<p>API{{$t('notecase.regulate')}}</p>
				</li>
			</router-link>
			<router-link to="/mejq?id=1">
				<li  class="curylass">
					<img src="../assets/set1.png" alt />
					<p>{{$t('notecase.spotquantify')}}</p>
				</li>
			</router-link>
			<router-link to="/mejq?id=2">
				<li  class="curylass">
					<img src="../assets/aiset.png" alt />
					<p>{{$t('notecase.swapquantify')}}</p>
				</li>
			</router-link>
			<router-link to="/gensui">
				<li  class="curylass">
					<img src="../assets/set2.png" alt />
					<p>{{$t('notecase.follow')}}</p>
				</li>
			</router-link>
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
			<p>{{$t('notecase.quantify')}}</p>
			<div class="body">
				
				<div :class="{'active':active == 'a'}" @click="active = 'a'">{{$t('notecase.today')}}</div>
				<div :class="{'active':active == 'b'}" @click="active = 'b'">{{$t('notecase.week')}}</div>
				<div :class="{'active':active == 'c'}" @click="active = 'c'">{{$t('notecase.month')}}</div>
			</div>
			<!-- <p style="font-size: 18px;font-weight: 450;text-align: center;width: 100%;color: #ccc;padding-left: 0;">
				量化收益排行榜系统升级中
			</p> -->
			<div class="bottom2">
				<div v-show="active == 'a'" v-for="(item,index) in todayrank" style="font-size: 13px;" :key="index">
					<img v-if="index == 0" src="../assets/1411.png" style="left: 13px;width: 21px;height: 23px;border-radius: 0;top: 12px;" />
					<img v-if="index == 1" src="../assets/1412.png" style="left: 13px;width: 21px;height: 23px;border-radius: 0;top: 12px;" />
					<img v-if="index == 2" src="../assets/1413.png" style="left: 13px;width: 21px;height: 23px;border-radius: 0;top: 12px;" />
					<span v-if="index > 2" style="position: absolute;left: 12px;top: 0px;width: 20px;text-align: center;">{{index + 1}}</span>
					<img :src="item.avatar" />
					<span style="overflow: hidden;flex: 1;text-overflow: ellipsis;white-space: nowrap">{{item.nick_name}}</span>
					<span>{{$t('notecase.today')+$t('notecase.income')}}: <span style="color: rgb(221,113,110);"> {{item.profit.toFixed(2)}} </span> <span style="color: rgb(172,170,171);">USDT</span>
					</span>
				</div>
				<div v-show="active == 'b'" v-for="(item,index) in weekrank" style="font-size: 13px;" :key="item.index">
					<img v-if="index == 0" src="../assets/1411.png" style="left: 13px;width: 21px;height: 23px;border-radius: 0;top: 12px;" />
					<img v-if="index == 1" src="../assets/1412.png" style="left: 13px;width: 21px;height: 23px;border-radius: 0;top: 12px;" />
					<img v-if="index == 2" src="../assets/1413.png" style="left: 13px;width: 21px;height: 23px;border-radius: 0;top: 12px;" />
					<span v-if="index > 2" style="position: absolute;left: 12px;top: 0px;width: 20px;text-align: center;">{{index + 1}}</span>
					<img :src="item.avatar" />
					<span style="overflow: hidden;flex: 1;text-overflow: ellipsis;white-space: nowrap">{{item.nick_name}}</span>
					<span>{{$t('notecase.week')+$t('notecase.income')}}: <span style="color: rgb(221,113,110);"> {{item.profit.toFixed(2)}} </span> <span style="color: rgb(172,170,171);">USDT</span>
					</span>
				</div>
				<div v-show="active == 'c'" v-for="(item,index) in monthrank" style="font-size: 13px;" :key="item.index">
					<img v-if="index == 0" src="../assets/1411.png" style="left: 13px;width: 21px;height: 23px;border-radius: 0;top: 12px;" />
					<img v-if="index == 1" src="../assets/1412.png" style="left: 13px;width: 21px;height: 23px;border-radius: 0;top: 12px;" />
					<img v-if="index == 2" src="../assets/1413.png" style="left: 13px;width: 21px;height: 23px;border-radius: 0;top: 12px;" />
					<span v-if="index > 2" style="position: absolute;left: 12px;top: 0px;width: 20px;text-align: center;">{{index + 1}}</span>
					<img :src="item.avatar" />
					<span style="overflow: hidden;flex: 1;text-overflow: ellipsis;white-space: nowrap">{{item.nick_name}}</span>
					<span>{{$t('notecase.month')+$t('notecase.income')}}: <span style="color: rgb(221,113,110);"> {{item.profit.toFixed(2)}} </span> <span style="color: rgb(172,170,171);">USDT</span>
					</span>
				</div>

			</div>
		</div>
		</van-pull-refresh>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default {
		
		data() {
			return {
				isLoading:false,
				info: {},
				arr: [],
				active: 'a',
				weekrank: [],
				monthrank: [],
				todayrank: [],
				lhsy:0,
			};
		},
		created() {
			this.start()
		},

		methods: {
			onRefresh(){
					  this.start()
				  setTimeout(() => {
				        this.isLoading = false;
				      }, 1000);
				},
			start(){
				this.$axios
					.post("/index/member/my_profit")
					.then(res => {
						if(res.data.data){
							this.lhsy = res.data.data
						}
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
			},
			toast(){
				Dialog.confirm({
				  title: '更新维护',
				  message:
				    `量化系统计划于2021年3月4号14点40至16点进行更新维护,维护期间策略暂停交易,维护完成后正常运行。`,
				})
				  .then(() => {
				    // on confirm
				    
				  })
				  .catch(() => {
				    // on cancel
				  });
			},
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
			margin-bottom: 0.17rem;
		}
	}
	.note .van-swipe {
		margin-top: 0;
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

	.lotswipe {
		height: 1.16rem;
		margin: 0.1rem auto !important;

		.van-swipe__indicators {
			bottom: 0.2rem;
		}
	}

	.bottom {
		background: rgb(247, 246, 247);
		min-height: 8rem;
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
				margin: 0 5%;
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

</style>
