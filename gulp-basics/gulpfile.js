var isProd          = process.env.NODE_ENV === 'production',
    gulp            = require('gulp'),
    gutil           = require('gulp-util'),
    less            = require('gulp-less'),
    autoprefixer    = require('gulp-autoprefixer'),
    eslint          = require('gulp-eslint'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglify'),
    sourcemaps      = require('gulp-sourcemaps'),
    imagemin        = require('gulp-imagemin'),
    obfuscator      = require('gulp-js-obfuscator'),
    uglifycss       = require('gulp-uglifycss'),
    pngquant        = require('imagemin-pngquant'),
    rimraf          = require('rimraf'),
    browserSync     = require('browser-sync').create(),
    reload          = browserSync.reload;

var path = {
    build: {
        dist    : 'dist',
        js      : 'dist/js/',
        css     : 'dist/css/',
        img     : 'dist/img/'
    },
    src: {
        all     : 'src/**/*.*',
        html    : 'src/*.html',
        js      : 'src/js/*.js',
        style   : 'src/less/*.less',
        img     : 'src/img/*.*'
    },
    clean: 'dist'
};

function prodFunc(func) {
    return isProd ? func() : gutil.noop();
}

browserSync.stream();

gulp.task('default', ['html', 'styles',  'scripts', 'images'], function() {
    if(!isProd) {
        browserSync.init({
            server: path.build.dist
        });
        gulp.watch(path.src.style, ['styles']).on('change', reload);
        gulp.watch(path.src.html, ['html']).on('change', reload);
        gulp.watch(path.src.js, ['scripts']).on('change', reload);
        gulp.watch(path.src.img, ['images']);
    }
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('html', function () {
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.dist))
});

gulp.task('styles', function () {
    gulp.src(path.src.style)
        .pipe(less())
        .pipe(concat('all.css'))
        .pipe(autoprefixer())
        .pipe(prodFunc(uglifycss))
        .pipe(prodFunc(sourcemaps.write))
        .pipe(gulp.dest(path.build.css))
});

gulp.task('scripts', function () {
    gulp.src(path.src.js)
        .pipe(concat('all.js'))
        .pipe(prodFunc(eslint))
        .pipe(prodFunc(eslint.format))
        .pipe(prodFunc(eslint.failAfterError))
        .pipe(prodFunc(sourcemaps.write))
        .pipe(prodFunc(uglify))
        .pipe(gulp.dest(path.build.js))
});

gulp.task('images', function () {
    gulp.src(path.src.img)
        .pipe(prodFunc(
                imagemin.bind({
                progressive: true,
                use: [pngquant()]
            })
        ))
        .pipe(gulp.dest(path.build.img))
});