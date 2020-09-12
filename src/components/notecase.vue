<template>
  <div class="note">
    <div class="tophader">
      <p>CR量化系统</p>
    </div>
    <van-swipe :show-indicators="false" indicator-color="white">
      <van-swipe-item>
        <div class="boxall">
          <div class="box">
            <div class="boxl">
              <p class="active3">{{'点卡余额'}}</p>
              <p>
                <span class="one">{{info.point_num||0}}</span>
                <!-- $router.push('flash') stayopen-->
              </p>
			  <p style="font-size: 0.29rem;position: absolute;top:0.5rem;right: 1.2rem;" class="active3">剩余有效期(天)</p>
			  <span style="font-size: 0.38rem;position: absolute;top:1.3rem;right: 2.4rem;">{{time}}</span>
            </div>
            <!-- <div class="boxr" style="margin-top: 0.35rem;"> -->
             <!-- <div>
                <p style="padding-top:.1rem;margin-right: 0rem;" class="active3">USDT余额</p>
                <p style="margin-right: 0rem;">{{info.number||0}}</p>
              </div>
              <div >
                <p style="padding-top:.1rem;padding-left: 0rem;" class="active3">CR余额</p>
                <p style="padding-left: 0rem;">{{info.safe_num||0}}</p>
              </div> -->
			<span class="two active3" @click="$router.push('flash')" style="position: absolute;top: 105px;margin-right: 25px;right: 0;font-size: .33rem;">
			  购买点卡
			  <van-icon name="arrow" />
			</span>
            <!-- </div> -->
			
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
    <ul class="navul">
      <router-link to="/ranklist">
      <li class="curylass">
        <img src="../assets/src_assets_image_follow_trading_btn_api@2x.png" alt />
        <p>API管理</p>
      </li>
      </router-link>
      <li @click="tointetrad()">
        <img src="../assets/路径@2x.png" alt />
        <p>现货量化</p>
      </li>
	  <router-link to="/heyue">
      <li>
        <img src="../assets/src_assets_image_exchange_trading_btn_zdjy@2x.png" alt />
        <p>合约量化</p>
      </li>
	  </router-link>
	  <router-link to="/gensui">
      <li>
        <img src="../assets/组17@2x.png" alt />
        <p>跟随交易</p>
      </li>
	  </router-link>
    </ul>
<p style="width: 100%;height: 6px;background-color: rgb(227,227,227);"></p>
    <van-swipe :show-indicators="true" class="lotswipe" :autoplay="3000" indicator-color="#fff">
      <van-swipe-item v-for="(item,i) in arr" :key="i">
        <img :src="item.img" style="height:100%" alt @click="$router.push({path:'noticedateil',query:{id:item.article_id}})" />
      </van-swipe-item>
    </van-swipe>
