var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ["babel-polyfill", './src/index.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development',
    resolve: {
        extensions: ['.js', '.vue']
    },
    module: {
        rules: [{
                test: /\.vue?$/,
                exclude: /(node_modules)/,
                use: 'vue-loader'
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:3000'
        })
    }
}