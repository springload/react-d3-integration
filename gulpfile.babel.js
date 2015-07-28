import gulp from 'gulp';

import './gulp/js';
import './gulp/watch';

gulp.task('build', ['js']);
gulp.task('default', ['build']);
