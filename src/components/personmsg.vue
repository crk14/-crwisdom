<template>
  <div class="person">
    <div class="tophader" onclick="window.history.go(-1)">
      <van-icon name="arrow-left" />
      <p>个人信息</p>
    </div>
    <p class="hr"></p>

    <div class="divli one" onclick>
      <p>
        <span class="onespan">头像</span>
      </p>
      <p>
        <img v-if="path" :src="path" alt />
        <img v-else src="../assets/icon_touxiang@2x.png" alt />
        <van-icon name="arrow" />
      </p>
      <input type="file" @change="upImg" />
    </div>

    <div class="divli" onclick>
      <p>
        <span class="onespan">昵称</span>
      </p>
      <p class="right" @click="upinput">
        <span>{{info.nick_name}}</span>
        <van-icon name="arrow" class="lebs" />
      </p>
    </div>

    <div class="divli" onclick>
      <p>
        <span class="onespan">UID</span>
      </p>
      <p class="right">
        <span>{{info.id}}</span>
      </p>
    </div>

    <div class="divli" onclick>
      <p>
        <span class="onespan">绑定手机号</span>
      </p>
      <p class="right">
        <span>{{mobile}}</span>
      </p>
    </div>

    <button type="button" class="changebton" @click="send" style="background-color: #306ce8;border-radius: 25px;">退出登录</button>

    <van-dialog v-model="show" title="修改昵称" show-cancel-button :before-close="beforeClose">
      <van-field v-model="value" placeholder="请输入昵称" />
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
      mobile:''
    };
  },
  created() {
    this.start();
  },
  methods: {
    start() {
      this.$axios.post("/index/member/getUserInfo").then(res => {
        if (res.data.code == 0) {
          this.info = res.data.info;
          this.path = this.info.avatar;
          this.mobile=res.data.info.mobile.substring(0,7)+'****'
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
      this.$toast.loading({
        message: "正在退出",
        duration: 0,
        loadingType: "spinner "
      });
      this.$axios
        .post("/index/member/logout")
        .then(res => {
          this.$toast.clear();
          this.$toast.success({ message: res.data.msg, duration: 1200 });
          setTimeout(() => {
            // localStorage.clear();
            this.$router.push("login");
          }, 1200);
        })
        .catch(res => {
          this.$toast.loading({
            message: "正在强制退出",
            duration: 0,
            loadingType: "spinner "
          });
          setTimeout(() => {
            // localStorage.clear();
            this.$router.push("login");
          }, 1000);
        });
    },
    upImg(e) {
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
          this.$axios
            .post("/index/member/updAvatar", {
              avatar: res.data.data
            })
            .then(ress => {
              if (ress.data.code == 0) {
                this.path = res.data.data;
              }
              this.$toast.success({ message: ress.data.msg, duration: 800 });
            });
        })
        .catch(err => {
          this.$toast.fail({ message: "上传失败", duration: 1200 });
        });
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
  padding:0.3rem;
  font-size: 0.3rem;
  border-bottom: 1px solid #f5f6fa;
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
  i {
    color: #999999;
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
  margin: 1。5rem auto;
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
</style>

