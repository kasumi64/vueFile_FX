<template>
	<div class="advancedAudit">
		<header class="backHead">
			<span class="back" @click="back">&lt; {{$t('fbcsFile.tips.back')}}</span>
			<b class="h1">{{this.$t('fbcsFile.advanced.audit.title')}}</b>
		</header>
		<div class="searchBar">
			<label class="label">{{$t('fbcsFile.audit.operator')}}：</label>
			<input v-model="info.operator" class="words" :placeholder="$t('fbcsFile.searchBar.placeholder')" autocomplete="off"/>
			<label class="label">{{$t('fbcsFile.audit.operatorType')}}：</label>
			<lgy-candidateWords v-model="info.operationType" :keywords="idWords" @input="idInput" class="words"></lgy-candidateWords>
			<el-checkbox-group ref="linkage" v-model="linkage" class="linkage">
				<el-checkbox label="ekeyFlag">Ekey</el-checkbox>
				<el-checkbox label="commFlag">{{$t('fbcsFile.advanced.audit.commFlag')}}</el-checkbox>
				<el-checkbox label="userextFlag">{{$t('fbcsFile.advanced.audit.userextFlag')}}</el-checkbox>
			</el-checkbox-group>
			<label class="label">{{$t('fbcsFile.audit.sort')}}</label>
			<el-radio-group v-model="info.sequence" class="mr20">
				<el-radio :label="0">{{$t('fbcsFile.audit.lately')}}</el-radio>
				<el-radio :label="1">{{$t('fbcsFile.audit.early')}}</el-radio>
			</el-radio-group>
			<p class="jg"></p>
			<label class="label">{{$t('fbcsFile.audit.times')}}</label>
			<el-radio-group v-model="radio">
				<el-radio :label="2">{{$t('fbcsFile.audit.today')}}</el-radio>
				<el-radio :label="4">{{$t('fbcsFile.audit.week')}}</el-radio>
				<el-radio :label="6">{{$t('fbcsFile.audit.month')}}</el-radio>
				<el-radio :label="9">{{$t('fbcsFile.audit.begin')}}</el-radio>
			</el-radio-group>
			<!--<label class="label">{{$t('fbcsFile.audit.begin')}}</label>-->
			<el-date-picker v-model="info.operationBeginTime" class="picker words ml" type="datetime" :clearable="false" :editable="false"
				value-format="timestamp" default-time="00:00:00" :disabled='radio!=9'>
			</el-date-picker>
			<label class="label">{{$t('fbcsFile.audit.end')}}</label>
			<el-date-picker v-model="info.operationEndTime" class="picker words" type="datetime" :clearable="false" :editable="false"
				value-format="timestamp" default-time="23:59:59" :disabled='radio!=9'>
			</el-date-picker>
			<button class="blueBtn mr20" @click="search">{{$t('fbcsFile.searchBar.search')}}</button>
		</div>
		<ul class="fnField">
			<li @click="expcsv">
				<img class="icon" src="@/fbcsFxViews/img/FnIcon/exportTheme.png"/>
				<span class="label">{{$t('fbcsFile.advanced.audit.expcsv')}}</span>
			</li>
		</ul>
		<lgy-table :list="list" :title="title" :width="width" :total="total" :currentPage="page" @changePage="changePage"
			:cellClass="cellClass">
		</lgy-table>
		<el-dialog :visible.sync="showDialog" :title="$t('fbcsFile.tableDefined.detail')" v-dialogDrag :close-on-click-modal='false' :show-close="false">
			<div class="_dialog">
				<el-table :data="cuList" :row-class-name="rowClass" max-height="294" highlight-current-row border>
					<el-table-column prop="cuName" :label="$t('fbcsFile.dispatch.cuName')"></el-table-column>
					<el-table-column prop="nodeName" :label="$t('fbcsFile.dispatch.nodeName')"></el-table-column>
					<el-table-column prop="errStr" :label="$t('fbcsFile.dispatch.errcode')">
						<span slot-scope="scope" :class="{red: scope.row.errStr!='success'}">
							{{scope.row.errStr}}
						</span>
					</el-table-column>
					<el-table-column prop="errinfo" :label="$t('fbcsFile.dispatch.errinfo')"></el-table-column>
					<!--<el-table-column v-if="checkType==1" prop="operationType" :label="$t('fbcsFile.dispatch.type')"></el-table-column>-->
				</el-table>
			</div>
			<div slot="footer" class="_footBtn">
				<button class="defBtn" @click="showDialog=false">{{$t('fbcsFile.tips.close')}}</button>
			</div>
		</el-dialog>
		<el-dialog :visible.sync="showDialog2" :title="$t('fbcsFile.advanced.audit.expcsv')" v-dialogDrag :close-on-click-modal='false' :show-close="false">
			<ul class="_dialog">
				<li>
					<span class="txt w80">{{$t('fbcsFile.advanced.user.fileName')}}</span>
					<a class="a" :href="fileHref">{{fileName}}</a>
				</li><li>
					<p class="txt rClick">{{$t('fbcsFile.tips.rightClick')}}</p>
				</li>
			</ul>
			<div slot="footer" class="_footBtn">
				<button class="defBtn" @click="showDialog2=false">{{$t('fbcsFile.tips.close')}}</button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';
