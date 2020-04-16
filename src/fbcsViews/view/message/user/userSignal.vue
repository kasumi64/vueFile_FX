<template>
	<div class="signal">
		<div class="userH">
			<span class="txt">{{pageTxt.label[1]}}：</span>
			<el-select class="input_normal" v-model="searchInfo.bizType" @change='cbizType' :placeholder="placeholder">
				<el-option v-for="item in options1" :label="item.name" :key="item.id" :value="item.id"></el-option>
			</el-select>
			<span class="txt1">{{pageTxt.label[2]}}：</span>
			<el-autocomplete disabled @input='autoInput1' class="input_normal" v-model="$store.state.transferEditID" :trigger-on-focus="true" @select="idSelect1">
				<div slot-scope="{item}">
					<span class="name">{{item.userID}}</span>
					<span class="addr">({{item.userName}})</span>
				</div>
			</el-autocomplete>
			<span class="txt1">{{pageTxt.label[2]}}：</span>
			<el-autocomplete id="signalClose1" @input='autoInput2' @focus="focusDisplay1" suffix-icon="el-icon-circle-close" class="input_normal"
				v-model="idName2" :fetch-suggestions="fetch2" @select="idSelect2">
				<div slot-scope="{item}">
					<span class="name">{{item.userID}}</span>
					<span class="addr">({{item.userName}})</span>
				</div>
			</el-autocomplete>
			<el-button type="primary" @click='search' class="btn">{{pageTxt.label[4]}}</el-button>
		</div>

		<div class="btnBox">
			<div v-if="auth>1" @click="showCreate"><img src="@/fbcsViews/img/user/creatsignal.png"><span>{{pageTxt.label[5]}}</span></div>
		</div>
		<el-table stripe border :data="list.lists" tooltip-effect="dark" @current-change="currentRow" highlight-current-row>
			<!--<el-table-column width="50" label=" " type="index"></el-table-column>-->
			<el-table-column prop="typeStr" :label="pageTxt.table[0]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="userID1" :label="pageTxt.table[1]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="userName1" :label="pageTxt.table[2]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="userID2" :label="pageTxt.table[3]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="userName2" :label="pageTxt.table[4]" show-overflow-tooltip></el-table-column>
			<el-table-column :label="pageTxt.table[5]" width="90" show-overflow-tooltip>
				<div v-if="auth>1" slot-scope="scope" class="_zero">
					<!-- <el-tooltip :content="pageTxt.table[6]" placement="bottom" effect="light"> -->
						<img @click="showPromptBox" src="@/fbcsViews/img/user/deleticos.png" :title="pageTxt.table[6]">
					<!-- </el-tooltip> -->
				</div>
			</el-table-column>
		</el-table>
		
		<div class="_pagination" v-if="max>pageSize">
			<el-pagination @current-change='handleCurrentChange' background layout="prev, pager, next, jumper"
				:current-page.sync='currPage' @size-change="handleSizeChange" :page-size="pageSize" :total="max">
			</el-pagination>
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
						<el-select popper-class="fbcs_MX_signal_select" class="input_normal" v-model="creatInfo.bizType" :placeholder="placeholder">
							<el-option v-for="item in optionsCreat" :label="item.name" :key="item.id" :value="item.id">
							</el-option>
						</el-select>
					</div>
				</li>
				<li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.popup[2]}}</p>
					</div>
					<div class="rightBox">
						<el-input auto-complete="off" class="input_normal" v-model="$store.state.transferEditID" disabled></el-input>
						<span class="cleartxt" @click="clear">{{pageTxt.popup[4]}}</span>
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
						<el-select popper-class="fbcs_MX_signal_select" class="input_normal select_" v-model="creatInfo.other" 
							multiple filterable remote :remote-method="remote2" :reserve-keyword="false" @focus="focus" :placeholder="placeholder">
							<el-option v-for="item in multipleList" :key="item.userID" :label="item.userName" :value="item.userID"></el-option>
						</el-select>
					</div>
				</li>
			</ul>
			<div slot="footer" class="_footBtn">
				<el-button type="primary" @click="submit">{{pageTxt.popup[5]}}</el-button>
				<el-button @click="dialogAdd = false">{{pageTxt.popup[6]}}</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import utils	 from "@/fbcsViews/libs/utils.js";
