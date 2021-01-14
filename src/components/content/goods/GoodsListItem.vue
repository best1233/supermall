<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad" />
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
  },
  computed: {
    // 因为this.goodsItem.show如果不存在，那么访问一个undefined上的一个属性会报错，
    // 所以需要将this.goodsItem.show.img放到最后
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img;
    }
  },
  methods: {
    // 监听图片加载完成
    imageLoad() {
      this.$bus.$emit('itemImageLoad');
    },
    itemClick() {
      // 如果是详情页内的推荐图片，不跳转
      if (this.goodsItem.image) return; 
      // this.$router.push(`/detail/${this.goodsItem.iid}`);
      this.$router.push({
        name: 'Detail',
        params: {
          iid: this.goodsItem.iid
        },
        // query: {
        //   iid: this.goodsItem.iid
        // }
      });
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
    color: $main-color;
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
