<template>
	<div class="modifyPwd">
		<el-dialog :visible.sync="show" title="修改用户密码" v-dialogDrag :close-on-click-modal='false' :show-close="false">
			<div class="_dialog">
				<li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.password.id')}}</p>
					</div><div class="right">
						<input v-model="info.userID" disabled />
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
						<input v-model="passwd" :disabled="info.isModifyDefaultPasswd==0" maxlength="18"/>
					</div>
				</li><li v-if="isEdit">
					<div class="left">
						<p class="txt">
							<span  v-if="info.isModifyDefaultPasswd==1" class="red">*</span>
							{{$t('fbcsFile.password.again')}}
						</p>
					</div><div class="right">
						<input v-model="again" :disabled="info.isModifyDefaultPasswd==0" maxlength="18"/>
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
				</li>
			</div>
			<div slot="footer" class="_footBtn">
				<button class="blueBtn" @click="now">{{$t('fbcsFile.tips.now')}}</button>
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

var _this, data = {
	info: {
		userID: '', userPasswd: '', isModifyPasswdFlag: 1,
		isModifyDefaultPasswd: 0, expiredTimeFlag: '1'
	},
	isEdit: true,
	passwd: '111111',
	again: '111111',
	options: '',
	showReview: false,
	reqsv: {},
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
				this.passwd = this.again = '111111';
			}
		},
		submit(){
			if(!pass()) return;
			
			let params = Object.assign({}, this.info);
			params.url = 'userpasswd/modify';
			params.cmdID = '600009';
			params.userPasswd = md5(this.passwd);
			
			utils.post(params).then(function(res){
				utils.alert({txt: res.errinfo, type: res.errcode!='0'?0:1});
			});
		},
		now(){
			if(!pass()) return;
			this.reqsv = {uri: 'userpasswd/modifyImmediately'};
			this.showReview = true;
		},
		review(obj){
			let params = Object.assign({},this.info);
			params.url = 'userpasswd/modifyImmediately';
			params.cmdID = '600010';
			params.userPasswd = md5(this.passwd);
			params.reviewer = obj.name;
			
			utils.post(params).then(function(res){
				if(res.errcode != '0') return utils.alert({txt: res.errinfo});
				_this.parameter = res;
			});
		}
	},
	created(){
		_this = this;
		this.options = this.$t('fbcsFile.password.options');
		this.showReview = false;
		this.parameter = null;
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
				this.passwd = this.again = '111111';
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
			let txt = '';
			if(!_this.passwd){
				txt = _this.$t('fbcsFile.password.pwdErr');
			}else if(!_this.again){
				txt = _this.$t('fbcsFile.password.againErr');
			}else if(_this.passwd!=_this.again){
				txt = _this.$t('fbcsFile.password.same');
			}
			if(txt){
				utils.confirm({txt, btn: 1});
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
</script>

<style scoped="scoped">
	.right{margin-left: 10px;}
	.radio{line-height: 30px;}
</style>