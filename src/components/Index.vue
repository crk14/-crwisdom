<template>
  <div class="index">
	  <div style="display: flex;justify-content: space-between;">
		  <div class="tophader" onclick="window.history.go(-1)">
		    <p style="margin-left: .2rem;">
		      <img src="../assets/title2.png" alt />
		    </p>
		  </div>
		  <div class="index-img">
			  <!-- <img style="width: .7rem;height: .7rem;" src="../assets/yuyan.png"/> -->
			  <img @click="$router.push('callcenter')" src="../assets/kefu.png" style="margin-bottom: 4px;margin-left: 6px;"/> </div>
	  </div>
    
    <van-swipe :show-indicators="false" :autoplay="4000" indicator-color="white">
      <van-swipe-item v-for="(item,i) in info" :key="i">
        <div class="boxall">
          <div class="box" style="height: 140px;">
            <img :src="url + item.pic" alt style="height: 100%;"/>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>

    <div class="gonite">
      <img src="../assets/msgt.png" alt />

      <div class="gobox" style="height: .4rem;
    width: 84%;
    overflow: hidden;">
        <marquee color="#333" background="none" class="vanbar" v-if="list.length>0">
          <span @click="$router.push('noticedateil?id='+list[0].article_id)">{{list[0].title}}</span>
        </marquee>
		
      </div>
	  <div @click="$router.push('more')" style="font-size: 14px;color: rgb(155,155,155);">
	    更多
	    </div>
    </div>
    <!-- <div class="trading"> -->
      <!-- <div v-if="img.aotu_market" class="left" :style="{background:'url('+img.aotu_market+')',backgroundSize: '100% 100%'}"> -->
        <!-- <p class="one">智能交易</p>
        <p class="two">年化月均回报率5%-15%</p>-->
      <!-- </div> -->
      <!-- <div class="right" @click="$router.push('fund')" :style="{background:'url('+img.cr_fund+') 0% 0% / 100% 100%'}"> -->
	  <!-- <div class="right" :style="{background:'url('+img.cr_fund+') 0% 0% / 100% 100%'}"> -->
        <!-- <img src="../assets/组16@2x.png" alt />
        <span>CR基金</span> -->
      <!-- </div> -->
    <!-- </div> -->
    <!-- <div class="trading tradingtwo" style="padding-bottom:.15rem;"> -->
      <!-- <div v-if="img.follow_market" class="left" :style="{background:'url('+img.follow_market+')',backgroundSize: '100% 100%'}"></div> -->
      <!-- <div class="right" :style="{background:'url('+img.game+') 0% 0% / 100% 100%'}"> -->
        <!-- <img src="../assets/组14@2x.png" alt />
        <span>互动游戏</span> -->
      <!-- </div> -->
    <!-- </div> -->
	<p class="hr" style="height: 1px;margin: 0 20px;background-color: #F5F5F5;"></p>
	
	<div class="index-body">
		<div class="item">
			<div>USDT汇率</div>
			<p v-show="movielist.number">{{6.5}}</p>
			<!-- <p class="one">≈65088.58 CNY</p> -->
			<!-- <p><span>余额</span></p> -->
		</div>
		<div class="item">
			<div>CRW账户</div>
			<p v-show="movielist.safe_num">{{Number(movielist.safe_num).toFixed(2) }}</p>
			<!-- <p class="one">=227.96 CNY</p> -->
			<!-- <p><span>余额</span></p> -->
		</div>
		<div class="item" :class="{'active':isshow}">
			<div>点卡账户</div>
			<p v-show="movielist.point_num">{{Number(movielist.point_num).toFixed(2)}} </p>
			<!-- <p class="one">=16.28 CNY</p> -->
			<!-- <p><span>即将不足</span></p> -->
		</div>
	</div>
	<p class="hr" style="height: 6px;"></p>
	<div style="display: flex;width: 100%;" v-if="img && img.cr_index">
		<div style="width: 60%;height: 2.5rem;"><img :src="url + img.cr_index" style="width: 100%;height: 2.5rem;"/></div>
		<div style="width: 40%;height: 2.5rem;border-left: 6px solid #f6f7f9;">
			<div style="width: 100%;text-align: center;height: 47%;position: relative;"><img @click="$router.push('fenxiang')" :src="url + img.cr_share" style="width: 100%;height:100%;"/></div>
			<p class="hr" style="height: 6%;"></p>
			<div style="width: 100%;text-align: center;height: 47%;position: relative;"><img @click="$router.push({path:'more',query:{type:1}})" :src="url + img.cr_welfare" style="width: 100%;height:100%;"/></div>
		</div>
	</div>
	<!-- <p class="hr" style="height: 6px;"></p> -->
    <p class="hr"></p>
	<div class="bootom">
		<div class="body" style="font-size: 0.26rem;padding: .14rem 10%;">
			<div>名称</div>
			<div>最新价</div>
			<div>涨跌幅</div>
		</div>
		<div v-show="isshow2" class="body" v-for="(item,index) in list4" style="padding: 0.19rem 0.17rem 0.17rem 0.19rem;" :key="index">
			<img  v-show="item.symbol == 'BTC'" class="index-img1" src="../assets/btc.png"/>
			<img  v-show="item.symbol == 'ETH'" class="index-img1" src="../assets/eth.png"/>
			<img  v-show="item.symbol == 'ZEC'" class="index-img1" src="../assets/zec.png"/>
			<img  v-show="item.symbol == 'HT'" class="index-img1" src="../assets/HT2.png"/>
			<img  v-show="item.symbol == 'XRP'" class="index-img1" src="../assets/xrp.png"/>
			<img  v-show="item.symbol == 'LTC'" class="index-img1" src="../assets/ltc.png"/>
			<img  v-show="item.symbol == 'BCH'" class="index-img1" src="../assets/bch.png"/>
			<div class="one" style="flex: 1;">{{item.symbol}}<span style="color: #999999;font-size: 13px;">/USDT</span><p>24H量 {{parseInt(item.amount)}}</p> </div>
			<div class="two" style="flex: 1;" :class="{'active1':item.up_or_down<0}">{{item.close}} <p>≈{{(item.close*7).toFixed(1)}}CNY</p></div>
			<div v-show="item.up_or_down<0" class="three active" >{{item.up_or_down.toFixed(2)}}%</div>
			<div v-show="item.up_or_down>0" class="three" style="display: flex;"><div style="font-size: 12px;margin-left: 5px;height: 27px;line-height: 27px;">+</div> <span style="">{{item.up_or_down.toFixed(2)}}%</span> </div>
		</div>
	</div>
	
	
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: [],
      list: [],
      list1:[],
      mygao: [],
      title: "",
      img:{},
      arr:[],
      newlink:'',
	  isshow:true,
	  isshow2:true,
	  movielist:{},
	  // bidui:false,
	  list3:[],
	  list4:[],
	  time:'',
	  url:''
    };
  },
  created() {
	  const env = process.env.NODE_ENV;
	  if(env==='production'){  // 生产环境
	  }else{  // 本地环境
	  this.url = 'http://192.168.0.102'
	  }
    this.$axios
      .get("/index/article/aotuMarketImg")
      .then(res => {
        this.img = res.data.info;
      });
    this.$axios
      .get("/index/article/image", { page: 1, limit: 10 })
      .then(res => {
        this.info = res.data.info;
      });

    this.$axios
      .get("/index/article/newArt", { page: 1, limit: 1 })
      .then(res => {
        this.list = res.data.info;
      });
    this.$axios
      .get("/index/article/indexArt", { page: 1, limit: 10 })
      .then(res => {
        this.mygao = res.data.info;
      });
	  this.$axios
	  .get("/index/mywallet/mywalletInfo", { page: 1, limit: 1 })
	  .then(res => {
	    if(res.data.info){
	      this.movielist = res.data.info
		}
	  		 
	  });
	  this.$axios
	  .get("/index/rank/get_market")
	  .then(res => {
		  if(res){
			  this.list4 = res.data.data
			  this.fn1()
		  }
	  		
	  });
	
	
  },
  updated() {},
  beforeDestroy() {
  	clearInterval(this.time)
	this.time = null
  },
  mounted: function() {},
  methods: {
	  fn1(){
		  this.time = setInterval(()=>{
		  		  this.$axios
		  		  .get("/index/rank/get_market")
		  		  .then(res => {
		  		   // console.log(res.data.data)
		  		  		this.list4 = res.data.data
		  		  });
		  },10000)
		   this.$once('hook:beforeDestroy',()=>{
		          clearInterval(this.time);
		         this.time = null;
		        })
		  localStorage.setItem('time',JSON.stringify( this.time))
	  },
	  fn3(bool){
	  		  if(bool){
	  			  this.$toast.fail({ message: '该功能呢暂未开放,敬请期待', duration: 1200 });
	  		  }else{
	  			  this.$toast.fail({ message: '钱包维护中,请联系客服', duration: 1200 });
	  		  }
	  },
    linkmore(){
      location.href=this.newlink;
    }
  }
};
</script>

