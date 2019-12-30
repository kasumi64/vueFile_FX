<template>
	<div class="userAdd">
		<div class='header'>
			<img class="header_img" src="@/fbcsViews/img/ico.png">
			<span class="header_txt1" @click="back">{{pageTxt.label[0]}}</span>
			<div class="header_line"></div>
			<span class='header_txt2'>{{pageTxt.label[19]}}</span>
		</div>
		<el-tabs type="card">
			<el-tab-pane>
				<span slot="label">{{pageTxt.tab[0]}}</span>
				<el-row class='info'>
					<el-col :span="6">
						<ul class="left">
							<li><span class="red">*&nbsp;</span>{{pageTxt.label[1]}}：</li>
							<li><span class="red">*&nbsp;</span>{{pageTxt.label[2]}}：</li>
							<li><span class="red">*&nbsp;</span>{{pageTxt.label[23]}}：</li>
							<li>&nbsp;</li>
							<li>{{pageTxt.label[27]}}</li>
							<li>{{pageTxt.label[3]}}：</li>
							<li>{{pageTxt.label[4]}}：</li>
							<li><span class="red">*&nbsp;</span>{{pageTxt.label[5]}}：</li>
							<li>{{pageTxt.label[7]}}：</li>
							<li><span class="red">*&nbsp;</span>{{pageTxt.label[8]}}：</li>
							<li>{{pageTxt.label[9]}}：</li>
							<li>{{pageTxt.label[10]}}：</li>
							<li>{{pageTxt.label[11]}}：</li>
							<li>{{pageTxt.label[12]}}：</li>
							<li><span class="red">*&nbsp;</span>{{pageTxt.label[13]}}：</li>
							<li><span class="red">*&nbsp;</span>{{pageTxt.label[14]}}：</li>
							<li><span class="red">*&nbsp;</span>{{pageTxt.label[15]}}：</li>
						</ul>
					</el-col>
					<el-col :span="18">
						<ul class="right">
							<li>
								<input @input="filterID" v-model="info.userID" maxlength="32" :placeholder="pageTxt.tips.must" autocomplete="off"/>
							</li>
							<li>
								<input v-model="info.userName" maxlength="128" :placeholder="pageTxt.tips.must" autocomplete="off"/>
							</li>
							<li class="default_radio">
								<el-radio v-model="info.isModifyDefaultPasswd" :label="0" @change="judge">{{pageTxt.label[21]}}</el-radio>
								<el-radio v-model="info.isModifyDefaultPasswd" :label="1" @change="judge">{{pageTxt.label[22]}}</el-radio>
							</li>
							<li>
								<el-input auto-complete="off" v-model="info.userPasswd" maxlength="16" :disabled="info.isModifyDefaultPasswd==0"></el-input>
							</li>
							<li>
								<el-select v-model="info.pwdTime">
									<el-option v-for="item in pageTxt.pwdTime" :label="item.txt" :key="item.val" :value="item.val"></el-option>
								</el-select>
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
							<li>
								<el-date-picker v-model="info.softEncBeginDate" value-format="timestamp" type="datetime" 
								:placeholder="pageTxt.label[24]" default-time="00:00:00"></el-date-picker>
							</li>

							<li>
								<el-date-picker v-model="info.softEncEndDate" value-format="timestamp" type="datetime" 
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
						</ul>
					</el-col>
				</el-row>
				<div class="btn">
					<el-button type="primary" @click='verify(sendDown)'>{{pageTxt.label[16]}}</el-button>
					<el-button type="primary" @click="verify(add)">{{pageTxt.label[25]}}</el-button>
					<el-button type="default" @click='back'>{{pageTxt.label[18]}}</el-button>
				</div>
			</el-tab-pane>

			<el-tab-pane disabled>
				<span slot="label">{{pageTxt.tab[1]}}</span>
			</el-tab-pane>
			<el-tab-pane disabled>
				<span slot="label">{{pageTxt.tab[2]}}</span>
			</el-tab-pane>
			<el-tab-pane disabled>
				<span slot="label">{{pageTxt.tab[3]}}</span>
			</el-tab-pane>
		</el-tabs>
		<lgy-loopReqMX ref="loop" @close="loopClose"></lgy-loopReqMX>
	</div>
</template>