import moment from 'moment';

var _this, data = {
	idWords: null,
	radio: 0,
	info: {
		operator: '', operationType: '', sequence: 1 , 
		operationBeginTime: '', operationEndTime:''
	},
	list: [
		{operator: 'userID', reviewer: 'userName', operationType: 'ekeyName',ymd: 1535646546566, errInfo: 'ekeyComment', uuid: 'uuid'}
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
	},
	showDialog: false,
	cuList: [],
	cellClass(row, cellIndex){
		if(row.errStr != 'success' && cellIndex == 6){
			return 'red';
		} else if (cellIndex == 2){
			return 'preWrap';
		}
	},
	linkage: [],
	showDialog2: false,
	fileHref: '#', fileName: ''
};
var keywords = [];

function detail(row){
	_this.cuList = [];
	_this.showDialog = true;
	let param = {
		url: 'batchDispatch/queryBatchDispatchResponse',
		cmdID: '600083', uuid: row.uuid,
		type: 0, lastQueryFlag: 1
	};
	utils.post(param).then(res => {
		if(res.errcode != '0') {
			utils.alert({txt: res.errinfo});
			return _this.showDialog = false;
		}
		var obj, i, arr = res.lists||[];
		for (i = 0; i < arr.length; i++){
			obj = arr[i];
			obj.errStr = obj.errcode == '0' ? 'success' : 'failed';
		}
		_this.cuList = arr;
	});
}