<style lang="less" scoped>
.note {
  overflow: hidden;
  .van-swipe {
    margin: auto;
    margin-top: 0.2rem;
    height: 3rem;
    .boxall {
      padding: 0 4%;
      height: 100%;
    }
    .box {
      // border-radius: 6px;
      color: white;
      height: 100%;
      // background: #78aef9;
      // box-shadow: 0 0 10px #78aef9;
    }
    .van-swipe-item {
      p {
        padding-left: 0.3rem;
      }
      p:nth-of-type(1) {
        font-size: 0.5rem;
        padding-top: 0.6rem;
      }
      p:nth-of-type(2) {
        font-size: 0.32rem;
        margin-top: 0.55rem;
        margin-bottom: 0.1rem;
      }
      p:nth-of-type(3) {
        font-size: 0.78rem;
      }
    }
  }
}
.note .van-swipe {
  margin-top: 0;
  height: 3.18rem;
}
.note .van-swipe .box {
  display: flex;
  justify-content: space-between;
}
.note .van-swipe .boxall {
  padding: 0rem;
}

.tophader {
  img {
    position: unset;
        height: 0.4rem;
    width: auto;
    margin-top: 0.3rem;
  }
}
.gonite {
  padding: 0.1rem 0.3rem;
  height: 0.4rem;
  overflow: hidden;
  display: flex;
  .gobox {
    display: flex;
  }
  span {
    color: #333333;
    margin-right: 2rem;
    font-size: .25rem;
    font-weight: bold;
  }
  img {
    height: 0.22rem;
    position: relative;
    margin-right: 0.2rem;
    top: 50%;
    margin-top: -0.11rem;
  }
  .vanbar {
    width: 100%;
    height: 100%;
    line-height: 0.4rem;
    padding: 0;
    font-size: 0.24rem;
  }
}
.trading {
  display: flex;
  justify-content: space-between;
  background: #f6f7f9;
  padding-top: 0.15rem;
  .left {
    width: 59%;
    background: url("../assets/title1.png") no-repeat;
    background-size: 100%;
    height: 1.4rem;
  }
  .right {
    width: 39%;
    line-height: 1.4rem;
    img {
      width: 0.37rem;
      margin: 0 0.3rem 0;
      position: relative;
      top: 0.05rem;
    }
    span {
      font-size: 0.3rem;
      font-weight: bold;
    }
  }
  .one {
    font-size: 0.3rem;
    padding: 0.3rem 0.3rem 0.1rem;
  }
  .two {
    font-size: 0.24rem;
    color: #999999;
    padding-left: 0.3rem;
  }
  div {
    background: #fff;
  }
}
.tradingtwo {
  .left {
    background: url("../assets/ssmal.png") no-repeat;
    background-size: 100%;
  }
}
.lastnews {
  display: flex;
  padding: 0.3rem;
  justify-content: space-between;
  .onew {
    color: #020202;
    font-size: 0.3rem;
    position: relative;
    top: 0.05rem;
    font-weight: bold;
    img {
      width: 0.76rem;
      height: auto;
      position: relative;
      top: 0.02rem;
    }
  }
  .gobox {
    font-size: 0.24rem;
    line-height: 0.4rem;
    position: relative;
    top: .05rem;
  }
  .more {
    color: #bababa;
    font-size: 0.24rem;
    img {
      width: 0.2rem;
      height: 0.4rem;
      position: relative;
      top: 0.02rem;
    }
    i {
      position: relative;
      font-size: 0.3rem;
      top: 0.06rem;
    }
  }
}
.imgbox {
  padding: 0.2rem 0.3rem;
  img {
    width: 100%;
  }
}
.nestli {
  margin-bottom: .2rem;
}
.nestli:last-child{
  padding-bottom: 1rem;
}
.newtest {
  display: flex;
  justify-content: space-between;
  width: 94%;
  margin: auto;
  // border-bottom: 1px solid #f6f7f9;
  padding-bottom: 0.2rem;
  margin-bottom: 0.2rem;
  border-bottom: 1px solid #f7f7f7;
  p {
    font-size: 0.24rem;
    line-height: 0.35rem;
  }
  div {
    padding: 0.1rem;
  }
  .left {
    width: 55%;
    position: relative;
  }
  .right {
    width: 34%;
    background: url("../assets/news.png") no-repeat;
    background-size: 100% 100%;
    color: #fff;
    display: flex;
    height: 1.32rem;
  }
  .spanr {
    width: 0.06rem;
    height: 0.65rem;
    background: #fff;
    position: relative;
    top: 50%;
    margin: -0.325rem 0.2rem 0;
  }
  .gao {
    font-size: 0.24rem;
    color: #bababa;
    // margin-top: 0.1rem;
    line-height: 0.4rem;
    span {
          width: 100%;
      color: #000;
      font-size: 0.28rem;
      margin-right: 0.1rem;
      padding-bottom: .12rem;
      position: relative;
    }
  }
}

