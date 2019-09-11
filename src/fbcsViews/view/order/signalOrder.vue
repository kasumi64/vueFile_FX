<template>
	<div class="xiaoZhan">
		<div class="searchBar">
			<label class="label">{{$t('fbcsFile.order.manage.acceptLabel')}}</label>
			<el-select v-model="info.exeState" class="words">
				<el-option v-for="(item, i) in acceptList" :key="item" :label="item" :value="i">
				</el-option>
			</el-select>
			<label class="label">{{$t('fbcsFile.order.manage.feedbackLabel')}}</label>
			<el-select v-model="info.feedbackState">
				<el-option v-for="(item, i) in feedbackList" :key="item" :label="item" :value="i">
				</el-option>
			</el-select>
		
			<p class="jiange"></p>
			
			<label class="label">{{$t('fbcsFile.order.manage.date')}}</label>
			<el-radio-group v-model="radio">
				<el-radio :label="1">{{$t('fbcsFile.order.manage.today')}}</el-radio>
				<el-radio :label="3">{{$t('fbcsFile.order.manage.week')}}</el-radio>
				<el-radio :label="5">{{$t('fbcsFile.order.manage.month')}}</el-radio>
				<el-radio :label="7">{{$t('fbcsFile.order.manage.recvBeginTime')}}</el-radio>
			</el-radio-group>
			<el-date-picker v-model="info.recvBeginTime" class="picker" type="datetime" :clearable="false" :editable="false"
				 value-format="timestamp" default-time="00:00:00" :disabled='radio!=7'></el-date-picker>
			<label class="label ml10">{{$t('fbcsFile.order.manage.recvEndTime')}}</label>
			<el-date-picker v-model="info.recvEndTime" class="picker words" type="datetime" :clearable="false" :editable="false"
				 value-format="timestamp" default-time="23:59:59" :disabled='radio!=7'></el-date-picker>
			
			<button class="blueBtn" @click="search">{{$t('fbcsFile.searchBar.search')}}</button>
		</div>
		<ul class="fnField">
			<li @click="accept" v-if="fxAuth">
				<img class="icon" src="@/fbcsFxViews/img/order/accept.png"/>
				<span class="label">{{$t('fbcsFile.order.manage.batchAccept')}}</span>
			</li><li @click="feedback" v-if="fxAuth">
				<img class="icon" src="@/fbcsFxViews/img/order/feedback.png"/>
				<span class="label">{{$t('fbcsFile.order.manage.batchFeedback')}}</span>
			</li>
		</ul>
		<lgy-table stripe :list="list" :title="title" :defined="defined" :total="total" :currentPage="page" @changePage="changePage"
			:selection="true" @selectChange="selectChange" :width="width">
		</lgy-table>
		
		<el-dialog :visible.sync="editDialog" :title="editTitle" v-dialogDrag width="600px"
			:close-on-click-modal='false' :show-close="false">
			<div class="MX_dialog">
				<li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.order.editBiz.bizKey')}}</p>
					</div><div class="right">
						<input v-model="ekeyInfo.bizKey" disabled autocomplete="off"/>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.Ekey.userID')}}</p>
					</div><div class="right">
						<input v-model="ekeyInfo.userID" disabled autocomplete="off"/>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.order.ekeyOrder.userName')}}</p>
					</div><div class="right">
						<input v-model="ekeyInfo.userName" disabled autocomplete="off"/>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.order.signalOrder.toUserID')}}</p>
					</div><div class="right">
						<input v-model="ekeyInfo.toUserID" disabled autocomplete="off"/>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.order.signalOrder.toUserName')}}</p>
					</div><div class="right">
						<input v-model="ekeyInfo.toUserName" disabled autocomplete="off"/>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">
							<span class="red">*</span>
							{{$t('fbcsFile.order.signalOrder.bizType')}}
						</p>
					</div><div class="right">
					</el-select>
						<el-select v-model="ekeyInfo.bizType">
							<el-option v-for="item in bizTypeArr" :label="item.name" :key="item.id" :value="item.id"></el-option>
						</el-select>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">
							<span class="red">*</span>
							{{$t('fbcsFile.order.editBiz.remark')}}
						</p>
					</div><div class="right">
						<input v-model="ekeyInfo.remark" maxlength="128" autocomplete="off"/>
					</div>
				</li>
			</div>
			<div slot="footer" class="_footBtn">
				<button class="blueBtn" @click="editSubmit">{{$t('fbcsFile.tips.ok')}}</button>
				<button class="defBtn" @click="editDialog=false">{{$t('fbcsFile.tips.cancel')}}</button>
			</div>
		</el-dialog>
		
		<el-dialog :visible.sync="showDialog" :title="dialogTitle" v-dialogDrag width="70%" @open="open"
			:close-on-click-modal='false' :show-close="false">
			<div class="_dialog orderPane" ref="orderPane">
				<lgy-table stripe class="table" v-if="batch=='accept'" :width="width" :list="submitList" :title="title" :size="200">
				</lgy-table>
				<lgy-table stripe class="table" ref="feedback" v-if="batch=='feedback'" :width="width" :list="submitList" :title="feedbackTitle" :size="200">
				</lgy-table>
			</div>
			<div slot="footer" class="_footBtn">
				<button class="blueBtn" @click="review">{{$t('fbcsFile.tips.ok')}}</button>
				<button class="defBtn" @click="showDialog=false">{{$t('fbcsFile.tips.cancel')}}</button>
			</div>
		</el-dialog>
		<lgy-review :show.sync='showReview' :reqsv='reqsv' @submit='submit' :txt="$t('fbcsFile.order.manage.submit')"></lgy-review>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';

