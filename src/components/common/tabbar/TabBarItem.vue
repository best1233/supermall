<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: {
      type: String,
      default: "/home",
    },
    activeColor: {
      type: String,
      default: "#ff5777",
    },
  },
  computed: {
    isActive() {
      return this.$route.path.includes(this.path);
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    },
  },
};
</script>

<style scoped lang="scss">
.tab-bar-item {
  flex: 1;
  height: 49px;
  text-align: center;
  font-size: 14px;
  img {
    width: 24px;
    height: 24px;
    margin: {
      top: 3px;
      bottom: 2px;
    }
    vertical-align: middle;
  }
}
</style>
