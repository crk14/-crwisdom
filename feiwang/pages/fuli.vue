<template>
	<div>
		<div class="tophader">
		  <van-icon name="arrow-left"  onclick="window.history.go(-1)"/>
		  <p>福利中心</p>
			<span style="position: absolute;right: .15rem;top: 0;color: #909090;">规则说明</span>
		</div>
		<div class="fuli-body">
			<img v-show="activeName=='a'" src="../assets/1102.png" class="body-img"/>
			<img v-show="activeName=='b'" src="../assets/1103.png" class="body-img"/>
			<img v-show="activeName=='c'" src="../assets/1101.png" class="body-img"/>
			<div class="title" style="left: .6rem;top: 1.4rem;">{{activeName == 'a'?'会员账户':activeName == 'b'?'代理账户':'分红账户'}} ({{activeName == 'c'?'权益':'累计总额'}})</div>
			<div v-show="activeName!='c'" class="title" style="left: .6rem;top: 2.16rem;font-size: .52rem;"><span style="font-size: .57rem;" >{{activeName == 'a'?memberaccount.toFixed(2) + ' CRW':agentcount.toFixed(2) + ' CRW'}} </span></div>
			<div v-show="activeName =='c'" class="title" style="left: .6rem;top: 1.9rem;font-size: .42rem;"><span style="font-size: .57rem;">0 </span></div>
			<div v-show="activeName!='c'" class="title" style="left: 5.3rem;top: 3.1rem;color: #000000;width: 81px;text-align: center;">{{activeName == 'a'?'普通会员':infouser.is_need == 2?infouser.level_name:''}}</div>
		<div v-show="activeName=='c'" class="title" style="left: 5.2rem;top: 3.1rem;color: #000000;width: 81px;text-align: center;">{{infouser.is_need == 2?infouser.level_name:''}}</div>
			<div v-show="activeName=='c'">
				<div class="title" style="left: .6rem;top: 2.7rem;font-size: 15px;">累计分红福利</div>
				<div class="title" style="left: .6rem;top: 3.2rem;font-size: 15px;">0CRW</div>
				<div class="title" style="left: 3.1rem;top: 2.7rem;font-size: 15px;">分红余额</div>
				<div class="title" style="left: 3.1rem;top: 3.2rem;font-size: 15px;">0CRW</div>
				<div class="title" style="left: 4.7rem;top: 2.7rem;display: flex;font-size: 15px;">划转 <img src="../assets/208.png" style="width: 13px;height: 13px;margin-top: 4px;margin-left: 2px;"/></div>
			</div>
		</div>
		
		
		<van-tabs v-model="activeName" color="#124cfb">
		  <van-tab title="会员福利" name="a">
			  <div class="page-fuli">
				  <div class="title1">
					  <span>我的邀请 : {{invite.invite_num}}</span>
					  <span>社区用户 : {{invite.team_num}}</span>
					  <span>返佣记录</span>
				  </div>
				  <div class="item" v-for="(item,index) in huiyuanlish" :key="index">
						  <img class="img" :src="item.avatar" />
					  <div class="two" style="margin-left:2px;flex: inherit;width: 56%;">{{item.nick_name}}-{{item.mobile}}
					  <p style="margin-top: .1rem;">注册时间：{{item.register_time}}</p>
					  </div>
					  <div class="three" >
						  <img v-if="item.is_need ==2" src="../assets/111.png"/>
						  <img v-if="item.is_need ==1" src="../assets/301.png"/>
						  <span style="margin-left: 22px;">{{item.is_need == 1?'注册会员':'普通会员'}}</span>
					  <p style="font-size: 13px;">业绩: {{item.achieve}}点</p>
					  </div>
				  </div>
			  </div>
		  </van-tab>
		  <van-tab title="代理福利" name="b">
			  <div class="page-fuli">
			  				  <div class="title1" >
			  					  <span>我的邀请 : {{invite.invite_num}}</span>
			  					  <span>社区用户 : {{invite.team_num}}</span>
			  				  </div>
			  				  <div class="item" v-for="(item,index) in daililist" :key="index">
			  						  <img class="img" :src="item.avatar" />
			  					  <div class="two">{{item.nick_name}}
			  					  <p>{{item.create_time}}</p>
			  					  </div>
			  					  <div class="three" style="color: rgb(40,60,103);font-size: 14px;flex: 1;">
			  						 消费点卡：{{parseInt(item.trans_num)}}点
			  					  <p>代理提成：{{parseInt(item.num)}} CRW</p>
			  					  </div>
			  				  </div>
			  </div>
		  </van-tab>
		  <van-tab title="分红福利" name="c">
			  <div class="page-fuli">
			  				  <div class="title1" >
			  					  <span style="flex: 1;text-align: center;color: rgb(0,75,255);">分红账单</span>
			  					  <span style="flex: 1;text-align: center;">划转记录</span>
			  				  </div>
			  				 <!-- <div class="item">
			  						  <img class="img" src="../assets/204.png" style="width: 38px;height: 40px;border-radius: 0;"/>
			  					  <div class="two">当次分红值：100
			  					  <p>2020-3-12 9:44:45</p>
			  					  </div>
			  					  <div class="three" style="color: rgb(40,60,103);">
			  						 分红金额
			  					  <p>200CRW</p>
			  					  </div>
			  				  </div> -->
			  </div>
		  </van-tab>
		</van-tabs>
	</div>
