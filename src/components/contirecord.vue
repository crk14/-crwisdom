<template>
  <div class="contirecord">
    <div class="tophader" @click="$router.back()">
      <van-icon name="arrow-left" />
      <p v-if="type==1">充币记录</p>
      <p v-if="type==2">提币记录</p>
      <p v-if="type==3">购买记录</p>
      <p v-if="type==10">互转记录</p>
    </div>
    <p class="hr"></p>
    <div class="fish_head">
      <ul v-show="type==1">
        <li v-for="(item,i) in info" :key="i">
          <p class="oldernum">
            <span>充币</span>
            <span style="color:#A62B31">+{{item.num}}</span>
          </p>
          <div class="botdiv">
            <p>{{item.create_time}}</p>
            <p>
              <span>USDT</span>
            </p>
          </div>
        </li>
      </ul>
      <ul v-show="type==2">
        <li v-for="(item,i) in info" :key="i">
             <p class="oldernum">
            <span>提币数量</span>
            <span style="color:#000">{{item.cr_num}} CRW</span>
          </p>
           <p class="oldernum">
            <span>矿工费</span>
            <span style="color:#000">{{item.ratio}} USDT</span>
          </p>
           <p class="oldernum">
            <span>实际到账</span>
            <span style="color:#000">{{item.num}} USDT</span>
          </p>
            <p class="oldernum">
            <span>状态</span>
            <span style="color:#000">{{item.status==1?'审核中':item.status==2?'通过':'拒绝'}}</span>
          </p>
          <div class="botdiv">
            <p>{{item.create_time}}</p>
            <p>
              <!-- <span>CRW</span> -->
            </p>
          </div>
        </li>
      </ul>
      <ul v-show="type==3">
        <li v-for="(item,i) in info" :key="i">
          <p class="oldernum">
            <span>{{item.remark}}</span>
            <span style="color:#333333;">+{{item.number}}</span>
          </p>
          <div class="botdiv">
            <p>{{item.create_time}}</p>
            <!-- <p>
              <span>USDT</span>
            </p>-->
          </div>
        </li>
      </ul>
      <ul v-show="type==10">
        <li v-for="(item,i) in info" :key="i">
          <p class="oldernum">
            <span>{{item.remark}}</span>
            <span style="color:#A62B31" v-if="item.status==2">-{{item.number}}</span>
            <span style="color:#2B3DA6" v-else>+{{item.number}}</span>
          </p>
          <div class="botdiv">
            <p>{{item.create_time}}</p>
            <p>
              <span>{{item.money_types==1?'点卡值':'CRW'}}</span>
            </p>
          </div>
        </li>

      </ul>
      <p class="pullnew">{{pullnew}}</p>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: this.$route.query.type,
      page: 1,
      pullnew: "",
      state: true,
      info: []
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  created() {
    this.start();
  },
  methods: {
    start() {
      this.state = false;
      var url="/index/mywallet/rechargeLog"
      if(this.type==10){
        url="/index/mywallet/userTransferLog"
      }
      this.$axios
        .post(url, {
          limit: 10,
          page: this.page,
          types: this.type
        })
        .then(res => {
          this.state = true;
          if (res.data.code == 0) {
            for (var i = 0; i < res.data.info.data.length; i++) {
              this.info.push(res.data.info.data[i]);
            }
            if (res.data.info.data.length < 10) {
              this.state = false;
              this.pullnew = "已加载完所有数据";
            } else {
              this.pullnew = "下拉加载";
            }
            if (this.page == 1 && res.data.info.data.length < 1) {
              this.pullnew = "暂无数据";
            }
          }
        });
    },
    handleScroll() {
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop; //变量windowHeight是可视区的高度
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight; //变量scrollHeight是滚动条的总高度
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      if (scrollTop + windowHeight >= scrollHeight - 10) {
        //请求数据接口
        if (this.state) {
          this.page++;
          this.start();
        }
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll, true);
  }
};
</script>
<style lang="less" scoped>
ul {
  width: 92%;
  margin: auto;
}
li {
  font-size: 0.28rem;
  background: #fff;
  padding: 0.3rem 0;
  border-bottom: 1px solid #ebedf0f2;
}
.oldernum {
  display: flex;
  justify-content: space-between;
  p {
    font-size: 0.28rem;
  }
  span:nth-of-type(1) {
    color: #333333;
  }
  span:nth-of-type(2) {
    color: #fe0000;
  }
}
.botdiv {
  margin-top: 0.1rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.25rem;
  p {
    color: #999999;
    font-size: 0.24rem;
  }
}
.pullnew {
  font-size: 0.34rem;
  padding: 0.4rem 0;
  text-align: center;
}
</style>
