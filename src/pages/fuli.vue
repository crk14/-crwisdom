<template>
  <div>
    <div class="tophader">
      <van-icon name="arrow-left" onclick="window.history.go(-1)" />
      <p>福利中心</p>
      <span style="position: absolute;right: .15rem;top: 0;color: #909090;" @click="$router.push('noticedateil?id=86')">规则说明</span>
    </div>
    <div class="fuli-body">
      <img v-show="activeName=='a'" src="../assets/1102.png" class="body-img" />
      <img v-show="activeName=='b'" src="../assets/1103.png" class="body-img" />
      <img v-show="activeName=='c'" src="../assets/11112.png" class="body-img"/>
      <div
        class="title"
        style="left: .6rem;top: 1.35rem;"
		v-show="activeName=='a'"
      >会员账户 (累计总额)</div>
	  <div
	    class="title"
	    style="left: .6rem;top: 1.35rem;"
	  		v-show="activeName=='b'"
	  >代理账户 (累计总额)</div>
    
	  <div
	    v-show="activeName=='a'"
	    class="title"
	    style="left: .6rem;top: 2rem;font-size: .32rem;"
	  > 
	  团队业绩:
	    <span
	      style="font-size: .38rem;"
	    >{{sqdk.toFixed(2) + ' 点卡'}}</span>
	  </div>
	  <div
	    v-show="activeName=='a'"
	    class="title"
	    style="left: .6rem;top: 2.65rem;font-size: .32rem;"
	  >
	  会员福利:
	    <span
	      style="font-size: .38rem;"
	    >{{memberaccount.toFixed(2) + ' CRW'}}</span>
	  </div>
	  <div
	    v-show="activeName=='b'"
	    class="title"
	    style="left: .6rem;top: 2rem;font-size: .32rem;"
	  > 
	  团队业绩:
	    <span
	      style="font-size: .38rem;"
	    >{{sqdk.toFixed(2) + ' 点卡'}}</span>
	  </div>
	  <div
	    v-show="activeName=='b'"
	    class="title"
	    style="left: .6rem;top: 2.65rem;font-size: .32rem;"
	  >
	  代理福利:
	    <span
	      style="font-size: .38rem;"
	    >{{agentcount.toFixed(2) + ' CRW'}}</span>
	  </div>
	 
      <div
        v-show="activeName =='c'"
        class="title"
        style="left: .6rem;top: 2.2rem;font-size: .42rem;"
      >
        <!-- <span style="font-size: .57rem;">{{info.number}}</span> -->
      </div>
      <div
        v-show="activeName!='c'"
        class="title"
        style="left: 5.3rem;top: 2.86rem;color: #000000;width: 81px;text-align: center;"
      >{{infouser.is_need == 2?infouser.level_name:'普通会员'}}</div>
      <!-- <div v-show="activeName=='c'" class="title" style="left: 5.2rem;top: 3.1rem;color: #000000;width: 81px;text-align: center;">{{infouser.is_need == 2?infouser.level_name:''}}</div>
			<div v-show="activeName=='c'">
				<div class="title" style="left: .6rem;top: 2.7rem;font-size: 15px;">累计分红福利</div>
				<div class="title" style="left: .6rem;top: 3.2rem;font-size: 15px;">0CRW</div>
				<div class="title" style="left: 3.1rem;top: 2.7rem;font-size: 15px;">分红余额</div>
				<div class="title" style="left: 3.1rem;top: 3.2rem;font-size: 15px;">0CRW</div>
				<div class="title" style="left: 4.7rem;top: 2.7rem;display: flex;font-size: 15px;">划转 <img src="../assets/208.png" style="width: 13px;height: 13px;margin-top: 4px;margin-left: 2px;"/></div>
      </div>-->
    </div>

    <van-tabs v-model="activeName" color="#124cfb">
      <van-tab title="会员福利" name="a">
        <div class="page-fuli">
          <div class="title1">
            <span>我的邀请: {{invite.invite_num}}</span>
            <span>正式用户: {{invite.team_num}}</span>
            <span @click="$router.push('/refund')">返佣记录</span>
            <!-- <span >返佣记录</span> -->
          </div>
          <div class="item" v-for="(item,index) in huiyuanlish" :key="index">
            <img class="img" :src="item.avatar" />
            <div class="two" style="margin-left:2px;overflow: hidden;flex: 1;text-overflow: ellipsis;white-space: nowrap">
              {{item.nick_name}}-{{item.mobile}}
              <p style="margin-top: .1rem;">注册时间：{{item.register_time}}</p>
            </div>
            <div class="three">
              <img v-if="item.is_need ==2" src="../assets/111.png" />
              <img v-if="item.is_need ==1" src="../assets/301.png" />
              <span style="margin-left: 22px;">{{item.is_need == 2?item.level_name:'注册会员'}}</span>
              <p style="font-size: 13px;">业绩: {{item.achieve}}点</p>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="代理福利" name="b">
        <div class="page-fuli">
          <div class="title1">
            <span>我的邀请: {{invite.invite_num}}</span>
            <span>注册用户: {{invite.register_num}}</span>
            <span>正式用户: {{invite.team_num}}</span>
          </div>
          <div class="item" v-for="(item,index) in daililist" :key="index">
            <img class="img" :src="item.avatar" />
            <div class="two" style="overflow: hidden;flex: 1;text-overflow: ellipsis;white-space: nowrap">
              {{item.nick_name}}
              <p>{{item.create_time}}</p>
            </div>
            <div class="three" style="color: rgb(40,60,103);font-size: 14px;width: auto;">
              消费点卡：{{parseInt(item.trans_num)}}{{item.remark=="推荐级别奖"?'USDT':'点'}}
              <p>{{item.remark|remark2}}：{{parseInt(item.num)}} CRW</p>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="代理申请" name="c">
        <p class="hr" style="padding: 0;background-color: rgb(230,231,235);"></p>
        <div class="item2" :class="{'item3':level>=1}">
          <div class="item1">
            <div class="one">社区代理</div>
            <!-- <div class="two">点卡: 10000点</div> -->
          </div>
          <div class="two" style="text-indent:44px">
            一次性充值
            <span>1000</span>USDT购买
            <span>7000</span>点卡,购买成功后平台额外赠送
            <span>3000</span>点卡,共获得
            <span>10000</span>点卡并获得社区代理资格
          </div>
          <p class="two">(点卡可用于自已交易抵扣系统使用服务费,或转让给网体正式用户使用)</p>
          <div class="item1" style="margin-top: 15px;">
            <div class="three">
              购买
              <span>1000</span>USDT
            </div>
            <div class="four" @click="confirm(1000,3000)">立即申请 》</div>
          </div>
        </div>
        <p class="hr" style="padding: 0;background-color: rgb(230,231,235);"></p>
        <div class="item2" :class="{'item3':level>=2}">
          <div class="item1">
            <div class="one">城市合伙人</div>
            <!-- <div class="two">点卡: 10000点</div> -->
          </div>
          <div class="two" style="text-indent:44px">
            一次性充值
            <span>{{num2}}</span>USDT购买
            <span>{{num2*7}}</span>点卡,购买成功后平台额外赠送点卡福利
            <span>{{num2*7}}</span>点卡,共获得
            <span>{{num2*14}}</span>点卡并获得城市合伙人资格
          </div>
          <p class="two">(点卡可用于自已交易抵扣系统使用服务费,或转让给网体正式用户使用)</p>
          <div class="item1" style="margin-top: 15px;">
            <div class="three">
              购买
              <span>{{num2}}</span>USDT
            </div>
            <div class="four" @click="confirm(num2,num2*7)">立即申请 》</div>
          </div>
        </div>
        <p class="hr" style="padding: 0;background-color: rgb(230,231,235);"></p>
        <div class="item2" :class="{'item3':level>=3}">
          <div class="item1">
            <div class="one">高级合伙人</div>
            <!-- <div class="two">点卡: 10000点</div> -->
          </div>
          <div class="two" style="text-indent:44px">
            一次性充值
            <span>{{num3}}</span>USDT购买
            <span>{{num3==15000?'10万':num3*7}}</span>点卡,购买成功后平台额外赠送点卡福利
            <span>{{num3==15000?'20万':num3*14}}</span>点卡,共获得
            <span>{{num3==15000?'30万':num3*21}}</span>点卡并获得高级合伙人资格
          </div>
          <p class="two">(点卡可用于自已交易抵扣系统使用服务费,或转让给网体正式用户使用)</p>
          <div class="item1" style="margin-top: 15px;">
            <div class="three">
              购买
              <span>{{num3}}</span>USDT
            </div>
            <div class="four" @click="confirm(num3,num3*14)">立即申请 》</div>
          </div>
        </div>
        <p class="hr" style="padding: 0;background-color: rgb(230,231,235);"></p>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
	import Vue from "vue";
	import { Dialog } from "vant";
	Vue.use(Dialog);
