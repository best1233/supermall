<template>
  <div id="detail">
    <!-- 导航栏 -->
    <DetailNavBar ref="nav" @titleClick="titleClick" />
    <Scroll class="wrapper" ref="scroll" :probeType="3" @scroll="contentScroll">
      <!-- 轮播图 -->
      <DetailSwiper :topImages="topImages" />
      <!-- 商品基本信息 -->
      <DetailBaseInfo :goods="goods" />
      <!-- 商品店铺信息 -->
      <DetailShopInfo :shop="shop" />
      <!-- 商品详情信息 -->
      <DetailGoodsInfo :goodsInfo="detailInfo" @detailImageLoad="detailImageLoad" />
      <!-- 商品参数信息 -->
      <DetailParamsInfo ref="params" :paramsInfo="paramsInfo"/>
      <!-- 商品评论信息 -->
      <DetailCommentInfo ref="comment" :commentInfo="commentInfo"/>
      <!-- 推荐数据 -->
      <GoodsList ref="recommend" :goods="recommends" />
    </Scroll>
    <!-- 购物车 -->
    <CartBtn @click.native="cartClick" />
    <!-- 回到顶部 -->
    <BackTop @click.native="backTop" v-show="isShowBackTop" />
    <!-- 底部工具栏 -->
    <DetailBottomBar @addCart="addToCart" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamsInfo from "./childComps/DetailParamsInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";
import CartBtn from "./childComps/CartButton";

import Scroll from 'components/common/scroll/Scroll';
import GoodsList from 'components/content/goods/GoodsList';

import { getDetail, getRecommend, Goods, Shop, GoodsParams } from "services/detail";
import { debounce } from "common/utils";
import { itemImgListenerMixin, backTopMixin } from 'common/mixin';

import { mapActions } from 'vuex';
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailBottomBar,
    CartBtn,

    Scroll,
    GoodsList
  },
  props: {
    iid: { required: true } // 相当于this.$route.params.iid
  },
  mixins: [itemImgListenerMixin, backTopMixin],
  data() {
    return {
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0, // 解决打印频繁的问题 
    };
  },
  created() {
    // 1.根据iid请求详情数据
    this.getDetail();
    // 2. 获取推荐数据
    this.getRecommend();
  },
  mounted() {
    // 给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE); // 第二种做法需要添加一个很大的值
      // console.log(this.themeTopYs);
    });
  },
  // mounted() {
  //   // 这儿能达到防抖的原因是因为闭包对newRefresh作了引用，newRefresh不会被重复赋值
  //   const newRefresh = debounce(this.$refs.scroll.refresh, 50);

  //   this.itemImgListener = () => {
  //     newRefresh(); 
  //   }
  //   this.$bus.$on('itemImageLoad',this.itemImgListener);
  // },

  // 值仍然不对,原因未知 ??? 
  //  updated() {
  //   this.themeTopYs = [];
  //   this.themeTopYs.push(0);
  //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
  //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
  //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
  //   console.log(this.themeTopYs);
  // },
  destroyed() {
    this.$bus.$off('itemImageLoad',this.itemImgListener);
  },
  methods: {
    ...mapActions(['addCart']),
    /**
     * 事件监听相关方法
     */
    titleClick(index) {
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200);
    },
    detailImageLoad() {
      // 错误写法：这样写newRefresh会被执行所调用的次数，达不到防抖的效果
      // const newRefresh = debounce(this.$refs.scroll.refresh,100);
      // newRefresh();

      // 拿到混入到detail中的经过防抖处理的刷新函数进行调用
      this.newRefresh();

      // 图片加载完成后，获取最终正确的高度
      this.getThemeTopY(); // 获取并存储正确的offsetTop的值
    },
    // 内容滚动，显示正确的标题
    contentScroll(position) {
      // 1. 获取y值
      const positionY = -position.y;
      // 2. postionY和主题中的值进行对比
      // [0, 7373, 8268, 8487]
      // positionY 在 0 和 7373 之间,index = 0
      // positionY 在 7373 和 8268 之间,index = 1
      // positionY 在 8268 和 8487 之间,index = 2
      // positionY 大于等于 8487 值, index = 3
      const length = this.themeTopYs.length;
      /**
       * 判断的方案:
       *  方案一:
       *    条件: (this.currentIndex !== i) && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length - 1) && positionY >= this.themeTopYs[i]),
       *      1. 条件一:防止赋值的过程过于频繁
       *      2. 条件二:
       *         1.在0和某个数字之间 (i < length -1)
       *         2.判断大于等于 i === index -1
       *    优点: 不需要引入其他的内容, 通过逻辑解决
       *    缺点: 判断条件过长, 并且不容易理解
       *  方案二:
       *    条件: 给themeTops最后添加一个很大的值, 用于和最后一个主题的offsetTop进行比较.
       *    优点: 简洁明了, 便于理解
       *    缺点: 需要引入一个较大的int数字
       */
      // for (let i = 0; i < length; i++) {
      //   if ((this.currentIndex !== i) && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || 
      //   (i === length - 1) && positionY >= this.themeTopYs[i])) {
      //     this.currentIndex = i;
      //     // console.log(this.currentIndex);
      //     this.$refs.nav.currentIndex = this.currentIndex;
      //   }
      // }
      for (let i = 0; i < length - 1; i++) {
        if ((this.currentIndex !== i) && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex; // 更改DetailNavBar里面的currentIndex
        }
      }
      // 3.判断BackTop是否显示
      this.listenShowBackTop(position);
    },
    cartClick() {
      this.$router.push({ name: 'Cart'});
    },
    async addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image =  this.topImages[0];
      product.title = this.goods.title;
      product.price = this.goods.realPrice;
      product.desc = this.goods.desc;
      product.iid = this.iid;
      
      // 2.将商品添加到购物车
      // this.$store.dispatch('addCart',product);
      const resp =  await this.addCart(product);
      this.$toast.show(resp);
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
      this.detailInfo = resp.detailInfo;
      
      // 5.获取商品参数的信息
      this.paramsInfo = new GoodsParams(resp.itemParams.info,resp.itemParams.rule); 
      
      // 6.获取商品评论的信息
      if (resp.rate.cRate !== 0) { // cTate是评论的数量，有的数据是没有评论的,限制一下
        this.commentInfo = resp.rate.list[0];
      }

      /**
      // 第一次获取，值不对
      // 值不对的原因: this.$refs.params.$el压根没渲染
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      
      console.log(this.themeTopYs);

      this.$nextTick(() => {
        // 第二次获取，值不对
        // 值不对的原因：图片没有计算在内
        // 根据最新的数据，对应的DOM已经被渲染出来
        // 但是图片依然是没有加载完(目前获取到的offsetTop不包含其中的图片)
        // offsetTop值不对的时候，都是因为图片的问题
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themeTopYs);
      });

      */
    },
    async getRecommend() {
      this.recommends = await getRecommend();
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
  .back-top {
    right: 5px;
    bottom: 60px;
  }
}
</style>
