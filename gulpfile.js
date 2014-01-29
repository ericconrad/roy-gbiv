var gulp = require('gulp'),
    gutil = require('gulp-util'),
    // sass = require('gulp-ruby-sass'),
    // autoprefixer = require('gulp-autoprefixer'),
    // minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    // clean = require('gulp-clean'),
    // concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    notify = require('gulp-notify'),
    $$ = {};

// Set up some constants
$$ = {
  scripts: {
    all: 'js/**/*.js',
    lint: ['js/**/*.js', '!js/build/**/*.js', '!js/lib/**/*.js'],
    build: ['js/app.js', 'js/main.js']
  },
  buildDir: './js/build'
};

gulp.task('default', function () {
  console.log("Try these: ");
});

// Scripts
gulp.task('scripts', ['jshint'], function () {

  return gulp.src($$.scripts.build)
    .pipe(browserify())
    .pipe(gulp.dest($$.buildDir))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest($$.buildDir))
    
    .pipe(notify({ message: 'Scripts browserified, built, and minified' }));
});

gulp.task('scripts:dev', ['jshint:dev'], function () {
    
  return gulp.src($$.scripts.build)
    .pipe(browserify())
    .pipe(gulp.dest($$.buildDir))

    .pipe(notify({ message: 'Scripts browserified and built in DEV mode' }));
});

gulp.task('jshint', function () {
  return gulp.src($$.scripts.lint)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));
});

gulp.task('jshint:dev', function () {
  return gulp.src($$.scripts.lint)
    .pipe(jshint('.jshintrc-dev'))
    .pipe(jshint.reporter('default'));
});

/**
 * Watch mode runs all of the dev tasks
 */
gulp.task('watch', function () {

  // Watch scripts
  var w = gulp.watch($$.scripts.lint, ['scripts:dev']);

  // console.log('w', w._watcher);
  w.on('change', function (e) {
    gutil.log(e.path + ' ' + gutil.colors.yellow.bold(e.type));
  });

});