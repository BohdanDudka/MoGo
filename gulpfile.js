const gulp     = require('gulp');
const imageMin = require('gulp-imagemin');
const uglify   = require('gulp-uglify');
const sass     = require('gulp-sass');

/*
    TOP LEVEL FUNCTIONS
    gulp.task - Define tasks
    gulp.src - Point to files to use
    gulp.dest - Points to folder to output
    gulp.watch - Watch files abd folders for changes
 */

//Copy all HTML files
gulp.task('copyHtml', function () {
    gulp.src('src/*.html')
        .pipe(gulp.dest('build'))
});

//Optimize Images
gulp.task('imageMin', function () {
    gulp.src('src/images/*')
        .pipe(imageMin())
        .pipe(gulp.dest('build/images'))
});

//Minify JS
gulp.task('minify', function () {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

//Compile Sass
gulp.task('sass', function () {
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build/css'));
});


gulp.task('default', ['copyHtml', 'imageMin', 'minify', 'sass']);

//Watching Files
gulp.task('watch', function () {
    gulp.watch('src/js/*.js', ['minify']);
    gulp.watch('src/images/*', ['imageMin']);
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/*.html', ['copyHtml']);
});