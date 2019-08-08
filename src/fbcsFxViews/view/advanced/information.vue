<template>
	<div class="information">
		<header class="backHead">
			<span class="back" @click="back">&lt; {{$t('fbcsFile.tips.back')}}</span>
			<b class="h1">{{this.$t('fbcsFile.advanced.information.title')}}</b>
		</header>
		<div class="searchBar">
			<label class="label">{{$t('fbcsFile.advanced.information.listName')}}</label>
			<el-select v-model="listType" class="words w100">
				<el-option v-for="item in listItem" :key="item.val" :label="item.label" :value="item.val">
				</el-option>
			</el-select>
			<label class="label">{{$t('fbcsFile.advanced.user.userID')}}</label>
			<lgy-candidateWords v-model="info.userID" :keywords="idWords" @input="idInput" class="words" ></lgy-candidateWords>
			<label class="label">{{$t('fbcsFile.advanced.user.userName')}}</label>
			<!-- <input v-model="info.userName":disabled="listType=='BOP'" class="words" :placeholder="$t('fbcsFile.searchBar.placeholder')" autocomplete="off"/> -->
			<lgy-candidateWords v-model="info.userName" :keywords="nameWords" @input="nameInput" class="words" ></lgy-candidateWords>
			<p class="jg"></p>
			<label class="label">{{$t('fbcsFile.advanced.information.company')}}：</label>
			<input v-model="info.opeartorCompany" :disabled="listType=='OPE'" class="words" :placeholder="$t('fbcsFile.searchBar.placeholder')" autocomplete="off"/>
			<label class="label">{{$t('fbcsFile.advanced.information.ssccManager')}}：</label>
			<input v-model="info.ssccManager" class="words" :placeholder="$t('fbcsFile.searchBar.placeholder')" autocomplete="off"/>
			<button class="blueBtn words" @click="search">{{$t('fbcsFile.searchBar.search')}}</button>
		</div>
		<ul class="fnField">
			<li @click="expcsv('OPE')" :class="{disabled: disabledOPE}">
				<img class="icon" src="@/fbcsFxViews/img/FnIcon/exportExtendInformation.png"/>
				<span class="label">{{$t('fbcsFile.advanced.information.expcsv')}}</span>
			</li>
			<!--<li @click="expcsv('BOP')" :class="{disabled: disabledBOP}">
				<img class="icon" src="@/fbcsFxViews/img/FnIcon/exportExtendInformation.png"/>
				<span class="label">{{$t('fbcsFile.advanced.information.expBOP')}}</span>
			</li>-->
		</ul>
		<p class="h2">{{$t('fbcsFile.advanced.information.resOPE')}}</p>
		<lgy-table ref="OPE" :list="listOPE" :title="titleOPE" :size="pageSize" :total="totalOPE" :currentPage="pageOPE" :fliover="changeOPE" :maxHeight="416">
		</lgy-table>
		<p class="h2">{{$t('fbcsFile.advanced.information.resBOP')}}</p>
		<lgy-table ref="BOP" :list="listBOP" :title="titleBOP" :size="pageSize" :total="totalBOP" :currentPage="pageBOP" :fliover="changeBOP" :maxHeight="416">
		</lgy-table>
		<el-dialog :visible.sync="showDialog" :title="dialogTitle" v-dialogDrag :close-on-click-modal='false' :show-close="false">
			<ul class="_dialog">
				<li>
					<span class="txt w80">{{$t('fbcsFile.advanced.user.fileName')}}</span>
					<a class="a" :href="fileHref">{{fileName}}</a>
				</li><li>
					<p class="txt rClick">{{$t('fbcsFile.tips.rightClick')}}</p>
				</li>
			</ul>
			<div slot="footer" class="_footBtn">
				<button class="defBtn" @click="showDialog=false">{{$t('fbcsFile.tips.close')}}</button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';

var _this, data = {
	info: {
		userID: '', userName: '', ssccManager: '', opeartorCompany: '',
	},
	listType: '', listItem: [],
	idWords: null,
	nameWords: null,
	listOPE: [
		{userID: 'userID', userName: 'userName', operatorTelNum: 1535646546566, operatorEmail: 'ekeyComment'},
	],
	pageOPE: 1, totalOPE: 1,
	listBOP: [
		{userID: 'userID', userName: 'userName', operatorTelNum: 1535646546566, operatorEmail: 'ekeyComment'},
	],
	pageBOP: 1, totalBOP: 1,
	showDialog: false,
	fileHref: '#', fileName: '', dialogTitle: '',
	disabledPOE: false, disabledBOP: false,
	pageSize: 10,
	changeOPE(num){
		_this.pageOPE = num;
		search('OPE');
	},
	changeBOP(num){
		_this.pageBOP = num;
		search('BOP');
	}
};
var idAll = [];

