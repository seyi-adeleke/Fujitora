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
process.env.NODE_ENV = 'development';
module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: ['webpack-hot-middleware/client',
            './client/index.js'],
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
                API_URL: JSON.stringify('http://localhost:8080')
            },
        }),
        HtmlWebpackPluginConfig,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin('public/bundle.css'),
        new webpack.optimize.UglifyJsPlugin({
            minimize: false,
            compress: {
                warnings: true,
            },
        }),
    ],
};
