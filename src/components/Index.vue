<template>
	<div class="index">
		<van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
			<div style="display: flex;justify-content: space-between;">
				<div class="tophader" onclick="window.history.go(-1)">
					<p style="margin-left: .2rem;">
						<img src="../assets/title2.png" alt />
					</p>
				</div>
				<div class="index-img">
					<img @click="$router.push('callcenter')" src="../assets/kefu.png" style="margin-bottom: 4px;margin-left: 6px;" />
				</div>
			</div>

			<van-swipe :show-indicators="false" :autoplay="4000" indicator-color="white">
				<van-swipe-item v-for="(item,i) in info" :key="i">
					<div class="boxall">
						<div class="box" style="height: 140px;">
							<img :src="url + item.pic" alt style="height: 100%;" />
						</div>
					</div>
				</van-swipe-item>
			</van-swipe>

			<div class="gonite">
				<img src="../assets/msgt.png" alt />

				<div class="gobox" style="height: .4rem;
    width: 84%;
    overflow: hidden;">
					<marquee color="#333" background="none" class="vanbar" v-if="list.length>0">
						<span @click="$router.push('noticedateil?id='+list[0].article_id)">{{list[0].title}}</span>
					</marquee>

				</div>
				<div @click="$router.push('more')" style="font-size: 14px;color: rgb(155,155,155);">
					{{$t('index.more')}}
				</div>
			</div>

			<p class="hr" style="height: 1px;margin: 0px 20px -3px;background-color: #F5F5F5;"></p>

			<div class="index-body">
				<div class="item" v-if="btcbox" @click="$router.push(`klinechart?symboldeal=btc&height=${height}`)">
					<div>
						BTC/USDT
					</div>
					<div class="two twoact" :class="{'twoactive':(btcbox.close - btcbox.open)/btcbox.open<0}">{{btcbox.close}}
					</div>
					<div class="two" :class="{'twoactive':(btcbox.close - btcbox.open)/btcbox.open<0}">
						<p class="p">
							<span>{{(btcbox.close - btcbox.open)/btcbox.open>0?'+':''}}</span>{{(btcbox.close - btcbox.open).toFixed(2)}}
							(<span>{{(btcbox.close - btcbox.open)/btcbox.open>0?'+':''}}</span>{{((btcbox.close - btcbox.open)/btcbox.open*100).toFixed(2)}}%)</p>
					</div>
				</div>
				<div  @click="$router.push(`klinechart?symboldeal=eth&height=${height}`)" class="item" v-if="ethbox">
					<div>
						ETH/USDT
					</div>
					<div class="two twoact" :class="{'twoactive':(ethbox.close - ethbox.open)/ethbox.open<0}">{{ethbox.close}}
					</div>
					<div   class="two" :class="{'twoactive':(ethbox.close - ethbox.open)/ethbox.open<0}">
						<p class="p">
							<span>{{(ethbox.close - ethbox.open)/ethbox.open>0?'+':''}}</span>
							{{(ethbox.close - ethbox.open).toFixed(2)}}
						(<span>{{(ethbox.close - ethbox.open)/ethbox.open>0?'+':''}}</span>{{((ethbox.close - ethbox.open)/ethbox.open*100).toFixed(2)}}%)</p>
					</div>
				</div>
				<div class="item">
					<div>
						USDT/CNY
					</div>
					<div class="two twoact" :class="{'twoactive':usdcny.open<0}">{{usdcny.mon}}
					</div>
					<div class="two" :class="{'twoactive':usdcny.open<0}">
						<p>
							<span style="font-size: 12px;">{{usdcny.hy>0?'+':''}}{{usdcny.hy}}</span>
							(<span style="font-size: 12px;">{{usdcny.hy>0?'+':''}}{{usdcny.open}}%</span>)
							</p>
					</div>
				</div>
			</div>
			<p class="hr" style="height: 6px;"></p>
			<div style="display: flex;width: 100%;" v-if="img && img.cr_index">
				<div style="width: 60%;height: 2.5rem;"><img :src="url + img.cr_index" style="width: 100%;height: 2.5rem;" /></div>
				<div style="width: 40%;height: 2.5rem;border-left: 6px solid #f6f7f9;">
					<div style="width: 100%;text-align: center;height: 47%;position: relative;"><img @click="$router.push('fenxiang')"
						 :src="url + img.cr_share" style="width: 100%;height:100%;" /></div>
					<p class="hr" style="height: 6%;"></p>
					<div style="width: 100%;text-align: center;height: 47%;position: relative;"><img @click="$router.push({path:'more',query:{type:1}})"
						 :src="url + img.cr_welfare" style="width: 100%;height:100%;" /></div>
				</div>
			</div>
			<p class="hr"></p>
			<div class="bootom" style="margin-bottom: 55px;">
				<div class="body" style="font-size: 0.3rem;padding: .14rem 2% .1rem 2%;">
					<div>{{$t('index.Cryptocurrency')}}</div>
					<div style="margin-left: 7%;">{{$t('index.Latestprice')}}</div>
					<div>{{$t('index.Updown')}}</div>
				</div>
				<div v-show="listbox" class="body" v-for="(item,index) in listbox" style="padding: 0.17rem 0.17rem 0.17rem 0" :key="index" @click="$router.push(`klinechart?symboldeal=${symbollist[index]}&height=${height}`)">
					<img class="index-img1 index-img2" src="../assets/XTVCUSDT.svg" />
					<img v-show="index==0" class="index-img1" src="../assets/XTVCBTC.svg" />
					<img v-show="index==1" class="index-img1" src="../assets/XTVCETH.svg" />
					<img v-show="index==2" class="index-img1" src="../assets/XTVCXRP.svg" />
					<img v-show="index==3" class="index-img1" src="../assets/XTVCBCH.svg" />
					<img v-show="index==4" class="index-img1" src="../assets/XTVCLTC.svg" />
					<img v-show="index==5" class="index-img1" src="../assets/XTVCEOS.svg" />
					<img v-show="index==6" class="index-img1" src="../assets/XTVCETC.svg" />
					<img v-show="index==7" class="index-img1" src="../assets/XTVCLINK.svg" />
					<img v-show="index==8" class="index-img1" src="../assets/XTVCBSV.svg" />
					<img v-show="index==9" class="index-img1" src="../assets/XTVCDOT.svg" />
					<img v-show="index==10" class="index-img1" src="../assets/XTVCFIL.svg" />
					<img v-show="index==11" class="index-img1" src="../assets/XTVCADA.svg" />
					<div class="one" >{{symbollist[index].toLocaleUpperCase()}}<span>/USDT</span>

						<p>{{introlist[index] + ' / '+ 'Tether USD'}}</p>
					</div>

					<div class="two" :class="{'twoactive':(item.close - item.open)/item.open<0}" style="flex: 1;">{{item.close}}
					</div>
					<div class="three" :class="{'active':(item.close - item.open)/item.open<0}">
						<span style="font-size: 12px;">{{(item.close - item.open)/item.open>0?'+':''}}</span>{{((item.close - item.open)/item.open*100).toFixed(2)}}%
					</div>
				</div>
			</div>
			<!-- <iframe src="/01.html" :width="width+'px'" height="800px" style="border: 0;"></iframe> -->
		</van-pull-refresh>

	</div>
