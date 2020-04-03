<template>
	<div class="addTheme">
		<h2 class="h2">
			<em @click="back">
				<img class="icon" src="@/fbcsViews/img/ico.png" />
				<span class="topBack">{{pageTxt.label[13]}}</span>
			</em>
			<span class="span">{{pageTxt.label[0]}}</span>
		</h2>
		<ul class="list">
			<li>
				<label class="txt"><b class="red">*&nbsp;</b>{{pageTxt.label[1]}}</label>
				<div class="rightBox">
					<el-input auto-complete="off" :placeholder="pageTxt.must" v-model="info.topicName" maxlength="16"></el-input>
				</div>
			</li><li>
				<label class="txt"><b class="red">*&nbsp;</b>{{pageTxt.label[2]}}</label>
				<div class="rightBox">
					<!--<el-input auto-complete="off" placeholder="" v-model="info.pubUserID" clearable></el-input>-->
					<el-autocomplete @blur='blur' @input='autoInput' class="autocomplete" v-model="idName" :maxlength="parseInt(32)"
						:fetch-suggestions="fetch" @select="idSelect" :trigger-on-focus="true" :placeholder="pageTxt.must">
						<div slot-scope="{item}">
							<span class="name">{{item.userID}}</span>
						    <span class="addr">({{item.userName}})</span>
						</div>
					</el-autocomplete>
				</div>
			</li>
			<!--<li>
				<label class="txt">{{pageTxt.label[3]}}</label>
				<div class="rightBox">
					<el-input auto-complete="off" placeholder="" v-model="info.pubUserName" clearable></el-input>
				</div>
			</li>-->
			<li>
				<label class="txt"><b class="red">*&nbsp;</b>{{pageTxt.label[4]}}</label>
				<div class="rightBox">
					<el-input auto-complete="off" :placeholder="pageTxt.must" v-model="info.topicDescr" maxlength="512"></el-input>
				</div>
			</li><li>
				<label class="txt"><b class="red">*&nbsp;</b>{{pageTxt.label[5]}}</label>
				<div class="rightBox">
					<el-input auto-complete="off" :placeholder="pageTxt.must" type='textarea' v-model="info.topicInfo" maxlength="2048" :autosize="{ minRows: 4, maxRows: 40}"></el-input>
				</div>
			</li><li>
				<label class="txt"><b class="red">*&nbsp;</b>{{pageTxt.label[6]}}</label>
				<div class="rightBox">
					<el-input auto-complete="off" @input='number($event)' :placeholder="maxDays" v-model="info.effectiveDays" maxlength="4"></el-input>
					<span class="errNum" v-show="errNum">{{pageTxt.tips.effectiveNum}}</span>
				</div>
			</li><li>
				<label class="txt">{{pageTxt.label[7]}}</label>
				<div class="rightBox">
					
					<div class="tableBox">
						<div class="title">{{pageTxt.label[9]}}</div>
						<div class="searchBox">
							<input class="search" v-model="leftWord" :placeholder="pageTxt.tips.word" autocomplete="off"/>
							<button class="el-icon-search blueBtn" @click="leftSearch">{{pageTxt.label[14]}}</button>
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
					
					<div class="tableBox">
						<div class="title">{{pageTxt.label[10]}}</div>
						<div class="searchBox">
							<input class="search" v-model="rightWord" :placeholder="pageTxt.tips.word" autocomplete="off"/>
							<button class="el-icon-search blueBtn" @click="rightSearch">{{pageTxt.label[14]}}</button>
						</div>
						<div class="slotTitle">
							<input v-model="rightSelect" @click='rightckAll($event)' type="checkbox" class="check" autocomplete="off"/>
							<span class="itemTxt">{{pageTxt.list[0]}}</span>
							<span class="itemTxt">{{pageTxt.list[1]}}</span>
						</div>
						<ul id="_cansub" ref='right' class="table">
							<li v-for="obj in right" >
								<input :ind='obj.ind' @click='rightck($event)' type="checkbox" class="check" autocomplete="off"/>
								<span class="itemTxt" :title="obj.userID">{{obj.userID}}</span>
						    	<span class="itemTxt" :title="obj.userName">{{obj.userName}}</span>
							</li>
						</ul>
					</div>
					
				</div>
			</li>
			<!--<li>
				<label class="txt">{{pageTxt.label[8]}}</label>
				<div class="rightBox">
					<el-input auto-complete="off" placeholder="" v-model="info.operator" ></el-input>
				</div>
			</li>-->
			<li>
				<label class="txt">&nbsp;</label>
				<div class="rightBox">
					<p class="jg"></p>
					<button v-if="auth" class="blueBtn" @click="now">{{pageTxt.label[11]}}</button>
					<button v-if="auth" class="blueBtn" @click="send">{{pageTxt.label[12]}}</button>
					<button class="defBtn" @click="back">{{pageTxt.label[13]}}</button>
					<p class="jg"></p>
				</div>
			</li>
		</ul>
		<lgy-loopReqMX ref="loop" @close="loopClose"></lgy-loopReqMX>
	</div>
