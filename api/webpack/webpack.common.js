const path = require('path');
const slsw = require('serverless-webpack');

module.exports = {
	stats: 'minimal',
  context: path.resolve(process.cwd()),
  entry: slsw.lib.entries,
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.ts'
    ]
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(process.cwd(), '.webpack'),
    filename: '[name].js'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        options: {
        }
      }
    ]
  }
}