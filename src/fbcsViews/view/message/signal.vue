<template>
	<div>
		<!-- <div class='header'>
        <span class='header_txt'>{{pageTxt.label[0]}}</span>
    </div> -->
		<div class="signal">
			<div class="userH">
				<span class="txt">{{pageTxt.label[1]}}：</span>
				<el-select id="type" class="input_normal" v-model="searchInfo.bizType" placeholder="">
					<el-option v-for="item in options1" :label="item.name" :key="item.id" :value="item.id"></el-option>
				</el-select>
				<span class="txt1">{{pageTxt.label[2]}}：</span>
				<el-autocomplete id="signalClose" @input='autoInput1' @focus="focusDisplay" suffix-icon="el-icon-circle-close" class="input_normal"
					 v-model="searchInfo.userID1" :fetch-suggestions="fetch1" @select="idSelect1">
					<div slot-scope="{item}">
						<span class="name">{{item.userID}}</span>
						<span class="addr">({{item.userName}})</span>
					</div>
				</el-autocomplete>
				<span class="txt1">{{pageTxt.label[3]}}：</span>
				<el-autocomplete id="signalClose1" @input='autoInput2' @focus="focusDisplay1" suffix-icon="el-icon-circle-close" class="input_normal" 
					v-model="searchInfo.userID2" :fetch-suggestions="fetch2" @select="idSelect2">
					<div slot-scope="{item}">
						<span class="name">{{item.userID}}</span>
						<span class="addr">({{item.userName}})</span>
					</div>
				</el-autocomplete>
				<el-button type="primary" @click='search' class="btn">{{pageTxt.label[4]}}</el-button>
			</div>
			<div class="btnBox">
				<div id="create" v-if="auth>1" @click="showCreate"><img src="@/fbcsViews/img/user/creatsignal.png"><span>{{pageTxt.label[5]}}</span></div>
				<!-- <div @click="exportSignalInfo"><img src="@/fbcsViews/img/user/exportsignal.png"><span>{{pageTxt.label[6]}}</span></div> -->
				<div id="toAdvanced" @click="toAdvanced"><img src="@/fbcsFxViews/img/FnIcon/searchSignal.png"><span>{{pageTxt.adv}}</span></div>
			</div>
			<el-table id="tableID" stripe border :data="list.lists" tooltip-effect="dark" @current-change="currentRow" highlight-current-row>
				<!--<el-table-column width="50" label=" " type="index"></el-table-column>-->
				<el-table-column prop="typeStr" :label="pageTxt.table[0]" show-overflow-tooltip></el-table-column>
				<el-table-column prop="userID1" :label="pageTxt.table[1]" show-overflow-tooltip></el-table-column>
				<el-table-column prop="userName1" :label="pageTxt.table[2]" show-overflow-tooltip></el-table-column>
				<el-table-column prop="userID2" :label="pageTxt.table[3]" show-overflow-tooltip></el-table-column>
				<el-table-column prop="userName2" :label="pageTxt.table[4]" show-overflow-tooltip></el-table-column>
				<el-table-column prop="buildTime" :label="pageTxt.table[7]" show-overflow-tooltip></el-table-column>
				<el-table-column :label="pageTxt.table[5]" width="110" show-overflow-tooltip>
					<div v-if="auth>1" slot-scope="scope" class="_zero">
						<img @click="showPromptBox" src="@/fbcsViews/img/user/deleticos.png" :title="pageTxt.table[6]">
					</div>
				</el-table-column>
			</el-table>
			
			<div class="_pagination" v-if="max>pageSize">
				<el-pagination @current-change='handleCurrentChange' background layout="prev, pager, next, jumper" 
					:current-page.sync='currPage' @size-change="handleSizeChange" :page-size="pageSize" :total="max"></el-pagination>
				<div class="rightTxt">{{paging.before1}}{{max}}{{paging.after}}</div>
			</div>
			<div class="onePage" v-else-if="max>0&&max<=pageSize">{{paging.before2}}{{max}}{{paging.after}}</div>
			
			<el-dialog v-dialogDrag width='640px' :title="pageTxt.popup[0]" :visible.sync="dialogAdd">
				<ul class="_dialog">
					<li>
						<div class="leftBox">
							<p class="txt">{{pageTxt.popup[1]}}</p>
						</div>
						<div class="rightBox">
							<el-select id="add-type" class="input_normal" v-model="creatInfo.bizType" placeholder="">
								<el-option v-for="item in optionsCreat" :label="item.name" :key="item.id" :value="item.id"></el-option>
							</el-select>
						</div>
					</li>
					<li>
						<div class="leftBox">
							<p class="txt">
								<span class="red">*</span>
								{{pageTxt.popup[2]}}
							</p>
						</div>
						<div class="rightBox">
							<el-select popper-class="fbcs_MX_signal_select" id="statist_input" class="input_normal" v-model="creatInfo.user" clearable @clear=clear
								filterable remote :remote-method="remote1" @visible-change="visible" @change="changevalue" :placeholder="placeholder">
								<el-option v-for="item in oneidList" :key="item.userID" :label="item.userName" :value="item.userID"></el-option>
							</el-select>
							<span id="add-clear" class="cleartxt" @click="clear">{{pageTxt.popup[4]}}</span>
						</div>
					</li>
					<li>
						<div class="leftBox bug">
							<p class="txt">
								<span class="red">*</span>
								{{pageTxt.popup[3]}}
							</p>
						</div>
						<div class="rightBox">
							<el-select id="add-other" popper-class="fbcs_MX_signal_select" class="input_normal select_" :disabled="creatInfo.user?false:true" v-model="creatInfo.other"
								multiple filterable remote :remote-method="remote2" :reserve-keyword="false" @focus="focus" :placeholder="placeholder">
								<el-option v-for="item in multipleList" :key="item.userID" :label="item.userName" :value="item.userID"></el-option>
							</el-select>
						</div>
					</li>
				</ul>
				<div slot="footer" class="_footBtn">
					<el-button id="add-submit" type="primary" @click="submit">{{pageTxt.popup[5]}}</el-button>
					<el-button id="add-close" @click="dialogAdd = false">{{pageTxt.popup[6]}}</el-button>
				</div>
			</el-dialog>
		</div>
		<el-dialog class="dialog_pop" v-dialogDrag :title="pageTxt.popup[7]" :visible.sync="showExportSignalInfo" width='600px'>
			<div class="_messaga">
				<span class="txt">&nbsp;{{pageTxt.popup[8]}}<a id="csvName" :href="signalInfoSrc" style="color:#5C759D">{{signalInfoName}}</a></span>
				<div class="_messaga_info">
					<span class="info_txt">{{pageTxt.popup[9]}}</span>
				</div>
			</div>
			<div slot="footer" class="_footBtn">
				<el-button id="close" type="default" @click="showExportSignalInfo=false">{{pageTxt.popup[10]}}</el-button>
			</div>
		</el-dialog>
		
		<!-- <lgy-loopReqMX ref="loop"></lgy-loopReqMX> -->
	</div>
