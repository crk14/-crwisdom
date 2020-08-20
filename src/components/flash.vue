<template>
  <div class="flash">
    <div class="tophader">
      <van-icon name="arrow-left" onclick="window.history.go(-1)" />
      <p>购买点卡</p>
      <img
        @click="$router.push('contirecord?type=3')"
        data-v-238308b8
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAgCAMAAAA2a+hwAAABg1BMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACphyELAAAAgHRSTlMARoVZxme67rKPqnFaJMnAAjJykph1yKmthydd1fMoQ6/3nDWEeiEZ7fplfF5iq5H1Uawwjr27l8KhHoxIHCIB7IZNKky/p6Nv59io72FT8IK2bRQdueNWsz+Blvb9y9o6+NQg6ynlLDM53RP7nuAKQFIxpnk3ruZm0VtFVzuQk8U/JpsAAAFgSURBVCjPfdIFU8MwFAfwQBmMMhc2Zszd2Nhwd3d3d3d/H51kaScl43/Xu7z+eu+a5CGUj9Jr0PkRO+uAs+Vj2hTAhtUAMF38Uvvg5HneNOECGa7mwT5swrWZ1xJsASHjuW/HxLKDVAlwcxynUHDdObSQJceNQAOpaqGJ8QdWqKQoY2CdiGEGjor4zsAwxWZ4e5ZLk7KBl2LyJVgjyfKm2PaV0TYCeooxBu5e3yG9usxWcK4ABHSrqmjqW9upxQGiArblUd1F6EYN5OSYbS9UEGosc3yBfXDdFp2tBj89gh2cw94pKuDQDN76ZC9phY6O4TKNinB2aVUun3MO4KXnEEIn/u0V1pV57JA8Qz7xhErRBkE8PjroK+CCQ6lUWhYR6gSzo/iyMWp26FStocH+0kkgGI0YjcZHXeDPmPw7Q58MjFH8ge+vjwpJngx0bvMTL0mCYDqVyVZLk83E77H9ArQpYIASWld3AAAAAElFTkSuQmCC"
        alt
      />
    </div>
    <div class="imgage">
      <div style="width: 100%;">
        <p>点卡值余额</p>
        <p>{{info.number||0}}</p>
      </div>
     
    </div>
    <div class="page-body">
      <p>购买通道</p>
      <p class="hr" style="padding: 0;background-color: rgb(230,231,235);"></p>
      <div class="item">
        <div class="item1">
          <div class="one">点卡值兑换</div>
          <div class="two">点卡: 700点</div>
        </div>
        <div class="item1" style="margin-top: 15px;">
          <div class="three">
            售价
            <span>700</span>点卡值
          </div>
          <div class="four" @click="confirm(true)">立即兑换 》</div>
        </div>
      </div>
	  <p class="hr" style="padding: 0;background-color: rgb(230,231,235)"></p>
	  <div class="item" v-if="bool1">
	    <div class="item1">
	      <div class="one">自定义兑换</div>
	      <div class="two">点卡: <input placeholder="输入" v-model="newvalue" style="width: 50px;"/> 点</div>
	    </div>
	    <div class="item1" style="margin-top: 15px;">
	      <div class="three" style="display: flex;">
	        售价
	        <span style="display: flex;"><span style="display: block;min-width: 30px;margin-top: -1px;margin-left: 4px;">{{newvalue}}</span></span>点卡值
	      </div>
	      <div class="four" @click="confirm()">立即兑换 》</div>
	    </div>
	  </div>
      <p class="hr" style="padding: 0;background-color: rgb(230,231,235)"></p>

      <p class="hr" style="padding: 0;background-color: rgb(230,231,235)"></p>
      <p
        style="color: #2167ff;font-size: 0.31rem;padding: 0.4rem 0.42rem;font-weight: 540;"
      >点卡是CR Wisdom推出的交易服务手续费,购买点卡数量比例: 1点卡值 = 1点交易点卡 </p>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Dialog } from "vant";
