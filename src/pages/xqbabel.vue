<template>
	<div style="font-size: 14px;min-height: 100%;padding-bottom: 20px;">
		<van-icon name="down" color="rgb(20,44,56)" @click="$router.back()" size="20px" />
		<div class="title">
			<div class="a" v-show="id == 1">CR现货量化机器人(专业版)</div>
			<div class="a" v-show="id == 2">CR合约量化机器人(专业版)</div>
			<div class="a" v-show="id == 3">CR合约量化机器人(智能版)</div>
			<div class="a" v-show="id == 4">CR现货量化机器人(智能版)</div>
			<div class="a" v-show="id == 5">CR策略跟随机器人(现货/合约)</div>
			<div>
				<img src="../assets/1120.png" style="margin-top: -4px;" />
				<img src="../assets/1121.png" />
			</div>
		</div>
		<img class="img" v-show="id == 1" src="../assets/bananjq.png" />
		<img class="img" v-show="id == 2" src="../assets/bananjq2.png" />
		<img class="img" v-show="id == 3" src="../assets/bananjq3.png" />
		<img class="img" v-show="id == 4" src="../assets/bananjq4.png" />
		<img class="img" v-show="id == 5" src="../assets/1-7.png" />
		<!-- <p v-show="id == 4" style="line-height: 40px;text-align: center;">敬请期待</p> -->
		<!-- <p v-show="id == 5" style="line-height: 40px;text-align: center;">敬请期待</p> -->
		<van-tabs line-height="2px" v-model="active" color="rgb(11,120,241)" title-active-color="rgb(11,120,241)">
			<van-tab title-style="font-weight:bold" title="系统介绍">
				<div class="item">
					<p>系统介绍</p>
					<div v-show="id==1">
						CR现货量化机器人(专业版)是一款为专业的数字货币爱好者定制的现货量化交易系统，兼容火币全球站与OKEx交易所。它具有高度专业化、灵活性的参数设置功能，用户可以根据个人的数字货币专业认知水平、判断分析能力进行参数设置，不同的行情均可以设置不同的策略相匹配，并且可以随时临时停止修改策略即时执行，从而实现在不同行情中获取稳定的收益。CR现货量化机器人(专业版)是数字货币交易爱好者的量化利器。
					</div>
					<div v-show="id==2">
						CR合约量化机器人(专业版)是一款为数字货币合约交易爱好者打造的量化交易系统，同样兼容火币全球站与OKEx交易所。预算设置简单而灵活，用户可自由选择多空双开或者任意一个方向，根据仓位大小设置开张张数、杠杆倍数与最大做单数。开启策略的操作便捷性提高了合约量化机器人的高效性。合约量化机器人(专业版)拥有智能的监控功能，它会根据行情变化智能调整。用户可以根据个人主观想法，分析判断实时行情，任意时间均可以临时停止修改策略参数，灵活性是它最大的优势。CR合约量化机器人(专业版)是合约交易爱好者的不二之选。
					</div>
					<div v-show="id==3">
						CR合约量化机器人(智能版)是一款全智能的趋势分析判断合约量化交易系统。用户只需根据仓位大小设置开张张数与杠杆倍数，一键应用即可启动交易。合约量化机器人(智能版)通过识别实时行情技术指标、资讯等，智能分析判断未来趋势。系统没有固定的止盈比例，它是在深度分析计算出的止盈条件自动止盈获利。其属于中低频的交易策略，交易次数少，但因其追踪趋势的功能，一旦止盈收获斐然、效益更直观。CR合约量化机器人(智能版)因趋势而显著，更适合懂趋势策略的用户。
					</div>
					<div v-show="id==4">
						CR现货量化机器人(智能版)是一款全智能的趋势分析判断现货量化交易系统。用户只需最大交易本金，一键应用即可启动交易。现货量化机器人(智能版)通过识别实时行情技术指标、大数据分析等，智能判断未来价格走势。系统没有固定的止盈比例，它是在深度分析计算出的止盈条件自动止盈获利。其属于中低频的交易策略，交易次数少，但因其追踪趋势的功能，一旦止盈收获斐然、效益更直观。CR现货量化机器人(智能版)因趋势而显著。
					</div>
					<div v-show="id==5">
						CR策略跟随机器人是为数字货币投资爱好者打造的
						策略跟随机器人，运用革新技术实现了无经验的投资者也可以跟随专业的老师设置的策略进行交易，从而实现轻松交易。CR策略跟随包括了策略老师发布的交易策略，跟随者可以自主选择策略老师的交易策略跟随，机器人检测到策略老师的交易行为，自动将其交易策略以及交易信号精准同步到跟随者，同时策略老师也具有一定的风控能力，从而实现让更多不懂专业
						交易和设置参数的用户在交易过程中降低投资风险并获得更稳定的收益。

					</div>
				</div>
			</van-tab>
			<van-tab title-style="font-weight:bold" title="操作流程">
				<div class="item">
					<p style="margin-bottom: 6px;margin-left: 7px;">操作流程</p>
					<div class="p1">
						<div></div> 激活机器人
					</div>
					<div>
						成功购买机器人后，点击进入【量化】主页，点击【量化机器人】，进入我的机器人页面，选择{{id==1?'CR现货量化交易(专业版)机器人':id==2?'合约量化机器人(专业版)':id==5?'策略跟随机器人(现货/合约)':'现货量化机器人(智能版)'}}，点击【激活】。
					</div>
					<div class="p1">
						<div></div> 绑定API
					</div>
					<div>点击进入【量化】主页，点击进入【API管理】选择交易所并完成API的绑定。
						<div v-show="id==5">注：现货量化请绑定火币网API，合约量化请绑定OKEx交易所API。</div>
					</div>
					<div class="p1" v-show="id!=5">
						<div></div> 开启策略
					</div>
					<div v-show="id!=5">
						<div>
							返回【量化】主页，点击【量化机器人】进入我的机器人页面，选择CR{{id==1 || id== 4?'现货':'合约'}}量化交易({{id== 4?'智能':'专业'}}版)机器人，点击【进入系统】。
						</div>
						<div>进入CR{{id==1|| id== 4?'现货':'合约'}}量化机器人({{id== 4?'智能':'专业'}}版)界面后：</div>
						<div>
							①点击【选择交易所】，选择{{id==1|| id== 4?'火币全球站':'OKEx'}}；
						</div>
						<div>
							②仓位监测：{{id==1 || id== 4?'机器人自动识别仓位；计价币：选择任意一种作为计价':' 选择仓位币对金额；  计价方式：默认选择USDT保证金合约。'}}
						</div>
						<div>
							③添加货币对：点击进入选择货币对（可多项选择）
						</div>
						<div>
							④一键设置预算：进入【设置预算】完成各参数的填写，点击【确定】。
						</div>
						<div>
							⑤开启交易：完成以上参数设置后，策略会在监控页显示，点击【开启交易】,策略状态显示“正在监控中”即完成策略的开启。
						</div>
					</div>

					<div class="p1" v-show="id!=5">
						<div></div> 修改参数
					</div>
					<div v-show="id!=5">
						<div>
							若策略在运行状态中，如何修改策略参数：
						</div>
						<div>
							①点击【停止交易】----【临时停止】，让策略处于临时停止状态
						</div>
						<div>②点击【设置预算】，进入预算设置界面可修改各参数，完成后点击【确认】。</div>
						<div>③返回策略监控页，点击【恢复交易】，若策略的运行状态显示为“正在监控中”即表示参数修改成功。</div>
					</div>
					<div class="p1" v-show="id!=5">
						<div></div> 删除策略
					</div>
					<div v-show="id!=5">
						<div>
							如何删除策略：
						</div>
						<div>
							①点击【停止交易】----【临时停止】，让策略处于临时停止状态；或者点击【清仓停止】。
						</div>
						<div>②点击【删除策略】。</div>
					</div>
					<div class="p1" v-show="id!=5">
						注：【清仓停止】表示机器人执行清仓。
					</div>
					<div class="p1" v-show="id==5">
						<div></div> 策略跟随社区
					</div>
					<div v-show="id==5">
						<div> 返回【量化】主页，点击【量化机器人】进入我的机器人页面，选择CR策略跟随机器人(现货/合约)，点击【进入系统】。</div>
						<div> 进入策略跟随社区后有以下功能界面：</div>
						<div>
							①现货策略跟随机器人 ②合约策略跟随机器人 ③策略列表
						</div>
					</div>
					<div class="p1" v-show="id==5">
						<div></div> 合约策略跟随
					</div>
					<div v-show="id==5">
						
						<div>						进入策略跟随社区后，如何进行合约策略跟随？</div>
						<div>						①选择【合约策略跟随机器人】----【点击进入】。</div>
						<div>						②进入策略跟随机器人(合约版)界面。</div>
						<div>						③点击【选择交易所】，选择OKEx。</div>
						<div>						④计价方式：系统默认为【USDT合约保证金】。</div>
						<div>						⑤点击【选择跟随策略】，进入策略列表界面，选择你要跟随的策略，点击【跟随】。</div>
						<div>						⑥返回策略监控页，跟随详情中即显示“已跟随×××”，在策略中点击【开启跟随】，当策略状态显示“正在监控中”即表示成功跟随，并同步策略老师的交易行为。</div>
					</div>
					<div class="p1" v-show="id==5" style="margin-bottom: 10px;">
						注：在跟随策略运行时，请务必不要在交易所手动干预，以免造成数据紊乱策略错误。
					</div>
					<div class="p1" v-show="id==5">
						<div></div> 关闭跟随
					</div>
					<div v-show="id==5">
						
						
						<div>						若跟随策略在运行状态中，如何关闭跟随？</div>
						<div>						①点击【关闭跟随】，让策略处于临时停止状态</div>
						<div>						②关闭跟随后，用户可自由选择在CR平仓，点击【一键平多】或者【一键平空】，点击【删除策略】。</div>
					</div>
					<div class="p1" v-show="id==5" style="margin-bottom: 10px;">
						注：<br />
						1)、关闭跟随即表示取消跟随策略老师的策略，但仍要选择在CR中平仓，关闭跟随后的交易风险将由用户本人承担。<br />
						2)、如若用户自行在交易所手动平仓，CR机器人仍然以用户开启跟随策略时的相应仓位手续费扣除标准进行手续费的扣除。<br />
						3）、跟随交易仅有一次关闭跟随机会，一但关闭跟随若要继续跟随，则需在CR一键平仓并删除策略，重新开启新的策略跟随。<br />
						4)、用户若需平仓操作的，建议在CR一键平仓，以免造成数据紊乱。
					</div>
					<div class="p1" v-show="id==5">
						<div></div>现货策略跟随
					</div>
					<div v-show="id==5">
						敬请期待
						</div>
				</div>
			</van-tab>
			<van-tab title-style="font-weight:bold" title="用户须知">
				<div class="item">
					<p>用户须知</p>
					<div>
						1.CR{{id==1 || id== 4?'现货量化系统是一个创新型数字资产投资理财辅助工具。绝大多数交易点都由智能交易系统依据数据模型分析判断计算得出，部分行情下与人为的理性判断可能会有较大出入。':id==2?'合约量化机器人是一个创新型数字资产投资交易辅助工具。交易买卖策略都由机器人依据用户设定的参数数据模型自动循环执行，有效解决人工盯盘和情绪的影响，从而在数字资产交易中获得稳定的收益':'策略跟随机器人是一个为广大数字资产投资爱好者提供的交易便捷辅助工具。机器人会对正在交易的策略老师交易策略进行筛选排名，用户可自行选择排名的交易策略一键跟随同步执行交易，无需设置各项参数数据、人工盯盘和情绪影响，从而在数字资产交易中获得稳定的收益。'}}
					</div>
					<div>
						2.考虑到数字资产投资交易市场存在巨大风险，建议您在使用本服务前充分了解相关法律条规及咨询专业意见，根据个人的财务状况、投资经验、风险偏好等相关因素，{{id==5?'慎重选择适合您的量化策略跟随':'慎重选择适合和设定您的量化策略'}}。
					</div>
					<div>
						3.数字资产投资市场存在的风险是不受CR量化系统平台控制或影响的，{{id==5?'策略跟随':'量化'}}过程中所有的交易均由您个人承担风险。
					</div>
					<div>
						4.您应当理解，实际投资的收益会随着市场行为发生变化，量化策略{{id==5?'跟随':''}}交易与常规人为交易存在着巨大的区别，因此，您在进行{{id==5?'策略跟随':'量化'}}投资过程中实际产生的收益可能与系统记录收益存在一定的差异。
					</div>
					<div>
						5.CR{{id==5?'策略跟随':'量化'}}交易系统不保证和承诺您所使用和设定的交易策略或本平台的所有传播的信息让您获利润而不亏损，您在使用本服务过程中的实际收益或亏损均由您本人承担，CR量化系统平台不承担任何相关责任。
					</div>
					<div>
						6.量化系统运行中，因您个人原因造成程序中断，如手动操作交易所帐户，手动删除策略，手动删除API或API过期，交易点卡手续费不足等，量化系统将停止交易！
					</div>
				</div>
			</van-tab>
		</van-tabs>

		<div class="button">
			<!-- <button @click="fn()">USDT购买</button> -->
			<button @click="fn()">立即购买</button>
		</div>
		<van-dialog v-model="show" title="选择购买时长" show-cancel-button :before-close="beforeClose">
			<div class="bel-dia">
				<div  style="display: flex;margin: 2px 0;"> <span style="flex: 1;text-align: left;">时长: 360天</span>
					<span style="flex: 1;text-align: left">价格: 200USDT</span>
					<van-checkbox shape="square" v-model="checked1" style="font-size: 13px;margin-left: 10px;" icon-size="14"></van-checkbox>
				</div>
			</div>
			<div class="bel-dia" style="display: flex;justify-content: space-between;">
				<span>支付方式: </span>
				<div style="display: flex;">
					USDT支付 <van-checkbox icon-size="16" shape="square" v-model="checked4" style="font-size: 14px;"></van-checkbox>
				</div>
				<div style="display: flex;">
					购物券支付 <van-checkbox icon-size="16" shape="square" v-model="checked5" style="font-size: 14px;"></van-checkbox>
				</div>
			</div>
			<p style="margin: 10px 16px;font-size: 14px;">您是否了解清楚CR量化产品功能和用户须知?如无疑问和异议,点击'确定'即购买成功,一经购买,不支持任何退换</p>

		</van-dialog>
	</div>
