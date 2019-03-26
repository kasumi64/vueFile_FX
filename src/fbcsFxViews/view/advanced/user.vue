<template>
	<div class="advancedUser">
		<p class="test">开发中...</p>
		<div class="searchBar">
			<label class="label">{{$t('fbcsFile.searchBar.userID')}}</label>
			<lgy-candidateWords v-model="userID" :keywords="idWords" @input="idInput" class="words" ></lgy-candidateWords>
			<label class="label">{{$t('fbcsFile.searchBar.ekeyName')}}</label>
			<input v-model="name" class="words" :placeholder="$t('fbcsFile.searchBar.placeholder')" />
			<button class="blueBtn" @click="search">{{$t('fbcsFile.searchBar.search')}}</button>
		</div>
		<ul class="fnField">
			<li>
				<img class="icon" src="@/fbcsFxViews/img/FnIcon/addEkey.png"/>
				<span class="label">{{$t('fbcsFile.fnField.addEkey')}}</span>
			</li>
		</ul>
		<lgy-table :list="list" :title="title" :total="total" :currentPage.sync="page" @changePage="changePage" >
		</lgy-table>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';

var _this, data = {
	userID: '',
	name: '',
	idWords: null,
	list: [
		{userID: 'userID', userName: 'userName', ekeyName: 'ekeyName',validDate: 1535646546566, ekeyComment: 'ekeyComment'}
	],
	page: 1,
	total: 1,
};
var idAll = [];

export default {
	data(){
		data.title = {
			userID: this.$t('fbcsFile.tableTitle.userID'),
			userName: this.$t('fbcsFile.tableTitle.userName'),
			ekeyName: this.$t('fbcsFile.tableTitle.ekeyName'),
			ymd: this.$t('fbcsFile.tableTitle.ekeyDate'),
			ekeyComment: this.$t('fbcsFile.tableTitle.ekeyInfo'),
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
		idInput(val){
			if(val=='') return this.idWords = [].concat(idAll);
			utils.keywords({id: val}, arr => {
				_this.idWords = arr;
			});
		},
	},
	created(){
		_this = this;
	}
}

function search(){
	let params = {
		url: 'userEkey/query',
		cmdID: '600031',
		pageSize: 20,
		currentPage: _this.page
	};
	utils.post(params).then(function(res){
		if(res.errcode!='0') return console.warn(res.errcode, res.errinfo);
		if(res.totalPage>1 && _this.page > res.totalPage){
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