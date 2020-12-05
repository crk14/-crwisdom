<template>
	<div style="font-size: 14px;min-height: 100%;padding-bottom: 20px;">
		<div class="tophader">
		  <van-icon name="arrow-left" onclick="window.history.go(-1)"  />
		  <p >我的机器人</p>
		</div>
		<p class="hr" style="height: 2px;"></p>
		<div class="itme1">
			<img style="width: 100%;height: 125px;" src="../assets/mejq.png"/>
			<div class="item">
				<p>
					<img class="img" src="../assets/sc002.png" />
					<img src="../assets/crwindow.png" />
				</p>
				<div >
					<div class="div">
						<p class="p2" >现货量化机器人(专业版)</p>
						<p class="p1">剩余时长: <span style="color: rgb(255,147,31);margin-left: 16px; font-size: 23px;font-weight: bold;">{{list1?list1.remain_day:'0'}}</span><span style="color: rgb(103,103,103);font-size: 14px;">天</span> <span v-show="list1 && list1.probation">(试用期可进入系统)</span> </p>
						<p class="p1">激活时间: {{list1 &&list1.active_time?list1.active_time:'未激活'}}</p>
					</div>
					
					<div class="button">
						<button  v-show="!list1" @click="fn(1,list1)" >试用7天</button>
						<button  v-show="list1" @click="fn(1,list1)" :class="{'active1':list1 && list1.active}" >激活</button>
						<button @click="list1&& list1.active || list1.probation?$router.push(`/intetrading2?time=${list1.remain_day}`):fn2(true)">进入系统</button>
					</div>
				</div>
				<div v-show="list1 && list1.active " class="i-t">已激活</div>
				<div v-show="list1 && list1.active == 0 && list1.remain_day &&!list1.probation" class="i-t active">待激活</div>
				<div v-show="!list1 " class="i-t active2">未购买</div>
				<div v-show="list1 &&list1.remain_day &&list1.probation " class="i-t active3">试用期</div>
			</div>
			<div class="item">
				<p>
					<img class="img" src="../assets/sc003.png" />
					<img src="../assets/crwindow.png" />
				</p>
				<div >
					<div class="div">
						<p class="p2" >合约量化机器人(专业版)</p>
						<p class="p1">剩余时长: <span style="color: rgb(255,147,31);margin-left: 16px; font-size: 23px;font-weight: bold;">{{list2?list2.remain_day:'0'}}</span><span style="color: rgb(103,103,103);font-size: 14px;">天</span> <span v-show="list2 &&list2.probation">(试用期可进入系统)</span></p>
								<p class="p1">激活时间: {{list2 &&list2.active_time?list2.active_time:'未激活'}}</p>
							</div>
							
							<div class="button">
								<button  v-show="!list2" @click="fn(2,list2)" >试用7天</button>
								<button  v-show="list2" @click="fn(2,list2)" :class="{'active1':list2 && list2.active}" >激活</button>
								<button @click="list2&& list2.active|| list2.probation?$router.push(`/heyue2?type=2&time=${list2.remain_day}`):fn2(true)">进入系统</button>
							</div>
						</div>
						<div v-show="list2 && list2.active " class="i-t">已激活</div>
						<div v-show="list2 && list2.active == 0 && list2.remain_day &&!list2.probation" class="i-t active">待激活</div>
						<div v-show="!list2 " class="i-t active2">未购买</div>
						<div v-show="list2 &&list2.remain_day &&list2.probation " class="i-t active3">试用期</div>
						
			</div>
			<div class="item">
				<p>
					<img class="img" src="../assets/sc004.png" />
					<img src="../assets/crwindow.png" />
				</p>
				<div >
					<div class="div">
						<p class="p2" >合约量化机器人(智能版)</p>
						<p class="p1">剩余点卡: <span style="color: rgb(255,147,31);margin-left: 16px; font-size: 23px;font-weight: bold;">{{Number(point_num).toFixed(0)}}</span><span style="color: rgb(103,103,103);font-size: 14px;"></span>点 <span v-show="list3 &&list3.probation">(试用期可进入系统)</span></p>
					<p class="p1">激活时间: {{list3 &&list3.active_time?list3.active_time:'未激活'}}</p>
						</div>
						
						<div class="button">
							<button  v-show="!list3" @click="fn(3,list3,true)" >试用7天</button>
							<button v-show="list3" @click="fn(3,list3)" :class="{'active1':list3 && list3.active}" >激活</button>
							<button @click="list3&& list3.active|| list3.probation?$router.push('/heyue2?type=3'):fn2(true)">进入系统</button>
						</div>
					</div>
					<div v-show="list3 && list3.active " class="i-t">已激活</div>
					<div v-show="list3 && list3.active == 0 && list3.remain_day &&!list3.probation" class="i-t active">待激活</div>
					<div v-show="!list3 " class="i-t active2">未购买</div>
					<div v-show="list3 &&list3.remain_day &&list3.probation " class="i-t active3">试用期</div>
					
			</div>
		</div>
		<van-dialog v-model="bool" title="续费须知" show-cancel-button :before-close="beforeClose">
			<div class="p">续费名称: {{id==1?'现货量化机器人(专业版)的时长':id==2?'合约量化机器人(专业版)的时长':'合约量化机器人(智能版)的点卡'}}</div>
			<div class="p" v-show="id !=3">续费时长：365天</div>
			<div class="p" v-show="id ==3">购买点卡：16800点</div>
			<div style="display: flex;margin:6px 0px 15px 15px" class="p">
				<span >续费金额：16800CRW</span>
			</div>
		</van-dialog>
		
		
	
	</div>
</template>

<script>
	import Vue from "vue";
import { Dialog } from "vant";
	Vue.use(Dialog);
	export default {
		components: {
		},
	  data() {
	    return {
			id:1,
			bool:false,
			list1:[],
			list2:[],
			list3:[],
			point_num:0
	    };
	  },
	  created() {
			this.getlist()
	  },
	   methods:{
		   getlist(){
			   this.$axios
			   	.post("/index/robot/robot_list",)
			   	.then((res) => {
			   		if (res.data.code == 0) {
			   			this.list1 = res.data.data.[1]
						this.list2 = res.data.data.[2]
						this.list3 = res.data.data.[3]
						this.point_num =res.data.point_num
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
		   fn(id,bool,show){
			   if(show){
				   this.$toast.fail({
				   	message: `暂未开放`,
				   	duration: 1200
				   });
				   return
			   }
			   let obj;
			   let str
			   if(!bool){
				   // this.fn2()
				   // return
				   obj={
					   robot_type:id,
					   probation:1
				   }
				   str = "确认试用"
			   }else{
				   obj={
					   robot_type:id,
				   }
				   str = "确认激活"
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
</style>
