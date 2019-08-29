<template>
	<div class="userSet">
		<input class="opacity0" />
		<div class="searchBox">
			<!--<h2 class="h2">{{pageTxt.label[0]}}</h2>-->
			<hr class="_hr" />
			<label class="txt">{{pageTxt.label[1]}}</label>
			<span class="m35">
				<el-autocomplete auto-complete="off" @input='autoInput' class="elInput m0" v-model="idName" :fetch-suggestions="fetch" 
					:trigger-on-focus="true" @select="idSelect" :maxlength="parseInt(128)">
					<div slot-scope="{item}">
						<span>{{item.userID}}</span>
					    <span>({{item.userName}})</span>
					</div>
				</el-autocomplete>
				<label class="el-icon-circle-close clearInput"></label>
			</span>
			<!--<label class="txt">{{pageTxt.label[2]}}</label>
			<el-input auto-complete="off" placeholder="" v-model="userName"></el-input>-->
			<button class='blueBtn' type='primary' @click='search'>{{pageTxt.label[3]}}</button>
			<!--<label class="txt">{{pageTxt.label[4]}}</label>
			<span class="txt">{{max}}</span>-->
			
		</div>
		<div class="btnBox">
			<!--<el-button @click='editAll' class='btn' type='text'>
				<img src="../../../img/theme/edit_1.png"/>
				<span class="btnTxt">{{pageTxt.label[5]}}</span>
			</el-button>-->
		</div>
		<el-table @current-change="currenRow" @selection-change="selectionRow" :data="data"	stripe border tooltip-effect="dark">
			<!--<el-table-column width="50" :label="column" type="index"></el-table-column>-->
			<!--<el-table-column type="selection" width="55"></el-table-column>-->
			<el-table-column prop="userID" :label="pageTxt.list[0]"  show-overflow-tooltip></el-table-column>
			<el-table-column prop="userName" :label="pageTxt.list[1]"  show-overflow-tooltip></el-table-column>
			<el-table-column prop="maxPubsCount" :label="pageTxt.list[2]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="maxSubsCount" :label="pageTxt.list[3]" show-overflow-tooltip></el-table-column>
			<el-table-column prop="maxDaysOfTopic" :label="pageTxt.list[4]" show-overflow-tooltip></el-table-column>
			<el-table-column :label="pageTxt.list[5]" width='60'>
				<div slot-scope="scope" class="_zero">
					<!-- <el-tooltip :content="pageTxt.label[5]" placement="bottom" effect="light"> -->
						<img @click="edit(scope.row)" src="@/fbcsViews/img/theme/edit_2.png" :title="pageTxt.label[5]" alt="">
					<!-- </el-tooltip> -->
				</div>
			</el-table-column>
		</el-table>
		<div class="_pagination" v-if="max>size">
			<el-pagination @current-change='currentPage' @size-change="pageSize" :page-size='size' :total="max" 
				:current-page.sync='currPage' layout="prev, pager, next, jumper" background></el-pagination>
			<div class="rightTxt">{{paging.before1}}{{max}}{{paging.after}}</div>
		</div>
		<div class="onePage" v-else-if="max>0&&max<=size">{{paging.before2}}{{max}}{{paging.after}}</div>
		<!--<div id="err">
			<div class="_whellError">
				<div class="tit">
					<i class="l1">serviceID</i>
					<i class="l1">errcode</i>
					<i class="l1">errinfo</i>
				</div>
				<ul>
					<li>
						<i class="l1">{serviceID}</i>
						<i class="l1">{errcode}</i>
						<i class="l1">{errinfo}</i>
					</li><li>
						<i class="l2">{serviceID}</i>
						<i class="l2">{errcode}</i>
						<i class="l2">{errinfo}</i>
						<i class="l2">{type}</i>
					</li>
				</ul>
			</div>
		</div>-->
	</div>
</template>

