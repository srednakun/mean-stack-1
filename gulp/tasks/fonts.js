var gulp = require("gulp");
var config = require('../config').html;

gulp.task('fonts', function() {
  return gulp.src(config.src)
  .pipe(gulp.dest(config.dest));
});
