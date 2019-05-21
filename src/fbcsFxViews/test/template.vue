<template>
	<div class="">
		<p class="test">template</p>
		<div class="searchBar">
			<label class="label">{{$t('fbcsFile.searchBar.userID')}}</label>
			<lgy-candidateWords v-model="userID" :keywords="idWords" @input="idInput" class="words" ></lgy-candidateWords>
			<label class="label">{{$t('fbcsFile.searchBar.ekeyName')}}</label>
			<input v-model="name" class="words" :placeholder="$t('fbcsFile.searchBar.placeholder')" autocomplete="off"/>
			<button class="blueBtn" @click="search">{{$t('fbcsFile.searchBar.search')}}</button>
		</div>
		<ul class="fnField">
			<li>
				<img class="icon" src="@/fbcsFxViews/img/FnIcon/addEkey.png"/>
				<span class="label">{{$t('fbcsFile.fnField.addEkey')}}</span>
			</li>
		</ul>
		<lgy-table :list="list" :title="title" :defined="defined" :total="total" :currentPage="page" @changePage="changePage" >
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
var userid;

export default {
	data(){
		data.title = {
			userID: this.$t('fbcsFile.tableTitle.userID'),
			userName: this.$t('fbcsFile.tableTitle.userName'),
			ekeyName: this.$t('fbcsFile.tableTitle.ekeyName'),
			ymd: this.$t('fbcsFile.tableTitle.ekeyDate'),
			ekeyComment: this.$t('fbcsFile.tableTitle.ekeyInfo'),
		};
		data.defined = {
			label: this.$t('fbcsFile.tableTitle.operation'), width: 82,
			items: [
				{src:require('@/fbcsFxViews/img/table/edit.png'), click: ()=>{}, tips: this.$t('fbcsFile.tableDefined.editEkey') },
				{src:require('@/fbcsFxViews/img/table/del.png'), click: ()=>{}, tips: this.$t('fbcsFile.tableDefined.delEkey') },
			]
		};
		return data;
	},
	/*props: {
		isPage: {
			type: Boolean,
			default: true
		},
	},*/
	methods:{
		search(){
			this.page = 1;
			search();
		},
		changePage(num){
			this.page = num;
			search();
		},
		idInput(val){
			if(val=='') return this.idWords = [].concat(userid);
			utils.keywords({id: val}, arr => {
				_this.idWords = arr;
			});
		},
	},
	async created(){
		_this = this;
	},
	mounted(){},
	watch: {},
	components: {}
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