<template>
	<div style="font-size: 14px;min-height: 100%;padding-bottom: 20px;">
		<van-icon name="down" color="rgb(20,44,56)" @click="$router.back()" size="20px"/>
		<div class="title">
			<div class="a" v-show="id == 1">CR现货量化机器人(专业设置版)</div>
			<div class="a" v-show="id == 2">CR合约量化机器人(专业设置版)</div>
			<div class="a" v-show="id == 3">CR合约量化机器人(智能趋势版)</div>
			<div class="a" v-show="id == 4">CR现货量化机器人(智能趋势版)</div>
			<div class="a" v-show="id == 5">CR策略跟随机器人(合约版)</div>
			<div>
				<img src="../assets/1120.png" style="margin-top: -4px;"/>
				<img src="../assets/1121.png"/>
			</div>
		</div>
		<img class="img" v-show="id == 1" src="../assets/bananjq.png" />
		<img class="img"  v-show="id == 2" src="../assets/bananjq2.png" />
		<img class="img"  v-show="id == 3" src="../assets/bananjq3.png" />
		<img class="img"  v-show="id == 5" src="../assets/1-7.png" />
		<p v-show="id == 4" style="line-height: 40px;text-align: center;">敬请期待</p>
		<!-- <p v-show="id == 5" style="line-height: 40px;text-align: center;">敬请期待</p> -->
		<van-tabs line-height="2px" v-model="active" color="rgb(11,120,241)"  title-active-color="rgb(11,120,241)">
		  <van-tab title-style="font-weight:bold" title="系统说明">
			  <div class="item">
				  <p>系统介绍</p>
				  <div v-show="id==1">
					  CR现货量化机器人(专业设置版)是一款为专业的数字货币爱好者定制的现货量化交易系统，兼容火币全球站与OKEx交易所。它具有高度专业化、灵活性的参数设置功能，用户可以根据个人的数字货币专业认知水平、判断分析能力进行参数设置，不同的行情均可以设置不同的策略相匹配，随时临时停止修改参数，从而实现在更多行情中获取更高的收益。CR现货量化机器人(专业设置版)是数字货币专业人士的量化利器。
				  </div>
				  <div v-show="id==2">
					 CR合约量化机器人(专业设置版)是一款为数字货币合约交易爱好者打造的量化交易系统，同样兼容火币全球站与OKEx交易所。预算设置简单而灵活，用户可自由选择多空双开或者任意一个方向，根据仓位大小设置开张张数、杠杆倍数与最大做单数。开启策略的操作便捷性提高了合约量化机器人的高效性。合约量化机器人(专业设置版)拥有智能的监控功能，它会根据行情变化智能调整。用户可以根据个人主观想法，分析判断实时行情，任意时间均可以临时停止修改策略参数，灵活性是它最大的优势。CR合约量化机器人(专业设置版)是合约交易爱好者的不二之选。
				  </div>
				  <div v-show="id==3">
					  CR合约量化机器人(智能趋势版)是一款全智能的趋势分析判断合约量化交易系统。用户只需根据仓位大小设置开张张数与杠杆倍数，一键应用即可启动交易。合约量化机器人(智能趋势版)通过识别实时行情技术指标、资讯等，智能分析判断未来趋势。系统没有固定的止盈比例，它是在深度分析计算出的止盈条件自动止盈获利。其属于中低频的交易策略，交易次数少，但因其追踪趋势的功能，一旦止盈收获斐然、效益更直观。CR合约量化机器人(智能趋势版)因趋势而显著，更适合懂趋势策略的用户。
				  </div>
				  <div v-show="id==4">
				  	CR现货量化机器人(智能趋势版)是一款全智能的趋势分析判断合约量化交易系统。用户只需根据仓位大小设置开张张数与杠杆倍数，一键应用即可启动交易。现货量化机器人(智能趋势版)通过识别实时行情技术指标、资讯等，智能分析判断未来趋势。系统没有固定的止盈比例，它是在深度分析计算出的止盈条件自动止盈获利。其属于中低频的交易策略，交易次数少，但因其追踪趋势的功能，一旦止盈收获斐然、效益更直观。CR现货量化机器人(智能趋势版)因趋势而显著，更适合懂趋势策略的用户。
				  </div>
				  <div v-show="id==5">
					  CR智慧量化跟随交易是为数字货币投资爱好者打造的跟随交易机器人，运用革新技术实现了普通投资者也可以跟随专业的交易员进行交易，从而实现了降低投资风险，提高投资收益。CR智慧量化跟随交易包括了交易员与跟随者。系统层层筛选，严格审核，只有具有专业知识水平和操作经验的人员才能成为交易员。跟随者可以自主选择交易员，跟随交易机器人检测交易员的交易行为，自动将其交易策略以及交易信号精准同步到跟随者，从而实现让更多不懂专业交易的用户获得更高的收益。
				  					 
				  </div>
			  </div>
		  </van-tab>
		  <van-tab title-style="font-weight:bold" title="操作流程">
			  <div class="item">
				  <p style="margin-bottom: 6px;margin-left: 7px;">操作流程</p>
				  <div class="p1"><div></div> 登录CR App</div>
				  <div>下载注册CR Wisdom账号后，登录CR账号。</div>
				  
				  <div class="p1"><div></div> 购买机器人</div>
				  <div>点击【量化机器人】，进入量化商城，选择{{id==1?'现货量化机器人(专业设置版)':id==2?'合约量化机器人(专业设置版)':id==3?'合约量化机器人(智能趋势版)':id==5?'策略跟随机器人(合约版)' :'现货量化机器人(智能趋势版)'}} ，进入详情并购买。
				  </div>
				<div class="p1"><div></div> 开启交易</div>  
				 <div> 成功购买机器人后，点击【进入】进入CR{{id==1?'现货量化机器人(专业设置版)':id==2?'合约量化机器人(专业设置版)':id==3?'合约量化机器人(智能趋势版)':'现货量化机器人(智能趋势版)'}}，选择交易所，添加货币对并根据自身需求设置相应的参数，完成后点击【开启交易】，策略状态显示监控中即成功开启策略。
				  </div>
				  <div class="p1"><div></div> 更改策略</div>
				  <div> 您可以根据自身专业分析判断随时可更改策略。点击【临时停止】，在策略临时停止状态下可根据需要更改参数，修改后点击【应用设置】，返回交易监控页点击【恢复交易】即可更改策略。
				  </div>
				  <div class="p1"><div></div> 停止交易</div> 
				  <div> 您可以根据自身实际情况与需求随时停止交易，与删除策略。
			       </div>
			  </div>
		  </van-tab>
		  <van-tab title-style="font-weight:bold" title="用户须知">
			  <div class="item" >
				  <p>用户须知</p>
			  <div>
			  1.CR{{id==1 || id == 4?'现货':'合约'}}量化系统是一个创新型数字资产投资理财辅助工具。绝大多数交易点都由智能交易系统依据数据模型分析判断计算得出，部分行情下与人为的理性判断可能会有较大出入。
			  </div>
			  <div>
			  2.考虑到数字资产投资交易市场存在巨大风险，建议您在使用本服务前充分了解相关法律条规及咨询专业意见，根据个人的财务状况、投资经验、风险偏好等相关因素，慎重选择适合和设定您的量化策略。
			  </div>
			  <div>
			  3.数字资产投资市场存在的风险是不受CR量化系统平台控制或影响的，量化过程中所有的交易均由您个人承担风险。
			  </div>
			  <div>
			  4.您应当理解，实际投资的收益会随着市场行为发生变化，量化策略交易与常规人为交易存在着巨大的区别，因此，您在进行量化投资过程中实际产生的收益可能与系统记录收益存在一定的差异。
			  </div>
			  <div>
			  5.CR量化交易系统不保证和承诺您所使用和设定的交易策略或本平台的所有传播的信息让您获利润而不亏损，您在使用本服务过程中的实际收益或亏损均由您本人承担，CR量化系统平台不承担任何相关责任。
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
			<div style="display: flex;margin: 2px 0;">	<span style="flex: 1;text-align: left;">时长: {{id!=5?'90天':'4200'}}</span>   <span style="flex: 1;text-align: left">价格: 5600CRW</span> 
			<van-checkbox shape="square" v-model="checked1" style="font-size: 13px;margin-left: 10px;" icon-size="14"></van-checkbox></div>
			<div style="display: flex;margin: 2px 0;">	<span style="flex: 1;text-align: left;">时长: {{id!=5?'180天':'8400'}}</span>   <span style="flex: 1;text-align: left">价格: 9600CRW</span>
			<van-checkbox shape="square" v-model="checked2" style="font-size: 13px;margin-left: 10px;" icon-size="14"></van-checkbox></div>
			<div style="display: flex;margin: 2px 0;">	<span style="flex: 1;text-align: left;">时长: {{id!=5?'360天':'16800'}}</span>   <span style="flex: 1;text-align: left">价格: 16800CRW</span>
			<van-checkbox shape="square" v-model="checked3" style="font-size: 13px;margin-left: 10px;" icon-size="14"></van-checkbox></div>
		</div>
		<div class="bel-dia" style="display: flex;justify-content: space-between;">
			<span >支付方式: </span>
			<div style="display: flex;">
				CRW支付 <van-checkbox icon-size="16" shape="square" v-model="checked4" style="font-size: 14px;"></van-checkbox>
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
	import { Dialog,Checkbox } from "vant";
	Vue.use(Dialog);
	Vue.use(Checkbox);
	export default {
		comments:{Checkbox},
	  data() {
	    return {
			id:'',
			active:0,
			checked1:true,
			checked2:false,
			checked3:false,
			checked4:true,
			checked5:false,
			show:false
	    };
	  },
	  created() {
		this.id = this.$route.query.id
	  },
	  watch:{
		 checked1(newValue, oldValue) {
		 	if (newValue == true) {
		 		this.checked2 = false
				this.checked3 = false
		 	}
		 },
		 checked2(newValue, oldValue) {
		 	if (newValue == true) {
		 		this.checked1 = false
				this.checked3 = false
		 	}
		 },
		 checked3(newValue, oldValue) {
		 	if (newValue == true) {
		 		this.checked2 = false
				this.checked1 = false
		 	}
		 },
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
	   methods:{
		  fn(){
			  if(this.id==4 || this.id==5){
				  this.$toast.fail({
				  	message: `暂未开放`,
				  	duration: 1200
				  });
				  return
			  }
			  this.show = true
			  // Dialog.confirm({
			  //   title: "提示",
			  //   message:
			  //     `您是否了解清楚CR量化产品功能和用户须知?如无疑问和异议,点击'确定'即购买成功,一经购买,不支持任何退换。
				 //  `,
			  // })
			  //   .then(() => {
					// this.show = true
			  //     // on confirm
			    
			  //   })
			  //   .catch(() => {
			  //     // on cancel
			  //   });
		  },
		  beforeClose: function(action, done) {
		  	if (action === "confirm") {
		  			let num;
					let month;
					let type;
		  			if(this.checked1){
		  				num = 5600
						month = 3
		  			}
		  			if(this.checked2){
		  				num = 9600
						month = 6
		  			}
		  			if(this.checked3){
		  				num = 16800
						month = 12
		  			}
					if(this.checked4){
						type = 2
					}else{
						type = 8
					}
		  			this.$axios
		  				.post("/index/robot/purchase_robot", {
		  					num,
		  					type,
							month,
		  					robot_type:this.id,
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
	
.van-icon-down{
	transform: rotate(90deg);
	margin: 10px 0 6px 8px;
}
.title{
	display: flex;
	padding-left: 15px;
	padding-right: 15px;
	margin-bottom: 10px;
	justify-content: space-between;
	color: rgb(86,86,86);
	.a{
		font-size: 15px;
		font-weight: bold;
	}
	div{
		display: flex;
	}
	img{
		width: 53px;
		height: 22px;
	}
}
.img{
	width: 100%;
	height: 200px;
}
.van-tabs__nav--line{
	height: 90%;
}
.item{
	padding: .2rem .32rem;
	color: rgb(86,86,86);
	margin-bottom: 60px;
	p{
		font-size: 16px;
		margin-bottom: 21px;
		font-weight: bold;
		color: #000;
		}
		div{
			margin: -2px 0 12px 0;
		}
		.p1{
			font-size: 14px;
			display: flex;
			font-weight: bold;
			color: #000;
			margin: 0;
			div{
				width: 3px;
				height: 14px;
				background-color: #000;
				margin-top: 3px;
				margin-right: 4px;
			}
		}
}
.button{
	position: fixed;
	bottom: 0px;
	padding: 10px 11% 15px;
	display: flex;
	justify-content: space-between;
	width: 78%;
	background-color: #FFFFFF;
	button{
		width: 325px;
		line-height: 34px;
		background-color: rgb(11, 120, 241);
		color: #FFFFFF;
		font-weight: bold;
	}
}
.bel-dia{
	padding: 6px 16px;
	font-size: 14px;
	
}
</style>
