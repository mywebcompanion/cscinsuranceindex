/**
 * Created by ARUN on 9/12/2015.
 */

var InsuranceIndex = angular.module('InsuranceIndex',['highcharts-ng','ngAnimate', 'ui.bootstrap','ui.router','ng-mfb','easypiechart','FBAngular']);
InsuranceIndex.config(['$logProvider','$stateProvider','$urlRouterProvider',function($logProvider, $stateProvider, $urlRouterProvider){
    $stateProvider.state('index', {
        url : '/',
        controller : 'IndexController',
        templateUrl : 'views/index.html'
    }).state('home', {
        controller : 'CMenuController',
        templateUrl : 'views/countrymenu.html'
    }).state('country', {
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
    }).state('liststats',{
        controller : 'StatsController',
        templateUrl : 'views/stats.html',
        params: {
            market : '',
            company : ''
        },
        resolve : {
            loadStats : function($http,$stateParams){
                //$stateParams.market = $stateParams.market.charAt(0).toUpperCase() + $stateParams.market.slice(1);
                var response = $http.post('/home/stats',{market : $stateParams.market, company : $stateParams.company});
                response.success(function(data){
                    console.log(JSON.stringify(data));
                });
                return response;
            }
        }
    });
}]);