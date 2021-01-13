<template>
  <div class="order">
    <div class="order-item" v-for="item in listData" :key="item.url">
      <img :src="showUrl(item)" alt="" />
      <div class="info">{{ item.info }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListView",
  props: {
    listData: {
      type: Array,
      default: () => []
    }
	},
	methods: {
    // 拼接完整的路径
		showUrl(item) {
			return require(`assets/img/profile/${item.url}`)
		}
	}
};
</script>

<style scoped lang="scss">
.order {
  background-color: $color-white;
  font-size: 15px;
  color: #333;

  .order-item {
    height: 44px;
		line-height: 44px;
		position: relative;

    img {
			position: absolute;
      left: 16px;
      top: 2px;
			@include square(20px);
      margin-top: 10px;
    }

    .info {
      margin-left: 40px;
      border-bottom: 1px solid rgba(100, 100, 100, 0.1);
      padding-left: 5px;
    }
  }
}
</style>
