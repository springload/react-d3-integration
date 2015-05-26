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
            baseDir: [config.paths.webroot]
        }
    });

    gulp.watch(path.join(config.paths.webroot, 'index.html'), reload);
    gulp.watch(path.join(config.paths.js, '**', '*.js'), ['js']);
});