</template>

<script>
import kit       from '@/fbcsViews/libs/kit.js';
import utils     from '@/fbcsViews/libs/utils.js';
import lang      from '@/fbcsViews/language/lang.js';
import fxUtils from '@/fbcsFxViews/libs/utils.js';


	var pageTxt, _this, autoTime, isInput=false, _maxDays = 0;
	
	var list = [], leftAll = {}, rightAll = {}, maxSub = 1, canCount = 0,
		leftTem = {}, rightTem = {};
	/*for (var i = 0; i < 10; i++) {
		var obj = {
			key:i, userID: 'userID'+kit.randomNum(10,99),
			userName: '用户名'+i
		};
		obj.label = obj.userID + obj.userName;
		list.push(obj);
	}*/
	
	var data = {
		auth: fxUtils.getMxAuth,
		pageTxt,
		idName: '',
		info: {
			operator:'admin', topicName:'主题名称', pubUserID:'发布者ID', pubUserName:'发布者名称',
			topicDescr:'主题描述',topicInfo:'主题内容', effectiveDays: '7', canSubsUserList:[],
			reviewer: ''
		},
		errNum: false,
		maxDays: '最大有效天数90',
		list: list,
		keys: [],
		left: {},
		leftWord: '',
		right: {},
		rightWord: '',
		leftSelect: false,
		rightSelect: false
	};
	var submitList = [], dayTime = 0;
	
	
	function autoInput(str, cb){
//		if(!str) return;
//		console.time('请求用户ID...');
		utils.getUserid({id:str, type:2}, function(data){
			var i,len = data.length,tem=[];
			for (i = 0; i < len; i++) {
				var label = data[i].label.toLocaleLowerCase();
				str = str.toLocaleLowerCase();
				if(label.indexOf(str)!=-1) tem.push(data[i]);
			}
			cb(tem);
		});
	}
	
	function getMaxDays(){
		if(_this.idName === '') return;
		var param = {
			url: 'mx/topicConfig/queryUserMaxDaysOfTopic',
			cmdID: '600057',
			userID: _this.idName
		};
		utils.post(param, function(data){
			if(data.errcode != 0){
				_this.maxDays = _this.pageTxt.maxDays+'0';
				_maxDays = 0;
				return console.log(data.errinfo);
			}
			_maxDays = data.userMaxDaysOfTopic;
			_this.maxDays = _this.pageTxt.maxDays + _maxDays;
		});
	}
	
	export default {
		name: 'message_addTheme',
		data() {
			return data;
		},
		methods: {
			fetch(str, cb){
				clearTimeout(autoTime);
				autoTime = setTimeout(autoInput, 300, str, cb);
			},
			idSelect(item){
				isInput = false;
				this.info.pubUserID = item.userID;
				// this.idName = item.userID+'('+item.userName+')';
				this.idName = item.userID;
//				blurID(item.userID);
			},
			autoInput(){
				isInput = true;
				clearTimeout(dayTime);
				dayTime = setTimeout(getMaxDays, 800);
			},
			blur(){
//				console.log(isInput,this.info.pubUserID)
				if(isInput) {
					_this.info.pubUserID = this.idName;
//					blurID(this.idName);
				}
			},
			handleChange(remain, direction, moved){
				submitList = remain;
			},
			leftCheck(arr, i){},
			rightCheck(arr, i){},
			send(e){ submit('send'); },
			now(){ submit('now'); },
			back(){ utils.goto('/message/release', 'goBack', true); },
			number(s){
				setTimeout(function(){
					var reg = /[^0123456789]/ig;
//					_this.info.effectiveDays = s.replace(reg,'');
					_this.errNum = reg.test(s) ? true : false;
				}, 0);
			},
			
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
				kit('.addTheme #_allUser .check').each( (el)=>{
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
				kit('.addTheme #_cansub .check').each( (el)=>{
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
					// return utils.weakTips(this.pageTxt.tips.maxSubs);
					return fxUtils.alert({txt: this.pageTxt.tips.maxSubs});
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
			rightSearch(){
				var word = this.rightWord.toUpperCase(), cu = 0, list = {};
				for (var k in rightAll) {
					var id, name, obj = rightAll[k];
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
				this.$refs.right.scrollTop = 0;
				this.right = list;
				rightTem = {};
				this.rightSelect = false;
			},
			loopClose(){
				utils.goto('/message/release');
			}
		},
		created() {
			_this = this;
			this.pageTxt = pageTxt = lang().themeAddTheme;
			this.maxDays = this.pageTxt.maxDays+'0';
			_maxDays = 0;
		},
		mounted(){
			_this = this;
			var info = this.info;
			for(var k in info) info[k] = '';
			this.idName = '';
			info.canSubsUserList = [];
			this.keys = [];
			this.right = {};
			rightAll = {};
			this.left = {};
			leftAll = {};
			this.leftWord = this.rightWord = '';
			canCount = 0;
			leftTem = {}, rightTem = {};
			this.rightSelect = this.leftSelect = false;
			blurID('');
			maxSubsUser();
			_this.errNum = false;
//			addTitle();
//			kit('.el-autocomplete-suggestion').off().down(function(){
//				isInput = false;
//			}).up(function(){isInput = true;});
			

//			for (var i = 0; i < 1000; i++) {
//				leftAll[i] = {userID:'id_'+i, userName:'name_'+i, ind:i};
//			}
//			this.left = leftAll;
		}
	};

	
	function blurID(id){
//		var id = isInput ? _this.idName : _this.info.pubUserID;
//		if(!id) return;
		var param = {
			url: 'mx/userinfo/queryLists', //mx/userComm/querySpcificUser  mx/userinfo/queryLists
			cmdID: '600001', //600035  600001
			userID: '',
			type: 2,
			pageSize: 20000,
        	currentPage: 1,
        	userName: ''
		};
		_this.info.pubUserID = id;
		utils.post(param, function(data){
//			console.log('通信关系用户：', data);
			if(data.errcode != 0){
				return console.log(data.errinfo);
			}
			var arr = data.lists, i, len = arr.length, obj, cu=0;
			var tem = {};
			for (var i = 0; i < len; i++) {
				obj = arr[i];
				if(obj.userID){ //&&obj.userID != id
					cu++;
					obj.ind = i;
					leftAll[i] = obj;
//					if(cu <= 200) tem[i] = obj;
					tem[i] = obj;
				}
			}
			_this.left = tem;
		});
	}
	
	function submit(sub){
		var must = ['topicName', 'topicDescr', 'topicInfo', 'effectiveDays'],
			tips = pageTxt.tips;
		var i, ind, tem = [], info = Object.assign({}, _this.info);
		
		_this.idName = trim(_this.idName);
		if(!_this.idName) {
			// utils.weakTips(tips.pubUserID);
			fxUtils.alert({txt: tips.pubUserID});
			return;
		}
		for (i = 0; i < must.length; i++) {
			var str = must[i];
			info[str] = trim(info[str]);
			if(!info[str]) {
				// utils.weakTips(tips[str]);
				fxUtils.alert({txt: tips[str]});
				return
			}
		}
		
		if(/\%/.test(info.topicName)){
			fxUtils.alert({txt: pageTxt.errTopicName});
			return
		} else if(/\%/.test(info.topicDescr)){
			fxUtils.alert({txt: pageTxt.errTopicDescr});
			return
		}  else if(/\%/.test(info.topicInfo)){
			fxUtils.alert({txt: pageTxt.errTopicInfo});
			return
		} else if(_this.errNum) {
			// utils.weakTips(tips.effectiveNum);
			fxUtils.alert({txt: tips.effectiveNum});
			return
		} else if(info.effectiveDays==0) {
			// utils.weakTips(tips.effectiveNum);
			fxUtils.alert({txt: tips.effectiveNum});
			return
		} else if(parseInt(info.effectiveDays) > _maxDays){
			// utils.weakTips(tips.overDays + _maxDays);
			fxUtils.alert({txt: tips.overDays + _maxDays});
			return
		}
		
		//[{"userID":"24","userName":"2"},{"userID":"4","userName":"4"}]
		for (i in rightAll) {
			tem.push(rightAll[i]);
		}
		info.canSubsUserList = tem;
		
		if(sub == 'send'){
			utils.hints({
				txt: pageTxt.tips.send,
				yes: function(){
					info.cmdID = '600045';
					info.operator = 'admin';
					utils.post('mx/pubTopic/add', info, function(data){
//						console.log('增加主题：',data);
						// utils.weakTips(data.errinfo);
						if(data.errcode != 0) return fxUtils.alert({txt: data.errinfo});
						fxUtils.alert({txt: data.errinfo, type: 1});
						utils.goto('/message/release');
					});
				}
			});
		} else {
			utils.review({ //审核
				uri: 'mx/pubTopic/addImmediately',
				yes: function(args){
					utils.hints({
						txt: pageTxt.tips.now,
						yes: function(){
							info.cmdID = '600047';
							info.reviewer = args.name;
							info.reviewerPassword = args.pwd;
							info.reviewType = 1;
							utils.post('mx/pubTopic/addImmediately', info, addNext);
						}
					});
				}
			});
		}
		function addNext(data){
//			console.log('立即增加主题：',data);
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
				// utils.wheelReq(data); //轮循
				_this.$refs.loop.start(data);
				// utils.goto('/message/release');
			}
		}
		
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
	function trim(str){
		return str.replace(/(^\s*)|(\s*$)/g, '');
	}
	function toArray(obj){
		var arr = [], k;
		for(k in obj) arr.push(obj[k]);
		return arr;
	}		
</script>

<style scoped="scoped">
	.addTheme{min-width: 1016px; color: #666}
	.h2{border-bottom: 1px solid #D8D8D8;margin-bottom: 40px;padding-left: 20px;}
	.h2 *{vertical-align: middle;}
	.h2 em{cursor: pointer;}
	.h2 .icon{margin-right: 6px;}
	.h2 .topBack{font-size: 13px;color: #5a719d;line-height: 32px;height: 32px;padding-right: 20px;
		border-right: 1px solid #edeef0;}
	.h2 .span{font-size: 16px;color: #666;line-height: 50px;height: 50px;padding-left: 20px;font-weight: bold;}
	.list li{margin-bottom: 10px;}
	.txt{display: inline-block;font-size: 14px;line-height: 30px;width: 200px;vertical-align: top;text-align: right;padding-right: 10px;}
	.red{color: #F00;line-height: 1;vertical-align: text-bottom;}
	.errNum{color: #F00;font-size: 14px;margin-left: 10px;}
	.rightBox{vertical-align: top;display: inline-block;}
	.rightBox .el-input{width: 255px;}
	.rightBox .el-textarea{width: 835px;}
	.blueBtn{margin-right: 40px;}
	.jg{padding-bottom: 30px;}
	.autocomplete{width: 255px;}
	
	.transfer{text-align: center;}
	.el-transfer{text-align: left; display: inline-block;}
	
	.slotTitle{padding-left: 36px;background: #E5EAF0;border: 1px solid #D8D8D8;border-width: 1px 0;font-weight: bold;}
	.all{font-size: 14px;width: 36px;display: inline-block;padding-left: 15px;pointer-events: none;}
	
	.tableBox{display: inline-block;width: 370px;vertical-align: middle;height: 433px;overflow: hidden;border: 1px solid #ebeef5;border-radius: 4px;white-space: nowrap;}
	.tableBox .title{font-size: 16px;color: #303133;background: #f5f7fa;line-height: 40px;height: 40px;padding-left: 15px;border-bottom: 1px solid #ebeef5;}
	.itemTxt{display: inline-block;width: 150px;font-size: 12px;line-height: 30px;color: #333;vertical-align: middle;overflow: hidden;text-overflow: ellipsis;pointer-events: all;}
	.tableBox .searchBox{padding: 15px;}
	.tableBox .searchBox input{width: 234px;font-size: 12px;height: 30px;padding: 0 10px;vertical-align: middle;border: 1px solid #D7D8DA;color: #606266;}
	.tableBox .searchBox .blueBtn{vertical-align: middle;margin: 0 0 0 15px;}
	.tableBox .table {height: 300px;overflow: auto;}
	.tableBox .table li{padding-left: 36px;border-bottom: 1px solid #EBEEF5;margin: 0;}
	
	.transferBtn{display: inline-block;vertical-align: middle;border-color: #5e7297;padding: 0 30px;}
	.transferBtn .btn{display: block;width: 36px;height: 36px;border: 1px solid #5e7297;border-radius: 5px;color: #5e7297;font-weight: 900;font-size: 18px; line-height: 36px;}
	.transferBtn .btn:first-child{margin-bottom: 10px;}
	.check{width: 16px;height: 16px;position: absolute;top: 7px;left: 9px;}
</style>
