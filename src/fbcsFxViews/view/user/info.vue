<template>
	<div class="info">
		<ul class="form">
			<li>
				<div class="label">
					<i class="red">*</i>
					{{$t('fbcsFile.userInfo.id')}}
				</div>
				<div class="right">
					<input v-model="info.userID" :disabled="isAdd!='add'" maxlength="32"/>
				</div>
			</li><li>
				<div class="label">
					<i class="red">*</i>
					{{$t('fbcsFile.userInfo.name')}}
				</div>
				<div class="right">
					<input v-model="info.userName"  maxlength="64"/>
				</div>
			</li><li v-if="isAdd=='add'">
				<div class="label" style="vertical-align: top;">
					<i class="red">*</i>
					{{$t('fbcsFile.userInfo.pwd')}}
				</div>
				<div class="right"><!--密码-->
					<el-radio-group v-model="info.isModifyDefaultPasswd" @change="defPwd" class="radio">
						<el-radio :label="0">{{$t('fbcsFile.userInfo.def')}}</el-radio>
						<el-radio :label="1">{{$t('fbcsFile.userInfo.hm')}}</el-radio>
					</el-radio-group>
					<input v-model="info.userPasswd" :disabled="!info.isModifyDefaultPasswd" maxlength="18"/>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.type')}}</div>
				<div class="right">
					<el-select v-model="info.userType">
						<el-option v-for="item in userType" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.inZone')}}</div>
				<div class="right">
					<el-select v-model="info.inZone">
						<el-option v-for="item in inZone" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.group')}}</div>
				<div class="right">
					<el-select v-model="info.linkGroupName">
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
					<input v-model="info.speedCtrl" data-k="speedCtrl" @input="onlyNum_1($event)" maxlength="18"/>
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
					<input v-model="info.maxRelationUser" data-k="maxRelationUser" @input="onlyNum($event)" maxlength="18"/>
				</div>
			</li><li>
				<div class="label" style="vertical-align: top;">{{$t('fbcsFile.userInfo.encFlag')}}</div>
				<div class="right"><!--加密方式-->
					<el-radio-group v-model="info.encFlag" class="radio">
						<el-radio :label="1">{{$t('fbcsFile.userInfo.hard')}}</el-radio>
						<el-radio :label="2">{{$t('fbcsFile.userInfo.soft')}}</el-radio>
					</el-radio-group>
				</div>
			</li><li v-if="info.encFlag==1">
				<div class="label">{{$t('fbcsFile.userInfo.beginTime')}}</div>
				<div class="right">
					<el-date-picker v-model="info.beginSoftEncTime" class="picker" type="datetime" :clearable="false" :editable="false"
						 :placeholder="$t('fbcsFile.tips.date')" value-format="timestamp" default-time="00:00:00">
					</el-date-picker>
					<!--:picker-options="pickerBegin"-->
				</div>
			</li><li v-if="info.encFlag==1">
				<div class="label">{{$t('fbcsFile.userInfo.endTime')}}</div>
				<div class="right">
					<el-date-picker v-model="info.endSoftEncTime" class="picker" type="datetime" :clearable="false" :editable="false"
						 :placeholder="$t('fbcsFile.tips.date')" value-format="timestamp" default-time="00:00:00">
					</el-date-picker>
					<!--:picker-options="pickerEnd"-->
				</div>
			</li>
		</ul>
		
		<div class="more">
			<el-checkbox v-model="more" :label="$t('fbcsFile.userInfo.more')" border></el-checkbox>
		</div>
		
		<ul v-if="more" class="form">
			<li>
				<div class="label">{{$t('fbcsFile.userInfo.online')}}</div>
				<div class="right">
					<el-select v-model="info.notOnlineAlarm">
						<el-option v-for="item in blo" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.broadcast')}}</div>
				<div class="right">
					<el-select v-model="info.allowBroadcast">
						<el-option v-for="item in blo" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.connFlag')}}</div>
				<div class="right">
					<el-select v-model="info.allowConnFlag">
						<el-option v-for="item in blo" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.switchMsg')}}</div>
				<div class="right">
					<el-select v-model="info.allowSwitchMsg">
						<el-option v-for="item in blo" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.publishTopicCount')}}</div>
				<div class="right">
					<input v-model="info.allowPublishTopicCount" data-k="allowPublishTopicCount" @input="onlyNum($event)" maxlength="9"/>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.subscribeTopicCount')}}</div>
				<div class="right">
					<input v-model="info.allowSubscribeTopicCount" data-k="allowSubscribeTopicCount" @input="onlyNum($event)" maxlength="9"/>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.maxPublishTopicDay')}}</div>
				<div class="right">
					<input v-model="info.maxPublishTopicDay" data-k="maxPublishTopicDay" @input="onlyNum($event)" maxlength="9"/>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.maxSimultTaskCount')}}</div>
				<div class="right">
					<input v-model="info.maxSimultTaskCount" data-k="maxSimultTaskCount" @input="onlyNum($event)" maxlength="9"/>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.maxCltOneDayTaskCount')}}</div>
				<div class="right">
					<input v-model="info.maxCltOneDayTaskCount" data-k="maxCltOneDayTaskCount" @input="onlyNum($event)" maxlength="9"/>
				</div>
			</li><li>
				<div class="label">{{$t('fbcsFile.userInfo.webFlag')}}</div>
				<div class="right">
					<el-select v-model="info.webUserFlag">
						<el-option v-for="item in blo" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</li><li v-if="isAdd=='add'">
				<div class="label">{{$t('fbcsFile.userInfo.indate')}}</div>
				<div class="right">
					<el-select v-model="info.expiredTimeFlag">
						<el-option v-for="item in indate" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</li><li v-if="isAdd!='add'">
				<div class="label">{{$t('fbcsFile.userInfo.buildTime')}}</div>
				<div class="right">
					<input v-model="buildTime" disabled/>
				</div>
			</li>
		</ul>
		<ul class="btnBox">
			<li>
				<div class="label">&nbsp;</div>
				<div class="right">
					<button @click="now" class="blueBtn">{{$t('fbcsFile.tips.now')}}</button>
					<button @click="submit" class="blueBtn">{{$t('fbcsFile.tips.ok')}}</button>
					<button @click="back" class="defBtn">{{$t('fbcsFile.tips.back')}}</button>
				</div>
			</li>
		</ul>
		<lgy-review :show.sync='showReview' :reqsv='reqsv' @submit='review' :txt='reviewTxt'></lgy-review>
		<lgy-wheelReq :parameter.sync="parameter"></lgy-wheelReq>
	</div>
</template>

<script>
	module.exports = require('./info.js');
</script>

<style scoped="scoped">
.info{min-width: 500px;}
.form{white-space: nowrap;}
.form li{margin-bottom: 10px;}
.label{display: inline-block;width: 160px;font-size: 14px;color: #666;text-align: right;vertical-align: middle;}
.right{display: inline-block;margin-left: 10px;vertical-align: middle;}
.radio{display: block;margin-bottom: 10px;}
.more{margin-left: 160px;padding: 10px;}
.btnBox button{margin-right: 10px;margin-top: 20px;}
.small{font-size: 12px;margin-left: 10px;color: #999;vertical-align: middle;}
</style>