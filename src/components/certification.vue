<template>
  <div class="certification">
    <div class="tophader" >
		<router-link to="/my" >
      <van-icon name="arrow-left" />
	  </router-link>
      <p>实名认证</p>
    </div>
    <!-- <p class="hr"></p> -->
    <ul>
      <li>
        <p>姓名</p>
        <input
          type="text"
          :style="{pointerEvents:status!=2&&status!=1?'unset':'none'}"
          v-model="real_name"
          placeholder="请输入您的姓名"
        />
        <!-- <p class="hr"></p> -->
      </li>
      <li>
        <p>身份证号码</p>
        <input
          type="text"
          :style="{pointerEvents:status!=2&&status!=1?'unset':'none'}"
          v-model="id_num"
          placeholder="请输入您的身份证号码"
        />
        <!-- <p class="hr"></p> -->
      </li>
    </ul>
    <div class="contens">
      <p>上传要求</p>
      <p class="text">1.请上传大小不超过5M的png,ipg,bmp格式的图片</p>
      <p class="text">2.请提供真实有效的本人身份证照片，虚拟认证可能会导致账户冻结，由用户提供虚假认证产生的一切后果由用户负责</p>
      <p class="text">3.实名认证通过后不可修改</p>
    </div>

    <div class="front">
      <input v-if="status!=2&&status!=1" type="file" @change="upImg($event,2)" />
      <img v-if="card_right" class="fleimg" :src="card_right" alt />
      <img v-if="!card_right" src="../assets/inbotm.png" alt />
      <!-- <p v-if="!card_right">证件反面</p> -->
    </div>
     <div class="front">
      <input v-if="status!=2&&status!=1" type="file" @change="upImg($event,1)" />
      <img v-if="card_left" class="fleimg" :src="card_left" alt />
      <img v-if="!card_left" src="../assets/ontop.png" alt />
      <!-- <p v-if="!card_left">证件正面</p> -->
    </div>
    <button type="button" class="changebton" v-if="status==0" @click="send">提交审核</button>
    <button type="button" class="changebton" v-else-if="status==3" @click="send">审核末通过，请重新提交</button>
    <button type="button" class="changebton" v-else-if="status==2">已实名状态</button>
    <button type="button" class="changebton" v-else>审核中</button>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  data() {
    return {
      real_name: "",
      id_num: "",
      card_left: "",
      card_right: "",
      status: 0
    };
  },
  created() {
    this.start();
  },
  methods: {
    start() {
      this.$axios.get("/index/member/realNameAuth").then(res => {
        if (res.data.code == 0) {
          this.real_name = res.data.info.real_name;
          this.id_num = res.data.info.id_num;
          this.card_left = res.data.info.card_left;
          this.card_right = res.data.info.card_right;
          this.status = res.data.info.status;
        }
      });
    },
    upImg(e, s) {
      var ts = this;
      var file = e.target.files[0];
      if (!file) return;
      this.$toast.loading({
        message: "正在上传",
        duration: 0,
        loadingType: "spinner "
      });
      let fd = new FormData();
      fd.append("file", file);
      this.$axios
        .post("/index/Upload/uploadImg", fd)
        .then(res => {
          if (res.data.code == 0) {
            s == 1
              ? (this.card_left = res.data.data)
              : (this.card_right = res.data.data);
          }
          this.$toast.success({ message: "上传成功", duration: 800 });
        })
        .catch(err => {
          this.$toast.fail({ message: "上传失败", duration: 1200 });
        });
    },
    send() {
      if (!this.real_name || !this.id_num)
        return this.$toast.fail({ message: "请填写完整", duration: 1200 });
      if (this.id_num.length != 18)
        return this.$toast.fail({
          message: "身份证号码不正确",
          duration: 1200
        });
      this.$axios
        .post("/index/member/realNameAuth", {
          real_name: this.real_name,
          id_num: this.id_num,
          card_left: this.card_left,
          card_right: this.card_right
        })
        .then(res => {
          if (res.data.code == 0) {
            this.$toast.success({ message: res.data.msg, duration: 1200 });
            setTimeout(() => {
              this.start();
            }, 1200);
          } else {
            this.$toast.fail({ message: res.data.msg, duration: 1200 });
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
.tophader {
  border-bottom: 2px solid #f5f6fa;
}
ul {
  padding-left: 0.3rem;
  li {
    font-size: 0.3rem;
    text-align: left;
    border-bottom: 1px solid #eaeffb;
    padding-bottom: 0.1rem;
    p {
      margin: 0.5rem 0 0.3rem;
      font-size: 0.3rem;
      color: #333333;
    }
    input {
      background: none;
      color: #525252;
      width: 80%;
    }
    input::-webkit-input-placeholder {
      color: #bababa;
    }
    input::-ms-input-placeholder {
      color: #bababa;
    }
    input::-moz-input-placeholder {
      color: #bababa;
    }
    span {
      position: absolute;
      right: 0.3rem;
    }
    .hr {
      height: 0.015rem;
      background: #eaeffb;
      margin-top: 0.12rem;
    }
  }
}
.contens {
  padding-left: 0.3rem;
  margin-top: 0.3rem;
  p {
    color: #333333;
    font-size: 0.24rem;
    line-height: 0.4rem;
  }
}
.front {
  position: relative;
  width: 60%;
  height: 2.9rem;
  // border: 1px dashed #eeeeee;
  text-align: center;
  color: #cccccc;
  margin: 0.6rem auto;
  font-size: 0.3rem;
  img {
    display: block;
    width: 100%;
    // margin: 0.8rem auto 0.4rem;
  }
  input {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    z-index: 1;
  }
}
.changebton {
  width: 92%;
}

.front .fleimg {
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
