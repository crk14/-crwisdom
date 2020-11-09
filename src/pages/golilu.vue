<template>
  <div class="contirecord">
    <div class="tophader" @click="$router.back()">
      <van-icon name="arrow-left" />
      <p >购买记录</p>
    </div>
    <p class="hr"></p>
	<p v-show="bool5" style="color: #999;text-align: center;line-height: 120px;">暂无数据</p>
	<div class="item" v-for="(item,index) in list" :key="index">
		<div>
			<div>{{item.title + item.period}}天</div>
			<div class="p">购买时间: {{item.buy_time}}</div>
			<div class="p" v-show="item.redeem_time">赎回时间: {{item.redeem_time}}</div>
		</div>
		<div>
			<div style="margin-bottom: 6px;">{{item.fund_num}}份总计{{item.fund_num*item.fund_money}} {{item.currency}}</div>
			<div style="margin-top: 2px;" v-show="!item.redeem_time">剩余收益天数: {{item|time}}天</div>
			<div v-show="item.redeem_time" style="text-align: center; color: #999">赎回方式</div>
			<div v-show="item.redeem_time" style="text-align: center; color: #999">{{item.redeem_type == 1?'自动赎回':'手动赎回'}}{{item.redeem_state == 1?'(审核中)':''}}</div>
		</div>
	</div>
	<p v-show="bool5" style="color: #999;text-align: center;line-height: 40px;">暂无更多数据</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
     list:[],
	 bool5:false
    };
  },
  
  created() {
	  this.$axios
	  	.get("/index/fund/fund_record")
	  	.then(res => {
			if(res.data.code == 0){
					this.list = res.data.data.reverse()  
					if(res.data.data.length == 0){
						this.bool5 = true
					}
			}
	  		
	  	})
  },
filters:{
	time(value){
		let time = new Date()
		let num = new Date(time.toLocaleDateString().split('/').join('-')).getTime()
		let str = value.buy_time.split(' ')[0]
		let num1 = 	new Date(str).getTime()
		let time1 = (num -num1)/86400000
		console.log(time1)
		return value.period-time1
	}
},
  methods: {

    
  },
  beforeDestroy() {
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
	}
</style>
