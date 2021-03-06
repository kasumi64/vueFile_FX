import Vue from 'vue';
import Axios from 'axios';
import kit	 from '@/fbcsFxViews/libs/kit.min.js';
import i18n from '@/fbcsFxViews/language/lang.js';
import { Message } from 'element-ui';

const exp = {}, argsVar = {}, vue = new Vue({i18n});
var fbcs;

kit.extend(exp, {
	setArgs(keys, val){ argsVar[keys] = val; },
	getArgs(keys){ return argsVar[keys]; }
});

var Events = {
	on(Master, cb){ vue.$on(Master, cb); },
	emit(){ vue.$emit.apply(vue, arguments); },
	off(Master, cb){vue.$off(Master, cb);},
	once(Master, cb){vue.$once(Master, cb);}
}

//exp.on = function(Master, fn){ vue.$on(Master, fn); };
//exp.emit = function(){ vue.$emit.apply(vue, arguments); };
kit.extend(exp, Events);
exp.on('fbcs_file', body => fbcs = body);


function MaskLayer(){
	var html = `<div class="maskLayer">
			<div class="el-loading-spinner loadPanle">
				<svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>
			</div>
		</div>`;
//		<p class="el-icon-loading"></p>
//		<p>loading...</p>

	var mask = kit(html);
	this.show = function(target){
		if(target){
			mask.css('position','absolute').appendTo(target);
		} else {
			mask.css('position','fixed').appendTo(fbcs);//kit.body()
		}
		return this;
	};
	this.loadClose = function(){
		mask.detach();
	};
}
const mask = new MaskLayer();
const loading = {
	loadShow(query){
		var target = kit(query);
		if(target.length){
			var layer = new MaskLayer();
			return layer.show(target);
		} else return mask.show();
	},
	loadClose(){ mask.loadClose(); }
};
kit.extend(exp, loading);

function ReqHttp(){

	var axios = Axios.create();
	// axios.defaults.timeout = 120 * 1000;

	this.setBaseURL = function(url){
		axios.defaults.baseURL = url;
	};

	// 添加请求拦截器
	axios.interceptors.request.use(function(config){
//		console.log('拦截器',config)
		return config;
	}, function(err){
		return Promise.reject(err);
	});
	// 添加响应拦截器
	axios.interceptors.response.use(function(response){
		return response;
	}, function(err){
		if(err.message == "Network Error"){
//			exp.alert({txt: err.message, type: 0});
			return Promise.reject(null);
		}
		return Promise.reject(err);
	});

	this.http = function(params, fn, config, efn){
		var option = { //resolve reject
			url: params.url,
			method: params.method || 'POST'
		};
		delete params.url;
		delete params.method;
		if(typeof(config)=="object"){
			for (let c in config) option[c] = confing[c];
		}
		if(option.method=='get') option.params = params;
		else option.data = params;

		return axios(option).then(function(response){
			return callback(response, fn);
		}).catch(function(e){
			return error(e, efn);
		});
	};
	this.post = function (params, fn, args, efn){
		var url = params.url;
		delete params.url;
		if(params.language===void 0) params.language = localStorage.getItem('language') || 'zh';

		/* if('debug'){
			console.log(params.cmdID, params);
			let debugRes = {
				status: 200,
				data: {errcode:'0', lists:[], errinfo: 'Success.', defaultPasswd: 'ABCDEFG'}
			}, arr = [];
			for (var i = 0; i < 10; i++) {
				arr.push({userID: '01'+i, userName: 'userName'+i,userID1: '006', nodeName: '深圳'+i, cuName: 'CU-1',
				operationTime: 1555553114000, operationType: 3, type: 4, fileName: 'ABC', reviewer: 'reviewer',
				linkGroupName: '', inZone: '', webUserFlag: 1, exeState: 1});
			}
			debugRes.data.lists = arr;
			return Promise.resolve(callback(debugRes, fn, args));
		} */

		return axios.post(url, params).then(function(res){
			return callback(res, fn, args);
		}).catch(function (err) {
			return error(err, efn);
		});
	};
	this.get = function (params, fn, args, efn){
		var url = params.url;
		delete params.url;
		return axios.get(url, {params}).then(function(res){
			return callback(res, fn, args);
		}).catch(function (err) {
			return error(err, efn);
		});
	};
	function callback(res, fn, args){
		if(res.status != 200) return console.warn(res);
		var data = res.data;
		//session失效，返回登陆
		if(data.errcode == '2102') {
			exp.alert({
				txt: data.errinfo,
				ok: () => {
					window.location.href = '/#/login';
				}
			});
			return;
		}
		// 没有session
		if(data.errcode == '2102') {
			window.location.href = '/#/login';
			return
		}
		if(kit.isFn(fn)) fn(data, args);
		return data;
	}
	function error(e, fn){
//		console.trace(e); //async await
		if(kit.isFn(fn)) fn(e);
		return Promise.reject(e);
	}
}

