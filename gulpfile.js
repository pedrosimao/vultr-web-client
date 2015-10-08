var gulp = require('gulp');
var watch = require('gulp-watch');
var batch = require('gulp-batch');

var less = require('gulp-less');
var path = require('path');

gulp.task('default', function () {
  return gulp.src('./less/app.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less') ]
    }))
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', function() {
  watch('./less/**/*.less', batch(function(events, done) {
    gulp.start('default', done);
  }));
});