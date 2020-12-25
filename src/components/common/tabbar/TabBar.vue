<template>
	<div id="tab-bar">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name:'TabBar'
	}
</script>

<style scoped lang="scss">
#tab-bar {
	position:fixed;
	bottom:0;
	width:100%;
	background-color: #f6f6f6;
	display: flex;
}
</style>