<template>
	<div>
		<input class="opacity0" autocomplete="on" />
		<!-- <div class='header'>
        <span class='header_txt'>{{pageTxt.label[0]}}</span>
    </div> -->
		<div class="user">
			<div class="userH">
				<span class="txt">{{pageTxt.label[1]}}</span>
				<el-input auto-complete="off" class="input_normal" v-model="userParam.id"></el-input>
				<span class="txt">{{pageTxt.label[2]}}</span>
				<el-input auto-complete="off" class="input_normal" v-model="userParam.name"></el-input>
				<el-button type="primary" @click='userSearch'>{{pageTxt.label[3]}}</el-button>
			</div>
			<div class="btnBox">
				<div v-if="auth>1" @click="createUser"><img src="@/fbcsViews/img/user/creatico.png"><span>{{pageTxt.label[4]}}</span></div>
				<div v-if="auth>1" @click="showPromptBox"><img src="@/fbcsViews/img/user/deletuser.png"><span>{{pageTxt.table[6]}}</span></div>
				<div v-if="auth>1" @click="eidtPasswd"><img src="@/fbcsViews/img/user/editPswd.png"><span>{{pageTxt.table[7]}}</span></div>
				<div v-if="auth>1" @click="batchPwdShow"><img src="@/fbcsFxViews/img/FnIcon/batchPwd.png"><span>{{$t('fbcsFile.fnField.batchPwd')}}</span></div>
				<div v-if="auth>1" @click="importExtInfo"><img src="@/fbcsViews/img/user/defalutico.png"><span>{{pageTxt.label[5]}}</span></div>
				<div @click="exportExtInfo"><img src="@/fbcsViews/img/user/importico1.png"><span>{{pageTxt.label[6]}}</span></div>
				<div @click="exportBasicsInfo"><img src="@/fbcsViews/img/user/importico.png"><span>{{pageTxt.label[7]}}</span></div>
			</div>
			<el-table stripe border ref="multipleTable" tooltip-effect="dark" @select='toggleSelection' @selection-change="fn" :data="userData"
			 @current-change="currentRow" highlight-current-row>
				<!--<el-table-column width="50" label=" " type="index" show-overflow-tooltip></el-table-column>-->
				<el-table-column width="50" type="selection" show-overflow-tooltip></el-table-column>
				<el-table-column prop="userID" :label="pageTxt.table[0]" show-overflow-tooltip></el-table-column>
				<el-table-column prop="userName" :label="pageTxt.table[1]" show-overflow-tooltip></el-table-column>
				<el-table-column :label="pageTxt.table[2]" width="120" show-overflow-tooltip>
					<div slot-scope="scope" class="_zero">
						<!-- <el-tooltip :content="pageTxt.table[3]" placement="bottom" effect="light"> -->
							<div @click='userEdit(scope.row, scope)' :title="pageTxt.table[3]"><img src="@/fbcsViews/img/user/altericos.png"></div>
						<!-- </el-tooltip> -->
						<!-- <el-tooltip :content="pageTxt.table[4]" placement="bottom" effect="light"> -->
							<div @click='userEkey(scope.row, scope)' :title="pageTxt.table[4]"><img src="@/fbcsViews/img/user/editEkey.png"></div>
						<!-- </el-tooltip> -->
						<!-- <el-tooltip :content="pageTxt.table[5]" placement="bottom" effect="light"> -->
							<div @click='userComm(scope.row, scope)' :title="pageTxt.table[5]"><img src="@/fbcsViews/img/user/signal.png"></div>
						<!-- </el-tooltip> -->
						<!-- <div @click="showPromptBox" :title="pageTxt.table[4]"><img src="../../img/user/deleticos.png"></div> -->
						<!-- <div @click="eidtPasswd" :title="pageTxt.table[4]"><img src="../../img/user/passwdico.png"></div> -->
					</div>
				</el-table-column>
			</el-table>

			<div class="_pagination" v-if="max>pageSize">
				<el-pagination @current-change='handleCurrentChange' background layout="prev, pager, next, jumper" :current-page.sync='currPage'
				 @size-change="handleSizeChange" :page-size="pageSize" :total="max"></el-pagination>
				<div class="rightTxt">{{paging.before1}}{{max}}{{paging.after}}</div>
			</div>
			<div class="onePage" v-else-if="max>0&&max<=pageSize">{{paging.before2}}{{max}}{{paging.after}}</div>

			<Password ref='pwd'></Password>

			<el-dialog class="dialog_pop box1" v-dialogDrag :title="pageTxt.popup[0]" :visible.sync="showImportExtInfo" width='680px'>
				<div class="_messaga box1">
					<span class="txt"><span class="red">*&nbsp;</span>{{pageTxt.popup[1]}}</span>
					<el-input auto-complete="off" class="Popup_input" v-model="csvFileName"></el-input>
					<div class="_messaga1_info">
						<span class="info_txt">{{pageTxt.popup[2]}}</span><br/>
						<span class="info_txt">{{pageTxt.popup[3]}}</span>
					</div>
				</div>
				<div slot="footer" class="_footBtn">
					<el-button type="primary" @click="importExtInfoSubmit">{{pageTxt.popup[4]}}</el-button>
					<el-button type="default" @click="showImportExtInfo=false" class="Popup_return">{{pageTxt.popup[5]}}</el-button>
				</div>
			</el-dialog>
			
			<el-dialog class="dialog_pop" v-dialogDrag :title="pageTxt.popup[6]" :visible.sync="showExportExtInfo" width='600px'>
				<div class="_messaga">
					<span class="txt">{{pageTxt.popup[7]}}<a :href="exportCsvSrc" style="color:#5C759D">{{exportCsvName}}</a></span>
					<div class="_messaga_info">
						<span class="info_txt">{{pageTxt.popup[8]}}</span>
					</div>
				</div>
				<div slot="footer" class="_footBtn">
					<el-button type="default" @click="showExportExtInfo=false">{{pageTxt.popup[9]}}</el-button>
				</div>
			</el-dialog>
			
			<el-dialog class="dialog_pop" v-dialogDrag :title="pageTxt.popup[10]" :visible.sync="showExportBasicsInfo" width='600px'>
				<div class="_messaga">
					<span class="txt">{{pageTxt.popup[7]}}&nbsp;<a :href="BasicsSrc" style="color:#5C759D">{{BasicsName}}</a></span>
					<div class="_messaga_info">
						<span class="info_txt">{{pageTxt.popup[8]}}</span>
					</div>
				</div>
				<div slot="footer" class="_footBtn">
					<el-button type="default" @click="showExportBasicsInfo=false">{{pageTxt.popup[9]}}</el-button>
				</div>
			</el-dialog>
			
			<el-dialog width="70%" :visible.sync="importErr" :title="$t('fbcsFile.tips.title')" v-dialogDrag 
				:close-on-click-modal='false' :show-close="false">
				<div class="_dialog">
					<el-table :data="errList" max-height="294" highlight-current-row border stripe>
						<el-table-column prop="line" :label="$t('fbcsFile.userHome.line')"></el-table-column>
						<el-table-column prop="userID" :label="$t('fbcsFile.tableTitle.userID')">
							<span slot-scope="scope" class="redErr">{{scope.row.userID}}</span>
						</el-table-column>
						<el-table-column prop="errinfo" :label="$t('fbcsFile.userHome.errinfo')"></el-table-column>
					</el-table>
				</div>
				<div slot="footer" class="_footBtn">
					<button class="defBtn" @click="importErr=false">{{$t('fbcsFile.tips.close')}}</button>
				</div>
			</el-dialog>
			
			<el-dialog width="600px" :visible.sync="isBatchShow" :title="$t('fbcsFile.fnField.batchPwd')" v-dialogDrag
				:close-on-click-modal='false' :show-close="false">
				<div class="_dialog batchPwd">
					<div class="left">
						<p class="txt">{{$t('fbcsFile.userHome.setDate')}}</p>
					</div><div class="right">
						<el-radio-group v-model="batchType">
							<el-radio :label="0">{{$t('fbcsFile.userHome.defPwd')}}</el-radio>
							<el-radio :label="1">{{$t('fbcsFile.userHome.neverPwd')}}</el-radio>
						</el-radio-group>
					</div>
				</div>
				<div slot="footer" class="_footBtn">
					<button class="blueBtn" @click="batchPwd">{{$t('fbcsFile.tips.ok')}}</button>
					<button class="defBtn" @click="isBatchShow=false">{{$t('fbcsFile.tips.close')}}</button>
				</div>
			</el-dialog>
			<lgy-review :show.sync='showReview' :reqsv='reqsv' @submit='review' :txt='reviewTxt'></lgy-review>
		</div>
	</div>
