var path = require('path')

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    path.resolve(__dirname, 'src/app.js')
  ],
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
        loader: 'style!css' // Run both loaders
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=25000&name=img/[name].[ext]' // 对25000b 的图片会被编译成字节码 name=后的是字节大于25000的输出路径
      }
    ]
  }
}
