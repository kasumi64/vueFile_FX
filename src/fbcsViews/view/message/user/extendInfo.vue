<template>
	<div class="information">
		<ul class="fnField" v-if="fxAuth">
			<li id="ext-create" @click="addOPE">
				<img class="icon" src="@/fbcsFxViews/img/FnIcon/addTheme.png"/>
				<span class="label">{{$t('fbcsFile.advanced.information.addOPE')}}</span>
			</li>
		</ul>
		<!-- <p class="h2">{{$t('fbcsFile.advanced.information.resOPE')}}</p> -->
		<lgy-table id="ext-list" :list="listOPE" :title="titleOPE" :total="totalOPE" :defined="defined" :currentPage="pageOPE" @changePage="changeOPE" 
			:size='90000' stripe>
		</lgy-table>
		<!-- <p class="h2">{{$t('fbcsFile.advanced.information.resBOP')}}</p>
		<lgy-table :list="listBOP" :title="titleBOP" :total="totalBOP" :currentPage="pageBOP" @changePage="changeBOP" 
			:maxHeight="416" :size='90000'>
		</lgy-table> -->
		<el-dialog class="MX_dialog" :visible.sync="showInfo" :title="infoTitle" v-dialogDrag :close-on-click-modal='false' :show-close="false" width="830px">
			<ul ref="dBody" class="dBody over">
				<li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.advanced.user.userID')}}</p>
					</div><div class="right">
						<input id="ext-id" v-model="info.userID" disabled autocomplete="off"/>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">
							<i class="red">*</i>
							{{$t('fbcsFile.advanced.information.operatorName')}}：
						</p>
					</div><div class="right">
						<input id="ext-name" v-model="info.operatorName" @input="filter($event)" data-reg="[\%]" data-k="operatorName" maxlength="49" autocomplete="off"/>
						<span class="txt">{{$t('fbcsFile.err.info.operatorName')}}</span>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">
							<i class="red">*</i>
							{{$t('fbcsFile.advanced.information.mobileNum')}}：
						</p>
					</div><div class="right">
						<input id="ext-mobile" v-model="info.operatorMobileNum" @input="filter($event)" data-reg="[^\d\|]" data-k="operatorMobileNum" maxlength="511" autocomplete="off"/>
						<span class="txt">{{$t('fbcsFile.err.info.operatorMobileNum')}}</span>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.advanced.information.operatorEmail')}}：</p>
					</div><div class="right">
						<input id="ext-email1" v-model="info.operatorEmail" @input="filter($event)" data-reg="[^\w_\-@\.]" data-k="operatorEmail" maxlength="49" autocomplete="off"/>
						<span class="txt">{{$t('fbcsFile.err.info.operatorEmail')}}</span>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.advanced.information.telNum')}}：</p>
					</div><div class="right">
						<input id="ext-tel1" v-model="info.operatorTelNum" @input="filter($event)" data-reg="[^\d-+;]" data-k="operatorTelNum" maxlength="511" autocomplete="off"/>
						<span class="txt">{{$t('fbcsFile.err.info.operatorTelNum')}}</span>
					</div>
				</li>
				
				<li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.advanced.information.userAlarmSmsNum')}}：</p>
					</div><div class="right">
						<input id="ext-warn" v-model="info.userAlarmSmsNum" @input="filter($event)" data-reg="[^\d-+;]" data-k="userAlarmSmsNum" maxlength="512" autocomplete="off"/>
						<span class="txt">{{$t('fbcsFile.err.info.operationFax')}}</span>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.advanced.information.operationPhoneNum')}}：</p>
					</div><div class="right">
						<input id="ext-phone" v-model="info.operationPhoneNum" @input="filter($event)" data-reg="[^\d-+;]" data-k="operationPhoneNum" maxlength="512" autocomplete="off"/>
						<span class="txt">{{$t('fbcsFile.err.info.operationFax')}}</span>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.advanced.information.operationFax')}}：</p>
					</div><div class="right">
						<input id="ext-fax" v-model="info.operationFax" @input="filter($event)" data-reg="[^\d-+;]" data-k="operationFax" maxlength="512" autocomplete="off"/>
						<span class="txt">{{$t('fbcsFile.err.info.operationFax')}}</span>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.advanced.information.om_email')}}：</p>
					</div><div class="right">
						<input id="ext-email2" v-model="info.email" @input="filter($event)" data-reg="[^\w_\-@\.]" data-k="email" maxlength="512" autocomplete="off"/>
						<span class="txt">{{$t('fbcsFile.err.info.email')}}</span>
					</div>
				</li>
				
				<li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.advanced.information.ssccManager')}}：</p>
					</div><div class="right">
						<input id="ext-sscc" v-model="info.ssccManager" @input="filter($event)" data-reg="[\%]" data-k="ssccManager" maxlength="49" autocomplete="off"/>
						<span class="txt">{{$t('fbcsFile.err.info.ssccManager')}}</span>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.advanced.information.ssccManagerTelNum')}}：</p>
					</div><div class="right">
						<input id="ext-tel2" v-model="info.ssccManagerTelNum" @input="filter($event)" data-reg="[^\d-+;]" data-k="ssccManagerTelNum" maxlength="511" autocomplete="off"/>
						<span class="txt">{{$t('fbcsFile.err.info.ssccManagerTelNum')}}</span>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.advanced.information.ssccManagerMobileNum')}}：</p>
					</div><div class="right">
						<input id="ext-mobileNum" v-model="info.ssccManagerMobileNum" @input="filter($event)" data-reg="[^\d\|]" data-k="ssccManagerMobileNum" maxlength="511" autocomplete="off"/>
						<span class="txt">{{$t('fbcsFile.err.info.ssccManagerMobileNum')}}</span>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.advanced.information.operatorCompany')}}：</p>
					</div><div class="right">
						<input id="ext-company" v-model="info.operatorCompany" @input="filter($event)" data-reg='[\%]' data-k="operatorCompany" maxlength="199" autocomplete="off"/>
						<span class="txt">{{$t('fbcsFile.err.info.ssccManager')}}</span>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.advanced.information.operatorDepartment')}}：</p>
					</div><div class="right">
						<input id="ext-department" v-model="info.operatorDepartment" @input="filter($event)" data-reg="[\%]" data-k="operatorDepartment" maxlength="49" autocomplete="off"/>
						<span class="txt">{{$t('fbcsFile.err.info.ssccManager')}}</span>
					</div>
				</li>
			</ul>
			<div slot="footer" class="_footBtn">
				<button id="ext-save" class="blueBtn" @click="save">{{$t('fbcsFile.tips.ok')}}</button>
				<button id="ext-close" class="defBtn" @click="showInfo=false">{{$t('fbcsFile.tips.cancel')}}</button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';
