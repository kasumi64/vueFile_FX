<template>
	<div class="upload">
		<ul class="form">
			<li>
				<div class="label vt">
					<i class="red">*</i>
					{{$t('fbcsFile.files.upload.fileName')}}
				</div>
				<div class="right">
					<input v-model="fileName"  maxlength="256"/>
					<p class="label txt">{{$t('fbcsFile.files.upload.path')}}fbcs-server/static/import/fxclient</p>
				</div>
			</li><li>
				<div class="label">
					<i class="red">*</i>
					{{$t('fbcsFile.files.upload.version')}}
				</div>
				<div class="right">
					<input v-model="version" maxlength="256"/>
				</div>
			</li><li>
				<div class="label">
					<i class="red">*</i>
					{{$t('fbcsFile.files.upload.fileComment')}}
				</div>
				<div class="right">
					<input v-model="fileComment" maxlength="256"/>
				</div>
			</li><li>
				<div class="label">&nbsp;</div>
				<div class="right">
					<button class="blueBtn" @click="dispense">{{$t('fbcsFile.files.upload.dispense')}}</button>
				</div>
			</li><li>
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
	version: '',
	fileName: '',
	fileComment: '',
	showReview: false,
	reqsv: {},
	parameter: null,
};

function del(row){
	row.uri = 'userClientFile/dispatch';
	_this.reqsv = row;
	_this.showReview = true;
}

export default {
	data(){
		return data;
	},
	methods:{
		dispense(){
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
		}
	},
	created(){
		_this = this;
		this.version = this.fileName = this.fileComment = '';
	}
};

</script>

<style scoped="scoped">
.form{white-space: nowrap;}
.form li{margin-bottom: 10px;}
.label{display: inline-block;width: 160px;font-size: 14px;color: #666;text-align: right;vertical-align: middle;}
.right{display: inline-block;margin-left: 10px;vertical-align: middle;width: 600px;margin-right: 20px;}
.h2{ font-size: 14px; color: #666;  margin: 20px 0 10px;}
input{width: 100%;}
.vt{vertical-align: text-bottom;}
.txt{display:block;color: #BBB;}
</style>