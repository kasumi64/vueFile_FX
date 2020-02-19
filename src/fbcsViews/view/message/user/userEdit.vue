<template>
	<div class="userEdit">
		<div class='header'>
			<img class="header_img" src="@/fbcsViews/img/ico.png">
			<span class="header_txt1" @click="back">{{pageTxt.label[0]}}</span>
			<div class="header_line"></div>
			<span class='header_txt2'>{{headerText}}</span>
		</div>
		<el-tabs type="card" v-model="$store.state.tabv">
			<el-tab-pane name="v1" class='v1'>
				<span slot="label">{{pageTxt.tab[0]}}</span>
				<el-row class='info'>
					<el-col :span="6">
						<ul class="left">
							<li>
								<p><span class="red">*&nbsp;</span>{{pageTxt.label[1]}}：</p>
							</li>
							<li>
								<p><span class="red">*&nbsp;</span>{{pageTxt.label[2]}}：</p>
							</li>
							<li>
								<p>{{pageTxt.label[3]}}：</p>
							</li>
							<li>
								<p>{{pageTxt.label[4]}}：</p>
							</li>
							<li>
								<p><span class="red">*&nbsp;</span>{{pageTxt.label[5]}}：</p>
							</li>
							<li>
								<p>{{pageTxt.label[7]}}：</p>
							</li>
							<li>
								<p><span class="red">*&nbsp;</span>{{pageTxt.label[8]}}：</p>
							</li>
							<li>
								<p>{{pageTxt.label[9]}}：</p>
							</li>
							<li>
								<p>{{pageTxt.label[10]}}：</p>
							</li>
							<li>
								<p>{{pageTxt.label[11]}}：</p>
							</li>
							<li>
								<p>{{pageTxt.label[12]}}：</p>
							</li>
							<li>
								<p><span class="red">*&nbsp;</span>{{pageTxt.label[13]}}：</p>
							</li>
							<li>
								<p><span class="red">*&nbsp;</span>{{pageTxt.label[14]}}：</p>
							</li>
							<li>
								<p><span class="red">*&nbsp;</span>{{pageTxt.label[15]}}：</p>
							</li>
							<li>
								<p>{{pageTxt.label[26]}}：</p>
							</li>
						</ul>
					</el-col>
					<el-col :span="18">
						<ul class="right">
							<li>
								<el-input auto-complete="off" v-model="$store.state.transferEditID" disabled></el-input>
							</li>
							<li>
								<input v-model="info.userName" maxlength="128" :placeholder="pageTxt.tips.must" autocomplete="off"/>
							</li>
							<li>
								<el-select v-model="info.userType" placeholder="">
									<el-option v-for="item in userType" :label="item.name" :key="item.id" :value="item.id"></el-option>
								</el-select>
							</li>
							<li>
								<el-select v-model="info.userDistrict" placeholder="">
									<el-option v-for="item in cities" :label="item.name" :key="item.id" :value="item.id"></el-option>
								</el-select>
							</li>
							<li>
								<input type="text" data-k='speedCtrlKbps' v-model="info.speedCtrlKbps" @input="inputInt2" maxlength="18" :placeholder="pageTxt.tips.onlyNum" autocomplete="off">
								<span class="kbit">{{pageTxt.label[6]}}</span>
							</li>
							<li>
								<input type="text" v-model="info.userInfo" maxlength="512" autocomplete="off">
							</li>
							<li>
								<el-select v-model="info.connSuGroupName" placeholder="">
									<el-option v-for="item in pageTxt.connect" :key="item.value" :label="item.groupID" :value="item.groupID"></el-option>
								</el-select>
							</li>
							<li>
								<el-select v-model="info.isAlarmIfOffLine" placeholder="">
									<el-option v-for="item in pageTxt.online" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</li>
							<li class="icon40">
								<el-date-picker v-model="info.softEncBeginDate" value-format='timestamp' type="datetime" 
								:placeholder="pageTxt.label[24]" default-time="00:00:00"></el-date-picker>
							</li>
							<li class="icon40">
								<el-date-picker v-model="info.softEncEndDate" value-format='timestamp' type="datetime" 
								:placeholder="pageTxt.label[24]" default-time="23:59:59"></el-date-picker>
							</li>
							<li>
								<el-select v-model="info.allowSendRecvFile" placeholder="">
									<el-option v-for="item in pageTxt.online" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</li>
							<li>
								<input type="text" data-k='maxPubsCount' v-model="info.maxPubsCount" @input="inputInt" maxlength="4" :placeholder="pageTxt.tips.onlyNum" autocomplete="off">
								<span v-show="maxPubsCount" class="errNum">{{pageTxt.tips.errNum}}</span>
							</li>
							<li>
								<input type="text" data-k='maxSubsCount' v-model="info.maxSubsCount" @input="inputInt" maxlength="4" :placeholder="pageTxt.tips.onlyNum" autocomplete="off">
								<span v-show="maxSubsCount" class="errNum">{{pageTxt.tips.errNum}}</span>
							</li>
							<li>
								<input type="text" data-k='maxDaysOfTopic' v-model="info.maxDaysOfTopic" @input="inputInt" maxlength="4" :placeholder="pageTxt.tips.onlyNum" autocomplete="off">
								<span v-show="maxDaysOfTopic" class="errNum">{{pageTxt.tips.errNum}}</span>
							</li>
							<li>
								<el-input auto-complete="off" v-model="configTime" placeholder="" disabled></el-input>
							</li>
						</ul>
					</el-col>
				</el-row>
				<div class="btn">
					<el-button v-if="auth>1" type="primary" @click='verify(sendDown)'>{{pageTxt.label[16]}}</el-button>
					<el-button v-if="auth>1" type="primary" @click="verify(edit)">{{pageTxt.label[17]}}</el-button>
					<el-button type="default" @click='back'>{{pageTxt.label[18]}}</el-button>
				</div>
			</el-tab-pane>

			<el-tab-pane name="v2">
				<span slot="label">{{pageTxt.tab[1]}}</span>
				<UserEkey></UserEkey>
			</el-tab-pane>
			<el-tab-pane name="v3">
				<span slot="label">{{pageTxt.tab[2]}}</span>
				<UserSignal></UserSignal>
			</el-tab-pane>
			<el-tab-pane name="v4">
				<span slot="label">{{pageTxt.tab[3]}}</span>
				<ExtendInfo></ExtendInfo>
			</el-tab-pane>
		</el-tabs>
		<lgy-loopReqMX ref="loop"></lgy-loopReqMX>
	</div>
