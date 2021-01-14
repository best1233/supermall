<template>
  <div id="detail">
    <!-- 导航栏 -->
    <DetailNavBar @titleClick="titleClick" />
    <Scroll class="wrapper" ref="scroll">
      <!-- 轮播图 -->
      <DetailSwiper :topImages="topImages" />
      <!-- 商品基本信息 -->
      <DetailBaseInfo :goods="goods" />
      <!-- 商品店铺信息 -->
      <DetailShopInfo :shop="shop" />
      <!-- 商品详情信息 -->
      <DetailGoodsInfo :goodsInfo="detailInfo" @detailImageLoad="detailImageLoad" />
      <!-- 商品参数信息 -->
      <DetailParamInfo :paramInfo="paramInfo"/>
      <!-- 商品评论信息 -->
      <DetailCommentInfo :commentInfo="commentInfo"/>
      <!-- 推荐数据 -->
      <GoodsList :goods="recommends" />
    </Scroll>
    <!-- 底部tabBar -->
    <DetailBottomBar />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from 'components/common/scroll/Scroll';
import GoodsList from 'components/content/goods/GoodsList';
import { getDetail, getRecommend, Goods, Shop, DetailInfo, GoodsParams } from "services/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,

    Scroll,
    GoodsList
  },
  props: {
    iid: { required: true } // 相当于this.$route.params.iid
  },
  data() {
    return {
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: []
    };
  },
  created() {
    // 1.根据iid请求详情数据
    this.getDetail();
    // 2. 获取推荐数据
    this.getRecommend();
  },
  methods: {
    /**
     * 事件监听相关方法
     */
    titleClick(index) {
      console.log(index);
    },
    detailImageLoad() {
      this.$refs.scroll.refresh();
    },
    /**
     * 网络请求相关的方法
     */
    async getDetail() {
      const resp = await getDetail(this.iid);

      // 1.获取顶部轮播图的数据
      this.topImages = resp.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(resp.itemInfo, resp.columns, resp.shopInfo.services);

      // 3.获取商品店铺信息
      this.shop = new Shop(resp.shopInfo);

      // 4.获取商品详情信息
      this.detailInfo = new DetailInfo(resp.detailInfo);
      
      // 5.获取商品参数的信息
      this.paramInfo = new GoodsParams(resp.itemParams.info,resp.itemParams.rule); 
      
      // 6.获取商品评论的信息
      if (resp.rate.cRate !== 0) { // cTate是评论的数量，有的数据是没有评论的,限制一下
        this.commentInfo = resp.rate.list[0];
      }
    },
    async getRecommend() {
      const resp = await getRecommend();
      this.recommends = resp;
    }
  }
};
</script>

<style scoped lang="scss">
#detail {
  position: relative;
  z-index: 9;
  background-color:$bg-white;
  height: 100vh;

  .wrapper {
    position: absolute;
    top:44px;
    bottom: 58px;
    left:0;
    right:0;
    overflow: hidden;
  }
}
</style>
