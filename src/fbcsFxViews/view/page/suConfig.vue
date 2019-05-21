<template>
	<div class="suConfig">
		<el-tabs v-model="active" type="card" @tab-click="tabClick">
			<el-tab-pane :label="$t('fbcsFile.suConfig.first')" name="first"></el-tab-pane>
			<el-tab-pane :label="$t('fbcsFile.suConfig.second')" name="second"></el-tab-pane>
		</el-tabs>
		<div class="tabPane">
			<div class="title">
				<span class="red">*</span>
				<span class="">{{tabName}}</span>
				<el-switch v-if="fxAuth" :inactive-text="$t('fbcsFile.suConfig.only')" :active-text="$t('fbcsFile.suConfig.edit')" v-model="enabled"></el-switch>
			</div>
			<div class="textarea">
				<el-input v-model="txtVal" @input="filter($event)" type="textarea" rows="14" :disabled="!enabled" resize="none">
				</el-input>
				<button v-if="fxAuth" class="blueBtn mt" @click="submit" :disabled="!enabled">{{$t('fbcsFile.tips.submit')}}</button>
				<button v-if="fxAuth" class="blueBtn mt" @click="history" :disabled="!enabled">{{$t('fbcsFile.tips.contrast')}}</button>
				<h2 class="h2" v-if="fxAuth">{{$t('fbcsFile.suConfig.h2')}}</h2>
				<el-table v-if="fxAuth" :data="list" :row-class-name="rowClass" highlight-current-row border>
					<el-table-column prop="section" :label="$t('fbcsFile.suConfig.section')"></el-table-column>
					<el-table-column prop="field" :label="$t('fbcsFile.suConfig.field')"></el-table-column>
					<el-table-column prop="type" :label="$t('fbcsFile.suConfig.type')"></el-table-column>
					<el-table-column prop="detail" :label="$t('fbcsFile.suConfig.detail')"></el-table-column>
				</el-table>
			</div>
		</div>
		<el-dialog ref="diaTab" :visible.sync="showDialog" :title="$t('fbcsFile.suConfig.err')" v-dialogDrag
			:close-on-click-modal='false' :show-close="false">
			<div class="_dialog">
				<el-table :data="errList" :row-class-name="rowClass" max-height="294" border>
					<el-table-column prop="section" :label="$t('fbcsFile.suConfig.section')"></el-table-column>
					<el-table-column prop="field" :label="$t('fbcsFile.suConfig.field')"></el-table-column>
					<el-table-column prop="oldValue" :label="$t('fbcsFile.suConfig.oldValue')"></el-table-column>
					<el-table-column prop="modifyValue" :label="$t('fbcsFile.suConfig.modifyValue')"></el-table-column>
					<el-table-column prop="range" :label="$t('fbcsFile.suConfig.range')"></el-table-column>
				</el-table>
			</div>
			<div slot="footer" class="_footBtn">
				<button class="defBtn" @click="showDialog=false">{{$t('fbcsFile.tips.close')}}</button>
			</div>
		</el-dialog>
		<lgy-review :show.sync='showReview' :reqsv='reqsv' @submit='review' :txt='reviewTxt'></lgy-review>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';

var _this, data = {
	fxAuth: true,
	active: 'first',
	enabled: false,
	tabName: '',
	txtVal: '',
	list: [
		{section:'abc',type:'用户',detail:'详情'},
	],
	showDialog: false,
	errList: [],
	showReview: false,
	reqsv: {},
	reviewTxt: ''
};


export default {
	data(){ return data;},
	methods:{
		tabClick(){
			this.enabled = false;
			this.list = [];
			if(this.active == 'first'){
				this.tabName = this.$t('fbcsFile.suConfig.static');
				getConfig(0);
			} else {
				this.tabName = this.$t('fbcsFile.suConfig.dynamic');
				getConfig(1);
			}
		},
		rowClass({row, rowIndex}){
			if(rowIndex%2 != 0) return 'tableBG';
			return '';
		},
		filter(str){
			let reg = /[\%]/g, self = this;
			if(reg.test(str)){
				utils.alert({txt: this.$t('fbcsFile.suConfig.txtErr')});
				setTimeout(() => {
					self.txtVal = str.replace(reg, '');
				});
			}
		},
		submit(){
			if(/[\%]/.test(this.txtVal)){
				return utils.alert({txt: this.$t('fbcsFile.suConfig.txtErr')});
			}
			this.reqsv = {uri: 'cuConfig/modify'};
			this.showReview = true;
		},
		review(args){
			let params = {
				url: 'cuConfig/modify',
				cmdID: '600092',
				reviewer: args.name,
				type: (this.active == 'first') ? 0 : 1,
				cfgInfo: this.txtVal
			};
			utils.post(params).then(function(res){
				if(res.errcode == '3101') {
					_this.errList = res.lists;
					_this.showDialog = true;
					utils.tableSTop(_this, 'diaTab');
					return;
				}
				utils.alert({txt: res.errinfo, type: res.errcode!='0'?0:1});
				if(res.errcode == '0') _this.enabled = false;
			});
			this.list = [];
		},
		history(){
			if(/[\%]/.test(this.txtVal)){
				return utils.alert({txt: this.$t('fbcsFile.suConfig.txtErr')});
			}
			let params = {
				url: 'cuConfig/webModifyCompare',
				cmdID: '600094',
				type: (this.active == 'first') ? 0 : 1,
				cfgInfo: this.txtVal
			};
			utils.post(params).then(function(res){
				if(res.errcode != 0) return utils.alert({txt: res.errinfo});
				_this.list = res.lists;
			});
		}
	},
	created(){
		_this = this;
		this.fxAuth = utils.getFxAuth;
		this.tabName = this.$t('fbcsFile.suConfig.static');
		this.list = [];
		this.active = 'first';
		this.enabled = false;
		this.showReview = false;
		this.reviewTxt = this.$t('fbcsFile.suConfig.sub');
		getConfig(0);
	}
};
function getConfig(type){
	var param = {
		url: 'cuConfig/query',
		cmdID: '600091',
		type
	}
	utils.post(param).then(function(res){
		if(res.errcode != '0') return utils.alert({txt: res.errinfo});
		_this.txtVal = res.cfgInfo;
	});
}
</script>

<style scoped="scoped">
	.title{font-size: 14px;color: #303133;margin-right: 10px;line-height: 24px;}
	.title *{vertical-align: middle;}
	.textarea{margin-top: 20px;padding-left: 120px;max-width: 1020px;}
	.mt{margin: 20px 20px 0 0;}
	.h2{font-size: 14px;line-height: 30px;margin-top: 20px;}
</style>