<template>
	<div class="xiaoZhan">
		<div class="searchBar">
			<label class="label">{{$t('fbcsFile.order.manage.acceptLabel')}}</label>
			<el-select v-model="info.exeState" id="exe" class="words">
				<el-option v-for="(item, i) in acceptList" :key="item" :label="item" :value="i">
				</el-option>
			</el-select>
			<label class="label">{{$t('fbcsFile.order.manage.feedbackLabel')}}</label>
			<el-select v-model="info.feedbackState" id="state">
				<el-option v-for="(item, i) in feedbackList" :key="item" :label="item" :value="i">
				</el-option>
			</el-select>
		
			<p class="jiange"></p>
			
			<label class="label">{{$t('fbcsFile.order.manage.date')}}</label>
			<el-radio-group v-model="radio" id="radio" class="mr10">
				<el-radio :label="1">{{$t('fbcsFile.order.manage.today')}}</el-radio>
				<el-radio :label="3">{{$t('fbcsFile.order.manage.week')}}</el-radio>
				<el-radio :label="5">{{$t('fbcsFile.order.manage.month')}}</el-radio>
				<el-radio :label="7">{{$t('fbcsFile.order.manage.recvBeginTime')}}</el-radio>
			</el-radio-group>
			<el-date-picker v-model="info.recvBeginTime" id="begin" class="picker" type="datetime" :clearable="false" :editable="false"
				 value-format="timestamp" default-time="00:00:00" :disabled='radio!=7'></el-date-picker>
			<label class="label ml10">{{$t('fbcsFile.order.manage.recvEndTime')}}</label>
			<el-date-picker v-model="info.recvEndTime" id="end" class="picker words" type="datetime" :clearable="false" :editable="false"
				 value-format="timestamp" default-time="23:59:59" :disabled='radio!=7'></el-date-picker>
			
			<button class="blueBtn" @click="search" id="search">{{$t('fbcsFile.searchBar.search')}}</button>
		</div>
		<ul class="fnField">
			<li id="accept" @click="accept" v-if="fxAuth">
				<img class="icon" src="@/fbcsFxViews/img/order/accept.png"/>
				<span class="label">{{$t('fbcsFile.order.manage.batchAccept')}}</span>
			</li><li id="feedback" @click="feedback" v-if="fxAuth">
				<img class="icon" src="@/fbcsFxViews/img/order/feedback.png"/>
				<span class="label">{{$t('fbcsFile.order.manage.batchFeedback')}}</span>
			</li>
		</ul>
		<lgy-table stripe :list="list" :title="title" :defined="defined" :total="total" :currentPage="page" :fliover="changePage"
			ref="all" :selection="true" @selectChange="selectChange" :width="width">
		</lgy-table>
		
		<el-dialog :visible.sync="showDialog" :title="dialogTitle" v-dialogDrag width="70%" @open="open"
			:close-on-click-modal='false' :show-close="false">
			<div class="_dialog orderPane" ref="orderPane" :key="batch">
				<lgy-table id="accept" stripe class="table" v-if="batch=='accept'" :width="width" :list="submitList" :title="acceptTitle" 
					:size="200" :total="submitList.length">
				</lgy-table>
				<lgy-table id="feedback" stripe class="table" ref="feedback" v-if="batch=='feedback'" :width="width" :list="submitList" :title="feedbackTitle" 
					:size="200" :total="submitList.length">
				</lgy-table>
			</div>
			<div slot="footer" class="_footBtn">
				<button :id="batch" class="blueBtn" @click="review">{{$t('fbcsFile.tips.ok')}}</button>
				<button id="batch-close" class="defBtn" @click="showDialog=false">{{$t('fbcsFile.tips.cancel')}}</button>
			</div>
		</el-dialog>
		<lgy-review :show.sync='showReview' :reqsv='reqsv' @submit='submit' :txt="$t('fbcsFile.order.manage.submit')"></lgy-review>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';
import moment from 'moment';
import globalVar from '../../libs/globalVar.js'