import moment from 'moment';

var _this, data = {
	fxAuth: true,
	info: {
		userID: '', operatorName: '', operatorMobileNum: '', operatorEmail: '', operatorTelNum: '',
		ssccManager: '', ssccManagerTelNum:'', ssccManagerMobileNum:'', operatorCompany:'', operatorDepartment:'',
		//消息用
		email: '', userAlarmSmsNum: '', operationPhoneNum: '', operationFax: ''
	},
	idWords: null,
	listType: '', listItem: [],
	
	listOPE: [
		{userID: 'userID', operatorName: 'userName', operatorTelNum: 13570036088, operatorEmail: 'abc@sscc.com'},
	],
	pageOPE: 1, totalOPE: 1,
	listBOP: [
		{userID: 'userID', operatorName: 'userName', operatorTelNum: 13570036088, operatorEmail: 'abc@sscc.com'},
	],
	pageBOP: 1, totalBOP: 1,
	showDialog: false, dialogTitle: '',
	showInfo: false, infoTitle: '',
};
var idAll = [], args, isAdd, oldOperatorName;

function edit(row){
	isAdd = 'edit';
	_this.infoTitle = _this.$t('fbcsFile.advanced.information.editOPE');
	let info = _this.info;
	for (let k in info) info[k] = row[k] || '';
	oldOperatorName = row.operatorName;
	_this.showInfo = true;
}

function del(row){
	utils.confirm({
		txt: _this.$t('fbcsFile.advanced.information.del'),
		ok: () => {
			let params = {
				url: 'userinfoExt/deleteOperator',
				cmdID: '600012',
				userID: row.userID,
				operatorName: row.operatorName
			};
			utils.post(params).then(function(res){
				utils.alert({txt: res.errinfo, type: res.errcode!='0'?0:1});
				searchOPE();
			});
		}
	});
}

