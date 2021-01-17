<template>
	<GridView :cols="3" :lineSpace="15" :v-margin="20" v-if="subCategories.length">
		<div class="item" v-for="(item,index) in subCategories" :key="index">
			<a :href="item.link">
				<img class="item-img" :src="item.image" alt="">
				<div class="item-text">{{ item.title }}</div>
			</a>
		</div>
	</GridView>
</template>

<script>
	import GridView from 'components/common/gridView/GridView';
	export default {
		name:'TabContentCategory',
		components: {
			GridView
		},
		props: {
			subCategories:{
				type: Array,
				default: () => []
			}
		}
	}
</script>

<style scoped lang="scss">
.item {
	font-size:12px;
	text-align: center;
	
	.item-img {
		width:80%;
	}
	.item-text {
		margin-top:15px;
	}
}
</style>