<template>
  <div class="article-item px-20 py-10 bg-fff flex">
    <div class="flex-1 flex flex-col flex-row-between">
      <p class="fs-12 color-333 line-2">{{ title }}</p>
      <p class="fs-12 color-999 flex mt-10">
        <span>有点666</span>
        <span class="ml-20 ">197评论</span>
        <span class="ml-20">10月前</span>
      </p>
    </div>
    <img class="img ml-10" :src="cover" alt="">
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    cover: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.article-item {
  height: 80px;
  border-bottom: 1px solid #eee;
  .img {
    width: 80px;
    height: 100%;
  }
}
</style>