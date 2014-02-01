var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-ruby-sass'),
    // autoprefixer = require('gulp-autoprefixer'),
    // minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserify = require('gulp-browserify'),
    notify = require('gulp-notify'),
    $$ = {};

// Set up some constants for config
$$ = {
    scripts: {
        all: 'js/**/*.js',
        lint: ['js/**/*.js', '!js/vendor/**/*.js'],
        watch: ['js/**/*.js', 'js/app/templates/**/*.html', '!js/vendor/**/*.js'],
        build: ['js/app.js', 'js/main.js']
    },
    styles: {
        all: ['css/**/*.sass', 'css/**/*.scss', 'css/**/*.css'],
        build: ['css/sass/*.sass', 'css/sass/*.scss']
    },
    buildDir: {
        root: "./build"
    }
};

$$.buildDir.js = $$.buildDir.root + "/js";
$$.buildDir.css = $$.buildDir.root + "/css";

gulp.task('default', function () {
    console.log("We should think about making this the production build?");
});

// Scripts
gulp.task('scripts', ['jshint'], function () {

    return gulp.src($$.scripts.build)
        .pipe(browserify())
        .pipe(gulp.dest($$.buildDir.js))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest($$.buildDir.js))
        
        .pipe(notify({ message: 'Scripts browserified, built, and minified' }));
});

gulp.task('scripts:dev', ['jshint:dev'], function () {
        
    return gulp.src($$.scripts.build)
        .pipe(browserify({
            transform: ["node-underscorify"],
            debug: true
        }))
        .pipe(gulp.dest($$.buildDir.js))

        .pipe(notify({ message: 'Scripts browserified and built in DEV mode' }));
});

gulp.task('jshint', function () {
    return gulp.src($$.scripts.lint)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))

        .pipe(notify({ message: 'JSHint complete' }));
});

gulp.task('jshint:dev', function () {
    return gulp.src($$.scripts.lint)
        .pipe(jshint('.jshintrc-dev'))
        .pipe(jshint.reporter('default'))

        .pipe(notify({ message: 'JSHint complete' }));
});

gulp.task('styles:dev', function () {
    return gulp.src($$.styles.build)
        .pipe(sass())
        .pipe(gulp.dest($$.buildDir.css))

        .pipe(notify({ message: "Sass files compiled in DEV mode" }));
});

/**
 * Watch mode runs all of the dev tasks
 */
gulp.task('watch', ['scripts:dev', 'styles:dev'], function () {

    // Watch scripts
    var scripts = gulp.watch($$.scripts.watch, ['scripts:dev']);

    // Watch styles
    var styles = gulp.watch($$.styles.all, ['styles:dev']);
    
    var changeLog = function (e) {
        gutil.log(e.path + ' ' + gutil.colors.yellow.bold(e.type));
    };

    scripts.on('change', changeLog);

});