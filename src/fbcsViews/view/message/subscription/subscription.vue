<template>
	<div class="subscription">
		<input class="opacity0" />
		<div class="searchBox">
			<!--<h2 class="h2">{{pageTxt.label[0]}}</h2>-->
			<hr class="_hr" />
			<label class="txt">{{pageTxt.label[1]}}</label>
			<!--<el-input auto-complete="off" class='elInput' placeholder="" v-model="info.subUserID"></el-input>-->
			<div class="c1">
				<el-autocomplete @input='autoInput' auto-complete="off" class="elInput m0" v-model="idName" :fetch-suggestions="fetch" @select="idSelect" :trigger-on-focus="true">
					<div slot-scope="{item}">
						<span class="name">{{item.userID}}</span>
					    <span class="addr">({{item.userName}})</span>
					</div>
				</el-autocomplete>
				<label class="el-icon-circle-close clearInput cl1"></label>
			</div>
			
			<label class="txt">{{pageTxt.label[6]}}</label>
			<div class="c2">
				<el-autocomplete @input='autoInput2' class="elInput m0" v-model="idName2" :fetch-suggestions="fetch" @select="idSelect2" :trigger-on-focus="true">
					<div slot-scope="{item}">
						<span class="name">{{item.userID}}</span>
					    <span class="addr">({{item.userName}})</span>
					</div>
				</el-autocomplete>
				<label class="el-icon-circle-close clearInput cl2"></label>
			</div>
			<!--<label class="txt">{{pageTxt.label[2]}}</label>
			<el-input auto-complete="off" placeholder="" v-model="info.subUserName"></el-input>-->
			<label class="txt">{{pageTxt.label[3]}}</label>
			<el-input auto-complete="off" class='elInput' placeholder="" v-model="info.topicName" clearable></el-input>
			<button class='blueBtn' type='primary' @click='search'>{{pageTxt.label[4]}}</button>
		</div>
		<div class="btnBox">
			<!--<el-button @click='detail' class='btn' type='text'>
				<img src="../../../img/theme/detail_1.png"/>
				<span class="btnTxt">{{pageTxt.label[5]}}</span>
			</el-button>-->
		</div>
		<el-table @sort-change='sortReq' @current-change="currenRow" @selection-change="selectionRow" highlight-current-row
			stripe border :data="data" tooltip-effect="dark" style="min-width: 1040px">
			<!--<el-table-column width="50" :label="column" type="index"></el-table-column>-->
			<!--<el-table-column type="selection" width="55"></el-table-column>-->
			<el-table-column prop="subUserID" sortable='custom' :label="pageTxt.list[0]"  show-overflow-tooltip></el-table-column>
			<el-table-column prop="subUserName" :label="pageTxt.list[1]"  show-overflow-tooltip></el-table-column>
			<el-table-column prop="subAppID" :label="pageTxt.list[2]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="pubUserID" sortable='custom' :label="pageTxt.list[3]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="pubUserName" :label="pageTxt.list[4]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="topicName" :label="pageTxt.list[5]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="pubTime" width="180" sortable='custom' :label="pageTxt.list[6]" show-overflow-tooltip></el-table-column>
			<el-table-column :label="pageTxt.list[7]" width='100'>
				<div slot-scope="scope" class="_zero">
					<!-- <el-tooltip :content="pageTxt.label[5]" placement="bottom" effect="light"> -->
						<img @click="see(scope.$index, scope.row, scope)" src="../../../img/theme/detail_2.png" :title="pageTxt.label[5]" alt="">
					<!-- </el-tooltip> -->
				</div>
			</el-table-column>
		</el-table>
		<div class="_pagination" v-if="max>size">
			<el-pagination @current-change='currentPage' background layout="prev, pager, next, jumper" 
				:current-page.sync='currPage' :page-size='size' :total="max"></el-pagination>
			<div class="rightTxt">{{paging.before1}}{{max}}{{paging.after}}</div>
		</div>
		<div class="onePage" v-else-if="max>0&&max<=size">{{paging.before2}}{{max}}{{paging.after}}</div>
		<!--<DetailTheme></DetailTheme>-->
	</div>
</template>

