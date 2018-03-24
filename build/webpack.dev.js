const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 在命令行里面的错误提示友好一点
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');




// 获取全局变量
// const env = require('../config/dev')

const config = {
    entry: {
        // webpack-hot-middleware/client 是必须要加上的, 不然的话不会热更新
        // ./build/client.js 也是必须要加, 不然刷新之后错误提示就会失效
        app: ['./build/client.js', './src/main.js', 'webpack-hot-middleware/client']
    },
    // 开发环境需要开启 devtool, 这样方便调试, 因为可以直接通过错误到达具体的文件
    devtool: '#cheap-module-eval-source-map',
    output: {
        path: path.resolve(process.cwd(), 'dist'),
        filename: '[name].[hash:7].js',
    },
    resolve: {
        extensions: ['.js', '.json', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'modules': path.resolve(process.cwd(), 'src/modules'),
            'components': path.resolve(process.cwd(), 'src/components'),
            'config': path.resolve(process.cwd(), 'src/config'),
            'router': path.resolve(process.cwd(), 'src/router'),
            'assets': path.resolve(process.cwd(), 'src/assets'),
            'static': path.resolve(process.cwd(), 'static')
        }
    },
    module: {
        rules: [{
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
            }, {
                test: /\.css$/,
                // 这个后面不能加上 postcss-loader
                // 加上之后报错: 所有的 css 文件都找不到
                use: ['style-loader', 'css-loader']
            },


/*

                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loaders: [
                        'babel-loader',
                        'eslint-loader'
                    ],
                    query: {
                        cacheDirectory: true
                    }
                },
*/



            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader'
                }, {
                    loader: 'eslint-loader',
                    options: {
                        fix: true
                    }
                }],
                // loaders: [
                //     'babel-loader',
                //     'eslint-loader'
                // ],
                // // query: {
                // //     compact: false
                // // },
                // options: {
                //     fix: true
                // },
                include: [path.resolve(process.cwd(), 'src')],
            },

                {
                    test: /\.vue$/,
                    enforce: 'pre',  // 在babel-loader对源码进行编译前进行lint的检查
                    // include: /src/,  // src文件夹下的文件需要被lint
                    include: [path.resolve(process.cwd(), 'src')],
                    use: [{
                        loader: 'eslint-loader',
                        options: {
                            formatter: require('eslint-friendly-formatter'),   // 编译后错误报告格式
                            fix: true

                        }
                    }]
                    // exclude: /node_modules/ 可以不用定义这个字段的属性值，eslint会自动忽略node_modules和bower_
                },



            {

                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 1000 * 10,

                    name: './static/[name].[hash:7].[ext]'
                }

            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 1000 * 10,
                    name: './static/[name].[hash:7].[ext]'
                }

            }
        ]
    },
    plugins: [
        new FriendlyErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoEmitOnErrorsPlugin(),
        // new ExtractTextPlugin('style.css'),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        // // 定义全局变量
        new webpack.DefinePlugin({
            // 直接使用 env 对象
            'process.env': {
                NODE_ENV: '"development"'
            }
        })
    ]
};

module.exports = config