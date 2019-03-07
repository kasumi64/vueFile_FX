<template>
	<div class="Ekey">
		<div v-if="isPage" class="searchBar">
			<label class="label">{{$t('fbcsFile.searchBar.userID')}}</label>
			<lgy-candidateWords v-model="id" class="words" ></lgy-candidateWords>
			<label class="label">{{$t('fbcsFile.searchBar.ekeyName')}}</label>
			<input v-model="name" class="words" :placeholder="$t('fbcsFile.searchBar.placeholder')" />
			<button class="blueBtn" @click="search">{{$t('fbcsFile.searchBar.search')}}</button>
		</div>
		<ul class="fnField">
			<li @click="showAddEkey">
				<img class="icon" src="@/fbcsFxViews/img/FnIcon/addEkey.png"/>
				<span class="label">{{$t('fbcsFile.fnField.addEkey')}}</span>
			</li>
		</ul>
		<lgy-table :list="list" :title="title" :defined="defined" :total="total" :currentPage.sync="page" @changePage="changePage" >
		</lgy-table>
		
		<el-dialog :visible.sync="showDialog" :title="dialogTitle" v-dialogDrag
			:close-on-click-modal='false' :show-close="false">
			<ul class="_dialog">
				<li>
					<div class="left">
						<p class="txt">
							<span class="red">*</span>
							{{$t('fbcsFile.Ekey.userID')}}
						</p>
					</div><div class="right">
						<lgy-candidateWords v-model="ekeyInfo.userID" :disabled="disabled"></lgy-candidateWords>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">
							<span class="red">*</span>
							{{$t('fbcsFile.Ekey.ekeyName')}}
						</p>
					</div><div class="right">
						<input v-model="ekeyInfo.userName" />
					</div>
				</li><li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.Ekey.ekeyDate')}}</p>
					</div><div class="right">
						<el-date-picker v-model="ekeyInfo.validDate" class="picker" type="datetime" :clearable="false" :editable="false"
							:placeholder="$t('fbcsFile.tips.date')" default-time="23:59:59" >
						</el-date-picker>
					</div>
				</li><li>
					<div class="left">
						<p class="txt">{{$t('fbcsFile.Ekey.ekeyInfo')}}</p>
					</div><div class="right">
						<input v-model="ekeyInfo.ekeyComment" />
					</div>
				</li>
			</ul>
			<div slot="footer" class="_footBtn">
				<button class="blueBtn" @click="now">{{$t('fbcsFile.tips.now')}}</button>
				<button class="blueBtn" @click="submit">{{$t('fbcsFile.tips.ok')}}</button>
				<button class="defBtn" @click="showDialog=false">{{$t('fbcsFile.tips.cancel')}}</button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';

var _this, data = {
	id: '',
	name: '',
	keywords: null,
	list: [
		{userID: 'userID', userName: 'userName', ekeyName: 'ekeyName',validDate: 1535646546566, ekeyComment: 'ekeyComment'}
	],
	page: 1,
	total: 1,
	showDialog: false,
	dialogTitle: '',
	ekeyInfo: {
		userID: '', userName: '', validDate: '', ekeyComment: '', 
	},
	disabled: false
};

function delEkey(row){
	console.log('delEkey');
}
function showEditEkey(row){
	_this.dialogTitle = _this.$t('fbcsFile.fnField.editEkey');
	_this.disabled = true;
	_this.ekeyInfo.userID = row.userID;
	_this.ekeyInfo.userName = row.userName;
	_this.ekeyInfo.validDate = row.validDate;
	_this.ekeyInfo.ekeyComment = row.ekeyComment;
	_this.showDialog = true;
}

export default {
	data(){
		data.title = {
			userID: this.$t('fbcsFile.tableTitle.userID'),
			userName: this.$t('fbcsFile.tableTitle.userName'),
			ekeyName: this.$t('fbcsFile.tableTitle.ekeyName'),
			validDate: this.$t('fbcsFile.tableTitle.ekeyDate'),
			ekeyComment: this.$t('fbcsFile.tableTitle.ekeyInfo'),
		};
		data.defined = {
			label: this.$t('fbcsFile.tableTitle.operation'), width: 82,
			items: [
				{src:require('@/fbcsFxViews/img/table/edit.png'), click: showEditEkey, tips: this.$t('fbcsFile.tableDefined.editEkey') },
				{src:require('@/fbcsFxViews/img/table/del.png'), click: delEkey, tips: this.$t('fbcsFile.tableDefined.delEkey') },
			]
		};
		return data;
	},
	props: {
		isPage: {
			type: Boolean,
			default: true
		}
	},
	methods:{
		search(){
			console.log('search');
		},
		showAddEkey(){
			this.dialogTitle = this.$t('fbcsFile.fnField.addEkey');
			for(let k in this.ekeyInfo){
				this.ekeyInfo[k] = '';
			}
			this.disabled = false;
			this.showDialog = true;
		},
		changePage(num){
			console.log(num);
		},
		submit(){
			this.disabled ? edit() : add();
		},
		now(){
			this.disabled ? editNow() : addNow();
		},
	},
	created(){
		_this = this;
		this.id = this.name = ''
		this.keywords = null;
		this.showDialog = false;
	}
}
function add(){
	console.log('add');
}
function edit(){
	console.log('edit');
}
function addNow(){
	console.log('addNow');
}
function editNow(){
	console.log('editNow');
}
</script>

<style scoped="scoped">
	.Ekey{min-width: 696px;padding-right: 20px;background: #FFF;}
</style>