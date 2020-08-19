<template>
  <div class="intetrading">
    <div class="tophader">
      <van-icon
        name="arrow-left"
        style="    width: 1rem;
    height: 0.8rem;
    z-index: 1;
    line-height: .8rem;
    margin-top: -.4rem;"
        onclick="window.history.go(-1)"
      />
      <p @click="trandplay(0)">
        {{index==0?'智能做多交易':'自定做多交易'}}
        <van-icon name="play" class="playicon" />
      </p>
    </div>
    <div class="topsel">
      <p class="left" @click="bounce(1)">
        <img v-if="bourse==1" src="../assets/src_resource_image_page_huobi_logo@2x.png" alt />
        <img v-else-if="bourse==4" src="../assets/src_resource_icon_user_exchange_okex@2x.png" alt />
        <img v-else src="../assets/selt.png" alt />
        <span>{{bourse==1?'火币全球站':bourse==4?'OKEX':'选择交易所'}}</span>
      </p>
      <p class="right">
        <img src="../assets/问好@2x.png" alt @click="bounce(3)" />
        <span @click="bounce(2)">...</span>
      </p>
    </div>
    <p class="hr"></p>
    <p class="headtitle">
      <span>|</span>仓位配置
    </p>
    <div class="strategy">
      <p class="one_p">
        <span class="dfirst">策略</span>
        <!-- {{index==0?'智能做多交易':'自定做多交易'}} -->
        <span class="dtwos" v-if="index==0">
          <select v-model="noopsycheid">
            <option v-for="(item,i) in selarr" :key="i" :value="item.id">{{item.title}}</option>
          </select>
        </span>
        <span class="dtwos" v-else>自定做多交易</span>
      </p>
      <p class="one_p">
        <span class="dfirst">仓位</span>
        <span
          class="dtwos"
          v-if="index==0"
        >{{principal?(parseInt(Number(principal)*1000)/1000)+symbol:"自动获取"}}</span>
        <span class="dtwos" v-if="index==1">{{parseInt(Number(principals)*1000)/1000||0}}{{symbol}}</span>
      </p>

      <p class="seting" v-show="index==1" @click="doing==0?$router.push('setting'):''">
        去设置
        <van-icon name="arrow" />
      </p>
      <p style="margin-top:.2rem;" @click="doing==0?bounce(5):''">
        <span>结算币种</span>
        <span>
          {{symbol}}
          <van-icon name="arrow" />
        </span>
      </p>
      <p @click="doing==0?bounce(4):''">
        <!-- <p @click="doing==0?bounce(4):''"> -->
        <span>交易币对</span>
        <span>
          {{jysymbol}}
          <van-icon name="arrow" />
        </span>
      </p>
      <button class="changebton" @click="send" v-if="strategy_list.length==0">获取策略</button>
      <button class="changebton" v-else @click="closecli">停止策略</button>
    </div>
    <p class="headtitle">
      <span>|</span>实时监控
    </p>
    <div class="tranumber">
      <div>
        <p>成交单数</p>

        <p>{{count}}</p>

        <!-- <p>0</p> -->

        <p>单</p>
      </div>
      <div>
        <p>完成利润</p>

        <p>{{profit}}</p>

        <!-- <p>0</p> -->

        <p>{{symbol}}</p>
      </div>
    </div>
    <div class="runy">
      <p class="headtitle">
        <span>|</span>运行结果
      </p>
      <p class="headtitle" @click="toshowdetail()"><span>|</span>成交明细</p>
	  <p></p>
      <!-- <p @click="$router.push('showdetail?type=0')">点卡明细</p> -->
    </div>
    <div class="comereult">
      <ul>
        <li v-for="(item,i) in strategy_list" :key="i">
          <p class="cometop">
            <span>
              <!-- <img src="../assets/EOS@2x.png" alt /> -->
              {{item.bidui}}
            </span>
            <span>
              <button
                style="background:#4CB2F4"
                v-show="index==1"
                @click="$router.push({path:'setting',query:{type:1,id:item.id}})"
              >设置策略</button>
              <button
                style="background:#4CB2F4"
                v-if="item.status==0"
                @click="open_strategy(item.id)"
              >开启交易</button>
              <button style="background:#BD1616" @click="bounce(0,item.id)" v-else>关闭交易</button>
            </span>
          </p>
          <div class="pressbox gundong" v-if="item.status==1">
            <p v-if="item.status==0">停止运行</p>
            <p v-if="item.status==1">正在监控中</p>
            <p v-if="item.stop_type==5">API KEY 错误</p>
            <p v-if="item.stop_type==7">仓位错误</p>
            <p v-if="item.stop_type==8">点卡不足</p>
            <p v-if="item.stop_type==9">仓位错误</p>
            <p v-if="item.stop_type==6">本金不足</p>
          </div>
          <div class="pressbox" style="background:#BFBFBF;" v-else>
            <p v-if="item.status==0">停止运行</p>
            <p v-if="item.status==1">正在运行</p>
            <p v-if="item.stop_type==5">API KEY 错误</p>
            <p v-if="item.stop_type==7">仓位错误</p>
            <p v-if="item.stop_type==8">点卡不足</p>
            <p v-if="item.stop_type==9">仓位错误</p>
            <p v-if="item.stop_type==6">本金不足</p>
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
        <!-- <li>
          <p class="cometop">
            <span>
              <img src="../assets/moneyb.png" alt />EOS/USDT
            </span>
            <span>
              <button style="background:#4CB2F4" v-show="index==1">设置策略</button>
              <button style="background:#BD1616" @click="bounce(0)">关闭交易</button>
            </span>
          </p>
          <div class="pressbox" style="background:#97CF9F;">
            <div class="press" :style="{'background':'#30A740','width':width+'%'}"></div>
            <p>正在运行</p>
          </div>
          <div class="tabul">
            <div>
              <p>建仓单数</p>
              <p>0</p>
            </div>
            <div>
              <p>平仓单数</p>
              <p>0</p>
            </div>
            <div>
              <p>实现利润</p>
              <p>0</p>
            </div>
            <div>
              <p>建仓单数</p>
              <p>0</p>
            </div>
            <div>
              <p>平仓单数</p>
              <p>0</p>
            </div>
            <div>
              <p>实现利润</p>
              <p>0</p>
            </div>
          </div>
        </li>-->
      </ul>
    </div>
    <!-- 左侧弹框 -->
    <van-popup
      v-model="show"
      position="left"
      @click="changleft"
      class="poup"
      :style="{ height: '100%' ,width:'50%'}"
    >
      <p class="jiay">选择交易所</p>
      <p class="yopen">已开通智能交易</p>
      <!-- @click="selecli(index)" -->
      <p class="hmoney" @click="clileft('火币全球站',1)">
        <img src="../assets/src_resource_image_page_huobi_logo@2x.png" alt />火币全球站
      </p>
      <p class="hmoney" @click="clileft('OKEX',4)">
        <img style="width:0.34rem" src="../assets/src_resource_icon_user_exchange_okex@2x.png" alt />OKEX
      </p>
      <p class="yopen">待开通智能交易</p>
      <ul>
        <li>
          <img src="../assets/src_resource_icon_user_exchange_zb@2x.png" alt />ZB
        </li>
        <li>
          <img src="../assets/src_resource_icon_user_exchange_binance@2x.png" alt />币安
        </li>
        <!-- <li>
          <img style="width:0.34rem" src="../assets/src_resource_icon_user_exchange_okex@2x.png" alt />OKEX
        </li>-->
      </ul>
      <p class="proxys" style="    display: none;">
        <!-- 县级 -->
        <img src="../assets/xiand.png" alt />
        <!-- 市级 -->
        <!-- <img src="../assets/citydai.png" alt /> -->
        <!-- 省级 -->
        <!-- <img src="../assets/aredai.png" alt /> -->
        <!-- 总代 -->
        <!-- <img src="../assets/alldai.png" alt /> -->
      </p>
    </van-popup>

    <!-- 右上侧弹框 -->
    <van-popup v-model="showrt" class="pouprt">
      <ul>
        <!-- <li @click="$router.push('showdetail?type=0')">
          <img src="../assets/dotecard.png" alt />点卡明细
        </li> -->
        <li @click="$router.push('showdetail?bourse='+bourse+'&type=1')">
          <img src="../assets/jscard.png" alt />结算明细
        </li>
      </ul>
    </van-popup>

    <!-- 交易币对弹窗 -->
    <van-popup
      v-model="bidui"
      position="right"
      class="poup"
      :style="{ height: '100%' ,width:'100%'}"
    >
      <div class="tophader">
        <van-icon name="arrow-left" @click="changright" />
        <p>交易币选择</p>
      </div>
      <ul>
        <li
          v-for="(item,i) in symbol_list"
          :key="i"
          @click="selecli_symbol(i)"
          style="font-weight: normal;"
        >
          {{item.symbol1.toUpperCase()}}
          <img
            v-if="item.isinput==1"
            src="../assets/corm.png"
            alt
            style="float: right;"
          />
          <img v-else src="../assets/nocomr.png" alt style="float: right;" />
        </li>

        <div class="beijing">
          <button class="changebton" @click="selecli_symbolcli()">确定选择</button>
        </div>
      </ul>
    </van-popup>

    <!-- 结算币对弹窗 -->
    <van-popup
      v-model="jsbidui"
      position="right"
      @click="changleft"
      class="poup"
      :style="{ height: '100%' ,width:'100%'}"
    >
      <div class="tophader">
        <van-icon name="arrow-left" @click="changright" />
        <p>结算币种选择</p>
      </div>
      <ul>
        <li
          v-for="(item,i) in selectsymbol"
          :key="i"
          @click="selecli_symbol1(i)"
          style="font-weight: normal;"
        >
          {{item.a}}
          <img v-if="item.b==1" src="../assets/corm.png" alt style="float: right;" />
          <img v-else src="../assets/nocomr.png" alt style="float: right;" />
        </li>

        <div class="beijing">
          <button class="changebton" @click="selecli_symbolcli1()">确定选择</button>
        </div>
      </ul>
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
          立即停止
          <img v-if="check==0" src="../assets/corm.png" alt />
          <img v-else src="../assets/nocomr.png" alt />
        </li>
        <!-- <li @click="firmcolse(1)">
          止盈后停止
          <img v-if="check==1" src="../assets/corm.png" alt />
          <img v-else src="../assets/nocomr.png" alt />
        </li>-->
        <li @click="firmcolse(2)">
          清仓停止
          <img v-if="check==2" src="../assets/corm.png" alt />
          <img v-else src="../assets/nocomr.png" alt />
        </li>
      </ul>
      <button class="changebton" @click="close_now()">确定</button>
    </van-popup>

    <div class="gifclas" :style="{display:istxt==-1?'none':'block'}">
      <img src="../assets/ddd.gif" />
      <p>
        {{istxt==5?'API KEY错误':istxt==8?'点卡不够'
        :istxt==6?'本金不足':istxt==7?'仓位错误':istxt==0?'系统正在获取数据定制策略':istxt==-10?'获取成功':''}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      selectsymbol: [
        { a: "USDT", b: 1 },
        { a: "ETH" },
        { a: "BTC" },
        { a: "HT" }
      ],
      list: [{ a: "智能做多交易" }, { a: "自定做多交易" }],
      index: 0,
      check: 0,
      count: 0,
      profit: 0,
      bourse: "",
      strategy_list: [],
      symbol_list: [],
      types: 2,
      selsym: [],
      symbol: "USDT",
      jysymbol: 0,
      istxt: -1,
      principal: "",
      clilefttxt: "选择交易所",
      doing: 0,
      principals: "",
      selarr: [],
      noopsycheid: ""
    };
  },
  created() {
    var obj = sessionStorage.getItem("jsonback");
    // if(obj){
    // this.principals=JSON.parse(obj).principal;
    // console.log(this.principals,' kkk')
    // }
    if (localStorage.getItem("index")) {
      this.index = localStorage.getItem("index");
      this.types = Number(this.index) + 1;
    } else {
      this.index = 0;
      this.types = Number(this.index) + 1;
    }
    if (localStorage.getItem("bourse")) {
      this.bourse = localStorage.getItem("bourse");
    }
    if (this.$route.query.id) {
      this.invite_code = this.$route.query.id;
      this.istogle = 1;
    }
    // if(localStorage.getItem("principal")){
    //   this.principal=localStorage.getItem("principal")
    // }
	//获取本地的策略
    this.$axios.post("/index/strategy/get_noopsyche").then(res => {
      if (res.data.code == 0) {
        this.selarr = res.data.list;
        this.noopsycheid = this.selarr[0].id;
      }
    });

    this.start();

    if (this.bourse == 4) {
      this.selectsymbol[3].a = "OKB";
    }
  },
  methods: {
	  toshowdetail(){
		  if(!this.bourse){
			  this.$toast.fail({ message: "请选择交易所", duration: 2000 })
			  return
		  }
		  this.$router.push('showdetail?bourse='+this.bourse+'&type=1')
	  },
    clileft(s, num) {
      this.bourse = num;
      // this.clilefttxt=s;
      localStorage.setItem("bourse", num);
      // localStorage.setItem("index",num);
      this.start();
    },
    closecli() {
      this.$axios.post("/index/strategy/delete_strategy").then(res => {
        if (res.data.code == 0) {
          localStorage.clear();
          this.principals = "";
          this.principal = "";
          this.$toast.success({ message: res.data.msg, duration: 1200 });
          this.start();
        } else {
          this.$toast.fail({ message: res.data.msg, duration: 1200 });
        }
      });
    },
    send() {
      var jsonback = sessionStorage.getItem("jsonback");
      if (!this.bourse)
        return this.$toast.fail({ message: "请选择交易所", duration: 1200 });
      if (this.types == 2 && !jsonback)
        return this.$toast.fail({ message: "请点击去设置", duration: 1200 });
      if (this.jysymbol == 0)
        return this.$toast.fail({ message: "请选择交易币对", duration: 1200 });
      var obj = {};
      if (this.types == 2) obj = JSON.parse(jsonback);
      obj.types = this.types;

      obj.bourse = this.bourse;
      obj.symbol = this.symbol;
      obj.symbol1 = this.selsym.join(",");
      if (this.types == 2) {
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
          // this.$toast.success({message:res.data.msg,duration:1200});
        } else {
          if (res.data.err_code) {
            setTimeout(() => {
              this.istxt = res.data.err_code;
            }, 1000);
            setTimeout(() => {
              this.istxt = -1;
            }, 10000);
          }
          // this.$toast.fail({message:res.data.msg,duration:1200});
        }
      });
    },
    start1() {
      if (localStorage.getItem("symbol")) {
        this.symbol = localStorage.getItem("symbol");
      }
	  //取利润
      this.$axios
        .post("/index/strategy/get_monitoring_total", {
          symbol: this.symbol,
          bourse: this.bourse,
          types: this.types
        })
        .then(res => {
          this.count = res.data.count;
          this.profit = res.data.profit;
          this.doing = res.data.doing;
          if (res.data.principal) {
            this.principal = res.data.principal;
          }
        });
      // this.index==0
	  
      if (this.bourse) {
        this.$axios
          .post("/index/strategy/get_balance", {
            symbol: this.symbol,
            bourse: this.bourse
          })
          .then(res => {
            if (res.data.code == 0 && res.data.principal) {
              this.principal = res.data.principal;
              this.principals = res.data.principal;
            } else {
              layer.open({ content: res.data.msg, skin: "msg", time: 2 });
            }
          });
      }
    },
    start() {
      this.start1();

      this.$axios
        .post("/index/strategy/get_symbol", {
          symbol: this.symbol,
          bourse: this.bourse
        })
        .then(res => {
          for (var i = 0; i < res.data.symbol.length; i++) {
            res.data.symbol[i].isinput = 0;
          }
          this.symbol_list = res.data.symbol;

          this.$axios
            .post("/index/strategy/get_strategy_list", {
              symbol: this.symbol,
              bourse: this.bourse,
              types: this.types
            })
            .then(res => {
              this.strategy_list = res.data.list;

              if (this.strategy_list.length > 0) {
                this.noopsycheid = this.strategy_list[0].noopsyche;
              }

              this.jysymbol = this.strategy_list.length;
              if (this.jysymbol.length > 0) {
                this.symbol = this.jysymbol[0].symbol;
                // this.strategy_list[0].noo
              } else {
                this.symbol = "USDT";
              }
              if (localStorage.getItem("symbol")) {
                this.symbol = localStorage.getItem("symbol");
                this.selectsymbol[0].b = 0;
                for (var k = 0; k < this.selectsymbol.length; k++) {
                  if (this.selectsymbol[k].a == this.symbol) {
                    this.selectsymbol[k].b = 1;
                  }
                }
              }
              for (var i = 0; i < this.strategy_list.length; i++) {
                for (var j = 0; j < this.symbol_list.length; j++) {
                  if (
                    this.symbol_list[j].symbol1 == this.strategy_list[i].symbol1
                  ) {
                    this.symbol_list[j].isinput == 0
                      ? (this.symbol_list[j].isinput = 1)
                      : "";
                  }
                }
              }
            });
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
    selecli_symbol(i) {
      this.symbol_list[i].isinput == 1
        ? (this.symbol_list[i].isinput = 0)
        : (this.symbol_list[i].isinput = 1);
      // console.log(this.symbol_list)
    },
    selecli_symbol1(i) {
      this.selectsymbol = [
        { a: "USDT" },
        { a: "ETH" },
        { a: "BTC" },
        { a: "HT" }
      ];
      if (this.bourse == 4) {
        this.selectsymbol[3].a = "OKB";
      }
      this.selectsymbol[i].b == 1
        ? (this.selectsymbol[i].b = 0)
        : (this.selectsymbol[i].b = 1);
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
    selecli_symbolcli() {
      this.selsym = [];
      for (var i = 0; i < this.symbol_list.length; i++) {
        if (this.symbol_list[i].isinput == 1) {
          if (this.selsym.indexOf(this.symbol_list[i].symbol1) == -1) {
            this.selsym.push(this.symbol_list[i].symbol1);
          }
        }
      }

      if (this.selsym.length > 10) {
        return this.$toast.fail({
          message: "最多只能选则10个币对",
          duration: 1200
        });
      }
      this.jysymbol = this.selsym.length;
      this.bidui = false;
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
    bounce(s, i) {
      if (s == 0) {
        this.closedeal = true;
        this.closeid = i;
      } else if (s == 1) {
        this.show = true;
      } else if (s == 2) {
        this.showrt = true;
      } else if (s == 3) {
        this.matterplay = true;
      } else if (s == 4) {
        if (!this.bourse)
          return this.$toast.fail({ message: "请选择交易所", duration: 2000 });
        this.bidui = true;
      } else if (s == 5) {
        this.jsbidui = true;
      }
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
    open_strategy(s) {
      this.$axios.post("/index/index/start_strategy", { id: s }).then(res => {
        if (res.data.code == 0) {
          this.$toast.success({ message: res.data.msg, duration: 2000 });
          this.start();
        } else {
          this.$toast.fail({ message: res.data.msg, duration: 2000 });
        }
      });
    },
    close_now() {
      if (this.check == 0) {
        // var id = s;
        this.$axios
          .post("/index/index/stop_strategy", { id: this.closeid })
          .then(res => {
            if (res.data.code == 0) {
              this.$toast.success({ message: res.data.msg, duration: 2000 });

              this.$axios
                .post("/index/strategy/get_strategy_list", {
                  symbol: this.symbol,
                  bourse: this.bourse,
                  types: this.types
                })
                .then(res => {
                  this.strategy_list = res.data.list;
                });

              this.closedeal = false;
            } else {
              this.$toast.fail({ message: res.data.msg, duration: 2000 });
              this.closedeal = false;
            }
          });
      } else if (this.check == 1) {
      } else {
        // var id = s;
        this.$axios
          .post("/index/index/clearance", { id: this.closeid })
          .then(res => {
            if (res.data.code == 0) {
              this.$toast.success({ message: res.data.msg, duration: 2000 });
              this.start();
              this.closedeal = false;
            } else {
              this.$toast.fail({ message: res.data.msg, duration: 2000 });
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
      margin-right: 0.3rem;
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
  // p:nth-of-type(2),
  // p:nth-of-type(3) {
  //   background: linear-gradient(90deg, #3243a4 0%, #2ea4dd 100%);
  //   color: white;
  //   padding: 0 0.1rem;
  //   height: 0.45rem;
  //   line-height: 0.45rem;
  //   font-size: 0.24rem;
  //   border-radius: 3px;
  // }
  p:nth-of-type(3) {
    text-align: right;
  }
  .headtitle {
    text-align: left;
    padding: 0;
    border:none;
	// line-height: 28px;
    span {
      color: #2185ff;
      margin-right: 0.1rem;
	  // margin-top: -0.2rem;
    }
  }
}
.headtitle {
  padding: 0.1rem 0.3rem;
  border-bottom: 2px solid #f5f6fa;
  span {
      color: #2185ff;
      margin-right: 0.1rem;
    }
}
.strategy {
  padding: 0.2rem 0.2rem 0.2rem 0.3rem;
  border-bottom: 4px solid #f5f6fa;
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
  .one_p {
    width: 60%;
    padding-left: 0.6rem;
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
  div {
    width: 45%;
    background: linear-gradient(
      90deg,
      rgba(50, 67, 164, 1) 0%,
      rgba(46, 164, 221, 1) 100%
    );
    border-radius: 4px;
    padding: 0.1rem 0;
    color: #fff;
    font-size: 0.24rem;
    text-align: center;
    p {
      line-height: 0.4rem;
    }
  }
}
.comereult {
  margin: 0.2rem auto 0.5rem;
  li {
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    padding: 0.3rem 0.3rem 0;
    width: 83%;
    margin: 0.1rem auto;
  }
  .cometop {
    display: flex;
    justify-content: space-between;
    span {
      font-size: 0.24rem;
    }
    img {
      width: 0.17rem;
      height: 0.25rem;
      margin-right: 0.3rem;
    }
    button {
      color: #fff;
      font-size: 0.16rem;
      padding: 0.05rem 0.2rem;
      border-radius: 3px;
      margin-left: 0.4rem;
    }
  }
  .pressbox {
    height: 0.46rem;
    line-height: 0.46rem;
    color: #fff;
    font-size: 0.24rem;
    position: relative;
    margin: 0.2rem auto;
    border-radius: 3px;
	display: flex;
    p {
		justify-content: space-between;
		flex: 1;
      text-align: center;
      // position: absolute;
      // width: 100%;
      // height: 100%;
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
    border-top: 1px solid #e5e5e5;
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
  width: 100%;
  background: url(../assets/gundong.gif) no-repeat;
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
</style>
