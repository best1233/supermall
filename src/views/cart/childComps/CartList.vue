<template>
  <div class="cart-list">
    <Scroll class="wrapper" ref="scroll">
      <CartListItem
        v-for="(item, index) in cartList"
        :product="item"
        :index="index"
        :key="index"
      />
    </Scroll>
  </div>
</template>

<script>
import CartListItem from "./CartListItem";

import Scroll from "components/common/scroll/Scroll";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(["cartList"])
  },
  activated() {
    this.$refs.scroll.refresh();
  },
  // methods: {
  //   :isTouchMove="item.isTouchMove"
  //   @touchstart.native="touchStart($event, index)"
  //   @touchmove.native="touchMove($event, index)"
  //   @touchend.native="touchEnd(index)"

  //   ...mapMutations(['cartTouchStart','cartTouchMove','cartTouchEnd']),
  //   touchStart(event,index) {
  //     this.cartTouchStart({
  //       event,
  //       index
  //     });
  //   },
  //   touchMove(event,index) {
  //     this.cartTouchMove({
  //       event,
  //       index
  //     });
  //   },
  //   touchEnd(index) {
  //     this.cartTouchEnd(index);
  //     this.$forceUpdate();
  //   }
  //   // 购物车左滑事件
  //   // touchStart(e, idx) {
  //   //   this.cartList.forEach(item => {  
  //   //     if (item.isTouchMove) {
  //   //       item.isTouchMove = false;
  //   //     }
  //   //   });
  //   //   this.cartList[idx].startx = e.targetTouches[0].clientX;
  //   //   this.cartList[idx].endx = 0;
  //   // },
  //   // touchMove(e, idx) {
  //   //   this.cartList[idx].endx = e.targetTouches[0].clientX;
  //   // },
  //   // touchEnd(idx) {
  //   //   //结束的坐标点大于开始的坐标点，认为用户已经从左往右滑动了屏幕
  //   //   if (this.cartList[idx].endx == 0) return;
  //   //   if (this.cartList[idx].startx > this.cartList[idx].endx) {
  //   //     this.cartList[idx].isTouchMove = true;
  //   //   } else {
  //   //     this.cartList[idx].isTouchMove = false;
  //   //   }
  //   //   this.$forceUpdate(); //强制刷新
  //   // }
  // }
};
</script>

<style scoped lang="scss">
.cart-list {
  position: relative;
  height: calc(100% - 44px - 49px - 44px);

  .wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  }
}
</style>