.goboxend{
  span{
      margin-right: .6rem;
      color: #333;
      font-size: .25rem;
      font-weight: bold;
  }
}
.index-icon{
	// padding: 0.2rem 0.3rem;
	display: flex;
	padding: .2rem  1%;
	div{
		// width: 20%;
		flex: 1;
		height: .87rem;
		text-align: center;
		img{
			width: 20px;
			height: 23px;
		}
		p{
			margin-top: 2px;
			font-size: 12px;
			color: #000000;
		}
	}
	
	// justify-content: space-between;
	// .item{
	// 	width: .85rem;
	// 	height: .85rem;
	// 	border-radius: 50%;
	// 	background-color: #000;
	// 	text-align: center;
	// 	img{
	// 		width: 0.55rem;
	// 		height: .55rem;
	// 		margin-top: .14rem;
	// 	}
	// 	margin: 0 0 .14rem .155rem;
	// }
	// .text{
	// 	font-size: 0.28rem;
	// }
}
.index-img{
	margin-top: 6px;
	img{
		width: .35rem;
		height: .35rem;
		margin-right: .4rem;
		margin-top: .2rem;
	}
}
.index-body{
	padding: .24rem .24rem;
	display: flex;
	// justify-content: space-between;
	
	.item{
		flex: 1;
		text-align: center;
		div{
			font-size: 0.28rem;
			color: #16181A;
		}
		p{
			color: #25a67e;
			font-size: .35rem;
			span{
				font-size: 12px;
				background-color: rgb(188,218,252);
				padding: .05rem .09rem;
			}
			margin: .1rem 0;
		}
		.one{
			// width: 50%;
			// margin-left: 25%;
			font-size: 15px;
			// background-color: #FCEDE1;
			color: #000000;
		}
	}
	.active{
		p{
			color: #25a67e;
			span{
				// font-size: 13px;
				background-color: rgb(252,222,224);
			}
		}
	}
}
	
