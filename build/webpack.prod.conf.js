var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
// 引入基本配置
var config = require('./webpack.config');
var commonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;


config.vue = {
    loaders: {
        css: ExtractTextPlugin.extract("css")
    }
};

config.plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    // 压缩代码
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // 提取css为单文件
    new ExtractTextPlugin("[name].[contenthash].css"),
    new HtmlWebpackPlugin({
        filename: '../index.html',
        template: path.resolve(__dirname, '../app/index/index.html'),
        inject: 'body'
    }),
    new webpack.ProvidePlugin({
        $:"jquery",
        jQuery:"jquery",
        "window.jQuery":"jquery",
        _:'loadsh',
        "window._":"loadsh",
        ued:"gui",
        "window.ued":"gui"
    }),
    new commonsChunkPlugin('vendors',  'vendors.js'),
    new webpack.optimize.UglifyJsPlugin({
        compress:{
            warning:false
        }
    })
];

module.exports = config;