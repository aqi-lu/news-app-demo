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
        :name="item.id"
      >
        <van-list
          class="van-list"
          :class="{ 'dis-trans': isDistransition }"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          offset="0"
          :style="getXStyle"
          @touchstart.native="handleStart"
          @touchmove.native="handleMove"
          @touchend.native="handleEnd"
        >
          <div class="px-10 bg-fff">
            <article-cover
              v-for="(item, idx) in articles"
              :key="idx"
              :title="item.subject"
              :cover="item.image"
            ></article-cover>
          </div>
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
import { findCategories, findArticlesByCategoryId } from '@/api/home'
import ArticleDefault from '@/components/article-default.vue'
import ArticleCover from '@/components/article-cover.vue'
import ArticleMulti from '@/components/article-multi.vue'

export default {
  name: 'HomeIndex',
  components: {
    ArticleDefault,
    ArticleCover,
    ArticleMulti
  },
  props: {},
  data () {
    return {
      active: 0,
      loading: false,
      finished: false,
      showMenu: false,  // 是否显示编辑频道弹窗
      channels: [], // 我的频道
      allChannels: [],  // 总共的频道
      isEdit: false,  // 是否编辑频道中
      articles: [], // 文章
      page: 1,
      totalPage: 1000,
      direction: 0,
      moveX: 0,
      isDistransition: false
    }
  },
  computed: {
    getChannels() {
      return [{ id: 0, name: '推荐' }, ...this.channels]
    },
    getAllChannels() {
      return this.allChannels.sort((a, b) => a.id - b.id)
    },
    getXStyle() {
      return {
        transform: `translateX(${this.moveX}px)`
      }
    }
  },
  watch: {},
  created () {
    this.initData()
  },
  mounted () {
  },
  methods: {
    handleStart(e) {
      const touch = e.touches[0]
      this.startX = touch.clientX
      this.move = this.throttle(e => {
        if (this.active === 1 && e.touches[0].clientX - this.startX > 0) {
          return
        }
        if (this.active === this.channels[this.channels.length -1].id && e.touches[0].clientX - this.startX < 0) {
          return
        }
        this.moveX = e.touches[0].clientX - this.startX
      }, 50)
    },
    handleMove(e) {
      this.move(e)
    },
    handleEnd(e) {
      setTimeout(() => {
        if (Math.abs(this.moveX) < 200) {
          this.resetPostion(false)
          return
        }
        this.direction = this.moveX < 0 ? 1 : -1
        this.active += this.direction
        this.resetPostion(true)
      }, 50)
    },
    resetPostion(isReq) {
      this.isDistransition = true
      this.moveX = 0
      setTimeout(() => {
        isReq && this.onChange()
        this.isDistransition = false
      })
    },
    async initData() {
      const categories = await findCategories()
      const res = categories.results.map(item => {
        return { ...item, name: item.category_name }
      })
      this.channels = res.splice(0, 5)
      this.$nextTick(async () => {
        this.findArticles()
      })
      this.allChannels = res
    },
    async findArticles() {
      this.loading = true
      const articleResult = await findArticlesByCategoryId({
        cid: this.active,
        page: this.page
      })
      this.loading = false
      this.totalPage = articleResult.pagecount
      this.articles = [...this.articles, ...articleResult.results]
    },
    getArticleItem(idx) {
      let comp = ''
      switch(idx % 3) {
        case 0:
          comp = 'article-default'
          break
        case 1:
          comp = 'article-cover'
          break
        case 2:
          comp = 'article-multi'
          break
      }
      return comp
    },
    onLoad() {
      if (this.page >= this.totalPage) {
        this.finished = true
        return
      }
      this.page ++
      this.findArticles()
    },
    onChange() {
      this.articles = []
      this.page = 1
      this.finished = false
      this.findArticles()
    },
    addChannel(idx) {
      // 这里这样写是因为还没有用户信息
      this.channels.push(...this.allChannels.splice(idx, 1))
    },
    removeChannel(idx) {
      if (!this.isEdit) return
      // 这里这样写是因为还没有用户信息
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
.home-container {
  width: 100%;
  overflow: hidden;
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
.van-list {
  transition: all .5s;
  transition-timing-function: cubic-bezier(0.23, 1, 0.68, 1);
  &.dis-trans {
    transition: none !important;
  }
}
</style>