function valid(row){
	utils.confirm({
		txt: _this.$t('fbcsFile.advanced.information.valid'),
		ok: () => {
			let params = {
				url: 'userinfoExt/UpdateOperatorTime',
				cmdID: '600055',
				userID: row.userID,
				operatorName: row.operatorName
			};
			utils.post(params).then(function(res){
				utils.alert({txt: res.errinfo, type: res.errcode!=0?0:1});
				search('OPE');
			});
		}
	});
}

export default {
	data(){
		data.listItem = this.$t('fbcsFile.advanced.information.listType');
		data.titleOPE = {
			userID: this.$t('fbcsFile.tableTitle.userID'),
			userName: this.$t('fbcsFile.tableTitle.userName'),
			operatorName: this.$t('fbcsFile.advanced.information.operatorName'),
			operatorMobileNum: this.$t('fbcsFile.advanced.information.mobileNum'),
			operatorEmail: this.$t('fbcsFile.advanced.information.useEmail'),
			operatorTelNum: this.$t('fbcsFile.advanced.information.telNum'),
			ssccManager: this.$t('fbcsFile.advanced.information.ssccManager'),
			ssccManagerTelNum: this.$t('fbcsFile.advanced.information.ssccManagerTelNum'),
			ssccManagerMobileNum: this.$t('fbcsFile.advanced.information.ssccManagerMobileNum'),
			operatorCompany: this.$t('fbcsFile.advanced.information.company'),
			operatorDepartment: this.$t('fbcsFile.advanced.information.department'),
			updataTime: this.$t('fbcsFile.advanced.information.operatorUpdataTime')
		};
		data.defined = {
			label: this.$t('fbcsFile.tableTitle.operation'), width: 110,
			items: [
				{src:require('@/fbcsFxViews/img/table/edit.png'), click: edit, tips: this.$t('fbcsFile.tableDefined.editExt') },
				{src:require('@/fbcsFxViews/img/table/valid.png'), click: valid, tips: this.$t('fbcsFile.tableDefined.restore') },
				{src:require('@/fbcsFxViews/img/table/del.png'), click: del, tips: this.$t('fbcsFile.tableDefined.delExt') }
			]
		};
		if(!utils.getMxAuth) data.defined.items = [];
		data.titleBOP = {
			userID: this.$t('fbcsFile.tableTitle.userID'),
			userName: this.$t('fbcsFile.tableTitle.userName'),
			operatorName: this.$t('fbcsFile.advanced.information.operatorName'),
			operatorMobileNum: this.$t('fbcsFile.advanced.information.mobileNum'),
			operatorEmail: this.$t('fbcsFile.advanced.information.email'),
			ssccManager: this.$t('fbcsFile.advanced.information.ssccManager'),
			operatorCompany: this.$t('fbcsFile.advanced.information.company'),
			operatorDepartment: this.$t('fbcsFile.advanced.information.department')
		};
		return data;
	},
	methods:{
		search(){
			search();
		},
		changeOPE(num){
			this.pageOPE = num;
			search('OPE');
		},
		changeBOP(num){
			this.pageBOP = num;
			search('BOP');
		},
		idInput(val){
			if(val=='') return this.idWords = [].concat(idAll);
			utils.keywords({id: val}, arr => {
				_this.idWords = arr;
			});
		},
		addOPE(){
			isAdd = 'add';
			this.infoTitle = this.$t('fbcsFile.advanced.information.addOPE');
			let info = this.info;
			for (let k in info) info[k] = '';
			info.userID = args.userID;
			_this.showInfo = true;
			toTop(this, 'dBody',100);
		},
		filter(e){
			let el = e.target, str = el.value, k = el.dataset.k,
				reg = new RegExp(el.dataset.reg, 'g');
			if(reg.test(str)){
				// utils.alert({txt: this.$t('fbcsFile.err.info.' + k)});
				this.info[k] = str.replace(reg, '');
				utils.weakTips(this.$t('fbcsFile.err.info.' + k), 1);
			}
		},
		save(){
			let param = Object.assign({}, this.info);
			if(utils.isSpace(param.operatorName)) return utils.alert({txt: this.$t('fbcsFile.advanced.information.nameNull')});
			if(utils.isSpace(param.operatorMobileNum)) return utils.alert({txt: this.$t('fbcsFile.advanced.information.mobileNull')});
			let tell = param.operatorMobileNum;
			if(/\|$/.test(tell)){
				return utils.alert({txt: this.$t('fbcsFile.err.info.tell')});
			}
			let email = param.operatorEmail;
			if(email){
				if( !(/^[\w-]+(\.[\w-]+)*@[\w]+(\.[\w-]+)+$/g.test(email)) )
					return utils.alert({txt: this.$t('fbcsFile.err.info.emailFormat')});
			}
			email = param.email;
			if(email){
				if( !(/^[\w-]+(\.[\w-]+)*@[\w]+(\.[\w-]+)+$/g.test(email)) )
					return utils.alert({txt: this.$t('fbcsFile.err.info.optEmailFormat')});
			}
			
			if(isAdd == 'add'){
				param.url = 'userinfoExt/addOperator';
				param.cmdID = '600011';
			} else {
				param.url = 'userinfoExt/modifyOperator';
				param.cmdID = '600013';
				param.oldOperatorName = oldOperatorName;
			}
			
			param.operatorName = param.operatorName.trim();
			param.ssccManager = param.ssccManager.trim();
			
			utils.post(param).then(res => {
				utils.alert({txt: res.errinfo, type: res.errcode != '0' ? 0 : 1});
				if(res.errcode != '0') return;
				_this.showInfo = false;
				searchOPE();
			});
		}
	},
	created(){
		_this = this;
		this.fxAuth = utils.getMxAuth;
		args = utils.getArgs('userInfo');
		utils.once('fbcs_newUser', user => {
			args = user;
			init.call(_this);
		});
		init.call(this);
		/*utils.keywords({}, arr => {
			idAll = [].concat(arr);
			_this.idWords = arr;
		});*/
	}
}

