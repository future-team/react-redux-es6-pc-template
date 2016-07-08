var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var extend = require('extend');
var entry = require('./src/config/vendor');
var externals = require('./src/config/externals');
var config = require('./src/config/base.config');
var alias = require('./src/config/alias.json');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CortexRecombinerPlugin=require('cortex-recombiner-webpack-plugin');
//?presets[]=stage-0,presets[]=react,presets[]=es2015

var setExternals= function() {
    var external=externals;

    return external;
};

var baseFileDir = path.join(process.cwd(), 'src/');

var getEntry = function(){
    var basedir =baseFileDir+'entries';
    var files = glob.sync(path.join(basedir, '*.jsx'));

    var webpackConfigEntry = {};//webpackConfig.entry || (webpackConfig.entry = {});

    files.forEach(function(file) {
        var relativePath = path.relative(basedir, file);
        webpackConfigEntry[relativePath.replace(/\.jsx/,'').toLowerCase()] = file;
    });
    return webpackConfigEntry;
};


function setCommonsChuck(){
    var arr=[];
    for(var item in entry){
        arr.push(item);
    }
    return arr;
}

//extend(getEntry(),entry||{}),
var entryList =config.projectType=='app'? extend(getEntry(),entry||{}) : extend({bundle:path.join(__dirname, 'src/index.jsx')},entry||{});

var webpackConfig = {
    entry: entryList,
    output: {
        path:path.join(__dirname, config.output.replace('./','') ),
        filename: '[name].js',
        libraryTarget: "umd",
        publicPath: config.cdn.beta
    },
    externals:setExternals(),
    resolve: {
        extensions: ['', '.js'],
        alias:extend({},alias ||{})
    },
    module: {
        loaders: [
            {
                test: /\.(jsx|es6)$/,
                loaders: ['babel'],
                exclude: /node_modules/
            },
            {
                test: /\.(less$|css)$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap&importLoaders=1!autoprefixer-loader!less-loader")
                //loader: "style-loader!css-loader!less-loader"
            },
            {
                test: /\.svg$/,
                loader: "url-loader?limit=10000&mimetype=image/svg+xml"
            },
            {
                test: /\.woff|ttf|woff2|eot$/,
                loader: 'url?limit=100000'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url?limit=35000'
            },
            {
                test: /\.html$/,
                loader: "handlebars-loader"
            }
        ]
    },
    /*postcss: [
        require('autoprefixer'),
        require('postcss-color-rebeccapurple')
    ],*/
    plugins: [
        //new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('[name].css', { allChunks: true }),
        new CortexRecombinerPlugin({
            base:__dirname//path.resolve(__dirname,relativeToRootPath),//项目根目录的绝对路径
        }),
        new webpack.ProvidePlugin({
            $:      "jquery",
            jQuery: "jquery"
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: setCommonsChuck()/*,
            children: true,
            async: true*/
        })
    ]
};


module.exports = webpackConfig;
