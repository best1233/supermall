import Vue from 'vue'
import Vuex from 'vuex'

// 1.安装插件
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

// 2.创建store对象
const store = new Vuex.Store({
  state: {
    
  },
  mutations: {},
  actions: {},
  strict: debug
});

export default store;