kit.extend(exp, new ReqHttp());

function addDrag(kel, tit, panl, foot){
	if(!(kel instanceof kit.constructor)) kel = kit(kel);
	var title = kel.find(tit), panle = kel.find(panl),
		footer = kel.find(foot), first, xy = {};

	title.css({
		cursor: 'move',
		'-webkit-user-select': 'none',
		'user-select': 'none'
	}).down(down);
	footer.css({
		cursor: 'move',
		'-webkit-user-select': 'none',
		'user-select': 'none'
	}).down(down);
	function down(e){
		first = panle.getStyle({x: 'left', y: 'top'});
		xy.x = e.clientX;
		xy.y = e.clientY;
		window.onmousemove = move;
		window.onmouseup = e => {
			window.onmousemove = window.onmouseup = null;
		}
	}
	function move(e){
		var end = {};
		end.left = e.clientX - xy.x + first.x;
		end.top = e.clientY - xy.y + first.y;
		panle.css(end);
	}
	this.enable = function(bool){
		if(bool == false){
			title.css({cursor: ''}).down();
			footer.css({cursor: ''}).down();
		} else {
			title.css({cursor: 'move'}).down(down);
			footer.css({cursor: 'move'}).down(down);
		}
	}
	kel = null;
}

exp.addDrag = function(kel, tit, panl, foot){ return new addDrag(kel, tit, panl, foot); };

//弱提示
exp.weakTips = function(txt, type, delay){
	if(typeof(txt)==="object"){ //兼容alert
		let obj = txt;
		txt = obj.txt;
		type = obj.type;
		delay = obj.delay;
	}
	if(txt==''||txt==null) return;
	Message.closeAll();
	let theme = ('success/warning/info/error').split('/');
	theme = theme[type] || 'warning';
	delay = parseInt(delay) || 5000
	if(delay < 0) delay = 0;
	let options = {
		message: txt, type,
		dangerouslyUseHTMLString: true,
		duration: delay,
		showClose: true
	}
	return Message[theme](options);
};
//关闭弱提示
exp.closeTips = function(){ Message.closeAll() };

//	confirm('文本'); //有确定和取消按钮
//	prompt('文本','输入文本'); //有confirm()和输入框
function TipsConfirm(){
	var successIcon = require('@/fbcsFxViews/img/success.png'),
		failIcon = require('@/fbcsFxViews/img/failure.png');
	const dom = `<div class="maskLayer maskBlack">
			<div class="tipsPanle">
				<div class="title">
					<b>提示</b>
				</div>
				<div class="message alert">
					<div class="left">
						<img class="tipsIcon" src="${successIcon}"/>
					</div>
					<div class="right"></div>
				</div>
				<div class="message confirm">
					<div class="confirmTxt"></div>
				</div>
				<div class="footBtn">
					<button id="tips-now" class="blueBtn now">立即下发</button>
					<button id="tips-OK" class="blueBtn ok">确定</button>
					<button id="tips-cancel" class="defBtn cancel">取消</button>
				</div>
			</div>
		</div>`;
	const mask = kit(dom);
	exp.addDrag(mask, '.title', '.tipsPanle', '.footBtn');
	var notifyFn = {
		title:'', txt: '', type: '',
		ok:'', now:'', cancel:'',
	},
	notifyArgs = {
		ok:'', now:'', cancel:'',
	};
	const notify = {
		panle: mask.find('.tipsPanle'),
		title : mask.find('.title b'),
		confirm : mask.find('.confirm'),
		content : mask.find('.confirmTxt'),
		alert : mask.find('.alert'),
		icon: mask.find('.tipsIcon'),
		right: mask.find('.right'),
		ok : mask.find('.ok').click( e => {
			hide();
			if(kit.isFn(notifyFn.ok)) notifyFn.ok(notifyArgs.ok);
		}).text( vue.$t('fbcsFile.tips.ok') ),
		now : mask.find('.now').click( e => {
			hide();
			if(kit.isFn(notifyFn.now)) notifyFn.now(notifyArgs.now);
		}).text( vue.$t('fbcsFile.tips.now') ),
		cancel : mask.find('.cancel').click( e => {
			hide();
			if(kit.isFn(notifyFn.cancel)) notifyFn.cancel(notifyArgs.cancel);
		}).text( vue.$t('fbcsFile.tips.cancel') )
	};
	
	function tipsI18n(){
		notify.ok.text( vue.$t('fbcsFile.tips.ok') );
		notify.now.text( vue.$t('fbcsFile.tips.now') );
		notify.cancel.text( vue.$t('fbcsFile.tips.cancel') );
	}

	var autoOff = 0;

	function show(option, args, messType){
		var opt = option || {}, args = args || {};
		tipsI18n();
		notify.panle.css({left: 0, top: 0});
		clearTimeout(autoOff);
		if(messType == 1){ //带logo的
			notify.right.html(opt.txt||'');
			notify.alert.show('flex');
			notify.confirm.hide();
			if(opt.type==1||opt.type=='success'){
				notify.icon[0].src = successIcon;
				autoOff = setTimeout(hide, 3000);
			} else notify.icon[0].src = failIcon;
			btnType(1);
		} else {
			notify.alert.hide();
			notify.content.html(opt.txt||'');
			notify.confirm.show('grid');
			btnType(opt.btn);
		}

		notifyFn = {...opt};
		notifyArgs = {...args};
		notify.title.html(opt.title||vue.$t('fbcsFile.tips.title'));
		if(fbcs) fbcs.appendChild(mask[0]);
		notify.ok[0].focus();
	}
	function btnType(num){
		if(num == 1){
			notify.now.hide();
			notify.ok.show('inline-block');
			notify.cancel.hide();
		}else if(num == 3){
			notify.now.show('inline-block');
			notify.ok.show('inline-block');
			notify.cancel.show('inline-block');
		} else {
			notify.now.hide();
			notify.ok.show('inline-block');
			notify.cancel.show('inline-block');
		}
	}
	function hide(){
		clearTimeout(autoOff);
		mask.detach();
	}
	this.confirm = function(opt, args){
		show(opt, args);
	};
	this.alert = function(opt, args){
		show(opt, args, 1);
	};
	this.tipsHide = hide;
}

