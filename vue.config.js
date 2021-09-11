module.exports={
  devServer: {
    proxy: {
      // 第一台服务器配置 
      '/self': {
        target: 'http://127.0.0.1:3000/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/self': ''
        }
      },
      // 第二台服务器配置 
      '/': {
        target: 'http://ttapi.research.itcast.cn/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/': '/'
        }
      } 
    }
  }
}