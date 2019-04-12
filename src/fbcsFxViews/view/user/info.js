import utils from '@/fbcsFxViews/libs/utils.js';
import md5 from '@/fbcsFxViews/libs/md5.js';
import moment from 'moment';

var _this, args, defaultPwd, 
info = {
	userID: '', userName: '', userType: '1', userPasswd: defaultPwd, inZone: '',linkGroupName: '', speedCtrl: -1,
	maxRelationUser: '',notOnlineAlarm: 0, encFlag: 1, beginSoftEncTime: '', endSoftEncTime: '',
	allowBroadcast: 0, allowConnFlag: 1, allowSwitchMsg: 1,allowPublishTopicCount: 5, allowSubscribeTopicCount: 5,
	maxPublishTopicDay: 7, maxSimultTaskCount: '',maxCltOneDayTaskCount: '', webUserFlag: '',
	isModifyDefaultPasswd: '', expiredTimeFlag: '',
}, data = {
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
	jump: false,
	buildTime: '',
};

export default {
	data(){ return data;},
	props: {
		isAdd: {
			type: String,
			default: 'add'
		},
		tab: '',
		isNew: false
	},
	methods:{
		back(){
			this.$router.replace({path: '/main/fxCfg/userHome'});
		},
		defPwd(val){
			if(!val){ //默认
				this.info.userPasswd = defaultPwd;
			} else this.info.userPasswd = '';
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
		onlyNum_1(e){
			let el = e.target, str = el.value, k = el.dataset.k;
			let reg = /[^\d]/g, flag = false;
			if(/^\-/.test(str)){
				flag = true;
				str = str.replace('-', '');
			}
			if(reg.test(str)){
				utils.alert({txt: this.$t('fbcsFile.err.user.errNum')});
				str = str.replace(reg, '');
			}
			if(flag)  str = '-' + str;
			this.info[k] = str;
		},
		onlyNum(e){
			let el = e.target, str = el.value, k = el.dataset.k;
			let reg = /[^\d]/g;
			if(reg.test(str)){
				utils.alert({txt: this.$t('fbcsFile.err.user.errNum')});
				this.info[k] = str.replace(reg, '');
			}
		},
		submit(){
			if(!pass.call(this)) return;
			let params = Object.assign({}, this.info);
			if(this.isAdd == 'add'){
				params.url = 'userinfo/add';
				params.cmdID = '600003';
				params.userPasswd = md5(this.info.userPasswd||'');
			} else {
				params.url = 'userinfo/modify';
				params.cmdID = '600004';
				delete params.userPasswd;
			}
			
			if(params.beginSoftEncTime) params.beginSoftEncTime = params.beginSoftEncTime / 1000;
			if(params.endSoftEncTime) params.endSoftEncTime = params.endSoftEncTime / 1000;
			if(this.info.linkGroupName == '任意') params.linkGroupName = '';
			
//			console.log('userinfo', params);
			
			utils.post(params).then(function(res){
				if(res.errcode!='0') return utils.alert({txt: res.errinfo});
				if(_this.jump){
					_this.jump = false;
					utils.confirm({
						txt: res.errinfo,
						ok: () => {
							getUserInfo(_this.info);
							_this.$emit('update:isAdd', 'ekey');
							_this.$emit('update:tab', 'second');
						},
						cancel: () => {
							getUserInfo(_this.info);
							_this.$emit('update:isAdd', 'ekey');
						}
					});
				} else {
					utils.alert({txt: res.errinfo, type: 1});
				}
				utils.emit('fbcs_newUser', _this.info);
			});
		},
		now(){
			if(!pass.call(this)) return;
			if(this.isAdd == 'add'){
				this.reqsv = {uri: 'userinfo/addImmediately'};
			} else {
				this.reqsv = {uri: 'userinfo/modifyImmediately'};
			}
			this.showReview = true;
		},
		review(obj){
			let params = Object.assign({},this.info);
			if(this.isAdd == 'add'){
				params.url = 'userinfo/addImmediately';
				params.cmdID = '600006';
				params.userPasswd = md5(this.info.userPasswd);
			} else {
				params.url = 'userinfo/modifyImmediately';
				params.cmdID = '600007';
			}
			if(params.beginSoftEncTime) params.beginSoftEncTime = params.beginSoftEncTime / 1000;
			if(params.endSoftEncTime) params.endSoftEncTime = params.endSoftEncTime / 1000;
			params.reviewer = obj.name;
			if(params.linkGroupName == '任意') params.linkGroupName = '';
			
			utils.post(params).then(function(res){
				if(res.errcode != '0') return utils.alert({txt: res.errinfo});
				_this.parameter = res;
			});
		}
	},
	created(){
		_this = this;
		this.jump = this.isNew;
		args = utils.getArgs('userInfo');
		initDate();
		getDict();
		getDefPwd();
		if(this.isAdd!='add'&&args&&args.userID){
			getUserInfo(args);
		}
	}
}

function pass(){
	let must = ('userID,userName,speedCtrl,maxRelationUser').split(','),
		info = this.info;
	
	for (var i = 0; i < must.length; i++) {
		let k = must[i], str = info[k];
		if(utils.isSpace(str)) {
			utils.alert({txt: this.$t('fbcsFile.err.user.'+k)});
			return false;
		}
	}
	
	if(/[^\w-]/.test(info.userID)){
		return utils.alert({txt: this.$t('fbcsFile.err.user.idformat')});
	}
	
	if(this.isAdd == 'add'&&info.isModifyDefaultPasswd==1){
		let pwd = info.userPasswd;
		if(pwd == '') {
			return utils.alert({txt: this.$t('fbcsFile.err.user.userPasswd')});
		} else if (pwd.length < 8){
			return utils.alert({txt: this.$t('fbcsFile.err.user.pwdRule')});
		} else if(/^\s|\s$/.test(pwd)){
			return utils.alert({txt: this.$t('fbcsFile.err.user.blank')});
		}  else if(pwd.indexOf(info.userID)>-1||pwd.indexOf(info.userName)>-1){
			return utils.alert({txt: this.$t('fbcsFile.err.user.noidName')});
		} else {
			let i, num = 0,
				reg = [/[a-z]/,/[A-Z]/,/[0-9]/,/[ @#_\-\*]/];
			for (i = 0; i < reg.length; i++) {
				if(reg[i].test(pwd)) num++;
			}
			if(num < 2){
				return utils.alert({txt: this.$t('fbcsFile.err.user.pwdRule')});
			}
		}
	}
	
	let speed = parseInt(info.speedCtrl),
		maxUser = parseInt(info.maxRelationUser);
	if(!(speed>-2&&speed<=999999999999999999)){
		return utils.alert({txt: this.$t('fbcsFile.err.user.speed')});
	}
	if(!(maxUser>-1&&maxUser<=1000)){
		return utils.alert({txt: this.$t('fbcsFile.err.user.maxUser')});
	}
	
	let begin = info.beginSoftEncTime, end = info.endSoftEncTime;
	if((begin || end)&&info.encFlag==1){
		if(begin==''||end==''||begin >= end) {
			return utils.alert({txt: this.$t('fbcsFile.err.user.day')});
		}
	}
	
	return true;
}

function getDict(){
	var params, url = 'dict/query', cmdID = '600000',
	language = 0;
	params = { url, cmdID, language, type: 1 };
	utils.post(params).then(function(res){
		if(res.errcode!='0') return console.warn(res.errcode, res.errinfo);
		_this.userType = res.lists;
		_this.info.userType = res.lists[0].id;
	});
	
	params= { url, cmdID, language, type: 2 };
	utils.post(params).then(function(res){
		if(res.errcode!='0') return console.warn(res.errcode, res.errinfo);
		res.lists.unshift({name:'任意', id:''});
		_this.inZone = res.lists;
	});
	
	params = {
		url: 'cuConfig/queryGroupID',
		cmdID: '600093'
	};
	utils.post(params).then(function(res){
		if(res.errcode!='0') return console.warn(res.errcode, res.errinfo);
		res.lists.unshift({groupID: '任意'});
		_this.group = res.lists;
	});
}

function initDate(){
	let info = _this.info;
	defaultPwd = '111111';
	for (let k in info) info[k] = '';
	info.isModifyDefaultPasswd = 0;
	info.userPasswd = defaultPwd;
	info.userType = '1',
	info.inZone = '',
	info.linkGroupName = '任意',
	info.speedCtrl = -1,
	info.maxRelationUser = 10,
	info.encFlag = 1,
	info.notOnlineAlarm=0,
	info.allowBroadcast= 0, 
	info.allowConnFlag= 1, 
	info.allowSwitchMsg= 1,
	info.allowPublishTopicCount= 5, 
	info.allowSubscribeTopicCount= 5,
	info.maxPublishTopicDay= 7;
	info.maxSimultTaskCount= 0,
	info.maxCltOneDayTaskCount= 0;
	info.webUserFlag = 0;
	info.expiredTimeFlag = '1';
	
	_this.more = false;
	_this.userType = _this.inZone = _this.group = [];
	_this.indate = _this.$t('fbcsFile.password.options');
	_this.showReview = false;
	_this.parameter = null;
}

function getUserInfo(user){
	let params = {
		url: 'userinfo/query',
		cmdID: '600002',
		userID: user.userID
	};
	utils.post(params).then(function(res){
		if(res.errcode != '0') return utils.alert({txt: res.errinfo});
		var obj = res.lists[0];
		if(!obj) return _this.info.userID = args.userID;
		
		if(obj.userConfigDate){
			_this.buildTime = moment(obj.userConfigDate * 1000).format('YYYY-MM-DD HH:mm:ss');
		} else  _this.buildTime = '';
		
		obj.beginSoftEncTime = obj.beginSoftEncTime * 1000;
		obj.endSoftEncTime = obj.endSoftEncTime * 1000;
		if(!obj.beginSoftEncTime) obj.beginSoftEncTime = '';
		if(!obj.endSoftEncTime) obj.endSoftEncTime = '';
		obj.isModifyDefaultPasswd = 0;
		obj.expiredTimeFlag = '1';
		_this.info = obj;
	});
}

function getDefPwd(){
	let params = {
		url: 'userpasswd/queryDefaultPasswd',
		cmdID: '600012'
	};
	utils.post(params).then(function(res){
		if(res.errcode != '0') return console.warn('600012', res.errinfo);
		_this.info.userPasswd = defaultPwd = res.defaultPasswd;
	});
}