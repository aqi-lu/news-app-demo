<template>
  <div class="home-container">
    <van-nav-bar class="app-nav-bar">
    <van-button type="info" slot="title" class="search-btn" icon="search" size="small" round>搜索</van-button>
    </van-nav-bar>

  <van-tabs v-model="active">
    <van-tab :title="channnel.name" v-for="channel in channels" :key="channel.id">
      {{channel.name}}
    </van-tab>
  </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'HomeIndex',
  components: {},
  props: {},
  data () {
    return {
      active: 0
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
.home-container {
  ::v-deep .van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background: #808080;
    border: none;
    .van-icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
}
</style>
