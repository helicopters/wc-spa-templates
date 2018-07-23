const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const {
  VueLoaderPlugin
} = require('vue-loader');
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
const config = {
  entry: {
    /*     
        webpack-hot-middleware/client 是必须要加上的, 不然的话不会热更新
        ./build/client.js 也是必须要加, 不然刷新之后错误提示就会失效
    */
    app: ['./build/client.js', './src/main.js', 'webpack-hot-middleware/client']
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[name].[hash:7].js',
  },
  /*开发环境需要开启 devtool, 这样方便调试, 因为可以直接通过错误到达具体的文件*/
  devtool: '#cheap-module-eval-source-map',
  mode: 'development',
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        "style-loader",
        "css-loader",
        'postcss-loader',
        "sass-loader"
      ]
    }, {
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
        'less-loader'
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        compact: false
      },
      include: [path.resolve(process.cwd(), 'src')],
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 1000 * 10,
        name: './static/[name].[hash:7].[ext]'
      },
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 1000 * 10,
        name: './static/[name].[hash:7].[ext]'
      }
    }]
  },
  plugins: [
    new FriendlyErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new VueLoaderPlugin()
  ]
};
module.exports = config;
