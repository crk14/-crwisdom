<template>
    <div>
        <span class="weui-switch" :class="{'weui-switch-on' : isChecked}" :value="value" @click="toggle" style="position:relative">
            <div v-if="isChecked && direction.length > 0" style="font-size: 12px; width:100%;height:100%;position:absolute;padding:0 5px;line-height:18px;color:#FFF;user-select:none">
                {{direction[0]}}
            </div>
            <div v-if="!isChecked && direction.length > 0" style="font-size: 12px;width:100%;height:100%;position:absolute;padding:0 5px;right:2px;line-height:18px;color:#7A7A7A;text-align:right;user-select:none">
                {{direction[1]}}
            </div>
        </span>
    </div>
</template>
<script>
    export default {
        name: 'switchComponent',
        props: {
          value: {
            type: Boolean,
            default: true
          },
          text: {
              type: String,
              default: ''
          },
		  fn:{},
		  id:{
			  
		  },
		  bool:{},
	
        },
        data () {
            return {
                isChecked: this.value
            }
        },
        computed: {
            direction () {
                if (this.text) {
                    return this.text.split('|')
                } else {
                    return []
                }
            }
        },
        watch: {
          value (val) {
			  console.log(val)
            this.isChecked = !val
          },
          isChecked(val) {
            this.$emit('change', val);
          },
		  bool(val) {
				  console.log(this.value,val)
				  val.forEach(item=>{
					  this.value = item.is
				  })
		  },
        },
        methods: {
          toggle() {
			this.fn(!this.isChecked,this.id)
			// if(this.bool){
			// 	this.isChecked = !this.isChecked
			// }
			console.log(this.isChecked,this.value)
			// this.isChecked = !this.isChecked;
          }
        }
    }
</script>
<style>
    .weui-switch {
        display: block;
        position: relative;
        width: 52px;
        height: 19px;
        border: 1px solid #DFDFDF;
        outline: 0;
        border-radius: 16px;
        box-sizing: border-box;
        background-color: #DFDFDF;
        transition: background-color 0.1s, border 0.1s;
        cursor: pointer;
      }
      .weui-switch:before {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 50px;
        height: 18px;
        border-radius: 15px;
        background-color: #FDFDFD;
        transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
      }
      .weui-switch:after {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 22px;
        height: 18px;
        border-radius: 15px;
        background-color: #FFFFFF;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
      }
      .weui-switch-on {
        border-color: #6F6F6F;
        background-color: #1AAD19;
      }
      .weui-switch-on:before {
        border-color: #1AAD19;
       background-image: linear-gradient(to right,#2ED,rgb(34, 132, 253));
      }
      .weui-switch-on:after {
        transform: translateX(28px);
      }
</style>