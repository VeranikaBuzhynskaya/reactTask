var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    entry: './app/client/index.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /.(jsx|js)?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']

                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {   test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: process.env.NODE_ENV
            }
        }),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: './app/client/index.html',
            inject: "body"
        }),
    ],
    watch: NODE_ENV.trim() == 'development',
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool:  NODE_ENV.trim() == 'development' ? "inline-source-map" : null,
};

if (NODE_ENV.trim() == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            compress: {
                sequences     : true,
                booleans      : true,
                loops         : true,
                unused      : true,
                warnings    : false,
                drop_console: true,
                unsafe      : true
            }
        })
    );
}
