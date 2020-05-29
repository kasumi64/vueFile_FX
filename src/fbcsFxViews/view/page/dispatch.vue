<template>
	<div class="dispatch">
		<ul>
			<li>
				<label class="label">{{$t('fbcsFile.dispatch.setFile')}}</label>
				<div class="right">
					<el-select v-model="type" class="sel">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<span class="label ti" v-if="type==1">{{$t('fbcsFile.dispatch.t1')}}</span>
					<span class="label ti" v-if="type==2">{{$t('fbcsFile.dispatch.t2')}}</span>
					<span class="label ti" v-if="type==3">{{$t('fbcsFile.dispatch.t3')}}</span>
					<span class="label ti" v-if="type==4">{{$t('fbcsFile.dispatch.t4')}}</span>
				</div>
			</li><li class="mb">
				<label class="label">{{$t('fbcsFile.dispatch.hots1')}}</label>
				<div class="right">
					<p class="label txt">{{$t('fbcsFile.dispatch.hots2')}}</p>
					<el-table id="nodeList" ref="nodes" :data="nodeList" :row-class-name="rowClass" max-height="294" highlight-current-row border
						@selection-change="selectChange">
						<el-table-column type="selection" width="40" key></el-table-column>
						<el-table-column prop="cuName" :label="$t('fbcsFile.dispatch.cuName')"></el-table-column>
						<el-table-column prop="nodeName" :label="$t('fbcsFile.dispatch.nodeName')"></el-table-column>
					</el-table>
					<button v-if="fxAuth" @click="review" id="reviewBtn" class="blueBtn mt">{{$t('fbcsFile.tips.submit')}}</button>
				</div>
			</li><li class="mb">
				<label class="label">&nbsp;</label>
				<div class="right">
					<p class="label txt"><b>{{$t('fbcsFile.dispatch.res')}}</b></p>
					<el-table id="cuList" :data="cuList" :row-class-name="rowClass" :cell-class-name="cellClass" max-height="294" highlight-current-row border>
						<el-table-column prop="cuName" :label="$t('fbcsFile.dispatch.cuName')"></el-table-column>
						<el-table-column prop="nodeName" :label="$t('fbcsFile.dispatch.nodeName')"></el-table-column>
						<el-table-column prop="errStr" :label="$t('fbcsFile.dispatch.errcode')"></el-table-column>
						<el-table-column prop="errinfo" :label="$t('fbcsFile.dispatch.errinfo')"></el-table-column>
					</el-table>
				</div>
			</li>
		</ul>
		
		<el-dialog :visible.sync="showPwdinfo" :title="$t('fbcsFile.tips.title')" v-dialogDrag width="800px"
			:close-on-click-modal='false' :show-close="false">
			<div class="_dialog">
				<lgy-table :list="signalList" :title="signalTitle" :total="signalTotal" :currentPage="signalPage" 
					@changePage="signalChange" max-height="394" :width="width">
				</lgy-table>
			</div>
			<div slot="footer" class="_footBtn">
				<button class="blueBtn" @click="send" id="send">{{$t('fbcsFile.tips.ok')}}</button>
				<button class="defBtn" @click="showPwdinfo=false" id="close">{{$t('fbcsFile.tips.cancel')}}</button>
			</div>
		</el-dialog>
		
		<lgy-review :show.sync='showReview' :reqsv='reqsv' @submit='submit' :txt='reviewTxt'></lgy-review>
		<lgy-wheelReq :parameter.sync="parameter" :cuList.sync='cuList' :hideDialog="true"></lgy-wheelReq>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';

var _this, nodes, dict, isPatch, first;

