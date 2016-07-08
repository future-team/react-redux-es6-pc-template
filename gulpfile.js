var gulp = require('gulp');
var path = require('path');
var gutil = require("gulp-util");
var open = require('gulp-open');
var webpackServer = require('./webpack-dev.config');
var webpackConfig = require('./webpack.config');
var less = require('gulp-less');
var includer = require('gulp-htmlincluder');
var runSequence = require('run-sequence').use(gulp);
var manifest = require('gulp-h-manifest');
var clean = require('gulp-rimraf');
var webpack = require("webpack");
var glob = require("glob");
var config = require('./src/config/base.config');

var devPort = config.devPort;

gulp.task('open', function () {
  gulp.src(__filename)
      .pipe(open({uri: "http://127.0.0.1:" + devPort +config.defaultStartPage}));
});

gulp.task('hot', function (callback) {
  webpackServer();

});

gulp.task('min-webpack', function (done) {
  var wbpk = Object.create(webpackConfig);
  wbpk.output.filename = '[name].min.js';
  wbpk.plugins.push(new webpack.optimize.UglifyJsPlugin());

  webpack(wbpk).run(function (err, stats) {
    if (err) throw new gutil.PluginError("min-webpack", err);
    gutil.log("[min-webpack]", stats.toString({
    }));
    done();
  });
});

gulp.task('webpack', function (callback) {
  webpack(
      webpackConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
          // output options
        }));
        callback();
      });
});

gulp.task('html-includer', function() {
  return gulp.src(config.html+'/**/*.html')
      .pipe(includer())
      .on('error', console.error)
      .pipe(gulp.dest('html'));
});

gulp.task('manifest', function(cb) {

  if(config.manifest){

    glob(config.output+"/**/*.html",function(err,file){
      var item;
      var length =  file.length;
      var index=1;
      while(item = file.shift()){
        gulp.src(item)
            .pipe(manifest())
            .pipe(gulp.dest(item.replace(/([\w-])*.html$/,'')))
            .on("end",function(){
              index == length ? cb() : (index++);
            })
      }
    });
  }

});

gulp.task('clean', function(){
  gulp.src([
    config.output
  ], {read:false})
      .pipe(clean());
});

gulp.task('html', function () {
  return gulp.src([config.html+ '/**/*.*'])
      .pipe(gulp.dest(config.output ));
});

gulp.task('default', function(){
  runSequence('clean','webpack','html','manifest');
});
gulp.task('dev', ['hot', 'open']);

gulp.task('watch', function() {
  gulp.watch([config.html+'/**/*.html'],["html-includer"]);
});