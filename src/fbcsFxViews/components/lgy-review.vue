<style>
.lgy-review{display: none;}
.lgy-review .reviewLayer{padding: 50px 0;}
.lgy-review .reviewLayer li:first-child{margin-bottom: 20px;}
.lgy-review .label{width: 180px;font-size: 14px;color:#666;line-height: 30px;padding-right: 10px;text-align: right;vertical-align: top;}
.lgy-review .input{width: 260px;vertical-align: top;}
</style>

<template>
	<div class="lgy-review" :class="{show:show}">
		<input type="text" class="autocompleteOFF" autocomplete="on"/>
		<div ref='lgy-review' class="maskLayer">
			<div ref='tipsPanle' class="tipsPanle">
				<div class="title">
					<b>{{$t('fbcsFile.components.reviewTitle')}}</b>
				</div>
				<ul class="reviewLayer">
					<li>
						<span class="label">{{$t('fbcsFile.components.reviewName')}}</span>
						<input v-model="name" class="input" autocomplete="off"/>
					</li><li>
						<span class="label">{{$t('fbcsFile.components.reviewPwd')}}</span>
						<input v-model="pwd" class="input" type="password" autocomplete="off"/>
					</li>
				</ul>
				<div class="footBtn">
					<button @click="reviewHandle(reqsv)" class="blueBtn ok">{{$t('fbcsFile.tips.ok')}}</button>
					<button @click="cancel" class="defBtn cancel">{{$t('fbcsFile.tips.cancel')}}</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';
import md5 from '@/fbcsFxViews/libs/md5.js';

var _this, data = {
	name: '',
	pwd: ''
};
export default {
	name: 'lgy-review',
	data() { return data; },
	props: {
		show: {
			type: Boolean,
			default: false
		},
		reqsv: { //复核参数
			type: [Object, Function],
			default: {}
		},
		txt: { //弹框文本
			type: String,
			default: ''
		},
	},
	methods:{
		async reviewHandle(param){
			if(this.name==utils.getArgs('userName')) return utils.confirm({txt:this.$t('fbcsFile.components.reviewSame'), btn:1});
			if(this.name==''||this.pwd=='') return utils.confirm({txt:this.$t('fbcsFile.components.reviewNull'), btn:1});
			if(kit.isFn(param)) param = param();
			if(!kit.isObject(param)) param = {uri:param};
			
			let args = Object.assign({}, param), uri = '/fbcs_fx/fx/';
			args.url = 'auth/review';
			args.cmdID = '600122';
			args.reviewer = this.name;
			args.password = md5(this.pwd);
			args.language = utils.getArgs('lang') || 'zh';
			args.uri = uri + (args.uri||'');
			
//			console.log('dispatch:',args.uri);
			let self = this;
			param.name = self.name;
			
			/*if('debug'){
				this.cancel();
				return self.$emit('submit', param);
			}*/

			let res = await utils.post(args);
			if(!res) return;
			if(res.errcode != '0') return utils.alert({txt:res.errinfo, type:0});

			utils.confirm({
				ok: obj => { self.$emit('submit', obj); },
				txt: self.txt || this.$t('fbcsFile.components.isSubmit')
			}, {ok: param});
			this.cancel();
		},
		cancel(e){
			this.$emit('update:show', false);
			this.name = this.pwd = '';
			let el = this.$refs['tipsPanle'];
			if(el){
				el.style.top = '0';
				el.style.left = '0';
			}
		}
	},
	created(){
		_this = this;
		this.cancel();
	},
	mounted(){
		utils.addDrag(this.$refs['lgy-review'],'.title','.tipsPanle');
	}
};
</script>
