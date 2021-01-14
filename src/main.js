import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css';


Vue.config.productionTip = false


// 非父子组件通信，添加事件总线
Vue.prototype.$bus = new Vue();
/* 
  this.$bus.$emit('事件名称','参数');
  this.$bus.$on('事件名称',回调函数(参数))
  this.$bus.$off('事件名称', 回调函数)
*/


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
