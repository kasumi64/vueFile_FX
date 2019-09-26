<template>
	<div class="order">
		<el-tabs v-model="activeTag" class="manage" type="card" @tab-click="tabClick">
			<el-tab-pane :label="$t('fbcsFile.order.manage.xiaozhan')" name="xiaozhan">小站指令</el-tab-pane>
			<el-tab-pane :label="$t('fbcsFile.order.manage.ekeyOrder')" name="ekeyOrder">Ekey指令</el-tab-pane>
			<el-tab-pane :label="$t('fbcsFile.order.manage.signalOrder')" name="signalOrder">关系对指令</el-tab-pane>
			<el-tab-pane :label="$t('fbcsFile.order.manage.pwdOrder')" name="pwdOrder">密码指令</el-tab-pane>
		</el-tabs>
		<router-view />
		<button class="blueBtn rig" @click="report">{{$t('fbcsFile.order.manage.reportBtn')}}</button>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';


export default {
	data(){
		return {
			activeTag: 'xiaozhan'
		};
	},
	methods:{
		tabClick(){
			let path = '/main/fxCfg/order/' + this.activeTag;
			this.$router.push({path});
		},
		report(){
			utils.confirm({
				txt: this.$t('fbcsFile.order.manage.reportTxt'),
				ok: () => {
					utils.loadShow();
					utils.post({url: 'bopinfo/report', cmdID: '700040'}).then(res => {
						utils.loadClose();
						utils.alert({txt:res.errinfo, type: res.errcode!='0' ? 0 : 1});
					});
				}
			});
		}
	},
	created(){
		this.activeTag = 'xiaozhan';
		this.$router.push({path:'/main/fxCfg/order/xiaozhan'});
	}
}
</script>

<style scoped="scoped">
.order{min-width: 1028px;padding-right: 20px;width: 100%;}
.manage{margin-bottom: 10px;width: 100%;}
.rig{position: absolute;top: 0;right: 20px;z-index: 2;}
</style>
<style>
	#fbcs_file .order .remark{min-width: 50px;width: 100%;}
	#fbcs_file .order .el-table__header .el-checkbox{display: inline-block;}
	#fbcs_file .order ._dialog{padding-right: 0;}
	#fbcs_file .orderPane{padding-bottom: 0;max-height: 480px;overflow: auto;}
</style>
