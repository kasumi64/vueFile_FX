<template>
	<div class="release">
		<input class="opacity0" />
		<div class="searchBox">
			<!--<h2 class="h2">{{pageTxt.label[0]}}</h2>-->
			<hr class="_hr" />
			<label class="txt">{{pageTxt.label[1]}}</label>
			<!--<el-input auto-complete="off" placeholder="" v-model="info.pubUserID"></el-input>-->
			<span class="m35">
				<el-autocomplete @input='autoInput' auto-complete="off" class="elInput m0" v-model="idName" :fetch-suggestions="fetch" @select="idSelect" :trigger-on-focus="true">
					<div slot-scope="{item}">
						<span class="name">{{item.userID}}</span>
					    <span class="addr">({{item.userName}})</span>
					</div>
				</el-autocomplete>
				<label class="el-icon-circle-close clearInput"></label>;
			</span>
			<!--<label class="txt">{{pageTxt.label[2]}}</label>
			<el-input auto-complete="off" placeholder="" v-model="info.pubUserName"></el-input>-->
			<label class="txt">{{pageTxt.label[3]}}</label>
			<el-input auto-complete="off" class='elInput' placeholder="" v-model="info.topicName" clearable></el-input>
			<label class="txt">{{pageTxt.label[5]}}</label>
			<!--<el-date-picker class='daterange' v-model="picker" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']"
				type="datetimerange" :range-separator="pageTxt.label[6]" start-placeholder="pageTxt.label[5]" end-placeholder="pageTxt.label[7]" >
			</el-date-picker>-->
			<el-date-picker class='picker' :picker-options='pickerBegin' v-model="info.beginDate" type="datetime" :clearable="false" :editable='false'
				value-format="yyyy-MM-dd HH:mm:ss" default-time="0:00:00">
			</el-date-picker>
			<label class="txt pickerTxt">{{pageTxt.label[7]}}</label>
			<el-date-picker class='picker' :picker-options='pickerEnd' v-model="info.endDate" type="datetime" :clearable="false" :editable='false'
				value-format="yyyy-MM-dd HH:mm:ss" default-time="23:59:59">
			</el-date-picker>
			<button class='blueBtn' type='primary' @click='search'>{{pageTxt.label[8]}}</button>
			
		</div>
		<div class="btnBox">
			<el-button v-if="auth>1" class='btn' @click='add' type='text'>
				<img src="@/fbcsViews/img/theme/add_2.png"/>
				<span class="btnTxt">{{pageTxt.label[9]}}</span>
			</el-button>
			<el-button v-if="auth>1" class='btn' @click='delTheme' type='text'>
				<img src="@/fbcsViews/img/theme/del_1.png"/>
				<span class="btnTxt">{{pageTxt.label[11]}}</span>
			</el-button>
			<!-- <el-button class='btn' @click='editTheme' type='text'>
				<img src="@/fbcsViews/img/theme/edit_1.png"/>
				<span class="btnTxt">{{pageTxt.label[10]}}</span>
			</el-button><el-button class='btn' @click='detailTheme' type='text'>
				<img src="@/fbcsViews/img/theme/detail_1.png"/>
				<span class="btnTxt">{{pageTxt.label[12]}}</span>
			</el-button> -->
			<el-button class='btn' @click='download' type='text'>
				<img src="@/fbcsViews/img/theme/download.png"/>
				<span class="btnTxt">{{pageTxt.label[13]}}</span>
			</el-button>
		</div>
		<el-table @sort-change='sortReq' @current-change="currenRow" @selection-change="selectionRow"  highlight-current-row
			stripe border :data="data" tooltip-effect="dark" style="min-width: 1320px">
			<!--<el-table-column width="50" :label="column" type="index"></el-table-column>-->
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column prop="pubUserID" sortable='custom' :label="pageTxt.list[0]"  show-overflow-tooltip></el-table-column>
			<el-table-column prop="pubUserName" :label="pageTxt.list[1]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="topicName" :label="pageTxt.list[2]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="pubTime" width='180' sortable='custom' :label="pageTxt.list[3]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="subsUserCounts" width='102' sortable='custom' :label="pageTxt.list[4]" show-overflow-tooltip></el-table-column>
			<el-table-column :label="pageTxt.list[5]" width='120'>
				<div slot-scope="scope" class="_zero">
					<!--<el-tooltip v-if="scope.row.userIDEnable!=0" :content="pageTxt.label[10]" placement="bottom" effect="light">
						<img @click="edit(scope.$index, scope.row, scope)" src="@/fbcsViews/img/theme/edit_2.png" alt="">
					</el-tooltip>-->
					<img v-if="auth>1" @click="edit(scope.$index, scope.row, scope)" src="@/fbcsViews/img/theme/edit_2.png" :title="pageTxt.label[10]">
					<img v-if="auth>1" @click="del(scope.$index, scope.row, scope)" src="@/fbcsViews/img/theme/del_2.png" :title="pageTxt.label[11]">
					<img @click="detail(scope.$index, scope.row, scope)" src="@/fbcsViews/img/theme/detail_2.png" :title="pageTxt.label[12]">
				</div>
			</el-table-column>
		</el-table>
		<div class="_pagination" v-if="max>size">
			<el-pagination @current-change='currentPage' background layout="prev, pager, next, jumper" 
				:current-page.sync='currPage' @size-change="pageSize" :page-size='size' :total="max"></el-pagination>
			<div class="rightTxt">{{paging.before1}}{{max}}{{paging.after}}</div>
		</div>
		<div class="onePage" v-else-if="max>0&&max<=size">{{paging.before2}}{{max}}{{paging.after}}</div>
		<!--<AddTheme></AddTheme>-->
		<!--<EditTheme></EditTheme>-->
		<!--<DetailTheme></DetailTheme>-->
		
		<el-dialog class="dialog_pop" v-dialogDrag :title="pageTxt.label[13]" :visible.sync="downCSV" width='600px'>
			<div class="_messaga">
				<span class="txt">{{pageTxt.fileName}}<a :href="csvUrl" style="color:#5C759D">{{csvName}}</a></span>
				<div class="_messaga_info">
					<span class="info_txt">{{pageTxt.label[14]}}</span>
				</div>
			</div>
			<div slot="footer" class="_footBtn">
				<button class="defBtn" @click="downCSV=false">{{pageTxt.label[15]}}</button>
			</div>
		</el-dialog>
		<lgy-loopReqMX ref="loop"></lgy-loopReqMX>
	</div>
