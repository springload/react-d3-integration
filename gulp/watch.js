'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var config = require('./config');
var path = require('path');
var reload = browserSync.reload;

gulp.task('watch', ['js'], function() {
    browserSync({
        notify: false,
        server: {
            baseDir: [config.paths.root]
        }
    });

    gulp.watch(path.join(config.paths.root, 'index.html'), reload);
    gulp.watch(path.join(config.paths.js, '**', '*.js'), ['js']);
});