</template>

<script>
	import Password from "./user/password.vue";
	import utils from "@/fbcsViews/libs/utils.js";
	import lang from "@/fbcsViews/language/lang.js";
	import globalVar from '@/fbcsViews/libs/globalVar.js';
	import fxUtils from '@/fbcsFxViews/libs/utils.js';

	var pageTxt = 'lang.user',_this;

	export default {
		data() {
			var data = {
				auth: globalVar.get('status').user,
				// paging: lang.publics.paging,
				max: 0,
				currPage: 1,
				pageTxt,
				userParam: {
					id: "",
					name: ""
				},
				userData: [{userID: "test01", userName: "ABC"}, {userID: "test02", userName: "456"}],
				currentPage: 1,
				pageSize: 20,
				csvFileName: "",
				showImportExtInfo: false,
				exportCsvSrc: "",
				exportCsvName: "",
				showExportExtInfo: false,
				BasicsSrc: "",
				BasicsName: "",
				showExportBasicsInfo: false,
				tableSelectRow: "",
				arr: [],
				pwdTime: '1',
				importErr: true,
				errList: [],
			};
			data.isBatchShow = false;
			data.batchType = 0;
			data.showReview = false;
			data.reviewTxt = this.$t('fbcsFile.userHome.reviewTxt');
			data.reqsv = {uri: 'mx/userpasswd/batchSetExpiredTime'};
			return data;
		},
		methods: {
			batchPwdShow(){
				this.batchType = 0;
				this.isBatchShow = true;
			},
			batchPwd(){
				this.showReview = true;
				this.isBatchShow = false;
			},
			review(args){
				let param = {
					url: 'userpasswd/batchSetExpiredTime',
					cmdID: '600018',
					reviewer: args.name,
					reviewerPassword: args.pwd,
					reviewType: 1,
					language: fxUtils.language,
					batchSetExpiredTimeType: this.batchType
				};
				fxUtils.loadShow();
				fxUtils.post(param).then(res => {
					fxUtils.loadClose();
					fxUtils.alert({txt: res.errinfo, type: res.errcode=='0'?1:0});
				});
			},
			fn(e) {
				this.arr = e;
			},
			toggleSelection(selection, row) {
				this.tableSelectRow = row.userID;

				if(selection.length >= 2) {
					this.$refs.multipleTable.clearSelection();
					this.$refs.multipleTable.toggleRowSelection(row);
				}
			},
			//查询用户
			userSearch() {
				this.renderDate(0, 1);
			},
			//创建用户
			createUser() {
				this.$store.state.headerText = this.pageTxt.tips[0];
				this.$store.state.creatAndEdit = false;
				this.$store.state.editBack = "/main/mxCfg/user";
				this.$router.replace({
					path: "/main/mxCfg/message/userAdd/mess"
				});
			},
			//删除立即下发
			// deleteSendDown(id) {
			//   utils.review({
			//           uri: 'mx/userinfo/deleteImmediately',
			//     yes: function(info) {
			//       utils.hints({
			//         txt: _this.pageTxt.tips[1],
			//         yes: function() {
			//           utils.post(
			//             "mx/userinfo/deleteImmediately",
			//             {
			//               cmdID: "600008",
			//               operator: "admin",
			//               reviewer: info.name,
							// reviewerPassword: info.pwd,
							// reviewType: 1,
			//               userID: id
			//             },
			//             function(response) {
			//               if(response == 0) {
			//                 utils.wheelReq(response);
			//                 _this.renderDate(1);
			//               }
			//             }
			//           );
			//         }
			//       });
			//     }
			//   });
			// },
			//导入扩展信息
			importExtInfo() {
				this.csvFileName = "";
				this.showImportExtInfo = true;
			},
			importExtInfoSubmit() {
				var csvFileName = _this.csvFileName.trim();
				if(!csvFileName) {
					// utils.weakTips(pageTxt.tips[5]);
					fxUtils.alert({txt: pageTxt.tips[5]});
					return;
				}
				utils.hints({
					txt: pageTxt.extended,
					yes: ins
				});
				this.showImportExtInfo = false;
				function ins(){
					utils.post("mx/userinfoExt/ImportCsv", {
						cmdID: "600016",
						csvFileName: csvFileName
					}, function (data) {
						if(data.errcode == '0'){
							fxUtils.alert({txt: data.errinfo, type:1});
						} else if(data.lists) {
							_this.errList = data.lists;
							_this.importErr = true;
							
							/* var str = '',
								arr = data.lists,
								len = arr.length > 3 ? 3 : arr.length;
							for(var i = 0; i < len; i++) {
								str += "<tr style='width:320px;display: block;'><td class='l1'>" + (arr[i].line || '') + "</td>";
								str += "<td class='l1'>" + (arr[i].userID || '') + "</td>";
								str += "<td class='l1'>" + (arr[i].errinfo || '') + "</td></tr>";
							}
							var html = "<table class='_whellError'><tr style='width:320px;display: block;' id='table_header'><td class='l1'>line</td>";
							html += "<td class='l1'>userID</td><td class='l1'>errinfo</td></tr>";
							html += str;
							if(arr.length > 3)
								html += "<tr style='width:320px;display: block;'><td class='l1'>...</td><td class='l1'>...</td><td class='l1'>...</td></tr></table>";
							else {
								html += '</table>';
							}
							utils.weakTips(html); */
						} else fxUtils.alert({txt: data.errinfo});
					});
				}
			},
			//导出扩展信息
			exportExtInfo() {
				utils.post("mx/userinfoExt/query", {
					cmdID: "600014",
					type: 1
				}, function(data) {
					if(data.errcode == 0) {
						_this.exportCsvSrc = data.errinfo;
						_this.exportCsvName = data.errinfo.split("/").pop();
						_this.showExportExtInfo = true;
					} else {
						// utils.weakTips(data.errinfo);
						fxUtils.alert({txt: data.errinfo});
					}
				});
			},
			//导出基本信息
			exportBasicsInfo() {
				utils.post("mx/userinfo/ExportCsv", {
					cmdID: "600014"
				}, function(data) {
					if(data.errcode == 0) {
						_this.BasicsSrc = data.errinfo;
						_this.BasicsName = data.errinfo.split("/").pop();
						_this.showExportBasicsInfo = true;
					} else {
						// utils.weakTips(data.errinfo);
						fxUtils.alert({txt: data.errinfo});
					}
				});
			},
			//修改用户(row)
			userEdit(row) {
				this.$store.state.tabv = "v1";
				this.$store.state.headerText = this.pageTxt.tips[2];
				this.$store.state.creatAndEdit = true;
				this.$store.state.editBack = "/main/mxCfg/user";
				setCache(row);
				this.$router.replace({
					path: "/main/mxCfg/message/userEdit/mess"
				});
			},
			userEkey(row) {
				this.$store.state.tabv = "v2";
				this.$store.state.headerText = this.pageTxt.tips[2];
				this.$store.state.creatAndEdit = true;
				this.$store.state.editBack = "/main/mxCfg/user";
				setCache(row);
				this.$router.replace({
					path: "/main/mxCfg/message/userEdit/mess"
				});
			},
			userComm(row) {
				this.$store.state.tabv = "v3";
				this.$store.state.headerText = this.pageTxt.tips[2];
				this.$store.state.creatAndEdit = true;
				this.$store.state.editBack = "/main/mxCfg/user";
				setCache(row);
				this.$router.replace({
					path: "/main/mxCfg/message/userEdit/mess"
				});
			},
			//删除用户
			showPromptBox() {
				if(this.arr.length > 0) {
					utils.hints({
						txt: pageTxt.tips[3],
						yes: _this.userDel,
						// now: function() {
						//   _this.deleteSendDown(_this.$store.state.transferEditID);
						// },
						btn: 2
					});
				} else {
					// utils.weakTips(pageTxt.tips[4]);
					fxUtils.alert({txt: pageTxt.tips[4]});
				}
			},
			userDel() {
				utils.post(
					"mx/userinfo/delete", {
						cmdID: "600005",
						operator: "admin",
						userID: _this.tableSelectRow
					},
					function(data) {
						if(data.errcode == 0) {
							_this.renderDate(0);
							fxUtils.alert({txt: data.errinfo, type: 1});
						} else {
							fxUtils.alert({txt: data.errinfo, type: 0});
							// utils.weakTips(data.errinfo);
						}
					}
				);
			},
			//修改密码(row)
			eidtPasswd() {
				if(this.arr.length > 0) {
					this.$store.state.transferEditID = this.arr[0].userID;
					this.$refs.pwd.$emit('pwdTime')
					this.$store.state.passShow = true;
				} else {
					// utils.weakTips(pageTxt.tips[4]);
					fxUtils.alert({txt: pageTxt.tips[4]});
				}
			},
			//分页
			handleSizeChange: function(size) {
				this.pageSize = size;
			},
			handleCurrentChange: function(currentPage) {
				this.currentPage = currentPage;
				this.renderDate(0);
			},
			currentRow: function(e) {
				if(!e) return;
				this.$store.state.transferEditID = e.userID;
			},
			//数据更新
			renderDate(type, page) {
				utils.post("mx/userinfo/queryLists", {
					cmdID: "600001",
					userID: _this.userParam.id,
					userName: _this.userParam.name,
					pageSize: _this.pageSize,
					currentPage: page || _this.currentPage,
					type: type
				}, function(response) {
					if(response.errcode == 0) {
						if(response.totalPage < _this.currentPage && response.totalPage >= 1) {
							_this.currentPage = response.totalPage;
							_this.renderDate(type);
						} else {
							_this.userData = response.lists;
							_this.currPage = response.currentPage;
							_this.max = response.totalSize;
						}
					} else {
						_this.userData = [];
						_this.max = 0;
					}
				});
			}
		},
		//初始化数据
		created() {
			_this = this;
			let l = lang();
			this.pageTxt = pageTxt = l.user;
			this.paging = l.publics.paging;
			this.auth = globalVar.get('status').user;
			this.userParam.id = this.userParam.name = '';
			_this.importErr = false;
			this.userData = [];
			initParam();
			this.renderDate(0);
		},
		components: {
			Password
		}
	};

	function initParam() {
		var cache = globalVar.get('cache_theme');
		var info = _this.userParam;
		var goBack = globalVar.get('goBack');
		if(cache && goBack) {
			info.id = cache.id;
			info.name = cache.name;
			_this.currentPage = cache.page;
		} else {
			info.id = info.name = '';
			_this.currentPage = 1;
		}
		globalVar.set('goBack', false);
	}

	function setCache(row) {
		var info = _this.userParam;
		_this.$store.state.transferEditID = row.userID;
		globalVar.set('cache_theme', {
			page: _this.currPage,
			id: info.id,
			name: info.name
		});
		fxUtils.setArgs('userInfo', row);
	}
