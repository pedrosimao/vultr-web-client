var gulp = require('gulp'),
    less = require('gulp-less'),
    watch = require('gulp-watch'),
    batch = require('gulp-batch'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    util = require('gulp-util'),
    path = require('path');

gulp.task('less', function () {
  return gulp.src('./less/app.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less') ]
    }).on('error', function(err){
        util.log(err);
        this.emit('end');
    }))
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', function() {
  watch('./less/**/*.less', batch(function(events, done) {
    gulp.start('less', done);
  }));
});