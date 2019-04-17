<template>
	<div class="userHome">
		<div class="searchBar">
			<label class="label">{{$t('fbcsFile.searchBar.userID')}}</label>
			<input v-model="id" class="words" :placeholder="$t('fbcsFile.searchBar.placeholder')" />
			<label class="label">{{$t('fbcsFile.searchBar.userName')}}</label>
			<input v-model="name" class="words" :placeholder="$t('fbcsFile.searchBar.placeholder')" />
			<button class="blueBtn" @click="search">{{$t('fbcsFile.searchBar.search')}}</button>
		</div>
		<ul class="fnField" v-if="fxAuth">
			<li @click="addUser">
				<img class="icon" src="@/fbcsFxViews/img/FnIcon/addUser.png"/>
				<span class="label">{{$t('fbcsFile.fnField.addUser')}}</span>
			</li><li @click="showSignal">
				<img class="icon" src="@/fbcsFxViews/img/FnIcon/delUser.png"/>
				<span class="label">{{$t('fbcsFile.fnField.delUser')}}</span>
			</li><li @click="editPwd">
				<img class="icon" src="@/fbcsFxViews/img/FnIcon/editPwd.png"/>
				<span class="label">{{$t('fbcsFile.fnField.editPwd')}}</span>
			</li><li @click="importInformation">
				<img class="icon" src="@/fbcsFxViews/img/FnIcon/importBasicInformation.png"/>
				<span class="label">{{$t('fbcsFile.fnField.importInformation')}}</span>
			</li><li @click="importInBop">
				<img class="icon" src="@/fbcsFxViews/img/FnIcon/importExtendInformation.png"/>
				<span class="label">{{$t('fbcsFile.fnField.importInBop')}}</span>
			</li>
		</ul>
		<lgy-table :list="list" :title="title" :defined="defined" :total="total" :selection='true' 
			@select="select" @changePage="changePage" :currentSelect.sync="currSelect" :currentPage.sync="page">
		</lgy-table>
		
		<el-dialog :visible.sync="showDialog" :title="$t('fbcsFile.userHome.signal')" v-dialogDrag width="646px"
			:close-on-click-modal='false' :show-close="false">
			<div class="_dialog signal">
				<lgy-table :list="signalList" :title="signalTitle" :total="signalTotal" :currentPage.sync="signalPage" 
					@changePage="signalChange" >
				</lgy-table>
			</div>
			<div slot="footer" class="_footBtn">
				<button class="blueBtn" @click="delUser">{{$t('fbcsFile.tips.ok')}}</button>
				<button class="defBtn" @click="showDialog=false">{{$t('fbcsFile.tips.cancel')}}</button>
			</div>
		</el-dialog>
		
		<modifyPwd :show.sync="showPwd" :user="currSelect"></modifyPwd>
		
		<el-dialog :visible.sync="showInfo" :title="infoTitle" v-dialogDrag :close-on-click-modal='false' :show-close="false">
			<ul class="_dialog import">
				<li>
					<span class="txt w120">
						<i class="red">*</i>
						{{$t('fbcsFile.userHome.fileName')}}
					</span>
					<input v-model="fileName" class="fileName" />
				</li><li>
					<p class="importTips" v-html="$t('fbcsFile.userHome.importTips')"></p>
				</li>
			</ul>
			<div slot="footer" class="_footBtn">
				<button class="blueBtn" @click="save">{{$t('fbcsFile.tips.ok')}}</button>
				<button class="defBtn" @click="showInfo=false">{{$t('fbcsFile.tips.close')}}</button>
			</div>
		</el-dialog>
		<el-dialog :visible.sync="importErr" :title="$t('fbcsFile.tips.title')" v-dialogDrag :close-on-click-modal='false' :show-close="false">
			<div class="_dialog">
				<el-table :data="errList" :row-class-name="rowClass" max-height="294" highlight-current-row border>
					<el-table-column prop="line" :label="$t('fbcsFile.userHome.line')"></el-table-column>
					<el-table-column prop="userID" :label="$t('fbcsFile.tableTitle.userID')"></el-table-column>
					<el-table-column prop="operatorName" :label="$t('fbcsFile.userHome.operatorName')"></el-table-column>
					<el-table-column prop="errinfo" :label="$t('fbcsFile.userHome.errinfo')"></el-table-column>
				</el-table>
			</div>
			<div slot="footer" class="_footBtn">
				<button class="defBtn" @click="importErr=false">{{$t('fbcsFile.tips.close')}}</button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';

var _this, data = {
	fxAuth: true,
	id: '',
	name: '',
	showPwd: false,
	list: [
		{userID: '01', userName: 'userName'},{userID: '02', userName: 'ABC'},{userID: '03', userName: 'ABC'}
	],
	page: 1,
	total: 1,
	currSelect: null,
	
	showDialog: false,
	signalList: [],
	signalPage: 1,
	signalTotal: 1,
	
	showInfo: false, infoTitle: '',
	fileName: '', importErr: false,
	errList: []
};


function editUser(row){
	let obj = Object.assign({tab: 'first', type: 'edit'}, row);
	utils.setArgs('userInfo', obj);
	_this.$router.push({path: '/main/fxCfg/userInfo'});
}
function editEkey(row){
	let obj = Object.assign({tab: 'second', type: 'ekey'}, row);
	utils.setArgs('userInfo', obj);
	_this.$router.push({path: '/main/fxCfg/userInfo'});
}
function addRelation(row){
	let obj = Object.assign({tab: 'third', type: 'signal'}, row);
	utils.setArgs('userInfo', obj);
	_this.$router.push({path: '/main/fxCfg/userInfo'});
}

