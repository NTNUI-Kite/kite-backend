var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');
var LiveServer = require('gulp-live-server');

var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');



gulp.task('build', function () {
    return browserify({entries: 'app/main.js', extensions: ['.js'], debug: true})
        .transform("babelify", {"presets": ["es2015", "react"]})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./.dist/scripts'));
});

gulp.task('css', function (){
  gulp.src('./app/css/**/*.css')
      .pipe(minifyCSS())
      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
      .pipe(concat('style.min.css'))
      .pipe(gulp.dest('./.dist/css'))
});

gulp.task('live-server', function () {
  var server = new LiveServer('server/main.js');
  server.start();
});

gulp.task('watch', function () {
    gulp.watch('./app/**/*.js', ['build']);
    gulp.watch('./app/css/**/*.css', ['css']);
});

gulp.task('serve',['build','css','watch','live-server'], function () {
  browserSync.init(null,{
    proxy: 'http://localhost:7777',
    port: 9005,
  });
});
gulp.task('default', ['serve']);
