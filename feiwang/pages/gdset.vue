
<template>
	<div>
		<div class="title">
			
			<van-icon name="arrow-left"  onclick="window.history.go(-1)"/>
			<div>跟单设置</div>
			<div class="item">
				<img src="../assets/11012.png"/>
				<div>帮助</div> </div>
		</div>
		<div class="title1">
			<img src="../assets/11122.png"/>
			跟单时,每个合约交易对的杠杆倍数以您自行设置的为准,可能存在与交易员不一致的情况,请你合理设置杠杆倍数丶止损比例来控制风险。
		</div>
		<div class="p">
			<div>交易员</div>
			<div class="item">利润分成比例10%</div>
		</div>
		<div class="top">
			<img src="../assets/5c95d15bec485@2x.png" />
			<div>虚鲸一场</div>
		</div>
		<p class="p1"></p>
		<div class="p">
			<div>跟单类型</div>
			<div class="item">{{value3}}</div>
		</div>
		<div class="p" style="padding: 0 .22rem .2rem;"  @click="bool1=true">
			<div class="item">请选择您要的跟单的类型</div>
			<van-icon name="arrow" color="#989ba0"  size="14"/>
		</div>
		<van-picker
		v-show="bool1"
		  title="标题"
		  show-toolbar
		  :columns="columns"
		  @confirm="onConfirm"
		    @cancel="onCancel"
		/>
		<p class="p1"></p>
		<div class="p">
			<div>杠杆倍数</div>
		</div>
	<div class="p" style="padding: 0 .22rem .2rem;"  @click="bool2=true">
		<div class="item">请选择您想要的杠杆倍数</div>
		<van-icon name="arrow" color="#989ba0"  size="14"/>
	</div>
		<p class="p1"></p>
		<div class="p">
			<div>跟单数量</div>
		</div>
		<div class="p" style="border-bottom: 1px solid #E5E5E5;padding: .12rem 0 .22rem;margin: 0 .22rem;">
			<input type="number" placeholder="请输入跟单张数" style="font-size: 15px;flex: 1;padding-right: 44%;" v-model="value"/>
			<div class="item">张</div>
		</div>
		<p class="p2">假如您设置跟单张数为10张,则不论交易员下单多少张,您均会下单10张</p>
		<p class="p1"></p>
		<div class="p">
			<div>最大持仓张数</div>
		</div>
		<div class="p" style="border-bottom: 1px solid #E5E5E5;padding: .12rem 0 .22rem;margin: 0 .22rem;">
			<input type="number" placeholder="请输入最大持仓张数" style="font-size: 15px;flex: 1;padding-right: 44%;" v-model="value2"/>
			<div class="item">张</div>
		</div>
		<p class="p2">跟随该交易员时,每个合约交易对的最大持仓张数</p>
		<p class="p1"></p>
		<button class="but" @click="fn2()">立即跟单</button>
		<van-popup v-model="matterplay" class="matter">
		  <p>已选择跟单类型: {{value3}}</p>
		  <p>已选择跟单数量: {{value}}</p>
		  <p>已选择持仓张数: {{value2}}</p>
		  <p>已选择杠杆倍数: {{value5}}</p>
		  <p style="margin: 12px 0;">确认跟单后系统将同步交易员之后的开平仓行为。</p>
		  <div>
			  <button style="border-right: 1px solid #E5E5E5;" @click="matterplay =false">取消</button>
			  <button style="color: rgb(66,109,187);" @click="fn()">确认跟单</button>
		  </div>
		</van-popup>
		<van-popup v-model="bool2" round position="bottom" :style="{ height: '40%' }"  closeable
  close-icon-position="top-right" class="prop2">
  <p >选择杠杆模式</p>
  <div class="item" @click="check=0">
	  <img v-if="check==0" src="../assets/landian.png" alt />
	  <img v-else src="../assets/nocomr.png" alt />
	  <div class="one">使用交易员的杠杆
	  <div class="two">设置后,您的杠杆与该交易员的仓位杠杆保持一致</div>
	  </div>
  </div>
  <div class="item" @click="check=1">
  	  <img v-if="check==1" src="../assets/landian.png" alt />
  	  <img v-else src="../assets/nocomr.png" alt />
	  <div class="one">自定义杠杆 <input v-show="check==1" placeholder="倍数" type="number" v-model="value4"/>
	  <div class="two">无论交易员使用多少杠杆,您的仓位杠杆值都为设定值(高杠杆可能导致某些合约快速保持,请谨慎设置)</div>
	  </div>
  </div>
  <div class="three">
	  <button class="left" @click="bool2=false">取消</button>
	  <button class="right" @click="fn3()">确定</button>
  </div>
  </van-popup>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { Picker } from 'vant';
	
	Vue.use(Picker);
