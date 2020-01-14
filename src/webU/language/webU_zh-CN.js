var obj = {
	monitoring: {
		sys: '系统状态：', err: '异常'
	},
	table: {
		userID: '用户ID', userName: '用户名', online: '用户状态',  lock: '锁定状态',site: '登入站点', ip: '用户IP',
		phone: '电话号码', login:'上线时间', logout:'下线时间', 
	},
	btn: {
		query:'查询', exported: '导出', cancel: '取消', close: '关闭', submit: '提交'
	},
	com: {
		id: '用户ID:', name: '用户名:', ip: '用户IP:'
	},
	webUser: {
		title: '用户统计', userInfo: '用户信息', endUser: '对端用户', tlock: '锁定状态',
		ID: '用户ID:', name: '用户名:', online: '用户状态:', site: '登入站点:', IP: '用户IP:',
		phone: '电话号码:', login:'上线时间:', logout:'下线时间:', lockTime: '锁定时间:', lock: '锁定状态:'
	},
	webFile: {
		title: 'Web文件传输情况', beginDate: '开始日期:', endDate: '结束日期:', placeholder: '选择日期',
		day30: '近30天', tips: '可查询最近60天数据',
		all: '汇总用户数', aReceive: '收成功总数', aSend: '发成功总数' , areSize: '收成功总大小', aseSize: '发成功总大小',
		receive: '收成功数', send: '发成功数' , reSize: '收成功大小', seSize: '发成功大小',
	},
	fileSendDetail: {
		title: '汇总用户业务量统计详细信息',
	},
	historyLlogin: {
		title: '历史登录信息',
	}
};
module.exports = {webu: obj};
