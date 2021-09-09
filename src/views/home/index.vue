<template>
  <div class="home-container flex flex-col">
    <van-nav-bar class="app-nav-bar">
      <van-button type="info" slot="title" class="search-btn" icon="search" size="small" round>搜索</van-button>
    </van-nav-bar>
    <van-tabs
      class="tabs flex-1 flex flex-col"
      v-model="active"
      color="#3196fa"
      @change="onChange"
    >
      <template #nav-right>
        <div class="nav-right flex flex-row-center flex-col-center" @click="showMenu = true">
          <van-icon name="bars" color="#000" />
        </div>
      </template>
      <van-tab
        :title="item.name"
        v-for="item in channels"
        :key="item.id"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          offset="200"
        >
          <van-cell v-for="(item, idx) in list" :key="idx" :title="item" />
        </van-list>
      </van-tab>
    </van-tabs>
    <van-popup v-model="showMenu" position="bottom">
      <div class="edit-menu w-100 vh-100 px-15 py-10">
        <div class="edit-header flex flex-row-center flex-col-center p-relative">
          <div class="p-absolute icon-wrapper flex flex-col-center" @click="showMenu = false">
            <van-icon name="cross" color="#3196fa" size="18" />
          </div>
          <p class="fs-16 color-333">我的频道</p>
        </div>
        <div class="edit-my mt-30">
          <div class="edit-header flex flex-row-between flex-col-center">
            <div class="edit-title flex flex-col-baseline">
              <p class="fs-16 color-333">我的频道</p>
              <p class="fs-12 color-ccc ml-10">点击进入频道</p>
            </div>
            <div class="edit-btn fs-14 flex flex-row-center flex-col-center color-fff" @click="isEdit = !isEdit">
              {{ !isEdit ? '编辑' : '取消' }}
            </div>
          </div>
          <div class="edit-channels flex flex-wrap pt-15">
            <div
              class="edit-channels-item flex flex-row-center flex-col-center fs-16 bg-eee color-333"
              :class="{ 'is-edit': isEdit && idx !== 0 }"
              v-for="(item, idx) in getChannels"
              :key="item.id"
              @click="removeChannel(idx)"
            >{{ item.name }}</div>
          </div>
        </div>
        <div class="edit-all mt-15">
          <div class="edit-title flex flex-col-baseline">
            <p class="fs-16 color-333">推荐频道</p>
            <p class="fs-12 color-ccc ml-10">点击添加频道</p>
          </div>
          <div class="edit-channels flex flex-wrap pt-15">
            <div
              class="edit-channels-item flex flex-row-center flex-col-center fs-16 bg-eee color-333"
              v-for="(item, idx) in getAllChannels"
              :key="item.id"
              @click="addChannel(idx)"
            >{{ item.name }}</div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { findCategories } from '@/api/home'

export default {
  name: 'HomeIndex',
  components: {},
  props: {},
  data () {
    return {
      active: 0,
      loading: false,
      finished: false,
      showMenu: false,
      list: [],
      channels: [],
      allChannels: [],
      isEdit: false
    }
  },
  computed: {
    getChannels() {
      return [{ id: 0, name: '推荐' }, ...this.channels]
    },
    getAllChannels() {
      return this.allChannels.sort((a, b) => a.id - b.id)
    }
  },
  watch: {},
  async created () {
    const categories = await findCategories()
    const res = categories.results.map(item => {
      return { ...item, name: item.category_name }
    })
    this.channels = res.splice(0, 5)
    this.allChannels = res
  },
  mounted () {
    this.loadList()
  },
  methods: {
    loadList() {
      this.loading = true
      for (let i = 0 ; i < 10 ; i ++) {
        this.list.push('这是标题' + i)
      }
      setTimeout(() => {
        this.loading = false
      }, 2e3)
    },
    onLoad() {
      this.loadList()
    },
    onChange() {
      this.list = []
      this.loadList()
    },
    addChannel(idx) {
      this.channels.push(...this.allChannels.splice(idx, 1))
    },
    removeChannel(idx) {
      if (!this.isEdit) return
      console.log(this.channels, idx)
      this.allChannels.push(...this.channels.splice(idx - 1, 1))
    }
  }
}
</script>

<style lang="scss" scoped>
.app-nav-bar {
  background-color: #333;
  ::v-deep .van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background: #fff;
    border: none;
    .van-icon {
      font-size: 16px;
      color: gray;
    }
    .van-button__text {
      font-size: 14px;
      color: gray;
    }
  }
}
.home-container, .tabs {
  height: calc(100vh - 50px);
  overflow: hidden;
}
::v-deep .van-tabs__content {
  flex: 1;
  border: 1px solid #eee;
  overflow-y: scroll;
}
::v-deep .van-tabs__nav {
  padding-right: 44px;
}
.nav-right {
  position: fixed;
  right: 0;
  background-color: #fff;
  width: 44px;
  height: 44px;
  box-shadow: -1px 0 5px #ddd;
}

.edit-menu {
  .icon-wrapper {
    left: 0;
  }
  .edit-btn {
    border-radius: 20px;
    background: #3196fa;
    width: 50px;
    padding: 2px 0;
  }
  .edit-channels-item {
    width: 78px;
    height: 40px;
    margin-left: 10px;
    margin-bottom: 10px;
    transition: all .5s;
    &.is-edit {
      background-color: tomato;
      color: #fff;
    }
    &:nth-child(4n + 1) {
      margin-left: 0;
    }
  }
}
</style>
