<template>
	<div class="intetrading">
		<div class="tophader">
			<van-icon name="arrow-left" style="    width: 1rem;
    height: 0.8rem;
    z-index: 1;
    line-height: .8rem;
    margin-top: -.4rem;"
			 onclick="window.history.go(-1)" />
			<p>跟随交易机器人(现货版)</p>
		</div>
		<img v-show="!type_status" class="statusimg" src="../assets/auto1.png" />
		<img v-show="type_status" class="statusimg" src="../assets/crliang.gif" />
		<div class="topsel" style="position: relative;">
			<p class="left" @click="bounce(1)">
				<img src="../assets/src_resource_icon_user_exchange_okex@2x.png" alt />
				<span>OKEX</span>
			</p>
			<div class="right" style="position: absolute;right: .4rem;top: .53rem;display: flex;">
				<img src="../assets/问好@2x.png" alt @click="bounce(3)" style="margin-top: .02rem;" />
				<div style="font-size: .26rem;" @click="fn8(vipshow)" >{{vipshow?'我是交易员':'申请交易员'}}</div>
			</div>
		</div>
		<p class="hr"></p>
		<div class="headtitle" style="display: flex;padding: .1rem 0 .1rem .3rem;">
			<div>
				<span>|</span>配置
			</div>
			<div style="font-size: .25rem;font-weight: 550;margin-left: 15%;margin-top: .05rem;">USDT余额：{{USDTnum}}</div>
			<div style="font-size: .25rem;font-weight: 550;margin-left: 5%;margin-top: .05rem;">点卡余额：{{pointnum}}</div>
		</div>
		<div class="note-t">
			<div class="div">
				计 价 方 式
				<div></div>
			</div>
			<div class="div2">
				<div class="avtive" style="width: 45%;margin-left: -7px;background: #fff;color: #000;">USDT保证金合约</div>
			</div>
		</div>
		<div class="note-t" v-show="vipshow">
			<div class="div">
				选择交易对
				<div></div>
			</div>
			<div class="div2">
				<div :class="{'avtive':symbol3== 'BTC'}" @click="symbol3='BTC'"><span>BTC</span>/USDT</div>
				<div :class="{'avtive':symbol3=='ETH'}" @click="symbol3='ETH'"><span>ETH</span>/USDT</div>
			</div>
		</div>
		<div class="note-t" v-show="vipshow">
			<div class="div">
				选 择 仓 位
				<div></div>
			</div>
			<div class="div2 ">
				<div :class="{'avtive':monery==5000}" @click="monery=5000">5000 USDT</div>
				<div :class="{'avtive':monery==10000}" @click="$toast.fail({message: '暂未开放',duration: 2000})">10000 USDT</div>
			</div>

		</div>
		
		<p class="headtitle">
			<span>|</span>{{vipshow?'实时监控':'跟随详情'}}
			<button v-show="vipshow" @click="fn2()" style="margin-left: 38%;line-height: 22px; background: #4389eb;color: #fff;border-radius: 4px;font-size: 14px;width: 36%;">一键生成策略</button>
			<button v-show="!vipshow " @click="fn2(true)" style="margin-left: 38%;line-height: 22px; background: #4389eb;color: #fff;border-radius: 4px;font-size: 14px;width: 36%;">选择跟随交易员</button>
		</p>
		<p class="headtitle" style="justify-content: center;">
			<span v-show="!vipshow && strategy_list.length" style="line-height: 22px; border-radius: 4px;font-size: 14px;width: 36%;text-align: center;padding: 3px 6px;border: 1px solid #4389eb;">已跟随"{{tradert.nick_name}}"</span>
		</p>
		<div v-show="!vipshow &&  strategy_list.length " style="display: flex;font-size: 13px;padding: 0 .3rem;line-height: 35px;">
			<div style="flex:1;text-align: left;">
				<div style="border-bottom: 2.5px solid #f5f6fa;display: flex;justify-content: space-between;">
					<p>交 易 货 币
						<div style="width: 2px;height: 16px;background: #E5E5E5;margin-top: 8px;"></div>
						{{tradert.symbol_deal}}/USDT</p>
					<div style="width: 2px;height: 16px;background: #E5E5E5;margin-top: 8px;"></div>
				</div>
				<div class="right" style="border-bottom: 2.5px solid #f5f6fa;display: flex; justify-content: space-between;">
					<p>仓 位 资 金
						<div style="width: 2px;height: 16px;background: #E5E5E5;margin-top: 8px;"></div>
						{{tradert.equity}} USDT</p>
					<div style="width: 2px;height: 16px;background: #E5E5E5;margin-top: 8px;"></div>
				</div>
			</div>
			<div style="flex:1;text-align: left;">
				<div style="border-bottom: 2.5px solid #f5f6fa;padding-left: 15%;display: flex;justify-content: space-between">
					<p>开 仓 张 数
						<div style="width: 2px;height: 16px;background: #E5E5E5;margin-top: 8px;"></div>
						多 {{tradert.up_num}} 空 {{tradert.down_num}}</p>
				</div>
				<div style="border-bottom: 2.5px solid #f5f6fa;padding-left: 15%;display: flex;justify-content: space-between">
					<p> 杠 杆 倍 率
						<div style="width: 2px;height: 16px;background: #E5E5E5;margin-top: 8px;"></div>
						{{tradert.leverage}}倍 </p>
				</div>
			</div>
		</div>

		<div class="headtitle" style="justify-content: space-between;font-size: 13px;">

			<p>总交易笔数: {{count}}笔</p>
			<p>总结算收益$: {{profit}}</p>
		</div>
		<div class="runy">
			<p class="headtitle">
				<span>|</span>运行状态
			</p>
			<p class="headtitle" @click="toshowdetail(true)">
				<span>|</span>持仓详情 <img src="../assets/1008.png" />
			</p>
			<p class="headtitle" @click="toshowdetail()">
				<span>|</span>交易记录 <img src="../assets/1008.png" />
			</p>
		</div>

		<div class="comereult">
			<ul>
				<li v-for="(item,i) in strategy_list" :key="i" style="position: relative;">
					<p class="cometop">
						<span style="font-size: .26rem;line-height: 20px;">
							<!-- <img v-show="item.symbol1" src="../assets/ht.png" alt style="width: 16px;height: 16px;position: absolute;left: 0;top: -2px;"/> -->
							{{item.bidui}}
						</span>
						<span style="font-size: .22rem;margin-left: 17px;"><span class="item-span" :class="{'item-span1':item.zhangfu>0}"
							 style="font-size: .24rem;"> {{item.close1?item.close1:''}}</span> </span>
						<span style="position: absolute;right: 25px;">
							<button style="background:rgb(97,161,240);margin-left: 0;" v-show="item.types==1" @click="fn5(item.id,item.stop_type)">删除策略</button>
							<button style="background:rgb(97,161,240);" v-show="item.types==1" @click="fn6(item)">设置策略</button>
							<button class="button1" :class="{'button3':item.stop_type != 0}" v-if="item.status==0" @click="open_strategy(item.id,)">{{item.stop_type== 0?'开启交易':'恢复交易'}}</button>
							<button style="background:#BD1616" @click="bounce(0,item.id,item.stop_type)" v-else>{{item.stop_type!== 2?'停止交易':'恢复交易'}}</button>
						</span>
					</p>
					<div class="pressbox gundong" v-if="item.status==1">
				
						<p v-if="item.status==1 && item.stop_type == 0"><span>状态: </span> 正在监控中</p>
						<p v-if="item.status==1 && item.stop_type == 2"><span>状态: </span> 止盈后停止</p>
					</div>
					<div class="pressbox" style="background:#BFBFBF;" v-else>
						<p v-if="item.status==0"><span>状态: </span> {{item.stop_type== 0?'未开启':item.stop_type== 3?'清仓停止':item.stop_type== 2?'止盈停止':'临时停止'}}</p>
						<p v-if="item.stop_type==5" class="item1">API KEY 错误</p>
						<p v-if="item.stop_type==7" class="item1">仓位错误</p>
						<p v-if="item.stop_type==8" class="item1">点卡不足</p>
						<p v-if="item.stop_type==9" class="item1">仓位错误</p>
						<p v-if="item.stop_type==6" class="item1">本金不足</p>
					</div>
					<div class="tabul">
						<div>
							<p>建仓单数(单)</p>
				
							<p>{{item.buy_count}}</p>
						</div>
						<div>
							<p>持仓数量({{item.bidui.split('/')[0]}})</p>
							<p>{{item.buy_count_amount}}</p>
						</div>
						<div>
							<p>持仓均价({{item.bidui.split('/')[1]}})</p>
							<p>{{item.buy_count_average}}</p>
				
							<!-- <p>{{item.profit_lv}}%</p> -->
						</div>
						
					</div>
					<div class="tabul" style="padding-top: 0;margin-bottom: 10px;">
						<div>
							<p>尾仓均价({{item.bidui.split('/')[1]}})</p>
										
							<p>{{item.lastprice}}</p>
						</div>
						<div>
							<p>平仓单数(单)</p>
							<p>{{item.sell_count}}</p>
						</div>
						<div>
							<p>实现利润({{item.bidui.split('/')[1]}})</p>
										
							<p>{{item.profit}}</p>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<!-- 左侧弹框 -->
		<van-popup v-model="show" position="left" @click="changleft" class="poup" :style="{ height: '100%' ,width:'50%'}">
			<p class="jiay">选择交易所</p>
			<p class="yopen">已开通智能交易</p>
			<p class="hmoney" @click="clileft('OKEX',4)">
				<img style="width:0.34rem" src="../assets/src_resource_icon_user_exchange_okex@2x.png" alt />OKEX
			</p>

			<p class="yopen">待开通智能交易</p>
			<ul>
				<p class="hmoney">
					<img src="../assets/src_resource_image_page_huobi_logo@2x.png" alt />火币全球站
				</p>
				<li>
					<img src="../assets/src_resource_icon_user_exchange_zb@2x.png" alt />ZB
				</li>
				<li>
					<img src="../assets/src_resource_icon_user_exchange_binance@2x.png" alt />币安
				</li>

			</ul>
			<p class="proxys" style="    display: none;">
				<!-- 县级 -->
				<img src="../assets/xiand.png" alt />
			</p>
		</van-popup>



		<!-- 问题弹框 -->
		<van-popup v-model="matterplay" class="matter">
			<div class="top">CR智能交易注意事项</div>
			<div class="bots">
				<p>1、用户在交易所内生成的API不可绑定IP</p>
				<p>2、在智能交易开启前，交易所中必须先有本金，系统才能执行交易</p>
				<p>3、在智能交易开启后，如有出现手动介入的情况，系统将立即 停止交易。</p>
			</div>
		</van-popup>
		<!-- 关闭交易 -->
		<van-popup v-model="closedeal" class="closedeal">
			<p class="title">关闭交易</p>
			<p class="plesway">请选择关闭交易方式</p>
			<ul>
				<li @click="firmcolse(0)">
					临时停止
					<img v-if="check==0" src="../assets/landian.png" alt />
					<img v-else src="../assets/nocomr.png" alt />
				</li>
				<li @click="firmcolse(2)">
					清仓停止
					<img v-if="check==2" src="../assets/landian.png" alt />
					<img v-else src="../assets/nocomr.png" alt />
				</li>
			</ul>
			<button class="changebton" @click="close_now()" style="background-color: rgb(34, 132, 253);">确定</button>
		</van-popup>
		<!-- 跟随列表 -->
		<van-popup v-model="follow" class="follow">
			<div class="tophader">

				<van-icon name="arrow-left" @click="follow=false" />
				<div style="text-align: center;">交易员列表</div>
			</div>
			<div class="banan">
				<div class="item" v-for="item in trader_list" :key="item.id">
					<div class="one">
						<img :src="item.avatar" class="img1" />
						<div class="center">
							{{item.nick_name}}
							<p>人数有限，只带粉丝</p>
						</div>
						<!-- <img class="img2" src="../assets/13033.png" /> -->
						<button class="right" @click="follow_trader(item.id,item.symbol_deal)">跟随</button>
					</div>
					<div class="two">
						<div class="left">
							<p>交易货币对: {{item.symbol_deal}}/USDT</p>
						</div>
						<div class="right">
							<p>开仓张数:</p>
						</div>
					</div>
					<div class="two">
						<div class="left">
							<p>仓位资金(USDT): {{item.equity}}</p>
						</div>
						<div class="right">
							<p>杠杆倍率: {{item.leverage}} </p>
						</div>
					</div>
				</div>

			</div>
		</van-popup>
		<div class="gifclas" :style="{display:istxt==-1?'none':'block'}">
			<img src="../assets/ddd.gif" />
			<p>
				{{istxt==5?'API KEY错误':istxt==8?'点卡不够'
        :istxt==6?'本金不足':istxt==7?'仓位错误':istxt==0?'系统正在获取数据定制策略':istxt==-10?'获取成功':''}}
			</p>
		</div>
		<van-dialog v-model="show2" title="预算设置" show-cancel-button :before-close="beforeClose">
			<p style="height: 15px;"></p>
			<div style="display: flex;flex-flow:row wrap">
				<div  class="heyue-body" >
					<span>首单金额:</span>
					<input v-model="backinfo.first_amount" type="number"/>
					<span>$</span>
				</div>
				<div  class="heyue-body" >
					<span>补仓倍率:</span>
					<input v-model="backinfo.repair_scale" type="number"/>
					<span>倍</span>
				</div>
				<div  class="heyue-body" >
					<span>做单数量:</span>
					<input v-model="backinfo.order_num" type="number"/>
					<span>单</span>
				</div>
				<div  class="heyue-body" >
					<span>买入涨幅:</span>
					<input v-model="backinfo.rise" type="number"/>
					<span>%</span>
				</div>
				<div  class="heyue-body heyue-body1" >
					<span>买入跌幅:</span>
					<input v-model="backinfo.fall" type="number"/>
					<span>%</span>
				</div>
				<div  class="heyue-body heyue-body1" >
					<span>跌幅回调:</span>
					<input v-model="backinfo.fall_back" type="number"/>
					<span>%</span>
				</div>
				<div  class="heyue-body heyue-body1" >
					<span>补仓跌幅:</span>
					<input v-model="backinfo.repair_fall" type="number"/>
					<span>%</span>
				</div>
				<div  class="heyue-body heyue-body1" >
					<span>补仓回调:</span>
					<input v-model="backinfo.repair_fall_back" type="number"/>
					<span>%</span>
				</div>
				<div  class="heyue-body heyue-body1" >
					<span>止盈比例:</span>
					<input v-model="backinfo.profit_stop" type="number"/>
					<span>%</span>
				</div>
				<div  class="heyue-body heyue-body1" >
					<span>止盈回调:</span>
					<input v-model="backinfo.profit_stop_back" type="number"/>
					<span>%</span>
				</div>
				
				</div>
			<p class="imgge1">止损设置
				<span style="font-weight: 500; font-size: 12px;margin-right: 0.2rem;display: flex;">
					<div style="margin-right: 4px;line-height: 34px;height: 34px;">关</div>
					<van-switch v-model="show5" size=".26rem" />
					<div :class="{'active2':show5}" style="margin-left: 4px;line-height: 34px;height: 34px;">开</div>
				</span>
			</p>
			<p class="imgge1" style="background-color: #FFFFFF;font-weight: 500;" v-show="show5">止损类型
				<span class="item" :class="{'active':show6}">
					<span @click="show6 = true"><span v-show="show6"></span></span>
					逐单止损
				</span>
				<span class="item" :class="{'active':!show6}" style="margin-right: 10%">
					<span @click="show6 = false"> <span v-show="!show6"></span></span>
					整体止损
				</span>
			</p>
			<div class="divli" v-show="show5">
				<p>
					<span class="onespan">止损比例</span>
				</p>
				<p class="right">
					<span>
						<input type="text" v-model="backinfo.loss_stop" class="inputclass" placeholder="请输入" /> %
					</span>
				</p>
			</div>
			<p style="height: 15px;"></p>
		</van-dialog>
		<van-dialog v-model="show3" title="设置预算" show-cancel-button :before-close="beforeClose">
			<p style="height: 15px;"></p>
			<div style="display: flex;flex-flow:row wrap">
				<div  class="heyue-body" >
					<span>首单金额:</span>
					<input v-model="backinfo.first_amount" type="number"/>
					<span>$</span>
				</div>
				<div  class="heyue-body" >
					<span>补仓倍率:</span>
					<input v-model="backinfo.repair_scale" type="number"/>
					<span>倍</span>
				</div>
				<div  class="heyue-body" >
					<span>做单数量:</span>
					<input v-model="backinfo.order_num" type="number"/>
					<span>单</span>
				</div>
				<div  class="heyue-body" >
					<span>买入涨幅:</span>
					<input v-model="backinfo.rise" type="number"/>
					<span>%</span>
				</div>
				<div  class="heyue-body heyue-body1" >
					<span>买入跌幅:</span>
					<input v-model="backinfo.fall" type="number"/>
					<span>%</span>
				</div>
				<div  class="heyue-body heyue-body1" >
					<span>跌幅回调:</span>
					<input v-model="backinfo.fall_back" type="number"/>
					<span>%</span>
				</div>
				<div  class="heyue-body heyue-body1" >
					<span>补仓跌幅:</span>
					<input v-model="backinfo.repair_fall" type="number"/>
					<span>%</span>
				</div>
				<div  class="heyue-body heyue-body1" >
					<span>补仓回调:</span>
					<input v-model="backinfo.repair_fall_back" type="number"/>
					<span>%</span>
				</div>
				<div  class="heyue-body heyue-body1" >
					<span>止盈比例:</span>
					<input v-model="backinfo.profit_stop" type="number"/>
					<span>%</span>
				</div>
				<div  class="heyue-body heyue-body1" >
					<span>止盈回调:</span>
					<input v-model="backinfo.profit_stop_back" type="number"/>
					<span>%</span>
				</div>
				
				</div>
				<p class="imgge1">止损设置
					<span style="font-weight: 500; font-size: 12px;margin-right: 0.2rem;display: flex;">
						<div style="margin-right: 4px;line-height: 34px;height: 34px;">关</div>
						<van-switch v-model="show5" size=".26rem" />
						<div :class="{'active2':show5}" style="margin-left: 4px;line-height: 34px;height: 34px;">开</div>
					</span>
				</p>
				<p class="imgge1" style="background-color: #FFFFFF;font-weight: 500;" v-show="show5">止损类型
					<span class="item" :class="{'active':show6}">
						<span @click="show6 = true"><span v-show="show6"></span></span>
						逐单止损
					</span>
					<span class="item" :class="{'active':!show6}" style="margin-right: 10%">
						<span @click="show6 = false"> <span v-show="!show6"></span></span>
						整体止损
					</span>
				</p>
				<div class="divli" v-show="show5">
					<p>
						<span class="onespan">止损比例</span>
					</p>
					<p class="right">
						<span>
							<input type="text" v-model="backinfo.loss_stop" class="inputclass" placeholder="请输入" /> %
						</span>
					</p>
				</div>
			<p style="height: 15px;"></p>
		</van-dialog>
		<van-popup v-model="follow" class="follow">
			<div class="tophader">
		
				<van-icon name="arrow-left" @click="follow=false" />
				<div style="text-align: center;">交易员列表</div>
			</div>
			<div class="banan">
				<div class="item" v-for="item in trader_list" :key="item.id">
					<div class="one">
						<img :src="item.avatar" class="img1" />
						<div class="center">
							{{item.nick_name}}
							<p>人数有限，只带粉丝</p>
						</div>
						<!-- <img class="img2" src="../assets/13033.png" /> -->
						<button class="right" @click="follow_trader(item.id,item.symbol_deal)">跟随</button>
					</div>
					<div class="two">
						<div class="left">
							<p>交易货币对: {{item.symbol_deal}}/USDT</p>
						</div>
						<div class="right">
							<p>开仓张数:</p>
						</div>
					</div>
					<div class="two">
						<div class="left">
							<p>仓位资金(USDT): {{item.equity}}</p>
						</div>
						<div class="right">
							<p>杠杆倍率: {{item.leverage}} </p>
						</div>
					</div>
				</div>
		
			</div>
		</van-popup>
	</div>
