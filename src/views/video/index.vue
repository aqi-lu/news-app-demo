<template>
  <div class="video-container">
    <van-cell-group>
    <video id="video" src="./国防部发言.mp4"></video>
    <canvas id="canvas" width="640" height="360"></canvas>

    <input id="range" type="range" min="0" value="0" max="100">
    <div class="time">
      <span id="ls" class="left">00:00</span>
      <span id="rs" class="right">00:00</span>
    </div>
    
    <van-button id="btn_play">播放/暂停</van-button>
    <van-button id="btn_vp">音量+</van-button>
    <van-button id="btn_vm">音量-</van-button>
    <van-button id="btn_05">0.5倍速</van-button>
    <van-button id="btn_1">1倍速</van-button>
    <van-button id="btn_2">2倍速</van-button>
    <br><br>
    <van-button id="btn_fc">全屏显示</van-button>

    <input type="text" id="dminput" 
      placeholder="输入弹幕内容">
    <van-button id="btn_dm">发送弹幕</van-button>
    </van-cell-group>
  </div>
</template>

<script src='../utils/moment.js'></script>
<script>
export default {
  name: 'videoIndex',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="scss" scoped>
 .container {
      width: 375px;
      border: 1px solid #ddd;
      text-align: center;
      padding-bottom: 10px;
      position: relative;
     p {
      font-size: 1.3em;
      font-weight: bold;
      text-align: center;
     }
     img {
      width: 340px;
      height: 340px;
      border-radius: 50%;
     }
     input{
      width: 340px;
      display: block;
      margin: 10px auto;
     }
     .time{
      width: 340px;
      height: 30px;
      margin: 0px auto;
      .left{
      float: left;
      }
      .right{
      float: right;
      }
     }
  }
  video { width: 375px; height: 667px; background: #000;}
    #canvas {
      position: absolute; top:0; left: 0;
    }
</style>