</template>

<script>
import utils from "@/fbcsViews/libs/utils.js";
import lang from "@/fbcsViews/language/lang.js";
import globalVar from '@/fbcsViews/libs/globalVar.js';
import fxUtils   from '@/fbcsFxViews/libs/utils.js';
import moment from 'moment';

	var pageTxt = 'lang.signal',
		autoTime1,
		isInput1 = false,
		autoTime2,
		isInput2 = false,
		_this,
		t, biz = {};

	export default {
		name: "mess_signal",
		data() {
			return {
				auth: globalVar.get('status').user,
				placeholder: this.$t('fbcsFile.tips.psel'),
				currPage: 1,
				max:0,
				nodata: '加载中...',
				searchInfo: {
					bizType: "",
					userID1: "",
					userID2: ""
				},
				options1: [],
				userID1: "",
				userID2: "",
				creatInfo: {
					bizType: "",
					user: "",
					other: []
				},
				oneidList: [],
				multipleList: [],
				optionsCreat: [],
				pageSize: 20,
				currentPage: 1,
				dialogAdd: false,
				row: "",
				pageTxt,
				list: [],
				showExportSignalInfo: false,
				signalInfoSrc: "",
				signalInfoName: ""
			};
		},
		methods: {
			//查询
			search() {
				this.renderData(_this.searchInfo.bizType, 1);
				this.currPage = 1;
			},
			toAdvanced(){
				this.$router.push({path: '/main/mxCfg/advanced/signal'});
			},
			//创建
			showCreate() {
				utils.post(
					"mx/dict/query", {
						cmdID: "600000",
						language: 0,
						type: 3
					},
					function(response) {
						if(response.errcode == 0) {
							_this.optionsCreat = response.lists;
							for(var i in _this.optionsCreat) {
								_this.optionsCreat[i].name = _this.optionsCreat[i].name + "(" + _this.optionsCreat[i].id + ")";
							}
						}
					}
				);
				getAllid(this.searchInfo.userID1, data => {
					_this.oneidList = data;
				});
				getAllid('', data => {
					_this.multipleList = data;
				}, true);
				this.dialogAdd = true;
				this.creatInfo.user = this.searchInfo.userID1;
				this.creatInfo.other = [];
				this.creatInfo.bizType = '0';
			},
			remote1(id){
				getAllid(id, data => {
					_this.oneidList = data;
				});
			},
			remote2(id){
				getAllid(id, data => {
					_this.multipleList = data;
				}, true);
			},
			focus(e){
				if(this.creatInfo.other.length == 0 || this.multipleList.length == 0){
					getAllid('', data => {
						_this.multipleList = data;
					}, true);
				}
			},
			submit() {
				if(this.creatInfo.user == '') return fxUtils.alert({txt: pageTxt.tips[5], type: 0});
				if(this.creatInfo.other.length == 0) return fxUtils.alert({txt: pageTxt.tips[6], type: 0});
				
				utils.post("mx/userComm/add", {
					cmdID: "600032",
					operator: "admin",
					bizType: _this.creatInfo.bizType,
					userID1: _this.creatInfo.user,
					lists: _this.creatInfo.other
				}, function(data) {
					if(data.errcode == '0'||data.errcode == '1') {
						_this.dialogAdd = false;
						_this.renderData(_this.searchInfo.bizType, 1);
					}
					let type = data.errcode == '0' ? 1 : 0;
					fxUtils.alert({txt: data.errinfo, type});
				});
			},
			//导出通信关系
			exportSignalInfo() {
				utils.post("mx/userComm/ExportCsv", {
					cmdID: "600034"
				}, function(response) {
					if(response.errcode == 0) {
						_this.signalInfoSrc = response.errinfo;
						_this.signalInfoName = response.errinfo.split("/").pop();
						_this.showExportSignalInfo = true;
					} else {
						// utils.weakTips(response.errinfo);
						fxUtils.alert({txt: response.errinfo});
					}
				});
			},
			//刪除通信关系(row)
			showPromptBox() {
				utils.hints({
					txt: _this.pageTxt.tips[0],
					yes: _this.delUser1,
					btn: 2
				});
			},
			delUser1() {
				utils.post("mx/userComm/delete", {
					cmdID: "600033",
					operator: "admin",
					bizType: _this.row.bizType,
					userID1: _this.row.userID1,
					userID2: _this.row.userID2
				}, function(response) {
					if(response.errcode == 0) {
						_this.renderData(_this.searchInfo.bizType);
						// utils.weakTips(response.errinfo);
						fxUtils.alert({txt: response.errinfo, type: 1});
					} else {
						// utils.weakTips(response.errinfo);
						fxUtils.alert({txt: response.errinfo, type: 0});
					}
				});
			},
			//清空用戶ID
			clear() {
				this.creatInfo.other = [];
			},
			currentRow: function(e) {
				this.row = e;
			},
			//分页
			handleSizeChange: function(size) {
				this.pageSize = size;
			},
			handleCurrentChange: function(currentPage) {
				this.currentPage = currentPage;
				this.renderData(_this.searchInfo.bizType);
			},
			//更新数据
			renderData(type, page) {
				var num = page||_this.currentPage;
				utils.post("mx/userComm/query", {
					cmdID: "600031",
					bizType: type,
					userID1: isInput1 ? _this.searchInfo.userID1 : _this.userID1,
					userID2: isInput2 ? _this.searchInfo.userID2 : _this.userID2,
					pageSize: _this.pageSize,
					currentPage: num
				}, function(response) {
					if(response.errcode == 0) {
						_this.currentPage = _this.currPage = num;
						if(response.totalPage < _this.currentPage && response.totalPage >= 1) {
							_this.currentPage = response.totalPage;
							_this.renderData(type);
						} else {
							for (var i = 0; i < response.lists.length; i++) {
								let obj = response.lists[i];
								obj.buildTime = moment(obj.commConfigDate * 1000).format('YYYY-MM-DD HH:mm:ss');
							}
							_this.list = typeStr(response);
							_this.max = response.totalSize;
						}
					} else {
						_this.list = [];
						_this.max = 0;
					}
				});
			},
			visible(v){
				var id = this.creatInfo.user;
				if(id==''&&v){
					getAllid(id, data => {
						_this.oneidList = data;
					});
				}
			},
			changevalue(id) {
				getAllid('', data => {
					_this.multipleList = data;
				}, true);
				this.clear();
			},
			fetch1(str, cb) {
				clearTimeout(autoTime1);
				autoTime1 = setTimeout(autoInput, 300, str, cb);
			},
			idSelect1(item) {
				isInput1 = false;
				this.userID1 = item.userID;
				// this.searchInfo.userID1 = item.userID + "(" + item.userName + ")";
				this.searchInfo.userID1 = item.userID;
				var close = document.getElementById("signalClose").children[0];
				if(!close) return;
				close.children[1].style.display = "block";
			},
			autoInput1(v) {
				isInput1 = true;
				var close = document.getElementById("signalClose").children[0];
				if(!close) return;
				close.children[1].style.display = v ? "block" :"none";
			},
			focusDisplay() {
				var el =  document.getElementById("signalClose").children[0];
				if(!el) return;
				el.children[1].children[0].onclick = (e) => {
					_this.searchInfo.userID1 = _this.userID1= "";
					document.getElementById("signalClose").children[0].children[1].style.display = "none";
					setTimeout(function(){
						document.getElementById("signalClose").children[0].children[0].focus();
					});
				};
			},
			fetch2(str, cb) {
				clearTimeout(autoTime2);
				autoTime2 = setTimeout(autoInput, 300, str, cb);
			},
			idSelect2(item) {
				isInput2 = false;
				this.userID2 = item.userID;
				// this.searchInfo.userID2 = item.userID + "(" + item.userName + ")";
				this.searchInfo.userID2 = item.userID;
				var close = document.getElementById("signalClose1").children[0];
				if(!close) return;
				close.children[1].style.display = "block";
			},
			autoInput2(v) {
				isInput2 = true;
				var close = document.getElementById("signalClose1").children[0];
				if(!close) return;
				close.children[1].style.display = v ? "block" :"none";
			},
			focusDisplay1() {
				var el =  document.getElementById("signalClose1").children[0];
				if(!el) return;
				el.children[1].children[0].onclick = (e) => {
					_this.searchInfo.userID2 = _this.userID2 = "";
					document.getElementById("signalClose1").children[0].children[1].style.display = "none";
					setTimeout(function(){
						document.getElementById("signalClose1").children[0].children[0].focus();
					});
				};
			},
		},
		//初始化数据
		created() {
			let l = lang();
			this.pageTxt = pageTxt = l.signal;
			this.paging = l.publics.paging;
			this.auth= globalVar.get('status').user;
			this.searchInfo.bizType = "-1";
			this.creatInfo.bizType = "0";
			_this = this;
			this.nodata = pageTxt.noData;
			utils.post("mx/dict/query", {
				cmdID: "600000",
				language: 0,
				type: 3
			}, function(response) {
				if(response.errcode == 0) {
					var list = response.lists;
					biz = {};
					for(var i in list) {
						list[i].name = list[i].name + "(" + list[i].id + ")";
						biz[list[i].id] = list[i].name;
					}
					list.unshift({
						id: "-1",
						name: _this.pageTxt.tips[1]
					});
					_this.options1 =  list;
					_this.renderData(-1);
				}
			});
		}
	};

	function getAllid(id, fn, multiple){
		utils.post("mx/userinfo/queryLists", {
			cmdID: "600001",
			userID: id||'',
			userName: id||'',
			pageSize: 100,
			currentPage: 1,
			type: 2
		}, function(data) {
			if(data.errcode == '0') {
				var list = data.lists, len = list.length, i, obj;
				for(i = 0; i < len; i++) {
					obj = list[i];
					if(multiple){
						if(obj.userID == _this.creatInfo.user){
							list.splice(i, 1);
							i--;
							len = list.length;
							continue;
						}
					}
					obj.userName = obj.userID + "(" + obj.userName + ")";
				}
				if(fn instanceof Function) fn(list);
			} else {
				if(fn instanceof Function) fn([]);
				console.warn('600001', data.errInfo);
			}
		});
	}

	function typeStr(data) {
		var arr = data.lists,
			obj;
		for(var i = 0; i < arr.length; i++) {
			obj = arr[i];
			obj.typeStr = biz[obj.bizType];
		}
		return data;
	}

	function autoInput(str, cb) {
//		if(!str) return;
		utils.getUserid(str, function(data) {
			var i,
				len = data.length,
				tem = [];
			for(i = 0; i < len; i++) {
				var label = data[i].label.toLocaleLowerCase();
				str = str.toLocaleLowerCase();
				if(label.indexOf(str) != -1) tem.push(data[i]);
			}
			cb(tem);
		});
	}
