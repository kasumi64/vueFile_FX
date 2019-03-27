<template>
	<div class="information">
		<!--<div class="searchBar">
			<label class="label">{{$t('fbcsFile.advanced.information.listName')}}</label>
			<el-select v-model="listType" class="words">
				<el-option v-for="item in listItem" :key="item.val" :label="item.label" :value="item.val">
				</el-option>
			</el-select>
			<label class="label">{{$t('fbcsFile.advanced.user.userID')}}</label>
			<lgy-candidateWords v-model="info.userID" :keywords="idWords" @input="idInput" class="words" ></lgy-candidateWords>
			<label class="label">{{$t('fbcsFile.advanced.user.userName')}}</label>
			<input v-model="info.userName" class="words" :placeholder="$t('fbcsFile.searchBar.placeholder')" />
			<p class="jg"></p>
			<label class="label">{{$t('fbcsFile.advanced.information.company')}}</label>
			<input v-model="info.opeartorCompany" class="words" :placeholder="$t('fbcsFile.searchBar.placeholder')" />
			<label class="label">{{$t('fbcsFile.advanced.information.ssccManager')}}</label>
			<input v-model="info.SSCCManager" class="words" :placeholder="$t('fbcsFile.searchBar.placeholder')" />
			<button class="blueBtn words" @click="search">{{$t('fbcsFile.searchBar.search')}}</button>
		</div>-->
		<ul class="fnField">
			<li @click="addOPE">
				<img class="icon" src="@/fbcsFxViews/img/FnIcon/addTheme.png"/>
				<span class="label">{{$t('fbcsFile.advanced.information.addOPE')}}</span>
			</li>
		</ul>
		<p class="h2">{{$t('fbcsFile.advanced.information.resOPE')}}</p>
		<lgy-table :list="listOPE" :title="titleOPE" :total="totalOPE" :defined="defined" :currentPage.sync="pageOPE" @changePage="changeOPE" 
			:maxHeight="416" :size='90000'>
		</lgy-table>
		<p class="h2">{{$t('fbcsFile.advanced.information.resBOP')}}</p>
		<lgy-table :list="listBOP" :title="titleBOP" :total="totalBOP" :currentPage.sync="pageBOP" @changePage="changeBOP" 
			:maxHeight="416" :size='90000'>
		</lgy-table>
		<el-dialog :visible.sync="showInfo" :title="infoTitle" v-dialogDrag :close-on-click-modal='false' :show-close="false">
			<ul class="_dialog">
				<li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.advanced.user.userID')}}</p>
					</div><div class="right">
						<input v-model="info.userID" disabled/>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.advanced.information.operatorName')}}：</p>
					</div><div class="right">
						<input v-model="info.operatorName" />
					</div>
				</li><li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.advanced.information.mobileNum')}}：</p>
					</div><div class="right">
						<input v-model="info.operatorMobileNum" />
					</div>
				</li><li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.advanced.information.email')}}：</p>
					</div><div class="right">
						<input v-model="info.operatorEmail" />
					</div>
				</li><li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.advanced.information.telNum')}}：</p>
					</div><div class="right">
						<input v-model="info.operatorTelNum" />
					</div>
				</li><li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.advanced.information.ssccManager')}}：</p>
					</div><div class="right">
						<input v-model="info.SSCCManager" />
					</div>
				</li>
			</ul>
			<div slot="footer" class="_footBtn">
				<button class="blueBtn" @click="save">{{$t('fbcsFile.tips.ok')}}</button>
				<button class="defBtn" @click="showInfo=false">{{$t('fbcsFile.tips.cancel')}}</button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';

