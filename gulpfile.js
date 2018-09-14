var gulp = require('gulp');
var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');
var uglify = require('gulp-uglify-es').default;
var rollup = require('gulp-better-rollup')
var babel = require('rollup-plugin-babel')
var cssmin = require('gulp-cssmin');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var gutil = require('gulp-util');

var paths = {
  scripts: [
    'public/src/js/libraries/application.js', 
    'public/src/js/general/*.js', 
    'public/src/js/dashboard/*.js',
    'public/src/js/login/*.js', 
    'public/src/js/profile/*.js',
    'public/src/js/app.js'
  ], 
  styles:['public/src/css/*.css']
}

gulp.task('clean', function(){
  return del(['public/src/build']);
})

gulp.task('styles', function(){
  return gulp.src(paths.styles)
  .pipe(concat('all.min.css'))
  .pipe(sourcemaps.init())
  .pipe(cssmin())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('public/build/css'));
})
 
gulp.task('scripts', function(){
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(rollup({plugins: [babel()]}, 'iife'))
    .pipe(uglify().on('error', function(err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
      this.emit('end');
      }))
    .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/build/js'));

});


 
gulp.task('watch', function() {
  gulp.watch(paths.styles, ['css']);
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('default', ['watch', 'styles', 'scripts']);