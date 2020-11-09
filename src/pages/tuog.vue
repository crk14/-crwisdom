<template>
  <div class="contirecord">
    <div class="tophader" @click="$router.back()">
      <van-icon name="arrow-left" />
      <p >基金明细</p>
    </div>
	<div v-for="(item,index) in newlist" :key="index">
	<div class="div">
		<div>
			<span>{{item.title + item.period}}天</span>
		</div>
		<div>
			<span>倒计时</span>
			<span> {{item|time}}天</span>
		</div>
		<div @click="fn(item.id)" style="opacity: .8;font-size: 14px;margin-top: 2px;display: flex;"><span style="margin-left: 34%;">赎回</span><img src="../assets/youjian.png"  style="width: 15px;height: 14px;margin-left: 2px;margin-top: 3px;display: block;"/></div>
		
	</div>
	<div class="div" style="padding: 0 0 .2rem 0">
		
		<div style="text-align: left;margin-left: 5%;">
			<span>托管基金</span>
			<span> {{item.sum_fund_money}} USDT</span>
		</div>
		<div>
			<span>累计收益</span>
			
			<span> {{item.sum_profit.toFixed(2)}}USDT</span>
		</div>
	</div>
	<p class="hr" style="background-color: #FFFFFF;"></p>
	</div>
	<p class="hr"></p>
	<div class="item" v-for="(item,index) in list" :key="'item'+index">
		<div>
			<div>{{item.title + item.period}}天</div>
			<div class="p">时间：{{item.create_time}}</div>
		</div>
		<div>
			<div>托管基金 {{item.fund_num*item.fund_money}} {{item.currency}}</div>
			<div style="margin-top: 4px;">今日收益 <span>{{item.profit}}</span> USDT</div>
		</div>
	</div>
	<p v-show="!bool" style="color: #999;text-align: center;line-height: 40px;">暂无更多数据</p>
  </div>
</template>

<script>
	import Vue from "vue";
	import { Dialog} from "vant";
	Vue.use(Dialog);
export default {
  data() {
    return {
     time:'',
	 list:[],
	 newlist:[],
	 page:1,
	 bool:true
    };
  },
  
  created() {
	 this.details()
	 this.position()
  },
  mounted() {
  	window.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
	fn(id){
		Dialog.confirm({
		  title: "赎回须知",
		  message: "是否提前赎回基金?<p>提前赎回需扣除5%手续费<p>",
		}).then(() => {
		  this.$axios
		  	.post("/index/fund/redeem",{id})
		  	.then(res => {
		  		if(res.data.code == 0){
		  			this.$toast.success({
		  				message: '提交成功,待审核',
		  				duration: 3200
		  			})
		  			this.details()
					this.position()
		  		}else{
		  			this.$toast.fail({
		  				message: res.data.data,
		  				duration: 3200
		  			});
		  		}
		  	})
		});
		
	},
	handleScroll() {
		var scrollTop =
			document.documentElement.scrollTop || document.body.scrollTop; //变量windowHeight是可视区的高度
		var windowHeight =
			document.documentElement.clientHeight || document.body.clientHeight; //变量scrollHeight是滚动条的总高度
		var scrollHeight =
			document.documentElement.scrollHeight || document.body.scrollHeight;
			console.log(scrollTop + windowHeight,scrollHeight)
		if (scrollTop + windowHeight >= scrollHeight-10 ) {
			console.log(this.bool)
			if(this.bool){
				this.page++;
				this.details()
			}
				
		}
	},
	details(){
		this.bool = false
		this.$axios
			.post("/index/fund/fund_profit_details",{page:this.page})
			.then(res => {
				this.bool = true
				if(res.data.code == 0){
					this.list = [...this.list,...res.data.data]
				}
				 if(res.data.data.length < 20){
					 this.bool = false
				 }
			})
		},
		position(){
			this.$axios
				.post("/index/fund/fund_position")
				.then(res => {
					if(res.data.code == 0){
							this.newlist = res.data.fund_list
					}
					 
				})
		}
  },
  
  beforeDestroy() {
  	window.removeEventListener("scroll", this.handleScroll, true);
  },
  filters:{
  	time(value){
  		let time = new Date()
  		let num = new Date(time.toLocaleDateString().split('/').join('-')).getTime()
  		let str = value.buy_time.split(' ')[0]
  		let num1 = 	new Date(str).getTime()
		let time1 = (num -num1)/86400000
  		return value.period-time1
  	}
  }
  
};
</script>
<style lang="less" scoped>
	
	.item{
		display: flex;
		justify-content: space-between;
		font-size: 0.28rem;
		background: #fff;
		padding: .25rem 0;
		margin: 0 .25rem;
		border-bottom: 1px solid #ebedf0f2;
		.p{
			    color: #999;
			    font-size: .24rem;
				margin-top: 5px;
		}
		span{
			color: rgb(255, 0, 0)
		}
	}
	.div{
		font-size: 13px;
		background-color: rgb(74,121,245);
		color: #fff;
		padding: .2rem 0;
		display: flex;
		div{
			flex: 1;
			text-align: center;
		}
		
		// margin-bottom: .25rem;
	}
</style>
