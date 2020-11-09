
<template>
	<div style="background-color: rgb(244,245,250);font-size: 14px;">
		<img class="img" src="../assets/9090.png"/>
		<div class="tophader">
		  <van-icon name="arrow-left"  color="#ffffff" onclick="window.history.go(-1)"/>
		  <p style="color: #FFFFFF;font-weight: 540;">量化收益排行榜</p>
		</div>
		<div class="title">
			<img class="ig"  :src="infouser.avatar"/>
			<div class="one">
				<div style="border-right: 1px solid rgb(237,247,255);">我的量化收益</div>
				<div >{{profit?profit:0}} USDT</div>
			</div>
			<div class="two">
				<div @click="active='a'">日榜
					<img v-show="active=='a'" src="../assets/sanjiaox.png" />
				</div>
				<div  @click="active='b'">周榜
				<img v-show="active=='b'" src="../assets/sanjiaox.png" />
				</div>
				<div  @click="active='c'">月榜
				<img v-show="active=='c'" src="../assets/sanjiaox.png" />
				</div>
			</div>
		</div>
		<div class="body">
			<!-- <div class="item" v-for="(i,index) in 10" :key="index">
				<div style="display: flex;flex: 1;"> 
					<span v-show="index>2" class="one">{{index+1}}</span>
					<img class="img" v-show="index == 0" src="../assets/10101.png" />
					<img class="img" v-show="index == 1" src="../assets/10102.png" />
					<img class="img" v-show="index == 2" src="../assets/10103.png" />
					<img class="ig"  src="../assets/911.png"/>
					<span class="two" :class="{'active':index<=2}" style="overflow: hidden; width: 50%; text-overflow: ellipsis; white-space: nowrap;">小木也</span>
				</div>
				<span class="three">9999.00 USDT</span>
			</div> -->
			<div class="item" v-for="(item,index) in list" :key="index">
				<div style="display: flex;flex: 1;"> 
					<span v-show="index>2" class="one">{{index+1}}</span>
					<img class="img" v-show="index == 0" src="../assets/10101.png" />
					<img class="img" v-show="index == 1" src="../assets/10102.png" />
					<img class="img" v-show="index == 2" src="../assets/10103.png" />
					<img class="ig"  :src="item.avatar"/>
					<span class="two" :class="{'active':index<=2}" style="overflow: hidden; width: 55%; text-overflow: ellipsis; white-space: nowrap;">{{item.nick_name}}</span>
				</div>
				<span class="three">{{item.profit.toFixed(2)}} USDT</span>
			</div>
			<p v-show="list.length == 0" style="line-height: 100px;text-align: center;color: #C0C0C0">暂无数据</p>
			<div style="height: 70px;"></div>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
		active:'a',
		list:[],
		weekrank:[],
		monthrank:[],
		todayrank:[],
		infouser:{},
		profit:''
    };
  },
  watch:{
	  active(newvalue,oldvalue){
		  console.log(newvalue)
		  if(newvalue == 'a'){
			  this.list = this.todayrank
		  }else if(newvalue == 'b'){
			  this.list = this.weekrank
		  }else if(newvalue == 'c'){
			  this.list = this.monthrank
		  }
	  }
	  },
  created() {
	  this.$axios.post("/index/member/getUserInfo").then(res => {
	  	if (res.data.code == 0) {
	  		this.infouser = res.data.info;
			this.profit = res.data.profit
	  	}
	  });
  	this.$axios
  		.get("/index/rank/get_rank")
  		.then(res => {
  			this.weekrank = res.data.data.week_rank
  			this.monthrank = res.data.data.month_rank
  			this.todayrank = res.data.data.today_rank
			this.list = res.data.data.today_rank
  		});
  	
  }
  
};
</script>

<style lang="less" scoped>
	.img{
		width: 100%;
		height: 195px;
	}
	.tophader{
		position: absolute;
		left: 0;
		top: 0;
		z-index: 100;
		width: 100%;
		background-color: transparent;
	}
	.title{
		position: absolute;
		left: 0;
		top: 46px;
		z-index: 100;
		width: 100%;
		color: #ffffff;
		.ig{
			width: 46px;
			height: 46px;
			border-radius: 50%;
			padding: 2px;
			border: 1px solid rgb(128,196,255);
			margin: 1px auto 14px;
			display: block;
		}
		.one{
			text-align: center;
			display: flex;
			justify-content: space-between;
			line-height: 16px;
			div{
				flex: 1;
			}
		}
		.two{
			display: flex;
			text-align: center;
			justify-content: space-between;
			margin-top: 8.7%;
			font-size: 14px;
			div{
				flex: 1;
				// display: flex;
				img{
					display: block;
					width: 14px;
					height: 13.5px;
					margin: 4px auto 0; 
				}
			}
		}
	}
	.body{
		min-height: 450px;
		width: 92%;
		margin: -3px auto 0;
		background-color: #fff;
		box-shadow: 1px 1px 5px rgb(128,196,255);
		z-index: 10000;
		.item{
			// padding: 13px 0;
			line-height: 50px;
			margin: 0 7px;
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid rgb(228,228,228);
			.ig{
				width: 30px;
				height: 30px;
				border-radius: 50%;
				margin:  0 10px 0 12px;
				display: block;
				margin-top: 9px;
			}
			.img{
				width: 26px;
				height: 26px;
				display: block;
				margin-top: 11px;
			}
			.one{
				width: 25px;
				text-align: center;
				color: rgb(102,102,102);
			}
			.two{
				color: rgb(154,154,154);
				font-size: 14px;
				  
			}
			.three{
				color: rgb(0,136,255);
				display: block;
			}
			.active{
				color: rgb(0,136,255);
			}
		}
	}
</style>

