import gulp from 'gulp';
import browserSync from 'browser-sync';
import path from 'path';
import config from './config';

const reload = browserSync.reload;

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
