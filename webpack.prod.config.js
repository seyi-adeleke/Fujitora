const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const outputPath = path.join(__dirname, 'public');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './client/index.html',
    filename: 'index.html',
    inject: 'body',
});
process.env.NODE_ENV = 'production';

module.exports = {
    entry: ['./client/index.js'],
    output: {
        path: outputPath,
        filename: 'public/bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.css/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader!sass-loader',
                }),
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader!sass-loader',
                }),
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules|server)/,
                query: {
                    presets: ['es2015', 'react'],
                },
            },
            { test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /(node_modules|server)/,
                query: {
                    presets: ['es2015', 'react'],
                },
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            },
        }),
        HtmlWebpackPluginConfig,
        new ExtractTextPlugin('public/bundle.css'),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false,
            },
        }),
    ],
};
