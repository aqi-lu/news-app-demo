import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/public.scss'

// 加载 Vant 组件库
import Vant from 'vant'

// 加载 Vant 组件库样式
import 'vant/lib/index.css'

// 自动设置 REM 基准值 (html.标签字体大小)
import 'amfe-flexible'

// 加载全局样式(放到最后就不会影响组件样式加载了，方便覆盖第三方样式)
import './styles/index.scss'

// 全局注册 Vant 中的组件
Vue.use(Vant)

Vue.config.productionTip = false

// 创建vue根实例,将router,store配置到根实例中
// 把APP根组件渲染到 #app 节点
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
