<template>
	<div class="blacklist">
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
			<button @click="setBlack" class="blueBtn mt">{{$t('fbcsFile.files.blacklist.blackBtn')}}</button>
		</div>
		<lgy-review :show.sync='showReview' :reqsv='reqsv' @submit='review' :txt='reviewTxt'></lgy-review>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';

var _this, data = {
	nodeList: [
		{nodeName:'shenzhen', cuName:'cu-2', isBlack:'白名单'}, {nodeName:'beijing', cuName:'cu-1', isBlack:'白名单'}
	],
	cuList: [],
	showReview: false,
	reqsv: {}
};

export default {
	data(){ return data;},
	methods:{
		rowClass({row, rowIndex}){
			if(rowIndex%2 != 0) return 'tableBG';
			return '';
		},
		selectChange(arr){
			this.cuList = arr;
		},
		setBlack(){
			this.reqsv = {uri: 'batchDispatch/dispatch'};
			this.showReview = true;
		},
		review(args){
			let params = {
				url: 'userClientFile/blackList',
				cmdID: '600066',
				reviewer: args.name,
				count: this.cuList.length,
				lists: this.cuList
			};
			utils.post(params).then(function(res){
				utils.alert({txt: res.errinfo, type: res.errcode!='0'?0:1});
			});
		},
	},
	created(){
		_this = this;
//		this.nodeList = this.cuList = [];
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
		let i, arr = res.lists, len = arr.length, obj;
		for (i = 0; i < len; i++) {
			obj = arr[i];
			let str = obj.blackFlag ? 'black' : 'white';
			obj.isblack = _this.$t('fbcsFile.dispatch.nodeName'+str);
			if(obj.blackFlag) _this.cuList.push(obj);
		}
		_this.nodeList = res.lists;
		setTimeout(function(){
			_this.cuList.forEach(r => {
				_this.$refs['nodes'].toggleRowSelection(r, true);
			});
		});
	});
}
</script>

<style scoped="scoped">
.blacklist{white-space: nowrap;}
.left{display: inline-block;vertical-align: top;width: 120px;text-align: right;padding-right: 10px;}
.label{font-size: 16px;color: #666;}
.right{display: inline-block;vertical-align: top;width: 500px;margin-right: 20px;}
.mt{margin-top: 20px;}
</style>