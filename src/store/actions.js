export default {
	addCart({ state, commit },payload) {
		return new Promise((resolve,reject) => {
			// 1. 判断之前数组中是否有该商品
			let oldProduct = state.cartList.find(item => item.iid === payload.iid);
			// 2. 如果添加的商品存在，那么count++，否则添加该商品
			if (oldProduct) {
				commit('addCounter', oldProduct);
				resolve('当前商品数量 +1');
			} else {
				commit('addToCart', payload);
				resolve('添加了新的商品');
			}
			localStorage.setItem('cartList',JSON.stringify(state.cartList));
		})
	},
	/**
	 * 全选按钮的选中与不选中
	 */
	allSelect({commit, state, getters}) {
		// 如果cartList的所有项全部选中，那么点击后全部不选中
		if (getters.isSelectAll) {
			commit('allSelect', false);
		} else { // 如果cartList的所有项 部分或全部不选中,那么点击后全部选中
			commit('allSelect', true);
		}
		localStorage.setItem('cartList', JSON.stringify(state.cartList));
	},
}
