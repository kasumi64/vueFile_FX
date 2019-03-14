<template>
	<div class="Ekey">
		<div v-if="isPage" class="searchBar">
			<label class="label">{{$t('fbcsFile.searchBar.userID')}}</label>
			<lgy-candidateWords v-model="id" class="words" ></lgy-candidateWords>
			<label class="label">{{$t('fbcsFile.searchBar.ekeyName')}}</label>
			<input v-model="name" class="words" :placeholder="$t('fbcsFile.searchBar.placeholder')" />
			<button class="blueBtn" @click="search">{{$t('fbcsFile.searchBar.search')}}</button>
		</div>
		<ul class="fnField">
			<li @click="showAddEkey">
				<img class="icon" src="@/fbcsFxViews/img/FnIcon/addEkey.png"/>
				<span class="label">{{$t('fbcsFile.fnField.addEkey')}}</span>
			</li>
		</ul>
		<lgy-table :list="list" :title="title" :defined="defined" :total="total" :currentPage.sync="page" @changePage="changePage" >
		</lgy-table>
		
		<el-dialog :visible.sync="showDialog" :title="dialogTitle" v-dialogDrag
			:close-on-click-modal='false' :show-close="false">
			<ul class="_dialog">
				<li>
					<div class="left">
						<p class="txt">
							<span class="red">*</span>
							{{$t('fbcsFile.Ekey.userID')}}
						</p>
					</div><div class="right">
						<lgy-candidateWords v-model="ekeyInfo.userID" :disabled="disabled"></lgy-candidateWords>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">
							<span class="red">*</span>
							{{$t('fbcsFile.Ekey.ekeyName')}}
						</p>
					</div><div class="right">
						<input v-model="ekeyInfo.ekeyName" />
					</div>
				</li><li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.Ekey.ekeyDate')}}</p>
					</div><div class="right">
						<el-date-picker v-model="ekeyInfo.validDate" class="picker" type="datetime" :clearable="false" :editable="false"
							:placeholder="$t('fbcsFile.tips.date')" default-time="23:59:59" >
						</el-date-picker>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.Ekey.ekeyInfo')}}</p>
					</div><div class="right">
						<input v-model="ekeyInfo.ekeyComment" />
					</div>
				</li>
			</ul>
			<div slot="footer" class="_footBtn">
				<button class="blueBtn" @click="now">{{$t('fbcsFile.tips.now')}}</button>
				<button class="blueBtn" @click="submit">{{$t('fbcsFile.tips.ok')}}</button>
				<button class="defBtn" @click="showDialog=false">{{$t('fbcsFile.tips.cancel')}}</button>
			</div>
		</el-dialog>
		<lgy-review :show.sync='showReview' :reqsv='reqsv' @submit='review' :txt='reviewTxt'></lgy-review>
		<lgy-wheelReq :parameter.sync="parameter"></lgy-wheelReq>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';

var _this, data = {
	id: '',
	name: '',
	keywords: null,
	list: [
		{userID: 'userID', userName: 'userName', ekeyName: 'ekeyName',validDate: 1535646546566, ekeyComment: 'ekeyComment'}
	],
	page: 1,
	total: 1,
	showDialog: false,
	dialogTitle: '',
	ekeyInfo: {
		userID: '', userName: '', validDate: '', ekeyComment: '', 
	},
	disabled: false,
	showReview: false,
    reqsv: {uri:''},
    parameter: null,
    jump: false,
}, args;

function delEkey(row){
	utils.confirm({
		txt: _this.$t('fbcsFile.Ekey.delEkey'),
		ok: () => {
			let params = {}
			params.url = 'userEkey/delete';
			params.cmdID = '600034';
			params.ekeyName = row.ekeyName;
			
			utils.post(params).then(function(res){
				utils.alert({txt: res.errinfo});
			});
		},
		now: obj => {
			obj.uri = 'userEkey/deleteImmediately';
			_this.reqsv = obj;
			_this.showReview = true;
		},
		btn: 3
	}, {now: row})
}
function delNow(obj){
//	console.log(obj);
	let params = {}
	params.url = 'userEkey/delete';
	params.cmdID = '600034';
	params.ekeyName = obj.ekeyName;
	params.reviewer = obj.name;
	
	utils.post(params).then(function(res){
		if(res.errcode!='0') return utils.alert({txt: res.errinfo});
		_this.parameter = res;
	});
}
function showEditEkey(row){
	_this.dialogTitle = _this.$t('fbcsFile.fnField.editEkey');
	_this.disabled = true;
	_this.ekeyInfo.userID = row.userID;
	_this.ekeyInfo.ekeyName = row.ekeyName;
	_this.ekeyInfo.validDate = row.validDate;
	_this.ekeyInfo.ekeyComment = row.ekeyComment;
	_this.showDialog = true;
}

