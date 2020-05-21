<template>
	<div class="userInfo">
		<header class="backHead">
			<span class="back" @click="back">&lt; {{$t('fbcsFile.tips.back')}}</span>
			<b class="h1">{{title}}</b>
		</header>
		<el-tabs v-model="tab" type="card" @tab-click="tabClick">
			<el-tab-pane :label="$t('fbcsFile.userHome.info')" name="first">
				<user ref="basicInfo" :parent="that" :isAdd.sync="type" :tab.sync='tab' :isNew="isNew"></user>
			</el-tab-pane>
			<el-tab-pane :label="$t('fbcsFile.userHome.ekey')" name="second" :disabled="type=='add'">
				<ekey ref="ekey" :isPage="false" :tab.sync='tab' :isNew="isNew"></ekey>
			</el-tab-pane>
			<el-tab-pane :label="$t('fbcsFile.userHome.signal')" name="third" :disabled="type=='add'">
				<signal ref="signal" :isPage="false"></signal>
			</el-tab-pane>
			<el-tab-pane :label="$t('fbcsFile.userHome.information')" name="fourth" :disabled="type=='add'">
				<information></information>
			</el-tab-pane>
		</el-tabs>
		<lgy-wheelReq ref="basic" id="basic" @finish="finish" :parameter.sync="parameter"></lgy-wheelReq>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';

var _this, args;


export default {
	data(){
		let bingo = {
			title: '',
			tab: 'first',
			type: 'edit',
			isNew: false,
			that: this,
			parameter: null
		}
		return bingo;
	},
	methods:{
		back(){
			let query = {fxcache: this.$route.query.fxcache}
			this.$router.replace({path: '/main/fxCfg/userHome', query: query});
		},
		tabClick(tabs, e){
			switch (tabs.name){
				case 'second':
					next(this.$refs.ekey.search);
					break;
				case 'third':
					next(this.$refs.signal.search);
					break;
			}
			function next(fn){
				setTimeout(() => { fn(); });
			};
		},
		finish(){
			if(this.isNew){
				this.isNew = false;
				this.$refs.basicInfo.updateUser();
			}
		}
	},
	created(){
		_this = this;
		args = utils.getArgs('userInfo') || {tab: 'first', type: 'add'};
		this.tab = args.tab;
		this.type = args.type.toString();
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

</script>

<style scoped="scoped">
	
</style>
