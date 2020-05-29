<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
	localStorage.setItem('authoritys', 'Auth_Fx_Config_Opt;Auth_Mx_Config_Opt');
	export default {
		name: 'App'
	};

</script>

<style>
	/*::-webkit-scrollbar { display: block; }*/
	#app,body,html{ width: 100%; height: 100%; overflow: hidden;}
</style>