</template>

<script>
	import Vue from 'vue';
	import {
		Dialog,
		Field,
		Popup
	} from 'vant';
	Vue.use(Field);
	Vue.use(Dialog);
	Vue.use(Popup);
	export default {
		components: {
			Dialog,
			Field,
			Popup
		},
		data() {
			return {
				vipshow: false,
				value: '',
				number: '',
				number2: '',
				show2: false,
				isshow: false,
				isshow2: false,
				show: false,
				showrt: false,
				matterplay: false,
				bidui: false,
				jsbidui: false,
				trandshow: false,
				closedeal: false,
				width: 0,
				seletext: "",
				selt: "",
				selectsymbol: [{
						a: "USDT",
						b: 1
					},
					{
						a: "ETH"
					},
					{
						a: "BTC"
					},
					{
						a: "HT"
					}
				],
				list: [{
					a: "智能做多交易"
				}, {
					a: "自定做多交易"
				}],
				index: 0,
				check: 0,
				count: 0,
				profit: 0,
				bourse: "",
				strategy_list: [],
				symbol_list: [],
				types: 1,
				selsym: [],
				symbol: "USDT",
				jysymbol: 0,
				istxt: -1,
				principal: "",
				clilefttxt: "选择交易所",
				doing: 0,
				principals: "",
				selarr: [],
				noopsycheid: "",
				checked: true,
				time1: '',
				index1: '',
				time: '',
				pointnum: '',
				ljsyl: '',
				list3: [],
				show3: false,
				show5: false,
				show6: true,
				backinfo: {
					profit_stop_case: 1,
					loss_stop_case: 1,
					loss_stop_switch: 0
				},
				bool2: false,
				bool3: false,
				huobi: true,
				type_status:false,
				monery:5000,
				symbol3: 'ETH',
				USDTnum: '',
				tradert: {},
				loss_stop: '',
				trader_list: [],
				follow:false
			};
		},
		created() {
			this.$axios.post("/index/follow/is_trader").then(res => {
				if (res.data.code == 0) {
					if (res.data.is_trader == 1) {
						this.vipshow = true
					}
				}
				this.start()
				if(!this.vipshow){
					// this.trader_detail()
				}
				
			});
			// this.$axios
			// 	.post("/index/robot/robot_systerm", {
			// 		robot_type:1,
			// 	})
			// 	.then((res) => {
			// 		if (res.data.code == 0) {
			// 			if(res.data.state != 1){
			// 				console.log(66)
			// 				this.$router.push('/shangchen')
			// 			}
			// 		} 
			// 	});
			if (localStorage.getItem("bourse") == 1) {
				this.bourse = localStorage.getItem("bourse");
			}
			this.$axios
				.get("/index/mywallet/mywalletInfo", {
					page: 1,
					limit: 1
				})
				.then(res => {
					let info = res.data.info;
					this.pointnum = info.point_num
					
				})
			// this.start();
			if (this.bourse == 4) {
				this.selectsymbol[3].a = "OKB";
			}
		},
		watch: {
			symbol(newValue, oldValue) {
				this.strategy_list = []
				clearInterval(this.time1)
				this.timer = null;
				this.start(newValue)
				this.start1(true)
			},
			show6(newValue, oldValue) {
				if (newValue) {
					this.backinfo.loss_stop_case = 0
				} else {
					this.backinfo.loss_stop_case = 1
				}
			},
			show5(newValue, oldValue) {
				if (newValue) {
					this.backinfo.loss_stop_switch = 1
				} else {
					this.backinfo.loss_stop_switch = 0
				}
			},
			
			bool3(newValue, oldValue) {
				if (newValue) {
					this.selsym = []
				}
			},
		},
		beforeDestroy() {
			clearInterval(this.time1)
			this.time1 = null;
		},
		methods: {
			beforeClose: function(action, done) {
					  	if (action === "confirm") {
							this.fn4(true)
							done()
						} else if (action === "cancel") {
								// 取消
								done(); // 关闭提示框
							}
			},
			fn2(bool) {
				if (bool) {
				this.follow = true
					this.$axios
						.post("/index/follow/trader_list")
						.then((res) => {
							if (res.data.code == 0) {
								this.trader_list = res.data.info
							}
						});
				
				} else {
					this.show2 = true
				}
				if (!this.bool2) {
					this.backinfo = {}
					this.backinfo = {
						profit_stop_case: 1,
						loss_stop_case: 1,
						loss_stop_switch: 0
					}
				}
			},
			fn4(bool = false) {
				if (bool) {
					if (
						!this.backinfo.first_amount ||
						!this.backinfo.order_num ||
						!this.backinfo.rise ||
						!this.backinfo.fall ||
						!this.backinfo.fall_back ||
						!this.backinfo.repair_fall ||
						!this.backinfo.repair_fall_back ||
						!this.backinfo.repair_scale ||
						!this.backinfo.profit_stop ||
						!this.backinfo.profit_stop_back
					) {
						return this.$toast.fail({
							message: "请填写完整",
							duration: 1200
						});
					}
					if (!this.backinfo.loss_stop_switch == 0 && !this.backinfo.loss_stop) {

						return this.$toast.fail({
							message: "请填写完整",
							duration: 1200
						});
					}
					if (this.show5 && this.backinfo.loss_stop == 0) {
						return this.$toast.fail({
							message: "止损比例不能设置为零",
							duration: 3200
						});
					}
					let str;
					this.istxt = 100;
					console.log(this.bool2)
					if (this.bool2) {
						let obj = {
							first_amount: this.backinfo.first_amount,
							order_num: this.backinfo.order_num,
							rise: this.backinfo.rise,
							fall: this.backinfo.fall,
							fall_back: this.backinfo.fall_back,
							repair_fall: this.backinfo.repair_fall,
							repair_fall_back: this.backinfo.repair_fall_back,
							repair_scale: this.backinfo.repair_scale,
							profit_stop: this.backinfo.profit_stop,
							profit_stop_back: this.backinfo.profit_stop_back,
							profit_stop_case: this.backinfo.profit_stop_case,
							loss_stop_case: this.backinfo.loss_stop_case,
							loss_stop_switch: this.backinfo.loss_stop_switch,
							loss_stop: this.backinfo.loss_stop,
							symbol: this.backinfo.symbol,
							bourse: this.backinfo.bourse,
							types: 1,
							symbol_deal: this.backinfo.symbol_deal,
							id: this.backinfo.id
						}
						this.backinfo = obj
						str = 'set_strategy'
					} else {
						this.backinfo.symbol = this.symbol
						this.backinfo.bourse = this.bourse
						this.backinfo.types = 1
						this.backinfo.symbol_deal = this.symbol3
						console.log(this.backinfo)
						this.backinfo.amount = this.monery
						str = 'set_strategy_all'
						this.jysymbol = 0
					}
					this.bool3 = true
					this.$axios
						.post(`/index/spotstrategy/${str}`, this.backinfo)
						.then(res => {
							if (res.data.code == 1) {
								this.istxt = -1;
								this.$toast.fail({
									message: res.data.msg,
									duration: 2000
								})
							} else {
								setTimeout(() => {
									this.istxt = res.data.err_code;
								}, 1000);
								if (this.istxt == 0) {
									setTimeout(() => {
										this.istxt = -10;
									}, 4000);
								}
								setTimeout(() => {
									this.istxt = -1;
									this.start();
								}, 5000);
							}
						})

				}
				this.show3 = false
				this.bool2 = false
			},
			fn5(id, type) {
				console.log(id, type)
				if (type == 2) {
					this.$toast.fail({
						message: "止盈停止后才可删除",
						duration: 2000
					})
					return
				}
				Dialog.confirm({
					title: '提醒',
					message: '是否删除策略？',
				}).then(() => {
					this.$axios
						.post("/index/spot/delete_strategy", {
							'strategy_id': id
						})
						.then(res => {
							if (res.data.code == 0) {
								this.$toast.fail({
									message: "删除成功",
									duration: 2000
								})
								this.start();
							} else {
								this.$toast.fail({
									message: res.data.msg,
									duration: 2000
								})
							}
						})
				})

			},
			fn6(item) {
				if (item.stop_type == 2) {
					this.$toast.fail({
						message: "止盈停止后才可设置",
						duration: 2000
					})
					return
				}
				this.bool2 = true
				this.backinfo = item

				if (this.backinfo.loss_stop_case == 0) {
					this.show6 = true
				} else {
					this.show6 = false
				}

				if (this.backinfo.loss_stop_switch == 1) {
					this.show5 = true
				} else {
					this.show5 = false
				}
				this.show3 = true
			},
			tocaozuo() {
				this.$axios
					.get("/index/article/newsArt", {
						page: 1,
						limit: 1
					})
					.then(res => {
						this.$router.push({
							path: 'noticedateil',
							query: {
								id: res.data.info[0].article_id
							}
						})
					});
			},
			onInput(i, id) {
				this.index1 = i
				if (this.strategy_list[i].status == 1) {
					this.closedeal = true
					this.closeid = id
				} else {
					this.open_strategy(id, i)
				}

			},
			toshowdetail() {
				if (!this.bourse) {
					this.$toast.fail({
						message: "请选择交易所",
						duration: 2000
					})
					return
				}
				clearInterval(this.time1)
				this.time1 = null;
				this.$router.push('showdetail?bourse=' + this.bourse + '&type=1&poni=1')
			},
			clileft(s, num) {
				this.bourse = num;
				localStorage.setItem("bourse", num);
				this.start();
			},
			closecli() {
				this.$axios.post("/index/strategy/delete_strategy").then(res => {
					if (res.data.code == 0) {
						localStorage.clear();
						this.principals = "";
						this.principal = "";
						this.$toast.success({
							message: res.data.msg,
							duration: 1200
						});
						this.start();
					} else {
						this.$toast.fail({
							message: res.data.msg,
							duration: 1200
						});
					}
				});
			},
			send() {

				if (!this.bourse)
					return this.$toast.fail({
						message: "请选择交易所",
						duration: 1200
					});
				if (this.types == 1)
					return this.$toast.fail({
						message: "请点击去设置",
						duration: 1200
					});
				if (this.jysymbol == 0)
					return this.$toast.fail({
						message: "请选择交易币对",
						duration: 1200
					});
				var obj = {};
				obj.types = this.types;

				obj.bourse = this.bourse;
				obj.symbol = this.symbol;
				obj.symbol1 = this.selsym.join(",");
				if (this.types == 1) {
					if (obj.gridswitch) {
						obj.gridswitch = "open";
					} else {
						obj.gridswitch = "close";
					}
					if (obj.lossswitch) {
						obj.lossswitch = "open";
					} else {
						obj.lossswitch = "close";
					}
				} else {
					obj.noopsycheid = this.noopsycheid;
				}

				this.istxt = 100;
				this.$axios.post("/index/strategy/set_strategy_all", obj).then(res => {
					this.principal = res.data.principal;
					// localStorage.setItem("principal",this.principal);
					if (res.data.code == 0) {
						localStorage.setItem("bourse", this.bourse);
						setTimeout(() => {
							this.istxt = res.data.err_code;
						}, 1000);
						if (this.istxt == 0) {
							setTimeout(() => {
								this.istxt = -10;
							}, 8000);
						}
						setTimeout(() => {
							this.istxt = -1;
							this.start();
						}, 10000);
					} else {
						if (res.data.err_code) {
							setTimeout(() => {
								this.istxt = res.data.err_code;
							}, 1000);
							setTimeout(() => {
								this.istxt = -1;
							}, 10000);
						}
					}
				});
			},
			start1(is = false) {
				if (localStorage.getItem("symbol")) {
					this.symbol = localStorage.getItem("symbol");
				}
				//取利润
				this.$axios
					.post("/index/spotstrategy/get_monitoring_total", {
						symbol: this.symbol,
						bourse: this.bourse,
						types: this.types
					})
					.then(res => {
						this.count = res.data.count;
						this.profit = res.data.profit;
						this.doing = res.data.doing;
						this.ljsyl = res.data.ljsyl
						if (res.data.principal) {
							this.principal = res.data.principal;
						}
					});
				if (this.bourse) {
					// this.$axios
					// 	.post("/index/spotstrategy/get_balance", {
					// 		symbol: this.symbol,
					// 		bourse: this.bourse
					// 	})
					// 	.then(res => {
					// 		if (res.data.code == 0 && res.data.principal) {
					// 			this.principal = res.data.principal;
					// 			this.principals = res.data.principal;
					// 		} else {
					// 			layer.open({
					// 				content: res.data.msg,
					// 				skin: "msg",
					// 				time: 2
					// 			});
					// 		}
					// 	});
				}


			},
			start(bool) {
				if (!bool) {
					this.start1();
				}
				clearInterval(this.time1)
				this.time1 = null;
				this.$axios
					.post("/index/spotstrategy/get_strategy_list", {
						symbol: this.symbol,
						bourse: this.bourse,
						types: this.types
					})
					.then(res => {
						this.strategy_list = res.data.list;
						let that = this
						if (this.strategy_list.length > 0) {
							this.strategy_list.forEach((item, index) => {
								item.close1 = ''
								if(item.status == 1){
									that.type_status = true
								}
								this.$axios.get(`/index/rank/get_market?symbol_pair=${item.symbol_deal + item.symbol}`).then(res1 => {
									let datas = res1.data
									item.close1 = datas.data.close
								})
								this.$set(this.strategy_list, index, item)
							})
							this.time1 = setInterval(() => {
								this.strategy_list.forEach((item, index) => {
									this.$axios.get(`/index/rank/get_market?symbol_pair=${item.symbol_deal + item.symbol}`).then(res1 => {
										let datas = res1.data
										item.close1 = datas.data.close
										// item.zhangfu =(datas.close -datas.open)/datas.open * 100
									})
									this.$set(this.strategy_list, index, item)
								})
								return
							}, 9000)
						}


					});
			},
			selecli(i) {
				this.index = i;
				this.types = Number(i) + 1;
				localStorage.setItem("index", i);
				var str = "this.$refs.selt" + i;
				var dom = eval(str);
				var strf = dom[0].innerHTML;

				this.seletext = strf.substring(0, 2) + strf.substring(4, 6);
				// this.types = i + 1;
				this.start();

				this.seletext = strf;
			},

			selecli_symbol1(i) {
				this.selectsymbol = [{
						a: "USDT"
					},
					{
						a: "ETH"
					},
					{
						a: "BTC"
					},
					{
						a: "HT"
					}
				];
				if (this.bourse == 4) {
					this.selectsymbol[3].a = "OKB";
				}
				this.selectsymbol[i].b == 1 ?
					(this.selectsymbol[i].b = 0) :
					(this.selectsymbol[i].b = 1);
			},
			selecli_symbolcli1() {
				for (var i = 0; i < this.selectsymbol.length; i++) {
					if (this.selectsymbol[i].b == 1) {
						this.symbol = this.selectsymbol[i].a;
						localStorage.setItem("symbol", this.symbol);
						this.jysymbol = 0;
						this.selsym = [];
						this.start();
					}
				}
				this.jsbidui = false;
				this.start1();
				// 这里
			},
			selecli_symbolcli(i, index) {
				let obj = this.list3[index]
				if (obj.bool) {
					obj.bool = !obj.bool
				} else {
					obj.bool = true
				}
				this.$set(this.list3, index, obj)
				// this.selsym = [];
				this.selsym.push(this.list3[index].symbol1)
				this.selsym = [...new Set(this.selsym)]
				console.log(this.selsym)
				if (this.selsym.length > 10) {
					return this.$toast.fail({
						message: "最多只能选则10个币对",
						duration: 1200
					});
				}
				this.jysymbol = this.selsym.length;
				// this.bidui = false;
				// this.send()
			},
			changleft() {
				// this.index=1;
				//  this.seletext="自定做多交易";
				this.show = false;
			},
			changright() {
				this.bidui = false;
				this.jsbidui = false;
			},
			bounce(s, i, type) {
				if (s == 0) {
					console.log(type)
					if (type == 2) {
						this.$axios
							.post("/index/spot/profit_restart", {
								id: i
							})
							.then(res => {
								this.start();
							});
					} else {
						this.closedeal = true;
					}
					this.closeid = i;
				} else if (s == 1) {
					this.show = true;
				} else if (s == 2) {
					this.showrt = true;
				} else if (s == 3) {
					this.matterplay = true;
				} else if (s == 4) {
					if (!this.bourse)
						return this.$toast.fail({
							message: "请选择交易所",
							duration: 2000
						});
					this.bidui = true;
					this.getxingqing()
				} else if (s == 5) {
					this.jsbidui = true;
				}
			},
			getxingqing() {
				this.huobi = true
				this.list3 = []
				// if(this.list3.length>0){
				// 	console.log(this.list3)
				// 	return
				// }
				this.jysymbol = 0
				this.$axios
					.post("/index/spotstrategy/get_sug_symbol", {
						symbol: this.symbol,
						bourse: this.bourse
					})
					.then(res => {
						console.log(this.strategy_list)
						if (this.strategy_list) {
							let arr = []
							this.strategy_list.forEach(item => {
								res.data.sug_list.forEach(item1 => {
									let str = item1.symbol1.toUpperCase() + '/' + item1.symbol.toUpperCase()
									// console.log(str,item.bidui)
									if (item.bidui == str) {
										console.log(str)
										item1.bool = true
									}
									arr.push(item1)
								})
							})
							this.list3 = res.data.sug_list

						} else {
							this.list3 = res.data.sug_list
						};
					})
			},
			getzhuliu() {
				this.huobi = false
				this.list3 = []
				console.log(this.symbol)

				this.$axios
					.post("/index/strategy/get_symbol", {
						symbol: this.symbol,
						bourse: this.bourse
					})
					.then(res => {
						console.log(this.strategy_list)
						if (this.strategy_list) {
							let arr = []
							this.strategy_list.forEach(item => {
								res.data.symbol.forEach(item1 => {
									let str = item1.symbol1.toUpperCase() + '/' + item1.symbol.toUpperCase()
									// console.log(str,item.bidui)
									if (item.bidui == str) {
										console.log(str)
										item1.bool = true
									}
									arr.push(item1)
								})
							})
							this.list3 = res.data.symbol

						} else {
							this.list3 = res.data.symbol
						};
					})
			},
			firmcolse(s) {
				this.check = s;
			},
			trandplay(s) {
				if (s == 0) {
					this.trandshow = true;
				} else {
					this.trandshow = false;
				}
			},
			open_strategy(s, i) {
				this.$axios.post("/index/spot/start_strategy", {
					id: s
				}).then(res => {
					if (res.data.code == 0) {
						this.$toast.success({
							message: res.data.msg,
							duration: 2000
						});
						this.start();
						// this.strategy_list[i].status = 1
					} else {
						this.$toast.fail({
							message: res.data.msg,
							duration: 2000
						});
					}
				});
			},
			close_now() {
				if (this.check == 0) {
					clearInterval(this.time1)
					this.time1 = null;
					// var id = s;
					this.$axios
						.post("/index/spot/pause_strategy", {
							id: this.closeid
						})
						.then(res => {
							if (res.data.code == 0) {
								this.$toast.success({
									message: res.data.msg,
									duration: 2000
								});

								this.$axios
									.post("/index/spotstrategy/get_strategy_list", {
										symbol: this.symbol,
										bourse: this.bourse,
										types: this.types
									})
									.then(res => {
										// this.strategy_list = res.data.list;
										res.data.list.forEach((item, index) => {

											this.$set(this.strategy_list, index, item)
											if(item.status == 1){
												this.type_status = true
											}
										})
									});

								this.closedeal = false;
							} else {
								this.$toast.fail({
									message: res.data.msg,
									duration: 2000
								});
								this.closedeal = false;
							}
						});
				} else if (this.check == 1) {
					this.$axios
						.post("/index/spot/profit_stop", {
							id: this.closeid
						})
						.then(res => {
							if (res.data.code == 0) {
								this.$toast.success({
									message: res.data.msg,
									duration: 2000
								});
								this.start();
								this.closedeal = false;
							} else {
								this.$toast.fail({
									message: res.data.msg,
									duration: 2000
								});
								this.closedeal = false;
							}
						});

				} else if (this.check == 2) {
					this.$axios
						.post("/index/spot/clearance", {
							id: this.closeid
						})
						.then(res => {
							if (res.data.code == 0) {
								this.$toast.success({
									message: res.data.msg,
									duration: 2000
								});
								this.start();
								this.closedeal = false;
							} else {
								this.$toast.fail({
									message: res.data.msg,
									duration: 2000
								});
								this.closedeal = false;
							}
						});

				} else {
					// var id = s;
					this.$axios
						.post("/index/spot/pause_forced", {
							id: this.closeid
						})
						.then(res => {
							if (res.data.code == 0) {
								this.$toast.success({
									message: res.data.msg,
									duration: 2000
								});
								this.start();
								this.closedeal = false;
							} else {
								this.$toast.fail({
									message: res.data.msg,
									duration: 2000
								});
								this.closedeal = false;
							}
						});
				}
			}
		}
	};
