<template>
	<div class="distr">
		<!--<h2 class="h2">{{pageTxt.label[0]}}</h2>-->
		<hr class="_hr" />
		<ul class="list">
			<li>
				<label class="txt">{{pageTxt.label[1]}}</label>
				<div class="rightBox">
					<el-select v-model="type" @change="change" placeholder="请选择">
						<el-option v-for="item in pageTxt.options" :key="item.val" :label="item.label" :value="item.val">
						</el-option>
					</el-select>
					<span class="txt2" v-if="type==1">
						({{pageTxt.label[5]}}userinfo.db, userekey.db, usercomm.db, mxdynamic.ini)
					</span><span class="txt2" v-else-if="type==2">
						({{pageTxt.label[6]}}mxstatic.ini)
					</span><span class="txt2" v-else-if="type==3">
						({{pageTxt.label[10]}}userpasswd.db)
					</span><span class="txt2" v-else-if="type==4">
						({{pageTxt.label[11]}}pscomm.db)
					</span>
				</div>
			</li><li>
				<label class="txt">{{pageTxt.label[2]}}</label>
				<div class="rightBox">
					<p class="txt3">{{pageTxt.label[7]}}</p>
					<el-table ref="table" class='suList' :data="data" tooltip-effect="dark" @current-change="currentRow" highlight-current-row
					 @selection-change="selectionRow"stripe border>
						<!--<el-table-column width="55" type="index"></el-table-column>-->
						<el-table-column type="selection" width="55"></el-table-column>
						<el-table-column prop="serviceID" :label="pageTxt.list[2]" ></el-table-column>
						<el-table-column prop="zone" :label="pageTxt.list[0]" ></el-table-column>
					</el-table>
					<!--<div class="pagination" v-show="data.length!=0">
						<el-pagination @current-change='userChange($event)' background layout="prev, pager, next" 
							:page-size='20' :total="1000">
						</el-pagination>
					</div>-->
				</div>
			</li>
			<!--<li>
				<label class="txt"><b class="red">*&nbsp;</b>{{pageTxt.label[3]}}</label>
				<div class="rightBox">
					<el-input auto-complete="off" :placeholder='pageTxt.label[8]'></el-input>
				</div>
			</li><li>
				<label class="txt"><b class="red">*&nbsp;</b>{{pageTxt.label[4]}}</label>
				<div class="rightBox">
					<el-input auto-complete="off" :placeholder='pageTxt.label[8]'></el-input>
				</div>
			</li>-->
			<li>
				<label class="txt">&nbsp;</label>
				<div class="rightBox">
					<p class="jg"></p>
					<button v-if="auth>1" class="blueBtn" @click="submit">{{pageTxt.label[9]}}</button>
				</div>
			</li><li>
				<label class="txt">&nbsp;</label>
				<div class="rightBox">
					<p class="txt3">{{pageTxt.list[1]}}</p>
					<!-- <lgy-loopReqMX ref="loop"></lgy-loopReqMX> -->
					<lgy-loopReqMX class='suList' ref="loop" :hideDialog="true" :showTable="true"></lgy-loopReqMX>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import utils	 from '@/fbcsViews/libs/utils.js';
import lang		 from '@/fbcsViews/language/lang.js';
import globalVar from '@/fbcsViews/libs/globalVar.js';
import fxUtils   from '@/fbcsFxViews/libs/utils.js';


	var pageTxt, _this, _currentPage = 1;
	pageTxt = 'lang.distr';
	
	export default {
		name: 'message_distr',
		data() {
			return {
				pageTxt,
				auth: globalVar.get('status').dispatch,
		        data: [/*{serviceID: 'SU-06'},{serviceID: 'AU-01'}*/],
		        type: '1',
		        selects: []
			};
		},
		methods: {
			change(t){
				getHost();
			},
			currentRow: function(row){
			},
			selectionRow(arr) {
		        this.selects = arr;
		    },
		    currentPage: function(e){
//		    	console.log(e)
			},
			submit(e){
				var arr = this.selects;
				if(arr.length < 1) return fxUtils.alert({txt: pageTxt.tips.pc});
				
				utils.review({ //审核
					uri: 'mx/batchDispatch/dispatch',
					yes: function(args){
						fullDose(arr, args);
					}
				});
			}
		},
		created(){
			let l = lang();
			this.pageTxt = pageTxt = l.distr;
		},
		mounted(){
			_this = this;
			this.auth= globalVar.get('status').dispatch;
			getHost();
		},
		watch: {
			type(v){
				if(this.$refs.loop) this.$refs.loop.clear();
			}
		}
	};
	function getHost(){
		var param = {
			url: 'mx/batchDispatch/querySuName',
			cmdID: '600071',
			type: _this.type,
			currentPage: 1,
			pageSize: 300
		};
		utils.post(param, function(data){
			if(data.errcode != 0) return fxUtils.alert({txt: data.errinfo});
			_this.data = data.lists;
			setTimeout(function(){
				if(_this.$refs.table) _this.data.forEach(row => { _this.$refs.table.toggleRowSelection(row, true); });
			}, 40);
		});
	}
	function fullDose(arr, args){
		utils.hints({
			txt:pageTxt.tips.submit,
			yes: function(){
				var param = {
					cmdID: '600072',
					url: 'mx/batchDispatch/dispatch',
					type: _this.type,
					lists: arr,
					count: arr.length,
					reviewer: args.name,
					reviewerPassword: args.pwd,
					reviewType: 1
				};
				utils.post(param, function(data){
					if(data.errcode != '0') {
						_this.$refs.loop.syncList();
						return fxUtils.alert({txt: data.errinfo});
					}
					// utils.wheelReq(data); //轮循 //.weakTips
					_this.$refs.loop.start(data);
				});
			}
		});
	}
</script>

<style scoped="scoped">
	.distr{padding: 0 20px;white-space: nowrap;color: #333;}
	.h2{font-size: 16px;line-height: 44px;color: #666;font-weight: bold;}
	
	.list li{margin-bottom: 10px;}
	.txt,.txt2,.txt3{display: inline-block;font-size: 14px;line-height: 30px;width: 120px;vertical-align: top;text-align: right;padding-right: 10px;}
	.txt2{width: auto;text-align: left;color: #999;}
	.txt3{width: auto;text-align: left;}
	.red{color: #F00;line-height: 1;vertical-align: text-bottom;}
	.rightBox{vertical-align: top;display: inline-block;}
	.rightBox .el-input{width: 255px;}
	.rightBox .el-textarea{width: 835px;}
	.el-select{width: 200px;margin-right: 10px;}
	.blueBtn{margin-right: 40px;}
	.jg{padding-bottom: 30px;}
	.distr .suList{max-height: 443px;overflow: auto;width: 730px;}
</style>
