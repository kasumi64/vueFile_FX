<template>
	<div class="">
		<header class="backHead">
			<span class="back" @click="back">&lt; {{$t('fbcsFile.tips.back')}}</span>
			<b class="h1">{{this.$t('fbcsFile.advanced.Ekey.title')}}</b>
		</header>
		<div class="searchBar">
			<label class="label">{{$t('webu.com.id')}}</label>
			<lgy-candidateWords v-model="userID" :keywords="idList" @input="idInput" class="words" ></lgy-candidateWords>
			<label class="label">{{$t('webu.com.ip')}}</label>
			<lgy-candidateWords v-model="userIP" :keywords="ipList" @input="iPInput" class="words" ></lgy-candidateWords>
			<button class="blueBtn" @click="search">{{$t('fbcsFile.searchBar.search')}}</button>
		</div>
		<lgy-table :list="tableList" :title="title" :total="total" :currentPage="page" @changePage="changePage" >
		</lgy-table>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';

var _this, defID, defIP;

export default {
	data(){
		var data = {
			userID: '',
			userIP: '',
			idList: null,
			ipList: null,
			tableList: [],
			page: 1,
			total: 1,
		};
		
		data.title = {
			userID: this.$t('webu.table.userID'),
			userName: this.$t('webu.table.userName'),
			online: this.$t('webu.table.online'),
			lock: this.$t('webu.table.lock'),
			site: this.$t('webu.table.site'),
			ip: this.$t('webu.table.ip'),
			phone: this.$t('webu.table.phone'),
			login: this.$t('webu.table.login'),
			logout: this.$t('webu.table.logout')
		};
		data.tableList[0] = {userID: 'ID', userName: 'name', online: '在线', lock: '未锁定',site: 'webStation', ip: '127.0.0.1', phone: '13800010001',login:'20200101',logout:'20200108'}
		return data;
	},
	methods:{
		back(){
			this.$router.push({path: '/main/webu/statistic/webUser'});
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
			if(val=='') return this.idList = [].concat(defID);
			utils.keywords({id: val}, arr => {
				_this.idList = arr;
			});
		},
		iPInput(val){
			if(val=='') return this.ipList = [].concat(defIP);
			utils.keywords({id: val}, arr => {
				_this.ipList = arr;
			});
		}
	},
	created(){
		_this = this;
		defID = defIP = [];
		autoComplete();
	},
	mounted(){
		
	}
}

function autoComplete(){
	var param, args;
	param = {
		cmdID: "600052",
		type: 0,
		userID: _this.userID,
		language: 'zh'
	};
	args = {
		label: ['ekeyName','lastModified'],
		value: 'userID'
	};
	utils.keywords(param, args).then(arr => {
		defID = defIP = [].concat(arr);
		_this.idList = arr;
	});
}

function search(){
	let params = {
		url: 'userEkey/query',
		cmdID: '600031',
		pageSize: 20,
		currentPage: _this.page
	};
	utils.post(params).then(function(res){
		if(res.errcode != '0') return console.warn(res.errcode, res.errinfo);
//		if(res.errcode != '0') return utils.alert({txt: res.errinfo});
		if(res.totalPage>0 && _this.page > res.totalPage){
			_this.page = res.totalPage;
			return search();
		}
		let i, len = res.lists.length, obj;
		for (i = 0; i < len; i++) {
			obj = res.lists[i];
			
		}
		_this.list = res.lists;
		_this.page = res.currentPage;
		_this.total = res.totalSize;
	});
}
</script>

<style scoped="scoped">

</style>