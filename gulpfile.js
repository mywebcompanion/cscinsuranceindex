/**
 * Created by ARUN on 21/2/2016.
 */

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var uiBootstrap;


gulp.task('soucecdn', function(){
    uiBootstrap = request('https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/1.1.2/ui-bootstrap-tpls.min.js') /* 1 */
        .pipe(source('uibootstrap.js'));
});


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


gulp.task('compresshome-1', function() {
    return gulp
        .src([
            'public/libs/angular/angular.min.js'
            ,'public/libs/angular-ui-router/release/angular-ui-router.min.js'
            ,'public/libs/angular-animate/angular-animate.js'
            ,'public/libs/jquery.easy-pie-chart/dist/angular.easypiechart.js'
            ,'public/libs/highcharts-ng/dist/highcharts-ng.min.js'
            ,'public/libs/highcharts/lib/highcharts-more.js'
            ,'public/libs/highcharts/lib/modules/solid-gauge.js',
            ,'public/libs/ngmenu/src/mfb-directive.js'

        ])
        .pipe(concat('all.home.1.js'))
        .pipe(gulp.dest('public/dist/'));
});

gulp.task('compresshome-2', function() {
    return gulp
        .src([

            ,'public/app.js'
            ,'public/directives/StarDirective.js'
            ,'public/filter/LoopFilter.js'
            ,'public/services/GlobalValues.js'
            ,'public/services/StaticResourceFactory.js'
            ,'public/services/ChartConfig.js'
            ,'public/services/CountryStatsFactory.js'
            ,'public/services/StatsService.js'
            ,'public/services/CompanyService.js'
            ,'public/controllers/CMenuController.js'
            ,'public/controllers/CountryController.js'
            ,'public/controllers/SocialController.js'
            ,'public/controllers/SupportController.js'
            ,'public/controllers/MarketingController.js'
            ,'public/controllers/AnalyticsController.js'
            ,'public/controllers/MobilityController.js'
            ,'public/controllers/MainController.js'
            ,'public/controllers/StatsController.js'
            ,'public/controllers/MFBController.js'
        ])
        .pipe(concat('all.home.2.js'))
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

gulp.task('default',['compress','compresshome-1','compresshome-2','minify-css']);

