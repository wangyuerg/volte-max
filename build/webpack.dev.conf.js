var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path');
var webpack = require('webpack');
// 引入基本配置
var config = require('./webpack.config');

config.output.publicPath = '/';

let env = process.argv[2]
let envName

if (env === 'mock') {
    envName = {
        NODE_ENV: '"mock"'
    }
} else {
    envName = {
        NODE_ENV: '"development"'
    }
}

config.plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
        'process.env': envName
    }),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, '../app/index/index.html'),
        inject: true
    }),
    new webpack.ProvidePlugin({
        $:"jquery",
        jQuery:"jquery",
        "window.jQuery":"jquery",
        _:'loadsh',
        "window._":"loadsh",
        ued:"gui",
        "window.ued":"gui"
    })
];

// 动态向入口配置中注入 webpack-hot-middleware/client
var devClient = './build/dev-client';
Object.keys(config.entry).forEach(function (name, i) {
    var extras = [devClient]
    config.entry[name] = extras.concat(config.entry[name])
})


module.exports = config;