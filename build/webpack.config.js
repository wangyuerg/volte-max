// nodejs 中的path模块
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require("webpack");


module.exports = {
    // 入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
    entry: {
        app: './app/index/index',
        vendors:['jquery','echarts','element-ui']
    },
    context: path.resolve('./'),

    // 输出配置
    output: {
        // 输出路径是 myProject/output/static
        path: path.resolve(__dirname, '../output/static'),
        publicPath: './static/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    resolve: {
        extensions: ['', '.js', '.vue','.css'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'vue': 'vue/dist/vue.js',
            'config': path.resolve(__dirname, '../app/index/config.vue'),
            'access': path.resolve(__dirname, '../app/index/access.vue'),
            'Api': path.resolve(__dirname, '../app/index/api/api.js'),
            'jquery': path.resolve(__dirname, '../node_modules/jquery/dist/jquery.js'),
            'loadsh':path.resolve(__dirname, '../app/index/directives/lodash.min.js'),
            'util': path.resolve(__dirname, '../app/index/util.js'),
            'echarts':path.resolve(__dirname, '../app/index/directives/echarts/echarts.js'),
            'bootstrap': path.resolve(__dirname, '../node_modules/bootstrap/dist/js/bootstrap.js'),
            'bootstrap.css': path.resolve(__dirname, '../node_modules/bootstrap/dist/css/bootstrap.css'),
            'cropper':path.resolve(__dirname, '../node_modules/cropper/dist/cropper.js'),
            'cropper.css':path.resolve(__dirname, '../node_modules/cropper/dist/cropper.css'),
            'layer':path.resolve(__dirname, '../app/index/directives/layer/layer.js'),
            'layer.css':path.resolve(__dirname, '../app/index/directives/layer/skin/layer.css'),
            'easyDropDown':path.resolve(__dirname, '../app/index/directives/UI/easyDropDown.js'),
            'niceScroll':path.resolve(__dirname, '../app/index/directives/UI/jquery.nicescroll.js'),
            'gui':path.resolve(__dirname, '../app/index/directives/GUI-2.0.0/js/rdc.min.js'),
            'gui.css':path.resolve(__dirname, '../app/index/directives/GUI-2.0.0/css/rdc.min.css'),
            'stickySort':path.resolve(__dirname, '../app/index/directives/stickySort/js/jquery.stickysort.min.js'),
            'ba-throttle-debounce':path.resolve(__dirname, '../app/index/directives/stickySort/js/jquery.ba-throttle-debounce.min.js'),
            'stickySort.css':path.resolve(__dirname, '../app/index/directives/stickySort/css/stickysort.css'),
            'WdatePicker':path.resolve(__dirname, '../app/index/directives/My97DatePicker/WdatePicker.js'),
            'datePicker':path.resolve(__dirname, '../app/index/directives/datePicker/bootstrap-datetimepicker.js'),
            'datePicker.css':path.resolve(__dirname, '../app/index/directives/datePicker/bootstrap-datetimepicker.css'),
            'bootstrapTable':path.resolve(__dirname, '../app/index/directives/bootstrap-table/bootstrap-table.js'),
            'bootstrapTable.css':path.resolve(__dirname, '../app/index/directives/bootstrap-table/bootstrap-table.min.css'),
            'laydate':path.resolve(__dirname, '../app/index/directives/laydate-master/laydate.dev.js'),
            'laydate.css':path.resolve(__dirname, '../app/index/directives/laydate-master/need/laydate.css'),
            'bxslider':path.resolve(__dirname, '../app/index/directives/bxslider/jquery.bxslider.min.js'),
            'bxslider.css':path.resolve(__dirname, '../app/index/directives/bxslider/jquery.bxslider.css'),
            'gis':path.resolve(__dirname, '../app/index/directives/gis/gis2.js')
        }
    },
    module: {

        loaders: [
            // 使用vue-loader 加载 .vue 结尾的文件
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            { test: /\.css$/,
                exclude: /\.useable\.css$/,
                loader: "style!css"
            },
            {
                test: /\.scss$/,
                loader: "style!css!sass"
             },
            {
                test: /\.js$/,
                loader: 'babel',
                include: [path.resolve(__dirname, '../app/index')],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url',
                query: {
                    limit: 50000,
                    name: '[name].[ext]?[hash:7]'
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            }/*,
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff2"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"}*/
        ]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'app/index/index.html',
            template: path.resolve(__dirname, '../app/index/index.html'),
            inject: true
        }),
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "window.jQuery":"jquery",
            ued:"gui",
            "window.ued":"gui",
            _:'loadsh',
            "window._":"loadsh",
            Gis:'Gis',
            'window.dojo':'window.dojo'
        })
    ]
}