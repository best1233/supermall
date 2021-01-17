<template>
  <transition name="fade">
    <div class="toast" v-show="isShow">
      <div>{{ message }}</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "默认文字",
      isShow: false
    };
  },
  methods: {
		show(message = '加入购物车成功',duration = 2000) {
			this.isShow = true;
			this.message = message;

			setTimeout(() => {
				this.isShow = false;
				// this.message = '';
			}, duration);
		}
	}
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 9999;
  transform: translate(-50%, -50%);

  padding: 8px 10px;
  border-radius: 5px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.75);
}
.toast > div {
	white-space: nowrap;
}
</style>
