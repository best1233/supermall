export default {
  cartList(state) {
    return state.cartList;
  },
  cartLength(state, getters) {
    return getters.cartList.length;
  },
  totalPrice(state) {
    return ("¥" + state.cartList
      .filter(item => item.checked)
      .reduce((preValue, item) => {
        return preValue + item.price * item.count;
      }, 0)
      .toFixed(2)
    );
  },
  checkLength(state) {
    return state.cartList.filter(item => item.checked).length;
  },
  /**
   * 是否全部选中
   *
   * !item.checked  不选中
   * 如果有不选中的就返回 true 取反变成 false
   * 全部选中返回false 取反变成 true
   */
  isSelectAll(state,getters) {
    if (getters.cartLength === 0) return false;
    return !state.cartList.find(item => !item.checked);
  }
  // 1. 使用filter
  // return !(this.cartList.filter(item => !item.checked).length);

  // 2.使用find

  // 3.普通遍历
  // for(const item of this.cartList) {
  //   if(!item.checked) {
  //     return false;
  //   }
  // }
  // return true;
};
