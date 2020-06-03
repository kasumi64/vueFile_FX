<template>
	<div ref="fbcs_MX" id="fbcs_MX" class="home">
		<input class="opacity0" autocomplete="on"/>
		<navhead></navhead>
		<div class="cw">
			<sidebar></sidebar>
			<div class="homeView">
				<div v-if="LockState" class="lockTxt">{{pageTxt.label[0]}}</div>
				<div class="router" ref="router">
					<router-view></router-view>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import  '@/fbcsViews/libs/css/fdep.css';
import utils		from '../libs/utils.js';
import globalVar	from '../libs/globalVar.js';
import lang			from '../language/lang.js';
import navhead		from '@/fbcsViews/view/navHead.vue';
import sidebar		from '@/fbcsViews/view/sidebar.vue';
import fxUtils		from '@/fbcsFxViews/libs/utils.js';
	
var _this;

export default {
	name: 'fbcsMxHome',
	data() {
		return {
			pageTxt: ''
		};
	},
	methods: {
		
	},
	beforeCreate(){
		fxUtils.setBaseURL(globalVar.get('urlIP') + 'mx/');
		utils.getMxAuth();
		fxUtils.fbcsLanguage = utils.language;
	},
	created(){
		_this = this;
		this.pageTxt = lang().home;
	},
	mounted(){
		fxUtils.emit('fbcs_file', this.$refs['fbcs_MX']);
	},
	computed: {
		LockState(){
			return showRedText();
		}
	},
	components: {navhead, sidebar}
};
	
function showRedText(){
	let isLock = _this.$store.state.isLockFbcs;
	let home = _this.$refs.router;
	if(!home) return isLock;
	if(isLock){
		home.style['min-height'] = 'calc(100% - 44px)';
	} else {
		home.style['min-height'] = '100%';
	}
	return isLock;
}

</script>

<style scoped>
	.home{white-space: nowrap;height: 100%;}
	.home .cw{height: calc(100% - 50px);margin-top: 50px;}
	.el-menu{border: none;}
	.homeView{
		margin-left: 226px;
		height:100%;
		/*padding: 20px;*/
		vertical-align: top; 
		background-color: #FFF;
		overflow: auto;
		/*border: 20px solid #EDF0F5; */
		border-right: none;
	}
	.lockTxt{height: 44px;line-height: 44px;font-size: 14px;padding-left: 14px;color: #ff7a7d;background: #FFF;font-weight: bold;}
	.router{
		min-height: 100%;
		/* -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
		box-shadow: 0 6px 7px 7px rgba(229,233,240,0.18); */
		background-color: #FFF;border: 1px solid #EBEFF4;border-right: none;
	}
</style>
