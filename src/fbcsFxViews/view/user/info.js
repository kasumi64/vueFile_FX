import utils from '@/fbcsFxViews/libs/utils.js';

var _this, info = {
	userID: '', userName: '', userType: '', userPasswd:'111111', inZone: '',linkGroupName: '', speedCtrl: '',
	maxRelationUser: '',notOnlineAlarm: 0, EncFlag: 1, beginSoftEncTime: '', endSoftEncTime: '',
	allowBroadcast: 0, allowConnFlag: 1, allowSwitchMsg: 1,allowPublishTopicCount: 5, allowSubscribeTopicCount: 5,
	maxPublishTopicDay: 7, maxSimultTaskCount: '',maxCltOneDayTaskCount: '', webUserFlag: '',
	isModifyDefaultPasswd: '', userPasswd: '', expiredTimeFlag: '',
}, 
data = {
	info,
	pwd: 1,
	more: true,
	blo: [{label: '是', value: 1},{label: '否', value: 0}],
	userType: [{name: '系统动态配置', id: '1'}],
	inZone: [],
	group: [],
	indate: '',
	showReview: false,
	reqsv: {},
	parameter: null,
},
args;

export default {
	data(){ return data;},
	props: {
		isAdd: {
			type: String,
//			default: 'add'
		}
	},
	methods:{
		back(){
			this.$router.replace({path: '/main/fxCfg/userHome'});
		},
		defPwd(val){
			if(!val){ //默认
				this.info.userPasswd = '111111';
			}
		},
		pickerBegin: {
			disabledDate(time){
				var boundary = new Date(_this.info.endSoftEncTime);
				boundary.setHours(23,59,59);
				return time > boundary;
			}
		},
		pickerEnd: {
			disabledDate(time){
				var boundary = new Date(_this.info.beginSoftEncTime);
				boundary.setHours(0, 0, 0);
				return time < boundary;
			}
		},
		submit(){
			let params = Object.assign({}, this.info);
			params.url = 'userinfo/add';
			params.cmdID = '600003';
			params.userPasswd = this.info;
			console.log(params)
			
			utils.post(params).then(function(res){
				if(res.errcode!='0') return utils.alert({txt: res.errinfo});
				_this.group = res.lists;
			});
		},
		now(){
//			if(!pass()) return;
			this.reqsv = {uri: 'userpasswd/modifyImmediately'};
			this.showReview = true;
		},
		review(obj){
			let params = Object.assign({},this.info);
			params.url = 'userinfo/addImmediately';
			params.cmdID = '600006';
			params.userPasswd = this.passwd;
			params.reviewer = obj.name;
			
			utils.post(params).then(function(res){
				if(res.errcode!='0') return utils.alert({txt: res.errinfo});
				_this.parameter = res;
			});
		}
	},
	created(){
		_this = this;
		args = utils.getArgs('userInfo') || {};
		initDate();
		getDict();
		if(this.isAdd!='add'){
			getUserInfo(args);
		}
	},
	watch: {}
}

function getDict(){
	var params, url = 'dict/query', cmdID = '600000',
	language = 0;
	params = { url, cmdID, language, type: 1 };
	utils.post(params).then(function(res){
		if(res.errcode!='0') return utils.alert({txt: res.errinfo});
		_this.userType = res.lists;
	});
	
	params= { url, cmdID, language, type: 2 };
	utils.post(params).then(function(res){
		if(res.errcode!='0') return utils.alert({txt: res.errinfo});
		_this.inZone = res.lists;
	});
	
	params = { url, cmdID, language, type: 3 };
	utils.post(params).then(function(res){
		if(res.errcode!='0') return utils.alert({txt: res.errinfo});
		_this.group = res.lists;
	});
}

function initDate(){
	let info = _this.info;
	for (let k in info) info[k] = '';
	info.isModifyDefaultPasswd = 0;
	info.userPasswd = '111111';
	info.EncFlag = 1,
	info.notOnlineAlarm=0,
	info.allowBroadcast= 0, 
	info.allowConnFlag= 1, 
	info.allowSwitchMsg= 1,
	info.allowPublishTopicCount= 5, 
	info.allowSubscribeTopicCount= 5,
	info.maxPublishTopicDay= 7;
	info.expiredTimeFlag = '1';
	
	_this.more = false;
	_this.userType = _this.inZone = _this.group = [];
	_this.indate = _this.$t('fbcsFile.password.options');
	_this.showReview = false;
	_this.parameter = null;
}
function getUserInfo(obj){
	let params = {
		url: 'userinfo/query',
		cmdID: '600002',
		userID: obj.userID
	};
	utils.post(params).then(function(res){
		if(res.errcode!='0') return utils.alert({txt: res.errinfo});
		_this.info = res.lists[0];
	});
}