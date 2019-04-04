<template>
	<div ref='fbcs_file' id="fbcs_file" class="home">
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
			<div class="homeView" :class="{big:isCollapse}">
				<!--<div class="router">-->
					<div class=""></div>
					<router-view></router-view>
				<!--</div>-->
			</div>
		<!--</div>-->
		<el-dialog :visible.sync="showReview" :title="$t('fbcsFile.tips.title')" v-dialogDrag :close-on-click-modal='false' :show-close="false">
			<ul class="_dialog">
				<li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.userInfo.name')}}</p>
					</div><div class="right">
						<input v-model="userName" disabled/>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.userHome.pwd')}}</p>
					</div><div class="right">
						<input v-model="pwd" type="password"/>
					</div>
				</li>
			</ul>
			<div slot="footer" class="_footBtn">
				<button class="blueBtn" @click="reviewHandle(uri)">{{$t('fbcsFile.tips.ok')}}</button>
				<button class="defBtn" @click="cancel">{{$t('fbcsFile.tips.cancel')}}</button>
			</div>
		</el-dialog>
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
var unlock, lock;

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
				reviewer: this.name,
				password: md5(this.pwd),
				language: utils.getArgs('lang') || 'zh',
				uri:  '/fedp/fx/lock/' + uri
			};
			
			let res = await utils.post(args);
			if(!res) return;
			if(res.errcode != '0') return utils.alert({txt:res.errinfo, type:0});

			utils.confirm({
				txt: this.$t('fbcsFile.components.isSubmit'),
				ok: () => {
					(uri == 'lock') ? lockFn() : unlockFn();
				}
			});
			this.cancel();
		},
		cancel(){
			this.showReview = false;
			this.pwd = '';
		}
	},
	created(){
		_this = this;
		let name = sessionStorage.getItem('userName') || 'LOCAL';
		this.userName = name;
		utils.setArgs('userName', name); //accountInfo
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
//		setInterval(checkLock, 5000);
	},
	components: {
		sidebar: resolve => require(['@/fbcsFxViews/view/sidebar.vue'], resolve),
	}
};

function checkLock(){
	let params = {
		url: 'lock/query',
		cmdID: '600111'
	};
	utils.post(params).then(function(res){
		if(res.errcode != '0') return console.warn(res.errcode, res.errinfo);
		if(res.operationLockStatus == '1'){
			lock.show();
			unlock.hide();
		} else {
			lock.hide();
			unlock.show();
		}
	});
}

function lockFn(uri){
	let params = {
		url: 'lock/lock',
		cmdID: '600112'
	};
	utils.post(params).then(function(res){
		utils.alert({txt: res.errinfo, type: res.errcode!='0'?0:1});
		if(res.errcode != '0') return;
		lock.show();
		unlock.hide();
	});
}

function unlockFn(uri){
	let params = {
		url: 'lock/unlock',
		cmdID: '600113'
	};
	utils.post(params).then(function(res){
		utils.alert({txt: res.errinfo, type: res.errcode!='0'?0:1});
		if(res.errcode != '0') return;
		lock.hide();
		unlock.show();
	});
}
</script>

<style scoped="scoped">
	.home{height: 100%;}
	.cw{height: calc(100% - 50px);}
	.nav{height: 50px;background: #409eff;color: #FFF;line-height: 50px;z-index: 2;}
	.homeView{height: calc(100% - 50px);margin-left: 226px;overflow: auto;border: 20px solid #Edf0f5;border-right: none;
		padding: 20px 0 20px 20px;transition: margin 0.3s;}
	.big{margin-left: 64px;}
	/*.router{background: #fff;min-height: 100%;}*/
	#fbcs_file .fs{margin-left: 10px;}
	.logoBox{display: inline-block;background: #2861c1;width: 226px;height: 50px;vertical-align: top;}
	.logo{position: absolute;margin: auto;top: 0;left: 0;right: 0;bottom: 0;}
	
	.fbcs_lockBox{position: absolute;top: 8px;right: 10px;padding: 10px;line-height: 0;}
	.fbcs_lockBox:hover{background: #407BDD;border-radius: 5px;}
	.fbcs_lockBox img{display: none;width: 14px;height: 16px;cursor: pointer;}
	._dialog{}
</style>