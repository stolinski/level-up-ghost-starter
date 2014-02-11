// include gulp
var gulp = require('gulp'); 
 
// include plug-ins
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var compass = require('gulp-compass');
var livereload = require('gulp-livereload');



var paths = {
  scripts: 'assets/js/*.js',
  images: 'assets/images/**/*',
  sass: 'assets/scss/**/*'
};


// JS hint task
gulp.task('scripts', function() {
  gulp.src('./assets/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// minify new images
gulp.task('images', function() {
  var imgSrc = './assets/images/**/*',
      imgDst = './build/images';
  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});


// Styles
gulp.task('styles', function() {
  return gulp.src('./assets/scss/**/*')
    .pipe(compass({
        sass: 'assets/scss',
        css: 'assets/css'
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/css'))
    .pipe(livereload());
});


// Rerun the task when a file changes
gulp.task('watch', function () {
  var server = livereload();
  gulp.watch('*.html', function(evt) {
      server.changed(evt.path);
  });
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.sass, ['styles']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts', 'images', 'styles', 'watch']);
