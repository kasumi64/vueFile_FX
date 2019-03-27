<style>
#lgy-candidateWords {display: inline-block;position: relative;}
#lgy-candidateWords .inp{width: 192px;font-size: 12px;padding: 0 26px 0 10px;height: 30px;border:1px solid #dcdfe6;border-radius: 0;color: #666;}
/*#lgy-candidateWords .inp:focus{border:2px solid #32ccF9}*/
#lgy-candidateWords .arrow{position: absolute;top: 7px;right: 7px;font-size: 14px;color: #c0c4cc;transition: transform 0.3s;display: none;}
#lgy-candidateWords .inTip {
	display: none;position: absolute;padding: 5px 0;max-height: 200px;background: #FFF;top: 35px;left: 0;
	width: 100%;overflow-x: hidden;overflow-y: auto;border: 1px solid #e4e7ed;border-radius: 4px;z-index: 2;
	-webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
#lgy-candidateWords .inTip li{font-size: 12px;padding: 0 10px;color: #666;line-height: 30px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
#lgy-candidateWords .inTip li:hover{background: #f5f7fa;}
</style>
<template>
	<div id="lgy-candidateWords">
		<input :value="value" :disabled="disabled" class="inp" :placeholder="placeholder" 
			@focus="focusHandle" @blur="blurHandle" @input="inputHandle" @change="changeHandle"/>
		<i ref='arrow' @click='close' class="el-icon-circle-close arrow"></i>
		<ul ref='inTip' class="inTip" @scroll="scrollHandle">
			<li v-for="o in keywords" @mousedown="clickHandle(o, $event)">{{o.lable}}</li>
			<li v-if="isNull()"><center>{{$t('fbcsFile.components.not')}}</center></li>
		</ul>
	</div>
</template>

<script>
var _this, t, data = {
	list: [],
	placeholder: 'placeholder'
};
export default {
	name: 'lgy-candidateWords',
	data() { return data; },
	props: {
		keywords: {
			type: [Array, Object],
			default: null
		},
		value: {
			type: [String, Number],
			default: ''
		},
		placeholder: {
			type: String,
			default: ''
		},
		disabled: false,
		fetch: Function,
		scrollEnd: Function
	},
	methods:{
		focusHandle(e){
			let ref = this.$refs;
//			if(!e.target.value) return;
			ref.inTip.style.display = 'block';
//			ref.arrow.style.transform = 'rotate(-180deg)';
		},
		blurHandle(){
			let ref = this.$refs;
			ref.inTip.style.display = 'none';
//			ref.arrow.style.transform = 'rotate(0deg)';
		},
		scrollHandle(e){
			let el = e.target;
			let t = el.clientHeight + el.scrollTop, h = el.scrollHeight;
			if(t==h&&(this.scrollEnd instanceof Function)) {
				this.scrollEnd();
			}
		},
		clickHandle(o, e){
			let val = o.value||o.lable;
			this.$emit('input', val, e);
			this.$refs.arrow.style.display = 'block';
		},
		inputHandle(e){
			let self = this;
			clearTimeout(t);
			t = setTimeout(function(){
				let val = e.target.value;
				self.$emit('input', val, e);
//				self.$refs.arrow.style.display = val ? 'block' : 'none';
			}, 300);
		},
		changeHandle(e){
			this.$emit('change', e.target.value, e);
		},
		isNull(){
			let k,list = this.keywords;
			if(!list) return 1;
			for(k in list) if(list[k]) return 0;
			return 1;
		},
		close(e){
			if(this.disabled) return;
			this.$emit('input', '', e);
			this.$emit('close', e);
			this.$refs.arrow.style.display = 'none';
		}
	},
	created(){
		_this = this;
		this.$emit('input', '');
		let p = this.placeholder;
		if(!p) this.placeholder = this.$t('fbcsFile.components.placeholder');
	},
	watch: {
		disabled(val){
			this.$refs.arrow.style.display = 'none';
		},
		value(val){
			this.$refs.arrow.style.display = (!this.disabled && val) ? 'block' : 'none';
		}
	}
};
</script>
