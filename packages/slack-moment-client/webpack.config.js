const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const env = process.env.NODE_ENV || 'development'

if (env !== 'production') {
  const envPath = path.resolve(path.join('..', '..', '.env'));

  require('dotenv').config({
    path: envPath
  });
}

module.exports = {
  entry: ['babel-polyfill', './src/js/main.js'],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common',
      'nprogress$': 'nprogress/nprogress'
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public', 'js')
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
  plugins: {
    development: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
          FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
          FIREBASE_DATABASE_URL: JSON.stringify(process.env.FIREBASE_DATABASE_URL)
        }
      })
    ],
    production: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
          FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
          FIREBASE_DATABASE_URL: JSON.stringify(process.env.FIREBASE_DATABASE_URL)
        }
      }),
      new UglifyJSPlugin({
        sourceMap: true
      })
    ]
  }[env],
  devtool: 'source-map'
}
