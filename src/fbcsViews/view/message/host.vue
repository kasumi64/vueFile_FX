<template>
	<div>
		<!-- <div class='header'>
			<span class='header_txt'>{{pageTxt.label[0]}}</span>
		</div> -->
		<div class='host_btn'>
			<el-tabs v-model="active" type="card" @tab-click="tabClick">
				<el-tab-pane :label="pageTxt.label[1]" name="first">
					<div class="switch_box">
						<span class='title_txt'><span class="red">*&nbsp;</span>{{pageTxt.label[2]}}</span>
						<el-switch v-if="auth>1" v-model="switchValue1" :active-text="pageTxt.label[7]" active-color='#0DB9EB' :inactive-text="pageTxt.label[6]" inactive-color='#D7D8DA'></el-switch>
						<span class='prompt_txt'>{{pageTxt.label[9]}}</span>
					</div>
					<div class="mxContent">
						<el-input auto-complete="off" type="textarea" rows="15" v-model="textareaValue1" :disabled="!switchValue1"></el-input>
					</div>
					<button v-if="auth>1" class="blueBtn" :disabled="!switchValue1" @click="showReviewFn">{{pageTxt.label[3]}}</button>
					<button v-if="auth>1" class="blueBtn mt" :disabled="!switchValue1" @click="history(textareaValue1)">{{$t('fbcsFile.tips.contrast')}}</button>
				</el-tab-pane>
				<el-tab-pane :label="pageTxt.label[4]" name="second">
					<div class="switch_box">
						<span class='title_txt'><span class="red">*&nbsp;</span>{{pageTxt.label[5]}}</span>
						<el-switch v-if="auth>1" v-model="switchValue2" :active-text="pageTxt.label[7]" active-color='#0DB9EB' :inactive-text="pageTxt.label[6]" inactive-color='#D7D8DA'></el-switch>
						<span class='prompt_txt'>{{pageTxt.label[10]}}</span>
					</div>
					<div class="mxContent">
						<el-input auto-complete="off" type="textarea" rows="15" v-model="textareaValue2" :disabled="!switchValue2"></el-input>
					</div>
					<button v-if="auth>1" class="blueBtn" :disabled="!switchValue2" @click="showReviewFn">{{pageTxt.label[3]}}</button>
					<button v-if="auth>1" class="blueBtn mt" :disabled="!switchValue2" @click="history(textareaValue2)">{{$t('fbcsFile.tips.contrast')}}</button>
				</el-tab-pane>
			</el-tabs>
			<div v-if="auth>1" class="mxContent">
				<h2 class="h2">{{$t('fbcsFile.suConfig.h2')}}</h2>
				<el-table v-if="auth>1" :data="list" :row-class-name="rowClass"  highlight-current-row border stripe >
					<el-table-column prop="section" :label="$t('fbcsFile.suConfig.section')"></el-table-column>
					<el-table-column prop="field" :label="$t('fbcsFile.suConfig.field')"></el-table-column>
					<el-table-column prop="type" :label="$t('fbcsFile.suConfig.type')"></el-table-column>
					<el-table-column prop="detail" :label="$t('fbcsFile.suConfig.detail')"></el-table-column>
				</el-table>
			</div>
			<el-dialog ref="diaTab" :visible.sync="errDialog" width="70%" :title="$t('fbcsFile.suConfig.err')" v-dialogDrag
				:close-on-click-modal='false' :show-close="false">
				<div class="_dialog">
					<el-table :data="errList" :row-class-name="rowClass" max-height="294" border stripe>
						<el-table-column prop="section" :label="$t('fbcsFile.suConfig.section')"></el-table-column>
						<el-table-column prop="field" :label="$t('fbcsFile.suConfig.field')"></el-table-column>
						<el-table-column prop="oldValue" :label="$t('fbcsFile.suConfig.oldValue')"></el-table-column>
						<el-table-column prop="modifyValue" :label="$t('fbcsFile.suConfig.modifyValue')"></el-table-column>
						<el-table-column prop="range" :label="$t('fbcsFile.suConfig.range')"></el-table-column>
					</el-table>
				</div>
				<div slot="footer" class="_footBtn">
					<button class="defBtn" @click="errDialog=false">{{$t('fbcsFile.tips.close')}}</button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