export default {
	data(){
		let bingo = {
			fxAuth: true,
			type: 1,
			nodeList: [
				{nodeName:'深圳', cuName:'CU-2'},
			],
			cuList: [
				{nodeName:'深圳', cuName:'CU-2', errcode:'0', errinfo: 'ok'},
			],
			showReview: false,
			reqsv: {},
			reviewTxt: '',
			parameter: null,
			
			showPwdinfo: false,
			signalList: [],
			signalPage: 1,
			signalTotal: 1
		};
		
		bingo.options = this.$t('fbcsFile.dispatch.options');
		bingo.signalTitle = {
//			section: this.$t('fbcsFile.dispatch.section'),
			field: this.$t('fbcsFile.dispatch.field'),
			type: this.$t('fbcsFile.dispatch.notype'),
			detail: this.$t('fbcsFile.dispatch.detail')
		};
		bingo.width = {
			type: 100,
			detail: 450
		};
		return bingo;
	},
	methods:{
		rowClass({row, rowIndex}){
			if(rowIndex%2 != 0) return 'tableBG';
			return '';
		},
		cellClass({row, columnIndex}){
			// if(columnIndex==2&&row.errStr != 'success') return 'red';
			let str = row.errcode;
			if(str !== void 0 && str != '0') return 'red';
			return ''
		},
		selectChange(arr){
			/* var temp = [];
			for (let i = 0; i < arr.length; i++) {
				let obj = arr[i];
				temp = temp.concat(dict[obj.nodeName]);
			}
			this.cuList = temp; */
			this.cuList = arr;
		},
		review(){
			if(this.cuList.length == 0) return utils.alert({txt: this.$t('fbcsFile.dispatch.noNode')});
			
			if(this.tyye == 4){
				this.reqsv = {uri: 'batchDispatch/dispatch'};
				this.showReview = true;
				return;
			}
			
			let isAll = (this.cuList.length == this.nodeList.length);
			utils.confirm({
				txt: _this.$t('fbcsFile.dispatch.' + (isAll ? 'dispatchAll' : 'dispatchPart')),
				ok: () => {
					if(this.type == 3){
						isPatch = true;
						this.signalPage = 1;
						signalSearch();  //类型为用户密码表时用，3，7
						return this.showPwdinfo = true;
					}
					this.reqsv = {uri: 'batchDispatch/dispatch'};
					this.showReview = true;
				}
			});
		},
		submit(args){
			utils.loadShow();
			let isAll = (this.cuList.length == this.nodeList.length);
			let params = {
				url: 'batchDispatch/dispatch',
				cmdID: '600082',
				reviewer: args.name,
				reviewerPassword: args.pwd,
				reviewType: 1,
				type: this.type,
				count: this.cuList.length,
				lists: this.cuList,
				dispatchType: isAll ? 0 : 1 //0-全部节点,1-单个或部分节点
			};
			this.cuList.forEach(item => {
				item.errinfo = item.errStr = '';
			});
			utils.post(params).then(function(res){
				utils.loadClose();
				if(res.errcode!='0') return utils.alert({txt: res.errinfo});
				res.type = 0;
				_this.parameter = res;
			});
		},
		signalChange(num){
			this.signalPage = num;
			signalSearch();
		},
		send(){
			this.reqsv = {uri: 'batchDispatch/dispatch'};
			this.showReview = true;
			this.showPwdinfo = false;
		}
	},
	created(){
		_this = this;
		this.fxAuth = utils.getFxAuth;
		this.type = 1;
		this.nodeList = this.cuList = [];
		this.showReview = this.showPwdinfo = false;
		isPatch = false;
		first = true;
		nodeCu();
	},
	watch: {
		type(val){
			isPatch = false;
			if(!first) nodeCu(val>3 ? 1 :0);
		}
	}
};

function nodeCu(type){
	let params = {
		url: 'batchDispatch/queryNodeCu',
		cmdID: '600081',
		type: type||0
	};
	utils.post(params).then(function(res){
		first = false;
		if(res.errcode!='0') return utils.alert({txt: res.errinfo});
		nodes = [].concat(res.lists);
//		_this.cuList = isPatch ? getCU(res.lists) : res.lists;
		/* var temp = {}, arr = [];
		dict = {};
		for (let i = 0; i < nodes.length; i++) {
			let obj = nodes[i];
			temp[obj.nodeName] = obj;
			if(!dict[obj.nodeName]) dict[obj.nodeName] = [];
			dict[obj.nodeName].push(obj);
		}
		for (let k in temp)  arr.push(temp[k]);
		_this.nodeList = arr;
		 */
		_this.nodeList = res.lists;
		setTimeout(function(){
			if(_this.$refs['nodes']){
				_this.nodeList.forEach(r => {
					_this.$refs['nodes'].toggleRowSelection(r, true);
				});
			}
		});
	});
}

function getCU(cu){
	var obj, i, arr = cu||[];
	for (i = 0; i < arr.length; i++){
		obj = arr[i];
		obj.errStr = obj.errcode == '0' ? 'success' : 'failed';
	}
	return arr;
}

function signalSearch(){
	let params = {
		url: 'userpasswd/comparePasswdInfo',
		cmdID: '600012',
		version: '',
		pageSize: 20,
		currentPage: _this.signalPage
	};
	utils.post(params).then(res => {
		if(res.errcode!='0') { //清缓存历史
			_this.signalList = [];
			_this.signalPage = 1;
			_this.signalTotal = 0;
			return console.warn(res.errcode, res.errinfo);
		}
		if(res.totalPage>0 && _this.signalPage > res.totalPage){
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
	.dispatch{min-width: 900px;}
	li{white-space: nowrap;}
	.sel{width: 200px;}
	.label{display: inline-block;width: 120px;font-size: 14px;color: #666;line-height: 30px;text-align: right;
		vertical-align: top;padding-right: 5px;}
	.right{display: inline-block;vertical-align: top;width: 876px;}
	.mb{margin-top: 10px;}
	.ti{width: auto;color: #999;text-align: left;margin-left: 10px;}
	.txt{width: auto;text-align: left;}
	.mt{margin-top: 30px;}
</style>
