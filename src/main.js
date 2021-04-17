import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Clipboard from "clipboard";
import QRCode from "qrcobejs2";
import store from './store'
import './plugins/vant.js'
import echarts from 'echarts'
import 'lid-flexible/flexible.js'
import './less/cssreset.css'
import {Toast} from 'vant'
import VCharts from 'v-charts'

import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
Vue.use(VCharts)
Vue.prototype.$axios = axios
Vue.prototype.$Clipboard = Clipboard
Vue.prototype.$QRCode = QRCode
Vue.prototype.$echarts = echarts
Vue.prototype.refresh = false
Vue.config.productionTip = false;
const i18n=new VueI18n({
    locale:localStorage.getItem('languageSet')||'zh',   //从localStorage里获取用户中英文选择，没有则默认中文
    messages:{
        'zh':require('./api/zh'),
        'en':require('./api/en'),
		'hy':require('./api/hy'),
    }
})
//  Vue.use(new VueSocketio({
// 	debug: true,
// 	connection: socketio.connect('http://192.168.0.159:2120', {
// 		path: '',  //如果地址是wss path:"/wss"
// 		transports: ['websocket', 'xhr-polling', 'jsonp-polling'],
// 	}) 
// })); 
// Vue.prototype.huobiwsurl = 'wss://api.huobiasia.vip/ws'
 axios.get('/index/market/get_url').then(res=>{
	 let huobiwsurl;
	 if(res.data.code == 0){
	 	huobiwsurl =res.data.market_url
	 }else{
	 	huobiwsurl = 'wss://api.huobiasia.vip/ws'
	 }
  Vue.prototype.huobiwsurl =huobiwsurl
})

axios.interceptors.response.use((res) =>{
	// 用户信息是否超时，重定向到登录页面

	// if(router.meta){
		if(res.data.code==-2){
			//if(!router.meta.nolog){
				if(router.history.current.path=='/down'){
					return
				}
				if(router.history.current.path!='/login'
				&&router.history.current.path!='/sign'
				&&router.history.current.path!='/forgetpass'){
					Toast.loading({message:res.data.msg,duration:0,loadingType: 'spinner '});
				}
				setTimeout(()=>{
					if(router.history.current.path!='/login'&&router.history.current.path!='/sign'
					&&router.history.current.path!='/forgetpass'){
						Toast.loading({message:"正在跳登录页",duration:0,loadingType: 'spinner '});
						setTimeout(()=>{
							Toast.clear();
								router.replace("/login");
						},600)
					}else{
						Toast.clear();
					}
				},1200)
			 //}

		}else{
			Toast.clear();
		}
	// }

	return res;
}, (error) =>{
    // Do something with response error
    // Toast.fail({message:'网络请求失败',duration:1200});
})


router.beforeEach((to, from, next) => {
	// document.documentElement.scrollTop =0;
	// document.body.scrollTop=0;
	// var dom=document.getElementById("app");
	// var bodys = document.querySelector('html');

	// if (to.path == "/my"||to.path == "/setting"||to.path == "/chagepass"||to.path == "/ranklist"||to.path == "/mypromote"||to.path == "/team"||to.path == "/metationpage") {
	// 	bodys.setAttribute('style', 'background-color:#F5F6FA')
	// }
	// else {
	// 	bodys.setAttribute('style', 'background-color:#fff')
	// }


	// if(dom){
	// 	dom.style.position='fixed';
	// }

	// setTimeout(()=>{
	// 	if(dom){
	// 		dom.style.position='unset';
	// 	}
	// },300)
	next();

})

new Vue({
	store,
	router,
	i18n,
	render: h => h(App)
}).$mount('#app')
