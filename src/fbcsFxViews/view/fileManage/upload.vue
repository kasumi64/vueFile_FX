<template>
	<div class="upload">
		<header class="backHead">
			<span class="back" @click="back">&lt; {{$t('fbcsFile.tips.back')}}</span>
			<b class="h1">{{this.$t('fbcsFile.files.upload.title')}}</b>
		</header>
		<ul class="form">
			<li>
				<div class="label vt">
					<i class="red">*</i>
					{{$t('fbcsFile.files.upload.fileName')}}
				</div>
				<div class="right">
					<input id="ddd" v-model="fileName" @input="filter($event)" data-k="fileName" maxlength="64" autocomplete="off"/>
					<p class="label txt">{{$t('fbcsFile.files.upload.path')}}</p>
				</div>
			</li><li>
				<div class="label">
					<i class="red">*</i>
					{{$t('fbcsFile.files.upload.version')}}
				</div>
				<div class="right">
					<input v-model="version" @input="filter($event)" data-k="version" maxlength="64" autocomplete="off"/>
				</div>
			</li><li>
				<div class="label">
					{{$t('fbcsFile.files.upload.fileComment')}}
				</div>
				<div class="right">
					<input v-model="fileComment" maxlength="128" autocomplete="off"/>
				</div>
			</li><li>
				<div class="label">&nbsp;</div>
				<div class="right">
					<button v-if="fxAuth" class="blueBtn" @click="dispense">{{$t('fbcsFile.files.upload.dispense')}}</button>
				</div>
			</li><li v-if="fxAuth">
				<div class="label">&nbsp;</div>
				<div class="right">
					<h2 class="h2">{{$t('fbcsFile.files.upload.res')}}</h2>
					<lgy-wheelReq :parameter.sync="parameter" :hideDialog="true" :showTable='true'></lgy-wheelReq>
				</div>
			</li>
		</ul>
		<lgy-review :show.sync='showReview' :reqsv='reqsv' @submit='review' :txt='reviewTxt'></lgy-review>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';

var _this, data = {
	fxAuth: true,
	fileName: '',
	version: '',
	fileComment: '',
	showReview: false,
	reqsv: {},
	reviewTxt: '',
	parameter: null,
};

export default {
	data(){
		return data;
	},
	methods:{
		back(){
			this.$router.push({path: '/main/fxCfg/fileManage/search'});
		},
		dispense(){
			if(!check.call(this)) return;
			
			this.reqsv = {uri: 'userClientFile/dispatch'};
			this.showReview = true;
		},
		review(args){
			let params = {
				url: 'userClientFile/dispatch',
				cmdID: '600062',
				reviewer: args.name,
				version: this.version,
				fileName: this.fileName,
				fileComment: this.fileComment
			};
			utils.post(params).then(function(res){
				if(res.errcode!='0') return utils.alert({txt: res.errinfo});
				_this.parameter = res;
			});
		},
		filter(e){
			let el = e.target, str = el.value, k = el.dataset.k,
				reg = /[^\w-\.]/g;
			if(reg.test(str)){
				utils.alert({txt: this.$t('fbcsFile.err.files.format')});
				this[k] = str.replace(reg, '');
			}
		}
	},
	created(){
		_this = this;
		this.fxAuth = utils.getFxAuth;
		this.version = this.fileName = this.fileComment = '';
	}
};

function check(){
	let files = this.fileName, vers =  this.version, reg = /[^a-zA-Z0-9\._-]/g;
	if(utils.isSpace(files)) return utils.alert({txt: this.$t('fbcsFile.err.files.fileNull')});
	if(utils.isSpace(vers)) return utils.alert({txt: this.$t('fbcsFile.err.files.verNull')});
	if( reg.test(files) ) return utils.alert({txt: this.$t('fbcsFile.err.files.formatFile')});
	if( reg.test(vers) ) return utils.alert({txt: this.$t('fbcsFile.err.files.formatVer')});
	return true;
}

</script>

<style scoped="scoped">
.upload{min-width: 790px;}
.form{white-space: nowrap;}
.form li{margin-bottom: 10px;}
.label{display: inline-block;width: 160px;font-size: 14px;color: #666;text-align: right;vertical-align: middle;}
.right{display: inline-block;margin-left: 10px;vertical-align: middle;width: 600px;margin-right: 20px;}
.h2{ font-size: 14px; color: #666;  margin: 20px 0 10px;}
input{width: 100%;}
.vt{vertical-align: text-bottom;}
.txt{display:block;color: #BBB;}
</style>