export default {
  data() {
    return {
      activeName: "a",
      daililist: [],
      agentcount: 0,
      invite: {},
      num: 1,
      boolnum: 0,
      huiyuanlish: [],
      memberaccount: 0,
      infouser: "",
      info: "",
	  num2:5000,
	  num3:15000,
	  level:0,
	  sqdk:0
    };
  },
  created() {
    this.getagent();
    this.$axios.get("/index/welfarecenter/invite_team").then((res) => {
      if (res.data.code == 0) {
        this.invite = res.data;
        // this.daililist = res.data.info
      }
    });
    this.$axios.get("/index/welfarecenter/agent_account").then((res) => {
      if (res.data.code == 0) {
        this.agentcount = res.data.agent_account;
        // this.daililist = res.data.info
      }
    });
    this.$axios.get("/index/welfarecenter/member").then((res) => {
      if (res.data.code == 0) {
        this.huiyuanlish = res.data.info;
		this.sqdk = res.data.team_achieve
      }
    });
    this.$axios.get("/index/welfarecenter/member_account").then((res) => {
      if (res.data.code == 0) {
        this.memberaccount = res.data.member_account;
      }
    });
    let that = this;
    this.$nextTick(() => {
      // this.initScroll()
      window.addEventListener("scroll", that.scroll2);
    });
    this.$axios.post("/index/member/getUserInfo").then((res) => {
      if (res.data.code == 0) {
        this.infouser = res.data.info;
		this.level = res.data.info.level
		if(this.level==1){
			this.num2=4000
			this.num3=14000
		}
		if(this.level==2){
			this.num3=10000
		}
      }
    });
    this.$axios.post("/index/mywallet/mywalletInfo").then((res) => {
      if (res.data.code == 0) {
        this.info = res.data.info;
      }
    });
  },
  destroyed() {
    console.log(888);
    window.removeEventListener("scroll", this.scroll2);
  },
  filters:{
	  remark2(val){
		  if(val=='推荐级别奖'){
			  return '级别奖励'
		  }else{
			  return val.substr(0, val.length - 1)
		  }
	  }
  },
  methods: {
    getagent() {
      this.$axios
        .get(`/index/welfarecenter/agent?page=${this.num}`)
        .then((res) => {
          if (res.data.code == 0 && res.data.info.data) {
            let arr = this.daililist.concat(res.data.info.data);
            this.daililist = arr;
            this.boolnum = res.data.info.last_page;
          }
        });
    },
    confirm(bool,zsong) {
       
	  let str=''
	  if(bool == 1000){
		  str = '社区代理'
		  if(this.level >= 1){
			  return
		  }
	  }
	  if(bool == 5000 || bool == 4000){
	  		  str = '城市合伙人'
			  if(this.level >= 2){
			  			  return
			  }
	  }
	  if(bool == 15000 || bool == 10000 || bool == 14000){
	  		  str = '高级合伙人'
			  if(this.level >= 3){
			  			  return
			  }
	  }
	  // if (this.info.number < bool) {
	  //   this.$toast.fail({ message: "USDT余额不足", duration: 1200 });
	  //   return;
	  // }
	  this.num = bool;
	  this.types = 1;
	  let gift =zsong
	  if(bool == 15000){
		  gift = 200000
	  }
  Dialog.confirm({
        title: "购买须知",
        message:
          `本通道为购买点卡升级${str}。用户一经购买概不支持任何退换`,
      }).then(() => {
      this.$axios
        .post("/index/welfarecenter/purchase_agent", {
          num: this.num,
          types: this.types,
		  gift,
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.$toast.success({ message: res.data.msg, duration: 1600 });
            setTimeout(() => {
              this.$router.back();
            }, 1600);
          } else {
            this.$toast.fail({ message: res.data.msg, duration: 1200 });
          }
        });
		})
		.catch(() => {
		  // on cancel
		});
    },
    scroll2() {
      let that = this;
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      //变量windowHeight是可视区的高度
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      //变量scrollHeight是滚动条的总高度
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      //滚动条到底部的条件
      if (scrollTop + windowHeight == scrollHeight) {
        //写后台加载数据的函数
        console.log(
          "距顶部" +
            scrollTop +
            "可视区高度" +
            windowHeight +
            "滚动条总高度" +
            scrollHeight
        );
        if (that.activeName == "b") {
          that.num++;
          if (that.boolnum < that.num) {
            that.$toast.fail({ message: "暂无更多数据", duration: 1200 });
          }
          that.getagent(this.num);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.fuli-body {
  padding: 0 0.3rem 0rem 0.3rem;
}
.title {
  position: absolute;
  left: 0;
  top: 0;
  color: #ffffff;
}
.body-img {
  width: 100%;
  height: 2.4rem;
  // margin-top: -25px;
  // margin-bottom: -33px
}
.body-img2 {
  width: 88%;
  position: absolute;
  left: 0.5rem;
  top: 0.87rem;
}
.page-fuli {
  background-color: #e8ecef;
  padding: 0.2rem;
  min-height: 10rem;
  .title1 {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
  }
  .item {
    padding: 0.2rem 0.17rem;
    display: flex;
    background-color: #ffffff;
    border-bottom: 8px solid #e8ecef;
    .img {
      width: 45px;
      height: 40px;
      border-radius: 50% 50%;
      // margin-right: .16rem;
      display: block;
    }
    .two {
      margin-left: 0.2rem;
      color: rgb(40, 60, 103);
      font-size: 15px;
      flex: 1;
      p {
        margin-top: 0.14rem;
        color: rgb(143, 145, 148);
        font-size: 12px;
      }
    }
    .three {
      position: relative;
      font-size: 15px;
      color: rgb(83, 93, 95);
	  width: 100px;
      p {
        margin-top: 0.1rem;
        color: rgb(40, 60, 103);
        font-size: 14px;
      }
      img {
        position: absolute;
        left: 0px;
        top: 0px;
        height: 24px;
        width: 20px;
      }
    }
  }
}
.item2 {
  background-color: #ffffff;
  margin: 0.2rem;
  padding: 0.3rem;
  .item1 {
    display: flex;
    justify-content: space-between;
  }
  .one {
    font-size: 0.31rem;
    color: #000000;
    font-weight: 550;
  }
  .two {
    font-size: 15px;
    color: #646566;
    span {
      font-size: 16px;
      color: #2167ff;
    }
  }
  .three {
    width: 100%;
    // text-align: right;
    font-size: 0.31rem;
    color: #666666;
    span {
      font-size: 0.41rem;
      color: #2167ff;
    }
  }
  .four {
    width: 100%;
    text-align: right;
    font-size: 0.31rem;
    color: #666666;
    margin-top: 0.1rem;
    color: #000000;
    img {
      width: 0.25rem;
      height: 0.25rem;
    }
  }
}
.item3{
	opacity: .6;
}
</style>
