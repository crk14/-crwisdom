<template>
  <div class="serverspage">
    <div class="tophader" onclick="window.history.go(-1)">
      <!-- <van-icon name="arrow-left" /> -->
      <p>服务器</p>
    </div>
    <!-- <p class="hr"></p> -->
    <div class="navtop">
      <p @click="navcli(0)" :class="lins==0?'unlines':''">
        购买服务器
        <span :class="lins==0?'unline':''"></span>
      </p>
      <p @click="navcli(1)" :class="lins==1?'unlines':''">
        运行服务器
        <span :class="lins==1?'unline':''"></span>
      </p>
      <p @click="navcli(2)" :class="lins==2?'unlines':''">
        过期服务器
        <span :class="lins==2?'unline':''"></span>
      </p>
    </div>
    <ul v-show="lins==0">
      <li class="tabli" v-for="(item,i) in list" :key="i">
        <div class="litop">
          <div class="left">
            <img :src="levelimg[item.level]" alt />
          </div>
          <div class="right">
            <p>
              <span>名称：</span>
              <span>V{{item.level}}服务器</span>
            </p>
            <p>
              <span>价格：</span>
              <span>{{item.pay_num}} TVE</span>
            </p>
            <p>
              <span>受益周期：</span>
              <span>{{item.can_day}} 天</span>
            </p>
            <p>
              <span>本金锁定时间：</span>
              <span>{{item.return_day}}天</span>
            </p>
            <p>
              <span>本金返还：</span>
              <span>{{item.return_num}} TVE</span>
            </p>
            <p>
              <span>产币/天：</span>
              <span>{{item.one_day_get}} TVE</span>
            </p>
            <p>
              <span>总量产出：</span>
              <span>{{item.can_get}} TVE</span>
            </p>
          </div>
        </div>
        <button @click="buy(item.level)">点击购买</button>
      </li>
    </ul>
    <ul v-show="lins==1">
      <li class="tabli" v-for="(item,i) in list" :key="i">
        <div class="litop">
          <div class="left">
            <img :src="levelimg[item.level]" alt />
          </div>
          <div class="right">
            <p>
              <span>名称：</span>
              <span>V{{item.level}}服务器</span>
            </p>
            <p>
              <span>价格：</span>
              <span>{{item.pay_num}} TVE</span>
            </p>
            <p>
              <span>受益周期：</span>
              <span>V{{item.can_day}}服务器</span>
            </p>
            <p>
              <span>受益：</span>
              <span>{{item.get_num}} TVE</span>
            </p>
            <p>
              <span>本金锁定时间：</span>
              <span>{{item.return_day}}天</span>
            </p>
            <p>
              <span>本金返还：</span>
              <span>{{item.return_num}} TVE</span>
            </p>
            <p>
              <span>产币/天：</span>
              <span>{{item.one_day_get}} TVE</span>
            </p>
            <p>
              <span>总量产出：</span>
              <span>{{item.can_get}} TVE</span>
            </p>
            <p>
              <span>矿机剩余时间：</span>
              <span>{{item.remain_day}}天</span>
            </p>
            <p>
              <span>本金返还剩余时间：</span>
              <span>{{item.ben_remain_day}}天</span>
            </p>
          </div>
        </div>
        <button @click="cliup(item.id)">点击领取</button>
      </li>
    </ul>
    <ul v-show="lins==2">
      <li class="tabli" v-for="(item,i) in list" :key="i">
        <div class="litop">
          <div class="left">
            <img :src="levelimg[item.level]" alt />
          </div>
          <div class="right">
            <p>
              <span>名称：</span>
              <span>V{{item.level}}服务器</span>
            </p>
            <p>
              <span>价格：</span>
              <span>{{item.pay_num}} TVE</span>
            </p>
            <p>
              <span>受益周期：</span>
              <span>V{{item.can_day}}服务器</span>
            </p>
            <p>
              <span>受益：</span>
              <span>{{item.get_num}} TVE</span>
            </p>
            <p>
              <span>本金锁定时间：</span>
              <span>{{item.return_day}}天</span>
            </p>
            <p>
              <span>本金返还：</span>
              <span>{{item.return_num}} TVE</span>
            </p>
            <p>
              <span>产币/天：</span>
              <span>{{item.one_day_get}} TVE</span>
            </p>
            <p>
              <span>总量产出：</span>
              <span>{{item.can_get}} TVE</span>
            </p>
            <p>
              <span>矿机剩余时间：</span>
              <span>{{item.remain_day}}天</span>
            </p>
            <p>
              <span>本金返还剩余时间：</span>
              <span>{{item.ben_remain_day}}天</span>
            </p>
          </div>
        </div>
        <p style="margin-left: 1.75rem;font-size:.24rem;color:#F23C3C">复购优惠10%，同时赠送2个加速点</p>
        <button @click="cliup1(item.id)">再次激活</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lins: 0,
      list:[],
      levelimg:[
        '',
        require("../assets/addressmy_1.png"),
        require("../assets/addressmy_2.png"),
        require("../assets/addressmy_3.png"),
        require("../assets/addressmy_4.png"),
        require("../assets/addressmy_5.png"),
        require("../assets/addressmy_6.png"),
      ]
    };
  },
  created() {
    this.start();
  },
  methods: {
    cliup(s){
      this.$axios.post("/index/machine/chickOne",{id:s})
      .then(res=>{
        if(res.data.code==0){
          this.$toast.success({message:res.data.msg,duration:1200});
          this.start();
        }else{
          this.$toast.fail({message:res.data.msg,duration:1200});
        }
      })
    },
    cliup1(s){
      this.$axios.post("/index/machine/againBuy",{id:s})
      .then(res=>{
        if(res.data.code==0){
          this.$toast.success({message:res.data.msg,duration:1200});
          this.start();
        }else{
          this.$toast.fail({message:res.data.msg,duration:1200});
        }
      })
    },
    buy(level){
      this.$axios.post("/index/machine/buyPackage",{level:level})
      .then(res=>{
        if(res.data.code==0){
          this.$toast.success({message:res.data.msg,duration:1200});
          this.start();
        }else{
          this.$toast.fail({message:res.data.msg,duration:1200});
        }
      })
    },
    navcli(s) {
      this.lins = s;
      this.list=[];
      this.start();
    },
    start(){
      var obj={
        url:"/index/machine/getMyPackage",
        data:{status:this.lins}
      }
      if(this.lins==0){
        obj.url="/index/machine/getPackage";
        obj.data={};
      }
      this.$axios.post(obj.url,obj.data)
      .then(res=>{
        if(res.data.code==0){
          this.list=res.data.info;
        }else{
          this.list=[];
        }
      })
      .catch(err=>{
        this.list=[];
      })
    }
  }
};
</script>
<style lang="less" scoped>
.tophader p {
  padding-left: 0.3rem;
}
.navtop {
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid #e5e5e5;
  padding: 0.4rem 0.3rem 0rem;
  p {
    color: #bababa;
    font-size: 0.3rem;
    // margin-right: 0.4rem;
    position: relative;
    padding-bottom: 0.2rem;
  }
  .unlines {
    color: #0f54f9;
  }
  .unline {
    width: 1rem;
    background: #0f54f9;
    display: block;
    height: 0.03rem;
    position: absolute;
    left: 50%;
    margin-left: -0.5rem;
    bottom: 0;
  }
}
ul {
  margin-bottom: 1rem;
}
.tabli {
  border-bottom: 1px solid #e5e5e5;
  padding: 0.2rem 0.3rem;
  .litop {
    display: flex;
    font-size: 0.24rem;
  }

  .right p span:nth-of-type(1) {
    color: #666666;
  }
  .right p span:nth-of-type(2) {
    color: #000000;
    font-weight: bold;
  }
  p {
    font-size: 0.24rem;
    line-height: 0.45rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .onel {
    color: #666666;
    margin-bottom: 0.2rem;
  }
  .right {
    margin-left: 0.3rem;
    width: 48%;
  }

  .left {
    img {
      position: relative;
      top: 50%;
      margin-top: -0.71rem;
      height: 1.42rem;
    }
  }
  button {
    position: relative;
    left: 80%;
    background: #3c88f2;
    color: #fff;
    border-radius: 30px;
    font-size: 0.2rem;
    height: 0.5rem;
    padding: 0 0.2rem;
    margin-top: 0.2rem;
    text-align: center;
  }
}
</style>
