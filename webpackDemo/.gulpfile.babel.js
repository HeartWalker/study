
import path from 'path'
import del from 'del'
import WebpackDevServer from 'WebpackDevServer'
import webpack from 'webpack'
import webpackDevelopConfig from './webpack.develop.config'
import webpackProductionConfig from './webpack.production.config'
import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import gutil from 'gulp-util'
const plugins = gulpLoadPlugins()

// develop config
gulp.task("default", ["webpack-dev-server"]);

gulp.task("webpack-dev-server", function(callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackDevelopConfig);
  myConfig.devtool = "eval";
  myConfig.debug = true;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(myConfig), {
    publicPath: "/" + myConfig.output.publicPath,
    contentBase: 'src',
    // noInfo: false,
    hot: true,
    inline: true,
    // historyApiFallback: true,
    stats: {
      colors: true
    }
  }).listen(8080, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
  });
});

// ----------------------------------------------------------------------------------------------------------
// production config
gulp.task("production", ["webpack:build"]);

gulp.task("webpack:build", function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackProductionConfig);
    myConfig.plugins = myConfig.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );

    // run webpack
    webpack(myConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        callback();
    });
});
