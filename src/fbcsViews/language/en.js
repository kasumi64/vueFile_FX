
export default {
	publics: {
		paging: {before1: '共', before2: '已显示全部', after: '条数据'},
		cent: '输入的内容不能有%'
	},
	utils: {
		okBtn: 'Yes', nowBtn:'Now', cBtn:'No', title1:'Tips', title2:'review operator', sub:'Yes', back:'No',
		review:'review name：', reviewPwd:'password：', reviewNull: 'reviewer is null！',reviewNameErr:'reviewer name is error',
		noAuth: '该用户还没有分配权限', session: '会话已失效，请重新登录'
	},
	loopReq: {
		serviceID: 'Sevice name', errcode: 'Result', errinfo: '错误信息', operationType: 'Operation type'
	},
	
	home: {
		tips: {lock: '是否锁定系统，系统锁定状态将禁用普通用户修改配置？', unlock:'是否解除系统锁定状态？', errPass:'用户密码不能为空！',
			lockAuth: '您当前没有操作权限！'},
		label: ['提示：当前系统运维锁定状态，已禁止用户修改配置。','Prompt','User name：','User password：','Submit','Back']
	},
	navHead: {
		tips:{loginOut: '是否退出系统？',pwdSame: '输入两次的密码不一致。',pwdFormat:'密码必须同时包含英文、数字及特殊字符（@、#、*、_、-）12-18位字符'},
		label: ['消息系统','业务配置管理系统','FDEP运维平台','基础运维系统','集群管理系统','业务监控分析系统','Modify password','退出登录'],
		pwd: ['Modify password','User name：','原密码：','New password：','Confirm password：','Submit','Back']
	},
	sidebar:{
		tabs: ['User','Ekey','通信关系','配置','主机配置','运维','分发','稽核','任务',
			'订阅发布','用户配置','已发布主题','已订阅主题','版本','查询','对比']
	},
	
	themeRelease: {
		tips: {user: "Please select a record in the list!",del: "Delete the topic or not?",success:'删除成功！'},
		label: ['已发布主题','Publisher：','Publisher name：','Topic No.：','Date：','Start date：','To','End date：',
			'Query','Add user topic','Modify user topic','Delete user topic','Topic details','Export topic information in batch',
			'Right-click on the file name and select the "Save Link As ..." menu to save the file.','Close'],
		list: ['Publisher ID','Publisher name','Topic No.','Publish time','Number of topics subscribed','Operation '],
		hasOne: '请在列表中至少选择一条记录！', fileName: 'File name：'
	},
	themeSubscription: {
		tips: {user: "Please select a record in the list"},
		label: ['已订阅主题','Subscriber ：','Subscriber name：','Topic No.：','Query','Topic details','Publisher：'],
		list: ['Subscriber ID','Subscriber name','Subscriber AppID','Publisher ID','Publisher name','Topic No.','Publish time','Operation ']
	},
	themeUserSet: {
		tips: {user: "Please select a record in the list"},
		label: ['用户配置','User：','User name：','Query','用户总数：','Modify configuration information'],
		list: ['User ID','User name','Topics allowed to publish','Topics allowed to subscribe','Valid days of topics published','Operation ']
	},
	themeAddTheme: {
		tips: {topicName:'主题编号不能为空！', pubUserID:'发布者不能为空！', pubUserName:'发布者名称不能为空！',
			topicDescr:'主题描述不能为空！',topicInfo:'主题信息不能为空！', effectiveDays: '有效天数不能为空！',effectiveNum:'有效天数必须为大于零的整数',
			send:'Submit or not?',now:'是否要立即下发?',part:'<p class="red">部分成功，请点击确认按钮轮询下发SU/RU结果</p>',
			word: 'Input keyword', maxSubs: '已到达最大可订阅用户个数', overDays: '超过最大有效天数'},
		label: ['Add user topic','Topic No.：','Publisher：','Publisher name：','Topic description ：','Topic information：','Number of valid days：',
			'Receiver：','Operator：','User list','Subscribable users','Dispatch immediately','Submit','Back',' Search'],
		list: ['User ID','User name','AppID','其他'],
		errTopicName: '主题编号不能有%', errTopicDescr: '主题描述不能有%', errTopicInfo: '主题信息不能有%',
		must:'Must...', maxDays: '最大有效天数', 
	},
	themeDetailTheme: {
		tips: {},
		label: ['Topic details','Topic No.：','Topic description ：','Topic information：','Receiver：','Subscribable users','Subscribed users','Publisher：','Back','Number of valid days：','Publish time：',' Search'],
		list: ['User ID','User name','appid']
	},
	themeEditTheme: {
		tips: {appid:'appid 不能为空。',appid2:'appid 不能含有"%",":"和"|"字符。',send:'Submit or not?',now:'是否要立即下发?',topicDescr:'主题描述不能为空！',
			topicInfo:'主题信息不能为空！', nextNow:'此次修改可能影响已订阅用户，请跳转至已订阅用户页面进行确认！', sameAppid: 'UserID+AppID不能重复',
			part:'<p class="red">部分成功，请点击确认按钮轮询下发SU/RU结果</p>', maxSubs: '已到达最大可订阅用户个数'},
		label: ['修改信息','Modify user topic','Topic No.：','Publisher：','Publish time：','Topic description ：','Topic information：', 'Receiver：','Peer user',
			'已选对端用户','Submit','Back','修改已订阅用户','Subscribed users：','Dispatch immediately','Subscribable users','Subscribed users','Number of valid days：',' Search'],
		list: ['User ID','User name','appid'],
		must:'Must...', errTopicDescr: '主题描述不能有%', errTopicInfo: '主题信息不能有%',
	},
	
	versionContrast: {
		tips: {user: "Please select a record in the list",ver1: "您输入的版本 1 不正确！",ver2: "您输入的版本 2 不正确！",noChange:'No change in comparison results'},
		label: ['Comparison','Version type：','Baseline version：','请输入基准版本号','Comparison version：','请输入对比版本号','Comparison','基准版本相对对比版本的变化'],
		list: ['段名','字段名','Operation type','Details'],
		option:[{c: '1',t: 'Global dynamic configuration'},{c: '2',t: 'Global static configuration'},{c: '3',t: 'User password information table'},{c: '4',t: 'User topic association information table'}]
	},
	versionQuery: {
		tips: {rollback: "<p>您确定要回退到此版本？</p>",ver:'Are you sure to generate a major version from the latest historical version and release it? Versions include：<br>system dynamic configuration, user topic association information table，<br>system static configuration, user password information table.',
			roll:'<p style="color:#F00;">回滚该版本成功后，请回滚密码相关配置文件及主题相关配置文件</p>'},
		label: ['Query','Version type：','Query time：','Today','In recent week','In recent month','指定时间段','指定时间段：','至','Start time','End time','Query','Version rollback','Version details','Generate large version'],
		list: ['Version type','Version number','Version path','Operation time','Operator','Auditor','Release type','Operation ','Configuration file name','File size(Byte)'],
		option:[{c: '0',t: 'All'},{c: '1',t: 'System dynamic configuration '},{c: '2',t: 'System static configuration'},
			{c: '3',t: 'User password information table'},{c: '4',t: 'User topic association information table'},{c: '5',t: 'Rollback'}],
		typeTxt: ['','System dynamic configuration ','System static configuration','User password information table','User topic association information table','Rollback_System dynamic configuration ','Rollback_System static configuration','Rollback_User password information table','Rollback_User topic association information table'],
		operTxt: ['','全量下发','增量下发']
	},
	distr: {
		tips: {pc:'请选择主机！',man:'复核操作员不能为空！',pass:'复核密码不能为空！',submit:'Submit or not？'},
		label: ['分发','Configuration file：','Distribution host：','Recheck operator：','Recheck password：','The system dynamic configuration files are：', 'The system static configuration file is：',
			'Host list', '必填项...', 'Submit', 'The user password information table file is：', 'The user topic association information table file is：'],
		list: ['Node name', 'results：', 'Sevice name'], 
		options: [{val: '1',label:'System dynamic configuration '},{val: '2',label:'System static configuration'},{val: '3',label:'User password information table'},{val: '4',label:'User topic association information table'}]
	},


	user: {
		label: ["User","User ID：","User name：","Query","Create user","Import extended information in batch","Export extended information in batch","Export basic information in batch"],
		table: ["UserID","UserName","Operation ","Modify Basic info","Modify Ekey","Create communication relationship","Delete user","Modify password"],
		popup: ["Import extended information in batch","Name of extended information file","Please put the extended information file in the server path：static/import；","Enter the extended information file name in the input box.","Submit","Back",
				"Export extended information in batch","File name：",'Right-click on the file name and select the "Save Link As ..." menu to save the file.',"Close","Export basic information in batch"],
		tips: ["Create user","Release immediately?","Modify user","Delete user information or not","Please select a record in the list",'扩展信息文件名不能为空'],
		extended: '是否导入扩展信息？'
	},
	Ekey: {
		label: ["Ekey","Query mode","Query by Ekey","Query by user","Ekey name","User ID","Query","Create Ekey","Export Ekey in batch",'Necessary when lower than V5 version'],
		table: ["User ID","User name","Ekey name","Validity period of Ekey","Ekey description","Operation ","Modify Ekey","Delete Ekey"],
		popup: ["Create Ekey","User ID：","Ekey name：","Validity period of Ekey：","Ekey description：","Dispatch immediately","Create","Back","Modify Ekey","Export Ekey in batch",
				"File name：",'Right-click on the file name and select the "Save Link As ..." menu to save the file.',"Close","Modify",'Modify Ekey password：','Ekey password：'],
		tips: ["用户ID不能为空","Ekey名称不能为空","Ekey有效期不能为空","Ekey描述不能为空","用户名不能为空","Ekey名称不能为空","Delete Ekey information or not",
					"Release immediately?"],
		eNameErr: 'Ekey名称必须是字母或数字或下划线', commentErr: 'Ekey描述不能有%', noData: 'No data',
		eNameErr2: 'Ekey名称必须是字母或数字或(_\/=), 不可以(/=)结尾'
	},
	signal: {
		label: ["通信关系","Business type","User ID","User ID","Query","Create communication relationship","Export communication relationship in batch"],
		table: ["Business type","User ID","User name","User ID","User name","Operation ","Delete communication relationship", 'Creation time'],
		popup: ["Create communication relationship","Business type ：","User ID ：","User ID ：","Clear user ID","Submit","Back",
				"Export communication relationship in batch","File name：",'Right-click on the file name and select the "Save Link As ..." menu to save the file.',"Close"],
		tips: ["Delete communication relationship pair or not","All","Prompt","OK","Cancel","用户ID不能为空"],
		noData: 'loading...', adv: 'Advanced search'
	},
	host:{
		label: [ "主机配置","Global static configuration","Static configuration file：","Submit","Global dynamic configuration","Dynamic configuration file：","Read only","Edit","Submit current medication or not?",
				 "(The global static configuration file is：mxstatic.ini，the file only supports UTF-8 format)", "(The global dynamic configuration file is：mxdynamic.ini，the file only supports UTF-8 format)"],
		popup: ["Recheck","Recheck operator","Recheck password","Submit","Back"]
	},
	statist: {
		label: ["稽核","Operator：","Operation type：","Sort order：","Recent","Earliest","Time frame：","Today","In recent week","In recent month","指定时间段","至","Start time","End time","Query","Export statement",],
		table: ["Operation time","Operation type","Operator","Role of operator","Operation result","Operation result description","Details","Details","Auditor"],
		tips: ['All',"O&M","User",'定时器'],
		popup: ["Export audit information in batch","File name：",'Right-click on the file name and select the "Save Link As ..." menu to save the file.',"Close"],
		serviceID: "Sevice name", result: "result", errinfo: "Operation result description", zone: 'Node name'
	},
	userEdit: {
		label: ["Back","User ID","User name","User type","Region","Speed","(Kbit/s)-1或0:不限速","User contact means","User group","Any offline alarm",
			"Soft encryption start time","Soft encryption end time","Whether to allow sending and receiving files","Maximum number of published topics","Maximum number of subscriptions","Maximum expiration days of topic","Dispatch immediately","Modify ","Back",
			"Create user","使用默认密码","Default","Manual operation ","Password","选择日期时间","Create","Creation time",'Validity period of password :'],
		pwdTime: [{val: "1", txt: "Default"}, {val: "-1", txt: "Never expire"}, {val: "0", txt: "Expire immediately"}],
		tab: ["基本信息", "Ekey", "通信关系", "扩展信息"],
		connect :[
//			{ value: "0", groupID: "Group0" },{ value: "1", groupID: "Group1" },{ value: "2", groupID: "Group2" },{ value: "3", groupID: "Group3" },
//			{ value: "4", groupID: "Group4" },{ value: "5", groupID: "Group5" },{ value: "6", groupID: "Group6" }
		  ],
		online :[{ value: "1", label: "Yes" }, { value: "0", label: "No" }],
		tips: {now:"Dispatch immediately", title:"Modify user", userID:'用户ID不能为空', userName:'用户名称不能为空', userPasswd: "密码必须包含大小写字母、数字、特殊字符(@#-_*)中的两项且8-16位",
			speedCtrlKbps:'速度不能为空', maxPubsCount:'发布主题个数上限不能为空',maxSubsCount:'订阅个数上限不能为空',maxDaysOfTopic:'最大主题过期天数不能为空',
			must:'Must...',onlyNum:'请输入纯数字',errNum:'只能输入纯数字'},
		mustNum: {maxPubsCount:'发布主题个数上限必须为正整数',maxSubsCount:'订阅个数上限必须为正整数',maxDaysOfTopic:'最大主题过期天数必须为正整数',unequalZero: '最大主题过期天数必须大于 0'},
		nameErr: '用户名称不能包含（|$%,";:/\\）', userinfoErr: '用户联系方式信息不能有%', softDay: '软加密开始时间必须小于或等于软加密结束时间'
	},
	password: {
		label: ["Modify password","User ID：","Reset password：","Default","Manual operation ","New password：","Confirm password：","Dispatch immediately","Submit","Back",'Validity period of password ：'],
		pwdTime: [{val: "1", txt: "Default"}, {val: "-1", txt: "Never expire"}, {val: "0", txt: "Expire immediately"}],
		tips: {unlike: '两次输入的密码不一致',pwdRule:'密码必须包含大小写字母、数字、特殊字符(@#-_*)中的两项且大于等于8位',send:'Release immediately?',
			blank:'密码的前后不可以是空白字符',npwd:'新密码不能为空',blank2: '密码不能包含空格'},
		mpwd: 'Modify user password'
	},
	extendIfo:{
		tips:["只能输入数字、'-'、'+'和';'","只能输入数字、'-'和';'","只能输入数字和';'","只能输入数字、'+'和';'","只能输入数字、'+'和';'",
			"只能输入英文、数字、'-'、'_'、'@'和'.'字符","Submit","Back","邮箱格式不对", "不能输入'%'"],
		label:["SMS alarm number：","Fixed phone number of principal：","Mobile phone number of principal：","O&M fax number：","O&M phone number：","e-Mail：","SSCC customer manager："],
		ssccErr: 'SSCC客户经理不能输入%'
	}
};