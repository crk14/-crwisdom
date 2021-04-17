<template>
	<div class="page-down">
		<div class="title">
			<img src="../assets/download_pattern_left.png"/>
			<img src="../assets/download_pattern_right.png"/>
		</div>
		<div class="down-img">
			<img src="../assets/logo1.png"/>
			<!-- <img src="../assets/addressmy_3.png"/> -->
			<div style="background-color: #DDDDDD;height: 110px;width: 110px;margin: 0 auto;">
				<div id="qrcode" style="padding-top: 5px;"></div>
			</div>
		</div>
		<div class="down-body">
			<div class="img">
				<img src="../assets/anzhuo.png"/>
				
                CR Wisdom
              
			</div>
			<p>扫描二维码下载或用手机浏览器输入这个网址:  {{url}}</p>
			<p class="p"></p>
			<p style="margin: .1rem 0;">{{apkversion}}</p>
				<p>更新于: {{updatetime}}</p>
				<a v-show="!isshow" :href="downurl" @click="todown2">下载安装</a>
		<p v-show="isshow" style="height: 40px;"></p>
		<van-loading v-show="isshow" color="#32B2A7"  size="50"/> 
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { Loading } from 'vant';
	
	Vue.use(Loading);
	export default {
		components:[Loading],
	  data() {
	    return {
			isshow:false,
			downurl:'http://crzhapp.com/apk/CR-Wisdom-2021.3.5.apk',
			apkversion:'',
			updatetime:'2021-3-5',
			url:'https://crzhapp.com/dist/#/down'
		};
	  },
	  created() {
		 
		  // this.$axios.get("/index/download/get_info").then(res => {
		  //  this.apkversion = res.data.info.apk_version
		  //  this.updatetime = res.data.info.update_time
		  //  this.downurl = res.data.info.down_url
		  // });
	  },
	  methods: {
		  todown2(){
			  this.isshow = true
			  setInterval(()=>{
				  this.isshow = false
			  },25000)
		  }
	  },
	  mounted() {
	  	let a =  new this.$QRCode('qrcode', {
	  	    width: 100,
	  	    height: 100,
	  	    text: 'https://crzhapp.com/dist/#/down',
	  	})
	  }
	};
</script>

<style lang="less" scoped>
	.page-down{
		    height: 100%;
		    color: #A9B1B3;
		    font-size: 14px;
		   background-color: #fff;
		   position: relative;
		   .title{
			   display: flex;
			   justify-content: space-between;
			   img{
				   width: 1.48rem;
				   height: 5.5rem;
			   }
		   }
		   .down-img{
			   position: absolute;
			   left: 28%;
			   top: 9%;
			   img{
				   width: 3.48rem;
				   height: 2.5rem;
			   }
			  
		   }
		   .down-body{
			   height: 6rem;
			   margin-top: 2rem;
			   text-align: center;
			   .img{
				   img{
					   width: .6rem;
					   height: .65rem;
					   margin-right: .4rem;
				   }
				   overflow: hidden;
				       text-overflow: ellipsis;
				       white-space: nowrap;
				       word-wrap: normal;
				       line-height: 1.6;
					       font-family: d_icomoon!important;
					       font-style: normal;
					       font-weight: 400;
					       font-variant: normal;
					       text-transform: none;
						   font-size: 24px;
						   color: #505556;
			   }
			   .p{
				 width: 60%;
				 margin: 0.5rem 1.7rem;
				 height: 1px;
				 background: #A9B1B3;
			   }
			   a{
				   margin-top: 0.6rem;
				   position: relative;
				       display: inline-block;
				       padding: 12px 0px;
				       min-width: 200px;
				       border: 1px solid #32B2A7;
				       border-radius: 40px;
				       font-size: 14px;
				       background: #32B2A7;
				       color: #fff;
					  
			   }
		   }
	}
</style>
