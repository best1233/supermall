import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css';

import Toast from 'components/common/toast';
import FastClick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';


Vue.config.productionTip = false


// 非父子组件通信，添加事件总线
Vue.prototype.$bus = new Vue();
/* 
  this.$bus.$emit('事件名称','参数');
  this.$bus.$on('事件名称',回调函数(参数))
  this.$bus.$off('事件名称', 回调函数)
*/

// 安装toast插件
Vue.use(Toast);

// 解决移动端点击300ms的延迟
FastClick.attach(document.body);

// 使用图片懒加载插件
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
