# supermall

> 学习coderwhy的商城项目,如果觉得不错，或者对你有帮助，点一个star~ 

## 知识点总结

## 项目开发

### 一. 划分目录结构

* 1.1 引用了两个css文件
* 1.2 vue.config.js和.editorconfig


### 二. 项目的模块划分: tabbar -> 路由映射关系
* 独立组件封装 TabBar -> TabBarItem -> MainTabBar

## 首页开发

### 一、navbar 的封装

* slot

### 二、网络数据的请求 

* 单独在services下创建 home.js, 进行请求的单独处理

### 三、轮播图 

* 对已有组件再次进行封装 HomeSwiper

### 四、推荐信息 

* 一张图片也写成一个单独的组件 RecommendView

### 五、FeatureView
* 独立组件封装FeatureView
  * div>a>img

### 六、TabBar

* 整个页面的架构

es6 对象属性名表达式,与简洁表示法不能同时使用，例 

```es6
const lastWord = 'last word';
const obj = {
  'first word': 'hello',
  [lastWord]: 'world'
};

obj['first word'] // "hello"
obj[lastWord] // "world"
obj['last word'] // "world"
```

ref如果是绑定在组件中的，那么通过**this.$refs.refname**获取到的是组件对象
ref如果是绑定在普通元素中，那么通过**this.$refs.refname**获取到的是组件对象

当我们需要监听一个组件的原生事件时，必须给对应的事件加上.native修饰符，才能进行监听

### 七、TabControl

* 独立组件的封装
  * props: titles 
  * div > 根据titles v-for遍历div > span {{ title }}
  * css 相关
  * 选中哪一个tab,哪一个tab的文字会变色，下面border-bottom
    * currentIndex 

### 八、首页商品数据的请求

#### 8.1 设计数据结构，用于保存数据

goods: {

pop: page/list

new: page/list

sell: page/list

}

#### 8.2 发送数据请求

* 在home.js中封装getHomeGoods(type,page)
* 在Home.vue中，又在methods中getHomeGoods(type)
* 调用getHomeGoods('pop')/getHomeGoods('new')/getHomeGoods('sell')
  * page: 动态获取对应的page
* 获取到数据： res
  * this.goods[type].list.push(...res.data.list);
  * this.goods[type].page += 1

goods: {

pop: page:1,list:[30]

new: page:1,list:[30]

sell: page:1,list: [30]

}

### 九、对商品数据进行展示

#### 9.1 封装GoodsList.vue组件

* props: goods -> list[30]
* v-for goods -> GoodsListItem[30]
* goodsListItem(组件) -> GoodsItem(数据)

#### 9.2 封装GoodsListItem.vue组件

* props: goodsItem
* goodsItem 取出数据，并使用正确的div/span/img基本标签进行展示

### 十、对滚动进行重构

#### 10.1 在index.html中使用better-scroll

* const bscroll = new BScroll(el, {})
* 注意： wrapper > content  -> 很多内容
* 1.监听滚动
  * probeType: 0/1/2(手指滚动)/3(只要是滚动，都可以监听)
  * bscroll.on('scroll', postion =>  {})
* 2.上拉加载
  * pullUpLoad:true
  * bscroll.on('pullingUp',() => {})
* 3.click:false 
  * button可以监听点击
  * div不可以

#### 10.2 在vue项目中使用better-scroll

* 在profile.vue 中简单的演示
* 对Better-scroll进行封装  Scroll.vue
* Home.vue和Scroll.vue之间进行通信
  * Home.vue需要将probeType设置为3
  * Scroll.vue需要通过$emit,实时将事件发送到Home.vue

### 十一、回到顶部BackTop

#### 11.1 对BackTop.vue组件的封装

#### 11.2 如何监听组件的点击

* 直接监听BackTop的点击，但是可不可以直接监听？
  * 不可以，必须添加修饰符.native
* 回到顶部
  * scroll对象，scroll.scrollTo(x,y,time)
  * this.$refs.scroll.scrollTo(0,0,500)

#### 11.3 BackTop的显示与隐藏

* isShowBackTop: false
* 监听滚动，拿到滚动的位置
  * -postion.y > 1000  -> isShowBackTop: true
  * isShowBackTop = -position.y > 1000

### 十二、解决首页中Better-scroll可滚动区域的问题