.bootom{
	padding-left: .2rem;
	padding-right: .2rem;
	margin-bottom: 60px;
	.title{
		font-weight: bold;
		display: flex;
		padding:.2rem 0;
		position: relative;
		.active{
			border-bottom: 2px solid rgb(38,136,251);
		}
		img{
			width: 16px;
			height: 16px;
			position: absolute;
			right: 13px;
			top: 13px;
		}
	}
	.body{
		display: flex;
		justify-content: space-between;
		color: rgb(96,94,95);
		padding: .14rem .3rem .14rem .1rem;
		border-bottom: 1.3px solid #EEEEEE;
		.one{
			font-size: 15.5px;
			color: #000000;
			// font-weight: 550;
			p{
				font-size: 12px;
				font-weight: 540;
				color: rgb(169,167,168);
				margin-top: 4px;
			}
		}
		.two{
			color: rgb(37,166,126);
			// font-weight: 550;
			p{
				font-weight: 540;
				font-size: 12px;
				color: rgb(169,167,168);
				margin-top: 4px;
			}
		}
		.three{
			color: #FFFFFF;
			background-color: rgb(0,191,137);
			margin-top: 5px;
			height: 27px;
			width: 52px;
			line-height: 27px;
			text-align: center;
			font-size: 13px;
		}
		.active{
			color: #FFFFFF;
			background-color: rgb(255,120,88)
			
		}
		.active1{
			color: rgb(255,120,88);
			
		}
	}
}
.poup {
  p {
    border-bottom: 1px solid #e5e5e5;
  }
 
}
.poup-title{
	display: flex;
	position: relative;
	padding: .2rem;
	border-bottom: 4px solid #E5E5E5;
	div{
		margin-left: .4rem;
	}
	.item{
		color: rgb(34, 132, 253);
		margin-left: .7rem;
		font-size: 15px;
	}
	.about{
		background-color: rgb(34, 132, 253);
		width: 3px;
		height: 17px;
		position: absolute;
		left: 0px;
		top: 12px;
	}
	}
	.poup-body{
		width: 100%;
		display: flex;
		padding: .2rem;
		border-bottom: 1px solid #E5E5E5;
		span{
			flex: 1;
			font-size: 16px;
			text-align: center;
		}
	}
	.poup .li-item{
		display: flex;
		font-size: 16px;
		padding: 0.3rem;
		    border-bottom: 1px solid #e5e5e5;
		div{
			flex: 1;
			font-weight: 500;
			text-align: center;
			// padding-left: .2rem;
		}
		
	}
	.index-img1{
	    width: 24px;
	    height: 24px;
	    display: block;
	    margin-right: 9px;
	    margin-top: 0px;
	}
</style>
