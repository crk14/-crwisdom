<template>
  <!-- <div id="app" :style="{position: this.$store.state.fiedx?'fixed':'unset'}"> -->
  <div id="app">
    <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
      <transition :name="transitionName">
        <!-- :key="$route.fullPath"  跳转当前页面可以刷新 -->
        <router-view class="child-view" :key="$route.fullPath" v-if="isRouterAlive"></router-view>
      </transition>
    <!-- </van-pull-refresh> -->
    <ul class="footer" v-if="$route.meta.footShow">
      <li @click="clis(0)">
        <router-link to="/" :class="iscli==0?'curry':''">
          <img v-if="iscli==0" src="./assets/905.png" alt />
          <img v-else src="./assets/903.png" alt />
          <p>首页</p>
        </router-link>
      </li>
      <li @click="clis(1)">
        <router-link to="/notecase" :class="iscli==1?'curry':''">
          <img v-if="iscli==1" src="./assets/904.png" alt />
          <img v-else src="./assets/406.png" alt />
          <p>量化</p>
        </router-link>
      </li>
     <li @click="clis(2)">
		  <router-link to="/find" :class="iscli==2?'curry':''">
          <img v-if="iscli==2" src="./assets/tongji2.png" alt />
          <img v-else src="./assets/tongji.png" alt />
          <p>排行</p>
		  </router-link>
      </li>
      <li @click="clis(3)">
        <router-link to="/my" :class="iscli==3?'curry':''">
          <img v-if="iscli==3" src="./assets/902.png" alt />
          <img v-else src="./assets/901.png" alt />
          <p>我的</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      iscli: 0,
      transitionName: "slide-left",
      fiedx: true,
      isLoading: false,
      isRouterAlive: true,
    };
  },
  created(){
    this.start();
   
  },
  methods: {
    clis(s) {
      this.iscli = s;
	  this.start()
    },
    onkaif() {
      // this.$toast.fail({ message: "等待开发", duration: 1200 });
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    onRefresh() {
      this.transitionName = "";
      setTimeout(() => {
        this.$toast.success({ message: "刷新成功", duration: 1200 });
        this.isLoading = false;
        this.reload();
        setTimeout(() => {
          this.transitionName = "slide-left";
        }, 300);
      }, 500);
    },
    start() {
      if (this.$router.history.current.path == "/") {
        this.iscli = 0;
      } else if (this.$router.history.current.path == "/notecase") {
        this.iscli = 1;
      } else if (this.$router.history.current.path == "/my") {
        this.iscli = 3;
      }else if (this.$router.history.current.path == "/find") {
	    this.iscli = 2;
	  }
    }
  },
  beforeUpdate() {
    this.start();
  }
};
</script>

<style lang="less">
	html,body{
		height: 100%;
	}
.tophader {
  height: 0.96rem;
  line-height: 0.96rem;
  //   padding: 0.3rem 0 0 0.15rem;
  background: #fff;
  position: relative;
  i {
    font-size: 0.48rem;
    color: #666666;
    position: absolute;
    top: 50%;
    margin-top: -0.24rem;
    left: 0.1rem;
  }
  img {
    height: 0.36rem;
    position: absolute;
    right: 0.3rem;
    top: 50%;
    margin-top: -0.18rem;
  }
  p {
    text-align: center;
    font-size: 0.36rem;
    font-weight: bold;
    color: #333333;
    // padding-left: 0.7rem;
    width: 100%;
    height: 100%;
  }
}

.hr {
  height: 0.12rem;
  background: #f6f7f9;
}

#app {
  width: 100%;
  height: 100%;
}

.child-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  // height: 100%;
  // transition: all .3s cubic-bezier(0.55, 0, 0.1, 1);
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
  // transition: all 100.5s;
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(50px, 0);
  transform: translate(50px, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-50px, 0);
  transform: translate(-50px, 0);
}

.footer {
  width: 100%;
  background: white;
  height: 1rem;
  line-height: 1rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.24rem;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  //   border-top: 1px solid #dcdcdc;

  a {
    color: #999999;
  }

  li {
    flex: 1;
    padding: 0.25rem;
    position: relative;
    text-align: center;
    color: #999999;
  }

  .curry {
    color: rgb(33,103,255);
  }
  img {
    width: 0.46rem;
    display: inline-block;
    margin: auto;
    position: absolute;
    top: 0.1rem;
    left: 50%;
    margin-left: -0.25rem;
  }
}

#charcode {
  img,
  canvas {
    margin: auto;
    display: block;
  }
}
.child-view .van-swipe img {
  width: 93%;
  // height: 100%;
  margin: auto;
  display: block;
  // border-radius: 10px;
}
.hello .van-swipe .van-swipe-item {
  background: #fff;
}
.note .van-swipe {
  overflow: unset;
  .van-swipe__indicator {
    width: 0.4rem;
    height: 0.035rem;
  }
}
.loginul .pass .van-icon {
  font-size: 12px;
}
.myboxdatateda1882 img {
  width: 100%;
}
.van-pull-refresh {
  overflow: unset !important;
}
#qrcodew,
#qrcode1 {
  img,
  canvas {
    display: block;
    margin: auto;
  }
  margin-bottom: 0.1rem;
}

.changebton {
  width: 92%;
  background: #2167ff;
  height: 1rem;
  line-height: 1rem;
  margin: 1rem auto;
  text-align: center;
  color: white;
  border-radius: 25px;
  font-size: 0.3rem;
  display: block;
}
.note {
  // .van-switch {
  //   width: 0.4rem;
  //   height: 0.24rem;
  // }
  // .van-switch__node {
  //   width: 0.24rem;
  //   height: 0.24rem;
  //   background: #fff;
  //   border-radius: 50%;
  // }
  // .van-switch {
  //   background-color: #bababa;
  //   margin-left: 0.1rem;
  //   position: relative;
  //   top: 0.04rem;
  // }

  // .van-switch--on {
  //   background: #3e9ef6;
  // }
  // .van-switch--on .van-switch__node {
  //   transform: translateX(0em);
  // }
}
.twop4k53jk45 .van-switch {
  margin-left: 0.3rem;
  top: 0.05rem;
}

#qrcode canvas,
#qrcode img {
  display: block;
  margin: auto;
  height: 100% !important;
}
</style>
