import utils from '@/fbcsFxViews/libs/utils.js';
import md5 from '@/fbcsFxViews/libs/md5.js';
import moment from 'moment';

var _this, args, defaultPwd, 
_info = {
	userID: '', userName: '', userType: '1', userPasswd: '', inZone: '',linkGroupName: '', speedCtrl: -1,
	maxRelationUser: '',notOnlineAlarm: 0, encFlag: 1, beginSoftEncTime: '', endSoftEncTime: '',
	allowBroadcast: 0, allowConnFlag: 1, allowSwitchMsg: 1, allowPublishTopicCount: 5, allowSubscribeTopicCount: 5,
	maxPublishTopicDay: 7, maxSimultTaskCount: 30, maxCltOneDayTaskCount: 500000, webUserFlag: '',
	isModifyDefaultPasswd: '', expiredTimeFlag: '',
}, data = {
	fxAuth: true,
	info: _info,
	pwd: 1,
	more: true,
	blo: [{label: '是', value: 1},{label: '否', value: 0}],
	userType: [{name: '系统动态配置', id: '1'}],
	inZone: [],
	group: [],
	indate: '',
	showReview: false,
	reqsv: {},
	reviewTxt: '',
	parameter: null,
	jump: false,
	buildTime: '',
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
		onlyNum_1(e){
			let el = e.target, str = el.value, k = el.dataset.k;
			let reg = /[^\d]/g, flag = false;
			if(/^\-/.test(str)){
				flag = true;
				str = str.replace('-', '');
			}
			if(reg.test(str)){
				// utils.alert({txt: this.$t('fbcsFile.err.user.errNum')});
				str = str.replace(reg, '');
				utils.weakTips(this.$t('fbcsFile.err.user.errNum'), 1);
			}
			if(flag)  str = '-' + str;
			this.info[k] = str;
		},
		onlyNum(e){
			let el = e.target, str = el.value, k = el.dataset.k;
			let reg = /[^\d]/g;
			if(reg.test(str)){
				// utils.alert({txt: this.$t('fbcsFile.err.user.errNum')});
				this.info[k] = str.replace(reg, '');
				utils.weakTips(this.$t('fbcsFile.err.user.errNum'), 1);
			}
		},
		submit(){
			if(!pass.call(this)) return;
			var dom = defval.call(this);
			var params = Object.assign({}, this.info);
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
			else params.beginSoftEncTime = 0;
			if(params.endSoftEncTime) params.endSoftEncTime = params.endSoftEncTime / 1000;
			else params.endSoftEncTime = 0;
			if(this.info.linkGroupName == '任意') params.linkGroupName = '';
			
//			console.log('userinfo', params);
			
			function req(res){
				if(res.errcode!='0') return utils.alert({txt: res.errinfo});
				let mess = `<p>${res.errinfo}</p>`;
				if(res.webUserFlag == 1){ //网络用户
					mess = `<p style="color: red">${_this.$t('fbcsFile.tips.webUser')}</p>` + mess;
				}
				if(_this.jump){
					_this.jump = false;
					utils.confirm({
						txt: mess,
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
					utils.alert({txt: mess, type: 1});
				}
				utils.emit('fbcs_newUser', _this.info);
			}
			
			if(dom){
				utils.confirm({
					txt: dom,
					ok: () => {
						utils.post(params).then(req);
					},
					btn: 1
				});
			} else utils.post(params).then(req);
		},
		now(){
			if(!pass.call(this)) return;
			var dom = defval.call(this);
			if(this.isAdd == 'add'){
				this.reqsv = {uri: 'userinfo/addImmediately'};
			} else {
				this.reqsv = {uri: 'userinfo/modifyImmediately'};
			}
			
			if(dom){
				utils.confirm({
					txt: dom,
					ok: () => {
						_this.showReview = true;
					},
					btn: 1
				});
			} else this.showReview = true;
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
			else params.beginSoftEncTime = 0;
			if(params.endSoftEncTime) params.endSoftEncTime = params.endSoftEncTime / 1000;
			else params.endSoftEncTime = 0;
			params.reviewer = obj.name;
			if(params.linkGroupName == '任意') params.linkGroupName = '';
			
//			utils.loadShow();
			utils.post(params).then(function(res){
				if(res.errcode != '0') {
//					utils.loadClose();
					return utils.alert({txt: res.errinfo});
				}
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
		},
		finish(){
			if(this.jump){
				this.jump = false;
				utils.emit('fbcs_newUser', this.info);
				getUserInfo(this.info);
				_this.$emit('update:isAdd', 'ekey');
				_this.$emit('update:tab', 'second');
			}
		}
	},
	created(){
		_this = this;
		this.fxAuth = utils.getFxAuth;
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
		info = this.info, err = 'fbcsFile.err.user.';
	
	for (var i = 0; i < must.length; i++) {
		let k = must[i], str = info[k];
		if(utils.isSpace(str)) {
			utils.weakTips({txt: this.$t(err + k)});
			return false;
		}
	}
	
	if(/[^\w-]/.test(info.userID)){
		utils.weakTips({txt: this.$t(err + 'idformat')});
		return false;
	} else if(/[\%]/.test(info.userName)){
		utils.weakTips({txt: this.$t(err + 'nameformat')});
		return false;
	}
	
	if(this.isAdd == 'add'&&info.isModifyDefaultPasswd==1){
		let txt = false, pwd = info.userPasswd;
		if(pwd == '') {
			txt = this.$t(err + 'userPasswd');
		} else if (pwd.length < 8){
			txt = this.$t(err + 'pwdRule');
		} else if(/\s/.test(pwd)){ //(^\s|\s$)
			txt = this.$t(err + 'blank');
		} else if(pwd.indexOf(info.userID)>-1||pwd.indexOf(info.userName)>-1){
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
				txt = his.$t(err + 'pwdRule');
			}
		}
		
		if(txt){
			utils.weakTips(txt);
			return false;
		}
	}
	
	let speed = parseInt(info.speedCtrl),
		maxUser = parseInt(info.maxRelationUser),
		maxTask = parseInt(info.maxSimultTaskCount),
		oneTask = parseInt(info.maxCltOneDayTaskCount);
	
	if(!(speed>=-1&&speed<=999999999999999999)){
		utils.weakTips({txt: this.$t(err + 'speed')});
		return false;
	} else if (maxTask < 1){
		utils.weakTips({txt: this.$t(err + 'maxTask')});
		return false;
	}
	/*else if (!(maxUser>=0&&maxUser<=99999999)){
		utils.weakTips({txt: this.$t(err + 'maxUser')});
		return false;
	}else if (oneTask < 0){
		utils.weakTips({txt: this.$t(err + 'oneTask')});
		return false;
	}*/
	
	let begin = info.beginSoftEncTime, end = info.endSoftEncTime;
	if((begin || end)&&info.encFlag==1){
		if(begin==''||end==''||begin >= end) {
			utils.weakTips({txt: this.$t(err + 'softDay')});
			return false;
		}
	}
	
	return true;
}

function defval(){
	var def = {allowPublishTopicCount: 5, allowSubscribeTopicCount: 5, maxPublishTopicDay: 7,
		maxSimultTaskCount: 30, maxCltOneDayTaskCount: 500000};
	var flag, info = this.info, dom = this.$t('fbcsFile.userInfo.errNum');
	for(var k in def){
		if(!info[k]){
			flag = true;
			info[k] = def[k];
			dom += this.$t('fbcsFile.userInfo.'+k)+def[k]+'\n';
		}
	}
	if(flag) return dom;
	return false;
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
	defaultPwd = '';
	for (let k in info) info[k] = '';
	info.isModifyDefaultPasswd = 0;
	info.userPasswd = defaultPwd;
	info.userType = '1',
	info.inZone = '',
	info.linkGroupName = '任意',
	info.speedCtrl = -1,
	info.maxRelationUser = 1000,
	info.encFlag = 1,
	info.notOnlineAlarm=0,
	info.allowBroadcast= 0, 
	info.allowConnFlag= 1, 
	info.allowSwitchMsg= 1,
	info.allowPublishTopicCount= 5, 
	info.allowSubscribeTopicCount= 5,
	info.maxPublishTopicDay= 7;
	info.maxSimultTaskCount= 30,
	info.maxCltOneDayTaskCount= 500000;
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
		obj.userPasswd = '';
		if(obj.linkGroupName=='') obj.linkGroupName = '任意';
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