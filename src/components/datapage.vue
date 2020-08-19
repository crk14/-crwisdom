<template>
  <div class="datapage">
    <div class="tophader" onclick="window.history.go(-1)">
      <van-icon name="arrow-left" />
      <p>我的社区</p>
    </div>
    <div class="navtop">
      <div class="box">
        <img src="../assets/eostr.png" alt />
        <div>
          <p>{{info.invite_num}}</p>
          <p>邀请用户</p>
        </div>
      </div>
      <div class="box">
        <img src="../assets/fexs.png" alt />
        <div>
          <p>{{info.team_num}}</p>
          <p>社区用户</p>
        </div>
      </div>
    </div>
    <div class="imgbox">
      <img src="../assets/taseq.png" alt />
    </div>
    <p class="main">我的邀请</p>
    <ul class="navul">
      <li>姓名</li>
      <li>手机号</li>
      <li>注册时间</li>
    </ul>
    <ul class="tabul">
      <li v-for="(item,i) in list" :key="i">
        <span>{{item.real_name}}</span>
        <span>{{item.mobile}}</span>
        <span>{{item.register_time}}</span>
      </li>
    </ul>
    <p class="pullnew">{{pullnew}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page:1,
      state:true,
      list:[],
      pullnew:'',
      info:{}
    };
  },
  created() {
    this.start()
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    start(){
      this.state = false;
      this.$axios.get("/index/member/myTeam?limit=20&page="+this.page)
      .then(res=>{
          this.state = true;
          if(res.data.code==0){
            this.info=res.data;
              for (var i = 0; i < res.data.info.data.length; i++) {
                this.list.push(res.data.info.data[i]);
              }
              if (res.data.info.data.length < 20) {
                this.state = false;
                this.pullnew = "已加载完所有数据";
              } else {
                this.pullnew = "下拉加载";
              }
              if(this.page==1&&res.data.info.data.length<1){
                this.pullnew = "暂无数据";
              }
          }
      })
    },
    handleScroll(){
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop; //变量windowHeight是可视区的高度
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight; //变量scrollHeight是滚动条的总高度
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      if (scrollTop + windowHeight >= scrollHeight-10) {
        //请求数据接口
        if(this.state){
          this.page++;
          this.start();
        }
      }
    },
  },
  beforeDestroy(){
    window.removeEventListener("scroll", this.handleScroll, true);
  }
};
</script>
<style lang="less" scoped>
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
.box p:nth-of-type(1) {
  color: #333333;
  font-size: 0.36rem;
}
.imgbox {
  width: 92%;
  margin: 0.2rem auto;
  height: 1.99rem;
  img {
    height: 100%;
  }
}
.main {
  font-size: 0.3rem;
  width: 92%;
  margin: auto;
  border-bottom: 1px solid #f6f7f9;
  padding: 0.1rem 0;
}
.navul,
.tabul {
  width: 92%;
  margin: auto;
}
.navul,
.tabul li {
  display: flex;
  justify-content: space-between;
  padding: 0.1rem 0;
}
.navul li,
.tabul li span {
  // width: 33.3%;
  font-size: 0.24rem;
}
.tabul li span {
  color: #999999;
}
.navul li:nth-of-type(1),
.tabul li span:nth-of-type(1) {
  width: 25%;
}
.navul li:nth-of-type(2),
.tabul li span:nth-of-type(2) {
  width: 30%;
}
.navul li:nth-of-type(3),
.tabul li span:nth-of-type(3) {
  width: 45%;
}
.navul li:nth-of-type(3),
.tabul li span:nth-of-type(3) {
  text-align: right;
}
.navul li:nth-of-type(2),
.tabul li span:nth-of-type(2) {
  text-align: center;
}
.pullnew {
  font-size: 0.34rem;
  padding: 0.4rem 0;
  text-align: center;
}
</style>
