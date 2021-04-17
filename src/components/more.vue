<template>
  <div class="more">
    <div class="tophader" onclick="window.history.go(-1)">
      <van-icon name="arrow-left" />
      <p>{{type == 1 ? $t('callcenter.sprog')+$t('callcenter.guide'):$t('index.more')+$t('callcenter.notice')}}</p>
    </div>
    <p class="hr"></p>
    <div class="listfor">
      <div class="box myboxdatateda1882" v-for="(item,i) in list" :key="i" @click="$router.push('noticedateil?id='+item.article_id)" style="position: relative;">
        <p class="title" style="display: flex;justify-content: space-between;margin-bottom: 0;">
			
          <span style="width: 64%;display: flex;flex-wrap: wrap;">{{i+1}}、   {{item.title}}
		  <p class="gao" style="margin-top: 15px;">
		          <span style="    border: 1px solid rgb(116, 132, 226);
		  color: rgb(116, 132, 226);
		  border: 1px solid;
		  font-size: 0.2rem;
		  padding: inherit;
		  line-height: 0.36rem;
		  text-align: center;
		  display: inline-block;margin-right: 0.1rem;">{{type==1?$t('callcenter.guide'):$t('callcenter.system')+$t('callcenter.notice')}}</span>
		          <span style="font-size: 0.24rem;
		  color: #bababa;">{{item.create_time}}</span>
		        </p>
		  </span>
		  <img :src="item.img" style="width: 32%;height: 75px;"/>
        </p>
		
       
        <!-- <div class="cen" v-html="item.content"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      type:this.$route.query.type
    };
  },
  created() {
    if(this.$route.query.type==1){
      this.$axios
      .get("/index/article/transArt")
      .then(res => {
        this.list = res.data.info;
      });
    }else{
      this.$axios
      .get("/index/article/articleList")
      .then(res => {
        this.list = res.data.info;
      });
    }

  }
};
</script>

<style lang="less" scoped>
@import url("../less/callcenter.less");
.box {
  padding: 0.2rem;
  border-bottom: 1px solid #f7f7f7;
  // margin-bottom: .3rem;
  p {
    text-align: left;
  }
  .title {
    font-size: 0.3rem;
    margin-bottom: 0.4rem;
        color: black;
  }
  .cen {
    font-size: 0.24rem;
    text-indent: 2em;
  }
  img {
    width: 100%;
  }
}
</style>
