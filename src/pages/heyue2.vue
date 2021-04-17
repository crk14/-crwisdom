<template>
	<div class="intetrading">
		<div class="tophader">
			<van-icon name="arrow-left" style="    width: 1rem;
    height: 0.8rem;
    z-index: 1;
    line-height: .8rem;
    margin-top: -.4rem;"
			 onclick="window.history.go(-1)" />
			<p v-if="typeid==2">{{idbool?'CR合约专业量化机器人':'CR合约专业量化机器人(期限版)'}}</p>
			<p v-if="typeid==3">CR合约量化机器人(趋势版)</p>
		</div>
		<van-pull-refresh
		  v-model="isLoading"
		  success-text="刷新成功"
		  @refresh="onRefresh"
		>
		<img v-show="!type_status" class="statusimg" src="../assets/auto.png" />
		<img v-show="type_status" class="statusimg" src="../assets/crliang.gif" />
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
			<div v-show="typeid ==3" style="font-size: .25rem;font-weight: 550;margin-left: 48%;margin-top: .05rem;">点卡余额：{{pointnum}}</div>
			<div v-show="typeid ==2 && idbool" style="font-size: .25rem;font-weight: 550;margin-left: 15%;margin-top: .05rem;">USDT余额：{{USDTnum}}</div>
			<div v-show="typeid ==2 && idbool" style="font-size: .25rem;font-weight: 550;flex: 1;margin-left: 3%; margin-top: .05rem;">剩余有效天数：{{time4}}天</div>
			<div v-show="typeid ==2 && !idbool" style="font-size: .25rem;font-weight: 550;flex: 1;margin-left: 48%; margin-top: .05rem;">剩余有效天数：{{time4}}天</div>
		</div>
		<div class="strategy" v-show="typeid!=3">
			<div class="onep" style="display: flex;margin: 4px 0;">
				<span class="dfirst" style="color: #999999;font-size: .24rem;">仓位监测</span>
				<div style="font-size: .28rem;width: 3.2rem;text-align: center;">{{parseInt(Number(principals)*1000)/1000||0}}USDT({{textsel}})
					<van-icon name="arrow-down" @click="jiaoyi = !jiaoyi" />
				</div>
			</div>
			<p style="margin-right: .7rem;">
				<span>计价方式</span>

				<span :class="{'active6':symbol2=='USDT'}" style="text-align: center;" @click="symbol2='USDT'">USDT保证金合约</span>
				<!-- <span :class="{'active6':symbol2=='USD'}" style="text-align: center;" @click="symbol2='USD'">币本位保证金合约</span> -->
				<span :class="{'active6':symbol2=='USD'}" style="text-align: center;">币本位保证金合约</span>
			</p>
		</div>
		<p v-show="typeid!=3" style="display: flex;height: 35px;line-height: 35px;border-bottom: 4px solid #f5f6fa;font-size: .26rem;color: rgb(34, 132, 253);">
			<span @click="bounce(4)" style="flex:1;text-align: center;">添加货币对{{jysymbol>0?'('+jysymbol+')':''}}</span>
			<span style="color: #D0D0D0;">|</span>
			<span style="flex:1;text-align: center;" @click="bool2=false,fn2()">一键设置预算</span>
		</p>
		<div v-show="typeid==3" class="note-t">
			<div class="div">
				计 价 方 式
				<div></div>
			</div>
			<div class="div2">
				<div class="avtive" style="width: 45%;margin-left: -7px;">USDT保证金合约</div>
			</div>
		</div>
		<div v-show="typeid==3" class="note-t">
			<div class="div">
				选择交易对
				<div></div>
			</div>
			<div class="div2">
				<div :class="{'avtive':symbol3.search('BTC') != -1}" @click="symbol3='BTC'"><span>BTC</span>/USDT</div>
				<div :class="{'avtive':symbol3.search('ETH') != -1}" @click="symbol3='ETH'"><span>ETH</span>/USDT</div>
			</div>
		</div>
		<div class="note-t" v-show="typeid==3">
			<div class="div">
				选 择 仓 位
				<div></div>
			</div>
			<div class="div2 ">
				<div :class="{'avtive':monery==5000}" @click="monery=5000">5000 USDT</div>
				<div :class="{'avtive':monery==10000}" @click="$toast.fail({message: '暂未开放',duration: 2000})">10000 USDT</div>
			</div>

		</div>
		<div class="note-t" v-show="typeid==3">
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

		</div>
		<p class="headtitle">
			<span>|</span>实时监控
			<button v-if="typeid== 3" @click="confim()" style="margin-left: 38%;line-height: 22px; background: #4389eb;color: #fff;border-radius: 4px;font-size: 14px;width: 36%;">一键生成应用</button>
		</p>
		<div class="tranumber" v-if="typeid== 2">
			<div class="cent">
				<div class="box">
					<p style="color: #C0C5CB;">成交单数</p>

					<p class="box1">{{count}}单</p>
				</div>
			</div>
			<div class="cent">
				<div class="box">
					<p style="color: #C0C5CB;">完成利润</p>
					<p class="box1">{{(profit*1).toFixed(2)}} {{symbol}}</p>
				</div>
			</div>
			<div class="cent">
				<div class="box">
					<p style="color: #C0C5CB;">收益率</p>
					<p class="box1">{{ljsyl?ljsyl:0}}%</p>
				</div>
			</div>

		</div>
		<div class="headtitle" v-if="typeid== 3" style="justify-content: space-between;font-size: 13px;">
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
						<span style="font-size: 13px;line-height: 20px;font-weight: 550;">{{item.symbol_deal}}/<span style="color: #828282;font-weight: 540;">USDT永续</span></span>
						<span style="font-size: 13px;display: flex;margin-left: 2%;line-height: 18px;" v-show="shuju==2">
							<span class="item-span1" style="font-size: .2rem;padding: 0 2.5px;transform: scale(0.9);margin-top: 2.7px;">多</span>
							<span class="item-span" style="font-size: .2rem;padding: 0 2.5px;transform: scale(0.9);margin-top: 2.7px;">空</span>
							<span style="font-size: .2rem;padding: 1px 2.5px 0;transform: scale(0.85);margin-top: 1.7px;background-color: #f5a623;color: #FFFFFF;">{{item.leverage}}x</span>
						</span>
						<span style="font-size: .22rem;margin-left: 7px;" v-show="shuju==5">
							<span class="item-span" :class="{'item-span1':item.up_down == 1}" style="font-size: .2rem;padding: 0 2.5px;transform: scale(0.9);margin-top: 1.7px;">{{item.up_down == 0?'空':'多'}}-{{item.leverage}}x</span>

						</span>

						<span style="position: absolute;right: 17px;" v-if="shuju ==5">
							<button style="background:rgb(97,161,240);margin-left: 0;" @click="fn5(item.id,item.stop_type)">删除策略</button>
							<button style="background:rgb(97,161,240);" @click="fn6(item)">设置预算</button>
							<button class="button1" :class="{'button3':item.stop_type != 0}" v-if="item.status==0" @click="open_strategy(item.id,'1',item.up_down)">{{item.stop_type== 0?'开启交易':'恢复交易'}}</button>
							<button style="background:#BD1616" @click="bounce(0,item.id,item.stop_type)" v-else>{{item.stop_type!== 2?'停止交易':'恢复交易'}}</button>
						</span>
						<span style="font-size: 13px;margin-left: auto;" v-show="shuju == 2">账户权益: {{item.balance?item.balance:0}}USDT</span>
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
							<p><span> {{item.up_down == 0?'空:':'多:'}}</span> {{item.buy_count_average}}</p>
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
					<div class="tabul1" v-if="shuju==2">
						<div class="two two2">
							<div style="text-align: left;width: 26%;">
								<p class="p1"><span class="span2"> </span> 建 仓 数 量</p>
								<P><span class="span2"> </span> 持 仓 均 价</P>
								<P class="p"><span class="span2"> </span> 交 易 笔 数</P>
								<p style="width: 75%;padding-left: 25%;">{{item.sell_count}}</p>
							</div>
							<div class="div" style="text-align: center;">
								<p class="p1"><span class="span"></span>多: {{item.up_filled_qty?item.up_filled_qty:0}} 张<span class="span1"></span></p>
								<p><span class="span"></span>多: {{(item.up_price_avg*1).toFixed(2)}}<span class="span1"></span></p>
								<P class="p"><span class="span span3"></span>结 算 收 益<span class="span1 span3"></span></P>
								<p><span class="span"></span>{{(item.profit_cash*1).toFixed(2)}}<span style="margin-left: 2px;">USDT</span><span
									 class="span1"></span></p>
							</div>
							<div class="div">
								<p class="p1">空: {{item.down_filled_qty?item.down_filled_qty:0}} 张</p>
								<p>空: {{(item.down_price_avg*1).toFixed(2)}}</p>
								<p class="p">收 益 率</p>
								<p>{{item.syl.toFixed(2)}}%</p>
							</div>
						</div>
					</div>
					<div class="tabul1" v-if="shuju==2">
						<div class="button" style="padding-top: 7px;">
							<button @click="fn5(item.id,item.stop_type)">删除策略</button>
							<button :class="{'active':item.up_filled_qty}" @click="check=2;clearance2(item.id,true)">一键平多</button>
							<button :class="{'active':item.down_filled_qty}" @click="check=2;clearance2(item.id,false)">一键平空</button>
							<button :class="{'active':item.status == 1}" @click="check=0;close_now3(item.id)">临时停止</button>
							<button :class="{'active':item.status == 0}" @click="open_strategy(item.id,'1',item.up_down)">启动交易</button>
						</div>
					</div>
				</li>
			</ul>
		</div>
		
		</van-pull-refresh>
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


		<!-- 问题弹框 -->
		<van-popup v-model="matterplay" style="width: 80%;">
			<matter></matter>
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
			
			</div>
			<div style="display: flex;padding-top: 8px;">
				<span style="margin-left: 16px;font-size: 14px;">止盈方式：</span>
				<van-checkbox icon-size="16" shape="square" v-model="checked8" style="font-size: 14px;">尾仓止盈</van-checkbox>
				<van-checkbox icon-size="16" shape="square" v-model="checked9" style="font-size: 14px;">整体止盈</van-checkbox>
			</div>
			<div style="display: flex;flex-flow:row wrap">
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
				<p class="imgge1">止损设置
					<span style="font-weight: 500; font-size: 12px;margin-right: 0.2rem;display: flex;">
						<div style="margin-right: 4px;line-height: 34px;height: 34px;">关</div>
						<van-switch v-model="loss_stop_switch" size=".26rem" />
						<div :class="{'active2':loss_stop_switch}" style="margin-left: 4px;line-height: 34px;height: 34px;">开</div>
					</span>
				</p>
					<div v-show="loss_stop_switch"style="display: flex;padding-top: 8px;">
						<span style="margin-left: 16px;font-size: 14px;">止损方式：</span>
						<van-checkbox icon-size="16" shape="square" v-model="checked10" style="font-size: 14px;">逐仓止损</van-checkbox>
						<van-checkbox icon-size="16" shape="square" v-model="checked11" style="font-size: 14px;">整体止损</van-checkbox>
					</div>
					<div v-show="loss_stop_switch" style="display: flex;flex-flow:row wrap">
						<div  class="heyue-body">
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
				<!-- <div v-show="shuju==5" class="heyue-body">
					<span>止盈回调:</span>
					<input v-model="profit_back" type="number" />
					<span>%</span>
				</div> -->

			</div>
			<div style="display: flex;padding-top: 8px;">
				<span style="margin-left: 16px;font-size: 14px;">止盈方式：</span>
				<van-checkbox icon-size="16" shape="square" v-model="checked8" style="font-size: 14px;">尾仓止盈</van-checkbox>
				<van-checkbox icon-size="16" shape="square" v-model="checked9" style="font-size: 14px;">整体止盈</van-checkbox>
			</div>
			<div style="display: flex;flex-flow:row wrap">
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
					<!-- <p style="height: 15px;"></p> -->
					<p class="imgge1">止损设置
						<span style="font-weight: 500; font-size: 12px;margin-right: 0.2rem;display: flex;">
							<div style="margin-right: 4px;line-height: 34px;height: 34px;">关</div>
							<van-switch v-model="loss_stop_switch" size=".26rem" />
							<div :class="{'active2':loss_stop_switch}" style="margin-left: 4px;line-height: 34px;height: 34px;">开</div>
						</span>
					</p>
					<div v-show="loss_stop_switch" style="display: flex;padding-top: 8px;">
						<span style="margin-left: 16px;font-size: 14px;">止损方式：</span>
						<van-checkbox icon-size="16" shape="square" v-model="checked10" style="font-size: 14px;">逐仓止损</van-checkbox>
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
		<van-picker v-show="jiaoyi" show-toolbar title="选择仓位币对金额" :columns="columns" @confirm="conwan" @cancel="jiaoyi=!jiaoyi" />
	</div>
