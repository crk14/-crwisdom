<template>
  <div class="mypromote">
    <div class="tophader" onclick="window.history.go(-1)">
      <van-icon name="arrow-left" />
      <p>我的业绩</p>
    </div>
    <div class="directnum">
      <p class="one">
        <span>社区点卡业绩</span>
        <span>返佣总额（CR）</span>
      </p>
      <p class="two">
        <span style="min-width: 1.6rem;">{{info.sqdk}}</span>
        <span>{{info.fyNum}}</span>
      </p>
      <ul class="navul">
        <li class="navli">
          <p>CR互转</p>
          <p>{{info.crhz}}</p>
        </li>
        <li class="navli">
          <p>CR兑换点卡</p>
          <p>{{info.crdh}}</p>
        </li>
        <li class="navli">
          <p>CR提现</p>
          <p>{{info.txNum}}</p>
        </li>
        <li class="navli">
          <p>CR余额</p>
          <p>{{info.yjNum}}</p>
        </li>
      </ul>
    </div>
    <div class="titlename">
      <p>用户昵称</p>
      <p>兑换点卡</p>
      <p>类型</p>
      <p>业绩收益(CR)</p>
    </div>
    <ul class="tabul">
      <li v-for="(item,i) in arr" :key="i">
        <p class="oldernum">
          <span>{{item.nick_name}}</span>
          <span style="    min-width: 1rem;
    text-align: center;">{{item.trans_num}}</span>
          <span style="text-align: center;    min-width: 1.2rem;">{{item.remark}}</span>
          <span style="text-align: center;
    min-width: 1.6rem;">{{item.num}}</span>
        </p>
        <div class="botm">
          <p style="margin-top: .14rem;">{{item.create_time}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
      arr: [],
      id: this.$route.query.id
    };
  },
  created() {
    this.$axios.get("/index/member/myAchieve").then(res => {
      if (res.data.code == 0) {
        this.info = res.data;
        this.arr = res.data.info;
      }
    });
  },
  methods: {
    start(s) {
      if (s) this.$router.push({ path: "mypromote", query: { id: s } });
    }
  }
};
</script>
<style lang="less" scoped>
.directnum {
  // text-align: center;
  padding: 0.3rem 0;
  width: 92%;
  margin: 0.1rem auto;
  background: url("../assets/sheback.png") no-repeat;
  background-size: 100% 100%;
  color: #fff;
  .one,.two{
    padding-left: .3rem;
  }
  .one {
    display: flex;
    justify-content: space-between;
    font-size: 0.26rem;
    padding: 0 .4rem;
    margin-bottom: .36rem;
  }
  .two {
    font-size: 0.36rem;
    display: flex;
    justify-content: space-between;
    padding: 0 .4rem;
    span{
     display: inline-block;
     min-width: 2rem;
     text-align: center;
    }
  }
}
.titlename{
      width: 90%;
    margin: .4rem auto 0;
  display: flex;
  justify-content: space-between;
  font-size: .24rem;
}
.navul {
  margin: 0.5rem auto 0;
  display: flex;
  justify-content: space-between;
  li {
    font-size: 0.24rem;
    width: 33.3%;
    text-align: center;
    p {
      line-height: 0.5rem;
    }
  }
}
.tabul {
  width: 92%;
  margin:.2rem auto;
  li {
    font-size: 0.24rem;
    // background: #fff;
    padding: 0.3rem 0;
    border-top: 1px solid #E5E5E5;
  }
}
.oldernum {
  display: flex;
  justify-content: space-between;
  p {
    font-size: 0.28rem;
  }
  color: #999999;
  // span:nth-of-type(1) {
  //   color: #333333;
  // }
  // span:nth-of-type(2) {
  //   color: #fe0000;
  // }
  span{
    display: inline-block;
    min-width: 1.4rem;
    text-align: left;
  }
}
.botm {
  color: #999999;
}
.botdiv {
  margin-top: 0.1rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.25rem;
  p {
    font-size: 0.24rem;
  }
  span {
    font-size: 0.36rem;
  }
}
.pullnew {
  font-size: 0.34rem;
  padding: 0.4rem 0;
  text-align: center;
}
</style>
