<template>
  <div class="datapage">
    <div class="tophader" onclick="window.history.go(-1)">
      <van-icon name="arrow-left" color="#fff"/>
      <p>我的基金</p>
    </div>
    <div class="topbox">
        <div class="cen">
            <div class="left">
                <p class="name">CR基金：</p>
                <p class="num">{{info.cr_fund}}</p>
            </div>
            <div class="right">
                <p class="but" @click="$router.push('flashj')">
                    <img class="one" src="../assets/duihus.png" alt="">
                    兑换
                    <img class="two" src="../assets/rigimg.png" alt="">
                </p>
            </div>
        </div>
        <div class="bottom">
            <div>
                <p class="botname">累计分红收益：</p>
                <p class="botnamenum">{{info.total_fund}}CNY</p>
            </div>
            <div>
                <p class="botname">兑换数量：</p>
                <p class="botnamenum">{{info.fund_trans_num}}CNY</p>
            </div>
            <div>
                <p class="botname">分红收益余额：</p>
                <p class="botnamenum">{{info.fund_send}}CNY</p>
            </div>
        </div>
    </div>

    <div class="type">
        <button :class="type==2?'cli':''" @click="clis(2)">分红收益明细</button>
        <button :class="type==1?'cli':''" @click="clis(1)">兑换明细</button>
    </div>

    <ul class="list" v-show="type==1">
        <li v-for="(item,i) in fund_trans" :key="i">
            <div>
                <p class="name">兑换</p>
                <p class="time">{{item.create_time}}</p>
            </div>
            <div class="reds">
               {{item.num}}
            </div>
        </li>
    </ul>
    <ul class="list" v-show="type==2">
        <li v-for="(item,i) in funddetail" :key="i">
            <div>
                <p class="name" style="color: #B8B8B8;
    font-size: 0.3rem;">{{item.remark}}</p>
                <p class="time">{{item.create_time}}</p>
            </div>
            <div>
                <!-- <p class="time" style="margin-bottom: 0.1rem;">基金值：<span style="color:#000">55</span></p> -->
                <p class="time" style="position: relative;top: .1rem;">分红收益：<span style="color:#d41313">{{item.number}}CNY</span></p>
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info:{},
      type:2,
      fund_trans:[],
      funddetail:[],
    };
  },
  created() {
    this.$axios.post("/index/mywallet/myFundInfo").then(res => {
        if (res.data.code == 0) {
            this.info = res.data.info;
            this.fund_trans = res.data.fund_trans;
            this.funddetail = res.data.funddetail;
        }
    });
  },
  methods:{
      clis(s){
          this.type=s
      }
  }
};
</script>
<style lang="less" scoped>
.tophader{
    background: none;
    position: absolute;
    width: 100%;
    top: 0;
    z-index: 1;
}
.tophader p{
    color: #fff;
}
.navtop,
.box {
  display: flex;
}
.navtop {
  justify-content: space-between;
  width: 92%;
  margin: 0.2rem auto;
  .box {
    width: 40%;
    background: #f6f7f9;
    font-size: 0.24rem;
    color: #bababa;
    padding: 0.1rem 0.3rem 0.15rem;
  }
  img {
    height: 0.68rem;
    margin-top: 0.1rem;
    margin-right: 0.2rem;
  }
}

.topbox{
    width: 100%;
    height: 4rem;
    background: url("../assets/fundback.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    .cen{
        display: flex;
        justify-content: space-between;
        padding: 0 .3rem;
        padding-top: 1.2rem;
        color: #fff;
    }
    .name{
            font-size: .3rem;
    }
    .num{
            font-size: .6rem;
    }
    .but{
        background: linear-gradient(270deg,rgba(67,78,231,1) 0%,rgba(73,135,238,1) 100%);
        border-radius: 23px 0px 0px 23px;
        position: relative;
        top: 30%;
        font-size: 0.2rem;
        line-height: 0.56rem;
        width: 1.8rem;
        text-align: center;
        left: .1rem;
    }
    .one{
        width: .24rem;
        height: .24rem;
        margin-right: .12rem;
    }
    .two{
        width: .12rem;
        margin-left: .12rem;
    }
}

.bottom{
        width: 92%;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-between;
        padding: 0 4%;
    bottom: .34rem;
    div{
        text-align: center;
    }
    .botname{
        font-size: 0.23rem;
        color: #B6CAFF;
            margin-bottom: .1rem;
    }
    .botnamenum{
       color: #fff;
        font-size: 0.3rem;
    }
}

.type{
    border-bottom: 1px solid #e5e5e5;
    line-height: 1rem;
    display: flex;
    justify-content: space-around;
    button{
          font-size: 0.31rem;
        color: #999;
        background: none;
        padding: 0 .5rem;
        font-weight: bold;
        border-bottom: 2px solid #fff;
    }
    .cli{
      color: #1854BD;
      border-color: #1854BD;
    }
}

.list{
    li{
        display: flex;
        justify-content: space-between;
        padding: 0 .2rem;
        height: 2rem;
        border-bottom: 1px solid #E5E5E5;
        div{
                padding-top: .5rem;
        }
    }
    .name{
        margin-bottom: .1rem;
    }
    .time{
        color: #B8B8B8;
        font-size: .3rem;
    }
    .reds{
        color: #D31A1A;
    }
}
</style>
