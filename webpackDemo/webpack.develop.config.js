var path = require('path')

module.exports = {
  entry:{
    app: path.resolve(__dirname, 'src/app.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist/js'), // path参数表示生成文件的根目录，需要传入一个绝对路径。path参数和后面的filename参数共同组成入口文件的完整路径
    publicPath: '',
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
