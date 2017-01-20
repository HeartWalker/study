var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/app.js'),
    vendors: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'bundle.js'
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
        loader: 'style!css' // Run both loaders style-loader会将css打包到内部
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=25000&name=img/[name].[ext]' // 对25000b 的图片会被编译成字节码 name=后的是字节大于25000的输出路径 在output 配置的path之后
      }
    ]
  },
  plugins: [
    // 分离第三方应用插件
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ]
}
