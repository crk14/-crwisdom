<template>
  <div class="intertranfor">
    <div class="tophader">
      <van-icon name="arrow-left"  onclick="window.history.go(-1)"/>
      <p>{{$t('index.Interchange')}}</p>
      <img src="../assets/cbui_asset_img_tibi_dingdanxiangqi@2x.png" alt @click="$router.push('contirecord?type=10')"/>
    </div>
    <p class="hr"></p>
    <ul>
      <li>
        <p>{{$t('user.Interchange')+$t('community.type')}}</p>
        <!-- <input type="password" v-model="oldpass" placeholder="请输入旧的交易密码" /> -->
        <select v-model="valss">
          <!-- <option  selected="selected">CRW</option> -->
		  <option  selected="selected">USDT</option>
		  <option  selected="selected">{{$t('store.Shopping')}}</option>
        </select>
        <p class="hr"></p>
      </li>
      <li>
        <p>{{$t('user.credited')}}</p>
        <input type="text" v-model="accout" :placeholder="$t('user.pleaseInput')+$t('user.credited')" />
        <p class="hr"></p>
      </li>
      <li>
        <p>{{$t('user.chamberlain')}}UID</p>
        <input type="number" v-model="id" :placeholder="$t('user.pleaseInput')+$t('user.chamberlain')+'UID'" />
        <p class="hr"></p>
      </li>
      <li>
        <p>{{$t('user.Transfer')}}</p>
        <input type="number" v-model="num" :placeholder="$t('user.pleaseInput')+$t('user.Transfer')" />
        <span class="all" @click="num=valss2">{{$t('user.all')}}</span>
        <p class="hr"></p>
        <div>{{valss}}{{$t('user.remaining')}}：{{valss2}}</div>
      </li>
      <li>
        <p>{{$t('user.transactionp')}}</p>
        <input type="password" v-model="trad_password" :placeholder="$t('user.transactionpassword')" />
        <p class="hr"></p>
      </li>
      <li>
        <p>{{$t('user.authcode')}}</p>
        <input type="text" v-model="code" :placeholder="$t('user.verification')" />
        <span class="getcode" @click="setcode">{{$t('user.getcode')}}</span>
        <p class="hr"></p>
      </li>
    </ul>
    <button type="button" class="changebton" @click="send">{{$t('user.Confirm')+$t('user.Interchange')}}</button>
    <!-- <p class="note">注意：</p>
    <p class="note">只能转USDT和转V1-V6产出的TCC+返还本金</p> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isclick: true,
      id: "",
      num: "",
      trad_password: "",
      code: "",
      accout:'',
      info:{},
      valss:'USDT',
	  valss2:''
    };
  },
  created(){
	  this.$axios.post("/index/member/getUserInfo").then(res => {
	    if (res.data.code == 0) {
			if(res.data.info.level>0){
				this.level = true
			}
	    }
	  });
    this.$axios
      .get("/index/mywallet/mywalletInfo")
      .then(res => {
        if(res.data.info){
          this.info = res.data.info;
		  this.valss2 = this.info.number
        }
        //  if (res.data.real==-1&&res.data.code==0) {
        //   layer.open({content: res.data.msg,skin: 'msg',time: 2});
        //   setTimeout(()=>{
        //       this.$router.push("certification")
        //     },1200)
        // }
      });
  },

  watch:{
  	  valss(oldvalue,newvalue){
		  console.log(newvalue,oldvalue)
		  this.num = ''
  		  let that = this
			  if(oldvalue=='USDT'){
							that.valss2 = that.info.number
						}
						else if(oldvalue=='CRW'){
							that.valss2 = that.info.safe_num
				}else if(oldvalue==this.$t('store.Shopping')){
							that.valss2 = that.info.robot_ticket
				}
  	  }
  },
  methods: {
    // 获取验证码
    setcode(e) {
      var ts = this;
      if (ts.isclick) {
        ts.isclick = false;

        this.$axios.post("/index/member/sendChange").then(res => {
          if (res.data.code == 0) {
            this.$toast.success({ message: res.data.msg, duration: 1200 });
            var tiem = 60;
            e.target.innerText = tiem + "s";
            var timeover = setInterval(function() {
              tiem -= 1;
              e.target.innerText = tiem + "s";
              if (tiem <= 0) {
                e.target.innerText = "获取验证码";
                clearInterval(timeover);
                ts.isclick = true;
              }
            }, 1000);
          } else {
            this.$toast.fail({ message: res.data.msg, duration: 1200 });
          }
        });
      }
    },
    send() {
      if (!this.id || !this.num || !this.code || !this.trad_password||!this.accout) {
        this.$toast.fail({ message: this.$t('user.Pleasecomplete'), duration: 1200 });
        return;
      }
		let str;
		if(this.valss=='USDT'){
			str = 1
		}
		else if(this.valss=='CRW'){
			str = 2
		}
		else if(this.valss=='购物券'){
			str = 8
		}else{
			str = 3
		}
		let type;
		let email = this.accout;
				let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
				if(reg.test(email)){
					// alert("邮箱格式正确");
					type = 2
				}else{
					type = 1
				}
      this.$axios.post("/index/member/userToUser", {
          id: this.id,
          num: this.num,
          trad_password: this.trad_password,
          code: this.code,
          mobile:this.accout,
          types:str,
		  type,
        }).then(res => {
          if (res.data.code == 0) {
            this.$toast.success({ message: res.data.msg, duration: 1200 });
            setTimeout(() => {
              this.$router.back();
            }, 1600);
          } else {
            this.$toast.fail({ message: res.data.msg, duration: 1200 });
          }
        });
    },
  }
};
</script>

<style lang="less" scoped>
ul {
  padding-left: 0.3rem;
  li {
    font-size: 0.3rem;
    text-align: left;
    position: relative;
    p {
      margin: 0.5rem 0 0.3rem;
      font-size: 0.3rem;
      color: #333333;
    }
    select {
      width: 100%;
      color: #bababa;
    }
    input {
      background: none;
      color: #4a4a4a;
      width: 80%;
    }
    input::-webkit-input-placeholder {
      color: #999999;
    }
    input::-ms-input-placeholder {
      color: #999999;
    }
    input::-moz-input-placeholder {
      color: #999999;
    }
    span {
      position: absolute;
      right: 0.3rem;
    }
    .all {
      color: #0f54f9;
      top: 0.66rem;
    }
    .hr {
      height: 0.02rem;
      background: #eaeffb;
      margin-top: 0.12rem;
    }
    span {
      position: absolute;
      right: 0.3rem;
      bottom: 0.1rem;
    }
    .getcode {
      font-size: 0.3rem;
      // border: 1px solid #3c8cff;
      color: #3c8cff;
      padding: 0.04rem 0.08rem;
      border-radius: 3px;
    }
  }
}

.changebton {
  width: 92%;
}
.note {
  text-align: center;
  color: #999999;
  font-size: 0.18rem;
  line-height: 0.4rem;
}
</style>
