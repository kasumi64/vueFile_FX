<template>
	<div class="editTheme">
		<h2 class="h2">
			<em @click="back">
				<img class="icon" src="@/fbcsViews/img/ico.png" />
				<span class="topBack">{{pageTxt.label[11]}}</span>
			</em>
			<span class="span">{{pageTxt.label[1]}}</span>
		</h2>
		<!--<el-tabs v-model="active" type="card" @tab-click="tabsCK">-->
			<!--<el-tab-pane :label="pageTxt.label[1]" name="first">-->
				<ul class="list">
					<li>
						<label class="txt">{{pageTxt.label[2]}}</label>
						<div class="rightBox">
							<span class="txt1">{{info.topicName}}</span>
						</div>
					</li><li>
						<label class="txt">{{pageTxt.label[3]}}</label>
						<div class="rightBox">
							<span class="txt1">{{info.pubUserID}}</span>
						</div>
					</li><li>
						<label class="txt">{{pageTxt.label[4]}}</label>
						<div class="rightBox">
							<span class="txt1">{{info.pubTime}}</span>
						</div>
					</li><li>
						<label class="txt">{{pageTxt.label[17]}}</label>
						<div class="rightBox">
							<span class="txt1">{{info.effectiveDays}}</span>
						</div>
					</li><li>
						<label class="txt"><b class="red">*&nbsp;</b>{{pageTxt.label[5]}}</label>
						<div class="rightBox">
							<el-input auto-complete="off" :placeholder="pageTxt.must" v-model="info.topicDescr" maxlength="512" clearable></el-input>
						</div>
					</li><li>
						<label class="txt"><b class="red">*&nbsp;</b>{{pageTxt.label[6]}}</label>
						<div class="rightBox">
							<el-input auto-complete="off" :placeholder="pageTxt.must" type='textarea' v-model="info.topicInfo" maxlength="2048" :autosize="{ minRows: 4, maxRows: 40}"></el-input>
						</div>
					</li><li>
						<label class="txt">{{pageTxt.label[7]}}</label>
						<div class="rightBox">
														
							<div class="tableBox ht">
								<div class="title">{{pageTxt.label[8]}}</div>
								<div class="searchBox">
									<input class="search" v-model="leftWord" :placeholder="pageTxt.tips.word" autocomplete="off"/>
									<button class="el-icon-search blueBtn" @click="leftSearch">{{pageTxt.label[18]}}</button>
								</div>
								<div class="slotTitle">
									<input v-model="leftSelect" @click='leftckAll($event)' type="checkbox" class="check" autocomplete="off"/>
									<span class="itemTxt">{{pageTxt.list[0]}}</span>
									<span class="itemTxt">{{pageTxt.list[1]}}</span>
								</div>
								<ul id="_allUser" ref='left' class="table">
									<li v-for="obj in left">
										<input :ind='obj.ind' @click='leftck($event)' type="checkbox" class="check" autocomplete="off"/>
										<span class="itemTxt" :title="obj.userID">{{obj.userID}}</span>
						    			<span class="itemTxt" :title="obj.userName">{{obj.userName}}</span>
									</li>
								</ul>
							</div>
							
							<div class="transferBtn">
								<button @click="toRight" class="el-icon-arrow-right btn"></button>
								<button @click="toFeft" class="el-icon-arrow-left btn"></button>
							</div>
							
							<div class="tableBox ht">
								<div class="title">{{pageTxt.label[15]}}</div>
								<div class="searchBox">
									<input class="search" v-model="rightWord" :placeholder="pageTxt.tips.word" autocomplete="off"/>
									<button class="el-icon-search blueBtn" @click="rightSearch">{{pageTxt.label[18]}}</button>
								</div>
								<div class="slotTitle">
									<input v-model="rightSelect" @click='rightckAll($event)' type="checkbox" class="check" autocomplete="off"/>
									<span class="itemTxt">{{pageTxt.list[0]}}</span>
									<span class="itemTxt">{{pageTxt.list[1]}}</span>
								</div>
								<ul id="_cansub" ref='right' class="table">
									<li v-for="obj in right">
										<input :ind='obj.ind' @click='rightck($event)' type="checkbox" class="check" autocomplete="off"/>
										<span class="itemTxt t3" :title="obj.userID">{{obj.userID}}</span>
						    			<span class="itemTxt" :title="obj.userName">{{obj.userName}}</span>
										<img class="addIcon" v-if="obj.hide!='hide'" @click="addAppid(obj)" src="@/fbcsViews/img/theme/add_1.png" alt="">
									</li>
								</ul>
							</div>
							
							<div class="transferBtn"></div>
							
							<div class="tableBox ht">
								<div class="title">{{pageTxt.label[16]}}</div>
								<div class="searchBox">
									<input class="search" v-model="appidWord" :placeholder="pageTxt.tips.word" autocomplete="off"/>
									<button class="el-icon-search blueBtn" @click="appidSearch">{{pageTxt.label[18]}}</button>
								</div>
								<div class="slotTitle">
									<span class="itemTxt2 t2">{{pageTxt.list[0]}}</span>
									<span class="itemTxt2 t2">{{pageTxt.list[1]}}</span>
									<span class="itemTxt2 t2">{{pageTxt.list[2]}}</span>
								</div>
								<ul ref='appid' class="table">
									<li v-for="(obj, i) in appid" > <!--info.subsUserList-->
										<img class="trsIcon" @click="delAppid(i)" src="@/fbcsViews/img/theme/del_1.png">
										<span class="itemTxt2 t2" :title="obj.userID">{{obj.userID}}</span>
						    			<span class="itemTxt2 t2" :title="obj.userName">{{obj.userName}}</span>
										<input :class="appidClass(obj.userAppid)" @input="inck($event, obj, i)" :value="obj.userAppid" maxlength="32" autocomplete="off"/>
									</li>
								</ul>
							</div>
							
						</div>
					</li>
					<!--<li>
						<label class="txt">&nbsp;</label>
						<div class="rightBox">
							<p class="jg"></p>
							<button class="blueBtn" @click="nextNow">{{pageTxt.label[14]}}</button>
							<button class="blueBtn" @click="next">{{pageTxt.label[10]}}</button>
							<button class="defBtn" @click="back">{{pageTxt.label[11]}}</button>
							<p class="jg"></p>
						</div>
					</li>-->
					<li>
						<label class="txt">&nbsp;</label>
						<div class="rightBox">
							<p class="jg"></p>
							<button v-if="auth" class="blueBtn" @click="nowAll">{{pageTxt.label[14]}}</button>
							<button v-if="auth" class="blueBtn" @click="submit">{{pageTxt.label[10]}}</button>
							<button class="defBtn" @click="back">{{pageTxt.label[11]}}</button>
							<p class="jg"></p>
						</div>
					</li>
				</ul>
			<!--</el-tab-pane>-->
		<lgy-loopReqMX ref="loop" @close="loopClose"></lgy-loopReqMX>
	</div>
