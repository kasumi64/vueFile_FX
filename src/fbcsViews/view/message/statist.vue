<template>
	<div class="statist">
		<input class="opacity0" />
		<!-- <div class='header'>
      <span class='header_txt'>{{pageTxt.label[0]}}</span>
    </div>     -->
		<div>
			<header>
				<div class="statist_herader">
					<span>{{pageTxt.label[1]}}</span>
					<el-input auto-complete="off" class='input_normal' v-model="modeType.user"></el-input>
					<span class="txt ml">{{pageTxt.label[2]}}</span>
					<!--<el-input class='input_normal' v-model="modeType.userType"></el-input>-->
					<el-select class='select' v-model="modeType.userType" filterable clearable>
						<el-option v-for="obj in oprType" :key="obj.i" :label="obj.label" :value="obj.val">
						</el-option>
					</el-select>
					<span class="txt ml">{{pageTxt.label[3]}}</span>
					<el-radio v-model="statisticalMethod" label="0">{{pageTxt.label[4]}}</el-radio>
					<el-radio v-model="statisticalMethod" label="1">{{pageTxt.label[5]}}</el-radio>
				</div>
				<div class="lined">
					<span class="txt m0">{{pageTxt.label[6]}}</span>
					<el-radio-group v-model="radio">
					    <el-radio :label="0">{{pageTxt.label[7]}}</el-radio>
					    <el-radio :label="1">{{pageTxt.label[8]}}</el-radio>
					    <el-radio :label="2">{{pageTxt.label[9]}}</el-radio>
					    <el-radio :label="3">{{pageTxt.label[12]}}</el-radio>
					</el-radio-group>
					<!--<el-date-picker class="date_picker" :disabled="radio!=3" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" 
						v-model="search" type="datetimerange" :range-separator="pageTxt.label[11]" :start-placeholder="pageTxt.label[12]" :end-placeholder="pageTxt.label[13]">
					</el-date-picker>-->
					<el-date-picker :disabled="radio!=3" :picker-options='pickerBegin' v-model="beginDate" type="datetime" :clearable="false" :editable='false'
						class='picker' value-format="timestamp" format="yyyy-MM-dd HH:mm:ss" default-time="0:00:00">
					</el-date-picker>
					<label class="txt pickerTxt">{{pageTxt.label[13]}}</label>
					<el-date-picker :disabled="radio!=3" :picker-options='pickerEnd' v-model="endDate" type="datetime"  :clearable="false" :editable='false'
						class='picker' value-format="timestamp" format="yyyy-MM-dd HH:mm:ss" default-time="23:59:59">
					</el-date-picker>
					
					<el-button @click="searchFn" type="primary" class="searchBtn">{{pageTxt.label[14]}}</el-button>
					<el-button @click="exportFn" type="primary" class="exportFn">{{pageTxt.label[15]}}</el-button>
				</div>
			</header>
			<el-table stripe border highlight-current-row :data="data.lists">
				<!--<el-table-column width="50" label=" " type="index"></el-table-column>-->
				<el-table-column prop="operationTime" width="170" :label="pageTxt.table[0]" show-overflow-tooltip></el-table-column>
				<el-table-column prop="operationType" width="180" :label="pageTxt.table[1]" show-overflow-tooltip></el-table-column>
				<el-table-column prop="errInfo" :label="pageTxt.table[5]" show-overflow-tooltip>
					<span slot-scope="scope" class="preWrap"><!-- 
					-->{{scope.row.errInfo}}<!-- 
				--></span>
				</el-table-column>
				<el-table-column prop="operator" width="100" :label="pageTxt.table[2]" show-overflow-tooltip></el-table-column>
				<el-table-column prop="reviewer" width="120" :label="pageTxt.table[8]" show-overflow-tooltip></el-table-column>
				<el-table-column prop="operatorRole" width="100" :label="pageTxt.table[3]" show-overflow-tooltip></el-table-column>
				<el-table-column prop="errStr" width="120" :label="pageTxt.table[4]" show-overflow-tooltip>
					<span slot-scope="scope" :class="{red: scope.row.errStr!='success'}">
						{{scope.row.errStr}}
					</span>
				</el-table-column>
				<el-table-column prop="errInfo" width="90" :label="pageTxt.table[6]" show-overflow-tooltip>
					<div slot-scope="scope" class="_zero">
						<div @click='showParticularsFn(scope.row)' v-if="data.lists[scope.$index].uuid != null" :title="pageTxt.table[7]">
							<img src="@/fbcsViews/img/user/examine.png">
						</div>
					</div>
				</el-table-column>
			</el-table>
			<div class="_pagination" v-if="max>pageSize">
				<el-pagination @current-change='handleCurrentChange' background layout="prev, pager, next, jumper" 
					:current-page.sync='currPage' @size-change="handleSizeChange" :page-size="pageSize" :total="max"></el-pagination>
				<div class="rightTxt">{{paging.before1}}{{max}}{{paging.after}}</div>
			</div>
			<div class="onePage" v-else-if="max>0&&max<=pageSize">{{paging.before2}}{{max}}{{paging.after}}</div>
			
			<el-dialog class="dialog_pop" v-dialogDrag :title="pageTxt.table[6]" :visible.sync="showParticulars" width="70%">
				<div class="_content">
					<el-table highlight-current-row :data="responseDate" stripe border>
						<el-table-column prop="serviceID" :label="pageTxt.serviceID" width="120" show-overflow-tooltip>
							<span slot-scope="scope" :class="{red: scope.row.errcode!='0'}">{{scope.row.serviceID}}</span>
						</el-table-column>
						<el-table-column prop="zone" :label="pageTxt.zone" width="120" show-overflow-tooltip>
							<span slot-scope="scope" :class="{red: scope.row.errcode!='0'}">{{scope.row.zone}}</span>
						</el-table-column>
						<el-table-column prop="errStr" :label="pageTxt.result" width="120" show-overflow-tooltip>
							<span slot-scope="scope" :class="{red: scope.row.errStr!='success'}">{{scope.row.errStr}}</span>
						</el-table-column>
						<el-table-column prop="errinfo" :label="pageTxt.errinfo" show-overflow-tooltip>
							<span slot-scope="scope" :class="{red: scope.row.errcode!='0'}">{{scope.row.errinfo}}</span>
						</el-table-column>
					</el-table>
				</div>
			</el-dialog>
		</div>
		<el-dialog class="dialog_pop" v-dialogDrag :title="pageTxt.popup[0]" :visible.sync="exportExcel" width='600px'>
			<div class="_messaga">
				<span class="txt">{{pageTxt.popup[1]}}<a :href="excelSrc" style="color:#5C759D">{{excelName}}</a></span>
				<div class="_messaga_info">
					<span class="info_txt">{{pageTxt.popup[2]}}</span>
				</div>
			</div>
			<div slot="footer" class="_footBtn">
				<button class="defBtn" @click="exportExcel=false">{{pageTxt.popup[3]}}</button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import kit		 from '@/fbcsViews/libs/kit.js';
