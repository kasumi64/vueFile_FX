<template>
	<div class="">
		
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';

var _this, data = {
	
};

export default {
	data(){ return data;},
	props: {},
	methods:{
		
	},
	created(){
		_this = this;
	},
	mounted(){},
	components: {}
}

function test(){
	let params = {
		url: 'cuConfig/queryWebModify',
		cmdID: '600094',
	};
	utils.post(params).then(function(res){
		if(res.errcode!='0') return utils.alert({txt: res.errinfo});
		_this.list = res.lists;
	});
}
</script>

<style scoped="scoped">

</style>