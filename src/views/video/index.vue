<template>
  <div class="video-list px-20">
    <div class="video-list-item pt-10" v-for="(item, idx) in list" :key="idx">
      <p class="fs-14 color-333 line-2">{{ item.title }}</p>
      <video-player
        class="video-player vjs-custom-skin mt-10"
        ref="videoPlayer"
        :key="idx"
        :playsinline="true"
        :options="initOptions(item)"
      ></video-player>
      <div class="operate flex py-10 color-999 fs-16" @click="toDetail">
        <div class="flex-1 flex flex-row-center flex-col-center">
          <van-icon name="thumb-circle-o"></van-icon>
          <span class="ml-5">{{ item.good }}</span>
        </div>
        <div class="flex-1 flex flex-row-center flex-col-center">
          <van-icon name="comment-o"></van-icon>
          <span class="ml-5">{{ item.comment }}</span>
        </div>
        <div class="flex-1 flex flex-row-center flex-col-center">
          <van-icon name="share-o"></van-icon>
          <span class="ml-5">{{ item.forward }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    // 假装请求获取视频的数据
    setTimeout(() => {
      const data = [
        { title: '爱的色放垃圾水电费蓝思科技地方', url: '111.mp4', good: 20, comment: 50, forward: 30 },
        { title: '支持传入图标名称或图片链接，所有可用的图标名称见右侧示例。', url: '222.mp4', good: 11, comment: 33, forward: 12 },
        { title: '会在图标右上角展示一个小红点', url: '111.mp4', good: 12, comment: 12, forward: 1 },
        { title: 'Icon 的 color 属性用来设置图标的颜色。', url: '222.mp4', good: 34, comment: 14, forward: 34 },
        { title: '属性用来设置图标的尺寸大小，默认单位为 px', url: '111.mp4', good: 33, comment: 55, forward: 12 },
        { title: 'Icon 组件默认引用有赞 CDN 提供的字体文件，', url: '222.mp4', good: 112, comment: 66, forward: 111 }
      ]
      this.list = data
    })
  },
  methods: {
    initOptions(item) {
      return{
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            type: "video/ogg",
            src: require('./' + item.url) //url地址
          }
        ]
      }
    },
    toDetail() {
      this.$router.push({ name: 'VideoDetail' })
    }
  }
}
</script>

<style lang="scss">
.video-list {
  min-height: 100vh;
  background: #fff;
  padding-bottom: 50px;
}
.video-list-item {
  border-bottom: 1px solid #ddd;
  .video-player {
    border-radius: 10px;
    overflow: hidden;
    height: 150px;
    & > div {
      padding: 0;
      height: 100%;
    }
  }
}
</style>