<template>
  <div class="setting" style="height: 27rem;">
    <div class="tophader" onclick="window.history.go(-1)">
      <van-icon name="arrow-left" />
      <p>设置</p>
    </div>
    <p class="hr"></p>

    <div class="divli">
      <p>
        <span class="onespan">策略名称</span>
      </p>
      <!-- @click="upinput" -->
      <p class="right">
        <span>
          <input type="text" v-model="backinfo.title" class="inputclass" placeholder="请输入" />
        </span>
        <!-- <van-icon name="arrow" class="lebs" /> -->
      </p>
    </div>

    <div class="divli">
      <p>
        <span class="onespan">交易本金</span>
      </p>
      <p class="right">
        <span>
          <input type="text" v-model="backinfo.principal" class="inputclass" placeholder="请输入" />
        </span>
      </p>
    </div>
    <p class="blanks">首单买入条件</p>
    <div class="divli">
      <p>
        <span class="onespan">首单仓位</span>
      </p>
      <p class="right">
        <span>
          <input type="text" v-model="backinfo.f_storehouse" class="inputclass" placeholder="请输入" /> %
        </span>
      </p>
    </div>
    <div class="divli">
      <p>
        <span class="onespan">监控时长</span>
      </p>
      <p class="right">
        <span>
          <input
            type="text"
            v-model="backinfo.monitoring_time"
            class="inputclass"
            placeholder="请输入"
          /> 分钟
        </span>
      </p>
    </div>
    <div class="divli">
      <p>
        <span class="onespan">涨幅</span>
      </p>
      <p class="right">
        <span>
          <input type="text" v-model="backinfo.rise" class="inputclass" placeholder="请输入" /> %
        </span>
      </p>
    </div>
    <div class="divli">
      <p>
        <span class="onespan">跌幅</span>
      </p>
      <p class="right">
        <span>
          <input type="text" v-model="backinfo.fall" class="inputclass" placeholder="请输入" /> %
        </span>
      </p>
    </div>
    <div class="divli">
      <p>
        <span class="onespan">跌幅回调</span>
      </p>
      <p class="right">
        <span>
          <input type="text" v-model="backinfo.fall_call_back" class="inputclass" placeholder="请输入" /> %
        </span>
      </p>
    </div>
    <p class="blanks">设置策略</p>
    <div class="divli">
      <p>
        <span class="onespan">加仓涨幅</span>
      </p>
      <p class="right">
        <span>
          <input
            type="text"
            v-model="backinfo.plus_storehouse"
            class="inputclass"
            placeholder="请输入"
          /> %
        </span>
      </p>
    </div>
    <div class="divli">
      <p>
        <span class="onespan">加仓涨幅倍率</span>
      </p>
      <p class="right">
        <span>
          <input type="text" v-model="backinfo.plus_beilv" class="inputclass" placeholder="请输入" /> 倍
        </span>
      </p>
    </div>
    <div class="divli">
      <p>
        <span class="onespan">加仓参考价</span>
      </p>
      <p class="right">
        <!-- <span>整体均价</span> -->
        <select v-model="backinfo.plus_cankao">
          <option value="entirety">整体均价</option>
          <option value="grid">尾单价格</option>
        </select>
        <van-icon name="arrow" />
      </p>
    </div>
    <p class="hr"></p>
    <div class="divli">
      <p>
        <span class="onespan">补仓跌幅</span>
      </p>
      <p class="right">
        <span>
          <input
            type="text"
            v-model="backinfo.repair_storehouse"
            class="inputclass"
            placeholder="请输入"
          /> %
        </span>
      </p>
    </div>
    <div class="divli">
      <p>
        <span class="onespan">补仓跌幅回调</span>
      </p>
      <p class="right">
        <span>
          <input
            type="text"
            v-model="backinfo.fall_repair_call_back"
            class="inputclass"
            placeholder="请输入"
          /> %
        </span>
      </p>
    </div>
    <div class="divli">
      <p>
        <span class="onespan">补仓跌幅倍率</span>
      </p>
      <p class="right">
        <span>
          <input type="text" v-model="backinfo.repair_beilv" class="inputclass" placeholder="请输入" /> 倍
        </span>
      </p>
    </div>
    <div class="divli">
      <p>
        <span class="onespan">补仓参考价</span>
      </p>
      <p class="right">
        <!-- <span>整体均价</span> -->
        <select v-model="backinfo.repair_cankao">
          <option value="entirety">整体均价</option>
          <option value="grid">尾单价格</option>
        </select>
        <van-icon name="arrow" />
      </p>
    </div>
    <p class="hr"></p>
    <div class="divli">
      <p>
        <span class="onespan">止盈比例</span>
      </p>
      <p class="right">
        <span>
          <input type="text" v-model="backinfo.stop_full" class="inputclass" placeholder="请输入" /> %
        </span>
      </p>
    </div>
    <div class="divli">
      <p>
        <span class="onespan">止盈比例回调</span>
      </p>
      <p class="right">
        <span>
          <input
            type="text"
            v-model="backinfo.stop_full_call_back"
            class="inputclass"
            placeholder="请输入"
          /> %
        </span>
      </p>
    </div>
    <div class="divli">
      <p>
        <span class="onespan">止盈参考价</span>
      </p>
      <p class="right">
        <!-- <span>整体均价</span> -->
        <select v-model="backinfo.switch">
          <option value="entirety">整体均价</option>
          <option value="grid">尾单价格</option>
        </select>
        <van-icon name="arrow" />
      </p>
    </div>
    <p class="blanks" v-if="backinfo.switch=='entirety'">
      <span>网格</span>
      <van-switch v-model="backinfo.gridswitch" size=".26rem" />
    </p>
    <div class="divli" v-if="backinfo.switch=='entirety'">
      <p>
        <span class="onespan">网格止盈比例</span>
      </p>
      <p class="right">
        <span>
          <input
            type="text"
            v-model="backinfo.gridding_stop_full"
            class="inputclass"
            placeholder="请输入"
          /> %
        </span>
        <!-- <van-icon name="arrow" /> -->
      </p>
    </div>
    <div class="divli" v-if="backinfo.switch=='entirety'">
      <p>
        <span class="onespan">网格止盈比例回调</span>
      </p>
      <p class="right">
        <span>
          <input
            type="text"
            v-model="backinfo.gridding_call_back"
            class="inputclass"
            placeholder="请输入"
          /> %
        </span>
      </p>
    </div>
    <p class="blanks">
      <span>止损</span>
      <van-switch v-model="backinfo.lossswitch" size=".26rem" />
    </p>
    <div class="divli" >
		<!-- <div class="divli" v-show="backinfo.lossswitch"> -->
      <p>
        <span class="onespan">止损比例</span>
      </p>
      <p class="right">
        <span>
          <input
            type="text"
            v-model="backinfo.stop_damage_rate"
            class="inputclass"
            placeholder="请输入"
          /> %
        </span>
      </p>
    </div>
    <div style="height: 2rem;"></div>
    <button type="button" class="changebton" @click="send">确定设置</button>

    <van-dialog v-model="backinfo.show" title="修改昵称" show-cancel-button :before-close="beforeClose">
      <van-field v-model="backinfo.value" placeholder="请输入昵称" />
    </van-dialog>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  data() {
    return {
      path: "",
      show: false,
      value: "",
      info: {},
      checked: true,
      backinfo: {
        switch: "entirety",
        repair_cankao: "entirety",
        plus_cankao: "entirety",
        gridswitch: true,
        lossswitch: false
      },
      type: this.$route.query.type,
      id: this.$route.query.id
    };
  },
  created() {
    // this.start();
    if (this.type == 1) {
      this.$axios
        .post("/index/strategy/get_strategy_info", { id: this.id })
        .then(res => {
          if (res.data.code == 0) {
            var obj = res.data.info;
            if (obj.gridswitch == "open") {
              obj.gridswitch = true;
            } else {
              obj.gridswitch = false;
            }
            if (obj.lossswitch == "open") {
              obj.lossswitch = true;
            } else {
              obj.lossswitch = false;
            }
            this.backinfo = res.data.info;
          }
        });
    } else if (sessionStorage.getItem("jsonback")) {
      this.backinfo = JSON.parse(sessionStorage.getItem("jsonback"));
    }
  },
  methods: {
    start() {
      this.$axios.post("/index/member/getUserInfo").then(res => {
        if (res.data.code == 0) {
          this.info = res.data.info;
          this.path = this.info.avatar;
        }
      });
    },
    beforeClose(action, done) {
      if (action == "cancel") return done(), (this.value = "");
      if (!this.value)
        return (
          this.$toast.fail({ message: "请输入要修改的昵称", duration: 1200 }),
          done(false)
        );
      this.$axios
        .post("/index/member/updNickName", {
          nick_name: this.value
        })
        .then(res => {
          if (res.data.code == 0) {
            this.$toast.success({ message: res.data.msg, duration: 1200 });
            done();
            this.start();
          } else {
            done(false);
            this.$toast.fail({ message: res.data.msg, duration: 1200 });
          }
        });
    },
    upinput() {
      this.show = true;
    },
    send() {
      if (this.backinfo.switch == "entirety") {
        if (
          !this.backinfo.title ||
          !this.backinfo.principal ||
          !this.backinfo.f_storehouse ||
          !this.backinfo.monitoring_time ||
          !this.backinfo.rise ||
          !this.backinfo.fall ||
          !this.backinfo.fall_call_back ||
          !this.backinfo.plus_storehouse ||
          !this.backinfo.plus_beilv ||
          !this.backinfo.repair_storehouse ||
          !this.backinfo.fall_repair_call_back ||
          !this.backinfo.repair_beilv ||
          !this.backinfo.stop_full ||
          !this.backinfo.stop_full_call_back ||
          !this.backinfo.gridding_stop_full ||
          !this.backinfo.gridding_call_back ||
          !this.backinfo.stop_damage_rate
        ) {
          return this.$toast.fail({ message: "请填写完整", duration: 1200 });
        }
      } else {
        if (
          !this.backinfo.title ||
          !this.backinfo.principal ||
          !this.backinfo.f_storehouse ||
          !this.backinfo.monitoring_time ||
          !this.backinfo.rise ||
          !this.backinfo.fall ||
          !this.backinfo.fall_call_back ||
          !this.backinfo.plus_storehouse ||
          !this.backinfo.plus_beilv ||
          !this.backinfo.repair_storehouse ||
          !this.backinfo.fall_repair_call_back ||
          !this.backinfo.repair_beilv ||
          !this.backinfo.stop_full ||
          !this.backinfo.stop_full_call_back ||
          !this.backinfo.stop_damage_rate
        ) {
          return this.$toast.fail({ message: "请填写完整", duration: 1200 });
        }
      }

      if (this.type == 1) {
        var obj = this.backinfo;
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
        this.$axios
          .post("/index/strategy/set_strategy", this.backinfo)
          .then(res => {
            // console.log(res, "cg");
            if (res.data.code == 0) {
              this.$toast.success({ message: res.data.msg, duration: 1600 });
              setTimeout(() => {
                this.$router.back();
              }, 1600);
            } else {
              this.$toast.fail({ message: res.data.msg, duration: 1200 });
            }
          });
      } else {
        var jsonback = JSON.stringify(this.backinfo);
        sessionStorage.setItem("jsonback", jsonback);
        this.$router.back();
      }
    }
  },
  watch: {
    "backinfo.switch": {
      handler(newName, oldName) {
        if (newName == "grid") {
          this.backinfo.gridswitch = true;
        } else {
          this.backinfo.gridswitch = false;
        }
      },
      immediate: true //true 深度监听
    }
  },
  beforeDestroy() {
    this.$toast.clear();
  }
};
</script>

