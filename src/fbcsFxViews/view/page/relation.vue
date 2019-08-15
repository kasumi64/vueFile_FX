<template>
	<!--relation通信关系-->
	<div class="relation">
		<div class="searchBar">
			<label class="label">{{$t('fbcsFile.searchBar.userID')}}</label>
			<input v-if="!isPage" v-model="id" class="words" disabled="true"/>
			<lgy-candidateWords v-if="isPage" v-model="id" :keywords="idWords" @input="idInput" class="words"></lgy-candidateWords>
			<label class="label">{{$t('fbcsFile.searchBar.userID')}}</label>
			<lgy-candidateWords v-model="name" :keywords="nameWords" @input="nameInput" class="words" ></lgy-candidateWords>
			<button class="blueBtn" @click="search">{{$t('fbcsFile.searchBar.search')}}</button>
		</div>
		<ul class="fnField">
			<li @click="add" v-if="fxAuth">
				<img class="icon" src="@/fbcsFxViews/img/FnIcon/addSignal.png"/>
				<span class="label">{{$t('fbcsFile.relation.addSignal')}}</span>
			</li><li @click="dels" v-if="fxAuth">
				<img class="icon" src="@/fbcsFxViews/img/FnIcon/delSignal.png"/>
				<span class="label">{{$t('fbcsFile.relation.delSignal')}}</span>
			</li><li @click="advanced" v-if="isPage">
				<img class="icon" src="@/fbcsFxViews/img/FnIcon/searchSignal.png"/>
				<span class="label">{{$t('fbcsFile.searchBar.advanced')}}</span>
			</li>
		</ul>
		<lgy-table ref="table" :list="list" :title="title" :defined="defined" :total="total" :selection="true" :currentPage="page"
			@selectChange="selectChange" @changePage="changePage" >
		</lgy-table>
		
		<el-dialog :visible.sync="showDialog" :title="$t('fbcsFile.fnField.addSignal')" v-dialogDrag
			:close-on-click-modal='false' :show-close="false">
			<ul class="_dialog">
				<li>
					<div class="left">
						<p class="txt">
							<span class="red">*</span>
							{{$t('fbcsFile.relation.userID1')}}
						</p>
					</div><div class="right">
						<lgy-candidateWords v-model="oneid" :keywords="oneWords" @input="oneInput" :disabled="oneDisable"></lgy-candidateWords>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">
							<span class="red">*</span>
							{{$t('fbcsFile.relation.userID2')}}
						</p>
					</div><div class="right">
						<el-select class="selm" v-model="sid" :disabled="disabled" multiple filterable remote :remote-method="filter">
							<el-option v-for="item in idarr" :key="item.value" :label="item.lable" :value="item.value">
							</el-option>
						</el-select>
						<button class="defBtn mf" @click="clear">{{$t('fbcsFile.relation.clear')}}</button>
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
	fxAuth: true,
	id: '',
	name: '',
	idWords: null,
	nameWords: null,
	placeholder: '',
	list: [
		{userID1: '01', userName1: 'name1'},{userID1: '02', userName1: 'name2'},{userID1: '03', userName1: 'name3'},
	],
	page: 1,
	total: 1,
	selected: [],
	showDialog: true,
	oneid: '',
	oneWords: null,
	sid: [],
	idarr: [
		{value: 'HTML123', label: 'HTML'}, {value: 'CSS123', label: 'CSS'}, {value: 'JavaScript123', label: 'JavaScript'}
	],
	oneDisable: false,
    disabled: true,
    showReview: false,
    reqsv: {uri:''},
    reviewTxt: '',
    parameter: ''
};
var userid, args;

function del(row){
	if(!(row instanceof Array)) row = [row];
	let arr = [];
	for(let i=0; i<row.length; i++){
		arr.push({userID1:row[i].userID1, userID2:row[i].userID2});
	}
	let params = {
		url: 'userComm/delete',
		cmdID: '600043',
		lists: arr,
		counts: arr.length
	};
	
	utils.confirm({
		txt: _this.$t('fbcsFile.relation.sureSignal'),
		ok: o => {
			utils.post(params).then(res => {
				utils.alert({txt: res.errinfo, type: res.errcode!='0'?0:1});
				if(res.errcode != '0') return;
				search();
			});
		},
	});
	
}

