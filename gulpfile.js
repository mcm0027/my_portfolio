
var gulp = require('gulp')
var concat = require('gulp-concat')

gulp.task('js', function () {
  gulp.src(['src/**/*.js', 'src/**/app.js'])
    .pipe(concat('myApp.js'))
    .pipe(gulp.dest('.'))
})