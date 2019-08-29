<template>
	<div class="detailTheme">
		<h2 class="h2">
			<em @click="back">
				<img class="icon" src="@/fbcsViews/img/ico.png" />
				<span class="topBack">{{pageTxt.label[8]}}</span>
			</em>
			<span class="span">{{pageTxt.label[0]}}</span>
		</h2>
		<ul class="list">
			<li>
				<label class="txt">{{pageTxt.label[1]}}</label>
				<div class="rightBox">
					<span class="txt1">{{info.topicName}}</span>
				</div>
			</li><li>
				<label class="txt">{{pageTxt.label[7]}}</label>
				<div class="rightBox">
					<span class="txt1">{{info.pubUserID}}</span>
				</div>
			</li><li>
				<label class="txt">{{pageTxt.label[2]}}</label>
				<div class="rightBox">
					<span class="txt2">{{info.topicDescr}}</span>
				</div>
			</li><li>
				<label class="txt">{{pageTxt.label[3]}}</label>
				<div class="rightBox">
					<p class="txt2">{{info.topicInfo}}</p>
				</div>
			</li><li>
				<label class="txt">{{pageTxt.label[9]}}</label>
				<div class="rightBox">
					<p class="txt2">{{info.effectiveDays}}</p>
				</div>
			</li><li>
				<label class="txt">{{pageTxt.label[10]}}</label>
				<div class="rightBox">
					<span class="txt1">{{info.pubTime}}</span>
				</div>
			</li><li>
				<label class="txt">{{pageTxt.label[4]}}</label>
				<div class="rightBox">
					<!--<p class="txt1">{{pageTxt.label[5]}}</p>-->
					<div class="tableBox">
						<div class="title">{{pageTxt.label[5]}}</div>
						<div class="searchBox">
							<input class="search" v-model="leftWord" :placeholder="pageTxt.tips.word" autocomplete="off"/>
							<button class="el-icon-search blueBtn" @click="leftSearch">{{pageTxt.label[11]}}</button>
						</div>
						<div class="slotTitle">
							<span class="itemTxt">{{pageTxt.list[0]}}</span>
							<span class="itemTxt">{{pageTxt.list[1]}}</span>
						</div>
						<ul id="_allUser" ref='left' class="table">
							<li v-for="obj in left" :ind='obj.ind'>
						    	<span class="itemTxt" :title="obj.userID">{{obj.userID}}</span>
						    	<span class="itemTxt" :title="obj.userName">{{obj.userName}}</span>
							</li>
						</ul>
					</div>
					
					<div class="transferBtn"></div>
					
					<div class="tableBox">
						<div class="title">{{pageTxt.label[6]}}</div>
						<div class="searchBox">
							<input class="search" v-model="rightWord" :placeholder="pageTxt.tips.word" autocomplete="off"/>
							<button class="el-icon-search blueBtn" @click="rightSearch">{{pageTxt.label[11]}}</button>
						</div>
						<div class="slotTitle">
							<span class="itemTxt2">{{pageTxt.list[0]}}</span>
							<span class="itemTxt2">{{pageTxt.list[1]}}</span>
							<span class="itemTxt2">{{pageTxt.list[2]}}</span>
						</div>
						<ul id="_cansub" ref='right' class="table">
							<li v-for="obj in right" :ind='obj.ind'>
								<span class="itemTxt2" :title="obj.userID">{{obj.userID}}</span>
						    	<span class="itemTxt2" :title="obj.userName">{{obj.userName}}</span>
						    	<span class="itemTxt2" :title="obj.userAppid">{{obj.userAppid}}</span>
							</li>
						</ul>
					</div>
					
				</div>
			</li><li>
				<label class="txt">&nbsp;</label>
				<div class="rightBox">
					<button class="defBtn" @click="back">{{pageTxt.label[8]}}</button>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import kit       from '@/fbcsViews/libs/kit.js';
