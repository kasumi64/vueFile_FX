<template>
	<div class="detail">
		<header class="backHead">
			<span class="back" @click="back">&lt; {{$t('fbcsFile.tips.back')}}</span>
			<b class="h1">{{$t('fbcsFile.versionDetail.title')}}</b>
		</header>
		
		<el-table class="table" :data="zdList" :row-class-name="rowClass" max-height="294" border>
			<el-table-column type="index" width="50" label=" "></el-table-column>
			<!--<el-table-column prop="type" :label="$t('fbcsFile.versionDetail.type')"></el-table-column>-->
			<el-table-column prop="fileName" :label="$t('fbcsFile.versionDetail.fileName')"></el-table-column>
			<el-table-column prop="fileSize" :label="$t('fbcsFile.versionDetail.fileSize')"></el-table-column>
			<el-table-column prop="fileMd5" :label="$t('fbcsFile.versionDetail.fileMd5')"></el-table-column>
			<el-table-column prop="fileTime" :label="$t('fbcsFile.versionDetail.fileTime')"></el-table-column>
		</el-table>
		<div class="jg"></div>
		
		<el-tabs class v-model="active" type="card" @tab-click="tabClick">
			<el-tab-pane :label="$t('fbcsFile.versionDetail.ctplst')" name="first"></el-tab-pane>
			<el-tab-pane :label="$t('fbcsFile.versionDetail.zdrela')" name="second"></el-tab-pane>
		</el-tabs>
		
		<div class="tabPane">{{txtVal}}</div>
		<!-- <textarea class="tabPane" rows="14" v-model="txtVal" disabled autocomplete="off"></textarea> -->
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';

var _this, data = {
	zdList: [],
	active: 'first',
	txtVal: ''
};
var version, cfgInfo

export default {
	data(){ return data;},
	props: {},
	methods:{
		back(){
			let query = { fxcache: this.$route.query.fxcache };
			this.$router.push({path: '/main/fxCfg/version/query', query: query});
		},
		rowClass({row, rowIndex}){
			if(rowIndex%2 != 0) return 'tableBG';
			return '';
		},
		tabClick(){
			if(this.active == 'first'){
				this.txtVal = cfgInfo.ctplst;
			} else {
				this.txtVal = cfgInfo.zdrela;
			}
		},
	},
	created(){
		_this = this;
		cfgInfo = {};
		this.active = 'first';
		this.txtVal = '';
		version = utils.getArgs('version');
		zdDetail(version);
	}
}
function zdDetail(ver){
	let params = {
		url: 'version/queryZdCfg',
		cmdID: '600077',
		version: ver.version
	};
	utils.post(params).then(function(res){
		if(res.errcode != '0') return utils.alert({txt: res.errinfo});
		_this.zdList = res.lists;
		cfgInfo.ctplst = res.lists[0].cfgInfo;
		cfgInfo.zdrela = res.lists[1].cfgInfo;
		_this.txtVal = cfgInfo.ctplst;
	});
}
</script>

<style scoped="scoped">
	.detail{}
	.jg{height: 20px;}
	.tabPane{font-size: 14px;line-height: 24px;border: 1px solid #DCDFE6;max-width: 800px;height: 300px;color: #666;
		overflow: auto;padding: 10px;min-width: 400px;width: 100%;
		white-space: pre;
	}
</style>
