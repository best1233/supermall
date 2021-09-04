<template>
	<div class="cart-bottom-bar">
		<CheckButton class="select-all" :isChecked="isSelectAll" @click.native="checkClick" />
		<span>全选</span>
		<span class="total-price">合计: {{ totalPrice }}</span>
		<span class="buy-product" @click="calcClick">去计算({{ checkLength }})</span>
	</div>
</template>

<script>
	import CheckButton from 'components/content/checkButton/CheckButton';

	import { mapGetters, mapActions } from 'vuex';
	export default {
		name:'CartBottomBar',
		components: {
			CheckButton
		},
		computed: {
			...mapGetters(['cartLength','totalPrice','checkLength','isSelectAll'])
		},
		methods: {
			...mapActions(['allSelect']),
			checkClick() {
				this.allSelect();
			},
			calcClick() {
				if (this.cartLength === 0) {
          this.$toast.show('您还未购买商品');
        } else if (this.checkLength === 0) {
					this.$toast.show('您未选中购买的商品');
				}else {
          this.$toast.show(`商品总计为:${this.totalPrice}`);
        }
			}
		}
	}
</script>

<style scoped lang="scss">
.cart-bottom-bar {
	position: fixed;
	left:0;
	bottom:49px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	@include size(100%,44px);
	line-height: 44px;
	padding-left:35px;
	background-color: $bg-eee;
	font-size: 14px;
	box-shadow: 0 -2px 3px $border-blacked;
	color: $text-888;

	.select-all {
		position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
	}
	.total-price {
		margin-left: 15px;
    font-size: 16px;
		color: $text-666;
	}
	.buy-product {
		@include size(100px,44px);
    line-height: 44px;
    color: $text-white;
		background-color: $bg-orangered;
    text-align: center;
	}
}
</style>
