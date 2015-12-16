var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    concatcss = require('gulp-concat-css'),
    cssmin = require('gulp-cssmin'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync').create();

/*
IMAGE
 */
gulp.task('images', function() {
    return gulp.src('./app/images/*')
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }).on('error', function(err) {
            console.log(err.message)
        }))
        .pipe(gulp.dest('./assets/images/'))
        .pipe(notify({
            message: 'Images task complete'
        }));
});

/*
Javascripts
 */
gulp.task('javascripts', function() {
    return gulp.src('./app/javascripts/**/*.js')
        .pipe(uglify().on('error', function(err) {
            console.log(err.message);
        }))
        .pipe(gulp.dest('./assets/javascripts/'))
        .pipe(notify({
            message: 'Javascripts task complete'
        }));
});

/*
Styles
 */
gulp.task('styles', function() {
    return gulp.src('./app/sass/**/*.scss')
        .pipe(sass().on('error', function(err) {
            console.log(err.message);
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true,
            remove: true
        }))
        .pipe(concatcss('nian.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('./assets/css/'))
        .pipe(notify({
            message: 'Styles task complete'
        }));
});

/*
WATCH
 */
gulp.task('watch', function() {
    gulp.watch('./app/sass/**/*.scss', ['styles']);
    gulp.watch('./app/javascripts/**/*.js', ['javascripts']);
    gulp.watch('./app/images/*', ['images']);
});

gulp.task('default', ['watch']);
