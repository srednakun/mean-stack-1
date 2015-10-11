var gulp = require('gulp');
var config = require('../config').server;
var server = require("gulp-express");

gulp.task('serve', ['sass', 'webpack'], function() {
  server.run([config.serverFile]);

  gulp.watch([config.serverFile], [server.run]);
});