</script>
<style lang="less" scoped>
	.tophader {
		.playicon {
			position: unset;
			font-size: 0.3rem;
			transform: rotate(90deg);
		}
	}

	.topsel {
		padding: 0.2rem 0.3rem;
		display: flex;
		justify-content: space-between;

		.left {
			font-size: 0.3rem;

			img {
				width: 0.32rem;
				margin-right: 0.2rem;
				position: relative;
				top: 0.05rem;
			}
		}

		.right {
			margin-top: -0.3rem;

			img {
				width: 0.28rem;
				height: 0.28rem;
				margin-right: 0.24rem;
			}

			span {
				font-size: 0.6rem;
				position: relative;
				top: -0.1rem;
			}
		}
	}

	.poup {
		p {
			border-bottom: 1px solid #e5e5e5;
		}

		.jiay {
			font-size: 0.3rem;
			font-weight: bold;
			padding: 0.5rem 0.3rem 0.1rem;
		}

		.yopen {
			color: #666666;
			font-size: 0.2rem;
			padding: 0.1rem 0.3rem;
		}

		.hmoney {
			padding: 0.3rem;
			font-size: 0.24rem;
			font-weight: bold;

			img {
				width: 0.24rem;
				position: relative;
				top: 0.06rem;
				margin-right: 0.2rem;
			}
		}

		li {
			padding: 0.3rem;
			border-bottom: 1px solid #e5e5e5;
			font-size: 0.24rem;
			font-weight: bold;

			img {
				width: 0.32rem;
				height: 0.32rem;
				position: relative;
				top: 0.06rem;
				margin-right: 0.2rem;
			}
		}

		.proxys {
			position: absolute;
			bottom: 4%;
			border: none;
			left: 32%;

			img {
				width: 1.42rem;
			}
		}
	}

	.matter {
		top: 42%;
		width: 90%;
		min-height: 50%;

		.top {
			background: url("../assets/news.png") no-repeat;
			background-size: 100%;
			height: 2.33rem;
			line-height: 2.33rem;
			color: #fff;
			font-size: 0.36rem;
			padding-left: 0.3rem;
		}

		.bots {
			padding: 0.3rem;

			p {
				font-size: 0.22rem;
				margin-bottom: 0.3rem;
			}
		}
	}

	.runy {
		display: flex;
		justify-content: space-between;
		padding: 0.1rem 0.3rem;
		border-bottom: 2.5px solid #f5f6fa;
		font-size: 0.3rem;

		p {
			text-align: center;
		}

		p:nth-of-type(3) {
			text-align: right;
		}

		.headtitle {
			text-align: left;
			padding: 0;
			border: none;
			display: flex;

			span {
				display: block;
				margin-top: -1px;
				color: #2185ff;
				margin-right: 0.1rem;
				line-height: 19px;
			}

		}
	}

	.headtitle {
		padding: 0.1rem 0.3rem;
		border-bottom: 2px solid #f5f6fa;
		display: flex;

		div {
			display: flex;
		}

		span {
			display: block;
			margin-top: 0px;
			color: #2185ff;
			margin-right: 0.1rem;
		}

		p {
			border: 1px solid #2284fd;
			width: 48%;
			border-radius: 6px;
			padding: 9px 0;
			text-align: center;
			margin: 4px 0;
		}

		img {
			width: 11px;
			height: 11px;
			margin-top: 5px;
			margin-left: 2px;
		}
	}

	.strategy {
		padding: 0.1rem 0.1rem 0.1rem 0.2rem;
		border-bottom: 2.5px solid #f5f6fa;
		position: relative;

		p {
			display: flex;
			justify-content: space-between;
			font-size: 0.24rem;
			padding: 0.1rem 0;

			i {
				color: #333333;
			}
		}

		p span:nth-of-type(1) {
			color: #999999;
		}

		.seting {
			position: absolute;
			right: 0.5rem;
			top: 0.5rem;
			color: #2185ff;

			i {
				color: #2185ff;
				position: relative;
				top: 0.04rem;
				margin-left: 0.1rem;
			}
		}
	}

	.changebton {
		background: #3243a4;
		margin: 0.3rem auto 0.2rem;
		height: 0.76rem;
		line-height: 0.76rem;
	}

	.tranumber {
		padding: 0.2rem 0.3rem;
		border-bottom: 4px solid #f5f6fa;
		display: flex;
		justify-content: space-between;

		.cent {
			width: 30%;

			color: #000000;
			border: 1px solid rgb(34, 132, 253);
			box-sizing: border-box;
			padding: 5px;
			border-radius: 5px;
			font-size: 0.24rem;
			text-align: center;

			.box {
				width: 100%;
				height: 100%;
				border-radius: 5px;
				background-color: #ffffff;

				.box1 {
					margin-top: 0.1rem;
					color: #000000;
				}
			}

			p {
				line-height: 0.4rem;
			}
		}
	}

	.comereult {
		margin: 0rem auto 0.5rem;

		li {
			border-bottom: 2px solid #e5e5e5;
			padding: 0.2rem 0.3rem 0;
		}

		.cometop {
			display: flex;

			img {
				width: 0.17rem;
				height: 0.25rem;
				margin-right: 0.3rem;
			}

			button {
				color: #fff;
				font-size: 0.2rem;
				border-radius: 10px;
				margin-left: 0.2rem;
				transform: scale(0.9);
				height: 0.32rem;
				line-height: 0.3rem;
			}
		}

		.pressbox {
			height: 0.1rem;
			color: rgb(15, 171, 244);
			font-size: 0.2rem;
			position: relative;
			margin: 0.25rem 0.15rem 0 0;
			border-radius: 3px;
			display: flex;
			margin-left: 2.3rem;

			p {
				justify-content: space-between;
				flex: 1;
				text-align: center;
				position: absolute;
				left: -113px;
				top: -7px;

				span {
					color: #000000;
				}
			}

			.item1 {
				left: 20px;
			}

			.press {
				position: absolute;
				height: 100%;
				border-radius: 3px;
			}
		}

		.tabul {
			display: flex;
			justify-content: space-between;
			padding-top: 0.3rem;
			flex-flow: wrap;
			font-size: 0.26rem;

			div {
				// width: 32%;
				flex: 1;
				// margin-bottom: 0.3rem;
				padding: 5px 0;
				text-align: center;
				border: 1px solid #eee;
			}



			div p:nth-of-type(1) {
				color: #bababa;
			}


		}
	}

	.tabul1 {
		position: relative;
		// min-height: 70px;
		margin-top: 10px;

		.button {
			width: 104%;
			// position: absolute;
			// left: -2%;
			margin-bottom: 8px;
			font-size: 0.2rem;
			display: flex;
			justify-content: space-around;
			// top: -4px;

			button {
				line-height: 20px;
				color: rgb(199, 199, 199);
				border: 1px solid rgb(188, 187, 193);
				border-radius: 4px;
				background-color: #FFFFFF;
			}

			.active {
				background-color: #4389eb;
				color: #FFFFFF;
				border: 1px solid #4389eb;
			}

			#green {
				background-color: #30a740;
				color: #fff;
				border: 0
			}

			#red {
				background: #d74e5a;
				color: #fff;
				border: 0;
			}
		}
	}

	.closedeal {
		padding: 0.5rem 0.3rem 0.3rem;
		background: url("../assets/closeback.png") no-repeat;
		background-size: 100%;
		border-radius: 5px;
		width: 65%;

		.title {
			font-size: 0.36rem;
			color: #000000;
		}

		.title,
		.plesway {
			text-align: center;
		}

		.plesway {
			color: #808080;
			font-size: 0.24rem;
			margin: 0.2rem 0 0.4rem;
		}

		li {
			font-size: 0.28rem;
			color: #000000;
			border-bottom: 1px solid #80808029;
			padding: 0.3rem 0 0.1rem;
			display: flex;
			justify-content: space-between;

			img {
				width: 0.32rem;
				height: 0.32rem;
			}
		}

		.changebton {
			width: 100%;
		}
	}

	.gundong {
		width: 64.5%;
		background: url(../assets/gundong7.gif) no-repeat;
		background-size: 100% 100%;
	}

	.gifclas {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 122;

		img {
			width: 100%;
			position: absolute;
			top: 50%;
			margin-top: -50%;
		}

		p {
			font-size: 0.3rem;
			text-align: center;
			position: absolute;
			top: 50%;
			margin-top: -25%;
			width: 1.8rem;
			color: #fff;
			left: 50%;
			margin-left: -0.9rem;
		}
	}

	.item-span {
		display: flex;

		.van-icon {
			display: block;
			margin-top: 0.05rem;
		}
	}

	.active6 {
		border-bottom: 1px solid rgb(34, 132, 253);
		color: rgb(34, 132, 253);
	}

	.item-span {
		color: #ffffff;
		background-color: #d74e5a;
		margin-top: 1px;
	}

	.item-span1 {
		color: #ffffff;
		background-color: rgb(48, 167, 64);
	}

	.poup-title {
		display: flex;
		position: relative;
		padding: 0.2rem;
		border-bottom: 4px solid #e5e5e5;

		div {
			margin-left: 0.4rem;
		}

		.item {
			color: #000000;
			margin-left: 0.7rem;
			font-size: 15px;
		}

		.about {
			background-color: rgb(34, 132, 253);
			width: 3px;
			height: 17px;
			position: absolute;
			left: 0px;
			top: 12px;
		}
	}

	.poup-body {
		// width: 100%;
		display: flex;
		padding: 0.2rem;
		border-bottom: 1px solid #e5e5e5;

		span {
			flex: 1;
			font-size: 16px;
			text-align: center;
		}
	}

	.poup .li-item {
		display: flex;
		font-size: 16px;

		div {
			flex: 1;
			font-weight: 500;
			text-align: left;
		}

		.active {
			color: rgb(244, 17, 10);
		}

		.active1 {
			color: rgb(69, 196, 58);
		}
	}

	.button1 {
		background: rgb(97, 161, 240);
	}

	.button3 {
		background: #bd1616;
	}

	.poup-title {
		.xiahuaxian {
			border-bottom: 1px solid #2284fd;
			color: #2284fd;
		}
	}

	.van-checkbox {
		margin-left: 17px;
		flex: 1;
	}

	.van-cell {
		width: 50%;
	}

	.van-radio--horizontal {
		margin-right: 35px;
		margin-left: 16px;
	}



	.heyue-body {
		width: 42%;
		display: flex;
		margin-left: 16px;
		overflow: hidden;
		color: #646566;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
		border-bottom: 1px solid #ebedf0;
		line-height: 35px;

		input {
			width: 37%;
			text-align: center;
		}
	}

	.note-t {
		display: flex;
		margin: 4px 0px 0;
		background-color: #fff;
		border-bottom: 2.5px solid #f5f6fa;

		.item {
			display: flex;
			font-size: 13px;
			color: rgb(130, 130, 130);
			justify-content: space-around;
			flex: 1;
			line-height: 28px;

			.div1 {
				display: flex;

				div {
					border: 1px solid #eee;
					width: 40px;
					height: 22px;
					line-height: 22px;
					margin-left: 2px;

					input {
						width: 40px;
						border-radius: 3px;
						text-align: center;
						display: block;
					}
				}

			}

		}

		.div2 {
			display: flex;
			flex: 1;
			justify-content: space-around;
			margin-top: 5px;
			margin-bottom: 5px;
			flex-flow: row wrap;

			div {
				width: 37%;
				border: 1px solid #eee;
				text-align: center;
				font-size: 12px;
				color: rgb(130, 130, 130);
				border-radius: 4px;
				line-height: 20px;

				span {
					color: #000;
				}
			}

			.avtive {
				span {
					color: #fff;
				}

				color: #fff;
				font-size: 12px;
				background:#4389eb;
				border: 1px solid #4389eb;
			}


		}

		.div {
			line-height: 28px;
			width: 25%;
			display: flex;
			text-align: center;
			padding-left: 5%;
			justify-content: space-between;
			font-size: 13px;

			div {
				width: 2px;
				height: 16px;
				background-color: rgb(229, 229, 229);
				margin-top: 6px;
				margin-right: 7px;
			}
		}
	}

	/deep/.van-checkbox__label {
		margin-left: 1px;
	}

	.statusimg {
		position: absolute;
		top: 44px;
		left: 47%;
		width: 30px;
		height: 40px;
	}

	.follow {
		width: 100%;
		height: 100%;
		background-color: #f5f9fc;
		// padding:  20px 30px;
	}

	.banan {
		padding: 0 .28rem;

		.item {
			margin-top: .2rem;
			padding: .14rem;
			min-height: 2.13rem;
			background-color: #FFFFFF;

			.one {
				display: flex;
				background-color: rgb(247, 251, 254);
				padding: .2rem 0 .15rem .15rem;
				justify-content: space-between;
				border-radius: 8px;

				.img1 {
					width: 40px;
					height: 40px;
					border-radius: 50%;
					margin-right: 11px;
				}

				.img2 {
					width: 47px;
					height: 36px;
					margin-top: -.2rem;
				}

				.center {
					font-size: 15px;
					font-weight: 550;
					flex: 1;

					p {
						margin-top: 5px;
						font-size: 12px;
						font-weight: 500;
						color: rgb(169, 173, 182);
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						// width: 193px;
						width: 100%;
					}
				}

				.right {
					background-color: rgb(30, 105, 250);
					color: #FFFFFF;
					line-height: 22px;
					width: 55px;
					border-radius: 9px;
					margin-top: 3%;
					margin-right: 3%;
					font-size: 13px;
					height: 22px;
				}
			}

			.two {
				display: flex;
				justify-content: space-between;
				margin-top: 6px;

				div {
					color: #000000;
					font-size: 18px;
					// flex: 1;
					text-align: center;
				}

				p {
					margin-top: 1px;
					// color: rgb(169, 173, 182);
					font-size: 13px;
				}

				.left {
					// width: 25%;
					text-align: left;
				}

				.right {
					// width: 32%;
					text-align: right;
				}

				.center {
					flex: 1;
				}

			}
		}
	}

	.imgge1 {
		height: 34px;
		margin-top: 10px;
		line-height: 34px;
		// font-weight: 550;
		font-size: 15px;
		background-color: rgb(240, 240, 240);
		padding-left: .2rem;
		display: flex;
		justify-content: space-between;
		color: #646566;
	.item {
			// margin-left: 4%;
			display: flex;
			font-size: 14px;

			span {
				width: 10px;
				height: 10px;
				border-radius: 50%;
				margin-top: 10px;
				border: 1px solid rgb(157, 153, 153);
				display: block;
				margin-right: 3.5px;
			}
		}
		.active {
			color: #000000;
		
			span {
				border: 1px solid rgb(33, 103, 255);
				padding: 1px;
				width: 8px;
				height: 8px;
				background-color: #FFFFFF;
				position: relative;
		
				span {
					width: 4px;
					height: 4px;
					background-color: rgb(33, 103, 255);
					position: absolute;
					top: -9px;
				}
			}
		}
		
		.active2 {
			color: #2167ff;
		}
		.van-switch {
			margin-top: 0.15rem;
		}
	}
	
	.follow {
		width: 100%;
		height: 100%;
		background-color: #f5f9fc;
		// padding:  20px 30px;
	}
	
	.banan {
		padding: 0 .28rem;
	
		.item {
			margin-top: .2rem;
			padding: .14rem;
			min-height: 2.13rem;
			background-color: #FFFFFF;
	
			.one {
				display: flex;
				background-color: rgb(247, 251, 254);
				padding: .2rem 0 .15rem .15rem;
				justify-content: space-between;
				border-radius: 8px;
	
				.img1 {
					width: 40px;
					height: 40px;
					border-radius: 50%;
					margin-right: 11px;
				}
	
				.img2 {
					width: 47px;
					height: 36px;
					margin-top: -.2rem;
				}
	
				.center {
					font-size: 15px;
					font-weight: 550;
					flex: 1;
	
					p {
						margin-top: 5px;
						font-size: 12px;
						font-weight: 500;
						color: rgb(169, 173, 182);
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						// width: 193px;
						width: 100%;
					}
				}
	
				.right {
					background-color: rgb(30, 105, 250);
					color: #FFFFFF;
					line-height: 22px;
					width: 55px;
					border-radius: 9px;
					margin-top: 3%;
					margin-right: 3%;
					font-size: 13px;
					height: 22px;
				}
			}
	
			.two {
				display: flex;
				justify-content: space-between;
				margin-top: 6px;
	
				div {
					color: #000000;
					font-size: 18px;
					// flex: 1;
					text-align: center;
				}
	
				p {
					margin-top: 1px;
					// color: rgb(169, 173, 182);
					font-size: 13px;
				}
	
				.left {
					// width: 25%;
					text-align: left;
				}
	
				.right {
					// width: 32%;
					text-align: right;
				}
	
				.center {
					flex: 1;
				}
	
			}
		}
	}
	.divli {
		font-size: 14px;
		display: flex;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		position: relative;
		padding: .1rem .2rem .1rem .2rem;
		font-size: .3rem;
		background: #fff;
		border-bottom: 1px solid #eee;
				color: #646566;
		.right {
			color: #000;
	
			.inputclass {
				text-align: right;
			}
		}
	}
	
</style>
