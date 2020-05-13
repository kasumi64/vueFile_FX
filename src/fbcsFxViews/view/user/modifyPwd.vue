<template>
	<div class="modifyPwd">
		<el-dialog :visible.sync="show" :title="$t('fbcsFile.order.pwdOrder.title')" v-dialogDrag :close-on-click-modal='false' :show-close="false">
			<div class="_dialog">
				<li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.password.id')}}</p>
					</div><div class="right">
						<input v-model="info.userID" id="pwd-id" disabled autocomplete="off"/>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.password.pwd')}}</p>
					</div><div class="right">
						 <el-checkbox v-model="isEdit" id="pwd-check"></el-checkbox>
					</div>
				</li><li v-if="isEdit">
					<div class="left">
						<p class="txt">{{$t('fbcsFile.password.reset')}}</p>
					</div><div class="right">
						 <el-radio-group v-model="info.isModifyDefaultPasswd" id="pwd-radio" @change="defPwd" class="radio">
						    <el-radio :label="0">{{$t('fbcsFile.password.def')}}</el-radio>
						    <el-radio :label="1">{{$t('fbcsFile.password.hm')}}</el-radio>
						</el-radio-group>
					</div>
				</li><li v-if="isEdit">
					<div class="left">
						<p class="txt">
							<span  v-if="info.isModifyDefaultPasswd==1" class="red">*</span>
							{{$t('fbcsFile.password.new')}}
						</p>
					</div><div class="right">
						<input v-model="passwd" id="pwd-pass" :disabled="info.isModifyDefaultPasswd==0" maxlength="18" autocomplete="off"/>
					</div>
				</li><li v-if="isEdit">
					<div class="left">
						<p class="txt">
							<span  v-if="info.isModifyDefaultPasswd==1" class="red">*</span>
							{{$t('fbcsFile.password.again')}}
						</p>
					</div><div class="right">
						<input v-model="again" id="pwd-again" :disabled="info.isModifyDefaultPasswd==0" maxlength="18" autocomplete="off"/>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.password.indate')}}</p>
					</div><div class="right">
						<el-select v-model="info.expiredTimeFlag" id="pwd-expired">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</li>
			</div>
			<div slot="footer" class="_footBtn">
				<button class="blueBtn" @click="now" id="pwd-now">{{$t('fbcsFile.tips.now')}}</button>
				<button class="blueBtn" @click="submit" id="pwd-submit">{{$t('fbcsFile.tips.modify')}}</button>
				<button class="defBtn" @click="close" id="pwd-close">{{$t('fbcsFile.tips.back')}}</button>
			</div>
		</el-dialog>
		<lgy-review id="pwd" :show.sync='showReview' :reqsv='reqsv' @submit='review' :txt='reviewTxt'></lgy-review>
		<lgy-wheelReq id="pwd" :parameter.sync="parameter"></lgy-wheelReq>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';
import md5 from '@/fbcsFxViews/libs/md5.js';

var _this, defaultPwd;


