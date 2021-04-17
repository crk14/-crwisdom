<template>
	<div>
		<div class="tophader" style=" border-bottom: 8px solid #e8ecef">
			<van-icon name="arrow-left" onclick="window.history.go(-1)" />
			<p>带单详情</p>
		</div>
		<van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
			<div class="title">
				<span>带单总人数: {{follow_num}}</span>
				<span>带单总收益: {{all_profit}} USDT</span>
			</div>
			<div class="bootom" style="margin-bottom: 55px;">
				<div class="body">
					<div>跟随名称</div>
					<div>跟随开启时间</div>
					<div>跟随收益</div>
				</div>
				<div class="body" v-for="item in daililist">
					<div class="body-one" >
						<img :src="item.avatar" />
						{{item.nick_name}}</div>
					<div >{{item.create_time}}</div>
					<div>{{item.profit?item.profit:0}} USDT</div>
				</div>
			</div>
			<p v-show="!daililist.length" style="color: #999;text-align: center;line-height: 40px;">{{$t('community.available')}}</p>
		</van-pull-refresh>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				daililist: [],
				num: 1,
				isLoading: false,
				follow_num:'',
				all_profit:''
			};
		},
		created() {
			 this.getagent()
			// let that = this
			//  this.$nextTick(() => {
			//        window.addEventListener("scroll",that.scroll2)
			//      })
		},
		destroyed() {
			console.log(888)
			// window.removeEventListener("scroll", this.scroll2,true)
		},
		methods: {
			onRefresh() {
				this.getagent()
				setTimeout(() => {
					this.isLoading = false;
				}, 1000);
			},
			getagent() {
				this.$axios.get(`/index/spotfollow/follow_detail`).then(res => {
					if (res.data.code == 0) {
						this.follow_num = res.data.follow_num
						this.all_profit= res.data.all_profit
						let obj = res.data.follow_list
						for(let key in obj){
							console.log(obj[key])
							this.daililist.push(obj[key])
						}
						console.log(this.daililist)
						// let arr = this.daililist.concat(res.data.info.data)
						// this.daililist = arr
						// this.boolnum = res.data.info.last_page

					}
				});
			},
			// scroll2() {
			// 	let that = this
			// 	//变量scrollTop是滚动条滚动时，距离顶部的距离
			// 	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			// 	//变量windowHeight是可视区的高度
			// 	var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
			// 	//变量scrollHeight是滚动条的总高度
			// 	var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
			// 	//滚动条到底部的条件
			// 	if (scrollTop + windowHeight == scrollHeight) {
			// 		//写后台加载数据的函数
			// 		console.log("距顶部" + scrollTop + "可视区高度" + windowHeight + "滚动条总高度" + scrollHeight);
			// 		that.num++
			// 		if (that.boolnum < that.num) {
			// 			that.$toast.fail({
			// 				message: "暂无更多数据",
			// 				duration: 1200
			// 			})
			// 		}
			// 		that.getagent(this.num)

			// 	}
			// }
		}
	};
</script>

<style lang="less" scoped>
	.title {
		display: flex;
		justify-content: space-between;
		margin: 0.2rem;
		font-size: 14px;
		padding: .2rem;
		border: 1px solid #eee;
	}
	.body-one{
		display: flex;
		width: 28%;
		overflow: hidden;text-overflow: ellipsis;white-space: nowrap
	}
	.bootom {
		padding-left: .2rem;
		padding-right: .2rem;

		.body {
			position: relative;
			display: flex;
			justify-content: space-between;
			color: rgb(96, 94, 95);
			padding: .14rem .3rem .14rem .1rem;
			border-bottom: 1.3px solid #EEEEEE;
			line-height: 30px;
			img{
				width: .55rem;
				height: .55rem;
				border-radius: 50%;
				margin-right: 0.1rem;
			}
		}
	}
</style>
