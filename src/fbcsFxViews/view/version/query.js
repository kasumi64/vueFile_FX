import utils from '@/fbcsFxViews/libs/utils.js';

var _this, data = {
	radio: 0,
	info: {
		type: '', beginTime: '', endTime:'', 
		pageSize: 20, 
	},
	list: [
		{type: 'userID', version: 'userName', versionPath: 'ekeyName',operationTime: '2019/02/26 14:14', fileSize:true},
		{type: 'userID', version: 'userName', versionPath: 'ekeyName',operationTime: '2019/02/26 14:14', fileSize:false},
		{type: 'userID', version: 'userName', versionPath: 'ekeyName',operationTime: '2019/02/26 14:14', fileSize:true}
	],
	page: 1,
	total: 1,
	pickerBegin: {
		disabledDate(time){
			var boundary = new Date(_this.info.endTime);
			boundary.setHours(23,59,59);
			return time > boundary;
		}
	},
	pickerEnd: {
		disabledDate(time){
			var boundary = new Date(_this.info.beginTime);
			boundary.setHours(0, 0, 0);
			return time < boundary;
		}
	},
	showDialog: false,
	detailList: [
		{},
	],
	showReview: false,
	reqsv: {},
	reviewTxt: '',
	parameter: null,
	
};
var rollRow;

function detail1(row){
	let params = {
		url: 'version/querySize',
		cmdID: '600075',
		type: row.type,
		version: row.version
	};
	utils.post(params).then(function(res){
		if(res.errcode!=0) return utils.alert({txt: res.errinfo});
		_this.detailList = res.lists;
		_this.showDialog = true;
	});
}
function detail2(row){
	utils.setArgs('version', row);
	_this.$router.push({path: '/main/fxCfg/version/detail'});
}
function review(row, scope, uri){
	rollRow = row;
	_this.reviewTxt = _this.$t('fbcsFile.versionQuery.rollback');
	_this.reqsv = {uri:uri || 'version/rollback'};
	_this.showReview = true;
}

function rollback(obj){
	let params = {
		url: obj.uri,
		cmdID: '600073',
		reviewer: obj.name,
		version: rollRow.version
	};
	utils.post(params).then(function(res){
		if(res.errcode!=0) return utils.alert({txt: res.errinfo});
		_this.parameter = res;
	});
}
function bigVer(obj){
	let params = {
		url: obj.uri,
		cmdID: '600076',
		reviewer: obj.name
	};
	utils.post(params).then(function(res){
		if(res.errcode!=0) return utils.alert({txt: res.errinfo});
		_this.parameter = res;
	});
}

export default {
	data(){
		data.options = this.$t('fbcsFile.versionQuery.options');
		data.title = {
			type: this.$t('fbcsFile.versionQuery.type'),
			version: this.$t('fbcsFile.versionQuery.version'),
			versionPath: this.$t('fbcsFile.versionQuery.versionPath'),
			operationTime: this.$t('fbcsFile.versionQuery.operationTime'),
			operater: this.$t('fbcsFile.versionQuery.operater'),
			reviewer: this.$t('fbcsFile.versionQuery.reviewer'),
			operationType: this.$t('fbcsFile.versionQuery.operationType')
		};
		data.defined = {
			label: this.$t('fbcsFile.tableTitle.operation'), width: 112,
			items: [
				{src:require('@/fbcsFxViews/img/table/restore.png'), click: review, tips: this.$t('fbcsFile.tableDefined.back')},
				{src:require('@/fbcsFxViews/img/table/detail.png'), click: detail1, tips: this.$t('fbcsFile.tableDefined.detail'), enable: 'fileSize'},
				{src:require('@/fbcsFxViews/img/table/attachment.png'), click: detail2, tips: this.$t('fbcsFile.tableDefined.detail'),enable: 'zdCfg'},
			]
		}
		return data;
	},
	methods:{
		rowClass({row, rowIndex}){
			if(rowIndex%2 != 0) return 'tableBG';
			return '';
		},
		search(){
			this.page = 1;
			search();
		},
		changePage(num){
			search();
		},
		submit(obj){
			switch (obj.uri){
				case "version/rollback": 
					rollback(obj); break;
				case "version/createBigVersion": 
					bigVer(obj); break;
				default: break;
			}
		},
		bigVer(){
			review('','','version/createBigVersion');
		},
		getCfg(){
			let params = {
				url: 'version/querySize',
				cmdID: '600075',
				type: row.type,
				version: row.version
			};
			utils.post(params).then(function(res){
				if(res.errcode!=0) return utils.alert({txt: res.errinfo});
				_this.list = res.lists;
				_this.showDialog = true;
			});
		},
		newVer(){
			let params = {
				url: 'version/querySize',
				cmdID: '600075',
				type: row.type,
				version: row.version
			};
			utils.post(params).then(function(res){
				if(res.errcode!=0) return utils.alert({txt: res.errinfo});
				_this.list = res.lists;
				_this.showDialog = true;
			});
		},
	},
	created(){
		_this = this;
		let k, info = this.info;
		for (k in info) info[k] = '';
		info.type = '0';
		info.pageSize = 20; 
		this.page = 1;
		this.radio = 4;
		this.search();
	},
	watch: {
		radio(cur){
			getDay(cur);
		}
	}
};

function search(){
	let params = Object.assign({}, _this.info);
	params.url = 'version/queryLists';
	params.cmdID = '600071';
	params.currentPage = _this.page;
	console.log(params)
	utils.post(params).then(res => {
		if(res.errcode!='0') return utils.alert({txt: res.errinfo});
		if(res.totalPage>1 && _this.page > res.totalPage){
			_this.page = res.totalPage;
			return search();
		}
		let i, len = res.lists.length, obj;
		for (let i = 0; i < len; i++) {
			obj = res.lists[i]; 
			switch (obj.type){
				case 4: case 8: 
					obj.fileSize = false; //版本文件大小
					obj.zdCfg = true; //中登配置
					break;
				default:
					obj.fileSize = true;
					obj.zdCfg = false;
					break;
			}
		}
		_this.list = res.lists;
		_this.page = res.currentPage;
		_this.total = res.totalSize;
	});
}

function getDay(val){
	if(val==9) return;
	let begin, today = new Date();
	today.setHours(23,59,59);
	_this.info.endTime = today.getTime();
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
	_this.info.beginTime = today.getTime();
}