import utils from "@/fbcsViews/libs/utils.js";
import lang from '@/fbcsViews/language/lang.js';

	var pageTxt = 'lang.statist', _this;

	export default {
		name: "message_statist",
		data() {
			return {
				pageTxt,
				currPage: 1,
				max:0,
				oprType: [],
				search: "",
				radio: 0,
				beginDate: '',
				endDate: '',
				statisticalMethod: "",
				modeType: {
					user: "",
					userType: ""
				},
				data: {
					lists: [ /*{ operationTime: "2018-01-01" }*/ ]
				},
				showParticulars: false,
				responseDate: [],
				pageSize: 20,
				currentPage: 1,
				exportExcel: false,
				excelName: '',
				excelSrc: '',
				pickerBegin:{
					disabledDate(time) {
						var boundary = new Date(_this.endDate);
						boundary.setHours(23,59,59);
		        		return time > boundary;
		        	}
				},
				pickerEnd:{
					disabledDate(time) {
						var boundary = new Date(_this.beginDate);
						boundary.setHours(0,0,0);
		        		return  time < boundary;
		        	}
				}
			};
		},
		methods: {
			//查询
			searchFn() {
				this.renderDate(1);
			},
			//导出报表
			exportFn() {
				utils.post("mx/operationRecording/query", {
					cmdID: "600091",
					operator: _this.modeType.user,
					operationType: _this.modeType.userType,
					operationBeginTime: _this.beginDate/1000,
					operationEndTime: _this.endDate/1000,
					sequence: _this.statisticalMethod,
					type: 1,
					pageSize: _this.pageSize,
					currentPage: _this.currentPage
				}, function(data) {
					if(data.errcode == 0) {
						_this.excelSrc = data.errinfo;
						_this.excelName = data.errinfo.split("/").pop();
						_this.exportExcel = true;
					} else {
						// utils.weakTips(data.errinfo);
						fxUtils.alert({txt: data.errinfo});
					}
				});
			},
			//详情
			showParticularsFn(row) {
				this.showParticulars = true;
				utils.post( "mx/batchDispatch/queryBatchDispatchResponse", {
					cmdID: "600073",
					uuid: row.uuid,
					lastQueryFlag: 1,
					type: 0
				}, function(response) {
					var code = response.errcode;
					if(code==0||code==1) {
						var arr = response.lists;
						for (let i = 0; i < arr.length; i++) {
							let obj = arr[i];
							switch (obj.errcode){
								case 0: obj.errStr = 'success';break;
								case 1: obj.errStr = 'partial success';break;
								default: obj.errStr = 'failed';break;
							}
						}
						_this.responseDate = arr;
						kit('.statist .dialog_pop ._content')[0].scrollTop = 0;
					} else {
						this.showParticulars = false;
						fxUtils.alert({txt: response.errinfo, type: 0});
					}
				});
			},
			//分页
			handleSizeChange(size) {
				this.pageSize = size;
			},
			handleCurrentChange(current) {
				this.currentPage = current;
				this.renderDate();
			},
			//数据更新
			renderDate(page) {
				_this.currentPage = page || _this.currentPage;
				utils.post("mx/operationRecording/query", {
					cmdID: "600091",
					operator: _this.modeType.user,
					operationType: _this.modeType.userType,
					operationBeginTime: _this.beginDate/1000,
					operationEndTime: _this.endDate/1000,
					sequence: _this.statisticalMethod,
					type: 0,
					pageSize: _this.pageSize,
					currentPage: _this.currentPage
				}, function(response) {
					if(response.errcode == 0) {
						if(response.totalPage < _this.currentPage && response.totalPage >= 1) {
							_this.currentPage = response.totalPage;
							_this.renderDate();
						} else {
							_this.data = response;
							for(var i = 0; i < _this.data.lists.length; i++) {
								var obj = _this.data.lists[i],
									role = obj.operatorRole;
								obj.operatorRole = _this.pageTxt.tips[role];
								switch (obj.errCode){
									case '0': obj.errStr = 'success';break;
									case '1': case '20412': obj.errStr = 'partial success';break;
									default: obj.errStr = 'failed';break;
								}
							}
							_this.currPage = _this.currentPage = response.currentPage;
							_this.max = response.totalSize;
						}
					} else {
						_this.data.lists = [];
						_this.max = 0;
					}
				});
			}
		},
		//初始化数据
		created() {
			_this = this;
			let l = lang();
			this.pageTxt = pageTxt = l.statist;
			this.paging = l.publics.paging;
			this.statisticalMethod = "0";
			this.radio = 0;
			this.exportExcel = false;
			this.showParticulars = false;
			getDay(0);
			_this.renderDate();
			getoprType();
		},
		watch:{
			radio(cur){
				getDay(cur);
			}
		}
	};
	function getoprType(){
		var param = {
			cmdID: "600092",
			url: 'mx/operationRecording/queryOperationType'
		};
		utils.post(param, function(data){
			if(data.errcode!=0) return console.warn(data.errinfo);
			data.lists.forEach(function(obj, i){
				obj.val = obj.operationType;
				obj.label = obj.operationType;
				obj.key = i+1;
			});
			data.lists.unshift({val:'',label:pageTxt.tips[0],key:'0'});
			_this.oprType = data.lists;
			_this.modeType.userType = '';
		});
	}
	function getDay(radio){
		if(radio > 2) return;
		var time = 24 * 3600 * 1000;
		switch (radio){
			case 0: time = 0;break;
			case 1: time *= 6;break;
			case 2: time *= 29;break;
			default: break;
		}
		_this.beginDate = getTime(time, false);;
		_this.endDate = getTime(0, true);;
	}
	function getTime(t, h){
		var day = new Date(Date.now()-t);
		if(h) day.setHours(23,59,59,0);
		else day.setHours(0,0,0,0);
		return day.getTime();
	}
