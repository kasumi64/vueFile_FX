<template>
	<div class="advancedUser">
		<div class="searchBar">
			<label class="label">{{$t('fbcsFile.advanced.user.userID')}}</label>
			<input v-model="info.userID" class="words" :placeholder="$t('fbcsFile.searchBar.placeholder')" autocomplete="off"/>
			<label class="label">{{$t('fbcsFile.advanced.user.userName')}}</label>
			<input v-model="info.userName" class="words" :placeholder="$t('fbcsFile.searchBar.placeholder')" autocomplete="off"/>
			<p class="jg"></p>
			<label class="label">{{$t('fbcsFile.advanced.user.userType')}}</label>
			<el-select v-model="info.userType" class="words">
				<el-option v-for="item in userType" :key="item.id" :label="item.name" :value="item.id">
				</el-option>
			</el-select>
			<label class="label">{{$t('fbcsFile.advanced.user.inZone')}}</label>
			<el-select v-model="info.inZone" class="words">
				<el-option v-for="item in inZone" :key="item.id" :label="item.name" :value="item.id">
				</el-option>
			</el-select>
			<label class="label">{{$t('fbcsFile.advanced.user.linkGroupName')}}</label>
			<el-select v-model="info.linkGroupName" class="words">
				<el-option v-for="item in group" :key="item.groupID" :label="item.groupID" :value="item.groupID">
				</el-option>
			</el-select>
			<button class="blueBtn words" @click="search">{{$t('fbcsFile.searchBar.search')}}</button>
		</div>
		<ul class="fnField">
			<li @click="expcsv">
				<img class="icon" src="@/fbcsFxViews/img/FnIcon/exportBasicInformation.png"/>
				<span class="label">{{$t('fbcsFile.advanced.user.expcsv')}}</span>
			</li>
		</ul>
		<lgy-table :list="list" :title="title" :total="total" :currentPage.sync="page" @changePage="changePage" >
		</lgy-table>
		<el-dialog :visible.sync="showDialog" :title="$t('fbcsFile.advanced.user.expcsv')" v-dialogDrag :close-on-click-modal='false' :show-close="false">
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

var _this, data = {
	list: [
		{userID: 'userID', userName: 'userName', userType: 'ekeyName',inZone: 1535646546566, speedCtrl: 'ekeyComment'}
	],
	page: 1, total: 1,
	info: {
		userID: '', userName: '', userType: '', inZone: '', linkGroupName: ''
	},
	userType: [], inZone: [], group: [],
	showDialog: false,
	fileHref: '#', fileName: ''
};
var userDict;


export default {
	data(){
		data.title = {
			userID: this.$t('fbcsFile.tableTitle.userID'),
			userName: this.$t('fbcsFile.tableTitle.userName'),
			userType: this.$t('fbcsFile.tableTitle.userType'),
			inZone: this.$t('fbcsFile.tableTitle.inZone'),
			linkGroupName: this.$t('fbcsFile.tableTitle.group'),
			speedCtrl: this.$t('fbcsFile.tableTitle.speed'),
			encLabel: this.$t('fbcsFile.tableTitle.encFlag'),
			ymdBegin: this.$t('fbcsFile.tableTitle.beginTime'),
			ymdEnd: this.$t('fbcsFile.tableTitle.endTime')
		};
		return data;
	},
	methods:{
		search(){
			this.page = 1;
			search();
		},
		changePage(num){
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
			
			if(param.linkGroupName == '全部') param.linkGroupName = 'all';
			else if(param.linkGroupName == '任意') param.linkGroupName = '';
			
			utils.post(param).then(res => {
				if(res.errcode!='0') return utils.alert({txt: res.errinfo});
				if(!res.errinfo) return;
				_this.fileHref = res.errinfo;
				_this.fileName = res.errinfo.split('/').pop();
			});
		},
	},
	created(){
		_this = this;
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
	
	if(param.linkGroupName == '全部') param.linkGroupName = 'all';
	else if(param.linkGroupName == '任意') param.linkGroupName = '';
	
	utils.post(param).then(function(res){
		if(res.errcode!='0') return console.warn(res.errcode, res.errinfo);
		if(res.totalPage>1 && _this.page > res.totalPage){
			_this.page = res.totalPage;
			return search();
		}
		let i, len = res.lists.length, obj;
		let soft = _this.$t('fbcsFile.advanced.user.soft'),
			hard = _this.$t('fbcsFile.advanced.user.hard');
		for (i = 0; i < len; i++) {
			obj = res.lists[i];
			obj.encLabel = obj.encFlag ? hard : soft;
			if(obj.beginSoftEncTime){
				obj.ymdBegin = moment(obj.beginSoftEncTime * 1000).format('YYYY-MM-DD HH:mm:ss');
			} else  obj.beginSoftEncTime = obj.ymdBegin = '';
			if(obj.endSoftEncTime){
				obj.ymdEnd = moment(obj.endSoftEncTime * 1000).format('YYYY-MM-DD HH:mm:ss');
			} else obj.endSoftEncTime = obj.ymdEnd = '';
			obj.userType = userDict[obj.userType];
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
	info.inZone = 'all',
	info.linkGroupName = '全部',
	
	_this.showDialog = false;
}

function getDict(){
	var params, url = 'dict/query', cmdID = '600000',
	language = utils.langCode();
	params = { url, cmdID, language, type: 1 };
	utils.post(params).then(function(res){
		if(res.errcode!='0') return console.warn(res.errcode, res.errinfo);
		res.lists.unshift({name:'全部', id:''});
		userDict = {};
		for (var i = 0; i < res.lists.length; i++) {
			var o = res.lists[i];
			userDict[o.id] = o.name;
		}
		_this.search();
		_this.userType = res.lists;
	});
	
	params= { url, cmdID, language, type: 2 };
	utils.post(params).then(function(res){
		if(res.errcode!='0') return console.warn(res.errcode, res.errinfo);
		res.lists.unshift({name:'任意', id:''});
		res.lists.unshift({name:'全部', id:'all'});
		_this.inZone = res.lists;
	});
	
	params = {
		url: 'cuConfig/queryGroupID',
		cmdID: '600093'
	};
	utils.post(params).then(function(res){
		if(res.errcode!='0') return console.warn(res.errcode, res.errinfo);
		res.lists.unshift({groupID: '任意'});
		res.lists.unshift({groupID: '全部'});
		_this.group = res.lists;
	});
}
</script>

<style scoped="scoped">
	.advancedUser{min-width: 1010px;}
	.jg{margin-bottom: 10px;}
	.w80{width: 80px;text-align: right;}
</style>