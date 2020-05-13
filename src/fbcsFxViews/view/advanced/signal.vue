<template>
	<div class="advancedEkey">
		<header class="backHead">
			<span class="back" @click="back" id="back">&lt; {{$t('fbcsFile.tips.back')}}</span>
			<b class="h1">{{this.$t('fbcsFile.advanced.signal.title')}}</b>
		</header>
		<div class="searchBar">
			<label class="label">{{$t('fbcsFile.advanced.user.userID')}}</label>
			<lgy-candidateWords v-model="userID" :keywords="idWords" @input="idInput" class="words" ></lgy-candidateWords>
			<label class="label">{{$t('fbcsFile.advanced.user.userName')}}</label>
			<!-- <input v-model="userName" class="words" :placeholder="$t('fbcsFile.searchBar.placeholder')" autocomplete="off"/> -->
			<lgy-candidateWords v-model="userName" id="userName" :keywords="nameWords" @input="nameInput" class="words" ></lgy-candidateWords>
			<button class="blueBtn words" @click="search" id="search">{{$t('fbcsFile.searchBar.search')}}</button>
		</div>
		<ul class="fnField">
			<li @click="expcsv" id="expcsv">
				<img class="icon" src="@/fbcsFxViews/img/FnIcon/exportSignal.png"/>
				<span class="label">{{$t('fbcsFile.advanced.signal.expcsv')}}</span>
			</li>
		</ul>
		<lgy-table :list="list" :title="title" :total="total" :currentPage="page" @changePage="changePage" >
		</lgy-table>
		<el-dialog :visible.sync="showDialog" :title="$t('fbcsFile.advanced.signal.expcsv')" v-dialogDrag :close-on-click-modal='false' :show-close="false">
			<ul class="_dialog">
				<li>
					<span class="txt w80">{{$t('fbcsFile.advanced.user.fileName')}}</span>
					<a class="a" :href="fileHref">{{fileName}}</a>
				</li><li>
					<p class="txt rClick">{{$t('fbcsFile.tips.rightClick')}}</p>
				</li>
			</ul>
			<div slot="footer" class="_footBtn">
				<button class="defBtn" @click="showDialog=false" id="close">{{$t('fbcsFile.tips.close')}}</button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';
import moment from 'moment';

var _this, idAll = [];

export default {
	data(){
		let bingo = {
			list: [
				{userID1: 'userID', userName1: 'userName', userID2: 1535646546566, userName2: 'ekeyComment'}
			],
			page: 1, total: 1,
			userID: '', userName: '',
			idWords: null,
			nameWords: null,
			showDialog: false,
			fileHref: '#', fileName: ''
		};
		
		bingo.title = {
			userID1: this.$t('fbcsFile.tableTitle.userID'),
			userName1: this.$t('fbcsFile.tableTitle.userName'),
			userID2: this.$t('fbcsFile.tableTitle.userID'),
			userName2: this.$t('fbcsFile.tableTitle.userName'),
			buildTime: this.$t('fbcsFile.tableTitle.buildTime')
		};
		return bingo;
	},
	methods:{
		back(){
			this.$router.push({path: '/main/fxCfg/relation'});
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
		nameInput(userName){
			let params = {
				userID: userName,
				userName,
			};
			utils.keywords(params, {
				label: ['userName','userID'],
				value: 'userName'
			}).then(arr => {
				_this.nameWords = arr;
			});
		},
		expcsv(){
			this.showDialog = true;
			this.fileName = '';
			let param = {};
			param.url = 'advancedSearch/usercomm';
			param.cmdID = '600053';
			param.pageSize = _this.total;
			param.currentPage = 1;
			param.type = 1;
			param.userID = _this.userID;
			param.userName = _this.userName;
			
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
		this.userID = this.userName = '';
		this.list = [];
		this.nameWords = null;
		this.search();
		utils.keywords({}, arr => {
			idAll = [].concat(arr);
			_this.idWords = arr;
		});
	}
}

function search(){
	let param = {};
	param.url = 'advancedSearch/usercomm';
	param.cmdID = '600053';
	param.pageSize = 20;
	param.currentPage = _this.page;
	param.type = 0;
	param.userID = _this.userID;
	param.userName = _this.userName;
	
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
		for (var i = 0; i < res.lists.length; i++) {
			let obj = res.lists[i];
			obj.buildTime = moment(obj.commConfigDate * 1000).format('YYYY-MM-DD HH:mm:ss');
		}
		_this.list = res.lists;
		_this.page = res.currentPage;
		_this.total = res.totalSize;
	});
}

</script>

<style scoped="scoped">
	.advancedEkey{min-width: 688px;}
	.w80{width: 122px;text-align: right;}
</style>