</script>

<style scoped="scoped">
	.signal * { vertical-align: middle; }
	.signal { min-width: 988px; margin: 20px; }
	.signal .userH { height: 30px; }
	#fbcs_MX .input_normal { width: 240px; margin-left: 10px; height: auto; }
	.txt { font-size: 14px; color: #666; }
	.btn { margin-left: 35px; margin-right: 20px; }
	.btnBox { margin-bottom: 10px; margin-top: 10px; font-size: 14px; color: #5c759d; }
	.btnBox div { display: inline-block; cursor: pointer; margin-right: 35px; }
	.btnBox span { margin-left: 4px; height: 30px; line-height: 30px; }
	._zero>img { cursor: pointer; }
	.txt1 { margin-left: 35px; font-size: 14px; color: #666; }
	._dialog .leftBox { height: 30px; }
	.bug { vertical-align: top; }
	.leftBox { height: 30px; }
	.txt1 { margin-left: 30px; font-size: 13px; color: #666; }
	#fbcs_MX .select_ { width: 360px; }
	.cleartxt { margin-left: 20px; font-size: 14px; color: #666; cursor: pointer; }
	.red{color: #F00;}
</style>

<style>
	/*下拉选择框*/
	#fbcs_MX .signal .el-select span{display: inline-block;}
	#fbcs_MX .signal .el-select .el-input__suffix-inner{display: inline;}
	#fbcs_MX .signal .el-select .el-select__tags-text{overflow: hidden;vertical-align: middle;text-overflow: ellipsis;}
	#fbcs_MX .signal .el-select__tags-text{max-width: 284px;}
	#fbcs_MX .signal .el-select .el-tag .el-tag__close{vertical-align: middle;}
	
	/* .fbcs_MX_signal_select .el-select-dropdown__item.selected{padding-right: 40px;} */
</style>
