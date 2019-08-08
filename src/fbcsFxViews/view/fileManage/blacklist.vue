<template>
	<div class="blacklist">
		<header class="backHead">
			<span class="back" @click="back">&lt; {{$t('fbcsFile.tips.back')}}</span>
			<b class="h1">{{this.$t('fbcsFile.files.blacklist.title')}}</b>
		</header>
		<div class="left">
			<p class="label">{{$t('fbcsFile.files.blacklist.cuList')}}</p>
		</div><div class="right">
			<el-table ref="nodes" :data="nodeList" :row-class-name="rowClass" max-height="294" highlight-current-row border
				@selection-change="selectChange">
				<el-table-column type="selection" width="40" key></el-table-column>
				<el-table-column prop="nodeName" :label="$t('fbcsFile.files.blacklist.nodeName')"></el-table-column>
				<el-table-column prop="cuName" :label="$t('fbcsFile.files.blacklist.cuName')"></el-table-column>
				<el-table-column prop="isBlack" :label="$t('fbcsFile.files.blacklist.cuType')"></el-table-column>
			</el-table>
			<button v-if="fxAuth" @click="setBlack" class="blueBtn mt">{{$t('fbcsFile.files.blacklist.blackBtn')}}</button>
		</div>
		<lgy-review :show.sync='showReview' :reqsv='reqsv' @submit='review' :txt='reviewTxt'></lgy-review>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';

var _this, data = {
	fxAuth: true,
	nodeList: [
		{nodeName:'shenzhen', cuName:'cu-2', isBlack:'白名单'}, {nodeName:'beijing', cuName:'cu-1', isBlack:'白名单'}
	],
	cuList: [],
	showReview: false,
	reqsv: {},
	reviewTxt: ''
};

export default {
	data(){ return data;},
	methods:{
		back(){
			this.$router.push({path: '/main/fxCfg/fileManage/regain'});
		},
		rowClass({row, rowIndex}){
			if(rowIndex%2 != 0) return 'tableBG';
			return '';
		},
		selectChange(arr){
			this.cuList = {};
			for (var i = 0; i < arr.length; i++) {
				let cu = arr[i];
				this.cuList[cu.k] = cu;
			}
		},
		setBlack(){
			this.reqsv = {uri: 'batchDispatch/dispatch'};
			this.reviewTxt = this.$t('fbcsFile.files.blacklist.cuSet');
			this.showReview = true;
		},
		review(args){
			var nodes = this.nodeList;
			nodes.forEach(r => {
				let cu = _this.cuList[r.k];
				r.blackFlag = cu ? '1' : '0';
			});
			let params = {
				url: 'userClientFile/blackList',
				cmdID: '600066',
				reviewer: args.name,
				reviewerPasswd: args.pwd,
				count: nodes.length,
				lists: nodes
			};
			utils.post(params).then(function(res){
				utils.alert({txt: res.errinfo, type: res.errcode!='0'?0:1});
				nodeCu();
			});
		},
	},
	created(){
		_this = this;
		this.fxAuth = utils.getFxAuth;
		this.nodeList = this.cuList = [];
		nodeCu();
	}
}

function nodeCu(){
	let params = {
		url: 'batchDispatch/queryNodeCu',
		cmdID: '600081',
		type: 0
	};
	utils.post(params).then(function(res){
		if(res.errcode!='0') return utils.alert({txt: res.errinfo, type:0});
		var black = _this.$t('fbcsFile.files.blacklist.black'),
			white = _this.$t('fbcsFile.files.blacklist.white'),
			cuList = [];
		let i, arr = res.lists, len = arr.length, obj;
		for (i = 0; i < len; i++) {
			obj = arr[i];
			obj.k = i;
			if(obj.blackFlag == '1'){
				obj.isBlack = black;
				cuList.push(obj);
			} else obj.isBlack = white;
		}
		_this.nodeList = res.lists;
		setTimeout(function(){
			cuList.forEach(r => {
				_this.$refs['nodes'].toggleRowSelection(r, true);
			});
		});
	});
}
</script>

<style scoped="scoped">
.blacklist{min-width: 640px;white-space: nowrap;}
.left{display: inline-block;vertical-align: top;width: 120px;text-align: right;padding-right: 10px;}
.label{font-size: 16px;color: #666;}
.right{display: inline-block;vertical-align: top;width: 500px;margin-right: 20px;}
.mt{margin-top: 20px;}
</style>
