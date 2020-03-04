<template>
	<div>
		<!-- <div class='header'>
        <span class='header_txt'>{{pageTxt.label[0]}}</span>
    </div>	 -->
		<div class="Ekey">
			<div class="user">
				<span>{{pageTxt.label[1]}}：</span>
				<el-radio v-model="search.type" :label="0">{{pageTxt.label[2]}}</el-radio>
				<el-radio v-model="search.type" :label="1">{{pageTxt.label[3]}}</el-radio>
				<span v-show='search.type==0' id="box" class="txt">{{pageTxt.label[4]}}：{{CN}}</span>
				<!-- <el-input auto-complete="off" class='input_normal picker' v-show='search.type==0' v-model="search.ekeyName" ></el-input> -->
				<el-autocomplete id="ekeyClose" suffix-icon="el-icon-circle-close" v-show='search.type==0' @focus="focusDisplay"
				 class="input_normal picker" @input='ekeyInput' v-model="search.ekeyName" :fetch-suggestions="fetch1" @select="idSelect1">
					<div slot-scope="{item}">
						<span class="name">{{item.ekeyName}}</span>
						<!-- <span class="addr">({{item.ekeyName}})</span> -->
					</div>
				</el-autocomplete>
				<span v-show='search.type==1' class="txt" id="box">{{pageTxt.label[5]}}：</span>
				<el-autocomplete id="ekeyClose1" suffix-icon="el-icon-circle-close" v-show='search.type==1' @focus="focusDisplay1"
				 class="input_normal picker" @input='autoInput' v-model="idName" :fetch-suggestions="fetch" @select="idSelect">
					<div slot-scope="{item}">
						<span class="name">{{item.userID}}</span>
						<span class="addr">({{item.userName}})</span>
					</div>
				</el-autocomplete>
				<el-button type="primary" @click='searchfn'>{{pageTxt.label[6]}}</el-button>
			</div>
			<div class="btnBox">
				<div v-if="auth>1" @click="showAdd" id='Add'><img src="@/fbcsViews/img/user/addEkey.png"><span>{{pageTxt.label[7]}}</span></div>
				<div @click="exportEkeyInfo"><img src="@/fbcsViews/img/user/exportEkey.png"><span>{{pageTxt.label[8]}}</span></div>
			</div>
			<el-table stripe border :data="EkeyData.lists" tooltip-effect="dark" @current-change="currentRow"
			 highlight-current-row>
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
			<div class="_pagination" v-if="max>pageSize">
				<el-pagination @current-change='handleCurrentChange' background layout="prev, pager, next, jumper"
				 :current-page.sync='currPage' @size-change="handleSizeChange" :page-size="pageSize" :total="max"></el-pagination>
				<div class="rightTxt">{{paging.before1}}{{max}}{{paging.after}}</div>
			</div>
			<div class="onePage" v-else-if="max>0&&max<=pageSize">{{paging.before2}}{{max}}{{paging.after}}</div>

			<el-dialog v-dialogDrag :title="pageTxt.popup[0]" :visible.sync="addEkey" width='620px'>
				<ul class="_dialog">
					<li>
						<div class="leftBox">
							<p class="txt"><span class="red">*&nbsp;</span>{{pageTxt.popup[1]}}</p>
						</div>
						<div class="rightBox" id="rightBox1">
							<el-select popper-class="signal_select" id="Ekye_input" filterable v-model="ainfo.userID" :no-match-text='noData' :placeholder="placeholder">
								<el-option v-for="item in options" :key="item.userID" :label="item.userName" :value="item.userID"></el-option>
							</el-select>
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
							<el-date-picker class='picker' v-model="ainfo.ekeyValidDate" value-format="timestamp" type="datetime"
								placeholder="" default-time="23:59:59"></el-date-picker>
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
					<el-button type="primary" @click="sendDown">{{pageTxt.popup[5]}}</el-button>
					<el-button type="primary" @click="submitAdd">{{pageTxt.popup[6]}}</el-button>
					<el-button @click="addEkey = false">{{pageTxt.popup[7]}}</el-button>
				</div>
			</el-dialog>

			<el-dialog v-dialogDrag :title="pageTxt.popup[8]" :visible.sync="editEkdy" width='620px'>
				<ul class="_dialog">
					<li>
						<div class="leftBox">
							<p class="txt"><span class="red">*&nbsp;</span>{{pageTxt.popup[1]}}</p>
						</div>
						<div class="rightBox">
							<el-input auto-complete="off" class='picker' v-model="binfo.userID" placeholder="" disabled></el-input>
						</div>
					</li>
					<li>
						<div class="leftBox">
							<p class="txt"><span class="red">*&nbsp;</span>{{pageTxt.popup[2]}}</p>
						</div>
						<div class="rightBox">
							<span :class="{txt1:1,hide: !isOpenEkeyPrefixByWeb}">/C=CN/CN=</span>
							<el-input disabled auto-complete="off" :class="{prefix156:!!isOpenEkeyPrefixByWeb,prefix250:!isOpenEkeyPrefixByWeb}"
								v-model="binfo.ekeyName" :maxlength="isOpenEkeyPrefixByWeb!= 0?55:64"></el-input>
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
							<el-date-picker class='picker' v-model="binfo.ekeyValidDate" value-format="timestamp" type="datetime"
								placeholder="" default-time="23:59:59"></el-date-picker>
						</div>
					</li>
					<li>
						<div class="leftBox">
							<p class="txt">{{pageTxt.popup[4]}}</p>
						</div>
						<div class="rightBox">
							<el-input auto-complete="off" class='picker' v-model="binfo.comment" maxlength="64"></el-input>
						</div>
					</li>
				</ul>
				<div slot="footer" class="_footBtn">
					<el-button type="primary" @click="lijixiafa">{{pageTxt.popup[5]}}</el-button>
					<el-button type="primary" @click="submitEdit">{{pageTxt.popup[13]}}</el-button>
					<el-button @click="editEkdy = false">{{pageTxt.popup[7]}}</el-button>
				</div>
			</el-dialog>
			<el-dialog class="dialog_pop" v-dialogDrag :title="pageTxt.popup[9]" :visible.sync="showExportEkeyInfo" width='600px'>
				<div class="_messaga">
					<span class="txt">{{pageTxt.popup[10]}}&nbsp;<a :href="EkeyInfoSrc" style="color:#5C759D">{{EkeyInfoName}}</a></span>
					<div class="_messaga_info">
						<span class="info_txt">{{pageTxt.popup[11]}}</span>
					</div>
				</div>
				<div slot="footer" class="_footBtn">
					<el-button type="default" @click="showExportEkeyInfo=false">{{pageTxt.popup[12]}}</el-button>
				</div>
			</el-dialog>
			
			<lgy-loopReqMX ref="loop"></lgy-loopReqMX>
		</div>

	</div>
