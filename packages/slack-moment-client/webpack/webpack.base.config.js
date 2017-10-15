const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

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
      },
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: './postcss.config.js'
                }
              }
            }
          ]
        })
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '../fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [new ExtractTextWebpackPlugin(path.join('..', 'css', 'bundle.css'))],
  devtool: 'source-map'
};
