import globalVar from '../libs/globalVar.js';
import zhcn      from './zh-CN.js';
import en        from './en.js';
import lang      from 'element-ui/lib/locale/lang/en';
import locale    from 'element-ui/lib/locale';

	if(globalVar.get('lang')=='en'){
		locale.use(lang);
	}
//console.log(navigator);

/*
 * 0: "zh-CN"
1: "zh"
2: "zh-TW"
3: "zh-HK"
4: "en-US"
5: "en"
 */


export default function () {
	// console.log('Get language =', globalVar.get('lang'));
	return globalVar.get('lang')=='en' ? en : zhcn;
}