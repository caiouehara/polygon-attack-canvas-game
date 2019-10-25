const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: [
        './src/js/scripts.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.min.js'
    },
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
            }
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, 'src/index.html')
        })
      ]
};