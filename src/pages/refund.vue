<template>
	<div>
		<div class="tophader" style=" border-bottom: 8px solid #e8ecef">
			<van-icon name="arrow-left" onclick="window.history.go(-1)" />
			<p>{{$t('spot.rebate')+$t('index.record')}}</p>
		</div>
		<van-pull-refresh v-model="isLoading" :success-text="$t('spot.success')" @refresh="onRefresh">
			<div class="item" v-for="(item,index) in daililist" :key="index">
				<img class="img" :src="item.avatar" />
				<div class="two">{{item.nick_name}}
					<p>{{item.create_time}}</p>
				</div>
				<div class="three" style="color: rgb(40,60,103);font-size: 14px;flex: 1;text-align: right;">
					{{item.money_type==1?$t('spot.TradingC')+':'+(item.trans_num*1).toFixed(3) +' U':'购买点卡:1400点'}}
					<p>{{item.remark}}:{{item.money_type==1?(item.num*1).toFixed(3)+'USDT':parseInt(item.num)+'CRW'}} </p>
				</div>
			</div>
			<p @click="num++;getagent()" style="color: #2167ff;text-align: center;line-height: 28px;">{{$t('spot.loadM')}}</p>
			<p v-show="!daililist.length" style="color: #999;text-align: center;line-height: 40px;">{{$t('community.available')}}</p>
		</van-pull-refresh>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				daililist: [],
				num: 1,
				isLoading: false,
			};
		},
		created() {
			this.getagent()
		},
		methods: {
			onRefresh() {
				this.daililist = []
				this.num = 1
				this.getagent()
				setTimeout(() => {
					this.isLoading = false;
				}, 1000);
			},
			getagent() {
				this.$axios.get(`/index/welfarecenter/member_record?page=${this.num}`).then(res => {
					if (res.data.code == 0 && res.data.info.data) {

						let arr = this.daililist.concat(res.data.info.data)
						this.daililist = arr
						this.boolnum = res.data.info.last_page

					}
				});
			},
		}
	};
</script>

<style lang="less" scoped>
	.item {
		padding: 0.2rem .17rem;
		display: flex;
		background-color: #FFFFFF;
		border-bottom: 8px solid #e8ecef;

		.img {
			width: 40px;
			height: 40px;
			border-radius: 50% 50%;
			// margin-right: .16rem;
			display: block;


		}

		.two {
			margin-left: .2rem;
			color: rgb(40, 60, 103);
			font-size: 15px;

			// flex: 1;
			p {
				margin-top: .14rem;
				color: rgb(143, 145, 148);
				font-size: 12px;
			}
		}

		.three {
			position: relative;
			font-size: 15px;
			color: rgb(83, 93, 95);

			p {
				margin-top: .1rem;
				color: rgb(40, 60, 103);
				font-size: 14px;
			}

			img {
				position: absolute;
				left: 0px;
				top: 0px;
				height: 24px;
				width: 20px;
			}
		}
	}
</style>
