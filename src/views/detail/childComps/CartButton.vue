<template>
	<div class="cart-btn">
		<img src="~assets/img/detail/cart.png" alt="">
	</div>
</template>

<script>
	export default {
		name: 'CartButton'
	}
</script>

<style scoped lang="scss">
.cart-btn img {
	position: fixed;
	right: 5px;
	bottom: 110px;
	z-index: 9;
	@include square(45px);
}
</style>