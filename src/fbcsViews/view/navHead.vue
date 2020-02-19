<template>
	<div class="navHead">
		<div class="logoBox" @click="home">
			<img class="logo" src="../img/logo.png" />
		</div>
	
		<div class="messBox">
			<div id="navBtn" class="ico1">
				<img src="../img/cdico.png" />
			</div>
			<div class="ico2"><img src="../img/warinico.png" /></div>
			<div class="ico3"><span class='ioc3_txt'>0</span></div>
			<ul class="warn"></ul>
		</div>
	
		<div class="userBox">
			<!-- <div>
				<div class="ico4"><img src="../img/switchico.png"></div> 
				<span class="margin_left" @click="swc">{{pageTxt.label[0]}}</span>		
			</div> -->
	
			<!--<el-dropdown trigger="click" @command="goto">
				<span class="el-dropdown-link dropTop">
					<span class="margin_left">{{pageTxt.label[1]}}</span>
					<div class="ico5"><img class="csor" src="../img/selectdico1.png"></div>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="FDEPUrl">{{pageTxt.label[2]}} </el-dropdown-item>
					<el-dropdown-item command="FMPUrl">{{pageTxt.label[3]}}</el-dropdown-item>
					<el-dropdown-item command="CMSUrl">{{pageTxt.label[4]}} </el-dropdown-item>
					<el-dropdown-item command="FBASUrl">{{pageTxt.label[5]}}</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
	
			<el-dropdown trigger="click" @command="account">
				<span class="el-dropdown-link dropTop">
					<span class="margin_left">{{userName}}</span>
					<div class="ico5"><img class="csor" src="../img/selectdico1.png"></div>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="passwd">{{pageTxt.label[6]}}</el-dropdown-item>
					<el-dropdown-item command="loginout">{{pageTxt.label[7]}}</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>-->
			
			<div class="fbcs_lockBox">
				<img id="fbcsMX_lock" v-show="isLock==true"  src="../img/lock.png"/>
				<img id="fbcsMX_unlock" v-show="isLock==false" src="../img/unlock.png"/>
			</div>
		</div>
		
		<div class="pwdMask" v-show="pwdShow">
			<div class="panle">
				<div class="title">
					<b>{{pageTxt.pwd[0]}}</b>
					<img @click="pwdShow=false" class="close" src="../img/close.png"/>
				</div>
				<ul class="pwdBox">
					<li>
						<label class="label">{{pageTxt.pwd[1]}}</label>
						<span class="txt">{{userName}}</span>
					</li><li>
						<label class="label"><i class="red">*&nbsp;</i>{{pageTxt.pwd[2]}}</label>
						<input type="password" v-model="oldPwd" maxlength="18"/>
					</li><li>
						<label class="label"><i class="red">*&nbsp;</i>{{pageTxt.pwd[3]}}</label>
						<input type="password" v-model="newPwd1" maxlength="18"/>
					</li><li>
						<label class="label"><i class="red">*&nbsp;</i>{{pageTxt.pwd[4]}}</label>
						<input type="password" v-model="newPwd2" maxlength="18"/>
					</li><li class="_footBtn">
						<label class="label">&nbsp;</label>
						<button class="blueBtn" @click="modifyPwd">{{pageTxt.pwd[5]}}</button>
						<button class="defBtn" @click="pwdShow=false">{{pageTxt.pwd[6]}}</button>
					</li>
				</ul>
			</div>
		</div>
		<!-- <button class="sys" @click="system">消息系统</button> -->
		<select class="sys sl" @change="system">
			<option value="1">文件系统</option>
			<option value="2" selected>消息系统</option>
			<option value="3">互联网用户</option>
		</select>
	</div>
</template>

