<template>
	<div class="lockFx">
		<div class="lock" @click="showReview">
			<img ref="lockimg" :src="imgsrc" />
		</div>
		
		<el-dialog width="600px" :modal="false" :visible.sync="isReview" :title="$t('base.fbcsLock.title')" :close-on-click-modal="false" :show-close="false">
			<ul class="bt">
				<li style="margin-bottom: 30px;">
					<span class="txt">{{$t('base.fbcsLock.name')}}</span>
					<el-input v-model="userName" class="input" disabled autocomplete="off" />
				</li><li style="margin-bottom: 30px;">
					<span class="txt">{{$t('base.fbcsLock.pwd')}}</span>
					<el-input v-model="pwd" class="input" type="password" autocomplete="off" />
				</li>
			</ul>
			<div slot="footer" class="_footBtn">
				<el-button class="blueBtn" @click="reviewHandle(uri)" type="primary">{{$t('base.fbcsLock.ok')}}</el-button>
				<el-button class="defBtn" @click="reviewCancel" type="default">{{$t('base.fbcsLock.cancel')}}</el-button>
			</div>
		</el-dialog>
		
		<el-dialog width="600px" :modal="false" :visible.sync="tipsPanle" :title="$t('base.fbcsLock.title')" :close-on-click-modal="false" :show-close="false">
			<div class="tipsMsg">
				<div class="msg">{{msg}}</div>
			</div>
			<div slot="footer" class="_footBtn">
				<el-button class="blueBtn" @click="tipsSubmit" type="primary">{{$t('base.fbcsLock.ok')}}</el-button>
				<el-button class="defBtn"  @click="tipsPanle=false" type="default">{{$t('base.fbcsLock.cancel')}}</el-button>
			</div>
		</el-dialog>
		
		<el-dialog width="600px" :modal="false" :visible.sync="alertPanle" :title="$t('base.fbcsLock.title')" :close-on-click-modal="false" :show-close="false">
			<div class="alertMsg">
				<div class="icon">
					<img :src="alertSrc" />
				</div>
				<div class="msg2">{{msg}}</div>
			</div>
			<div slot="footer" class="_footBtn">
				<el-button class="blueBtn" type="primary" @click="alertPanle=false">{{$t('base.fbcsLock.ok')}}</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import md5 from 'js-md5'
import utils from '@/fbcsFxViews/libs/utils.js';

var locksrc = require('@/fbcsFxViews/img/lock.png'),
	unlocksrc = require('@/fbcsFxViews/img/unlock.png'),
	success = require('@/fbcsFxViews/img/success.png'),
	failed = require('@/fbcsFxViews/img/failure.png');
var _this, lockimg, unlock, lock, lockTime = 0;


