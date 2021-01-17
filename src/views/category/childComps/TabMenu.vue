<template>
	<!-- 当categories发生改变时，执行refresh -->
  <Scroll class="tab-menu" :data="categories">
    <div class="menu-list">
      <div
        class="menu-list-item"
        v-for="(item, index) in categories"
        :key="item.maitKey"
				:class="{ active : currentIndex === index}"
				@click="itemClick(index)"
      >
        {{ item.title}}
      </div>
    </div>
  </Scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
export default {
  name: "TabMenu",
  components: {
    Scroll
  },
  props: {
    categories: {
      type: Array,
      default: () => []
    }
	},
	data() {
		return {
			currentIndex: 0
		}
	},
	methods: {
		itemClick(index) {
			this.currentIndex = index;
			this.$emit('selectItem', index);
		}
	}
};
</script>

<style scoped lang="scss">
.tab-menu {
	@include size(100px,100%);
	background-color: $bg-lighter;

	.menu-list-item {
		height: 45px;
		line-height: 45px;
		text-align: center;
		font-size:14px;

		&.active {
			border-left: 3px solid $main-color;
			font-weight:700;
			color: $main-color;
			background-color: $bg-white;
		}
	}
}
</style>
