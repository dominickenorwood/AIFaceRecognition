const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    watch: false,
    devtool: 'cheap-module-eval-source-map',
    entry: {
        bundle: ['babel-polyfill', './src/index.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js.[name].[chunkhash].js',
        publicPath: ''
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.css$/,
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: '[name]__[local]__[hash:base64:5]'
                        }
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                autoprefixer()
                            ]
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
};