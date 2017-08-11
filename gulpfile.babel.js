'use strict';

import source from 'vinyl-source-stream';
import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import run from 'run-sequence';
import rimraf from 'rimraf';
import shell from 'gulp-shell';
import server from 'gulp-live-server';
import babel from 'gulp-babel'
import minifyCSS from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';

const paths = {
  src: './server',
  publicSrc: './app',
  dest: '.dist/',
  bundle: 'bundle.js',
  bundleDest: '.dist/public/js',
  cssDest: '.dist/public/css'
}
//Catch the server instance
let express;

gulp.task('default', cb => {
  run('clean','server', 'build','watch', cb);
});

gulp.task('build', cb =>{
  run('css', 'babel', 'client', 'restart', cb);
});

//build when a file has changed
gulp.task('watch', cb => {
    gulp.watch('./app/**/*.js', ['client','restart']);
    gulp.watch('./server/**/*.js', ['babel','restart']);
    gulp.watch('./app/css/**/*.css', ['css','restart']);
});

/*
  Server
*/
gulp.task('server', () => {
  express = server.new(paths.dest+"/main.js");
});

gulp.task('restart', () =>{
  express.start.bind(express)();
});

//Clean the app destination, to prepare for new files
gulp.task('clean', cb => {
  rimraf(paths.dest, cb);
});

//Transform back-end ES6 to ES5
//only transform features not supported by node v5
gulp.task('babel', cb => {
  return gulp.src(`${paths.src}/**/*.js`)
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(gulp.dest(paths.dest));
});

gulp.task('css', cb => {
  return gulp.src('./app/css/**/*.css')
      .pipe(minifyCSS())
      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
      .pipe(concat('style.min.css'))
      .pipe(gulp.dest(paths.cssDest));
});

/*
  Client
*/
//Transform client ES6 to ES5
//With react support
gulp.task('client', cb => {
    return browserify({entries: 'app/main.js', extensions: ['.js'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source(paths.bundle))
        .pipe(gulp.dest(paths.bundleDest));
});
