<template>
  <div class="bottom-bar">
    <div class="bar-item">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div @click="collectClick">
        <i class="icon" :class="{ collect: isCollect }"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy" @click="buyClick">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  data() {
    return {
      isCollect: false
    };
  },
  methods: {
    collectClick() {
      this.isCollect = !this.isCollect;
    },
    addToCart() {
      this.$emit("addCart");
    },
    buyClick() {
      this.$router.push("/shopcart");
    }
  }
};
</script>

<style scoped lang="scss">
.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  text-align: center;
  height: 58px;
  background-color: $bg-white;

  .bar-item {
    display: flex;
    flex: 1;

    > div {
      flex: 1;
    }
    .icon {
      display: block;
      @include square(22px);
      margin: 10px auto 3px;
      background: url("~assets/img/detail/detail_bottom.png") 0 0 / 100%;

      &.service {
        background-position: 0 -54px;
      }
      &.shop {
        background-position: 0 -98px;
      }
      &.collect {
        background-position: 0 -27px;
      }
    }
    .text {
      font-size: 13px;
    }
    &.bar-right {
      font-size: 15px;
      color: $text-white;
      line-height: 58px;

      .cart {
        background-color: $bg-yellow;
        color: $text-333;
      }
      .buy {
        background-color: $bg-pink;
      }
    }
  }
}
</style>
