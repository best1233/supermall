import BackTop from "components/content/backTop/BackTop";
import { debounce } from "./utils";
import { BACK_POSITION } from "./const";

/* 
  在混入中 生命周期函数 的相同函数会与组件内的生命周期函数进行合并
          methods中 的相同方法会覆盖原来组件中methods中定义的方法
*/

/**
 * 事件监听(调用refresh)的混入
 */
export const itemImgListenerMixin = {
  data() {
    return {
			itemImgListener: null,
			newRefresh: null
    };
  },
  mounted() {
    // 1.对刷新函数进行防抖操作
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100);
    // 2.对监听的事件进行保存
    this.itemImgListener = () => {
      this.newRefresh();
    };
    // 3.监听图片加载完成，执行refresh
    this.$bus.$on("itemImageLoad", this.itemImgListener);
    // console.log("我是混入中的内容！itemImgListenerMixin");
  }
};

/**
 * BackTop的混入
 */
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    // 回到顶部
    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
      // console.log("我是混入中的内容！backTopMixin");
    },
    // 判断BackTop是否显示
    listenShowBackTop(position) {
      this.isShowBackTop = (-position.y) > BACK_POSITION;
    }
  }
}

/**
 * tabControl的混入
 */
export const tabControlMixin = {
	data() {
		return {
			currentType: POP
		}
	},
	methods: {
		tabClick(index) {
			switch (index) {
				case 0:
					this.currentType = POP
					break
				case 1:
					this.currentType = NEW
					break
				case 2:
					this.currentType = SELL
					break
			}
      // 让两个tabControl的currentIndex保持一致 
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
		}
	}
}
