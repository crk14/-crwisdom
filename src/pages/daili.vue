<template>
	<div>
		<div class="tophader">
			<van-icon name="arrow-left" onclick="window.history.go(-1)" />
			<p>{{$t('index.Agent')}}</p>
			<!-- <span style="position: absolute;right: .15rem;top: 0;color: #909090;font-size: 14px;" @click="$router.push('noticedateil?id=86')">规则说明</span> -->
		</div>
		<div class="fuli-body">
			<img src="../assets/11112.png" class="body-img" />
		</div>
		<p class="hr" style="padding: 0;background-color: rgb(230,231,235);"></p>
		<!-- <div class="item2" :class="{'item3':level>=2}">
			<div class="item1">
				<div class="one">城市代理</div>
			</div>
			<div class="two" style="text-indent:44px">
				一次性充值
				<span>5000</span>USDT购买<span>5000</span>购物券,并获得社区代理资格,
				享受社区代理相关权益
			</div>
			<div class="item1" style="margin-top: 15px;">
				<div class="three">
					价格：<span>5000</span>USDT
				</div>
				<div class="four" @click="confirm(5000,5000)">立即购买 》</div>
			</div>
		</div> -->
		<p class="hr" style="padding: 0;background-color: rgb(230,231,235);"></p>
		<div class="item2" :class="{'item3':level>=3}">
			<div class="item1">
				<div class="one">CR{{$t('index.partnership')}}</div>
			</div>
			<div class="two" style="text-indent:44px">
				{{$t('index.recharges')}}
				<span>10000</span>USDT{{$t('store.buy')}}<span>10000</span>{{$t('store.Shopping')}},{{$t('index.equity')}}
				</div>
			<div class="item1" style="margin-top: 15px;">
				<div class="three">
				{{$t('store.price')}}：<span>10000</span>USDT
				</div>
				<div class="four" @click="confirm(10000,10000)">{{$t('index.BuyNow')}} 》</div>
			</div>
		</div>
		<!-- <p class="hr" style="padding: 0;background-color: rgb(230,231,235);"></p> -->
	<!-- <div class="item2" :class="{'item3':level>3}">
		<div class="item1">
			<div class="one">高级代理</div>
		</div>
		<div class="two" style="text-indent:44px">
			一次性充值
			<span>13000</span>USDT购买配额库存
				<span class="span">10</span>套CR量化机器人及<span>168000</span>CRW,
				并获得高级代理资格
			</div>
		<div class="item1" style="margin-top: 15px;">
			<div class="three">
				配额库存<span class="span">10</span>套:
				<span>13000</span>USDT
			</div>
			<div class="four" @click="confirm(13000,10)">立即购买 》</div>
		</div>
	</div> -->
	<p class="hr" style="padding: 0;background-color: rgb(230,231,235);"></p>
	<!-- <div class="item2" >
		<div class="item1">
			<div class="one">运营中心</div>
		</div>
		<div class="two" style="text-indent:44px">
			一次性充值
			<span>26000</span>USDT购买配额库存
				<span class="span">25</span>套CR量化机器人及<span>420000</span>CRW,
				并获得运营中心资格
			</div>
		<div class="item1" style="margin-top: 15px;">
			<div class="three">
				配额库存<span class="span">25</span>套:
				<span>26000</span>USDT
			</div>
			<div class="four" @click="confirm(26000,25)">立即购买 》</div>
		</div>
	</div>
	<p class="hr" style="padding: 0;background-color: rgb(230,231,235);"></p> -->
	</div>
</template>

<script>
	import Vue from "vue";
	import {
		Dialog
	} from "vant";
	Vue.use(Dialog);
	export default {
		data() {
			return {
				level: 0,
			};
		},
		created() {
			let that = this;
			this.$axios.post("/index/member/getUserInfo").then((res) => {
				if (res.data.code == 0) {
					this.level = res.data.info.level
				}
			});
		},
		methods: {
			confirm(bool, zsong) {
				let str = ''
				if (bool == 5000) {
					if (this.level >= 2) {
						return
					}
				}
				if (bool == 10000) {
					if (this.level >= 3) {
						return
					}
				}
				
				this.num = bool;
				this.types = 1;
				let gift = zsong
				Dialog.confirm({
						title: this.$t('index.hint'),
						message: this.$t('index.supported'),
					}).then(() => {
						this.$axios
							.post("/index/welfarecenter/purchase_agent", {
								num: this.num,
								types: this.types,
								gift,
							})
							.then((res) => {
								if (res.data.code == 0) {
									this.$toast.success({
										message: res.data.msg,
										duration: 1600
									});
									setTimeout(() => {
										this.$router.back();
									}, 1600);
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
	};
</script>

<style lang="less" scoped>
	.fuli-body {
		padding: 0 0.3rem 0rem 0.3rem;
	}

	.title {
		position: absolute;
		left: 0;
		top: 0;
		color: #ffffff;
	}

	.body-img {
		width: 100%;
		height: 2.4rem;
		// margin-top: -25px;
		// margin-bottom: -33px
	}

	.body-img2 {
		width: 88%;
		position: absolute;
		left: 0.5rem;
		top: 0.87rem;
	}
	.item2 {
		background-color: #ffffff;
		margin: 0.2rem;
		padding: 0.3rem;

		.item1 {
			display: flex;
			justify-content: space-between;
		}

		.one {
			font-size: 0.31rem;
			color: #000000;
			font-weight: 550;
		}

		.two {
			font-size: 15px;
			color: #646566;

			span {
				font-size: 16px;
				color: #2167ff;
			}
			.span{
				font-size: 0.41rem;
				color: rgb(216,138,78);
			}
		}

		.three {
			// width: 100%;
			// text-align: right;
			font-size: 0.31rem;
			color: #666666;

			span {
				font-size: 0.41rem;
				color: #2167ff;
			}
			.span{
				font-size: 0.41rem;
				color: rgb(216,138,78);
			}
		}

		.four {
			// width: 100%;
			text-align: right;
			font-size: 0.31rem;
			color: #666666;
			margin-top: 0.1rem;
			color: #000000;

			img {
				width: 0.25rem;
				height: 0.25rem;
			}
		}
	}

	.item3 {
		opacity: .6;
	}
</style>
