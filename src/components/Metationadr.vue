<template>
  <div class="metationadr">
    <div class="tophader" onclick="window.history.go(-1)">
      <van-icon name="arrow-left" />
      <p>{{$t('notecase.address')}}</p>
    </div>
    <p class="hr"></p>
    <div class="adrmsgbox">
      <div class="adrmsg" v-for="(item,i) in info" :key="i">
        <p ref="editable" contenteditable="false">
          {{item.real_name}}
        </p>
        <p ref="editablet" contenteditable="false">{{item.address}}</p>
        <p class="hr"></p>
        <div class="foter">
          <p class="left" @click="changes(item.id)" ref="ischeck">
            <input type="radio" vue v-model="rad" />
            <img
              v-if="item.status==1"
              src="../assets/icon_xuanze@2x.png"
              alt
              class="togle atts"
            />
            <img
              v-else
              src="../assets/icon_weixuanze@2x.png"
              alt
              class="togle bs"
            />
            <span class="xaneadr">{{$t('notecase.select')}}</span>
          </p>
          <p class="right">
            <span @click="$router.push({path:'addmetationadr',query:{id:item.id}})">
              <img src="../assets/recod.png" alt="" class="redact">{{$t('notecase.compile')}}
            </span>
            <span @click="delet(item.id,item.real_name)">
               <img src="../assets/delet.png" alt="" class="deletet">{{$t('notecase.deletes')}}
            </span>
          </p>
        </div>
      </div>
    </div>
    <!-- :class="info.length<=0?'flexmyhao':''" -->
    <router-link to="/addmetationadr">
      <button type="button" class="changebton">{{$t('notecase.add')+$t('notecase.address')}}</button>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rad: "",
      info:[]
    };
  },
  created() {
    this.$axios.post("/index/member/userWalletAddress")
    .then(res=>{
      if(res.data.code==0){
        this.info=res.data.info;
      }
    })
  },
  methods: {
    changes(id){
		  this.$axios.post("/index/member/chickDefWalletAddress",{
			  id:id
		  })
		  .then(res=>{
        if(res.data.code==0){
          this.$toast.success({message:res.data.msg,duration:1200});
          for(var i=0; i<this.info.length; i++){
            this.info[i].id==id?this.info[i].status=1:this.info[i].status=0;
          }
        }else{
          this.$toast.fail({message:res.data.msg,duration:1200});
        }
		  })
	  },
    redact(i) {
      var ts = this.$refs;
      ts.editable[i].contentEditable = "true";
      ts.editablet[i].contentEditable = "true";
    },
    delet(id,msg){
		  this.$dialog.confirm({
				title: this.$t('notecase.deletes')+this.$t('index.hint'),
				message:this.$t('user.Confirm')+this.$t('notecase.deletes')+msg+this.$t('notecase.that')+this.$t('notecase.address')+'？'
			}).then(() => {
				this.$axios.post("/index/member/delWalletAddress",{
					id:id
				}).then(res=>{
					if(res.data.code==0){
            this.$toast.success({message:res.data.msg,duration:1200});
						for(var i=0; i<this.info.length; i++){
							if(this.info[i].id==id){
								this.info.splice(i,i+1);
							}
						}
					}else{
            this.$toast.fail({message:res.data.msg,duration:1200});
          }
				})
			}).catch(() => {

			});
	  },
  }
};
</script>

<style lang="less" scoped>
@import url("../less/metationadr.less");
.flexmyhao{
  position: fixed;
  bottom: .1rem;
  left: 50%;
  margin-left: -46% !important;
}
.foter .xaneadr{
    // width: 2rem;
    display: inline-block;
}
</style>
