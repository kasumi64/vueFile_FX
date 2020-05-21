<template>
	<div class="info">
		<ul class="form">
			<li>
				<div class="label">
					<i class="red">*</i>
					{{$t('fbcsFile.userInfo.id')}}
				</div>
				<div class="right">
					<input v-model="info.userID" id="basic-id" :disabled="isAdd!='add'" maxlength="31" autocomplete="off"/>
				</div>
			</li><li>
				<div class="label">
					<i class="red">*</i>
					{{$t('fbcsFile.userInfo.name')}}
				</div>
				<div class="right">
					<input v-model="info.userName" id="basic-name" maxlength="127" autocomplete="off"/>
				</div>
			</li><li v-if="isAdd=='add'">
				<div class="label" style="vertical-align: top;">
					<i class="red">*</i>
					{{$t('fbcsFile.userInfo.pwd')}}
				</div>
				<div class="right"><!--密码-->
					<el-radio-group v-model="info.isModifyDefaultPasswd" id="basic-isDefPwd" @change="defPwd" class="radio">
						<el-radio :label="0">{{$t('fbcsFile.userInfo.def')}}</el-radio>
						<el-radio :label="1">{{$t('fbcsFile.userInfo.hm')}}</el-radio>
					</el-radio-group>
					<input v-model="info.userPasswd" :disabled="!info.isModifyDefaultPasswd" maxlength="18" autocomplete="off"/>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.type')}}</div>
				<div class="right">
					<el-select v-model="info.userType" id="basic-userType">
						<el-option v-for="item in userType" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.inZone')}}</div>
				<div class="right">
					<el-select v-model="info.inZone" id="basic-inZone">
						<el-option v-for="item in inZone" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.group')}}</div>
				<div class="right">
					<el-select v-model="info.linkGroupName" id="basic-group">
						<el-option v-for="item in group" :key="item.groupID" :label="item.groupID" :value="item.groupID">
						</el-option>
					</el-select>
				</div>
			</li><li>
				<div class="label">
					<i class="red">*</i>
					{{$t('fbcsFile.userInfo.speed')}}
				</div>
				<div class="right">
					<input v-model="info.speedCtrl" id="basic-speed" data-k="speedCtrl" @input="onlyNum_1($event)" maxlength="18" autocomplete="off"/>
					<span class="small">Kbit/s({{$t('fbcsFile.userInfo.Kbit')}})</span>
					<!--
						oninput="if(value.length>5)value=value.slice(0,5)"
						return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )
					-->
				</div>
			</li><li>
				<div class="label">
					<i class="red">*</i>
					{{$t('fbcsFile.userInfo.maxUser')}}
				</div>
				<div class="right">
					<input v-model="info.maxRelationUser" id="basic-comm" data-k="maxRelationUser" @input="onlyNum($event)" maxlength="9" autocomplete="off"/>
				</div>
			</li><li>
				<div class="label" style="vertical-align: top;">{{$t('fbcsFile.userInfo.encFlag')}}</div>
				<div class="right"><!--加密方式-->
					<el-radio-group v-model="info.encFlag" id="basic-encFlag" class="radio">
						<el-radio :label="1">{{$t('fbcsFile.userInfo.hard')}}</el-radio>
						<el-radio :label="2">{{$t('fbcsFile.userInfo.soft')}}</el-radio>
					</el-radio-group>
				</div>
			</li><li v-if="info.encFlag==1">
				<div class="label">{{$t('fbcsFile.userInfo.beginTime')}}</div>
				<div class="right">
					<el-date-picker id="basic-begin" v-model="info.beginSoftEncTime" class="picker" type="datetime" :clearable="true" :editable="false"
						 :placeholder="$t('fbcsFile.tips.date')" value-format="timestamp" default-time="00:00:00">
					</el-date-picker>
					<!--:picker-options="pickerBegin"-->
				</div>
			</li><li v-if="info.encFlag==1">
				<div class="label">{{$t('fbcsFile.userInfo.endTime')}}</div>
				<div class="right">
					<el-date-picker id="basic-end" v-model="info.endSoftEncTime" class="picker" type="datetime" :clearable="true" :editable="false"
						 :placeholder="$t('fbcsFile.tips.date')" value-format="timestamp" default-time="23:59:59">
					</el-date-picker>
					<!--:picker-options="pickerEnd"-->
				</div>
			</li>
		</ul>
		
		<div class="more">
			<el-checkbox v-model="more" id="moreBtn" :label="$t('fbcsFile.userInfo.more')" border></el-checkbox>
		</div>
		
		<ul v-if="more" class="form">
			<li>
				<div class="label">{{$t('fbcsFile.userInfo.online')}}</div>
				<div class="right">
					<el-select v-model="info.notOnlineAlarm" id="basic-online">
						<el-option v-for="item in blo" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.broadcast')}}</div>
				<div class="right">
					<el-select v-model="info.allowBroadcast" id="basic-broadcast">
						<el-option v-for="item in blo" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.connFlag')}}</div>
				<div class="right">
					<el-select v-model="info.allowConnFlag" id="basic-conn">
						<el-option v-for="item in blo" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.switchMsg')}}</div>
				<div class="right">
					<el-select v-model="info.allowSwitchMsg" id="basic-switchMsg">
						<el-option v-for="item in blo" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.allowPublishTopicCount')}}</div>
				<div class="right">
					<input v-model="info.allowPublishTopicCount" id="basic-publishTopic" data-k="allowPublishTopicCount" @input="onlyNum($event)" maxlength="4" autocomplete="off"/>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.allowSubscribeTopicCount')}}</div>
				<div class="right">
					<input v-model="info.allowSubscribeTopicCount" id="basic-subscribeTopic" data-k="allowSubscribeTopicCount" @input="onlyNum($event)" maxlength="4" autocomplete="off"/>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.maxPublishTopicDay')}}</div>
				<div class="right">
					<input v-model="info.maxPublishTopicDay" id="basic-topicDay" data-k="maxPublishTopicDay" @input="onlyNum($event)" maxlength="4" autocomplete="off"/>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.maxSimultTaskCount')}}</div>
				<div class="right">
					<input v-model="info.maxSimultTaskCount" id="basic-maxTask" data-k="maxSimultTaskCount" @input="onlyNum($event)" maxlength="9" autocomplete="off"/>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.maxCltOneDayTaskCount')}}</div>
				<div class="right">
					<input v-model="info.maxCltOneDayTaskCount" id="basic-dayTask" data-k="maxCltOneDayTaskCount" @input="onlyNum($event)" maxlength="9" autocomplete="off"/>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.webFlag')}}</div>
				<div class="right">
					<el-select v-model="info.webUserFlag" id="basic-webFlag">
						<el-option v-for="item in blo" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</li><li v-if="isAdd=='add'">
				<div class="label">{{$t('fbcsFile.userInfo.indate')}}</div>
				<div class="right">
					<el-select v-model="info.expiredTimeFlag" id="basic-expiredTime">
						<el-option v-for="item in indate" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</li><li v-if="isAdd!='add'">
				<div class="label">{{$t('fbcsFile.userInfo.buildTime')}}</div>
				<div class="right">
					<input v-model="buildTime" id="basic-buildTime" disabled autocomplete="off"/>
				</div>
			</li>
		</ul>
		<ul class="btnBox">
			<li>
				<div class="label">&nbsp;</div>
				<div class="right">
					<button v-if="fxAuth" @click="now" id="basic-now" class="blueBtn">{{$t('fbcsFile.tips.now')}}</button>
					<button v-if="fxAuth" @click="submit" id="basic-submit" class="blueBtn">{{$t('fbcsFile.tips.ok')}}</button>
					<button @click="back" class="defBtn" id="basic-close">{{$t('fbcsFile.tips.back')}}</button>
				</div>
			</li>
		</ul>
		<lgy-review id="basic" :show.sync='showReview' :reqsv='reqsv' @submit='review' :txt='reviewTxt'></lgy-review>
		<!-- <lgy-wheelReq id="basic" :parameter.sync="parameter" @finish="finish"></lgy-wheelReq> -->
	</div>
</template>

<script>
	module.exports = require('./info.js');
</script>

<style scoped="scoped">
.info{min-width: 500px;}
.form{white-space: nowrap;}
.form li{margin-bottom: 10px;}
.label{display: inline-block;width: 260px;font-size: 14px;color: #666;text-align: right;vertical-align: middle;}
.right{display: inline-block;margin-left: 10px;vertical-align: middle;}
.radio{display: block;margin-bottom: 10px;}
.more{margin-left: 260px;padding: 10px;}
.btnBox button{margin-right: 10px;margin-top: 20px;}
.small{font-size: 12px;margin-left: 10px;color: #999;vertical-align: middle;}
</style>
