var gulp = require('gulp');
var jshint = require('gulp-jshint');
var cache = require('gulp-cached');

gulp.task('default', ['watch']);

gulp.task('lint', function() {
    return gulp.src('./*.js')
        .pipe(cache('linting'))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});
gulp.task('watch', function() {
    gulp.watch('./*js', ['lint']);
});
