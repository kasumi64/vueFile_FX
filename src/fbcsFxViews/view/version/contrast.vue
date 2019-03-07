<template>
	<div class="contrast">
		<div class="searchBar">
			<label class="label">{{$t('fbcsFile.versionContrast.type')}}：</label>
			<el-select v-model="type">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<p class="jg"></p>
			<label class="label">{{$t('fbcsFile.versionContrast.ver1')}}</label>
			<lgy-candidateWords v-model="id1" :keywords="ver1" @input="input1" class="words" ></lgy-candidateWords>
			<label class="label">{{$t('fbcsFile.versionContrast.ver2')}}</label>
			<lgy-candidateWords v-model="id2" :keywords="ver2" @input="input2" class="words"></lgy-candidateWords>
			<button class="blueBtn" @click="search">{{$t('fbcsFile.versionContrast.btn')}}</button>
		</div>
		<lgy-table :list="list" :title="title" :defined="defined" :total="total" :currentPage.sync="page" @changePage="changePage" >
		</lgy-table>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';

var _this, data = {
	id1: '',
	id2: '',
	ver1: [],
	ver2: [],
	type: '3',
	list: '',
	page: 1,
	total: 1
};
var verWords = [];

export default {
	data(){
		data.options = this.$t('fbcsFile.versionContrast.options');
		data.title = {
			section: this.$t('fbcsFile.versionContrast.section'),
			field: this.$t('fbcsFile.versionContrast.field'),
			type: this.$t('fbcsFile.versionContrast.type'),
			detail: this.$t('fbcsFile.versionContrast.detail')
		};
//		data.defined = {
//			label: this.$t('fbcsFile.tableTitle.operation'), width: 82,
//			items: [
//				{src:require('@/fbcsFxViews/img/logo.png'), click: showEditEkey, tips: this.$t('fbcsFile.tableDefined.editEkey') },
//			]
//		};
		return data;
	},
	props: {},
	methods:{
		search(){
			this.page = 1;
			search();
		},
		changePage(num){
			search();
		},
		input1(val){
			if(val=='') return this.ver1 = [].concat(verWords);
			keywords(val, arr => { _this.ver1 = arr; });
		},
		input2(val){
			if(val=='') return this.ver2 = [].concat(verWords);
			keywords(val, arr => { _this.ver2 = arr; });
		},
	},
	created(){
		_this = this;
		this.id1 = this. id2 = '';
		this.ver1 = this.ver2 = [];
		this.type = '3';
		this.page = 1;
		this.total = 1;
		this.list = [];
		keywords('', arr => {
			verWords = [].concat(arr);
			_this.ver1 = _this.ver2 = arr;
		});
	}
};

function keywords(val, fn){
	let params = {
		url: 'version/queryCompare',
		cmdID: '600072',
		version: val,
		pageSize: 100,
		currentPage: 1
	};
	utils.post(params).then(res => {
		if(res.errcode!='0') return console.log(res.errinfo);
		var i, arr = res.lists, len = arr.length, obj;
		for(i = 0; i < len; i++){
			obj = arr[i];
			obj.lable = obj.value = obj.version;
		}
		fn(arr);
	});
}

function search(){
	let params = {
		url: 'version/compare',
		cmdID: '600074',
		userID1: _this.id,
		userID2: _this.name,
		pageSize: 20,
		currentPage: _this.page
	};
	utils.post(params).then(res => {
		if(res.errcode!='0') return utils.alert({txt: res.errinfo});
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
	.jg{height: 10px;}
</style>