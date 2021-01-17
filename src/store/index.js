import Vue from "vue";
import Vuex from "vuex";

import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

// 1.安装插件
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

const state = {
  cartList: localStorage.getItem('cartList') ? JSON.parse(localStorage.getItem("cartList")) : []
};

// 2.创建store对象
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: debug
});

// 3.导出，挂载到vue实例上
export default store;