export default {
	data(){
		data.title = {userID: this.$t('fbcsFile.tableTitle.userID'), userName: this.$t('fbcsFile.tableTitle.userName')};
		data.defined = {
			label: this.$t('fbcsFile.tableTitle.operation'), width: 112,
			items: [
				{src:require('@/fbcsFxViews/img/table/edit.png'), click: editUser, tips: this.$t('fbcsFile.tableDefined.editUser') },
				{src:require('@/fbcsFxViews/img/table/Ekey.png'), click: editEkey, tips: this.$t('fbcsFile.tableDefined.editEkey') },
				{src:require('@/fbcsFxViews/img/table/signal.png'), click: addRelation, tips: this.$t('fbcsFile.tableDefined.addSignal') }
			]
		};
		data.signalTitle = {
			userID1: this.$t('fbcsFile.tableTitle.userID'),
			userName1: this.$t('fbcsFile.tableTitle.userName'),
			userID2: this.$t('fbcsFile.tableTitle.userID'),
			userName2: this.$t('fbcsFile.tableTitle.userName')
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
		addUser(){
			utils.setArgs('userInfo', {tab: 'first', type: 'add'});
			this.$router.push({path: '/main/fxCfg/userInfo'});
		},
		showSignal(){
			var user = this.currSelect;
			if(!user) return utils.confirm({txt: this.$t('fbcsFile.password.not'), btn: 1});
			this.signalPage = 1;
			signalSearch();
			this.showDialog = true;
		},
		signalChange(){
			signalSearch();
		},
		delUser(){
			var user = this.currSelect;
			utils.confirm({
				txt: this.$t('fbcsFile.userHome.del'), 
				ok: () => {
					let params = {
						url: '/userinfo/delete',
						cmdID: '600005',
						userID: user.userID
					};
					utils.post(params).then(res => {
						utils.alert({txt: res.errinfo, type: res.errcode!='0'?0:1});
						if(res.errcode != '0') return;
						search();
					});
				}
			});
			this.showDialog = false;
		},
		editPwd(){
			this.showPwd = true;
		},
		importInformation(){
			this.fileName = '';
			this.infoTitle = this.$t('fbcsFile.fnField.importInformation');
			this.showInfo = true;
		},
		save(){
			if(utils.isSpace(this.fileName)) return utils.confirm({
				txt: _this.$t('fbcsFile.userHome.fileErr'),
				btn: 1
			});
			
			utils.confirm({
				txt: _this.$t('fbcsFile.userHome.OPE'),
				ok: () => {
					let params = {
						url: 'userinfoExt/operatorImport',
						cmdID: '600026',
						csvFileName: _this.fileName
					};
					
					utils.post(params).then(res => {
						if(res.lists){
							_this.errList = res.lists;
							_this.importErr = true;
						} else {
							utils.alert({txt: res.errinfo, type: res.errcode!='0'?0:1});
						}
					});
				}
			});
			this.showInfo = false;
		},
		importInBop(){
			utils.confirm({
				txt: _this.$t('fbcsFile.userHome.BOP'),
				ok: () => {
					let params = {
						url: 'userinfoExt/operatorToBop',
						cmdID: '600027'
					};
					
					utils.post(params).then(res => {
						let mess = `<p>${res.errinfo}</p>`;
						if(res.webUserFlag == 1){ //网络用户
							mess += `<p style="color: red">${_this.$t('fbcsFile.tips.webUser')}</p>`;
						}
						utils.alert({txt: mess, type: res.errcode!='0'?0:1});
					});
				}
			});	
		},
		select(arr, row, table){
			if(arr.length > 1){
				table.clearSelection();
				table.toggleRowSelection(row);
			}
		}
	},
	created(){
		_this = this;
		this.fxAuth = utils.getFxAuth;
		this.id = this.name = '';
		this.currSelect = null;
		this.showDialog = false;
		this.list = [];
		this.search();
	},
	components: {
		ekey: resolve => require(['@/fbcsFxViews/view/page/Ekey.vue'], resolve),
		modifyPwd: resolve => require(['@/fbcsFxViews/view/user/modifyPwd.vue'], resolve),
	},
}
function search(){
	let params = {
		url: 'userinfo/queryLists',
		cmdID: '600001',
		userID: _this.id,
		userName: _this.name,
		pageSize: 20,
		currentPage: _this.page,
		type: 0
	};
	utils.post(params).then(res => {
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
function signalSearch(){
	_this.signalList = [];
	var user = _this.currSelect;
	let params = {
		url: 'userComm/query',
		cmdID: '600041',
		userID1: user.userID,
		userID2: '',
		pageSize: 20,
		currentPage: _this.signalPage
	};
	utils.post(params).then(res => {
		if(res.errcode!='0') return console.warn(res.errcode, res.errinfo);
		if(res.totalPage>1 && _this.signalPage > res.totalPage){
			_this.signalPage = res.totalPage;
			return signalSearch();
		}
		_this.signalList = res.lists;
		_this.signalPage = res.currentPage;
		_this.signalTotal = res.totalSize;
	});
}
</script>

<style scoped="scoped">
	.userHome{min-width: 696px;padding-right: 20px;background: #FFF;}
	#fbcs_file .signal{padding-bottom: 0;max-height: 320px;overflow: auto;width: 646px;}
	.import{padding-right: 0 !important;}
	.w120{vertical-align: middle;}
	.fileName{width: 350px;}
	.importTips{font-size: 14px;color: #999;line-height: 20px;margin-left: 122px;white-space: pre-line;}
</style>
