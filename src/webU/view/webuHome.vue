<template>
	<div ref='webu' id="webu" class="home">
		<input type="text" class="autocompleteOFF" autocomplete="on"/>
		<div class="nav" id="nav">
			<div class="logoBox">
				<img class="logo" src="@/fbcsFxViews/img/FDEP.png" />
			</div>
			<button class="defBtn el-icon-tickets fs" @click="isCollapse=!isCollapse">导航</button>
			<select class="sys sl" @change="system">
				<option value="1">文件系统</option>
				<option value="2">消息系统</option>
				<option value="3" selected>互联网用户</option>
			</select>
		</div>
		<sidebar :collapse.sync="isCollapse"></sidebar>
		<div ref="home" class="homeView" :class="{big:isCollapse}">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import '@/webU/css/webU.css';
import utils from '@/fbcsFxViews/libs/utils.js';

var _this;

//require('../img/logo.png');
export default {
	name: 'webuHome',
	data() {
		var data = {
			isCollapse: false
		};
		return data;
	},
	methods:{
		system(e){
			var path;
			switch (e.target.value){
				case '1':
					path = '/main/fxCfg/userHome'; break;
				case '2':
					path = '/main/mxCfg/user'; break;
				case '3':
					path = '/main/webu/realTime/monitoring'; break;
			}
			this.$router.push({path});
		}
	},
	beforeCreate(){
		let url;
		// url = window.fbcs_fxIP + '/fbcs_fx/fx/';
		url = 'http://localhost:8088/fx/';
		// url = '/fbcs_fx/fx/';
		utils.setBaseURL(url);
	},
	created(){
		_this = this;
		let name = localStorage.getItem('userName') || 'LOCAL';
		this.userName = name;
		utils.setArgs('userName', name);
		this.showReview = false;
	},
	mounted(){
		utils.emit('fbcs_file', this.$refs['webu']);
	},
	components: {
		sidebar: resolve => require(['@/webU/view/sidebar.vue'], resolve)
	},
	beforeDestroy(){}
};

</script>

<style scoped="scoped">
	.home{height: 100%;background: #FFF;}
	.cw{height: calc(100% - 50px);}
	.nav{height: 50px;background: #409eff;color: #FFF;line-height: 50px;z-index: 2;}
	.homeView{height: calc(100% - 50px);margin-left: 226px;overflow: overlay;border: 20px solid #Edf0f5;border-right: none;
		transition: margin 0.3s;/*padding: 20px 0 20px 20px;*/padding: 20px;}
	.big{margin-left: 64px;}
	/*.router{background: #fff;min-height: 100%;}*/
	#webu .fs{margin-left: 10px;}
	.logoBox{display: inline-block;background: #2861c1;width: 226px;height: 50px;vertical-align: top;}
	.logo{position: absolute;margin: auto;top: 0;left: 0;right: 0;bottom: 0;}
	.sys{position: absolute;top: 10px;right: 50px;z-index: 2;font-size: 12px;padding: 5px 10px;border: 1px solid #0DB9EB;
		text-align: center;border-radius: 6px;overflow: hidden;color: #00B5EA;-webkit-appearance: button}
</style>
