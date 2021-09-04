<template>
	<div id="category">
		<!-- 导航栏 -->
		<NavBar>
			<template #center>商品分类</template>
		</NavBar>
		<div class="detail-content">
			<!-- 左侧tab菜单 -->
			<TabMenu :categories="categories" @selectItem="selectItem" />
			<!-- 右侧展示的子分类 -->
			<Scroll class="tab-content" ref="scroll" :data="[]">
				<TabContentCategory :subCategories="showSubCategory" />
				<TabControl :titles="titles" @tabClick="tabClick" />
				<GoodsList :goods="showCategoryDetail" />
			</Scroll>
		</div>
	</div>
</template>

<script>
	import TabMenu from './childComps/TabMenu';
	import TabContentCategory from './childComps/TabContentCategory';

	import NavBar from 'components/common/navbar/NavBar';
	import Scroll from 'components/common/scroll/Scroll';
	import TabControl from 'components/content/tabControl/TabControl';
	import GoodsList from 'components/content/goods/GoodsList';

	import { getCategory, getSubCategory, getCategoryDetail } from 'services/category';
	import { POP, SELL, NEW } from "common/const";
	import { itemImgListenerMixin } from 'common/mixin';

	export default {
		name:'Category',
		components: {
			TabMenu,
			TabContentCategory,

			NavBar,
			Scroll,
			TabControl,
			GoodsList
		},
		mixins: [itemImgListenerMixin],
		data() {
			return {
				categories: [],
				categoryData: {},
				currentIndex: -1,
				titles: ['综合','新品','销量'],
				currentType: POP
			}
		},
		computed: {
			showSubCategory() {
				// 避免一开始没有数据，报错的情况
				if (this.currentIndex === -1)  return [];
				return this.categoryData[this.currentIndex].subCategories;
			},
			showCategoryDetail() {
				if (this.currentIndex === -1) return [];
				return this.categoryData[this.currentIndex].categoryDetail[this.currentType];
			}
		},
		created() {
			// 1.请求分类数据
			this.getCategory();
		},
		deactivated() {
			this.$bus.$off('itemImageLoad', this.itemImgListener);
		},
		methods: {
			/**
			 * 事件监听相关方法
			 */
			selectItem(index) {
				this.getSubCategory(index);
			},
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
			},
			/**
			 * 网络请求相关的方法
			 */
			async getCategory() {
				// 1. 获取分类数据
				let resp = await getCategory();
				// console.log(resp);
				this.categories = resp;

				// 2.初始化每个类别的子数据
				for (let i = 0; i < this.categories.length; i++) {
					this.categoryData[i] = {
						subCategories : [],
						categoryDetail: {
							[POP]: [],
							[NEW]: [],
							[SELL]: []
						}
					}
				}
				// 3.请求第一个子分类的数据
				this.getSubCategory(0);
				// console.log(this.categoryData);
			},
			async getSubCategory(index) {
				// 1.存储当前选中项的索引
				this.currentIndex = index;
				// 2. 获取当前索引所对应分类的maitKey
				const maitKey = this.categories[index].maitKey;
				// 3. 根据maitKey，请求对应的子分类
				const resp = await getSubCategory(maitKey);
				// 4.保存子分类的数据,但是当前对象的每一项不是响应式的，只有this.categoryData是响应式的
				this.categoryData[index].subCategories = resp;
				// 5.将这个对象展开, 让当前数据变成响应式的
				this.categoryData = { ...this.categoryData }
				// console.log(this.categoryData);

				this.getCategoryDetail(POP);
				this.getCategoryDetail(NEW);
				this.getCategoryDetail(SELL);
			},
			async getCategoryDetail(type) {
				// 1. 根据之前存储的当前索引，获取对应的miniWallKey, 注意:miniWallkey此处的 key小写
				const miniWallKey = this.categories[this.currentIndex].miniWallkey;
				// 2. 根据miniWallKey和type,获取对应的详情数据
				const resp = await getCategoryDetail(miniWallKey, type);
				// 3. 保存获取的数据
				this.categoryData[this.currentIndex].categoryDetail[type] = resp;
				// console.log(resp);
			}
		}
	}
</script>

<style scoped lang="scss">
#category {
	position: relative;
	height: 100vh;

	.nav-bar {
		background-color: $bg-tint;
		color:$text-white;
	}
	.detail-content {
		position: absolute;
		top:44px;
		bottom: 49px;
		left:0;
		right:0;
		display: flex;
		overflow: hidden;

		.tab-content {
			height:100%;
			flex: 1;
		}
	}
}
</style>
