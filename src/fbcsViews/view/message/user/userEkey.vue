<template>
	<div>
		<div class="Ekey">
			<div class="btnBox">
				<div v-if="auth>1" id='Add' @click="showAdd"><img src="@/fbcsViews/img/user/addEkey.png"><span> {{pageTxt.label[7]}}</span></div>
			</div>
			<el-table stripe border :data="EkeyData.lists" tooltip-effect="dark" @current-change="currentRow" highlight-current-row>
				<!--<el-table-column width="50" label=" " type="index"></el-table-column>-->
				<el-table-column prop="userID" :label="pageTxt.table[0]" show-overflow-tooltip></el-table-column>
				<el-table-column prop="userName" :label="pageTxt.table[1]" show-overflow-tooltip></el-table-column>
				<el-table-column prop="ekeyName" :label="pageTxt.table[2]" show-overflow-tooltip></el-table-column>
				<el-table-column prop="validDateStr" :label="pageTxt.table[3]" show-overflow-tooltip></el-table-column>
				<el-table-column prop="comment" :label="pageTxt.table[4]" show-overflow-tooltip></el-table-column>
				<el-table-column :label="pageTxt.table[5]" width="110">
					<div v-if="auth>1" slot-scope="scope" class="_zero">
						<div @click="showEdit(scope.row)" id='Edit' :title="pageTxt.table[6]"><img src="@/fbcsViews/img/user/altericos.png"></div>
						<div @click="showDel" :title="pageTxt.table[7]"><img src="@/fbcsViews/img/user/deleticos.png"></div>
					</div>
				</el-table-column>
			</el-table>
			<el-dialog v-dialogDrag :title="pageTxt.popup[0]" :visible.sync="addEkey" width='620px'>
				<ul class="_dialog">
					<li>
						<div class="leftBox">
							<p class="txt"><span class="red">*&nbsp;</span>{{pageTxt.popup[1]}}</p>
						</div>
						<div class="rightBox">
							<el-input auto-complete="off" type="text" v-model="ainfo.userID" disabled class='picker'></el-input>
						</div>
					</li>
					<li>
						<div class="leftBox">
							<p class="txt"><span class="red">*&nbsp;</span>{{pageTxt.popup[2]}}</p>
						</div>
						<div class="rightBox">
							<span :class="{txt1:1,hide: !isOpenEkeyPrefixByWeb}">/C=CN/CN=</span>
							<el-input auto-complete="off" :class="{prefix156:!!isOpenEkeyPrefixByWeb,prefix250:!isOpenEkeyPrefixByWeb}"
								v-model="ainfo.ekeyName" :maxlength="isOpenEkeyPrefixByWeb!= 0?55:64"></el-input>
						</div>
					</li>
					<li>
						<div class="leftBox">
							<p class="txt">{{pageTxt.popup[15]}}</p>
						</div>
						<div class="rightBox">
							<el-input auto-complete="off" class='picker' v-model="ainfo.ekeyPasswd" maxlength="64"></el-input>
							<p class="txt2">{{pageTxt.label[9]}}</p>
						</div>
					</li>
					<li>
						<div class="leftBox">
							<p class="txt">{{pageTxt.popup[3]}}</p>
						</div>
						<div class="rightBox">
							<el-date-picker class='picker' v-model="ainfo.ekeyValidDate" format='yyyy-MM-dd HH:mm:ss' value-format="timestamp" 
								type="datetime" default-time="23:59:59"></el-date-picker>
						</div>
					</li>
					<li>
						<div class="leftBox">
							<p class="txt">{{pageTxt.popup[4]}}</p>
						</div>
						<div class="rightBox">
							<el-input auto-complete="off" class='picker' v-model="ainfo.comment" maxlength="64"></el-input>
						</div>
					</li>
				</ul>
				<div slot="footer" class="_footBtn">
					<button class="blueBtn" @click="addNow">{{pageTxt.popup[5]}}</button>
					<button class="blueBtn" @click="submitAdd">{{pageTxt.popup[6]}}</button>
					<button class="defBtn" @click="addEkey = false">{{pageTxt.popup[7]}}</button>
				</div>
			</el-dialog>
			<el-dialog v-dialogDrag :title="pageTxt.popup[8]" :visible.sync="editEkdy" width='620px'>
				<ul class="_dialog">
					<li>
						<div class="leftBox">
							<p class="txt"><span class="red">*&nbsp;</span>{{pageTxt.popup[1]}}</p>
						</div>
						<div class="rightBox">
							<el-input auto-complete="off" class='picker' v-model="binfo.userID" :placeholder="pageTxt.popup[13]" disabled></el-input>
						</div>
					</li>
					<li>
						<div class="leftBox">
							<p class="txt"><span class="red">*&nbsp;</span>{{pageTxt.popup[2]}}</p>
						</div>
						<div class="rightBox">
							<span :class="{txt1:1,hide: !isOpenEkeyPrefixByWeb}">/C=CN/CN=</span>
							<el-input disabled auto-complete="off" :class="{prefix156:!!isOpenEkeyPrefixByWeb,prefix250:!isOpenEkeyPrefixByWeb}"
								v-model="binfo.ekeyName" :maxlength="isOpenEkeyPrefixByWeb!= 0?55:64" :placeholder="pageTxt.popup[13]"></el-input>
						</div>
					</li>
					<li>
						<div class="leftBox">
							<p class="txt">{{pageTxt.popup[14]}}</p>
						</div>
						<div class="rightBox">
							<el-checkbox class="flag" v-model="isModifyEkeyPasswd"></el-checkbox>
						</div>
					</li>
					<li v-show="isModifyEkeyPasswd">
						<div class="leftBox">
							<p class="txt">{{pageTxt.popup[15]}}</p>
						</div>
						<div class="rightBox">
							<el-input auto-complete="off" class='picker' v-model="binfo.ekeyPasswd" maxlength="64"></el-input>
							<p class="txt2">{{pageTxt.label[9]}}</p>
						</div>
					</li>
					<li>
						<div class="leftBox">
							<p class="txt">{{pageTxt.popup[3]}}</p>
						</div>
						<div class="rightBox">
							<el-date-picker class='picker' v-model="binfo.ekeyValidDate" format='yyyy-MM-dd HH:mm:ss' value-format="timestamp" 
								type="datetime" default-time="23:59:59"></el-date-picker>
						</div>
					</li>
					<li>
						<div class="leftBox">
							<p class="txt">{{pageTxt.popup[4]}}</p>
						</div>
						<div class="rightBox">
							<el-input auto-complete="off" class='picker' v-model="binfo.comment" maxlength="64" ></el-input>
						</div>
					</li>
				</ul>
				<div slot="footer" class="_footBtn">
					<button class="blueBtn" @click="editNow">{{pageTxt.popup[5]}}</button>
					<button class="blueBtn" @click="submitEdit">{{pageTxt.popup[13]}}</button>
					<button class="defBtn" @click="editEkdy = false">{{pageTxt.popup[7]}}</button>
				</div>
			</el-dialog>
			<div class="_pagination" v-if="max>pageSize">
				<el-pagination @current-change='handleCurrentChange' background layout="prev, pager, next, jumper" 
					@size-change="handleSizeChange" :page-size="pageSize" :total="max"></el-pagination>
				<div class="rightTxt">{{paging.before1}}{{max}}{{paging.after}}</div>
			</div>
			<div class="onePage" v-else-if="max>0&&max<=pageSize">{{paging.before2}}{{max}}{{paging.after}}</div>
			<lgy-loopReqMX ref="loop"></lgy-loopReqMX>
		</div>
	</div>
