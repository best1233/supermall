# supermall

> 学习coderwhy的商城项目,如果觉得不错，或者对你有帮助，点一个star~ 

## 知识点总结

### 一. 划分目录结构

* 1.1 引用了两个css文件
* 1.2 vue.config.js和.editorconfig


### 二. 项目的模块划分: tabbar -> 路由映射关系
* 独立组件封装 TabBar -> TabBarItem -> MainTabBar


### 三. 首页开发

### 3.1 navbar 的封装

* slot

### 3.2 网络数据的请求 

* 单独在services下创建 home.js, 进行请求的单独处理

### 3.3 轮播图 

* 对已有组件再次进行封装 HomeSwiper

### 3.4 推荐信息 

* 一张图片也写成一个单独的组件 RecommendView

### 3.5 FeatureView
* 独立组件封装FeatureView
  * div>a>img

### 3.6 TabBar

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

### 3.7 TabControl

* 独立组件的封装
  * props: titles 
  * div > 根据titles v-for遍历div > span {{ title }}
  * css 相关
  * 选中哪一个tab,哪一个tab的文字会变色，下面border-bottom
    * currentIndex 

### 3.8 首页商品数据的请求

#### 1.设计数据结构，用于保存数据

goods: {

pop: page/list

new: page/list

sell: page/list

}

#### 2.发送数据请求

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

### 3.9 对商品数据进行展示

#### 1.封装GoodsList.vue组件

* props: goods -> list[30]
* v-for goods -> GoodsListItem[30]
* goodsListItem(组件) -> GoodsItem(数据)

#### 2. 封装GoodsListItem.vue组件

* props: goodsItem
* goodsItem 取出数据，并使用正确的div/span/img基本标签进行展示

### 4.0 对滚动进行重构

#### 1. 在index.html中使用better-scroll

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

#### 2.在vue项目中使用better-scroll

* 在profile.vue 中简单的演示
* 对Better-scroll进行封装  Scroll.vue
* Home.vue和Scroll.vue之间进行通信
  * Home.vue需要将probeType设置为3
  * Scroll.vue需要通过$emit,实时将事件发送到Home.vue

### 4.1 回到顶部BackTop

#### 1.对BackTop.vue组件的封装

#### 2.如何监听组件的点击

* 直接监听BackTop的点击，但是可不可以直接监听？
  * 不可以，必须添加修饰符.native
* 回到顶部
  * scroll对象，scroll.scrollTo(x,y,time)
  * this.$refs.scroll.scrollTo(0,0,500)

#### 3.BackTop的显示与隐藏

* isShowBackTop: false
* 监听滚动，拿到滚动的位置
  * -postion.y > 1000  -> isShowBackTop: true
  * isShowBackTop = -position.y > 1000


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
