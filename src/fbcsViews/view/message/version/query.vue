<template>
	<div class="query">
		<div class="searchBox">
			<!--<h2 class="h2">{{pageTxt.label[0]}}</h2>-->
			<hr class="_hr" />
			<div>
				<label class="txt">{{pageTxt.label[1]}}</label>
				<el-select class='select' v-model="config">
					<el-option v-for="obj in pageTxt.option" :key="obj.c" :label="obj.t" :value="obj.c">
					</el-option>
				</el-select>
			</div>
			<div class="ver">
				<label class="txt">{{pageTxt.label[2]}}</label>
				<el-radio-group v-model="radio">
				    <el-radio :label="0">{{pageTxt.label[3]}}</el-radio>
				    <el-radio :label="1">{{pageTxt.label[4]}}</el-radio>
				    <el-radio :label="2">{{pageTxt.label[5]}}</el-radio>
				    <el-radio :label="3">{{pageTxt.label[9]}}</el-radio>
				</el-radio-group>
				<label class="txt"></label>
				<!--<el-date-picker :disabled="radio!=3" class='daterange' v-model="picker" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']"
					type="datetimerange" :range-separator="pageTxt.label[8]" start-placeholder="pageTxt.label[9]" end-placeholder="pageTxt.label[10]" >
				</el-date-picker>-->
				<el-date-picker :disabled="radio!=3" :picker-options='pickerBegin' v-model="beginDate" type="datetime" :clearable="false" :editable='false'
					 class='picker' value-format="yyyy-MM-dd HH:mm:ss" default-time="0:00:00">
				</el-date-picker>
				<label class="txt pickerTxt">{{pageTxt.label[10]}}</label>
				<el-date-picker :disabled="radio!=3" :picker-options='pickerEnd' v-model="endDate" type="datetime"  :clearable="false" :editable='false'
					 class='picker' value-format="yyyy-MM-dd HH:mm:ss" default-time="23:59:59">
				</el-date-picker>
				<button class='blueBtn' @click='search'>{{pageTxt.label[11]}}</button>
				<button v-if="auth>1" class='blueBtn big' @click='bigVer'>{{pageTxt.label[14]}}</button>
			</div>
		</div>
		<el-table stripe border @row-dblclick="dbl"  @current-change="currenRow" @selection-change="selectionRow" highlight-current-row
			:data="data" tooltip-effect="dark">
			<!--<el-table-column width="50" :label="column" type="index"></el-table-column>-->
			<!--<el-table-column type="selection" width="55"></el-table-column>-->
			<el-table-column prop="typeTxt" width="150" :label="pageTxt.list[0]"  show-overflow-tooltip></el-table-column>
			<el-table-column prop="version" width="210"   :label="pageTxt.list[1]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="versionPath" :label="pageTxt.list[2]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="operationTime" width="180" :label="pageTxt.list[3]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="operator" width="120"  :label="pageTxt.list[4]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="reviewer" width="120"  :label="pageTxt.list[5]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="send" width="100" :label="pageTxt.list[6]" show-overflow-tooltip></el-table-column>
			<el-table-column :label="pageTxt.list[7]" width='100'>
				<div slot-scope="scope" class="_zero">
					<img v-if="auth>1" @click="rollback(scope.row, scope.$index, scope)" src="@/fbcsViews/img/theme/version.png" :title="pageTxt.label[12]">
					<img @click="detail(scope.row, scope.$index, scope)" src="@/fbcsViews/img/theme/detail_2.png" :title="pageTxt.label[13]">
				</div>
			</el-table-column>
		</el-table>
		<div class="_pagination" v-if="max>size">
			<el-pagination @current-change='currentPage' @size-change="pageSize" :page-size='size' :total="max" 
				:current-page.sync='currPage' layout="prev, pager, next, jumper" background></el-pagination>
			<div class="rightTxt">{{paging.before1}}{{max}}{{paging.after}}</div>
		</div>
		<div class="onePage" v-else-if="max>0&&max<=size">{{paging.before2}}{{max}}{{paging.after}}</div>
		<el-dialog class="dialog_pop" v-dialogDrag :title="pageTxt.label[13]" :visible.sync="downCSV" width='600px'>
			<el-table class="popTable" stripe :data="detailData" tooltip-effect="dark">
				<el-table-column width="50" :label="column" type="index"></el-table-column>
				<el-table-column prop="fileName" :label="pageTxt.list[8]"  show-overflow-tooltip></el-table-column>
				<el-table-column prop="fileSize" width="120" :label="pageTxt.list[9]" show-overflow-tooltip></el-table-column>
			</el-table>
		</el-dialog>
		<!--<div class="Popup" v-show="downCSV">
			<div class="_panle">
				<div>
					<p id="_title">{{pageTxt.label[13]}}</p>
					<img id="_close" src="@/fbcsViews/img/close.png" @click="downCSV=false">
				</div>
				<el-table class="popTable" stripe :data="detailData" tooltip-effect="dark">
					<el-table-column width="50" :label="column" type="index"></el-table-column>
					<el-table-column prop="fileName" :label="pageTxt.list[8]"  show-overflow-tooltip></el-table-column>
					<el-table-column prop="fileSize" width="120" :label="pageTxt.list[9]" show-overflow-tooltip></el-table-column>
				</el-table>
			</div>
		</div>-->
		<!--<div id="_weakTips">
			<div class="panle">
				<div class="container"></div>
			</div>
		</div>-->
		<lgy-loopReqMX ref="loop"></lgy-loopReqMX>
	</div>
