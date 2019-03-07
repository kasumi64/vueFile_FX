<template>
	<div class="myTable">
		<lgy-list :index="true" :list="list" :title="title" :defined="defined" @row-click="rowClick" @currentRow="currentRow" 
			:sortable="sortable" @sortChange="sortChange" :size="10" :total="60" :currentPage.sync="page1" @changePage="changePage1" >
		</lgy-list>
		<lgy-list :selection="true" @selectChange="selectChange" :defined="defined" :list="list2" :title="title" :size="30" :total="30" 
			:currentPage.sync="page2" @changePage="changePage2">
		</lgy-list>
	</div>
</template>

<script>
import lgyList from '@/fbcsFxViews/components/lgy-table.vue';
var src = require('@/fbcsFxViews/img/logo.png');

	var data = {
		list:[
			{id:'001',name:'张三',address:'show-overflow-tooltip'},
			{id:'002',name:'李四',address:'999'},
			{id:'003',name:'王五',address:'yui'},
//			{id:'004',name:'张三',address:'ABC'},
//			{id:'005',name:'李四',address:'999'},
//			{id:'006',name:'王五',address:'yui'}
		],
		list2:[
			{id:'004',name:'张三',address:'ABC'},
			{id:'005',name:'李四',address:'999'},
			{id:'006',name:'王五',address:'yui'}
		],
		title:{
			id:'ID', name: '姓名', address: '地址'
		},
//		custom: [
//			{label:'操作', html:[{nodes: `<img class="icon" src="${src}" alt="" />`, click:function(d,i){console.log(d,i)} }] },
//		],
		sortable:{
			id:true, name: 1, address: 0
		},
		defined: {
			label:'操作', width: "80px",
			items: [
				{src:require('@/fbcsFxViews/img/logo.png'), click: operateClick, tips: '修改' },
				{src:require('@/fbcsFxViews/img/logo.png'), click: operateClick, tips: '删除' },
			]
		},
		page1: 4,
		page2: 3
	};
	
	function operateClick(o, {$index}){
		
		var a={...o}
		var b = {name:''}
		b = {...a}
		console.log(b, $index);
	}
	
	export default {
		data(){
			return data;
		},
		methods: {
			rowClick(row, e, column){
//				console.log('row-click', row);
			},
			currentRow(currentRow, oldCurrentRow){
//				console.log('currentRow', currentRow, oldCurrentRow);
			},
			sortChange(column, prop, order){
				console.log('sortChange', column, prop, order);
			},
			selectChange(arr){
				console.log('sortChange', arr);
			},
			changePage1(num){
				console.log('Page1', num, this.page1);
			},
			changePage2(num){
				console.log('Page2', num, this.page2);
			}
		},
		created(){
//			this.list = []
		},
		mounted(){
			
		},
		components: {
			'lgy-list':lgyList
		}
	};
</script>
	
<style scoped="scoped">
	.myTable{min-width: 500px;background: #FFF;}
	/*.btn{border: 1px solid #42B983;padding: 3px 5px;border-radius: 4px;}
	hr{margin-top: 10px;}*/
</style>
<style>
	/*.myTable .bg{background: #f5f7fa;}*/
	/*.icon{width: 16px;height: 16px;}*/
</style>