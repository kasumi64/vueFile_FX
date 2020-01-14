<template>
	<div class="monitoring">
		<header>
			<span>{{$t('webu.monitoring.sys')}}</span>
			<span class="err">{{$t('webu.monitoring.err')}}</span>
		</header>
		<div>
			<ul class="userData">
				<li>
					<div class="head">
						<span class="title">Web用户数据</span>
						<button @click="goto('webUser')" class="blueBtn smallBtn">查看详细</button>
					</div>
					<div class="grid">
						<div class="center">
							<div>
								<span class="labelTxt in">在线</span>
								<span class="labelTxt out">离线</span>
							</div>
							<piechart ref="pie" class="pie"></piechart>
							<p class="labelTxt">web用户在线率80.33%</p>
						</div>
						<div class="center">
							<p class="labelTxt">配置用户数</p>
							<p class="arial jiange">78552</p>
							<p class="labelTxt">在线用户数</p>
							<p class="arial">788555</p>
						</div>
						<article class="line"></article>
					</div>
				</li>
				<li>
					<div class="head">
						<span class="title">Web文件传输情况</span>
						<button @click="goto('webFile')" class="blueBtn smallBtn">查看详细</button>
					</div>
					<div class="grid">
						<div class="center">
							<img class="fileImg" src="" alt="图片">
							<p class="labelTxt">今日收文件数</p>
							<p class="arial">458671</p>
						</div>
						<div class="center">
							<img class="fileImg" src="" alt="图片">
							<p class="labelTxt">今日文件数</p>
							<p class="arial">458671</p>
						</div>
						<article class="line"></article>
					</div>
				</li>
				<li>
					<div class="head">
						<span class="title">Nginx统计</span>
						<button class="blueBtn smallBtn">查看详细</button>
					</div>
					<div class="grid">
						<div class="center">
							<img class="NginxImg" src="" alt="图片">
						</div>
						<div class="center">
							<p class="labelTxt">当前nginx连接数</p>
							<p class="arial jiange">78552</p>
							<p class="labelTxt">已处理nginx连接数</p>
							<p class="arial">788555</p>
						</div>
						<article class="line"></article>
					</div>
				</li>
			</ul>
		</div>
		<div class="apply">
			<div class="head">
				<span class="title">Nginx统计</span>
			</div>
			<ul class="ul">
				<li>
					<div>
						<img class="icon" src="" alt="icon">
					</div><div>
						<p class="red">webstation01</p>
						<p class="">webstation02</p>
					</div>
				</li><li>
					<div>
						<img class="icon" src="" alt="icon">
					</div><div>
						<p class="">redis01</p>
						<p class="red">redis02</p>
					</div>
				</li><li>
					<div>
						<img class="icon" src="" alt="icon">
					</div><div>
						<p class="">keeplive01</p>
						<p class="">keeplive02</p>
					</div>
				</li><li>
					<div>
						<img class="icon" src="" alt="icon">
					</div><div>
						<p class="">nginx01</p>
						<p class="">nginx02</p>
					</div>
				</li><li>
					<div>
						<img class="icon" src="" alt="icon">
					</div><div>
						<p class="">squid01</p>
						<p class="">squid02</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import utils from '@/fbcsFxViews/libs/utils.js';
import piechart from '@/webU/view/realTime/pieChart.vue';

var _this;
var a=0;
export default {
	data() {
		var josn = {

		};
		return josn;
	},
	methods: {
		goto(url){
			let path = '/main/webu/statistic/' + url;
			this.$router.push({path});
			utils.emit('webuSidebar', path);
		}
	},
	created() {
		_this = this;
	},
	mounted() {
		drawPie(kit.randomNum(20, 80))
	},
	components: { piechart }
}

function drawPie(num){
	var pie = _this.$refs['pie'];
	if(!pie) return;
	pie.drawPie(num);
}

function search() {}
</script>

<style scoped="scoped">
	.monitoring{min-width: 1140px;padding-right: 20px;height: 100%;}
	header{font-size: 16px;color: #303133;margin-bottom: 10px;}
	.err{color: red;}
	.userData{ /* fraction */
		display: grid; margin-bottom: 20px; grid-gap: 20px; grid: repeat(1, 200px) / repeat(3, 1fr);background: #FFF;
	}
	.userData li{border: 1px solid #E4E4E4;display: inline-block;min-width: 360px;overflow: hidden;padding: 0 20px;}
	.head{height: 40px;border-bottom: 1px solid #E4E4E4;}
	.title{font-size: 14px;line-height: 40px;}
	#webu .smallBtn{position: absolute;top: 8px;right: 0;min-width: 68px;height: 24px;line-height: 24px;}
	
	.userData .grid{ display: grid;grid: repeat(1, auto) / repeat(2, 1fr); padding-top: 14px; }
	.center{text-align: center;}
	.labelTxt{font-size: 12px;color: #333;line-height: 24px;}
	.in, .out{text-indent: 30px;line-height: 17px;}
	.in{margin-right: 20px;}
	.in::before, .out::before{content: '';position: absolute;left: 0;background: #0099FF;width: 24px;height: 17px;}
	.out::before{background: #AEAEAE;}
	.pie{display: inline-block; margin: 2px 0 4px;}
	.line{position: absolute;width: 1px;height: 105px;border: none;background: #E4E4E4;left: 50%;top: 28px;}
	
	.arial{font-family: Arial;font-size: 22px;}
	.jiange{margin-bottom: 20px;}
	.fileImg{display: inline-block;width: 50px;height: 50px;margin-bottom: 10px;border: 1px solid #E5EAF0;}
	.NginxImg{width: 76px;}
	
	.apply{border: 1px solid #E4E4E4;padding: 0 20px;background: #FFF;}
	.apply .ul{display: grid; grid: repeat(2, 146px) / repeat(4, 1fr);align-items: center;padding-left: 30px;}
	.apply li{font-size: 14px;color: #333;}
	.apply li > div{vertical-align: middle;display: inline-block;}
	.apply .icon{display: block;width: 50px;height: 42px;border: 1px solid #E5EAF0;margin-right: 20px;}
</style>
