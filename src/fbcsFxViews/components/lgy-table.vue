<template>
	<div class="lgy-table">
		<el-table ref="lgy-table" :data= "list" @row-click="rowClick" @current-change="currentChange" @sort-change="sortChange" :stripe="stripe"
			@select="select" @selection-change="selectChange" @select-all="selectAll" :max-height="maxHeight" highlight-current-row border
			:row-class-name="rowClass" :cell-class-name="cellClassName">
			<el-table-column v-if="index" type="index" width="50" key></el-table-column>
			<el-table-column v-if="selection" type="selection" width="40" key></el-table-column>
			<el-table-column :sortable="isSort(k)" v-for="(val, k) in title" :prop="k" :label="val" :key="k" :width="getWidth(k)">
				<div slot-scope="scope" v-html="scope.row[k]"></div>
			</el-table-column>
			<el-table-column v-if="defined" :label="defined.label" :width="defined.width">
				<div class="custom" slot-scope="scope">
					<div class="operate" v-for="(obj, k) in defined.items" :title="obj.tips" :key="k" 
						@click="operateClick(obj.click,scope.row,scope)" v-if="customShow(obj.enable,scope.row)">
						<img class="icon" :src="obj.src" alt="" />
					</div>
				</div>
			</el-table-column>
		</el-table>
		<div class="paging">
			<el-pagination ref="paging" v-if="total>size" layout="prev, pager, next, jumper, total" :page-size="size" :total="total"
				@current-change="changePage" :current-page="page">
			</el-pagination>
			<div v-if="total<=size&&list.length>0" class="onePage">{{$t('fbcsFile.components.paging1')}}{{total}}{{$t('fbcsFile.components.paging2')}}</div>
		</div>
	</div>
</template>

<script>

var _this, data = {
	currRow: '',
	widths: {},
	sortables: {},
	page: 1
};


export default {
	name: 'lgy-table',
	data() { return data; },
	props: {
		index: {
			type: Boolean,
			default: false
		},
		selection: {
			type: Boolean,
			default: false
		},
		stripe: {
			type: Boolean,
			default: false
		},
		list: {
			type: Array,
			default: []
		},
		title: { //与list的字段相同
			type: Object,
			default: {}
		},
		defined: {
			type: Object,
			default: null
		},
		//{ defined 的结构
		//	label:'操作', width: "80px",
		//	items: [{src:require('@/fbcsFxViews/img/logo.png'), click:function(r,s){console.log(r,s)}, tips: '修改' },]
		//}
		width: { //宽，与list的字段相同
			type: Object,
			default: null
		},
		sortable: { //排序，与list的字段相同
			type: [Object, Boolean, String],
			default: false
		},
//		currentRow: null,
//		currentSelect: null,
//		selectList: [],
		size: {
			type: Number,
			default: 20
		},
		total: {
			type: Number,
			default: 0
		},
		currentPage: {
			type: Number,
			default: 1
		},
		maxHeight: {
			type: [String, Number],
			default: 'none'
		},
		cellClass: {
			type: [Function],
			default: null
		},
		fliover: { // 一个页面同时存在多个分页时用...
			type: [Boolean, Function],
			default: false
		}
	},
	methods:{
		rowClass({row, rowIndex}){
			if(rowIndex%2 != 0) return 'tableBG';
			return '';
		},
		rowClick(row, e, column){
			this.$emit('rowClick', row, e, column);
		},
		cellClassName({row, rowIndex, column, columnIndex}){
			if(this.cellClass instanceof Function)
				return this.cellClass(row, columnIndex, rowIndex, column);
		},
		currentChange(currentRow, oldCurrentRow){
			this.currRow = currentRow;
			this.$emit('update:currentRow', currentRow);
			this.$emit('currentRow', currentRow, oldCurrentRow);
		},
		getWidth(k){
			return this.widths[k];
		},
		isSort(k){
			return this.sortables[k]?'custom':false;
		},
		sortChange({column, prop, order}){
			this.$emit('sortChange', column, prop, order);
		},
		operateClick(fn, row, scope){
			fn(row, scope);
		},
		select(arr, row){
			this.$emit('update:currentSelect', arr.indexOf(row)<0?null:row);
			this.$emit('select', arr, row, this.$refs['lgy-table']);
		},
		selectChange(arr){
			this.$emit('update:selectList', arr);
			this.$emit('selectChange', arr, this.$refs['lgy-table']);
		},
		selectAll(arr){
			this.$emit('selectAll', arr, this.$refs['lgy-table']);
		},
		changePage(num){ //当前页
			// this.page = num;
//			this.$emit('update:currentPage', num);
			if(this.fliover !== false) this.fliover(num);
			else this.$emit('changePage', num);
		},
		customShow(k, row){ //功能按钮是否隐藏, k为row的键
			return row[k] === false ? false : true;
		},
		ElPager(num){
			if(this.$refs.paging)
				this.$refs.paging.$children[1].$emit('change', num);
		}
	},
	created(){
		_this = this;
		this.page = this.currentPage;
		if(this.width instanceof Object) this.widths = this.width;
		else this.widths = {};
		if(this.sortable instanceof Object) this.sortables = this.sortable;
		else this.sortables = {};
	},
	watch: {
		currentPage(num){
			if(this.fliover === false) this.page = num;
		}
	}
};

</script>

<style scoped="scoped">
	.custom{line-height: 0;white-space: nowrap;-moz-user-select: none;-webkit-user-select: none;}
	.operate{display: inline-block;margin-right: 10px;cursor: pointer;vertical-align: middle;}
	.icon{width: 20px;height: 20px;}
	/*<lgy-list :index="true" :selection="true" :list="list" :title="title" :widths="width" :defined="custom" @row-click="rowClick" @currentRow="currentRow" 
		:sortables="sortable" @sortChange="sortChange" :size="10" :total="60" :currentPage.sync="page1" @changePage="changePage1" >
	</lgy-list>*/
</style>
<style>
.lgy-table .el-table__header .el-checkbox{display: none;}
.lgy-table .red{color: #F00;}
	/*分页*/
.lgy-table .paging{padding: 20px 0;text-align: left;}
.lgy-table .paging .el-pagination,.lgy-table .paging .total{display: inline-block;vertical-align: middle;}
.lgy-table .paging .btn-next,.lgy-table .paging .btn-prev,.lgy-table .paging .more,
.lgy-table .paging .number{margin: 0 !important;padding: 0;color: #7388A7;border: 1px solid #D7D8DA;border-width: 1px 1px 1px 0;font-weight: 500;}
.lgy-table .paging .btn-prev{border-width: 1px;}
.lgy-table .paging .number.active{box-shadow: 0 2px 4px 0 rgba(0,0,0,.2) inset;}
.lgy-table .paging .el-pagination__total{margin-left: 24px;color: #999;}
.lgy-table .paging .onePage{font-size: 13px;line-height: 28px;text-align: center;color: #999;}
</style>
