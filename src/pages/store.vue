<template>
	<div style="font-size: 14px;">
		<div class="tophader">
			<!-- <van-icon name="arrow-left" onclick="window.history.go(-1)" /> -->
			<p>{{$t('index.quantization')+$t('index.store')}}</p>
		</div>
		<van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
			<div class="sc-img">
				<img src="../assets/sc001.png" />
			</div>
			<div class="sc-title">
				<div class="div1" @click="$router.push('jqgm')">
					<div>{{$t('index.my')+$t('store.buy')}} </div>
					<p>{{record_num}}</p>
					<div class="div" :class="{'active1':value1==2}">{{$t('index.record')}}</div>
				</div>
				<div class="div1">
					<div>{{$t('store.Shopping')}}</div>
					<p>{{robot_ticket}}</p>
				</div>
				<div @click="$router.push('mymoner')" class="div1" style="margin-right: 15px;">
					<div>{{$t('index.my')+$t('store.Performance')}}</div>
					<div class="div" :class="{'active':value1==1}">{{$t('index.record')}}</div>
				</div>

			</div>
			<van-notice-bar
			  left-icon="volume-o"
			  text="任意购买一款产品激活,即可同步激活所有产品使用。"
			/>
			<p class="hr"></p>
			<div class="fenge" :class="{'activeArea':value1==1}">
				<div></div>
				{{$t('notecase.spotquantify')+$t('store.Product')}}
				<div></div>
			</div>
			<p class="hr he"></p>
			<div class="sc-body">
				<div class="item" @click="$router.push('xqbabel?id=4')">
					<img src="../assets/sc002.png" />
					<div class="div">
						<p>{{$t('store.spot')}}<span>{{$t('store.intelligent')}}</span>{{$t('index.quantization')+$t('store.robot')}}</p>
						<div class="item-body ">
							<div class="active">{{$t('store.duration')}}:</div>
							<div >360 {{$t('store.day')}}</div>
							<div class="active">{{$t('store.price')}}:</div>
							<div style="margin-left: -10px;">200USDT</div>
						</div>
						
						<p style="font-size: 12px;color: rgb(126,127,129);">{{$t('store.remarks')}}: {{$t('store.Billingremarks')}}</p>
					</div>
					<button>{{$t('store.Enter')}}</button>
				</div>
				
				<div class="item" @click="$router.push('xqbabel?id=1')">
					<img src="../assets/sc002.png" />
					<div class="div">
						<p>{{$t('store.spot')}}<span>{{$t('store.profession')}}</span>{{$t('index.quantization')+$t('store.robot')}}</p>
						<div class="item-body ">
							<div class="active">{{$t('store.duration')}}:</div>
							<div >360 {{$t('store.day')}}</div>
							<div class="active">{{$t('store.price')}}:</div>
							<div style="margin-left: -10px;">200USDT</div>
						</div>
						<p style="font-size: 12px;color: rgb(126,127,129);">{{$t('store.remarks')}}: {{$t('store.Billingremarks')}}</p>
					</div>
					<button>{{$t('store.Enter')}}</button>
				</div>
				
				<p class="hr he"></p>
				<div class="fenge" :class="{'activeArea':value1==1}">
					<div></div>
					{{$t('notecase.swapquantify')+$t('store.Product')}}
					<div></div>
				</div>
				<p class="hr he"></p>
				<div class="item" @click="$router.push('xqbabel?id=3&bool=true')">
					<img src="../assets/sc003.png" />
					<div class="div">
						<p>{{$t('store.swap')}}<span>{{$t('store.intelligent')}}</span>{{$t('index.quantization')+$t('store.robot')}}</p>
						<div class="item-body ">
							<div class="active">{{$t('store.duration')}}:</div>
							<div >360 {{$t('store.day')}}</div>
							<div class="active">{{$t('store.price')}}:</div>
							<div style="margin-left: -10px;">200USDT</div>
						</div>
						<p style="font-size: 12px;color: rgb(126,127,129);">{{$t('store.remarks')}}: {{$t('store.Billingremarks')}}</p>
					</div>
					<button>{{$t('store.Enter')}}</button>
				</div>


				<div class="item" @click="$router.push('xqbabel?id=2&bool=true')">
					<img src="../assets/sc003.png" />
					<div class="div">
						<p>{{$t('store.swap')}}<span>{{$t('store.profession')}}</span>{{$t('index.quantization')+$t('store.robot')}}</p>
						<div class="item-body ">
							<div class="active">{{$t('store.duration')}}:</div>
							<div >360 {{$t('store.day')}}</div>
							<div class="active">{{$t('store.price')}}:</div>
							<div style="margin-left: -10px;">200USDT</div>
						</div>
						<p style="font-size: 12px;color: rgb(126,127,129);">{{$t('store.remarks')}}: {{$t('store.Billingremarks')}}</p>
					</div>
					<button>{{$t('store.Enter')}}</button>
				</div>
				<p class="hr he"></p>
				<div class="fenge" :class="{'activeArea':value1==1}">
					<div></div>
					{{$t('store.other')+$t('index.quantization')+$t('store.Product')}}
					<div></div>
				</div>
				<p class="hr he"></p>
				<div class="item" @click="$router.push('xqbabel?id=5')">
					<img src="../assets/sc004.png" />
					<div class="div">
						<p>{{$t('store.Strategy')+$t('store.following')+$t('store.robot')}}</p>
						<div class="item-body ">
							<div class="active">{{$t('store.duration')}}:</div>
							<div >360 {{$t('store.day')}}</div>
							<div class="active">{{$t('store.price')}}:</div>
							<div style="margin-left: -10px;">200USDT</div>
						</div>
						<p style="font-size: 12px;color: rgb(126,127,129);">{{$t('store.remarks')}}: {{$t('store.Strategy')+$t('store.following')+$t('store.Billingremarks')}}</p>
					</div>
					<button>{{$t('store.Enter')}}</button>
				</div>
			</div>
		</van-pull-refresh>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { NoticeBar } from 'vant';
	
	Vue.use(NoticeBar);
	export default {
		comments:{
			NoticeBar
		},
		data() {
			return {
				isLoading: false,
				record_num: 0,
				robot_ticket: 0,
				sell_num: 0,
				value1: 0
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
		methods: {
			onRefresh() {
				this.start()
				setTimeout(() => {
					this.isLoading = false;
				}, 1000);
			},
			start() {
				this.$axios
					.post("/index/robot/reserve")
					.then(res => {
						if (res.data.code == 0) {
							this.record_num = res.data.record_num
							this.sell_num = res.data.sell_num
							this.robot_ticket = res.data.robot_ticket
						} else {
							this.$toast.fail({
								message: res.data.data,
								duration: 3200
							});
						}
					})
			}
		}

	};
</script>

<style lang="less" scoped>
	.sc-img {
		padding: 0 .28rem;

		img {
			width: 100%;
			height: 133px;
		}
	}

	.sc-title {
		display: flex;
		padding-top: 2px;

		.div1 {
			position: relative;
			flex: 1;
			text-align: center;

			p {
				line-height: 25px;
			}
		}

		.div {
			position: absolute;
			top: 0;
			right: -5px;
			font-size: 12px;

			background-color: rgb(114, 173, 251);
			padding: 1px 6px;
			border-radius: 12px;
			color: #FFFFFF;
			transform: scale(0.8);
		}

		.active {
			top: 15px;
			right: 37px;
		}

		.active1 {
			right: -14px;
		}
	}

	.sc-body {
		padding: .2rem .2rem;
		margin-bottom: 52px;

		.item {
			display: flex;
			padding: .26rem .22rem .26rem .16rem;
			border-radius: 5px;
			border: 2px solid rgb(255, 249, 245);
			box-shadow: 3px 3px 2px rgb(255, 249, 245);
			margin-bottom: 16px;
			position: relative;

			img {
				width: 82px;
				height: 82px;
			}

			.div {
				margin-left: 15px;
				width: 71%;

				span {
					color: rgb(236, 106, 69);
				}
			}

			.item-body {
				display: flex;
					margin: .1rem 0;
					line-height: 16px;
				// justify-content: space-between;
				div {
					flex: 1;
					font-size: 12px;
					color: #e35e5e;
				}
				.active {
						color: #00bf89;
				}

			}

			

			button {
				// width: 75px;
				position: absolute;
				padding: 0 6px;
				border-radius: 16px;
				line-height: 16px;
				background-color: rgb(118, 173, 249);
				color: #FFFFFF;
				top: 11%;
				position: absolute;
				right: 14px;
				font-size: 0.22rem;
			}
		}


	}

	.fenge {
		display: flex;
		width: 80%;
		padding: 0 10%;
		justify-content: space-around;
		line-height: 32px;
		font-weight: 550;
		font-size: 15px;

		div {
			width: 1.2rem;
			height: 2px;
			background: #000;
			margin-top: 14px;
		}
	}

	.activeArea {
		width: 84%;
		padding: 0 8%;

		div {
			width: .8rem;
		}
	}

	.he {
		height: .08rem;
	}
	.van-notice-bar{
		height: 29px;
	}
</style>
