<template>
	<div class="contrast">
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
				<el-autocomplete @input='autoInput1' v-model="info.ver1" :disabled="disabled" class="elInput" :fetch-suggestions="fetch" 
					:placeholder="pageTxt.label[3]" :trigger-on-focus="true" @select="idSelect1">
					<div slot-scope="{item}">
						<span>{{item.version}}</span>
					</div>
				</el-autocomplete>
				<label class="txt">{{pageTxt.label[4]}}</label>
				<el-autocomplete @input='autoInput2' v-model="info.ver2" :disabled="disabled" class="elInput" :fetch-suggestions="fetch" 
					:placeholder="pageTxt.label[5]" :trigger-on-focus="true" @select="idSelect2">
					<div slot-scope="{item}">
						<span class="name">{{item.version}}</span>
					</div>
				</el-autocomplete>
				<el-button class='btnS' type='primary' @click='search'>{{pageTxt.label[6]}}</el-button>
				<!--<span class="txt">{{pageTxt.label[7]}}</span>-->
				<label for='autoInput_0' class="el-icon-circle-close clearTXT verClose1"></label>
				<label for='autoInput_1' class="el-icon-circle-close clearTXT verClose2"></label>
			</div>
		</div>
		<el-table stripe border @current-change="currenRow" @selection-change="selectionRow" :data="data" tooltip-effect="dark" highlight-current-row>
			<el-table-column v-if="this.config<3" prop="section" :label="pageTxt.list[0]" width='180px'  show-overflow-tooltip></el-table-column>
			<el-table-column v-if="this.config<3" prop="field" :label="pageTxt.list[1]" width='180px'  show-overflow-tooltip></el-table-column>
			<el-table-column prop="type" :label="pageTxt.list[2]" width='180px'  show-overflow-tooltip></el-table-column>
			<el-table-column prop="detail" :label="pageTxt.list[3]"  show-overflow-tooltip></el-table-column>
		</el-table>
		<div class="_pagination" v-if="max>size">
			<el-pagination @current-change='currentPage' background layout="prev, pager, next, jumper" 
				:current-page.sync='currPage' @size-change="pageSize" :page-size='size' :total="max"></el-pagination>
			<div class="rightTxt">{{paging.before1}}{{max}}{{paging.after}}</div>
		</div>
		<div class="onePage" v-else-if="max>0&&max<=size">{{paging.before2}}{{max}}{{paging.after}}</div>
	</div>
</template>