</template>

<script>
	import globalVar from '@/fbcsViews/libs/globalVar.js';
	import utils from "@/fbcsViews/libs/utils.js";
	import lang from "@/fbcsViews/language/lang.js";
	import md5 from '@/fbcsViews/libs/md5.js';
	import fxUtils from '@/fbcsFxViews/libs/utils.js';

	var pageTxt = 'lang.Ekey',
		autoTime, isInput = false,
		_this, t, isEkeyInput = false;
	

	export default {
		data() {
			var ainfo = {}, binfo = {},
				def = ["operator", "userID", "ekeyName", "ekeyPasswd", "type", "ekeyValidDate", "comment"];
			for (var i = 0; i < def.length; i++) {
				ainfo[def[i]] = "";
				binfo[def[i]] = "";
			}
			
			return {
				auth: globalVar.get('status').user,
				placeholder: this.$t('fbcsFile.tips.psel'),
				idName: "",
				userID: "",
				search: {
					userID: "",
					type: "",
					ekeyName: ""
				},
				ainfo,
				binfo,
				EkeyData: {
					// lists:[{}]
				},
				oldEkeyName: "",
				EkeyInfoSrc: "",
				EkeyInfoName: "",
				pageTxt: pageTxt,
				row: {},
				currentPage1: 1,
				pageSize: 20,
				options: [],
				addEkey: false,
				editEkdy: false,
				showExportEkeyInfo: false,
				isModifyEkeyPasswd: false,
				currPage: 1,
				max: 0,
				noData: '无数据',
				CN: '/C=CN/CN=',
				isOpenEkeyPrefixByWeb: 1,
			};
		},
		methods: {
			focusDisplay() {
				var el = document.getElementById("ekeyClose").children[0];
				if(!el) return;
				el.children[1].children[0].onclick = function() {
					_this.search.ekeyName = "";
					document.getElementById("ekeyClose").children[0].children[1].style.display = "none";
					setTimeout(function() {
						document.getElementById("ekeyClose").children[0].children[0].focus();
					});
				};
			},
			fetch1(str, cb) {
				clearTimeout(autoTime);
				autoTime = setTimeout(ekeyInput, 300, str, cb);
			},
			ekeyInput(v) {
				isEkeyInput = true;
				var close = document.getElementById("ekeyClose").children[0];
				if(!close) return;
				close.children[1].style.display = v ? "block" :"none";
			},

			idSelect1(item) {
				isEkeyInput = false;
				this.search.ekeyName = item.ekeyName;
				var close = document.getElementById("ekeyClose").children[0];
				if(!close) return;
				close.children[1].style.display = "block";
			},

			fetch(str, cb) {
				clearTimeout(autoTime);
				autoTime = setTimeout(autoInput, 300, str, cb);
			},
			idSelect(item) {
				isInput = false;
				this.userID = item.userID;
				// this.idName = item.userID + "(" + item.userName + ")";
				this.idName = item.userID;
				var close = document.getElementById("ekeyClose1").children[0];
				if(!close) return;
				close.children[1].style.display = "block";
			},
			autoInput(v) {
				isInput = true;
				var close = document.getElementById("ekeyClose1").children[0];
				if(!close) return;
				close.children[1].style.display = v ? "block" :"none";
			},
			focusDisplay1() {
				var el = document.getElementById("ekeyClose1").children[0];
				if(!el) return;
				el.children[1].children[0].onclick = function() {
					isInput = true;
					_this.idName = "";
					document.getElementById("ekeyClose1").children[0].children[1].style.display = "none";
					setTimeout(function() {
						document.getElementById("ekeyClose1").children[0].children[0].focus();
					});
				};
			},
			//查询Ekey
			searchfn() {
				this.renderDate(_this.search.type, 1);
				this.currPage = 1;
			},
			//创建Ekey
			showAdd() {
				utils.post(
					"mx/userinfo/queryLists", {
						cmdID: "600001",
						userID: "",
						userName: "",
						pageSize: 100,
						currentPage: 1,
						type: 2
					},
					function(response) {
						if (response.errcode == 0) {
							_this.options = response.lists;
							for (var i = 0; i < _this.options.length; i++) {
								_this.options[i].userName = _this.options[i].userID + "(" + _this.options[i].userName + ")";
							}
						}
					}
				);
				this.addEkey = true;
				this.ainfo.userID = "";
				this.ainfo.ekeyName = "";
				this.ainfo.ekeyPasswd = '';
				this.ainfo.ekeyValidDate = "";
				this.ainfo.comment = "";
				
				setTimeout(function() {
					document.getElementById("Ekye_input").oninput = function(e) {
						clearTimeout(t);
						t = setTimeout(function() {
							utils.post("mx/userinfo/queryLists", {
								cmdID: "600001",
								userID: e.target.value,
								userName: e.target.value,
								pageSize: 100,
								currentPage: 1,
								type: 2
							},
							function(response) {
								if (response.errcode == 0) {
									_this.options = response.lists;
									for (var i = 0; i < _this.options.length; i++) {
										_this.options[i].userName = _this.options[i].userID + "(" + _this.options[i].userName + ")";
									}
								}
							});
						}, 300);
					};
				}, 100);
			},
			//立即下发
			sendDown() {
				if (check(this.ainfo) !== true) return;
				this.addEkey = false;

				utils.review({
					uri: 'mx/userEkey/addImmediately',
					yes: function(info) {
						utils.hints({
							txt: _this.pageTxt.tips[7],
							yes: function() {
								utils.post("mx/userEkey/addImmediately", {
									cmdID: "600025",
									operator: "admin",
									reviewer: info.name,
									reviewerPassword: info.pwd,
									reviewType: 1,
									userID: _this.ainfo.userID,
									ekeyName: _this.CN + _this.ainfo.ekeyName,
									ekeyPasswd: _this.ainfo.ekeyPasswd ? md5.hex_md5(_this.ainfo.ekeyPasswd) : '',
									ekeyValidDate: _this.ainfo.ekeyValidDate / 1000 || 0,
									comment: _this.ainfo.comment,
									isOpenEkeyPrefixByWeb: _this.isOpenEkeyPrefixByWeb
								}, function(response) {
									if (response.errcode == 0) {
										_this.addEkey = false;
										// utils.wheelReq(response);
										_this.$refs.loop.start(response);
										_this.renderDate(_this.search.type);
									} else {
										// utils.weakTips(response.errinfo);
										fxUtils.alert({
											txt: response.errinfo,
											type: 0
										});
									}
								});
							}
						});
					}
				});
			},
			submitAdd() {
				if (check(this.ainfo) !== true) return;

				utils.post("mx/userEkey/add", {
					cmdID: "600022",
					operator: "admin",
					userID: _this.ainfo.userID,
					ekeyName: _this.CN + _this.ainfo.ekeyName,
					ekeyPasswd: _this.ainfo.ekeyPasswd ? md5.hex_md5(_this.ainfo.ekeyPasswd) : '',
					ekeyValidDate: _this.ainfo.ekeyValidDate / 1000 || 0,
					comment: _this.ainfo.comment,
					isOpenEkeyPrefixByWeb: _this.isOpenEkeyPrefixByWeb
				}, function(response) {
					if (response.errcode == 0) {
						_this.addEkey = false;
						_this.renderDate(_this.search.type);
						// utils.weakTips(response.errinfo);
						fxUtils.alert({
							txt: response.errinfo,
							type: 1
						});
					} else {
						fxUtils.alert({
							txt: response.errinfo,
							type: 0
						});
					}
				});
			},
			// modifydel(id, name) {
			//   utils.review({
			//					uri:'mx/userEkey/deleteImmediately',
			//     yes: function(info) {
			//       utils.hints({
			//         txt: _this.pageTxt.tips[7],
			//         yes: function() {
			//           utils.post(
			//             "mx/userEkey/deleteImmediately",
			//             {
			//               cmdID: "600027",
			//               operator: "admin",
			//               reviewer: info.name,
			// 				reviewerPassword: info.pwd,
			// 				reviewType: 1,
			//               userID: id,
			//               ekeyName: name
			//             },
			//             function(response) {
			//               if (response.errcode == 0) {
			//                 _this.$refs.loop.start(response);
			//                 _this.renderDate(_this.search.type);
			//               }
			//             }
			//           );
			//         }
			//       });
			//     }
			//   });
			// },
			//修改
			showEdit(row) {
				this.editEkdy = true;
				this.oldEkeyName = row.ekeyName;
				this.binfo.userID = row.userID;
				this.binfo.userName = row.userName;
				this.binfo.ekeyName = row.ekeyName.replace(_this.CN, '');
				this.isModifyEkeyPasswd = false;
				this.binfo.ekeyPasswd = '';
				if(row.ekeyValidDate){
					this.binfo.ekeyValidDate = row.ekeyValidDate * 1000;
				} else {
					this.binfo.ekeyValidDate = null;
				}
				this.binfo.comment = row.comment;
			},
			lijixiafa() {
				if (check(this.binfo, true) !== true) return;

				this.editEkdy = false;
				utils.review({
					uri: 'mx/userEkey/modifyImmediately',
					yes: function(info) {
						utils.hints({
							txt: _this.pageTxt.tips[7],
							yes: function() {
								var flag = _this.isModifyEkeyPasswd;
								utils.post("mx/userEkey/modifyImmediately", {
									cmdID: "600026",
									operator: "admin",
									reviewer: info.name,
									reviewerPassword: info.pwd,
									reviewType: 1,
									// oldEkeyName: _this.oldEkeyName,
									oldEkeyName: _this.CN + _this.binfo.ekeyName,
									userID: _this.binfo.userID,
									ekeyName: _this.CN + _this.binfo.ekeyName,
									isModifyEkeyPasswd: flag ? 1 : 0,
									ekeyPasswd: _this.binfo.ekeyPasswd ? md5.hex_md5(_this.binfo.ekeyPasswd) : '',
									ekeyValidDate: _this.binfo.ekeyValidDate / 1000 || 0,
									comment: _this.binfo.comment,
									isOpenEkeyPrefixByWeb: _this.isOpenEkeyPrefixByWeb
								}, function(data) {
									if (data.errcode == 0) {
										// utils.wheelReq(data);
										_this.$refs.loop.start(data);
										_this.renderDate(_this.search.type);
									} else {
										// utils.weakTips(data.errinfo);
										fxUtils.alert({
											txt: data.errinfo,
											type: 0
										});
									}
								});
							}
						});
					}
				});
			},
			submitEdit() {
				if (check(this.binfo, true) !== true) return;

				var flag = _this.isModifyEkeyPasswd;
				utils.post("mx/userEkey/modify", {
					cmdID: "600023",
					operator: "admin",
					userID: _this.binfo.userID,
					oldEkeyName: _this.oldEkeyName,
					oldEkeyName: _this.CN + _this.binfo.ekeyName,
					ekeyName: _this.CN + _this.binfo.ekeyName,
					isModifyEkeyPasswd: flag ? 1 : 0,
					ekeyPasswd: _this.binfo.ekeyPasswd ? md5.hex_md5(_this.binfo.ekeyPasswd) : '',
					ekeyValidDate: _this.binfo.ekeyValidDate / 1000 || 0,
					comment: _this.binfo.comment,
					isOpenEkeyPrefixByWeb: _this.isOpenEkeyPrefixByWeb
				}, function(response) {
					if (response.errcode == 0) {
						_this.editEkdy = false;
						_this.renderDate(_this.search.type);
						// utils.weakTips(response.errinfo);
						fxUtils.alert({
							txt: response.errinfo,
							type: 1
						});
					} else {
						// utils.weakTips(response.errinfo);
						fxUtils.alert({
							txt: response.errinfo,
							type: 0
						});
					}
				});
			},
			//导出Ekey
			exportEkeyInfo() {
				utils.post(
					"mx/userEkey/ExportCsv", {
						cmdID: "600028"
					},
					function(response) {
						if (response.errcode == 0) {
							_this.EkeyInfoSrc = response.errinfo;
							_this.EkeyInfoName = response.errinfo.split("/").pop();
							_this.showExportEkeyInfo = true;
						} else {
							// utils.weakTips(response.errinfo);
							fxUtils.alert({
								txt: response.errinfo,
								type: 0
							});
						}
					}
				);
			},
			//删除(row)
			showDel() {
				utils.hints({
					txt: _this.pageTxt.tips[6],
					yes: _this.ekeyDel,
					// now: function() {
					//   _this.modifydel(_this.row.userID, _this.row.ekeyName);
					// },
					btn: 2
				});
			},
			ekeyDel() {
				utils.post(
					"mx/userEkey/delete", {
						cmdID: "600024",
						operator: "admin",
						userID: _this.row.userID,
						ekeyName: _this.row.ekeyName
					},
					function(response) {
						if (response.errcode == 0) {
							_this.renderDate(_this.search.type);
							// utils.weakTips(response.errinfo);
							fxUtils.alert({
								txt: response.errinfo,
								type: 1
							});
						} else {
							// utils.weakTips(response.errinfo);
							fxUtils.alert({
								txt: response.errinfo,
								type: 0
							});
						}
					}
				);
			},
			currentRow: function(e) {
				this.row = e;
			},
			//分页
			handleSizeChange: function(size) {
				this.pageSize = size;
			},
			handleCurrentChange: function(currentPage) {
				this.currentPage1 = currentPage;
				this.renderDate(_this.search.type);
			},
			//更新数据
			renderDate(type, page) {
				var id = isInput ? _this.idName : _this.userID;
				if (id == '' && type == 1) type = 2;
				utils.post(
					"mx/userEkey/query", {
						cmdID: "600021",
						userID: id,
						ekeyName: _this.CN + _this.search.ekeyName,
						type: type,
						pageSize: _this.pageSize,
						currentPage: page || _this.currentPage1
					},
					function(response) {
						if (response.errcode == 0) {
							if (response.totalPage < _this.currentPage1 && response.totalPage >= 1) {
								_this.currentPage1 = response.totalPage;
								_this.renderDate(type);
							} else {
								_this.EkeyData = response;
								for (var i in _this.EkeyData.lists) {
									if (!_this.EkeyData.lists[i].ekeyValidDate) {
										_this.EkeyData.lists[i].ekeyValidDate = 0;
										_this.EkeyData.lists[i].validDateStr = '';
									} else {
										_this.EkeyData.lists[i].validDateStr = timestampToTime(_this.EkeyData.lists[i].ekeyValidDate);
									}
								}
								_this.max = response.totalSize;
							}
						} else {
							_this.EkeyData.lists = [];
							_this.max = 0;
						}
					}
				);
			}
		},
		//初始化数据
		created() {
			_this = this;
			let l = lang();
			this.pageTxt = pageTxt = l.Ekey;
			this.paging = l.publics.paging;
			check = check.bind(this);
			this.auth = globalVar.get('status').user;
			this.search.type = 0;
			this.ainfo.type = 0;
			this.search.ekeyName = "";
			this.noData = pageTxt.noData;
			prefix();
		},
		mounted() {
			let el = document.getElementById("ekeyClose").children[0]
			if(!el) return;
			el = el.children[1];
			el.style.display = "none";
			el = document.getElementById("ekeyClose1").children[0].children[1];
			el.style.display = "none";
		}
	};

	function autoInput(str, cb) {
		//		if(!str) return;
		utils.getUserid(str, function(data) {
			var i,
				len = data.length,
				tem = [];
			for (i = 0; i < len; i++) {
				var label = data[i].label.toLocaleLowerCase();
				str = str.toLocaleLowerCase();
				if (label.indexOf(str) != -1) tem.push(data[i]);
			}
			cb(tem);
		});
	}

	function ekeyInput(str, cb) {
		// if(!str) return;
		utils.post("mx/userEkey/queryEkeyName", {
			cmdID: "600020",
			userID: "",
			ekeyName: _this.CN + _this.search.ekeyName,
			type: "0",
			pageSize: 100,
			currentPage: 1
		}, function(response) {
			var i, len = response.lists.length,
				tem = [];
			var reg = new RegExp(_this.CN, 'i'),
				obj, name, label;
			str = str.toLocaleLowerCase();
			for (i = 0; i < len; i++) {
				obj = response.lists[i];
				obj.key = i;
				name = obj.ekeyName.replace(reg, '');
				obj.label = obj.ekeyName = name;
				label = name.toLocaleLowerCase();
				if (label.indexOf(str) != -1) tem.push(response.lists[i]);
			}
			cb(tem);
		});
	}

	function check(info, isModify) {
		let tips = this.pageTxt.tips, isPrefix = !!_this.isOpenEkeyPrefixByWeb;
		let regName = isPrefix ? /[^\w]/ : /[^\w\/=]|\/$|\=$/g;
		
		if (info.userID == "") {
			return fxUtils.alert({txt: tips[0]});
		} else if (info.ekeyName == "") {
			return fxUtils.alert({txt: tips[1]});
		}
		// else if (info.ekeyValidDate == "") return utils.weakTips(tips[2]);
		// else if (info.comment == "") return utils.weakTips(tips[3]);
		else if (/\%/.test(info.comment)) {
			return fxUtils.alert({txt: this.pageTxt.commentErr});
		} else if (regName.test(info.ekeyName)) {
			if(isModify !== true){
				let txt = isPrefix ? this.pageTxt.eNameErr : this.pageTxt.eNameErr2;
				return fxUtils.alert({txt});
			}
		}
		return true;
	}

	function timestampToTime(t) {
		var date = new Date(t * 1000),
			Y = date.getFullYear() + '-',
			M = dbNum(date.getMonth() + 1) + '-',
			D = dbNum(date.getDate()) + ' ',
			h = dbNum(date.getHours()) + ':',
			m = dbNum(date.getMinutes()) + ':',
			s = dbNum(date.getSeconds());
		return Y + M + D + h + m + s;
	}

	function dbNum(num) {
		return num < 10 ? '0' + num : num;
	}
	
	function prefix(){
		var param = {
			url: 'mx/userEkey/isOpenEkeyPrefix',
			cmdID: "600029"
		};
		// _this.CN = '';
		// _this.isOpenEkeyPrefixByWeb = 0;
		utils.post(param, function(data) {
			if (data.errcode != '0') return fxUtils.alert({txt: data.errinfo});
			_this.CN = data.isOpenEkeyPrefix != 0 ? '/C=CN/CN=' : '';
			_this.isOpenEkeyPrefixByWeb = data.isOpenEkeyPrefix;
			_this.renderDate(0);
		});
	}
