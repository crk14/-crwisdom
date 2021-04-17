<template>
  <div class="hello">
    <div id="tradingview_1b6e3"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
		width:document.body.clientWidth,
		symbol:'',
		height:430,
		str:'HUOBI:'
    }
  },
  created () {
	  this.symbol = this.$route.query.symboldeal.toUpperCase()
	  if(this.$route.query.height){
		  this.height = this.$route.query.height
	  }
	  if(this.$route.query.type){
		  if(this.$route.query.type=='heyue'){
			  this.str = 'OKEX:'
		  }
	  }
  },
  // "symbol": 'HUOBI:'+this.symbol+"USDTPERP",
  mounted() {
	  this.width = document.documentElement.clientWidth || document.body.clientWidth
  	new TradingView.widget(
  	  {
		  "width":this.width,
		  "height": this.height,
  	  "symbol": this.str+this.symbol+"USDT",
  	  "interval": "15",
  	  "timezone": "Eth/UTC",
  	  "theme": "light",
  	  "style": "1",
  	  "locale": "zh_CN",
  	  "toolbar_bg": "#f1f3f6",
	  "enable_publishing": false,
	  "withdateranges": true,
	  "studies": [
	    "MACD@tv-basicstudies",
	    "BB@tv-basicstudies",
	  ],
	  "save_image":false,
  	  "enable_publishing": false,
  	  // "allow_symbol_change": true,
  	  "container_id": "tradingview_1b6e3"
  	})
  }
}


</script>

<style scoped>

</style>

