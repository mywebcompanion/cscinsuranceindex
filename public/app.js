/**
 * Created by ARUN on 9/12/2015.
 */

var InsuranceIndex = angular.module('InsuranceIndex',['highcharts-ng','ngAnimate', 'ui.bootstrap','ui.router']);
InsuranceIndex.config(['$logProvider','$stateProvider','$urlRouterProvider',function($logProvider, $stateProvider, $urlRouterProvider){
    $stateProvider.state('home', {
        url : '/home',
        controller : 'HomeController'
        //templateUrl : 'views/home.html'
    }).state('country', {
        url : '/country',
        controller : 'CountryController',
        templateUrl : 'views/country.html',
        params: {stateObj: null}
    }).state('social', {
        url : '/social',
        controller : 'SocialController',
        templateUrl : 'views/social.html'
    }).state('support', {
        url : '/support',
        controller : 'SupportController',
        templateUrl : 'views/support.html'
    }).state('marketing', {
        url : '/marketing',
        controller : 'MarketingController',
        templateUrl : 'views/marketing.html'
    }).state('analytics', {
        url : '/analytics',
        controller : 'AnalyticsController',
        templateUrl : 'views/analytics.html'
    }).state('mobility', {
        url : '/mobility',
        controller : 'MobilityController',
        templateUrl : 'views/mobility.html'
    })
}]);