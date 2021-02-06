<template>
	<div style="font-size: 14px;min-height: 100%;padding-bottom: 20px;">
		<div class="tophader">
		  <van-icon name="arrow-left" onclick="window.history.go(-1)"  />
		  <p >我的机器人</p>
		</div>
		<p class="hr" style="height: 2px;"></p>
	
		<div class="itme1">
			<img style="width: 100%;height: 125px;" src="../assets/mejq.png"/>
		<!-- 	<div class="item">
				<p>
					<img class="img" src="../assets/sc002.png" />
					<img src="../assets/crwindow.png" />
				</p>
				<div >
					<div class="div">
						<p class="p2" >现货量化机器人(智能趋势版)</p>
						<p class="p1">剩余点卡(智能版): <span style="color: rgb(255,147,31);margin-left: 16px; font-size: 23px;font-weight: bold;">0</span><span style="color: rgb(103,103,103);font-size: 14px;"></span>点 </p>
						<p class="p1">激活时间: 未激活</p>
						</div>
						
						<div class="button">
						<button  @click="fn(3,2,true)"  >激活</button>
						<button @click="fn(3,2,true)">进入系统</button>
						</div>
					</div> -->
					<!-- <div v-show="list3 && list3.active " class="i-t">已激活</div>
					<div v-show="list3 && list3.active == 0 && list3.remain_day &&!list3.probation" class="i-t active">待激活</div>
					<div v-show="!list3 " class="i-t active2">未购买</div>
					<div v-show="list3 &&list3.remain_day &&list3.probation " class="i-t active3">试用期</div> -->
					<!-- <div  class="i-t active2">未购买</div> -->
			<!-- </div> -->
			<div class="item">
				<p>
					<img v-show="!isshow" class="img" src="../assets/sc002.png" />
					<img v-show="isshow" class="img img1" src="../assets/crliang.gif" />
					<img src="../assets/crwindow.png" />
				</p>
				<div >
					<div class="div">
						<p class="p2" >现货量化机器人(专业设置版)</p>
						<p class="p1">剩余时长: <span style="color: rgb(255,147,31);margin-left: 16px; font-size: 23px;font-weight: bold;">{{list1?list1.remain_day:'0'}}</span><span style="color: rgb(103,103,103);font-size: 14px;">天</span> <span v-show="list1 && list1.probation"></span> </p>
						<p class="p1">激活时间: {{list1 &&list1.active_time?list1.active_time:'未激活'}}</p>
					</div>
					
					<div class="button">
						<!-- <button  v-show="!list1" @click="fn(1,list1)" >试用7天</button> -->
						<button  @click="fn(1,list1,false,true)"  v-if="list1 && list1.active"  >续费</button>
						<button @click="fn(1,list1)" v-else  >激活</button>
						<button @click="list1&& list1.active || list1.probation?$router.push(`/intetrading2?time=${list1.remain_day}`):fn2(true)">进入系统</button>
					</div>
				</div>
				<div v-show="list1 && list1.active " class="i-t">已激活</div>
				<div v-show="list1 && list1.active == 0 && list1.remain_day &&!list1.probation" class="i-t active">待激活</div>
				<div v-show="!list1  || !list1.remain_day " class="i-t active2">未购买</div>
				<!-- <div v-show="list1 &&list1.remain_day &&list1.probation " class="i-t active3">试用期</div> -->
			</div>
	<!-- 		<div class="item">
				<p>
					<img v-show="!isshow1" class="img" src="../assets/sc004.png" />
					<img v-show="isshow1" class="img img1" src="../assets/crliang.gif" />
					<img src="../assets/crwindow.png" />
				</p>
				<div >
					<div class="div">
						<p class="p2" >合约量化机器人(智能趋势版)</p>
						<p class="p1">剩余点卡(智能版): <span style="color: rgb(255,147,31);margin-left: 16px; font-size: 23px;font-weight: bold;">{{Number(point_num).toFixed(0)}}</span><span style="color: rgb(103,103,103);font-size: 14px;"></span>点 <span v-show="list3 &&list3.probation"></span></p>
					<p class="p1">激活时间: {{list3 &&list3.active_time?list3.active_time:'未激活'}}</p>
						</div>
						
						<div class="button">
							<button  @click="fn(3,list3)" :class="{'active1':list3 && list3.active}" >激活</button>
							<button @click="list3&& list3.active|| list3.probation?$router.push('/heyue2?type=3'):fn2(true)">进入系统</button>
						</div>
					</div>
					<div v-show="list3 && list3.active " class="i-t">已激活</div>
					<div v-show="list3 && list3.active == 0 && list3.remain_day &&!list3.probation" class="i-t active">待激活</div>
					<div v-show="!list3  || !list3.remain_day " class="i-t active2">未购买</div>
					
			</div> -->
			<div class="item">
				<p>
					<img v-show="!isshow2" class="img" src="../assets/sc003.png" />
					<img v-show="isshow2" class="img img1" src="../assets/crliang.gif" />
					<img src="../assets/crwindow.png" />
				</p>
				<div >
					<div class="div">
						<p class="p2" >合约量化机器人(专业设置版)</p>
						<p class="p1">剩余时长: <span style="color: rgb(255,147,31);margin-left: 16px; font-size: 23px;font-weight: bold;">{{list2?list2.remain_day:'0'}}</span><span style="color: rgb(103,103,103);font-size: 14px;">天</span> <span v-show="list2 &&list2.probation"></span></p>
								<p class="p1">激活时间: {{list2 &&list2.active_time?list2.active_time:'未激活'}}</p>
							</div>
							
							<div class="button">
								<!-- <button  v-show="!list2" @click="fn(2,list2)" >试用7天</button> -->
								<button @click="fn(2,list2,false,true)"  v-if="list2 && list2.active"  >续费</button>
								<button @click="fn(2,list2)"  v-else  >激活</button>
								<button @click="list2&& list2.active|| list2.probation?$router.push(`/heyue2?type=2&time=${list2.remain_day}`):fn2(true)">进入系统</button>
							</div>
						</div>
						<div v-show="list2 && list2.active " class="i-t">已激活</div>
						<div v-show="list2 && list2.active == 0 && list2.remain_day &&!list2.probation" class="i-t active">待激活</div>
						<div v-show=" !list2 || !list2.remain_day " class="i-t active2">未购买</div>
						<!-- <div v-show="list2 &&list2.remain_day &&list2.probation " class="i-t active3">试用期</div> -->
						
			</div>
			<div class="item">
				<p>
					<img v-show="!isshow1" class="img" src="../assets/sc004.png" />
					<img v-show="isshow1" class="img img1" src="../assets/crliang.gif" />
					<img src="../assets/crwindow.png" />
				</p>
				<div >
					<div class="div">
						<p class="p2" >策略跟随机器人(现货/合约)</p>
						<p class="p1">剩余点卡: <span style="color: rgb(255,147,31);margin-left: 16px; font-size: 23px;font-weight: bold;">{{Number(point_num).toFixed(0)}}</span><span style="color: rgb(103,103,103);font-size: 14px;"></span>点 <span v-show="list3 &&list3.probation"></span></p>
					<p class="p1">激活时间: {{list3 &&list3.active_time?list3.active_time:'未激活'}}</p>
						</div>
						
						<div class="button">
							<button @click="fn(3,list3,false,true)"   v-if="list3 && list3.active" >续费</button>
							<button  @click="fn(3,list3)" v-else  >激活</button>
							<!-- <button @click="list3&& list3.active|| list3.probation?togensui():fn2(true)">进入系统</button> -->
							<button @click="togensui()">进入系统</button>
						</div>
					</div>
					<div v-show="list3 && list3.active " class="i-t">已激活</div>
					<div v-show="list3 && list3.active == 0 && list3.remain_day &&!list3.probation" class="i-t active">待激活</div>
					<div v-show="!list3  || !list3.remain_day " class="i-t active2">未购买</div>
			</div>
		</div>
		<van-dialog v-model="bool" title="续费须知" show-cancel-button :before-close="beforeClose">
			
			<div class="bel-dia">
				<div v-if="id!=3" style="display: flex;margin: 2px 0;">	<span style="flex: 1;text-align: left;">时长: 90天</span>   <span style="flex: 1;text-align: left">价格: 5600CRW</span> 
				<van-checkbox shape="square" v-model="checked1" style="font-size: 13px;margin-left: 10px;" icon-size="14"></van-checkbox></div>
				<div v-if="id!=3" style="display: flex;margin: 2px 0;">	<span style="flex: 1;text-align: left;">时长: 180天</span>   <span style="flex: 1;text-align: left">价格: 9600CRW</span>
				<van-checkbox shape="square" v-model="checked2" style="font-size: 13px;margin-left: 10px;" icon-size="14"></van-checkbox></div>
				<div v-if="id!=3" style="display: flex;margin: 2px 0;">	<span style="flex: 1;text-align: left;">时长: 360天</span>   <span style="flex: 1;text-align: left">价格: 16800CRW</span>
				<van-checkbox shape="square" v-model="checked3" style="font-size: 13px;margin-left: 10px;" icon-size="14"></van-checkbox></div>
				<div v-if="id==3" style="display: flex;margin: 2px 0;">	<span style="flex: 1;text-align: left;">点卡: 3500</span>   <span style="flex: 1;text-align: left">价格: 3500CRW</span>
				<van-checkbox shape="square" v-model="checked1" style="font-size: 13px;margin-left: 10px;" icon-size="14"></van-checkbox></div>
			</div>
			<div class="bel-dia" style="display: flex;justify-content: space-between;">
				<span >支付方式: </span>
				<div style="display: flex;">
					CRW支付 <van-checkbox icon-size="16" shape="square" v-model="checked4" style="font-size: 14px;"></van-checkbox>
				</div>
				<div style="display: flex;">
					购物券支付 <van-checkbox icon-size="16" shape="square" v-model="checked5" style="font-size: 14px;"></van-checkbox>
					</div>
			</div>
			<p style="margin: 10px 16px;font-size: 14px;">您是否了解清楚CR量化产品功能和用户须知?如无疑问和异议,点击'确定'即购买成功,一经购买,不支持任何退换</p>
				
		</van-dialog>
		<van-dialog v-model="bool3" title="进入策略跟随" show-cancel-button :before-close="beforeClose1">
			
			<van-radio-group v-model="radio1" style="display: flex;justify-content: space-around;height: 40px;">
			  <van-radio name="1">现货策略跟随</van-radio>
			  <van-radio name="2">合约策略跟随</van-radio>
			</van-radio-group>
		</van-dialog>
		
	
	</div>
