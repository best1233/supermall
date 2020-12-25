<template>
  <div id="app">
    <router-view />
    <MainTabBar />
  </div>
</template>

<script>
  import MainTabBar from 'components/content/mainTabBar/MainTabBar';
  export default {
    name:'App',
    components: {
      MainTabBar
    }
  }
</script>

<style lang="scss">
@import './assets/scss/base.scss';
</style>
