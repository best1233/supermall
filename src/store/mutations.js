import Vue from 'vue';

export default {
  // mutations唯一的目的就是修改修改state中的状态
  // mutations中的每个方法尽可能完成的事件比较单一一点
  addCounter(state, payload) {
    payload.count++;
	},
	addToCart(state,payload) {
		payload.checked = true;
		state.cartList.push(payload);
		payload.count = 1;
	},
	/**
	 * cartList中的每一项的选中与不选中
	 */
	selectItem(state, index) {
		state.cartList[index].checked = !state.cartList[index].checked;
		localStorage.setItem('cartList',JSON.stringify(state.cartList));
	},
	/**
	 * cartList中的每一项的删除
	 */
	deleteItem(state,index) {
		state.cartList.splice(index,1); // 数组的方法是响应式的
		localStorage.setItem('cartList', JSON.stringify(state.cartList));
	},


	/**
	 * cartList中的每一项的count的更新
	 */
	updateProduct(state,{ index, value }) {
		// 注意：根据索引更改不是响应式的
		// state.cartList[index].count = value;
		Vue.set(state.cartList[index], 'count', value);
		localStorage.setItem('cartList', JSON.stringify(state.cartList));
	},
	/**
	 * 用来更改全选(checked)的状态 
	 */
	allSelect(state,payload) {
		state.cartList.forEach(item => item.checked = payload)
	},


	/**
	 * 购物车滑动删除
	 */
	// cartTouchStart(state, { event, index }) {
	// 	state.cartList.forEach(item => {
	// 		if (item.isTouchMove) {
	// 			item.isTouchMove = false;
	// 		}
	// 	});
	// 	state.cartList[index].startx = event.targetTouches[0].clientX;
	// 	state.cartList[index].endx = 0;
	// },
	// cartTouchMove(state, {index, event}) {
	// 	state.cartList[index].endx = event.targetTouches[0].clientX;
	// },
	// cartTouchEnd(state,index) {
	// 	//结束的坐标点大于开始的坐标点，认为用户已经从左往右滑动了屏幕
	// 	if (state.cartList[index].endx == 0) return;
	// 	if (state.cartList[index].startx > state.cartList[index].endx) {
	// 		state.cartList[index].isTouchMove = true;
	// 	} else {
	// 		state.cartList[index].isTouchMove = false;
	// 	}
	// }
};
