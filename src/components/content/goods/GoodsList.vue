<template>
	<div class="goods">
		<GoodsListItem v-for="(item,i) in goods" :key="i" :goodsItem="item" />
	</div>
</template>

<script>
	import GoodsListItem from './GoodsListItem';
	export default {
		name:'GoodsList',
		components: {
			GoodsListItem
		},
		props: {
			goods: {
				type:Array,
				default: () => []
			}
		}
	}
</script>

<style scoped lang="scss">
	.goods {
		display:flex;
		flex-wrap:wrap;
		justify-content: space-evenly;
	}
</style>