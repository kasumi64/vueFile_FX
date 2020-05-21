var obj = {
	tips: {
		ok: '确定', now: '立即下发', cancel: '取消', build: '创建', back:'返回', refresh: '刷新',
		modify: '修改', edit: '编辑', submit: '提交', contrast: '对比', close: '关闭',
		date: '选择日期时间', title: '提示', rightClick: '请在文件名上点击右键，选择“链接另存为...”菜单保存文件。',
		webUser: '此次修改影响到互联网节点，请手动下发互联网节点配置信息',
		lock: '您当前没有操作权限！', yes: '是', no: '否', labelAll: '全部', arbitratily: '任意', psel: '请选择'
	},
	components: {
		placeholder: '输入关键字', not: '暂无数据', paging1: '已显示全部', paging2: '条数据',
		reviewTitle: '复核操作', reviewName: '复核操作员：', reviewPwd: '复核员密码：',
		isSubmit: '是否要立即下发！', reviewSame: '复核员不能是登录用户!', reviewNull: '复核员或密码不能为空!',
		result: '下发结果',
	},
	searchBar: {
		userID: '用户ID：', userName: '用户名称：', placeholder: '', search: '查询',
		ekeyName: 'Ekey名称：', addSignal: '创建通信关系', businessType: '业务类型',
		advanced: '高级搜索', advUser: '用户高级搜索', advExp: '扩展信息高级搜索'
	},
	fnField: {
		addUser: '创建用户', delUser: '删除用户', editPwd: '修改密码', importInformation: '导入运维扩展信息', importInBop: '导入BOP扩展信息',
		addEkey: '创建Ekey', editEkey: '修改Ekey', exportEkey: '批量导出Ekey',
		addSignal: '创建通信关系', delSignal: '删除通信关系', exportSignal: '批量导出通信关系',
		bigVer: '生成大版本', getCfg: '获取中登配置', checkZd: '比对中枢配置最新版本', newVer: '比对客户端文件最新版本',
		upload: '文件下发', blacklist: 'CU黑名单', batchPwd: '批量修改密码有效期'
	},
	tableTitle: {
		userID: '用户ID', userName: '用户名称', operation: '操作',
		ekeyName: 'Ekey名称', ekeyDate: 'Ekey有效期', ekeyInfo: 'Ekey描述',
		userType: '用户类型', inZone: '所属地区', group: '所在分组', speed: '最大收发速度', encFlag: '加密方式', 
		beginTime: '软加密开始时间', endTime: '软加密结束时间', buildTime: '创建时间'
	},
	tableDefined: {
		editUser: '修改基本信息', editEkey: '修改Ekey', addSignal: '创建通信关系', delEkey: '删除Ekey',
		delUser: '删除用户', delSignal: '删除通信关系', back: '回退', detail: '详情',
		editExt: '修改扩展信息', delExt: '删除扩展信息', verback: '版本回滚',
		restore: '设为有效'
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
			operatorMobileNum: '仅能输入数字、“|”，用“|”做分隔符', operatorEmail: '仅能输入英文，数字,“-”,“_”,“@”和“.”',
			operatorTelNum: '仅能输入数字,“-”,“+”,和“;”', emailFormat: '联系人邮箱格式不对', tell: '手机号不能以“|”结尾',
			operatorName: '输入字符不能包含%', ssccManager: '输入字符不能包含%', trim: '不能包含%，前后不能是空格',
			ssccManagerMobileNum: '仅能输入数字、“|”', ssccManagerTelNum: '仅能输入数字,“-”,“+”,和“;”',
			operatorCompany: '输入字符不能包含%', department: '输入字符不能包含%' , operationFax: '仅能输入数字,“-”,“+”,和“;”',
			userAlarmSmsNum: '仅能输入数字,“-”,“+”,和“;”', operationPhoneNum: '仅能输入数字,“-”,“+”,和“;”',
			email: '仅能输入英文，数字,“-”,“_”,“@”和“.”', operatorDepartment: '输入字符不能包含%',
			optEmailFormat: '用户运维邮箱格式不对'
		},
		files: {
			fileNull: '文件名不能为空！', verNull: '版本号不能为空！', format: '仅能输入英文，数字,“-”,“_”和“.”',
			formatFile: '文件名仅能输入英文，数字,“-”,“_”和“.”', formatVer: '版本号仅能输入英文，数字,“-”,“_”和“.”',
			fileComment: '描述不能包含%'
		}
	},
	
	userHome: {
		info: '基本信息', ekey: 'Ekey', signal:'通信关系', information:'扩展信息', 
		addUser: '创建用户', editUser: '修改用户', del: '是否删除该用户信息！', fileName: '扩展信息文件名：',
		importTips: '请将扩展信息文件放到服务器路径：static/import；<br/>在输入框中填入扩展信息文件名。',
		OPE: '是否导入运维扩展信息？', BOP: '是否导入BOP扩展信息？', line: '行数', operatorName: '联系人姓名', errinfo: '错误描述',
		fileErr: '文件名不能为空！', pwd: '用户密码：', defPwd: '默认', neverPwd: '永不过期', setDate: '有效期：',
		reviewTxt: '是否要批量修改密码有效期！'
	},
	userInfo: {
		id: '用户ID：', name: '用户名称：', pwd: '密码：', def: '默认', hm:'手动', type: '用户类型：', inZone: '所属地区：', 
		group: '所在组：', speed: '最大收发速度：', maxUser: '最大关系数：', hard: '硬加密', soft: '软加密',
		online: '不在线报警：', encFlag: '加密方式：', beginTime: '软加密开始时间：', endTime: '软加密结束时间：', broadcast: '是否允许广播发送：',
		connFlag: '允许连接标志：', switchMsg: '允许消息交换：', allowPublishTopicCount: '发布主题个数上限：', allowSubscribeTopicCount: '订阅主题个数上限：',
		maxPublishTopicDay: '发布主题有效期天数：', maxSimultTaskCount: '单用户任务并发数：', maxCltOneDayTaskCount: '单用户最大发送文件个数：', 
		webFlag:'单用户互联网标识：', isModifyDefaultPasswd: '新加用户修改默认密码标识：', userPasswd: '系统密码：', expiredTimeFlag: '密码有效期标识：',
		more: '展开更多设置', Kbit: '-1或0为不限速', indate: '密码有效期：', buildTime: '创建时间：', errNum: '以下数据将设置成默认值：\n'
	},
	password: {
		id: '用户ID：', pwd: '修改用户密码：', new: '新密码：', again: '确认密码：', indate: '有效期：',
		def: '默认', hm: '手动', reset: '重置密码：', not: '请在列表中选择一条记录！',
		options: [{label: '默认', value: '1'},{label: '立即失效', value: '0'},{label: '永不过期', value: '-1'}],
		pwdErr: '新密码不能为空！', againErr: '确认密码不能为空！', same: '两次输入的密码不一致！',
	},
	Ekey: {
		userID: '用户ID：', ekeyName: 'Ekey名称：', ekeyPwd: 'Ekey密码：', ekeyDate: 'Ekey有效期：', 
		ekeyInfo:'Ekey描述：', tips: '小于V5版用户必填', errID: '用户ID不能为空！', errName: 'Ekey名称不能为空！',
		delEkey: '是否要删除Ekey？', ekeyNameFormat: 'Ekey名称必须是字母或数字或下划线', ekeyCommentFormat: 'Ekey描述不能包含%'
	},
	relation: {
		addSignal: '创建通信关系', delSignal: '删除通信关系', userID1: '用户ID：', userID2: '对端用户：',
		clear: '清空', errid1: '用户ID不能为空！', errid2: '对端用户不能为空！', errSignal: '至少选择一条通信关系！', 
		errid3: '立即下发只能选择一条通信关系！', sureSignal: '是否确认要删除通信关系'
	},
	
	suConfig: {
		first: '全局静态配置', second: '全局动态配置', 'static': '静态配置文件：', dynamic: '动态配置文件：',
		only: '只读', edit: '编辑', h2: '对比内容：' , section:'段名', type:'操作类型', detail:'详情',
		field:'字段名' , oldValue:'原数据' , modifyValue:'修改数据' , range:'合理范围' , 
		err: '异常提示', sub: '是否确定提交？', txtErr: '文件内容不可以包含%',
		full: '文件内容不可以包含%和全角字符'
	},
	dispatch: {
		options: [{label: '系统动态配置', value: 1},{label: '系统静态配置', value: 2},
			{label: '用户密码信息表', value: 3}, {label: '互联网配置信息', value: 4}],
		nodeName:'节点名', cuName:'服务名', errcode:'结果', errinfo:'操作结果描述', type:'操作类型',
		setFile:'配置文件：', hots1:'分发主机：', hots2:'主机列表', res:'分发结果：',
		t1:'(系统动态配置文件为：FxDynamic.ini,userinfo.db,userekey.db,usercomm.db,userinfoext.db)',
		t2:'(系统静态配置文件为：FxStatic.ini)', t3:'(用户密码信息表文件为：userpasswd.db)',
		t4:'(互联网配置信息文件为：userinfo.db,userinfoext.db,userpasswd.db)',
		section: '段名', field: '用户ID', notype: '不一致类型', detail: '详情', noNode: '节点名不能为空',
		dispatchAll: '分发到全部中枢主机？此次操作将生成版本',
		dispatchPart: '分发到部分中枢主机？此次操作不生成版本'
	},
	audit: {
		operator:'操作员', reviewer:'审核员', operatorRole:'操作员角色', operatorType:'操作类型',
		operatorTime:'操作时间',errorCode:'操作结果', errorInfo:'操作结果描述', uuid:'流水号',
		sort: '排序方式 ：', lately: '最近', early: '最早', times: '时间段：', today: '今天', week: '近一周',
		month: '近一个月', begin: '开始时间', end: '结束时间',
	},
	
	versionQuery: {
		options1: [{label: '全部', value: '0'},{label: '系统动态配置', value: '1'},{label: '系统静态配置', value: '2'},
			{label: '用户密码信息表', value: '3'},{label: '中登配置', value: '4'},{label: '回滚', value: '5'}],
		options2: [{label: '全部', value: '0'},{label: '系统动态配置', value: '1'},{label: '系统静态配置', value: '2'},
			{label: '用户密码信息表', value: '3'},{label: '回滚', value: '5'}],
		type:'版本类型', version:'版本号', versionPath:'版本路径', operationTime: '操作时间', 
		operator: '操作人员', reviewer: '审核人员', operationType:'下发类型', checkVer: '比对最新版本MD5',
		rollback1: '您确定要回退到此版本？', bigVer: '您确定要生成大版本？', ZdCfg: '是否获取中登配置？',
		rollback2: '<p>您确定要回退到此版本？</p><p style="color:#F00;">回滚该版本成功后，请回滚密码相关配置文件</p>',
		equal0: '一致', equal1: '不一致', equal2: '文件不存在', operationType1: '全量下发' , operationType2: '增量下发',
		operationType3: 'cu上传' , type1: '系统动态配置', type2: '系统静态配置', type3: '用户密码信息表', type4: '中登配置',
		type5: '回滚_系统动态配置', type6: '回滚_系统静态配置', type7: '回滚_用户密码信息表', type8: '回滚_中登配置', 
		isEqual: '是否一致'
	},
	versionDetail: {
		title: '版本详情', type: '版本类型', fileName: '文件名' , cfgInfo: '文件内容',
		fileSize: '文件大小(bytes)', fileMd5: '文件Md5', fileTime: '中登时间',
		ctplst: 'ctplst', zdrela: 'zdrela',
	},
	versionContrast: {
		options1: [{label: '全局动态配置', value: 1},{label: '全局静态配置', value: 2},{label: '用户密码信息表', value: 3},
			{label: '中登CTPLST', value: 4},{label: '中登ZDRela', value: 5}],
		options2: [{label: '全局动态配置', value: 1},{label: '全局静态配置', value: 2},{label: '用户密码信息表', value: 3}],
		type:'操作类型', ver1: '基准版本：', ver2: '对比版本：', btn: '对比', temp: '临时版本', online: '线上版本',
		section: '段名', field: '字段名', detail: '详情', res: '对比结果没有变化',
		noNull: '基准版本或对比版本不能为空'
	},
	
	files: {
		search: {
			version: '版本号', fileName: '文件名', fileComment: '描述', size: '文件大小(bytes)', md5:'文件MD5' ,time: '发布时间', 
			operater: '操作人员', reviewer: '审核人员', del: '删除', delRes: '删除结果：', sendRes: '下发结果：'
		},
		upload: {
			version: '版本号：', fileName: '客户端文件名：', fileComment: '描述：', dispense: '下发', res: '下发结果：',
			path: '请将文件放在业务配置系统服务器路径：static/import/clientfile', title: '文件下发'
		},
		regain: {
			version: '版本号', fileName: '客户端文件名', fileComment: '描述', recoverType: '恢复操作类型', detail: '详情', 
			cuLists: '服务名', cuName: 'cuName', compare: '对比', restore: '恢复', typeStr0: '下发', typeStr1: '删除'
		},
		blacklist: {
			nodeName: '节点名', cuName: 'CU名', white: '白名单', black: '黑名单', cuList: '主机列表：',
			blackBtn: '设置黑名单', cuType: '节点状态', title: 'CU黑名单', cuSet: '是否设置客户端文件自动比对黑名单'
		}
	},
	
	advanced: {
		user: {
			userID: '用户ID：', userName: '用户名称：', userType: '用户类型：', inZone: '所属地区：', linkGroupName: '所在分组：',
			soft: '软加密', hard: '硬加密', expcsv: '导出基础信息', fileName: '文件名：', title: '用户高级搜索',
			encSelect: [{id: 0, name: '全部'},{id: 1, name: '硬加密'},{id: 2, name: '软加密'}]
		},
		Ekey: {
			ekeyName: 'Ekey名称：', expcsv: '导出Ekey', title: 'Ekey高级搜索'
		},
		signal: {
			expcsv: '导出通信关系', title: '通信关系高级搜索'
		},
		information: {
			listType: [{label: '全部', val: 'all'},{label: '运维表', val: 'OPE'},{label: 'BOP表', val: 'BOP'}],
			listName: '查询表：', company: '所属公司', ssccManager: 'sscc客户经理', department: '所属部门',
			expcsv: '导出运维表', expBOP: '导出BOP表', resOPE: '运维表查询结果：', resBOP: 'BOP表查询结果：',
			operatorName: '联系人姓名', mobileNum: '联系人手机号', operatorEmail: '联系人邮箱', telNum: '联系人座机号', 
			addOPE: '增加扩展信息', editOPE: '修改扩展信息', del: '是否要删除扩展信息？',
			nameNull: '联系人姓名不能为空', mobileNull: '联系人手机号不能为空', title: '扩展信息高级搜索',
			ssccManagerTelNum: '客户经理座机号码', ssccManagerMobileNum: '客户经理手机号码',
			operatorCompany: '所属公司', operatorDepartment: '所属部门', email: '用户运维邮箱', useEmail: '联系人邮箱',
			userAlarmSmsNum: '短信报警号码', operationPhoneNum: '用户运维电话', operationFax: '用户运维传真',
			om_email: '用户运维邮箱', operatorUpdateTime: '更新时间', valid: '是否设为有效？',
			expInfo: '导出扩展信息'
		},
		audit: {
			expcsv: '导出稽核', title: '稽核高级搜索', commFlag: '通信关系', userextFlag: '扩展信息',
			all: '全部'
		}
	},
	order: {
		manage:{
			xiaozhan: '小站指令', ekeyOrder: 'Ekey指令', signalOrder: '关系对指令', pwdOrder: '密码指令',
			date: '统计时间：', today: '今天', week: '近一周', month: '近一个月', recvBeginTime: '指定时间段',
			recvEndTime: '至', acceptLabel: '执行状态：', feedbackLabel: '反馈状态：', 
			acceptState: ['全部','未处理','已拒绝','失败','成功'], feedbackState: ['全部','未反馈','反馈失败','反馈成功'],
			batchAccept: '批量执行', batchFeedback: '批量反馈', edit: '编辑', reject: '拒绝',
			oneData: '至少选择一条数据！', submit: '是否确定要提交', rej: '是否拒绝这条指令？',
			reportBtn: '上报BOP', reportTxt: '是否上报BOP稽核信息',
			remarks: '备注不能为空，且不能包含（%）',
		},
		xiaozhan: {
			bizKey: '业务ID', userID: '用户ID', userName: '用户名称', operationType: '操作类别',
			recvTime: '接收时间', exeState: '执行状态', feedbackState: '反馈状态', remarks: '备注',
			legal: '合法性', legalInfo: '合法详情', legal0: '合法', legal1: '不合法',
			'type-1': '下线', type0: '修改', type1: '上线',
			exe1: '未处理', exe2: '已拒绝', exe3: '失败', exe4: '成功',
			fb1: '未反馈', fb2: '反馈失败', fb3: '反馈成功'
		},
		ekeyOrder: {
			ekeyName: 'Ekey名称', ekeyValidDate: 'Ekey有效期', comment: 'Ekey描述',
			userName: '用户名称：', ekeyPasswd: '修改ekey密码：', 'type-1': '下线',
			type1: '上线', editEkey: '编辑Ekey指令'
		},
		signalOrder: {
			expectExeTime: '客户期望执行时间', title: '修改通信关系', bizType: '业务类型：',
			toUserID: '对端用户ID：', toUserName: '对端用户名称：', bizType2: '业务类型',
			type0: '上线', type1: '下线'
		},
		pwdOrder: {
			batch1: '业务ID标红的指令不可批量执行！', batch2: '业务ID标红的指令不可批量反馈！',
			title: '修改密码'
		},
		editBiz: {
			title: '编辑小站指令', bizKey: '业务ID：', remark: '备注：'
		}
	}
};
module.exports = {fbcsFile: obj};
