var config = require('./src/config/base.config');
var webpackConfig = require('./webpack.config');
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var path = require('path');
var gutil = require("gulp-util");

module.exports= function(){

    var devPort = config.devPort;
    var wbpk = Object.create(webpackConfig);

//环境
    var mainIndex = './src/index.jsx';

    wbpk.devtool = 'eval';

    wbpk.entry = [
        'webpack-dev-server/client?http://127.0.0.1:' + devPort,
        'webpack/hot/only-dev-server',
        mainIndex
    ];
    wbpk.module.loaders = [
        {
            test: /date-time\.js$/,
            loaders: ['muiLocal', 'babel']
        },
        {
            test: /\.(jsx|es6)$/,
            loaders: ['react-hot', 'babel'],
            exclude: /node_modules/
        },
        {
            test: /\.less$/,
            loader: "style-loader!css-loader!less-loader"
        },
        {
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            loader: 'url-loader?limit=5000000&name=[path][name].[ext]'
        },
        {
            test: /\.html$/,
            loader: "handlebars-loader"
        },
        {
            test: /\.css$/, loader: "style!css"
        }
    ];
    wbpk.plugins = [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            $:      "jquery",
            jQuery: "jquery"
        })
    ];
    wbpk.externals=null;
    wbpk.resolve.extensions = ['', '.js', '.jsx'];
    wbpk.output={
        libraryTarget: 'umd',
        path:path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: config.cdn.dev
    };
    var compiler = webpack(wbpk);

    new WebpackDevServer(compiler, {
        publicPath: config.cdn.dev,
        hot: true,
        historyApiFallback: true,
        port: devPort,
        stats: {
            colors: true
        }
    }).listen(devPort, "127.0.0.1", function (err) {
            if (err) throw new gutil.PluginError("webpack-dev-server", err);
            gutil.log("[webpack-dev-server]", "http://127.0.0.1:" + devPort +config.defaultStartPage );
        });
};