import utils from "@/fbcsViews/libs/utils.js";
import lang from '@/fbcsViews/language/lang.js';
import globalVar from '@/fbcsViews/libs/globalVar.js';
import fxUtils from '@/fbcsFxViews/libs/utils.js';

	var pageTxt = 'lang.host', _this;
	
	export default {
		data() {
			return {
				pageTxt,
				auth: globalVar.get('status').suconfig,
				userName: "",
				passwd: "",
				switchValue1: false,
				switchValue2: false,
				textareaValue1: "",
				textareaValue2: "",
				active: "first",
				hostType: 2,
				list: [{section:'abc',type:'用户',detail:'详情'},
				{section:'abc',type:'用户',detail:'详情'}],
				errList: [],
				errDialog: true
			};
		},
		methods: {
			rowClass({row, rowIndex}){
				if(rowIndex%2 != 0) return 'tableBG';
				return '';
			},
			history(){
				let reg = /[\%％ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ０１２３４５６７８９]/;
				let txtVal = _this.hostType == 1 ? _this.textareaValue2 : _this.textareaValue1;
				if(reg.test(txtVal)){
					// return fxUtils.weakTips(this.$t('fbcsFile.suConfig.full'));
					return fxUtils.alert({txt: this.$t('fbcsFile.suConfig.full')});
				}
				this.list = [];
				let params = {
					url: 'suConfig/webModifyCompare',
					cmdID: '600084',
					type: (this.active == 'first') ? 2 : 1,
					cfgInfo: txtVal
				};
				fxUtils.post(params).then(function(res){
					if(res.errcode != 0) return fxUtils.alert({txt: res.errinfo});
					_this.list = res.lists;
				});
			},
			//编辑
			showReviewFn() {
				var configinfo = _this.hostType == 1 ? _this.switchValue2 : _this.switchValue1;
				if(!configinfo) {
					return;
				}
				let reg = /[\%％ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ０１２３４５６７８９]/;
				let txtVal = _this.hostType == 1 ? _this.textareaValue2 : _this.textareaValue1;
				if(reg.test(txtVal)){
					return fxUtils.alert({txt: this.$t('fbcsFile.suConfig.full')});
				}
				
				utils.review({ //审核
					uri: 'mx/suConfig/modify',
					yes: _this.edit
				});
			},
			subitHints() {
				this.edit();
			},
			edit(args) {
				utils.hints({
					txt: pageTxt.label[8],
					yes: _this.editSubmit,
					yesArgs: args
				});
			},
			editSubmit(args) {
				this.list  = [];
				utils.post("mx/suConfig/modify", {
					cmdID: "600082",
					type: _this.hostType,
					cfgInfo: _this.hostType == 1 ? _this.textareaValue2 : _this.textareaValue1,
					reviewer: args.name,
					reviewerPassword: args.pwd,
					reviewType: 1
				}, function(data) {
					if(data.errcode == '1701'){
						_this.errList = data.lists;
						_this.errDialog = true;
						fxUtils.tableSTop(_this, 'diaTab');
						return
					}
					if(data.errcode == '0') {
						_this.renderDate();
						_this.switchValue1 = _this.switchValue2 = false;
						fxUtils.alert({txt: data.errinfo, type: 1});
					} else fxUtils.alert({txt: data.errinfo});
				});
			},
			//判断静态/动态配置
			tabClick(tab, event) {
				if(this.active == "first") {
					this.hostType = 2;
				} else {
					this.hostType = 1;
				}
				this.list = [];
				this.switchValue1 = this.switchValue2 = false;
				this.renderDate();
			},
			//更新数据
			renderDate() {
				utils.post("mx/suConfig/query", {
					cmdID: "600081",
					type: _this.hostType
				}, function(response) {
					if(response.errcode == 0) {
						if(_this.hostType == 2) {
							_this.textareaValue1 = response.cfgInfo;
						} else {
							_this.textareaValue2 = response.cfgInfo;
						}
					} else {
						// utils.weakTips(response.errinfo);
						fxUtils.alert({txt: response.errinfo});
					}
				});
			}
		},
		//初始化数据
		created() {
			_this = this;
			let l = lang();
			this.pageTxt = pageTxt = l.host;
			this.auth= globalVar.get('status').suconfig;
			this.errDialog = false;
			this.renderDate();
			this.list = [];
		}
	};
</script>

<style scoped="scoped">
	.host_btn{padding:20px;}
	.host_btn *{vertical-align:middle;}
	.host_btn .blueBtn{margin-top: 20px; margin-left: 120px;}
	.title_txt{font-size:14px; color:#666; margin-right: 10px;}
	.prompt_txt{font-size:14px; color:#999; margin-right: 10px;}
	.switch_box{margin-top: 5px;}
	.switch_box .el-switch{margin-right: 20px;}
	.mxContent{margin-top: 20px; max-width: 900px; margin-left: 120px;}
	.red{font-size:14px; color:#FF6B6B;}
	.host_btn button:disabled{background-color:rgb(215, 216, 218)}
	.h2{font-size: 14px;line-height: 30px;margin-top: 20px;}
	.host_btn .mt{margin-left: 20px;}
</style>
