
<template>
	<div>
		<div class="title">
			
			<van-icon name="arrow-left"  onclick="window.history.go(-1)"/>
			<div class="right">
				<img src="../assets/5c95d15bec485@2x.png" />
				<div>1352****020
				<p>杠杆10倍，最大跟随5~10单,爱仕达多</p>
				<!-- <p>已入驻平台31天</p> -->
				</div>
			</div>
		</div>
	<div class="body">
		
			<div class="left">
				200
				<p>累计跟随人数</p>
			</div>
			
			<div class="center">
				23100.00
				<p>跟单总收益(USDT)</p>
			</div>
			
			<div class="right">
				+100.00%
				<p>近三周胜率</p>
			</div>
			<div class="left" style="margin-top: -7px;">
				135
				<p>交易笔数</p>
			</div>
			
			<div class="center" style="margin-top: -7px;">
				23100.00
				<p>跟随者总收益(USDT)</p>
			</div>
			
			<div class="right" style="margin-top: -7px;color: rgb(53,183,135);" >
				+100.00%
				<p style="color: #FFFFFF;">收益率</p>
			</div>
	</div>
	<div class="item">
		<div class="one">
			<div :class="{'active':bool}" style="text-align: right;margin-right: 20px;margin-left: 32%;" @click="bool=true">历史带单<p v-show="bool"></p></div>
			<div @click="bool=false" :class="{'active':!bool}">跟随者<p v-show="!bool" style="margin-left: 37%;"></p></div>
		</div>
		<div class="two" v-show="bool">
			<div class="left">
				<div class="top">BTC/USDT <div>多仓·20X</div></div>
				<div class="bottom">
					<div>9103.00
					<p>开仓价</p>
					</div>
					<div style="text-align: center;">9318.00
					<p >平仓价</p>
					</div>
					<div style="text-align: right;color: rgb(53,183,135);">+45.21%
					<p>收益率</p>
					</div>
				</div>
			</div> 
			<button class="button" v-show="id==1" >已满员</button>
			<button class="button active"  v-show="id==2" @click.stop="$router.push('/gdset?id='+2)">跟随</button>
		</div>
		<div class="two" v-show="!bool">
			<div class="left" style="display: flex;">
				<img src="../assets/5c95d15bec485@2x.png"/>
				<div class="center">
					176****3078
					<p>跟随总额 34107.586USDT</p>
				</div>
				<div class="right">
					+1718.8762
					<p>跟随收益USDT</p>
				</div>
			</div>
		</div>
	</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
		bool:true,
		id:''
    };
  },
  created() {
  	this.id=this.$route.query.id
	console.log(this.id)
  }
  
};
</script>

<style lang="less" scoped>
	.title{
		padding: 0 .28rem;
		margin: .22rem 0;
		font-size: .37rem;
		position: relative;
		font-weight: 550;
		i{
			position: absolute;
			left: 9px;
			top: 4px;
		}
		.right{
			color: rgb(95,94,94);
			padding-top: 10px;
			display: flex;
				flex: 1;
				text-align: left;
				margin-left: 30px;
				img{
					width: 50px;
					height: 50px;
					border-radius: 50%;
					margin-right: 16px;
				}
				p{
					font-size: .27rem;
					font-weight: 540;
					white-space:nowrap;
					overflow:hidden;
					text-overflow:ellipsis;
					width: 210px;
					margin-top: 2px;
				}
		}
	}
	.body{
		// background-color: rgb(67,103,253);
		background: url(../assets/11022.png) no-repeat;
		height: 3.8rem;
		display: flex;
		color: #FFFFFF;
		flex-wrap: wrap;
		div{
			// flex: .3;
			width: 33%;
			text-align: center;
			margin-top: 28px;
			font-size: 17px;
			p{
				margin-top: 10px;
				font-size: 13px;
			}
		}
	}
	.item{
		background-color: #FFFFFF;
		border-radius: 15px 15px 0 0;
		min-height: 5rem;
		margin-top: -18px;
		.one{
			padding-top: 10px;
			height: 30px;
			line-height: 30px;
			font-weight: 550;
			color: rgb(163,169,179);
			display: flex;
			div{
				text-align: left;
				p{
					height: 2px;
					width: 20px;
					background-color: rgb(84,114,210);
					margin-left: 30%;
				}
			}
			.active{
				color: #000000;
			}
		}
		.two{
			width: 100%;
			.button{
				position: fixed;
				bottom: 20px;
				left: 33%;
				width: 140px;
				padding: 5px 6px;
				color: rgb(230,107,75);
				background-color: rgb(255,241,244);
			}
			.active{
				color: rgb(18,184,122);
				background-color: rgb(233,248,243);
			}
			.left{
				border-top: 1px solid #EEEEEE;
				padding: .28rem;
				line-height: 24px;
				img{
					width: 50px;
					height: 50px;
					border-radius: 50%;
					margin-right: 16px;
					// margin-top: 5px;
				}
				.center{
					font-size: 17px;
					p{
						font-size: 14px;
						color: rgb(144,147,156);
					}
				}
				.right{
					font-size: 17px;
					text-align: right;
					flex: 1;
					color: rgb(18,184,122);
					p{
						font-size: 14px;
						color: rgb(144,147,156);
					}
				}
				.top{
					display: flex;
					div{
						color: rgb(18,184,122);
						background-color: rgb(233,248,243);
						padding: 2px;
						margin-left: 6px;
						font-size: 14px;
						line-height: 20px;
					}
				}
				.bottom{
					margin-top: 12px;
					display: flex;
					justify-content: space-between;
					div{
						flex: 1;
						font-size: 18px;
						p{
							font-size: 14px;
							color: rgb(137,144,152);
						}
					}
				}
			}
		}
		
	}
</style>

