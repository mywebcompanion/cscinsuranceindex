/**
 * Created by ARUN on 17/12/2015.
 */

require.config({



    paths: {
        jquery: 'http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.min',
        angular: 'http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.0-beta.3/angular.min',
        bootstrap: 'http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.1.1/js/bootstrap.min',
        bootstrapui :'//angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.14.3.js',
        highcharts: 'http://code.highcharts.com/highcharts.src.js',
        angularAnimate:'//ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular-animate.js',
        angularRoute : 'libs/angular-route/',
        app : '../',
        services : '../services/',
        controllers : '../controllers/',
        views : '../views'

    },
    shims : {
        angular : ['jquery','bootstrap']
        angularAnimate : ['angular'],
        angularRoute : ['angular']
        StaticResourceFactory : ['app']
    }
});
