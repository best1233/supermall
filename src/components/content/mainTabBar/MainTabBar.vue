<template>
  <TabBar>
    <TabBarItem v-for="(item, i) in items" :key="i" :path="item.path">
      <!-- 由于使用require,所以路径使用定义的别名即可 -->
      <template #item-icon> 
        <img :src="`${require(`assets/img/tabbar${item.path}.svg`)}`" alt="" />
      </template>
      <template #item-icon-active>
        <img :src="`${require(`assets/img/tabbar${item.path}_active.svg`)}`" alt=""/>
      </template>
      <template #item-text>{{ item.text }}</template>
    </TabBarItem>
  </TabBar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";
export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem,
  },
  data() {
    return {
      /**
       * 传递的路由路径必须与图片的名称保持一致
       */
      items: [
        {
          path: "/home",
          text: "首页"
        },
        {
          path: "/category",
          text: "分类"
        },
        {
          path: "/shopcart",
          text: "购物车"
        },
        {
          path: "/profile",
          text: "我的"
        }
      ],
    };
  },
};
</script>
