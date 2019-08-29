<template>
	<div class="password">
		<el-dialog class="dialog_pop" v-dialogDrag :title="pageTxt.label[0]" :visible.sync="$store.state.passShow" width='600px'>
			<ul class="_dialog">
				<li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.label[1]}}</p>
					</div>
					<div class="rightBox">
						<el-input auto-complete="off" v-model="this.$store.state.transferEditID" placeholder="" disabled></el-input>
					</div>
				</li><li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.mpwd}}</p>
					</div>
					<div class="rightBox">
						<div class="psw">
							<el-checkbox v-model="checked">　</el-checkbox>
						</div>
					</div>
				</li><li v-if="checked">
					<div class="leftBox">
						<p class="txt">{{pageTxt.label[2]}}</p>
					</div>
					<div class="rightBox">
						<el-radio v-model="info.isModifyDefaultPasswd" :label="0" @change="changeNewPassword">{{pageTxt.label[3]}}</el-radio>
						<el-radio v-model="info.isModifyDefaultPasswd" :label="1" @change="changeNewPassword">{{pageTxt.label[4]}}</el-radio>
					</div>
				</li><li v-if="checked">
					<div class="leftBox">
						<span v-show="info.isModifyDefaultPasswd==1" class="red">*</span>
						<span class="txt">{{pageTxt.label[5]}}</span>
					</div>
					<div class="rightBox">
						<input class="blueInput" v-model="info.npasswd" @input='inputVal' data-key="npasswd" autocomplete="off"
							:placeholder="info.isModifyDefaultPasswd?'':'111111'" :disabled="info.isModifyDefaultPasswd==0"></input>
					</div>
				</li><li v-if="checked">
					<div class="leftBox">
						<span v-show="info.isModifyDefaultPasswd==1" class="red">*</span>
						<span class="txt">{{pageTxt.label[6]}}</span>
					</div>
					<div class="rightBox">
						<input class="blueInput" v-model="info.again" @input='inputVal' data-key="again" name='again' autocomplete="off"
							:placeholder="info.isModifyDefaultPasswd?'':'111111'" :disabled="info.isModifyDefaultPasswd==0"></input>
					</div>
				</li><li>
					<div class="leftBox">
						<p class="txt">{{pageTxt.label[10]}}</p>
					</div>
					<div class="rightBox">
						<el-select v-model='info.pwdTime' >
							<el-option v-for="item in pageTxt.pwdTime" :label="item.txt" :key="item.val" :value="item.val"></el-option>
						</el-select>
					</div>
				</li>
			</ul>
			<div slot="footer" class="_footBtn">
				<el-button type="primary" @click="sendDown">{{pageTxt.label[7]}}</el-button>
				<el-button type="primary" @click="verify">{{pageTxt.label[8]}}</el-button>
				<el-button type="default" @click="goBack">{{pageTxt.label[9]}}</el-button>
			</div>
		</el-dialog>
		<lgy-loopReqMX ref="loop"></lgy-loopReqMX>
	</div>
</template>

