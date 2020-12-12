<template>
	<div class="intetrading">
		<div class="tophader">
			<van-icon name="arrow-left" style="    width: 1rem;
    height: 0.8rem;
    z-index: 1;
    line-height: .8rem;
    margin-top: -.4rem;"
			 onclick="window.history.go(-1)" />
			<p>合约量化交易</p>
		</div>
		<div class="topsel" style="position: relative;">
			<p class="left" @click="bounce(1)">
				<img v-if="bourse==1" src="../assets/src_resource_image_page_huobi_logo@2x.png" alt />
				<img v-else-if="bourse==4" src="../assets/src_resource_icon_user_exchange_okex@2x.png" alt />
				<img v-else src="../assets/selt.png" alt />
				<span>{{bourse==1?'火币全球站':bourse==4?'OKEX':'选择交易所'}}</span>
			</p>
			<div class="right" style="position: absolute;right: .4rem;top: .53rem;display: flex;">
				<img src="../assets/问好@2x.png" alt @click="bounce(3)" style="margin-top: .02rem;" />
				<div style="font-size: .26rem;" @click="tocaozuo()">操作指南</div>
			</div>
		</div>
		<p class="hr"></p>
		<div class="headtitle" style="display: flex;padding: .1rem 0 .1rem .3rem;">
			<div>
				<span>|</span>配置
			</div>
			<div style="font-size: .25rem;font-weight: 550;margin-left: .6rem;margin-top: .05rem;">点卡余额：{{pointnum}}</div>
			<!-- <div
        style="font-size: .25rem;font-weight: 550;margin-left: .5rem;margin-top: .05rem;"
      >剩余有效天数：{{time}}天</div> -->
		</div>
		<div class="strategy">
			<div class="onep" style="display: flex;">
				<span class="dfirst" style="color: #999999;font-size: .24rem;">仓位监测</span>
				<div style="font-size: .28rem;width: 3.2rem;text-align: center;">{{parseInt(Number(principals)*1000)/1000||0}}USDT({{textsel}})
					<van-icon name="arrow-down" @click="jiaoyi = !jiaoyi" />
				</div>

				<span style="color: #999999;font-size: .24rem;">策略类型</span>

				<!-- <span v-show="!isshow" style="color: rgb(34,132,253);font-size: .24rem;margin-left: .9rem;"  @click="isshow = !isshow" >去选择 <van-icon name="arrow" /></span> -->
				<!-- {{index==0?'智能做多交易':'自定做多交易'}} -->
				<span class="dtwos" style="width: 1.1rem;margin-top: -2px;">
					<select v-show="!isshow2" v-model="shuju" style="font-size: 12px;" :disabled="bool5">
						<option :value="4">升级对冲策略</option>
						<option :value="5" selected="selected">多空网格策略</option>
						<!-- <option :value="2">智能趋势策略</option> -->
					</select>
				</span>
			</div>
			<p style="margin-top:.2rem;margin-right: .7rem;">
				<span>计价方式</span>

				<span :class="{'active6':symbol2=='USDT'}" style="text-align: center;" @click="symbol2='USDT'">USDT保证金合约</span>
				<!-- <span :class="{'active6':symbol2=='USD'}" style="text-align: center;" @click="symbol2='USD'">币本位保证金合约</span> -->
				<span :class="{'active6':symbol2=='USD'}" style="text-align: center;">币本位保证金合约</span>
			</p>
		</div>
		<p style="display: flex;height: 35px;line-height: 35px;border-bottom: 4px solid #f5f6fa;font-size: .26rem;color: rgb(34, 132, 253);">
			<span @click="bounce(4)" style="flex:1;text-align: center;">添加货币对{{jysymbol>0?'('+jysymbol+')':''}}</span>
			<span style="color: #D0D0D0;">|</span>
			<span style="flex:1;text-align: center;" @click="fn2()">一键设置预算</span>
		</p>
		<p class="headtitle">
			<span>|</span>实时监控
			<span v-show="idbool" @click="$router.push('/jyyym')" style="margin-left: 57%;font-size: 15px;">单独入口</span>
		</p>
		<div class="tranumber">
			<div class="cent">
				<div class="box">
					<p style="color: #C0C5CB;">成交单数</p>

					<p class="box1">{{count}}单</p>
				</div>
			</div>
			<div class="cent">
				<div class="box">
					<p style="color: #C0C5CB;">完成利润</p>
					<p class="box1">{{profit}} {{symbol}}</p>
				</div>
			</div>
			<div class="cent">
				<div class="box">
					<p style="color: #C0C5CB;">收益率</p>
					<p class="box1">{{ljsyl?ljsyl:0}}%</p>
				</div>
			</div>
		</div>
		<div class="runy">
			<p class="headtitle">
				<span>|</span>运行结果
			</p>
			<p class="headtitle" @click="toshowdetail(true)">
				<span>|</span>持仓状态
			</p>
			<p class="headtitle" @click="toshowdetail()">
				<span>|</span>成交记录
			</p>
			<!-- <p @click="$router.push('showdetail?type=0')">点卡明细</p> -->
		</div>

		<div class="comereult">
			<ul>
				<li v-for="(item,i) in strategy_list" :key="i" style="position: relative;">
					<p class="cometop">
						<span style="font-size: .26rem;line-height: 20px;">{{item.bidui}}永续</span>
						<span style="font-size: .22rem;display: flex;" v-show="shuju==4 || shuju==2">
							<span class="item-span1" style="font-size: .2rem;padding: 0 2.5px;transform: scale(0.9);margin-top: 2.7px;">多</span>
							<span class="item-span" style="font-size: .2rem;padding: 0 2.5px;transform: scale(0.9);margin-top: 2.7px;">空</span>
							<span style="font-size: .2rem;padding: 1px 2.5px 0;transform: scale(0.85);margin-top: 1.7px;background-color: #f5a623;color: #FFFFFF;">{{item.leverage}}x</span>
						</span>
						<span style="font-size: .22rem;margin-left: 7px;" v-show="shuju==5">
							<span class="item-span" :class="{'item-span1':item.up_down == 1}" style="font-size: .2rem;padding: 0 2.5px;transform: scale(0.9);margin-top: 1.7px;">{{item.up_down == 0?'空':'多'}}-{{item.leverage}}x</span>

						</span>
			
						<span style="position: absolute;right: 17px;" v-if="shuju !=2">
							<button style="background:rgb(97,161,240);margin-left: 0;" @click="fn5(item.id,item.stop_type)">删除策略</button>
							<button style="background:rgb(97,161,240);" @click="fn6(item)">设置预算</button>
							<button class="button1" :class="{'button3':item.stop_type != 0}" v-if="item.status==0" @click="open_strategy(item.id,'1',item.up_down)">{{item.stop_type== 0?'开启交易':'恢复交易'}}</button>
							<button style="background:#BD1616" @click="bounce(0,item.id,item.stop_type)" v-else>{{item.stop_type!== 2?'停止交易':'恢复交易'}}</button>
						</span>
						<span style="font-size: 0.26rem;margin-left: auto;" v-show="shuju == 2">账户权益: {{item.balance?item.balance:0}}USDT</span>
					</p>
					<div class="pressbox gundong" v-if="item.status==1">
						<p v-if="item.status==1 && item.stop_type == 0">
							<span>状态:</span> 正在监控中
						</p>
						<p v-if="item.status==1 && item.stop_type == 2">
							<span>状态:</span> 止盈后停止
						</p>
					</div>
					<div class="pressbox" style="background:#BFBFBF;" v-else>
						<p v-if="item.status==0">
							<span>状态:</span>
							{{item.stop_type== 0?'未开启':item.stop_type== 1?'临时停止':item.stop_type== 2?'止盈停止':'临时停止'}}
						</p>
						<p v-if="item.stop_type==5" class="item1">API KEY 错误</p>
						<p v-if="item.stop_type==7" class="item1">可平量大于持仓量</p>
						<p v-if="item.stop_type==8" class="item1">点卡不足</p>
						<p v-if="item.stop_type==9" class="item1">仓位错误</p>
						<p v-if="item.stop_type==6" class="item1">开仓量大于可开量</p>
						<p v-if="item.stop_type==4" class="item1">下单数量异常</p>
						<p v-if="item.stop_type==10" class="item1">风险率过高</p>
						<p v-if="item.stop_type==30018" class="item1">OKEX维护升级中</p>
					</div>
					<div class="tabul" v-show="shuju==5">
						<div>
							<p>建仓单数(单)</p>

							<p><span> {{item.up_down == 0?'空:':'多:'}}</span> {{item.buy_count}}</p>
						</div>
						<div>
							<p>持仓数量(张)</p>
							<p><span> {{item.up_down == 0?'空:':'多:'}}</span> {{item.buy_count_amount}}</p>
						</div>
						<div>
							<p>持仓均价({{item.bidui?item.bidui.split('/')[1]:'USDT'}})</p>
							<p><span > {{item.up_down == 0?'空:':'多:'}}</span> {{item.buy_count_average}}</p>
						</div>
						<div>
							<p>尾仓均价({{item.bidui?item.bidui.split('/')[1]:'USDT'}})</p>

							<p><span> {{item.up_down == 0?'空:':'多:'}}</span> {{item.lastprice}}</p>
						</div>
						<div>
							<p>平仓单数(单)</p>
							<p><span> {{item.up_down == 0?'空:':'多:'}}</span> {{item.sell_count}}</p>
						</div>
						<div>
							<p>实现利润({{item.bidui?item.bidui.split('/')[1]:'USDT'}})</p>

							<p>{{item.profit_cash}}</p>
						</div>
					</div>
					<div class="tabul" v-show="shuju==4">
						<div>
							<p>建仓单数(单)</p>

							<p><span>多:</span> {{item.buy_count_up}}</p>
							<p>空: {{item.buy_count_down}}</p>
						</div>
						<div>
							<p>持仓数量(张)</p>
							<p><span>多:</span> {{item.buy_count_amount_up}}</p>
							<p>空: {{item.buy_count_amount_down}}</p>
						</div>
						<div>
							<p>持仓均价({{item.bidui?item.bidui.split('/')[1]:'USDT'}})</p>
							<p><span>多:</span> {{item.buy_count_average_up}}</p>
							<p>空: {{item.buy_count_average_down}}</p>
							<!-- <p>{{item.profit_lv}}%</p> -->
						</div>
						<div>
							<p>尾仓均价({{item.bidui?item.bidui.split('/')[1]:'USDT'}})</p>

							<p><span>多:</span> {{item.lastprice_up}}</p>
							<p>空: {{item.lastprice_down}}</p>
						</div>
						<div>
							<p>平仓单数(单)</p>
							<p><span>多:</span> {{item.sell_count_up}}</p>
							<p>空: {{item.sell_count_down}}</p>
						</div>
						<div>
							<p>实现利润({{item.bidui?item.bidui.split('/')[1]:'USDT'}})</p>

							<p>{{item.profit_cash}}</p>
						</div>
					</div>
					<div class="tabul1" v-if="shuju==2">
						<div class="two">
							<div style="text-align: left;">
								<p class="p">建仓单数</p>
								<p>多: {{item.up_count}}<span style="margin-left: 2px;">单</span></p>
								<p>空: {{item.down_count}}<span style="margin-left: 2px;">单</span></p>
								<P class="p">交易笔数</P>
								<p>{{item.sell_count}}</p>
							</div>
							<div style="text-align: center;">
								<p class="p">持仓数量</p>
								<p>多: {{item.up_filled_qty?item.up_filled_qty:0}} 张</p>
								<p>空: {{item.down_filled_qty?item.down_filled_qty:0}} 张</p>
								<P class="p">实现收益</P>
								<p>{{(item.profit_cash*1).toFixed(2)}}<span style="margin-left: 2px;">USDT</span></p>
											
								
							</div>
							<div style="text-align: right;">
								<P class="p">持仓均价</P>
									<p>多: {{(item.up_price_avg*1).toFixed(2)}}<span style="margin-left: 2px;">USDT</span></p>
									<p>空: {{(item.down_price_avg*1).toFixed(2)}}<span style="margin-left: 2px;">USDT</span></p>
								<p class="p">收益率</p>
								<p>{{item.syl.toFixed(2)}}%</p>
							</div>
						</div>
						
					</div>
					<div class="tabul1" v-show="shuju==2">
						<div class="button" style="padding-top: 7px;border-top: 1px solid #eee;">
							<button @click="fn5(item.id,item.stop_type)">删除策略</button>
							<button :class="{'active':item.status == 1}" @click="check=2;close_now3(item.id,true)">一键平仓</button>
							<button :class="{'active':item.status == 1}" @click="check=0;close_now3(item.id)">临时停止</button>
							<button  @click="fn6(item)">设置预算</button>
							<button :class="{'active':item.status == 0}" @click="open_strategy(item.id,'1',item.up_down)" style="margin-right: 15px;">启动交易</button>
						</div>
						</div>
				</li>
			</ul>
		</div>
		<!-- 左侧弹框 -->
		<van-popup v-model="show" position="left" @click="changleft" class="poup" :style="{ height: '100%' ,width:'50%'}">
			<p class="jiay">选择交易所</p>
			<p class="yopen">已开通智能交易</p>
			<!-- @click="selecli(index)" -->
			<p class="hmoney" @click="clileft('OKEX',4)">
				<img style="width:0.34rem" src="../assets/src_resource_icon_user_exchange_okex@2x.png" alt />OKEX
			</p>

			<p class="yopen">待开通智能交易</p>
			<ul>
				<!-- <p class="hmoney" @click="clileft('火币全球站',1)"> -->
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

		<!-- 右上侧弹框 -->
		<van-popup v-model="showrt" class="pouprt">
			<ul>
				<li @click="$router.push('showdetail?bourse='+bourse+'&type=1')">
					<img src="../assets/jscard.png" alt />结算明细
				</li>
			</ul>
		</van-popup>

		<!-- 交易币对弹窗 -->
		<van-popup v-model="bidui" position="right" class="poup" :style="{ height: '100%' ,width:'100%'}">
			<div class="tophader">
				<van-icon name="arrow-left" @click="changright" />
				<p>添加货币</p>
				<span @click="changright" style="position: fixed;right: 18px;top: 0px;color: rgb(34, 132, 253);font-size: 17px;">完成</span>
			</div>
			<div class="poup-title">
				<div>搜索</div>
				<div class="item" @click="getxingqing()" :class="{'xiahuaxian':huobi}">官方推荐</div>
				<div class="item" @click="getzhuliu()" :class="{'xiahuaxian':!huobi}">所有货币对</div>
				<div class="about"></div>
			</div>
			<div class="poup-body">
				<span>货币对</span>
				<!-- <span>行情</span> -->
				<span style="margin-left: 20%;">操作</span>
			</div>
			<ul>
				<li class="li-item" v-for="(item,i) in list3" :key="i">
					<div style="padding-left: .4rem;font-size: 14px;width: 86px;">
						永续 {{item.symbol_deal}}/
						<span style="color: #CCCCCC;">{{item.symbol}}</span>
					</div>
					<!-- <div style="padding-left: 1rem;width: 32px;" class="active" :class="{'active1':item.up_or_down==1}">{{item.close.toFixed(2)}}</div> -->
					<div style="padding-left: 1rem;color: #2284fd;text-align: center;" v-show="!item.bool" @click="selecli_symbolcli(item.symbol_deal+ '/' + item.symbol,i)">添加</div>
					<div style="padding-left: 1.52rem;color: #C0C5CB;text-align: center;" v-show="item.bool">已添加</div>
				</li>
			</ul>
		</van-popup>

		<!-- 结算币对弹窗 -->

		<!-- 问题弹框 -->
		<van-popup v-model="matterplay" class="matter">
			<div class="top">CR智能交易注意事项</div>
			<div class="bots">
				<p>1、用户在交易所内生成的API不可绑定IP</p>
				<p>2、在智能交易开启前，交易所中必须先有本金，系统才能执行交易</p>
				<p>3、在智能交易开启后，如有出现手动介入的情况，系统将立即 停止交易。</p>
			</div>
		</van-popup>

		<!-- 智能交易弹框 -->
		<div class="warpbox" v-show="trandshow" @click="trandplay(1)">
			<div class="pouprt trandup">
				<van-icon name="play" class="trandicon" />
				<ul>
					<li v-for="(item,i) in list" :key="i" @click="selecli(i)" :ref="'selt'+i">{{item.a}}</li>

					<!-- <li>智能多空交易</li>
          <li>自定多空交易</li>-->
				</ul>
			</div>
		</div>

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

		<div class="gifclas" :style="{display:istxt==-1?'none':'block'}">
			<img src="../assets/ddd.gif" />
			<p>
				{{istxt==5?'API KEY错误':istxt==8?'点卡不够'
        :istxt==6?'本金不足':istxt==7?'仓位错误':istxt==0?'系统正在获取数据定制策略':istxt==-10?'获取成功':''}}
			</p>
		</div>
		<van-dialog v-model="show2" title="预算设置" show-cancel-button :before-close="beforeClose">
			<p style="height: 15px;"></p>
			<div style="display: flex;padding-bottom: 15px;" v-show="shuju!=4 && shuju!=2">
				<span style="margin-left: 16px;font-size: 14px;">开单方向：</span>
				<van-checkbox v-model="checked2" style="font-size: 14px;">开多</van-checkbox>
				<van-checkbox v-model="checked3" style="font-size: 14px;">开空</van-checkbox>
			</div>
			
		
			<div style="display: flex;flex-flow:row wrap;">
				<van-field v-show="checked2 && shuju !=4 && shuju !=2" v-model="number2" type="number" label="开多张数:" />
				<van-field v-show="checked3 && shuju !=4 && shuju !=2" v-model="number3" type="number" label="开空张数:" />
				<van-field v-show=" shuju ==4" v-model="number2" type="number" label="首单张数:" />
				<van-field  v-show="shuju == 2" v-model="number5" type="number" label="开仓张数:" />
				<van-field  v-model="number4" type="number" label="杠杆倍数:" />

				<div v-show="shuju == 2" style="height: 10px;"></div>
				
			</div>

			<p style="height: 15px;"></p>
		</van-dialog>
		<van-dialog v-model="show3" title="设置预算" show-cancel-button :before-close="beforeClose">
			<p style="height: 15px;"></p>
			<!-- <van-field v-model="number" type="number" label="价格(USD):" /> -->
			<div style="display: flex;flex-flow:row wrap">
				<van-field v-show="bool4 == 1 && shuju !=4" v-model="number2" type="number" label="开多张数:" />
				<van-field v-show="bool4 == 0 && shuju !=4" v-model="number3" type="number" label="开空张数:" />
				<van-field v-show="shuju ==4" v-model="number8" type="number" label="首单张数:" />
				<van-field v-model="number4" type="number" label="杠杆倍数:" />
				<van-field  v-show="shuju == 2" v-model="number5" type="number" label="开仓张数:" />
				<van-field v-show="shuju==4" v-model="makelist" type="number" label="反转单数:" />
				<van-field v-show="shuju==4" v-model="interval" type="number" label="做单间隔:" />
				<van-field v-show="shuju==5" v-model="interval2" type="number" label="补仓间隔:" />
				<van-field v-show="shuju==5" v-model="ordernum" type="number" label="做单数量:" />
				<van-field v-show="shuju==4 || shuju==5" v-model="profitratio" type="profitratio" label="止盈比例:" />
			</div>
			<p style="height: 15px;"></p>
		</van-dialog>
		<van-picker v-show="jiaoyi" show-toolbar title="选择仓位币对对金额" :columns="columns" @confirm="conwan" @cancel="jiaoyi=!jiaoyi" />
	</div>
