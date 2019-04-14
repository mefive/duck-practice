const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { argv } = require('yargs');

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

  devtool: 'source-map',

  devServer: {
    port: argv.port || 3000,
    host: '0.0.0.0',
    inline: false,
    proxy: {
      '/api': 'http://localhost:1986',
    },
  },

  plugins: [
    new HtmlWebpackPlugin(),
  ],
};
