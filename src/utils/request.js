/**
 * 请求模块
**/
import axios from 'axios'

const instance = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
  //baseURL: 'http://127.0.0.1:3000/' // 基础路径
 
})

// 请求拦截
instance.interceptors.request.use(config => {
  console.log(config)
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(res => {
  if (res.data.code !== 200) {
    return Promise.reject(res)
  }
  return res.data
}, err => {
  return Promise.reject(err)
})

// 导出
export default instance
