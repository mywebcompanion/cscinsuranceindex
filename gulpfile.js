/**
 * Created by ARUN on 21/2/2016.
 */

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');





gulp.task('compress', function() {
    return gulp
        .src(['public/theme/plugins/jquery/jquery.min.js'
        ,'public/theme/plugins/jquery/jquery-migrate.min.js'
        ,'public/theme/plugins/bootstrap/js/bootstrap.min.js'
        ,'public/libs/highcharts/lib/highcharts.js',
        ,'public/theme/plugins/back-to-top.js'
        ,'public/theme/plugins/flexslider/jquery.flexslider-min.js'
        ,'public/theme/plugins/parallax-slider/js/modernizr.js'
        ,'public/theme/plugins/parallax-slider/js/jquery.cslider.js'
        ,'public/theme/js/app.js'
        ,'public/theme/js/custom.js'
        ,'public/theme/js/plugins/parallax-slider.js'])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/dist/'));
});

gulp.task('minify-css', function() {
    return gulp.src([
            'public/libs/bootstrap/dist/css/bootstrap.css',
            'public/theme/css/footers/footer-default.css',
            'public/theme/css/style.css',
            'public/theme/plugins/fancybox/source/jquery.fancybox.css',
            'public/theme/plugins/flexslider/flexslider.css',
            'public/theme/plugins/parallax-slider/css/parallax-slider.css',
            'public/styles/home.css'
        ])
        .pipe(concat('all.css'))
        .pipe(minifyCss({compatibility: 'ie9'}))
        .pipe(gulp.dest('public/dist'));
});

gulp.task('default',['compress','minify-css']);