<script>
import utils	 from "@/fbcsViews/libs/utils.js";
import lang		 from "@/fbcsViews/language/lang.js";
import globalVar from '@/fbcsViews/libs/globalVar.js';
import md5 from "@/fbcsViews/libs/md5.js";
import fxUtils   from '@/fbcsFxViews/libs/utils.js';

	var _this, data = {
		pageTxt: 'lang.password',
		checked: true,
		msg: "",
		info: {
			id: "",
			npasswd: "",
			isModifyDefaultPasswd: 0,
			pwdTime: '1',
			again: ''
		}
	};
		

	export default {
		data() {
			return data;
		},
		methods: {
			goBack() {
				this.$store.state.passShow = false;
				setTimeout(function(){
					_this.info.isModifyDefaultPasswd = 0;
					_this.changeNewPassword();
	//				_this.info.pwdTime = '1';
					_this.checked = true;
				}, 100);
				
			},
			verify() {
				this.encapsulationVerify(this.submit);
			},
			inputVal(e){
				var el = e.target, val = el.value, k = el.dataset.key;
				this.info[k] = val.replace(/[^\w @#_\-\*]/g,'');
			},
			encapsulationVerify(fn) {
				var tips = this.pageTxt.tips;
				if(this.info.isModifyDefaultPasswd == 1){
					if(this.info.npasswd=='') return fxUtils.alert({txt: tips.npwd});
					if(this.info.npasswd != this.info.again) return fxUtils.alert({txt: tips.unlike});
					// if(/(^\s)|(\s$)/.test(_this.info.npasswd)) return fxUtils.alert({txt: tips.blank});
					if(/\s/.test(_this.info.npasswd)) return fxUtils.alert({txt: tips.blank2});
					var num = 0, reg = [/[A-Z]/,/[a-z]/,/[0-9]/,/[@#_\-\*]/],
						val = this.info.npasswd;
					if(val.length < 8) return fxUtils.alert({txt: tips.pwdRule});
					for (var i = 0, len = reg.length; i < len; i++) {
						if(reg[i].test(val)) num++;
					}
					if(num > 1) fn();
					else return fxUtils.alert({txt: tips.pwdRule});
				} else fn();
			},
			submit() {
				utils.post("mx/userpasswd/modify", {
					cmdID: "600009",
					operator: 'admin',
					userID: _this.$store.state.transferEditID,
					isModifyDefaultPasswd: _this.info.isModifyDefaultPasswd,
					userPasswd: _this.info.isModifyDefaultPasswd ? md5.hex_md5(_this.info.npasswd) : md5.hex_md5("111111"),
					expiredTimeFlag: _this.info.pwdTime,
					isModifyPasswdFlag: _this.checked ? 1 : 0
				}, function(data) {
					if(data.errcode == 0) {
						_this.goBack();
						fxUtils.alert({txt: data.errinfo, type: 1});
					} else {
						fxUtils.alert({txt: data.errinfo});
					}
					// utils.weakTips(data.errinfo);
				});
			},
			sendDown(){
				this.encapsulationVerify(this.sendNow);
			},
			sendNow() {
				var modifyPwd = this.info.isModifyDefaultPasswd;
				var newPwd = this.info.npasswd;
				var pwdTime = _this.info.pwdTime;
				var only = _this.checked ? 1 : 0;
				_this.goBack();
				utils.review({
					uri: 'mx/userpasswd/modifyImmediately',
					yes: function(info) {
						utils.hints({
							txt: _this.pageTxt.tips.send,
							yes: function() {
								utils.post("mx/userpasswd/modifyImmediately", {
									cmdID: "600010",
									operator: 'admin',
									reviewer: info.name,
									reviewerPassword: info.pwd,
									reviewType: 1,
									userID: _this.$store.state.transferEditID,
									isModifyDefaultPasswd: modifyPwd,
									userPasswd: modifyPwd ? md5.hex_md5(newPwd) : md5.hex_md5("111111"),
									expiredTimeFlag: pwdTime,
									isModifyPasswdFlag: only
								},function(data) {
									if(data.errcode != '0') return fxUtils.alert({txt: data.errinfo});
									// utils.wheelReq(data);
									_this.$refs.loop.start(data);
								});
							}
						});
					}
				});
			},
			changeNewPassword() {
				if(this.info.isModifyDefaultPasswd == 0) {
					(this.info.npasswd = 111111), (this.info.again = 111111);
				} else {
					(this.info.npasswd = ""), (this.info.again = "");
				}
			}
		},
		props: {},
		created() {
			_this = this;
			this.pageTxt = lang().password;
			 this.info.id = this.$store.state.transferEditID;
			 this.$on('pwdTime', function(){
			 	utils.post({
			 		cmdID: "600017",
			 		url: 'mx/userpasswd/queryExpiredFlag',
			 		userID: _this.$store.state.transferEditID
			 	}, function(data){
			 		if(data.errcode!=0) return console.warn('600017',data.errinfo);
			 		_this.info.pwdTime = data.userpasswdExpiredFlag;
			 	});
			 });
		},
		watch: {
			checked(cur){
				if(cur==false){
					var info = this.info;
					info.isModifyDefaultPasswd = 0;
					info.npasswd = info.again = '';
				}
			}
		}
	};
</script>

<style scoped="scoped">
	.txt { font-size: 14px; line-height: 30px; height: 30px; }
	.psw{padding-top: 6px;}
	.userPass { width: 600px; margin: 0 auto; border: 1px solid #dcdfe6; }
	.rightBox>.el-radio { line-height: 30px; }
	.password ._panle { height: auto; }
	._messaga {padding: 40px 0 30px;min-height: auto;}
	.blueInput{width: 208px;}
	.password .el-input__suffix{display: inline-block;}
	.red{font-size: 14px;color: red;margin-right: 5px;vertical-align: sub;}
</style>