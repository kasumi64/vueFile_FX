<template>
	<div class="editBiz">
		<header class="backHead">
			<span class="back" @click="back">&lt; {{$t('fbcsFile.tips.back')}}</span>
			<b class="h1">{{$t('fbcsFile.order.editBiz.title')}}</b>
		</header>
		<ul class="form">
			<li>
				<div class="label">{{$t('fbcsFile.order.editBiz.bizKey')}}</div>
				<div class="right">
					<input v-model="info.bizKey" disabled autocomplete="off"/>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.id')}}</div>
				<div class="right">
					<input v-model="info.userID" :disabled="isAdd!='add'" maxlength="31" autocomplete="off"/>
				</div>
			</li><li>
				<div class="label">
					<i class="red">*</i>
					{{$t('fbcsFile.userInfo.name')}}
				</div>
				<div class="right">
					<input v-model="info.userName"  maxlength="63" autocomplete="off"/>
				</div>
			</li><li v-if="isAdd=='add'">
				<div class="label" style="vertical-align: top;">
					<i class="red">*</i>
					{{$t('fbcsFile.userInfo.pwd')}}
				</div>
				<div class="right"><!--密码-->
					<el-radio-group v-model="info.isModifyDefaultPasswd" @change="defPwd" class="radio">
						<el-radio :label="0">{{$t('fbcsFile.userInfo.def')}}</el-radio>
						<el-radio :label="1">{{$t('fbcsFile.userInfo.hm')}}</el-radio>
					</el-radio-group>
					<input v-model="info.userPasswd" :disabled="!info.isModifyDefaultPasswd" maxlength="18" autocomplete="off"/>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.type')}}</div>
				<div class="right">
					<el-select v-model="info.userType">
						<el-option v-for="item in userType" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.inZone')}}</div>
				<div class="right">
					<el-select v-model="info.inZone">
						<el-option v-for="item in inZone" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.group')}}</div>
				<div class="right">
					<el-select v-model="info.linkGroupName">
						<el-option v-for="item in group" :key="item.groupID" :label="item.groupID" :value="item.groupID">
						</el-option>
					</el-select>
				</div>
			</li><li>
				<div class="label">
					<i class="red">*</i>
					{{$t('fbcsFile.userInfo.speed')}}
				</div>
				<div class="right">
					<input v-model="info.speedCtrl" data-k="speedCtrl" @input="onlyNum_1($event)" maxlength="18" autocomplete="off"/>
					<span class="small">Kbit/s({{$t('fbcsFile.userInfo.Kbit')}})</span>
					<!--
						oninput="if(value.length>5)value=value.slice(0,5)"
						return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )
					-->
				</div>
			</li><li>
				<div class="label">
					<i class="red">*</i>
					{{$t('fbcsFile.userInfo.maxUser')}}
				</div>
				<div class="right">
					<input v-model="info.maxRelationUser" data-k="maxRelationUser" @input="onlyNum($event)" maxlength="9" autocomplete="off"/>
				</div>
			</li><li>
				<div class="label">
					<i class="red">*</i>
					{{$t('fbcsFile.order.editBiz.remark')}}
				</div>
				<div class="right">
					<input v-model="info.remark"  maxlength="128" autocomplete="off"/>
				</div>
			</li><li>
				<div class="label" style="vertical-align: top;">{{$t('fbcsFile.userInfo.encFlag')}}</div>
				<div class="right"><!--加密方式-->
					<el-radio-group v-model="info.encFlag" class="radio">
						<el-radio :label="1">{{$t('fbcsFile.userInfo.hard')}}</el-radio>
						<el-radio :label="2">{{$t('fbcsFile.userInfo.soft')}}</el-radio>
					</el-radio-group>
				</div>
			</li><li v-if="info.encFlag==1">
				<div class="label">{{$t('fbcsFile.userInfo.beginTime')}}</div>
				<div class="right">
					<el-date-picker v-model="info.beginSoftEncTime" class="picker" type="datetime" :clearable="true" :editable="false"
						 :placeholder="$t('fbcsFile.tips.date')" value-format="timestamp" default-time="00:00:00">
					</el-date-picker>
					<!--:picker-options="pickerBegin"-->
				</div>
			</li><li v-if="info.encFlag==1">
				<div class="label">{{$t('fbcsFile.userInfo.endTime')}}</div>
				<div class="right">
					<el-date-picker v-model="info.endSoftEncTime" class="picker" type="datetime" :clearable="true" :editable="false"
						 :placeholder="$t('fbcsFile.tips.date')" value-format="timestamp" default-time="23:59:59">
					</el-date-picker>
					<!--:picker-options="pickerEnd"-->
				</div>
			</li>
		</ul>
		
		<div class="more">
			<el-checkbox v-model="more" :label="$t('fbcsFile.userInfo.more')" border></el-checkbox>
		</div>
		
		<ul v-if="more" class="form">
			<li>
				<div class="label">{{$t('fbcsFile.userInfo.online')}}</div>
				<div class="right">
					<el-select v-model="info.notOnlineAlarm">
						<el-option v-for="item in blo" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.broadcast')}}</div>
				<div class="right">
					<el-select v-model="info.allowBroadcast">
						<el-option v-for="item in blo" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.connFlag')}}</div>
				<div class="right">
					<el-select v-model="info.allowConnFlag">
						<el-option v-for="item in blo" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.switchMsg')}}</div>
				<div class="right">
					<el-select v-model="info.allowSwitchMsg">
						<el-option v-for="item in blo" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.allowPublishTopicCount')}}</div>
				<div class="right">
					<input v-model="info.allowPublishTopicCount" data-k="allowPublishTopicCount" @input="onlyNum($event)" maxlength="4" autocomplete="off"/>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.allowSubscribeTopicCount')}}</div>
				<div class="right">
					<input v-model="info.allowSubscribeTopicCount" data-k="allowSubscribeTopicCount" @input="onlyNum($event)" maxlength="4" autocomplete="off"/>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.maxPublishTopicDay')}}</div>
				<div class="right">
					<input v-model="info.maxPublishTopicDay" data-k="maxPublishTopicDay" @input="onlyNum($event)" maxlength="4" autocomplete="off"/>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.maxSimultTaskCount')}}</div>
				<div class="right">
					<input v-model="info.maxSimultTaskCount" data-k="maxSimultTaskCount" @input="onlyNum($event)" maxlength="9" autocomplete="off"/>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.maxCltOneDayTaskCount')}}</div>
				<div class="right">
					<input v-model="info.maxCltOneDayTaskCount" data-k="maxCltOneDayTaskCount" @input="onlyNum($event)" maxlength="9" autocomplete="off"/>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.webFlag')}}</div>
				<div class="right">
					<el-select v-model="info.webUserFlag">
						<el-option v-for="item in blo" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</li><li v-if="isAdd=='add'">
				<div class="label">{{$t('fbcsFile.userInfo.indate')}}</div>
				<div class="right">
					<el-select v-model="info.expiredTimeFlag">
						<el-option v-for="item in indate" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</li><li v-if="isAdd!='add'">
				<div class="label">{{$t('fbcsFile.userInfo.buildTime')}}</div>
				<div class="right">
					<input v-model="buildTime" disabled autocomplete="off"/>
				</div>
			</li>
		</ul>
		<ul class="btnBox">
			<li>
				<div class="label">&nbsp;</div>
				<div class="right">
					<!-- <button v-if="fxAuth" @click="now" class="blueBtn">{{$t('fbcsFile.tips.now')}}</button> -->
					<button v-if="fxAuth" @click="submit" class="blueBtn">{{$t('fbcsFile.tips.ok')}}</button>
					<button @click="back" class="defBtn">{{$t('fbcsFile.tips.back')}}</button>
				</div>
			</li>
		</ul>
		<lgy-review :show.sync='showReview' :reqsv='reqsv' @submit='review' :txt='reviewTxt'></lgy-review>
		<lgy-wheelReq :parameter.sync="parameter" @finish="finish"></lgy-wheelReq>
	</div>