* Better-scroll在决定有多少区域可以滚动时，是根据scrollerHeight属性决定
  * scrollerHeight属性是根据Better-scroll的content中的子组件高度决定
  * 但是我们的首页中，刚开始在计算scrollerHeight属性时，是没有将图片计算在内的
  * 所以，计算出来的高度是错误的（1300+）
  * 后来图片加载进来之后有了新的高度 ，但是scrollerHeight属性并没有进行更新
  * 所以滚动出现了问题
* 如何解决这个问题？
  * 监听每一张图片是否加载完成，只要有一张图片加载完成，执行一次refresh()
  * 如何监听图片加载完成
    * 原生js监听图片：img.onload = function () {}
    * vue中监听：@load="方法"
  * 调用scroll的refresh()
* 如何将GoodsListItem.vue中的事件传入到Home.vue中
  * 因为涉及到非父子组件通信，所以这里我们选择了**事件总线**
    * bus -> 总线
    * Vue.prototype.$bus = new Vue();
    * this.$bus.$emit('事件名称'，参数)
    * this.$bus.$on('事件名称'，回调函数(参数))
  * 非父子组件通信参考：[https://www.jb51.net/article/132371.htm](https://www.jb51.net/article/132371.htm)

* 问题一：refresh找不到的问题
  * 第一：在Scroll.vue中，调用this.scroll的方法之前，判断this.scroll对象是否有值
  * 第二：在mounted生命周期函数中使用this.$refs.scroll而不是created生命周期函数中
* 需求：对于refresh非常频繁的问题，进行防抖操作
  * 防抖debounce/节流throttle
  * 防抖函数起作用的过程
    * 如果我们直接执行refresh,那么refresh函数会被执行30次
    * 可以将refresh函数传入到debounce函数中，生成一个新的函数
    * 之后再调用非常频繁的时候，就使用新生成的函数
    * 而新生成的函数，并不会非常频繁的调用，如果下一次执行来的非常快，那么会将上一次的取消掉

```js
function debounce(func, delay = 200) {
  let timer = null;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
```

### 十三、上拉加载更多

### 十四、tabControl的吸顶效果

#### 14.1 获取到tabControl的offsetTop

* 必须知道滚动多少时，开始有吸顶效果，这个时候就需要获取tabControl的offsetTop
* 但是如果直接在mounted中获取tabControl的offsetTop,那么值是不正确的
* 如何获取正确的值呢？
  * 监听HomeSwiper中img的加载完成
  * 加载完成后，发出事件，在Home.vue中，获取正确的位置
  * 补充：
    *  为了不让HomeSwiper多次发出事件
    * 可以使用isLoad的变量进行状态的记录
  * 注意：这里不进行多次调用和debounce的区别

#### 14.2 监听滚动，动态改变tabControl的样式

* 问题： 动态改变tabControl的样式时，会出现两个问题：
  * 问题一：下面的商品内容，会突然上移
  * 问题二：tabControl虽然设置了fixed，但是也随着Better-scroll一起滚出去了

* 其他方案解决停留问题
  * 在最上面，多复制了一份PlaceHolder(占位)TabControl组件对象，利用它来实现停留效果
  * 当用户滚动到一定位置时，PlaceHolder(占位)TabControl显示出来
  * 当用户滚动没有达到一定位置时，PlaceHolder(占位)TabControl影藏起来

### 十五、让Home保持原来的状态

#### 15.1 让Home不要随意销毁掉

* keep-alive

#### 15.2 让Home中的内容保持原来的状态

* 离开时，保存一个位置信息saveY
* 进来时，将位置设置为原来保存的位置saveY 即可 
  * 注意：最好回来时，进行一次refresh()

## 详情页开发

### 一、点击商品进入详情页

* goodsListIem点击
* 点击之后获取商品的iid,跳转到详情页
* 并且传入iid

### 二、详情页导航的实现

* 独立组件的封装  DetailNavBar
  * data: titles
  * div > 根据titles，v-for遍历div {{ title }}
  * 点击某一个title,某一个title会变色
    * currentIndex
  * 左侧返回按钮的实现  
    * this.$router.go(-1) / this.$router.back()

### 三、请求详情的数据
























## 项目运行

clone项目：

```
git clone https://github.com/perfect4255/supermall.git
```

安装项目依赖：

```shell
npm install
```

项目运行：

```shell
npm run serve
```