export default {
	components:{Picker},
  data() {
    return {
		bool4:true,
		value:'',
		value2:'',
		 columns: ['BTC/USDT永续', 'ETH/USDT永续'],
		 value3:'BTC/USDT永续',
		 bool1:false,
		 matterplay:false,
		 bool2:false,
		 check:0,
		 value4:'',
		 value5:'交易员的杠杆'
    };
  },
  created() {
  	
  },
  watch:{
	  check(newValue,oldValue){
	     		 if(newValue != 0 ){
					 this.value5 = ''
				 }else{
					 this.value5 = '交易员的杠杆'
				 }
	  },
	  value4(newValue,oldValue){
		  if(this.check == 1){
			  this.value5 = newValue
		  }
	  }
  },
  methods:{
	   onConfirm(value, index) {
			this.value3 =value
			this.bool1 = false
	      },
		onCancel() {
			this.bool1 = false
		  },
		  fn(){
			  this.matterplay = false
		  },
		  fn2(){
			  if(!this.value ||!this.value2){
				  this.$toast.fail({ message: "请填写完整", duration: 2000 })
				  return
			  }
			  this.matterplay = true
		  },
		  fn3(){
			  if(this.check == 1 && !this.value4){
				  this.$toast.fail({ message: "请输入自定义杠杆倍数", duration: 2000 })
				  return
			  }
			  this.bool2=false
		  }
  }
  
};
</script>

<style lang="less" scoped>
	.title{
		padding: 0 .28rem;
		margin: .22rem 0;
		font-size: .34rem;
		display: flex;
		position: relative;
		// font-weight: 550;
		i{
			position: absolute;
			left: 9px;
			top: 4px;
		}
		div{
				flex: 1;
				text-align: center;
				// margin-left: 30px;
		}
		.item{
			position: absolute;
			right: 20px;
			top: 0px;
			display: flex;
			img{
				width: 25px;
				height: 25px;
				display: block;
				margin-right: 4px;
			}
		}
	}
	.title1{
		padding: .2rem .28rem .2rem .58rem;
		font-size: .34rem;
		position: relative;
		color: rgb(250,132,0);
		background-color: rgb(255,243,229);
		font-size: 14px;
		img{
			position: absolute;
			width: 18px;
			height: 18px;
			top: .22rem;
			left: .2rem;
		}
		}
		.p{
			display: flex;
			padding: .22rem;
			justify-content: space-between;
			font-size: 17px;
			.item{
				font-size: 15px;
				color: rgb(152,155,160);
			}
			i{
				margin-top: 4px;
			}
		}
		.top{
			display: flex;
			padding: .22rem;
			img{
				width: 45px;
				height: 45px;
				border-radius: 50%;
				margin-right: 13px;
			}
			// font-weight: 550;
			line-height: 45px;
		}
		.p1{
			width: 100%;
			height: 8px;
			background-color: rgb(244,248,251);
		}
		.p2{
			padding: .11rem .22rem .28rem;
			font-size: 14px;
			color: rgb(152,157,161);
		}
		.but{
			margin: .3rem 5%;
			background-color: rgb(145,170,234);
			color: #FFFFFF;
			width: 90%;
			font-size: 18px;
			height: 42px;
			line-height: 42px;
		}
		.matter{
			width: 77%;
			height: 224px;
			padding: .31rem 0 0;
			font-size: 17px;
			p{
				line-height: 26px;
				padding: 0 5%;
			}
			div{
				display: flex;
				button{
					flex: 1;
					color: rgb(168,168,182);
					background-color: #FFFFFF;
					border-top: 1px solid #E5E5E5;
					display: block;
					height: 40px;
					line-height: 39px;
				}
			}
			
		}
		.prop2{
			p{
				padding: .3rem;
				font-weight: 550;
				font-size: 17px;
				border-bottom: 1px solid #EEEEEE;
			}
			.item{
				padding: .4rem .2rem .25rem;
				display: flex;
				img{
					width: 0.4rem;
					    height: 0.4rem;
				}
				.one{
					margin-top: -2px;
					font-size: 16px;
					margin-left: 12px;
					.two{
						margin-top: 6px;
						font-size: 14px;
						color: rgb(168,168,182);
					}
					input{
						width: 50px;
						font-weight: 15px;
						border: 1px solid rgb(168,168,182);
					}
				}
			}
			.three{
				display: flex;
				margin: .4rem .2rem 0;
				button{
					flex: 1;
					border: 1px solid #91aaea;;
					color: #91aaea;;
					height: 38px;
					line-height: 36px;
					background-color: #FFFFFF;
				}
				.right{
					margin-left: 4px;
					color: #FFFFFF;
					background-color: #91aaea;;
				}
				.left{
					margin-right: 4px;
				}
			}
		}
</style>

