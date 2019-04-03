<template>
	<div class="userInfo">
		<header class="backHead">
			<span class="back" @click="back">&lt; {{$t('fbcsFile.tips.back')}}</span>
			<b class="h1">{{title}}</b>
		</header>
		<el-tabs v-model="tab" type="card" @tab-click="tabClick">
			<el-tab-pane :label="$t('fbcsFile.userHome.info')" name="first">
				<user v-if="tab=='first'" :isAdd.sync="type" :tab.sync='tab' :isNew="isNew"></user>
			</el-tab-pane>
			<el-tab-pane :label="$t('fbcsFile.userHome.ekey')" name="second" :disabled="type=='add'">
				<ekey v-if="tab=='second'" :isPage="false" :tab.sync='tab' :isNew="isNew"></ekey>
			</el-tab-pane>
			<el-tab-pane :label="$t('fbcsFile.userHome.signal')" name="third" :disabled="type=='add'">
				<signal v-if="tab=='third'" :isPage="false"></signal>
			</el-tab-pane>
			<el-tab-pane :label="$t('fbcsFile.userHome.information')" name="fourth" :disabled="type=='add'">
				<information v-if="tab=='fourth'"></information>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';

var _this, data = {
	title: '',
	tab: 'first',
	type: 'edit',
	isNew: false,
}, args;


export default {
	data(){ return data;},
	props: {
		tab: {
			type: String,
			default: 'first'
		},
	},
	methods:{
		back(){
			this.$router.push({path: '/main/fxCfg/userHome'});
		},
		tabClick(tabs, e){
//			let tab = tabs.name;
		}
	},
	created(){
		_this = this;
		args = utils.getArgs('userInfo') || {tab: 'first', type: 'add'};
		this.tab = args.tab;
		this.type = args.type;
		if(args.type == 'add'){
			this.title = this.$t('fbcsFile.userHome.addUser');
			this.isNew = true;
		} else {
			this.title = this.$t('fbcsFile.userHome.editUser');
			this.isNew = false;
		}
	},
	components: {
		user: resolve => require(['@/fbcsFxViews/view/user/info.vue'], resolve),
		ekey: resolve => require(['@/fbcsFxViews/view/page/Ekey.vue'], resolve),
		signal: resolve => require(['@/fbcsFxViews/view/page/relation.vue'], resolve),
		information: resolve => require(['@/fbcsFxViews/view/user/information.vue'], resolve),
	}
}

function test(){
	let params = {
		url: 'cuConfig/queryWebModify',
		cmdID: '600094',
	};
	utils.post(params).then(function(res){
		if(res.errcode != '0') return utils.alert({txt: res.errinfo});
		_this.list = res.lists;
	});
}
</script>

<style scoped="scoped">
	
</style>
	