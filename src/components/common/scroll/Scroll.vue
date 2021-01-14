<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core"; // 基础内容滚动
import PullUp from '@better-scroll/pull-up' // 用于上拉加载更多
BScroll.use(PullUp);
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    };
  },
  props: {
    /**
     * 默认情况下BScroll是不可以实时的监听滚动位置
     * probe 侦测
     * 0,1 都是不侦测实时的位置
     * 2  在手指滚动的过程中侦测，手指离开后的惯性滚动过程中不侦测
     * 3  只要是滚动，都侦测
     */
    probeType: {
      type: Number,
      default: 0
    },
    /**
     * 普通元素(除button)点击是否能使用click事件
     */
    click: {
      type: Boolean,
      default: true
    },
    /**
     * 是否派发滚动到底部的事件，用于上拉加载
     */
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    /**
     * 列表的数据
     */
    data: {
      type: Array,
      default: () => []
    },
    /**
     * 当数据更新后，刷新scroll的延时。
     */
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  // 必须在mounted中初始化,在created生命周期函数中获取不到dom元素
  mounted() {
    // 保证在DOM渲染完毕后初始化better-scroll
    setTimeout(() => {
      this._initScroll();
    }, 20);
  },
  /**
   * Better-scroll可滚动的高度是由内部的scrollerHeight属性决定的，
   * 而scrollerHeight属性是根据放在Better-Scroll中的content中的子组件的高度决定
   * 
   * console.log(this.scroll.scrollerHeight); 
   */
  methods: {
    // better-scroll的初始化
    _initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      
      // 1.创建better-scroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        pullUpLoad: this.pullUpLoad
      });

      // 2.监听滚动的位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on("scroll", position => {
          this.$emit("scroll", position);
        });
      }

      // 3.监听上拉事件
      if (this.pullUpLoad) {
        this.scroll.on("pullingUp", () => {
          console.log('监听到滚动到底部~');
          this.$emit('pullingUp');
        });
      }
    },
    // 代理better-scroll的scrollTo方法
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    // 代理better-scroll的finishPullUp方法
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    // 代理better-scroll的refresh方法
    refresh() {
      console.log('refresh~');
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    }
  },
  watch: {
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    data() {
      setTimeout(() => {
        this.refresh();
      }, this.refreshDelay);
    }
  }
};
</script>

<style scoped></style>
