var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, 'example/src/index.js'),
  output: {
    path: path.join(__dirname, 'example/dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        }],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'example/src/index.html'),
      filename: './index.html'
    })
  ],
  resolve: {
    extensions: ['.js'],
    alias: {
      'react-dnd-container': path.resolve(__dirname, 'index.js'),
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'example/dist'),
  },
}
