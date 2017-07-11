var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');
var LiveServer = require('gulp-live-server');

gulp.task('build', function () {
    return browserify({entries: 'app/main.js', extensions: ['.js'], debug: true})
        .transform("babelify", {"presets": ["es2015", "react"]})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./.dist/scripts'));
});

gulp.task('live-server', function () {
  var server = new LiveServer('server/main.js');
  server.start();
});

gulp.task('watch', function () {
    gulp.watch('*.js', ['build']);
});

gulp.task('serve',['build','watch','live-server'], function () {
  browserSync.init(null,{
    proxy: 'http://localhost:7777',
    port: 9005,
  });
});
gulp.task('default', ['watch','serve']);