<script>
import utils       from '@/fbcsViews/libs/utils.js';
import lang        from '@/fbcsViews/language/lang.js';
import globalVar   from '@/fbcsViews/libs/globalVar.js';
import fxUtils   from '@/fbcsFxViews/libs/utils.js';
//import DetailTheme from '@/fbcsViews/view/message/subscription/theme/detailTheme.vue';


	var pageTxt, _this, autoTime, _currentPage=1, isInput=false,isInput2=false;
	
	var data = {
		pageTxt,
		column: '　',
		idName: '',
		idName2: '',
		info: {
			subUserID:'', topicName: '',
			sortType: '0', type: '0',pubUserID:''
		},
		data: [/*{subUserID:'订阅者ID',subUserName:'订阅者名',subAppID:'订阅者AppID',pubUserID:'发布者ID',pubUserName:'发布者名称',topicName:'主题名',pubTime:'发布时间'}*/],
		row: '',
		selects: [],
		size: 20,
		currPage: 1,
		max: 0
	};

	function autoInput(str, cb){
//		str = str.replace(/\s/g, '');
//		if(!str) return;
		utils.getUserid(str, function(data){
//			console.log('用户ID data',data);
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
		name: 'message_subscription',
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
				this.info.subUserID = item.userID;
				// this.idName = item.userID+'('+item.userName+')';
				this.idName = item.userID;
			},
			autoInput(str){
				isInput = true;
				var clear = document.querySelector('.subscription .cl1');
				if(clear) clear.style.display = 'block';
//				if(str){
//					setTimeout(function(){
//						_this.idName = str.replace(/\s/g, '');
//					}, 0);
//				}
			},
			idSelect2(item){
				isInput2 = false;
				this.info.pubUserID = item.userID;
				// this.idName2 = item.userID+'('+item.userName+')';
				this.idName2 = item.userID;
			},
			autoInput2(str){
				isInput2 = true;
				var clear = document.querySelector('.subscription .cl2');
				if(clear) clear.style.display = 'block';
//				if(str){
//					setTimeout(function(){
//						_this.idName2 = str.replace(/\s/g, '');
//					}, 0);
//				}
			},
			search(){
				search(_currentPage = 1);
				this.currPage = 1;
			},
			currenRow(row){
				this.row = row;
			},
			selectionRow(val){
		     	this.selects = val;
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
			sortReq(obj){
				//默认2   0，按发布时间从近到远排序， 1，按发布时间从远到近排序。。
				// 2，按订阅者用户从小到大排序，3，按订阅者用户从大到小培训。。
				// 4，按发布者用户从小到大排序，5，按发布者用户从大到小培训。。
				var info = this.info;
				if(obj.order == 'ascending'){ //从小到大
					switch (obj.prop){
						case 'subUserID':
							info.sortType = '2';break;
						case 'pubUserID':
							info.sortType = '4';break;
						default:
							info.sortType = '0';break;
					}
				} else if(obj.order == 'descending') {
					switch (obj.prop){
						case 'subUserID':
							info.sortType = '3';break;
						case 'pubUserID':
							info.sortType = '5';break;
						default:
							info.sortType = '1';break;
					}
				} else info.sortType = '2';
				
				search(_currentPage = 1);
			},
			detail(){
				var row = this.selects;
				if(row.length != 1){
					// utils.weakTips(pageTxt.tips.user);
					fxUtils.alert({txt: pageTxt.tips.user});
					return;
				}
				setCache();
				utils.goto('/message/detailTheme/subscription','userid',row[0]);
			},
			see(ind, row){
				setCache();
				utils.goto('/message/detailTheme/subscription','userid',row);
			}
		},
		created(){
			let l = lang();
			this.pageTxt = pageTxt = l.themeSubscription;
			this.paging = l.publics.paging;
		},
		mounted(){
			_this = this;
			isInput=isInput2=false;
			this.selects = [];
			this.size = 20;
			initParam();
			search(_currentPage);
			cleared();
		},
//		components: {DetailTheme}
	};
	function search(num, size){
		var info = _this.info;
		var subUserID = isInput ? _this.idName : info.subUserID;
		var pubUserID = isInput2 ? _this.idName2 : info.pubUserID;
		info.cmdID = '600044';
		info.currentPage = num||_currentPage;
		info.pageSize = size||_this.size;
		info.subUserID = subUserID;
		info.pubUserID = pubUserID;
		utils.post('mx/subTopic/queryLists', info, function(data){
//			console.log('已订阅主题：',data);
			if(data.errcode != 0) {
				_this.data = [];
				_this.max = 0;
				return console.warn(data.errinfo);
			}
			_this.data = data.lists;
			_this.currPage = info.currentPage;
			_this.max = parseInt(data.totalSize)||_this.data.length;
		});
	}
	function cleared(){
		var btn = utils.clearInput({
			pos: '.subscription .c1',
			id: '#el-auto1',
			clas: '.clearInput.cl1',
		});
		btn.clear(e => {
			_this.info.subUserID = _this.idName = '';
		});
		var btn2 = utils.clearInput({
			pos: '.subscription .c2',
			id: '#el-auto2',
			clas: '.clearInput.cl2',
		});
		btn2.clear(e => {
			_this.info.pubUserID = _this.idName2 = '';
		});
	}
	function initParam(){
		var cache = globalVar.get('cache_theme');
		var info = _this.info;
		var goBack = globalVar.get('goBack');
		if(cache && goBack){
			info.subUserID = _this.idName = cache.subUserID;
			info.pubUserID = _this.idName2 = cache.pubUserID;
			_currentPage = cache.page;
			info.sortType = cache.sortType;
			info.topicName = cache.name;
		}else {
			_this.idName = info.subUserID = info.topicName = '';
			_this.idName2 = info.pubUserID = '';
			_currentPage = 1;
			info.sortType = '0';
		}
		globalVar.set('goBack', false);
		utils.clearCache();
	}
	function setCache(){
		var info = _this.info;
		globalVar.set('cache_theme', {
			page: _this.currPage,
			subUserID: info.subUserID,
			pubUserID : info.pubUserID,
			name : info.topicName,
			sortType : info.sortType
		});
	}
</script>

<style scoped="scoped">
	.subscription{padding: 0 20px;white-space: nowrap;color: #666;}
	.h2{font-size: 16px;line-height: 44px;color: #666;font-weight: bold;}
	._hr{min-width: 1080px;}
	.searchBox *{vertical-align: middle;}
	.txt{font-size: 14px;line-height: 30px;padding-right: 10px;}
	.elInput{width: 200px;line-height: 1;margin-right: 35px;}
	.red{color: red;}
	.blueBtn{margin-left: 10px;}
	.btnBox{padding: 10px 0;}
	.btn{margin-right: 35px;margin-left: 0;padding: 0;}
	.btnTxt{vertical-align: middle;color: #5a769e;line-height: 30px;height: 30px;}
	.el-button *{vertical-align: middle;}
	._zero img{margin-right: 15px;}
	.clearInput{bottom: 8px;right:8px;}
	.cl2{}
	.c1,.c2{display: inline-block;margin-right: 35px;}
	.m0{margin: 0;}
</style>