</template>

<script>
import kit       from '@/fbcsViews/libs/kit.js';
import utils     from '@/fbcsViews/libs/utils.js';
import globalVar from '@/fbcsViews/libs/globalVar.js';
import lang      from '@/fbcsViews/language/lang.js';
import fxUtils from '@/fbcsFxViews/libs/utils.js';


	var pageTxt, all = false, _this,junk=[];
	
	var _cans, list = [], leftAll = {}, rightAll = {}, subAll = {}, 
		maxSub = 1, canCount = 0, subK = 1, leftTem = {}, rightTem = {};
//	for (var i = 0; i < 10; i++) {
//		var obj = {
//			key:i, userID: 'userID'+kit.randomNum(10,99),
//			userName: '用户名'+i, userAppid:'appid'+i
//		};
//		obj.label = obj.userID + obj.userName;
//		list.push(obj);
//	}
	
	var data = {
		auth: fxUtils.getMxAuth,
		pageTxt,
		active: 'first',
		info: {topicName:'',pubUserID:'',pubTime:'',topicDescr:'',topicInfo:'',
			canSubsUserList:[],subsUserList:[]},
		list: list,
		keys: [],
		left: {},
		leftWord: '',
		right: {},
		rightWord: '',
		canSub: {},
		canWord: '',
		appid: {},
		appidWord: '',
		leftSelect: false,
		rightSelect: false,
		appidClass(val){
			return (/[:|：｜\%]/i).test(val)?'appInput2':'appInput1';
		}
	};
	
	export default {
		name: 'message_editTheme',
		data() {
			return data;
		},
		methods: {
			tabsCK(){
				this.canSub = toObject(rightAll);
				var k, obj, sub = {};
				for (k in subAll) {
					obj = subAll[k];
					if(inObject(obj.userID, rightAll)){
						sub[k] = obj;
					} else delete subAll[k];
				}
				this.appid = sub;
				this.canWord = this.appidWord = '';
			},
			back(){ utils.goto('/message/release'); },
			next(){
				if(isNull()) return;
				if( isSelectUser() ){
					this.active = 'second';
					this.tabsCK();
				} else {
					var info = this.info;
					info.cmdID = '600051';
					info.operator = 'admin';
					info.canSubsUserList = toArray(rightAll);
					utils.hints({
						txt: pageTxt.tips.send,
						yes: function(){
							utils.post('mx/pubTopic/modifyTopic', info, function(data){
//								console.log('修改主题1：',data);
								if(data.errcode != 0&&data.errcode != 1) {
									// utils.weakTips(data.errinfo);
									fxUtils.alert({txt: data.errinfo});
								}
								// utils.weakTips(data.errinfo);
								fxUtils.alert({txt: data.errinfo, type: 1});
								utils.goto('/message/release');
							});
						}
					});
				}
			},
			nextNow(){
				if(isNull()) return;
				if( isSelectUser() ){
					utils.hints({
						txt: pageTxt.tips.nextNow,
						yes: function(){
							_this.active = 'second';
							_this.tabsCK();
						}
					});
				} else {
					utils.review({
						uri: 'mx/pubTopic/modifyTopicImmediately',
						yes: function(args){
							var info = _this.info;
							info.url = 'mx/pubTopic/modifyTopicImmediately';
							info.cmdID = '600055';
							info.operator = 'admin';
							info.reviewer = args.name;
							info.reviewerPassword = args.pwd;
							info.reviewType = 1;
							info.canSubsUserList = toArray(rightAll);
							utils.hints({
								txt: pageTxt.tips.now,
								yes: function(){
									utils.post(info, nextModify);
								}
							});
						}
					});
				}
				function nextModify(data){
//					console.log('修改主题1：',data);
					var code = data.errcode, msg = data.errinfo;
					if(code == '0'){
						modify();
					} else if(code == '1'){
						var txt = '<p class="part">';
						if(msg.length > 100){
							txt += msg.substring(0, 100) + '...</p>';
						} else txt += msg + '</p>';
						txt += pageTxt.tips.part;
						utils.hints({
							txt, yes: modify
						});
					} else {
						// utils.weakTips(msg);
						fxUtils.alert({txt: msg, type: 0});
					}
					function modify(){
						utils.wheelReq(data); //轮循
						utils.goto('/message/release');
					}
				}
			},
			addAppid(row){
				var obj = {
					userID: row.userID,
					userName: row.userName,
					userAppid: '',
				};
				this.appid[++subK] = obj;
				this.appid = toObject(this.appid)
				subAll[subK] = obj;
			},
			delAppid(index){
				var data = this.appid[index];
				if(data){
					delete this.appid[index];
					delete subAll[index];
					this.appid = toObject(this.appid);
				}
			},
			inck(e, row, i){
				row.userAppid = e.target.value;
			},
			nowAll(){ submitAll('now'); },
			submit(){ submitAll('send'); },
			
			leftck(e){
				var el = e.target, ind = el.getAttribute('ind');
				if(el.checked){
					var data = leftAll[ind];
					if(data){
						data.el = el;
						leftTem[ind] = data;
					}
				} else {
					delete leftTem[ind];
					this.leftSelect = false;
				}
			},
			rightck(e){
				var el = e.target, ind = el.getAttribute('ind');
				if(el.checked){
					var data = rightAll[ind];
					if(data){
						data.el = el;
						rightTem[ind] = data;
					}
				} else {
					delete rightTem[ind];
					this.rightSelect = false;
				}
			},
			leftckAll(e){
				var check = e.target.checked;
				leftTem = {};
				kit('.editTheme #_allUser .check').each( (el)=>{
					var ind = el.getAttribute('ind');
					var data = leftAll[ind];
					if(data){
						data.el = el;
						leftTem[ind] = data;
					}
					el.checked = check;
				});
				if(!check) leftTem = {};
			},
			rightckAll(e){
				var check = e.target.checked;
				rightTem = {};
				kit('.editTheme #_cansub .check').each( (el)=>{
					var ind = el.getAttribute('ind');
					var data = rightAll[ind];
					if(data){
						data.el = el;
						rightTem[ind] = data;
					}
					el.checked = check;
				});
				if(!check) rightTem = {};
			},
			toRight(){//选中
				var c = canCount + toArray(leftTem).length;
//				console.log('已选：', c);
				if(c > maxSub) {
					// utils.weakTips(this.pageTxt.tips.maxSubs);
					fxUtils.alert({txt: this.pageTxt.tips.maxSubs});
					return
				}
				var flag = false;
				for (var k in leftTem) {
					var obj = leftTem[k];
					delete leftAll[k];
					delete this.left[k];
					rightAll[k] = obj;
					this.right[k] = obj;
					obj.el.checked = false;
					flag = true;
					canCount++;
				}
				leftTem = {};
				if(!flag) return;
				var temp = this.right;
				this.right = {};
				this.right = temp;
				this.rightSelect = this.leftSelect = false;
			},
			toFeft(){//取消
				var flag = false;
				for (var k in rightTem) {
					var obj = rightTem[k];
					delete rightAll[k];
					delete this.right[k];
					leftAll[k] = obj;
					this.left[k] = obj;
					obj.el.checked = false;
					canCount--;
					flag = true;
				}
				rightTem = {};
				if(!flag) return;
				var temp = this.right;
				this.right = {};
				this.right = temp;
				this.rightSelect = this.leftSelect = false;
//				console.log(canCount);
				
				//appid
				var k, obj, sub = {};
				for (k in subAll) {
					obj = subAll[k];
					if(inObject(obj.userID, rightAll)){
						sub[k] = obj;
					} else delete subAll[k];
				}
				this.appid = sub;
			},
			leftSearch(){
				var word = this.leftWord.toUpperCase(), cu = 0, list = {};
				for (var k in leftAll) {
					var id, name, obj = leftAll[k];
					if(rightAll[obj.ind]) continue;
					id = name = '';
					if(obj.userID) id = obj.userID.toUpperCase();
					if(obj.userName) name = obj.userName.toUpperCase();
					if(word==''||id.indexOf(word)>-1||name.indexOf(word)>-1) {
						cu++;
						list[k] = obj;
					}
					if(obj.el) {
						obj.el.checked = false;
					}
//					if(cu==200) break;
				}
				this.$refs.left.scrollTop = 0;
				this.left = list;
				leftTem = {};
				this.leftSelect = false;
			},
			refreshList(word, data, target, limit){
				var cu = 0, list = {};
				word = word.toUpperCase();
				for (var k in data) {
					var id, name, obj = data[k];
					id = name = '';
					if(obj.userID) id = obj.userID.toUpperCase();
					if(obj.userName) name = obj.userName.toUpperCase();
					if(word==''||id.indexOf(word)>-1||name.indexOf(word)>-1) {
						cu++;
						list[k] = obj;
					}
					if(obj.el) {
						obj.el.checked = false;
					}
				}
				this.$refs[target].scrollTop = 0;
				this[target] = list;
				if(target=='right'){
					rightTem = {};
					this.rightSelect = false;
				}
			},
			rightSearch(){
//				console.log('rightSearch');
				this.refreshList(this.rightWord, rightAll, 'right');
			},
			canSearch(){
//				console.log('canSearch');
				this.refreshList(this.canWord, rightAll, 'canSub');
			},
			appidSearch(){
//				console.log('appidSearch');
				this.refreshList(this.appidWord, subAll, 'appid');
			},
			loopClose(){
				utils.goto('/message/release');
			}
		},
		created(){
			this.pageTxt = pageTxt = lang().themeEditTheme;
		},
		mounted(){
			_this = this;
			this.active = 'first';
			this.keys = [];
			var info = this.info;
			for (var k in info) info[k] = '';
			info.canSubsUserList = [];
			info.subsUserList = [];
			junk = [];
			
			this.right = {};
			rightAll = {};
			this.left = {};
			leftAll = {};
			this.leftWord = this.rightWord = this.appidWord = '';
			canCount = 0;
			leftTem = {}, rightTem = {};
			this.rightSelect = this.leftSelect = false;
			getDetail();
			maxSubsUser();
			
//			for (var i = 0; i < 1000; i++) {
//				leftAll[i] = {userID:'id_'+i, userName:'name_'+i, ind:i};
//			}
//			this.left = leftAll;
		},
		watch: {
//			info: {
//				handler(cur, old) {
//					appidValue()
//				},
//				immediate: true,
//				deep: true
//			}
		}
	};
	
	function checkAppid(){
		var appG = {}, appobj, appid, appTem;
		
		for (var k in subAll) {
			appobj = subAll[k];
			appid = appobj.userAppid;
			if(appid.replace(/^\s+/g,'')==''){
				// utils.weakTips(pageTxt.tips.appid);
				fxUtils.alert({txt: pageTxt.tips.appid});
				return true;
			}
			if((/[:|：｜\%]/i).test(appid)){
				// utils.weakTips(pageTxt.tips.appid2);
				fxUtils.alert({txt: pageTxt.tips.appid2});
				return true;
			}
			appTem = appG[appobj.userID];
			if(!appTem) appTem = appG[appobj.userID] = [];
			appTem.push(appobj);
		}
		
		var i, len, obj, tem = {}, same={}, sameFlag = false;
		for (k in appG) {
			appobj = appG[k];
			len = appobj.length,obj,tem = {};
			for (i = 0; i < len; i++) {
				obj = appobj[i];
				appid = obj.userAppid;
				if(tem[appid]){
					same[appid] = obj;
					sameFlag = true;
				} else tem[appid] = 1;
			}
		}
		
		if(sameFlag){
			var txt = pageTxt.tips.sameAppid;
			for (k in same) {
				obj = same[k];
				txt += `<br/>${obj.userID}(${obj.userName}):AppID(${obj.userAppid})`;
			}
			utils.hints({txt, btn:1});
			return true;
		}
		return false;
	}
	
	function submitAll(subm){
		if(isNull()) return;
		if(checkAppid()) return;
		
		var info = _this.info;
		info.canSubsUserList = toArray(rightAll);
		info.subsUserList = toArray(subAll);
		var opt = {};
		if(subm == 'send'){
			info.url = 'mx/pubTopic/modifyAll';
			info.cmdID = '600050';
			info.operator = 'admin';
			opt.txt = pageTxt.tips.send;
		} else {
			info.url = 'mx/pubTopic/modifyAllImmediately';
			info.cmdID = '600054';
			info.operator = 'admin';
			info.reviewer = 'admin2';
			opt.txt = pageTxt.tips.now;
		}
		opt.yes = function(){
			utils.post(info, function(data){
//				console.log('修改主题2：',data);
				var code = data.errcode, msg = data.errinfo;
				if(code == '0'){
					if(subm == 'send') {
						// utils.weakTips(msg);
						fxUtils.alert({txt: msg, type: 1});
						utils.goto('/message/release');
					} else modify(); //轮循
				} else if(code == '1'){
					if(subm == 'now'){
						var txt = '<p class="part">';
						if(msg.length > 100){
							txt += msg.substring(0, 100) + '...</p>';
						} else txt += msg + '</p>';
						txt += pageTxt.tips.part;
						utils.hints({
							txt, yes: modify, btn: 1
						});
					} else {
						utils.goto('/message/release');
						// utils.weakTips(msg);
						fxUtils.alert({txt: msg, type: 0});
					}
				} else fxUtils.alert({txt: msg, type: 0});
				function modify(){
					// utils.wheelReq(data); //轮循
					_this.$refs.loop.start(data);
					// utils.goto('/message/release');
				}
			});
		}
		
		if(subm != 'send'){
			utils.review({ //审核
				uri: info.url,
				yes: function(args){
					info.reviewer = args.name;
					info.reviewerPassword = args.pwd;
					info.reviewType = 1;
					utils.hints(opt);
				}
			});
		} else utils.hints(opt);
	}
	function isSelectUser(){//true为跳转
		for (var i in _cans) {
			if(!inObject(_cans[i].userID, rightAll))
				return true;
		}
		return false;
	}
	
	function isNull(){
		var must = ['topicDescr', 'topicInfo'],
			tips = pageTxt.tips;
		var i, info = _this.info;
		for (i = 0; i < must.length; i++) {
			var str = must[i];
			info[str] = trim(info[str]);
			if(!info[str]){
				// utils.weakTips(tips[str]);
				fxUtils.alert({txt: tips[str]});
				return true;
			}
		}
		if(/\%/.test(info.topicDescr)){
			fxUtils.alert({txt: pageTxt.errTopicDescr});
			return true;
		}  else if(/\%/.test(info.topicInfo)){
			fxUtils.alert({txt: pageTxt.errTopicInfo});
			return true;
		}
		return false;
	}
	
	function trim(str){
		return str.replace(/(^\s*)|(\s*$)/g, '');
	}
	
	function getAllUser(){
		var id = globalVar.get('userid').pubUserID;
		if(!id) return;
		var param = {
			url: 'mx/userinfo/queryLists',
			cmdID: '600001',
			userID: '',
			type: 2,
			pageSize: 20000,
        	currentPage: 1,
        	userName: ''
		};
		utils.post(param, function(data){
//			console.log('通信关系用户：', data);
			if(data.errcode != 0){
				return console.log(data.errinfo);
			}
			var arr = data.lists, i, len = arr.length, obj, cu=0;
			var tem = {}, sub = {}, i;
			for (i = 0; i < len; i++) {
				obj = arr[i];
				obj.hide = 'show';
				id = obj.userID;
				if(!id){ continue; }
				obj.ind = i;
				leftAll[i] = obj;
				if( inObject(id, _cans) ){
					tem[i] = obj
				} else {
//					if(++cu <= 200) sub[i] = obj;
					sub[i] = obj;
				}
			}
			_this.left = sub;
			_this.right = rightAll = tem;
			_this.canSub = toObject(tem);
		});
	}
	
	function  inObject(id, datas) {
		for (var k in datas) {
			var obj = datas[k];
			if(obj&&obj.userID==id) return true;
		}
		return false;
	}
	
	function getDetail(){
		var userid = globalVar.get('userid');
		if(!userid) return;
		var param = {
				cmdID: '600043', pubUserID: userid.pubUserID,
				topicName: userid.topicName, type: '0'
			};
		utils.post('mx/pubTopic/query', param, function(data){
//			console.log('订阅详情：',data);
			if(data.errcode != 0) return fxUtils.alert({txt: data.errinfo});;
			getAllUser();
			var res = data.lists[0], info = _this.info;
//			_this.info = res;
			_this.info.canSubsUserList = res.canSubsUserList||[],
			info.topicName = res.topicName;
			info.pubUserName = res.pubUserName;
			info.pubUserID = res.pubUserID;
			info.topicDescr = res.topicDescr;
			info.topicInfo = res.topicInfo;
			info.effectiveDays = res.effectiveDays;
			info.pubTime = res.pubTime;
			canCount = _this.info.canSubsUserList.length;
			_cans = toObject(_this.info.canSubsUserList);
			var subs = res.subsUserList||[];
			subK = subs.length;
			_this.info.subsUserList = subs;
			subAll = {};
			for (var i = 0; i < subK; i++) {
				subs[i].ind = i;
				subAll[i] = subs[i];
			}
			_this.appid = toObject(subAll);
		});
	}
	function maxSubsUser(){
		var param = {
				cmdID: '600056',
				url: 'mx/topicConfig/queryTopicMaxCanSubsCount'
			};
		utils.post(param, function(data){
			if(data.errcode != 0) return console.warn('600056', data.errinfo);
			maxSub = parseInt(data.oneTopicMaxCanSubsCount);
		});
	}
	function toArray(obj){
		var arr = [], k;
		for(k in obj) arr.push(obj[k]);
		return arr;
	}
	function toObject(arr){
		var obj = {}, k;
		for(k in arr) obj[k] = arr[k];
		return obj;
	}
