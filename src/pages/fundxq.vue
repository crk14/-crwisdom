<template>
	<div class="body">
		<div class="title">
			<van-icon name="down" color="rgb(31,55,69)" onclick="window.history.go(-1)" />
			<div></div>
		</div>
		<div class="body-t">
			<div class="one">
				<div class="left">{{list.title + list.period}}天</div>
				<div class="right huise"><span>{{list.buy_num}}</span>/{{list.publish_num}} </div> 
			</div>
			<div class="huise">
				截止日期：{{list.close_time}}
			</div>
			<div class="h1"></div>
			<div class="two">
				
				<div class="right">
					<div class="one-r">{{list.period}}<span>天</span></div>
					<div class="two-t">基金周期</div>
					
					<div class="three-r" v-if="list.traits">
						<div v-for="(value1,index2) in list.traits.split(',')">{{value1}}</div>
					</div>
				</div>
				<div class="left" style="width: 35%;">
					<div class="one-t">{{list.annual_rate}}%</div>
					<div class="two-t">年化收益率</div>
					<div class="three-t">{{list.fund_money}} {{list.currency}}/每份</div>
				</div>
			</div>
			<div class="huise">
				周期时段：{{time}}
			</div>
			<!-- <div class="three">
				稳健策略型
			</div> -->
		</div>
		<div class="h2"></div>
		<van-tabs v-model="active" color="rgb(29,68,135)" title-active-color="rgb(29,68,135)" line-width="32px" >
			<van-tab title="基金介绍">
				<div class="item-t">
					<div class="h3">基金介绍</div>
					<div class="p">{{list.introduction}}</div>
				</div>
			</van-tab>
			<van-tab title="基金分析">
				<div class="item-t">
					<div class="h3">参数设置</div>
					<div class="p1">
						<div>最低购买金额</div>
						<span>{{list.fund_money}} USDT</span>
					</div>
					<div class="p1">
						<div>最高购买金额</div> <span>{{(list.publish_num-list.buy_num)*list.fund_money}} USDT</span>
					</div>
					<div class="p1">
						<div>单笔购买最小值</div> <span>{{list.fund_money}} USDT</span>
					</div>
					<div class="p1">
						<div>预期收益率</div> <span>{{list.annual_rate}}%</span>
					</div>
					<div class="p1">
						<div>托管周期</div> <span>{{list.period}}天</span>
					</div>
				</div>
			</van-tab>
			<van-tab title="流程说明">
				<div class="item-t">
					<div class="h3">流程说明</div>
					<div class="list">
						<div class="top">
							<img src="../assets/me1.png" />
							<span>限时购买</span>
						</div>
						<div class="buttom">用户在限定时间内购买基金</div>
					</div>
					<div class="list">
						<div class="top">
							<img src="../assets/stop1.png" />
							<span>购买截止</span>
						</div>
						<div class="buttom">限定时间截止后不能再购买</div>
					</div>
					
					<div class="list">
						<div class="top">
							<img src="../assets/monery1.png" style="width: 18px;height: 18px;margin-top: 2px;"/>
							<span>基金收益</span>
						</div>
						<div class="buttom">购买成功48小时后每日16点自动生成收益至USDT账户, 如果未到期中途终止赎回基金将扣除投资基金5%手续费</div>
					</div>
					<div class="list">
						<div class="top">
							<img src="../assets/stop2.png" />
							<span>托管结束</span>
						</div>
						<div class="buttom">到期结束后, 返回USDT投资基金, 无任何手续费</div>
					</div>
					<div class="h1"></div>
					<div class="h3">风险提示</div>
					<p class="huise">风险提示:</p>
					<p class="huise" style="text-indent: 35px;margin-bottom: 93px;">购买成功48小时后每日16点自动生成收益至USDT账户, 如果未到期中途终止赎回基金将扣除投资基金5%手续费</p>
				</div>
			</van-tab>
		</van-tabs>
		<div class="button" style="height: 54px; width: 100%;background-color: #FFFFFF;bottom: 0;">
			<button v-show="list.closed == 1" class="button">已截止</button>
			<button v-show="list.closed == 0" class="button" style="background-color: #dd3c41" @click="fn()">购买</button>
		</div>
		 <van-dialog v-model="show2" title="确定购买" show-cancel-button :before-close="beforeClose">
			 <div class="prupe">
				 <div>
					 <span>购买份数</span> <van-stepper v-model="value" :max="list.publish_num -list.buy_num"/>
				 </div>
				 <div style="margin-top: 10px;">
					 <div></div>
					 <div>
					 					 共计 {{value*list.fund_money}} USDT
					 </div>
				 </div>
				
			 </div>
			 </van-dialog>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { Stepper } from 'vant'
	Vue.use(Stepper);
	export default {
		data() {
			return {
				active: 0,
				bool:false,
				time:'',
				id:'',
				show2:false,
				value:1,
				list:[],
			};
		},
		created() {
		this.id = this.$route.query.id
		
		this.$axios
			.post("/index/fund/fund_detail",{id:this.id})
			.then(res => {
				if(res.data.code == 0){
					this.list = res.data.data
					var d = new Date();
					let time1 =this.totime(d)
					let timestamp=d.getTime()
					let num;
					num = 86400000 * res.data.data.period
					let num2 = timestamp + num
					let str =  new Date(num2)
					let time2 = this.totime(str)
					this.time = time1 + ' - ' + time2
				}
				
			})
			
		},
		
		methods: {
			fn(){
				this.show2 = true
				
			},
			totime(time){
				var yy1 = time.getFullYear();
				            var mm1 = time.getMonth()+1;
				            var dd1 = time.getDate();
				            if (mm1 < 10 ) {
				                mm1 = '0' + mm1;
				            }
				            if (dd1 < 10) {
				              dd1 = '0' + dd1;
				            }
				return yy1 + '-' + mm1 + '-' + dd1
			},
			beforeClose: function (action, done) {
			  if (action === "confirm") {
			   this.$axios
			   	.post("/index/fund/purchase_fund",{
					buy_num:this.value,
					id:this.list.id
				})
			   	.then(res => {
					if(res.data.code == 0){
						this.$toast.success({
							message: '购买成功',
							duration: 3200
						})
						
					}else{
						this.$toast.fail({
							message: res.data.data,
							duration: 3200
						});
					}
			   		
			   	})
			    done(); // 关闭提示框
				this.value = 1
			  } else if (action === "cancel") {
			    // 取消
			    done(); // 关闭提示框
				this.value = 1
			  }
			  this.bool4 = null;
			  this.id2 = null;
			},
		}

	};
