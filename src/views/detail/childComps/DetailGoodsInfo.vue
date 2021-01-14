<template>
	<div class="goods-info" v-if="Object.keys(goodsInfo).length !== 0">
		<div class="info-desc">
			<div class="start"></div>
			<div class="desc">{{ goodsInfo.desc }}</div>
			<div class="end"></div>
		</div>
		<div class="info-key">{{ goodsInfo.key }}</div>
		<div class="info-list">
			<img :src="item" alt="" v-for="item in goodsInfo.list" :key="item" @load="imgLoad">
		</div>
	</div>
</template>

<script>
	export default {
		name: 'DetailGoodsInfo',
		props: {
			goodsInfo: {
				type:Object,
				default: () => {}
			}
		},
		data() {
			return {
				counter: 0,
				imagesLength: 0
			}
		},
		methods: {
			// 判断所有的图片都加载完了，那么进行一次回调就可以了
			imgLoad() {
				if (++this.counter === this.imagesLength) {
					this.$emit('detailImageLoad');
				}
			}
		},
		watch: {
			// 监听goodsInfo的变化,将imagesLength赋值为图片的总个数，避免调用多次
			goodsInfo() {
				this.imagesLength = this.goodsInfo.list.length;
			}
		}
	}
</script>

<style scoped lang="scss">
.goods-info {
	padding: 20px 0;
	border-bottom: 5px solid $border-lighter;

	.info-desc {
		padding: 0 15px;
		display: flex;
		flex-direction: column;

		.start,
		.end {
			position: relative;
			@include size(90px,1px);
			background-color: $bg-grey;

			&:before {
				content: '';
				position: absolute;
				bottom:0;
				@include square(5px);
				background-color: $bg-333;
			}
		}
		.end {
			align-self: flex-end;

			&::before {
				right:0;
			}
		}
		.desc {
			text-indent: 90px;
		}
	}
	.info-key {
		margin: 10px 0 10px 15px;
		color: $text-333;
		font-size:15px;
	}
	.info-list img {
		width:100%;
	}
}
</style>