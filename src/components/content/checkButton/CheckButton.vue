<template>
	<div class="check-button" :class="{checked : isChecked }">
		<img src="~assets/img/cart/tick.svg" alt="">
	</div>
</template>

<script>
	export default {
		name:'CheckButton',
		props: {
			isChecked: {
				type: Boolean,
				default:false
			}
		}
	}
</script>

<style scoped lang="scss">
.check-button {
	display: flex;
	justify-content: center;
	align-items: center;
	@include square(18px);
  border-radius: 50%;
  border: 2px solid $border-ccc;
	cursor: pointer;
	
	img {
		@include square(12px);
	}
	
	&.checked {
		background-color: $bg-tint;
    border-color: $border-tint;
	}
}
</style>