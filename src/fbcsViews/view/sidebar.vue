<template>
	<div class="sidebar">
		<el-menu class="menu" @select='select' :collapse="isCollapse" :default-active="active" 
			unique-opened background-color="#F7F9FA " text-color="#375078" active-text-color="#FFF">
			<div index="message" v-show='model==1'>
				<el-menu-item v-if="auth.user>0" name='user' index="/user" >
					<img class="icon" src="../img/sidebar/user.png" />
					<img class="activeIcon" src="../img/sidebar/user2.png" />
					<em>{{pageTxt.tabs[0]}}</em>
				</el-menu-item>
				<el-menu-item v-if="auth.user>0" name='Ekey' index="/message/Ekey" >
					<img class="icon" src="../img/sidebar/ekey.png" />
					<img class="activeIcon" src="../img/sidebar/ekey2.png" />
					<em>{{pageTxt.tabs[1]}}</em>
				</el-menu-item>
				<el-menu-item v-if="auth.user>0" name='signal' index="/message/signal" >
					<img class="icon" src="../img/sidebar/signal.png" />
					<img class="activeIcon" src="../img/sidebar/signal2.png" />
					<em>{{pageTxt.tabs[2]}}</em>
				</el-menu-item>
				<!--<el-menu-item type='不做' name='config' index="/message/config" >{{pageTxt.tabs[3]}}</el-menu-item>-->
				<el-menu-item v-if="auth.suconfig>0" name='host' index="/message/host" >
					<img class="icon" src="../img/sidebar/host.png" />
					<img class="activeIcon" src="../img/sidebar/host2.png" />
					<em>{{pageTxt.tabs[4]}}</em>
				</el-menu-item>
				<!--<el-menu-item type='不做' name='operate' index="/message/operate" >{{pageTxt.tabs[5]}}</el-menu-item>-->
				<el-menu-item v-if="auth.dispatch>0" name='distr' index="/message/distr" >
					<img class="icon" src="../img/sidebar/distr.png" />
					<img class="activeIcon" src="../img/sidebar/distr2.png" />
					<em>{{pageTxt.tabs[6]}}</em>
				</el-menu-item>
				<el-menu-item v-if="auth.audit>0" name='statist' index="/message/statist" >
					<img class="icon" src="@/fbcsFxViews/img/menu/audit_1.png" />
					<img class="activeIcon" src="@/fbcsFxViews/img/menu/audit_2.png" />
					<em>{{pageTxt.tabs[7]}}</em>
				</el-menu-item>
				<el-menu-item name='xiaozhan' index="/order/xiaozhan" >
					<img class="icon" src="../img/sidebar/audit.png" />
					<img class="activeIcon" src="../img/sidebar/audit2.png" />
					<em>指令管理</em>
				</el-menu-item>
				
				<el-submenu v-if="auth.user>0||auth.topic>0" class='navH' index='subscription' :show-timeout="timeout" :hide-timeout="timeout">
					<div slot="title">
						<img class="icon" src="../img/sidebar/theme.png" />
						<img class="activeIcon" src="../img/sidebar/theme2.png" />
						<em>{{pageTxt.tabs[9]}}</em>
					</div>
					<el-menu-item v-if="auth.user>0" name='userSet' index="/message/userSet" >
						<em class="two">{{pageTxt.tabs[10]}}</em>
					</el-menu-item>
					<el-menu-item v-if="auth.topic>0" name='release' index="/message/release" >
						<em class="two">{{pageTxt.tabs[11]}}</em>
					</el-menu-item>
					<el-menu-item v-if="auth.topic>0" name='subscription' index="/message/subscription" >
						<em class="two">{{pageTxt.tabs[12]}}</em>
					</el-menu-item>
				</el-submenu>
				
				<el-submenu v-if="auth.version>0" class='navH' index='version' :show-timeout="timeout" :hide-timeout="timeout">
					<div slot="title">
						<img class="icon" src="../img/sidebar/version.png" />
						<img class="activeIcon" src="../img/sidebar/version2.png" />
						<em>{{pageTxt.tabs[13]}}</em>
					</div>
					<el-menu-item name='query' index="/message/query" >
						<em class="two">{{pageTxt.tabs[14]}}</em>
					</el-menu-item>
					<el-menu-item name='contrast' index="/message/contrast" >
						<em class="two">{{pageTxt.tabs[15]}}</em>
					</el-menu-item>
				</el-submenu>
				
				<el-submenu class='navH' index='advanced' :show-timeout="timeout" :hide-timeout="timeout">
					<div slot="title">
						<img class="icon" src="@/fbcsFxViews/img/menu/search_1.png" />
						<b class="activeIcon el-icon-search" style="font-size: 16px;width: 34px;text-align: center;font-weight: 700;"></b>
						<em>高级搜索</em>
					</div>
					<el-menu-item name='query' index="/advanced/signal" >
						<em class="el-icon-message two">通信关系</em>
					</el-menu-item>
				</el-submenu>
			</div>
			
		</el-menu>
	</div>
</template>

