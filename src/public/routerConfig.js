import Vue from 'vue';
import Router from 'vue-router';
import fx from '@/fbcsFxViews/libs/routerConfig.js';
import mx from '@/fbcsViews/libs/mxRouter.js';

Vue.use(Router);

// console.log(fx.options.routes[1]);

let config = [
	{
		path: '/', //默认的首页
		name: '/',
		component: resolve => require(['@/fbcsFxViews/view/fbcsFxHome.vue'], resolve),
		meta: {auth: false} //'权限设置'
	},
	
	// 文件路由
	fx.options.routes[1],
	// 消息路由
	mx.options.routes[1]
];

var router = new Router({
	routes: config,
	// mode: 'history'
});

/* router.beforeEach(function(to, from, next) {
	if(to.matched.length==0){
		router.replace({path: '/404'});
	} else next();;
});
 */
export default router;
