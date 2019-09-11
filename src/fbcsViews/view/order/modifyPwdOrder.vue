<template>
	<div class="modifyPwd">
		<el-dialog :visible.sync="show" :title="$t('fbcsFile.order.pwdOrder.title')" v-dialogDrag width="600px"
			:close-on-click-modal='false' :show-close="false">
			<div class="MX_dialog">
				<li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.order.editBiz.bizKey')}}</p>
					</div><div class="right">
						<input v-model="info.bizKey" disabled autocomplete="off"/>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.password.id')}}</p>
					</div><div class="right">
						<input v-model="info.userID" disabled autocomplete="off"/>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.password.pwd')}}</p>
					</div><div class="right">
						 <el-checkbox v-model="isEdit"></el-checkbox>
					</div>
				</li><li v-if="isEdit">
					<div class="left">
						<p class="txt">{{$t('fbcsFile.password.reset')}}</p>
					</div><div class="right">
						 <el-radio-group v-model="info.isModifyDefaultPasswd" @change="defPwd" class="radio">
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
						<input v-model="passwd" :disabled="info.isModifyDefaultPasswd==0" maxlength="18" autocomplete="off"/>
					</div>
				</li><li v-if="isEdit">
					<div class="left">
						<p class="txt">
							<span  v-if="info.isModifyDefaultPasswd==1" class="red">*</span>
							{{$t('fbcsFile.password.again')}}
						</p>
					</div><div class="right">
						<input v-model="again" :disabled="info.isModifyDefaultPasswd==0" maxlength="18" autocomplete="off"/>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.password.indate')}}</p>
					</div><div class="right">
						<el-select v-model="info.expiredTimeFlag">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">
							<span class="red">*</span>
							{{$t('fbcsFile.order.editBiz.remark')}}
						</p>
					</div><div class="right">
						<input v-model="info.remark" maxlength="128" autocomplete="off"/>
					</div>
				</li>
			</div>
			<div slot="footer" class="_footBtn">
				<!-- <button class="blueBtn" @click="now">{{$t('fbcsFile.tips.now')}}</button> -->
				<button class="blueBtn" @click="submit">{{$t('fbcsFile.tips.modify')}}</button>
				<button class="defBtn" @click="close">{{$t('fbcsFile.tips.back')}}</button>
			</div>
		</el-dialog>
		<lgy-review :show.sync='showReview' :reqsv='reqsv' @submit='review' :txt='reviewTxt'></lgy-review>
		<lgy-wheelReq :parameter.sync="parameter"></lgy-wheelReq>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';
import md5 from '@/fbcsFxViews/libs/md5.js';

var _this, defaultPwd, 
data = {
	info: {
		userID: '', userPasswd: '', isModifyPasswdFlag: 1,
		isModifyDefaultPasswd: 0, expiredTimeFlag: '1',
		bizKey: '', operator: '', remark: ''
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

export default {
	data(){ return data;},
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
			params.url = 'userpasswdcmd/modify';
			params.cmdID = '700031';
			params.userPasswd = md5(this.passwd);
			params.operator = utils.userName();
			
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
			this.reqsv = {
				url: 'mx/userpasswd/modifyImmediately',
				cmdID: '600112',
				uri: 'mx/userinfocmd/'
			};
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
					mess = `<p style="color: red">${_this.$t('fbcsFile.tips.webUser')}</p>` + mess;
					utils.alert({
						txt: mess,
						ok: () => { _this.parameter = res; },
						type: 1
					});
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
				info.bizKey = this.user.bizKey;
				info.remark = this.user.remark || '';
				info.operator = utils.userName();
				getPwdTime();
				return
			}
			this.$emit('update:show', false);
			// utils.confirm({txt: this.$t('fbcsFile.password.not'), btn: 1});
		}
	}
}

function pass(){
	let info = _this.info;
	info.isModifyPasswdFlag = _this.isEdit ? 1 : 0;
	if(info.remark.trim()==''){
		utils.alert({txt: _this.$t('fbcsFile.order.manage.remarks')});
		return false;
	}
	
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
	.MX_dialog input{width: 208px;}
</style>
