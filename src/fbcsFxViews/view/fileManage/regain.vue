<template>
	<div class="regain">
		<div class="fnField">
			<button class="blueBtn" @click="search">{{$t('fbcsFile.files.regain.compare')}}</button>
		</div>
		<lgy-table :list="list" :title="title" :defined="defined" :total="total" :currentPage.sync="page" @changePage="changePage" :size="90000">
		</lgy-table>
		<h2 class="h2">{{$t('fbcsFile.files.search.delRes')}}</h2>
		<lgy-review :show.sync='showReview' :reqsv='reqsv' @submit='review' :txt='reviewTxt'></lgy-review>
		<el-dialog :visible.sync="showDialog" :title="$t('fbcsFile.files.regain.restore')" v-dialogDrag
			:close-on-click-modal='false' :show-close="false">
			<ul class="_dialog">
				<li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.files.regain.fileName')}}：</p>
					</div><div class="right">
						<p class="txt">{{mess.fileName}}</p>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.files.regain.fileComment')}}：</p>
					</div><div class="right">
						<p class="txt">{{mess.detail}}</p>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.files.regain.recoverType')}}：</p>
					</div><div class="right">
						<p class="txt">{{mess.type}}</p>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">CU：</p>
					</div><div class="right">
						<el-table ref="nodes" :data="mess.cu" :row-class-name="rowClass" max-height="294" highlight-current-row border
							@selection-change="selectChange" style="width: 340px;">
							<el-table-column type="selection" width="40" key></el-table-column>
							<el-table-column prop="nodeName" :label="$t('fbcsFile.dispatch.nodeName')"></el-table-column>
						</el-table>
					</div>
				</li>
			</ul>
			<div slot="footer" class="_footBtn">
				<button class="blueBtn" @click="showCU(cutRow)">{{$t('fbcsFile.tips.ok')}}</button>
				<button class="defBtn" @click="showDialog=false">{{$t('fbcsFile.tips.cancel')}}</button>
			</div>
		</el-dialog>
		<lgy-wheelReq :parameter.sync="parameter" :hideDialog="true" :showTable='true'></lgy-wheelReq>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';

var _this, data = {
	page: 1,
	total: 1,
	list: [
		{version: '001', fileName: 'userName', cuName: 'cuName',recoverType: '删除', fileComment: 'ekeyComment'}
	],
	showReview: false,
	reqsv: {},
	parameter: null,
	showDialog: false,
	cutRow: {},
	mess: {
		fileName: 'df', detail: '', type: '', cu: []
	}
};

function restore(row){
	_this.cutRow = row;
	let mess = _this.mess;
	mess.fileName = row.fileName;
	mess.detail = row.fileComment;
	mess.type = row.recoverType;
	mess.cu = row.cuLists;
	_this.showDialog = true;
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
//			cuName: this.$t('fbcsFile.files.regain.cuName')
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
		showCU(row){
			row.uri = 'userClientFile/recover';
			this.reqsv = row;
			this.showReview = true;
			this.showDialog = false;
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
		this.showDialog = this.showReview = false;
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