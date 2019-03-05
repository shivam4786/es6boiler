const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';
const isProd = env === 'production';

const extractCss = new ExtractTextPlugin({
  filename: 'css/style.css',
  disable: isDev
});

module.exports = {
    entry: ['babel-polyfill', './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        extractCss
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
              test: /\.css$/,
              exclude: /node_modules/,
              use: extractCss.extract({
                use:[
                  {loader: 'css-loader'}
                ],
                fallback: 'style-loader'
              })
            }
        ]
    }
};
