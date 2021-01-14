<template>
  <NavBar>
    <template #left>
			<div class="back" @click="backClick">
      	<img src="~assets/img/common/back.svg" alt="" />
			</div>
    </template>
    <template #center>
      <div class="title">
        <div
          class="title-item"
          v-for="(item, index) in titles"
          :key="item"
          :class="{ active: currentIndex === index }"
          @click="itemClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </template>
  </NavBar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
export default {
	name: 'DetailNavBar',
	components: {
		NavBar
	},
	data() {
		return {
			titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
		}
	},
	methods: {
		backClick() {
      // this.$router.go(-1);
      this.$router.back();
    },
		itemClick(index) {
      this.currentIndex = index;
      this.$emit('titleClick',index);
    }
	}
};
</script>

<style scoped lang="scss">
.title {
  display:flex;

  .title-item {
    flex: 1;

    &.active {
      color:$main-color;
    }
  }
}
</style>