export default {
	data(){
		data.listItem = this.$t('fbcsFile.advanced.information.listType');
		data.titleOPE = {
			userID: this.$t('fbcsFile.tableTitle.userID'),
			userName: this.$t('fbcsFile.tableTitle.userName'),
			operatorName: this.$t('fbcsFile.advanced.information.operatorName'),
			operatorMobileNum: this.$t('fbcsFile.advanced.information.mobileNum'),
			operatorEmail: this.$t('fbcsFile.advanced.information.email'),
			operatorTelNum: this.$t('fbcsFile.advanced.information.telNum'),
			ssccManager: this.$t('fbcsFile.advanced.information.ssccManager'),
			ssccManagerTelNum: this.$t('fbcsFile.advanced.information.ssccManagerTelNum'),
			ssccManagerMobileNum: this.$t('fbcsFile.advanced.information.ssccManagerMobileNum'),
			operatorCompany: this.$t('fbcsFile.advanced.information.company'),
			operatorDepartment: this.$t('fbcsFile.advanced.information.department')
		};
		data.titleBOP = {
			userID: this.$t('fbcsFile.tableTitle.userID'),
			userName: this.$t('fbcsFile.tableTitle.userName'),
			operatorName: this.$t('fbcsFile.advanced.information.operatorName'),
			operatorMobileNum: this.$t('fbcsFile.advanced.information.mobileNum'),
			operatorEmail: this.$t('fbcsFile.advanced.information.email'),
			ssccManager: this.$t('fbcsFile.advanced.information.ssccManager'),
			operatorCompany: this.$t('fbcsFile.advanced.information.company'),
			operatorDepartment: this.$t('fbcsFile.advanced.information.department'),
		};
		return data;
	},
	methods:{
		back(){
			this.$router.push({path: '/main/fxCfg/userHome'});
		},
		search(){
			let type = _this.listType;
			if(type=='OPE'){
				_this.pageOPE = 1;
				if(this.$refs.OPE) this.$refs.OPE.ElPager(1);
			} else if(type == 'BOP'){
				_this.pageBOP = 1;
				if(this.$refs.BOP) this.$refs.BOP.ElPager(1);
			} else {
				_this.pageOPE = 1;
				_this.pageBOP = 1;
				if(this.$refs.OPE) this.$refs.OPE.ElPager(1);
				if(this.$refs.BOP) this.$refs.BOP.ElPager(1);
			}
			search();
		},
		idInput(val){
			if(val=='') return this.idWords = [].concat(idAll);
			utils.keywords({id: val}, arr => {
				_this.idWords = arr;
			});
		},
		nameInput(userName){
			let params = {
				userID: userName,
				userName,
			};
			utils.keywords(params, {
				label: ['userName','userID'],
				value: 'userName'
			}).then(arr => {
				_this.nameWords = arr;
			});
		},
		expcsv(bop){
			this.fileName = '';
			let param = Object.assign({}, this.info);
			if(bop=='BOP'){
				if(this.disabledBOP) return;
				this.dialogTitle = this.$t('fbcsFile.advanced.information.expBOP');
				param.url = 'advancedSearch/userextBop';
				param.cmdID = '600057';
				param.pageSize = _this.totalBOP;
			} else {
				if(this.disabledOPE) return;
				this.dialogTitle = this.$t('fbcsFile.advanced.information.expcsv');
				param.url = 'advancedSearch/userinfoextOperator';
				param.cmdID = '600054';
				param.pageSize = _this.totalOPE;
			}
			param.currentPage = 1;
			param.type = 1;
			
			utils.post(param).then(res => {
				if(res.errcode!='0') return utils.alert({txt: res.errinfo});
				if(!res.errinfo) return;
				_this.fileHref = res.errinfo;
				_this.fileName = res.errinfo.split('/').pop();
			});
			this.showDialog = true;
		},
	},
	created(){
		_this = this;
		let info = _this.info;
		for (let k in info) info[k] = '';
		this.listType = 'all';
		this.listOPE = this.listBOP = [];
		this.disabledOPE = this.disabledBOP = false;
		this.pageOPE = 1;
		this.pageBOP = 1;
		search();
		utils.keywords({}, arr => {
			idAll = [].concat(arr);
			_this.idWords = arr;
		});
	},
	watch: {
		listType(val){
			if(val == 'OPE'){
				this.disabledOPE = false
				this.disabledBOP = true;
			}else if(val == 'BOP'){
				this.disabledOPE = true
				this.disabledBOP = false;
			} else {
				this.disabledOPE = false
				this.disabledBOP = false;
			}
		}
	}
}

function search(p){
	let type = p || _this.listType;
	if(type=='OPE'){
		searchOPE();
	} else if(type == 'BOP'){
		searchBOP();
	} else {
		searchOPE();
		searchBOP();
	}
}

function searchOPE(){
	let param = Object.assign({}, _this.info);
	param.url = 'advancedSearch/userinfoextOperator';
	param.cmdID = '600054';
	param.pageSize = _this.pageSize;
	param.currentPage = _this.pageOPE;
	param.type = 0;
	
	utils.post(param).then(function(res){
		if(res.errcode!='0') { //清缓存历史
			_this.listOPE = [];
			_this.pageOPE = 1;
			_this.totalOPE = 0;
			return console.warn(res.errcode, res.errinfo);
		}
		if(res.totalPage>0 && _this.pageOPE > res.totalPage){
			_this.pageOPE = res.totalPage;
			return searchOPE();
		}
		_this.listOPE = res.lists;
		_this.pageOPE = res.currentPage;
		_this.totalOPE = res.totalSize;
	});
}

function searchBOP(){
	let param = Object.assign({}, _this.info);
	param.url = 'advancedSearch/userextBop';
	param.cmdID = '600057';
	param.pageSize = _this.pageSize;
	param.currentPage = _this.pageBOP;
	param.type = 0;
	
	utils.post(param).then(function(res){
		if(res.errcode!='0') { //清缓存历史
			_this.listBOP = [];
			_this.pageBOP = 1;
			_this.totalBOP = 0;
			return console.warn(res.errcode, res.errinfo);
		}
		if(res.totalPage>0 && _this.pageBOP > res.totalPage){
			_this.pageBOP = res.totalPage;
			return searchOPE();
		}
		_this.listBOP = res.lists;
		_this.pageBOP = res.currentPage;
		_this.totalBOP = res.totalSize;
	});
}

</script>

<style scoped="scoped">
	.information{min-width: 800px;}
	.jg{margin-bottom: 10px;}
	.w100{width: 100px;}
	.w80{width: 80px;text-align: right;}
	.h2{font-size: 16px;color: #333;margin-bottom: 10px;}
</style>
