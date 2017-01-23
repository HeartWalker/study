var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
import configEntry from './webpack.base.config'
configEntry['vendors'] = ['react', 'react-dom']
module.exports = {
  entry: configEntry,
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出文件根目录\
    publicPath: '',
    filename: '[name].js',
    chunkFilename: '[id].bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
        loader: 'babel', // 加载模块 "babel" 是 "babel-loader" 的缩写
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/, // Only .css files
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')// Run both loaders
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url?limit=25000&name=img/[name].[ext]' // 对25000b 的图片会被编译成字节码 name=后的是字节大于25000的输出路径 在output 配置的path之后
      }
    ]
  },
  resolve: {
    // 查找module的话从这里开始查找
    // root: './node_modules', //绝对路径
    // 自动扩展文件后缀名，意味着我们require|imoport模块可以省略不写后缀名
    // 注意一下, extensions 第一个是空字符串! 对应不需要后缀的情况.
    extensions: ['', '.js', '.json', '.scss', '.jsx'],
    // 模块别名定义，方便后续直接引用别名，无须多写长长的地址
    alias: {
      // AppStore: 'js/stores/AppStores.js', //后续直接 require('AppStore') 即可
      // ActionType: 'js/actions/ActionType.js',
      // AppAction: 'js/actions/AppAction.js'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors', // 这公共代码的chunk名为'commons'
      filename: '[name].js', // 生成后的文件名，虽说用了[name]，但实际上就是'commons.bundle.js'了
      minChunks: 2, // 设定要有4个chunk（即4个页面）加载的js模块才会被纳入公共代码。这数目自己考虑吧，我认为3-5比较合适。
    }), // 分离第三方应用插件
    new ExtractTextPlugin('[name].css'), // [name]对应的是chunk的name
    new webpack.optimize.DedupePlugin(), // 去重
    // 压缩
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}
