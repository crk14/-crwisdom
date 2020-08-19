<template>
  <div class="flash">
    <div class="tophader">
      <van-icon name="arrow-left"  onclick="window.history.go(-1)"/>
      <p>兑换</p>
      <!-- <img @click="$router.push('contirecord?type=3')"
        data-v-238308b8
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAgCAMAAAA2a+hwAAABg1BMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACphyELAAAAgHRSTlMARoVZxme67rKPqnFaJMnAAjJykph1yKmthydd1fMoQ6/3nDWEeiEZ7fplfF5iq5H1Uawwjr27l8KhHoxIHCIB7IZNKky/p6Nv59io72FT8IK2bRQdueNWsz+Blvb9y9o6+NQg6ynlLDM53RP7nuAKQFIxpnk3ruZm0VtFVzuQk8U/JpsAAAFgSURBVCjPfdIFU8MwFAfwQBmMMhc2Zszd2Nhwd3d3d3d/H51kaScl43/Xu7z+eu+a5CGUj9Jr0PkRO+uAs+Vj2hTAhtUAMF38Uvvg5HneNOECGa7mwT5swrWZ1xJsASHjuW/HxLKDVAlwcxynUHDdObSQJceNQAOpaqGJ8QdWqKQoY2CdiGEGjor4zsAwxWZ4e5ZLk7KBl2LyJVgjyfKm2PaV0TYCeooxBu5e3yG9usxWcK4ABHSrqmjqW9upxQGiArblUd1F6EYN5OSYbS9UEGosc3yBfXDdFp2tBj89gh2cw94pKuDQDN76ZC9phY6O4TKNinB2aVUun3MO4KXnEEIn/u0V1pV57JA8Qz7xhErRBkE8PjroK+CCQ6lUWhYR6gSzo/iyMWp26FStocH+0kkgGI0YjcZHXeDPmPw7Q58MjFH8ge+vjwpJngx0bvMTL0mCYDqVyVZLk83E77H9ArQpYIASWld3AAAAAElFTkSuQmCC"
        alt
      /> -->
    </div>
    <p class="hr"></p>
    <!-- <div class="divli">
      <span class="onespan">币种</span>
      <p>
        <img src="../assets/icon_USDT@2x.png" alt />
        <span class="spant">USDT</span>
        <van-icon name="arrow" />
      </p>
    </div>-->
    <div class="transferlr">
      <img src="../assets/flashx.png" alt class="imgl" />
      <div class="cons">
        <!-- <p>{{types==1?'从  USDT余额':'从  TVE'}}</p>
        <p>{{types==2?'到 USDT':'到 TVE'}}</p> -->
         <p>
            从&nbsp;&nbsp;&nbsp; &nbsp; 基金分红
          <!-- <select v-model="types">
            <option value="1">从&nbsp;&nbsp;&nbsp; &nbsp; USDT余额</option>
            <option value="2">从&nbsp;&nbsp;&nbsp; &nbsp; CR</option>
          </select> -->
          </p>
          <p>到&nbsp;&nbsp;&nbsp; &nbsp; CR</p>
      </div>
      <!-- <p @click="cut" class="right">
        <img v-show="togle" src="../assets/icon_zhuanhuan@2x.png" alt />
        <img v-show="!togle" src="../assets/icon_zhuanhuan@2x.png" alt />
      </p> -->
    </div>
    <!-- <p class="rows">
      <span>钱包USDT</span>
      <span>{{info.number}}</span>
    </p>
    <p class="rows">
      <span>保险箱USDT</span>
      <span>{{info.safe_num}}</span>
    </p>-->
    <div class="alltrans">
      <p>兑换数量</p>
      <input type="number" placeholder="请输入兑换的数量" v-model="num" />
      <!-- <button @click="all">全部</button> -->
    </div>
    <div class="kyongs">
      <!-- <p>现有可用 {{types==1?info.number:info.safe_num}}{{types==1?'USDT':'CR'}}</p> -->
      <!-- <p>现有可用 {{types==1?info.number:info.safe_num}}</p> -->
      <!-- <p>TVE当前价格：{{anum}} USDT</p> -->
    </div>
    <button type="button" class="changebton" @click="confirm">确定兑换</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      togle: true,
      info: {},
      types: 1,
      num: "",
      anum: 0
    };
  },
  created() {
    // if (this.$route.query.index == 1) {
    //   this.types = 2;
    // }
    // this.$axios.post("/index/mywallet/mywalletInfo").then(res => {
    //   if (res.data.code == 0) {
    //     this.info = res.data.info;
    //   }
    // });

    // this.$axios.post("/index/index/getNowHashRatio").then(res => {
    //   if (res.data.code == 0) {
    //     this.anum = res.data.info.ratio;
    //   }
    // });
  },
  methods: {
    all() {
      this.types == 1
        ? (this.num = this.info.number)
        : (this.num = this.info.safe_num);
    },
    confirm() {
      if (!this.num) return this.$toast.fail({ message: "请输入数量", duration: 1200 });
    //   if(this.types==1&&Number(this.num)<100) return this.$toast.fail({ message: "数量不能少于100", duration: 1200 });
    //   if(this.types==2&&Number(this.num)<700) return this.$toast.fail({ message: "数量不能少于700", duration: 1200 });

      this.$axios
        .post("/index/mywallet/fundTrans", {
          num: this.num
        })
        .then(res => {
          if (res.data.code == 0) {
            this.$toast.success({ message: res.data.msg, duration: 1600 });
            setTimeout(() => {
              this.$router.back();
            }, 1600);
          } else {
            this.$toast.fail({ message: res.data.msg, duration: 1200 });
          }
        });
    }
  }
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
  //   display: flex;
  //   justify-content: space-between;
  p {
    font-size: 0.28rem;
  }
  input {
    color: #333333;
    font-size: 0.24rem;
    width: 87%;
  }
  button {
    // padding: 0 0.15rem;
    height: 0.46rem;
    // border: 1px solid rgba(60, 140, 255, 1);
    color: #3e9ef6;
    font-size: 0.24rem;
    border-radius: 23px;
    text-align: center;
    background: none;
    margin-top: 0.1rem;
    // min-width: 1.36rem;
  }
}
.changebton {
  width: 92%;
  margin: 1.5rem auto;
}
.changebton {
  font-size: 0.36rem;
}
</style>
