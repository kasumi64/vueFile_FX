<template>
	<div ref='fbcs_file' id="fbcs_file" class="home">
		<input type="text" class="autocompleteOFF" autocomplete="on"/>
		<div class="nav" id="nav">
			<div class="logoBox">
				<img class="logo" src="../img/FDEP.png" />
			</div>
			<button class="defBtn el-icon-tickets fs" @click="isCollapse=!isCollapse">导航</button>
			<select class="sys sl" @change="system">
				<option value="1" selected>文件系统</option>
				<option value="2">消息系统</option>
				<option value="3">互联网用户</option>
			</select>
			<div class="fbcs_lockBox">
				<lock />
			</div>
		</div>
		<!--<div class="cw">-->
			<sidebar :collapse.sync="isCollapse"></sidebar>
			<div ref="home" class="homeView" :class="{big:isCollapse}">
				<!--<div class="router">-->
					<router-view></router-view>
				<!--</div>-->
				<div v-if="LockState" ref="lockTxt" class="lockTxt">{{$t('fbcsFile.err.lock.lockTxt')}}</div>
			</div>
		<!--</div>-->
		
		<!-- <button class="defBtn sys" @click="system">文件系统</button> -->
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';
import md5 from '@/fbcsFxViews/libs/md5.js';

var _this;

//require('../img/logo.png');
export default {
	name: 'elui',
	data() {
		let bingo = {
			isCollapse: false,
			userName: 'local'
		};
		return bingo;
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
		utils.fbcsLanguage = utils.language;
	},
	created(){
		_this = this;
		let name = localStorage.getItem('userName') || 'DEBUG';
		this.userName = name;
		utils.setArgs('userName', name); //accountInfo
//		this.isCollapse = true;
//		this.$router.replace({path: '/main/fxCfg/userHome'});
	},
	mounted(){
		utils.emit('fbcs_file', this.$refs['fbcs_file']);
		showRedText();
	},
	computed: {
		LockState(){
			return showRedText();
		}
	},
	components: {
		sidebar: resolve => require(['@/fbcsFxViews/view/sidebar.vue'], resolve),
		lock: resolve => require(['@/fbcsFxViews/view/LockFx.vue'], resolve)
	}
};

function showRedText(){
	let isLock = _this.$store.state.isLockFbcs;
	let home = _this.$refs.home;
	if(!home) return isLock;
	if(isLock){
		home.style['padding-top'] = '60px';
	} else {
		home.style['padding-top'] = '20px';
	}
	return isLock;
}

</script>

<style scoped="scoped">
	.home{height: 100%;background: #FFF;}
	.cw{height: calc(100% - 50px);}
	.nav{height: 50px;background: #409eff;color: #FFF;line-height: 50px;z-index: 3;}
	.homeView{height: calc(100% - 50px);margin-left: 226px;overflow: overlay;border: 20px solid #Edf0f5;border-right: none;
		transition: margin 0.3s;/*padding: 20px 0 20px 20px;*/padding: 20px;}
	.big{margin-left: 64px;}
	/*.router{background: #fff;min-height: 100%;}*/
	#fbcs_file .fs{margin-left: 10px;}
	.logoBox{display: inline-block;background: #2861c1;width: 226px;height: 50px;vertical-align: top;}
	.logo{position: absolute;margin: auto;top: 0;left: 0;right: 0;bottom: 0;}

	.fbcs_lockBox{position: absolute;top: 8px;right: 10px;line-height: 0;}
	.fbcs_lockBox:hover{background: #407BDD;border-radius: 5px;}
	.fbcs_lockBox img{display: none;width: 14px;height: 16px;cursor: pointer;}
	.lockTxt{
		position: absolute;top: 0;left: 0;width: 100%;padding-left: 20px;
		font-size: 14px;font-weight: bold;color: #FF7A7D;line-height: 44px;height: 44px;border-bottom: 1px solid #EBEFF4;
	}
	.sys{position: absolute;top: 10px;right: 50px;z-index: 2;}
	.sl{font-size: 12px;padding: 5px 10px;border: 1px solid #0DB9EB;text-align: center;border-radius: 6px;overflow: hidden;
		color: #00B5EA;-webkit-appearance: button; height: 30px;line-height: 1.2;
	}
</style>
