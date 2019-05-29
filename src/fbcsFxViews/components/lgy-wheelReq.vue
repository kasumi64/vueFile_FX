<style scoped="scoped">
	.lgy-wheelReq{z-index: 90000;}
	.lgy-wheelReq .warp{display: none;}
	.lgy-wheelReq .result{padding: 40px;}
</style>

<template>
	<div class="lgy-wheelReq">
		<div class="maskLayer warp" :class="{show:loading}">
			<div class="el-loading-spinner loadPanle">
				<svg viewBox="25 25 50 50" class="circular">
					<circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
				</svg>
			</div>
		</div>
		<el-dialog ref="maskDialog" :visible.sync="showDialog" width="70%" :title="$t('fbcsFile.components.result')" v-dialogDrag :close-on-click-modal='false' :show-close="false">
			<div class="_dialog">
				<el-table :data="cuList" :row-class-name="rowClass" max-height="294" highlight-current-row border>
					<el-table-column prop="nodeName" :label="$t('fbcsFile.dispatch.nodeName')"></el-table-column>
					<el-table-column prop="cuName" :label="$t('fbcsFile.dispatch.cuName')"></el-table-column>
					<el-table-column prop="errStr" :label="$t('fbcsFile.dispatch.errcode')"></el-table-column>
					<el-table-column prop="errinfo" :label="$t('fbcsFile.dispatch.errinfo')"></el-table-column>
					<el-table-column v-if="checkType==1" prop="operationType" :label="$t('fbcsFile.dispatch.type')"></el-table-column>
				</el-table>
			</div>
			<div slot="footer" class="_footBtn">
				<button class="defBtn" @click="showDialog=false">{{$t('fbcsFile.tips.close')}}</button>
			</div>
		</el-dialog>
		<el-table :data="cuList" v-if="showTable" :row-class-name="rowClass" max-height="294" highlight-current-row border>
			<el-table-column prop="nodeName" :label="$t('fbcsFile.dispatch.nodeName')"></el-table-column>
			<el-table-column prop="cuName" :label="$t('fbcsFile.dispatch.cuName')"></el-table-column>
			<el-table-column prop="errStr" :label="$t('fbcsFile.dispatch.errcode')"></el-table-column>
			<el-table-column prop="errinfo" :label="$t('fbcsFile.dispatch.errinfo')"></el-table-column>
			<el-table-column v-if="checkType==1" prop="operationType" :label="$t('fbcsFile.dispatch.type')"></el-table-column>
		</el-table>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';

var _this, data = {
	loading: false,
	showDialog: false,
	cuList: [
//		{nodeName:'深圳', cuName:'CU-2', errcode:'0', errinfo: 'ok', operationType:'用户'},
	],
	checkType: 0,
};

function WheelReq(sv, self){
	var beginTime = 0, overTime = 30*1000, timeout = false;
	function req(){
		let param = {
			url: 'batchDispatch/queryBatchDispatchResponse',
			cmdID: '600083', uuid: sv.uuid,
			type: sv.type || 0, //0-默认；1-特例：用户生成大版本，查询四个版本下发响应
			lastQueryFlag: sv.lastQuery || 0 //1最后一次，0不是
		};
		if(Date.now()-beginTime >= overTime){
			param.lastQueryFlag = 1;
			timeout = true;
		}
		utils.post(param, response).catch(stop);
	}
	function response(res){
		if(res.errcode != '0') {
			utils.alert({txt: res.errinfo, type:0});
			return stop();
		}
		if(res.endQueryFlag==0 && !timeout){
			return setTimeout(req, 2000);
		}
		if(res.type==2) { //1.生成大版本, 2.获取中登配置
			utils.alert({txt: res.errinfo, type:1});
			return stop();
		}
		var obj, i, arr = res.lists||[];
		for (i = 0; i < arr.length; i++){
			obj = arr[i];
			obj.errStr = obj.errcode == '0' ? 'success' : 'failed';
		}
		self.cuList = arr;
		self.checkType = res.type;
		if(!self.hideDialog) {
			self.showDialog = true;
			utils.tableSTop(self, 'detailBox');
		}
		self.$emit('update:cuList', arr);
		stop(arr);
	}
	function stop(arr){
		timeout = false;
		self.$emit('update:parameter', null);
		self.$emit('finish', arr);
		self.loading = false;
	}
	this.start = function(){
		beginTime = Date.now();
		if(sv.loading !== false) self.loading = true;
		req();
	}
}

export default {
	name: 'lgy-review',
	data() { return data; },
	props: {
		parameter: null, //轮询参数
		hideDialog: {
			type: Boolean,
			default: false
		},
		showTable: {
			type: Boolean,
			default: false
		}
	},
	methods:{
		rowClass({row, rowIndex}){
			if(rowIndex%2 != 0) return 'tableBG';
			return '';
		}
	},
	created(){
		_this = this;
		this.loading = false;
		this.showDialog = false;
		this.checkType = 0;
		this.cuList = [];
		this.parameter = null;
	},
	watch: {
		parameter(param){
			if(!param) return utils.loadClose();
			let w = new WheelReq(param, this);
			w.start();
			utils.loadClose();
		}
	}
};

</script>