</script>

<style scoped="scoped">
  .user * { vertical-align: middle; }
  .user { padding: 20px; white-space: nowrap; min-width: 1144px; }
  .user .userH { height: 30px; text-align: left;}
  .user .userH .el-input{ width: auto; }
  .userH .txt { font-size: 14px; line-height: 30px; height: 30px; color: #333; }
  .userH>span:nth-child(3) { margin-left: 35px; }
  .userH .el-button { margin-left: 35px; }
  .userH .el-input { margin-left: 10px; }
  .btnBox { font-size: 14px; color: #5c759d; margin-top: 20px; margin-bottom: 10px; text-align: left;}
  .btnBox div { margin-right: 35px; cursor: pointer; display: inline-block; }
  .btnBox>div>span { margin-left: 4px; line-height: 30px; height: 30px; }
  ._zero>div { display: inline-block; margin-right: 14px; cursor: pointer; }
  .Popup .box1 {padding: 40px 0 0 25px;}
  .Popup ._messaga1_info { margin-left: 125px; margin-top: 15px; line-height: 20px; }
  .Popup_return { margin-left: 40px; }
  .Popup .red { color: #ff6b6b; }
  
  .dialog_pop .el-dialog__body {padding: 0;}
  .dialog_pop ._messaga1_info { margin-left: 125px; margin-top: 15px; line-height: 20px; }
  .Popup_input { width: 360px; margin-left: 12px; }
  .dialog_pop .red { color: #ff6b6b; }
  .redErr{color: red;}
  #fbcs_MX .batchPwd{vertical-align: middle;padding-top: 46px;}
  .batchPwd .left{display: inline-block;width: 200px;text-align: right;}
  .batchPwd .txt{font-size: 14px;line-height: 30px;color: #666;}
  .batchPwd .right{display: inline-block;margin-left: 10px;}
  .batchPwd .el-radio{line-height: 30px;}
</style>
<style>
  ._whellError #table_header .l1 { font-size: 14px; font-weight: bold; }
  #fbcs_MX .user .el-table__header .el-checkbox { display: none; }
  #fbcs_MX .user .dialog_pop.box1 .el-dialog__body{padding: 40px 0 0 25px;}
</style>