</template>

<script>
	import Vue from "vue";
	import {
		Dialog,
		Field,
		Popup,
		Checkbox,
		RadioGroup,
		Radio,
		Picker
	} from "vant";
	Vue.use(Field);
	Vue.use(Dialog);
	Vue.use(Popup);
	Vue.use(Checkbox);
	Vue.use(RadioGroup);
	Vue.use(Radio);
	Vue.use(Picker);
	export default {
		components: {
			Dialog,
			Field,
			Popup,
			Checkbox,
			RadioGroup,
			Radio,
			Picker
		},
		data() {
			return {
				checked2: true,
				checked3: true,
				checked4: false,
				checked5: true,
				checked6: false,
				checked7: false,
				value: 3,
				number: "",
				number2: "",
				number3: "",
				number4: "",
				number5: "",
				// number6: "",
				// number7: "",
				number8: '',
				makelist: '',
				interval: '',
				interval2: '',
				ordernum: '',
				profitratio: '',
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
					},
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
				time1: "",
				index1: "",
				time: "",
				pointnum: "",
				ljsyl: "",
				list3: [],
				shuju: 5,
				show3: false,
				show5: false,
				show6: true,
				backinfo: {
					profit_stop_case: 1,
					loss_stop_case: 1,
					loss_stop_switch: 0,
				},
				bool2: false,
				bool3: false,
				symbol2: "USDT",
				bool4: null,
				id2: null,
				moeneru: null,
				beishu: null,
				huobi: true,
				bool5: false,
				ipone: false,
				jiaoyi: false,
				idbool: false,
				columns: [

				],
				textsel: 'ETH',

			};
		},
		created() {
			if (this.$route.query.id == 1) {
				this.idbool = true
			}
			if (localStorage.getItem("bourse1")) {
				this.bourse = localStorage.getItem("bourse1");
			}
			this.start()
			this.$axios
				.get("/index/mywallet/mywalletInfo", {
					page: 1,
					limit: 1
				})
				.then((res) => {
					let info = res.data.info;
					this.pointnum = info.point_num;
					var timestamp = Date.parse(new Date()) / 1000;
					if (info.start_time) {
						let time = parseInt((timestamp - info.start_time) / 60 / 60 / 24);
						this.time = 150 - time;
					} else {
						console.log(info.start_time, info.point_num);
						if (info.point_num > 0) {
							let time = parseInt((timestamp - info.start_time) / 60 / 60 / 24);
							this.time = 150 - time;
						} else {
							this.time = 0;
						}
					}
				});
			if (this.bourse == 4) {
				this.selectsymbol[3].a = "OKB";
			}
			this.$axios
				.post("/index/swapstrategy/get_sug_symbol", {
					symbol: this.symbol,
					bourse: this.bourse,
				})
				.then((res) => {
					console.log(this.strategy_list);
					let obj = res.data.sug_list
					let obj2 = []
					obj.forEach(item => {
						obj2.push(item.symbol_deal)
					})
					this.columns = obj2
				});
		},
		watch: {
			checked5(newValue, oldValue){
				if(newValue==true){
					this.checked6 = false
					this.checked7 = false
				}
			},
			checked6(newValue, oldValue){
				if(newValue==true){
					this.checked5 = false
					this.checked7 = false
				}
			},
			checked7(newValue, oldValue){
				if(newValue==true){
					this.checked5 = false
					this.checked6 = false
				}
			},
			symbol(newValue, oldValue) {
				this.strategy_list = [];
				this.start(newValue);
				this.start1(true);
			},
			symbol2(newValue, oldValue) {
				this.strategy_list = [];
				this.start(newValue);
				this.start1(true);
			},
			shuju(newValue, oldValue) {
				
				if (newValue == 2) {
					this.types = 2;
					this.index = 1;
				}
				
				if (newValue == 4) {
					this.types = 5;
					this.index = 3;
				}
				if (newValue == 5) {
					this.types = 1;
					this.index = 4;
				}
				this.start();
			},
		},
		methods: {
			conwan(i) {
				this.textsel = i
				this.tostring()
				this.jiaoyi = false
			},
			fn2() {
				if (this.isshow2) {
					Dialog.confirm({
						title: "提醒",
						message: "请选择策略类型",
					});
					return;
				}
				console.log(this.selsym);
				if (this.selsym.length == 0) {
					Dialog.confirm({
						title: "提醒",
						message: "请选择交易对",
					});
					return;
				}
				if (this.shuju) {

					this.show2 = true
					// return
					// if (this.shuju == 1) {
					//   this.show2 = true;
					// } else {
					//   this.show3 = true;
					// }
				} else {
					Dialog.confirm({
						title: "提醒",
						message: "请选择策略类型",
					});
				}
				if (!this.bool2) {
					this.backinfo = {};
					this.backinfo = {
						profit_stop_case: 1,
						loss_stop_case: 1,
						loss_stop_switch: 0,
					};
				}
			},

			fn5(id, type) {
				console.log(id, type);
				if (type == 2) {
					this.$toast.fail({
						message: "止盈停止后才可删除",
						duration: 2000
					});
					return;
				}
				Dialog.confirm({
					title: "提醒",
					message: "是否删除策略？",
				}).then(() => {
					this.$axios
						.post("/index/swap/delete_strategy", {
							strategy_id: id
						})
						.then((res) => {
							if (res.data.code == 0) {
								this.$toast.fail({
									message: "删除成功",
									duration: 2000
								});
								this.start();
							} else {
								this.$toast.fail({
									message: res.data.msg,
									duration: 2000
								});
							}
						});
				});
			},
			fn6(item) {
				if(this.shuju == 2){
					this.number5 = item.first_amount;
				}
				this.number2 = item.first_amount;
				this.number3 = item.first_amount;
				this.number8 = item.first_amount;
				this.number4 = item.leverage;
				this.bool4 = item.up_down;
				this.id2 = item.id;
				this.show3 = true;
				this.ordernum = item.order_num
				if (item.interval) {
					this.makelist = item.order_num
					this.profitratio = item.profit
					if (this.shuju == 5) {
						this.interval2 = item.interval
					} else {
						this.interval = item.interval
					}
				}

			},
			beforeClose: function(action, done) {
				if (action === "confirm") {
					let obj = {};

					obj.leverage = this.number4;

					let str = "";
					let amount_scale = ''
					if (this.shuju == 2) {
						if (!this.number5 && !this.number4) {
							this.$toast.fail({
								message: "请填写完整",
								duration: 2000
							});
							done();
							return;
						}
					obj.first_amount =this.number5
					}
					obj.profit = this.profitratio
					obj.interval = this.interval
					if (this.shuju == 5) {
						obj.interval = this.interval2
					}
					if (this.bool4 == 0 || this.bool4 == 1 || this.bool4 == 2 ) {
						obj.id = this.id2;
						obj.up_down = this.bool4;
						obj.order_num = this.ordernum

						str = "set_strategy";
						console.log(this.bool4)
						if (this.bool4 == 0) {
							obj.first_amount = this.number3;
							if (this.shuju == 4) {
								obj.order_num = this.makelist
								obj.first_amount = this.number8;
							}
							if (!this.number3 || !this.number4) {
								this.$toast.fail({
									message: "请填写完整",
									duration: 2000
								});
								done();
								return;
							}
						} else if(this.bool4 == 1) {
							obj.first_amount = this.number2;
							if (!this.number2 || !this.number4) {
								this.$toast.fail({
									message: "请填写完整",
									duration: 2000
								});
								done();
								return;
							}
						}
					} else {
						if (this.shuju != 4 && this.shuju != 2) {
							if (this.checked3) {
								if (!this.number3 || !this.number4) {
									this.$toast.fail({
										message: "请填写完整",
										duration: 2000
									});
									done();
									return;
								}
							} else {
								if (!this.number2 || !this.number4) {
									this.$toast.fail({
										message: "请填写完整",
										duration: 2000
									});
									done();
									return;
								}
							}
						} 
						obj.down_buy_num = this.number3;
						obj.up_buy_num = this.number2;
						obj.type = this.types;
						obj.bourse = this.bourse;
						obj.symbol = this.symbol2;
						obj.symbol_deal = this.selsym.join(",");

						let arr = [1, 0];

						if (this.checked2) {
							obj.up_down = '1'
						}
						if (this.checked3) {
							obj.up_down = '0'
						}
						if (this.checked3 && this.checked2) {
							obj.up_down = arr.join(",");
						}
						str = "set_strategy_all";
						this.jysymbol = 0;
					}
					this.$axios.post(`/index/swapstrategy/${str}`, obj).then((res) => {
						if (res.data.code == 0) {
							this.selsym = [];
							this.number2 = "";
							this.number3 = "";
							this.number4 = "";
							localStorage.setItem("bourse1", this.bourse);
							setTimeout(() => {
								this.istxt = res.data.err_code;
							}, 800);
							if (this.istxt == 0) {
								setTimeout(() => {
									this.istxt = -10;
								}, 3000);
							}
							setTimeout(() => {
								this.istxt = -1;
								this.start();
							}, 5000);
						} else {
							this.$toast.fail({
								message: res.data.msg,
								duration: 2000
							});
						}
					});
					this.selsym = []
					done(); // 关闭提示框
				} else if (action === "cancel") {
					// 取消
					done(); // 关闭提示框
				}
				this.bool4 = null;
				this.id2 = null;
			},
			onInput(i, id) {
				this.index1 = i;
				if (this.strategy_list[i].status == 1) {
					this.closedeal = true;
					this.closeid = id;
				} else {
					this.open_strategy(id, i);
				}
			},
			toshowdetail(bool = false) {
				if (!this.bourse) {
					this.$toast.fail({
						message: "请选择交易所",
						duration: 2000
					});
					return;
				}
				if (bool) {
					let abc = []
					this.strategy_list.forEach(item => {
						abc.push(item.symbol_deal)
					})
					console.log(abc,this.strategy_list)
					abc = [...new Set(abc)].join(',')
					console.log(abc)
					this.$router.push({
						name: '持仓',
						params: {
							bourse: this.bourse,
							symbol: this.symbol2,
							stage: abc
						}
					})
				} else {
					this.$router.push(
						"showdetail?bourse=" + this.bourse + "&type=1" + "&heyeu=1&poni=1"
					);
				}
			},
			clileft(s, num) {
				this.bourse = num;
				localStorage.setItem("bourse1", num);
				this.start();
			},
			closecli() {
				this.$axios.post("/index/strategy/delete_strategy").then((res) => {
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

			start1(is = false) {
				if (localStorage.getItem("symbol")) {
					this.symbol = localStorage.getItem("symbol");
				}
				let str;
				if(this.shuju == 2){
					str = 'get_trend_monitoring_total'
				}else{
					str = 'get_monitoring_total'
				}
				//取利润
				this.$axios
					.post(`/index/swapstrategy/${str}`, {
						symbol: this.symbol2,
						bourse: this.bourse,
						types: this.types,
					})
					.then((res) => {
						this.count = res.data.count;
						this.profit = res.data.profit;
						this.doing = res.data.doing;
						this.ljsyl = res.data.ljsyl;
						if (res.data.principal) {
							this.principal = res.data.principal;
						}
					});
				if (this.bourse) {
					const env = process.env.NODE_ENV;
					// if(env==='production'){  // 生产环境
					this.tostring()
					// }else{  // 本地环境
					// console.log(6)
					// }

				}
			},
			tostring() {
				this.$axios
					.post("/index/swapstrategy/get_balance", {
						symbol: this.symbol2,
						bourse: this.bourse,
						symbol_deal: this.textsel,
					})
					.then((res) => {
						if (res.data.code == 0 && res.data.principal) {
							this.principal = res.data.principal;
							this.principals = res.data.principal;
						} else {
							// layer.open({ content: res.data.msg, skin: "msg", time: 2 });
						}
					});
			},
			start(bool) {
				if (!bool) {
					this.start1();
				}
				let str;
				console.log(this.types)
				this.strategy_list = []
				if (this.shuju == 4) {
					str = 'get_lock_strategy_list'
				} else if(this.shuju == 2){
					str = 'get_trend_strategy_list'
				}
				else {
					str = 'get_strategy_list'
				}
				this.$axios
					.post(`/index/swapstrategy/${str}`, {
						symbol: this.symbol2,
						bourse: this.bourse,
						type: this.types,
					})
					.then((res) => {
						this.strategy_list = res.data.list;
					});
				localStorage.setItem('types', this.types)

			},
			selecli(i) {
				this.index = i;
				this.types = Number(i) + 1;
				localStorage.setItem("index", i);
				var str = "this.$refs.selt" + i;
				var dom = eval(str);
				var strf = dom[0].innerHTML;

				this.seletext = strf.substring(0, 2) + strf.substring(4, 6);
				this.start();
				this.seletext = strf;
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
			},
			selecli_symbolcli(i, index) {
				let obj = this.list3[index];
				if (obj.bool) {
					obj.bool = !obj.bool;
				} else {
					obj.bool = true;
				}
				this.$set(this.list3, index, obj);
				// this.bidui = false;
				// this.selsym = [];
				this.selsym.push(this.list3[index].symbol_deal);
				this.selsym = [...new Set(this.selsym)]
				console.log(this.selsym, this.list3);
				if (this.selsym.length > 10) {
					return this.$toast.fail({
						message: "最多只能选则10个币对",
						duration: 1200,
					});
				}
				this.jysymbol = this.selsym.length;
			},
			changleft() {
				this.show = false;
			},
			changright() {
				this.bidui = false;
				this.jsbidui = false;
			},
			bounce(s, i, type) {

				if (s == 0) {
					console.log(type);
					if (type == 2) {
						this.$axios
							.post("/index/spot/profit_restart", {
								id: i
							})
							.then((res) => {
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
					this.getxingqing();
				} else if (s == 5) {
					this.jsbidui = true;
				}
			},
			getxingqing() {
				this.huobi = true
				this.list3 = [];
				this.jysymbol = 0;
				this.$axios
					.post("/index/swapstrategy/get_sug_symbol", {
						symbol: this.symbol,
						bourse: this.bourse,
					})
					.then((res) => {
						this.list3 = res.data.sug_list
					});
			},
			getzhuliu() {
				this.huobi = false
				this.list3 = [];
				console.log(this.symbol);

				this.$axios
					.post("/index/swapstrategy/get_symbol", {
						symbol: this.symbol,
						bourse: this.bourse,
					})
					.then((res) => {
						this.list3 = res.data.symbol;
					});
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
			open_strategy(s, i, b) {
				this.$axios
					.post("/index/swap/start_strategy", {
						id: s,
						up_down: b
					})
					.then((res) => {
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
			tocaozuo() {
				this.$axios
					.get("/index/article/newsArt", {
						page: 1,
						limit: 1
					})
					.then((res) => {
						this.$router.push({
							path: "noticedateil",
							query: {
								id: res.data.info[0].article_id
							},
						});
					});
			},
			close_now2(id, str) {
				if (str == 0) {
					this.$toast.fail({
						message: "请先开启策略",
						duration: 2000
					})
					return
				}
				this.$axios
					.post("/index/swap/clearance", {
						id
					})
					.then((res) => {
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
			},
			close_now3(id,bool) {
				let str;
				if(bool){
					str = '平仓'
				}else{
					str = '停止'
				}
				Dialog.confirm({
				  title: `确定${str}`,
				  message:
				    `是否要一键${str}？`,
				})
				  .then(() => {
				    // on confirm
					this.close_now(id)
				  })
				  .catch(() => {
				    // on cancel
				  });
			},
			close_now(id) {
				this.closeid
				let id2 = this.closeid?this.closeid:id
				if (this.check == 0) {
					this.$axios
						.post("/index/swap/pause_strategy", {
							id: id2
						})
						.then((res) => {
							if (res.data.code == 0) {
								this.$toast.success({
									message: res.data.msg,
									duration: 2000
								});

								this.$axios
									.post("/index/swapstrategy/get_strategy_list", {
										symbol: this.symbol,
										bourse: this.bourse,
										type: this.types,
									})
									.then((res) => {
										// this.strategy_list = res.data.list;
										res.data.list.forEach((item, index) => {
											this.$set(this.strategy_list, index, item);
										});
										console.log(this.strategy_list, res.data.list);
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
						.post("/index/swap/profit_stop", {
							id: id2
						})
						.then((res) => {
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
					let str;
					if(this.shuju == 2){
						str = 'trend_clearance'
					}else{
						str = 'clearance'
					}
					this.$axios
						.post(`/index/swap/${str}`, {
							id: id2
						})
						.then((res) => {
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
			},
		},
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

	.pouprt {
		top: 8%;
		left: 83%;
		width: 2rem;
		border-radius: 3px;

		li {
			padding: 0.2rem;
			text-align: center;
			font-size: 0.24rem;
			color: #333333;

			img {
				width: 0.22rem;
				position: relative;
				top: 0.03rem;
				margin-right: 0.12rem;
			}
		}
	}

	.warpbox {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		background: rgba(0, 0, 0, 0.5);
	}

	.trandup {
		position: absolute;
		background: #fff;
		top: 6.4%;
		left: 50%;
		width: 2.9rem;
		margin-left: -1.45rem;
	}

	.trandicon {
		position: absolute;
		left: 48%;
		z-index: 3000;
		top: -7%;
		transform: rotate(-90deg);
		color: #fff;
		z-index: 2100;
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
		border-bottom: 2px solid #f5f6fa;
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

			// line-height: 28px;
			span {
				display: block;
				margin-top: -1px;
				color: #2185ff;
				margin-right: 0.1rem;
				line-height: 19px;
				// margin-top: -0.2rem;
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
	}

	.strategy {
		padding: 0.2rem 0.2rem 0.2rem 0.3rem;
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
			padding: 0.4rem 0.3rem 0;
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
			font-size: 0.24rem;
			
			div {
				width: 33.3%;
				margin-bottom: 0.3rem;
			}

			div:nth-of-type(1) {
				text-align: left;
			}

			div p:nth-of-type(1) {
				color: #bababa;
			}

			div:nth-of-type(2),
			div:nth-of-type(5) {
				text-align: center;
			}

			div:nth-of-type(3),
			div:nth-of-type(6) {
				text-align: right;
			}
	
		}
	}
.tabul1{
	.two {
		width: 100%;
		display: flex;
		margin-bottom: 7px;
		font-size: 13px;
		div {
			flex: 1;
			text-align: center;
			line-height: 22px;
			color: rgb(94, 94, 94);
	
			.p {
				line-height: 26px;
				margin-top: 5px;
				color: #000;
			}
		}
	}
	.button {
		width: 104%;
		text-align: right;
		margin-bottom: 8px;
	font-size: 12px;
		button {
			width: 62px;
			line-height: 20px;
			color: rgb(199, 199, 199);
			border: 1px solid rgb(188, 187, 193);
			border-radius: 4px;
			background-color: #FFFFFF;
			margin-right: 4px;
		}
		.active{
			background-color: #4389eb;
			color: #FFFFFF;
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

	.beijing {
		width: 100%;
		background: #ffffff;
		height: 1.5rem;
		position: sticky;
		bottom: 0;
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

		// display:none;
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

	.divli {
		display: flex;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		position: relative;
		padding: 0.2rem;
		font-size: 0.3rem;
		border-bottom: 1px solid #f5f6fa;
		background: #fff;
		color: #000;

		.right {
			color: #999;

			.inputclass {
				text-align: right;
				color: #000;
			}
		}
	}

	.imgge1 {
		height: 34px;
		line-height: 34px;
		font-weight: 550;
		font-size: 15px;
		background-color: rgb(240, 240, 240);
		padding-left: 15px;
		display: flex;
		justify-content: space-between;

		.item {
			color: rgb(157, 153, 153);
			margin-left: 34px;
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
				background-color: #ffffff;
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
			background: #999;
			height: 1em;
			width: 27px;
			position: relative;
			display: inline-block;
			box-sizing: content-box;
			font-size: 30px;
			border: 1px solid rgba(0, 0, 0, 0.1);
			border-radius: 1em;
			margin-left: 0px;
			margin-top: 10px;
		}

		.van-switch--on {
			background-color: #1989fa;
		}
	}

	.popup2 {
		.van-icon {
			position: absolute;
			left: 10px;
			top: 12px;
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

	.van-picker {
		position: absolute;
		top: 152px;
		width: 100%;
	}
</style>
