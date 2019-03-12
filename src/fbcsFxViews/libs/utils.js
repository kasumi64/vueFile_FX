import Vue from 'vue';
import Axios from 'axios';
import kit	 from '@/fbcsFxViews/libs/kit.min.js';
import i18n from '@/fbcsFxViews/language/lang.js';

const exp = {}, argsVar = {}, vue = new Vue({i18n});
var fbcs;

kit.extend(exp, {
	setArgs(keys, val){ argsVar[keys] = val; },
	getArgs(keys){ return argsVar[keys]; }
});

var Events = {
	on(Master, fn){ vue.$on(Master, fn); },
	emit(){ vue.$emit.apply(vue, arguments); },
	off(Master, fn){vue.$off(Master, fn);}
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
	axios.defaults.baseURL = window.fbcs_fxIP + '/fdep/fx/';
	
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

function addDrag(kel, tit, panl){
	if(!(kel instanceof kit.constructor))
		kel = kit(kel);
	var title = kel.find(tit), panle = kel.find(panl),
		first, xy = {};
	
	title.css({
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
		} else title.css({cursor: 'move'}).down(down);
	}
	kel = null;
}

exp.addDrag = function(kel, tit, panl){ return new addDrag(kel, tit, panl); };

//	confirm('文本'); //有确定和取消按钮
//	prompt('文本','输入文本'); //有confirm()和输入框
function TipsConfirm(){
	var successIcon = require('@/fbcsFxViews/img/logo.png'),
		failIcon = require('@/fbcsFxViews/img/logo.png');
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
				<div class="message confirm"></div>
				<div class="footBtn">
					<button class="blueBtn now">立即下发</button>
					<button class="blueBtn ok">确定</button>
					<button class="defBtn cancel">取消</button>
				</div>
			</div>
		</div>`;
	const mask = kit(dom);
	exp.addDrag(mask, '.title', '.tipsPanle');
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
		alert : mask.find('.alert'),
		icon: mask.find('.tipsIcon'),
		right: mask.find('.right'),
		ok : mask.find('.ok').click( e => {
			if(kit.isFn(notifyFn.ok)) notifyFn.ok(notifyArgs.ok);
			hide();
		}).text( vue.$t('fbcsFile.tips.ok') ),
		now : mask.find('.now').click( e => {
			if(kit.isFn(notifyFn.now)) notifyFn.now(notifyArgs.now);
			hide();
		}).text( vue.$t('fbcsFile.tips.now') ),
		cancel : mask.find('.cancel').click( e => {
			if(kit.isFn(notifyFn.cancel)) notifyFn.cancel(notifyArgs.cancel);
			hide();
		}).text( vue.$t('fbcsFile.tips.cancel') )
	};
	
	function show(option, args, messType){
		var opt = option || {}, args = args || {};
		notify.panle.css({left: 0, top: 0});
		if(messType == 1){ //带logo的
			notify.right.html(opt.txt||'');
			notify.alert.show();
			notify.confirm.hide();
			notify.icon[0].src = opt.type==1 ? successIcon : failIcon;
			btnType(1);
		} else {
			notify.alert.hide();
			notify.confirm.html(opt.txt||'').show();
			btnType(opt.btn);
		}
		
		notifyFn = {...opt};
		notifyArgs = {...args};
		notify.title.html(opt.title||vue.$t('fbcsFile.tips.title'));
		fbcs.appendChild(mask[0]);
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
	function hide(){mask.detach();}
	this.confirm = function(opt, args){
		show(opt, args);
	};
	this.alert = function(opt, args){
		show(opt, args, 1);
	};
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
	return exp.post(params).then(res => {
		if(res.errcode!=0) return console.info(res.errinfo);
		var i, arr = res.lists, len = arr.length, obj;
		for(i = 0; i < len; i++){
			obj = arr[i];
			obj.lable = `${obj.userID}(${obj.userName})`;
			obj.value = obj.userID;
		}
//		exp.emit('keywords', arr);
		if(kit.isFn(fn)) fn(arr);
	});
};

exp.sleep = function (delay){
	return new Promise((resolve, reject)=>{
		setTimeout(resolve, delay||0);
	});
}







export default exp;
//(c) Copyright 2019 LGY. All Rights Reserved. 