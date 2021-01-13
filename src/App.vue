<template>
  <div id="app">
    <transition name="fade">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
    <MainTabBar />
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabBar/MainTabBar";
export default {
  name: "App",
  components: {
    MainTabBar
  },
  data() {
    return {
      transitionName: ''
    }
  },
  // watch: {
  //   '$route'(to, from) {
  //     //页面切换动画
  //     const toIndex = to.meta.index
  //     const fromIndex = from.meta.index
  //     console.log(toIndex,fromIndex);
  //     if (toIndex === fromIndex) {
  //       this.transitionName = '';
  //       return;
  //     }
  //     this.transitionName = toIndex < fromIndex ? 'slide-right' : 'slide-left'
  //   }
  // }
};
</script>

<style lang="scss">
@import "./assets/scss/base.scss";
// .slide-right-enter-active,
// .slide-right-leave-active,
// .slide-left-enter-active,
// .slide-left-leave-active {
//   transition: all 3s;
//   // position: absolute;
//   // top:0;
//   // left:0;
//   // right:0;
// }
 
// .slide-right-enter {
//   opacity: 0;
//   transform:translate(-100%,0);
// }
 
// .slide-right-leave-active {
//   opacity: 0;
//   transform: translate(100%, 0);
// }
 
// .slide-left-enter {
//   opacity: 0;
//   transform: translate(100%, 0);
// }
 
// .slide-left-leave-active {
//   opacity: 0;
//   transform: translate(-100%, 0);
// }
</style>