</template>

<script>
	import Vue from "vue";
	import {
		Dialog,
		Checkbox
	} from "vant";
	Vue.use(Dialog);
	Vue.use(Checkbox);
	export default {
		comments: {
			Checkbox
		},
		data() {
			return {
				id: '',
				active: 0,
				checked1: true,
				// checked2: false,
				checked3: true,
				checked4: true,
				checked5: false,
				show: false,
				bool:false,
			};
		},
		created() {
			this.id = this.$route.query.id
			if(this.$route.query.bool){
				this.bool = this.$route.query.bool
			}
		},
		watch: {
			// checked1(newValue, oldValue) {
			// 	if (newValue == true) {
			// 		this.checked2 = false
			// 		this.checked3 = false
			// 	}
			// },
			// checked2(newValue, oldValue) {
			// 	if (newValue == true) {
			// 		this.checked1 = false
			// 		this.checked3 = false
			// 	}
			// },
			// checked3(newValue, oldValue) {
			// 	if (newValue == true) {
			// 		this.checked2 = false
			// 		this.checked1 = false
			// 	}
			// },
			checked4(newValue, oldValue) {
				if (newValue == true) {
					this.checked5 = false
				}
			},
			checked5(newValue, oldValue) {
				if (newValue == true) {
					this.checked4 = false
				}
			},
		},
		methods: {
			fn() {
				this.show = true
				
			},
			beforeClose: function(action, done) {
				if (action === "confirm") {
					let type;
					if(this.bool){
						this.$toast.fail({
							message: `暂未开放`,
							duration: 1200
						});
						done();
						return
					}
					if (this.checked4) {
						type = 1
					} else {
						type = 8
					}

					this.$axios
						.post("/index/robot/purchase_robot", {
							num:200,
							type,
							month:12,
							robot_type: 4,
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
					done(); // 关闭提示框
				} else if (action === "cancel") {
					// 取消
					done(); // 关闭提示框
				}

			},

		},

	}
</script>

<style lang="less" scoped>
	.van-icon-down {
		transform: rotate(90deg);
		margin: 10px 0 6px 8px;
	}

	.title {
		display: flex;
		padding-left: 15px;
		padding-right: 15px;
		margin-bottom: 10px;
		justify-content: space-between;
		color: rgb(86, 86, 86);

		.a {
			font-size: 15px;
			font-weight: bold;
		}

		div {
			display: flex;
		}

		img {
			width: 53px;
			height: 22px;
		}
	}

	.img {
		width: 100%;
		height: 200px;
	}

	.van-tabs__nav--line {
		height: 90%;
	}

	.item {
		padding: .2rem .32rem;
		color: rgb(86, 86, 86);
		margin-bottom: 60px;

		p {
			font-size: 16px;
			margin-bottom: 21px;
			font-weight: bold;
			color: #000;
		}

		div {
			margin: -2px 0 12px 0;
		}

		.p1 {
			font-size: 14px;
			display: flex;
			font-weight: bold;
			color: #000;
			margin: 0;

			div {
				width: 3px;
				height: 14px;
				background-color: #000;
				margin-top: 3px;
				margin-right: 4px;
			}
		}
	}

	.button {
		position: fixed;
		bottom: 0px;
		padding: 10px 11% 15px;
		display: flex;
		justify-content: space-between;
		width: 78%;
		background-color: #FFFFFF;

		button {
			width: 325px;
			line-height: 34px;
			background-color: rgb(11, 120, 241);
			color: #FFFFFF;
			font-weight: bold;
		}
	}

	.bel-dia {
		padding: 6px 16px;
		font-size: 14px;

	}
</style>