import utils     from '@/fbcsViews/libs/utils.js';
import globalVar from '@/fbcsViews/libs/globalVar.js';
import lang      from '@/fbcsViews/language/lang.js';


	var pageTxt, slotTitle, backPage;
	
	var _this, leftAll = {}, rightAll = {}, leftTem = {}, rightTem = {};
	
	var data = {
		pageTxt,
		info: {topicName:'',pubUserID:'',topicDescr:'',topicInfo:'',
			effectiveDays:'',pubTime:'',pubUserName:''},
		left: {},
		leftWord: '',
		right: {},
		rightWord: ''
	};
	
	export default {
		name: 'message_detailTheme',
		data() {
			return data;
		},
		methods: {
			back(){
				utils.goto('/message/' + utils.route().id);
			},
			leftSearch(){
				var word = this.leftWord.toUpperCase(), cu = 0, list = {};
				for (var k in leftAll) {
					var id, name, obj = leftAll[k];
					if(rightAll[obj.ind]) continue;
					id = name = '';
					if(obj.userID) id = obj.userID.toUpperCase();
					if(obj.userName) name = obj.userName.toUpperCase();
					if(word==''||id.indexOf(word)>-1||name.indexOf(word)>-1) {
//						cu++;
						list[k] = obj;
					}
					if(obj.el) {
						obj.el.checked = false;
					}
//					if(cu==200) break;
				}
				this.$refs.left.scrollTop = 0;
				this.left = list;
				leftTem = {};
//				this.leftSelect = false;
			},
			rightSearch(){
				var word = this.rightWord.toUpperCase(), cu = 0, list = {};
				for (var k in rightAll) {
					var id, name, obj = rightAll[k];
					id = name = '';
					if(obj.userID) id = obj.userID.toUpperCase();
					if(obj.userName) name = obj.userName.toUpperCase();
					if(word==''||id.indexOf(word)>-1||name.indexOf(word)>-1) {
//						cu++;
						list[k] = obj;
					}
					if(obj.el) {
						obj.el.checked = false;
					}
				}
				this.$refs.right.scrollTop = 0;
				this.right = list;
				rightTem = {};
//				this.rightSelect = false;
			}
		},
		beforeCreate(){
			_this = this;
			backPage = this.$route.params.id;
		},
		created() {
			this.pageTxt = pageTxt = lang().themeDetailTheme;
		},
		mounted(){
			this.left = [];
			this.left = [];
			this.leftWord = this.rightWord = '';
			var info = this.info;
			for(var k in info){
				info[k] = '';
			}
			getDetail();
		}
	};
	
	function getDetail(){
		var userid = globalVar.get('userid');
		if(!userid) return;
		var ind=0, param = {
				cmdID: '600043', pubUserID: userid.pubUserID,
				topicName: userid.topicName, type: '0'
			};
		utils.post('mx/pubTopic/query', param, function(data){
//			console.log('订阅详情：',data);
			if(data.errcode != 0) {
				// utils.weakTips(data.errinfo);
				fxUtils.alert({txt: data.errinfo});
				return
			}
			var res = data.lists[0],  info = _this.info;
			info.topicName = res.topicName;
			info.pubUserName = res.pubUserName;
			info.pubUserID = res.pubUserID;
			info.topicDescr = res.topicDescr;
			info.topicInfo = res.topicInfo;
			info.effectiveDays = res.effectiveDays;
			info.pubTime = res.pubTime;
			
			//'½½'
			_this.left = leftAll = internalData(res.canSubsUserList||[]);
			_this.right = rightAll = internalData(res.subsUserList||[]);
		});
		function internalData(arr){
			var obj = {}, i, len = arr.length,item;
			for (var i = 0; i < len; i++) {
				item = arr[i];
				ind++;
				item.ind = ind
				obj[ind] = item;
			}
			return obj
		}
	}
	
</script>

<style scoped="scoped">
	.detailTheme{color: #666;}
	.h2{min-width: 1020px;border-bottom: 1px solid #D8D8D8;margin-bottom: 40px;padding-left: 20px;}
	.h2 *{vertical-align: middle;}
	.h2 em{cursor: pointer;}
	.h2 .icon{margin-right: 6px;}
	.h2 .topBack{font-size: 13px;color: #5a719d;line-height: 32px;height: 32px;padding-right: 20px;
		border-right: 1px solid #edeef0;}
	.h2 .span{font-size: 16px;color: #666;line-height: 50px;height: 50px;padding-left: 20px;font-weight: bold;}
	.list li{margin-bottom: 10px;}
	.txt,.txt1,.txt2{display: inline-block;font-size: 14px;line-height: 30px;width: 160px;vertical-align: top;text-align: right;padding-right: 10px;}
	.txt1,.txt2{text-align: left;width: 800px;white-space: normal;}
	.txt2{line-height: 20px;white-space: normal;max-width: 800px;padding: 5px 0;}
	.rightBox{vertical-align: top;display: inline-block;}
	.rightBox .el-input{width: 255px;}
	.rightBox .el-textarea{width: 835px;}
	
	/*.tableWrap{width: 370px;display: inline-block;vertical-align: top;max-height: 400px;overflow-y: auto;}
	.tableWrap:first-child{margin-right: 40px;}*/
	
	.defBtn{margin-top: 30px;}
	
	.slotTitle{padding-left: 36px;background: #E5EAF0;border: 1px solid #D8D8D8;border-width: 1px 0;font-weight: bold;}
	.tableBox{display: inline-block;width: 370px;vertical-align: middle;height: 433px;overflow: hidden;border: 1px solid #ebeef5;border-radius: 4px;white-space: nowrap;}
	.tableBox .title{font-size: 16px;color: #303133;background: #f5f7fa;line-height: 40px;height: 40px;padding-left: 15px;border-bottom: 1px solid #ebeef5;}
	.itemTxt,.itemTxt2{display: inline-block;width: 150px;font-size: 12px;line-height: 30px;color: #333;vertical-align: middle;overflow: hidden;text-overflow: ellipsis;pointer-events: all;}
	.tableBox .searchBox{padding: 15px;}
	.tableBox .searchBox input{width: 234px;font-size: 12px;height: 30px;padding: 0 10px;vertical-align: middle;border: 1px solid #D7D8DA;color: #606266;}
	.tableBox .searchBox .blueBtn{vertical-align: middle;margin: 0 0 0 15px;}
	.tableBox .table {height: 300px;overflow: auto;}
	.tableBox .table li{padding-left: 36px;border-bottom: 1px solid #EBEEF5;margin: 0;}
	.itemTxt2{width: 105px;}
	
	.transferBtn{display: inline-block;vertical-align: middle;border-color: #5e7297;padding: 0 30px;}
	
	/*.transfer{text-align: center;}
	.el-transfer{text-align: left; display: inline-block;}
	.itemTxt{display: inline-block;font-size: 13px;line-height: 40px;color: #666;vertical-align: middle;overflow: hidden;text-overflow: ellipsis;}
	#slotTitle{display: none;}
	.slotTitle{background: #F6F6F6;border: 1px solid #D8D8D8;border-width: 1px 0;}
	.all{font-size: 14px;width: 36px;display: inline-block;padding-left: 15px;pointer-events: none;}
	.hide{display: none;}
	.transfer .wrap0 .itemTxt{width: 150px;}
	.transfer .wrap1 .itemTxt{width: 100px;}
	.transfer .wrap1 .hide{display: inline-block;}*/
</style>
<style>
	#fbcs_MX .detailTheme .transfer .el-checkbox__input{display: none;}
	#fbcs_MX .detailTheme .el-transfer__buttons button{display: none;}
</style>