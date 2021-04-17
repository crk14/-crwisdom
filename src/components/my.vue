<template>
	<div class="my" style="background-color: #eee;">

		<p class="toptitle tophader">{{$t('index.my')}}</p>
		<van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
			<div class="my-header">
				<img src="../assets/911.png" style="width: 100%;height: 2.85rem;" />
				<img @click="$router.push('personmsg')" v-if="infouser.avatar" :src="infouser.avatar" alt style="width: 1.2rem;height: 1.2rem;border-radius: 50%;
		position: absolute;left: .38rem;top: 0.6rem;border: 4px solid #FFFFFF;" />
				<div @click="$router.push('personmsg')" style="position: absolute;left: 2rem;top:.7rem;color: #FFFFFF;font-size: 20px;">{{infouser.nick_name}}</div>
				<div style="position: absolute;left: 2rem;top: 1.4rem;color: #FFFFFF;font-size: 16px;">UID:{{infouser.id}}</div>
				<div style="position: absolute;right: .3rem;top: 0.6rem;color: #FFFFFF;font-size: 16px;">
					<img v-show="infouser.level == 0" class="head-img" src="../assets/grade.png" />
					<img v-show="infouser.level == 1" class="head-img" src="../assets/grade2.png" />
					<img v-show="infouser.level == 2" class="head-img" src="../assets/grade3.png" />
					<img v-show="infouser.level == 3" class="head-img" src="../assets/grade4.png" />
					<div style="width: 1.9rem;text-align: center;margin-top: 6px;">{{infouser.is_need == 2?infouser.level_name:$t('index.Registered')}}</div>
				</div>
			</div>
			<div class="my-monery">
				<div class="div">
					<div class="one">
						USDT {{$t('index.assets')}}:
						<span>{{infoamout.number?(infoamout.number*1).toFixed(2):0}}</span>
					</div>

					<div class="two">
						<div @click="$router.push('/metationpage')" class="button">{{$t('index.Recharge')}}</div>
						<div @click="$toast.fail({message:'暂未开放'})" class="button">{{$t('index.Mention')}}</div>
						<div @click="$router.push('/history')" class="button">{{$t('index.record')}}</div>
					</div>
				</div>
			</div>
			<div class="labwarp">
				<div class="tablecon">
					<!-- <router-link to="/certification">
		  <div >
		    <p>
		      <img src="../assets/1201.png" alt style="width: .35rem;top: .02rem;" />
		      <span>实名认证</span>
		    </p>
		    <van-icon name="arrow" class="jtou" />
		  </div>
		</router-link> -->
					<router-link to="/intertranfor">
						<div>
							<p>
								<img src="../assets/1202.png" alt style="top:0.05rem;" />
								<span>{{$t('index.Interchange')}}</span>
							</p>
							<van-icon name="arrow" class="jtou" />
						</div>
					</router-link>
					<router-link to="/fenxiang?type=true">
						<div>
							<p>
								<img src="../assets/1207.png" alt style="top: .08rem;width: .4rem;" />
								<span>{{$t('index.community')}}</span>
							</p>
							<van-icon name="arrow" class="jtou" />
						</div>
					</router-link>
					<router-link to="/daili">
						<div>
							<p>
								<img src="../assets/0798.png" alt style="top: .05rem;" />
								<span>{{$t('index.Agent')}}</span>
							</p>
							<van-icon name="arrow" class="jtou" />
						</div>
					</router-link>
					<router-link to="/metationadr">
						<div>
							<p>
								<img src="../assets/1201.png" alt style="" />
								<span>{{$t('index.BindWallet')}}</span>
							</p>
							<van-icon name="arrow" class="jtou" />
						</div>
					</router-link>
					<router-link to="/chagepass">
						<div>
							<p>
								<img src="../assets/1204.png" alt style="width: .35rem;top: .06rem;" />
								<span>{{$t('index.Security')}}</span>
							</p>
							<van-icon name="arrow" class="jtou" />
						</div>
					</router-link>
					<router-link to="/callcenter">
						<div>
							<p>
								<img src="../assets/1205.png" alt style="width: .35rem;top: .046rem;" />
								<span>{{$t('index.service')}}</span>
							</p>
							<van-icon name="arrow" class="jtou" />
						</div>
					</router-link>

				</div>
			</div>
		</van-pull-refresh>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isLoading: false,
				info: "",
				infouser: {},
				infoamout: {},
			};
		},
		created() {
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
				this.$axios.post("/index/member/getUserInfo").then(res => {
					if (res.data.code == 0) {
						this.infouser = res.data.info;
					}
				});
				this.$axios.post("/index/mywallet/mywalletInfo").then(res => {
					if (res.data.code == 0) {
						this.infoamout = res.data.info;
					}
				});
			},
		},
	};
</script>

<style lang="less" scoped>
	.toptitle {
		text-align: center;
		font-size: 0.31rem;
		font-weight: 550;
		height: 0.86rem;
		line-height: 0.86rem;
		background: #fff;
	}
	.tablecon {
		margin: 0rem auto 0;
		border-radius: 3px;

		div {
			justify-content: space-between;
			display: flex;
			padding: 0.32rem 0.3rem;
			border-bottom: 7px solid rgb(244, 244, 244);
		}

		span {
			font-size: 0.32rem;
			color: rgb(51, 51, 51);
			margin-left: 0.3rem;
			font-family: PingFang SC;
		}

		.jtou {
			font-size: 0.44rem;
			// margin-top: 0.05rem;
			color: rgb(153, 153, 153);
		}

		img {
			position: relative;
			width: 0.35rem;
		}
	}
	.my-monery {
		background-image: linear-gradient(rgb(96, 141, 249), rgb(48, 101, 239), rgb(49, 87, 246));
		position: relative;
		width: 100%;
		border-radius: 20px 20px 0 0;
		height: 100px;
		text-align: center;
		margin-top: -22px;
		color: #FFFFFF;
		display: flex;
		justify-content: space-around;

		.div {
			margin-top: 9px;
			width: 80%;

			.one {
				font-size: .36rem;
				text-align: left;

				span {
					font-size: .42rem;
				}
			}

			.two {
				display: flex;
				justify-content: space-between;
				margin-top: .36rem;

				.button {
					font-size: 13px;
					border: 1px solid #fff;
					border-radius: 5px;
					width: 71px;
				}
			}
		}

	}

	.labwarp {
		background-color: #fff;
		margin-bottom: 50px;
		margin-top: -16px;
		border-radius: 20px 20px 0 0;
		position: relative;
	}

	.head-img {
		width: 0.7rem;
		height: 0.8rem;
		display: block;
		margin-left: .6rem;
	}
</style>