</script>

<style scoped="scoped">
	.editTheme{color: #666;}
	.el-tabs {min-width: 1460px;}
	.h2{min-width: 1460px;border-bottom: 1px solid #D8D8D8;margin-bottom: 40px;padding-left: 20px;}
	.h2 *{vertical-align: middle;}
	.h2 em{cursor: pointer;}
	.h2 .icon{margin-right: 6px;}
	.h2 .topBack{font-size: 13px;color: #5a719d;line-height: 32px;height: 32px;padding-right: 20px;
		border-right: 1px solid #edeef0;}
	.h2 .span{font-size: 16px;color: #666;line-height: 50px;height: 50px;padding-left: 20px;font-weight: bold;}
	.list li{margin-bottom: 10px;}
	.txt,.txt1{display: inline-block;font-size: 14px;line-height: 30px;width: 200px;vertical-align: top;text-align: right;padding-right: 10px;}
	.txt1{text-align: left;width: auto;}
	.red{color: #F00;line-height: 1;vertical-align: text-bottom;}
	.rightBox{vertical-align: top;display: inline-block;}
	.rightBox .el-input{width: 255px;}
	.rightBox .el-textarea{width: 835px;}
	.blueBtn{margin-right: 40px;}
	.jg{padding-bottom: 30px;}
	
	.transfer{text-align: center;}
	.el-transfer{text-align: left; display: inline-block;}
	.itemTxt,.itxt{display: inline-block;font-size: 13px;line-height: 40px;color: #666;vertical-align: middle;}
	#slotTitle{display: none;}
	.all{font-size: 14px;width: 36px;display: inline-block;padding-left: 15px;pointer-events: none;}
	.hide{display: none;}
	.itemTxt{width: 150px;overflow: hidden;text-overflow: ellipsis;}
	
	.box{white-space: nowrap;}
	.box > *{display: inline-block;vertical-align: top;}
	.table{width: 370px;margin-right: 40px;height: 411px;overflow: auto;}
	.h3{font-size: 14px;color: #606266;background: #f5f7fa;line-height: 40px;padding-left: 30px;
		border: 1px solid #EFEFEF;border-bottom: none;}
	.appInput1{width: 105px;vertical-align: middle;border: 1px solid #999;}
	.appInput2{width: 105px;vertical-align: middle;border: 1px solid #F00;}
	
	.tableBox{display: inline-block;width: 370px;vertical-align: middle;height: 433px;overflow: hidden;border: 1px solid #ebeef5;border-radius: 4px;white-space: nowrap;}
	.tableBox .title{font-size: 16px;color: #303133;background: #f5f7fa;line-height: 40px;height: 40px;padding-left: 15px;border-bottom: 1px solid #ebeef5;}
	.slotTitle{padding-left: 36px;background: #E5EAF0;border: 1px solid #D8D8D8;border-width: 1px 0;font-weight: bold;}
	.itemTxt,.itemTxt2{display: inline-block;width: 150px;font-size: 12px;line-height: 40px;color: #333;vertical-align: middle;overflow: hidden;
		text-overflow: ellipsis;pointer-events: all;}
	.tableBox .searchBox{padding: 15px;}
	.tableBox .searchBox input{width: 234px;font-size: 12px;height: 30px;padding: 0 10px;vertical-align: middle;border: 1px solid #D7D8DA;color: #606266;}
	.tableBox .searchBox .blueBtn{vertical-align: middle;margin: 0 0 0 15px;}
	.tableBox .table {height: 300px;overflow-x: hidden;overflow-y: auto;}
	.tableBox .table li{padding-left: 36px;border-bottom: 1px solid #EBEEF5;margin: 0;position: relative;}
	.ht{height: 442px;}
	.itemTxt2{width: 105px;}
	.t2{line-height: 40px;}
	.t3{width: 140px;}
	.trsIcon{position: absolute;top: 10px;left: 10px;}
	.addIcon{vertical-align: middle;}
	
	
	.transferBtn{display: inline-block;vertical-align: middle;border-color: #5e7297;padding: 0 30px;}
	.transferBtn .btn{display: block;width: 36px;height: 36px;border: 1px solid #5e7297;border-radius: 5px;color: #5e7297;font-weight: 900;font-size: 18px; line-height: 36px;}
	.transferBtn .btn:first-child{margin-bottom: 10px;}
	.check{width: 16px;height: 16px;position: absolute;top: 13px;left: 9px;}
</style>
<style>
	/*.editTheme .el-table td{border-bottom: 1px solid #ebeef5;}
	.editTheme .el-tabs__item{color: #5a6e93;}
	.editTheme .el-tabs__header{margin-left: 40px;}
	.editTheme .el-tabs__item.is-active{color: #32ccf9;}
	.editTheme .el-transfer-panel .el-transfer-panel__header .el-checkbox .el-checkbox__label{color: #666;}
	
	.editTheme .el-table .cell{white-space: nowrap;padding-right: 5px;}*/
</style>
