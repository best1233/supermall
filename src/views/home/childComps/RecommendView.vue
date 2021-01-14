<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item, i) in recommends" :key="i">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped lang="scss">
.recommend {
  display: flex;
  padding: 10px 0 20px;
  border-bottom: 10px solid $border-light;
}

.recommend-item {
  flex: 1;
  text-align: center;
  font-size: 12px;

  img {
    @include square(70px);
    margin-bottom: 10px;
  }
}
</style>