</template>

<script>
	import {
		wss
	} from '../api/ws.js'
	export default {
		name: 'index',
		data() {
			return {
				isLoading: false,
				info: [],
				list: [],
				mygao: [],
				title: "",
				img: {},
				listbox: [],
				usdcny: {
					mon: 6.52,
					hy: 0.07,
					open:0.12
				},
				btcbox: {
					close: 58136.51,
					open: -1395
				},
				ethbox: {
					close: 1795.7,
					open: -2576
				},
				symbollist: ['btc', 'eth', 'xrp', 'bch', 'ltc', 'eos', 'etc', 'link', 'bsv', 'dot', 'fil', 'ada'],
				time: '',
				url: '',
				websct: {},
				introlist: ['Bicoin', 'Ethereum', 'Ripple', 'Bitcoin Cash Node',
					'Litecoin', 'EOS', 'Ethereum', 'ChainLink', 'Bitcoin SV', 'Polkadot', 'Filecoin', 'Cardano'
				],
				height: document.body.clientHeight - 118
			};
		},
		created() {
			this.start()
			if(!this.huobiwsurl){
				this.$axios.get('/index/market/get_url').then(res=>{
					if(res.data.code == 0){
						this.huobiwsurl =res.data.market_url
					}else{
						this.huobiwsurl = 'wss://api.huobiasia.vip/ws'
					}
				  this.getsymbollist()
				})
			}else{
				this.getsymbollist()
			}
		},
		updated() {},
		beforeDestroy() {
			if (this.websct.onclose) {
				this.websct.onclose()
			}
		},
		methods: {
			getsymbollist(){
				wss(this.symbollist, this.huobiwsurl, (data, wes) => {
					this.symbollist.forEach((item, index) => {
						if (data.ch.indexOf(item) != -1) {
							this.$set(this.listbox, index, data.tick)
							if (index == 0) {
								this.btcbox = data.tick
							}
							if (index == 1) {
								this.ethbox = data.tick
							}
						}
					})
					this.websct = wes
				})
			},
			onRefresh() {
				clearInterval(this.time)
				this.time = null
				this.start()
				setTimeout(() => {
					this.isLoading = false;
				}, 1000);
			},
			start() {
				
				
				this.$axios
					.get("/index/article/aotuMarketImg")
					.then(res => {
						this.img = res.data.info;
					});
				this.$axios
					.get("/index/article/image", {
						page: 1,
						limit: 10
					})
					.then(res => {
						this.info = res.data.info;
					});

				this.$axios
					.get("/index/article/newArt", {
						page: 1,
						limit: 1
					})
					.then(res => {
						this.list = res.data.info;
					});
				this.$axios
					.get("/index/article/indexArt", {
						page: 1,
						limit: 10
					})
					.then(res => {
						this.mygao = res.data.info;
					});
				this.$axios
					.get("/index/market/get_usdt_price")
					.then(res => {
						if(res.data.code == 0){
							let data = res.data.info
							let mon = ((data[0]-data[1])*1).toFixed(2)
							let open = ((data[0]-data[1])/data[1]).toFixed(3)
							this.usdcny = {
								mon: data[0],
								hy: mon,
								open:open
							}
						}
					});

			},

		}
	};