Vue.use(Dialog);
export default {
  data() {
    return {
      togle: true,
      info: {},
      types: 1,
      num: "",
      anum: 0,
	  newvalue:'',
	  bool1:false
    };
  },
  created() {
    this.$axios.post("/index/mywallet/mywalletInfo").then((res) => {
      if (res.data.code == 0) {
        this.info = res.data.info;
		if(this.info.is_need == 2){
			this.bool1 = true
		}
      }
    });
  },
  methods: {
    all() {
      this.types == 1
        ? (this.num = this.info.number)
        : (this.num = this.info.safe_num);
    },
    confirm(bool) {
      if (bool) {
        if (this.info.number < 700) {
          this.$toast.fail({ message: "点卡值余额不足", duration: 1200 });
          return;
        }
        this.num = 700;
        this.types = 1;
      }else{
		  if (this.newvalue <1) {
		    this.$toast.fail({ message: "请输入自定义点卡兑换", duration: 1200 });
		    return;
		  }
		  this.num = this.newvalue;
		  this.types = 1;
	  } 
      Dialog.confirm({
        title: "购买须知",
        message:
          "交易点卡为本平台量化交易系统使用服务费,根据量化交易服务产生的利润30%扣除交易点卡。用户一经购买概不支持任何退换",
      })
        .then(() => {
          // on confirm
          this.$axios
            .post("/index/mywallet/transfer", {
              num: this.num,
              types: this.types,
			  
            })
            .then((res) => {
              if (res.data.code == 0) {
                this.$toast.success({ message: res.data.msg, duration: 1600 });
                setTimeout(() => {
                  this.$router.back();
                }, 1600);
              } else {
                this.$toast.fail({ message: res.data.msg, duration: 1200 });
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style lang="less" scoped>
.divli {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 0.3rem 0.3rem 0.2rem;
  font-size: 0.3rem;
  img {
    width: 0.32rem;
    display: inline-block;
    position: relative;
    top: 0.04rem;
    right: 0.08rem;
  }
  i {
    font-size: 0.34rem;
    position: relative;
    top: 0.05rem;
  }
  .frontimg {
    width: 0.86rem;
  }
  p:nth-of-type(2) {
    position: relative;
    top: 0.34rem;
    left: 0.02rem;
  }
  .span {
    margin-right: 0.2rem;
  }
  .jtou {
    width: 0.16rem;
    position: relative;
    top: 0.03rem;
  }
}
.hrl {
  height: 0.2rem;
  background: #f8f9fb;
}
.kyongs {
  display: flex;
  justify-content: space-between;
  padding: 0 0.3rem;
  font-size: 0.24rem;
}
.transferlr {
  width: 85%;
  margin: 0.6rem auto 0.3rem;
  font-size: 0.3rem;
  color: #333333;
  border: 1px solid #eeeeee;
  padding: 0 0.2rem;
  display: flex;
  .cons {
    padding: 0 0.2rem;
    width: 96%;
    color: #999999;
    // border-right: 1px solid #eee;
    p {
      border-bottom: 1px solid #eee;
      padding: 0.3rem;
    }
  }
  .cons p:nth-of-type(2) {
    border: none;
  }
  .imgl {
    height: 1.09rem;
    margin-top: 0.45rem;
  }
  .right {
    img {
      width: 0.6rem;
      position: relative;
      left: 60%;
      top: 0.65rem;
    }
  }
  span {
    color: #3a5163;
    font-size: 0.2rem;
    position: relative;
    top: 0.3rem;
    right: 20%;
  }
}
.rows {
  margin: 0.3rem;
  font-size: 0.24rem;
  color: #999999;
  display: flex;
  justify-content: space-between;
}
.alltrans {
  margin: 0.4rem 0.3rem 0.2rem;
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 0.1rem;
  p {
    font-size: 0.28rem;
  }
  input {
    color: #333333;
    font-size: 0.24rem;
    width: 87%;
  }
  button {
    height: 0.46rem;
    color: #3e9ef6;
    font-size: 0.24rem;
    border-radius: 23px;
    text-align: center;
    background: none;
    margin-top: 0.1rem;
  }
}
.changebton {
  width: 92%;
  margin: 1.5rem auto;
}
.changebton {
  font-size: 0.36rem;
}
.page-body {
  background-color: #ffffff;
  width: 100%;
  height: 12.7rem;
  p {
    font-size: 0.4rem;
    font-weight: bold;
    color: #000000;
    padding: 0.3rem;
  }
  .item {
    background-color: #ffffff;
    margin: 0.2rem;
    padding: 0.3rem;
    .item1 {
      display: flex;
      justify-content: space-between;
    }
    .one {
      font-size: 0.31rem;
      color: #000000;
      font-weight: 550;
    }
    .two {
      margin-right: 0.3rem;
      font-size: 0.31rem;
      color: #444444;
      span {
        font-size: 0.41rem;
      }
    }
    .three {
      width: 100%;
      font-size: 0.31rem;
      color: #666666;
      span {
        font-size: 0.41rem;
        color: #2167ff;
      }
    }
    .four {
      width: 100%;
      text-align: right;
      font-size: 0.31rem;
      color: #666666;
      margin-top: 0.1rem;
      color: #000000;
      img {
        width: 0.25rem;
        height: 0.25rem;
      }
    }
  }
}
.imgage {
  background: url(../assets/9111.png) no-repeat;
  height: 1.67rem;
  background-size: 100% 100%;
  display: flex;
  padding: 0.6rem 0.9rem 0 0.9rem;
  color: #ffffff;
  font-size: 18px;
  justify-content: space-between;
}
</style>