</script>

<style scoped="scoped">
	.Ekey * {
		vertical-align: middle;
	}

	.Ekey {
		padding: 20px;
	}

	.user {
		height: 30px;
		font-size: 14px;
		color: #666666;
		text-align: left;
	}

	.user .el-button {
		margin-left: 35px;
	}

	.txt {
		margin-left: 35px;
		font-size: 14px;
		color: #666666;
	}

	.txt1 {
		margin-left: 10px;
		font-size: 14px;
		color: #666666;
	}

	.txt2 {
		margin-left: 10px;
		font-size: 14px;
		color: #F00;
	}

	.btnBox {
		margin-bottom: 10px;
		margin-top: 10px;
		text-align: left;
	}

	.btnBox div {
		font-size: 14px;
		color: #5c759d;
		cursor: pointer;
		margin-right: 35px;
		display: inline-block;
	}

	.btnBox span {
		margin-left: 4px;
		height: 30px;
		line-height: 30px;
	}

	.Ekey .eRadio {
		margin-right: 30px;
	}

	.Ekey .el-radio__label {
		font-size: 16px;
	}

	.picker {
		width: 250px;
	}

	._zero div {
		float: left;
		margin-right: 14px;
		cursor: pointer;
	}

	._zero {
		overflow: hidden;
	}

	.el-input {
		margin-left: 10px;
	}

	.promptBox_content_txt {
		font-size: 14px;
		color: #666;
		text-align: center;
		display: block;
		margin-top: 60px;
	}

	.promptBox_btn {
		text-align: center;
		margin-top: 60px;
		margin-bottom: 50px;
	}

	.promptBox_btn button:nth-child(1) {
		margin-left: 0;
	}

	#rightBox1 {
		margin-left: 10px;
		width: 210px;
	}

	.red {
		color: #f56c6c;
		font-size: 14px;
	}

	.flag {
		margin-left: 10px;
	}

	.el-select {
		width: 250px;
	}
	.prefix250{width: 250px;}
	.prefix156 {width: 156px;}
	.hide{display: none;}
</style>
<style>
	/*	.user .el-input__suffix {
		display: none;
	}*/
	#fbcs_MX .signal_select {
		max-width: 362px;
	}

	#fbcs_MX .signal_select .el-select-dropdown__item.selected {
		padding-right: 40px;
	}

	#fbcs_MX .Ekey .picker.el-date-editor.el-input {
		width: 250px;
	}
</style>