</template>

<script>
	import Vue from "vue";
	import matter from '../modu/matter.vue'
	import {
		Dialog,
		Field,
		Popup,
		Checkbox,
		Picker
	} from "vant";
	Vue.use(Field);
	Vue.use(Dialog);
	Vue.use(Popup);
	Vue.use(Checkbox);
	Vue.use(Picker);
	export default {
		components: {
			Dialog,
			Field,
			Popup,
			Checkbox,
			Picker,
			matter
		},
		data() {
			return {
				isLoading:false,
				stop_back: '',
				stop_ratio: '',
				cover_back: '',
				check_back: '',
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
				index: 0,
				check: 0,
				count: 0,
				profit: 0,
				bourse: "",
				strategy_list: [],
				symbol_list: [],
				types: 3,
				selsym: [],
				symbol: "USDT",
				symbol3: 'BTC',
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
				USDTnum:'',
				ljsyl: "",
				list3: [],
				shuju: 5,
				show3: false,
				show5: false,
				show6: true,
				loss_stop_switch: false,
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
				huobi: true,
				jiaoyi: false,
				idbool: false,
				textsel: 'ETH',
				typeid: '3',
				columns: [],
				time4: 365,
				etharr: [],
				btcarr: [],
				repair_back: '',
				profit_back: '',
				loss_stop: '',
			};
		},
		created() {
		
			this.typeid = this.$route.query.type
			this.$axios
				.post("/index/robot/robot_systerm", {
					robot_type: this.typeid,
				})
				.then((res) => {
					if (res.data.code == 0) {
						if (res.data.state != 1) {
							this.$router.push('/store')
						}
					}
				});
			this.time4 = this.$route.query.time
			if (this.$route.query.bool) {
				this.idbool = true
			}

			if (localStorage.getItem("bourse1")) {
				this.bourse = localStorage.getItem("bourse1");
			}
			if (this.typeid == 3) {
				this.types = 2
				this.shuju = 2
				this.number5 = 100
				this.number4 = 100
			} else {
				this.tostring()
			}
			
			if (this.bourse == 4) {
				this.selectsymbol[3].a = "OKB";
			}
			this.start()
			this.mywalletInfo()
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
			symbol3(newValue, oldValue) {
				if (newValue == 'BTC') {
					if (this.btcarr.length) {
						this.number4 = this.btcarr[1]
						this.number5 = this.btcarr[0]
					} else {
						this.number5 = 100
						this.number4 = 100
					}
				} else if (newValue == 'ETH') {
					if (this.etharr.length) {
						this.number4 = this.etharr[1]
						this.number5 = this.etharr[0]
					} else {
						this.number4 = 50
						this.number5 = 200
					}

				}
			},
		},
		methods: {
			onRefresh(){
					  this.start()
					  this.mywalletInfo()
				  setTimeout(() => {
				        this.isLoading = false;
				      }, 1000);
				},
			mywalletInfo(){
				this.$axios
					.get("/index/mywallet/mywalletInfo", {
						page: 1,
						limit: 1
					})
					.then((res) => {
						let info = res.data.info;
						this.pointnum = info.robot_point;
						this.USDTnum = (info.number * 1).toFixed(1)
					});
			},
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
				} else {
					Dialog.confirm({
						title: "提醒",
						message: "请选择策略类型",
					});
				}
				if (!this.bool2) {
					this.show5 = false
					this.show6 = true
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
				// if (type == 2 ) {
				// 	this.$toast.fail({
				// 		message: "止盈停止后才可删除",
				// 		duration: 2000
				// 	});
				// 	return;
				// }
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
			confim() {
				let obj = {}
				obj.symbol = 'USDT'
				obj.symbol_deal = this.symbol3
				obj.amount = this.monery
				obj.type = 2
				obj.bourse = 4
				if (this.symbol3 == 'BTC') {
					if (this.number5 > 300) {
						this.$toast.fail({
							message: '开仓张数不能大于300张',
							duration: 1200
						})
						return
					}
				} else {
					if (this.number5 > 500) {
						this.$toast.fail({
							message: '开仓张数不能大于500张',
							duration: 1200
						})
						return
					}
				}

				obj.first_amount = this.number5;
				obj.leverage = this.number4;
				obj.up_down = '1,0';

				this.$axios.post(`/index/swapstrategy/set_strategy_all`, obj).then((res) => {
					if (res.data.code == 0) {
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
							duration: 1200
						});
					}
				})
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
				if (item.interval) {
					this.makelist = item.order_num
					this.profitratio = item.profit
					if (this.shuju == 5) {
						this.interval2 = item.interval
						this.loss_stop = item.loss_stop
						this.repair_back = item.repair_back
						this.profit_back = item.profit_back
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
			beforeClose: function(action, done) {
				if (action === "confirm") {
					let obj = {};
					obj.leverage = this.number4;
					let str = "";
					let amount_scale = ''
					if (this.shuju == 5) {
						obj.profit = this.profitratio
						obj.interval = this.interval2
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
					}
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
						if (this.shuju == 5) {
							obj.order_num = this.ordernum

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
					console.log(abc, this.strategy_list)
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
					let str = '';
					if (this.typeid == 2) {
						str = '&poni=1'
						this.$router.push(
							"showdetail2?type=2"
						);
					} else {
						this.$router.push(
							"showdetail2"
						);
					}

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
				if (this.shuju == 2) {
					str = 'get_trend_monitoring_total'
				} else {
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
			},
			tostring() {
				if (this.shuju == 2) {
					return
				}
				this.$axios
					.post("/index/swapstrategy/get_balance", {
						symbol: this.symbol2,
						bourse: 4,
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
				this.strategy_list = []
				if (this.typeid == 3) {
					str = 'get_trend_strategy_list'
				} else {
					str = 'get_strategy_list'
				}
				let that = this
				this.$axios
					.post(`/index/swapstrategy/${str}`, {
						symbol: this.symbol2,
						bourse: this.bourse,
						type: this.types,
					})
					.then((res) => {
						this.strategy_list = res.data.list;
						if (that.typeid == 3) {
							that.symbol3 = res.data.list[0].symbol_deal
						}
						res.data.list.forEach(item => {
							if (that.typeid == 3) {
								if (item.symbol_deal == 'ETH') {
									that.etharr.push(item.first_amount)
									that.etharr.push(item.leverage)
								} else {
									that.btcarr.push(item.first_amount)
									that.btcarr.push(item.leverage)
								}
							}
							if (item.status == 1) {
								that.type_status = true
							}
						})

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
								id: res.data.info[1].article_id
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
			clearance2(id, bool) {
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
						this.close_now(1, obj)
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
								if (this.typeid == 3) {
									string = 'get_trend_strategy_list'
								}
								let that = this
								this.$axios
									.post(`/index/swapstrategy/${string}`, {
										symbol: this.symbol,
										bourse: this.bourse,
										type: this.types,
									})
									.then((res) => {
										if (that.typeid == 3) {
											that.symbol3 = res.data.list[0].symbol_deal
										}
										res.data.list.forEach((item, index) => {
											this.$set(this.strategy_list, index, item);
											if (that.typeid == 3) {
												if (item.symbol_deal == 'ETH') {
													that.etharr.push(item.first_amount)
													that.etharr.push(item.leverage)
												} else {
													that.btcarr.push(item.first_amount)
													that.btcarr.push(item.leverage)
												}
											}
											if (item.status == 1) {
												that.type_status = true
											}
										});
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
					let object = {};
					if (this.typeid == 3) {
						str = 'trend_clearance'
						object = obj
					} else {
						str = 'clearance'
						object.id = id2
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
			padding: 5px 0;
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

	.tabul1 {
		position: relative;
		min-height: 33px;

		.two {
			width: 100%;
			display: flex;
			margin: 6px 0;

			.div {
				flex: 1;
			}

			div {
				text-align: center;

				p {
					line-height: 36px;
					font-size: 13px;
					border-bottom: 2.5px solid #f5f6fa;
					color: #000;
					position: relative;

					.span {
						position: absolute;
						width: 2px;
						height: 16px;
						background-color: #e5e5e5;
						top: 7px;
						left: 0;
					}

					.span1 {
						position: absolute;
						width: 2px;
						height: 16px;
						background-color: #e5e5e5;
						top: 7px;
						right: 0;
					}

					.span2 {
						margin-right: 5px;
					}

					.span3 {
						height: 25px;
					}
				}

				.p {
					border: 0;
					line-height: 16px;
					height: 16px;
					padding-top: 7px;
				}

				.p1 {
					margin-top: 4px;
					border-top: 2.5px solid #f5f6fa;
				}

			}
		}

		.button {
			width: 104%;
			position: absolute;
			left: -2%;
			margin-bottom: 8px;
			font-size: 0.2rem;
			display: flex;
			justify-content: space-around;
			top: -4px;

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

	.van-picker {
		position: absolute;
		top: 152px;
		width: 100%;
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
		top: 3px;
		left: 47%;
		width: 30px;
		height: 40px;
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
