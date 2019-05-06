<template>
	<div class="regain">
		<!--<div class="fnField">
			<button class="blueBtn" @click="search">{{$t('fbcsFile.files.regain.compare')}}</button>
		</div>-->
		<ul class="fnField">
			<li @click="search">
				<img class="icon" src="@/fbcsFxViews/img/FnIcon/addEkey.png"/>
				<span class="label">{{$t('fbcsFile.files.regain.compare')}}</span>
			</li><li @click="advanced">
				<img class="icon" src="@/fbcsFxViews/img/FnIcon/addEkey.png"/>
				<span class="label">{{$t('fbcsFile.fnField.blacklist')}}</span>
			</li>
		</ul>
		<lgy-table :list="list" :title="title" :defined="defined" :total="total" :currentPage.sync="page" @changePage="changePage" :size="90000">
		</lgy-table>
		<h2 class="h2">{{$t('fbcsFile.files.search.sendRes')}}</h2>
		<lgy-review :show.sync='showReview' :reqsv='reqsv' @submit='review' :txt='reviewTxt'></lgy-review>
		<el-dialog :visible.sync="showDialog" :title="$t('fbcsFile.files.regain.restore')" v-dialogDrag
			:close-on-click-modal='false' :show-close="false">
			<ul class="_dialog" style="white-space: nowrap;">
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
						<el-table ref="nodes" :data="cuList" :row-class-name="rowClass" max-height="294" highlight-current-row border
							@selection-change="changeCU" style="width: 340px;">
							<el-table-column type="selection" width="40" key></el-table-column>
							<el-table-column prop="nodeName" :label="$t('fbcsFile.dispatch.nodeName')"></el-table-column>
							<el-table-column prop="cuName" :label="$t('fbcsFile.dispatch.cuName')"></el-table-column>
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
		{version: '001', fileName: 'userName', fileMd5: 'MD5',recoverType: '1', fileComment: 'ekeyComment', detail: 'CU-1,CU-2'}
	],
	showReview: false,
	reqsv: {},
	reviewTxt: '',
	parameter: null,
	showDialog: false,
	cutRow: {},
	mess: {
		fileName: 'df', detail: '', type: ''
	},
	cuList: [],
};
var nodes;

function restore(row){
	_this.cutRow = row;
	let mess = _this.mess;
	mess.fileName = row.fileName;
	mess.detail = row.fileComment;
	mess.type = row.typeStr;
	
	nodes = [];
	setTimeout(() => {
		_this.cuList.forEach(r => {
			if(row.detail.indexOf(r.cuName) >= 0){
				nodes.push(r);
				_this.$refs['nodes'].toggleRowSelection(r, true);
			} else _this.$refs['nodes'].toggleRowSelection(r, false);
		});
	});
	_this.showDialog = true;
}

export default {
	data(){
		data.title = {
			fileName: this.$t('fbcsFile.files.regain.fileName'),
			version: this.$t('fbcsFile.files.regain.version'),
			fileComment: this.$t('fbcsFile.files.regain.fileComment'),
			typeStr: this.$t('fbcsFile.files.regain.recoverType'),
			detail: this.$t('fbcsFile.files.regain.detail'),
//			cuLists: this.$t('fbcsFile.files.regain.cuLists'),
//			cuName: this.$t('fbcsFile.files.regain.cuName')
		};
		data.defined = {
			label: this.$t('fbcsFile.tableTitle.operation'), width: 82,
			items: [
				{src:require('@/fbcsFxViews/img/table/restore.png'), click: restore, tips: this.$t('fbcsFile.files.regain.restore') },
			]
		};
		if(!utils.getFxAuth) data.defined.items = [];
		return data;
	},
	methods:{
		rowClass({row, rowIndex}){
			if(rowIndex%2 != 0) return 'tableBG';
			return '';
		},
		advanced(){
			this.$router.push({path: '/main/fxCfg/fileManage/blacklist'});
		},
		search(){
			this.page = 1;
			search();
		},
		changePage(num){
			search();
		},
		changeCU(arr){
			nodes = arr;
		},
		showCU(row){
			if(nodes.length == 0) return utils.alert({txt: this.$t('fbcsFile.dispatch.noNode')});
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
				count: nodes.length,
				lists: nodes
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
		this.list = [];
		this.parameter = null;
		nodeCu();
	}
};

function search(){
	utils.loadShow();
	let params = {
		url: 'userClientFile/cuCompare',
		cmdID: '600065',
	};
	utils.post(params).then(function(res){
		utils.loadClose();
		if(res.errcode!='0') { //清缓存历史
			_this.list = [];
			_this.page = 1;
			_this.total = 0;
			return utils.alert({txt: res.errinfo});
		}
		res.lastQuery = 1;
		res.loading = false;
		_this.parameter = res;
		if(res.totalPage>0 && _this.page > res.totalPage){
			_this.page = res.totalPage;
			return search();
		}
		let i, len = res.lists.length, obj;
		var lable = {};
		lable.str0 = _this.$t('fbcsFile.files.regain.typeStr0');
		lable.str1 = _this.$t('fbcsFile.files.regain.typeStr1');
		for (i = 0; i < len; i++) {
			obj = res.lists[i];
			obj.typeStr = lable['str'+obj.recoverType];
		}
		_this.list = res.lists;
		_this.page = res.currentPage;
		_this.total = res.totalSize;
	});
}

function nodeCu(type){
	let params = {
		url: 'batchDispatch/queryNodeCu',
		cmdID: '600081',
		type: type||0
	};
	utils.post(params).then(function(res){
		if(res.errcode!='0') return utils.alert({txt: res.errinfo});
		_this.cuList = res.lists;
	});
}

</script>

<style scoped="scoped">
	.h2{ font-size: 14px; color: #666;  margin-bottom: 10px;}
	._dialog li {white-space: nowrap;}
	._dialog .right .txt {white-space: normal;display: block;width: 350px;}
	#fbcs_file ._dialog li .left{width: 140px;}
</style>