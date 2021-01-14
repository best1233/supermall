<template>
  <!-- 如果是空对象，那么不渲染 -->
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
    <div class="info-title">{{ goods.title }}</div>
    <!-- 商品价格 -->
    <div class="info-price">
      <span class="new-price">{{ goods.newPrice }}</span>
      <span class="old-price" v-if="goods.oldPrice">{{ goods.oldPrice }}</span>
      <span
        class="discount"
        :style="{ backgroundColor: goods.discountBgColor }"
        v-if="goods.discountDesc"
        >{{ goods.discountDesc }}</span
      >
    </div>
    <div class="info-other">
      <div>{{ goods.columns[0] }}</div>
      <div>{{ goods.columns[1] }}</div>
      <div>{{ goods.services[goods.services.length - 1].name }}</div>
    </div>
    <div class="info-services">
      <!-- v-for可以遍历数字，遍历出来是1-10，所以取值的时候需要减一 -->
      <span
        class="info-servies-item"
        v-for="index in infoServices.length - 1"
        :key="index"
      >
        <img :src="infoServices[index - 1].icon" alt="" />
        <span>{{ infoServices[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
		// 商品服务的过滤处理
    infoServices() {
			return this.goods && this.goods.services.filter(item => item.name !== "延误必赔" && item.icon !== "");
    }
  }
};
</script>

<style scoped lang="scss">
.base-info {
  padding: 0 8px;
  border-bottom: 5px solid $border-lighter;
  margin-top: 15px;
  color: $text-999;

  .info-title {
    color: $text-222;
  }
  .info-price {
    margin-top: 10px;

    .new-price {
      font-size: 24px;
      color: $main-color;
    }
    .old-price {
      font-size: 13px;
      margin-left: 5px;
      text-decoration: line-through;
    }
    .discount {
      /*让元素上浮一些: 使用相对定位即可*/
      position: relative;
      top: -8px;
      padding: 2px 5px;
      border-radius: 8px;
      margin-left: 5px;
      font-size: 12px;
      color: $text-white;
      background-color: $main-color;
    }
  }
  .info-other {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid $border-grey;
    margin-top: 15px;
    line-height: 30px;
    font-size: 13px;
  }
  .info-services {
    display: flex;
    justify-content: space-between;
    line-height: 60px;

    .info-servies-item {
      img {
        position: relative;
        // top: 2px;
        @include square(14px);
      }

      span {
        font-size: 13px;
        color: $text-333;
      }
    }
  }
}
</style>
