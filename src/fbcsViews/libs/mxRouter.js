import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
	routes: [
		{
			path: '/',
			name: '/',
			component: resolve => require(['@/fbcsViews/view/home.vue'], resolve),
			meta: {auth: false} //'权限设置'
		},
		{
			path: '/main/mxCfg',
			component: resolve => require(['@/fbcsViews/view/home.vue'], resolve),
			children: [
				{
					path: 'user',
					component: resolve => require(['@/fbcsViews/view/message/user.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Mx_Config_Read,Auth_Mx_Config_Opt'
					}
				},
				{
					path: 'message/Ekey',
					component: resolve => require(['@/fbcsViews/view/message/Ekey.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Mx_Config_Read,Auth_Mx_Config_Opt'
					}
				},
				{
					path: 'message/signal',
					component: resolve => require(['@/fbcsViews/view/message/signal.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Mx_Config_Read,Auth_Mx_Config_Opt'
					}
				},
				{
					path: 'message/userAdd/:id',
					component: resolve => require(['@/fbcsViews/view/message/user/userAdd.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Mx_Config_Read,Auth_Mx_Config_Opt'
					}
				},
				{
					path: 'message/userEdit/:id',
					component: resolve => require(['@/fbcsViews/view/message/user/userEdit.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Mx_Config_Read,Auth_Mx_Config_Opt'
					}
				},
				{
					path: 'message/host',
					component: resolve => require(['@/fbcsViews/view/message/host.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Mx_Config_Read,Auth_Mx_Config_Opt'
					}
				},
				{
					path: 'message/distr',
					component: resolve => require(['@/fbcsViews/view/message/distr.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Mx_Config_Read,Auth_Mx_Config_Opt'
					}
				},
				{
					path: 'message/statist',
					component: resolve => require(['@/fbcsViews/view/message/statist.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Mx_Config_Read,Auth_Mx_Config_Opt'
					}
				},
				
				
				{
					path: 'message/userSet',
					component: resolve => require(['@/fbcsViews/view/message/subscription/userSet.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Mx_Config_Read,Auth_Mx_Config_Opt'
					}
				},
				{
					path: 'message/release',
					component: resolve => require(['@/fbcsViews/view/message/subscription/release.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Mx_Config_Read,Auth_Mx_Config_Opt'
					}
				},
				{
					path: 'message/subscription',
					component: resolve => require(['@/fbcsViews/view/message/subscription/subscription.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Mx_Config_Read,Auth_Mx_Config_Opt'
					}
				},
				{
					path: 'message/addTheme',
					component: resolve => require(['@/fbcsViews/view/message/subscription/theme/addTheme.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Mx_Config_Read,Auth_Mx_Config_Opt'
					}
				},
				{
					path: 'message/editTheme',
					component: resolve => require(['@/fbcsViews/view/message/subscription/theme/editTheme.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Mx_Config_Read,Auth_Mx_Config_Opt'
					}
				},
				{
					path: 'message/detailTheme/:id',
					component: resolve => require(['@/fbcsViews/view/message/subscription/theme/detailTheme.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Mx_Config_Read,Auth_Mx_Config_Opt'
					}
				},
				
				
				{
					path: 'message/query',
					component: resolve => require(['@/fbcsViews/view/message/version/query.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Mx_Config_Read,Auth_Mx_Config_Opt'
					}
				},
				{
					path: 'message/contrast',
					component: resolve => require(['@/fbcsViews/view/message/version/contrast.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Mx_Config_Read,Auth_Mx_Config_Opt'
					}
				},
				
				
				{
					path: 'order',
					component: resolve => require(['@/fbcsViews/view/order/manage.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Mx_Config_Read,Auth_Mx_Config_Opt'
					},
					children: [
						{
							path: 'xiaozhan',
							component: resolve => require(['@/fbcsViews/view/order/xiaoZhan.vue'], resolve),
							meta: {
								auth: true,
								authFlag: 'Auth_Mx_Config_Read,Auth_Mx_Config_Opt'
							}
						},
						{
							path: 'ekeyOrder',
							component: resolve => require(['@/fbcsViews/view/order/ekeyOrder.vue'], resolve),
							meta: {
								auth: true,
								authFlag: 'Auth_Mx_Config_Read,Auth_Mx_Config_Opt'
							}
						},
						{
							path: 'signalOrder',
							component: resolve => require(['@/fbcsViews/view/order/signalOrder.vue'], resolve),
							meta: {
								auth: true,
								authFlag: 'Auth_Mx_Config_Read,Auth_Mx_Config_Opt'
							}
						},
						{
							path: 'pwdOrder',
							component: resolve => require(['@/fbcsViews/view/order/pwdOrder.vue'], resolve),
							meta: {
								auth: true,
								authFlag: 'Auth_Mx_Config_Read,Auth_Mx_Config_Opt'
							}
						}
					]
				},
				{
					path: 'order/editBiz',
					component: resolve => require(['@/fbcsViews/view/order/editBiz.vue'], resolve),
					meta: {
						auth: true,
						authFlag: 'Auth_Mx_Config_Read,Auth_Mx_Config_Opt'
					}
				}
				
				
			]
		},
		
	]
});

export default router;
