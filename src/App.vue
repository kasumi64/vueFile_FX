<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
	export default {
		name: 'App'
	};

</script>

<style>
	/*::-webkit-scrollbar { display: block; }*/
	#app,body,html{ width: 100%; height: 100%; overflow: hidden;}
</style>