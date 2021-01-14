<template>
  <div class="order">
    <div class="order-item" v-for="item in listData" :key="item.url">
      <img :src="iconURL(item)" alt="" />
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
		iconURL(item) {
			return require(`assets/img/profile/${item.url}`)
		}
	}
};
</script>

<style scoped lang="scss">
.order {
  font-size: 15px;
  color: $text-333;
  background-color: $bg-white;

  .order-item {
		position: relative;
    height: 44px;
		line-height: 44px;

    img {
			position: absolute;
      left: 16px;
      top: 2px;
			@include square(20px);
      margin-top: 10px;
    }

    .info {
      padding-left: 5px;
      border-bottom: 1px solid $border-grey;
      margin-left: 40px;
    }

    &:last-of-type .info {
      border-bottom:0;
    } 
  }
}
</style>
