'use strict';

// gulp
var gulp = require('gulp');

// Import dependencies
var browserify = require('browserify');
var uglify =require('gulp-uglify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var gutil = require('gulp-util');

// browserify files
var browserify_file = browserify('./public/js/app.js',{debug: true});
// watchify browserify files
var watch = watchify(browserify_file);

// build function that bundle js files in debug mode
var build = function(option) {
    return function() {
        option
            .bundle()
            .pipe(source('app.js'))
            .pipe(gulp.dest('./public/build/'));
    };
};

// watch js files and rebuild them
var watching = function(){
    // watch
    watch.on('update',build(watch));
    // log when is update
    watch.on('log',gutil.log);
    // first build
    build(watch)();
}

// build task
gulp.task('build', build(browserify_file));
// watch task
gulp.task('watch',watching);


