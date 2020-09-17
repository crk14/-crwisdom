<template>
  <div class="ranklist">
    <div class="tophader" onclick="window.history.go(-1)">
      <van-icon name="arrow-left" />
      <p>选择交易所</p>
    </div>
    <p class="open">已开通自动交易</p>
    <div class="tolead" @click="$router.push({path:'global',query:{id:1}})">
      <p>
        <img src="../assets/src_resource_image_page_huobi_logo@2x.png" alt />火币全球站
      </p>
      <p>
        <img src="../assets/gou.png" alt />导入API
      </p>
    </div>
    <div class="tolead" @click="$router.push({path:'global',query:{id:4}})">
      <p>
        <img src="../assets/src_resource_icon_user_exchange_okex@2x.png" alt />OKEX
      </p>
      <p>
        <img src="../assets/gou.png" alt />导入API
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.open {
  padding: 0.3rem;
  font-size: 0.3rem;
}
.tolead {
  display: flex;
  justify-content: space-between;
  height: 1rem;
  line-height: 1rem;
  padding: 0 0.3rem;
  background: #fff;
  p {
    font-size: 0.24rem;
    font-weight: bold;
  }
  img {
    width: 0.24rem;
    margin-right: 0.2rem;
  }
}
</style>
