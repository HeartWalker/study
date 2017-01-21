import path from 'path'
import del from 'del'
import WebpackDevServer from 'webpack-dev-server'
import webpack from 'webpack'
import webpackDevelopConfig from './webpack.develop.config'
import webpackProductionConfig from './webpack.production.config'
import gulp from 'gulp'
import gutil from 'gulp-util'

// develop config
gulp.task('default', ['webpack-dev-server'])

gulp.task('webpack-dev-server', function (callback) {
  // modify some webpack config options
  let myConfig = Object.create(webpackDevelopConfig)
  myConfig.devtool = 'eval'
  myConfig.debug = true

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(myConfig), {
    publicPath: '/' + myConfig.output.publicPath,
    contentBase: 'src', // 服务器根目录
    // noInfo: false,
    hot: true,
    inline: true,
    // historyApiFallback: true,
    stats: {
      colors: true
    }
  }).listen(8080, 'localhost', function (err) {
    if (err) throw new gutil.PluginError('webpack-dev-server', err)
    gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html')
  })
})

// ----------------------------------------------------------------------------------------------------------
// production config
gulp.task('production', ['webpack:build'])

// 删除dist文件
gulp.task('clean', () => {
  return del(['dist'])
})

gulp.task('webpack:build', ['clean'], function (callback) {
  // modify some webpack config options
  let myConfig = Object.create(webpackProductionConfig)
  // run webpack
  webpack(myConfig, function (err, stats) {
    if (err) throw new gutil.PluginError('webpack:build', err)
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }))
    callback()
  })
})
