/* global __dirname */

var path = require('path');

var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var dir_js = path.resolve(__dirname, 'app');
var dir_build = path.resolve(__dirname, 'public');

module.exports = {
    entry: {
      app : path.resolve(dir_js, '../index.js'),
      vendor : ['react', 'react-dom']
    },
    devtool: 'source-map',
    output: {
        path: dir_build,
        filename: 'bundle.js'
    },
    resolve: {
       modulesDirectories: ['node_modules', dir_js],
    },
    devServer: {
        contentBase: dir_build,
    },
    postcss: function () {
        return [require('autoprefixer')];
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/,
                presets : ['es2015', 'react']
            },
            {
              test : /\.html$/,
              loader : 'file?name=[name].html'
            },
            {
              test: /\.sass($|\?)|\.scss($|\?)|\.css($|\?)/,
              //loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
              loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!sass?sourceMap")
            },
            {
                //exclude: /node_modules/,
                test: /\.png($|\?)|\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                loader: 'file?name=assets/[name].[ext]'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css"),
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js"),
        new webpack.NoErrorsPlugin()

    ],
    stats: {
        // Nice colored output
        colors: true
    }
}