export default {
	data(){
		data.title = {
			userID: this.$t('fbcsFile.tableTitle.userID'),
			userName: this.$t('fbcsFile.tableTitle.userName'),
			ekeyName: this.$t('fbcsFile.tableTitle.ekeyName'),
			validDate: this.$t('fbcsFile.tableTitle.ekeyDate'),
			ekeyComment: this.$t('fbcsFile.tableTitle.ekeyInfo'),
		};
		data.defined = {
			label: this.$t('fbcsFile.tableTitle.operation'), width: 82,
			items: [
				{src:require('@/fbcsFxViews/img/table/edit.png'), click: showEditEkey, tips: this.$t('fbcsFile.tableDefined.editEkey') },
				{src:require('@/fbcsFxViews/img/table/del.png'), click: delEkey, tips: this.$t('fbcsFile.tableDefined.delEkey') },
			]
		};
		return data;
	},
	props: {
		isPage: {
			type: Boolean,
			default: true
		},
		tab: '',
		isNew: false
	},
	methods:{
		search(){
			this.page = 1;
			search();
		},
		changePage(num){
			search();
		},
		showAddEkey(){
			this.dialogTitle = this.$t('fbcsFile.fnField.addEkey');
			for(let k in this.ekeyInfo){
				this.ekeyInfo[k] = '';
			}
			nextFrame()
//			if(this.isPage){
//				this.disabled = false;
//			} else {
//				this.ekeyInfo.userID = args.userID;
//				this.disabled = true;
//			}
			this.showDialog = true;
		},
		submit(){
			if(check()) return;
			this.disabled ? edit() : add();
		},
		now(){
			if(check()) return;
			if(this.disabled){ //editNow
				this.reqsv = {uri: 'userEkey/modifyImmediately'};
			} else { //addNow
				this.reqsv = {uri: 'userEkey/addImmediately'};
			}
			this.showReview = true;
			this.showDialog = false;
		},
		review(obj){
			switch (obj.uri){
				case "userEkey/addImmediately": 
					addNow(obj); break;
				case "userEkey/modifyImmediately": 
					editNow(obj); break;
				case "userEkey/deleteImmediately": 
					delNow(obj); break;
				default: break;
			}
		},
	},
	created(){
		_this = this;
		this.jump = this.isNew;
		args = utils.getArgs('userInfo');
		this.id = this.name = ''
		this.keywords = null;
		this.showDialog = false;
		if(!this.isPage && args){
			this.id = args.userID;
		}
		search();
	}
}
function add(){
	let params = Object.assign({}, _this.ekeyInfo);
	params.url = 'userEkey/add';
	params.cmdID = '600032';
	params.validDate = _this.ekeyInfo.validDate / 1000;
	
	utils.post(params).then(function(res){
		utils.alert({txt: res.errinfo});
		if(res.errcode!='0') return
		if(_this.jump){
			_this.jump = false;
			_this.$emit('update:tab', 'third');
		}
	});
}
function edit(){
	let params = Object.assign({}, _this.ekeyInfo);
	params.url = 'userEkey/modify';
	params.cmdID = '600033';
	params.validDate = _this.ekeyInfo.validDate / 1000;
	
	utils.post(params).then(function(res){
		utils.alert({txt: res.errinfo});
	});
}
function addNow(obj){
	let params = Object.assign({}, _this.ekeyInfo);
	params.url = 'userEkey/addImmediately';
	params.cmdID = '600035';
	params.validDate = _this.ekeyInfo.validDate / 1000;
	params.reviewer = obj.name;
	
	utils.post(params).then(function(res){
		if(res.errcode!='0') return utils.alert({txt: res.errinfo});
		_this.parameter = res;
	});
}
function editNow(obj){
	let params = Object.assign({}, _this.ekeyInfo);
	params.url = 'userEkey/modifyImmediately';
	params.cmdID = '600036';
	params.validDate = _this.ekeyInfo.validDate / 1000;
	params.reviewer = obj.name;
	
	utils.post(params).then(function(res){
		if(res.errcode!='0') return utils.alert({txt: res.errinfo});
		_this.parameter = res;
	});
}

function check(){
	let info = _this.ekeyInfo;
	if(!info.userID) {
		utils.confirm({txt: _this.$t('fbcsFile.Ekey.errID'), btn: 1});
		return true;
	}
	if(!info.ekeyName) {
		utils.confirm({txt: _this.$t('fbcsFile.Ekey.errName'), btn: 1});
		return true;
	}
	return false;
}

function search(){
	let params = {
		url: 'userEkey/query',
		cmdID: '600031',
		userID: _this.id,
		ekeyName: _this.name,
		pageSize: 20,
		currentPage: _this.page
	};
	utils.post(params).then(function(res){
		if(res.errcode!='0') return console.warn(res.errinfo);
		if(res.totalPage>1 && _this.page > res.totalPage){
			_this.page = res.totalPage;
			return search();
		}
		_this.list = res.lists;
		_this.page = res.currentPage;
		_this.total = res.totalSize;
	});
}
function nextFrame(){
	setTimeout(() => {
		if(_this.isPage){
			_this.disabled = false;
		} else {
			_this.ekeyInfo.userID = args.userID;
			_this.disabled = true;
		}
	}, 0);
}
</script>

<style scoped="scoped">
	.Ekey{min-width: 696px;padding-right: 20px;background: #FFF;}
</style>