var _this, data = {
	info: {
		userID: '', operatorName: '', operatorMobileNum: '', operatorEmail: '',
		operatorTelNum: '', SSCCManager: ''
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
var idAll = [], args, isAdd;

function edit(row){
	isAdd = 'edit';
	_this.infoTitle = _this.$t('fbcsFile.advanced.information.addOPE');
	let info = _this.info;
	for (let k in info) info[k] = row[k] || '';
	_this.showInfo = true;
}

function del(row){
	utils.confirm({
		txt: _this.$t('fbcsFile.advanced.information.del'),
		ok: () => {
			let params = {
				url: 'userinfoExt/deleteOperator',
				cmdID: '600022',
				userID: row.userID,
				operatorName: row.operatorName
			};
			utils.post(params).then(function(res){
				utils.alert({txt: res.errinfo, type: res.errcode!='0'?0:1});
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
			operatorEmail: this.$t('fbcsFile.advanced.information.email'),
			operatorTelNum: this.$t('fbcsFile.advanced.information.telNum'),
			SSCCManager: this.$t('fbcsFile.advanced.information.ssccManager')
		};
		data.defined = {
			label: this.$t('fbcsFile.tableTitle.operation'), width: 82,
			items: [
				{src:require('@/fbcsFxViews/img/table/edit.png'), click: edit, tips: this.$t('fbcsFile.tableDefined.editExt') },
				{src:require('@/fbcsFxViews/img/table/del.png'), click: del, tips: this.$t('fbcsFile.tableDefined.delExt') },
			]
		};
		data.titleBOP = {
			userID: this.$t('fbcsFile.tableTitle.userID'),
			userName: this.$t('fbcsFile.tableTitle.userName'),
			operatorName: this.$t('fbcsFile.advanced.information.operatorName'),
			operatorEmail: this.$t('fbcsFile.advanced.information.email'),
			operatorTelNum: this.$t('fbcsFile.advanced.information.telNum'),
			SSCCManager: this.$t('fbcsFile.advanced.information.ssccManager'),
			opeartorCompany: this.$t('fbcsFile.advanced.information.company'),
			opeartorDepartment: this.$t('fbcsFile.advanced.information.department')
		};
		return data;
	},
	methods:{
		search(){
			search();
		},
		changeOPE(num){
			search('OPE');
		},
		changeBOP(num){
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
			this.infoTitle = this.$t('fbcsFile.advanced.information.editOPE');
			let info = this.info;
			for (let k in info) info[k] = '';
			info.userID = args.userID;
			_this.showInfo = true;
		},
		save(){
			let param = Object.assign({}, this.info);
			if(isAdd == 'add'){
				param.url = 'userinfoExt/addOperator';
				param.cmdID = '600021';
			} else {
				param.url = 'userinfoExt/modifyOperator';
				param.cmdID = '600023';
			}
			
			utils.post(param).then(res => {
				utils.alert({txt: res.errinfo, type: res.errcode!='0'?0:1});
				_this.showInfo = false;
			});
		}
	},
	created(){
		_this = this;
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
//	this.listOPE = this.listBOP = [];
	if(args&&args.userID) search('all');
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
	param.url = 'userinfoExt/queryOperator';
	param.cmdID = '600024';
	param.userID = args.userID;
	
	utils.post(param).then(function(res){
		if(res.errcode!='0') return console.warn(res.errcode, res.errinfo);
		/*if(res.totalPage>1 && _this.pageOPE > res.totalPage){
			_this.pageOPE = res.totalPage;
			return searchOPE();
		}*/
//		_this.listOPE = res.lists;
		_this.pageOPE = res.currentPage;
		_this.totalOPE = res.totalSize;
	});
}

function searchBOP(){
	let param = {};
	param.url = 'userinfoExt/queryBop';
	param.cmdID = '600025';
	param.userID = args.userID;
	
	utils.post(param).then(function(res){
		if(res.errcode!='0') return console.warn(res.errcode, res.errinfo);
		/*if(res.totalPage>1 && _this.pageBOP > res.totalPage){
			_this.pageBOP = res.totalPage;
			return searchOPE();
		}*/
//		_this.listBOP = res.lists;
		_this.pageBOP = res.currentPage;
		_this.totalBOP = res.totalSize;
	});
}

</script>

<style scoped="scoped">
	.information{min-width: 860px;}
	.jg{margin-bottom: 10px;}
	.w80{width: 80px;text-align: right;}
	.h2{font-size: 16px;color: #333;margin-bottom: 10px;}
</style>