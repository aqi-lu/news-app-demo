import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载全局样式
import './styles/index.scss'

Vue.config.productionTip = false

// 创建vue根实例,将router,store配置到根实例中
// 把APP根组件渲染到 #app 节点
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
