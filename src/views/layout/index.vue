<template>
  <div class="layout-container flex flex-col">
    <!-- <van-nav-bar class="app-nav-bar">
      <van-button type="info" slot="title" class="search-btn" icon="search" size="small" round>搜索</van-button>
    </van-nav-bar> -->
    <!-- 子路由出口 -->
    <router-view />
    <!-- /子路由出口 -->

  <!-- 底部导航栏 -->
  <van-tabbar v-model="active" route>
    <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="comment-o" to="/qa">问答</van-tabbar-item>
    <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
    <van-tabbar-item icon="user-o" to="/my">我的</van-tabbar-item>
  </van-tabbar>
  <!-- /底部导航栏 -->
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  components: {
  },
  props: {},
  data () {
    return {
      active: 'home'
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