export default {
	data(){
		let bingo = {
			info: {
				userID: '', userPasswd: '', isModifyPasswdFlag: 1,
				isModifyDefaultPasswd: 0, expiredTimeFlag: '1'
			},
			isEdit: true,
			passwd: defaultPwd,
			again: defaultPwd,
			options: '',
			showReview: false,
			reqsv: {},
			reviewTxt: '',
			parameter: null,
		};
		return bingo;
	},
	props: {
		show: false,
		user: '',
	},
	methods:{
		close(){
			this.$emit('update:show', false);
		},
		defPwd(val){
			if(!val){ //默认
				this.passwd = this.again = defaultPwd;
			} else this.passwd = this.again = '';
		},
		submit(){
			if(!pass.call(this)) return;
			
			let params = Object.assign({}, this.info);
			params.url = 'userpasswd/modify';
			params.cmdID = '600009';
			params.userPasswd = md5(this.passwd);
			
			utils.post(params).then(function(res){
				let mess = `<p>${res.errinfo}</p>`;
				if(res.webUserFlag == 1){ //网络用户
					mess = `<p style="color: red">${_this.$t('fbcsFile.tips.webUser')}</p>` + mess;
				}
				utils.alert({txt: mess, type: res.errcode!='0'?0:1});
				_this.$emit('update:show', false);
			});
		},
		now(){
			if(!pass.call(this)) return;
			this.reqsv = {uri: 'userpasswd/modifyImmediately'};
			this.showReview = true;
		},
		review(obj){
			let params = Object.assign({},this.info);
			params.url = 'userpasswd/modifyImmediately';
			params.cmdID = '600010';
			params.userPasswd = md5(this.passwd);
			params.reviewer = obj.name;
			params.reviewerPassword = obj.pwd;
			params.reviewType = 1;
			
			utils.post(params).then(function(res){
				if(res.errcode != '0') return utils.alert({txt: res.errinfo});
				_this.$emit('update:show', false);
				if(res.webUserFlag == 1){ //网络用户
					let mess = `<p>${res.errinfo}</p>`;
					var time = 0;
					mess = `<p style="color: red">${_this.$t('fbcsFile.tips.webUser')}</p>` + mess;
					utils.alert({
						txt: mess,
						ok: () => {
							clearTimeout(time);
							_this.parameter = res;
						},
						type: 1
					});
					time = setTimeout(function(){
						utils.tipsHide();
						_this.parameter = res;
					}, 3200);
					return;
				}
				_this.parameter = res;
			});
		}
	},
	created(){
		_this = this;
		this.options = this.$t('fbcsFile.password.options');
		this.showReview = false;
		this.parameter = null;
		defaultPwd = '';
		getDefPwd();
	},
	watch: {
		show(){
			if(this.user) {
				var info = this.info;
				for (let k in info) info[k] = '';
				info.userID = this.user.userID;
				info.isModifyDefaultPasswd = 0;
				info.expiredTimeFlag = '1';
				this.isEdit = true;
				this.passwd = this.again = defaultPwd;
				getPwdTime();
				return
			}
			this.$emit('update:show', false);
			utils.confirm({txt: this.$t('fbcsFile.password.not'), btn: 1});
		}
	}
}

function pass(){
	let info = _this.info;
	info.isModifyPasswdFlag = _this.isEdit ? 1 : 0;
	
	if(_this.isEdit){ //1-修改密码
		if(info.isModifyDefaultPasswd){
			let txt = false, pwd = _this.passwd, err = 'fbcsFile.err.user.';
			if(!_this.passwd){
				txt = _this.$t('fbcsFile.password.pwdErr');
			}else if(!_this.again){
				txt = _this.$t('fbcsFile.password.againErr');
			}else if(_this.passwd!=_this.again){
				txt = _this.$t('fbcsFile.password.same');
			} else if (pwd.length < 8){
				txt = this.$t(err + 'pwdRule');
			} else if(/\s/.test(pwd)){ //(^\s|\s$)
				txt = this.$t(err + 'blank');
			} else if(pwd.indexOf(info.userID)>-1||pwd.indexOf(this.user.userName)>-1){
				txt = this.$t(err + 'noidName');
			} else if(/[^\w@#_\-\*]/.test(pwd)){
				txt = this.$t(err + 'special');
			} else {
				let i, num = 0,
					reg = [/[a-z]/,/[A-Z]/,/[0-9]/,/[@#_\-\*]/];
				for (i = 0; i < reg.length; i++) {
					if(reg[i].test(pwd)) num++;
				}
				if(num < 2){
					txt = this.$t(err + 'pwdRule');
				}
			}
			
			if(txt){
				utils.alert({txt});
				return false;
			}
		}
	}
	return true;
}

function getPwdTime(){
	let params = {
		url: 'userpasswd/queryExpiredFlag',
		cmdID: '600011',
		userID: _this.info.userID
	};
	utils.post(params).then(function(res){
		if(res.errcode != '0') return utils.alert({txt: res.errinfo});
		_this.info.expiredTimeFlag = res.userpasswdExpiredFlag;
	});
}

function getDefPwd(){
	let params = {
		url: 'userpasswd/queryDefaultPasswd',
		cmdID: '600012'
	};
	utils.post(params).then(function(res){
		if(res.errcode != '0') return console.warn('600012', res.errinfo);
		defaultPwd = res.defaultPasswd;
		_this.passwd = _this.again = defaultPwd;
	});
}
</script>

<style scoped="scoped">
	.right{margin-left: 10px;}
	.radio{line-height: 30px;}
</style>
