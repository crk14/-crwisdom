<template>
	<div>
		<div class="tophader" style=" border-bottom: 8px solid #e8ecef">
		  <van-icon name="arrow-left"  onclick="window.history.go(-1)"/>
		  <p>返佣记录</p>
		</div>
		  <div class="item" v-for="(item,index) in daililist" :key="index">
				  <img class="img" :src="item.avatar" />
			  <div class="two">{{item.nick_name}}
			  <p>{{item.create_time}}</p>
			  </div>
			  <div class="three" style="color: rgb(40,60,103);font-size: 14px;flex: 1;text-align: right;">
				 {{item.money_type==1?'':'购买点卡:1400点'}}
			  <p>{{item.remark}}:{{item.money_type==1?(item.num*1).toFixed(3)+'USDT':parseInt(item.num)+'CRW'}} </p>
			  </div>
		  </div>
		
	</div>
</template>

<script>
	export default {
	  data() {
	    return {
		daililist:[],
		num:1,
	    };
	  },
	  created() {
	  this.getagent()
		let that = this
		 this.$nextTick(() => {
		       window.addEventListener("scroll",that.scroll2)
		     })
	  },
	  destroyed() {
		  console.log(888)
	  	window.removeEventListener("scroll",this.scroll2)
	  },
	  methods:{
		  getagent(){
			  this.$axios.get(`/index/welfarecenter/member_record?page=${this.num}`).then(res => {
			    if (res.data.code == 0 && res.data.info.data) {
					let arr = this.daililist.concat(res.data.info.data)
					this.daililist = arr
					this.boolnum = res.data.info.last_page
					
			    }
			  });
		  },
		  scroll2(){
			  let that = this
			  //变量scrollTop是滚动条滚动时，距离顶部的距离
			  var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
			  //变量windowHeight是可视区的高度
			  var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
			  //变量scrollHeight是滚动条的总高度
			  var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
			  //滚动条到底部的条件
			  if(scrollTop+windowHeight==scrollHeight){
			    //写后台加载数据的函数
			    console.log("距顶部"+scrollTop+"可视区高度"+windowHeight+"滚动条总高度"+scrollHeight);
			  					   that.num++
			  					   if(that.boolnum < that.num){
			  					   					   that.$toast.fail({ message: "暂无更多数据", duration: 1200 })
			  					   }
			  					   that.getagent(this.num)
			   
		  }
	  }
	  }
	};
</script>

<style lang="less" scoped>
	
		.item{
			padding: 0.2rem .17rem;
			display: flex;
			background-color: #FFFFFF;
			border-bottom: 8px solid #e8ecef;
			.img{
				width: 45px;
				height: 40px;
				border-radius:  50%  50%;
				// margin-right: .16rem;
				display: block;
				
				
			}
			.two{
				margin-left: .2rem;
				color:rgb(40,60,103) ;
				font-size: 15px;
				// flex: 1;
				p{
					margin-top: .14rem;
					color: rgb(143,145,148);
					font-size: 12px;
				}
			}
			.three{
				position: relative;
				font-size: 15px;
				color: rgb(83,93,95);
				p{
					margin-top: .1rem;
					color: rgb(40,60,103);
					font-size: 14px;
				}
				img{
					position: absolute;
					left:0px;
					top: 0px;
					height: 24px;
					width: 20px;
				}
			}
		}
</style>
