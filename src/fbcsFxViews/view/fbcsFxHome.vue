<template>
	<div ref='fbcs_file' id="fbcs_file" class="home">
		<div class="nav" id="nav">
			<div class="logoBox">
				<img class="logo" src="../img/FDEP.png" />
			</div>
			<button class="defBtn el-icon-tickets fs" @click="isCollapse=!isCollapse">导航</button>
		</div>
		<!--<div class="cw">-->
			<sidebar :collapse.sync="isCollapse"></sidebar>
			<div class="homeView" :class="{big:isCollapse}">
				<!--<div class="router">-->
					<router-view></router-view>
				<!--</div>-->
			</div>
		<!--</div>-->
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';

var data = {
	isCollapse: false
};
//require('../img/logo.png');
export default {
	name: 'elui',
	data() { return data; },
	methods:{},
	created(){
//		this.isCollapse = true;
//		this.$router.replace({path: '/main/fxCfg/userHome'});
	},
	mounted(){
		utils.emit('fbcs_file', this.$refs['fbcs_file']);
	},
	components: {
		sidebar: resolve => require(['@/fbcsFxViews/view/sidebar.vue'], resolve),
	}
};
</script>

<style scoped="scoped">
	.home{height: 100%;}
	.cw{height: calc(100% - 50px);}
	.nav{height: 50px;background: #409eff;color: #FFF;line-height: 50px;z-index: 2;}
	.homeView{height: calc(100% - 50px);margin-left: 226px;overflow: auto;border: 20px solid #Edf0f5;border-right: none;
		padding: 20px 0 20px 20px;transition: margin 0.3s;}
	.big{margin-left: 64px;}
	/*.router{background: #fff;min-height: 100%;}*/
	#fbcs_file .fs{margin-left: 10px;}
	.logoBox{display: inline-block;background: #2861c1;width: 226px;height: 50px;vertical-align: top;}
	.logo{position: absolute;margin: auto;top: 0;left: 0;right: 0;bottom: 0;}
</style>