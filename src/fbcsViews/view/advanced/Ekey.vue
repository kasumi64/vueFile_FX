<template>
	<div class="advancedEkey">
		<header class="backHead">
			<span id="back" class="back" @click="back">&lt; {{$t('fbcsFile.tips.back')}}</span>
			<b class="h1">{{this.$t('fbcsFile.advanced.Ekey.title')}}</b>
		</header>
		<div class="searchBar">
			<label class="label">{{$t('fbcsFile.advanced.user.userID')}}</label>
			<lgy-candidateWords v-model="userID" :keywords="idWords" @input="idInput" class="words" ></lgy-candidateWords>
			<label class="label">{{$t('fbcsFile.advanced.Ekey.ekeyName')}}</label>
			<label class="label">{{prefix}}</label>
			<lgy-candidateWords id="ekeyName" v-model="ekeyName" :keywords="ekNames" @input="ekNameInput" class="words"></lgy-candidateWords>
			<button id="search" class="blueBtn mr20" @click="search">{{$t('fbcsFile.searchBar.search')}}</button>
		</div>
		<ul class="fnField">
			<li id="expcsv" @click="expcsv">
				<img class="icon" src="@/fbcsFxViews/img/FnIcon/exportEkey.png"/>
				<span class="label">{{$t('fbcsFile.advanced.Ekey.expcsv')}}</span>
			</li>
		</ul>
		<lgy-table :list="list" :title="title" :total="total" :currentPage="page" @changePage="changePage" >
		</lgy-table>
		<el-dialog :visible.sync="showDialog" width="600px" :title="$t('fbcsFile.advanced.Ekey.expcsv')" v-dialogDrag :close-on-click-modal='false' :show-close="false">
			<ul class="_dialog">
				<li>
					<span class="txt w80">{{$t('fbcsFile.advanced.user.fileName')}}</span>
					<a id="alink" class="a" :href="fileHref">{{fileName}}</a>
				</li><li>
					<p class="txt rClick">{{$t('fbcsFile.tips.rightClick')}}</p>
				</li>
			</ul>
			<div slot="footer" class="_footBtn">
				<button id="close" class="defBtn" @click="showDialog=false">{{$t('fbcsFile.tips.close')}}</button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';
import moment from 'moment';

var _this, data = {
	list: [
		{userID: 'userID', ekeyName: 'userName', ymd: 1535646546566, comment: 'ekeyComment'}
	],
	page: 1, total: 1,
	userID: '', ekeyName: '',
	idWords: null,
	ekNames: null,
	showDialog: false,
	fileHref: '#', fileName: '',
	isOpenEkeyPrefix: 1,
	prefix: '/C=CN/CN='
};
var idAll = [];

export default {
	data(){
		data.title = {
			userID: this.$t('fbcsFile.tableTitle.userID'),
			userName: this.$t('fbcsFile.tableTitle.userName'),
			ekeyName: this.$t('fbcsFile.tableTitle.ekeyName'),
			ymd: this.$t('fbcsFile.tableTitle.ekeyDate'),
			comment: this.$t('fbcsFile.tableTitle.ekeyInfo')
		};
		return data;
	},
	methods:{
		back(){
			this.$router.push({path: '/main/fxCfg/Ekey'});
		},
		search(){
			this.page = 1;
			search();
		},
		changePage(num){
			this.page = num;
			search();
		},
		idInput(val){
			if(val=='') return this.idWords = [].concat(idAll);
			utils.keywords({id: val}, arr => {
				_this.idWords = arr;
			});
		},
		ekNameInput(ekeyName){
			let params = {
				url: 'userEkey/query',
				cmdID: '600031',
				userID: '',
				ekeyName,
				type: 0
			};
			utils.keywords(params, {
				label: ['ekeyName'],
				value: 'ekeyName'
			}).then(arr => {
				let reg = new RegExp('^'+this.prefix, 'i');
				arr.forEach((item)=>{
					item.value = item.label = item.ekeyName.replace(reg, '');
				});
				_this.ekNames = arr;
			});
		},
		expcsv(){
			this.showDialog = true;
			this.fileName = '';
			let param = {};
			param.url = 'advancedSearch/userekey';
			param.cmdID = '600052';
			param.pageSize = _this.total;
			param.currentPage = 1;
			param.type = 1;
			param.userID = _this.userID;
			param.ekeyName = this.prefix + _this.ekeyName;
			
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
		this.userID = this.ekeyName = '';
		this.ekNames = null;
		this.list = [];
		prefix();
	}
}

function prefix(){
	var param = {
		url: 'userEkey/isOpenEkeyPrefix',
		cmdID: '600029'
	};
	utils.post(param).then(res => {
		if(res.errcode!='0') return utils.alert({txt: res.errinfo});
		utils.keywords({}, arr => {
			_this.prefix = res.isOpenEkeyPrefix !=0 ? '/C=CN/CN=' : '';
			_this.search();
			idAll = [].concat(arr);
			_this.idWords = arr;
		});
	});
}

function search(){
	let param = {};
	param.url = 'advancedSearch/userekey';
	param.cmdID = '600052';
	param.pageSize = 20;
	param.currentPage = _this.page;
	param.type = 0;
	param.userID = _this.userID;
	param.ekeyName = _this.prefix + _this.ekeyName;
	
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
		for (i = 0; i < len; i++) {
			obj = res.lists[i];
			if(obj.ekeyValidDate){
				obj.ymd = moment(obj.ekeyValidDate * 1000).format('YYYY-MM-DD HH:mm:ss');
			} else  obj.ekeyValidDate = obj.ymd = '';
		}
		_this.list = res.lists;
		_this.page = res.currentPage;
		_this.total = res.totalSize;
	});
}

</script>

<style scoped="scoped">
	.advancedEkey{min-width: 688px;margin: 20px;}
	.w80{width: 122px;text-align: right;}
</style>
