<template>
	<div ref='fbcs_file' id="fbcs_file" class="home">
		<input type="text" class="autocompleteOFF" autocomplete="on"/>
		<div class="nav" id="nav">
			<div class="logoBox">
				<img class="logo" src="../img/FDEP.png" />
			</div>
			<button class="defBtn el-icon-tickets fs" @click="isCollapse=!isCollapse">导航</button>
			<div class="fbcs_lockBox">
				<img id="fbcsMX_lock" src="@/fbcsFxViews/img/lock.png" />
				<img id="fbcsMX_unlock" src="@/fbcsFxViews/img/unlock.png" />
			</div>
		</div>
		<!--<div class="cw">-->
			<sidebar :collapse.sync="isCollapse"></sidebar>
			<div ref="home" class="homeView" :class="{big:isCollapse}">
				<!--<div class="router">-->
					<router-view></router-view>
				<!--</div>-->
				<div ref="lockTxt" class="lockTxt">{{$t('fbcsFile.err.lock.lockTxt')}}</div>
			</div>
		<!--</div>-->
		<el-dialog :visible.sync="showReview" :title="$t('fbcsFile.tips.title')" v-dialogDrag :close-on-click-modal='false' :show-close="false">
			<ul class="_dialog">
				<li style="margin: 15px 0 30px;">
					<div class="left">
						<p class="txt">{{$t('fbcsFile.userInfo.name')}}</p>
					</div><div class="right">
						<input v-model="userName" disabled autocomplete="off"/>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.userHome.pwd')}}</p>
					</div><div class="right">
						<input v-model="pwd" type="password" autocomplete="off"/>
					</div>
				</li>
			</ul>
			<div slot="footer" class="_footBtn">
				<button class="blueBtn" @click="reviewHandle(uri)">{{$t('fbcsFile.tips.ok')}}</button>
				<button class="defBtn" @click="cancel">{{$t('fbcsFile.tips.cancel')}}</button>
			</div>
		</el-dialog>
		<button class="defBtn sys" @click="system">文件系统</button>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';
import md5 from '@/fbcsFxViews/libs/md5.js';

var _this, data = {
	isCollapse: false,
	userName: 'local',
	showReview: false,
	pwd: '',
	uri: '',
};
var unlock, lock, lockTime = 0;

//require('../img/logo.png');
export default {
	name: 'elui',
	data() { return data; },
	methods:{
		async reviewHandle(uri){
			if(this.pwd=='') return utils.confirm({txt:this.$t('fbcsFile.err.user.userPasswd'), btn:1});
			let args = {
				url: 'auth/review',
				cmdID: '600122',
				reviewer: this.userName,
				password: md5(this.pwd),
				language: utils.getArgs('lang') || 'zh',
				uri:  '/fbcs_fx/fx/lock/' + uri
			};

			let res = await utils.post(args);
			if(!res) return;
			if(res.errcode != '0') return utils.alert({txt:res.errinfo, type:0});

			utils.confirm({
				txt: this.$t('fbcsFile.err.lock.'+(uri == 'lock' ? 'lock' : 'unlock')),
				ok: () => {
					(uri == 'lock') ? lockFn(args) : unlockFn(args);
				}
			});
			this.cancel();
		},
		cancel(){
			this.showReview = false;
			this.pwd = '';
		},
		system(){
			this.$router.push({path: '/main/mxCfg/user'});
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
		let name = sessionStorage.getItem('userName') || 'LOCAL';
		this.userName = name;
		utils.setArgs('userName', name); //accountInfo
		this.showReview = false;
//		this.isCollapse = true;
//		this.$router.replace({path: '/main/fxCfg/userHome'});
	},
	mounted(){
		utils.emit('fbcs_file', this.$refs['fbcs_file']);

		unlock = kit('#fbcsMX_unlock').show().click(function(e){
			_this.uri = 'lock';
			_this.showReview = true;
		});

		lock = kit('#fbcsMX_lock').hide().click(function(e){
			_this.uri = 'unlock';
			_this.showReview = true;
		});
		checkLock();
	},
	components: {
		sidebar: resolve => require(['@/fbcsFxViews/view/sidebar.vue'], resolve),
	},
	beforeDestroy(){
		clearTimeout(lockTime);
	}
};

function checkLock(){
	let params = {
		url: 'lock/query',
		cmdID: '600111'
	};
	utils.post(params).then(function(res){
		if(res.errcode != '0') return console.warn(res.errcode, res.errinfo);
		let ref = _this.$refs;
		if(res.operationLockStatus == '1'){
			lock.show();
			unlock.hide();
			ref.home.style['padding-top'] = '60px';
			ref.lockTxt.style['display'] = 'block';
		} else {
			lock.hide();
			unlock.show();
			ref.home.style['padding-top'] = '20px';
			ref.lockTxt.style['display'] = 'none';
		}
//		lockTime = setTimeout(checkLock, 5000);
	});
}

function lockFn({reviewer, password}){
	let params = {
		url: 'lock/lock',
		cmdID: '600112',
		reviewer,
		reviewerPassword: password,
		reviewType: 0
	};
	utils.post(params).then(function(res){
		utils.alert({txt: res.errinfo, type: res.errcode!='0'?0:1});
		if(res.errcode != '0') return;
		lock.show();
		unlock.hide();
		let ref = _this.$refs;
		ref.home.style['padding-top'] = '60px';
		ref.lockTxt.style['display'] = 'block';
	});
}

function unlockFn({reviewer, password}){
	// console.log(reviewer, password);
	let params = {
		url: 'lock/unlock',
		cmdID: '600113',
		reviewer,
		reviewerPassword: password,
		reviewType: 0
	};
	utils.post(params).then(function(res){
		utils.alert({txt: res.errinfo, type: res.errcode!='0'?0:1});
		if(res.errcode != '0') return;
		lock.hide();
		unlock.show();
		let ref = _this.$refs;
		ref.home.style['padding-top'] = '20px';
		ref.lockTxt.style['display'] = 'none';
	});
}
</script>

<style scoped="scoped">
	.home{height: 100%;background: #FFF;}
	.cw{height: calc(100% - 50px);}
	.nav{height: 50px;background: #409eff;color: #FFF;line-height: 50px;z-index: 2;}
	.homeView{height: calc(100% - 50px);margin-left: 226px;overflow: overlay;border: 20px solid #Edf0f5;border-right: none;
		transition: margin 0.3s;/*padding: 20px 0 20px 20px;*/padding: 20px;}
	.big{margin-left: 64px;}
	/*.router{background: #fff;min-height: 100%;}*/
	#fbcs_file .fs{margin-left: 10px;}
	.logoBox{display: inline-block;background: #2861c1;width: 226px;height: 50px;vertical-align: top;}
	.logo{position: absolute;margin: auto;top: 0;left: 0;right: 0;bottom: 0;}

	.fbcs_lockBox{position: absolute;top: 8px;right: 10px;padding: 10px;line-height: 0;}
	.fbcs_lockBox:hover{background: #407BDD;border-radius: 5px;}
	.fbcs_lockBox img{display: none;width: 14px;height: 16px;cursor: pointer;}
	.lockTxt{
		position: absolute;display: none;top: 0;left: 0;width: 100%;padding-left: 20px;
		font-size: 14px;font-weight: bold;color: #FF7A7D;line-height: 44px;height: 44px;border-bottom: 1px solid #EBEFF4;
	}
	.sys{position: absolute;top: 10px;right: 50px;z-index: 2;}
</style>