function init(){
	this.listType = 'all';
	this.listOPE = this.listBOP = [];
	if(args&&args.userID) search('OPE');
}

function search(p){
	let type = p || _this.listType;
	if(type=='OPE'){
		_this.pageOPE = 1;
		searchOPE();
	} else if(type == 'BOP'){
		_this.pageBOP = 1;
		searchBOP();
	} else {
		_this.pageOPE = 1;
		searchOPE();
		_this.pageBOP = 1;
		searchBOP();
	}
}

function searchOPE(){
	let param = {};
	param.url = 'userinfoExt/query';
	param.cmdID = '600014';
	param.userID = args.userID;
	param.type = 0;
	
	utils.post(param).then(function(res){
		if(res.errcode!='0') { //清缓存历史
			_this.listOPE = [];
			_this.pageOPE = 1;
			_this.totalOPE = 0;
			return console.warn(res.errcode, res.errinfo);
		}
		if(res.count>1 && _this.pageOPE > res.count){
			_this.pageOPE = res.count;
			return searchOPE();
		}
		var obj;
		for (var i = 0; i < res.lists.length; i++) {
			obj = res.lists[i];
			obj.updataTime = moment(obj.operatorUpdateTime*1000).format('YYYY-MM-DD HH:mm:ss');
		}
		_this.listOPE = res.lists;
		_this.pageOPE = res.currentPage || 1;
		_this.totalOPE = res.count;
	});
}

function searchBOP(){
	let param = {};
	param.url = 'userinfoExt/queryBop';
	param.cmdID = '600025';
	param.userID = args.userID;
	
	utils.post(param).then(function(res){
		if(res.errcode!='0') { //清缓存历史
			_this.listBOP = [];
			_this.pageBOP = 1;
			_this.totalBOP = 0;
			return console.warn(res.errcode, res.errinfo);
		}
		if(res.count>1 && _this.pageBOP > res.count){
			_this.pageBOP = res.count;
			return searchBOP();
		}
		_this.listBOP = res.lists;
		_this.pageBOP = res.currentPage || 1;
		_this.totalBOP = res.count;
	});
}

function toTop(self, ref, delay){
	setTimeout(() => {
		let el = self.$refs[ref];
		if(el) el.scrollTop = 0;
	}, delay||0);
}

</script>

<style scoped="scoped">
	.information{padding-right: 20px;}
	.jg{margin-bottom: 10px;}
	.w80{width: 80px;text-align: right;}
	.h2{font-size: 16px;color: #333;margin-bottom: 10px;}
	#fbcs_MX .MX_dialog .left{width: 140px;}
	#fbcs_MX .MX_dialog .right .txt{margin-left: 10px;font-size: 12px;color: #999;}
	li{white-space: nowrap;}
	.over{height: 473px;overflow: overlay;}
</style>
