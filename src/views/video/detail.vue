<template>
   <div>
    <video-player
      class="video-player vjs-custom-skin"
      ref="videoPlayer"
      :playsinline="true"
      :options="playerOptions"
    ></video-player>
    <div class="info-wrapper py-15">
      <p class="title fs-16 color-333 line-2 px-10">
        国防部
      </p>
      <div class="flex flex-row-end mt-10 px-10">
        <p class="fs-12 color-999">10900观看</p>
        <p class="fs-12 color-999 ml-15">20点赞</p>
        <p class="fs-12 color-999 ml-15">时间：3天前</p>
      </div>
      <div class="comments mt-15">
        <div class="comment-item flex px-10 py-15" v-for="(item, idx) in 2" :key="idx">
          <img class="comment-avatar mr-15 mt-5" src="https://img0.baidu.com/it/u=2809737200,31955359&fm=26&fmt=auto&gp=0.jpg" alt="">
          <div class="comment-content flex-1">
            <div class="comment-header flex flex-row-between">
              <p class="username fs-12 color-999 flex flex-col">
                <span>我是评论者</span>
                <span class="mt-5">2020-09-23</span>
              </p>
              <p class="color-999 flex flex-col-center">
                <van-icon size="16" name="good-job-o"></van-icon>
                <span class="fs-12 ml-5">20</span>
              </p>
            </div>
            <div class="comment-text fs-12 color-333 mt-10">
              此处为评论区
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videolist: [
        { title: "标题A", movie: "./111.mp4" },
        { title: "标题B", movie: "./222.mp4" }
      ],
      playsinline: true,
      playerOptions: {
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
            src: require("./222.mp4") //url地址
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
      },
      options: ""
    };
  },
  created() {
  },

  methods: {
  }
};
</script>

<style lang="scss" scoped>
.video-container {
  min-height: 100vh;
  padding-bottom: 50px;
  .video-player {
    height: 300px;
  }
}
.comment {
  &-item {
    border-top: 1px solid #eee;
  }
  &-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
}
</style>