</template>

<script>
import utils       from '@/fbcsViews/libs/utils.js';
import lang        from '@/fbcsViews/language/lang.js';
import globalVar   from '@/fbcsViews/libs/globalVar.js';
import fxUtils   from '@/fbcsFxViews/libs/utils.js';
//import AddTheme    from '@/fbcsViews/view/message/subscription/theme/addTheme.vue';
//import EditTheme   from '@/fbcsViews/view/message/subscription/theme/editTheme.vue';
//import DetailTheme from '@/fbcsViews/view/message/subscription/theme/detailTheme.vue';


	var pageTxt, _this, autoTime, isInput = false, _currentPage=1;
	
	var data = {
		pageTxt,
		auth: globalVar.get('status').topic,
		column: '　',
		idName: '',
		info: {
			pubUserID: '', topicName: '',
			beginDate: '', endDate: '', sortType: '0'
		},
		picker: [],
		data: [/*{pubUserID:'发布者ID',pubUserName:'发布者名称',topicName:'主题名',pubTime:'发布时间',subsUserCounts:'订阅个数'}*/],
		row: '',
		selects: [],
		size: 20,
		currPage: 1,
		max: 0,
		downCSV: false,
		csvUrl: '#',
		csvName: '',
		pickerBegin:{
			disabledDate(time) {
				var boundary = new Date(_this.info.endDate);
				boundary.setHours(23,59,59);
        		return time > boundary;
        	}
		},
		pickerEnd:{
			disabledDate(time) {
				var boundary = new Date(_this.info.beginDate);
				boundary.setHours(0,0,0);
        		return  time < boundary;
        	}
		}
	};
	
	function delTheme(sub, args){
		var row = delTheme.row,
		param = {
			operator: 'admin',
			pubUserID: row.pubUserID,
			topicName: row.topicName
		};
		if(sub == 'send'){
			param.url = 'mx/pubTopic/delete';
			param.cmdID = '600046';
			param.deleteList = delTheme.delList;
		} else {
			param.url = 'mx/pubTopic/deleteImmediately';
			param.cmdID = '600049';
			param.reviewer = args.name;
			param.reviewerPassword = args.pwd;
			param.reviewType = 1;
		}
		utils.post(param, function(data){
//			console.log('删除主题：',data);
			if(data.errcode != 0) {
				// utils.weakTips(data.errinfo);
				fxUtils.alert({txt: data.errinfo});
				return;
			}
			if(sub == 'send') {
				// utils.weakTips(data.errinfo);
				fxUtils.alert({txt: data.errinfo, type: 1});
			}else {
				// utils.wheelReq(data); //轮循
				_this.$refs.loop.start(data);
			}
			search();
		});
	}
	
	function delSend(){delTheme('send');}
	function delNow(){
		utils.review({ //审核
			uri: 'mx/pubTopic/deleteImmediately',
			yes: function(args){
				delTheme('now', args);
			}
		});
	}
	
	function autoInput(str, cb){
//		str = str.replace(/\s/g, '');
//		if(!str) return;
		utils.getUserid(str, function(data){
			var i,len = data.length,tem=[];
			for (i = 0; i < len; i++) {
				var label = data[i].label.toLocaleLowerCase();
				str = str.toLocaleLowerCase();
				if(label.indexOf(str)!=-1) tem.push(data[i]);
			}
			cb(tem);
		});
	}
	
	export default {
		name: 'message_release',
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
			},
			autoInput(str){
				isInput = true;
				var clear = document.querySelector('.release .clearInput');
				if(clear) clear.style.display = 'block';
//				if(str){
//					setTimeout(function(){
//						_this.idName = str.replace(/\s/g, '');
//					}, 0);
//				}
			},
			search(){
				search(_currentPage = 1);
				this.currPage = 1;
			},
			add(){
				utils.goto('/message/addTheme')
			},
			editTheme(){
				var row = this.selects;
				if(isError(row)) return;
				setCache();
				utils.goto('/message/editTheme','userid',row[0]);
			},
			edit(ind, row){
				setCache();
				utils.goto('/message/editTheme','userid',row);
			},
			delTheme(){
				var row = this.selects;
				if(row.length == 0){
					// utils.weakTips(pageTxt.hasOne);
					fxUtils.alert({txt: pageTxt.hasOne});
					return true;
				}
				delTheme.row = row[0];
				delTheme.delList = row;
				utils.hints({
					txt:pageTxt.tips.del, btn: row.length == 1 ? 3 : 2,
					yes:delSend, now:delNow,
				});
			},
			del(ind, row){
				// console.log(ind, row);
				delTheme.index = ind;
				delTheme.row = row;
				delTheme.delList = [row];
				utils.hints({
					txt:pageTxt.tips.del, btn:3,
					yes:delSend, now:delNow,
				});
			},
			detailTheme(){
				var row = this.selects;
				if(isError(row)) return;
				setCache();
				utils.goto('/message/detailTheme/release','userid', this.selects[0]);
			},
			detail(ind, row){
				setCache();
				utils.goto('/message/detailTheme/release','userid', row);
			},
			sortReq(obj){
				/*
				 * 默认0，按发布时间从近到远排序， 1，按发布时间从远到近排序。。2，按发布者用户从小到大排序，
				 * 3，按发布者用户从大到小培训。。。4，按订阅者个数从大到小培训，5，按订阅者个数从小到大排序
				 * {pubUserID:'发布者ID',pubTime:'发布时间',subsUserCount:'订阅个数'}
				 */
				
				var info = this.info;
				if(obj.order == 'ascending'){ //从小到大
					switch (obj.prop){
						case 'pubUserID':
							info.sortType = '2';break;
						case 'subsUserCounts':
							info.sortType = '5';break;
						default:
							info.sortType = '0';break;
					}
				} else if(obj.order == 'descending') {
					switch (obj.prop){
						case 'pubUserID':
							info.sortType = '3';break;
						case 'subsUserCounts':
							info.sortType = '4';break;
						default:
							info.sortType = '1';break;
					}
				} else info.sortType = '0';
				
				search(_currentPage = 1);
			},
			selectionRow(val){
		     	this.selects = val;
		    },
			currenRow(row){
				this.row = row;
//				console.log(row);
			},
			pageSize(val){
//		    	console.log(`每页 ${val} 条`);
		    	this.size = val;
		    	search();
		    },
			currentPage(val){
//				console.log(`当前页: ${val}`,`每页 ${this.size} 条`);
				_currentPage = val;
				search();
			},
			download(){
				let param = Object.assign({}, this.info);
				param.cmdID = '600053';
				utils.post('mx/pubTopic/exportCsv', param, function(data){
					if(data.errcode != 0) {
						// utils.weakTips(data.errinfo);
						fxUtils.alert({txt: data.errinfo});
						return;
					} 
//					location.href = data.errinfo;
					var url = data.errinfo, ind = url.lastIndexOf('/');
					_this.csvName = url.substring(ind + 1);
					_this.csvUrl = url;
					_this.downCSV = true;
				});
			}
		},
		created(){
			let l = lang();
			this.pageTxt = pageTxt = l.themeRelease;
			this.paging = l.publics.paging;
		},
		mounted(){
			_this = this;
			this.auth = globalVar.get('status').topic;
			this.selects = [];
			this.size = 20;
			this.downCSV = false;
			initParam();
			search(_currentPage);
			var btn = utils.clearInput({
				pos: '.release',
				id: '#el-auto',
				clas: '.clearInput',
			});
			btn.clear(e => {
				_this.info.pubUserID = _this.idName = '';
			});
		},
