var obj = {
	tips: {
		ok: '确定', now: '立即下发', cancel: '取消', build: '创建', back:'返回', refresh: '刷新',
		modify: '修改', edit: '编辑', submit: '提交', contrast: '对比', close: '关闭',
		date: '选择日期时间', title: '提示', rightClick: '请在文件名上点击右键，选择“链接另存为...”菜单保存文件。',
	},
	components: {
		placeholder: '输入关键字', not: '暂无数据', paging1: '已显示全部', paging2: '条数据',
		reviewTitle: '复核操作', reviewName: '复核操作员：', reviewPwd: '复核员密码：',
		isSubmit: '是否要立即下发！', reviewSame: '复核员不能是登陆用户!', reviewNull: '复核员或密码不能为空!',
		result: '下发结果',
	},
	searchBar: {
		userID: '用户ID：', userName: '用户名称：', placeholder: '输入关键字', search: '查询',
		ekeyName: 'Ekey名称：', addSignal: '创建通信关系', businessType: '业务类型',
		
	},
	fnField: {
		addUser: '创建用户', delUser: '删除用户', editPwd: '修改密码', importInformation: '导入运维扩展信息', importInBop: '导入BOP扩展信息',
		addEkey: '创建Ekey', editEkey: '修改Ekey', exportEkey: '批量导出Ekey',
		addSignal: '创建通信关系', delSignal: '删除通信关系', exportSignal: '批量导出通信关系',
		bigVer: '生成大版本', getCfg: '获取中登配置', checkZd: '比对中枢配置最新版本', newVer: '比对客户端文件最新版本',
	},
	tableTitle: {
		userID: '用户ID', userName: '用户名称', operation: '操作',
		ekeyName: 'Ekey名称', ekeyDate: 'Ekey有效期', ekeyInfo: 'Ekey描述',
		userType: '用户类型', inZone: '所属地区', group: '所在分组', speed: '最大收发速度', encFlag: '加密方式', 
		beginTime: '软加密开始时间', endTime: '软加密结束时间',
	},
	tableDefined: {
		editUser: '修改基本信息', editEkey: '修改Ekey', addSignal: '创建通信关系', delEkey: '删除Ekey',
		delUser: '删除用户', delSignal: '删除通信关系', back: '回退', detail: '详情',
		editExt: '修改扩展信息', delExt: '删除扩展信息'
	},
	err: {
		lock: {
			lock: '是否锁定系统，系统锁定状态将禁用普通用户修改配置？', unlock: '是否解除系统锁定状态？',
			lockTxt: '提示：当前系统运维锁定状态，已禁止用户修改配置。'
		},
		user: {
			userID: '用户ID不能为空', userName: '用户名称不能为空', speedCtrl: '最大收发速度不能为空',
			maxRelationUser: '最大关系数不能为空', userPasswd: '密码不能为空', day: '开始时间必需小于结束时间',
			pwdRule: '密码必须包含大小写字母、数字、特殊字符(@#_-)中的两项且大于8位', unlike: '两次输入的密码不一致',
			blank: '密码的前后不可以是空白字符', npwd: '新密码不能为空', noidName: '密码不能包含用户ID、用户名称',
			errNum: '只能输入纯数字', idformat: '用户ID仅能输入英文，数字,“-”和“_”', maxUser: '最大关系数范围在0到1000',
			speed: '最大收发速度范围在-1到999999999999999999', maxTask: '单用户任务并发数要大于 1',
			oneTask: '单用户最大发送文件个数要大于 0',
		},
		info: {
			operatorMobileNum: '仅能输入数字,“|”', operatorEmail: '仅能输入英文，数字,“-”,“_”,“@”和“.”',
			operatorTelNum: '仅能输入数字,“-”,“+”,和“;”', emailFormat: '邮箱格式不对',
		},
		files: {
			fileNull: '文件名不能为空！', verNull: '版本号不能为空！', format: '仅能输入英文，数字,“-”,“_”和“.”'
		}
	},
	
	userHome: {
		info: '基本信息', ekey: 'Ekey', signal:'通信关系', information:'扩展信息', 
		addUser: '创建用户', editUser: '修改用户', del: '是否删除该用户信息！', fileName: '扩展信息文件名：',
		importTips: '请将扩展信息文件放到服务器路径：/fbcs-server/static/import内；<br/>在输入框中填入扩展信息文件名。',
		OPE: '是否导入运维扩展信息？', BOP: '是否导入BOP扩展信息？', line: '行数', operatorName: '联系人姓名', errinfo: '错误描述',
		fileErr: '文件名不能为空！', pwd: '用户密码：',
	},
	userInfo: {
		id: '用户ID：', name: '用户名称：', pwd: '密码：', def: '默认', hm:'手动', type: '用户类型：', inZone: '所属地区：', 
		group: '所在组：', speed: '最大收发速度：', maxUser: '最大关系数：', hard: '硬加密', soft: '软加密',
		online: '不在线报警：', encFlag: '加密方式：', beginTime: '软加密开始时间：', endTime: '软加密结束时间：', broadcast: '是否允许广播发送：',
		connFlag: '允许连接标志：', switchMsg: '允许消息交换：', publishTopicCount: '发布主题个数上限：', subscribeTopicCount: '订阅主题个数上限：',
		maxPublishTopicDay: '发布主题有效期天数：', maxSimultTaskCount: '单用户任务并发数：', maxCltOneDayTaskCount: '单用户最大发送文件个数：', 
		webFlag:'单用户互联网标识：', isModifyDefaultPasswd: '新加用户修改默认密码标识：', userPasswd: '系统密码：', expiredTimeFlag: '密码有效期标识：',
		more: '展开更多设置', Kbit: '-1或0为不限速', indate: '密码有效期：', buildTime: '创建时间：'
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
		delEkey: '是否要删除Ekey？',
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
		err: '异常提示', sub: '是否确定提交？'
	},
	dispatch: {
		options: [{label: '系统动态配置', value: '1'},{label: '系统静态配置', value: '2'},
			{label: '用户密码信息表', value: '3'}, {label: '互联网配置信息', value: '4'}],
		nodeName:'节点名', cuName:'CU名称', errcode:'错误码', errinfo:'错误信息', type:'操作类型',
		setFile:'配置文件：', hots1:'分发主机：', hots2:'主机列表', res:'分发结果：',
		t1:'(系统动态配置文件为：userinfo.db,userekey.db,usercomm.db,mxdynamic.ini)',
		t2:'(系统静态配置文件为：mxstatic.ini)', t3:'(用户密码信息表文件为：userpasswd.db)'
	},
	audit: {
		operator:'操作员', reviewer:'审核员', operatorRole:'操作员角色', operatorType:'操作类型',
		operatorTime:'操作时间',errorCode:'操作错误码', errorInfo:'操作错误描述', uuid:'流水号',
		sort: '排序方式 ：', lately: '最近', early: '最早', times: '时间段：', today: '今天', week: '近一周',
		month: '近一个月', begin: '开始时间', end: '结束时间',
	},
	
	versionQuery: {
		options: [{label: '全部', value: '0'},{label: '系统动态配置', value: '1'},{label: '系统静态配置', value: '2'},
			{label: '用户密码信息表', value: '3'},{label: '中登配置', value: '4'},{label: '回滚', value: '5'}],
		type:'版本类型', version:'版本号', versionPath:'版本路径', operationTime: '下发时间', 
		operator: '下发人员', reviewer: '审核人员', operationType:'下发类型', checkVer: '比对最新版本MD5',
		rollback: '您确定要回退到此版本？', bigVer: '您确定要生成大版本？', ZdCfg: '是否获取中登配置？',
		equal0: '一致', equal1: '不一致', equal2: '文件不存在', operationType1: '全量下发' , operationType2: '增量下发',
		operationType3: 'cu上传' , type1: '系统动态配置', type2: '系统静态配置', type3: '用户密码信息表', type4: '中登配置',
		type5: '回滚_系统动态配置', type6: '回滚_系统静态配置', type7: '回滚_用户密码信息表', type8: '回滚_中登配置', 
		isEqual: '是否一致'
	},
	versionDetail: {
		title: '版本详情', type: '版本类型', fileName: '文件名' , cfgInfo: '文件内容',
		fileSize: '文件大小', fileMd5: '文件Md5', fileTime: '中登时间',
		ctplst: 'ctplst', zdrela: 'zdrela',
	},
	versionContrast: {
		options: [{label: '全局动态配置', value: 1},{label: '全局静态配置', value: 2},{label: '用户密码信息表', value: 3},
			{label: '中登CTPLST', value: 4},{label: '中登ZDRela', value: 5}],
		type:'操作类型', ver1: '基准版本：', ver2: '对比版本：', btn: '对比', temp: '临时版本', online: '线上版本',
		section: '段名', field: '字段名', detail: '详情'
	},
	
	files: {
		search: {
			version: '版本号', fileName: '客户端文件名', fileComment: '描述', size: '客户端文件大小', md5:'文件MD5' ,time: '发布时间', 
			operater: '下发人员', reviewer: '审核人员', del: '删除', delRes: '删除结果：', sendRes: '下发结果：'
		},
		upload: {
			version: '版本号：', fileName: '客户端文件名：', fileComment: '描述：', dispense: '下发', res: '下发结果：',
			path: '请将客户端文件放到服务器路径：'
		},
		regain: {
			version: '版本号', fileName: '客户端文件名', fileComment: '描述', recoverType: '恢复操作类型', detail: '详情', 
			cuLists: 'CU名称', cuName: 'cuName', compare: '对比', restore: '恢复', typeStr0: '下发', typeStr1: '删除'
		},
		blacklist: {
			nodeName: '节点名', cuName: 'CU名', white: '白名单', black: '黑名单', cuList: '主机列表：',
			blackBtn: '设置黑名单', cuType: '节点状态',
		}
	},
	
	advanced: {
		user: {
			userID: '用户ID：', userName: '用户名称：', userType: '用户类型：', inZone: '所属地区：', linkGroupName: '所在分组：',
			soft: '软加密', hard: '硬加密', expcsv: '导出基础信息', fileName: '文件名：', 
		},
		Ekey: {
			ekeyName: 'Ekey名称：', expcsv: '导出Ekey',
		},
		signal: {
			expcsv: '导出通信关系',
		},
		information: {
			listType: [{label: '全部', val: 'all'},{label: '运维表', val: 'OPE'},{label: 'BOP表', val: 'BOP'}],
			listName: '查询表：', company: '公司名称', ssccManager: 'sscc客户经理', department: '所在部门',
			expcsv: '导出运维表', expBOP: '导出BOP表', resOPE: '运维表查询结果：', resBOP: 'BOP表查询结果：',
			operatorName: '联系人姓名', mobileNum: '联系人手机号', email: '联系人邮箱', telNum: '联系人座机号', 
			addOPE: '增加扩展信息', editOPE: '修改扩展信息', del: '是否要删除扩展信息？',
			nameNull: '联系人姓名不能为空', mobileNull: '联系人手机号不能为空'
		},
		audit: {
			expcsv: '导出稽核',
		}
	}
};
module.exports = {fbcsFile: obj};
