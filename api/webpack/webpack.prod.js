const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  externals: {
    ...common.externals,
    'aws-sdk': 'aws-sdk'
  }
})