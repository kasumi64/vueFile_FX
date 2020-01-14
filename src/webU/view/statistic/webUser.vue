<template>
	<div class="webUser">
		<header class="backHead">
			<b class="h1">{{$t('webu.webUser.title')}}</b>
		</header>
		<div class="searchBar">
			<label class="label">{{$t('webu.com.id')}}</label>
			<lgy-candidateWords v-model="userID" :keywords="idList" @input="idInput" class="words" ></lgy-candidateWords>
			<label class="label">{{$t('webu.com.ip')}}</label>
			<lgy-candidateWords v-model="userIP" :keywords="ipList" @input="iPInput" class="words" ></lgy-candidateWords>
			<button class="blueBtn" @click="search">{{$t('webu.btn.query')}}</button>
			<button class="blueBtn flr" @click="exported">{{$t('webu.btn.exported')}}</button>
			<p class="jiange"></p>
			<el-checkbox-group v-model="checkList">
				<el-checkbox label="A">在线</el-checkbox>
				<el-checkbox label="B">离线</el-checkbox>
				<el-checkbox label="C">已锁定</el-checkbox>
			</el-checkbox-group>
		</div>
		<lgy-table :list="tableList" :title="title" :defined="defined" :total="total" :currentPage="page" @changePage="changePage" >
		</lgy-table>
		<el-dialog :visible.sync="showUserInfo" title="dialogTitle" v-dialogDrag width="800px"
			:close-on-click-modal='false' :show-close="false">
			<ul class="_dialog grid">
				<li>
					<span>{{$t('webu.webUser.ID')}}</span><span>{{this.info.id}}</span>
				</li><li>
					<span>{{$t('webu.webUser.name')}}</span><span>{{this.info.id}}</span>
				</li><li>
					<span>{{$t('webu.webUser.online')}}</span><span>{{this.info.id}}</span>
				</li><li>
					<span>{{$t('webu.webUser.site')}}</span><span>{{this.info.id}}</span>
				</li><li>
					<span>{{$t('webu.webUser.IP')}}</span><span>{{this.info.id}}</span>
				</li><li>
					<span>{{$t('webu.webUser.phone')}}</span><span>{{this.info.id}}</span>
				</li><li>
					<span>{{$t('webu.webUser.login')}}</span><span>{{this.info.id}}</span>
				</li><li>
					<span>{{$t('webu.webUser.logout')}}</span><span>{{this.info.id}}</span>
				</li><li>
					<span>{{$t('webu.webUser.lockTime')}}</span><span>{{this.info.id}}</span>
				</li><li>
					<span>{{$t('webu.webUser.lock')}}</span><span>{{this.info.id}}</span>
				</li>
			</ul>
			<div slot="footer" class="_footBtn">
				<button class="defBtn" @click="showUserInfo=false">{{$t('webu.btn.close')}}</button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';

var _this, defID, defIP;
var lockIcon = require('@/fbcsFxViews/img/table/editPwd.png');
var unlockIcon = require('@/fbcsFxViews/img/table/Ekey.png');


export default {
	data(){
		var data = {
			userID: '',
			userIP: '',
			idList: null,
			ipList: null,
			checkList: ['A', 'B'],
			tableList: [],
			page: 1,
			total: 1,
			showUserInfo: false,
			info: {
				id: "ABC"
			}
		};
		
		data.title = {
			userID: this.$t('webu.table.userID'),
			userName: this.$t('webu.table.userName'),
			online: this.$t('webu.table.online'),
			lock: this.$t('webu.table.lock'),
			site: this.$t('webu.table.site'),
			ip: this.$t('webu.table.ip'),
			phone: this.$t('webu.table.phone'),
			login: this.$t('webu.table.login'),
			logout: this.$t('webu.table.logout')
		};
		data.defined = {
			label: this.$t('fbcsFile.tableTitle.operation'), width: 102,
			items: [
				{src:require('@/fbcsFxViews/img/table/search.png'), click: ()=>{userInfo.call(this);}, tips: this.$t('webu.webUser.userInfo') },
				{src:require('@/fbcsFxViews/img/table/signal.png'), click: ()=>{endUser.call(this);}, tips: this.$t('webu.webUser.endUser') },
				{src: getLockIcon, click: ()=>{}, tips: this.$t('webu.webUser.tlock') }
			]
		};
		function getLockIcon(row){
			if(row['lock'] == '锁定') return lockIcon;
			return unlockIcon;
		}
		
		function userInfo(){
			this.showUserInfo = true;
		}
		
		function endUser(){
			this.$router.push({path: '/main/webu/statistic/endUser'});
		}
		
		data.tableList[0] = {userID: 'ID', userName: 'name', online: '在线', lock: '未锁定',site: 'webStation', ip: '127.0.0.1', phone: '13800010001',login:'20200101',logout:'20200108'}
		data.tableList[1] = {userID: 'ID', userName: 'name', online: '在线', lock: '锁定',site: 'webStation', ip: '127.0.0.1', phone: '13800010001',login:'20200101',logout:'20200108'}
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
		idInput(val){
			if(val=='') return this.idList = [].concat(defID);
			utils.keywords({id: val}, arr => {
				_this.idList = arr;
			});
		},
		iPInput(val){
			if(val=='') return this.ipList = [].concat(defIP);
			utils.keywords({id: val}, arr => {
				_this.ipList = arr;
			});
		},
		exported(){
			console.log(this.checkList);
		}
	},
	created(){
		_this = this;
		defID = defIP = [];
		autoComplete();
	},
	mounted(){
		
	}
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
		defID = defIP = [].concat(arr);
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
	.webUser{min-width: 800px;}
	.flr{position: absolute;top: 0;right: 0;}
	.jiange{margin-top: 10px;}
	.grid{display: grid; grid-gap: 10px 20px; grid: repeat(4, 40px) / repeat(3, 1fr);align-items: center;}
	#webu .grid li{white-space: nowrap;overflow: hidden;margin: 0;}
	.grid span{font-size: 12px;color: #303133;line-height: 24px;margin-right: 10px;text-overflow: ellipsis;overflow: hidden;}
</style>