const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
module.exports = merge(common, {
    mode: 'production',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: {
                    loader: 'css-loader',
                },
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
});