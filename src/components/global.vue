<template>
  <div class="teamdetail">
    <div class="tophader" onclick="window.history.go(-1)">
      <van-icon name="arrow-left" />
      <p>{{id==1?'火币全球站':'OKEX'}}</p>
    </div>
    <p class="hr"></p>
    <div class="tops">
      <p class="topone">
        <img v-if="id==1" src="../assets/hot.png" alt />
        <img v-else src="../assets/src_resource_icon_user_exchange_okex@2x.png" alt />
      </p>
      <p class="toptwo">{{id==1?'火币全球站(huobipro)':'OKEX'}}</p>

      <!-- @click="$router.push('accecard')" -->
	  <p class="topsan" v-show="id==1" @click="$router.push('accecard')">查看获取API教程</p>
      <!-- <p class="topsan" >查看获取API教程</p> -->
    </div>
    <div class="borders">
      <ul>
        <li class="lione">导入API Key</li>
        <p class="hrli"></p>
        <li>
          <p class="bolds">API Key：</p>
          <p class="right">
            <input type="text" placeholder="请输入API Key" v-model="api"/>
            <button>粘贴</button>
          </p>
        </li>
        <li>
          <p class="bolds">Secret Key：</p>
          <p class="right">
            <input type="text" placeholder="请输入Secret Key" v-model="ser"/>
            <button>粘贴</button>
          </p>
        </li>
        <li v-if="id==4">
          <p class="bolds">Passphrase：</p>
          <p class="right">
            <input type="text" placeholder="请输入Passphrase" v-model="okval"/>
            <button>粘贴</button>
          </p>
        </li>
      </ul>
    </div>
    <div class="notebox">
      <img src="../assets/icon_dingdan@2x.png" alt />
      <p>温馨提示：交易所提供的API Key和Secret Key非常重要，请小心保管，不要通过QQ、微信等软件进行传输，不要保存在云端，确保资金安全！</p>
    </div>
	<!-- <button v-show="apis" class="changebton" @click="set">清除</button> -->
    <button class="changebton" @click="put">{{apis?'修改':'导入'}}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      api:'',
      ser:'',
      apis:'',
      bourse:1,
      id:'',
      okval:''
    };
  },
  created() {
    this.id=this.$route.query.id
    this.bourse=this.id
     this.$axios
        .post("/index/strategy/get_api", { bourse:this.bourse })
        .then(res => {
          if(res.data.code == 0){
              // this.$toast.success({ message: res.data.msg, duration: 2000 });
              if(res.data.api){
                this.api=res.data.api.api;
                this.ser=res.data.api.ser;
                this.apis=res.data.api.api;
                this.okval=res.data.api.passphrase
              }

            }else{
              this.$toast.fail({ message: res.data.msg, duration: 2000 });

            }
        });
  },
  methods: {
	  set(){
		  
	  },
    put(){
      var url="/index/strategy/set_api"
      if(this.apis){
        url="/index/strategy/edit_api"
      }
      this.$axios
      .post(url, { api: this.api, ser: this.ser , bourse:this.bourse,okval:this.okval})
      .then(res => {
        if(res.data.code == 0){
            this.$toast.success({ message: res.data.msg, duration: 2000 });

          }else{
            this.$toast.fail({ message: res.data.msg, duration: 2000 });

          }
      });
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
.borders {
  border: 1px solid #f5f6fa;
  border-right: none;
  border-left: none;
  margin: 0.4rem auto 0.3rem;
  li {
    padding: 0.3rem;
    font-size: 0.24rem;
    display: flex;
    // justify-content: space-between;
  }
  .bolds {
    font-weight: bold;
  }
  .right {
    position: absolute;
    right: 0.3rem;
    input {
      padding-right: 0.7rem;
      text-align: right;
    }
    button {
      background: black;
      color: #fff;
      padding: 0.05rem 0.3rem;
    }
  }
  .lione {
    font-weight: bold;
  }
  .hrli {
    height: 0.02rem;
    background: #f6f7f9;
    width: 96%;
    margin-left: 4%;
  }
}
.notebox {
  width: 84%;
  background: #0b0a3b;
  border-radius: 3px;
  padding: 0.3rem;
  display: flex;
  margin: auto;
  justify-content: space-between;
  img {
    width: 0.34rem;
    height: 0.34rem;
    margin-right: 0.2rem;
    position: relative;
    top: 0.05rem;
  }
  p {
    color: #fff;
    font-size: 0.24rem;
    line-height: 0.4rem;
  }
}
.changebton {
  margin: 0.5rem auto;
}
</style>