<p style="width: 100%;height: 6px;background-color: rgb(227,227,227);"></p>
<div class="bottom">
	<span class="shu"></span>
	<p>量化收益排行榜</p>
	<div class="body">
		<div :class="{'active':active == 'a'}" @click="active = 'a'">今日</div>
		<div :class="{'active':active == 'b'}" @click="active = 'b'">本月</div>
		<div :class="{'active':active == 'c'}" @click="active = 'c'">所有</div>
	</div>
	<div class="bottom2" >
		<div v-show="active == 'a'" v-for="(item,index) in todayrank" style="font-size: 13px;" :key="item.profit">
			<img v-if="index == 0" src="../assets/1411.png" style="left: 13px;width: 21px;height: 23px;border-radius: 0;top: 12px;"/>
			<img v-if="index == 1" src="../assets/1412.png" style="left: 13px;width: 21px;height: 23px;border-radius: 0;top: 12px;"/>
			<img v-if="index == 2" src="../assets/1413.png" style="left: 13px;width: 21px;height: 23px;border-radius: 0;top: 12px;"/>
			<span v-if="index > 2" style="position: absolute;left: 12px;top: 0px;width: 20px;text-align: center;">{{index + 1}}</span>
			<img :src="item.avatar"/>
			<span style="overflow: hidden;flex: 1;text-overflow: ellipsis;white-space: nowrap">{{item.nick_name}}</span>
			<span>今日收益: <span style="color: rgb(221,113,110);"> {{item.profit.toFixed(2)}} </span> <span style="color: rgb(172,170,171);">USDT</span> </span>
		</div>
		<div v-show="active == 'b'" v-for="(item,index) in monthrank"  style="font-size: 13px;" :key="item.profit">
			<img v-if="index == 0" src="../assets/1411.png" style="left: 13px;width: 21px;height: 23px;border-radius: 0;top: 12px;"/>
			<img v-if="index == 1" src="../assets/1412.png" style="left: 13px;width: 21px;height: 23px;border-radius: 0;top: 12px;"/>
			<img v-if="index == 2" src="../assets/1413.png" style="left: 13px;width: 21px;height: 23px;border-radius: 0;top: 12px;"/>
			<span v-if="index > 2" style="position: absolute;left: 12px;top: 0px;width: 20px;text-align: center;">{{index + 1}}</span>
			<img :src="item.avatar"/>
			<span style="overflow: hidden;flex: 1;text-overflow: ellipsis;white-space: nowrap">{{item.nick_name}}</span>
			<span>本月收益: <span style="color: rgb(221,113,110);"> {{item.profit.toFixed(2)}} </span> <span style="color: rgb(172,170,171);">USDT</span> </span>
		</div>
		<div v-show="active == 'c'" v-for="(item,index) in allrank" style="font-size: 13px;" :key="item.profit">
			<img v-if="index == 0" src="../assets/1411.png" style="left: 13px;width: 21px;height: 23px;border-radius: 0;top: 12px;"/>
			<img v-if="index == 1" src="../assets/1412.png" style="left: 13px;width: 21px;height: 23px;border-radius: 0;top: 12px;"/>
			<img v-if="index == 2" src="../assets/1413.png" style="left: 13px;width: 21px;height: 23px;border-radius: 0;top: 12px;"/>
			<span v-if="index > 2" style="position: absolute;left: 12px;top: 0px;width: 20px;text-align: center;">{{index + 1}}</span>
			<img :src="item.avatar"/>
			<span style="overflow: hidden;flex: 1;text-overflow: ellipsis;white-space: nowrap">{{item.nick_name}}</span>
			<span>所有收益: <span style="color: rgb(221,113,110);"> {{item.profit.toFixed(2)}} </span> <span style="color: rgb(172,170,171);">USDT</span> </span>
		</div>
		
	</div>
</div>

  </div>
</template>

<script>
	import Vue from 'vue'
	import { Dialog } from 'vant';
		Vue.use(Dialog);
	export default {
		components:{Dialog},
  data() {
    return {
      mygao: {},
      title:[],
      info:{},
      arr:[],
	  time:'',
	  active:'b',
	  allrank:[],
	  monthrank:[],
	  todayrank:[],
	  matterplay:true,
	  isshow:false
    };
  },
  created() {
       this.$axios
      .get("/index/article/newsBannerArt")
      .then(res => {
        this.arr = res.data.info;
      });

      this.$axios
      .get("/index/rank/get_rank")
      .then(res => {
		  this.allrank = res.data.data.all_rank
		  this.monthrank = res.data.data.month_rank
		  this.todayrank = res.data.data.today_rank
      });


      this.$axios
      .get("/index/mywallet/mywalletInfo", { page: 1, limit: 1 })
      .then(res => {
        if(res.data.info){
          this.info = res.data.info;
		  var timestamp = Date.parse(new Date())/1000;
		  if(this.info.start_time){
			  let time = parseInt((timestamp -this.info.start_time)/60/60/24)
			    this.time = 150 - time
			  }else{
			  console.log(this.info.start_time,this.info.point_num)
			  if(this.info.point_num>0){
				  let time = parseInt((timestamp -this.info.start_time)/60/60/24)
				  this.time = 150 - time
			  }else{
				  this.time = 0
			  }
		  }
		  }
		 
      });
	  // this.$axios
	  // .get("/index/spotstrategy/decide")
	  // .then(res => {
	  // 		 if(res.data.code == 0){
			// 	 this.isshow = true
			//  }
	  // });
  },

  methods: {
    stayopen() {
      this.$toast.fail({ message: "等待开放", duration: 1200 });
    },
	tointetrad(){
		this.$router.push('/intetrading2')
		// if(this.isshow){
		// 	this.$router.push('/intetrading2')
		// }else{
		// 	Dialog.confirm({
		// 	  	  title: '提醒',
		// 	  	  message: '是否进入新系统<p>(点击取消进入原系统,点击确认进入新系统)</p>',
		// 	  	}) .then(() => {
		// 			this.$router.push('/intetrading2')
		// 		})
		// 		.catch(() => {
		// 			this.$router.push('/intetrading')
		// 		});
		// }
		
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
        padding-left: 0.9rem;
		margin-top: 10px;
      }
      p:nth-of-type(1) {
        font-size: 0.29rem;
        padding-top: 0.5rem;
      }
      p:nth-of-type(2) {
        // margin-top: 0.1rem;
        margin-bottom: 0.1rem;
        display: flex;
        justify-content: space-between;
        padding-right: 0.3rem;
      }
      .one {
        font-size: 0.38rem;
      }
      .two {
        font-size: 0.29rem;
        margin-top: 0.12rem;
		margin-right: 0.3rem;
        i {
          position: relative;
          top: 0.03rem;
        }
      }
      p:nth-of-type(3) {
        font-size: 0.78rem;
      }
    }
  }
}
.navul {
  font-size: 0.24rem;
  display: flex;
  justify-content: space-between;
  padding: 1% 8%;
  margin: 0.3rem 0;
  background: #fff;
  li {
    color: #333333;
    text-align: center;
  }
  img {
    width: 0.5rem;
    position: relative;
    top: 0.15rem;
    // margin-right: 0.2rem;
    margin-bottom: 0.1rem;
  }
}
.sanl {
  margin-top: -0.1rem;
}