</script>

<style lang="less" scoped>
	.body {
	min-height: 100%;
		.title {
			padding: 0 .28rem;
			margin: .2rem 0;
			// font-size: .4rem;
			font-weight: 550;
			display: flex;
			position: relative;
			height: 18px;

			i {
				font-size: .4rem;
				position: absolute;
				left: 16px;
				top: 4px;
				transform: rotate(90deg);
			}

			div {
				flex: 1;
				text-align: center;
			}


		}

		.body-t {
			padding: 0 .28rem;

			.huise {
				color: rgb(166, 171, 175);
				font-size: 15px;
			}

			.one {
				margin-top: 26px;
				margin-bottom: 12px;
				display: flex;
				justify-content: space-between;

				.left {
					color: rgb(3, 33, 57);
					font-size: 18px;
					font-weight: 550;
				}

				.right {
					margin-top: 3px;

					span {
						color: #334a76;
					}

				}
			}

			.h1 {
				margin: 15px 0;
				height: 1px;
				background-color: #E5E5E5;
			}

			.two {
				display: flex;
				margin-bottom: 8px;

				.left {
					// flex: 1
				}

				.right {
					flex: 1
				}

				.one-t {
					color: rgb(221, 60, 65);
					font-weight: 550;
					font-size: 20px;
				}

				.one-r {
					color: rgb(3, 33, 57);
					font-size: 22px;
					font-weight: 550;

					span {
						font-weight: 400;
						font-size: 14px;
					}
				}

				.two-t {
					color: rgb(145, 151, 157);
					font-size: 15px;
					margin: 11px 0;
				}

				.three-t {
					color: rgb(37, 56, 71);
					font-size: 15px;
				}

				.three-r {
					display: flex;
					margin-top: -3px;

					div {
						background-color: rgb(245, 248, 254);
						color: rgb(51, 74, 118);
						margin-right: 5px;
						font-size: 14px;
						text-align: center;
						padding: 1px 3px;
					}
				}
			}

			.three {
				background-color: rgb(255, 246, 237);
				color: rgb(223, 155, 52);
				padding: .22rem .2rem;
				margin: .18rem 0;
			}
		}

		.h2 {
			margin-top: 7px;
			height: 6px;
			background-color: rgb(248, 248, 248);
		}

		.item-t {
			padding: 0 .28rem;

			.h3 {
				font-size: 18px;
				font-weight: 550;
				margin: .42rem 0 .3rem 0;
				color: #032139;
			}

			.p {
				color: rgb(141, 152, 160);
			}

			.p1 {
				color: rgb(141, 152, 160);
				margin: .28rem 0;
				width: 79%;
				display: flex;
				div{
					width: 43%;
				}
				span {
					margin-left: 24px;
					color: rgb(51, 74, 118);
				}
			}
			.list{
				.top{
					display: flex;
					img{
						display: block;
						width: 20px;
						height: 20px;
					}
					span{
						margin-left: 13px;
						color: rgb(51, 74, 118);
						font-weight: 550;
					}
				}
				.buttom{
					margin:.16rem 0;
					margin-left: 33px;
					font-size: 14px;
					color: rgb(141, 152, 160);
				}
			}
			.h1 {
				margin: 15px 0;
				height: 1px;
				background-color: #E5E5E5;
			}
			.huise{
				color: rgb(166, 171, 175);
				font-size: 15px;
			}
		}

		.button {
			position: fixed;
			bottom: 20px;
			left: .28rem;
			width: 6.9rem;
			background-color: rgb(174, 186, 198);
			color: #FFFFFF;
			border-radius: 3px;
			padding: .25rem 0;
		}
		.prupe{
			padding: 25px 25px 10px 25px;
				
			div{
				display: flex;
				justify-content: space-between;
				color: #253847;
				span{
				}
			}
		}
	}
</style>