</template>

<script>
	import Vue from "vue";
import { Dialog,Radio,RadioGroup,Checkbox } from "vant";
	Vue.use(Dialog);
	Vue.use(Radio);
	Vue.use(RadioGroup);
	Vue.use(Checkbox);
	export default {
		components: {
			Radio,RadioGroup,Dialog,Checkbox
		},
	  data() {
	    return {
			id:1,
			bool:false,
			list1:[],
			list2:[],
			list3:[],
			point_num:0,
			isshow:false,
			isshow1:false,
			isshow2:false,
			radio1:'2',
			bool3:false,
			checked1:true,
			checked2:false,
			checked3:false,
			checked4:true,
			checked5:false,
			
	    };
	  },
	  created() {
			this.getlist()
			this.getthreelist()
	  },
	  watch:{
	  		 checked1(newValue, oldValue) {
	  		 	if (newValue == true) {
	  		 		this.checked2 = false
	  				this.checked3 = false
	  		 	}
	  		 },
	  		 checked2(newValue, oldValue) {
	  		 	if (newValue == true) {
	  		 		this.checked1 = false
	  				this.checked3 = false
	  		 	}
	  		 },
	  		 checked3(newValue, oldValue) {
	  		 	if (newValue == true) {
	  		 		this.checked2 = false
	  				this.checked1 = false
	  		 	}
	  		 },
	  		 checked4(newValue, oldValue) {
	  		 	if (newValue == true) {
	  		 		this.checked5 = false
	  		 	}
	  		 },
	  		checked5(newValue, oldValue) {
	  			if (newValue == true) {
	  				this.checked4 = false
	  			}
	  		},
	  },
	   methods:{
		   togensui(){
			   // this.bool3 = true
			   this.$router.push('/gensui')
		   },
		   fn3(id){
			   console.log(this.id)
			   this.id =id
			   this.bool = true
		   },
		   getthreelist(){
			   this.$axios
			   	.post("/index/spotstrategy/get_strategy_list", {
			   		symbol:"USDT",
			   		bourse: '1',
			   		types: 1
			   	})
			   	.then(res => {
			   		res.data.list.forEach(item => {
						if(item.status == 1){
							this.isshow = true
						}
			   		})
			   	});
				this.$axios
					.post("/index/swapstrategy/get_strategy_list", {
						symbol:"USDT",
						bourse: '4',
						type: 3
					})
					.then(res => {
						res.data.list.forEach(item => {
										if(item.status == 1){
											this.isshow2 = true
										}
						})
					});
					this.$axios
						.post("/index/follow/get_strategy_list", {
							symbol:"USDT",
							bourse: '4',
							type: 6
						})
						.then(res => {
							res.data.list.forEach(item => {
											if(item.status == 1){
												this.isshow1 = true
											}
							})
						});
		   },
		   getlist(){
			   this.$axios
			   	.post("/index/robot/robot_list",)
			   	.then((res) => {
			   		if (res.data.code == 0) {
			   			this.list1 = res.data.data.[1]
						this.list2 = res.data.data.[2]
						this.list3 = res.data.data.[3]
						this.point_num =res.data.follow_point
			   		} else {
			   			this.$toast.fail({
			   				message: res.data.msg,
			   				duration: 1200
			   			});
			   		}
			   	});
		   },
		   fn2(bool){
			   let str =''
			 
			   this.$toast.fail({
			   	message: `请先激活机器人`,
			   	duration: 1200
			   });
		   },
		   fn(id,bool,show,bool2){
			   if(show){
				   this.$toast.fail({
				   	message: `暂未开放`,
				   	duration: 1200
				   });
				   return
			   }
			   let obj;
			   let str;
			   if(bool2){
				    str = "确认续费"
			   }else{
				   str = "确认激活"
			   }
				   obj={
					   robot_type:id,
				   }
			   Dialog.confirm({
			     title: str,
			     message:
			       `是否${str}`,
			   })
			     .then(() => {
			       // on confirm
			       this.$axios
			       	.post("/index/robot/robot_active", obj)
			       	.then((res) => {
			       		if (res.data.code == 0) {
			       			this.$toast.success({
			       				message: res.data.msg,
			       				duration: 1600
			       			});
							this.getlist()
			       		} else {
			       			this.$toast.fail({
			       				message: res.data.msg,
			       				duration: 1200
			       			});
			       		}
			       	});
			     })
			     .catch(() => {
			       // on cancel
			     });
		   },
		  beforeClose: function(action, done) {
		  	if (action === "confirm") {
				let num;
				let month;
				let type;
				let id;
				if(this.id !=3){
					id = this.id
					if(this.checked1){
						num = 5600
						month = 3
					}
					if(this.checked2){
						num = 9600
						month = 6
					}
					if(this.checked3){
						num = 16800
						month = 12
					}
					
				}else{
					id = 3
					num = 3500
				}
				if(this.checked4){
					type = 2
				}else{
					type = 8
				}
				
				this.$axios
					.post("/index/robot/purchase_robot", {
						num,
						type,
						month,
						robot_type:id,
					})
					.then((res) => {
						if (res.data.code == 0) {
							// this.$toast.success({
							// 	message: res.data.msg,
							// 	duration: 1600
							// });
							this.$axios
								.post("/index/robot/robot_active", {robot_type:id,})
								.then((res) => {
									if (res.data.code == 0) {
										this.$toast.success({
											message: '续费成功',
											duration: 2000
										});
														this.getlist()
									} else {
										this.$toast.fail({
											message: res.data.msg,
											duration: 2000
										});
									}
								});
							// setTimeout(() => {
							// 	this.$router.back();
							// }, 1600);
						} else {
							this.$toast.fail({
								message: res.data.msg,
								duration: 2000
							});
						}
					});
				done()
			} else if (action === "cancel") {
					// 取消
					done(); // 关闭提示框
				}
	   },
	   beforeClose1: function(action, done) {
	   		  	if (action === "confirm") {
					if(this.radio1 == 2){
						this.$router.push('/heyue4')
					}else{
						// this.$router.push('/intetrading4')
						this.$toast.fail({
							message:'暂未开放'
						})
					}
	   				done()
	   			} else if (action === "cancel") {
	   					// 取消
	   					done(); // 关闭提示框
	   				}
	   },
	   },
	   }
