<template>
  <div class="shop-info" v-if="Object.keys(shop).length !== 0">
    <div class="shop-top">
			<img :src="shop.logo" alt="" />
			<span>{{ shop.name }}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">{{ shop.sells | sellCountFilter }}</div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">{{ shop.goodsCount }}</div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="item in shop.score" :key="item.name">
            <td>{{ item.name }}</td>
            <td class="score" :class="{ 'score-better': item.isBetter }">
              {{ item.score }}
            </td>
            <td class="score" :class="{ 'score-better': item.isBetter }">
              <span>{{ item.isBetter ? "高" : "低" }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default: () => {}
    }
  },
  filters: {
    sellCountFilter(value) {
      if (value < 10000) return value;
      return (value / 10000).toFixed(1) + "万";
    }
  }
};
</script>

<style scoped lang="scss">
.shop-info {
  padding: 25px 8px;
  border-bottom: 5px solid $border-lighter;

  .shop-top {
    display: flex;
    align-items: center;
    line-height: 45px;

    img {
      @include square(45px);
      border-radius: 50%;
      border: 1px solid $border-grey;
    }
    span {
      margin-left: 10px;
    }
  }
  .shop-middle {
    display: flex;
    align-items: center;
    margin-top: 15px;

    .shop-middle-item {
      flex: 1;

      .sells-count,
      .goods-count {
        font-size: 18px;
      }
      .sells-text,
      .goods-text {
        font-size: 12px;
        margin-top: 10px;
      }
      &.shop-middle-left {
        display: flex;
        justify-content: space-evenly;
        text-align: center;
        color: $text-333;
        border-right: 1px solid $border-black;
      }
      &.shop-middle-right {
        font-size: 13px;
        color: $text-333;

        table {
          width: 120px;
          margin-left: 30px;

          td {
            padding: 5px 0;
          }
				}
        .score {
          color: $text-green;

          span {
            background-color: $bg-green;
            color: $text-white;
            text-align: center;
          }

          &.score-better {
            color: $text-red;
            span {
              background-color: $bg-red;
            }
          }
        }
      }
    }
  }
  .shop-bottom {
    text-align: center;
    margin-top: 10px;

    .enter-shop {
      @include size(150px, 30px);
      display: inline-block;
      line-height: 30px;
      text-align: center;
      border-radius: 10px;
      background-color: $bg-shop;
      font-size: 14px;
    }
  }
}
</style>
