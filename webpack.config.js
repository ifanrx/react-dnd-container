var path = require('path')

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
  ],
  resolve: {
    extensions: ['.js'],
    alias: {
      'react-dnd-container': path.resolve(__dirname, 'src/index.js'),
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'example'),
  },
}
