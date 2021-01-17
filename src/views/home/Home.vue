<template>
  <div id="home">
    <!-- 导航栏 -->
    <NavBar class="home-nav">
      <template #center>购物街</template>
    </NavBar>
    <TabControl
      class="tab-control"
      ref="tabControl1"
      :titles="titles"
      @tabClick="tabClick"
      v-show="isTabFixed"
    />
    <Scroll
      class="wrapper"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <!-- 推荐 -->
      <RecommendView :recommends="recommends" />
      <!-- 本周流行 -->
      <FeatureView />
      <TabControl ref="tabControl2" :titles="titles" @tabClick="tabClick" />
      <!-- 商品列表 -->
      <GoodsList :goods="showGoods" />
    </Scroll>
    <!-- 回到顶部 -->
    <BackTop @click.native="backTop" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import { getHomeMultiData, getHomeGoods } from "services/home";
import { POP, NEW, SELL } from "common/const";
import { debounce } from "common/utils";
import { itemImgListenerMixin, backTopMixin } from "common/mixin";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll
  },
  mixins: [itemImgListenerMixin, backTopMixin], // 混入
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],
      goods: {
        // [POP] es6属性名表达式,与简洁表示法不能同时使用
        [POP]: { page: 0, list: [] },
        [NEW]: { page: 0, list: [] },
        [SELL]: { page: 0, list: [] }
      },
      currentType: POP,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  activated() {
    // 1.滚动到上一次离开的位置
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    // 2.刷新页面
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 1.当前页面离开时，保存滚动的y值
    this.saveY = this.$refs.scroll.getScrollY();
    
    // 2.取消全局事件的监听，$bus.$off('事件名称',函数)
    this.$bus.$off('itemImageLoad', this.itemImgListener);
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultiData();
    // 2.请求商品数据
    this.getHomeGoods(POP);
    this.getHomeGoods(NEW);
    this.getHomeGoods(SELL);
  },
  // mounted() {
  //   // 这个地方img标签确实被挂载，但是其中的图片还没有占据高度
    
  //   // 1.对刷新函数进行防抖操作
  //   const newRefresh = debounce(this.$refs.scroll.refresh, 100);

  //   // 2.对监听的事件进行保存
  //   this.itemImgListener = () => {
  //     newRefresh();
  //   }
  //   // 3.监听图片加载完成，执行refresh
  //   this.$bus.$on("itemImageLoad", this.itemImgListener);

  //   // this.$bus.$on("itemImageLoad", () => {
  //   //   newRefresh();
  //   // });
  // },
  computed: {
    // 展示当前选中的项
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP;
          break;
        case 1:
          this.currentType = NEW;
          break;
        case 2:
          this.currentType = SELL;
          break;
      }
      // 让两个tabControl的currentIndex保持一致 
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.listenShowBackTop(position);

      // 2.决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop;
    },
    // 上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    // 监听轮播图的图片加载完成
    swiperImageLoad() {
      // 所有的组件都有一个属性$el:用于获取组件的元素

      // 获取tabControl的offsetTop
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /**
     * 网络请求相关的方法
     */
    async getHomeMultiData() {
      const res = await getHomeMultiData();
      this.banners = res.banner.list;
      this.recommends = res.recommend.list;
    },
    async getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      const goods = await getHomeGoods(type, page);
      this.goods[type].list.push(...goods);
      this.goods[type].page += 1;

      // 完成上拉加载更多
      this.$refs.scroll.finishPullUp();
    }
  }
};
</script>

<style scoped lang="scss">
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: $bg-tint;
  color: $text-white;

  // 在使用浏览器原生滚动时，为了让导航不跟随一起滚动
  // position: fixed;
  // top: 0;
  // right: 0;
  // left: 0;
  // z-index: 9;
}
.wrapper {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
  overflow: hidden;
}

// .wrapper {
//   height: calc(100% - 93px);
//   overflow: hidden;
//   margin-top: 44px;
// }

.tab-control {
  position: relative;
  z-index: 9;
}
</style>