export default {
	data(){
		data.title = {
			userID1: this.$t('fbcsFile.tableTitle.userID'),
			userName1: this.$t('fbcsFile.tableTitle.userName'),
			userID2: this.$t('fbcsFile.tableTitle.userID'),
			userName2: this.$t('fbcsFile.tableTitle.userName'),
			commConfigDate: this.$t('fbcsFile.tableTitle.buildTime')
		};
		data.defined = {
			label: this.$t('fbcsFile.tableTitle.operation'), width: 52,
			items: [
				{src:require('@/fbcsFxViews/img/table/del.png'), click: del, tips: this.$t('fbcsFile.tableDefined.delSignal') }
			]
		};
		if(!utils.getFxAuth) data.defined.items = [];
		return data;
	},
	props: {
		isPage: {
			type: Boolean,
			default: true
		}
	},
	methods:{
		advanced(){
			this.$router.push({path: '/main/fxCfg/advanced/signal'});
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
		nameInput(val){
			if(val=='') return this.nameWords = [].concat(userid);
			utils.keywords({id: val, type: 1}, arr => {
				_this.nameWords = arr;
			});
		},
		add(){
			this.oneWords = [].concat(userid);
			nextFrame();
			this.sid = [];
			this.showDialog = true;
		},
		clear(){
			/* if(this.isPage) {
				this.disabled = true;
				this.oneid = '';
			} */
			this.sid = [];
			this.oneWords = [].concat(userid);
			this.idarr = filterSig(this.oneid, [].concat(userid));
		},
		selectChange(arr){
			this.selected = arr;
		},
		dels(){
			if(this.selected.length==0) {
				return utils.confirm({txt:this.$t('fbcsFile.relation.errSignal'),btn:1});
			}
			del(this.selected);
		},
		oneInput(val){
			this.disabled = val=='' ? true : false;
			if(val=='') {
				this.clear();
				return this.oneWords = [].concat(userid);
			}
			utils.keywords({id: val, type: 2}, arr => {
				this.oneWords = arr;
			});
			copySig(val);
		},
		filter(val){
			if(val=='') {
				this.idarr = filterSig(this.oneid, [].concat(userid));
				return;
			}
			
			utils.keywords({id: val, type: 2}, arr => {
				this.idarr = filterSig(this.oneid, arr);
			});
		},
		submit(){
			if(utils.isSpace(this.oneid)) return utils.alert({txt:this.$t('fbcsFile.relation.errid1'),btn:1});
			if(!this.sid.length) return utils.alert({txt:this.$t('fbcsFile.relation.errid2'),btn:1});
			let params = {
				url: 'userComm/add',
				cmdID: '600042',
				userID1: this.oneid,
				lists: this.sid,
				count: this.sid.length
			};
			utils.post(params).then(res => {
				this.search();
				this.showDialog = false;
				utils.alert({txt: res.errinfo, type: (res.errcode=='0'||res.errcode=='1')?1:0});
			});
		},
		now(){
			if(utils.isSpace(this.oneid)) return utils.alert({txt:this.$t('fbcsFile.relation.errid1'),btn:1});
			if(this.sid.length==0) return utils.alert({txt:this.$t('fbcsFile.relation.errid2'),btn:1});
			if(this.sid.length>1) return utils.alert({txt:this.$t('fbcsFile.relation.errid3'),btn:1});
			this.reqsv = {uri: 'userComm/addImmediately'};
			this.showReview = true;
			this.showDialog = false;
		},
		review(obj){
			let params = {
				url: 'userComm/addImmediately',
				cmdID: '600044',
				reviewer: obj.name,
				reviewerPassword: obj.pwd,
				reviewType: 1,
				userID1: this.oneid,
				userID2: this.sid[0]
			};
			
//			console.log(params);
			utils.post(params).then(res => {
				if(res.errcode!='0') return utils.alert({txt: res.errinfo});
				_this.parameter = res;
				search();
			});
		}
	},
	created(){
		_this = this;
		this.fxAuth = utils.getFxAuth;
		args = utils.getArgs('userInfo');
		utils.once('fbcs_newUser', user => {
			args = user;
			init.call(_this);
		});
		this.page = 1;
		this.id = this.name = ''
		this.showDialog = false;
		this.idWords = this.nameWords = this.oneWords = null;
		this.list = [];
		userid = [];
		this.selected = [];
		this.showReview = false;
		this.parameter = null;
		
		init.call(this);
		
		utils.keywords({type: 2}, arr => {
			userid = [].concat(arr);
			_this.idWords = _this.nameWords = _this.oneWords = arr;
			if(!_this.isPage && args) copySig(args.userID);
		});
	}
};

function init(){
	if(!this.isPage && args&&args.userID){
		this.oneid = this.id = args.userID;
		this.disabled = false;
		this.idarr = [].concat(userid);
	}
	this.search();
}
function copySig(val){
	_this.sid = [];
	_this.idarr = filterSig(val, [].concat(userid));
}
function filterSig(val, arr){
	let i, len = arr.length, obj;
	for(i = 0; i < len; i++){
		obj = arr[i];
		if(val == obj.userID){
			arr.splice(i, 1);
			break;
		}
	}
	return arr;
}
function search(){
	let params = {
		url: 'userComm/query',
		cmdID: '600041',
		userID1: _this.id,
		userID2: _this.name,
		pageSize: 20,
		currentPage: _this.page
	};
	utils.post(params).then(res => {
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
		_this.list = res.lists;
		_this.page = res.currentPage;
		_this.total = res.totalSize;
	});
}

function nextFrame(){
	setTimeout(() => {
		if(_this.isPage){
			_this.disabled = true;
			_this.oneid = _this.id;
			_this.oneDisable = false;
		} else {
			_this.disabled = false;
			_this.oneDisable = true;
			_this.oneid = args.userID;
			_this.idarr = filterSig(args.userID, [].concat(userid));
		}
	}, 0);
}

</script>

<style scoped="scoped">
	.relation{min-width: 696px;padding-right: 20px;background: #FFF;}
	#fbcs_file .mf{margin-left: 10px;min-width: 60px}
	.selm{width: 300px;}
	#fbcs_file ._dialog .left{width: 140px;}
</style>
<style>
	#fbcs_file .relation input:disabled{border: none;z-index: 1;}
	#fbcs_file .relation .el-table__header .el-checkbox{display: inline-block;}
</style>
