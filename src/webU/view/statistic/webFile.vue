<template>
	<div class="webFile">
		<header class="backHead">
			<b class="h1">{{$t('webu.webFile.title')}}</b>
		</header>
		<div class="searchBar">
			<label class="label">{{$t('webu.com.id')}}</label>
			<lgy-candidateWords v-model="userID" :keywords="idList" @input="idInput" class="words" ></lgy-candidateWords>
			<label class="label">{{$t('webu.webFile.beginDate')}}</label>
			<el-date-picker v-model="beginDate" class="picker" type="datetime" :placeholder="$t('webu.webFile.placeholder')"
				:picker-options='beginTime' value-format="timestamp" default-time="00:00:00"></el-date-picker>
			<label class="label">{{$t('webu.webFile.endDate')}}</label>
			<el-date-picker v-model="endDate" class="picker" type="datetime" :placeholder="$t('webu.webFile.placeholder')"
				:picker-options='endTime' value-format="timestamp" default-time="23:59:59"></el-date-picker>
			<button class="defBtn" @click="day30">{{$t('webu.webFile.day30')}}</button>
			<span class="label mar20">{{$t('webu.webFile.tips')}}</span>
			<button class="blueBtn" @click="search">{{$t('webu.btn.query')}}</button>
			<button class="blueBtn flr" @click="exported">{{$t('webu.btn.exported')}}</button>
		</div>
		<el-table class="lgy-table marb" :data="totalTab" :row-class-name="rowClass" highlight-current-row border>
			<el-table-column  prop="all" :label="$t('webu.webFile.all')"></el-table-column>
			<el-table-column  prop="receive" :label="$t('webu.webFile.aReceive')"></el-table-column>
			<el-table-column  prop="send" :label="$t('webu.webFile.aSend')"></el-table-column>
			<el-table-column  prop="reSize" :label="$t('webu.webFile.areSize')"></el-table-column>
			<el-table-column  prop="seSize" :label="$t('webu.webFile.aseSize')"></el-table-column>
			<el-table-column  :label="$t('webu.webFile.seSize')" width="82">
				<img @click="goto" class="icon" src="@/fbcsFxViews/img/table/attachment.png" alt="" />
			</el-table-column>
		</el-table>
		<lgy-table :list="tableList" :title="title" :defined="defined" :total="total" :currentPage="page" @changePage="changePage" >
		</lgy-table>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';

var _this, defID, mixDay, maxDay;

export default {
	data(){
		var data = {
			userID: '',
			idList: null,
			beginDate: '',
			endDate: '',
			tableList: [],
			totalTab: [],
			page: 1,
			total: 1,
			beginTime: {
				disabledDate(time) {
					let boundary = new Date(_this.endDate);
					boundary.setHours(23, 59, 59);
					let choice = time.getTime();
					if(choice < mixDay) return true; //最多60天
					return time > boundary;
				}
			},
			endTime: {
				disabledDate(time) {
					let boundary = new Date(_this.beginDate);
					boundary.setHours(0, 0, 0);
					// let choice = time.getTime();
					// if(choice > maxDay) return true;
					return  time < boundary;
				}
			}
		};
		
		data.title = {
			userID: this.$t('webu.table.userID'),
			userName: this.$t('webu.table.userName'),
			receive: this.$t('webu.webFile.receive'),
			send: this.$t('webu.webFile.send'),
			reSize: this.$t('webu.webFile.reSize'),
			seSize: this.$t('webu.webFile.seSize')
		};
		data.defined = {
			label: this.$t('fbcsFile.tableTitle.operation'), width: 82,
			items: [
				{src:require('@/fbcsFxViews/img/table/attachment.png'), click: ()=>{goto.call(this)}, tips: this.$t('fbcsFile.tableDefined.editEkey') }
			]
		};
		function goto(){
			this.$router.push({path: '/main/webu/statistic/fileSendDetail'});
		}
		data.tableList[0] = {userID: 'ID', userName: 'name', receive: '1000', send: '1000',reSize: '2000', seSize: '2000'}
		data.totalTab[0] = {userID: 'ID', userName: 'name', receive: '1000', send: '1000',reSize: '2000', seSize: '2000',all:'3'}
		return data;
	},
	methods:{
		rowClass({row, rowIndex}){
			if(rowIndex%2 != 0) return 'tableBG';
			return '';
		},
		search(){
			this.page = 1;
			search();
		},
		changePage(num){
			this.page = num;
			search();
		},
		idInput(val){
			if(val=='') return this.idList = [].concat(defID);
			utils.keywords({id: val}, arr => {
				_this.idList = arr;
			});
		},
		day30(){
			
		},
		exported(){
			
		},
		goto(){
			this.$router.push({path: '/main/webu/statistic/fileSendDetail'});
		}
	},
	created(){
		_this = this;
		defID = [];
		autoComplete();
		defaultDay.call(this);
	},
	mounted(){
		
	}
}

function defaultDay(){
	var day = 24 * 3600 * 1000;
	var today = new Date(Date.now());
	today.setHours(0, 0, 0);
	mixDay = (new Date(today.getTime() - day * 60)).getTime();
	this.beginDate = today.getTime();
	today.setHours(23, 59, 59, 999);
	maxDay = this.endDate = today.getTime();
}

function autoComplete(){
	var param, args;
	param = {
		cmdID: "600052",
		type: 0,
		userID: _this.userID,
		language: 'zh'
	};
	args = {
		label: ['ekeyName','lastModified'],
		value: 'userID'
	};
	utils.keywords(param, args).then(arr => {
		defID = [].concat(arr);
		_this.idList = arr;
	});
}

function search(){
	let params = {
		url: 'userEkey/query',
		cmdID: '600031',
		pageSize: 20,
		currentPage: _this.page
	};
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
			
		}
		_this.list = res.lists;
		_this.page = res.currentPage;
		_this.total = res.totalSize;
	});
}
</script>

<style scoped="scoped">
	.webFile{min-width: 1300px;}
	.flr{position: absolute;top: 0;right: 0;}
	.picker{margin-right: 20px;}
	#webu .webFile .mar20{margin: 0 20px;}
	.marb{margin-bottom: 20px;}
	
</style>