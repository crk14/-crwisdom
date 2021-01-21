<template>
	<div class="intetrading">
		<div class="tophader">
			<van-icon name="arrow-left" style="    width: 1rem;
    height: 0.8rem;
    z-index: 1;
    line-height: .8rem;
    margin-top: -.4rem;"
			 onclick="window.history.go(-1)" />
			<p>跟随交易机器人(合约版)</p>
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
		<!-- 	<div class="note-t" v-show="!vipshow">
			<div class="div">
				开 仓 设 置
				<div></div>
			</div>
			<div class="item">
				<div class="div1">开仓张数: <div><input type="number" v-model="number5" /></div>
				</div>
				<div class="div1">杠杆倍率: <div><input type="number" v-model="number4" /></div>
				</div>
			</div>
		
		</div> -->
		<p class="headtitle">
			<span>|</span>{{vipshow?'实时监控':'跟随详情'}}
			<button v-show="vipshow" @click="fn2()" style="margin-left: 38%;line-height: 22px; background: #4389eb;color: #fff;border-radius: 4px;font-size: 14px;width: 36%;">一键生成策略</button>
			<button v-show="!vipshow " @click="fn2(true)" style="margin-left: 38%;line-height: 22px; background: #4389eb;color: #fff;border-radius: 4px;font-size: 14px;width: 36%;">选择跟随交易员</button>
		</p>
		<p class="headtitle" style="justify-content: center;">
			<span v-show="!vipshow && strategy_list.length" style="line-height: 22px; border-radius: 4px;font-size: 14px;padding: 3px 6px;border: 1px solid #4389eb;">已跟随"{{tradert.nick_name}}"</span>
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
				<li v-if="!vipshow " v-for="item in strategy_list" :key="item.id" style="position: relative;">
					<p class="cometop">
						<span style="font-size: 13px;line-height: 20px;font-weight: 550;">{{item.symbol_deal}}/<span style="color: #828282;font-weight: 540;">USDT永续</span></span>

						<span style="font-size: 13px;display: flex;margin-left: 2%;line-height: 18px;">
							<span class="item-span1" style="font-size: .2rem;padding: 0 2.5px;transform: scale(0.9);margin-top: 2.7px;">多</span>
							<span class="item-span" style="font-size: .2rem;padding: 0 2.5px;transform: scale(0.9);margin-top: 2.7px;">空</span>
							<span style="font-size: .2rem;padding: 1px 2.5px 0;transform: scale(0.85);margin-top: 1.7px;background-color: #f5a623;color: #FFFFFF;">{{item.leverage}}x</span>
						</span>
						<span style="font-size: 13px;margin-left: auto;">账户权益: {{item.balance}}USDT</span>
					</p>
					<div class="pressbox gundong" v-if="item.status==1">
						<p v-if="item.stop_type == 0">
							<span>状态:</span> 正在监控中
						</p>
						<p v-if=" item.stop_type == 2">
							<span>状态:</span> 止盈后停止
						</p>
					</div>
					<div class="pressbox" style="background:#BFBFBF;" v-else>
						<p v-if="item.status==0">
							<span>状态:</span>
							{{item.stop_type== 0?'未开启':item.stop_type== 1?'临时停止':item.stop_type== 0?'未开启':'临时停止'}}
						</p>
						<p v-if="item.stop_type==5" class="item1">API KEY 错误</p>
						<p v-if="item.stop_type==7" class="item1">可平量大于持仓量</p>
						<p v-if="item.stop_type==8 " class="item1">点卡不足</p>
						<p v-if="item.stop_type==9" class="item1">仓位错误</p>
						<p v-if="item.stop_type==6" class="item1">开仓量大于可开量</p>
						<p v-if="item.stop_type==4" class="item1">下单数量异常</p>
						<p v-if="item.stop_type==10" class="item1">风险率过高</p>
						<p v-if="item.stop_type==30018" class="item1">OKEX维护升级中</p>
					</div>


					<div class="tabul">
						<div>
							<p>建仓单数(单)</p>
							<p><span> </span>多: {{item.up_count?item.up_count:0}}</p>
							<p><span> </span>空: {{item.down_count?item.down_count:0}}</p>
						</div>
						<div>
							<p>持仓数量(张)</p>
							<p><span> </span>多: {{item.up_filled_qty?item.up_filled_qty:0}}</p>
							<p><span> </span>空: {{item.down_filled_qty?item.down_filled_qty:0}}</p>
						</div>
						<div>
							<p>持仓均价({{item.bidui?item.bidui.split('/')[1]:'USDT'}})</p>
							<p><span> </span>多: {{(item.up_price_avg*1).toFixed(2)}}</p>
							<p><span> </span>空: {{(item.down_price_avg*1).toFixed(2)}}</p>
						</div>

					</div>
					<div class="tabul" style="padding-top: 0;">
						<div style="border-top: 0;">
							<p>尾仓均价({{item.bidui?item.bidui.split('/')[1]:'USDT'}})</p>

							<p><span> </span>多: {{(item.up_lastprice*1).toFixed(2)}}</p>
							<p><span> </span>空: {{(item.down_lastprice*1).toFixed(2)}}</p>
						</div>
						<div style="border-top: 0;">
							<p>平仓单数(单)</p>
							<p><span> </span>多: {{item.up_sell_count}}</p>
							<p><span> </span>空: {{item.down_sell_count}}</p>
						</div>
						<div style="border-top: 0;">
							<p>实现利润({{item.bidui?item.bidui.split('/')[1]:'USDT'}})</p>

							<p style="line-height: 29px;">{{(item.profit_cash*1).toFixed(2)}}</p>
						</div>
					</div>
					<div class="tabul1">
						<div class="button" style="padding-top: 7px;" v-show="!vipshow">
							<button v-show=" item.status == 1" :class="{'active':item.status == 1}" @click="bounce(0,item.id,item.stop_type)">取消跟随</button>
							<button :class="{'active':item.status == 0}" @click="fn5(item.id,item.stop_type)">删除策略</button>
							<button :class="{'active':item.up_filled_qty}" @click="check=2;clearance2(item.id,true)">一键平多</button>
							<button :class="{'active':item.down_filled_qty}" @click="check=2;clearance2(item.id,false)">一键平空</button>
							<button :class="{'active':item.status == 0}" @click="open_strategy(item.id,'1',item.up_down)">开启跟随</button>

						</div>

					</div>
				</li>
				<li   v-for="(item,index) in strategy_list" :key="index" v-if="vipshow && item.length"  style="position: relative;">
						<p class="cometop">
							<span style="font-size: 13px;line-height: 20px;font-weight: 550;">{{item[0] && item[0].symbol_deal}}/<span style="color: #828282;font-weight: 540;">USDT永续</span></span>

							<span style="font-size: 13px;display: flex;margin-left: 2%;line-height: 18px;">
								<span class="item-span1" style="font-size: .2rem;padding: 0 2.5px;transform: scale(0.9);margin-top: 2.7px;">多</span>
								<span class="item-span" style="font-size: .2rem;padding: 0 2.5px;transform: scale(0.9);margin-top: 2.7px;">空</span>
								<span style="font-size: .2rem;padding: 1px 2.5px 0;transform: scale(0.85);margin-top: 1.7px;background-color: #f5a623;color: #FFFFFF;">{{item[0] && item[0].leverage}}x</span>
							</span>
							<span style="font-size: 13px;margin-left: auto;">账户权益: {{item[0] && item[0].balance}}USDT</span>
						</p>
						<div class="pressbox gundong" v-if="item[0] && item[0].status==1 ||  item[1] && item[1].status==1">
							<p v-if="item[0] && item[0].stop_type == 0 ||item[1] && item[1].stop_type == 0">
								<span>状态:</span> 正在监控中
							</p>
							<p v-if=" item[0] && item[0].stop_type == 2 ||item[1] && item[1].stop_type == 2">
								<span>状态:</span> 止盈后停止
							</p>
						</div>
						<div class="pressbox" style="background:#BFBFBF;" v-else>
							<p v-if="item[0] && item[0].status==0 ||item[1] && item[1].status==0">
								<span>状态:</span>
								{{item[0] && item[0].stop_type== 0?'未开启':item[0] && item[0].stop_type== 1?'临时停止':item[1] && item[1].stop_type== 0?'未开启':item[1] && item[1].stop_type== 1?'临时停止':item[1] && item[1].stop_type== 2?'止盈停止':'临时停止'}}
							</p>
							<p v-if="item[0] && item[0].stop_type==5 || item[1] && item[1].stop_type==5" class="item1">API KEY 错误</p>
							<p v-if="item[0] && item[0].stop_type==7 || item[1] && item[1].stop_type==7" class="item1">可平量大于持仓量</p>
							<p v-if="item[0] && item[0].stop_type==8 || item[1] && item[1].stop_type==8" class="item1">点卡不足</p>
							<p v-if="item[0] && item[0].stop_type==9 || item[1] && item[1].stop_type==9" class="item1">仓位错误</p>
							<p v-if="item[0] && item[0].stop_type==6 || item[1] && item[1].stop_type==6" class="item1">开仓量大于可开量</p>
							<p v-if="item[0] && item[0].stop_type==4 || item[1] && item[1].stop_type==4" class="item1">下单数量异常</p>
							<p v-if="item[0] && item[0].stop_type==10 || item[1] && item[1].stop_type==10" class="item1">风险率过高</p>
							<p v-if="item[0] && item[0].stop_type==30018 || item[1] && item[1].stop_type==30018" class="item1">OKEX维护升级中</p>
						</div>
						<div class="tabul">
							<div>
								<p>建仓单数(单)</p>
								<p v-if="item[0].up_down == 1"><span> </span>多: {{item[0] && item[0].buy_count}}</p>
								<p v-if="item[1] || item[0].up_down == 0"><span> </span>空: {{item[0].up_down == 0?item[0].buy_count:item[1].buy_count}}</p>
							</div>
							<div>
								<p>持仓数量(张)</p>
								<p v-if="item[0].up_down == 1"><span> </span>多: {{item[0] && item[0].buy_count_amount}}</p>
								<p v-if="item[1] || item[0].up_down == 0"><span> </span>空: {{item[0].up_down == 0?item[0].buy_count_amount:item[1].buy_count_amount}}</p>
							</div>
							<div>
								<p>持仓均价({{item[0] && item[0].bidui?item[0] && item[0].bidui.split('/')[1]:'USDT'}})</p>
								<p v-if="item[0].up_down == 1"><span> </span>多: {{item[0] && item[0].buy_count_average}}</p>
								<p v-if="item[1] || item[0].up_down == 0"><span> </span>空: {{item[0].up_down == 0?item[0].buy_count_average:item[1].buy_count_average}}</p>
							</div>

						</div>
						<div class="tabul" style="padding-top: 0;">
							<div style="border-top: 0;">
								<p>尾仓均价({{item[0] && item[0].bidui?item[0] && item[0].bidui.split('/')[1]:'USDT'}})</p>

								<p v-if="item[0].up_down == 1"><span> </span>多: {{item[0] && item[0].lastprice}}</p>
								<p v-if="item[1] || item[0].up_down == 0"><span> </span>空: {{item[0].up_down == 0?item[0].lastprice:item[1].lastprice}}</p>
							</div>
							<div style="border-top: 0;">
								<p>平仓单数(单)</p>
								<p v-if="item[0].up_down == 1"><span> </span>多: {{item[0] && item[0].sell_count}}</p>
								<p v-if="item[1] || item[0].up_down == 0"><span> </span>空: {{item[0].up_down == 0?item[0].sell_count:item[1].sell_count}}</p>
							</div>
							<div style="border-top: 0;">
								<p>实现利润({{item[0] && item[0].bidui?item[0] && item[0].bidui.split('/')[1]:'USDT'}})</p>

								<p v-if="item[0].up_down == 1">多:{{item[0] && item[0].profit_cash}}</p>
								<p v-if="item[1] || item[0].up_down == 0">空:{{item[0].up_down == 0?item[0].profit_cash:item[1].profit_cash}}</p>
							</div>
						</div>

						<div class="tabul1">

							<div class="button" style="padding-top: 7px;" v-show="vipshow && item[0].up_down == 1">
								<button id="green" @click="fn5(item[0] && item[0].id,item[0] && item[0].stop_type)">删除多头策略</button>
								<button id="green" @click="clearance2(item[0] && item[0].id,true,true)">一键平多清仓</button>
								<button id="green" @click="fn6(item[0] && item[0])">修改多头策略</button>
								<button v-if="item[0] && item[0].status==0" id="green" @click="open_strategy(item[0] && item[0].id,'1',item[0] && item[0].up_down)">开启多头交易</button>
								<button v-else id="green" @click="check=0;close_now3(item[0].id)">停止多头交易</button>
							</div>
							<div v-if="vipshow &&item[1] && item[1].up_down == 0" class="button">
								<button id="red" @click="fn5(item[1] && item[1].id,item[1] && item[1].stop_type)">删除空头策略</button>
								<button id="red" @click="clearance2(item[1] && item[1].id,false,true)">一键平空清仓</button>
								<button id="red" @click="fn6(item[1] && item[1])">修改空头策略</button>
								<!-- <button id="red" @click="open_strategy(item[1] && item[1].id,'1',item[1] && item[1].up_down)">{{item[1] && item[1].stop_type== 0?'开启空头交易':'停止空头交易'}}</button> -->
							<button v-if="item[1] && item[1].status==0" id="red" @click="open_strategy(item[1] && item[1].id,'1',item[1] && item[1].up_down)">开启空头交易</button>
							<button v-else id="red" @click="check=0;close_now3(item[1].id)">停止空头交易</button>
							</div>
							<div v-if="vipshow &&item[0] && item[0].up_down == 0" class="button">
								<button id="red" @click="fn5(item[0] && item[0].id,item[0] && item[0].stop_type)">删除空头策略</button>
								<button id="red" @click="clearance2(item[0] && item[0].id,false,true)">一键平空清仓</button>
								<button id="red" @click="fn6(item[0] && item[0])">修改空头策略</button>
								<!-- <button id="red" @click="open_strategy(item[1] && item[1].id,'1',item[1] && item[1].up_down)">{{item[1] && item[1].stop_type== 0?'开启空头交易':'停止空头交易'}}</button> -->
							<button v-if="item[0] && item[0].status==0" id="red" @click="open_strategy(item[0] && item[0].id,'1',item[0] && item[0].up_down)">开启空头交易</button>
							<button v-else id="red" @click="check=0;close_now3(item[0].id)">停止空头交易</button>
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
							<p>开仓张数:{{item.up_num?'多'+item.up_num:''}} {{item.down_num?'空 '+item.down_num:''}}</p>
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
			<div style="display: flex;padding-bottom: 8px;">
				<span style="margin-left: 16px;font-size: 14px;">开单方向：</span>
				<van-checkbox shape="square" v-model="checked2" style="font-size: 14px;" icon-size="16">开多</van-checkbox>
				<van-checkbox shape="square" v-model="checked3" style="font-size: 14px;" icon-size="16">开空</van-checkbox>
			</div>
			<div style="display: flex;padding-bottom: 10px;">
				<span style="margin-left: 16px;font-size: 14px;">开单类型：</span>
				<van-checkbox shape="square" v-model="checked5" style="font-size: 13px;margin-left: 0;" icon-size="14">首仓平投</van-checkbox>
				<van-checkbox shape="square" v-model="checked6" style="font-size: 13px;margin-left: 0;" icon-size="14">首仓倍投</van-checkbox>
				<van-checkbox shape="square" v-model="checked7" style="font-size: 13px;margin-left: 0;" icon-size="14">尾仓倍投</van-checkbox>
			</div>
			<div style="display: flex;flex-flow:row wrap;">
				<div v-show="checked2 && shuju==5" class="heyue-body">
					<span>开多张数:</span>
					<input v-model="number2" type="number" />
					<span>张</span>
				</div>
				<div v-show="checked3 && shuju==5" class="heyue-body">
					<span>开空张数:</span>
					<input v-model="number3" type="number" />
					<span>张</span>
				</div>
				<div v-show="shuju==2" class="heyue-body">
					<span>开仓张数:</span>
					<input v-model="number5" type="number" />
					<span>张</span>
				</div>
				<div class="heyue-body">
					<span>杠杆倍数:</span>
					<input v-model="number4" type="number" />
					<span>倍</span>
				</div>

				<div v-show="shuju==5" class="heyue-body">
					<span>最大补仓:</span>
					<input v-model="ordernum" type="number" />
					<span>单</span>
				</div>
				<div v-show="shuju==5" class="heyue-body">
					<span>补仓间隔:</span>
					<input v-model="interval2" type="number" />
					<span>%</span>
				</div>
				<div v-show="shuju==5" class="heyue-body">
					<span>补仓回调:</span>
					<input v-model="repair_back" type="number" />
					<span>%</span>
				</div>
				<div v-show="shuju==5" class="heyue-body">
					<span>止盈比例:</span>
					<input v-model="profitratio" type="number" />
					<span>%</span>

				</div>
				<div v-show="shuju==5" class="heyue-body">
					<span>止盈回调:</span>
					<input v-model="profit_back" type="number" />
					<span>%</span>
				</div>
			</div>
			<div style="display: flex;padding-top: 8px;" v-show="shuju==5">
				<span style="margin-left: 16px;font-size: 14px;">止盈方式：</span>
				<van-checkbox icon-size="16" shape="square" v-model="checked8" style="font-size: 14px;">尾仓止盈</van-checkbox>
				<van-checkbox icon-size="16" shape="square" v-model="checked9" style="font-size: 14px;">整体止盈</van-checkbox>
			</div>
			<p class="imgge1">止损设置
				<span style="font-weight: 500; font-size: 12px;margin-right: 0.2rem;display: flex;">
					<div style="margin-right: 4px;line-height: 34px;height: 34px;">关</div>
					<van-switch v-model="loss_stop_switch" size=".26rem" />
					<div :class="{'active2':loss_stop_switch}" style="margin-left: 4px;line-height: 34px;height: 34px;">开</div>
				</span>
			</p>
			<div v-show="loss_stop_switch" style="display: flex;padding-top: 8px;">
				<span style="margin-left: 16px;font-size: 14px;">止损方式：</span>
				<van-checkbox icon-size="16" shape="square" v-model="checked10" style="font-size: 14px;">尾仓止损</van-checkbox>
				<van-checkbox icon-size="16" shape="square" v-model="checked11" style="font-size: 14px;">整体止损</van-checkbox>
			</div>
			<div v-show="loss_stop_switch" style="display: flex;flex-flow:row wrap">
				<div v-show="shuju==5" class="heyue-body">
					<span>止损比例:</span>
					<input v-model="loss_stop" type="number" />
					<span>%</span>
				</div>

			</div>
			<p style="height: 15px;"></p>
		</van-dialog>
		<van-dialog v-model="show3" title="设置预算" show-cancel-button :before-close="beforeClose">
			<p style="height: 15px;"></p>
			<div style="display: flex;padding-bottom: 10px;">
				<span style="margin-left: 16px;font-size: 14px;">开单类型：</span>
				<van-checkbox shape="square" v-model="checked5" style="font-size: 13px;margin-left: 0;" icon-size="14">首仓平投</van-checkbox>
				<van-checkbox shape="square" v-model="checked6" style="font-size: 13px;margin-left: 0;" icon-size="14">首仓倍投</van-checkbox>
				<van-checkbox shape="square" v-model="checked7" style="font-size: 13px;margin-left: 0;" icon-size="14">尾仓倍投</van-checkbox>
			</div>
			<div style="display: flex;flex-flow:row wrap">
				<div v-show="bool4 == 1 " class="heyue-body">
					<span>开多张数:</span>
					<input v-model="number2" type="number" />
					<span>张</span>
				</div>
				<div v-show="bool4 == 0" class="heyue-body">
					<span>开空张数:</span>
					<input v-model="number3" type="number" />
					<span>张</span>
				</div>
				<div class="heyue-body">
					<span>杠杆倍数:</span>
					<input v-model="number4" type="number" />
					<span>倍</span>
				</div>
				<div class="heyue-body">
					<span>最大补仓:</span>
					<input v-model="ordernum" type="number" />
					<span>单</span>
				</div>
				<div class="heyue-body">
					<span>补仓间隔:</span>
					<input v-model="interval2" type="number" />
					<span>%</span>
				</div>
				<div v-show="shuju==5" class="heyue-body">
					<span>补仓回调:</span>
					<input v-model="repair_back" type="number" />
					<span>%</span>
				</div>
				<div class="heyue-body">
					<span>止盈比例:</span>
					<input v-model="profitratio" type="number" />
					<span>%</span>
				</div>
				<div v-show="shuju==5" class="heyue-body">
					<span>止盈回调:</span>
					<input v-model="profit_back" type="number" />
					<span>%</span>
				</div>
			</div>
			<div style="display: flex;padding-top: 8px;">
				<span style="margin-left: 16px;font-size: 14px;">止盈方式：</span>
				<van-checkbox icon-size="16" shape="square" v-model="checked8" style="font-size: 14px;">尾仓止盈</van-checkbox>
				<van-checkbox icon-size="16" shape="square" v-model="checked9" style="font-size: 14px;">整体止盈</van-checkbox>
			</div>
			<p class="imgge1">止损设置
				<span style="font-weight: 500; font-size: 12px;margin-right: 0.2rem;display: flex;">
					<div style="margin-right: 4px;line-height: 34px;height: 34px;">关</div>
					<van-switch v-model="loss_stop_switch" size=".26rem" />
					<div :class="{'active2':loss_stop_switch}" style="margin-left: 4px;line-height: 34px;height: 34px;">开</div>
				</span>
			</p>
			<div v-show="loss_stop_switch" style="display: flex;padding-top: 8px;">
				<span style="margin-left: 16px;font-size: 14px;">止损方式：</span>
				<van-checkbox icon-size="16" shape="square" v-model="checked10" style="font-size: 14px;">尾仓止损</van-checkbox>
				<van-checkbox icon-size="16" shape="square" v-model="checked11" style="font-size: 14px;">整体止损</van-checkbox>
			</div>
			<div v-show="loss_stop_switch" style="display: flex;flex-flow:row wrap">
				<div v-show="shuju==5" class="heyue-body">
					<span>止损比例:</span>
					<input v-model="loss_stop" type="number" />
					<span>%</span>
				</div>

			</div>
			<p style="height: 15px;"></p>
		</van-dialog>
	</div>
