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
import utils  from '@/fbcsFxViews/libs/utils.js';
	
var data = {
	active: '/monitoring',
	nav: [
		// {router:'/main/fxCfg/userHome', icon:'el-icon-location', label:'用户', 
		// 	src1:require('@/fbcsFxViews/img/menu/user_1.png'), src2:require('@/fbcsFxViews/img/menu/user_2.png')},
	],
	subNav: [
		{
			folder: 'realTime', label: '实时监视', icon:'el-icon-upload',
			src1:require('@/fbcsFxViews/img/menu/fileManage.png'),
			sub: [
				{router:'/main/webu/realTime/monitoring', icon:'el-icon-search', label:'监视概览'},
			]
		},
		{
			folder: 'statistic', label: '统计服务', icon:'el-icon-view',
			src1:require('@/fbcsFxViews/img/menu/version_1.png'),
			sub: [
				{router:'/main/webu/statistic/webUser', icon:'el-icon-location', label:'用户统计'},
				{router:'/main/webu/statistic/webFile', icon:'el-icon-menu', label:'Web文件传输情况'},
				// {router:'/main/webu/statistic/nginx', icon:'el-icon-message', label:'Nginx统计'},
				{router:'/main/webu/statistic/historyLlogin', icon:'el-icon-more', label:'历史登录信息'}
			]
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
			utils.clearCache();
			this.active = path;
			this.$router.push({path});
		},
		activeLabel(path){
			this.active = path;
		}
	},
	created(){
		utils.on('webuSidebar', this.activeLabel);
		this.select('/main/webu/realTime/monitoring');
	},
	beforeDestroy() {
		utils.off('webuSidebar', this.activeLabel);
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
