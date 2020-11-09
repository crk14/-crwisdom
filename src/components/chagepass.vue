<template>
  <div class="chagepass">
    <div class="tophader" @click="$router.push('my')">
      <van-icon name="arrow-left" />
      <p>安全中心</p>
    </div>
    <!-- <p class="hr"></p> -->
    <div class="tabdiv">

      <!-- <router-link to="/changephone">
        <div class="divli">
          <p>
            <span class="onespan">修改手机号</span>
          </p>
          <p class="right">
            <van-icon name="arrow" class="lebs" />
          </p>
        </div>
      </router-link> -->
      <router-link to="/changeloginpass">
        <div class="divli">
          <p>
            <span class="onespan">修改登录密码</span>
          </p>
          <p class="right">
            <van-icon name="arrow" class="lebs" />
          </p>
        </div>
      </router-link>
      <!-- <p class="hrsmall"></p> -->
      <router-link to="/changedealpass">
        <div class="divli">
          <p>
            <span class="onespan">修改交易密码</span>
          </p>
          <p class="right">
            <van-icon name="arrow" class="lebs" />
          </p>
        </div>
      </router-link>
      <!-- <p class="hrsmall"></p> -->
    </div>
  </div>
</template>

<script>
</script>

<style lang="less" scoped>
.divli {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding:0.3rem;
  font-size: 0.3rem;
  color: #333333;
  border-bottom: 1px solid #f6f7f9;
  img {
    display: inline-block;
    width: 0.62rem;
  }
  .lebs {
    top: 0.03rem;
    margin-left: 0.1rem;
    color: #333333;
  }
  .right {
    color: #999999;
  }
}
.hrsmall {
  height: 0.02rem;
  background: #eaeffb;
  width: 96%;
  margin-bottom: 0.1rem;
  color: #434343;
  margin-left: 0.3rem;
}
.tabdiv {
  background: #fff;
  // width: 92%;
  margin: 0.1rem auto;
  border-radius: 3px;
}
</style>