<script>
import utils     from '@/fbcsViews/libs/utils.js';
import lang      from '@/fbcsViews/language/lang.js';
import kit       from '@/fbcsViews/libs/kit.js';
import fxUtils   from '@/fbcsFxViews/libs/utils.js';


	var pageTxt, _this, _currentPage = 1, autoTime, isVer, verArr1, verArr2, clearTXT;
	pageTxt = 'lang.versionContrast';
	
	var data = {
		pageTxt,
		column: '　',
		idName1: '',
		idName2: '',
		config: '3',
		info: {config:'3', ver1:'', ver2:''},
		data: [/*{type:'verType',detail:'detail'}*/],
		row: {},
		selects: [],
		size: 20,
		currPage: 1,
		max: 0,
		disabled: true
	};
	
	function search(num, size){
		var info = _this.info;
		var param = {
			cmdID: '600064', type: _this.config,
			pageSize: size||_this.size,
			currentPage: num||_currentPage,
			version1: info.ver1,
			version2: info.ver2
		};
		utils.post('mx/version/compare', param, function(data){
//			console.log('版本对比：', data);
			if(data.errcode != 0) {
				_this.data = [];
				_this.max = 0;
				fxUtils.alert({txt: data.errinfo});
				return;
			} 
			_this.data = data.lists;
			_this.max = parseInt(data.totalSize)||_this.data.length;
			_this.currPage = param.currentPage;
			if(data.totalSize==0){
				// utils.weakTips(pageTxt.tips.noChange);
				fxUtils.alert({txt: pageTxt.tips.noChange, type: 1});
			}
		});
	}
	var allList
	function autoInput(str, cb){
//		if(allList){
//			if(isVer == '1') verArr1 = allList;
//			else verArr2 = allList;
//			filt(str, allList, cb);
//			return;
//		}
		var param = {
			url: 'mx/version/queryCompare',
			cmdID: "600062",
			type: _this.config,
			version: str,
			pageSize: 1000,
			currentPage: 1
		};
		utils.post(param, function(data){
//			console.log('自动输入版本：',data);
			if(data.errcode != 0) return console.log(data.errinfo);
			var obj, i, len = data.lists.length;
			for (i = 0; i < len; i++) {
				obj = data.lists[i];
				obj.key = i;
				obj.label = obj.version;
			}
			if(isVer == '1') verArr1 = data.lists;
			else verArr2 = data.lists;
			allList = data.lists;
			filt(str, data.lists, cb);
		});
	}
	function filt(str, data, cb){
		var i,len = data.length,tem=[];
		for (i = 0; i < len; i++) {
			var label = data[i].label.toLocaleLowerCase();
			str = str.toLocaleLowerCase();
			if(label.indexOf(str)!=-1) tem.push(data[i]);
		}
		cb(tem);
	}
	
	export default {
		name: 'message_query',
		data() {
			return data;
		},
		methods: {
			fetch(str, cb){
				clearTimeout(autoTime);
				autoTime = setTimeout(autoInput, 300, str, cb);
			},
			idSelect1(item){
				this.info.ver1 = item.version;
				clearTXT[0].style.display = 'block';
			},
			autoInput1(str){
				isVer = '1';
				clearTXT[0].style.display = str ? 'block' : 'none';
			},
			idSelect2(item){
				this.info.ver2 = item.version;
				clearTXT[1].style.display = 'block';
			},
			autoInput2(str){
				isVer = '2';
				clearTXT[1].style.display = str ? 'block' : 'none';
			},
			search(){
				var tips = pageTxt.tips, info = this.info;
//				if(!hasVer(info.ver1,verArr1)) return utils.weakTips(tips.ver1);
//				if(!hasVer(info.ver2,verArr2)) return utils.weakTips(tips.ver2);
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
		    	this.size = val;
		    	search();
		    },
			currentPage(val){
				_currentPage = val;
				search();
			}
		},
		created(){
			let l = lang();
			this.pageTxt = pageTxt = l.versionContrast;
			this.paging = l.publics.paging;
			this.disabled = true;
		},
		mounted(){
			_this = this;
			init('1');
			_this.config = '1';
			kit('.contrast .ver .el-autocomplete input').each((el, i)=>{
				el.id = 'autoInput_' + i;
			});
			clearTXT = kit('.contrast .clearTXT').click((e)=>{
				if(e.target.getAttribute('for') == 'autoInput_0'){
					_this.info.ver1 = _this.idName1 = '';
				} else _this.info.ver2 = _this.idName2 = '';
				e.target.style.display = 'none';
			});
		},
		watch: {
			config(cur, old){
				init(cur);
				clearTXT.hide();
			}
		}
	};
	
	function hasVer(str, arr){
		var i, len = arr.length;
		for (i = 0; i < len; i++) {
			if(arr[i].version == str) return true;
		}
		return false;
	}
	function init(val){
		_this.data = [];
		verArr1 = [];
		verArr2 = [];
		if(val=='3'||val=='4'){
			_this.disabled = false;
			_this.info.ver1 = _this.info.ver2 ='';
		} else {
			_this.disabled = true;
			_this.info.ver1 = _this.$t('fbcsFile.versionContrast.temp');
			_this.info.ver2 = _this.$t('fbcsFile.versionContrast.online');
		}
		_this.max = 0;
		_currentPage = 1;
	}
</script>

<style scoped="scoped">
	.contrast{padding: 0 20px;white-space: nowrap;color: #666;min-width: 809px;}
	.h2{font-size: 16px;line-height: 44px;color: #666;font-weight: bold;}
	.searchBox *{vertical-align: middle;}
	.select{width: 180px;}
	.elInput{width: 240px;line-height: 1;margin-right: 35px;}
	.txt{font-size: 14px;line-height: 30px;padding-right: 10px;}
	.el-input{width: 180px;line-height: 30px;}
	.ver{margin: 10px 0;}
	.btnS{margin-left: 10px;line-height: 30px;padding: 0 14px;margin-right: 20px;}
	.btnTxt{color: #5a769e;}
	.el-button *{vertical-align: middle;}
	.clearTXT{display: none;font-size: 14px;color: #CCC;position: absolute;top: 8px;z-index: 1;}
	.verClose1{left: 298px;}
	.verClose2{left: 654px;}
</style>
