var webpack = require('webpack');
var path = require('path');
var extend = require('extend');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//?presets[]=stage-0,presets[]=react,presets[]=es2015
var setExternals= function() {
    var cortexConfig = require('./cortex.json');
    var externals={};
    var deps = cortexConfig.dependencies;


    for(var item in deps){
        externals[item] = 'require("' + item + '")';
        console.dir(deps[item]);
    }

    return externals;
};

var webpackConfig = {
    entry: [
        path.join(__dirname, 'src/index.js')
    ],
    output: {
        //libraryTarget: 'umd',
        path:path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/
            }, {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
                //loader: "style-loader!css-loader!less-loader"
            },
            {
                test:/\.png$/,
                loader:'url-loader?limit=10000'
            },
            {
                test: /\.html$/,
                loader: "handlebars-loader"
            }
        ]
    },
    externals:setExternals(),
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin(path.join('css/page.css'))
    ]
};


module.exports = webpackConfig;