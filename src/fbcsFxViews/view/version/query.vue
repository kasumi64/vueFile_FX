<template>
	<div class="versionQuery">
		<div class="searchBar">
			<label class="label">{{$t('fbcsFile.versionQuery.type')}}：</label>
			<el-select v-model="info.type" id="type" class="sel">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<p class="jg"></p>
			<label class="label">{{$t('fbcsFile.audit.times')}}</label>
			<el-radio-group v-model="radio" id="radio">
				<el-radio :label="2">{{$t('fbcsFile.audit.today')}}</el-radio>
				<el-radio :label="4">{{$t('fbcsFile.audit.week')}}</el-radio>
				<el-radio :label="6">{{$t('fbcsFile.audit.month')}}</el-radio>
				<el-radio :label="9">{{$t('fbcsFile.audit.begin')}}</el-radio>
			</el-radio-group>
			<!--<label class="label">{{$t('fbcsFile.audit.begin')}}</label>-->
			<el-date-picker id="begin" v-model="info.beginTime" class="picker words ml" type="datetime" :clearable="false" :editable="false"
				:placeholder="$t('fbcsFile.tips.date')" value-format="timestamp" default-time="00:00:00" :disabled='radio!=9'>
			</el-date-picker>
			<label class="label">{{$t('fbcsFile.audit.end')}}</label>
			<el-date-picker id="end" v-model="info.endTime" class="picker words" type="datetime" :clearable="false" :editable="false"
				:placeholder="$t('fbcsFile.tips.date')" value-format="timestamp" default-time="23:59:59" :disabled='radio!=9'>
			</el-date-picker>
			<button class="blueBtn mr" @click="search" id="search">{{$t('fbcsFile.searchBar.search')}}</button>
		</div>
		
		<ul class="fnField">
			<li @click="bigVer" id="bigVer" v-if="fxAuth">
				<img class="icon" src="@/fbcsFxViews/img/FnIcon/bigVer.png"/>
				<span class="label">{{$t('fbcsFile.fnField.bigVer')}}</span>
			</li><li @click="getCfg" id="getCfg" v-if="fxAuth&&(zdEnabled == 1)">
				<img class="icon" src="@/fbcsFxViews/img/FnIcon/getzdConfig.png"/>
				<span class="label">{{$t('fbcsFile.fnField.getCfg')}}</span>
			</li><li @click="checkVer(0)" id="contrast">
				<img class="icon" src="@/fbcsFxViews/img/FnIcon/zdConfig.png"/>
				<span class="label">{{$t('fbcsFile.fnField.checkZd')}}</span>
			</li>
			<!--<li @click="checkVer(1)">
				<img class="icon" src="@/fbcsFxViews/img/FnIcon/editPwd.png"/>
				<span class="label">{{$t('fbcsFile.fnField.newVer')}}</span>
			</li>-->
		</ul>
		
		<lgy-table :list="list" :title="title" :defined="defined" :total="total" :currentPage="page" @changePage="changePage" >
		</lgy-table>
		
		<el-dialog ref="zdBox" :visible.sync="checkDialog" :title="$t('fbcsFile.fnField.checkZd')" v-dialogDrag
			:close-on-click-modal='false' :show-close="false">
			<div class="_dialog">
				<el-table id="ZD" :data="checkList" :row-class-name="rowClass" max-height="294" border>
					<el-table-column type="index" width="50" label=" "></el-table-column>
					<!--<el-table-column prop="type" :label="$t('fbcsFile.versionDetail.type')"></el-table-column>-->
					<el-table-column prop="version" :label="$t('fbcsFile.versionQuery.version')"></el-table-column>
					<el-table-column prop="fileName" :label="$t('fbcsFile.versionDetail.fileName')"></el-table-column>
					<el-table-column :label="$t('fbcsFile.versionQuery.isEqual')">
						<span slot-scope="scope" :class="{redTxt: scope.row.isEqual!=0}">{{scope.row.equalMask}}</span>
					</el-table-column>
				</el-table>
			</div>
			<div slot="footer" class="_footBtn">
				<button class="defBtn" @click="checkDialog=false" id="zd-close">{{$t('fbcsFile.tips.close')}}</button>
			</div>
		</el-dialog>
		
		<el-dialog ref="detailBox" :visible.sync="showDialog" :title="$t('fbcsFile.versionDetail.title')" v-dialogDrag
			:close-on-click-modal='false' :show-close="false">
			<div class="_dialog">
				<el-table id="detail" :data="detailList" :row-class-name="rowClass" max-height="294" border>
					<el-table-column type="index" width="50" label=" "></el-table-column>
					<!--<el-table-column prop="type" :label="$t('fbcsFile.versionDetail.type')"></el-table-column>-->
					<el-table-column prop="fileName" :label="$t('fbcsFile.versionDetail.fileName')"></el-table-column>
					<el-table-column prop="fileSize" :label="$t('fbcsFile.versionDetail.fileSize')"></el-table-column>
					<!--<el-table-column prop="fileMd5" :label="$t('fbcsFile.versionDetail.fileMd5')"></el-table-column>-->
				</el-table>
			</div>
			<div slot="footer" class="_footBtn">
				<button class="defBtn" @click="showDialog=false" id="detail-close">{{$t('fbcsFile.tips.close')}}</button>
			</div>
		</el-dialog>
		
		<el-dialog :visible.sync="showPwdinfo" :title="$t('fbcsFile.tips.title')" v-dialogDrag  width="800px"
			:close-on-click-modal='false' :show-close="false">
			<div class="_dialog">
				<lgy-table id="rollback" :list="signalList" :title="signalTitle" :total="signalTotal" :currentPage="signalPage" 
					@changePage="signalChange"  max-height="394" :width="width">
				</lgy-table>
			</div>
			<div slot="footer" class="_footBtn">
				<button class="blueBtn" @click="send" id="rollback-send">{{$t('fbcsFile.tips.ok')}}</button>
				<button class="defBtn" @click="showPwdinfo=false" id="rollback-close">{{$t('fbcsFile.tips.cancel')}}</button>
			</div>
		</el-dialog>
		
		<lgy-review :show.sync='showReview' :reqsv='reqsv' @submit='submit' :txt='reviewTxt'></lgy-review>
		<lgy-wheelReq ref="loop" :parameter="parameter"></lgy-wheelReq>
	</div>
</template>

<script>
	module.exports = require('./query.js');
</script>

<style scoped="scoped">
	.versionQuery{min-width: 1084px;}
	.sel{width: 200px;}
	.jg{margin-top: 10px;}
	.el-radio+.el-radio{margin-left: 10px;}
	.ml{margin-left: 10px;}
	.mr{margin-right: 20px;}
	.redTxt{color: #FF7A7D;}
</style>
