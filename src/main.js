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
Vue.use(VCharts)
// Vue.use(Dialog)
Vue.prototype.$axios = axios
Vue.prototype.$Clipboard = Clipboard
Vue.prototype.$QRCode = QRCode
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false;


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
	document.documentElement.scrollTop =0;
	document.body.scrollTop=0;
	var dom=document.getElementById("app");
	var bodys = document.querySelector('html');

	if (to.path == "/my"||to.path == "/setting"||to.path == "/chagepass"||to.path == "/ranklist"||to.path == "/mypromote"||to.path == "/team"||to.path == "/metationpage") {
		bodys.setAttribute('style', 'background-color:#F5F6FA')
	}
	else {
		bodys.setAttribute('style', 'background-color:#fff')
	}


	if(dom){
		dom.style.position='fixed';
	}

	setTimeout(()=>{
		if(dom){
			dom.style.position='unset';
		}
	},300)
	next();

})

new Vue({
	store,
	router,
	render: h => h(App)
}).$mount('#app')
