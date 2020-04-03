var obj = {
	tips: {
		ok: 'OK', now: 'Dispatch immediately', cancel: 'cancel', build: 'Create', back:'Back', refresh: 'refresh',
		modify: 'modify', edit: 'edit', submit: 'submit', contrast: 'Compare', close: 'Close',
		date: '选择日期时间', title: 'Prompt', rightClick: 'Right-click on file name and select menu "Save Link As ..." to save  file.',
		webUser: 'This modification affects the Internet node. Please dispatch the config of the WebUnode manually.',
		lock: '您当前没有操作权限！', yes: 'Yes', no: 'No', labelAll: 'All', arbitratily: 'Arbitratily', psel: 'Please select'
	},
	components: {
		placeholder: '输入关键字', not: 'No data', paging1: 'All', paging2: 'pieces of data displayed',
		reviewTitle: 'Review operation', reviewName: 'Review operator：', reviewPwd: 'Review password ：',
		isSubmit: 'Ready for immediate dispatch?', reviewSame: '复核员不能是登录用户!', reviewNull: '复核员或密码不能为空!',
		result: 'Result of dispatch',
	},
	searchBar: {
		userID: 'UserID：', userName: 'UserName：', placeholder: '', search: 'Query',
		ekeyName: 'Ekey name：', addSignal: 'Create communication relationship', businessType: '业务类型',
		advanced: 'Advanced search', advUser: 'Advanced search for user', advExp: 'Advanced search for extended info'
	},
	fnField: {
		addUser: 'Create user', delUser: 'Delete user', editPwd: 'Modify password', importInformation: 'Import O&M extended info', importInBop: 'Import BOP extended info',
		addEkey: 'Create Ekey', editEkey: 'Modify Ekey', exportEkey: '批量导出Ekey',
		addSignal: 'Create communication relationship', delSignal: 'Delete communication relationship', exportSignal: '批量导出通信关系',
		bigVer: 'Create big version', getCfg: 'Acquire China clear config', checkZd: 'Compare the latest version of China clear', newVer: 'Compare the latest version of client file',
		upload: 'File distribution', blacklist: 'CU blacklist', batchPwd: 'Batchly modify password'
	},
	tableTitle: {
		userID: 'UserID', userName: 'UserName', operation: 'Operate',
		ekeyName: 'Ekey name', ekeyDate: 'Ekey validity', ekeyInfo: 'Ekey description',
		userType: 'User type', inZone: '所属地区', group: '所在分组', speed: 'Max receive&send speed', encFlag: 'Encryption method', 
		beginTime: 'Soft encryption start time', endTime: 'Soft encryption end time', buildTime: 'Creation time'
	},
	tableDefined: {
		editUser: 'Modify Basic info', editEkey: 'Modify Ekey', addSignal: 'Create communication relationship', delEkey: 'Delete Ekey',
		delUser: '删除用户', delSignal: 'Delete communication relationship', back: 'Back', detail: 'Details',
		editExt: 'Modify extended info', delExt: 'Delete extended info', verback: 'Version rollback'
	},
	err: {
		lock: {
			lock: '是否锁定系统，系统锁定状态将禁用普通用户修改配置？', unlock: '是否解除系统锁定状态？',
			lockTxt: '提示：当前系统运维锁定状态，已禁止用户修改配置。'
		},
		user: {
			userID: '用户ID不能为空', userName: '用户名称不能为空', speedCtrl: '最大收发速度不能为空',
			maxRelationUser: '最大关系数不能为空', userPasswd: '密码不能为空', day: '开始时间要小于或等于结束时间',
			pwdRule: '密码必须包含大小写字母、数字、特殊字符(@#_-*)中的两项且大于等于8位', unlike: '两次输入的密码不一致',
			blank: '密码不能包含空格', npwd: '新密码不能为空', noidName: '密码不能包含用户ID、用户名称',
			errNum: '只能输入纯数字', idformat: '用户ID仅能输入英文，数字,“-”和“_”', maxUser: '最大关系数范围在0到1000',
			speed: '最大收发速度范围在-1到999999999999999999之间', maxTask: '单用户任务并发数要大于 0',
			oneTask: '单用户最大发送文件个数要大于 0', softDay: '软加密开始时间必须小于或等于软加密结束时间',
			special: '不能包含(@#_-*)以外的特殊字符', nameformat: '用户名称不能包含（|$%,";:/\\）',
			topicDay: '发布主题有效期天数要大于 0'
		},
		info: {
			operatorMobileNum: 'Enter only numbers and “|”, with “|” as separator', operatorEmail: 'Enter only English letters, digits, “-”, “_”, “@” and “.”',
			operatorTelNum: 'Enter only digits, “-”, “+” and “;”', emailFormat: '联系人邮箱格式不对', tell: '手机号不能以“|”结尾',
			operatorName: 'Enter characters with % excluded', ssccManager: 'Enter characters with % excluded', trim: '不能包含%，前后不能是空格',
			ssccManagerMobileNum: 'Enter only digits and “|”', ssccManagerTelNum: 'Enter only digits, “-”, “+” and “;”',
			operatorCompany: 'Enter characters with % excluded', department: 'Enter characters with % excluded' , operationFax: 'Enter only digits, “-”, “+” and “;”',
			userAlarmSmsNum: 'Enter only digits, “-”, “+” and “;”', operationPhoneNum: 'Enter only digits, “-”, “+” and “;”',
			email: 'Enter only English letters, digits, “-”, “_”, “@” and “.”', operatorDepartment: 'Enter characters with % excluded',
			optEmailFormat: '用户运维邮箱格式不对'
		},
		files: {
			fileNull: '文件名不能为空！', verNull: '版本号不能为空！', format: '仅能输入英文，数字,“-”,“_”和“.”',
			formatFile: '文件名仅能输入英文，数字,“-”,“_”和“.”', formatVer: '版本号仅能输入英文，数字,“-”,“_”和“.”',
			fileComment: '描述不能包含%'
		}
	},
	
	userHome: {
		info: 'Basic info', ekey: 'Ekey', signal:'Communication relationship', information:'extended info', 
		addUser: 'Create user', editUser: 'Modify user', del: 'Delete the user info now?', fileName: 'Extended info file name：',
		importTips: 'Input extended info file into server path：static/import；<br/>enter extended info file name in input box.',
		OPE: 'Import O&M extended info now?', BOP: 'Import BOP extended info now?', line: 'Line number', operatorName: 'Contact name', errinfo: 'Error description',
		fileErr: '文件名不能为空！', pwd: 'User password：', defPwd: 'Default', neverPwd: 'Never expired', setDate: 'Immediately expired：',
		reviewTxt: '是否要批量修改密码有效期！'
	},
	userInfo: {
		id: 'UserID：', name: 'UserName：', pwd: 'Password：', def: 'Default', hm:'Manual', type: 'User type：', inZone: 'InZone：', 
		group: 'GroupID：', speed: 'Max receive&send speed：', maxUser: 'Max relationship number：', hard: 'Hard encryption', soft: 'Soft encryption',
		online: 'Offline alarm：', encFlag: 'Encryption method：', beginTime: 'Soft encryption start time：', endTime: 'Soft encryption end time：', broadcast: 'Allow broadcast transmission：',
		connFlag: 'Allow connection flag：', switchMsg: 'Allow message exchange：', allowPublishTopicCount: 'Max number of published topics：', allowSubscribeTopicCount: 'Max number of subscribed topics：',
		maxPublishTopicDay: 'Days of validity for topics published ：', maxSimultTaskCount: 'Concurrent tasks per user：', maxCltOneDayTaskCount: 'Max sent file number per user：', 
		webFlag:'Internet identity flag：', isModifyDefaultPasswd: '新加用户修改默认密码标识：', userPasswd: '系统密码：', expiredTimeFlag: '密码有效期标识：',
		more: 'More', Kbit: '-1或0为不限速', indate: 'Password validity：', buildTime: 'Creation time：', errNum: '以下数据将设置成默认值：\n'
	},
	password: {
		id: 'UserID：', pwd: 'Modify user password：', new: 'New password：', again: '确认密码：', indate: 'Password validity ：',
		def: 'Default', hm: 'Manual', reset: 'Reset password：', not: 'Please select a record in the list!',
		options: [{label: 'Default', value: '1'},{label: 'Immediately expired', value: '0'},{label: 'Never expired', value: '-1'}],
		pwdErr: '新密码不能为空！', againErr: '确认密码不能为空！', same: '两次输入的密码不一致！',
	},
	Ekey: {
		userID: 'UserID：', ekeyName: 'Ekey name：', ekeyPwd: 'Ekey密码：', ekeyDate: 'Ekey validity：', 
		ekeyInfo:'Ekey description：', tips: '小于V5版用户必填', errID: '用户ID不能为空！', errName: 'Ekey名称不能为空！',
		delEkey: 'Delete Ekey now?', ekeyNameFormat: 'Ekey名称必须是字母或数字或下划线', ekeyCommentFormat: 'Ekey描述不能包含%'
	},
	relation: {
		addSignal: 'Create communication relationship', delSignal: 'Delete communication relationship', userID1: 'UserID：', userID2: 'Peer userID：',
		clear: 'Clear', errid1: '用户ID不能为空！', errid2: '对端用户不能为空！', errSignal: 'Select at least one communication relationship!', 
		errid3: '立即下发只能选择一条通信关系！', sureSignal: 'Delete communication relationship now?'
	},
	
	suConfig: {
		first: 'Global static config', second: 'Global dynamic config', 'static': 'Static config file：', dynamic: 'Dynamic config file：',
		only: 'Read only', edit: 'Edit', h2: 'Compare content：' , section:'Segment name', type:'Operation type', detail:'Details',
		field:'Field name' , oldValue:'Raw data' , modifyValue:'Modified data' , range:'Reasonable range' , 
		err: 'Exception prompt', sub: 'Submit now?', txtErr: '文件内容不可以包含%',
		full: '文件内容不可以包含%和全角字符'
	},
	dispatch: {
		options: [{label: 'System dynamic config', value: 1},{label: 'System static config', value: 2},
			{label: 'User password info table', value: 3}, {label: 'Internet config info', value: 4}],
		nodeName:'Node name', cuName:'Service name', errcode:'Result', errinfo:'Operation result description', type:'Operation type',
		setFile:'Config file：', hots1:'Dispatch host：', hots2:'Host list', res:'Dispatch result：',
		t1:'(System dynamic config file is：FxDynamic.ini,userinfo.db,userekey.db,usercomm.db,userinfoext.db)',
		t2:'(System static config file is：FxStatic.ini)', t3:'(User password info table file is ：userpasswd.db)',
		t4:'(Internet config info file is：userinfo.db,userinfoext.db,userpasswd.db)',
		section: 'Segment name', field: 'UserID', notype: 'Inconsistent type', detail: 'Details', noNode: '节点名不能为空'
	},
	audit: {
		operator:'Operator', reviewer:'Audit', operatorRole:'Operator role', operatorType:'Operation type',
		operatorTime:'Operation time',errorCode:'Operation result', errorInfo:'Operation result description', uuid:'流水号',
		sort: 'Sort order：', lately: 'Latest', early: 'Earliest', times: 'Period：', today: 'Today', week: 'Recent week',
		month: 'Recent month', begin: 'Start time', end: 'End time',
	},
	
	versionQuery: {
		options1: [{label: 'All', value: '0'},{label: 'System dynamic config', value: '1'},{label: 'System static config', value: '2'},
			{label: 'User password info table', value: '3'},{label: 'China clear config', value: '4'},{label: 'Rollback', value: '5'}],
		options2: [{label: 'All', value: '0'},{label: 'System dynamic config', value: '1'},{label: 'System static config', value: '2'},
			{label: 'User password info table', value: '3'},{label: 'Rollback', value: '5'}],
		type:'Version type', version:'Version number', versionPath:'Version path', operationTime: 'Operation time', 
		operator: 'Operator', reviewer: 'Auditor', operationType:'Dispatch type', checkVer: '比对最新版本MD5',
		rollback1: 'Rollback to this version?', bigVer: 'Create big version now?', ZdCfg: 'Acquire China clear config?',
		rollback2: '<p>Rollback to this version?</p><p style="color:#F00;">回滚该版本成功后，请回滚密码相关配置文件</p>',
		equal0: '一致', equal1: '不一致', equal2: '文件不存在', operationType1: 'Full distribution' , operationType2: 'Incremental dispatch',
		operationType3: 'cu上传' , type1: 'System dynamic config', type2: 'System static config', type3: 'User password info table', type4: 'China clear config',
		type5: 'Rollback_System dynamic config', type6: 'Rollback_System static config', type7: 'Rollback_User password info table', type8: 'Rollback_China clear config', 
		isEqual: 'Consistency check'
	},
	versionDetail: {
		title: 'Version details', type: 'Version type', fileName: 'File name' , cfgInfo: '文件内容',
		fileSize: 'File size(bytes)', fileMd5: 'File MD5', fileTime: 'China clear config time',
		ctplst: 'ctplst', zdrela: 'zdrela',
	},
	versionContrast: {
		options1: [{label: 'Global dynamic config', value: 1},{label: 'Global static config', value: 2},{label: 'User password info table', value: 3},
			{label: 'China clear config CTPLST', value: 4},{label: 'China clear config ZDRela', value: 5}],
		options2: [{label: 'Global dynamic config', value: 1},{label: 'Global static config', value: 2},{label: 'User password info table', value: 3}],
		type:'Operation type', ver1: 'Benchmark version：', ver2: 'Comparison version：', btn: 'Compare', temp: 'Temporary version', online: 'Online version',
		section: 'Segment name', field: 'Field name', detail: 'Details', res: 'No change in comparison results'
	},
	
	files: {
		search: {
			version: 'Version number', fileName: 'File name', fileComment: 'Description', size: 'File size(bytes)', md5:'File MD5' ,time: 'Pub date', 
			operater: 'Operator', reviewer: 'Auditor', del: 'Delete', delRes: 'Delete result：', sendRes: 'Result of dispatch：'
		},
		upload: {
			version: 'Version number：', fileName: 'Client file name：', fileComment: 'Description：', dispense: 'Dispatch', res: 'Result of dispatch：',
			path: 'Please upload file on service config system server path：static/import/clientfile', title: 'File distribution'
		},
		regain: {
			version: 'Version number', fileName: 'Client file name', fileComment: 'Description', recoverType: 'Restore type', detail: 'Details', 
			cuLists: 'Service name', cuName: 'cuName', compare: 'Compare', restore: 'Recovery', typeStr0: 'Dispatch', typeStr1: 'Delete'
		},
		blacklist: {
			nodeName: 'Node name', cuName: 'CU name', white: 'Whitelist', black: 'Blacklist', cuList: 'Host list：',
			blackBtn: 'Set up a blacklist', cuType: 'Node status', title: 'CU blacklist', cuSet: 'Set up an auto comparison of blacklist for fxclient file?'
		}
	},
	
	advanced: {
		user: {
			userID: 'UserID：', userName: 'UserName：', userType: 'User type：', inZone: 'InZone：', linkGroupName: 'GroupID：',
			soft: 'Soft encryption', hard: 'Hard encryption', expcsv: 'Export basic info', fileName: 'File name：', title: '用户高级搜索',
			encSelect: [{id: 0, name: 'All'},{id: 1, name: 'Hard encryption'},{id: 2, name: 'Soft encryption'}]
		},
		Ekey: {
			ekeyName: 'Ekey name：', expcsv: 'Export Ekey', title: 'Ekey advanced search'
		},
		signal: {
			expcsv: 'Export communication relationship', title: '通信关系高级搜索'
		},
		information: {
			listType: [{label: 'All', val: 'all'},{label: 'O&M table', val: 'OPE'},{label: 'BOP table', val: 'BOP'}],
			listName: 'Query table：', company: 'Company name', ssccManager: 'SSCC manager', department: 'Department',
			expcsv: 'Export O&M table', expBOP: '导出BOP表', resOPE: 'O&M table query result：', resBOP: 'BOP table query result：',
			operatorName: 'Contact name', mobileNum: 'cell phone number', operatorEmail: 'e-mail', telNum: 'landline number', 
			addOPE: 'Add extended info', editOPE: 'Modify extended info', del: 'Delete extended information or not？',
			nameNull: '联系人姓名不能为空', mobileNull: '联系人手机号不能为空', title: 'Advanced search for extended info',
			ssccManagerTelNum: 'Customer landline number', ssccManagerMobileNum: 'Customer cell phone',
			operatorCompany: 'Company name', operatorDepartment: 'Department', email: 'e-mail', useEmail: 'Contact e-mail',
			userAlarmSmsNum: 'SMS alarm number', operationPhoneNum: 'O&M phone number', operationFax: 'O&M fax number',
			om_email: '用户运维邮箱'
		},
		audit: {
			expcsv: 'Export audit', title: 'Audit advanced search', commFlag: '通信关系', userextFlag: 'extended info'
		}
	},
	order: {
		manage:{
			xiaozhan: '小站指令', ekeyOrder: 'Ekey指令', signalOrder: '关系对指令', pwdOrder: '密码指令',
			date: '统计时间：', today: 'Today', week: 'Recent week', month: 'Recent month', recvBeginTime: '指定时间段',
			recvEndTime: '至', acceptLabel: '执行状态：', feedbackLabel: '反馈状态：', 
			acceptState: ['All','未处理','已拒绝','失败','成功'], feedbackState: ['All','未反馈','反馈失败','反馈成功'],
			batchAccept: '批量执行', batchFeedback: '批量反馈', edit: 'Edit', reject: '拒绝',
			oneData: '至少选择一条数据！', submit: '是否确定要提交', rej: '是否拒绝这条指令？',
			reportBtn: '上报BOP', reportTxt: '是否上报BOP稽核信息',
			remarks: '备注不能为空，且不能包含（%）',
		},
		xiaozhan: {
			bizKey: '业务ID', userID: 'UserID', userName: 'UserName', operationType: '操作类别',
			recvTime: '接收时间', exeState: '执行状态', feedbackState: '反馈状态', remarks: '备注',
			legal: '合法性', legalInfo: '合法详情', legal0: '合法', legal1: '不合法',
			'type-1': '下线', type0: '修改', type1: '上线',
			exe1: '未处理', exe2: '已拒绝', exe3: '失败', exe4: '成功',
			fb1: '未反馈', fb2: '反馈失败', fb3: '反馈成功'
		},
		ekeyOrder: {
			ekeyName: 'Ekey name', ekeyValidDate: 'Ekey validity', comment: 'Ekey description',
			userName: 'UserName：', ekeyPasswd: '修改ekey密码：', 'type-1': '下线',
			type1: '上线', editEkey: '编辑Ekey指令'
		},
		signalOrder: {
			expectExeTime: '客户期望执行时间', title: '修改通信关系', bizType: '业务类型：',
			toUserID: 'Peer user ID：', toUserName: '对端用户名称：', bizType2: '业务类型',
			type0: '上线', type1: '下线'
		},
		pwdOrder: {
			batch1: '业务ID标红的指令不可批量执行！', batch2: '业务ID标红的指令不可批量反馈！',
			title: 'Modify password'
		},
		editBiz: {
			title: '编辑小站指令', bizKey: '业务ID：', remark: '备注：'
		}
	}
};
module.exports = {fbcsFile: obj};
