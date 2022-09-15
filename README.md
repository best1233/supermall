# supermall

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

### 六、TabControl

* 独立组件的封装
  * props: titles 
  * div > 根据titles v-for遍历div > span {{ title }}
  * css 相关
  * 选中哪一个tab,哪一个tab的文字会变色，下面border-bottom
    * currentIndex 

### 七、首页商品数据的请求

#### 7.1 设计数据结构，用于保存数据

​	goods: {

​		pop: page/list

​		new: page/list

​		sell: page/list

​	}

#### 7.2 发送数据请求

* 在home.js中封装getHomeGoods(type,page)

* 在Home.vue中，又在methods中getHomeGoods(type)

* 调用getHomeGoods('pop')/getHomeGoods('new')/getHomeGoods('sell')
  
  * page: 动态获取对应的page
  
* 获取到数据： res
  * this.goods[type].list.push(...res.data.list);
  * this.goods[type].page += 1
  
  
  
  goods: {
  
  ​	pop: page:1,list:[30]
  
  ​	new: page:1,list:[30]
  
  ​	sell: page:1,list: [30]
  
  }

### 八、对商品数据进行展示

#### 8.1 封装GoodsList.vue组件

* props: goods -> list[30]
* v-for goods -> GoodsListItem[30]
* goodsListItem(组件) -> GoodsItem(数据)

#### 8.2 封装GoodsListItem.vue组件

* props: goodsItem
* goodsItem 取出数据，并使用正确的div/span/img基本标签进行展示

### 九、对滚动进行重构

#### 9.1 在index.html中使用better-scroll

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

#### 9.2 在vue项目中使用better-scroll

* 在profile.vue 中简单的演示
* 对Better-scroll进行封装  Scroll.vue
* Home.vue和Scroll.vue之间进行通信
  * Home.vue需要将probeType设置为3
  * Scroll.vue需要通过$emit,实时将事件发送到Home.vue

### 十、回到顶部BackTop

#### 10.1 对BackTop.vue组件的封装

#### 10.2 如何监听组件的点击

* 直接监听BackTop的点击，但是可不可以直接监听？
  * 不可以，必须添加修饰符.native
* 回到顶部
  * scroll对象，scroll.scrollTo(x,y,time)
  * this.$refs.scroll.scrollTo(0,0,500)

#### 10.3 BackTop的显示与隐藏

* isShowBackTop: false
* 监听滚动，拿到滚动的位置
  * -postion.y > 1000  -> isShowBackTop: true
  * isShowBackTop = -position.y > 1000

### 十一、解决首页中Better-scroll可滚动区域的问题

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
// 防抖函数
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

### 十二、上拉加载更多

### 十三、tabControl的吸顶效果

#### 13.1 获取到tabControl的offsetTop

* 必须知道滚动多少时，开始有吸顶效果，这个时候就需要获取tabControl的offsetTop
* 但是如果直接在mounted中获取tabControl的offsetTop,那么值是不正确的
* 如何获取正确的值呢？
  * 监听HomeSwiper中img的加载完成
  * 加载完成后，发出事件，在Home.vue中，获取正确的位置
  * 补充：
    *  为了不让HomeSwiper多次发出事件
    * 可以使用isLoad的变量进行状态的记录
  * 注意：这里不进行多次调用和debounce的区别

#### 13.2 监听滚动，动态改变tabControl的样式

* 问题： 动态改变tabControl的样式时，会出现两个问题：
  * 问题一：下面的商品内容，会突然上移
  * 问题二：tabControl虽然设置了fixed，但是也随着Better-scroll一起滚出去了

* 其他方案解决停留问题
  * 在最上面，多复制了一份PlaceHolder(占位)TabControl组件对象，利用它来实现停留效果
  * 当用户滚动到一定位置时，PlaceHolder(占位)TabControl显示出来
  * 当用户滚动没有达到一定位置时，PlaceHolder(占位)TabControl影藏起来

### 十四、让Home保持原来的状态

#### 14.1 让Home不要随意销毁掉

* keep-alive

#### 14.2 让Home中的内容保持原来的状态

* 离开时，保存一个位置信息saveY
* 进来时，将位置设置为原来保存的位置saveY 即可 
  * 注意：最好回来时，进行一次refresh()

其他：

* es6 属性名表达式的使用，与简洁表示法不能同时使用，例

  ```js
  const lastWord = 'last word';
  const obj = {
    'first word': 'hello',
    [lastWord]: 'world'
  };
  
  obj['first word'] // "hello"
  obj[lastWord] // "world"
  obj['last word'] // "world"
  ```

* 1. ref如果是绑定在组件中的，那么通过**this.$refs.refname**获取到的是组件对象 
  2. ref如果是绑定在普通元素中，那么通过**this.$refs.refname**获取到的是dom元素

* 当我们需要监听一个组件的原生事件时，必须给对应的事件加上.native修饰符，才能进行监听



## 详情页开发

### 一、点击商品进入详情页

* goodsListIem点击
* 点击之后获取商品的iid,跳转到详情页
* 并且传入iid

### 二、详情页导航的实现

* 返回按钮 ： left插槽

  * this.$router.go(-1) / this.$router.back()

* 标题列表的展示 ： center插槽

  独立组件的封装  DetailNavBar

  * data: titles
  * div > 根据titles，v-for遍历div {{ title }}
  * 点击某一个title,某一个title会变色
    * currentIndex

