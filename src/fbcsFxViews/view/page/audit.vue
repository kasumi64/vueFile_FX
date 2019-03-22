<template>
	<div class="audit">
		<div class="searchBar">
			<label class="label">{{$t('fbcsFile.audit.operator')}}：</label>
			<input v-model="info.operator" class="words" :placeholder="$t('fbcsFile.searchBar.placeholder')" />
			<label class="label">{{$t('fbcsFile.audit.operatorType')}}：</label>
			<lgy-candidateWords v-model="info.operatorType" :keywords="idWords" @input="idInput" class="words"></lgy-candidateWords>
			<label class="label">{{$t('fbcsFile.audit.sort')}}</label>
			<el-radio-group v-model="info.sequence">
				<el-radio :label="0">{{$t('fbcsFile.audit.lately')}}</el-radio>
				<el-radio :label="1">{{$t('fbcsFile.audit.early')}}</el-radio>
			</el-radio-group>
			<p class="jg"></p>
			<label class="label">{{$t('fbcsFile.audit.times')}}</label>
			<el-radio-group v-model="radio" class="">
				<el-radio :label="2">{{$t('fbcsFile.audit.today')}}</el-radio>
				<el-radio :label="4">{{$t('fbcsFile.audit.week')}}</el-radio>
				<el-radio :label="6">{{$t('fbcsFile.audit.month')}}</el-radio>
				<el-radio :label="9">{{$t('fbcsFile.audit.begin')}}</el-radio>
			</el-radio-group>
			<!--<label class="label">{{$t('fbcsFile.audit.begin')}}</label>-->
			<el-date-picker v-model="info.operationBeginTime" class="picker words ml" type="datetime" :clearable="false" :editable="false"
				:picker-options="pickerBegin" value-format="timestamp" default-time="00:00:00" :disabled='radio!=9'>
			</el-date-picker>
			<label class="label">{{$t('fbcsFile.audit.end')}}</label>
			<el-date-picker v-model="info.operationEndTime" class="picker words" type="datetime" :clearable="false" :editable="false"
				:picker-options="pickerEnd" value-format="timestamp" default-time="23:59:59" :disabled='radio!=9'>
			</el-date-picker>
			<button class="blueBtn mr" @click="search">{{$t('fbcsFile.searchBar.search')}}</button>
		</div>
		<lgy-table :list="list" :title="title" :defined="defined" :total="total" :currentPage.sync="page" @changePage="changePage" >
		</lgy-table>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';

var _this, data = {
	idWords: null,
	radio: 0,
	info: {
		operator: '', operationType: '', sequence: 1 , 
		operationBeginTime: '', operationEndTime:''
	},
	list: [
		{operator: 'userID', reviewer: 'userName', operatorRole: 'ekeyName',operatorTime: 1535646546566, operatorType: 'ekeyComment'}
	],
	page: 1,
	total: 1,
	pickerBegin: {
		disabledDate(time){
			var boundary = new Date(_this.info.operationEndTime);
			boundary.setHours(23,59,59);
			return time > boundary;
		}
	},
	pickerEnd: {
		disabledDate(time){
			var boundary = new Date(_this.info.operationBeginTime);
			boundary.setHours(0, 0, 0);
			return time < boundary;
		}
	}
};
var keywords = [];

export default {
	data(){
		data.title = {
			operator: this.$t('fbcsFile.audit.operator'),
			reviewer: this.$t('fbcsFile.audit.reviewer'),
			operatorRole: this.$t('fbcsFile.audit.operatorRole'),
			operatorType: this.$t('fbcsFile.audit.operatorType'),
			operatorTime: this.$t('fbcsFile.audit.operatorTime'),
			errorCode: this.$t('fbcsFile.audit.errorCode'),
			errorInfo: this.$t('fbcsFile.audit.errorInfo'),
			uuid: this.$t('fbcsFile.audit.uuid')
		};
//		data.defined = {
//			label: this.$t('fbcsFile.tableTitle.operation'), width: 82,
//			items: [
//				{src:require('@/fbcsFxViews/img/logo.png'), click: showEditEkey, tips: this.$t('fbcsFile.tableDefined.editEkey') },
//				{src:require('@/fbcsFxViews/img/logo.png'), click: delEkey, tips: this.$t('fbcsFile.tableDefined.delEkey') },
//			]
//		};
		return data;
	},
	methods:{
		search(){
			this.page = 1;
			search();
		},
		changePage(num){
			search();
		},
		idInput(val){
			if(val=='') return this.idWords = [].concat(keywords);
			let i, arr = [], len = keywords.length, obj;
			for (i = 0; i < len; i++) {
				obj = keywords[i];
				if(obj.id.indexOf(val)>=0 || obj.name.indexOf(val)>=0) arr.push(obj);
			}
			this.idWords = arr;
		}
	},
	created(){
		_this = this;
		let k, info = this.info;
		for (k in info) info[k] = '';
		info.sequence = 0;
		this.radio = 2;
		operatorType();
		search();
	},
	watch: {
		radio(cur){
			getDay(cur);
		}
	}
};

function search(){
	let params = Object.assign({}, _this.info);
	params.url = 'operationRecording/query';
	params.cmdID = '600101';
	params.language = utils.langCode();
	params.pageSize = 20;
	params.currentPage = _this.page;
	
	utils.post(params).then(res => {
		if(res.errcode!='0') return console.warn(res.errcode, res.errinfo);
		if(res.totalPage>1 && _this.page > res.totalPage){
			_this.page = res.totalPage;
			return search();
		}
		_this.list = res.lists;
		_this.page = res.currentPage;
		_this.total = res.totalSize;
	});
}

function operatorType(){
	let param = {
		url: 'dict/query',
		cmdID: '600000',
		language: utils.langCode(),
		type: 3
	};
	
	utils.post(param).then(res => {
		if(res.errcode!='0') return console.warn(res.errcode, res.errinfo);
		let i, arr = res.lists, len = arr.length, obj;
		for (i = 0; i < len; i++) {
			obj = arr[i];
			obj.value = obj.id;
			obj.lable = obj.name;
		}
		keywords = [].concat(arr);
		_this.idWords = arr;
	});
}

function getDay(val){
	if(val==9) return;
	let begin, today = new Date();
	today.setHours(23,59,59);
	_this.info.operationEndTime = today.getTime();
	today.setHours(0,0,0);
	switch (val){
		case 4:
			today.setDate(today.getDate()-6);
			break;
		case 6:
			today.setDate(today.getDate()-29);
			break;
		default: break;
	}
	_this.info.operationBeginTime = today.getTime();
}
</script>

<style scoped="scoped">
.audit{min-width: 990px;}
.jg{margin-top: 10px;}
.el-radio+.el-radio{margin-left: 10px;}
.ml{margin-left: 10px;}
.mr{margin-right: 20px;}
</style>