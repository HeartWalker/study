
if (process.env.NODE_ENV === 'development') {
  require('babel-register')
  require('./src/app')
  // require('openurl').open('http://localhost:3000/')
} else {
  require('./dist/app')
}
