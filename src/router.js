import Vue from 'vue'
import Router from 'vue-router'



Vue.use(Router);
const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export default new Router({
  routes: [
    { path: '/', name: '首页', meta: { index: 0, footShow: true }, component: resolve => require(['./components/Index.vue'],resolve) },
    { path: '/test', name: '首页1',  component: resolve => require(['./components/test.vue'],resolve) },
	{ path: '/login', name: '登录',  component: resolve => require(['./components/login.vue'],resolve) ,meta: { nolog:true }},
    { path: '/sign', name: '注册',  component: resolve => require(['./components/sign.vue'],resolve) },
    { path: '/selview', name: '选择查看', component: resolve => require(['./components/selview.vue'],resolve) },
    { path: '/forgetpass', name: '忘记密码',  component: resolve => require(['./components/forgetpass.vue'],resolve) },
    { path: '/my', name: '我的（个人中心）', meta: { index:1, footShow: true }, component: resolve => require(['./components/my.vue'],resolve)  },
    { path: '/chagepass', name: '安全中心', component: resolve => require(['./components/chagepass.vue'],resolve)  },
    { path: '/changedealpass', name: '修改交易密码', component: resolve => require(['./components/changedealpass.vue'],resolve)},
    { path: '/changephone', name: '修改手机号', component:  resolve => require(['./components/changephone.vue'],resolve) },
    { path: '/intertranfor', name: '互转中心', component: resolve => require(['./components/intertranfor.vue'],resolve) },
    { path: '/callcenter', name: '联系客服', component: resolve =>require(['./components/callcenter.vue'],resolve) },
    { path: '/certification', name: '实名认证', component:resolve =>require(['./components/certification.vue'],resolve) },
    { path: '/personmsg', name: '个人信息', component: resolve =>require(['./components/personmsg.vue'],resolve)},
    { path: '/subrecored', name: '申请代理', component: resolve =>require(['./components/subrecored.vue'],resolve)},
    { path: '/datapage', name: '我的社区', component: resolve =>require(['./components/datapage.vue'],resolve)},
    { path: '/mypromote', name: '我的业绩', component: resolve =>require(['./components/mypromote.vue'],resolve) },
    // { path: '/intetrading', name: '智能交易', component: resolve =>require(['./components/intetrading.vue'],resolve) },
    { path: '/intetrading2', name: '智能交易2', component: resolve =>require(['./components/intetrading2.vue'],resolve) },
	// { path: '/serverspage', name: '服务器', meta: { index: 3, footShow: true }, component: resolve =>require(['./components/serverspage.vue'],resolve) },
    { path: '/notecase', name: '钱包', meta: { index: 4, footShow: true }, component: resolve =>require(['./components/notecase.vue'],resolve) },
    { path: '/metationpage', name: '充币', component: resolve =>require(['./components/metationpage.vue'],resolve) },
    { path: '/carrymoney', name: '提币', component: resolve =>require(['./components/carrymoney.vue'],resolve) },
    { path: '/contirecord', name: '充提兑记录', component: resolve =>require(['./components/contirecord.vue'],resolve) },
    { path: '/flash', name: '兑换', component: resolve =>require(['./components/flash.vue'],resolve) },
    { path: '/flashj', name: '兑换基金', component: resolve =>require(['./components/flashj.vue'],resolve) },
    { path: '/accecard', name: '获取API教程', component: resolve =>require(['./components/accecard.vue'],resolve)},
    { path: '/global', name: '火币全球站', component: resolve =>require(['./components/global.vue'],resolve) },
    { path: '/ranklist', name: '选择交易所', component: resolve =>require(['./components/ranklist.vue'],resolve) },
    { path: '/more', name: '更多', component: resolve =>require(['./components/more.vue'],resolve) },
    { path: '/changeloginpass', name: '修改登录密码', component: resolve =>require(['./components/Changeloginpass.vue'],resolve) },
    { path: '/setting', name: '设置', component: resolve =>require(['./components/setting.vue'],resolve)},
    { path: '/showdetail', name: '结算，点卡明细', component: resolve =>require(['./components/showdetail.vue'],resolve) },
    { path: '/noticedateil', name: '公告详情', component: resolve =>require(['./components/noticedateil.vue'],resolve) },
    { path: '/addmetationadr', name: '添加钱包地址', component: resolve =>require(['./components/Addmetationadr.vue'],resolve) },
    { path: '/metationadr', name: '钱包地址', component: resolve =>require(['./components/Metationadr.vue'],resolve) },
    // { path: '/fund', name: 'CR基金', component: resolve =>require(['./components/fund.vue'],resolve) },
	{ path: '/down', name: '下载页面', component: resolve =>require(['./pages/down.vue'],resolve) },
	{ path: '/fuli', name: '福利中心', component: resolve =>require(['./pages/fuli.vue'],resolve) },
	{ path: '/fenxiang', name: '分享邀请', component: resolve =>require(['./pages/fenxiang.vue'],resolve) },
	{ path: '/heyue', name: '合约量化交易', component: resolve =>require(['./pages/heyue.vue'],resolve) },
	{ path: '/heyue2', name: '合约量化交易2', component: resolve =>require(['./pages/heyue2.vue'],resolve) },
	{ path: '/find', name: '发现', component: resolve =>require(['./pages/find.vue'],resolve),meta: { index: 2, footShow: true }, },
	{ path: '/chicang', name: '持仓', component: resolve =>require(['./pages/chicang.vue'],resolve), },
	{ path: '/gensui', name: '跟随交易', component: resolve =>require(['./pages/gensui.vue'],resolve), },
	{ path: '/wdgd', name: '我的跟单详情', component: resolve =>require(['./pages/wdgd.vue'],resolve), },
	{ path: '/jyxq', name: '跟单详情', component: resolve =>require(['./pages/jyxq.vue'],resolve), },
	{ path: '/gdset', name: '跟单设置', component: resolve =>require(['./pages/gdset.vue'],resolve), },
	{ path: '/refund', name: '返佣记录', component: resolve =>require(['./pages/refund.vue'],resolve), },
	{ path: '/custody', name: '基金托管', component: resolve =>require(['./pages/custody.vue'],resolve), },
	{ path: '/fundxq', name: '基金详情', component: resolve =>require(['./pages/fundxq.vue'],resolve), },
	{ path: '/gojilu', name: '基金购买记录', component: resolve =>require(['./pages/golilu.vue'],resolve), },
	{ path: '/respass', name: '重置交易密码', component: resolve =>require(['./pages/respass.vue'],resolve), },
	{ path: '/tuog', name: '基金托管记录', component: resolve =>require(['./pages/tuog.vue'],resolve), },
	{ path: '/jyyym', name: '交易员操作页面', component: resolve =>require(['./pages/jyyym.vue'],resolve), },
	// { path: '/find', name: '发现', component: resolve =>require(['./components/subrecored.vue'],resolve),meta: { index: 2, footShow: true } },
  ]
})
