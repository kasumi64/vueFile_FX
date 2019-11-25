<template>
	<div class="search">
		<ul class="fnField">
			<li @click="search">
				<img class="icon" src="@/fbcsFxViews/img/FnIcon/refresh.png"/>
				<span class="label">{{$t('fbcsFile.tips.refresh')}}</span>
			</li><li @click="checkVer(1)">
				<img class="icon" src="@/fbcsFxViews/img/FnIcon/fileVer.png"/>
				<span class="label">{{$t('fbcsFile.fnField.newVer')}}</span>
			</li><li @click="advanced">
				<img class="icon" src="@/fbcsFxViews/img/FnIcon/upload.png"/>
				<span class="label">{{$t('fbcsFile.fnField.upload')}}</span>
			</li>
		</ul>
		<lgy-table :list="list" :title="title" :defined="defined" :total="total" :currentPage="page" @changePage="changePage" :size="90000">
		</lgy-table>
		
		<h2 class="h2">{{$t('fbcsFile.files.search.delRes')}}</h2>
		
		<el-dialog ref="zdBox" :visible.sync="checkDialog" :title="$t('fbcsFile.fnField.newVer')" v-dialogDrag
			:close-on-click-modal='false' :show-close="false">
			<div class="_dialog">
				<el-table :data="checkList" :row-class-name="rowClass" max-height="294" border>
					<el-table-column type="index" width="50" label=" "></el-table-column>
					<!--<el-table-column prop="type" :label="$t('fbcsFile.versionDetail.type')"></el-table-column>-->
					<el-table-column prop="version" :label="$t('fbcsFile.versionQuery.version')"></el-table-column>
					<el-table-column prop="fileName" :label="$t('fbcsFile.versionDetail.fileName')"></el-table-column>
					<el-table-column :label="$t('fbcsFile.versionQuery.isEqual')">
						<span slot-scope="scope" :class="{redTxt: scope.row.isEqual!=0}">{{scope.row.equalMask}}</span>
					</el-table-column>
				</el-table>
			</div>
			<div slot="footer" class="_footBtn">
				<button class="defBtn" @click="checkDialog=false">{{$t('fbcsFile.tips.close')}}</button>
			</div>
		</el-dialog>
		
		<lgy-review :show.sync='showReview' :reqsv='reqsv' @submit='review' :txt='reviewTxt'></lgy-review>
		<lgy-wheelReq ref="cuList" class="z" :parameter.sync="parameter" :hideDialog="true" :showTable='true'></lgy-wheelReq>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';
import moment from 'moment';

var _this, data = {
	page: 1,
	total: 1,
	list: [
		{fileName: 'userID', fileComment: 'userName', fileMd5: 'ekeyName',dispatchTime: 1535646546566, reviewer: 'ekeyComment'}
	],
	showReview: false,
	reqsv: {},
	reviewTxt: '',
	parameter: null,
	checkDialog: false,
	checkList: []
};

function del(row){
	delete row.uri;
	row.uri = 'userClientFile/delete';
	_this.reqsv = row;
	_this.showReview = true;
}

export default {
	data(){
		data.title = {
			fileName: this.$t('fbcsFile.files.search.fileName'),
			version: this.$t('fbcsFile.files.search.version'),
			fileComment: this.$t('fbcsFile.files.search.fileComment'),
			fileSize: this.$t('fbcsFile.files.search.size'),
			fileMd5: this.$t('fbcsFile.files.search.md5'),
			ymd: this.$t('fbcsFile.files.search.time'),
			operator: this.$t('fbcsFile.files.search.operater'),
			reviewer: this.$t('fbcsFile.files.search.reviewer')
		};
		data.defined = {
			label: this.$t('fbcsFile.tableTitle.operation'), width: 82,
			items: [
				{src:require('@/fbcsFxViews/img/table/del.png'), click: del, tips: this.$t('fbcsFile.files.search.del') },
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
			this.$router.push({path: '/main/fxCfg/fileManage/upload'});
		},
		search(){
			this.page = 1;
			search();
			if(this.$refs.cuList) this.$refs.cuList.syncList();
		},
		changePage(num){
			this.page = num;
			search();
		},
		review(args){
			let params = {
				url: 'userClientFile/delete',
				cmdID: '600063',
				reviewer: args.name,
				reviewerPassword: args.pwd,
				reviewType: 1,
				fileName: args.fileName,
				fileMd5: args.fileMd5
			};
			utils.post(params).then(function(res){
				if(res.errcode!='0') return utils.alert({txt: res.errinfo});
				_this.parameter = res;
				search();
			});
		},
		checkVer(type){
			let params = {
				url: 'userClientFile/compareMd5',
				cmdID: '600067'
			};
			utils.loadShow();
			utils.post(params).then(function(res){
				utils.loadClose();
				if(res.errcode != '0') return utils.alert({txt: res.errinfo});
				for (let i = 0; i < res.lists.length; i++) {
					let obj = res.lists[i], equal = obj.isEqual;
					obj.equalMask = _this.$t('fbcsFile.versionQuery.equal'+equal);
				}
				_this.checkList = res.lists;
				_this.checkDialog = true;
				utils.tableSTop(_this, 'zdBox');
			});
			if(this.$refs.cuList) this.$refs.cuList.syncList();
		}
	},
	created(){
		_this = this;
		this.total = 1;
		this.list = [];
		this.search();
	}
};

function search(){
	let params = {
		url: 'userClientFile/query',
		cmdID: '600061',
	};
	utils.post(params).then(function(res){
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
			if(obj.dispatchTime){
				obj.ymd = moment(obj.dispatchTime).format('YYYY-MM-DD HH:mm:ss');
			} else {
				obj.dispatchTime = obj.ymd = '';
			}
		}
		_this.list = res.lists;
		_this.page = res.currentPage || 1;
		_this.total = res.count;
	});
}

</script>

<style scoped="scoped">
	.h2{ font-size: 14px; color: #666;  margin-bottom: 10px;}
	.lgy-wheelReq.z{z-index: 7;}
	.redTxt{color: #FF7A7D;}
</style>