</script>

<style lang="less" scoped>
	
	.p{
		margin: 6px 0px 6px 15px;
		color: #323233;
	}
	.item{
		margin: 0 .1rem 0.28rem .25rem;
		padding: .3rem 0 .2rem 0rem;
		display: flex;
		border-radius: 4px;
		border: 1px solid #EEE;
		position: relative;
		overflow: hidden;
		.i-t{
			position: absolute;
			    font-size: 0.2rem;
			    width: 80px;
			    height: 20px;
			    line-height: 20px;
			    color: #fff;
			    text-align: center;
			    right: -23px;
			    -webkit-transform: rotate(50deg);
			    transform: rotate(50deg);
			background-color: #fe931e;
		}
		.active{
			background-color: rgb(254,51,30);
		}
		.active2{
			background-color: rgb(14,138,254);
		}
		.active3{
			background-color: green;
			}
		.img{
			width: 70px;
			height: 70px;
			border-radius: 50%;
			display: block;
			margin-left: 12px;
			margin-bottom: 11px;
		}
		.img1{
			width: 52px;
			margin-left: 23px;
		}
		img{
			width: 98px;
			height: 15px;
			
		}
		.div{
			border-left: 1px solid #EEEEEE;
			padding-left: 10px;
			padding-bottom: 7px;
		}
		div{
			flex: 1;
		}
		.p2{
			font-weight: bold;
			font-size: 15px;
			margin-bottom: 12px;
			margin-left: 4px;
		}
		.p1{
			font-size: 13px;
			color: rgb(153,153,153);
		}
		.button{
			margin-top: 13px;
			margin-left: .9rem;
			position: relative;
			button{
				padding: 0;
				width: 34.4%;
				border-radius: 12px;
				border: 1.2px solid rgb(14,138,254);
				margin-right: 20px;
				color: rgb(14,138,254);
				background-color: #FFFFFF;
				height: 22px;
				line-height: 20px;
				font-size: 0.22rem;
			}
			.active1{
				color: #ccc;
				border: 1.2px solid #ccc;
			}
		}
	}
	.van-radio-group{
		display: flex;
		margin: 20px;
		div{
			flex: 1;
		}
	}
	.bel-dia{
		padding: 6px 16px;
		font-size: 14px;
		
	}
</style>
