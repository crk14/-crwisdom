<template>
  <div class="subrecored">
    <div class="tophader">
      <van-icon name="arrow-left" onclick="window.history.go(-1)" />
      <p>申请代理</p>
    </div>
    <div class="swiperbox">
      <van-swipe :show-indicators="false" :touchable="true" :initial-swipe="val" @change="onchange">
        <van-swipe-item>
          <div class="boxall">
            <div class="box">
              <img src="../assets/level-111@2x.png" alt />
            </div>
          </div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="boxall">
            <div class="box">
              <img src="../assets/level-12@2x.png" alt />
            </div>
          </div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="boxall">
            <div class="box">
              <img src="../assets/level-1111@2x.png" alt />
            </div>
          </div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="boxall">
            <div class="box">
              <img src="../assets/level-11@2x.png" alt />
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
      <img src="../assets/箭头@2x.png" alt class="left" @click="changel" />
      <img src="../assets/箭头拷贝@2x.png" alt class="right" @click="changer" />
    </div>
    <p class="test">
      滑动切换，查看更多服务
      <img src="../assets/滑动@2x.png" alt />
    </p>
    <ul class="tabul" v-show="val==0">
      <li>
        <img src="../assets/icon_07.png" alt />
        <p>县级代理直推0%返佣</p>
      </li>
      <li>
        <img src="../assets/icon_08.png" alt />
        <p>代理区域内业绩0%提成</p>
      </li>
    </ul>
    <ul class="tabul" v-show="val==1">
      <li>
        <img src="../assets/icon_02.png" alt />
        <p>市级代理直推0%返佣</p>
      </li>
      <li>
        <img src="../assets/icon_01.png" alt />
        <p>代理区域内业绩0%提成</p>
      </li>
    </ul>
    <ul class="tabul" v-show="val==2">
      <li>
        <img src="../assets/icon_04.png" alt />
        <p>省级代理直推0%返佣</p>
      </li>
      <li>
        <img src="../assets/icon_03.png" alt />
        <p>代理区域内业绩0%提成</p>
      </li>
    </ul>
    <ul class="tabul" v-show="val==3">
      <li>
        <img src="../assets/icon_05.png" alt />
        <p>全国总代级代理直推0%返佣</p>
      </li>
      <li>
        <img src="../assets/icon_06.png" alt />
        <p>代理区域内业绩0%提成</p>
      </li>
    </ul>
    <button class="changebton">立即申请</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: 0
    };
  },
  created() {},
  methods: {
    onchange(index) {
      this.val = index;
    },
    changel() {
      if (this.val > 0) {
        this.val--;
      } else {
        this.val = 3;
      }
    },
    changer() {
      if (this.val < 3) {
        this.val++;
      } else {
        this.val = 0;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.swiperbox {
  // padding: 0.3rem;
  position: relative;
  .van-swipe {
    // height: 3.81rem;
    width: 80%;
    margin: auto;
    .boxall {
      padding: 0.2rem;
      height: 100%;
    }
    .box {
      height: 100%;
      // background: blue;
      color: #fff;
    }
  }
  .left,
  .right {
    width: 0.6rem;
    height: 0.6rem;
    position: absolute;
    top: 50%;
    margin-top: -0.3rem;
  }
  .left {
    left: 0.2rem;
  }
  .right {
    right: 0.2rem;
  }
}
.test {
  width: 50%;
  font-size: 0.24rem;
  margin: 0.2rem auto;
  color: #c0c5cb;
  background: #cccccc4d;
  opacity: 0.8;
  border-radius: 20px;
  text-align: center;
  padding: 0.1rem 0rem 0.1rem 0.2rem;
  img {
    width: 0.22rem;
    margin-left: 0.2rem;
  }
}
.tabul {
  li {
    display: flex;
    padding: 0.3rem;
    img {
      width: 1.2rem;
    }
    p {
      font-size: 0.3rem;
      line-height: 1.2rem;
      margin-left: 0.4rem;
    }
  }
}
.changebton {
  background: linear-gradient(
    90deg,
    rgba(224, 181, 99, 1) 0%,
    rgba(254, 219, 150, 1) 100%
  );
  box-shadow: 0px 8px 27px 0px rgba(253, 219, 150, 0.33);
  margin: .8rem auto;
}
</style>