export default {
	name: 'lockFx',
	data() {
		return {
			imgsrc: '',
			isReview: false,
			userName: '',
			pwd: '',
			tipsPanle: false,
			btn: 2,
			isLock: false,
			uri: '',
			msg: '',
			alertPanle: false,
			alertSrc: ''
		};
	},
	methods:{
		showReview(){
			if(!getAuth()){
				this.btn = 1;
				this.alertSrc = failed;
				this.msg = this.$t('base.fbcsLock.errAuth');
				return this.alertPanle = true;
			}
			this.pwd = '';
			this.isReview = true;
		},
		reviewHandle(uri){
			if(this.pwd==''){
				this.btn = 1;
				this.alertSrc = failed;
				this.msg = this.$t('base.fbcsLock.pwdNull');
				return this.alertPanle = true;
			}
			let args = {
				url: '/fbcs_mx/mx/auth/review',
				cmdID: '600122',
				reviewer: 'this.userName',
				password: md5(this.pwd),
				language: localStorage.getItem('language') || 'zh',
				uri: '/fbcs_mx/mx/lock/' + uri
			};
			utils.post(args).then(result => {
				let res = result;
				if(res.errcode != '0'){
					_this.msg = res.errinfo;
					_this.alertSrc = failed;
					_this.alertPanle = true;
					return;
				}
				_this.btn = 2;
				let msg = 'base.fbcsLock.';
				if(uri == 'lock'){
					_this.isLock = true;
					msg += 'lock';
				} else {
					_this.isLock = false;
					msg += 'unlock';
				}
				this.msg = this.$t(msg);
				this.tipsPanle = true;
				this.reviewCancel();
			});
		},
		reviewCancel(){
			this.isReview = false;
		},
		tipsSubmit(){
			this.tipsPanle = false;
			if(this.btn == 1) return;
			
			var url = '/fbcs_mx/mx/lock/';
			var param = {
				reviewer: this.userName,
				reviewerPassword: md5(this.pwd),
				reviewType: 0,
				language: localStorage.getItem('language') || 'zh'
			};
			if(this.isLock){
				url += 'lock';
				param.cmdID = '600112';
				_this.uri = 'unlock';
			} else {
				url += 'unlock';
				param.cmdID = '600113';
				_this.uri = 'lock';
			}
			param.url = url;
			utils.post(param).then(result => {
				let res = result;
				_this.msg = res.errinfo;
				_this.alertPanle = true;
				if(res.errcode != '0'){
					_this.alertSrc = failed;
					return;
				}
				_this.alertSrc = success;
				if(_this.isLock){
					lockimg.src = locksrc;
				} else {
					lockimg.src = unlocksrc;
				}
				
				_this.$store.dispatch('changeLockFbcs', _this.isLock);
				setTimeout(() => {
					_this.alertPanle = false;
				}, 3000);
			});
		}
	},
	created(){
		_this = this;
		this.userName = localStorage.getItem('userName') || 'test';
	},
	mounted(){
		lockimg = this.$refs['lockimg'];
		checkLock();
	},
	beforeDestroy(){
		clearTimeout(lockTime);
	}
};

function checkLock(){
	let param = {
		url: '/fbcs_mx/mx/lock/query',
		cmdID: '600111'
	};
	utils.post(param).then(result => {
		let res = result;
		if(res.errcode != '0') return console.warn(res.errcode, res.errinfo);
		lockimg = _this.$refs['lockimg'];
		if(res.operationLockStatus == '1'){
			lockimg.src = locksrc;
			_this.uri = 'unlock';
		} else {
			lockimg.src = unlocksrc;
			_this.uri = 'lock';
		}
		// lockTime = setTimeout(checkLock, 5000);
		_this.$store.dispatch('changeLockFbcs', _this.uri=='unlock');
	});
}

function getAuth(){
	let authority = localStorage.getItem('authoritys') || '';
	return (/Auth_Mx_Config_Opt/i).test(authority);
}

</script>

<style scoped>
	.lock{line-height: 0;padding: 10px;cursor: pointer;}
	.lock:hover{background: #407BDD;border-radius: 5px;}
	.lock img{display: block;width: 14px;height: 16px;cursor: pointer;}
	li{list-style: none;}
	.input{display: inline-block;width: 250px;}
	.txt{display: inline-block;width: 140px;text-align: right;}
	.tipsMsg{display: grid;white-space: pre-wrap;min-height: 100px;padding: 20px;min-height: 100px;border-top: 1px solid #EDEEF0;}
	.msg{margin: auto;text-align: center;font-size: 16px;line-height: 24px;word-break: break-word;max-height: 400px;overflow: auto;}
	.alertMsg{display: flex;justify-content: center;align-items: center;min-height: 100px;font-size: 0;padding: 20px;border-top: 1px solid #EDEEF0;}
	.icon{text-align: right;padding-right: 40px;}
	.msg2{font-size: 16px;line-height: 24px;word-break: break-word;max-height: 400px;overflow: auto;white-space: pre-wrap;}
	
	.el-dialog__wrapper{background: rgba(0, 0, 0, 0.5);}
	.bt{border-top: 1px solid #EDEEF0;padding-top: 30px;}
</style>
