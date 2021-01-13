<template>
  <div id="profile">
    <NavBar><template #center>我的商城</template></NavBar>
    <!-- 用户信息 -->
    <UserInfo />
    <!-- 账户信息 -->
    <AccountInfo />
    <ListView class="order-list" :listData="orderList" />
    <ListView class="order-list" :listData="serviceList" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import UserInfo from "./childComps/UserInfo";
import AccountInfo from "./childComps/AccountInfo";
import ListView from "./childComps/ListView";

export default {
  name: "Profile",
  components: {
    NavBar,
    UserInfo,
    AccountInfo,
    ListView
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
  background-color: #f2f2f2;
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:49px;
}
.nav-bar {
  background-color: $color-tint;
  color: $color-white;
  font-weight: 700;
}
.order-list {
  margin-top: 12px;
}
</style>
