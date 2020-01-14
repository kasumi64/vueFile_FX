import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
	routes: [
		{
			path: '/',
			name: '/',
			component: resolve => require(['@/webU/view/webuHome.vue'], resolve),
			meta: {auth: false} //'权限设置'
		},
		{
			path: '/main/webu',
			component: resolve => require(['@/webU/view/webuHome.vue'], resolve),
			children: [
				{
					path: 'realTime/monitoring',
					component: () => import('@/webU/view/realTime/monitoring.vue'),
					meta: {authFlag: 'Auth_webU_Read,Auth_webU_Opt', auth: true}
				},
				
				
				{
					path: 'statistic/webUser',
					component: () => import('@/webU/view/statistic/webUser.vue'),
					meta: {authFlag: 'Auth_webU_Read,Auth_webU_Opt', auth: true}
				},
				{
					path: 'statistic/endUser',
					component: () => import('@/webU/view/statistic/endUser.vue'),
					meta: {authFlag: 'Auth_webU_Read,Auth_webU_Opt', auth: true}
				},
				{
					path: 'statistic/webFile',
					component: () => import('@/webU/view/statistic/webFile.vue'),
					meta: {authFlag: 'Auth_webU_Read,Auth_webU_Opt', auth: true}
				},
				{
					path: 'statistic/fileSendDetail',
					component: () => import('@/webU/view/statistic/fileSendDetail.vue'),
					meta: {authFlag: 'Auth_webU_Read,Auth_webU_Opt', auth: true}
				},
				// {
				// 	path: 'statistic/nginx',
				// 	component: () => import('@/webU/view/statistic/nginx.vue'),
				// 	meta: {authFlag: 'Auth_webU_Read,Auth_webU_Opt', auth: true}
				// },
				{
					path: 'statistic/historyLlogin',
					component: () => import('@/webU/view/statistic/historyLlogin.vue'),
					meta: {authFlag: 'Auth_webU_Read,Auth_webU_Opt', auth: true}
				}
			]
		},
		
	]
});

/*router.beforeEach(function(to, from, next) {
	next();
//	let k = to.meta.auth;
//	router.replace({path: '/404'});
});*/

export default router;