kit.extend(exp, new TipsConfirm());

exp.keywords = function(obj, fn){
	let params = {
		url: 'userinfo/queryLists',
		cmdID: '600001',
		userID: obj.id || '',
		userName: obj.id || '',
		type: obj.type || 1,
		pageSize: obj.size || 100,
		currentPage: 1
	};
	delete obj.id;
	params = Object.assign(params, obj);
	
	return exp.post(params).then(res => {
		if(res.errcode!='0') {
			console.info('600001', res.errinfo);
			res.lists = [];
		}
		var i, arr = res.lists, len = arr.length, obj, other;
		if(typeof(fn)=="object") other = true;
		for(i = 0; i < len; i++){
			obj = arr[i];
			if(other){
				let label = fn.label;
				obj.label = obj[label[0]];
				let second = obj[label[1]];
				if(second !== void 0) obj.label += `(${second})`;
				obj.value = obj[fn.value];
			} else {
				obj.label = `${obj.userID}(${obj.userName})`;
				obj.value = obj.userID;
			}
		}
//		exp.emit('keywords', arr);
		if(kit.isFn(fn)) fn(arr);
		return arr;
	});
};
//设table的滚动条
exp.tableSTop = function (self, ref, delay){
	setTimeout(() => {
		let o = self.$refs[ref];
		if(o) o.$el.querySelector('.el-table__body-wrapper').scrollTop = 0;
	}, delay||0);
};

exp.langCode = function (delay){
	let lang = localStorage.getItem('language') || 'zh';
	return (lang.indexOf('zh') < 0) ? 1 : 0;
};

exp.sleep = function (delay){
	return new Promise((resolve, reject)=>{
		setTimeout(resolve, delay||0);
	});
};

exp.isSpace = function(str){ return !!(/^\s+\s{0,}$/.test(str)||str === ''||str == null); };

exp.clearCache = function(){
	exp.setArgs('userInfo', null);
	exp.setArgs('fxcache', null);
	exp.setArgs('bizKeySearch', null);
};

exp.userName = function(){
	return localStorage.getItem('userName') || '';
};

Object.addProto(exp, 'language', {
	get(){
		return localStorage.getItem('language') || 'zh';
	}
});

Object.addProto(exp, 'getFxAuth', {
	get(){
		if('debug') return true;

		let authority = localStorage.getItem('authoritys') || '';
		return (/Auth_Fx_Config_Opt/i).test(authority);
	}
});

Object.addProto(exp, 'getMxAuth', {
	get(){
		if('debug') return true;

		let authority = localStorage.getItem('authoritys') || '';
		return (/Auth_Mx_Config_Opt/i).test(authority);
	}
});

Object.addProto(exp, 'fbcsLanguage', {
	set(lang){ vue.$i18n.locale = lang; },
	get(){ return vue.$i18n.locale; }
});

export default exp;
//(c) Copyright 2019.10 LGY. All Rights Reserved.
