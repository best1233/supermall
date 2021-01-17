<template>
  <div class="user-info">
    <img class="privateImage" src="~assets/img/profile/avatar.svg" alt="" />
    <div class="login-info">
      <div>登录/注册</div>
      <div class="phone">
        <img class="icon-mobile" src="~assets/img/profile/phone.svg" alt="" />
        <span>暂无绑定手机号</span>
      </div>
    </div>
    <img class="right-arrow" src="~assets/img/common/arrow-left.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "UserInfo"
};
</script>

<style scoped lang="scss">
.user-info {
	display: flex;
	justify-content: space-between;
  padding: 15px;
  margin-top: -5px;
  background-color: $bg-tint;

  .privateImage {
    @include square(60px);
    border-radius: 30px;
    background-color: $bg-white;
  }
  .login-info {
		position: relative;
		left: -40px;
		margin-top: 10px;
    color: $text-white;
	
    .phone {
			position: relative;
			display: flex;
			margin-top:5px;

      .icon-mobile {
        position: absolute;
				left: -6px;
				top: -8px;
				@include size(20px, 30px);
			}
			
			span {
        padding-left:13px;
				font-size:13px;
			}
    }
	}
	.right-arrow {
		width:16px;
	}
}
</style>
