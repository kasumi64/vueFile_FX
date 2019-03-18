<template>
	<div class="regain">
		<div class="fnField">
			<button class="blueBtn" @click="search">{{$t('fbcsFile.files.regain.compare')}}</button>
		</div>
		<lgy-table :list="list" :title="title" :defined="defined" :total="total" :currentPage.sync="page" @changePage="changePage" >
		</lgy-table>
		<h2 class="h2">{{$t('fbcsFile.files.search.delRes')}}</h2>
		<lgy-review :show.sync='showReview' :reqsv='reqsv' @submit='review' :txt='reviewTxt'></lgy-review>
		<lgy-wheelReq :parameter.sync="parameter" :hideDialog="true" :showTable='true'></lgy-wheelReq>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';

var _this, data = {
	page: 1,
	total: 1,
	list: [
		{version: 'userID', fileName: 'userName', detail: 'ekeyName',cuLists: 1535646546566, cuName: 'ekeyComment'}
	],
	showReview: false,
	reqsv: {},
	parameter: null,
};

function restore(row){
	row.uri = 'userClientFile/recover';
	_this.reqsv = row;
	_this.showReview = true;
}

export default {
	data(){
		data.title = {
			version: this.$t('fbcsFile.files.regain.version'),
			fileName: this.$t('fbcsFile.files.regain.fileName'),
			fileComment: this.$t('fbcsFile.files.regain.fileComment'),
			recoverType: this.$t('fbcsFile.files.regain.recoverType'),
			detail: this.$t('fbcsFile.files.regain.detail'),
			cuLists: this.$t('fbcsFile.files.regain.cuLists'),
			cuName: this.$t('fbcsFile.files.regain.cuName')
		};
		data.defined = {
			label: this.$t('fbcsFile.tableTitle.operation'), width: 82,
			items: [
				{src:require('@/fbcsFxViews/img/table/restore.png'), click: restore, tips: this.$t('fbcsFile.files.regain.restore') },
			]
		};
		return data;
	},
	methods:{
		rowClass({row, rowIndex}){
			if(rowIndex%2 != 0) return 'tableBG';
			return '';
		},
		search(){
			this.page = 1;
			search();
		},
		changePage(num){
			search();
		},
		review(args){
			let params = {
				url: 'userClientFile/recover',
				cmdID: '600064',
				reviewer: args.name,
				fileName: args.fileName,
				fileMd5: args.fileMd5,
				recoverType: args.recoverType,
				count: args.cuLists.lenght,
				lists: args.cuLists
			};
			utils.post(params).then(function(res){
				if(res.errcode!='0') return utils.alert({txt: res.errinfo});
				_this.parameter = res;
			});
		}
	},
	created(){
		_this = this;
		this.total = 1;
//		this.list = [];
		this.search();
	}
};

function search(){
	let params = {
		url: 'userClientFile/cuCompare',
		cmdID: '600065',
		pageSize: 20,
		currentPage: _this.page
	};
	utils.post(params).then(function(res){
		if(res.errcode!='0') return console.warn(res.errcode, res.errinfo);
		if(res.totalPage>1 && _this.page > res.totalPage){
			_this.page = res.totalPage;
			return search();
		}
		_this.list = res.lists;
		_this.page = res.currentPage;
		_this.total = res.totalSize;
	});
}

</script>

<style scoped="scoped">
	.h2{ font-size: 14px; color: #666;  margin-bottom: 10px;}
</style>