</script>

<style lang="less" scoped>


	.tophader {
		img {
			position: unset;
			height: 0.4rem;
			width: auto;
			margin-top: 0.3rem;
		}
	}

	.gonite {
		padding: 0.1rem 0.3rem;
		height: 0.4rem;
		overflow: hidden;
		display: flex;

		.gobox {
			display: flex;
		}

		span {
			color: #333333;
			margin-right: 2rem;
			font-size: .25rem;
			font-weight: bold;
		}

		img {
			height: 0.22rem;
			position: relative;
			margin-right: 0.2rem;
			top: 50%;
			margin-top: -0.11rem;
		}

		.vanbar {
			width: 100%;
			height: 100%;
			line-height: 0.4rem;
			padding: 0;
			font-size: 0.24rem;
		}
	}
	.index-img {
		margin-top: 6px;

		img {
			width: .35rem;
			height: .35rem;
			margin-right: .4rem;
			margin-top: .2rem;
		}
	}

	.index-body {
		padding: .24rem;
		display: flex;
		// justify-content: space-around;
		text-align: center;

		.item {
			flex: 1;
			// border-right: 1px solid #eee;
			text-align: center;

			div {
				position: relative;
				font-size: 14px;
				// font-weight: 550;
				color: #000;

				.index-img1 {
					top: 0.1rem;
					left: 0rem;

					width: 0.3rem;
					height: 0.3rem;
				}

				.index-img2 {
					left: -0.1rem;
					top: 0rem;
					margin-right: 0rem;
					position: absolute;
				}
			}

			.two {
				color: #00b464;
			}

			.twoact {
				font-weight: 550;
				margin: 0.1rem 0;
				font-size: 16px;
			}

			.twoactive {
				color: rgb(201, 81, 111)
			}

			.p {
				flex: 1;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-size: 12PX;
			}
		}

		.active {
			p {
				color: #25a67e;

				span {
					// font-size: 13px;
					background-color: rgb(252, 222, 224);
				}
			}
		}
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

			.one {
				font-size: 14px;
				color: #000000;

				p {
					font-size: 12px;
					font-weight: 540;
					color: rgb(169, 167, 168);
					margin-top: 4px;
					width: 1.9rem;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap
				}
			}

			.two {
				color: #605e5f;
				text-align: center;
				margin-top: .2rem;
				color: #00b464;
			}

			.twoactive {
				color: rgb(240, 93, 90)
			}

			.three {
				color: #FFFFFF;
				background-color: rgb(0, 191, 137);
				margin-top: 5px;
				height: 27px;
				width: 55px;
				line-height: 27px;
				text-align: center;
				font-size: 13px;
			}

			.active {
				// color: #FFFFFF;
				background-color: rgb(240, 93, 90)
			}

			// .active1 {
			// 	color: rgb(255, 120, 88);

			// }
		}
	}


	.index-img1 {
		width: .36rem;
		height: .36rem;
		position: absolute;
		left: .15rem;
		top: .25rem;
		// display: block;
		// margin-right: 9px;
		// margin-top: 0px;
		border-radius: 50%;
	}

	.index-img2 {
		position: relative;
		left: .1rem;
		margin-right: .35rem;
	}
</style>
