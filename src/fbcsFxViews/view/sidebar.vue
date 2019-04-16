<template>
	<div class="sidebar" :class="{small:collapse}">
		<el-menu class="menu" :default-active="active" :collapse.sync="collapse" @select="select" unique-opened 
			active-text-color="#FFF" :collapse-transition="false">
			
			<el-menu-item v-for="obj in nav" :index="obj.router" :key="obj.router">
				<!--<i :class="obj.icon"></i>-->
				<img class="icon def" :src="obj.src1"/>
				<img class="icon active" :src="obj.src2"/>
				<b :class="{hide:collapse}">{{obj.label}}</b>
			</el-menu-item>
			
			<el-submenu v-for="val in subNav" :index="val.folder" :key="val.folder">
				<div slot="title">
					<!--<i :class="val.icon"></i>-->
					<img class="icon" :src="val.src1"/>
					<b :class="{hide:collapse}">{{val.label}}</b>
				</div>
				<el-menu-item v-for="o in val.sub"  :index="o.router" :key="o.router">
					<i :class="o.icon"></i>
					{{o.label}}
				</el-menu-item>
			</el-submenu>
			
		</el-menu>
	</div>
</template>

<script>
var data = {
	active: '/userHome',
	nav: [
		{router:'/main/fxCfg/userHome', icon:'el-icon-location', label:'用户', 
			src1:require('../img/menu/user_1.png'), src2:require('../img/menu/user_2.png')},
		{router:'/main/fxCfg/Ekey', icon:'el-icon-menu', label:'Ekey', 
			src1:require('../img/menu/Ekey_1.png'), src2:require('../img/menu/Ekey_2.png')},
		{router:'/main/fxCfg/relation', icon:'el-icon-message', label:'通信关系', 
			src1:require('../img/menu/signal_1.png'), src2:require('../img/menu/signal_2.png')},
		{router:'/main/fxCfg/suConfig', icon:'el-icon-setting', label:'主机配置', 
			src1:require('../img/menu/suConfig_1.png'), src2:require('../img/menu/suConfig_2.png')},
		{router:'/main/fxCfg/dispatch', icon:'el-icon-tickets', label:'分发', 
			src1:require('../img/menu/dispatch_1.png'), src2:require('../img/menu/dispatch_2.png')},
		{router:'/main/fxCfg/audit', icon:'el-icon-document', label:'稽核', 
			src1:require('../img/menu/audit_1.png'), src2:require('../img/menu/audit_2.png')}
	],
	subNav: [
		{
			folder: 'fileManage', label: '文件管理', icon:'el-icon-upload',
			src1:require('../img/menu/fileManage.png'),
			sub: [{router:'/main/fxCfg/fileManage/search', icon:'el-icon-search', label:'文件查询'},
			{router:'/main/fxCfg/fileManage/upload', icon:'el-icon-upload2', label:'文件下发'},
			{router:'/main/fxCfg/fileManage/regain', icon:'el-icon-success', label:'对比恢复'},
			{router:'/main/fxCfg/fileManage/blacklist', icon:'el-icon-bell', label:'CU黑名单'}]
		},
		{
			folder: 'version', label: '版本', icon:'el-icon-view',
			src1:require('../img/menu/version_1.png'),
			sub: [{router:'/main/fxCfg/version/query', icon:'el-icon-search', label:'版本查询'},
			{router:'/main/fxCfg/version/contrast', icon:'el-icon-document', label:'版本对比'}]
		},
		{
			folder: 'advanced', label: '高级搜索', icon:'el-icon-search',
			src1:require('../img/menu/search_1.png'),
			sub: [{router:'/main/fxCfg/advanced/user', icon:'el-icon-location', label:'用户'},
			{router:'/main/fxCfg/advanced/Ekey', icon:'el-icon-menu', label:'Ekey'},
			{router:'/main/fxCfg/advanced/signal', icon:'el-icon-message', label:'通信关系'},
			{router:'/main/fxCfg/advanced/information', icon:'el-icon-more', label:'扩展信息'},
			{router:'/main/fxCfg/advanced/audit', icon:'el-icon-document', label:'稽核'}]
		}
	]
};
export default {
	name: 'sidebar',
	data() { return data; },
	props: {
		collapse: false
	},
	methods:{
		select(path){
			this.active = path
			this.$router.push({path});
		},
	},
	created(){
		this.select('/main/fxCfg/userHome');
	}
};
</script>

<style scoped="scoped">
	.sidebar{position: fixed;width: 226px;height: calc(100% - 50px);top: 50px;left: 0;background: #FFF;transition: width 0.3s;
		-moz-user-select: none;-webkit-user-select: none;}
	.small{width: 64px;}/*F7F9FA*/
	.menu{width: 100%;height: 100%;overflow: auto;}
	.el-menu-item.is-active{background: #3E7FEC;}
	.icon{width: 34px;height: 34px;margin-left: -5px;}
	.active{display: none;}
	.def{display: inline-block;}
	.is-active .active{display: inline-block;}
	.is-active .def{display: none;}
</style>