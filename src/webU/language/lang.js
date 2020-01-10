import Vue from 'vue';
import VueI18n from 'vue-i18n';
import locale from 'element-ui/lib/locale';
import elemEN from 'element-ui/lib/locale/lang/en';
import elemCN from 'element-ui/lib/locale/lang/zh-CN';
import en from '@/fbcsFxViews/language/fbcs_FX_en.js';
import cn from '@/fbcsFxViews/language/fbcs_FX_zh-CN.js';
import webzh from '@/webU/language/webU_zh-CN.js';
import weben from '@/webU/language/webU_en.js';


Vue.use(VueI18n);

const i18n = new VueI18n({
	locale: localStorage.getItem('language') || 'zh',
	messages: {
		en: Object.assign(en, elemEN, webzh),
		zh: Object.assign(cn, elemCN, weben)
	}
});

locale.i18n((keys, value) => i18n.t(keys, value));

export default i18n;
