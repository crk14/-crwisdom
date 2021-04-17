<template>
	<div>
		<div class="tophader" >
		  <van-icon name="arrow-left"  onclick="window.history.go(-1)"/>
		  <p >{{$route.query.symboldeal.toUpperCase()}}/USDT</p>
		</div>
		<div class="body">
			<div class="left">
				<p>{{list.close}}</p>
				<span >
					<span style="font-size: 12px;">{{list.close - list.open>0?'+':''}}</span>
					{{(list.close - list.open).toFixed(2)}}</span>
				(<span style="font-size: 12px;">{{(list.close - list.open)/list.open>0?'+':''}}</span>
				{{((list.close - list.open)/list.open*100).toFixed(2)}}%</span>)
			</div>
			<div class="right">
				<p><span>24h高</span> {{list.high}}</p>
				<p><span>24h低</span> {{list.low}}</p>
				<p><span>24h量</span> {{list.amount?list.amount.toFixed(2):0}}</p>
			</div>
		</div>
		<test></test>
		<div style="width: 40px;height: 40px;position: absolute;bottom: 71px;background: transparent;left: 8px;"></div>
	</div>
</template>

<script>
	import test from "./test2.vue"
	import {
		wss
	} from '../api/ws.js'
export default {
	components: {
		test
	},
  data() {
    return {
		list:{},
		websct:{},
		symbol:this.$route.query.symboldeal
    };
  },
  created() {
	 wss(this.symbol, this.huobiwsurl, (data, wes) => {
	 	this.list = data.tick
	 	this.websct = wes
	 })
  },
  methods:{
	 
  },
  beforeDestroy() {
  	if (this.websct.onclose) {
  		this.websct.onclose()
  	}
  },
  
};
</script>

<style lang="less" scoped>
	.tophader{
		// background: #131722;
		// color: #fff;
		p{
			text-align: left;margin-left: .9rem;font-size: .41rem;
			// color: #fff;
		}
	}
	.body{
		height: 70px;
		display: flex;
		padding: 0 .3rem;
		justify-content: space-between;
		.left{
			color: rgb(240, 93, 90);
			p{
				font-size: .48rem;
				font-weight: 550;
				margin-bottom: .25rem;
			}
			span{
				font-size: .32rem;
			}
		}
		.right{
			p{
				display: flex;
				justify-content: space-between;
				line-height: 21px;
				color: #C0C0C0;
				// width: 130px;
				span{
					color: #333333;
					margin-right: 0.3rem;
				}
			}
		}
	}
</style>
