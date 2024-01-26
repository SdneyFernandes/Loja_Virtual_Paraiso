const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');

function scripts() {
    return gulp.src('./src/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
}

function styles() {
    return gulp.src('./src/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest('./dist'));
}

function images() {
    return gulp.src('./src/assets/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/assets/images'));
}

exports.default = gulp.parallel(styles, images, scripts);
exports.styles = styles;
exports.images = images;
exports.scripts = scripts;

exports.watch = function() {
    gulp.watch('./src/**/*.scss', gulp.parallel(styles));
    gulp.watch('./src/**/*.js', gulp.parallel(scripts));
    gulp.watch('./src/assets/images/**/*', gulp.parallel(images));
}
