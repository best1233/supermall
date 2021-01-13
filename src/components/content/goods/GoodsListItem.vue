<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style scoped lang="scss">
.goods-item {
  position: relative;
  width: 48%;
  padding-bottom: 40px;

  img {
    width: 100%;
    border-radius: 5px;
  }
}
.goods-info {
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  font-size: 12px;
  text-align: center;

  p {
    @include text-ellipsis;
    margin-bottom: 3px;
  }
  .price {
    color: $color-high-text;
    margin-right: 20px;
  }
  .collect {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      left: -14px;
      top: -1px;
      @include square(14px);
      background: url(~assets/img/common/collect.svg) 0 0 / cover;
    }
  }
}
</style>
