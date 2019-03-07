<template>
	<div class="lgy-cuList">
		<el-table ref="cuList" :data = "list" :row-class-name="rowClass" @selection-change="selectChange" 
			max-height="294" highlight-current-row border>
			<el-table-column type="selection"></el-table-column>
			<el-table-column prop="nodeName" :label="$t('fbcsFile.dispatch.nodeName')"></el-table-column>
			<el-table-column v-if="selected" prop="type" :label="$t('fbcsFile.dispatch.type')"></el-table-column>
		</el-table>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';

var _this, data = {
	list: [
		{nodeName:'深圳', cuName:'CU-1', type:'ok'}, {nodeName:'北京', cuName:'CU-2', type:'ok'},
	],
};

export default {
	data(){ return data;},
	props: {
		selected: false,
		selectList: []
	},
	methods:{
		rowClass({row, rowIndex}){
			if(rowIndex%2 != 0) return 'tableBG';
			return '';
		},
		selectChange(arr){
			this.$emit('update:selectList', arr);
			this.$emit('selectChange', arr, this.$refs['cuList']);
		},
	},
	created(){
		_this = this;
		this.$emit('dataComplete', ['a','b']);
		return;
		let params = {
			url: 'batchDispatch/queryNodeName',
			cmdID: '600081',
		};
		utils.post(params).then(function(res){
			if(res.errcode!='0') return utils.alert({txt: res.errinfo});
			_this.list = res.lists;
			setTimeout(() => {
				res.lists.forEach(row => {
					_this.$refs['cuList'].toggleRowSelection(row, true);
				});
				this.$emit('update:selectList', res.lists);
				this.$emit('dataComplete', res.lists);
			});
		});
	}
}

</script>

<style scoped="scoped">
	/*.lgy-cuList{width: 500px;}*/
</style>