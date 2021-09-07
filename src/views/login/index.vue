<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="注册 / 登录"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 登录表单 -->
    <!-- 基于vant的表单验证 -->

    <van-form
      :show-error="false"
      :show-error-message="false"
      ref="login-form"
      validate-first
      @submit="onLogin"
      @failed="onFailed"
    >
      <van-field
        v-model="user.mobile"
        icon-prefix="iconfont icon"
        left-icon="shouji"
        center
        placeholder="请输入手机号"
        name="mobile"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="iconfont icon"
        left-icon="yanzhengma"
        name="code"
        placeholder="请输入验证码"
        :rules="formRules.code"
      >
        <template #button>
          <van-count-down
    v-if="isCountDownShow"
    :time="1000 * 60"
    format="ss s"
    @finish="isCountDownShow = false"
  />
          <van-button
            v-else
            class="send-btn"
            size="mini"
            round
            :loading="isSendSmsLoading"
            @click.prevent="onSendSms"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button
          class="login-btn"
          type="info"
          block
          color="linear-gradient(to right, #333, #5d655f)"
          square
          >登录</van-button
        >
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
// import { Toast } from 'vant'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      formRules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false,
      isSendSmsLoading: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onlogin () {
      this.$toast.loading({
        message: '登录中...', // 提示文本
        forbidClick: true, // 禁止背景点击
        duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
      })
      // 1.找到数据接口
      // 2.封装请求方法
      // 3.请求调用登录
      try {
        const { data } = await login(this.user)
        // 4.处理响应结果
        this.$toast.success('登录成功')
        this.$store.commit('setUser', data.data)
      } catch (err) {
        console.log(err)
        this.$toast.fail('登录失败,手机号或验证码错误')
      }
    },
    onFailed (error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: 'top' // 防止因手机键盘出现的问题
        })
      }
    },
    async onSendSms () {
      try {
      // 校验手机号码
        await this.$refs['login-form'].validate('mobile')
        // 验证通过，请求发送验证码
        this.isSendSmsLoading = true // 先让按钮转起来
        await sendSms(this.user.mobile)

        // 短信发出去了,显示倒计时，关闭发送按钮
        this.isCountDownShow = true
      } catch (err) {
      // try 里面任何代码的错误都会进入 catch
      // 不同的错误需要有不同的提示，那就需要判断了
        let message = ''
        if (err && err.response && err.response.status === 429) {
        // 发送短信失败的错误提示
          message = '发送太频繁了，请稍后重试'
        } else if (err.name === 'mobile') {
        // 表单验证失败的错误提示
          message = err.message
        } else {
        // 未知错误
          message = '发送失败，请稍后重试'
        }

        // 提示用户
        this.$toast({
          message,
          position: 'top'
        })
      }
      // 无论发送验证码成功还是失败，最后都要关闭发送按钮的 loading 状态
      this.isSendSmsLoading = false
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