</template>

<script>
import utils from "@/fbcsViews/libs/utils.js";
import UserEkey		from "@/fbcsViews/view/message/user/userEkey.vue";
import UserSignal	from "@/fbcsViews/view/message/user/userSignal.vue";
import ExtendInfo	from "@/fbcsViews/view/message/user/extendInfo.vue";
import lang			from '@/fbcsViews/language/lang.js';
import globalVar	from '@/fbcsViews/libs/globalVar.js';
import fxUtils   from '@/fbcsFxViews/libs/utils.js';

	var info = {},
		def = [
			"operator",
			"userName",
			"userType",
			"userDistrict",
			"speedCtrlKbps",
			"configTime",
			"userInfo",
			"connSuGroupName",
			"isAlarmIfOffLine",
			"softEncEndDate",
			"softEncBeginDate",
			"allowSendRecvFile",
			"maxPubsCount",
			"maxSubsCount",
			"maxDaysOfTopic",
			"isModifyDefaultPasswd",
			"userPasswd"
		];
	for(var i = 0; i < def.length; i++) {
		info[def[i]] = "";
	}

	var pageTxt = 'lang.userEdit', _this,
	data = {
		auth: globalVar.get('status').user,
		userType: [],
		cities: [],
		info,
		pageTxt,
		headerText: "",
		configTime: 0,
		maxPubsCount: false,
		maxSubsCount: false,
		maxDaysOfTopic: false
	};

	export default {
		data() {
			return data;
		},
		methods: {
			inputInt(e){
				var el = e.target, k = el.dataset.k, val = el.value;
//				val = val.replace(/[^0-9]/g, '');
//				this.info[k] = val;
				this[k] = (/[^0-9]/g).test(val) ? true :false;
			},
			inputInt2(e){
				var el = e.target, k = el.dataset.k, val = el.value;
				var flag = false;
				if(val.indexOf('-')==0) flag = true;
				val = val.replace(/[^0-9]/g, '');
				if(flag){
					if(val>1) val = 1;
					val = '-' + val;
				}
				this.info[k] = val;
			},
			//立即下发
			sendDown() {
				utils.review({
					uri: 'mx/userinfo/modifyImmediately',
					yes: function(info) {
						utils.hints({
							txt: _this.pageTxt.tips.now,
							yes: function() {
								utils.post('mx/userinfo/modifyImmediately', {
									cmdID: "600007",
									operator: "admin",
									reviewer: info.name,
									reviewerPassword: info.pwd,
									reviewType: 1,
									userID: _this.$store.state.transferEditID,
									userName: _this.info.userName,
									userType: _this.info.userType,
									userDistrict: _this.info.userDistrict,
									speedCtrlKbps: _this.info.speedCtrlKbps,
									configTime: _this.info.configTime,
									userInfo: _this.info.userInfo,
									connSuGroupName: _this.info.connSuGroupName,
									isAlarmIfOffLine: _this.info.isAlarmIfOffLine,
									softEncBeginDate: _this.info.softEncBeginDate / 1000,
									softEncEndDate: _this.info.softEncEndDate / 1000,
									allowSendRecvFile: _this.info.allowSendRecvFile,
									maxPubsCount: _this.info.maxPubsCount,
									maxSubsCount: _this.info.maxSubsCount,
									maxDaysOfTopic: _this.info.maxDaysOfTopic,
								}, function(data) {
									if(data.errcode!='0') return fxUtils.alert({txt: data.errinfo});
									// utils.wheelReq(data);
									_this.$refs.loop.start(data);
								});
							}
						});
					}
				});
			},
			verify(fn) {
				var must = ('userName speedCtrlKbps maxPubsCount maxSubsCount maxDaysOfTopic').split(' '),
					i, len = must.length, tips = this.pageTxt.tips;
				var name = this.info.userName;
				if(/[|$%,";:/\\]/.test(name)){
					return fxUtils.alert({txt: pageTxt.nameErr});
				}
				this.info.userName = name.replace(/^\s+|\s+$/ig, '');
				
				for (i = 0; i < len; i++) {
					var k = must[i];
					if(this.info[k]==='') return fxUtils.alert({txt: tips[k]});
				}
				
				if(/\%/.test(this.info.userInfo)) return fxUtils.alert({txt: this.pageTxt.userinfoErr});
				
				must = ('maxPubsCount maxSubsCount maxDaysOfTopic').split(' ');
				for (i = 0; i < must.length; i++) {
					var k = must[i];
					if((/[^0-9]/g).test(this.info[k])) return fxUtils.alert({txt: this.pageTxt.mustNum[k]});
				}
				
				let begin = _this.info.softEncBeginDate;
				let end = _this.info.softEncEndDate;
				if(begin==null&&end==null){
				} else {
					if(!begin||!end){
						return fxUtils.alert({txt:pageTxt.softDay});
					} else if(begin > end){
						return fxUtils.alert({txt: pageTxt.softDay});
					}
				}
				
				if((/^0/).test(this.info.maxDaysOfTopic)){
					return fxUtils.alert({txt: this.pageTxt.mustNum.unequalZero});
				}
				
				var val = this.info['speedCtrlKbps'];
				if(val.length==1&&val=='-') return fxUtils.alert({txt: tips['speedCtrlKbps']});
				fn();
			},
			//修改
			edit() {
				utils.post("mx/userinfo/modify", {
					cmdID: "600004",
					operator: "admin",
					userID: _this.$store.state.transferEditID,
					userName: _this.info.userName,
					userType: _this.info.userType,
					userDistrict: _this.info.userDistrict,
					speedCtrlKbps: _this.info.speedCtrlKbps,
					userInfo: _this.info.userInfo,
					connSuGroupName: _this.info.connSuGroupName,
					isAlarmIfOffLine: _this.info.isAlarmIfOffLine,
					softEncBeginDate: _this.info.softEncBeginDate / 1000,
					softEncEndDate: _this.info.softEncEndDate / 1000,
					allowSendRecvFile: _this.info.allowSendRecvFile,
					maxPubsCount: _this.info.maxPubsCount,
					maxSubsCount: _this.info.maxSubsCount,
					maxDaysOfTopic: _this.info.maxDaysOfTopic,
					configTime: _this.info.configTime
				}, function(data) {
					if(data.errcode == 0) {
						fxUtils.alert({txt: data.errinfo, type: 1});
					} else {
						fxUtils.alert({txt: data.errinfo, type: 0});
					}
				});
			}, //返回
			back() {
				this.$router.replace({
					path: this.$store.state.editBack
				});
			}
		},
		//初始化数据
		created() {
			_this = this;
			let l = lang();
			this.pageTxt = pageTxt = l.userEdit;
			this.auth= globalVar.get('status').user;
			this.maxPubsCount=this.maxSubsCount=this.maxDaysOfTopic = false;
			if(!_this.$store.state.transferEditID) return;
			getGroup();
			if(this.$store.state.editBack == "/main/mxCfg/message/userSet") {
				this.headerText = _this.pageTxt.tips.title;
			} else {
				this.headerText = this.$store.state.headerText;
			}
			this.tabv = this.$store.state.tabv;
			utils.post("mx/userinfo/query", {
				cmdID: "600002",
				userID: _this.$store.state.transferEditID,
				type: 0
			}, function(response) {
				if(response.errcode != 0) return fxUtils.alert({txt: response.errinfo});
				_this.info.userName = response.lists[0].userName;
				_this.info.userType = response.lists[0].userType.toString();
				_this.info.userDistrict = response.lists[0].userDistrict;
				_this.info.speedCtrlKbps = response.lists[0].speedCtrlKbps;
				_this.info.userInfo = response.lists[0].userInfo;
				_this.info.connSuGroupName = response.lists[0].connSuGroupName;
				_this.info.isAlarmIfOffLine = response.lists[0].isAlarmIfOffLine.toString();
				_this.info.softEncBeginDate = response.lists[0].softEncBeginDate*1000 || null;
				_this.info.softEncEndDate = response.lists[0].softEncEndDate*1000 || null;
				_this.info.allowSendRecvFile = response.lists[0].allowSendRecvFile.toString();
				_this.info.maxPubsCount = response.lists[0].maxPubsCount;
				_this.info.maxSubsCount = response.lists[0].maxSubsCount;
				_this.info.maxDaysOfTopic = response.lists[0].maxDaysOfTopic;
				_this.configTime = timestampToTime(response.lists[0].configTime);
				_this.info.configTime = response.lists[0].configTime;
			});
			// 用户类型
			utils.post("mx/dict/query", {
				cmdID: "600000",
				language: 0,
				type: 1
			}, function(response) {
				if(response.errcode == 0) {
					_this.userType = response.lists;
				}
			});
			utils.post("mx/dict/query", {
				cmdID: "600000",
				language: 0,
				type: 2
			},function(response) {
				if(response.errcode == 0) {
					_this.cities = response.lists;
				}
			});
		},
		components: {
			UserEkey,
			UserSignal,
			ExtendInfo
		}
	};

	function timestampToTime(t) {
		var date = new Date(t * 1000), str = '';
		str += date.getFullYear() + '-';
		str += addZero(date.getMonth()+1) + '-';
		str += addZero(date.getDate()) + ' ';
		str += addZero(date.getHours()) + ':';
		str += addZero(date.getMinutes()) + ':';
		str += addZero(date.getSeconds());
		return str;
	}
	function addZero(num){
		return num < 10 ? '0' + num : num;
	}
	function getGroup(){
		var param = {
			url: 'mx/suConfig/queryGroupID',
			cmdID: '600083'
		};
		utils.post(param, function(data) {
			if(data.errcode != '0') return console.log(data.errinfo);
			var i, len = data.lists.length, arr = [], obj;
			for (i = 0; i < len; i++) {
				obj = data.lists[i];
				if(inArr(arr, obj.groupID)) continue;
				arr.push({value: i, groupID: obj.groupID});
			}
			_this.pageTxt.connect = arr;
		});
		function inArr(arr, str){
			var i, len = arr.length, obj;
			for (i = 0; i < len; i++) {
				obj = arr[i];
				if(obj.groupID == str) return true;
			}
			return false;
		}
	}
</script>

<style scoped="scoped">
	.userEdit{color: #606266;min-height: 630px;}
	.red{color: red;}
	.info li{margin-top: 10px; height: 36px;}
	.info{white-space: nowrap;width: 710px;}
	.header{height: 44px; border-bottom: 1px solid #EBEFF4; overflow: hidden;}
	.header_img{float: left; margin-top: 15px; margin-left: 20px;}
	.header_txt1{font-size: 13px; color: #5c759d; float: left; line-height: 44px; margin-left: 5px; cursor: pointer;}
	.header_line{border-right: 1px solid #ebeff4; height: 30px; float: left; margin-left: 20px; margin-top: 9px;}
	.header_txt2{font-size: 16px; color: #656a73; line-height: 44px; margin-left: 20px; font-weight: bold;}
	#fbcs_MX .el-tabs{padding: 22px; margin: 0 auto;}
	#fbcs_MX .el-col-6{width: 311px; font-size: 14px; color: #666;}
	#fbcs_MX .el-col-18{width: auto;}
	.left li{text-align: right; line-height: 40px;}
	.right{margin-left: 15px; line-height: 40px;}
	.right input{font-size: 14px; width: 255px; height: 30px; vertical-align: middle; padding: 0 5px; border: 1px solid #d7d8da; text-indent: 7px;}
	input:focus{border: 2px solid #32ccf9;}
	#fbcs_MX .el-select{width: 255px;}
	#fbcs_MX .el-textarea{width: 255px;}
	#fbcs_MX .el-input{width: 255px;}
	.kbit{font-size: 12px; line-height: 36px; vertical-align: middle; color: #999; margin-left: 10px;}
	.info .txtH{height: 100px;}
	.btn{margin-left: 175px; margin-top: 30px;}
	.red{color: red; font-size: 14px;}
	.errNum{color: red;font-size: 12px;vertical-align: middle;margin-left: 10px;}
</style>
<style>
	#fbcs_MX .userEdit .el-tabs__content{overflow: visible;}
	#fbcs_MX .userEdit .v1{min-width: 620px;}
	#fbcs_MX .userEdit .icon40 .el-input__icon{line-height: 40px !important;}
</style>