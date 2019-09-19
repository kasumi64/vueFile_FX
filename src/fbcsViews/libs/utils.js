import Vue        from 'vue';
import Axios      from 'axios';
import kit        from './kit.js';
import globalVar  from './globalVar.js';
import md5        from './md5.js';
import language from '@/fbcsViews/language/lang.js';
import fxUtils   from '@/fbcsFxViews/libs/utils.js';

	
Vue.component("lgy-loopReqMX", resolve => require(['@/fbcsViews/components/lgy-loopReqMX.vue'], resolve));
function utils(){
	
	var exp = {}, vm = new Vue(), ip = globalVar.get('urlIP'),
		app = window.appVue, lang = language().utils;
	
	function addDrag(kel){
		var panle = kel.find('._panle'),
		title = kel.find('#_title');
		var first, xy={};
		
		title.down(function(e){
			first = panle.getStyle({x:'left',y:'top'});
			xy.x = e.clientX;
			xy.y = e.clientY;
			window.onmousemove = move;
			window.onmouseup = function(){
				window.onmousemove = window.onmouseup = null;
			};
		});
		function move(e){
			var end = {};
			end.left = e.clientX - xy.x + first.x;
			end.top = e.clientY - xy.y + first.y;
			panle.css(end);
		}
		return panle;
	}
	
	function MessageMask(){
		var time = null, load, isLoading = false;
		/**
		 * @param type 默认:一般; 0:成功; 1:警告; 2:消息提示; 3:失败;
		 */
		this.weakEl = function(txt, type, time){
			switch (type){
				case 0: type = 'success'; break;
				case 1: type = 'warning'; break;
				case 2: type = 'info'; break;
				case 3: type = 'error'; break;
				default: type = 'info'; break;
			}
			vm.$message.closeAll();
			vm.$message({
				dangerouslyUseHTMLString: true,
		        message: txt,
		        type: type,
//		        center: true,
		        showClose: true,
				duration: time || 5000
	        });
	        return exp;
		};
	
		/**
		 * @param opt {title,message,duration,position,type,onClose,onClick
		 * 	offset,iconClass,customClass,cancel,cancelBtn}
		 */
		this.notify = function(opt){
			if(!opt.title){
				switch (opt.type){
					case 1: opt.title = '成功'; break;
					case 2: opt.title = '错误'; break;
					case 3: opt.title = '消息'; break;
					case 4: opt.title = '通知'; break;
					default: opt.title = '警告'; break;
				}
			}
			switch (opt.type){
				case 1: opt.type = 'success'; break;
				case 2: opt.type = 'error'; break;
				case 3: opt.type = 'info'; break;
				case 4: opt.type = ''; break;
				default: opt.type = 'warning'; break;
			}
			opt.dangerouslyUseHTMLString = true;
			vm.$notify(opt);
			return exp;
		};
		this.loadShow = function(option){
			if(isLoading) return;
			if(typeof(option)!="object") option = {};
			isLoading = true;
			clearTimeout(time);
			var icon = '';
			if(option.icon=='1') icon = 'el-icon-loading';
			else if(option.icon) icon = option.icon;
			load = vm.$loading({
				lock: true,
	        	text: option.txt||'',
	      		spinner: icon,
	        	target: option.el,
	        	background: 'rgba(255, 255, 255, 0.5)'
			});
			if(typeof(option.time)!="number") option.time = globalVar.get('loadTime');
			if(option.time > 0){
				time = setTimeout(function(){
					exp.loadClose();
				}, option.time * 1000);
			}
			return exp;
		};
		
		this.loadClose = function(){
			if(!load) return;
			clearTimeout(time);
			load.close();
			isLoading = false;
			return exp;
		};
		
		// 弱提示
		var weakHtml = '<div id="_weakTips"><div class="_panle"><div class="_container"></div></div></div>';
		var weakTips = {
			el: kit(weakHtml),
			show: function(txt){
				weakTips.txt.innerHTML = txt;
				kit.body().appendChild(this.el[0]);
				clearTimeout(weakTips.time);
				weakTips.time = setTimeout(weakTips.hide, 8000);
			},
			hide: function(){
				var el = weakTips.el[0];
				if(el.parentNode)
					el.parentNode.removeChild(el);
			},
			time: 0
		};
		weakTips.txt = weakTips.el.find('._container')[0];
		weakTips.el.click(function(e){
			if(e.target == this) weakTips.hide();
		});
		this.weakTips = function(txt, type, time){
			this.weakEl(txt, type, time);
//			weakTips.show(txt);
		};
		
		var src = require('../img/close.png');
		// 带按钮的消息框
		var hintHtml = '<div id="_hints"><div class="_panle">'+
			'<div><p id="_title">提示</p><img id="_close" src="'+src+'" />'+
			'</div><div class="_messaga"><div id="_ctxt"></div></div>'+
			'<div class="_footBtn"><button id="_now" class="blueBtn">立即下发</button><button id="_yes" class="blueBtn">确 定</button>'+
			'<button id="_no" class="defBtn">取 消</button></div></div></div>';
		var $hints = kit(hintHtml);
		var hintsObj = {
			el: $hints[0],
			panle: $hints.find('._panle'),
			title: $hints.find('#_title'),
			yes: $hints.find('#_yes'),
			no: $hints.find('#_no'),
			ctxt: $hints.find('#_ctxt'),
			now: $hints.find('#_now'),
			show: function(opt){
				hintsObj.ctxt[0].innerHTML = opt.txt;
				if(opt.btn==1){
					hintsObj.yes.show('inline-block');
					hintsObj.no.hide();
					hintsObj.now.hide();
				}else if(opt.btn==3) {
					hintsObj.yes.show('inline-block');
					hintsObj.no.show('inline-block');
					hintsObj.now.show('inline-block');
				} else {
					hintsObj.yes.show('inline-block');
					hintsObj.no.show('inline-block');
					hintsObj.now.hide();
				}
				kit.body().appendChild(this.el);
			},
			hide: function(){
				var el = hintsObj.el;
				if(el.parentNode){
					el.parentNode.removeChild(el);
					hintsObj.panle.css({left:0,top:0});
				}
			},
			runNo:function(){
				if(typeof(_opt.no)=="function") _opt.no.call(_opt.that, _opt.noArgs);
			}
		};
		addDrag($hints);
		
		function setHintsTxt(){
			lang = language().utils;
			hintsObj.title.text(lang.title1);
			hintsObj.yes.text(lang.okBtn);
			hintsObj.no.text(lang.cBtn);
			hintsObj.now.text(lang.nowBtn);
		}
		
		$hints.click(function(e){
			if(e.target != this) return;
			hintsObj.runNo();
			hintsObj.hide();
		});
		hintsObj.yes.click(function(e){
			if(typeof(_opt.yes)=="function") _opt.yes.call(_opt.that, _opt.yesArgs);
			hintsObj.hide();
		});
		hintsObj.no.click(function(e){
			hintsObj.runNo();
			hintsObj.hide();
		});
		hintsObj.now.click(function(e){
			if(typeof(_opt.now)=="function") _opt.now.call(_opt.that, _opt.nowArgs);
			hintsObj.hide();
		});
		$hints.find('#_close').click(function(e){
			hintsObj.runNo();
			hintsObj.hide();
		});
		var _opt;
		/**
		 * @param {Object} opt {txt,yes,no,now,param,that}
		 * txt: 文本，
		 * yes，no，now：为回调函数，
		 * yesArgs，noArgs，nowArgs：回调函数的传参，类型为数组，
		 * that：修改this的指向
		 */
		this.hints = function(opt){
			if(typeof(opt)!="object") opt = {};
			_opt = opt;
			setHintsTxt()
			hintsObj.show(opt);
		};
		
		// 复核操作员
		var reviewHtml = '<div id="_review"><div class="_panle">'+
			'<div><p id="_title">复核操作</p><img id="_close" src="'+src+'" />'+
			'</div><ul class="_messaga"><li><label class="lab">复核操作员：</label><input id="_name" class="inp" type="text" autocomplete="off"/></li>'+
			'<li><label class="lab">复核员密码：</label><input id="_pass" class="inp" type="password" autocomplete="off"/></li></ul>'+
			'<div class="_footBtn"><button id="_yes" class="blueBtn">提 交</button><button id="_no" class="defBtn">返 回</button></div></div></div>';
		var $review = kit(reviewHtml), _rept;
		var reObj = {
			el: $review[0],
			panle: $review.find('._panle'),
			title: $review.find('#_title'),
			yes: $review.find('#_yes'),
			no: $review.find('#_no'),
			label: $review.find('.lab'),
			pass: $review.find('#_pass'),
			name: $review.find('#_name'),
			show: function(opt){
				reObj.pass.val('');
				reObj.name.val('');
				kit.body().appendChild(this.el);
			},
			hide: function(){
				var el = reObj.el;
				if(el.parentNode){
					el.parentNode.removeChild(el);
					reObj.panle.css({left:0,top:0});
				}
			},
			runNo:function(){
				if(typeof(_rept.no)=="function") _rept.no.call(_rept.that, _rept.noArgs);
			}
		};
		addDrag($review);
		
		function setReviewTxt(){
			lang = language().utils;
			reObj.title.text(lang.title2);
			reObj.yes.text(lang.sub);
			reObj.no.text(lang.back);
			reObj.label[0].innerText = lang.review;
			reObj.label[1].innerText = lang.reviewPwd;
		}
		
		$review.click(function(e){
			if(e.target != this) return;
			reObj.runNo();
			reObj.hide();
		});
		$review.find('#_close').click(function(e){
			reObj.runNo();
			reObj.hide();
		});
		reObj.no.click(function(e){
			reObj.runNo();
			reObj.hide();
		});
		reObj.yes.click(function(e){
			if(typeof(_rept.yes)!="function") return console.warn('回调函数不正确！');
			var name=reObj.name.val(), pass=reObj.pass.val();
			if(name==globalVar.get('accountInfo').name) {
				// exp.weakTips(lang.reviewNameErr, 1);
				fxUtils.alert({txt: lang.reviewNameErr});
				return
			}
			if(name==''||pass=='') {
				// exp.weakTips(lang.reviewNull, 1);
				fxUtils.alert({txt: lang.reviewNull});
				return
			}
			/* if(globalVar.get('debug')===true){
				reObj.hide();
				return _rept.yes.call(_rept.that, {name});
			} */
//			FBCS_admin  123456
			var pwd = md5.hex_md5(reObj.pass.val());
			var param = {
				url: 'mx/auth/review',
				cmdID: '600112',
				uri: '/fbcs_mx/' + _rept.uri,
				reviewer: reObj.name.val(),
				password: pwd,
				language: globalVar.get('lang'),
				that: _rept.that,
				args: {name, pwd}
			};
			exp.post(param, function(data){
				if(data.errcode!='0') return fxUtils.alert({txt: data.errinfo});
				reObj.hide();
				_rept.yes.call(_rept.that, {name, pwd});
			});
		});
		this.review = function(opt){
			if(typeof(opt)!="object") opt = {};
			_rept = opt;
			setReviewTxt();
			reObj.show(opt);
		}
		// 复核操作员
		this.reviewHide = function(){
			reObj.runNo();
			reObj.hide();
		};
	};
	kit.extend(exp, new MessageMask());
//		axios.request（config）
//		axios.get（url [，config]）
//		axios.delete（url [，config]）
//		axios.head（url [，config]）
//		axios.post（url [，data [，config]]）
//		axios.put（url [，data [，config]]）
//		axios.patch（url [，data [，config]]）
	function ReqHttp()
	{
		var axios = Axios.create();
		function callback(response, fn, that, args){
//			console.log(response);
			exp.loadClose();
			if(response.status!==200) return console.log(response);
			var data = response.data;
			//session失效，返回登陆
			if(!(globalVar.get('debug') === true)&&data.errcode == '2102'){
				exp.hints({
					txt: data.errinfo,
					yes: function(){
						window.location.href = globalVar.get('login');
					},
					btn: 1
				});
				return;
			}
			//特殊错误码
			var errcode = parseInt(data.errcode), min = 2100, max = 2200;
			if(errcode>=min && errcode<max){
				return fxUtils.alert({txt: data.errinfo, type: 0});
			}
			if(fn instanceof Function) fn.call(that, data, args);
			
		}
		function getUrl(url){
			var other = ('event/ baseServiceCfg/ userAuthority/ logout').split(' ');
			if((/^http:/i).test(url)||(/^https:/i).test(url)) return url;
			for (var i = 0; i < other.length; i++) {
				if(url.indexOf(other[i])>=0) return url;
			}
			ip = globalVar.get('urlIP');
			return ip + url;
		}
		/**
		 * @param url： 请求地址；
		 * @param params： 发到后台的参数，只有两个入参时为回调函数；
		 * @param fn： 请求成功回调函数；
		 */
		this.post = function(url, params, fn, efn){
			if(typeof(url)==="object"){
				var tem = url;
				url = tem.url;
				delete tem.url;
				efn = fn, fn = params;
				params = tem;
			}
			// console.log('请求参数：', params);
			if(params.waiting === false){
				delete params.waiting;
			} 
//			else exp.loadShow({icon:'none'});
			var that = params.that, args = params.args;
			delete params.that; delete params.args;
			if(params.language === void 0) params.language = globalVar.get('lang');
			axios.post(getUrl(url), params).then(function(response){
				callback(response, fn, that, args);
			}).catch(function (e) { error(e, efn); });
		};
		function error(e, efn){
			exp.loadClose();
			if(efn instanceof Function) efn(e);
			if(e.message == 'Network Error') return;
			if(e.response){
				var res = e.response;
				if(res.status == 404) return;
				console.warn(res.config.data);
				console.warn(res.data);
			} else  console.warn(e);
		}
		//同上
		this.get = function(url, params, fn, efn){
			if(typeof(url)==="object"){
				var tem = url;
				url = tem.url;
				delete tem.url;
				efn = fn, fn = params;
				params = tem;
			}
			if(params.waiting === false){
				delete params.waiting;
			}
//			else exp.loadShow({icon:'none'});
			var that = params.that, args = params.args;
			delete params.that; delete params.args;
			axios.get(getUrl(url), {params}).then(function(response){
				callback(response, fn, that, args);
			}).catch(function (e) { error(e, efn); });
		};
	}
	kit.extend(exp, new ReqHttp());

	exp.toUtf8 = function (str) {
	    var out = '', i, len = str.length, c;
	    for(i = 0; i < len; i++) {
	        c = str.charCodeAt(i);
	        if ((c >= 0x0001) && (c <= 0x007F)) {
	            out += str.charAt(i);
	        } else if (c > 0x07FF) {
	            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
	            out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
	            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
	        } else {
	            out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
	            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
	        }
	    }
	    return out;
	};
	var router = app.$router;
	exp.goto = function (url, key, val, fn, abort){
		var obj;
		if(typeof(url)=="object"){
			obj = url; key = obj.key;
			val = obj.val; fn = obj.fn;
			abort = obj.abort;
			url = obj.url;
		}
		if(key) globalVar.set(key, val);
		router.replace({ path: '/main/mxCfg'+url }, fn, abort);
	};
	exp.route = function(){return app.$route.params;};
	
	exp.getUserid = function(str, call){
		var rep, type;
		if(typeof(str)=="object"){
			rep = str;
			str = rep.id;
			type = rep.type;
		}
		var param = {
			url: 'mx/userinfo/queryLists',
			cmdID: "600001",
			userID: str,
			userName: str,
			pageSize: 100,
			currentPage: 1,
			type: type || 1
		};
		exp.post(param, function(data){
//			console.log('getUserid：',data);
			if(data.errcode != 0) return console.log(data.errinfo);
			var obj, i;
			for (i = 0; i < data.lists.length; i++) {
				obj = data.lists[i];
				obj.key = i;
				obj.label = obj.userID+obj.userName;
			}
			call(data.lists);
		});
	};
	//轮偱
	function WheelReq(uuid, special){
		var begin, over = 30*1000, once;
		var param = {
			cmdID: '600073',
			uuid: uuid,
			lastQueryFlag: 0, //1最后一次，0不是；
			type: special || 0
		};
		
		function req(){
			if(Date.now()-begin>=over){
				clearInterval(once);
				param.lastQueryFlag = 1;
				hide();
			}
			param.waiting = false;
			exp.post('mx/batchDispatch/queryBatchDispatchResponse', param, response);
		}
		/**
		 * 轮训接口，
		是否结束轮询还是以endQueryFlag为标志，1则结束轮训
		是否显示list，显示list的前提，endQueryFlag=1，
		然后，errcode=0，不显示list，显示errinfo
		errcode=1，显示list
		errcode为非0非1，代表接口异常
		 */
		function response(data){
			if(data.endQueryFlag==0) return;
			clearInterval(once);
			hide();
			if( !(data.errcode == '1') ){
				exp.weakTips(data.errinfo);
				return;
			}
			var list = data.lists, len = list.length, obj, str = '', l = 0,
			dom = special == 0 ? '<li><i class="l1">{{serviceID}}</i><i class="l1">{{errcode}}</i><i class="l1">{{errinfo}}</i></li>':
				'<li><i class="l2">{{serviceID}}</i><i class="l2">{{errcode}}</i><i class="l2">{{errinfo}}</i><i class="l2">{{operationType}}</i></li>';
			for (var i = 0; i < len; i++) {
				obj = list[i];
				if(obj.errcode == 0) continue;
				l++;
				if(l <= 3){
					str += kit.template(obj, dom);
				} else break;
			}
			if(str){
				var err = '<div class="_whellError"><div class="tit">';
				if(special == 0){
					err += '<i class="l1">serviceID</i><i class="l1">errcode</i><i class="l1">errinfo</i>';
					if(l>3) str += '<i class="l1">...</i><i class="l1">...</i><i class="l1">...</i>'
				} else {
					err += '<i class="l2">serviceID</i><i class="l2">errcode</i><i class="l2">errinfo</i><i class="l2">operation</i>';
					if(l>3) str += '<i class="l2">...</i><i class="l2">...</i><i class="l2">...</i><i class="l2">...</i>'
				}
				err += '</div><ul>' + str + '</ul></div>';
				exp.weakTips(err);
			}
		}
		function show(){
			kit.body().appendChild(WheelReq.el);
		}
		function hide(){
			var parent = WheelReq.el.parentNode;
			if(parent) parent.removeChild(WheelReq.el);
		}
		this.start = function(){
			begin = Date.now();
			show();
			req();
			clearInterval(once);
			once = setInterval(req, 2000);
		};
	}
	WheelReq.el = kit(`<div id="_wheel"><div class="el-loading-spinner"><svg viewBox="25 25 50 50" class="circular">
		<circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg></div></div>`)[0];
	exp.wheelReq = function(sv){
		if(sv.endQueryFlag==1||!sv.uuid) return exp.weakTips(sv.errinfo);
		var w = new WheelReq(sv.uuid, sv.type);
		w.start();
	};
	
	/***
	 * 
	 * @param {Object} obj 所有的参必填{pos, id, clas, parent}
	 * pos：输入框的选择器；
	 * id：为清除按钮和输入框绑一个id选择器；
	 * clas：清除按钮的选择器；
	 * parent：清除按钮的父层选择器；
	 */
	function ClearInput(obj) {
		var btn, inFn, input, clear;
	
		input = kit(`${obj.pos} .el-autocomplete input`).setAttr('id', obj.id);
//		.input(function(e){
//			e.target.value ? btn.show() : btn.hide();
//		});
		
		btn = kit(`${obj.pos} ${obj.clas}`).setAttr('for', obj.id).click(function(e){
			input[0].value = '';
//			btn.hide();
//			kit.defaultEvent(e, true, 2);
			if(typeof(clear) == "function") clear(e);
		});
	
		kit(btn[0].parentNode).mouseover(function(e){
			btn.show();
		}).mouseout(function(e){
			btn.hide();
		});
	
		this.input = function(fn){
			inFn = fn;
		};
		this.clear =function(fn){
			clear = fn;
		};
	}
	exp.clearInput = option => { return new ClearInput(option); };
	
	exp.clearCache = function(){
		globalVar.set('cache_user', null);
		globalVar.set('cache_theme', null);
		fxUtils.setArgs('bizKeySearch', null);
	};
	
	/*exp.getMxAuth = function ()
	{
	
		if(globalVar.get('debug') === true){
			globalVar.set('accountInfo', {name: 'DEBUG'});
			var keys = ('user suconfig dispatch audit topic version lock').split(' ');
			var obj = {}, i, len = keys.length;
			for (i = 0; i < len; i++) obj[keys[i]] = 2;
			globalVar.set('lang', 'zh');
			globalVar.set('status', obj);
			return;
		}
	
		var param = {
			url: 'mx/auth/query',
			cmdID: '600111',
			waiting: false
		};
		exp.post(param, function(data) {
			console.log('权限', data);
			var admin = {};
			if(data.errcode != '0'){
				alert(data.errcode+' '+data.errinfo);
	//			window.location.href = globalVar.get('login');
				return
			}
			admin['name'] = data.userName;
			admin['auth'] = data.lists;
			admin['descrption'] = data.userDescrption;
			admin['language'] = data.language;
			admin['type'] = data.type;
			globalVar.set('accountInfo', admin);
			globalVar.set('lang', data.language);
			setAuth(data.lists);
		});
		
		function setAuth(auth){
			var obj = {}, i, len;
			if(auth instanceof Array) {
				var noAuth = 0;
				len = auth.length;
				for (i = 0; i < len; i++) {
					var tab = auth[i];
					var k = tab.tabName.replace(/Auth_FBCS_Mx_/i,'').toLowerCase();
					obj[k] = tab.permission;
	//				console.log('权限',k);
					if(obj[k] == 0||k=='lock') noAuth++;
				}
				if(noAuth==len){
					alert('该用户还没有分配权限！');
	//				window.location.href = globalVar.get('nginxIP') + 'fmp/#/home';
				}
			}
			globalVar.set('status', obj);
		}
	};*/
	
	exp.getMxAuth = function ()
	{
		var keys = ('user suconfig dispatch audit topic version lock').split(' '),
			obj = {}, i, len = keys.length;
		
		/* if(globalVar.get('debug') === true){
			globalVar.set('accountInfo', {name: 'DEBUG'});
			for (i = 0; i < len; i++) obj[keys[i]] = 2;
			globalVar.set('lang', 'zh');
			globalVar.set('status', obj);
			return;
		} */
		
		var authoritys =  sessionStorage.getItem("authoritys") || "",
			userName = sessionStorage.getItem("userName") || "";
		var authNum;
			
		if(/Auth_Mx_Config_Opt/i.test(authoritys)){
			authNum = 2;
		} else {
			authNum = 0;
		}
		
		globalVar.set('accountInfo', {name: userName});
		globalVar.set('lang', sessionStorage.getItem('language') || 'zh');
		for (i = 0; i < len; i++) obj[keys[i]] = authNum;
		globalVar.set('status', obj);
	};
	
	return exp;
}

export default utils();
