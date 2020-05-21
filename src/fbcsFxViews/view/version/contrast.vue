<template>
	<div class="contrast">
		<div class="searchBar">
			<label class="label">{{$t('fbcsFile.versionContrast.type')}}：</label>
			<el-select v-model="type" @change="changeType" id="type">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<p class="jg"></p>
			<label class="label">{{$t('fbcsFile.versionContrast.ver1')}}</label>
			<lgy-candidateWords v-model="id1" id="version1" :keywords="ver1" @input="input1" class="words"></lgy-candidateWords>
			<label class="label">{{$t('fbcsFile.versionContrast.ver2')}}</label>
			<lgy-candidateWords v-model="id2" id="version2" :keywords="ver2" @input="input2" class="words"></lgy-candidateWords>
			<button class="blueBtn mr20" @click="search" id="search">{{$t('fbcsFile.versionContrast.btn')}}</button>
		</div>
		<lgy-table :list="list" :title="title1" v-if="disabled" :width="width" :total="total" :currentPage="page" @changePage="changePage" >
		</lgy-table>
		<lgy-table id="ZD" :list="list" :title="title2" v-if="!disabled" :width="width" :total="total" :currentPage="page" @changePage="changePage" >
		</lgy-table>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';

var _this, verWords = [], words3 = [], words4 = [], defInput;

export default {
	data(){
		let bingo = {
			id1: '',
			id2: '',
			ver1: [],
			ver2: [],
			type: 1,
			disabled: true,
			list: [],
			page: 1,
			total: 1
		};
		
		bingo.options = this.$t('fbcsFile.versionContrast.options1');
		bingo.title1 = {
			section: this.$t('fbcsFile.versionContrast.section'),
			field: this.$t('fbcsFile.versionContrast.field'),
			type: this.$t('fbcsFile.versionContrast.type'),
			detail: this.$t('fbcsFile.versionContrast.detail')
		};
		bingo.title2 = {
			type: this.$t('fbcsFile.versionContrast.type'),
			detail: this.$t('fbcsFile.versionContrast.detail')
		};
		bingo.width = {
			section: 180,
			field: 180,
			type: 180
		};
		defInput = [
			this.$t('fbcsFile.versionContrast.online'),
			this.$t('fbcsFile.versionContrast.temp')
		];
		return bingo;
	},
	methods:{
		changeType(val){
			changeType(val);
		},
		search(){
			this.page = 1;
			search();
		},
		changePage(num){
			this.page = num;
			search();
		},
		input1(val){
			// if(val=='') return this.ver1 = [].concat(verWords);
			keywords(val, arr => { _this.ver1 = arr; });
		},
		input2(val){
			// if(val=='') return this.ver2 = [].concat(verWords);
			keywords(val, arr => { _this.ver2 = arr; });
		},
	},
	created(){
		_this = this;
		this.ver1 = this.ver2 = [];
		this.type = 1;
		this.page = 1;
		this.total = 1;
		this.list = [];
		// keywords('', arr => { words3 = arr; }, 3);
		// keywords('', arr => { words4 = arr; }, 4);
		getZdEnabled();
	},
	mounted(){
		setTimeout(changeType, 500, 1);
	}
};

function keywords(val, fn, t){
	var type = t || _this.type;
	let params = {
		url: 'version/queryCompare',
		cmdID: '600072',
		version: val,
		type: type,
		pageSize: 100,
		currentPage: 1
	};
	utils.post(params).then(res => {
		if(res.errcode!='0') return console.log(res.errinfo);
		var i, arr = res.lists, len = arr.length, obj;
		for(i = 0; i < len; i++){
			obj = arr[i];
			obj.label = obj.value = obj.version;
		}
		if(type < 3){
			for (i = defInput.length-1; i >= 0; i--) {
				let label = defInput[i].toLocaleLowerCase();
				let str = val.toLocaleLowerCase();
				if(label.indexOf(str)!=-1) arr.unshift({label:label, value: label});
			}
		}
		fn(arr);
	});
}

function search(){
	var ver1 = _this.id1, ver2 = _this.id2;
	if(ver1==''||ver2==''){
		return utils.alert({
			txt: _this.$t('fbcsFile.versionContrast.noNull')
		});
	}
	
	if(ver1 == defInput[0]) ver1 = 'online';
	else if(ver1 == defInput[1]) ver1 = 'temp';
	if(ver2 == defInput[0]) ver2 = 'online';
	else if(ver2 == defInput[1]) ver2 = 'temp';
	
	let params = {
		url: 'version/compare',
		cmdID: '600074',
		type: _this.type,
		version1: ver1,
		version2: ver2,
		pageSize: 20,
		currentPage: _this.page
	};
	utils.post(params).then(res => {
		if(res.errcode!='0') { //清缓存历史
			_this.list = [];
			_this.page = 1;
			_this.total = 0;
			return utils.alert({txt: res.errinfo});
		}
		if(res.totalPage>0 && _this.page > res.totalPage){
			_this.page = res.totalPage;
			return search();
		}
		_this.list = res.lists;
		_this.page = res.currentPage;
		_this.total = res.totalSize;
		if(res.lists.length == 0) {
			utils.alert({txt: _this.$t('fbcsFile.versionContrast.res'), type: 1});
		}
	});
}
function changeType(val){
	_this.list = [];
	_this.total = 0;
	
	if(val > 2){
		_this.id1 = _this.id2 = '';
		_this.disabled = false;
	} else {
		_this.id1 = defInput[0];
		_this.id2 = defInput[1];
		_this.disabled = true;
	}
	
	// verWords = [].concat(val==3 ? words3 : words4);
	// _this.ver1 = _this.ver2 = verWords;
	keywords('', arr => { _this.ver1 = _this.ver2 = arr; });
}

function getZdEnabled(){
	let params = {
		url: 'version/isOpenZd',
		cmdID: '600070'
	};
	utils.post(params).then(res => {
		if(res.errcode != '0') return console.warn("600070:", res.errinfo);
		if(res.isOpenZd == 0){
			_this.options = _this.$t('fbcsFile.versionContrast.options2');
		} else {
			_this.options = _this.$t('fbcsFile.versionContrast.options1');
		}
	});
}
</script>

<style scoped="scoped">
	.contrast{min-width: 703px;}
	.words{width: 272px;}
	.jg{height: 10px;}
	.el-select{width: 220px;}
</style>
