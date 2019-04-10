const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: {
    index: './src/index',
  },

  output: {
    filename: 'index.[hash:7].js',
    path: path.resolve(__dirname, 'live'),
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: 'babel-loader',
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  devServer: {
    port: 3000,
    host: '0.0.0.0',
  },

  plugins: [
    new HtmlWebpackPlugin()
  ],
};
