const serverlessWebpack = require('serverless-webpack')

module.exports = {
  entry: serverlessWebpack.lib.entries,
  resolve: {
    modules: [ 'node_modules' ],
    extensions: [ '.wasm', '.ts', '.tsx', '.mjs', '.cjs', '.js', '.json' ]
  },
  stats: 'minimal',
  target: 'node',
}