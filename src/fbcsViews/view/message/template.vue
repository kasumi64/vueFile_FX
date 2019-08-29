<template>
	<div class="">
		
	</div>
</template>

<script>
import kit       from '@/libs/kit.js';
import utils     from '@/libs/utils.js';
import globalVar from '@/libs/globalVar.js';
import lang      from '@/language/lang.js';
import events	 from '@/libs/observer.js';


	var pageTxt;
	pageTxt = 'lang.template';
	
	var data = {};
	
	export default {
		name: 'template',
		data() {
			return data;
		},
		methods: {},
		beforeCreate(){},
		created(){
			let l = lang();
			this.pageTxt = pageTxt = l.themeUserSet;
			this.paging = l.publics.paging;
		},
		mounted(){},
		components: {}
	};
</script>

<style scoped="scoped">
	
</style>