</template>

<script>
import utils     from '@/fbcsViews/libs/utils.js';
import lang      from '@/fbcsViews/language/lang.js';
import globalVar from '@/fbcsViews/libs/globalVar.js';
import fxUtils   from '@/fbcsFxViews/libs/utils.js';


	var pageTxt, _this, _currentPage = 1;
	pageTxt = 'lang.versionQuery';
	
	var data = {
		pageTxt,
		auth: globalVar.get('status').version,
		column: '　',
		config: '0',
		radio: 1,
		picker: [],
		beginDate: '',
		endDate: '',
		data: [/*{type:'num',version:'version',versionPath:'url',operationTime:'time',
			operation:'send',reviewer:'sh',operationType:'sendType'}*/],
		row: {},
		selects: [],
		size: 20,
		max: 0,
		downCSV: false,
		detailData: [],
		currPage: 1,
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

	function search(num, size){
		/*if(_this.beginDate > _this.endDate) {
			var b = _this.beginDate;
			_this.beginDate = _this.endDate;
			_this.endDate = b;
		}*/
		_this.currPage = num||_currentPage;
		_currentPage = _this.currPage;
		var param = {
			cmdID: '600061', type: _this.config,
			pageSize: size||_this.size,
			currentPage: _this.currPage,
		};
		param.beginDate = _this.beginDate;
		param.endDate = _this.endDate;
		utils.post('mx/version/queryLists', param, function(data){
//			console.log('版本信息列表：', data);
			if(data.errcode != 0) {
				_this.data = [];
				_this.max = 0;
				return console.warn(data.errinfo);
			}
			if(_currentPage>data.totalPage&&data.totalPage>0){
				return search(data.totalPage);
			}
			_this.data = verType(data.lists);
			_this.max = parseInt(data.totalSize)||_this.data.length;
		});
	}
	function verType(arr){
		//1   动态配置文件  dcfg  2 静态配置文件  scfg   3 密码表 passwd 4  用户主题关联信息表 pscomm  5   动态配置文件回滚  rdcfg  
		//6 静态配置文件回滚  rscfg   7 密码表回滚  rpasswd 8  用户主题关联信息表回滚  rpscomm
		// var txt = ['','dcfg','scfg','passwd','pscomm','rdcfg','rscfg','rpasswd','rpscomm'];
		var txt = pageTxt.typeTxt;
		var i, len = arr.length, obj, oper = pageTxt.operTxt;
		for (i = 0; i < len; i++) {
			obj = arr[i];
			obj.typeTxt = txt[obj.type];
			obj.send = oper[obj.operationType];
		}
		return arr;
	}
	
	export default {
		name: 'message_query',
		data() {
			return data;
		},
		methods: {
			search(){
				search(_currentPage = 1);
				this.currPage = 1;
			},
			bigVer(){
				utils.hints({
					txt: pageTxt.tips.ver,
					that: _this, yes: sure
				});
				function sure(){
					utils.review({
						uri: 'mx/version/createBigVersion',
						that: this, yes: call
					});
				}
				function call(review){
					var param = {
						url: 'mx/version/createBigVersion',
						cmdID: '600066',
						reviewer: review.name,
						reviewerPassword: review.pwd,
						reviewType: 1,
						that: this
					};
					utils.post(param, function(data){
						if(data.errcode != 0) return fxUtils.alert({txt: data.errinfo});
						data.type = 2;
						// utils.wheelReq(data); //轮循
						_this.$refs.loop.start(data);
						search(1);
					});
				}
			},
			currenRow(row){
				this.row = row;
			},
			selectionRow(val){
		     	this.selects = val;
		    },
		    pageSize(val){ //`每页 ${val} 条`
		    	this.size = val;
		    	search();
		    },
			currentPage(val){ //`当前页: ${val}`
				_currentPage = val;
				search();
			},
			rollback(row){
				utils.review({ //审核
					uri: 'mx/version/rollback',
					yes: function(args){
						var txt = pageTxt.tips.rollback;
						switch (row.type){
							case 1: case 5:
							txt += pageTxt.tips.roll;
							break;
						}
						utils.hints({
							txt: txt,
							yes: function(){
								var param = {
									url: 'mx/version/rollback',
									cmdID: '600063',
									type: row.type,
									version: row.version,
									reviewer: args.name,
									reviewerPassword: args.pwd,
									reviewType: 1,
								};
								utils.post(param, function(data){
		//							console.log('版本回退：', data);
									if(data.errcode == 0) {
										// utils.wheelReq(data); //轮循
										_this.$refs.loop.start(data);
										search(_currentPage = 1);
									} else fxUtils.alert({txt: data.errinfo});
								});
							}
						});
					}
				});
			},
			detail(row){
//				console.log(row);
				var param = {
					url: 'mx/version/querySize',
					cmdID: '600065',
					type: row.type,
					version: row.version
				};
				utils.post(param, function(data){
//					console.log(data);
					if(data.errcode != '0') return fxUtils.alert({txt: data.errinfo});
					_this.detailData = data.lists;
					/**
					type=1、5,显示 userinfoFileName，userekeyFileName，usercommFileName，mxdynamicFileName
					type=2\6,显示 mxstaticFileName     type=3、7显示 userpasswdFileName
					type= 4、8显示 pstopicFileName 和 pscommFileName
					**/			
					/*var org = data.lists[0], dict;
					switch (org.type){
						case 1: case 5:
							dict = ['userinfoFileName,userinfoFileSize', 'userekeyFileName,userekeyFileSize', 'usercommFileName,usercommFileSize', 'mxdynamicFileName,mxdynamicFileSize'];
							getDetail(dict);
							break;
						case 2: case 6:
							dict = ['mxstaticFileName,mxstaticFileSize'];
							getDetail(dict);
							break;
						case 3: case 7:
							dict = ['userpasswdFileName,userpasswdFileSize'];
							getDetail(dict);
							break;
						case 4: case 8:
							dict = ['pstopicFileName,pstopicFileSize', 'pscommFileName,pscommFileSize'];
							getDetail(dict);
							break;
					}
					function getDetail(dict){
						var arr = [], len = dict.length, tem;
						for (var i = 0; i < dict.length; i++) {
							tem = dict[i].split(',');
							arr.push( {name: org[tem[0]], size: org[tem[1]]} );
						}
						_this.detailData = arr;
					}*/
					_this.downCSV = true;
				});
			},
			dbl(info, e){
//				console.log(info, e)
			}
		},
		created(){
			let l = lang();
			this.pageTxt = pageTxt = l.versionQuery;
			this.paging = l.publics.paging;
		},
		mounted(){
			_this = this;
			this.auth= globalVar.get('status').version;
			this.config = '0';
			getDay(this.radio = 1);
			search(_currentPage = 1);
			this.downCSV = false;
		},
		watch:{
			radio(cur){
				getDay(cur);
			}
		}
	};
	function getDay(radio){
		if(radio > 2) return;
		var begin, end, time = 24 * 3600 * 1000;
		end = getTime(0);
		switch (radio){
			case 0: time = 0;break;
			case 1: time *= 6;break;
			case 2: time *= 29;break;
			default: break;
		}
		begin = getTime(time);
//		_this.picker = [begin + ' 00:00:00', end + ' 23:59:59'];
		_this.beginDate = begin + ' 00:00:00';
		_this.endDate = end + ' 23:59:59';
	}
	function getTime(t){
		var day = new Date(Date.now()-t), str = '', t;
		str += day.getFullYear() + '-';
		t = day.getMonth() + 1;
		str += (t<10 ? '0'+t : t) + '-';
		t = day.getDate();
		str += (t<10 ? '0'+t : t);
		return str;
	}
</script>

<style scoped="scoped">
	.query{padding: 0 20px;white-space: nowrap;color: #666;min-width: 1220px;}
	.h2{font-size: 16px;line-height: 44px;color: #666;font-weight: bold;}
	._hr{min-width: 980px;}
	.searchBox *{vertical-align: middle;}
	.txt{font-size: 14px;line-height: 30px;padding-right: 10px;}
	.select{width: 200px;}
	.el-input{width: 180px;line-height: 30px;}
	.ver{margin: 10px 0;}
	.blueBtn{margin-left: 35px;}
	.btnTxt{color: #5a769e;}
	.el-button *{vertical-align: middle;}
	.big{position: absolute;top: 0;right: 0;padding: 0 10px;}
	._zero img{margin-right: 15px;}
	.daterange{margin-left: 20px;}
	.Popup ._panle{height: auto}
	.popTable{display: block;width: 520px;max-height: 405px;overflow: auto;text-align: left;}
	.pickerTxt{margin-left: 30px;}
</style>
