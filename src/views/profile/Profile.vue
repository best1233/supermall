<template>
  <div id="profile">
    <NavBar><template #center>个人中心</template></NavBar>
    <!-- 用户信息 -->
    <UserInfo />
    <!-- 账户信息 -->
    <AccountInfo />
    <ListView class="order-list" :listData="orderList" />
    <ListView class="order-list" :listData="serviceList" />
  </div>
</template>

<script>
import UserInfo from "./childComps/UserInfo";
import AccountInfo from "./childComps/AccountInfo";
import ListView from "./childComps/ListView";

import NavBar from "components/common/navbar/NavBar";
export default {
  name: "Profile",
  components: {
    UserInfo,
    AccountInfo,
    ListView,
    
    NavBar
  },
  data() {
    return {
      orderList: [
        { url: "message.svg", info: "我的消息" },
        { url: "pointer.svg", info: "积分商城" },
        { url: "vip.svg", info: "会员卡" }
      ],
      serviceList: [
        { url: "cart.svg", info: "我的购物车" },
        { url: "shopping.svg", info: "下载购物APP" }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
#profile {
  // position: absolute;
  // top:0;
  // left:0;
  // right:0;
  // bottom:49px;
  background-color: $bg-light;
  
  .order-list {
    margin-top: 12px;
  }
}
.nav-bar {
  color: $text-white;
  background-color: $bg-tint;
}
</style>