//		components: {AddTheme, EditTheme, DetailTheme}
	};
	
	function search(num, size){
		var picker = _this.picker, info = Object.assign({}, _this.info);
		var userID = isInput ? _this.idName : info.pubUserID;
		
		/*if(info.beginDate > info.endDate) {
			var b = info.beginDate;
			info.beginDate = info.endDate;
			info.endDate = b;
		}*/
		info.cmdID = '600042';
		info.pubUserID = userID;
		info.currentPage = num||_currentPage;
		info.pageSize = size||_this.size;
		utils.post('mx/pubTopic/queryLists', info, function(data){
//			console.log('已发布主题：',data);
			if(data.errcode != 0) {
				_this.data = [];
				_this.max = 0;
				return console.warn(data.errinfo);
			}
			if(_currentPage>data.totalPage&&data.totalPage>0){
				return search(_currentPage=data.totalPage);
			}
			_this.data = data.lists;
			_this.currPage = info.currentPage;
			_this.max = parseInt(data.totalSize)||_this.data.length;
		});
	}
	
	function getDay(num){
		var begin, end, time = 24 * 3600 * 1000;
		end = getTime(0);
		time *= num;
		begin = getTime(time);
//		_this.picker = [begin + ' 00:00:00', end + ' 23:59:59'];
		_this.info.beginDate = begin + ' 00:00:00';
		_this.info.endDate = end + ' 23:59:59';
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
	
	function isError(arr){
		if(arr.length != 1){
			// utils.weakTips(pageTxt.tips.user);
			fxUtils.alert({txt: pageTxt.tips.user});
			return true;
		}
		return false;
	}
	function initParam(){
		var cache = globalVar.get('cache_theme');
		var info = _this.info;
		if(cache){
			_this.idName = info.pubUserID = cache.id;
			_currentPage = cache.page;
			info.beginDate = cache.beginDate;
			info.endDate = cache.endDate;
			info.sortType = cache.sortType;
			info.topicName = cache.name;
		}else {
			_this.idName = info.pubUserID = info.topicName = '';
			_currentPage = 1;
			info.sortType = '0';
			getDay(6);
		}
	}
	function setCache(){
		var info = _this.info;
		globalVar.set('cache_theme', {
			page: _this.currPage,
			beginDate : info.beginDate,
			endDate : info.endDate,
			id : info.pubUserID,
			sortType : info.sortType,
			name : info.topicName
		});
	}
</script>

<style scoped="scoped">
	.release{padding:0 20px;white-space: nowrap;color: #666;}
	.h2{font-size: 16px;line-height: 44px;color: #666;font-weight: bold;}
	._hr{min-width: 1360px;}
	.searchBox *{vertical-align: middle;}
	.txt{font-size: 14px;line-height: 30px;padding-right: 10px;}
	.elInput{width: 200px;line-height: 1;margin-right: 35px;}
	.el-button *{vertical-align: middle;}
	.blueBtn{margin-left: 10px;margin-left: 35px;}
	.btnBox{padding: 10px 0;}
	.btn{margin-right: 35px;margin-left: 0;padding: 0 !important;}
	.btnTxt{vertical-align: middle;color: #5a769e;line-height: 30px;height: 30px;}
	._zero img{margin-right: 15px;}
	.clearInput{bottom: 8px;right:8px;}
	.pickerTxt{margin-left: 35px;}
	.m35{margin-right: 35px;}
	.m0{margin: 0;}
</style>