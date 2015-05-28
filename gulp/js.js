'use strict';

var gulp = require('gulp');
var path = require('path');
var uglify = require('gulp-uglify');
var bufferify = require('vinyl-buffer');
var gutil = require('gulp-util');
var browserify = require('browserify');
var browserifyInc = require('browserify-incremental');
var babelify = require('babelify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var reload = require('browser-sync').reload;

var config = require('./config');

var production = (process.env.NODE_ENV === 'production');
var browserifyInstance = production ? browserify : browserifyInc;

var bundler = browserifyInstance({
    cache: {},
    transform: [babelify, reactify],
    packageCache: {},
    debug: !production,
    fullPaths: !production
});

bundler.add(path.resolve(config.paths.js, 'site.js'));

gulp.task('js', function(done) {

    bundler.bundle()
        .on('error', function handleError(err) {
            gutil.log(err.message);
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(bufferify())
        .pipe(production ? uglify() : gutil.noop())
        .pipe(gulp.dest(config.paths.assets))
        .on('end', done)
        .pipe(reload({stream: true}));
});
