<template>
  <div class="account">
    <div class="account-item">
      <div class="number"><span class="balance">0.00</span>元</div>
      <div class="account-info">我的余额</div>
    </div>
    <div class="account-item">
      <div class="number"><span class="balance">0</span>个</div>
      <div class="account-info">我的优惠</div>
    </div>
    <div class="account-item">
      <div class="number"><span class="balance">0</span>分</div>
      <div class="account-info">我的积分</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountInfo"
};
</script>

<style scoped lang="scss">
.account {
  display: flex;

  .account-item {
    width:100%;
    padding: 18px;
    font-size: 13px;
    margin-right:1px;
    color: $color-text;
    text-align: center;
    background-color: $color-white;

    .balance {
      font-size:24px;
      font-weight:700;
      color:#ff5f3e;
    }
    .account-info {
      margin-top:6px;
    }
  }
}
</style>
