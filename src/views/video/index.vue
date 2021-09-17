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
      <div class="operate flex py-10 color-999 fs-16">
        <div class="flex-1 flex flex-row-center flex-col-center">
          <van-icon name="thumb-circle-o"></van-icon>
          <span class="ml-5">{{ item.good }}</span>
        </div>
        <div class="flex-1 flex flex-row-center flex-col-center" @click="toDetail">
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
        { title: '国防部最新回应', url: '111.mp4', good: 20, comment: 50, forward: 30 },
        { title: '国防部最新会议', url: '222.mp4', good: 11, comment: 33, forward: 12 },
        { title: '国防部最新会议', url: '111.mp4', good: 12, comment: 12, forward: 1 },
        { title: '国防部最新会议', url: '222.mp4', good: 34, comment: 14, forward: 34 },
        { title: '国防部最新会议', url: '111.mp4', good: 33, comment: 55, forward: 12 },
        { title: '国防部最新会议', url: '222.mp4', good: 112, comment: 66, forward: 111 }
      ]
      this.list = data
    })
  },
  methods: {
    initOptions(item) {
      return{
        playbackRates: [1.0, 2.0, 3.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
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
        ],
        poster: "", //封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
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