var tick = require('@/fbcsFxViews/img/order/tick.png'),
   cross = require('@/fbcsFxViews/img/order/cross.png');


var _this, data, enable;

function reject(row){
	utils.confirm({
		txt: _this.$t('fbcsFile.order.manage.rej'),
		ok: () => {
			var param = {
				url: 'usercommcmd/refuse',
				cmdID: '700022',
				operator: utils.userName(),
				bizKey: row.bizKey
			};
			utils.post(param).then(res => {
				utils.alert({txt:res.errinfo, type:res.errcode!='0'?0:1});
				_this.search();
			});
		}
	});
}

function edit(row){
	_this.editDialog = true;
	setTimeout(() => {
		_this.ekeyInfo.bizKey = row.bizKey || '';
		_this.ekeyInfo.userID = row.userID1 || '';
		_this.ekeyInfo.userName = row.userName1 || '';
		_this.ekeyInfo.toUserID = row.userID2 || '';
		_this.ekeyInfo.toUserName = row.userName2 || '';
		_this.ekeyInfo.bizType = row.bizType || '';
		_this.ekeyInfo.remark = row.remark || '';
	});
}

export default {
	data(){
		data = {
			fxAuth: utils.getFxAuth,
			info: {
				exeState: 0, feedbackState: 0, recvBeginTime: null, recvEndTime: null,
			},
			radio: 3,
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
			showReview: false,
			editTitle: this.$t('fbcsFile.order.signalOrder.title'),
			ekeyInfo: {
				bizKey: '', userID: '', userName: '', ekeyName: '', ekeyPasswd: '',
				validDate: '', ekeyComment: '',  remark: ''
			},
			editDialog: false,
			bizTypeArr: []
		};
		
		data.title = {
			bizKey: this.$t('fbcsFile.order.xiaozhan.bizKey'),
			userID1: this.$t('fbcsFile.order.xiaozhan.userID'),
			userName1: this.$t('fbcsFile.order.xiaozhan.userName'),
			userID2: this.$t('fbcsFile.order.xiaozhan.userID'),
			userName2: this.$t('fbcsFile.order.xiaozhan.userName'),
			operationType: this.$t('fbcsFile.order.xiaozhan.operationType'),
			expectExeTime: this.$t('fbcsFile.order.signalOrder.expectExeTime'),
			recvTime: this.$t('fbcsFile.order.xiaozhan.recvTime'),
			exeTxt: this.$t('fbcsFile.order.xiaozhan.exeState'),
			feedbackState: this.$t('fbcsFile.order.xiaozhan.feedbackState'),
			legal: this.$t('fbcsFile.order.xiaozhan.legal'),
			// legalInfo: this.$t('fbcsFile.order.xiaozhan.legalInfo')
		};
		data.defined = {
			label: this.$t('fbcsFile.tableTitle.operation'), width: 82,
			items: [
				{src:require('@/fbcsFxViews/img/order/edit.png'), click: edit.bind(this), tips: this.$t('fbcsFile.order.manage.edit'), enable: 'acceptBtn' },
				{src:require('@/fbcsFxViews/img/order/reject.png'), click: reject.bind(this), tips: this.$t('fbcsFile.order.manage.reject'), enable: 'rejectBtn'  }
			]
		};
		if(!data.fxAuth) delete data.defined;
		data.width = {
			legal: 64
		};
		data.feedbackTitle = Object.assign({}, data.title, {remarks: this.$t('fbcsFile.order.xiaozhan.remarks')});
		data.list = [];
		return data;
	},
	methods:{
		search(){
			this.page = 1;
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
				if(row.exeState != 1) {
					enable = false;
					obj = kit.extend({}, row);
					obj.userID = `<p class="red">${row.userID}</p>`;
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
				if(row.exeState == 1) {
					enable = false;
					obj = kit.extend({}, row);
					obj.userID = `<p class="red">${row.userID}</p>`;
				}
				return obj;
			});
			this.batch = 'feedback';
			this.dialogTitle = this.$t('fbcsFile.order.manage.batchFeedback');
			this.submitList = arr;
			this.showDialog = true;
		},
		review(){
			if(!enable){
				return utils.alert({txt: this.$t('fbcsFile.order.xiaozhan.batch')});
			}
			if(this.batch == 'feedback' && !remarkCheck()) return;
			
			let obj = {
				url: 'mx/auth/review',
				cmdID: '600112',
				uri: 'mx/usercommcmd/'
			};
			obj.uri += this.batch == 'accept' ? 'exe' : 'feedback';
			this.reqsv = obj;
			this.showReview = true;
		},
		submit(args){
			var param = {
				url: 'usercommcmd/',
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
				param.cmdID = '700023';
				param.exeList = temp;
			} else {
				kit('input', this.$refs.feedback.$el).each(el => {
					let {ind} = el.dataset;
					let obj = {bizKey: _this.list[ind].bizKey||''};
					obj.remark = el.value;
					temp.push(obj);
				});
				param.url += 'feedback';
				param.cmdID = '700024';
				param.feedbackList = temp;
			}
			
			utils.post(param).then(res => {
				utils.alert({txt:res.errinfo, type:res.errcode!='0'?0:1});
				this.search();
				this.showDialog = false;
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
		},
		editSubmit(){
			if(this.ekeyInfo.remark.trim() == '') {
				return utils.alert({txt: this.$t('fbcsFile.order.manage.remarks')});
			}
			let params = Object.assign({}, this.ekeyInfo);
			params.url = '/usercommcmd/modify';
			params.cmdID = '700021';
			params.operator = utils.userName();
			
			utils.post(params).then(function(res){
				if(res.errcode!='0') return utils.alert({txt: res.errinfo});
				utils.alert({txt: res.errinfo, type: 1});
				search();
				_this.editDialog = false;
			});
		}
	},
	created(){
		_this = this;
		this.fxAuth = utils.getFxAuth;
		this.search();
		getDay(6);
		getBizType();
	},
	watch: {
		radio(val){
			if(val == 1) getDay();
			else if(val == 3) getDay(6);
			else if(val == 5) getDay(29);
		}
	}
}

function remarkCheck(){
	let empty = false, el = _this.$refs.feedback.$el;
	kit('input', el).each(el => {
		let {ind, must} = el.dataset;
		if(must=='1'&&el.value.trim()===''){
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

function getBizType(){
	let param = {
		url: 'mx/dict/query',
		cmdID: "600000",
		language: 0,
		type: 3
	};
	utils.post(param).then(res => {
		if(res.errcode != '0') return;
		
		for (var i = 0, len = res.lists; i < len; i++) {
			let obj = res.lists[i];
			obj.name = obj.name + "(" + obj.id + ")";
		}
		_this.bizTypeArr = res.lists;
	});
}

function search(){
	let params = Object.assign({
		url: 'usercommcmd/queryLists',
		cmdID: '700020',
		pageSize: 20,
		currentPage: _this.page
	}, _this.info);
	params.recvBeginTime = Math.floor(params.recvBeginTime/1000);
	params.recvEndTime = Math.floor(params.recvEndTime/1000);
	utils.post(params).then(function(res){
		if(res.errcode != '0') return console.warn(res.errcode, res.errinfo);
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
			obj.acceptBtn = obj.exeState == 1 ? true : false;
			obj.rejectBtn = obj.exeState == 2 ? true : false;
			obj.operationType = _this.$t(`fbcsFile.order.xiaozhan.type${type||0}`);
			obj.exeTxt = _this.$t(`fbcsFile.order.xiaozhan.exe${exe||1}`);
			obj.feedbackState = _this.$t(`fbcsFile.order.xiaozhan.fb${fb||1}`);
			obj.legal = `<img src=${legal == 0 ? cross : tick} `;
			obj.legal += legalInfo ? `title=${legalInfo} />` : '/>';
			obj.remarks = `<input data-ind=${i} data-must=${obj.isModifyFlag||0} style="min-width:60px;width:100%" />`;
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
.jiange{padding: 5px 0;}
.table{min-width: 780px;padding-right: 40px;}
.MX_dialog input{width: 208px;}
</style>
