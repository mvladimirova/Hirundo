'use strict';
var gulp = require("gulp");
var ts = require('gulp-typescript');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var nodemon = require("gulp-nodemon");

var sourcePath = './src/**/*.js';
var sourceTsPath = './src/**/*.ts';
var libraryTypeScriptDefinitions = "./typings/**/*.ts";

gulp.task('tsc', function () {
  var tsProject = ts.createProject('tsconfig.json', { sortOutput: true });
  
  return gulp.src([sourceTsPath, libraryTypeScriptDefinitions], { base: './' })
    .pipe(ts(tsProject))
    .pipe(gulp.dest('.'));
});

gulp.task('babel', ['tsc'], function () {
  return gulp.src(sourcePath, { base: './' })
    .pipe(babel({
      plugins: ["transform-es2015-modules-commonjs", "transform-es2015-parameters"]
    }))
    .pipe(rename(function (path) {
      path.extname = '.js';
    })).pipe(gulp.dest('.'));
});

gulp.task('watch', function(){
  gulp.watch('src/**/*.ts', ['tsc']);
})

gulp.task('nodemon', function () {
  nodemon({
    "execMap": {
      "": "node --harmony"
    },
    script: './src/server.js',
    ext: 'js',
    env: {
      PORT: 6579
    },
    ignore: ['./node_modules/**', './typings/**', './tests/**', './obj/**']
  }).on('restart', function () {
    console.log('Restarting');
  });
})

// Set up nodemon
gulp.task('default', ['babel','watch'], function () {

});