<script>
import kit 		 from '@/fbcsViews/libs/kit.js';
import events 	 from '@/fbcsViews/libs/observer.js';
import globalVar from '@/fbcsViews/libs/globalVar.js';
import utils	 from '@/fbcsViews/libs/utils.js';
import lang	     from '@/fbcsViews/language/lang.js';
import md5		 from "@/fbcsViews/libs/md5.js";

	var pageTxt = 'lang.navHead', _this, banner, nginx, warnNum,
		warnTime = 180*1000, pwdm;
	
	events.on('isLock', function(type, flag){
		_this.isLock = flag;
	});

	export default {
		name: 'navHead',
		data() {
			return {
				pageTxt,
				isLock: false,
				userName: globalVar.get('accountInfo').name,
				sysUrl: {},
				pwdShow: false,
				oldPwd: '',
				newPwd1: '',
				newPwd2: ''
			}
		},
		methods: {
			home(){
				window.location.href = globalVar.get('nginxIP') + 'fmp/#/home';
			},
			goto(sys){
				var urls = this.sysUrl[sys];
				if(!urls) return;
				window.location.href = urls;
			},
			account(type){
				if(type=='passwd'){
					this.oldPwd = this.newPwd1 = this.newPwd2 = '';
					pwdm.css({top:0, left:0});
					this.pwdShow = true;
				}else if(type=='loginout'){
					utils.hints( {yes: out, txt: pageTxt.tips.loginOut} );
					function out(e){
						_this.$axios.delete(nginx+'logout').then(function(response){
							window.location.href = globalVar.get('login');
						}).catch(function (e) { window.location.href = globalVar.get('login'); });
					}
				}
			},
			modifyPwd(){
				var newPwd1 = this.newPwd1, newPwd2 = this.newPwd2, reg = [/[a-zA-Z]/,/[0-9]/,/[@#*_-]/];
				if(newPwd1!=newPwd2) return utils.weakTips(pageTxt.tips.pwdSame);
				if(newPwd1.length < 12) return utils.weakTips(pageTxt.tips.pwdFormat);
				
				for (var i = 0; i < reg.length; i++) {
					if(!reg[i].test(newPwd1)) break;
				}
				if(i != 3) return utils.weakTips(pageTxt.tips.pwdFormat);
				var tem = newPwd2.replace(/[\w@#*_-]/g,'');
				if(tem!=='') return utils.weakTips(pageTxt.tips.pwdFormat);
				var param = {
//					url:nginx+'userAuthority/modifyPwd',
					oldPassword: md5.hex_md5(this.oldPwd),
					newPassword: md5.hex_md5(newPwd1),
				};
				var url = nginx+'userAuthority/modifyPwd';
				_this.$axios.put(url, param).then(function(response){
					var data = response.data;
					_this.pwdShow = false;
					utils.weakTips(data.errString);
				}).catch(function (e) {});
			},
			swc() {
				if(this.swc_txt == "消息系统") {
					this.swc_txt = "文件系统"
					this.$router.replace({
						path: "/main/mxCfg/file/home"
					});
				} else {
					this.swc_txt = "消息系统"
					this.$router.replace({
						path: "/main/mxCfg/message/userAdd/mess"
					});
				}
			},
			system(e){
				var path;
				switch (e.target.value){
					case '1':
						path = '/main/fxCfg/userHome'; break;
					case '2':
						path = '/main/mxCfg/user'; break;
					case '3':
						path = '/main/webu/realTime/monitoring'; break;
				}
				this.$router.push({path});
			}
		},
		created(){
			_this = this;
			this.pageTxt = pageTxt = lang().navHead;
			nginx = globalVar.get('nginxIP');
			this.pwdShow = false;
		},
		mounted(){
			warnNum = kit('.navHead .ioc3_txt');
			/* getModel();
			banner = new Banner(2500);
			banner.start();
			getWarnInfo(); */
//			getWarnTotal();
			pwdm = addDrag(kit('.navHead .pwdMask'));
		},
		beforeDestroy(){
			// clearTimeout();
		}
	};
	
	function getModel(){
		utils.get({url:nginx+'baseServiceCfg/subSystemUrl',waiting:false}, function(data){
			if(data.errCode!=0){
				return console.log(data.errString);
			}
			var result = data.result, i, len = result.length, obj;
			for (i = 0; i < len; i++) {
				obj = result[i];
				_this.sysUrl[obj.name] = obj.url;
			}
		});
	}
	
	function getWarnInfo(){
		utils.get({url:nginx+'event/newWarning',waiting:false}, function(data){
			if(globalVar.get('debug') !== true) setTimeout(getWarnInfo, warnTime);
			if(data.errCode!=0){
				return console.log(data.errString);
			}
			var result = data.result, i, len = result.length, obj;
			for (i = 0; i < len; i++) {
				obj = result[i];
				obj.level = getLevel(obj.level);
			}
			banner.updata(data.result); //data.result
			if(data.total > 99) data.total = '99+';
			warnNum.text(data.total);
		}, function (e) {
			if(globalVar.get('debug') !== true) setTimeout(getWarnInfo, warnTime);
		});
	}
	function getLevel(level){
		switch(level){
		    case 1: return "普通：";
		   	case 2: return "告警：";
	   		case 3: return "错误：";
	   		case 4: return "严重：";
	   		case 5: return "致命：";
	   		default: return "普通：";
		}
	}
	function getWarnTotal(){
		utils.get({url:nginx+'event/warningCount'}, function(data){
			setTimeout(getWarnTotal, warnTime);
			if(data.errCode!=0){
				return console.log(data.errString);
			}
			if(data.total > 99) data.total = '99+';
			warnNum.text(data.total);
		}, function (e) { setTimeout(getWarnTotal, warnTime); });
	}
	
//	new Blob(['A']);
	
	/*var txtArr = [
		{level:'告警：',occurTime:'2018-03-05 10:31:47',eventInfo:'深圳RU大面积用户掉线。错误代码：SKG9QM2425。'},
		{level:'普通：',occurTime:'2018-09-06 11:04:03',eventInfo:'错误代码SKG5849QM2425。'},
		{level:'错误：',occurTime:'2018-09-01 10:41:29',eventInfo:'SU-R_999SKG9QM2425。'},
		{level:'告警：',occurTime:'2018-03-05 10:31:47',eventInfo:'深圳RU大面积用户掉线。错误代码：SKG9QM2425。'},
		{level:'普通：',occurTime:'2018-09-06 11:04:03',eventInfo:'错误代码SKG5849QM2425。'},
		{level:'错误：',occurTime:'2018-09-01 10:41:29',eventInfo:'SU-R_999SKG9QM2425。'}
	];*/
	function Banner(delay, speed){
		var doc = document, dom = '<li class="warnTxt">{{level}}{{occurTime}} {eventInfo}</li>', warn,
			max, count, list=[], li, timer = kit.timer('linear', 25), once;
		delay = delay || 3000;
		speed = speed || 1000;
		
		!function(){
			count = 0,
			warn = kit('.navHead .warn').click(ck);
		}();
		function init(){
			count = ++count < max ? count : 0;
			var arr = list.slice(count, count+2);
			li.dispose(false);
			li = warn.html(kit.template(arr, dom)).find('.warnTxt');
			setTimeout(function(){ timer.start(speed, moveTo); }, delay);
		}
		function ck(e){
			if(e.target == this) return;
			window.location.href = globalVar.get('nginxIP')+'fmp/#/warnList';
		}
		function updata(arr){
			list = arr;
			max = list.length;
			if(max == 1){
				warn.html(kit.template(list[0], dom));
				return;
			}
			list.push(list[0]);
		}
		this.updata = function(arr){
			if(!(arr instanceof Array)||arr.length==0){
				max = 0;
				list = [];
				warn.html('');
			} else updata.call(this, arr);
		};
		this.start = function(){
			var arr = list.slice(0, 2);
			li = warn.html(kit.template(arr, dom)).find('.warnTxt');
			timer.start(speed, moveTo);
		};
		function moveTo (per) {
			if(max < 2) return;
			var dist = -50*per;
			li.css('top', dist);
		}
		timer.complete(init);
		this.stop = function(arr){
			clearTimeout(once);
			timer.stop();
		};
	}
	
	function addDrag(kel){
		var panle = kel.find('.panle'),
		title = kel.find('.title');
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
</script>

<style scoped="scoped">
	.navHead{z-index: 9000;position: fixed;top:0;left: 0;width: 100%;background: #3571D5;color: #FEFFFF;white-space: nowrap;-moz-user-select: none;-webkit-user-select: none;}
	.navHead *{display: inline-block;vertical-align:middle}
	.logoBox{display: inline-block;width: 226px;height: 50px;background-color: #2861c1}
	.logo{width: 168px; height: 37px; position: absolute; margin: auto; top: 0;bottom: 0; left: 0; right: 0;}
	.messBox{height: 50px; margin-left: 12px;}
	.userBox{position: absolute;height: 50px;top: 0;right: 0;background: #3571D5;}
	.ico1{display: inline-block;cursor:pointer;padding: 10px;}
	.ico2{margin-left: 20px; display: inline-block;}
	.ico3{margin-left: 12px; display: inline-block;} 
	.ioc3_txt{font-size: 11px;font-family: 'Arial';background-color: #FF6B6B; padding: 0 7px; height: 21px; text-align: center; line-height: 22px; border-radius: 20px}
	.warn{display: inline-block;min-width: 620px;height: 50px;overflow: hidden;}
	
	.ico4{margin-right: 8px; display: inline-block;}
	.ico5{margin-left: 8px; display: inline-block;}
	.ico1:hover,.dropTop:hover{background: #407bdd;border-radius: 3px;}
	.dropTop{padding: 0 10px;}
	.margin_left{line-height: 30px; font-size: 13px;color: #FEFFFF}
	.userBox>div:nth-child(1){display: inline-block; margin-right: 10px;}
	.userBox>div:nth-child(2){display: inline-block; margin-right: 12px;}
	.userBox>div:nth-child(3){display: inline-block;}

	.csor,.el-dropdown,.warn,.fbcs_lockBox img{cursor:pointer;}
	.fbcs_lockBox{padding: 12px 10px;margin-top: 6px;}
	
	.pwdMask{display: block;position: fixed;height: 100%;width: 100%;background: rgba(0,0,0,0.2);top: 0;left: 0;z-index: 2;font-size: 0;text-align: center;}
	.pwdMask .panle{display: inline-block;text-align: left;width: 664px;height: 335px;background: #FFF;border-radius: 6px;margin-top: 10%;}
	.pwdMask .title{display: block;border-bottom: 1px solid #d8d8d8;cursor: move;}
	.pwdMask .title b{font-size: 18px;color: #656a73;line-height: 50px;padding-left: 20px;}
	.pwdMask .close{position: absolute;top: 16px;right: 19px;}
	.pwdMask .pwdBox{display: block;margin-top: 40px;}
	.pwdBox li{display: block;margin-bottom: 10px;}
	.pwdBox li > *{vertical-align: middle;}
	.pwdMask .red{color: #F00;}
	.pwdBox .label{width: 234px;font-size: 14px;text-align: right;color: #686868;line-height: 30px;padding-right: 8px;}
	.pwdBox ._footBtn{margin: 40px 0 0;}
	.pwdBox input,.pwdBox .txt{width: 252px;font-size: 14px;height: 30px;border: 1px solid #d8d8d8;padding: 0 10px;color: #686868;}
	.pwdBox .txt{border: none;line-height: 30px;}
	.sys{position: absolute;top: 10px;right: 50px;z-index: 2;color: #0DB9EB;border: 1px solid #0DB9EB;background: #FFF;display: inline-block; 
		height: 30px; border-radius: 6px; vertical-align: middle; font-size: 12px; line-height: 30px; padding: 0 10px; min-width: 88px;}
	.sl{padding: 5px 10px;text-align: center;overflow: hidden;color: #00B5EA;-webkit-appearance: button}
</style>
<style>
	.navHead .warnTxt{display: block;font-size: 13px;line-height: 50px; margin-left: 8px;}
</style>