</script>

<style scoped="scoped">
	.statist{min-width: 1200px;white-space: nowrap;}
	.statist *{vertical-align: middle;}
	.statist{padding: 20px;font-size: 14px; color: #666;}
	.statist_herader{height: 30px;}
	.statist .lined{margin-top: 20px;height: 30px;}
	.lined .date_picker{margin-left: 30px;height: 30px;width: 360px;}
	.lined {margin-bottom: 20px;}
	.lined .searchBtn{margin-left: 30px;}
	.ml{margin-left: 30px;}
	.el-radio+.el-radio{margin-left: 18px;} 
	._zero{cursor: pointer;}
	.content{display: inline-block;font-size: 14px;margin-right: 40px; }
	._content{/*margin-left: 40px; margin-top: 20px;*/height: 280px; overflow-y:auto;text-align: center; }
	._panle{width: 600px; height: 410px;}
	.statist .exportPanle{height: auto;}
	.exportFn{position: absolute; right: 0;}
	.pickerTxt{margin-left: 15px;}
	.txt { margin-left: 35px; font-size: 14px; color: #666666; }
	.m0{margin: 0;}
	.red{color: red;}
	.preWrap {white-space: pre-wrap;}
</style>
<style>
	#fbcs_MX .statist .el-input__icon{height:auto;}
	#fbcs_MX .statist ._content .el-table .el-table__header-wrapper .has-gutter .cell{text-align: center;padding-left: 0;}
</style>