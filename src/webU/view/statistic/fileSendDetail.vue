<template>
	<div class="fileSendDetail">
		<header class="backHead">
			<span class="back" @click="back">&lt; {{$t('fbcsFile.tips.back')}}</span>
			<b class="h1">{{$t('webu.webFile.title')}}</b>
		</header>
		<div class="">
			<p class="title">{{$t('webu.fileSendDetail.title')}}</p>
			<p class="develop">开发中......</p>
		</div>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';

var _this, defID;

export default {
	data(){
		var json = {};
		
		return json;
	},
	methods:{
		back(){
			this.$router.push({path: '/main/webu/statistic/webFile'});
		},
	},
	created(){
		_this = this;
	},
	mounted(){
		
	}
}
</script>

<style scoped="scoped">
	.title{font-size: 18px;color: #666;font-weight: bold;}
	.develop{text-align: center;font-size: 36px;}
</style>