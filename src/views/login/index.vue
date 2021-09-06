<template>
  <div class="login-container">
    <van-nav-bar
  class="app-nav-bar"
  title="注册 / 登录"
  left-arrow
  @click-left="$router.back()"
/>

  <!-- 登录表单 -->
  <van-cell-group>
  <van-field
    v-model="user.mobile"
    icon-prefix="iconfont icon"
    left-icon="shouji"
    placeholder="请输入手机号"
  />
  <van-field
    v-model="user.code"
    clearable
    icon-prefix="iconfont icon"
    left-icon="yanzhengma"
    placeholder="请输入验证码"
  >
  <template #button>
    <van-button class="send-btn" size="mini" round>获取验证码</van-button>
  </template>
  </van-field>
  </van-cell-group>
  <div class="login-btn-wrap">
    <van-button class="login-btn" type="info" block color="linear-gradient(to right, #333, #5d655f)" square @click="onlogin">登录</van-button>
  </div>
  <!-- /登录表单 -->
  </div>
</template>

<script>
import { login } from '@/api/user'
import { Toast } from 'vant'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onlogin () {
      Toast.loading({
        message: '登录中...', // 提示文本
        forbidClick: true, // 禁止背景点击
        duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
      })
      // 1.找到数据接口
      // 2.封装请求方法
      // 3.请求调用登录
      try {
        const res = await login(this.user)
        // 4.处理响应结果
        console.log(res)
        Toast.success('登录成功')
      } catch (err) {
        console.log(err)
        Toast.fail('登录失败,手机号或验证码错误')
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.login-container {
  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button_text {
      font-size: 11px;
      color: #666666;
    }
  }
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      border: none;
      .van-button_text {
        font-size: 15px;
      }
    }
  }
}
</style>