<script>
import utils from "@/fbcsViews/libs/utils.js";
import md5 from "@/fbcsViews/libs/md5.js";
import lang from "@/fbcsViews/language/lang.js";
import fxUtils from '@/fbcsFxViews/libs/utils.js';

	var pageTxt, info = {}, _this,
		def = [
			"operator",
			"userID",
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
			"userPasswd",
			'pwdTime'
		];

	for(var i = 0; i < def.length; i++) {
		info[def[i]] = "";
	}

	export default {
		data() {
			return {
				userType: [],
				cities: [],
				info,
				pageTxt,
				judgment: [],
				maxPubsCount: false,
				maxSubsCount: false,
				maxDaysOfTopic: false
			};
		},
		methods: {
			filterID(e){
				this.info['userID'] = e.target.value.replace(/[^a-zA-Z0-9_-]/g, '');
			},
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
			sendDown() {
				this.$store.state.transferEditID = this.info.userID;
				utils.review({
					uri: 'mx/userinfo/addImmediately',
					yes: function(info) {
						utils.hints({
							txt: _this.pageTxt.tips.now,
							yes: function() {
								var param = {
									cmdID: "600006",
									operator: "admin",
									reviewer: info.name,
									reviewerPassword: info.pwd,
									reviewType: 1,
									userID: _this.info.userID,
									userName: _this.info.userName,
									userType: _this.info.userType,
									userDistrict: _this.info.userDistrict,
									speedCtrlKbps: _this.info.speedCtrlKbps,
									configTime: _this.info.configTime,
									userInfo: _this.info.userInfo,
									connSuGroupName: _this.info.connSuGroupName,
									isAlarmIfOffLine: _this.info.isAlarmIfOffLine,
									softEncBeginDate: _this.info.softEncBeginDate/1000,
									softEncEndDate: _this.info.softEncEndDate/1000,
									allowSendRecvFile: _this.info.allowSendRecvFile,
									maxPubsCount: _this.info.maxPubsCount,
									maxSubsCount: _this.info.maxSubsCount,
									maxDaysOfTopic: _this.info.maxDaysOfTopic,
									isModifyDefaultPasswd: _this.info.isModifyDefaultPasswd,
									userPasswd: _this.info.isModifyDefaultPasswd ? md5.hex_md5(_this.info.userPasswd) : md5.hex_md5("111111"),
									expiredTimeFlag: _this.info.pwdTime
								};
								fxUtils.setArgs('userInfo', param);
								utils.post("mx/userinfo/addImmediately", param, function(data) {
									if(data.errcode!=0) return fxUtils.alert({txt: data.errinfo});
									data.type = 1;
									// utils.wheelReq(data);
									// _this.$store.state.tabv = "v2";
									// _this.$router.replace({path: "/main/mxCfg/message/userEdit/mess"});
									_this.$refs.loop.start(data);
								});
							}
						});
					}
				});
			},
			add() {
				this.$store.state.transferEditID = this.info.userID;
				var info = {
					cmdId: "600003",
					operator: "admin",
					userID: _this.info.userID,
					userName: _this.info.userName,
					userType: _this.info.userType,
					userDistrict: _this.info.userDistrict,
					speedCtrlKbps: _this.info.speedCtrlKbps,
					configTime: _this.info.configTime,
					userInfo: _this.info.userInfo,
					connSuGroupName: _this.info.connSuGroupName,
					isAlarmIfOffLine: _this.info.isAlarmIfOffLine,
					softEncBeginDate: _this.info.softEncBeginDate/1000,
					softEncEndDate: _this.info.softEncEndDate/1000,
					allowSendRecvFile: _this.info.allowSendRecvFile,
					maxPubsCount: _this.info.maxPubsCount,
					maxSubsCount: _this.info.maxSubsCount,
					maxDaysOfTopic: _this.info.maxDaysOfTopic,
					isModifyDefaultPasswd: _this.info.isModifyDefaultPasswd,
					userPasswd: _this.info.isModifyDefaultPasswd ? md5.hex_md5(_this.info.userPasswd) : md5.hex_md5("111111"),
					expiredTimeFlag: _this.info.pwdTime
				};
				fxUtils.setArgs('userInfo', info);
				utils.post("mx/userinfo/add", info, function(data) {
					if(data.errcode == 0) {
						utils.hints({
							txt: data.errinfo,
							yes: function() {
								_this.$store.state.tabv = "v2";
								_this.$router.replace({
									path: "/main/mxCfg/message/userEdit/mess"
								});
							},
							no: function() {
								_this.$store.state.headerText;
								_this.$store.state.tabv = "v1";
								_this.$router.replace({
									path: "/main/mxCfg/message/userEdit/mess"
								});
							}
						});
					} else {
						// utils.weakTips(data.errinfo);
						fxUtils.alert({txt: data.errinfo});
					}
				});
			},
			verify(fn) {
//				var reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}|(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^\w\s]).{8,}|(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
				var must = ('userID userName userPasswd speedCtrlKbps maxPubsCount maxSubsCount maxDaysOfTopic').split(' '),
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
				
				var regAll = /[^\w @#_\-\*]/g, val = this.info['userPasswd'],
					err = tips['userPasswd'];
				if(regAll.test(val)) return fxUtils.alert({txt: err});
				
				val = this.info['speedCtrlKbps'];
				if(val.length==1&&val=='-') return fxUtils.alert({txt: tips['speedCtrlKbps']});
				
				must = ('maxPubsCount maxSubsCount maxDaysOfTopic').split(' ');
				for (i = 0; i < 3; i++) {
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
					 fxUtils.alert({txt: this.pageTxt.mustNum.unequalZero});
				}
				
				if(this.info.isModifyDefaultPasswd == 1){
					var num = 0, reg = [/[A-Z]/,/[a-z]/,/[0-9]/,/[ @#_\-\*]/];
					val = this.info['userPasswd'];
					if(val.length < 8) return fxUtils.alert({txt: err});
					for (i = 0, len = reg.length; i < len; i++) {
						if(reg[i].test(val)) num++;
					}
					if(num > 1) fn();
					else return fxUtils.alert({txt: err});
				} else fn();
			},
			judge() {
				if(info.isModifyDefaultPasswd != 0) {
					this.info.userPasswd = "";
				} else {
					this.info.userPasswd = 111111;
				}
			},
			back() {
				this.$router.replace({
					path: "/main/mxCfg/user"
				});
			},
			loopClose(){
				this.$store.state.tabv = "v2";
				this.$router.replace({path: "/main/mxCfg/message/userEdit/mess"});
			}
		},
		created() {
			_this = this;
			let l = lang();
			this.pageTxt = pageTxt = l.userEdit;
			this.maxPubsCount=this.maxSubsCount=this.maxDaysOfTopic = false;
			getGroup();
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
			}, function(response) {
				if(response.errcode == 0) {
					_this.cities = response.lists;
				}
			});
			info.userID = "";
			info.userName = "";
			info.isModifyDefaultPasswd = 0;
			info.userPasswd = "111111";
			info.userType = "0";
			info.userDistrict = "BJ";
			info.speedCtrlKbps = "-1";
			info.connSuGroupName = "Group0";
			info.isAlarmIfOffLine = "0";
			info.allowSendRecvFile = "0";
			info.maxPubsCount = "5";
			info.maxSubsCount = "5";
			info.maxDaysOfTopic = "7";
			info.pwdTime = '-1';
			info.userInfo = '';
			let day = new Date();
			day.setHours(0, 0, 0, 0);
			info.softEncBeginDate = day.getTime();
			day.setHours(23,59,59,0);
			info.softEncEndDate = day.getTime();
		}
	};

	function getGroup() {
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
	.userAdd { color: #606266; min-width: 620px; min-height: 630px; }
	.header { height: 44px; border-bottom: 1px solid #ebeff4; overflow: hidden; }
	.header_img { float: left; margin-top: 15px; margin-left: 20px; }
	.header_txt1 { font-size: 13px; color: #5c759d; float: left; line-height: 44px; margin-left: 5px; cursor: pointer; }
	.header_line { border-right: 1px solid #ebeff4; height: 30px; float: left; margin-left: 20px; margin-top: 9px; }
	.header_txt2 { font-size: 16px; color: #656a73; line-height: 44px; margin-left: 20px; font-weight: bold; }
	#fbcs_MX .el-tabs { padding: 22px; }
	.info { white-space: nowrap;width: 650px; }
	#fbcs_MX .el-col-6 { width: 160px; font-size: 14px; color: #666666; }
	.left li { text-align: right; line-height: 40px; }
	.info li { margin-top: 10px; height: 36px; }
	.right { margin-left: 15px; line-height: 40px; }
	.right input { font-size: 14px; width: 255px; height: 30px; vertical-align: middle; padding: 0 5px; border: 1px solid #d7d8da; text-indent: 12px; color: #666; }
	input:focus { border: 2px solid #32ccf9; }
	#fbcs_MX .el-select { width: 255px; }
	#fbcs_MX .el-textarea { width: 255px; }
	#fbcs_MX .el-input { width: 255px; }
	.kbit { font-size: 12px; line-height: 36px; vertical-align: middle; color: #999999; margin-left: 10px; } .info .txtH { height: 100px; }
	.default_radio { line-height: 50px; }
	.btn { margin-left: 175px; margin-top: 30px; }
	.red { color: red; font-size: 14px; }
	.errNum{color: red;font-size: 12px;vertical-align: middle;margin-left: 10px;}
</style>
<style>
	#fbcs_MX .userAdd .el-input__icon{line-height: 40px !important;}
</style>
