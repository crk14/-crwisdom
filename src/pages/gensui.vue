<template>
	<div class="body">
		<div class="title">

			<van-icon name="arrow-left" onclick="window.history.go(-1)" />
			<div>跟随交易社区</div>
		</div>
		<div class="img">
			<img src="../assets/1701.png" @click="$router.push('/wdgd')" />
			<img v-show="bool" src="../assets/1702.png" />
			<div v-show="!bool" @click="$router.push('jyyym')" style="margin-top: 12px;
    width: 48%;
    height: 1.6rem;background-color: #4a79f5;border-radius: 5px;text-align: center;line-height: 1.6rem;color: #fff;">交易员入口</div>
		</div>
		<div class="title2">
			<div class="one">交易员列表</div>
			<div style="display: flex;">
				<div class="two">
					<input v-model="value" placeholder="搜索" @keyup.enter="onSearch()" />
					<van-icon name="search" @click="onSearch()" />
				</div>
				<div class="two" style="margin-left: 8px;padding: 6px 0 6px 3px;width: 103px;">
					<select name="public-choice" v-model="value2" @change="getvalue2" style="color: rgb(169, 173, 182)">
						<option value="1">综合排名</option>
						<option value="2">带单总收益</option>
						<option value="3">跟随者总收益</option>
						<option value="4">累计收益率</option>
						<option value="5">近30日收益率</option>
						<option value="6">近3周收益率</option>
					</select>
				</div>
			</div>

		</div>
		<p class="p">数据每小时更新一次</p>
		<div class="banan">
			<div class="item" @click="$router.push('/jyxq?id='+1)">
				<div class="one">
					<img src="../assets/login2.png" class="img1" />
					<div class="center">
						区块链三杰
						<p>人数有限，只带粉丝</p>
					</div>
					<img class="img2" src="../assets/13033.png" />
				</div>
				<div class="two">
					<div class="left">
						279
						<p>累计跟随人数</p>
					</div>
					<div class="center">
						4778.74
						<p>带单总收益(USDT)</p>
					</div>
					<div class="right">
						+100.00%
						<p>近三周胜率</p>
					</div>
				</div>
				<div class="two">
					<div class="left">
						135
						<p>交易笔数</p>
					</div>

					<div class="center">
						4778.74
						<p>跟随者总收益(USDT)</p>
					</div>

					<div class="right" style="color: rgb(53,183,135);">
						+1658.20%
						<p>收益率</p>
					</div>
				</div>
			</div>
			<div class="item" @click="$router.push('/jyxq?id='+2)">
				<div class="one">
					<img src="../assets/login2.png" class="img1" />
					<div class="center">
						一线大咖
						<p>人数有限，只带粉丝，</p>
					</div>
					<!-- <img class="img2" src="../assets/13033.png"/> -->
					<button class="right" @click.stop="$router.push('/gdset?id='+2)">跟随</button>
				</div>
				<div class="two">
					<div class="left">
						301
						<p>累计跟随人数</p>
					</div>
					<div class="center">
						5421.74
						<p>带单总收益(USDT)</p>
					</div>
					<div class="right">
						+100.00%
						<p>近三周胜率</p>
					</div>
				</div>
				<div class="two">
					<div class="left">
						145
						<p>交易笔数</p>
					</div>

					<div class="center">
						4999.74
						<p>跟随者总收益(USDT)</p>
					</div>

					<div class="right" style="color: rgb(53,183,135);">
						+1699.20%
						<p>收益率</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				value2: 1,
				bool: true
			};
		},
		created() {

		},
		methods: {
			onSearch() {
				console.log(this.value, 66, )
			},
			getvalue2() {},
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

				.one {
					display: flex;
					background-color: rgb(247, 251, 254);
					padding: .2rem 0 .15rem .15rem;
					justify-content: space-between;
					border-radius: 8px;

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
						font-size: 15px;
						font-weight: 550;
						flex: 1;

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
						width: 55px;
						border-radius: 9px;
						margin-top: 3%;
						margin-right: 3%;
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
</style>
