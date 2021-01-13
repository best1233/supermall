<template>
  <div id="home">
    <!-- 导航栏 -->
    <NavBar class="home-nav">
      <template #center>购物街</template>
    </NavBar>
    <Scroll
      class="wrapper"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <HomeSwiper :banners="banners" />
      <!-- 推荐 -->
      <RecommendView :recommends="recommends" />
      <!-- 本周流行 -->
      <FeatureView />
      <TabControl class="tab-control" :titles="titles" @tabClick="tabClick" />
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
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultiData, getHomeGoods } from "services/home";
import { POP, NEW, SELL, BACK_POSITION } from "common/const";
export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
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
      isShowBackTop: false
    };
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultiData();
    // 2.请求商品数据
    this.getHomeGoods(POP);
    this.getHomeGoods(NEW);
    this.getHomeGoods(SELL);
  },
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
    },
    // 回到顶部
    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      this.isShowBackTop = -position.y > BACK_POSITION;
    },
    loadMore() {
      console.log('上拉加载更多');
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
      const goods = await getHomeGoods(type, 1);
      this.goods[type].list.push(...goods);
      this.goods[type].page += 1;
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
  background-color: $color-tint;
  color: $color-white;

  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9;
}
.wrapper {
  position: absolute;
  top:44px;
  left:0;
  right:0;
  bottom:49px;
  overflow: hidden;
}
// .wrapper {
//   height: calc(100% - 93px);
//   overflow: hidden;
//   margin-top: 44px;
// }

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 10;
}
</style>
