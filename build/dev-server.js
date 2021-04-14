// 引入必要的模块
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.dev.conf')

// 创建一个express实例
var app = express()

// 调用webpack并把配置传递过去，通过webpack.dev.conf.js获取到webpack文件
var compiler = webpack(config)

// 使用 webpack-dev-middleware 中间件，将webpack文件打包到内存中
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    /*proxy: [
        {
            context: ['/resource/!**', '/xlsx/!**','/GisMap/!**'],
            target: 'http://localhost:8080',
            secure: false
        }
    ],*/
    proxy:{
        '/xlsx/':{
            target:  'http://localhost:8080',
            changeOrigin: true
        }

    },
    stats: {
        colors: true,
        chunks: false
    }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)

// webpack插件，监听html文件改变事件 主要提供Server-Sent Events（以下简称 SSE）技术用于热更新
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        // 发布事件
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})

// 注册中间件
app.use(devMiddleware)
// 注册中间件
app.use(hotMiddleware)

// 监听 8888端口，开启服务器
app.listen(8888, function (err) {
    if (err) {
        return
    }
    // console.log('Listening at http://localhost:8888')
})