</template>

<script>
import utils	 from "@/fbcsViews/libs/utils.js";
import lang		 from '@/fbcsViews/language/lang.js';
import globalVar from '@/fbcsViews/libs/globalVar.js';
import md5       from '@/fbcsViews/libs/md5.js';
import fxUtils   from '@/fbcsFxViews/libs/utils.js';

	var pageTxt = 'lang.Ekey',
		autoTime, _currentPage = 1,
		_this;

	var ainfo = {},
		def = ["operator", "userID", "ekeyName", "type", "ekeyValidDate", "comment"];
	for(var i = 0; i < def.length; i++) {
		ainfo[def[i]] = "";
	}

	var binfo = {},
		det = ["operator", "userID", "ekeyName", "type", "ekeyValidDate", "comment"];
	for(var i = 0; i < det.length; i++) {
		binfo[det[i]] = "";
	}

	export default {
		data() {
			return {
				auth: globalVar.get('status').user,
				max:0,
				idName: "",
				userID: "",
				search: {
					userID: "",
					type: "",
					ekeyName: ""
				},
				ainfo,
				binfo,
				EkeyData: [],
				oldEkeyName: "",
				pageTxt,
				radio: 1,
				addEkey: false,
				editEkdy: false,
				row: {},
				data2: [],
				currentPage1: 1,
				pageSize: 20,
				options: [],
				isModifyEkeyPasswd: false,
				CN: '/C=CN/CN=',
				isOpenEkeyPrefixByWeb: 1
			};
		},
		methods: {
			//创建Ekey
			showAdd() {
				this.addEkey = true;
				this.ainfo.userID = this.$store.state.transferEditID;
				this.ainfo.ekeyName = "";
				this.ainfo.ekeyPasswd = '';
				this.ainfo.ekeyValidDate = null;
				this.ainfo.comment = "";
			},
			addNow() {
				add('now');
			},
			submitAdd() {
				add('add');
			},
			//修改
			showEdit(row) {
				this.editEkdy = true;
				this.oldEkeyName = row.ekeyName;
				this.binfo.userID = row.userID;
				this.binfo.userName = row.userName;
				this.binfo.ekeyName = row.ekeyName.replace(this.CN, '');
				this.isModifyEkeyPasswd = false;
				this.binfo.ekeyPasswd = '';
				if(row.ekeyValidDate){
					this.binfo.ekeyValidDate = row.ekeyValidDate * 1000;
				} else {
					this.binfo.ekeyValidDate = null;
				}
				this.binfo.comment = row.comment;
			},
			editNow() {
				edit('now');
			},
			submitEdit() {
				edit('edit');
			},
			//删除(row)
			showDel() {
				utils.hints({
					txt: _this.pageTxt.tips[6],
					yes: _this.ekeyDel,
					btn: 2
				});
			},
			ekeyDel() {
				utils.post("mx/userEkey/delete", {
					cmdID: "600024",
					operator: "admin",
					userID: _this.row.userID,
					ekeyName: _this.row.ekeyName
				}, function(data) {
					if(data.errcode == 0) {
						_this.renderDate(1);
						fxUtils.alert({txt: data.errinfo, type: 1});
					} else {
						fxUtils.alert({txt: data.errinfo});
					}
				});
			},
			currentRow: function(e) {
				this.row = e;
			},
			// 分页
			handleSizeChange: function(size) {
				this.pageSize = size;
			},
			handleCurrentChange: function(currentPage) {
				this.currentPage1 = currentPage;
				_this.renderDate(1);
			},
			// 更新数据
			renderDate(type) {
				utils.post("mx/userEkey/query", {
					cmdID: "600021",
					userID: _this.$store.state.transferEditID,
					ekeyName: '',
					type: type,
					pageSize: _this.pageSize,
					currentPage: _this.currentPage1
				},function(response) {
					if(response.errcode == 0) {
						if(response.totalPage < _this.currentPage1 && response.totalPage >= 1) {
							_this.currentPage1 = response.totalPage;
							_this.renderDate(type);
						} else {
							var arr = response.lists;
							for (var i = 0; i < arr.length; i++) {
								var time = arr[i].ekeyValidDate;
								if (!time) {
									arr[i].ekeyValidDate = 0;
									arr[i].validDateStr = '';
								} else {
									arr[i].validDateStr = getDate(time);
								}
							}
							_this.EkeyData = response;
							_this.max = response.totalSize;
						}
					}else{
						_this.EkeyData.lists = [];
						_this.max = 0;
					}
				});
			},
		},
		//初始化数据
		created() {
			_this = this;
			let l = lang();
			this.pageTxt = pageTxt = l.Ekey;
			this.paging = l.publics.paging;
			check = check.bind(this);
			this.auth= globalVar.get('status').user;
			prefix();
			_this.renderDate(1);
			/*utils.post("mx/userinfo/queryLists", {
				cmdID: "600001",
				userID: _this.$store.state.transferEditID,
				userName: "",
				pageSize: 200,
				currentPage: 1,
				type: 0
			},function(response) {
				if(response == 0) {
					_this.options = response.lists;
				}
			});*/
		}
	};
	
	function check(info, isModify){
		let tips = this.pageTxt.tips, isPrefix = !!_this.isOpenEkeyPrefixByWeb;
		let regName = isPrefix ? /[^\w]/ : /[^\w\/=]|\/$|\=$/g;
		// if(info.userID == "") return utils.weakTips(tips[0]);
		if(info.ekeyName == "") return fxUtils.alert({txt: tips[1]});
		// else if (info.ekeyValidDate == "") return utils.weakTips(tips[2]);
		// else if (info.comment == "") return utils.weakTips(tips[3]);
		else if (/\%/.test(info.comment)) {
			return fxUtils.alert({txt: this.pageTxt.commentErr});
		} else if(regName.test(info.ekeyName)) {
			if(isModify !== true){
				let txt = isPrefix ? this.pageTxt.eNameErr : this.pageTxt.eNameErr2;
				return fxUtils.alert({txt});
			}
		}
		return true;
	}
	
	function getDate(ti){
		var d = new Date(ti * 1000),
		t = d.getFullYear() + '-';
		t += dbNum(d.getMonth()+1) + '-';
		t += dbNum(d.getDate()) + ' ';
		t += dbNum(d.getHours()) + ':';
		t += dbNum(d.getMinutes()) + ':';
		t += dbNum(d.getSeconds());
		return t;
	}
	function dbNum(num){
		return num < 10 ? '0'+num : num;
	}
	function add(act){
		if(check(_this.ainfo)!==true) return;
		
		_this.addEkey = false;
		var param = {
			url: 'mx/userEkey/add',
			cmdID: "600022",
			operator: 'admin',
			userID: _this.ainfo.userID,
			ekeyName: _this.CN + _this.ainfo.ekeyName,
			ekeyPasswd: _this.ainfo.ekeyPasswd ? md5.hex_md5(_this.ainfo.ekeyPasswd) : '',
			ekeyValidDate: _this.ainfo.ekeyValidDate / 1000 || 0,
			comment: _this.ainfo.comment,
			isOpenEkeyPrefixByWeb: _this.isOpenEkeyPrefixByWeb
		}
		if(act == 'now'){
			utils.review({
				uri: 'mx/userEkey/addImmediately',
				yes: function(info) {
					param.cmdID = '600025';
					param.url = "mx/userEkey/addImmediately";
					param.reviewer = info.name;
					param.reviewerPassword = info.pwd;
					param.reviewType = 1;
					param.isOpenEkeyPrefixByWeb = _this.isOpenEkeyPrefixByWeb;
					req(param, act);
				}
			});
		} else req(param, act);
		
		function req(args, act){
			utils.post(args, function(data) {
				if(data.errcode == 0) {
					if(_this.$store.state.creatAndEdit) {
						if(act == 'now'){
							// utils.wheelReq(data);
							_this.$refs.loop.start(data);
						} else fxUtils.alert({txt: data.errinfo, type: 1});
						_this.renderDate(1);
					} else {
						_this.renderDate(1);
						if(act == 'now'){
							// utils.wheelReq(data);
							_this.$refs.loop.start(data);
							return;
						}
						utils.hints({
							txt: data.errinfo + " Whether the jump is added comm ?",
							yes: function() {
								_this.$store.state.tabv = "v3";
								_this.$router.replace({
									path: "/main/mxCfg/message/userEdit/mess"
								});
							},
							no: function() {
								_this.$store.state.tabv = "v2";
								_this.$router.replace({
									path: "/main/mxCfg/message/userEdit/mess"
								});
							}
						})
					}
				} else {
					fxUtils.alert({txt: data.errinfo, type: 0});
				}
			});
		}
	}
	function edit(act){
		if(check(_this.binfo, true)!==true) return;
		
		_this.editEkdy = false;
		var flag = _this.isModifyEkeyPasswd;
		var param = {
			url: "mx/userEkey/modify",
			cmdID: "600023",
			operator: 'admin',
			userID: _this.binfo.userID,
			// oldEkeyName: _this.oldEkeyName,
			oldEkeyName: _this.CN + _this.binfo.ekeyName,
			ekeyName: _this.CN + _this.binfo.ekeyName,
			isModifyEkeyPasswd: flag ? 1 : 0,
			ekeyPasswd: _this.binfo.ekeyPasswd ? md5.hex_md5(_this.binfo.ekeyPasswd) : '',
			ekeyValidDate: _this.binfo.ekeyValidDate / 1000 || 0,
			comment: _this.binfo.comment,
			isOpenEkeyPrefixByWeb: _this.isOpenEkeyPrefixByWeb
		}
		if(act == 'now'){
			utils.review({
				uri: 'mx/userEkey/modifyImmediately',
				yes: function(info) {
					param.cmdID = '600026';
					param.url = "mx/userEkey/modifyImmediately";
					param.reviewer = info.name;
					param.reviewerPassword = info.pwd;
					param.reviewType = 1;
					param.isOpenEkeyPrefixByWeb = _this.isOpenEkeyPrefixByWeb;
					req(param, act);
				}
			});
		} else req(param, act);
		
		function req(args, act){
			utils.post(args, function(data) {
				if (data.errcode == 0) {
					if(act == 'now'){
						// utils.wheelReq(data);
						_this.$refs.loop.start(data);
					} else fxUtils.alert({txt: data.errinfo, type: 1});
                	_this.renderDate(1);
            	} else {
            		fxUtils.alert({txt: data.errinfo});
            	}
			});
		}
	}
	function prefix(){
		var param = {
			url: 'mx/userEkey/isOpenEkeyPrefix',
			cmdID: "600029"
		};
		
		utils.post(param, function(data) {
			if (data.errcode != '0') return fxUtils.alert({txt: data.errinfo});
			_this.CN = data.isOpenEkeyPrefix != 0 ? '/C=CN/CN=' : '';
			_this.isOpenEkeyPrefixByWeb = data.isOpenEkeyPrefix;
		});
	}
