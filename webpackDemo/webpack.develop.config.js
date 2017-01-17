var path = require('path');

module.exports = {
  entry:path.resolve(__dirname,'src/app.js'),
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
    ]
  }
}
