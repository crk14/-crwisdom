// var CompressionWebpackPlugin = require("compression-webpack-plugin")
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const env = process.env.NODE_ENV;
module.exports = {
    publicPath: './',
    //清楚语法警告
    lintOnSave:false,
    devServer: {
        // port: 81,
        /* 使用代理 */
        proxy: {
            '/index': {
                // 账号：18616969878   xyf969878
                /* 目标代理服务器地址  15779096610 */
                target: 'http://192.168.0.104/',	//http://127.0.0.2 http://bookislight.com
                /* 允许跨域 */
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/index': '/index' //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
                }
            },
			"dev_index":{
				target: 'http://bookislight.com',	//http://127.0.0.2 http://bookislight.com
				/* 允许跨域 */
				ws: true,
				changeOrigin: true,
				pathRewrite: {
				    '^/dev_index': '/index' //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
				}
			}
        },
    },
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    //img图片压缩
    chainWebpack: config => {
        config.module
            .rule('images')
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options({
                bypassOnDebug: true
            })
            .end()
    },
    //js代码压缩
    // configureWebpack: {
    //     plugins: [
    //         new CompressionWebpackPlugin({
    //             filename: '[path].gz[query]',
    //             algorithm: 'gzip',
    //             test: /\.js$|\.html$|\.json$|\.css/,
    //             threshold: 0, // 只有大小大于该值的资源会被处理
    //             minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
    //             deleteOriginalAssets: false // 删除原文件
    //         })
    //     ],
    // },

     // 去除console
    // configureWebpack: (config) => {
    //     if (env !== 'development' || env !== 'test') {

    //         config.plugins.push(
    //             new UglifyJsPlugin({
    //                 uglifyOptions: {
    //                     compress: {
    //                         // warnings: false,
    //                         drop_debugger: true, // 注释console
    //                         drop_console: true,
    //                         pure_funcs:['console.log'] // 移除console
    //                     },
    //                 },
    //                 sourceMap: false,
    //                 parallel: true,
    //             }),
    //         );
    //     }
    // },

}

// 安装  compression-webpack-plugin  image-webpack-loader