</template>

<script>
	export default {
	  data() {
	    return {
	    activeName: 'a',
		daililist:[],
		agentcount:'',
		invite:{},
		num:1,
		boolnum:0,
		huiyuanlish:[],
		memberaccount:0,
		infouser:''
	    };
	  },
	  created() {
	  this.getagent()
		this.$axios.get("/index/welfarecenter/invite_team").then(res => {
		  if (res.data.code == 0) {
			  this.invite = res.data
			  // this.daililist = res.data.info
		  }
		});
		this.$axios.get("/index/welfarecenter/agent_account").then(res => {
		  if (res.data.code == 0) {
			  this.agentcount = res.data.agent_account
			  // this.daililist = res.data.info
		  }
		});
		this.$axios.get("/index/welfarecenter/member").then(res => {
		  if (res.data.code == 0) {
			  this.huiyuanlish = res.data.info
		  }
		});
		this.$axios.get("/index/welfarecenter/member_account").then(res => {
		  if (res.data.code == 0) {
			  this.memberaccount = res.data.member_account
		  }
		});
		let that = this
		 this.$nextTick(() => {
		       // this.initScroll()
		       window.addEventListener("scroll",that.scroll2)
		       
		     })
			 this.$axios.post("/index/member/getUserInfo").then(res => {
			   if (res.data.code == 0) {
			     this.infouser = res.data.info;
			   }
			 });
	  },
	  destroyed() {
		  console.log(888)
	  	window.removeEventListener("scroll",this.scroll2)
	  },
	  methods:{
		  getagent(){
			  this.$axios.get(`/index/welfarecenter/agent?page=${this.num}`).then(res => {
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
			    if(that.activeName == 'b'){
			  					   that.num++
			  					   if(that.boolnum < that.num){
			  					   					   that.$toast.fail({ message: "暂无更多数据", duration: 1200 })
			  					   }
			  					   that.getagent(this.num)
			    }
			   
		  }
	  }
	  }
	};
</script>

<style lang="less" scoped>
	.fuli-body{
		padding: 0 .3rem 0rem .3rem;
		
	}
	.title{
		position: absolute;
		left: 0;
		top: 0;
		color: #FFFFFF;
	}
	.body-img{
		width: 100%;
		height: 2.78rem;
		// margin-top: -25px;
		// margin-bottom: -33px
	}
	.body-img2{
		width: 88%;
		position: absolute;
		left: .5rem;
		top: 0.87rem;
	}
	.page-fuli{
		background-color: #e8ecef;
		padding: .2rem;
		min-height: 10rem;
		.title1{
			display: flex;
			justify-content: space-between;
			margin-bottom: .2rem;
		}
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
				flex: 1;
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
	}
</style>