<style lang="less" scoped>
.one {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 0.3rem 0.3rem 0 !important;
  font-size: 0.3rem;

  i {
    margin-left: 0.1rem;
  }

  p:nth-of-type(2) {
    position: relative;
  }
  input {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    opacity: 0;
    top: 0;
  }
}
.divli {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 0.3rem;
  font-size: 0.3rem;
  border-bottom: 1px solid #f5f6fa;
  background: #fff;
  img {
    display: inline-block;
    width: 0.62rem;
    height: 0.62rem;
    border-radius: 50%;
  }
  .lebs {
    top: 0.03rem;
    margin-left: 0.1rem;
    color: #999999;
  }
  .right {
    color: #999999;
    i {
      position: relative;
      top: 0.04rem;
    }
  }
}
.hrsmall {
  height: 0.02rem;
  background: #eaeffb;
  width: 96%;
  margin-bottom: 0.1rem;
  color: #434343;
  margin-left: 0.3rem;
}
.changebton {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-radius: 0;
  margin: 0;
  z-index: 1;
}
.one i {
  position: absolute;
  right: -0.18rem;
  top: 0.1rem;
}
.one p:nth-of-type(2) {
  position: relative;
  padding-right: 0.2rem;
}
.divli img {
  width: 0.62rem;
  height: 0.62rem;
  position: relative;
  top: -0.1rem;
}
.blanks {
  background: #f5f6fa;
  padding: 0.2rem 0.3rem;
  font-size: 0.26rem;
  display: flex;
  font-weight: bold;
  justify-content: space-between;
}
.van-switch {
  background: #999999;
}
.van-switch--on {
  background: #2b3da6;
}

.inputclass {
  text-align: right;
  color: #000;
}

select {
  -webkit-appearance: none;
}
</style>