import lang		 from "@/fbcsViews/language/lang.js";
import globalVar from '@/fbcsViews/libs/globalVar.js';
import fxUtils   from '@/fbcsFxViews/libs/utils.js';

	var pageTxt = 'lang.signal', autoTime1, isInput1 = false, autoTime2,
		isInput2 = false, options4, _this, t, biz = {};

	export default {
		name: "mess_signal",
		data() {
			return {
				auth: globalVar.get('status').user,
				placeholder: this.$t('fbcsFile.tips.psel'),
				currPage: 1,
				max:0,
				options: "",
				userID1: "",
				idName2: "",
				userID2: "",
				searchInfo: {
					bizType: "",
					userID1: "",
					userID2: ""
				},
				creatInfo: {
					bizType: "",
					user: "",
					other: []
				},
				options1: [],
				optionsCreat: [],
				multipleList: [],
				pageSize: 20,
				currentPage: "1",
				dialogAdd: false,
				state1: "",
				index: "",
				rows: "",
				row: "",
				pageTxt,
				list: []
			};
		},
		methods: {
			fetch1(str, cb) {
				clearTimeout(autoTime1);
				autoTime1 = setTimeout(autoInput, 300, str, cb);
			},
			idSelect1(item) {
				isInput1 = false;
				this.userID1 = item.userID;
				this.idName1 = item.userID + "(" + item.userName + ")";
			},
			autoInput1() {
				isInput1 = true;
			},

			fetch2(str, cb) {
				clearTimeout(autoTime2);
				autoTime2 = setTimeout(autoInput, 300, str, cb);
			},
			idSelect2(item) {
				isInput2 = false;
				this.userID2 = item.userID;
				this.idName2 = item.userID + "(" + item.userName + ")";
			},
			autoInput2(v) {
				isInput2 = true;
				var close = document.getElementById("signalClose1").children[0];
				if(!close) return;
				close.children[1].style.display = v ? "block" :"none";
			},
			focusDisplay1() {
				var el = document.getElementById("signalClose1").children[0];
				if(!el) return;
				el.children[1].children[0].addEventListener("click", () => {
					_this.idName2 = "";
					document.getElementById("signalClose1").children[0].children[1].style.display = "none";
					setTimeout(function(){
						document.getElementById("signalClose1").children[0].children[0].focus();
					});
				});
			},
			//查询
			search() {
				this.renderData(1);
				this.currPage = 1;
			},
			//创建
			showCreate() {
				this.creatInfo.bizType = "0";
				utils.post("mx/userinfo/queryLists", {
					cmdID: "600001",
					userID: "",
					userName: "",
					pageSize: 20000,
					currentPage: 1,
					type: 2
				}, function(response) {
					if(response.errcode == 0) {
						_this.options = response.lists;
						for(var i = 0; i < _this.options.length; i++) {
							_this.options[i].userName = _this.options[i].userID + "(" + _this.options[i].userName + ")";
						}
						for(var i = 0; i < _this.options.length; i++) {
							if(_this.options[i].userID == _this.$store.state.transferEditID) {
								_this.options.splice(i, 1);
								break;
							}
						}
						_this.creatInfo.other = [];
						_this.dialogAdd = true;
//						setTimeout(check, 0);
					}
				});
				
				function check(){
					document.getElementsByClassName("el-select__input is-big")[0].addEventListener("input", function(e) {
						clearTimeout(t);
						t = setTimeout(function() {
							utils.post("mx/userinfo/queryLists", {
								cmdID: "600001",
								userID: e.target.value,
								userName: e.target.value,
								pageSize: 200,
								currentPage: 1,
								type: 2
							}, function(response) {
								if(response.errcode == 0) {
									_this.options = response.lists;
									for(var i = 0; i < _this.options.length; i++) {
										_this.options[i].userName = _this.options[i].userID + "(" + _this.options[i].userName + ")";
									}
									for(var i = 0; i < _this.options.length; i++) {
										if(_this.options[i].userID == _this.$store.state.transferEditID) {
											_this.options.splice(i, 1);
											break;
										}
									}
								}
							});
						}, 300);
					});
				}
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
			cbizType(type){
				_this.currentPage = 1;
			},
			submit() {
				if(!this.creatInfo.other.length) {
					return fxUtils.alert({txt: pageTxt.tips[6]});
				}
				utils.post("mx/userComm/add", {
					cmdID: "600032",
					operator: "admin",
					bizType: _this.creatInfo.bizType,
					userID1: _this.$store.state.transferEditID,
					lists: _this.creatInfo.other
				}, function(data) {
					if(data.errcode == '0'||data.errcode == '1') {
						_this.dialogAdd = false;
						_this.renderData(1);
					}
					let type = data.errcode == '0' ? 1 : 0;
					fxUtils.alert({txt: data.errinfo, type});
				});
			},
			// 刪除通信关系(row)
			showPromptBox() {
				utils.hints({
					txt: _this.pageTxt.tips[0],
					yes: _this.delUser1,
					btn: 2
				});
			},
			delUser1() {
				utils.post(
					"mx/userComm/delete", {
						cmdID: "600033",
						operator: "admin",
						bizType: _this.row.bizType,
						userID1: _this.row.userID1,
						userID2: _this.row.userID2
					},
					function(data) {
						if(data.errcode == 0) {
							_this.renderData();
							fxUtils.alert({txt: data.errinfo, type: 1});
						} else {
							fxUtils.alert({txt: data.errinfo});
						}
					}
				);
			},
			clear() {
				this.creatInfo.other = [];
			},
			currentRow: function(e) {
				this.row = e;
			},
			// 分页
			handleSizeChange: function(size) {
				this.pageSize = size;
			},
			handleCurrentChange: function(currentPage) {
				this.currentPage = currentPage;
				_this.renderData();
			},
			// 更新数据
			renderData(page) {
				if(typeof(page)=="number") _this.currentPage = page;
				utils.post("mx/userComm/query", {
					cmdID: "600031",
					bizType: _this.searchInfo.bizType,
					userID1: _this.$store.state.transferEditID,
					userID2: isInput2 ? _this.idName2 : _this.userID2,
					pageSize: _this.pageSize,
					currentPage: _this.currentPage
				}, function(response) {
					if(response.errcode == 0) {
						if(response.totalPage < _this.currentPage && response.totalPage >= 1) {
							_this.currentPage = response.totalPage;
							_this.renderData();
						} else {
							_this.list = typeStr(response);
							_this.max = response.totalSize;
							_this.currPage = _this.currentPage;
						}
					} else {
						_this.max = 0;
						_this.list = [];
					}
				});
			}
		},
		//初始化数据
		created() {
			let l = lang();
			this.pageTxt = pageTxt = l.signal;
			this.paging = l.publics.paging;
			this.auth= globalVar.get('status').user;
			_this = this;
			this.searchInfo.bizType = "-1";
			this.creatInfo.bizType = "0";
			this.creatInfo.user = this.$store.state.transferEditID;
			
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
					_this.optionsCreat = list;
					_this.renderData(1);
				}
			});
			utils.post("mx/dict/query", {
					cmdID: "600000",
					language: 0,
					type: 3
			},function(data) {
				if(data.errcode == 0) {
					_this.options1 = data.lists;
					for(var i in _this.options1) {
						_this.options1[i].name = _this.options1[i].name + "(" + _this.options1[i].id + ")";
					}
					_this.options1.unshift({
						id: "-1",
						name: _this.pageTxt.tips[1]
					});
				} else {
					fxUtils.alert({txt: data.errinfo});
				}
			});
			/*utils.post("mx/userinfo/queryLists", {
				cmdID: "600001",
				userID: "",
				userName: "",
				pageSize: 200,
				currentPage: 1,
				type: 2
			}, function(response) {
				if(response.errcode == 0) {
					_this.options = response.lists;
					for(var i = 0; i < _this.options.length; i++) {
						_this.options[i].userName =
							_this.options[i].userID + "(" + _this.options[i].userName + ")";
					}
				}
				for(var i = 0; i < _this.options.length; i++) {
					if(_this.options[i].userID == _this.$store.state.transferEditID) {
						_this.options.splice(i, 1);
						break;
					}
				}
			});*/
			getAllid('', data => {
				_this.multipleList = data;
			}, true);
		}
	};

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
</script>
<style scoped="scoped">
	.signal{min-width: 1164px;}
	.signal * { vertical-align: middle; }
	.signal .userH { height: 30px; }
	#fbcs_MX .input_normal { margin-left: 10px;  width: 240px; height: auto; }
	.txt { font-size: 14px; color: #666666; }
	.btn { margin-left: 35px; }
	.btnBox { margin-bottom: 10px; margin-top: 10px; font-size: 14px; color: #5c759d; }
	.btnBox div { display: inline-block; cursor: pointer; margin-right: 35px; }
	.btnBox span { margin-left: 4px; height: 30px; line-height: 30px; }
	._zero>img { cursor: pointer; }
	.txt1 { margin-left: 35px; font-size: 14px; color: #666666; }
	._dialog .leftBox {width: 130px; height: 30px; }
	.bug { vertical-align: top; }
	.leftBox { height: 30px; }
	.txt1 { margin-left: 30px; font-size: 13px; color: #666666; }
	#fbcs_MX .select_ { width: 360px;	}
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
	
	/* #fbcs_MX .signal_select .el-select-dropdown__item.selected{padding-right: 40px;} */
</style>
