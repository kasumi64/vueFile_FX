<template>
	<div>
		<div class="pieChart" ref="pie">
			<div class="piece" ref="piece"></div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		var josn = {

		};
		return josn;
	},
	props: {
		bg: { //背景色
			type: String, default: '#AEAEAE'
		},
		fg: {//前景色
			type: String, default: '#0099FF'
		} 
	},
	methods: {
		drawPie(num){ //num: 1~~100之间
			if(num < 0) num = 0;
			else if(num > 100) num = 100;
			var piece = this.$refs['piece'].style;
			if(num > 50){
				piece.backgroundColor = this.fg;
				piece.transform = `rotate(${(num-50)/100}turn)`;
			} else {
				piece.backgroundColor = this.bg;
				piece.transform = `rotate(${num/100}turn)`;
			}
		}
	},
	created() {
		
	},
	mounted() {
		let pie = this.$refs['pie'].style;
		pie.background = this.bg;
		pie.backgroundImage = `linear-gradient(to right, transparent 50%, ${this.fg} 0)`;
	}
}
</script>

<style scoped="scoped">
.pieChart {
	position: relative; width: 82px; height: 82px;
	border-radius: 50%; background: #AEAEAE; overflow: hidden;
	background-image: linear-gradient(to right, transparent 50%, #0099FF 0);
}
.pieChart .piece {
	position: absolute;left: 0;top: 0;width: 100%;height: 100%;
	margin-left: 50%; height: 100%; border-radius: 0 100% 100% 0/50%;
	background-color: inherit; transform-origin: left;
	transform: rotate(0turn);
	/* background: #0099FF; */
}
</style>
