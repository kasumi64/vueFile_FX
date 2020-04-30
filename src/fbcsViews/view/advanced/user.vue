<template>
	<div class="advancedUser">
		<header class="backHead">
			<span class="back" @click="back">&lt; {{$t('fbcsFile.tips.back')}}</span>
			<b class="h1">{{this.$t('fbcsFile.advanced.user.title')}}</b>
		</header>
		<div class="searchBar">
			<label class="label">{{$t('fbcsFile.advanced.user.userID')}}</label>
			<input v-model="info.userID" class="words" :placeholder="$t('fbcsFile.searchBar.placeholder')" autocomplete="off"/>
			<label class="label">{{$t('fbcsFile.advanced.user.userName')}}</label>
			<input v-model="info.userName" class="words" :placeholder="$t('fbcsFile.searchBar.placeholder')" autocomplete="off"/>
			<!-- <label class="label">{{$t('fbcsFile.userInfo.encFlag')}}</label>
			<el-select v-model="info.encFlag" class="words">
				<el-option v-for="item in encSelect" :key="item.id" :label="item.name" :value="item.id">
				</el-option>
			</el-select> -->
			<label class="label">{{$t('fbcsFile.advanced.user.userType')}}</label>
			<el-select v-model="info.userType" class="words">
				<el-option v-for="item in userType" :key="item.id" :label="item.name" :value="item.id">
				</el-option>
			</el-select>
			<p class="jg"></p>
			<label class="label">{{$t('fbcsFile.advanced.user.inZone')}}</label>
			<el-select v-model="info.userDistrict" class="words">
				<el-option v-for="item in userDistrict" :key="item.id" :label="item.name" :value="item.id">
				</el-option>
			</el-select>
			<label class="label">{{$t('fbcsFile.advanced.user.linkGroupName')}}</label>
			<el-select v-model="info.connSuGroupName" class="words">
				<el-option v-for="item in group" :key="item" :label="item" :value="item">
				</el-option>
			</el-select>
			<button class="blueBtn mr20" @click="search">{{$t('fbcsFile.searchBar.search')}}</button>
		</div>
		<ul class="fnField">
			<li @click="expcsv">
				<img class="icon" src="@/fbcsFxViews/img/FnIcon/exportBasicInformation.png"/>
				<span class="label">{{$t('fbcsFile.advanced.user.expcsv')}}</span>
			</li>
		</ul>
		<lgy-table :list="list" :title="title" :sortable="sortable" @sortChange="sortChange" 
			:total="total" :currentPage="page" @changePage="changePage">
		</lgy-table>
		<el-dialog :visible.sync="showDialog" width="600px" :title="$t('fbcsFile.advanced.user.expcsv')" v-dialogDrag :close-on-click-modal='false' :show-close="false">
			<ul class="_dialog">
				<li>
					<span class="txt w80">{{$t('fbcsFile.advanced.user.fileName')}}</span>
					<a class="a" :href="fileHref">{{fileName}}</a>
				</li><li>
					<p class="txt rClick">{{$t('fbcsFile.tips.rightClick')}}</p>
				</li>
			</ul>
			<div slot="footer" class="_footBtn">
				<button class="defBtn" @click="showDialog=false">{{$t('fbcsFile.tips.close')}}</button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';
import moment from 'moment';

var _this, userDict, inZone;


export default {
	data(){
		var bingo = {
			list: [
				{userID: 'userID', userName: 'userName', userType: 'ekeyName',userDistrict: 'inZone', speedCtrl: 'ekeyComment'}
			],
			page: 1, total: 1,
			info: {
				userID: '', userName: '', userType: '', userDistrict: '', connSuGroupName: '', encFlag: 0, sortType: 0
			},
			userType: [], userDistrict: [], group: [],
			showDialog: false,
			fileHref: '#', fileName: '',
			sortable: {
				ymdBegin: 1, ymdEnd: 1
			},
			encSelect: []
		};
		bingo.title = {
			userID: this.$t('fbcsFile.tableTitle.userID'),
			userName: this.$t('fbcsFile.tableTitle.userName'),
			userType: this.$t('fbcsFile.tableTitle.userType'),
			userDistrict: this.$t('fbcsFile.tableTitle.inZone'),
			connSuGroupName: this.$t('fbcsFile.tableTitle.group'),
			speedCtrlKbps: this.$t('fbcsFile.tableTitle.speed'),
			// encLabel: this.$t('fbcsFile.tableTitle.encFlag'),
			ymdBegin: this.$t('fbcsFile.tableTitle.beginTime'),
			ymdEnd: this.$t('fbcsFile.tableTitle.endTime')
		};
		bingo.encSelect = this.$t('fbcsFile.advanced.user.encSelect');
		bingo.labelAll = this.$t('fbcsFile.tips.labelAll');
		bingo.arbitratily = this.$t('fbcsFile.tips.arbitratily');
		return bingo;
	},
	methods:{
		back(){
			this.$router.push({path: '/main/mxCfg/user'});
		},
		search(){
			this.page = 1;
			search();
		},
		changePage(num){
			this.page = num;
			search();
		},
		expcsv(){
			this.showDialog = true;
			this.fileName = '';
			let param = Object.assign({}, this.info);
			param.url = 'advancedSearch/userinfo';
			param.cmdID = '600051';
			param.pageSize = _this.total;
			param.currentPage = 1;
			param.type = 1;
			param.language = utils.langCode();
			
			if(param.connSuGroupName == this.labelAll) param.connSuGroupName = 'all';
			else if(param.connSuGroupName == this.arbitratily) param.connSuGroupName = '';
			
			utils.post(param).then(res => {
				if(res.errcode!='0') return utils.alert({txt: res.errinfo});
				if(!res.errinfo) return;
				_this.fileHref = res.errinfo;
				_this.fileName = res.errinfo.split('/').pop();
			});
		},
		sortChange(column, prop, order){
			var info = this.info;
			if(order == 'ascending'){
				if(prop == 'ymdBegin') info.sortType = 1;
				else if(prop == 'ymdEnd') info.sortType = 3;
			} else if(order == 'descending'){
				if(prop == 'ymdBegin') info.sortType = 2;
				else if(prop == 'ymdEnd') info.sortType = 4;
			} else {
				info.sortType = 0;
			}
			this.search();
		}
	},
	created(){
		_this = this;
		this.list = [];
		initDate();
		getDict();
	}
}

