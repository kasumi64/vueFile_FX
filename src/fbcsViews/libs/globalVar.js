var vars = {};
vars.lang = 'zh';
vars.loadTime = 0.5;
vars.status = {};
vars.debug = false;

//vars.urlIP = 'http://10.10.27.161:8080/fbcs_mx/';    // vdi内网
//vars.urlIP = 'http://10.10.27.160:8081/fdep/';    // vdi内网 运维
//vars.urlIP = 'http://10.10.218.30:8080/fbcs_mx/';    // 路曼
//vars.urlIP = 'http://10.10.218.22:8080/fbcs_mx/';	// 曼萍 
//vars.urlIP = 'http://10.10.27.242:9090/fbcs_mx/';	//测试组
vars.urlIP = '/fbcs_mx/';    // 上生产技术运维平台nginx

//vars.nginxIP = 'http://10.10.27.201:8088/';				//技术运维平台
//vars.login =   'http://10.10.27.201:8088/fmp/#/login';	//登陆
vars.nginxIP = '/';					//技术运维平台 /usr/local/nginx/html/fbcs
vars.login =   '/#/login';		//登陆
		


export default {
	set(key, val){vars[key] = val;},
	get(key){ return vars[key]; }
};
/**
 * lang         语言
 * urlIP        请求的IP地址
 * loadTime     全局接口请求的等待时间
 * status		系统操作权限
 * debug		是否为开发测试用
 */