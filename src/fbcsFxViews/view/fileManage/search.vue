<template>
	<div class="search">
		<div class="fnField">
			<button class="blueBtn" @click="search">{{$t('fbcsFile.searchBar.search')}}</button>
		</div>
		<lgy-table :list="list" :title="title" :defined="defined" :total="total" :currentPage.sync="page" @changePage="changePage" :size="90000">
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
		{fileName: 'userID', fileComment: 'userName', fileMd5: 'ekeyName',dispatchTime: 1535646546566, reviewer: 'ekeyComment'}
	],
	showReview: false,
	reqsv: {},
	parameter: null,
};

function del(row){
	row.uri = 'userClientFile/dispatch';
	_this.reqsv = row;
	_this.showReview = true;
}

export default {
	data(){
		data.title = {
			version: this.$t('fbcsFile.files.search.version'),
			fileName: this.$t('fbcsFile.files.search.fileName'),
			fileComment: this.$t('fbcsFile.files.search.fileComment'),
			fileSize: this.$t('fbcsFile.files.search.size'),
			fileMd5: this.$t('fbcsFile.files.search.md5'),
			dispatchTime: this.$t('fbcsFile.files.search.time'),
			operater: this.$t('fbcsFile.files.search.operater'),
			reviewer: this.$t('fbcsFile.files.search.reviewer')
		};
		data.defined = {
			label: this.$t('fbcsFile.tableTitle.operation'), width: 82,
			items: [
				{src:require('@/fbcsFxViews/img/table/del.png'), click: del, tips: this.$t('fbcsFile.files.search.del') },
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
				url: 'userClientFile/dispatch',
				cmdID: '600063',
				reviewer: args.name,
				fileName: args.fileName,
				fileMd5: args.fileMd5
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
		url: 'userClientFile/query',
		cmdID: '600061',
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