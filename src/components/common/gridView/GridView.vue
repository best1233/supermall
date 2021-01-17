<template>
  <div class="grid-view" ref="gridView">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "GridView",
  props: {
    cols: {
      // 子元素的列数
      type: Number,
      default: 2
    },
    hMargin: {
      // gridView的左右padding
      type: Number,
      default: 8
    },
    vMargin: {
      // gridView的上下padding
      type: Number,
      default: 8
    },
    itemSpace: {
      // 子元素的margin-right
      type: Number,
      default: 8
    },
    lineSpace: {
      // 子元素的margin-top
      type: Number,
      default: 8
    }
  },
  mounted() {
    setTimeout(this.autoLayout(), 20);
	},
	updated() {
		this.autoLayout();
	},
  methods: {
    autoLayout() {
      // 1. 获取gridView和children
      let gridEl = this.$refs.gridView;
      let children = gridEl.children;
      // 2. 设置gridView的内边距
      gridEl.style.padding = `${this.vMargin}px ${this.hMargin}px`;
      // 3. 计算item的宽度
      /**
       * (gridEl的宽度 - 每一项的左右padding - 除了最后一项的margin-right) / 列数
       */
      let itemWidth = (gridEl.clientWidth - 2 * this.hMargin - (this.cols - 1) * this.itemSpace) / this.cols;
      // console.log(itemWidth);
      for (let i = 0; i < children.length; i++) {
        let item = children[i];
        item.style.width = `${itemWidth}px`;
        /**
         *  (i + 1) 每一项是从1开始的
         *  (i + 1) % this.cols !== 0 当这一项不是这一列的最后一项时，添加样式
         */
        if ((i + 1) % this.cols !== 0) {
					item.style.marginRight = `${this.itemSpace}px`;
				}
				if (i >= this.cols) {
					item.style.marginTop = `${this.lineSpace}px`;
				}
      }
    }
  }
};
</script>

<style scoped lang="scss">
.grid-view {
	display: flex;
	flex-wrap: wrap;
}
</style>