var tick = require('@/fbcsFxViews/img/order/tick.png'),
	cross = require('@/fbcsFxViews/img/order/cross.png');

var _this, enable;

function edit(row){
	utils.setArgs('bizKey', row);
	let obj = Object.assign({}, _this.info);
	obj.page = _this.page;
	obj.radio = _this.radio;
	utils.setArgs('bizKeySearch', obj);
	this.$router.push({path: '/main/mxCfg/order/editBiz'});
}

function reject(row){
	utils.confirm({
		txt: _this.$t('fbcsFile.order.manage.rej'),
		ok: () => {
			var param = {
				url: 'userinfocmd/refuse',
				cmdID: '700003',
				operator: utils.userName(),
				bizKey: row.bizKey
			};
			utils.post(param).then(res => {
				utils.alert({txt:res.errinfo, type:res.errcode!='0'?0:1});
				search();
			});
		}
	});
}

export default {
	data(){
		let bingo = {
			fxAuth: utils.getMxAuth,
			info: {
				exeState: 0, feedbackState: 0, recvBeginTime: null, recvEndTime: null,
			},
			radio: 1,
			acceptList: this.$t('fbcsFile.order.manage.acceptState'),
			feedbackList: this.$t('fbcsFile.order.manage.feedbackState'),
			list: [
				{bizKey: 'bizKey', userID: `<b class="red" title="info"}">userID</b>`, userName: 'userName', legal: 'legal'},
				{bizKey: 'bizKey', userID: `<b class="red" title="info"}">userID</b>`, userName: 'userName', g:'',
					legal: '<input data-i=1 data-must=true class="remark"></input>'}
			],
			page: 1,
			total: 1,
			dialogTitle: '',
			batch: '',
			reqsv: {},
			selected: [],
			showDialog: false,
			submitList: [],
			showReview: false
		};
		
		bingo.title = {
			bizKey: this.$t('fbcsFile.order.xiaozhan.bizKey'),
			userID: this.$t('fbcsFile.order.xiaozhan.userID'),
			userName: this.$t('fbcsFile.order.xiaozhan.userName'),
			operationType: this.$t('fbcsFile.order.xiaozhan.operationType'),
			recvTime: this.$t('fbcsFile.order.xiaozhan.recvTime'),
			exeTxt: this.$t('fbcsFile.order.xiaozhan.exeState'),
			feedbackTxt: this.$t('fbcsFile.order.xiaozhan.feedbackState'),
			legalImg: this.$t('fbcsFile.order.xiaozhan.legal'),
			// legalInfo: this.$t('fbcsFile.order.xiaozhan.legalInfo')
		};
		bingo.defined = {
			label: this.$t('fbcsFile.tableTitle.operation'), width: 82,
			items: [
				{src:require('@/fbcsFxViews/img/order/edit.png'), click: edit.bind(this), tips: this.$t('fbcsFile.order.manage.edit'), enable: 'acceptBtn' },
				{src:require('@/fbcsFxViews/img/order/reject.png'), click: reject.bind(this), tips: this.$t('fbcsFile.order.manage.reject'), enable: 'rejectBtn'  }
			]
		};
		if(!bingo.fxAuth) delete bingo.defined;
		bingo.width = {
			legalImg: 64
		};
		
		let acceptTitle = Object.assign({}, bingo.title);
		delete acceptTitle.recvTime;
		delete acceptTitle.feedbackTxt;
		bingo.acceptTitle = acceptTitle;
		let feedbackTitle = Object.assign({}, bingo.title, {remarks: this.$t('fbcsFile.order.xiaozhan.remarks')});
		delete feedbackTitle.recvTime;
		delete feedbackTitle.legalImg;
		bingo.feedbackTitle = feedbackTitle;
		
		bingo.list = [];
		return bingo;
	},
	methods:{
		search(){
			this.page = 1;
			if(this.$refs.all) this.$refs.all.ElPager(1);
			search();
		},
		changePage(num){
			this.page = num;
			search();
		},
		selectChange(arr){
			this.selected = arr;
		},
		accept(){
			if(!this.selected.length) {
				return utils.alert({txt: this.$t('fbcsFile.order.manage.oneData')});
			}
			enable = true;
			var arr = this.selected.map(row => {
				let obj = row;
				if(row.exeState != 1 || row.legal == 0) {
					enable = false;
					obj = kit.extend({}, row);
					obj.bizKey = `<p class="red">${row.bizKey||''}</p>`;
				}
				return obj;
			});
			this.batch = 'accept';
			this.dialogTitle = this.$t('fbcsFile.order.manage.batchAccept');
			this.submitList = arr;
			this.showDialog = true;
		},
		feedback(){
			if(!this.selected.length) {
				return utils.alert({txt: this.$t('fbcsFile.order.manage.oneData')});
			}
			enable = true;
			var arr = this.selected.map(row => {
				let obj = row;
				if(row.exeState == 1 || row.feedbackState == 3) {
					enable = false;
					obj = kit.extend({}, row);
					obj.bizKey = `<p class="red">${row.bizKey||''}</p>`;
				}
				return obj;
			});
			this.batch = 'feedback';
			this.dialogTitle = this.$t('fbcsFile.order.manage.batchFeedback');
			this.submitList = arr;
			this.showDialog = true;
			
			let vel = _this.$refs.feedback;
			if(vel){
				kit('input', vel.$el).each(el => {
					el.style.border = '1px solid #D7D8DA';
				});
			}
		},
		review(){
			if(!enable){
				let txt = 'fbcsFile.order.pwdOrder.batch';
				txt += this.batch == 'accept' ? '1' : '2';
				return utils.alert({txt: this.$t(txt)});
			}
			if(this.batch == 'feedback' && !remarkCheck()) return;
			//反馈不用复核
			if(this.batch == 'feedback') return this.submit({});
			
			let obj = {
				url: 'auth/review',
				cmdID: '600112',
				uri: 'mx/userinfocmd/'
			};
			obj.uri += this.batch == 'accept' ? 'exe' : 'feedback';
			this.reqsv = obj;
			this.showReview = true;
		},
		submit(args){
			var param = {
				url: 'userinfocmd/',
				reviewer: args.name,
				reviewerPassword: args.pwd,
				reviewType: 1,
				operator: utils.userName()
			};
			
			var temp = [];
			if(this.batch == 'accept'){
				let i, len = this.selected.length;
				for (i = 0; i < len; i++) {
					temp.push({bizKey: this.selected[i].bizKey});
				}
				param.url += 'exe';
				param.cmdID = '700004';
			} else {
				kit('input', this.$refs.feedback.$el).each(el => {
					let {ind} = el.dataset;
					let obj = {bizKey: _this.list[ind].bizKey||''};
					obj.remark = el.value;
					temp.push(obj);
				});
				param.url += 'feedback';
				param.cmdID = '700005';
			}
			param.list = temp;
			
			utils.loadShow();
			utils.post(param).then(res => {
				utils.loadClose();
				search();
				this.showDialog = false;
				if(res.errcode!='0') return utils.alert({txt: res.errinfo});
				utils.alert({txt: res.errinfo, type: 1});
			});
		},
		open(){
			setTimeout(() => {
				let orderPane = _this.$refs.orderPane;
				orderPane.scrollTop = 0;
				orderPane.scrollLeft = 0;
				if(this.batch != 'feedback' || !this.$refs.feedback) return;
				kit('input', this.$refs.feedback.$el).each(el => {
					let {ind} = el.dataset;
					el.value = _this.list[ind].remark || '';
				});
			}, 40);
		}
	},
	created(){
		_this = this;
		let param = utils.getArgs('bizKeySearch');
		var goBack = globalVar.get('goBack');
		if(param && goBack){
			let {exeState, feedbackState, recvBeginTime, recvEndTime} = param;
			this.info = {exeState, feedbackState, recvBeginTime, recvEndTime};
			radio(this.radio = param.radio);
			this.page = param.page;
			search();
		} else {
			getDay(0);
			this.search();
		}
		globalVar.set('goBack', false);
		utils.clearCache();
	},
	watch: {
		radio(val){
			radio(val);
		}
	}
}

