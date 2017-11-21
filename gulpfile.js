const gulp = require('gulp'),
browserSync = require('browser-sync').create(),
autoprefixer = require('gulp-autoprefixer'),
sass = require('gulp-sass');


// Compile sass files and inject into browser
gulp.task('sass', function(){
  return gulp.src([
    'node_modules/bootstrap/scss/bootstrap.scss',
    'src/scss/*.scss'
    ])
    .pipe(sass({
      outputStyle: 'expanded',
      precision: 2
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

// Move JS files to src/js folder
gulp.task('js', function(){
  return gulp.src([
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/popper.js/dist/umd/popper.min.js'
    ])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());
});

// Watch SASS and serve
gulp.task('serve', ['sass'], function(){
  browserSync.init({
    notify: false,
    server: "./src"
  });

  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
  gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Move Font-awesome fonts folder to src/fonts folder
gulp.task('fonts', function(){
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest("src/fonts"));
});

// Move Font-awesome CSS folder to src/css folder
gulp.task('fa', function(){
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest("src/css"));
});

// Run Default task
gulp.task('default', ['js', 'serve', 'fa', 'fonts']);