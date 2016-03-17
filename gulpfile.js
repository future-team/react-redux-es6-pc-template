var gulp = require('gulp');
var path = require('path');
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var open = require('gulp-open');
var webpackConfig = require('./webpack.config');
var less = require('gulp-less');

var devPort = 3005;

gulp.task('open', function () {
    gulp.src(__filename)
        .pipe(open({uri: "http://127.0.0.1:" + devPort + "/index.html"}));
});

gulp.task('img', function() {
    gulp.src('./img/**/*.*')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('less', function() {
    gulp.src('./less/**/*.less')
        .pipe(less({
            paths: [
                path.join(__dirname, 'less')
            ]
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('build', function (callback) {
    webpack(
        webpackConfig, function (err, stats) {
            if (err) throw new gutil.PluginError("webpack", err);
            gutil.log("[webpack]", stats.toString({
                // output options
            }));
            callback();
    });
});

gulp.task('hot', function (callback) {
    var wbpk = Object.create(webpackConfig);
    wbpk.devtool = 'eval';
    wbpk.entry = [
        'webpack-dev-server/client?http://127.0.0.1:' + devPort,
        'webpack/hot/only-dev-server',
        './src/index.js'
    ];
    wbpk.plugins = [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ];
    wbpk.resolve.extensions = ['', '.js', '.jsx'];
    wbpk.output.libraryTarget='umd';
    wbpk.externals=[{
        'react': {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        'react/addons': {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },/*
        'eagle-ui': {
            root: 'Eagleui',
            commonjs2: 'eagle-ui',
            commonjs: 'eagle-ui',
            amd: 'eagle-ui'
        },*/
        'eagle': {
            root: 'Eagle',
            commonjs2: 'eagle',
            commonjs: 'eagle',
            amd: 'eagle'
        }
    }];
    wbpk.module.loaders = [
        {
            test: /date-time\.js$/,
            loaders: ['muiLocal', 'babel']
        },
        {
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel'],
            exclude: /node_modules/
        },
        {
            test: /\.less$/,
            loader: "style!css!less?strictMath&noIeCompat"
        }
    ];
    var compiler = webpack(wbpk);

    new WebpackDevServer(compiler, {
        publicPath: '/dist/',
        hot: true,
        historyApiFallback: true,
        port: devPort,
        stats: {
            colors: true
        }
    }).listen(devPort, "127.0.0.1", function (err) {
            if (err) throw new gutil.PluginError("webpack-dev-server", err);
            gutil.log("[webpack-dev-server]", "http://127.0.0.1:" + devPort + "/webpack-dev-server/index.html");
        });


});

gulp.task('default', ['build','img']);
gulp.task('dev', ['hot', 'open','img']);