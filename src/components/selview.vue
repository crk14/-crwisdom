<template>
  <div class="selview">
    <div class="tophader" onclick="window.history.go(-1)">
      <van-icon name="arrow-left" />
      <p>选择查看</p>
    </div>
    <p class="hr"></p>
    <div class="tops">
      <p class="topone">
        <img v-if="bourse==1" src="../assets/hot.png" alt />
        <img v-else src="../assets/src_resource_icon_user_exchange_okex@2x.png" alt />
      </p>
      <p class="toptwo">{{bourse==1?'火币全球站(huobipro)':'OKEX'}}</p>
    </div>
    <div class="daybox">
      <div>
        <p @click="selectate(0)">
          <input type="text" placeholder="请选择时间周期" v-model="value" disabled />
        </p>
        <span style="margin-right:.1rem">至</span>
        <p @click="selectate(1)">
          <input type="text" placeholder="请选择时间周期" v-model="valuefor" disabled />
        </p>
      </div>
      <van-icon name="play" />
    </div>
    <div class="datebox" v-show="show">
      <van-datetime-picker
        v-model="currentDate"
        @confirm="confirm(0)"
        @cancel="cancel(0)"
        type="date"
      />
    </div>
    <div class="datebox" v-show="showfor">
      <van-datetime-picker
        v-model="currentDate"
        @confirm="confirm(1)"
        @cancel="cancel(1)"
        type="date"
      />
    </div>
    <p class="test">结算单位</p>
    <div class="seltbox">
      <P>
        <input type="checkbox" @click="choose('usdt')" />USDT
      </P>
      <P>
        <input type="checkbox" @click="choose('btc')"/>BTC
      </P>
      <P>
        <input type="checkbox" @click="choose('eth')"/>ETH
      </P>
      <P>
        <input type="checkbox" @click="choose('ht')"/>HT
      </P>
    </div>
    <button class="changebton" @click="tiaozhuan()">立即查看</button>
    <!-- $router.push('showdetail?type=1') -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      currentDate: new Date(),
      value: "",
      showfor: false,
      valuefor: "",
      symbol:'',
      bourse:this.$route.query.bourse,
	  isshow:[false,false,false,false]
      // starttime:'',
      // endtime:'',
    };
  },
  created() {},
  methods: {
    selectate(s) {
      if (s == 0) {
        this.show = true;
      } else {
        this.showfor = true;
      }
    },
    cancel(s) {
      if (s == 0) {
        this.show = false;
      } else {
        this.showfor = false;
      }
    },
    choose(s){
      this.symbol = s;
    },
    confirm(s) {
      if (s == 0) {
        this.value =
          this.currentDate.getFullYear() +
          "-" +
          (this.currentDate.getMonth() + 1) +
          "-" +
          this.currentDate.getDate();
        this.show = false;
        
        if (this.valuefor != "") {
          if ((new Date(this.value)) <= (new Date(this.valuefor))) {
            this.show = false;
          } else {
            this.$toast.fail({
              message: "请选择合理的时间范围",
              duration: 1600
            });
            this.value = "";
            this.show = true;
          }
        }
      } else {
        this.valuefor =
          this.currentDate.getFullYear() +
          "-" +
          (this.currentDate.getMonth() + 1) +
          "-" +
          this.currentDate.getDate();
		
        if ((new Date(this.value)) <= (new Date(this.valuefor))) {
          this.showfor = false;
        } else {
          this.$toast.fail({
            message: "请选择合理的时间范围",
            duration: 1600
          });
          this.valuefor = "";
          this.showfor = true;
        }
      }
    },
    tiaozhuan(){

      if(this.valuefor == '' || this.value == '' || this.symbol == ''){
        this.$toast.fail({
            message: "请选择查询时间和结算币种",
            duration: 1600
          });
      }
      this.$router.push('showdetail?bourse='+this.bourse+'&symbol='+this.symbol+'&starttime='+this.value+'&endtime='+this.valuefor+'&type=1');
    }
  }
};
</script>

<style lang="less" scoped>
.tops {
  p {
    text-align: center;
  }
  .topone {
    margin-top: 0.5rem;
    img {
      width: 1.04rem;
    }
  }
  .toptwo {
    font-size: 0.3rem;
    font-weight: bold;
    margin: 0.2rem auto 0.1rem;
  }
  .topsan {
    font-size: 0.24rem;
    color: #2ea4dd;
  }
}
.test {
  padding-left: 0.3rem;
  color: #999999;
  font-size: 0.3rem;
}
.seltbox {
  display: flex;
  padding: 0.3rem;
  p {
    font-size: 0.24rem;
    margin-right: 0.3rem;
    input[type="checkbox"] {
      -webkit-appearance: none;
      background: #fff;
      width: 0.3rem;
      height: 0.3rem;
      border: 1px solid rgba(210, 210, 210, 1);
      margin-right: 0.1rem;
      position: relative;
      top: 0.03rem;
    }
    input[type="checkbox"]:checked {
      background: url("../assets/gou.png") left top no-repeat;
      background-size: 100%;
    }
  }
}
.daybox {
  border: 1px solid #dcdcdc;
  width: 83%;
  margin: 0.2rem auto;
  display: flex;
  justify-content: space-between;
  height: 1rem;
  line-height: 1rem;
  padding: 0 0.3rem 0 0;
  p {
    text-align: center;
  }
  div {
    display: flex;
    font-size: 0.3rem;
  }
  i {
    color: #ccc;
    transform: rotate(90deg);
    margin-right: 0.2rem;
  }
  input {
    font-size: 0.3rem;
    text-align: center;
    width: 85%;
  }
}
.datebox {
  box-shadow: 0px 1px 8px 3px #88888836;
  background: #999999;
  z-index: 1;
  width: 92%;
  margin: -0.3rem auto 0;
  position: fixed;
  left: 4%;
}
.changebton {
  margin: 0.5rem auto;
}
</style>