.note .van-swipe {
  margin-top: 0;
  // height: 4.2rem;
}
.note .van-swipe .box {
  background: url("../assets/911.png") no-repeat;
  border-radius: 10px;
  background-size: 100%;
  height: 140px;
  // display: flex;
  // justify-content: space-between;
}
.note .van-swipe .boxall {
  // background: #3c8cff;
  padding: 0 0.3rem 0.1rem;
}
.navul {
  margin: 0rem 0 0.3rem;
}
.boxr {
  display: flex;
  position: relative;
  top: .1rem;
  p{
    width:2.4rem;
    font-size: 0.3rem;
  }
}
.note .boxr img {
  width: 0.39rem;
  margin-top: 0.15rem;
  position: absolute;
  height: 0.27rem;
  right: 0.3rem;
}

.lotswipe {
  height: 1.16rem;
  margin: 0.1rem auto !important;
  .van-swipe__indicators {
    bottom: 0.2rem;
  }
}
.lastnews {
  display: flex;
  padding: 0.3rem;
  justify-content: space-between;
  font-weight: bold;
  margin-top: .2rem;
  .onew {
    color: #020202;
    font-size: 0.36rem;
  }
  .more {
    color: #bababa;
    font-size: 0.24rem;
    font-weight: normal;
    i {
      color: #bababa;
      position: relative;
      top: 0.02rem;
      left: 0.05rem;
    }
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
  border-bottom: 1px solid #f7f7f7;
  padding-bottom: 0.2rem;
  margin-bottom: 0.2rem;
  p {
    font-size: 0.28rem;
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
    p {
          font-size: 0.24rem;
    line-height: 0.35rem;
    }
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
    margin-top: 0.1rem;
    span {
      border: 1px solid #7484e2;
      color: #7484e2;
      font-size: 0.14rem;
      padding: 0 0.1rem;
      margin-right: 0.1rem;
    }
  }
}
// .active3{
// 	color: #90A4CD;
// }
.bottom{
	background: rgb(247,246,247);
	min-height: 5rem;
	position: relative;
	.shu{
		position: absolute;
		left: 12px;
		top: 9px;
		width: 3px;
		height: 17px;
		background-color: #2167ff;
	}
	p{
		font-weight: 550;
		padding: 6px 0 0px 20px;
	}
	.body{
		display: flex;
		margin-top: 8px;
		div{
			font-size: 15px;
			flex: 1;
			margin: 0 11%;
			margin-bottom: 10px;
			text-align: center;
		}
		.active{
			color: #2167ff;
			border-bottom: 1px solid #2167ff;
			font-weight: 550;
		}
	}
	.bottom2{
		background-color: rgb(227,227,227);
		padding:.1rem;
		min-height: 4rem;
		margin-bottom: 50px;
		div{
			background: rgb(247,246,247);
			display: flex;
			justify-content: space-between;
			padding: 0 .14rem 0 1.6rem;
			height: 45px;
			line-height: 45px;
			border-radius: 4px;
			position: relative;
			font-size: 15px;
			margin-bottom: 6px;
			img{
				position: absolute;
				left: 42px;
				top: 9px;
				height: 28px;
				width: 28px;
				border-radius: 50%;
			}
		}
	}
}
.popop{
	width: 3rem;
	height: 3rem;
}
</style>