</template>

<script>
	import Vue from "vue";
	import {
		Dialog,
		Field,
		Popup,
		Checkbox,
		Radio,
	} from "vant";
	Vue.use(Field);
	Vue.use(Dialog);
	Vue.use(Popup);
	Vue.use(Checkbox);
	Vue.use(Radio);
	export default {
		components: {
			Dialog,
			Field,
			Popup,
			Checkbox,
			Radio,
		},
		data() {
			return {
				repair_back: '',
				profit_back: '',
				loss_stop: '',
				follow: false,
				vipshow: false,
				type_status: false,
				monery: 5000,
				checked2: true,
				checked3: true,
				checked5: true,
				checked6: false,
				checked7: false,
				checked8: true,
				checked9: false,
				checked10: true,
				checked11: false,
				show7: false,
				id3: '',
				value: 3,
				number: "",
				number2: "",
				number3: "",
				number4: "",
				number5: "",
				makelist: '',
				interval: '',
				interval2: '',
				ordernum: '',
				profitratio: '',
				show2: false,
				isshow: false,
				isshow2: false,
				show: false,
				matterplay: false,
				bidui: false,
				jsbidui: false,
				closedeal: false,
				width: 0,
				seletext: "",
				selt: "",
				index: 0,
				check: 0,
				count: 0,
				profit: 0,
				bourse: "",
				strategy_list: [],
				types: 6,
				selsym: [],
				symbol: "USDT",
				symbol3: 'ETH',
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
				pointnum: "",
				USDTnum: '',
				ljsyl: "",
				list3: [],
				shuju: 5,
				show3: false,
				loss_stop_switch: false,
				show6: true,
				backinfo: {
					profit_stop_case: 1,
					loss_stop_case: 1,
					loss_stop_switch: 0,
				},
				bool3: false,
				symbol2: "USDT",
				bool4: null,
				id2: null,
				huobi: true,
				idbool: false,
				textsel: 'ETH',
				columns: [],
				time4: 365,
				etharr: [],
				btcarr: [],
				trader_list: [],
				tradert: {},
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
					this.trader_detail()
				}
				
			});


			if (localStorage.getItem("bourse1")) {
				this.bourse = localStorage.getItem("bourse1");
			} else {
				this.bourse = 4
			}

			this.$axios
				.get("/index/mywallet/mywalletInfo", {
					page: 1,
					limit: 1
				})
				.then((res) => {
					let info = res.data.info;
					this.pointnum = info.robot_point;
					this.USDTnum = (info.number * 1).toFixed(2)
				});
				
		},
		watch: {
			checked5(newValue, oldValue) {
				if (newValue == true) {
					this.checked6 = false
					this.checked7 = false
				}
			},
			checked6(newValue, oldValue) {
				if (newValue == true) {
					this.checked5 = false
					this.checked7 = false
				}
			},
			checked7(newValue, oldValue) {
				if (newValue == true) {
					this.checked5 = false
					this.checked6 = false
				}
			},
			checked8(newValue, oldValue) {
				if (newValue == true) {
					this.checked9 = false
				}
			},
			checked9(newValue, oldValue) {
				if (newValue == true) {
					this.checked8 = false
				}
			},
			checked10(newValue, oldValue) {
				if (newValue == true) {
					this.checked11 = false
				}
			},
			checked11(newValue, oldValue) {
				if (newValue == true) {
					this.checked10 = false
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
			
		},
		methods: {
			trader_detail(){
				this.$axios
					.post("/index/follow/follow_trader_detail")
					.then((res) => {
						if (res.data.code == 0) {
							this.tradert = res.data.info
						}
					});
			},
			
			follow_trader(id, symbol_deal) {
				this.$axios
					.post("/index/follow/follow_trader", {
						id,
						bourse: "4",
						symbol_deal,
						symbol: 'USDT'
					})
					.then((res) => {
						if (res.data.code == 0) {
							this.$toast.success({
								message: res.data.msg
							})
							this.follow = false
							this.start()
							this.trader_detail()
						} else {
							this.$toast.fail({
								message: res.data.msg
							})
						}

					});
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
			},

			fn6(item) {
				if (this.shuju == 2) {
					this.number5 = item.first_amount;
				}
				this.number2 = item.first_amount;
				this.number3 = item.first_amount;
				this.number4 = item.leverage;
				this.bool4 = item.up_down;
				this.id2 = item.id;
				this.show3 = true;
				this.ordernum = item.order_num
				this.loss_stop = item.loss_stop
				this.repair_back = item.repair_back
				this.profit_back = item.profit_back
				if (item.interval) {
					this.makelist = item.order_num
					this.profitratio = item.profit
					if (this.shuju == 5) {
						this.interval2 = item.interval
						if (item.profit_case) {
							this.checked8 = false
							this.checked9 = true
						} else {
							console.log(668)
							this.checked8 = true
							this.checked9 = false
						}
						if (item.loss_stop_case) {
							this.checked10 = false
							this.checked11 = true
						}
						if (item.loss_stop_switch) {
							this.loss_stop_switch = true
						} else {
							this.loss_stop_switch = false
						}
						if (item.amount_scale == 1) {
							this.checked5 = false
							this.checked6 = true
							this.checked7 = false
						} else if (item.amount_scale == 2) {
							this.checked5 = false
							this.checked6 = false
							this.checked7 = true
						} else {
							this.checked5 = true
							this.checked6 = false
							this.checked7 = false
						}

					} else {
						this.interval = item.interval
					}
				}

			},
			fn8(bool){
				if(!bool){
					this.$toast.fail({message: '请与客服联系',duration: 2000})
				}
			},
			fn5(id, type) {
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
			beforeClose: function(action, done) {
				if (action === "confirm") {
					let obj = {};
					obj.leverage = this.number4;
					let str = "";
					let amount_scale = ''
					obj.profit = this.profitratio
					obj.interval = this.interval2
					if (this.checked8) {
						obj.profit_case = 0
					} else {
						obj.profit_case = 1
					}
					if (this.checked5) {
						obj.amount_scale = 0
					}
					if (this.checked6) {
						obj.amount_scale = 1
					}
					if (this.checked7) {
						obj.amount_scale = 2
					}
					if (this.checked10) {
						obj.loss_stop_case = 0
					} else {
						obj.loss_stop_case = 1
					}
					obj.loss_stop = this.loss_stop
					obj.profit_back = this.profit_back
					obj.repair_back = this.repair_back
					if (this.loss_stop_switch) {
						obj.loss_stop_switch = 1
						if (this.loss_stop <= 0) {
							this.$toast.fail({
								message: "止损比例应大于0",
								duration: 2000
							})
							done();
							return
						}
					} else {
						obj.loss_stop_switch = 0
					}
					if (this.bool4 == 0 || this.bool4 == 1 || this.bool4 == 2) {
						obj.id = this.id2;
						obj.up_down = this.bool4;
						obj.order_num = this.ordernum

						str = "set_strategy";
						console.log(this.bool4)
						if (this.bool4 == 0) {
							obj.first_amount = this.number3;
							if (!this.number3 || !this.number4) {
								this.$toast.fail({
									message: "请填写完整",
									duration: 2000
								});
								done();
								return;
							}
						} else if (this.bool4 == 1) {
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
						obj.type = 6;
						obj.bourse = this.bourse;
						obj.symbol = this.symbol2;
						obj.symbol_deal = this.symbol3;
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
						if (this.shuju == 5) {
							// obj.profit = this.profitratio
							// obj.interval = this.interval2
							obj.order_num = this.ordernum

						}
						obj.amount = this.monery
						str = "set_strategy_all";
						this.jysymbol = 0;
					}
					this.$axios.post(`/index/follow/${str}`, obj).then((res) => {
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
					if(this.vipshow){
						abc = 'BTC,ETH'
					}else{
						this.strategy_list.forEach(item => {
							abc.push(item.symbol_deal)
						})
						abc = [...new Set(abc)].join(',')
					}
					
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
					let str = '';

					this.$router.push(
						`showdetail2?type=fol`
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
				str = 'get_monitoring_total'
				//取利润
				this.$axios
					.post(`/index/follow/${str}`, {
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
			},
			start(bool) {
				if (!bool) {
					this.start1();
				}
				let str;
				this.strategy_list = []
				if (!this.vipshow) {
					str = 'get_follow_strategy_list'
				} else {
					str = 'get_strategy_list'
				}
				let that = this
				this.$axios
					.post(`/index/follow/${str}`, {
						symbol: this.symbol2,
						bourse: this.bourse,
						type: this.types,
					})
					.then((res) => {
						if (this.vipshow) {
							let etharr = []
							let btcarr = []
							res.data.list.forEach(item => {
								if (item.symbol_deal == 'ETH') {
									etharr.push(item)
								}
								if (item.symbol_deal == 'BTC') {
									btcarr.push(item)
								}
							})
							this.strategy_list.push(etharr)
							this.strategy_list.push(btcarr)
							console.log(this.strategy_list)
						} else {
							this.strategy_list = res.data.list;
						}
						
						res.data.list.forEach(item => {
							if (item.symbol_deal == 'ETH') {
								that.etharr.push(item.first_amount)
								that.etharr.push(item.leverage)
							} else {
								that.btcarr.push(item.first_amount)
								that.btcarr.push(item.leverage)
							}
							if (item.status == 1) {
								that.type_status = true
							}
						})

					});

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
			firmcolse(s) {
				this.check = s;
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
						} else {
							this.$toast.fail({
								message: res.data.msg,
								duration: 2000
							});
						}
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
			close_now3(id, bool) {
				Dialog.confirm({
						title: `确定停止`,
						message: `是否要临时停止?`,
					})
					.then(() => {
						this.close_now(id)
					})
					.catch(() => {});
			},
			clearance2(id, bool,show) {
				let obj = {};
				obj.id = id
				let str = ''
				if (bool) {
					obj.up_down = 1
					str = '多'
				} else {
					obj.up_down = 0
					str = '空'
				}
				Dialog.confirm({
						title: "确定平仓",
						message: `是否要一键平${str}？`,
					})
					.then(() => {
						if(show){
							this.$axios
								.post("/index/swap/follow_clear",obj)
								.then((res) => {
									if (res.data.code == 0) {
										// this.trader_list = res.data.info
										this.$toast.success({
											message: res.data.msg,
											duration: 2000
										});
										this.start();
									}else{
										this.$toast.fail({
											message: res.data.msg,
											duration: 2000
										});
									}
								});
							}else{
								this.close_now(1, obj)
							}
					})
					.catch(() => {});
			},
			close_now(id, obj) {
				this.closeid
				let id2 = this.closeid ? this.closeid : id
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
								let string = 'get_strategy_list'

								let that = this
								this.$axios
									.post(`/index/swapstrategy/${string}`, {
										symbol: this.symbol,
										bourse: this.bourse,
										type: this.types,
									})
									.then((res) => {
										res.data.list.forEach((item, index) => {
											this.$set(this.strategy_list, index, item);

									});
									})

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
					let object = {};
					if(!this.vipshow){
						str = 'trend_clearance'
						object = obj
					}else{
						object.id = obj.id
						str = 'clearance'
					}
					this.$axios
						.post(`/index/swap/${str}`, object).then((res) => {
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

		.van-switch {
			margin-top: 0.15rem;
		}
	}
</style>
