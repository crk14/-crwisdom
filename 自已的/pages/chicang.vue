
<template>
	<div>
		<div class="tophader">
		  <van-icon name="arrow-left"  onclick="window.history.go(-1)"/>
		  <p style="font-size: .39rem;">持仓</p>
		</div>
		<div class="body">
			<div  v-for="(item1,index1) in list" :key="index1" >
			<p v-if="item1.account>0 && index1 %2 ==0" style="padding: .2rem;font-size: 18px;border-top: 5px solid rgb(247,248,250);">{{item1.symbol_deal}}{{symbol}} 账户权益:{{item1.account}}</p>
			<p v-if="item1.account>0 && index1 %2 !=0" style="padding: .2rem;font-size: 18px;border-top: 5px solid rgb(247,248,250);">{{item1.symbol_deal}}{{symbol}} 账户权益:{{item1.account}}</p>
			<div class="item"  v-for="(item,index) in item1" :key="index"  v-show="item.avg_cost">
				<div class="title">{{item1.symbol_deal}}{{symbol}}永续 
				<div v-show="!shuju" :class="{'active':item.side != 'long'}">{{item.side == 'long'?'多头':'空头'}}{{item.leverage}}x</div>
				</div>
				<div class="one">
					<div>开仓均价</div>
					<div>浮动盈亏</div>
				</div>
				<div class="two">
					<div>${{item.avg_cost}}</div>
					<div>{{item.unrealized_pnl}} USDT</div>
				</div>
				<div class="one">
					<div>预估强平价</div>
					<div>浮动收益率</div>
				</div>
				<div class="two">
					<div>${{item.liquidation_price}}</div>
					<div>{{item.profit_rate}}%</div>
				</div>
				<p class="p"></p>
				<div class="three">
					<div>未实现盈亏<span>{{item.unrealized_pnl}} USDT</span> </div>
					<div>保证金 <span>{{item.margin}} USDT</span></div>
				</div>
				<div class="three">
					<div>持仓量<span>{{item.position}} {{item1.symbol_deal}}</span> </div>
					<div>保证金率 <span>{{(item1.margin_ratio*100).toFixed(2)}}%</span></div>
				</div>
				<div class="three" style="padding-bottom: 5px;">
					<div>可平量<span>{{item.avail_position}} {{item1.symbol_deal}}</span> </div>
					<div>维持保证金率 <span>{{(item.maint_margin_ratio*100).toFixed(2)}}%</span></div>
				</div>
				<p class="p"></p>
			</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
		shuju:false,
		list:[],
		symbol:'USDT',
		bourse:'4',
		time:null
    };
  },
  created() {
	  this.bourse = this.$route.query.bourse
	  this.symbol = this.$route.query.symbol
    this.fn()
	
  },
  beforeDestroy() {
  	clearInterval(this.time)
	this.time = null
  },
   methods:{
	   fn(){
		   this.$axios
		     .post("/index/swapstrategy/get_position", {
		      symbol: this.symbol,
		      bourse: this.bourse,
		      symbol_deal:'BTC,ETH'
		     })
		     .then(res => {
		   	  this.list = res.data.data
				this.fn1()
		     })
	   },
	   fn1(){
		   this.time = setInterval(()=>{
		   		  this.$axios
		   		    .post("/index/swapstrategy/get_position", {
		   		     symbol: this.symbol,
		   		     bourse: this.bourse,
		   		     symbol_deal:'BTC,ETH'
		   		    })
		   		    .then(res => {
		   		  	  this.list = res.data.data
		   		    })
		   },10000)
	   }
   }
};
</script>

<style lang="less" scoped>
	.tophader{
		border-bottom:1px solid #EAEFFB ;
	}
	.body{
		.item{
			padding: .25rem;
			border-top: 6px solid rgb(247,248,250);
			.title{
				font-size: 17px;
				display: flex;
				border-bottom: 1px solid rgb(247,248,250);
				padding-bottom: .18rem;
				margin-bottom: 2px;
				div{
					padding: 2px;
					font-size: 13px;
					color: rgb(112,191,146);
					background-color: rgb(249,251,248);
					height: 22px;
					line-height: 22px;
					margin-left: 6px;
				}
				.active{
					color: rgb(236,118,132);
					background-color: rgb(254,248,248);
				}
			}
			.one{
				display: flex;
				div{
					flex: 1;
					color: rgb(172,172,172);
					font-size: 15px;
					margin:.12rem 0;
				}
			}
			.two{
				display: flex;
				div{
					flex: 1;
					font-size: 20px;
					margin-bottom: .1rem;
				}
			}
			.p{
				height: 1px;
				width: 100%;
				background-color: #EAEFFB;
				margin: 5px 0 9px 0;
			}
			.three{
				font-size: 14px;
				display: flex;
				color: rgb(172,172,172);
				div{
					flex: 1;
					display: flex;
					span{
						flex:1;
						display: block;
						text-align: center;
					}
				}
			}
		}
		
	}
</style>