export default {
	data(){
		data.title = {
			ymd: this.$t('fbcsFile.audit.operatorTime'),
			operationType: this.$t('fbcsFile.audit.operatorType'),
			errInfo: this.$t('fbcsFile.audit.errorInfo'),
			operator: this.$t('fbcsFile.audit.operator'),
			reviewer: this.$t('fbcsFile.audit.reviewer'),
			role: this.$t('fbcsFile.audit.operatorRole'),
			// errCode: this.$t('fbcsFile.audit.errorCode'),
			errStr: this.$t('fbcsFile.audit.errorCode'),
//			uuid: this.$t('fbcsFile.audit.uuid')
		};
		data.width = {
			ymd: 160,
			operationType: 140,
			errInfo: 800,
			errStr: 120
		};
		return data;
	},
	methods:{
		back(){
			this.$router.push({path: '/main/fxCfg/audit'});
		},
		rowClass({row, rowIndex}){
			if(rowIndex%2 != 0) return 'tableBG';
			return '';
		},
		search(){
			this.page = 1;
			search();
		},
		changePage(num){
			this.page = num;
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
		},
		expcsv(){
			this.showDialog2 = true;
			this.fileName = '';
			let params = Object.assign({}, _this.info);
			params.url = 'advancedSearch/operationRecording';
			params.cmdID = '600058';
			params.language = utils.langCode();
			params.pageSize = _this.total;
			params.currentPage = 1;
			params.type = 1;
			params.commFlag = 0;
			params.ekeyFlag = 0;
			params.userextFlag = 0;
			
			let j, links = {ekeyFlag: 1, commFlag: 1, userextFlag: 1};
			for (j = 0; j < _this.linkage.length; j++) {
				let k = _this.linkage[j];
				params[k] = links[k];
			}
			
			utils.post(params).then(res => {
				if(res.errcode!='0') return utils.alert({txt: res.errinfo});
				if(!res.errinfo) return;
				_this.fileHref = res.errinfo;
				_this.fileName = res.errinfo.split('/').pop();
			});
		},
	},
	created(){
		_this = this;
		let k, info = this.info;
		for (k in info) info[k] = '';
		info.sequence = 0;
		this.showDialog = this.showDialog2 =false;
		this.linkage = this.list = [];
		getDay(this.radio = 2);
		operatorType();
		this.search();
	},
	watch: {
		radio(cur){
			getDay(cur);
		},
		info: {
		    handler: function(obj) {
		    	let type = obj.operationType,
		    		el = this.$refs['linkage'].$el;
		    	if(type=='用户' || type=='user'){
		    		el.style.display = 'inline';
		    	} else {
		    		el.style.display = 'none';
		    		this.linkage = [];
		    	}
		    },
		    deep: true
		}
	}
};

function search(){
	let params = Object.assign({}, _this.info);
	params.url = 'advancedSearch/operationRecording';
	params.cmdID = '600058';
	params.language = utils.langCode();
	params.pageSize = 20;
	params.currentPage = _this.page;
	params.type = 0;
	params.commFlag = 0;
	params.ekeyFlag = 0;
	params.userextFlag = 0;
	
	let begin = params.operationBeginTime, end = params.operationEndTime;
	if(begin || end){
		begin = parseInt(begin/1000);
		end = parseInt(end/1000);
		if(begin==''||end==''||begin > end) {
			return utils.alert({txt: _this.$t('fbcsFile.err.user.day')});
		}
	}
	
	let j, links = {ekeyFlag: 1, commFlag: 1, userextFlag: 1};
	for (j = 0; j < _this.linkage.length; j++) {
		let k = _this.linkage[j];
		params[k] = links[k];
	}
	
	utils.post(params).then(res => {
		if(res.errcode!='0') { //清缓存历史
			_this.list = [];
			_this.page = 1;
			_this.total = 0;
			return console.warn(res.errcode, res.errinfo);
		}
		if(res.totalPage>0 && _this.page > res.totalPage){
			_this.page = res.totalPage;
			return search();
		}
		let i, len = res.lists.length, obj;
		let zh = {'1':'运维', '2':'客户', '3':'系统定时任务', '4':'cu主导任务'},
			en = {'1':'operator', '2':'user', '3':'timer', '4':'cu'};
		var dictRole = utils.langCode() == 0 ? zh : en;
		for (i = 0; i < len; i++) {
			obj = res.lists[i];
			if(obj.operationTime){
				obj.ymd = moment(obj.operationTime).format('YYYY-MM-DD HH:mm:ss');
			} else {
				obj.operationTime = obj.ymd = '';
			}
			obj.role = dictRole[obj.operatorRole] || '';
			obj.uuidBtn = obj.uuid ? true : false;
			switch(obj.errCode){
				case '0': obj.errStr = 'success';break;
				case '1': obj.errStr = 'partial success';break;
				default: obj.errStr = 'failed';break;
			}
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
			obj.value = obj.name;
			obj.label = obj.name;
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
.advancedAudit{min-width: 1050px;}
.jg{margin-top: 10px;}
.el-radio+.el-radio{margin-left: 10px;}
.ml{margin-left: 10px;}
.linkage{display: none;margin-right: 35px;margin-left: -20px;}
.linkage .el-checkbox+.el-checkbox{margin-left: 10px;}
.w80{width: 122px;text-align: right;}
.red{color: red;}
</style>
