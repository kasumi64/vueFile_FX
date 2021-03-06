
export default {
	publics: {
		paging: {before1: '共', before2: '已显示全部', after: '条数据'},
		cent: '输入的内容不能有%'
	},
	utils: {
		okBtn: '确 定', nowBtn:'立即下发', cBtn:'取 消', title1:'提示', title2:'复核操作', sub:'提 交', back:'返 回',
		review:'复核操作员：', reviewPwd:'复核员密码：', reviewNull: '复核员或密码不能为空！',reviewNameErr:'复核员不能是登录用户',
		noAuth: '该用户还没有分配权限', session: '会话已失效，请重新登录'
	},
	loopReq: {
		serviceID: '服务名', errcode: '结果', errinfo: '错误信息', operationType: '操作类型'
	},
	
	home: {
		tips: {lock: '是否锁定系统，系统锁定状态将禁用普通用户修改配置？', unlock:'是否解除系统锁定状态？', errPass:'用户密码不能为空！',
			lockAuth: '您当前没有操作权限！'},
		label: ['提示：当前系统运维锁定状态，已禁止用户修改配置。','提示','用户名：','用户密码：','提 交','返 回']
	},
	navHead: {
		tips:{loginOut: '是否退出系统？',pwdSame: '输入两次的密码不一致。',pwdFormat:'密码必须同时包含英文、数字及特殊字符（@、#、*、_、-）12-18位字符'},
		label: ['消息系统','业务配置管理系统','FDEP运维平台','基础运维系统','集群管理系统','业务监控分析系统','修改密码','退出登录'],
		pwd: ['修改密码','用户名：','原密码：','新密码：','确认新密码：','提 交','返 回']
	},
	sidebar:{
		tabs: ['用户','Ekey','通信关系','配置','主机配置','运维','分发','稽核','任务',
			'订阅发布','用户配置','已发布主题','已订阅主题','版本','查询','对比']
	},
	
	themeRelease: {
		tips: {user: "请在列表中选择一条记录！",del: "是否要删除该主题？",success:'删除成功！'},
		label: ['已发布主题','发布者：','发布者名称：','主题编号：','日期：','起始日期：','至','结束日期：',
			'查 询','添加用户主题','修改用户主题','删除用户主题','主题详情','批量导出主题信息',
			'请在文件名上点击右键，选择“链接另存为...”菜单保存文件。','关 闭'],
		list: ['发布者ID','发布者名称','主题编号','发布时间','订阅个数','操作'],
		hasOne: '请在列表中至少选择一条记录！', fileName: '文件名：'
	},
	themeSubscription: {
		tips: {user: "请在列表中选择一条记录！"},
		label: ['已订阅主题','订阅者：','订阅者名：','主题编号：','查 询','主题详情','发布者：'],
		list: ['订阅者ID','订阅者名','订阅者AppID','发布者ID','发布者名称','主题编号','发布时间','操作']
	},
	themeUserSet: {
		tips: {user: "请在列表中选择一条记录！"},
		label: ['用户配置','用户：','用户名称：','查 询','用户总数：','修改配置信息'],
		list: ['用户ID','用户名称','允许发布主题个数','允许订阅主题个数','发布主题有效天数','操作']
	},
	themeAddTheme: {
		tips: {topicName:'主题编号不能为空！', pubUserID:'发布者不能为空！', pubUserName:'发布者名称不能为空！',
			topicDescr:'主题描述不能为空！',topicInfo:'主题信息不能为空！', effectiveDays: '有效天数不能为空！',effectiveNum:'有效天数必须为大于零的整数',
			send:'是否要提交?',now:'是否要立即下发?',part:'<p class="red">部分成功，请点击确认按钮轮询下发SU/RU结果</p>',
			word: '输入关键字', maxSubs: '已到达最大可订阅用户个数', overDays: '超过最大有效天数'},
		label: ['添加用户主题','主题编号：','发布者：','发布者名称：','主题描述：','主题信息：','有效天数：',
			'接收方：','操作员：','用户列表','可订阅用户','立即下发','提 交','返 回',' 搜索'],
		list: ['用户ID','用户名','AppID','其他'],
		errTopicName: '主题编号不能有%', errTopicDescr: '主题描述不能有%', errTopicInfo: '主题信息不能有%',
		must:'必须...', maxDays: '最大有效天数', 
	},
	themeDetailTheme: {
		tips: {},
		label: ['主题详情','主题编号：','主题描述：','主题信息：','接收方：','可订阅用户','已订阅用户','发布者：','返 回','有效天数：','发布时间：',' 搜索'],
		list: ['用户ID','用户名','appid']
	},
	themeEditTheme: {
		tips: {appid:'appid 不能为空。',appid2:'appid 不能含有"%",":"和"|"字符。',send:'是否要提交?',now:'是否要立即下发?',topicDescr:'主题描述不能为空！',
			topicInfo:'主题信息不能为空！', nextNow:'此次修改可能影响已订阅用户，请跳转至已订阅用户页面进行确认！', sameAppid: 'UserID+AppID不能重复',
			part:'<p class="red">部分成功，请点击确认按钮轮询下发SU/RU结果</p>', maxSubs: '已到达最大可订阅用户个数'},
		label: ['修改信息','修改用户主题','主题编号：','发布者：','发布时间：','主题描述：','主题信息：', '接收方：','对端用户',
			'已选对端用户','提 交','返 回','修改已订阅用户','已订阅用户：','立即下发','可订阅用户','已订阅用户','有效天数：',' 搜索'],
		list: ['用户ID','用户名','appid'],
		must:'必须...', errTopicDescr: '主题描述不能有%', errTopicInfo: '主题信息不能有%',
	},
	
	versionContrast: {
		tips: {user: "请在列表中选择一条记录！",ver1: "您输入的版本 1 不正确！",ver2: "您输入的版本 2 不正确！",noChange:'对比结果没有变化'},
		label: ['对比','版本类型：','基准版本：','请输入基准版本号','对比版本：','请输入对比版本号','对 比','基准版本相对对比版本的变化'],
		list: ['段名','字段名','操作类型','详情'],
		option:[{c: '1',t: '全局动态配置'},{c: '2',t: '全局静态配置'},{c: '3',t: '用户密码信息表'},{c: '4',t: '用户主题关联信息表'}],
		noNull: '基准版本或对比版本不能为空'
	},
	versionQuery: {
		tips: {rollback: "<p>您确定要回退到此版本？</p>",ver:'确定从最新历史版本中生成大版本并下发？版本包括：<br>系统动态配置，用户主题关联信息表，<br>系统静态配置，用户密码信息表。',
			roll:'<p style="color:#F00;">回滚该版本成功后，请回滚密码相关配置文件及主题相关配置文件</p>'},
		label: ['查询','版本类型：','查询时间：','今天','近一周','近一个月','指定时间段','指定时间段：','至','开始日期','结束日期','查 询','版本回滚','版本详情','生成大版本'],
		list: ['版本类型','版本号','版本路径','操作时间','操作人员','审核人员','下发类型','操作','配置文件名','文件大小(Byte)'],
		option:[{c: '0',t: '全部'},{c: '1',t: '系统动态配置'},{c: '2',t: '系统静态配置'},
			{c: '3',t: '用户密码信息表'},{c: '4',t: '用户主题关联信息表'},{c: '5',t: '回滚'}],
		typeTxt: ['','系统动态配置','系统静态配置','用户密码信息表','用户主题关联信息表','回滚_系统动态配置','回滚_系统静态配置','回滚_用户密码信息表','回滚_用户主题关联信息表'],
		operTxt: ['','全量下发','增量下发']
	},
	distr: {
		tips: {pc:'请选择主机！',man:'复核操作员不能为空！',pass:'复核密码不能为空！',submit:'是否要提交？'},
		label: ['分发','配置文件：','分发主机：','复核操作员：','复核密码：','系统动态配置文件为：', '系统静态配置文件为：',
			'主机列表', '必填项...', '提 交', '用户密码信息表文件为：', '用户主题关联信息表文件为：'],
		list: ['节点名', '分发结果：', '服务名'], 
		options: [{val: '1',label:'系统动态配置'},{val: '2',label:'系统静态配置'},{val: '3',label:'用户密码信息表'},{val: '4',label:'用户主题关联信息表'}],
		dispatchAll: '分发到全部中枢主机？此次操作将生成版本',
		dispatchPart: '分发到部分中枢主机？此次操作不生成版本'
	},


	user: {
		label: ["用户","用户ID：","用户名称：","查询","创建用户","批量导入扩展信息","批量导出扩展信息","批量导出基础信息"],
		table: ["用户ID","用户名称","操作","修改基本信息","修改Ekey","创建通信关系","删除用户","修改密码"],
		popup: ["批量导入扩展信息","扩展信息文件名","请将扩展信息文件放到服务器路径：static/import内；","在输入框中填入扩展信息文件名。","提交","返回",
				"批量导出扩展信息","文件名：","请在文件名上点击右键，选择“链接另存为...”菜单保存文件。","关闭","批量导出基础信息"],
		tips: ["创建用户","是否立即下发","修改用户","是否删除该用户信息","请在列表中选择一条记录！",'扩展信息文件名不能为空'],
		extended: '是否导入扩展信息？'
	},
	Ekey: {
		label: ["Ekey","查询方式","按Ekey查询","按用户查询","Ekey名称","用户ID","查询","创建Ekey","批量导出Ekey",'小于V5版用户必填'],
		table: ["用户ID","用户名称","Ekey名称","Ekey有效期","Ekey描述","操作","修改Ekey信息","删除Ekey信息"],
		popup: ["创建Ekey","用户ID：","Ekey名称：","Ekey有效期：","Ekey描述：","立即下发","创建","返回","修改Ekey","批量导出Ekey",
				"文件名：","请在文件名上点击右键，选择“链接另存为...”菜单保存文件。","关闭","修改",'修改ekey密码：','ekey密码：'],
		tips: ["用户ID不能为空","Ekey名称不能为空","Ekey有效期不能为空","Ekey描述不能为空","用户名不能为空","Ekey名称不能为空","是否删除Ekey信息",
					"是否立即下发"],
		eNameErr: 'Ekey名称必须是字母或数字或下划线', commentErr: 'Ekey描述不能有%', noData: '无数据',
		eNameErr2: 'Ekey名称必须是字母或数字或(_\/=), 不可以(/=)结尾'
	},
	signal: {
		label: ["通信关系","业务类型","用户ID","用户ID","查询","创建通信关系","批量导出通信关系"],
		table: ["业务类型","用户ID","用户名称","用户ID","用户名称","操作","删除通信关系", '创建时间'],
		popup: ["创建通信关系","业务类型 ：","用户ID ：","用户ID ：","清空用户ID","提交","返回",
				"批量导出通信关系","文件名：","请在文件名上点击右键，选择“链接另存为...”菜单保存文件。","关闭"],
		tips: ["是否删除通信关系对","全部","提示","确定","取消","用户ID不能为空","对端用户不能为空"],
		noData: '加载中...', adv: '高级搜索'
	},
	host:{
		label: [ "主机配置","全局静态配置","静态配置文件：","提交","全局动态配置","动态配置文件：","只读","编辑","是否提交当前修改",
				 "(全局静态配置文件为：mxstatic.ini，文件仅支持UTF-8格式)", "(全局动态配置文件为：mxdynamic.ini，文件仅支持UTF-8格式)"],
		popup: ["复核操作","复核操作员","复核员密码","提 交","返 回"]
	},
	statist: {
		label: ["稽核","操作员：","操作类型：","排序方式：","最近","最早","时间段：","今天","近一周","近一个月","指定时间段","至","开始时间","结束时间","查询","导出报表",],
		table: ["操作时间","操作类型","操作员","操作员角色","操作结果","操作结果描述","详情","应答详情","审核员"],
		tips: ['全部',"运维","用户",'定时器'],
		popup: ["批量导出稽核信息","文件名：","请在文件名上点击右键，选择“链接另存为...”菜单保存文件。","关闭"],
		serviceID: "服务名", result: "结果", errinfo: "操作结果描述", zone: '节点名'
	},
	userEdit: {
		label: ["返回","用户ID","用户名称","用户类型","所属地区","速度","(Kbit/s)-1或0:不限速","用户联系方式信息","用户组","离线是否告警",
			"软加密开始时间","软加密结束时间","是否允许收发文件","发布主题个数上限","订阅个数上限","最大主题过期天数","立即下发","修改","返回",
			"创建用户","使用默认密码","默认","手动","密码","选择日期时间","创建","创建时间",'密码有效期：'],
		pwdTime: [{val: "1", txt: "默认"}, {val: "-1", txt: "永不过期"}, {val: "0", txt: "立即过期"}],
		tab: ["基本信息", "Ekey", "通信关系", "扩展信息"],
		connect :[
//			{ value: "0", groupID: "Group0" },{ value: "1", groupID: "Group1" },{ value: "2", groupID: "Group2" },{ value: "3", groupID: "Group3" },
//			{ value: "4", groupID: "Group4" },{ value: "5", groupID: "Group5" },{ value: "6", groupID: "Group6" }
		  ],
		online :[{ value: "1", label: "是" }, { value: "0", label: "否" }],
		tips: {now:"是否立即下发", title:"修改用户", userID:'用户ID不能为空', userName:'用户名称不能为空', userPasswd: "密码必须包含大小写字母、数字、特殊字符(@#-_*)中的两项且8-16位",
			speedCtrlKbps:'速度不能为空', maxPubsCount:'发布主题个数上限不能为空',maxSubsCount:'订阅个数上限不能为空',maxDaysOfTopic:'最大主题过期天数不能为空',
			must:'必须...',onlyNum:'请输入纯数字',errNum:'只能输入纯数字'},
		mustNum: {maxPubsCount:'发布主题个数上限必须为正整数',maxSubsCount:'订阅个数上限必须为正整数',maxDaysOfTopic:'最大主题过期天数必须为正整数',unequalZero: '最大主题过期天数必须大于 0'},
		nameErr: '用户名称不能包含（|$%,";:/\\）', userinfoErr: '用户联系方式信息不能有%', softDay: '软加密开始时间必须小于或等于软加密结束时间'
	},
	password: {
		label: ["修改密码","用户ID：","重置密码：","默认","手动","新密码：","确认密码：","立即下发","提交","返回",'密码有效期：'],
		pwdTime: [{val: "1", txt: "默认"}, {val: "-1", txt: "永不过期"}, {val: "0", txt: "立即过期"}],
		tips: {unlike: '两次输入的密码不一致',pwdRule:'密码必须包含大小写字母、数字、特殊字符(@#-_*)中的两项且大于等于8位',send:'是否立即下发',
			blank:'密码的前后不可以是空白字符',npwd:'新密码不能为空',blank2: '密码不能包含空格'},
		mpwd: '修改用户密码'
	},
	extendIfo:{
		tips:["只能输入数字、'-'、'+'和';'","只能输入数字、'-'和';'","只能输入数字和';'","只能输入数字、'+'和';'","只能输入数字、'+'和';'",
			"只能输入英文、数字、'-'、'_'、'@'和'.'字符","提交","返回","邮箱格式不对", "不能输入'%'"],
		label:["短信报警号码：","负责人座机号码：","负责人手机号码：","运维传真：","运维电话：","邮箱：","SSCC客户经理："],
		ssccErr: 'SSCC客户经理不能输入%'
	}
};