function search(){
	let param = Object.assign({}, _this.info);
	param.url = 'advancedSearch/userinfo';
	param.cmdID = '600051';
	param.pageSize = 20;
	param.currentPage = _this.page;
	param.type = 0;
	param.language = utils.langCode();
	
	if(param.connSuGroupName == _this.labelAll) param.connSuGroupName = 'all';
	else if(param.connSuGroupName == _this.arbitratily) param.connSuGroupName = '';
	
	utils.post(param).then(function(res){
		if(res.errcode!='0') { //清缓存历史
			_this.list = [];
			_this.page = 1;
			_this.total = 0;
			return console.warn(res.errcode, res.errinfo);
		}
		if(res.totalPage>0 && _this.page > res.totalPage){
			_this.page = res.totalPage;
			return search();
		}
		let i, len = res.lists.length, obj;
		// let soft = _this.$t('fbcsFile.advanced.user.soft'),
		// 	hard = _this.$t('fbcsFile.advanced.user.hard');
		for (i = 0; i < len; i++) {
			obj = res.lists[i];
			// obj.encLabel = obj.encFlag == 1 ? hard : soft;
			if(obj.softEncBeginDate){
				obj.ymdBegin = moment(obj.softEncBeginDate * 1000).format('YYYY-MM-DD HH:mm:ss');
			} else  obj.softEncBeginDate = obj.ymdBegin = '';
			if(obj.softEncEndDate){
				obj.ymdEnd = moment(obj.softEncEndDate * 1000).format('YYYY-MM-DD HH:mm:ss');
			} else obj.softEncEndDate = obj.ymdEnd = '';
			obj.userType = userDict[obj.userType];
			obj.userDistrict = inZone[obj.userDistrict];
		}
		_this.list = res.lists;
		_this.page = res.currentPage;
		_this.total = res.totalSize;
	});
}

function initDate(){
	let info = _this.info;
	for (let k in info) info[k] = '';
	info.userType = '',
	info.userDistrict = 'all',
	info.connSuGroupName = _this.labelAll,
	info.encFlag = 0;
	info.sortType = 0;
	_this.showDialog = false;
}

async function getDict(){
	var params, url = 'dict/query', cmdID = '600000',
	language = utils.langCode();
	params = { url, cmdID, language, type: 1 };
	await utils.post(params).then(function(res){
		if(res.errcode!='0') return console.warn(res.errcode, res.errinfo);
		res.lists.unshift({name:_this.labelAll, id:''});
		userDict = {};
		for (let i = 0; i < res.lists.length; i++) {
			let o = res.lists[i];
			userDict[o.id] = o.name;
		}
		_this.userType = res.lists;
	});
	
	params= { url, cmdID, language, type: 2 };
	await utils.post(params).then(function(res){
		if(res.errcode!='0') return console.warn(res.errcode, res.errinfo);
		// res.lists.unshift({name:_this.arbitratily, id:''});
		res.lists.unshift({name:_this.labelAll, id:'all'});
		inZone = {};
		for (var i = 0; i < res.lists.length; i++) {
			let o = res.lists[i];
			inZone[o.id] = o.name;
		}
		_this.userDistrict = res.lists;
	});
	
	params = {
		url: 'suConfig/queryGroupID',
		cmdID: '600083'
	};
	utils.post(params).then(function(res){
		if(res.errcode!='0') return console.warn(res.errcode, res.errinfo);
		let i, arr = res.lists, length = arr.length;
		let obj = {} // 去重
		obj[_this.labelAll] = _this.labelAll;
		for (i = 0; i < length; i++) {
			let o = res.lists[i];
			obj[arr[i].groupID] = arr[i].groupID;
		}
		_this.group = obj;
	});
	
	_this.search();
}
</script>

<style scoped="scoped">
	.advancedUser{min-width: 1010px;margin: 20px;}
	.jg{margin-bottom: 10px;}
	.w80{width: 122px;text-align: right;}
</style>
