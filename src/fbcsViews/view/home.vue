<template>
	<div ref="fbcs_MX" id="fbcs_MX" class="home">
		<input class="opacity0" autocomplete="on"/>
		<navhead></navhead>
		<div class="cw">
			<sidebar></sidebar>
			<div class="homeView">
				<div v-if="isLock==true" class="lockTxt">{{pageTxt.label[0]}}</div>
				<div class="router">
					<router-view></router-view>
				</div>
			</div>
		</div>
		<div class="mask homeReview" v-show="review">
			<input class="opacity0" autocomplete="on"/>
			<div class="panle">
				<div>
					<p class="title">{{pageTxt.label[1]}}</p>
					<img class="close" @click="close" src="../img/close.png" />
				</div><ul class="mess">
					<li>
						<label class="lab">{{pageTxt.label[2]}}</label>
						<span class="int">{{userName}}</span>
					</li><li>
						<label class="lab">{{pageTxt.label[3]}}</label>
						<input class="inp" v-model="password" type="password" autocomplete="off"/>
					</li>
				</ul><div class="_footBtn">
					<button class="blueBtn" @click="submit">{{pageTxt.label[4]}}</button>
					<button class="defBtn" @click="close">{{pageTxt.label[5]}}</button>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
import  '@/fbcsViews/libs/css/fdep.css';
import kit		 from '../libs/kit.js';
import utils	 from '../libs/utils.js';
import globalVar from '../libs/globalVar.js';
import lang		 from '../language/lang.js';
import events 	 from '../libs/observer.js';
import md5       from '../libs/md5.js';
import navhead   from '@/fbcsViews/view/navHead.vue';
import sidebar   from '@/fbcsViews/view/sidebar.vue';
import fxUtils from '@/fbcsFxViews/libs/utils.js';
	
	var pageTxt = 'lang.home', _this, router, lockArgs, adminInfo, pwdm;
	var lock, unlock, lockTime = 0;
	
	export default {
		name: 'home',
		data() {
			return {
				pageTxt,
				isLock: false,
				review: false,
				userName: '',
				password: ''
			};
		},
		methods: {
			submit(){
				if(!this.password) return fxUtils.alert({txt: _this.pageTxt.tips.errPass});
				var param = {
					cmdID: '600112',
					reviewer: this.userName,
					password: md5.hex_md5(this.password),
					uri: '/fbcs_mx/mx/lock/lock',
					language: globalVar.get('lang')
				};
				utils.post('mx/auth/review', param, function(data){
//					console.log('锁定pass：', data);
					if(data.errcode != 0) return fxUtils.alert({txt: data.errinfo});
					lockArgs.reviewer = param.reviewer;
					lockArgs.password = param.password;
					locked(lockArgs);
					_this.close();
				}, function(e){
					locked(lockArgs);
				});
			},
			close(){
				this.password = '';
				this.review = false;
			}
		},
		beforeCreate(){
			fxUtils.setBaseURL(globalVar.get('urlIP') + 'mx/');
			utils.getMxAuth();
		},
		created(){
			_this = this;
			this.pageTxt = pageTxt = lang().home;
			this.review = false;
		},
		mounted(){
			fxUtils.emit('fbcs_file', this.$refs['fbcs_MX']);
			this.userName = globalVar.get('accountInfo').name;
			router = kit('.router');
			var lockAuth = globalVar.get('status').lock;
			unlock = kit('.fbcs_lockBox #fbcsMX_unlock').click(function(e){
				lockArgs = {
					txt: _this.pageTxt.tips.lock,
					flag: true,
					height: 'calc(100% - 44px)',
					url: 'mx/lock/lock',
					cmdID: '600102'
				};
				if(lockAuth < 2) fxUtils.alert({txt: pageTxt.tips.lockAuth});
				else {
					pwdm.css({top:0, left:0});
					_this.review = true;
				}
//				locked(args);
			});
			lock = kit('.fbcs_lockBox #fbcsMX_lock').click(function(e){
				lockArgs = {
					txt: _this.pageTxt.tips.unlock,
					flag: false,
					height: '100%',
					url: 'mx/lock/unlock',
					cmdID: '600103'
				};
				if(lockAuth < 2) fxUtils.alert({txt: pageTxt.tips.lockAuth});
				else {
					pwdm.css({top:0, left:0});
					_this.review = true;
				}
//				locked(args);
			});
			checkLock();
			pwdm = addDrag(kit('.homeReview'));
		},
		beforeDestroy(){
			clearTimeout(lockTime);
		},
		components: {navhead, sidebar}
	};
	function locked(obj){
		utils.hints({
			txt: obj.txt,
			yes: function(){
				var param = {
					cmdID: obj.cmdID,
					url: obj.url,
					reviewer: obj.reviewer,
					reviewerPassword: obj.password,
					reviewType: 0
				};
				utils.post(param, function(data){
					// console.log('锁定：', data);
					if(data.errcode != 0) return fxUtils.alert({txt: data.errinfo});
					_this.isLock = obj.flag;
					events.emit('isLock', obj.flag);
					router.css('min-height', obj.height);
				});
			}
		});
	}
	function checkLock(){
		var param = {
			url: 'mx/lock/query',
			cmdID: '600101',
			waiting: false
		};
		utils.post(param, function(data){
//			console.log('查锁：', data);
			if(data.errcode != 0) return console.log(data.errinfo);
			if(data.operationLockStatus == '1'){ //锁定
				_this.isLock = true;
				lock.show();
				unlock.hide();
				router.css('min-height', 'calc(100% - 44px)');
			} else {
				_this.isLock = false;
				lock.hide();
				unlock.show();
				router.css('min-height', '100%');
			}
			// if(globalVar.get('debug') !== true) lockTime = setTimeout(checkLock, 5000);
		});
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

<style scoped>
	.home{white-space: nowrap;height: 100%;}
	.home .cw{height: calc(100% - 50px);margin-top: 50px;}
	.el-menu{border: none;}
	.homeView{
		margin-left: 226px;
		height:100%;
		/*padding: 20px;*/
		vertical-align: top; 
		background-color: #FFF;
		overflow: auto;
		/*border: 20px solid #EDF0F5; */
		border-right: none;
	}
	.lockTxt{height: 44px;line-height: 44px;font-size: 14px;padding-left: 14px;color: #ff7a7d;background: #FFF;font-weight: bold;}
	.router{
		min-height: 100%;
	    -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
		box-shadow: 0 6px 7px 7px rgba(229,233,240,0.18);
		background-color: #FFF;border: 1px solid #EBEFF4;border-right: none;
	}
	
	.mask{position:fixed;top:0;left:0;z-index:2000;width:100%;height:100%;text-align:center;font-size:0;}
	.mask{background: rgba(59, 65, 75, 0.2);}
	.mask .panle{display: inline-block; width: 560px; margin-top: 180px; background: #FFF; border-radius: 4px;}
	.mask .title{font-size: 16px; color: #656A73; font-weight: bold; text-align: left; text-indent: 20px; border-bottom: 1px solid #D7D8DA;
		line-height: 50px; height: 50px;cursor: move;}
	.mask .close{position: absolute; top: 17px; right: 20px; cursor: pointer;}
	.mask .mess{padding: 40px 0;text-align: left;}
	.mask *{vertical-align: middle;}
	.mask li{margin-bottom: 10px;}
	.mask .lab{display: inline-block;width: 165px;font-size: 14px; color: #666; line-height: 30px;height: 30px;text-align: right;padding-right: 10px;}
	.mask .inp,.mask .int{display: inline-block;width: 255px;font-size: 14px; color: #666; height: 30px;padding: 0 10px;border: 1px solid #D7D8DA;}
	.mask .inp:focus{border: 2px solid #32CCF9;}
	.mask .int{line-height: 30px;border: none;}
</style>
