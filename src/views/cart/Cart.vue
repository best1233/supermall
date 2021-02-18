<template>
	<div id="cart">
		<!-- 导航 -->
		<NavBar class="nav-bar">
			<template #center>购物车({{ cartLength }})</template>
		</NavBar>
		<!-- 商品的列表 -->
		<CartList />
		<!-- 底部汇总 -->
		<CartBottomBar />
	</div>
</template>

<script>
	import CartList from './childComps/CartList';
	import CartBottomBar from './childComps/CartBottomBar';

	import NavBar from 'components/common/navbar/NavBar';
	import { mapGetters } from 'vuex';

	export default {
		name:'Cart',
		components: {
			CartList,
			CartBottomBar,

			NavBar
		},
		computed: {
			...mapGetters(['cartLength'])
		},
	}
</script>

<style scoped lang="scss">
#cart {
	height: 100vh;

	.nav-bar {
		color: $text-white;
		background-color: $bg-tint;
	}
}
</style>