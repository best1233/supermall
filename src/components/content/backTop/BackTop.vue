<template>
	<div class="back-top">
		<img src="~assets/img/common/top.png" alt="">
	</div>
</template>

<script>
	export default {
		name:'BackTop'
	}
</script>

<style scoped lang="scss">
	.back-top {
		position:fixed;
		right:8px;
		bottom:55px;

		img {
			@include square(43px);
		}
	}
</style>