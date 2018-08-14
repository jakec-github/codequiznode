const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  entry: './src/client/index.js',
  devtool: 'source-map',
  mode: 'production',
})
