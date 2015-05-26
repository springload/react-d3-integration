'use strict';

var gulp = require('gulp');

require('./gulp/js');
require('./gulp/watch');

gulp.task('build', ['js']);
gulp.task('default', ['build']);