<script>
import utils    from '@/fbcsViews/libs/utils.js';
import lang     from '@/fbcsViews/language/lang.js';
import globalVar  from '@/fbcsViews/libs/globalVar.js';
import fxUtils   from '@/fbcsFxViews/libs/utils.js';
	

	var pageTxt, _this, autoTime, _currentPage = 1, isInput = false;
	
	var data = {
		pageTxt,
		column: '　',
		userID: '',
		userName: '',
		idName: '',
		data: [/*{userID:'用户ID',userName:'用户名称',maxPubsCount:'允许发布主题个数',maxSubsCount:'允许订阅主题个数',maxDaysOfTopic:'发布主题有效天数'}*/],
		row: '',
		selects: [],
		size: 20,
		currPage: 1,
		max: 0,
	};

	function autoInput(str, cb){
//		str = str.replace(/\s/g, '');
//		if(!str) return;
//		console.time('请求用户ID...');
		utils.getUserid(str, function(data){
//			console.log('用户ID data',data);
			var i,len = data.length,tem=[];
			for (i = 0; i < len; i++) {
				var label = data[i].label.toLocaleLowerCase();
				str = str.toLocaleLowerCase();
				if(label.indexOf(str)!=-1) tem.push(data[i]);
			}
			cb(tem);
//			console.timeEnd('请求用户ID...');
		});
	}
	
	export default {
		name: 'message_userSet',
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
				this.userID = item.userID;
				// this.idName = item.userID+'('+item.userName+')';
				this.idName = item.userID;
			},
			autoInput(str){
				isInput = true;
				var clear = document.querySelector('.userSet .clearInput');
				if(clear) clear.style.display = 'block';
//				if(str){
//					setTimeout(function(){
//						_this.idName = str.replace(/\s/g, '');
//					}, 0);
//				}
			},
			search(){
				search(_currentPage=1);
				this.currPage = 1;
			},
			currenRow(row){
				this.row = row;
//				console.log(row)
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
			editAll(){
				var row = this.selects;
				if(row.length != 1){
					// utils.weakTips(this.pageTxt.tips.user);
					fxUtils.alert({txt: this.pageTxt.tips.user});
					return;
				}
				this.$store.state.tabv = 'v1';
				this.$store.state.transferEditID = row[0].userID;
				this.$store.state.editBack = "/main/mxCfg/message/userSet";
				// this.$store.state.HeaderText = "修改用户";
				utils.goto('/message/userEdit/mess_userSet');
			},
			edit(row){
				this.$store.state.tabv = 'v1';
				this.$store.state.transferEditID = row.userID;
				this.$store.state.editBack = "/main/mxCfg/message/userSet";
				// this.$store.state.HeaderText = "修改用户";
				globalVar.set('cache_user', {
					id: isInput ? _this.idName : _this.userID,
					name: '',
					page: _this.currPage
				});
				utils.goto('/message/userEdit/mess_userSet');
			}
		},
		created(){
			let l = lang();
			this.pageTxt = pageTxt = l.themeUserSet;
			this.paging = l.publics.paging;
		},
		mounted(){
//			utils.weakTips(document.querySelector('#err').innerHTML, 0 , '0');
			_this = this;
			this.size = 20;
			initParam();
			search(_currentPage);
			var btn = utils.clearInput({
				pos: '.userSet',
				id: '#el-auto',
				clas: '.clearInput',
//				parent: '.userSet .searchBox'
			});
			btn.clear(e => {
				_this.userID = _this.idName = '';
			});
		}
	};
	function initParam(){
		var cache = globalVar.get('cache_user');
		if(cache){
			_this.idName = _this.userID = cache.id;
			_currentPage = cache.page;
		}else {
			_this.idName = _this.userID = '';
			_currentPage = 1;
		}
	}
	function search(num, size){
		var userID = isInput ? _this.idName : _this.userID;
		var info = {
			cmdID: '600041', userID: userID,
			pageSize: size||_this.size,
			currentPage: num||_currentPage,
		};
		utils.post('mx/userPsConfig/query', info, function(data){
//			console.log('订阅配置：',data);
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
</script>

<style scoped="scoped">
	.userSet{padding: 0 20px;white-space: nowrap;color: #666;min-width: 900px;}
	.h2{font-size: 16px;line-height: 44px;color: #666;font-weight: bold;}
	.searchBox *{vertical-align: middle;}
	.txt{font-size: 14px;line-height: 30px;padding-right: 10px;}
	.elInput{width: 240px;line-height: 1;margin-right: 35px;}
	.blueBtn{margin-right: 35px;}
	.btnBox{padding: 10px 0;}
	.btn{margin-right: 35px;margin-left: 0;padding: 0;}
	.btnTxt{vertical-align: middle;color: #5a769e;line-height: 30px;height: 30px;}
	.el-button *{vertical-align: middle;}
	._zero img{margin-right: 15px;}
	.clearInput{bottom: 8px;right:8px;}
	.m35{margin-right: 35px;}
	.m0{margin: 0;}
</style>
