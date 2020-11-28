
<template>
	<div >
		<div class="tophader">
		  <van-icon name="arrow-left"  onclick="window.history.go(-1)"/>
		  <p style="text-align: left;margin-left: 32px;font-size: .31rem;">CR Wisdom量化生态平台</p>
		</div>
		<div style="min-height: 14rem; background-color: #EEEEEE">
			<div class="div" v-for="(item,index) in list" :key="index">
				<!-- <div class="item" :key="i" @click="$router.push('noticedateil?id='+item.article_id)"> -->
					<div class="item" >
					<p>{{item.create_time}}</p>
					<img :src="'http://bookislight.com' + item.img" @click="$router.push({path:'noticedateil',query:{id:item.article_id}})"/>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
export default {
  data() {
    return {
    list:[]
    };
  },
  created() {
	  let time = localStorage.getItem('time')
	  clearInterval(time)
  	this.$axios
  	  .get("/index/article/indexBannerArt", { page: 1, limit: 10 })
  	  .then(res => {
		  this.list = res.data.info
		  console.log(this.list)
  	  });
  }
  
};
</script>

<style lang="less" scoped>
	.div{
		background-color: #EEEEEE;
		padding: 0 .2rem;
		.item{
			text-align: center;
			p{
				padding: 10px 0;
				opacity: .6;
			}
			img{
				width: 100%;
				height: 3.9rem;
				border-radius: 6px;
			}
		}
	}
</style>

