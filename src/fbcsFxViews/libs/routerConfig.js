import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
	routes: [
		{
			path: '/',
			name: '/',
			component: resolve => require(['@/fbcsFxViews/view/fbcsFxHome.vue'], resolve),
			meta: {auth: false} //'权限设置'
		},
		{
			path: '/main/fxCfg',
			component: resolve => require(['@/fbcsFxViews/view/fbcsFxHome.vue'], resolve),
			children: [
				{
					path: 'userHome',
					component: resolve => require(['@/fbcsFxViews/view/user/userHome.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Fx_Config_Read,Auth_Fx_Config_Opt'
					}
				},
				{
					path: 'userInfo',
					component: resolve => require(['@/fbcsFxViews/view/user/userInfo.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Fx_Config_Read,Auth_Fx_Config_Opt'
					}
				},
				{
					path: 'Ekey',
					component: resolve => require(['@/fbcsFxViews/view/page/Ekey.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Fx_Config_Read,Auth_Fx_Config_Opt'
					}
				},
				{
					path: 'relation',
					component: resolve => require(['@/fbcsFxViews/view/page/relation.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Fx_Config_Read,Auth_Fx_Config_Opt'
					}
				},
				{
					path: 'suConfig',
					component: resolve => require(['@/fbcsFxViews/view/page/suConfig.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Fx_Config_Read,Auth_Fx_Config_Opt'
					}
				},
				{
					path: 'dispatch',
					component: resolve => require(['@/fbcsFxViews/view/page/dispatch.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Fx_Config_Read,Auth_Fx_Config_Opt'
					}
				},
				{
					path: 'audit',
					component: resolve => require(['@/fbcsFxViews/view/page/audit.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Fx_Config_Read,Auth_Fx_Config_Opt'
					}
				},
				
				
				
				{
					path: 'version/query',
					component: resolve => require(['@/fbcsFxViews/view/version/query.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Fx_Config_Read,Auth_Fx_Config_Opt'
					}
				},
				{
					path: 'version/contrast',
					component: resolve => require(['@/fbcsFxViews/view/version/contrast.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Fx_Config_Read,Auth_Fx_Config_Opt'
					}
				},
				{
					path: 'version/detail',
					component: resolve => require(['@/fbcsFxViews/view/version/detail.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Fx_Config_Read,Auth_Fx_Config_Opt'
					}
				},
				
				
				{
					path: 'fileManage/search',
					component: resolve => require(['@/fbcsFxViews/view/fileManage/search.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Fx_Config_Read,Auth_Fx_Config_Opt'
					}
				},
				{
					path: 'fileManage/upload',
					component: resolve => require(['@/fbcsFxViews/view/fileManage/upload.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Fx_Config_Read,Auth_Fx_Config_Opt'
					}
				},
				{
					path: 'fileManage/regain',
					component: resolve => require(['@/fbcsFxViews/view/fileManage/regain.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Fx_Config_Read,Auth_Fx_Config_Opt'
					}
				},
				{
					path: 'fileManage/blacklist',
					component: resolve => require(['@/fbcsFxViews/view/fileManage/blacklist.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Fx_Config_Read,Auth_Fx_Config_Opt'
					}
				},
				
				
				{
					path: 'advanced/user',
					component: resolve => require(['@/fbcsFxViews/view/advanced/user.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Fx_Config_Read,Auth_Fx_Config_Opt'
					}
				},
				{
					path: 'advanced/Ekey',
					component: resolve => require(['@/fbcsFxViews/view/advanced/Ekey.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Fx_Config_Read,Auth_Fx_Config_Opt'
					}
				},
				{
					path: 'advanced/signal',
					component: resolve => require(['@/fbcsFxViews/view/advanced/signal.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Fx_Config_Read,Auth_Fx_Config_Opt'
					}
				},
				{
					path: 'advanced/information',
					component: resolve => require(['@/fbcsFxViews/view/advanced/information.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Fx_Config_Read,Auth_Fx_Config_Opt'
					}
				},
				{
					path: 'advanced/audit',
					component: resolve => require(['@/fbcsFxViews/view/advanced/audit.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Fx_Config_Read,Auth_Fx_Config_Opt'
					}
				},
				
				
				
				
				/*{
					path: '/elui',
					component: resolve => require(['@/fbcsFxViews/test/elui.vue'], resolve),
					meta: {auth: false}
				},
				{
					path: '/tableTest',
					component: resolve => require(['@/fbcsFxViews/test/tableTest.vue'], resolve),
					meta: {auth: false}
				}*/
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