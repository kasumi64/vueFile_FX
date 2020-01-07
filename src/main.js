// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/fbcsFxViews/components/package.js';
import Vue from 'vue';
import router from '@/public/routerConfig.js';
import App from '@/App';
import i18n from '@/fbcsFxViews/language/lang.js';
import store from './public/store.js';


Vue.config.productionTip = false;
//Vue.config.silent = true;
//Vue.config.debug = false;


/* eslint-disable no-new */
window.appVue = new Vue({
	el: '#app',
	router,
	i18n,
	render: h => h(App),
	store
})
