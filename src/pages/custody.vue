
<template>
	<div class="body">
		<div class="title">
			<van-icon name="down" color="rgb(31,55,69)"   onclick="window.history.go(-1)"/>
			<div></div>
			<div class="ion" 	@click="$router.push('gojilu')">
				<img
				  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAgCAMAAAA2a+hwAAABg1BMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACphyELAAAAgHRSTlMARoVZxme67rKPqnFaJMnAAjJykph1yKmthydd1fMoQ6/3nDWEeiEZ7fplfF5iq5H1Uawwjr27l8KhHoxIHCIB7IZNKky/p6Nv59io72FT8IK2bRQdueNWsz+Blvb9y9o6+NQg6ynlLDM53RP7nuAKQFIxpnk3ruZm0VtFVzuQk8U/JpsAAAFgSURBVCjPfdIFU8MwFAfwQBmMMhc2Zszd2Nhwd3d3d3d/H51kaScl43/Xu7z+eu+a5CGUj9Jr0PkRO+uAs+Vj2hTAhtUAMF38Uvvg5HneNOECGa7mwT5swrWZ1xJsASHjuW/HxLKDVAlwcxynUHDdObSQJceNQAOpaqGJ8QdWqKQoY2CdiGEGjor4zsAwxWZ4e5ZLk7KBl2LyJVgjyfKm2PaV0TYCeooxBu5e3yG9usxWcK4ABHSrqmjqW9upxQGiArblUd1F6EYN5OSYbS9UEGosc3yBfXDdFp2tBj89gh2cw94pKuDQDN76ZC9phY6O4TKNinB2aVUun3MO4KXnEEIn/u0V1pV57JA8Qz7xhErRBkE8PjroK+CCQ6lUWhYR6gSzo/iyMWp26FStocH+0kkgGI0YjcZHXeDPmPw7Q58MjFH8ge+vjwpJngx0bvMTL0mCYDqVyVZLk83E77H9ArQpYIASWld3AAAAAElFTkSuQmCC"
				  alt
				/>
				购买记录
			</div>
		</div>
		<h2 class="h2">基金托管</h2>
		<div class="h4" @click="$router.push('tuog')">基金明细</div>
		<div class="div">
			<div>
				<span>托管金额</span>
				<span>{{money}}USDT</span>
			</div>
			<div>
				<span>累计收益</span>
				<span>{{sumprofit>0?sumprofit.toFixed(2):0}}USDT</span>
			</div>
		</div>
		<div class="item" v-for="(item,index) in list" :key="index" @click="$router.push('/fundxq?id='+item.id)" >
			
			<div class="right">
				<div class="one">{{item.title + item.period}}天</div>
				<div class="two">{{item.fund_money}} {{item.currency}}/份  <span><span class="span">{{item.buy_num}}</span>/{{item.publish_num}}</span></div>
				<div class="three">
					<div v-for="(value,index2) in item.traits.split('，')">{{value}}</div>
				</div>
				<div class="four">截止购买日期: {{item.close_time}}</div>
			</div>
			<div class="left">
				<div class="top">{{item.annual_rate}}</div>
				<div class="bottom">年化收益率</div>
				<div class="certer"></div>
				<button >进入</button>
			</div>
			<div class="i-t" v-show="item.closed != 0">
				截止
			</div>
			<div class="i-t" v-show="item.closed == 0" style="background-color: #1e69fa;font-size: 12px;padding-left: 8px;">
				进行中
			</div>
		</div>

		
	</div>
</template>

<script>
export default {
  data() {
    return {
		list:[],
		sumprofit:'',
		money:''
    };
  },
  created() {
  	 this.$axios
  	 	.get("/index/fund/fund_list")
  	 	.then(res => {
		this.list = res.data.data
		this.sumprofit = res.data.sum_profit
		this.money = res.data.sum_fund_money
  	 		console.log(this.list)
  	 	})
  },
 
  methods:{
  }
  
};
</script>

<style lang="less" scoped>
	.body{
	
		.title{
			padding: 0 .28rem;
			margin: .2rem 0;
			// font-size: .4rem;
			font-weight: 550;
			display: flex;
			position: relative;
			height: 18px;
			i{
				font-size: .4rem;
				position: absolute;
				left: 16px;
				top: 4px;
				transform:rotate(90deg);
			}
			div{
					flex: 1;
					text-align: center;
			}
			.ion{
				position: absolute;
				right: 18px;
				top: 0px;
				img{
					width: 20px;
					height: 20px;
				}
			}
			
		}
		.h2{
			padding: .2rem .28rem;
			color: rgb(3,33,57);
		}
		.div{
			background-color: rgb(74,121,245);
			color: #fff;
			padding: .2rem 0;
			display: flex;
			div{
				flex: 1;
				text-align: center;
			}
			span{
				display: block;
			}
			margin-bottom: .25rem;
		}
		.item{
			position: relative;
			overflow: hidden;
			display: flex;
			margin: 0 .32rem 0 .32rem ;
			padding: .12rem 0;
			padding-top: .12rem;
			padding-bottom: .4rem;
			border-bottom: 1px solid #E5E5E5;
			.left{
				width: 35%;
				position: relative;
				.top{
					margin-top: 20px;
					color: rgb(221,60,65);
					font-size: 26px;
				}
				.bottom{
					color: rgb(166,171,175);
					font-size: 14px;
				}
				.certer{
					position: absolute;
					top: 27px;
					left:-31px;
					width: 1px;
					height: 50px;
					background-color: rgb(147,151,154);
					opacity: 0.3;
				}
				button{
					    background-color: #1e69fa;
					    color: #fff;
					    height: 24px;
					    width: 56px;
					    border-radius: 5px;
					    margin-top: 30px;
						margin-left: 25px;
						line-height: 22px;
				}
			}
			.right{
				width: 65%;
				.one{
					margin-top: 18px;
					color: rgb(37,56,71);
				}
				.two{
					color: rgb(145,151,157);
					font-size: 15px;
					margin: 2.5px 0;
					.span{
						margin-left: 10px;
						color: rgb(51,74,118);
					}
				}
				.three{
					display: flex;
					div{
						background-color: rgb(245,248,254);
						padding: 1.6px 8px;
						color: rgb(51,74,118);
						margin-right: 3px;
						font-size: 14px;
					}
					margin-top: 5px;
					margin-bottom: 8px;
				}
				.four{
					color: rgb(145,151,157);
					font-size: 15px;
					margin: 2.5px 0;
				}
			}
			.i-t{
				position: absolute;
				font-size: 13px;
				width: 80px;
				height: 22px;
				line-height: 22px;
				color: #fff;
				background-color: rgb(221,60,65);
				text-align: center;
				right: -23px;
				transform:rotate(50deg)
			}
			.i-l{
				    background-color: #4a79f5;
					font-size: 12px;
			}
		}
		.h4{
			position: absolute;
			top: 56px;
			right: 21px;
			    color: #91979d;
		}
	}
</style>

