'use strict';

import gulp from 'gulp';
import path from 'path';
import uglify from 'gulp-uglify';
import bufferify from 'vinyl-buffer';
import gutil from 'gulp-util';
import browserify from 'browserify';
import browserifyInc from 'browserify-incremental';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import browserSync from 'browser-sync';
import config from './config';

const reload = browserSync.reload;

const production = (process.env.NODE_ENV === 'production');
const browserifyInstance = production ? browserify : browserifyInc;

const bundler = browserifyInstance({
    cache: {},
    transform: [babelify],
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