function radio(val){
	if(val == 1) getDay();
	else if(val == 3) getDay(6);
	else if(val == 5) getDay(29);
}

function remarkCheck(){
	let empty = false, el = _this.$refs.feedback.$el;
	kit('input', el).each(el => {
		let {ind, must} = el.dataset;
		if(must=='1'&&el.value===''){
			empty = _this.list[ind];
			el.style.border = '1px solid red';
		} else if(/[%]/.test(el.value)){
			empty = _this.list[ind];
			el.style.border = '1px solid red';
		} else el.style.border = '1px solid #D7D8DA';
	});
	
	if(empty){
		let txt = _this.$t('fbcsFile.order.manage.remarks');
		return utils.alert({txt, type: 0});
	}
	
	return true;
}

function search(){
	let params = Object.assign({
		url: 'userinfocmd/queryLists',
		cmdID: '700001',
		pageSize: 20,
		currentPage: _this.page
	}, _this.info);
	params.recvBeginTime = Math.floor(params.recvBeginTime/1000);
	params.recvEndTime = Math.floor(params.recvEndTime/1000);
	utils.post(params).then(function(res){
		if(res.errcode != '0') {
			_this.list = [];
			_this.page = 1;
			_this.total = 0;
			return console.warn(res.errcode, res.errinfo);
		}
//		if(res.errcode != '0') return utils.alert({txt: res.errinfo});
		if(res.totalPage>0 && _this.page > res.totalPage){
			_this.page = res.totalPage;
			return search();
		}
		let i, len = res.lists.length, obj;
		for (i = 0; i < len; i++) {
			obj = res.lists[i];
			let {operationType:type, exeState:exe, feedbackState:fb, legal, legalInfo} = obj;
			//1-未处理，2-已拒绝，3-失败，4-成功
			obj.acceptBtn = exe == 1 && type != -1 ? true : false;
			obj.rejectBtn = exe == 1 ? true : false;
			obj.operationType = _this.$t(`fbcsFile.order.xiaozhan.type${type}`);
			obj.exeTxt = _this.$t(`fbcsFile.order.xiaozhan.exe${exe||1}`);
			obj.feedbackTxt = _this.$t(`fbcsFile.order.xiaozhan.fb${fb||1}`);
			if(obj.recvTime){
				obj.recvTime = moment(obj.recvTime * 1000).format('YYYY-MM-DD HH:mm:ss');
			} else obj.recvTime = '';
			if(exe == 1) {
				obj.legalImg = `<img src=${legal == 0 ? cross : tick} `;
				obj.legalImg += legalInfo ? `title="${legalInfo}" />` : '/>';
			} else obj.legalImg = '';
			obj.remarks = `<input data-ind=${i} data-must=${obj.isModifyFlag||0} style="min-width:60px;width:100%" maxlength="128" />`;
		}
		_this.list = res.lists;
		_this.page = res.currentPage;
		_this.total = res.totalSize;
	});
}

function getDay(day = 0){
	let begin, today = new Date();
	today.setHours(23,59,59);
	_this.info.recvEndTime = today.getTime();
	today.setHours(0,0,0);
	today.setDate(today.getDate() - day);
	_this.info.recvBeginTime = today.getTime();
}
</script>

<style scoped="scoped">
.xiaoZhan{}
.el-radio{margin-right: 10px;}
.ml10{margin-left: 10px;}
.mr10{margin-right: 10px;}
.jiange{padding: 5px 0;}
.table{min-width: 780px;padding-right: 40px;}
</style>
<style>
	#fbcs_MX .order .xiaoZhan ._dialog{padding: 40px 0 0 40px;}
</style>
