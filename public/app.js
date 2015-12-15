/**
 * Created by ARUN on 9/12/2015.
 */

var InsuranceIndex = angular.module('InsuranceIndex',['ngRoute','highcharts-ng','ngAnimate', 'ui.bootstrap']);
InsuranceIndex.config(function($routeProvider){
    $routeProvider.when('/', {
        controller : 'HomeController',
        templateUrl : 'views/Home.html'
    }).when('/overview', {
        controller : 'HomeController',
        templateUrl : 'views/Home.html'
    }).when('/social', {
        controller : 'SocialController',
        templateUrl : 'views/social.html'
    }).when('/support', {
        controller : 'SupportController',
        templateUrl : 'views/support.html'
    }).when('/marketing', {
        controller : 'MarketingController',
        templateUrl : 'views/marketing.html'
    }).when('/analytics', {
        controller : 'AnalyticsController',
        templateUrl : 'views/analytics.html'
    }).when('/mobility', {
            controller : 'MobilityController',
            templateUrl : 'views/mobility.html'
    }).otherwise({
        redirectTo : '/'
    });
});