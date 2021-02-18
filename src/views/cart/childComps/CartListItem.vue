<template>
  <!-- :class="{ 'touch-move-active' : product.isTouchMove }" -->
  <div class="cart-list-item">
    <div class="content">
      <div class="item-selector">
        <CheckButton :isChecked="product.checked" @click.native="checkClick" />
      </div>
      <div class="item-img">
        <img :src="product.image" alt="商品名称" />
      </div>
      <div class="item-info">
        <div class="item-title">{{ product.title }}</div>
        <div class="item-desc">商品描述: {{ product.desc }}</div>
        <div class="info-bottom">
          <div class="item-price">¥{{ product.price }}</div>
          <InputNumber class="item-count" :counter="product.count" @numChange="changeCount" @deleteItem="deleteClick" />
        </div>
      </div>
    </div>
    <!-- <div class="del" @click="deleteClick">删除</div> -->
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import InputNumber from "components/content/inputNumber/InputNumber";

import { mapMutations } from 'vuex';

export default {
  name: "CartListItem",
  components: {
    CheckButton,
    InputNumber
	},
  props: {
    product: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    },
		// isTouchMove: { // 是否显示删除
		// 	type:Boolean,
		// 	default: false
		// }
	}, 
  watch: {
    "product.count": {
      immediate: true,
      handler(val) {
        this.$forceUpdate();
      }
    }
  },
	methods: {
		...mapMutations(['selectItem','deleteItem','updateProduct']),
		checkClick() {
      this.selectItem(this.index);
    },
    deleteClick() {
      const isConfirm = window.confirm(`你确定要删除${this.product.title}吗?`);
      if (isConfirm) {
        this.deleteItem(this.index);
      }
    },
    changeCount(val) {
      this.updateProduct({
        index: this.index,
        value: val
      });
    }
	}
};
</script>

<style scoped lang="scss">
.cart-list-item {
	display: flex;

  .content {
    display: flex;
    width: 100%;
    padding: 5px;
    border-bottom: 1px solid $border-ccc;
    // transition: all 0.4s;
		// transform: translateX(80px);
		// margin-left:-80px;

    .item-selector {
      display: flex;
      align-items: center;
      // width:14%;
    }
    .item-img {
      padding: 5px;

      img {
        @include square(80px);
        border-radius: 5px;
      }
    }
    .item-info {
      position: relative;
      padding: 5px 10px;
      color: $text-333;
      font-size: 17px;
      overflow: hidden;

      .item-title,
      .item-desc {
        @include text-ellipsis;
      }
      .item-desc {
        color: $text-666;
        font-size: 14px;
        margin-top: 15px;
      }
      .info-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;

        .item-price {
          color: $text-orangered;
        }
      }
    }
  }
  // .del {
  //   background-color: $bg-tint;
  //   width: 90px;
  //   display: flex;
  //   flex-direction: column;
  //   align-items: center;
  //   justify-content: center;
  //   color: $text-white;
  //   transform: translateX(80px);
  //   transition: all 0.4s;
	// }
	
	// 	&.touch-move-active .content,
	// 	&.touch-move-active .del {
	// 	transform: translateX(0);
	// }
}
</style>
