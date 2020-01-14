<template>
	<div class="">
		<header class="backHead">
			<span class="back" @click="back">&lt; {{$t('fbcsFile.tips.back')}}</span>
			<b class="h1">{{this.$t('webu.webUser.title')}}</b>
		</header>
		<div class="searchBar">
			<b class="label w620">【user001】的对端用户信息</b>
			<button class="blueBtn" @click="search">{{$t('webu.btn.exported')}}</button>
		</div>
		<lgy-table :list="tableList" :title="title" :total="total" :currentPage="page" @changePage="changePage" >
		</lgy-table>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';

var _this;

export default {
	data(){
		var data = {
			tableList: [],
			page: 1,
			total: 1,
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
		data.tableList[0] = {userID: 'ID', userName: 'name', online: '在线', lock: '未锁定',site: 'webStation', ip: '127.0.0.1', phone: '13800010001',login:'20200101',logout:'20200108'}
		return data;
	},
	methods:{
		back(){
			this.$router.push({path: '/main/webu/statistic/webUser'});
		},
		search(){
			this.page = 1;
			search();
		},
		changePage(num){
			this.page = num;
			search();
		}
		
	},
	created(){
		_this = this;
	},
	mounted(){
		
	}
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
	.w620{width: 620px;}
</style>