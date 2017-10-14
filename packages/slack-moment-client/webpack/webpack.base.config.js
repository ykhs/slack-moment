const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './src/js/main.js'],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.common',
      nprogress$: 'nprogress/nprogress'
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '..', 'public', 'js')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
        options: {
          preserveWhitespace: false
        }
      }
    ]
  },
  devtool: 'source-map'
};