</template>

<script>
	import utils from '@/fbcsFxViews/libs/utils.js';
	import md5 from '@/fbcsFxViews/libs/md5.js';
	import moment from 'moment';
	
	var _this, args, defaultPwd, 
	_info = {
		userID: '', userName: '', userType: '1', userPasswd: '', inZone: '',linkGroupName: '', speedCtrl: -1,
		maxRelationUser: '',notOnlineAlarm: 0, encFlag: 1, beginSoftEncTime: '', endSoftEncTime: '',
		allowBroadcast: 0, allowConnFlag: 1, allowSwitchMsg: 1, allowPublishTopicCount: 5, allowSubscribeTopicCount: 5,
		maxPublishTopicDay: 7, maxSimultTaskCount: 30, maxCltOneDayTaskCount: 500000, webUserFlag: '',
		isModifyDefaultPasswd: '', expiredTimeFlag: '', bizKey: '', remark: ''
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
				default: 'edit'
			},
			tab: '',
			isNew: false
		},
		methods:{
			back(){
				this.$router.replace({path: '/main/fxCfg/order/xiaozhan'});
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
					params.url = 'userinfocmd/modify';
					params.cmdID = '700003';
					delete params.userPasswd;
					params.operator = utils.userName();
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
				params.reviewerPassword = obj.pwd;
				params.reviewType = 1;
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
			args = utils.getArgs('bizKey');
			initDate();
			getDict();
			getDefPwd();
			if(this.isAdd!='add'&&args&&args.userID){
				getUserInfo(args);
			}
		}
	}
	
	function pass(){
		let must = ('userName,speedCtrl,maxRelationUser').split(','),
			info = this.info, err = 'fbcsFile.err.user.';
		
		for (var i = 0; i < must.length; i++) {
			let k = must[i], str = info[k];
			if(utils.isSpace(str)) {
				utils.alert({txt: this.$t(err + k)});
				return false;
			}
		}
		
		if(/[^\w-]/.test(info.userID)){
			utils.alert({txt: this.$t(err + 'idformat')});
			return false;
		} else if(/[|$%,";:/\\]/.test(info.userName)){
			utils.alert({txt: this.$t(err + 'nameformat')});
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
					txt = this.$t(err + 'pwdRule');
				}
			}
			
			if(txt){
				utils.alert({txt});
				return false;
			}
		}
		
		let speed = parseInt(info.speedCtrl),
			maxUser = parseInt(info.maxRelationUser),
			maxTask = parseInt(info.maxSimultTaskCount),
			oneTask = parseInt(info.maxCltOneDayTaskCount);
		
		if(!(speed>=-1&&speed<=999999999999999999)){
			utils.alert({txt: this.$t(err + 'speed')});
			return false;
		} else if (maxTask < 1){
			utils.alert({txt: this.$t(err + 'maxTask')});
			return false;
		} else if(!info.remark||info.remark.trim()==''){
			utils.alert({txt: this.$t('fbcsFile.order.manage.remarks')});
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
			if(begin==null||end==null||begin > end) {
				utils.alert({txt: this.$t(err + 'softDay')});
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
			if(info[k]===''){
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
		info.userType = '1';
		info.inZone = '';
		info.linkGroupName = '任意';
		info.speedCtrl = -1;
		info.maxRelationUser = 1000;
		info.encFlag = 1;
		info.notOnlineAlarm=0;
		info.allowBroadcast= 0; 
		info.allowConnFlag= 1;
		info.allowSwitchMsg= 1;
		info.allowPublishTopicCount= 5; 
		info.allowSubscribeTopicCount= 5;
		info.maxPublishTopicDay= 7;
		info.maxSimultTaskCount= 30;
		info.maxCltOneDayTaskCount= 500000;
		info.webUserFlag = 0;
		info.expiredTimeFlag = '1';
		
		_this.more = false;
		_this.userType = _this.inZone = _this.group = [];
		_this.indate = _this.$t('fbcsFile.password.options');
		_this.showReview = false;
		_this.parameter = null;
		
		let day = new Date();
		day.setHours(0, 0, 0, 0);
		info.beginSoftEncTime = day.getTime();
		day.setHours(23, 59, 59, 0);
		info.endSoftEncTime = day.getTime();
	}
	
	function getUserInfo(user){
		
		_this.info = user;
		
		return;
		
		//旧逻辑
		let params = {
			url: 'userinfocmd/query',
			cmdID: '700002',
			userID: user.bizKey
		};
		utils.post(params).then(function(res){
			if(res.errcode != '0') return utils.alert({txt: res.errinfo});
			var obj = res.lists[0];
			if(!obj) return _this.info.userID = args.userID;
			
			if(obj.userConfigDate){
				_this.buildTime = moment(obj.userConfigDate * 1000).format('YYYY-MM-DD HH:mm:ss');
			} else _this.buildTime = '';
			
			obj.beginSoftEncTime = obj.beginSoftEncTime * 1000;
			obj.endSoftEncTime = obj.endSoftEncTime * 1000;
			if(!obj.beginSoftEncTime) obj.beginSoftEncTime = null;
			if(!obj.endSoftEncTime) obj.endSoftEncTime = null;
			obj.isModifyDefaultPasswd = 0;
			obj.expiredTimeFlag = '1';
			obj.userPasswd = '';
			obj.remark = obj.remark || '';
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
	
</script>

<style scoped="scoped">
.editBiz{min-width: 500px;}
.form{white-space: nowrap;}
.form li{margin-bottom: 10px;}
.label{display: inline-block;width: 160px;font-size: 14px;color: #666;text-align: right;vertical-align: middle;}
.right{display: inline-block;margin-left: 10px;vertical-align: middle;}
.radio{display: block;margin-bottom: 10px;}
.more{margin-left: 160px;padding: 10px;}
.btnBox button{margin-right: 10px;margin-top: 20px;}
.small{font-size: 12px;margin-left: 10px;color: #999;vertical-align: middle;}
</style>
