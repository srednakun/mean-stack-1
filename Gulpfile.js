var gulp = require("gulp");
var sass = require("gulp-sass");

gulp.task("sass", function() {
  gulp.src("src/styles/**/*.scss")
    .pipe(sass({
      includePaths: require("node-bourbon").includePaths
    })
      .on("error", sass.logError))
    .pipe(gulp.dest("./public/css"));
});

gulp.task("default", ["sass"], function() {
  gulp.watch("src/styles/**/*.scss", ["sass"]);
});

