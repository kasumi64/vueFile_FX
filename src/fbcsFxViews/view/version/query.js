import utils  from '@/fbcsFxViews/libs/utils.js';
import moment from 'moment';

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
	checkDialog: false,
	checkList: []
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
		if(res.errcode != '0') return utils.alert({txt: res.errinfo});
		_this.detailList = res.lists;
		_this.showDialog = true;
		utils.tableSTop(_this, 'detailBox');
	});
}
function detail2(row){
	utils.setArgs('version', row);
	_this.$router.push({path: '/main/fxCfg/version/detail'});
}
function rollback(obj){
	let params = {
		url: obj.uri,
		cmdID: '600073',
		reviewer: obj.name,
		version: rollRow.version
	};
	utils.post(params).then(function(res){
		if(res.errcode != '0') return utils.alert({txt: res.errinfo});
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
		if(res.errcode!='0') return utils.alert({txt: res.errinfo});
		res.type = 1;
		_this.parameter = res;
	});
}
function fnback(row, scope){
	rollRow = row;
	let uri = 'version/rollback',
	txt = _this.$t('fbcsFile.versionQuery.rollback');
	review(uri, txt);
}
function review(uri, txt){
	_this.reqsv = {uri};
	_this.reviewTxt = txt;
	_this.showReview = true;
}
function zdCfg(obj){
	let params = {
		url: 'version/getZdCfg',
		cmdID: '600078',
		reviewer: obj.name,
		type: 2
	};
	
	utils.post(params).then(function(res){
		utils.alert({txt: res.errinfo, type: res.errcode!='0'?0:1});
	});
}


export default {
	data(){
		data.options = this.$t('fbcsFile.versionQuery.options');
		data.title = {
			typeMask: this.$t('fbcsFile.versionQuery.type'),
			version: this.$t('fbcsFile.versionQuery.version'),
			versionPath: this.$t('fbcsFile.versionQuery.versionPath'),
			ymd: this.$t('fbcsFile.versionQuery.operationTime'),
			operator: this.$t('fbcsFile.versionQuery.operator'),
			reviewer: this.$t('fbcsFile.versionQuery.reviewer'),
			send: this.$t('fbcsFile.versionQuery.operationType')
		};
		data.defined = {
			label: this.$t('fbcsFile.tableTitle.operation'), width: 112,
			items: [
				{src:require('@/fbcsFxViews/img/table/restore.png'), click: fnback, tips: this.$t('fbcsFile.tableDefined.back')},
				{src:require('@/fbcsFxViews/img/table/detail.png'), click: detail1, tips: this.$t('fbcsFile.tableDefined.detail'), enable: 'fileSize'},
				{src:require('@/fbcsFxViews/img/table/attachment.png'), click: detail2, tips: this.$t('fbcsFile.tableDefined.detail'),enable: 'zdCfg'},
			]
		};
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
				case "version/getZdCfg": 
					zdCfg(obj); break;
				default: break;
			}
		},
		bigVer(){
			let uri = 'version/createBigVersion',
			txt = _this.$t('fbcsFile.versionQuery.bigVer');
			review(uri, txt);
		},
		getCfg(){
			let uri = 'version/getZdCfg',
			txt = _this.$t('fbcsFile.versionQuery.ZdCfg');
			review(uri, txt);
		},
		checkVer(type){
			let params = {
				url: 'version/compareMd5',
				cmdID: '600079'
			};
			utils.post(params).then(function(res){
				if(res.errcode != '0') return utils.alert({txt: res.errinfo});
				for (let i = 0; i < res.lists.length; i++) {
					let obj = res.lists[i], equal = obj.isEqual;
					obj.equalMask = _this.$t('fbcsFile.versionQuery.equal'+equal);
				}
				_this.checkList = res.lists;
				_this.checkDialog = true;
				utils.tableSTop(_this, 'zdBox');
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
		this.checkDialog = this.showDialog = false;;
		this.radio = 4;
		this.list = [];
		getDay(4);
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
//	console.log(params);

	let begin = params.beginTime, end = params.endTime;
	if(begin || end){
		if(begin==''||end==''||begin >= end) {
			return utils.alert({txt: _this.$t('fbcsFile.err.user.day')});
		}
	}
	
	utils.post(params).then(res => {
		if(res.errcode!='0') return console.warn(res.errcode, res.errinfo);
		if(res.totalPage>1 && _this.page > res.totalPage){
			_this.page = res.totalPage;
			return search();
		}
		let i, len = res.lists.length, obj;
		for (i = 0; i < len; i++) {
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
			obj.send = _this.$t('fbcsFile.versionQuery.operationType'+ obj.operationType);
			obj.typeMask = _this.$t('fbcsFile.versionQuery.type'+ obj.type);
			if(obj.operationTimestamp){
				obj.ymd = moment(obj.operationTimestamp).format('YYYY-MM-DD HH:mm:ss');
			} else {
				obj.operationTimestamp = obj.ymd = '';
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