### 三、请求详情的数据

* 接口：/detail/iid

### 四、轮播图的实现

* swiper/swiperItem

### 五、商品基本信息的展示

* 数据来自四面八方
* 对数据进行汇总： 一个对象当中
* 将这一个对象传入到子组件中

### 六、店铺信息的展示

### 七、商品图片的展示

### 八、参数信息的展示

### 九、评论信息的展示

* 时间格式化
* 服务器返回的时间戳 -> date -> 格式化
* yyyy-MM-dd hh:mm:ss

### 十、推荐数据的展示

* 请求推荐数据
* GoodsList展示数据

### 十一、混入 mixin的使用

* 创建一个混入对象 const mixin = {}
* 组件对象中： mixins: [mixin]
* 应用：
  * 首页和详情页GoodsItem都抛出itemImageLoad
  * 两个页面分别监听itemImageLoad，执行refresh
  * 以及页面离开取消时件的监听

### 十二、处理bug

* 详情页滚动的bug
  * 监听详情页图片的加载，执行refresh,防抖处理
  * 直接掉用详情页混入的有防抖处理的函数 this.newRefresh()

### 十三、标题和内容的联动效果

#### 13.1 点击标题，滚动到对应的主题

* 在detail中监听标题的点击，获取index
* 滚动到对应的主题：
  * 获取所有主题的offsetTop	
  * 问题：在哪里才能获取到正确的offsetTop
    * 1.created肯定不行，压根不能获取元素
    * 2.mounted也不行，数据还没有获取到
    * 3.获取到数据的回调中也不行，dom还没渲染完
    * 4.$nextTick也不行，因为图片的高度没有计算在内
    * 5.在图片加载完成后，获取到的高度才是正确的

#### 13.2 内容滚动，显示正确的标题

普通做法

```js
const length = this.themeTopYs.length; 
for (let i = 0; i < length; i++) {
  if ((this.currentIndex !== i) && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length - 1) && positionY >= this.themeTopYs[i])) {
     this.currentIndex = i;
     this.$refs.nav.currentIndex = this.currentIndex; // 更改DetailNavBar里面的currentIndex
    }
}

条件的分析：
条件一: this.currnetIndex !== i  
防止赋值的条件过于频繁

条件二: ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length - 1) && positionY >= this.themeTopYs[i]))

  * 条件1: (i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
    判断区间: 在0和某个数字之间 (i < length -1)
  * 条件2: (i === length - 1) && positionY >= this.themeTopYs[i])
    判断大于等于 i ===length -1 
```



hack做法（需要引入一个非常大的值）

```js
const length = this.themeTopYs.length; 
for (let i = 0; i < length - 1; i++) {
        if ((this.currentIndex !== i) && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex; // 更改DetailNavBar里面的currentIndex
        }
      }
```

### 十四、底部工具栏的封装

### 十五、详情页的回到顶部

* home.vue和detail.vue回到顶部： mixin



## 购物车实现

#### 一、点击加入购物车

#### 1.1  监听加入购物车按钮的点击，并且获取商品的信息

* 监听
* 获取商品信息： iid/price/image/title/desc

#### 1.2 将商品添加到Vuex中

* 安装Vuex
* 配置Vuex
* 定义mutations,将商品添加到state.cartList
* 重构代码
  * 将mutations中的代码抽到actions中（定义两个mutations）
  * 将mutations/actions单独抽取到文件中

### 二、购物车展示

#### 2.1 购物车导航栏的展示

#### 2.2 购物车商品的展示

* CartList.vue  -> Scroll(样式问题)
* CartListItem.vue  -> CheckButton

#### 2.3 商品的选中和不选中的切换

* 修改模型对象，改变选中和不选中

#### 2.4  底部工具栏的汇总

* 全选按钮
* 计算总价格
* 去计算

### 三、购物车全选的全选按钮

* 显示的状态
  * 判断是否有一个不选中，全选就是不选中
* 点击全选按钮
  * 如果原来都是选中，点击一次，全部不选中
  * 如果原来都是不选中(某些不选中),全部选中

### 四、添加购物车弹窗

#### 4.1 Vuex的补充

* Actions可以返回一个promise
* mapActions的映射关系

#### 4.2 Toast的封装

* 普通封装方式
* 插件封装方式

### 五、补充一些细节

#### 5.1 fastclick 减少点击的延迟

* 安装fastclick
* 导入
* 调用attach函数 

#### 5.2 图片懒加载

* 什么是图片懒加载
  * 图片需要显示在屏幕上，再加载这张图片
* 使用vue-lazyload
  * 安装
  * 导入
  * Vue.use(VueLazyLoad) 安装
  * 修改img src  -> v-lazy

#### 5.3 px2vw插件使用

* 安装插件
* 在postcss.config.js中配置

### 六、nginx项目部署



## 分类的实现

### 一、分类导航栏的封装

### 二、左侧Tab菜单的展示

* TabMenu的封装
* scroll的使用

### 三、右侧子分类的展示

* TabContentCategory的封装
* scroll/TabControl/GoodsList组件的复用

### 四、网络请求的处理

* 数据结构的设计(重要）

  categoryData: {

  ​	subCategories: [],

  ​	categoryDetail: {

  ​		POP: [],

  ​		NEW:[],

  ​		SELL:[]

  ​	}	

  }


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
