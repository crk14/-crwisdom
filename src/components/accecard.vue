<template>
  <div class="tutorial">
    <!-- <img src="../assets/toutail.png" alt class="backimg" /> -->
    <div class="tophader yancolor" @click="$router.back()">
      <van-icon name="arrow-left" />
      <p>获取API教程</p>
    </div>

    <p class="steephead">第一部分：火币交易所Api创建教程（已有API的直接跳过）</p>
    <div class="fish_cont">
      <div class="heairbox">
        <p class="first">
          <span>1、</span>进入火币网，登录账户。
        </p>
        <p class="imgp">
          <img src="../assets/twos.jpg" alt />
        </p>
      </div>
      <div class="heairbox">
        <p class="first">
          <span>2、</span> 点击API管理
        </p>
        <p class="imgp">
          <img src="../assets/thres.jpg" alt />
        </p>
      </div>
      <div class="heairbox">
        <p class="first">
          <span>3、</span> 填写API备注，点击注册
        </p>
        <p class="imgp">
          <img src="../assets/fours.jpg" alt />
        </p>
      </div>
      <div class="heairbox">
        <p class="first">
          <span>4、</span> 安全认证，获取验证码
        </p>
        <p class="imgp">
          <img src="../assets/first.jpg" alt />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.fish_cont {
  width: 92%;
  margin: auto;
  position: relative;
  padding-top: 0.6em;
}
.steephead {
  padding: 0.2rem 0.3rem;
  color: #333333;
  font-size: 0.26rem;
  background: #f5f6fa;
  font-size: 0.24rem;
  color: #999999;
  img {
    width: 2.26rem;
  }
}
.firstcon {
  // background: url("../assets/newperson_jiaoc.png") no-repeat;
  background-size: 100% 100%;
  padding: 0.36rem;
  color: #502401;
  p {
    font-weight: bold;
  }
  .difirs {
    font-size: 0.3rem;
    margin-bottom: 0.3rem;
    line-height: 0.45rem;
  }
  .samtext {
    font-size: 0.24rem;
    line-height: 0.4rem;
  }
}
.first {
  font-size: 0.24rem;
  color: #333333;
  margin-bottom: 0.2rem;
  span {
    // width: 0.36rem;
    // height: 0.36rem;
    display: inline-block;
    border-radius: 50%;
    // background: #8045f2;
    text-align: center;
    line-height: 0.36rem;
  }
}
.imgp {
  text-align: center;
  img {
    width: 6.9rem;
  }
}
.heairbox {
  margin-bottom: 0.4rem;
}
</style>
