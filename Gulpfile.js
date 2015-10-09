var gulp = require("gulp");
var sass = require("gulp-sass");
var run = require("gulp-run");

gulp.task("sass", function() {
  gulp.src("sass/**/*.scss")
    .pipe(sass({
      includePaths: require("node-bourbon").includePaths
    })
      .on("error", sass.logError))
    .pipe(gulp.dest("./public/css"));
});

gulp.task('watch', function() {
	gulp.watch("sass/**/*.scss", ["sass"]);
	gulp.watch("sass/*.scss", ["sass"]);
});

gulp.task("default", ["sass", "watch"], function() {
});

gulp.task("express", function() {
 run("node server.js").exec().pipe(gulp.dest("output"));
});

gulp.task("serve", ["sass", "express", "watch"], function() {
	
});
