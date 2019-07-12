<template>
	<div class="Ekey">
		<div v-if="isPage" class="searchBar">
			<label class="label">{{$t('fbcsFile.searchBar.userID')}}</label>
			<lgy-candidateWords v-model="id" :keywords="idWords" @input="idInput" class="words" ></lgy-candidateWords>
			<label class="label">{{$t('fbcsFile.searchBar.ekeyName')}}</label>
			<input v-model="name" class="words" :placeholder="$t('fbcsFile.searchBar.placeholder')" autocomplete="off"/>
			<button class="blueBtn" @click="search">{{$t('fbcsFile.searchBar.search')}}</button>
		</div>
		<ul class="fnField">
			<li @click="showAddEkey" v-if="fxAuth">
				<img class="icon" src="@/fbcsFxViews/img/FnIcon/addEkey.png"/>
				<span class="label">{{$t('fbcsFile.fnField.addEkey')}}</span>
			</li><li @click="advanced" v-if="isPage">
				<img class="icon" src="@/fbcsFxViews/img/FnIcon/searchEkey.png"/>
				<span class="label">{{$t('fbcsFile.searchBar.advanced')}}</span>
			</li>
		</ul>
		<lgy-table ref="table" :list="list" :title="title" :defined="defined" :total="total" :currentPage="page" @changePage="changePage" >
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
						<lgy-candidateWords v-model="ekeyInfo.userID" :keywords="ekWords" @input="ekInput" :disabled="disabled"></lgy-candidateWords>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">
							<span class="red">*</span>
							{{$t('fbcsFile.Ekey.ekeyName')}}
						</p>
					</div><div class="right">
						<input v-model="ekeyInfo.ekeyName" :disabled="disName" maxlength="63" autocomplete="off"/>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.Ekey.ekeyDate')}}</p>
					</div><div class="right">
						<el-date-picker v-model="ekeyInfo.validDate" class="picker" type="datetime" :clearable="false" :editable="false"
							:placeholder="$t('fbcsFile.tips.date')" value-format="timestamp" default-time="23:59:59" >
						</el-date-picker>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.Ekey.ekeyInfo')}}</p>
					</div><div class="right">
						<input v-model="ekeyInfo.ekeyComment" maxlength="255" autocomplete="off"/>
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
import utils  from '@/fbcsFxViews/libs/utils.js';
import moment from 'moment';

var _this, data = {
	fxAuth: true,
	id: '',
	name: '',
	idWords: null,
	ekWords: null,
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
	disName: false,
	showReview: false,
    reqsv: {uri:''},
    reviewTxt: '',
    parameter: null,
    jump: false,
}, userid, args, isAdd;