</script>

<style scoped="scoped">
	.Ekey{min-width: 800px;}
	.Ekey *{vertical-align: middle;}
	.user{height: 30px; font-size: 14px; color: #666666;}
	.user .el-button{margin-left: 35px;}
	.txt{margin-left: 35px;font-size: 14px; color: #666666;}
	.txt1{ margin-left: 10px; font-size: 14px; color: #666666; }
	.txt2{ margin-left: 10px; font-size: 14px; color: #F00; }
	.btnBox{margin-bottom: 10px;}
	.btnBox div{font-size: 14px; color: #5c759d; cursor: pointer; margin-right: 35px; display: inline-block;}
	.btnBox span{margin-left: 4px;height: 30px; line-height: 30px;}
	.Ekey .eRadio{margin-right: 30px;}
	.Ekey .el-radio__label{font-size: 16px;}
	.picker{width: 250px;}
	._zero div{float: left; margin-right: 14px; cursor: pointer;}
	._zero{overflow: hidden;}
	.el-input{margin-left: 10px;}
	.promptBox_content_txt{font-size: 14px; color: #666; text-align: center; display: block; margin-top: 60px;}
	.promptBox_btn{text-align: center; margin-top: 60px; margin-bottom: 50px;}
	.promptBox_btn button:nth-child(1){margin-left: 0;}
	#rightBox1{margin-left: 10px; width: 210px;}
	.red{color:#f56c6c; font-size: 14px;}
	.flag{margin-left: 10px;}
	.el-select{width: 250px;}
	.prefix250{width: 250px;}
	.prefix156 {width: 156px;}
	.hide{display: none;}
</style>
<style>
	#fbcs_MX .Ekey .picker.el-date-editor.el-input {width: 250px;}
</style>
