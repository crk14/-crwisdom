<template>
	<div class="callcenter">
		<div class="tophader" onclick="window.history.go(-1)">
			<van-icon name="arrow-left" />
			<p>详情</p>
		</div>
         <p class="hr"></p>
        <div class="box myboxdatateda1882">
            <p class="title">{{title}}</p>
            <div class="cen" v-html="info"></div>
        </div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
                info:'',
                title:''
			}
		},
		created() {
			
            this.$axios.get("/index/article/articleDetail?article_id="+this.$route.query.id)
            .then(res=>{
                this.info=res.data.info.content
                this.title=res.data.info.title
            })
		}
	}
</script>

<style lang="less" scoped>
    @import url("../less/callcenter.less");
    .box{
        padding: .4rem;
        p{
            text-align: left;
        }
        .title{
            font-size: .4rem;
            margin-bottom: .21rem;
        }
        .cen{
            font-size: .3rem;
        }
        img{
            width: 100%;
        }
    }
</style>