<script>
import kit       from '@/fbcsViews/libs/kit.js';
import lang      from '@/fbcsViews/language/lang.js';
import globalVar from '@/fbcsViews/libs/globalVar.js';
import utils     from '@/fbcsViews/libs/utils.js';
import fxUtils   from '@/fbcsFxViews/libs/utils.js';


	var data = {
		pageTxt: 'lang.sidebar',
		auth: globalVar.get('status'),
		active: '/user',
		model: '1',
		isCollapse: false,
		timeout: 0
	};
	var el, _this, sidebar, item;
	
	
	export default {
		name: 'sidebar',
		data() {
			return data;
		},
		methods: {
			select(url, path, vm){
				utils.clearCache();
				this.$router.replace({path: '/main/mxCfg'+url});
				this.active = url;
			}
		},
		created(){
			_this = this;
			var keys = ('user suconfig dispatch audit topic version lock').split(' '),
			obj = {}, i, len = keys.length;
			globalVar.set('accountInfo', {name: 'DEBUG'});
			for (i = 0; i < len; i++) obj[keys[i]] = 2;
			globalVar.set('lang', 'zh');
			globalVar.set('status', obj);
			globalVar.set('urlIP', 'http://10.172.57.161:8080/fbcs_mx/'); //10.10.27.161
			fxUtils.setBaseURL('http://10.172.57.161:8080/fbcs_mx/mx/');
			this.auth = obj;
			this.pageTxt = lang().sidebar;
			
			globalVar.set('urlIP', 'http://localhost:8088/fbcs_mx/');
			fxUtils.setBaseURL('http://localhost:8088/fbcs_mx/mx/');
			// globalVar.set('urlIP', 'http://10.10.218.26:8080/fbcs_mx/');
			// fxUtils.setBaseURL('http://10.10.218.26:8080/fbcs_mx/mx/');
		},
		mounted(){
			_this = this;
//			this.select( toUrl() );
			this.select('/user');
			this.isCollapse = false;
			event();
			sidebar = kit('.sidebar');
			var home = kit('.homeView');
			var timer = kit.timer();
			kit('.navHead #navBtn').click(function(e){
				_this.isCollapse = !_this.isCollapse;
				setTimeout(event, 400);
				timer.stop();
				if(_this.isCollapse){
					timer.start(300, function(per, param){
						home.css('margin-left', 226-169*per);
					});
//					sidebar.css('left', -10);
				} else {
					timer.start(300, function(per, param){
						home.css('margin-left', 57+169*per);
					});
//					sidebar.css('left', 0);
				}
			});
		},
//		computed:{
//          onRoutes(){
//				this.$router.replace({path: '/main/mxCfg/message/user'});
//          }
//     }
	};
	function event(){
		if(item) item.off('down').off('mouseover').off('mouseout').dispose();
		item = kit('.sidebar .el-menu-item').mouseenter(function(e){
			this.className = this.className.replace(' bg', '') +' bg';
		}).mouseleave(function(e){
			this.className = this.className.replace(' bg', '');
		});
		return item;
	}
	//根据权限显示默认页面
	function toUrl(){
//		console.log(location.hash);
		var path = '/message/', auth = globalVar.get('status'), obj, k, i,
			keys = ('user suconfig dispatch audit topic version').split(' '),
			vals = ('user host distr statist release query').split(' ');
		var hash = window.location.hash, pathK = '#/message/', router = {};
		var pageAuth = {
			user: 'user Ekey signal userSet',
			suconfig: 'host',
			dispatch: 'distr',
			audit: 'statist',
			topic: 'release subscription',
			version: 'query contrast'
		};
		//路径
		for (k in pageAuth) {
			var arr = pageAuth[k].split(' ');
			for (i = 0; i < arr.length; i++) {
				var src = arr[i];
				router[pathK + src] = {
					auth: auth[k],
					path: path + src
				};
			}
		}
		obj = router[hash];
		if(obj){
			if(obj.auth > 0) return obj.path;
		}
		//默认
		for (i = 0; i < keys.length; i++) {
			k = keys[i];
			if(auth[k] > 0){
				path += vals[i];
				break;
			}
		}
		return path;
	}
</script>

<style scoped="scoped">
	.sidebar{position: fixed;top:50px;left: 0;height: calc(100% - 50px);background: #F7F9FA;/*border-right: 1px solid #D7D8DA;*/-moz-user-select: none;-webkit-user-select: none;}
	.menu{overflow: auto;height: 100%;}
	.menu:not(.el-menu--collapse) {width: 226px;}
	.menu em{font-weight: bold;}
	.sidebar .menu.el-menu--collapse{width: 67px;}
	/*.sidebar .el-menu-item-group .el-menu-item:hover{background: #FFF !important;}*/
	.bg{background: #3E7FEC !important;;color: #FFF !important;}
	.is-active{background: #3E7FEC !important;color: #FFF !important;}
	.bg .icon,.is-active .icon{display: none;}
	.activeIcon{display: none;}
	.bg .activeIcon,.is-active .activeIcon{display: inline-block;}
	.menu .two{padding-left: 30px;font-weight: 500;}
	/*em{padding-left: 10px;}*/
	
</style>
<style>
	.sidebar .navH .el-submenu__title .icon{display: inline-block;}
	.sidebar .navH .el-submenu__title .activeIcon{display: none;}
	.sidebar .el-submenu__title:hover{background: #3E7FEC !important;color: #FFF !important;}
	.sidebar .el-submenu__title:hover .icon{display: none;}
	.sidebar .el-submenu__title:hover .activeIcon{display: inline-block;}
	.sidebar .el-icon-arrow-right{display: none;}
</style>
