<template>
	<div class="box">

	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		created() {

        },
        methods: {
			copy(){
				var clipboard = new this.$Clipboard(".copyq", {
					text: () =>{
						return this.info.qq;
					}
				});
				clipboard.on("success", () => {
					this.$toast.success({message:'复制成功',duration:1200});
					// 释放内存
					clipboard.destroy();
				});
				clipboard.on("error", () => {
					// 不支持复制
					this.$toast.fail({message:'该浏览器不支持自动复制',duration:1200});
					// 释放内存
					clipboard.destroy();
				});
            },
            code(){
                // 生成二维码   <div id="qrcode"></div>
                new this.$QRCode('qrcode', {
                    width: 85,
                    height: 85,
                    text: this.info.invite_code,
                })
            }
		},
	}
</script>
<style lang="less" scoped>
	@import "../less/index.less";
</style>
