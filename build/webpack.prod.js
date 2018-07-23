const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const {
  VueLoaderPlugin
} = require('vue-loader');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
const config = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'static/[name].[hash:8].js',
    publicPath: './'
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  node: {
    Buffer: false
  },
  mode: 'production',
  module: {
    rules: [{
      test: /\.(sa|sc)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        'sass-loader',
      ],
    }, {
      test: /\.less$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        'less-loader',
      ],
    }, {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        "postcss-loader"
      ]
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [path.resolve(process.cwd(), 'src')],
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          css: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader"
          ],
          less: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "less-loader"
          ]
        }
      }
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      exclude: [path.resolve(process.cwd(), 'src/icons')],
      query: {
        limit: 1000 * 5,
        name: 'static/[name].[hash:7].[ext]'
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 1000 * 5,
        name: 'static/[name].[hash:7].[ext]'
      }
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: true
    }),
    new VueLoaderPlugin()
  ],
  /* 用的是默认的配置 */
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
module.exports = config;
