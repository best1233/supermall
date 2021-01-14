<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      v-for="(item, index) in titles"
      :key="item"
      :class="{ active: currentIndex === index }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    }
  }
};
</script>

<style scoped lang="scss">
.tab-control {
  display: flex;
  height: 40px;
	line-height: 40px;
	font-size:15px;
  text-align: center;
  background-color: $bg-white;

  .tab-control-item {
    flex: 1;

    span {
      padding: 5px;
    }

    &.active span {
      color: $main-color;
      border-bottom: 3px solid $main-color;
    }
  }
}
</style>