function delEkey(row){
	utils.confirm({
		txt: _this.$t('fbcsFile.Ekey.delEkey'),
		ok: () => {
			let params = {}
			params.url = 'userEkey/delete';
			params.cmdID = '600034';
			params.ekeyName = row.ekeyName;
			
			utils.post(params).then(function(res){
				utils.alert({txt: res.errinfo, type: res.errcode!='0'?0:1});
				if(res.errcode != '0') return;
				search();
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
	params.url = obj.uri;
	params.cmdID = '600037';
	params.ekeyName = obj.ekeyName;
	params.reviewer = obj.name;
	
	utils.post(params).then(function(res){
		if(res.errcode!='0') return utils.alert({txt: res.errinfo});
		_this.parameter = res;
		search();
	});
}
function showEditEkey(row){
	isAdd = false;
	_this.dialogTitle = _this.$t('fbcsFile.fnField.editEkey');
	_this.showDialog = true;
	setTimeout(() => {
		_this.disabled = _this.disName = true;
		_this.ekeyInfo.userID = row.userID;
		_this.ekeyInfo.ekeyName = row.ekeyName;
		_this.ekeyInfo.ekeyComment = row.ekeyComment;
		let t = row.validDate;
		_this.ekeyInfo.validDate = t ? t*1000 : '';
	});
}

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
				{src:require('@/fbcsFxViews/img/table/edit.png'), click: showEditEkey, tips: this.$t('fbcsFile.tableDefined.editEkey') },
				{src:require('@/fbcsFxViews/img/table/del.png'), click: delEkey, tips: this.$t('fbcsFile.tableDefined.delEkey') },
			]
		};
		if(!utils.getFxAuth) data.defined.items = [];
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
		advanced(){
			this.$router.push({path: '/main/fxCfg/advanced/Ekey'});
		},
		search(){
			this.page = 1;
			if(this.$refs.table != void 0)
				this.$refs.table.page = 1;
			search();
		},
		changePage(num){
			this.page = num;
			search();
		},
		idInput(val){
			if(val=='') return this.idWords = [].concat(userid);
			utils.keywords({id: val, type: 1}, arr => {
				_this.idWords = arr;
			});
		},
		ekInput(val){
			if(val=='') return this.ekWords = [].concat(userid);
			utils.keywords({id: val, type: 2}, arr => {
				_this.ekWords = arr;
			});
		},
		showAddEkey(){
			isAdd = true;
			this.disName = false;
			this.dialogTitle = this.$t('fbcsFile.fnField.addEkey');
			for(let k in this.ekeyInfo){
				this.ekeyInfo[k] = '';
			}
			this.ekWords = [].concat(userid);
			nextFrame();
			this.showDialog = true;
		},
		submit(){
			if(check()) return;
			isAdd ? add() : edit();
		},
		now(){
			if(check()) return;
			if(isAdd){ //addNow
				this.reqsv = {uri: 'userEkey/addImmediately'};
			} else { //editNow
				this.reqsv = {uri: 'userEkey/modifyImmediately'};
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
		this.fxAuth = utils.getFxAuth;
		this.jump = this.isNew;
		args = utils.getArgs('userInfo');
		utils.once('fbcs_newUser', user => {
			args = user;
			init.call(_this);
		});
		this.id = this.name = ''
		this.keywords = null;
		this.showDialog = false;
		this.list = [];
		userid = [];
		
		init.call(this);
		
		utils.keywords({type: 2}, arr => {
			userid = [].concat(arr);
			_this.idWords = _this.ekWords = arr;
		});
	}
};

function init(){
	if(!this.isPage && args&&args.userID){
		this.id = args.userID;
	}
	if(!(args&&args.type=='add')) this.search();
}
function add(){
	let params = Object.assign({}, _this.ekeyInfo);
	params.url = 'userEkey/add';
	params.cmdID = '600032';
	params.validDate = _this.ekeyInfo.validDate / 1000;
	
	utils.post(params).then(function(res){
		if(res.errcode!='0') return utils.alert({txt: res.errinfo});
		if(_this.jump){
			_this.jump = false;
			utils.confirm({
				txt: res.errinfo,
				ok: () => {
					_this.$emit('update:tab', 'third');
				}
			});
		} else {
			utils.alert({txt: res.errinfo, type:1});
		}
		search();
		_this.showDialog = false;
	});
}
function edit(){
	let params = Object.assign({}, _this.ekeyInfo);
	params.url = 'userEkey/modify';
	params.cmdID = '600033';
	params.validDate = _this.ekeyInfo.validDate / 1000;
	
	utils.post(params).then(function(res){
		if(res.errcode!='0') return utils.alert({txt: res.errinfo});
		utils.alert({txt: res.errinfo, type: 1});
		search();
		_this.showDialog = false;
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
		search();
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
		search();
	});
}

function check(){
	let info = _this.ekeyInfo;
	if(utils.isSpace(info.userID)) {
		utils.alert({txt: _this.$t('fbcsFile.Ekey.errID'), btn: 1});
		return true;
	}
	
	if(utils.isSpace(info.ekeyName)) {
		utils.alert({txt: _this.$t('fbcsFile.Ekey.errName'), btn: 1});
		return true;
	} else if(/[\%]/.test(info.ekeyName)){
		utils.alert({txt: _this.$t('fbcsFile.Ekey.ekeyNameFormat'), btn: 1});
		return true;
	}
	
	if(/[\%]/.test(info.ekeyComment)){
		utils.alert({txt: _this.$t('fbcsFile.Ekey.ekeyCommentFormat'), btn: 1});
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
			if(obj.validDate){
				obj.ymd = moment(obj.validDate * 1000).format('YYYY-MM-DD HH:mm:ss');
			} else {
				obj.validDate = obj.ymd = '';
			}
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